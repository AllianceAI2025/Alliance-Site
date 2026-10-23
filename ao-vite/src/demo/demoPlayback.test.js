import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { assignment, contexts, effort, historicalCases, readbackAssignment, readbackProject, resources, staffingCandidates, stories } from "./northstar.js";
import { commonTiming, compareAssignment, conversationAt, deliveryStateAt, deliveryTiming, demoVisibleAt, followScrollTop, loopFrameAt, loopHold, planExecutionAt, planTiming, playbackRate, precedentBuildAt, progressAt, scopeTiming, textAt } from "./demoPlayback.js";

test("demos wait until watchable and tolerate small scrolls before leaving", () => {
  const geometry = { windowHeight: 735, viewportHeight: 614 };
  assert.equal(demoVisibleAt(false, { ...geometry, visibleHeight: 100 }), false, "a glimpse of the next window does not start it");
  assert.equal(demoVisibleAt(false, { ...geometry, visibleHeight: 400 }), true, "the landing-page window starts without needing to fit completely");
  assert.equal(demoVisibleAt(true, { ...geometry, visibleHeight: 300 }), true, "scrolling around the current window does not restart it");
  assert.equal(demoVisibleAt(true, { ...geometry, visibleHeight: 80 }), false, "leaving the window ends the visit");
  assert.equal(demoVisibleAt(false, { ...geometry, visibleHeight: 100 }), false, "returning waits until there is enough space to watch again");
  assert.equal(demoVisibleAt(false, { windowHeight: 1000, viewportHeight: 500, visibleHeight: 300 }), true, "a tall mobile window can start within a shorter viewport");
  assert.equal(demoVisibleAt(false, { windowHeight: 600, viewportHeight: 1200, visibleHeight: 300 }), false, "a small window uses its own height for the entry threshold");
  assert.equal(demoVisibleAt(true, { windowHeight: 0, viewportHeight: 0, visibleHeight: 0 }), false);
});

test("each scene holds its finished artifact, then starts the same exchange again", () => {
  for (const story of Object.values(stories)) {
    const activeDuration = story.duration / playbackRate;
    const period = activeDuration + loopHold;
    assert.deepEqual(loopFrameAt(activeDuration - 10, story.duration), { elapsed: story.duration - 10 * playbackRate, cycle: 0 });
    assert.deepEqual(loopFrameAt(period - 1, story.duration), { elapsed: story.duration, cycle: 0 });
    assert.deepEqual(loopFrameAt(period, story.duration), { elapsed: 0, cycle: 1 });
    assert.deepEqual(loopFrameAt(period * 2 + commonTiming.artifactAt / playbackRate, story.duration), { elapsed: commonTiming.artifactAt, cycle: 2 });
  }
});

test("the website retains three scenes with slower builds and a reading hold", () => {
  assert.deepEqual(Object.keys(stories), ["scope", "plan", "deliver"]);
  assert.ok(playbackRate > 0 && playbackRate < 1);
  assert.ok(loopHold >= 10000, "finished work stays available for at least ten seconds");
  for (const story of Object.values(stories)) {
    assert.ok(story.prompt && story.answer);
  }
  assert.ok(stories.plan.duration > planTiming.verified);
  assert.ok(stories.deliver.duration > deliveryTiming.exportReady);
  assert.ok((planTiming.approved - planTiming.reviewed) / playbackRate >= 6000, "the reviewed plan stays available before the typed approval is sent");
});

test("PSA submission is typed and sent after review, before any application writes", () => {
  const story = stories.plan;
  assert.ok(planTiming.commandAt > planTiming.reviewed);
  assert.equal(conversationAt(story, planTiming.commandAt - 1).typing, false);
  const duringTyping = conversationAt(story, (planTiming.commandAt + planTiming.approved) / 2);
  assert.equal(duringTyping.typing, true);
  assert.equal(duringTyping.prompt, story.prompt, "the previous exchange stays visible until sending");
  assert.ok(duringTyping.composer.length > 0 && duringTyping.composer.length < story.commands[0].prompt.length);
  assert.equal(planExecutionAt(planTiming.approved - 1).approved, false);
  const sent = conversationAt(story, planTiming.approved);
  assert.equal(sent.typing, false);
  assert.equal(sent.prompt, story.commands[0].prompt);
  assert.ok(sent.prompt.includes("Approve plan v1") && sent.prompt.includes("Project Operations"));
  assert.equal(sent.answer, story.commands[0].answer);
  assert.ok(planTiming.projectCreated >= sent.answerAt + sent.answerDuration);
  assert.equal(conversationAt(story, story.duration).prompt, sent.prompt);
  assert.equal(conversationAt(story, 0).key, 0, "looping restores the original exchange");
});

test("automatic follow reveals current content within the feed's scroll limits", () => {
  const base = { scrollTop: 100, viewportHeight: 400, maxScrollTop: 900 };
  assert.equal(followScrollTop({ ...base, targetTop: 180, targetBottom: 280 }), 100, "visible content does not move");
  assert.equal(followScrollTop({ ...base, targetTop: 460, targetBottom: 560 }), 180, "new content below the viewport is revealed");
  assert.equal(followScrollTop({ ...base, targetTop: 40, targetBottom: 80 }), 20, "a changed artifact can return to its heading");
  assert.equal(followScrollTop({ ...base, targetTop: 0, targetBottom: 40 }), 0);
  assert.equal(followScrollTop({ ...base, targetTop: 1200, targetBottom: 1400 }), 900);
  assert.equal(followScrollTop({ ...base, targetTop: 300, targetBottom: 850 }), 280, "an oversized section starts at its beginning");
});

test("historical context preserves people, accepted work, review and outcome limits", () => {
  assert.deepEqual(historicalCases.map(item => item.reference), ["EV-104", "EV-087"]);
  for (const record of historicalCases) {
    assert.equal(record.deliverables.length, 3);
    for (const item of record.deliverables) assert.ok(item.owner && item.reviewer && item.accepted && item.format);
    assert.ok(record.conditions && record.review && record.outcome && record.carry && record.limit);
    assert.ok(record.submitted && record.acceptedChange && record.northstarAction);
    assert.ok(contexts[record.id].facts.some(([label]) => label === "Transfer limits"));
  }
  assert.equal(historicalCases[0].deliverables[0].owner, assignment.owner);
  assert.equal(historicalCases[0].deliverables[0].reviewer, assignment.reviewer);
  assert.equal(historicalCases[1].deliverables[1].owner, "Jordan Hale");
  assert.ok(stories.scope.artifactAt >= commonTiming.answerAt + stories.scope.answerDuration, "the substantive historical answer completes before the findings card");
});

test("Scope surfaces precedent before the user asks to apply it to a new scope", () => {
  const story = stories.scope;
  const sequence = [scopeTiming.precedentAt, scopeTiming.harborAt, scopeTiming.meridianAt, scopeTiming.historyFinished, scopeTiming.commandAt, scopeTiming.applyAt, scopeTiming.draftAt, scopeTiming.workstreamsAt, scopeTiming.finished, scopeTiming.staffingTyping, scopeTiming.staffingAsked, scopeTiming.staffingAt, scopeTiming.candidatesAt, scopeTiming.availabilityAt, scopeTiming.staffingFinished, story.duration];
  assert.ok(sequence.every((time, index) => !index || time > sequence[index - 1]));
  assert.equal(conversationAt(story, scopeTiming.applyAt - 1).prompt, story.prompt);
  assert.equal(conversationAt(story, scopeTiming.applyAt).prompt, story.commands[0].prompt);
  assert.ok(scopeTiming.draftAt > story.commands[0].answerAt + story.commands[0].answerDuration);
  assert.ok(story.answer.includes("one-week delay") && story.answer.includes("slow adoption"), "the response provides actual findings");
  assert.ok(historicalCases[0].northstarAction.includes("West and Southeast"), "the precedent addresses an open Northstar dependency");
});

test("new requests append below retained responses and completed artifact versions", () => {
  for (const story of Object.values(stories)) {
    assert.equal(conversationAt(story, commonTiming.promptEnd - 1).exchanges.length, 0);
    const final = conversationAt(story, story.duration);
    assert.deepEqual(final.exchanges.map(item => item.prompt), [story.prompt, ...story.commands.map(item => item.prompt)]);
    for (const command of story.commands) {
      const before = conversationAt(story, command.sentAt - 1).exchanges;
      const after = conversationAt(story, command.sentAt).exchanges;
      assert.equal(after.length, before.length + 1);
      assert.deepEqual(after.slice(0, -1).map(item => item.prompt), before.map(item => item.prompt));
    }
    for (const exchange of final.exchanges) {
      assert.ok(exchange.artifact && exchange.artifactAt >= exchange.answerAt);
      if (exchange.artifactUntil) assert.equal(exchange.artifactElapsed, exchange.artifactUntil);
    }
  }
  const plan = conversationAt(stories.plan, planTiming.verified).exchanges;
  assert.deepEqual(plan.map(item => item.artifact), ["plan", "commit"]);
  assert.equal(plan[0].artifactElapsed, planTiming.reviewed, "the reviewed schedule remains intact after submission");
  assert.deepEqual(conversationAt(stories.scope, stories.scope.duration).exchanges.map(item => item.artifact), ["precedent", "scope", "staffing"]);
});

test("firm experience builds text in stages before the next request is sent", () => {
  const first = precedentBuildAt(scopeTiming.harborAt), second = precedentBuildAt(scopeTiming.meridianAt);
  assert.ok(first.application + 600 < second.source, "mobile playback finishes one record before moving to the next");
  assert.ok(second.application + 600 < scopeTiming.historyFinished);
  assert.ok(scopeTiming.historyFinished < scopeTiming.commandAt);
  for (const build of [first, second]) {
    const steps = Object.values(build);
    assert.ok(steps.every((at, index) => !index || at > steps[index - 1]));
    assert.equal(textAt(historicalCases[0].submitted, build.submitted - 1, build.submitted, 400), "");
    const partial = textAt(historicalCases[0].submitted, build.submitted + 200, build.submitted, 400);
    assert.ok(partial.length > 0 && partial.length < historicalCases[0].submitted.length);
  }
});

test("the staffing question evaluates the team before Plan carries it forward", () => {
  const command = stories.scope.commands[1];
  assert.equal(command.sentAt, scopeTiming.staffingAsked);
  assert.equal(command.artifact, "staffing");
  assert.deepEqual(staffingCandidates.map(item => [item.name, item.hours, item.start, item.end]), resources.map(item => [item.name, item.hours, item.start, item.end]));
  assert.equal(staffingCandidates.find(item => item.name === "Daniel Okafor").conditional, true);
  assert.ok(staffingCandidates.every(item => item.experience && contexts[item.source]));
  assert.ok(stories.plan.answer.includes("Week 3 release is now confirmed"));
});

test("Avery types each instruction after its prerequisite and before its action", () => {
  const story = stories.deliver;
  assert.equal(story.commands.length, 3);
  const steps = [
    [deliveryTiming.draftReady, story.commands[0], "sentForReview"],
    [deliveryTiming.feedbackReceived, story.commands[1], "revising"],
    [deliveryTiming.approved, story.commands[2], "exporting"],
  ];
  for (const [prerequisite, command, stateKey] of steps) {
    assert.ok(command.typingAt > prerequisite);
    assert.equal(deliveryStateAt(command.sentAt - 1)[stateKey], false);
    assert.equal(deliveryStateAt(command.sentAt)[stateKey], true);
    const typing = conversationAt(story, (command.typingAt + command.sentAt) / 2);
    assert.equal(typing.typing, true);
    assert.ok(typing.composer.length > 0 && typing.composer.length < command.prompt.length);
    assert.notEqual(typing.prompt, command.prompt, "typing does not send the message early");
    assert.equal(conversationAt(story, command.sentAt).prompt, command.prompt);
  }
  assert.ok(deliveryTiming.revisionContent > story.commands[1].answerAt + story.commands[1].answerDuration);
  assert.ok(deliveryTiming.revised > deliveryTiming.conclusionContent);
  assert.ok(deliveryTiming.exportReady > story.commands[2].answerAt + story.commands[2].answerDuration);
});

test("PSA readback identifies the created project and the approved staffing basis", () => {
  assert.equal(readbackProject.effort, effort);
  assert.equal(readbackProject.resources, resources.length);
  assert.equal(readbackProject.baseline, assignment.baseline);
  assert.equal(readbackProject.manager, resources[0].name);
  assert.ok(readbackProject.id && readbackAssignment.id);
  assert.equal(planExecutionAt(planTiming.approved).projectCreated, false);
  assert.equal(planExecutionAt(planTiming.projectCreated).projectCreated, true);
});

test("delivery goes from review request to feedback, revision, approval and export", () => {
  assert.equal(deliveryStateAt(deliveryTiming.draftReady).sentForReview, false);
  assert.equal(deliveryStateAt(deliveryTiming.sentForReview).feedbackReceived, false);
  assert.equal(deliveryStateAt(deliveryTiming.feedbackReceived).revising, false);
  assert.equal(deliveryStateAt(deliveryTiming.revising).revised, false);
  assert.equal(deliveryStateAt(deliveryTiming.revised).approved, false);
  for (let time = 0; time < deliveryTiming.approved; time += 100) {
    assert.equal(deliveryStateAt(time).exporting, false);
    assert.equal(deliveryStateAt(time).exportReady, false);
  }
  assert.equal(deliveryStateAt(deliveryTiming.approved).exportReady, false);
  assert.equal(deliveryStateAt(deliveryTiming.exportStarted).exporting, true);
  assert.equal(deliveryStateAt(deliveryTiming.exportStarted).exportReady, false);
  assert.equal(deliveryStateAt(deliveryTiming.exportReady).exportReady, true);
  assert.ok((deliveryTiming.sentForReview - deliveryTiming.draftReady) / playbackRate >= 3500);
  assert.ok((deliveryTiming.exportStarted - deliveryTiming.approved) / playbackRate >= 3500);
});

test("the approved assessment has a real Word download and shared report content", () => {
  const assessment = JSON.parse(readFileSync(new URL("./assessment.json", import.meta.url), "utf8"));
  const bytes = readFileSync(new URL(`../../public${assessment.downloadPath}`, import.meta.url));
  assert.equal(bytes.subarray(0, 4).toString("hex"), "504b0304");
  assert.ok(bytes.length > 10000);
  assert.equal(assessment.author, assignment.owner);
  assert.equal(assessment.reviewer, assignment.reviewer);
  assert.equal(assessment.revision, 2);
  assert.ok(assessment.conclusion.includes("Design decisions remain conditional"));
});

test("the accepted effort fits each person's confirmed resource window", () => {
  assert.equal(effort, 1840);
  for (const resource of resources) {
    assert.ok(resource.hours <= (resource.end - resource.start + 1) * 40 * resource.capacity / 100, resource.name);
  }
  assert.equal(resources.find(resource => resource.name === "Daniel Okafor").start, 3);
});

test("the same people and precedent carry into the assessment assignment", () => {
  const owner = resources.find(resource => resource.name === assignment.owner);
  const reviewer = resources.find(resource => resource.name === assignment.reviewer);
  assert.equal(owner.precedent, "harbor");
  assert.ok(reviewer.end >= 4, "reviewer is retained through the assessment gate");
  assert.equal(assignment.effort, 36);
  assert.equal(resources.find(resource => resource.name === "Lena Torres").precedent, "meridian");
  for (const key of ["harbor", "meridian"]) assert.deepEqual(contexts[key].carry.map(([phase]) => phase), ["Scope", "Plan", "Deliver"]);
});

test("review, approval, writes and readback happen in order", () => {
  const justReviewed = planExecutionAt(planTiming.reviewed);
  assert.equal(justReviewed.reviewed, true);
  assert.equal(justReviewed.approved, false);
  for (let time = 0; time < planTiming.approved; time += 100) {
    const state = planExecutionAt(time);
    assert.equal(state.projectCreated, false);
    assert.equal(state.workspaceCreated, false);
    assert.equal(state.readbackReady, false);
  }
  assert.equal(planExecutionAt(planTiming.approved).projectCreated, false);
  assert.equal(planExecutionAt(planTiming.projectCreated).workspaceCreated, false);
  assert.equal(planExecutionAt(planTiming.workspaceCreated).readbackReady, false);
  assert.deepEqual(planExecutionAt(planTiming.verified), { reviewed: true, approved: true, projectCreated: true, workspaceCreated: true, readbackReady: true });
});

test("an independent application response is checked against the approved assignment", () => {
  assert.notEqual(readbackAssignment, assignment);
  assert.deepEqual(compareAssignment(assignment, readbackAssignment), []);
  assert.deepEqual(compareAssignment(assignment, { ...readbackAssignment, due: "September 14" }), ["due"]);
  assert.deepEqual(compareAssignment(assignment, { ...readbackAssignment, reviewer: "Unassigned", effort: 40, baseline: "Plan draft" }), ["reviewer", "effort", "baseline"]);
});

test("artifact text and schedule bars are incomplete before their build finishes", () => {
  assert.equal(textAt("Harbor review", 3000, 3500), "");
  assert.equal(textAt("Harbor review", 4000, 3500), "Harbor review");
  assert.ok(progressAt(3750, 3500, 650) > 0 && progressAt(3750, 3500, 650) < 1);
  assert.equal(progressAt(3400, 3500, 650), 0);
  assert.equal(progressAt(4500, 3500, 650), 1);
  assert.ok(commonTiming.promptEnd < commonTiming.answerAt && commonTiming.answerAt < commonTiming.artifactAt);
});

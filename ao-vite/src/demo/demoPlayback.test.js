import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { approvedPlan, assessmentFileName, assessmentFormatName, assignment, contexts, effort, historicalCases, readbackAssignment, readbackPlan, readbackProject, resolveDemoSource, resources, staffingCandidates, stories } from "./northstar.js";
import { advanceScrollTop, commonTiming, compareAssignment, comparePlan, conversationAt, deliveryStateAt, deliveryTiming, demoPlaybackReadyAt, demoVisibleAt, followScrollTop, playbackFrameAt, planExecutionAt, planTiming, playbackRate, precedentBuildAt, progressAt, scopeTiming, textAt } from "./demoPlayback.js";

test("demo visits tolerate small scrolls before leaving", () => {
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

test("playback waits for the writing area and composer to fit in the visible viewport", () => {
  assert.equal(demoPlaybackReadyAt(false, { top: 397, bottom: 994, viewportHeight: 844 }), false, "the previously clipped mobile composer cannot play offscreen");
  assert.equal(demoPlaybackReadyAt(false, { top: 450, bottom: 790, viewportHeight: 844 }), true);
  assert.equal(demoPlaybackReadyAt(true, { top: -1, bottom: 600, viewportHeight: 844 }), false, "scrolling past the writing area pauses without ending the visit");
  assert.equal(demoPlaybackReadyAt(false, { top: 30, bottom: 650, viewportTop: 20, viewportHeight: 650 }), false, "entry requires room above the writing area");
  assert.equal(demoPlaybackReadyAt(false, { top: 40, bottom: 650, viewportTop: 20, viewportHeight: 650 }), true, "mobile browser chrome uses the actual visual viewport");
  assert.equal(demoPlaybackReadyAt(false, { top: 20, bottom: 700, viewportHeight: 0 }), false);
  assert.equal(demoPlaybackReadyAt(false, { top: 20, bottom: 20, viewportHeight: 844 }), false);
});

test("small layout changes do not repeatedly start and stop playback near an edge", () => {
  const nearEdge = { top: 8, bottom: 835, viewportHeight: 844 };
  assert.equal(demoPlaybackReadyAt(false, nearEdge), false);
  assert.equal(demoPlaybackReadyAt(true, nearEdge), true);
  assert.equal(demoPlaybackReadyAt(true, { ...nearEdge, bottom: 842 }), false);
});

test("each scene plays once and holds the exact final frame indefinitely", () => {
  for (const story of Object.values(stories)) {
    const duration = story.duration / playbackRate;
    assert.deepEqual(playbackFrameAt(0, story.duration), { elapsed: 0, complete: false });
    assert.deepEqual(playbackFrameAt(duration - 10, story.duration), { elapsed: story.duration - 10 * playbackRate, complete: false });
    for (const extra of [0, 10000, 60000, 3600000]) {
      const frame = playbackFrameAt(duration + extra, story.duration);
      assert.deepEqual(frame, { elapsed: story.duration, complete: true });
      assert.equal(conversationAt(story, frame.elapsed).exchanges.length, story.commands.length + 1);
    }
  }
});

test("the website retains three scenes with slower builds and a reading hold", () => {
  assert.deepEqual(Object.keys(stories), ["scope", "plan", "deliver"]);
  assert.ok(playbackRate > 0 && playbackRate < 1);
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
  assert.equal(conversationAt(story, 0).key, 0, "returning to the section restores the original exchange");
});

test("automatic follow reveals current content within the feed's scroll limits", () => {
  const base = { scrollTop: 100, viewportHeight: 400, maxScrollTop: 900 };
  assert.equal(followScrollTop({ ...base, targetTop: 180, targetBottom: 280 }), 100, "visible content does not move");
  assert.equal(followScrollTop({ ...base, targetTop: 460, targetBottom: 560 }), 192, "new content has breathing room above the composer");
  assert.equal(followScrollTop({ ...base, targetTop: 40, targetBottom: 80 }), 100, "a growing block never pulls the reader back to its beginning");
  assert.equal(followScrollTop({ ...base, targetTop: 40, targetBottom: 80, newTarget: true }), 8, "a newly active column can be reframed once");
  assert.equal(followScrollTop({ ...base, targetTop: 0, targetBottom: 40, newTarget: true }), 0);
  assert.equal(followScrollTop({ ...base, targetTop: 1200, targetBottom: 1400 }), 900);
  assert.equal(followScrollTop({ ...base, targetTop: 300, targetBottom: 850 }), 482, "the end of an oversized response stays visible as it grows");
  assert.equal(followScrollTop({ ...base, scrollTop: 482, targetTop: 300, targetBottom: 920 }), 552, "the same response keeps following its new lines");
  assert.equal(followScrollTop({ ...base, targetTop: 300, targetBottom: 850, complete: true }), 900, "completion reaches the true feed bottom, including footer and padding");
  assert.equal(followScrollTop({ ...base, maxScrollTop: -10, complete: true }), 0, "a short completed conversation stays at zero");
});

test("one scroll animation tracks a moving target without overshoot or pixel stalls", () => {
  for (const [start, target] of [[0, 900], [600, 200], [95, 97], [97, 95]]) {
    let position = start;
    for (let frame = 0; frame < 120; frame++) {
      const next = Math.round(advanceScrollTop(position, target, 16));
      assert.ok(next >= Math.min(start, target) && next <= Math.max(start, target));
      position = next;
    }
    assert.equal(position, target, "integer scroll positions still reach the destination");
  }
  assert.ok(advanceScrollTop(0, 600, 32) > advanceScrollTop(0, 600, 16));
  assert.equal(advanceScrollTop(0, 600, 10000), advanceScrollTop(0, 600, 64), "a delayed frame cannot cause a sudden jump");
  let position = 0;
  for (let frame = 0; frame < 120; frame++) {
    const target = frame < 30 ? 300 : 600;
    const next = advanceScrollTop(position, target, 16);
    assert.ok(next >= position && next <= target, "a new line updates the running animation rather than restarting it");
    position = next;
  }
  assert.equal(position, 600);
});

test("the whole approved plan has a coherent task, booking and decision structure", () => {
  assert.equal(approvedPlan.workstreams.length, 4);
  assert.equal(approvedPlan.deliverables.length, 14);
  assert.equal(approvedPlan.resources.length, 6);
  assert.equal(approvedPlan.milestones.length, 4);
  assert.equal(approvedPlan.project.effort, approvedPlan.resources.reduce((sum, item) => sum + item.hours, 0));
  const dueDate = value => Date.parse(`${value}, 2026`);
  for (const task of approvedPlan.deliverables) {
    assert.ok(resources.some(item => item.name === task.owner));
    assert.ok(resources.some(item => item.name === task.reviewer) || task.reviewer === "Elena Vargas");
    assert.ok(approvedPlan.workstreams.some(item => item.id === task.stream));
    assert.ok(task.acceptance && task.start && task.due);
    assert.ok(dueDate(task.start) <= dueDate(task.due));
    for (const dependency of task.dependsOn) {
      const input = approvedPlan.deliverables.find(item => item.id === dependency);
      assert.ok(input && input.id !== task.id);
      assert.ok(dueDate(input.due) <= dueDate(task.due), `${task.id} has its inputs by acceptance`);
    }
  }
  for (const gate of approvedPlan.milestones) {
    assert.ok(gate.requires.every(id => approvedPlan.deliverables.some(item => item.id === id && dueDate(item.due) <= dueDate(gate.due))));
  }
  const assessment = approvedPlan.deliverables.find(item => item.title === assignment.deliverable);
  for (const key of ["owner", "reviewer", "effort", "due"]) assert.equal(assessment[key], assignment[key]);
  assert.ok(planTiming.deliverablesAt + 13 * 260 + 250 < planTiming.milestonesAt);
  assert.ok(planTiming.milestonesAt + 3 * 250 < planTiming.reviewed);
  assert.ok(planTiming.resourcesWrittenAt + 5 * 450 < planTiming.deliverablesWrittenAt);
  assert.ok(planTiming.deliverablesWrittenAt + 13 * 320 + 250 < planTiming.milestonesWrittenAt);
  assert.ok(planTiming.milestonesWrittenAt + 3 * 250 < planTiming.workspaceCreated);
});

test("full-plan readback detects omissions and changes beyond Avery's assignment", () => {
  assert.notEqual(readbackPlan.deliverables, approvedPlan.deliverables);
  assert.deepEqual(comparePlan(approvedPlan, readbackPlan), []);
  const changed = structuredClone(readbackPlan);
  changed.deliverables.find(item => item.id === "NS-D14").due = "November 27";
  changed.deliverables.find(item => item.id === "NS-D09").acceptance = "File received";
  changed.resources.find(item => item.name === "Daniel Okafor").hours = 400;
  changed.milestones.pop();
  changed.project.fee = 420000;
  const differences = comparePlan(approvedPlan, changed);
  for (const difference of ["deliverables: NS-D14", "deliverables: NS-D09", "resources: Daniel Okafor", "milestones: G4", "milestones: record count", "project: fee"]) assert.ok(differences.includes(difference));
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

test("each idle window opens with its question, without a duplicate prompt or early response", () => {
  for (const story of Object.values(stories)) {
    for (const elapsed of [0, commonTiming.promptEnd - 1]) {
      const opening = conversationAt(story, elapsed);
      assert.equal(opening.exchanges.length, 1);
      assert.equal(opening.exchanges[0].prompt, story.prompt);
      assert.equal(opening.typing, false);
      assert.equal(opening.composer, "Ask AllianceOne…");
      assert.ok(opening.answerAt > elapsed);
      assert.ok(opening.artifactAt > elapsed);
    }
  }
});

test("new requests append below retained responses and completed artifact versions", () => {
  for (const story of Object.values(stories)) {
    assert.equal(conversationAt(story, commonTiming.promptEnd - 1).exchanges.length, 1);
    const final = conversationAt(story, story.duration);
    assert.deepEqual(final.exchanges.map(item => item.prompt), [story.prompt, ...story.commands.map(item => item.prompt)]);
    for (const command of story.commands) {
      const before = conversationAt(story, command.sentAt - 1).exchanges;
      const after = conversationAt(story, command.sentAt).exchanges;
      assert.equal(after.length, before.length + 1);
      assert.deepEqual(after.slice(0, -1).map(item => item.prompt), before.map(item => item.prompt));
    }
    for (const exchange of final.exchanges) {
      if (exchange.artifact) assert.ok(exchange.artifactAt >= exchange.answerAt);
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
  const steps = [
    [deliveryTiming.draftReady, story.commands.find(item => item.sentAt === deliveryTiming.sentForReview), "sentForReview"],
    [deliveryTiming.feedbackReceived, story.commands.find(item => item.sentAt === deliveryTiming.revising), "revising"],
    [deliveryTiming.approved, story.commands.find(item => item.sentAt === deliveryTiming.exportStarted), "exporting"],
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
  assert.ok(deliveryTiming.revisionContent > steps[1][1].answerAt + steps[1][1].answerDuration);
  assert.ok(deliveryTiming.revised > deliveryTiming.conclusionContent);
  assert.ok(deliveryTiming.exportReady > steps[2][1].answerAt + steps[2][1].answerDuration);
});

test("consultant delivery establishes the assignment and method before drafting", () => {
  const story = stories.deliver;
  assert.deepEqual(story.threads, ["deliver"]);
  assert.equal(story.person, assignment.owner);
  assert.equal(story.artifact, "assignment-brief");
  assert.ok(story.prompt.includes("What am I delivering"));
  assert.ok(story.answer.includes("Six of eight") && story.answer.includes("Northeast") && story.answer.includes("Central"));
  const method = story.commands[0], draft = story.commands[1];
  assert.ok(method.typingAt > deliveryTiming.assignmentReady);
  assert.equal(method.sentAt, deliveryTiming.methodAsked);
  assert.ok(method.answer.includes(assessmentFormatName) && method.answer.includes("HG-D01 v1"));
  assert.ok(method.answer.includes("source and date") && method.answer.includes("unresolved conflicts"));
  assert.ok(method.sources.every(source => contexts[source.key]));
  assert.ok(draft.typingAt > method.answerAt + method.answerDuration);
  assert.equal(draft.artifact, "assessment-draft");
  assert.ok(draft.artifactAt > draft.answerAt + draft.answerDuration);
  assert.ok(deliveryTiming.purposeAt > draft.artifactAt);
  assert.ok(deliveryTiming.evidenceAt > deliveryTiming.purposeAt + 650);
  const beforeDraft = conversationAt(story, draft.sentAt - 1).exchanges;
  assert.equal(beforeDraft.some(item => item.artifact === "assessment-draft"), false);
  assert.equal(beforeDraft[0].artifactElapsed, deliveryTiming.assignmentReady);
  const ready = conversationAt(story, deliveryTiming.draftReady).exchanges.at(-1);
  assert.equal(ready.artifact, "assessment-draft");
  assert.equal(ready.artifactElapsed, deliveryTiming.draftReady);
});

test("Avery can use assigned materials and explicitly shared or published knowledge", () => {
  for (const key of ["discovery", "assignment", "evidence", "method", "harbor-review", "ownership-guidance", "record"]) {
    const context = contexts[resolveDemoSource("deliver", key)];
    assert.ok(context?.access, `${key} has an explicit demonstration source grant`);
    assert.ok(["northstar-delivery-team", "consulting-practice"].includes(context.access.audience));
  }
  for (const key of ["harbor", "meridian", "accepted", "availability", "meridian-guidance", "unknown-source", "toString"]) {
    assert.equal(resolveDemoSource("deliver", key), null, `${key} cannot fall back to a manager's source`);
  }
  assert.equal(resolveDemoSource("deliver", "assignment"), "consultant-assignment");
  assert.equal(resolveDemoSource("deliver", "record"), "consultant-record");
  assert.equal(resolveDemoSource("scope", "harbor"), "harbor");
  assert.equal(resolveDemoSource("plan", "meridian"), "meridian");
  assert.equal(contexts["harbor-review"].access.kind, "shared-excerpt");
  assert.equal(contexts["harbor-review"].access.sharedBy, assignment.reviewer);
  assert.ok(contexts["harbor-review"].reference.includes(assignment.owner));
  const published = contexts["ownership-guidance"];
  assert.equal(published.access.kind, "published");
  assert.ok(published.reference.includes("Lena Torres"), "the published contribution retains attribution");
  assert.equal(JSON.stringify(published).includes("Meridian"), false, "the practice note does not expose its source client's identity");
  for (const source of stories.deliver.commands[0].sources) assert.ok(resolveDemoSource("deliver", source.key));
  assert.equal(assessmentFileName, "Northstar Foods — Data Readiness Assessment.docx");
  assert.equal(/ASG DR01|v1\.2/.test(JSON.stringify(stories.deliver)), false, "the presentation uses report names rather than technical template identifiers");
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

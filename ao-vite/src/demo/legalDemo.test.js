import test from "node:test";
import assert from "node:assert/strict";
import { currentMatter, handoffSources, legalContexts, legalStories, legalTiming, matterBriefRevisions, priorMatters, resolveLegalSource } from "./litigation.js";
import { conversationAt, playbackFrameAt, playbackRate } from "./demoPlayback.js";

test("three distinct closed matters and one current matter underpin the same Northstar story", () => {
  assert.equal(priorMatters.length, 3);
  assert.equal(new Set([...priorMatters, currentMatter].map(m => m.number)).size, 4);
  for (const matter of [...priorMatters, currentMatter]) assert.equal(matter.fictional, true);
  for (const matter of priorMatters) {
    assert.ok(matter.closeDate < currentMatter.asOf);
    assert.ok(matter.author && matter.lead && matter.initial && matter.changed && matter.outcome && matter.limit);
  }
  assert.equal(legalStories.deliver.person, currentMatter.associate);
  assert.equal(legalStories.scope.person, currentMatter.lead);
});

test("every historical claim has dated, attributed assessment, draft, result, review and cost records", () => {
  const ids = priorMatters.flatMap(m => Object.values(m.sources));
  assert.equal(new Set(ids).size, 18);
  for (const matter of priorMatters) {
    for (const id of Object.values(matter.sources)) {
      const record = legalContexts[id];
      assert.equal(record.matter, matter.id);
      assert.match(record.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(record.author && record.text.length > 100);
      assert.equal(resolveLegalSource("scope", id), id);
      assert.equal(resolveLegalSource("plan", id), id);
    }
    assert.ok(legalContexts[matter.sources.assessment].text.includes(matter.initial));
    assert.ok(legalContexts[matter.sources.brief].text.includes(matter.motion.v1));
    assert.ok(legalContexts[matter.sources.brief].text.includes(matter.motion.v2));
    assert.ok(legalContexts[matter.sources.decision].text.includes(matter.motion.court));
    assert.ok(legalContexts[matter.sources.review].text.includes(matter.motion.review));
    assert.ok(legalContexts[matter.sources.closeout].text.includes(matter.changed));
  }
});

test("a withdrawal is not represented as a court win and partial relief is not a liability finding", () => {
  const [harbor, cedar, briar] = priorMatters;
  assert.equal(harbor.motion.result, "Granted in part");
  assert.match(harbor.limit, /did not decide liability/);
  assert.equal(cedar.motion.kind, "Withdrawal notice");
  assert.match(cedar.motion.court, /No merits ruling/);
  assert.match(cedar.motion.review, /not evidence that the motion would have succeeded/);
  assert.equal(briar.motion.result, "Denied without prejudice");
  assert.match(briar.motion.court, /did not establish.*control/);
  assert.match(briar.limit, /not a general rule/);
});

test("fee comparisons retain phase figures and a documented cause rather than inferring causation from a total", () => {
  for (const matter of priorMatters) {
    const record = legalContexts[matter.sources.cost];
    for (const key of ["approved", "actual", "phaseApproved", "phaseActual"]) {
      assert.ok(record.text.includes(`$${matter.budget[key].toLocaleString("en-US")}`));
    }
    assert.ok(record.text.includes(matter.budget.reason));
  }
  const harbor = priorMatters[0].budget;
  assert.equal(harbor.actual - harbor.approved, 22500);
  assert.equal(harbor.phaseActual - harbor.phaseApproved, 19500);
  assert.match(harbor.reason, /time narratives.*close-out/);
});

test("associate access is restricted to this assignment, published guidance and an explicitly shared excerpt", () => {
  for (const id of handoffSources) assert.equal(resolveLegalSource("deliver", id), id);
  for (const matter of priorMatters) {
    assert.equal(resolveLegalSource("deliver", matter.id), null);
    for (const id of Object.values(matter.sources)) assert.equal(resolveLegalSource("deliver", id), null);
  }
  // Having authored Harbor's draft does not grant access to its retained file.
  assert.equal(priorMatters[0].author, legalStories.deliver.person);
  assert.equal(resolveLegalSource("deliver", priorMatters[0].sources.brief), null);
  assert.equal(legalContexts["HARBOR-SHARED-REVIEW"].access.kind, "explicit-share");
  assert.match(legalContexts["HARBOR-SHARED-REVIEW"].text, /does not grant access.*full file/);
  assert.equal(legalContexts["PRACTICE-07"].access.kind, "published");
  assert.equal(resolveLegalSource("unknown", "discovery"), null);
  assert.equal(resolveLegalSource("deliver", "toString"), null);
  assert.equal(resolveLegalSource("scope", "missing"), null);
});

test("new correspondence revises the handoff without leaking into the retained first version or approving action", () => {
  const [first, next] = matterBriefRevisions;
  assert.ok(!first.sourceIds.includes("NS-EMAIL-22"));
  assert.ok(!first.sourceIds.includes("NS-REVIEW"));
  assert.equal(first.custodian, currentMatter.originalAssumption);
  for (const id of first.sourceIds) assert.ok(next.sourceIds.includes(id));
  for (const id of next.sourceIds) assert.equal(resolveLegalSource("deliver", id), id);
  assert.equal(next.custodian, currentMatter.newInformation);
  assert.equal(next.status, "For Sofia’s review");
  assert.match(currentMatter.pending, /No motion has been approved/);
  assert.match(currentMatter.newInformation, /may hold.*does not establish/);
});

test("each follow-up follows a completed artifact and appends without replacing the first exchange", () => {
  for (const [phase, story] of Object.entries(legalStories)) {
    const t = legalTiming[phase];
    const command = story.commands[0];
    assert.ok(story.artifactAt < t.firstReady);
    assert.ok(t.firstReady < command.typingAt);
    assert.ok(command.typingAt < command.sentAt);
    assert.ok(command.sentAt < command.answerAt);
    assert.ok(command.answerAt < command.artifactAt);
    assert.ok(t.ready < story.duration);
    assert.equal(conversationAt(story, command.typingAt + 500).exchanges.length, 1);
    assert.equal(conversationAt(story, command.typingAt + 500).typing, true);
    const end = conversationAt(story, story.duration);
    assert.equal(end.exchanges.length, 2);
    assert.equal(end.exchanges[0].artifactElapsed, t.firstReady);
    assert.equal(end.exchanges[1].artifact, command.artifact);
    assert.equal(end.exchanges[0].prompt, story.prompt);
    assert.equal(end.exchanges[1].prompt, command.prompt);
    assert.deepEqual(playbackFrameAt(story.duration / playbackRate + 30000, story.duration), { elapsed: story.duration, complete: true });
  }
});

test("the public legal story has no operational writeback or unearned filing approval", () => {
  assert.doesNotMatch(JSON.stringify(legalStories), /PSA|Project Operations|writeback|motion filed|filing approved/i);
  assert.deepEqual(legalStories.deliver.threads, ["deliver"]);
  assert.equal(currentMatter.reviewer, "Sofia Patel");
  assert.match(legalStories.deliver.commands[0].answer, /No filing.*has been approved/);
});

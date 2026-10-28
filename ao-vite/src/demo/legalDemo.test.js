import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";
import { buildMatterBrief, firmTemplate } from "./matterBrief.js";
import { currentMatter, assessmentSources, legalContexts, legalStories, legalTiming, matterBriefRevisions, northstarUpdate, priorMatters, resolveLegalSource } from "./litigation.js";
import { conversationAt, playbackFrameAt, playbackRate } from "./demoPlayback.js";

test("one lead attorney owns all three moments and both letterhead revisions", () => {
  assert.deepEqual(Object.keys(legalStories), ["scope", "reasoning", "deliver"]);
  for (const story of Object.values(legalStories)) assert.equal(story.actor, currentMatter.lead);
  for (const revised of [false, true]) {
    const brief = buildMatterBrief(revised);
    assert.equal(brief.author, currentMatter.lead);
    assert.equal(brief.recipient, "Northstar matter team");
    assert.equal(brief.reviewer, currentMatter.lead);
    assert.doesNotMatch(JSON.stringify(brief), /my Harbor draft|Avery’s assignment|Sofia’s review/);
  }
});

test("historical reasoning has distinct dated assessment, argument, result, review, cost and closeout sources", () => {
  assert.equal(priorMatters.length, 3);
  assert.equal(new Set([...priorMatters, currentMatter].map(m => m.number)).size, 4);
  const ids = priorMatters.flatMap(m => Object.values(m.sources));
  assert.equal(new Set(ids).size, 18);
  for (const matter of priorMatters) {
    assert.ok(matter.fictional && matter.closeDate < currentMatter.asOf);
    for (const id of Object.values(matter.sources)) {
      const record = legalContexts[id];
      assert.equal(record.matter, matter.id);
      assert.match(record.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(record.author && record.text.length > 100);
      assert.equal(resolveLegalSource("reasoning", id), id);
    }
    for (const [field, value] of [["assessment", matter.initial], ["brief", matter.motion.v2], ["decision", matter.motion.court], ["review", matter.motion.review], ["closeout", matter.changed]]) assert.ok(legalContexts[matter.sources[field]].text.includes(value));
  }
});

test("precedent comes before the questions that apply Harbor to Northstar", () => {
  const opening = legalStories.scope;
  assert.match(opening.prompt, /Which of our past matters/);
  assert.doesNotMatch(opening.prompt + opening.answer, /\$|\bbudget\b|staffing|availability|who worked/i);
  for (const matter of priorMatters) assert.ok(matter.northstarQuestion && matter.northstarApplication && matter.precedentSummary);
  assert.match(legalStories.reasoning.prompt, /Harbor’s initial assessment/);
  assert.match(legalStories.reasoning.commands[0].prompt, /supported Harbor’s production motion/);
  assert.match(legalStories.deliver.prompt, /Harbor and Briar Glen/);
});

test("partial relief, voluntary production and settlement remain distinguishable from merits findings", () => {
  const [harbor, cedar, briar] = priorMatters;
  assert.equal(harbor.motion.result, "Granted in part");
  assert.match(harbor.motion.court, /did not decide liability/);
  assert.equal(cedar.motion.kind, "Withdrawal notice");
  assert.match(cedar.motion.court, /No merits ruling/);
  assert.match(cedar.motion.review, /not evidence that the motion would have succeeded/);
  assert.equal(briar.motion.result, "Denied without prejudice");
  assert.match(briar.limit, /not a general rule/);
  for (const matter of priorMatters) assert.doesNotMatch(matter.outcome, /court found.*liable|proved liability/);
});

test("economics retain a documented explanation and phase figures without leading the opening", () => {
  for (const matter of priorMatters) {
    const record = legalContexts[matter.sources.cost];
    for (const key of ["approved", "actual", "phaseApproved", "phaseActual"]) assert.ok(record.text.includes(`$${matter.budget[key].toLocaleString("en-US")}`));
    assert.ok(record.text.includes(matter.budget.reason));
  }
});

test("reused extracts do not silently extend access to another matter’s underlying file", () => {
  for (const id of assessmentSources) assert.equal(resolveLegalSource("deliver", id), id);
  for (const matter of priorMatters) {
    assert.equal(resolveLegalSource("deliver", matter.id), null);
    for (const id of Object.values(matter.sources)) assert.equal(resolveLegalSource("deliver", id), null);
  }
  assert.equal(legalContexts["HARBOR-SHARED-REVIEW"].access.kind, "explicit-share");
  assert.match(legalContexts["HARBOR-SHARED-REVIEW"].text, /does not grant access.*full file/);
  assert.equal(legalContexts["PRACTICE-07"].access.kind, "published");
  assert.equal(resolveLegalSource("unknown", "discovery"), null);
  assert.equal(resolveLegalSource("deliver", "toString"), null);
  assert.equal(resolveLegalSource("scope", "missing"), null);
});

test("revision 1 uses only evidence available at its date and stays immutable after the event", () => {
  const first = buildMatterBrief(false), snapshot = JSON.stringify(first);
  assert.doesNotMatch(snapshot, /NS-EMAIL-22|NS-LOG-22|NS-REVISION-2|November 2023 email|November 3, 2023/);
  assert.match(snapshot, /not been verified|unverified|Confirm/);
  buildMatterBrief(true);
  assert.equal(JSON.stringify(buildMatterBrief(false)), snapshot);
  for (const source of first.sources) assert.ok(source.date <= "2026-10-21");
  const [before, after] = matterBriefRevisions;
  for (const id of before.sourceIds) assert.ok(after.sourceIds.includes(id));
  assert.ok(after.sourceIds.includes("NS-EMAIL-22") && after.sourceIds.includes("NS-LOG-22"));
  assert.notEqual(before.assessment, after.assessment);
});

test("original evidence dates and arrival dates are separate in the proactive event", () => {
  for (const id of northstarUpdate.sourceIds) {
    const source = legalContexts[id];
    assert.equal(source.originalDate, "2023-11-03");
    assert.equal(source.date, "2026-10-22");
    assert.ok(source.receivedAt < northstarUpdate.occurredAt);
  }
  assert.equal(northstarUpdate.affectedRevision, 1);
});

test("new evidence interrupts neither the route nor the conversation and is not a fabricated human request", () => {
  const story = legalStories.deliver, t = legalTiming.deliver;
  assert.ok(t.updateAt > story.artifactUntil + 1500);
  assert.ok(t.updateReady < t.reviseTyping);
  const before = conversationAt(story, t.updateAt - 1);
  assert.equal(before.exchanges.length, 1);
  assert.doesNotMatch(JSON.stringify(before.exchanges), /NS-EMAIL-22|November 3, 2023|maintenance log/);
  const event = conversationAt(story, t.updateAt).exchanges.at(-1);
  assert.equal(event.key, northstarUpdate.id);
  assert.equal(event.kind, "agent-event");
  assert.equal(event.prompt, undefined);
  assert.equal(conversationAt(story, t.updateAt).typing, false);
  const final = conversationAt(story, story.duration);
  assert.deepEqual(final.exchanges.map(item => item.artifact), ["legal-assessment", "legal-change", "legal-assessment-revised"]);
  assert.equal(final.exchanges.filter(item => item.prompt).length, 2);
  assert.ok(final.exchanges.at(-1).sentAt > t.updateReady);
});

test("typed follow-ups append beneath frozen artifacts and finished scenes hold instead of looping", () => {
  for (const [phase, story] of Object.entries(legalStories)) {
    for (const command of story.commands) {
      assert.ok(command.typingAt > story.artifactUntil);
      assert.ok(command.typingAt < command.sentAt && command.sentAt < command.answerAt);
      assert.ok(command.artifactAt > command.answerAt + command.answerDuration);
      assert.equal(conversationAt(story, command.typingAt + 500).typing, true);
      assert.ok(!conversationAt(story, command.sentAt - 1).exchanges.some(item => item.key === command.sentAt));
      assert.ok(conversationAt(story, command.sentAt).exchanges.some(item => item.prompt === command.prompt));
    }
    const end = conversationAt(story, story.duration);
    assert.equal(end.exchanges.length, 1 + story.commands.length + (story.events || []).length);
    for (const item of end.exchanges) assert.equal(item.artifactElapsed, item.artifactUntil);
    assert.ok((story.duration - legalTiming[phase].ready) / playbackRate >= 6000);
    assert.deepEqual(playbackFrameAt(story.duration / playbackRate + 30000, story.duration), { elapsed: story.duration, complete: true });
  }
});

test("the revised assessment connects evidence to a changed recommendation without inventing a legal conclusion", () => {
  const brief = buildMatterBrief(true);
  assert.match(brief.sections[2].body, /November 2023 email/);
  assert.match(brief.review.body, /Margaret directed chronology and engineering comparison/);
  assert.match(brief.review.body, /earlier view remains in revision 1/);
  assert.match(brief.introduction, /do not establish.*share a cause or resolve a timing defense/);
  assert.equal(brief.status, "For lead attorney review");
  for (const row of brief.evidence) for (const id of row.sourceIds) assert.ok(brief.sources.some(source => source.id === id));
  for (const source of brief.sources) assert.equal(resolveLegalSource("deliver", source.id), source.id);
  assert.doesNotMatch(JSON.stringify(brief), /112,500|49,500|cost reconciliation/);
});

test("the public story has no PSA writeback, automated filing or artificial lesson-admission step", () => {
  assert.doesNotMatch(JSON.stringify(legalStories), /PSA|Project Operations|writeback|admit a lesson|motion filed|filing approved|joining|handoff/i);
  assert.match(currentMatter.pending, /No motion has been approved/);
});

function wordEntries(bytes) {
  const end = bytes.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  assert.ok(end >= 0);
  let offset = bytes.readUInt32LE(end + 16);
  const result = {};
  for (let i = 0; i < bytes.readUInt16LE(end + 10); i++) {
    assert.equal(bytes.readUInt32LE(offset), 0x02014b50);
    const nameLength = bytes.readUInt16LE(offset + 28);
    const name = bytes.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    const local = bytes.readUInt32LE(offset + 42);
    const start = local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28);
    const compressed = bytes.subarray(start, start + bytes.readUInt32LE(offset + 20));
    result[name] = (bytes.readUInt16LE(offset + 10) === 8 ? inflateRawSync(compressed) : compressed).toString("utf8");
    offset += 46 + nameLength + bytes.readUInt16LE(offset + 30) + bytes.readUInt16LE(offset + 32);
  }
  return result;
}

test("the internal Word reference matches the lead attorney, displayed analysis and evidence map", () => {
  const brief = buildMatterBrief(true);
  const entries = wordEntries(readFileSync(new URL(`../../public${firmTemplate.downloadPath}`, import.meta.url)));
  const body = entries["word/document.xml"];
  for (const text of [brief.documentTitle, brief.name, brief.introduction, brief.review.body, brief.decision, ...brief.sections.map(part => part.body), ...brief.evidence.flatMap(row => [row.record, row.action]), ...brief.sources.map(source => source.id)]) assert.ok(body.includes(text), text);
  assert.doesNotMatch(body, /â€|Â·/);
  assert.ok(body.includes("<w:tbl>"));
  assert.ok(entries["docProps/core.xml"].includes(brief.author));
  const headers = Object.entries(entries).filter(([name]) => /^word\/header\d+\.xml$/.test(name));
  assert.equal(headers.length, 3);
  for (const [, xml] of headers) assert.ok(xml.includes(brief.firm));
});

test("letterhead and evidence map finish before the final reading hold", () => {
  const t = legalTiming.deliver;
  assert.ok(t.artifact + 9000 <= t.firstReady);
  assert.ok(t.nextArtifact + 14500 < t.ready);
  assert.ok((t.end - t.ready) / playbackRate >= 6000);
});

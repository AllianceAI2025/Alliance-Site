import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";
import { buildMatterBrief, firmTemplate } from "./matterBrief.js";
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

test("the opening leads with sourced legal arguments and their application while retaining supporting economics", () => {
  const story = legalStories.scope;
  const conversation = [story.prompt, story.answer, story.commands[0].prompt, story.commands[0].answer].join(" ");
  assert.doesNotMatch(conversation, /\$|\bbudget\b|\bcost\b|who did|availability|staffing/i);
  assert.match(conversation, /arguments/);
  assert.match(conversation, /control/);
  assert.match(story.commands[0].prompt, /motion assessment/);
  for (const matter of priorMatters) {
    assert.ok(matter.legalIssue && matter.northstarQuestion && matter.northstarApplication);
    assert.ok(legalContexts[matter.sources.brief].text.includes(matter.motion.argument));
    assert.ok(legalContexts[matter.sources.assessment].text.includes(matter.legalIssue));
    assert.ok(legalContexts[matter.sources.cost].text.includes(matter.budget.reason));
    const labels = legalContexts[matter.id].facts.map(([label]) => label);
    assert.ok(labels.indexOf("The firm’s argument") < labels.indexOf("Contributor"));
    assert.ok(labels.indexOf("Recorded motion result") < labels.indexOf("Budget / actual fees"));
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

test("the firm brief keeps current-matter evidence and permitted review separate from the broader historical file", () => {
  const first = buildMatterBrief(false), revised = buildMatterBrief(true);
  assert.equal(revised.name, "Litigation Matter Brief");
  assert.equal(revised.author, currentMatter.associate);
  assert.equal(revised.reviewer, currentMatter.reviewer);
  assert.equal(revised.revision, 2);
  assert.equal(revised.status, "Draft for partner review");
  assert.doesNotMatch(JSON.stringify(first), /NS-EMAIL-22|NS-REVIEW|October 22|former facilities manager/);
  for (const brief of [first, revised]) {
    for (const source of brief.sources) assert.equal(resolveLegalSource("deliver", source.id), source.id);
    for (const row of brief.evidence) for (const id of row.sourceIds) assert.ok(brief.sources.some(source => source.id === id));
    assert.doesNotMatch(JSON.stringify(brief), /112,500|Cedar Ridge|Briar Glen|cost reconciliation/);
    assert.match(brief.decision, /No motion has been approved/);
  }
  assert.ok(revised.sections.some(part => part.body === currentMatter.newInformation));
  assert.ok(revised.sources.some(source => source.id === "HARBOR-SHARED-REVIEW" && source.access === "explicit-share"));
});

// Read the checked-in OOXML rather than only checking a filename or ZIP signature.
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

test("the internal Word reference matches the displayed brief, firm letterhead, evidence map and source record", () => {
  const brief = buildMatterBrief(true);
  const bytes = readFileSync(new URL(`../../public${firmTemplate.downloadPath}`, import.meta.url));
  assert.ok(bytes.length > 20000);
  const entries = wordEntries(bytes);
  const body = entries["word/document.xml"];
  for (const text of [brief.documentTitle, brief.name, brief.introduction, brief.review.body, brief.decision, ...brief.sections.map(part => part.body), ...brief.evidence.flatMap(row => [row.record, row.action]), ...brief.sources.map(source => source.id)]) assert.ok(body.includes(text), text);
  assert.doesNotMatch(body, /â€|Â·/);
  assert.ok(body.includes("<w:tbl>"), "the evidence map is an editable Word table");
  assert.ok(entries["docProps/core.xml"].includes(brief.author));
  const headers = Object.entries(entries).filter(([name]) => /^word\/header\d+\.xml$/.test(name));
  assert.equal(headers.length, 3);
  for (const [, xml] of headers) assert.ok(xml.includes(brief.firm));
  const title = entries["word/styles.xml"].match(/<w:style\b[^>]*w:styleId="Title"[^>]*>[\s\S]*?<\/w:style>/)?.[0];
  assert.ok(title);
  assert.doesNotMatch(title, /w:pBdr|w:asciiTheme|w:hAnsiTheme/);
  assert.match(title, /w:ascii="Georgia"/);
});

test("the expanded document finishes before the final reading hold", () => {
  const t = legalTiming.deliver;
  assert.ok(t.nextArtifact + 13700 < t.ready);
  assert.ok((t.end - t.ready) / playbackRate >= 6000);
  assert.match(legalStories.deliver.commands[0].prompt, /Litigation Matter Brief template/);
});

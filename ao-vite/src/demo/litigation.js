// Entirely fictional firm records. These excerpts are demonstration data, not
// legal authorities, actual client work, or records of Hellmuth & Johnson.
export const legalTiming = {
  scope: { artifact: 3500, firstReady: 17800, typing: 19800, sent: 22300, answer: 22500, nextArtifact: 24900, ready: 30900, end: 36900 },
  plan: { artifact: 3200, firstReady: 16900, typing: 18900, sent: 21400, answer: 21600, nextArtifact: 24000, ready: 30400, end: 36400 },
  deliver: { artifact: 3500, firstReady: 12700, typing: 14500, sent: 18500, answer: 18700, nextArtifact: 21100, ready: 35200, end: 41200 },
};

export const priorMatters = [
  {
    id: "harbor", number: "HG-21-041", client: "Harbor Point Owners", year: "2023", fictional: true,
    issue: "Roof-water intrusion; disputed installation and inspection records.",
    legalIssue: "Relevance and scope of inspection-record discovery",
    northstarQuestion: "How does each requested record connect to a disputed defect?",
    northstarApplication: "Use the issue-and-exhibit map as a starting structure. Northstar still needs its own supporting record before extending a request to other projects.",
    lead: "Sofia Patel", author: "Avery Ross", role: "Prepared the production chronology and motion outline",
    initial: "The initial assessment assumed the contractor held a substantially complete installation record.",
    changed: "A later custodian interview identified a separate archive and a second collection. The first assessment had understated the discovery effort.",
    outcome: "Resolved at mediation after further engineering evidence; no trial finding on liability.",
    budget: { approved: 90000, actual: 112500, phase: "Document discovery", phaseApproved: 30000, phaseActual: 49500, reason: "A custodian change and second collection increased discovery work, documented in time narratives and Sofia’s close-out note." },
    motion: {
      result: "Granted in part", kind: "Court order", date: "2023-04-17",
      argument: "The team linked inspection reports to the east-elevation defects and relevant work period. It also sought other-project files for comparison, but did not establish their connection to the claimed defects.",
      recordPoint: "The identified project reports were ordered produced. The other-project request was refused because its connection to the claimed defects was not supported.",
      requested: "Production of the contractor’s inspection reports and records from other projects.",
      court: "The order required production of the identified inspection reports. It refused the other-project request because the supporting record did not establish its connection to the claimed defects.",
      v1: "Requested six years of project records and other-project inspection files, without mapping each request to the identified defect locations.",
      v2: "Mapped the inspection reports to the east-elevation defects and relevant work period; treated the other-project request separately and stated its evidentiary limits.",
      review: "Sofia asked Avery to identify the custodian and tie each request to a disputed issue and supporting exhibit. Narrowing the draft did not establish every request’s merits.",
      lesson: "Confirm who controls the records and connect each request to the evidence.",
    },
    limit: "A partial production order did not decide liability. Northstar’s record custodian is still unconfirmed.",
    closeDate: "2023-09-22",
  },
  {
    id: "cedar", number: "CR-22-018", client: "Cedar Ridge Logistics", year: "2024", fictional: true,
    issue: "Distribution-building defects; a usable document inventory was already available.",
    legalIssue: "A defined production gap resolved before the hearing",
    northstarQuestion: "Which reports are missing, and could a targeted request resolve the gap?",
    northstarApplication: "Build a missing-record schedule before treating a motion as the next step. Northstar does not yet have Cedar Ridge’s confirmed inventory or identified records contact.",
    lead: "Jordan Hale", author: "Daniel Okafor", role: "Prepared the document inventory and proposed request",
    initial: "The assessment identified a discrete set of missing reports and a named records contact.",
    changed: "The identified reports were produced after a narrowed request. A scheduled motion to compel production was withdrawn; the court did not decide it.",
    outcome: "Settled after the engineering report; settlement did not establish a judicial finding on the defects.",
    budget: { approved: 100000, actual: 97000, phase: "Document discovery", phaseApproved: 31000, phaseActual: 28000, reason: "The existing inventory limited repeat collection. Jordan’s review credited the inventory and voluntary production, not a court victory." },
    motion: {
      result: "Withdrawn after production", kind: "Withdrawal notice", date: "2024-03-11",
      argument: "The team sought identified inspection and completion reports. An existing inventory and missing-document list made the request specific enough to check against the production received.",
      recordPoint: "The reports were produced and the motion was withdrawn before the hearing. There was no ruling on the merits.",
      requested: "Production of identified inspection and completion reports.",
      court: "No merits ruling. The withdrawal notice records production of the identified reports before the hearing.",
      v1: "Outlined a motion to compel production while the team confirmed which reports were missing.",
      v2: "Used a specific missing-document list in the request. The motion was withdrawn when those documents were produced.",
      review: "Jordan recorded that the existing inventory and identified records contact made the narrow request practical. This is not evidence that the motion would have succeeded.",
      lesson: "Use the inventory before expanding the dispute; distinguish production from a court win.",
    },
    limit: "Northstar lacks Cedar Ridge’s confirmed inventory. The same effort assumption cannot be carried across unchanged.",
    closeDate: "2024-08-16",
  },
  {
    id: "briar", number: "BG-23-067", client: "Briar Glen Properties", year: "2025", fictional: true,
    issue: "Building-envelope defects; responsibility for keeping requested records was disputed.",
    legalIssue: "Evidence of the responding party’s control of records",
    northstarQuestion: "What evidence shows who controls the requested reports?",
    northstarApplication: "Separate the contractor’s project role from evidence of control. Check the current matter’s records and custodian information before relying on that assumption.",
    lead: "Sofia Patel", author: "Lena Torres", role: "Prepared the records-control chronology and revised evidence register",
    initial: "The initial assessment treated the general contractor as the likely custodian of the disputed reports.",
    changed: "The supporting record did not establish that the respondent controlled the documents. The team revised its collection approach after identifying an owner-side archive.",
    outcome: "Resolved after further records collection and negotiated agreement; no trial finding on liability.",
    budget: { approved: 120000, actual: 132000, phase: "Document discovery", phaseApproved: 40000, phaseActual: 50500, reason: "Further records-control work and collection followed the unsuccessful motion. The time narratives and partner review support that explanation." },
    motion: {
      result: "Denied without prejudice", kind: "Court order", date: "2025-02-14",
      argument: "The first outline relied on the contractor’s project role as the basis for seeking the reports from it. Review separated that role from evidence that the respondent actually controlled the requested documents.",
      recordPoint: "The supporting record did not establish the respondent’s control of the documents. The order did not decide the underlying defect allegations.",
      requested: "Production of reports the team believed were held by the contractor.",
      court: "The order states that the submitted record did not establish the respondent’s control of the requested documents. It did not decide the underlying defect allegations.",
      v1: "Relied on the contract role as the basis for assuming control of the documents.",
      v2: "Separated the contract role from evidence of actual records control and identified the owner-side archive for further investigation.",
      review: "Sofia asked the team to distinguish an inference about custody from evidence of control. She recorded that this question should have been resolved earlier.",
      lesson: "Establish records control before relying on a custodian assumption.",
    },
    limit: "The order concerns that matter’s supporting record, not a general rule that comparable requests fail.",
    closeDate: "2025-10-03",
  },
];

export const currentMatter = {
  id: "northstar", number: "NS-26-014", client: "Northstar Foods", fictional: true,
  title: "Distribution-center construction dispute", asOf: "2026-10-23",
  lead: "Margaret Whitfield", associate: "Avery Ross", reviewer: "Sofia Patel",
  instruction: "Investigate water intrusion at the distribution center while limiting disruption to operations. The client requested a targeted records approach before broader collection.",
  established: "The matter file contains the construction agreement, an inspection chronology and photographs. These establish the materials received, not responsibility for the alleged defects.",
  assignment: "Prepare an internal assessment of a possible motion to compel production, with a supporting evidence map for Sofia’s review. Identify missing records, custodians and what each proposed request would establish.",
  originalAssumption: "The contractor was the working custodian assumption; control of the missing reports had not been verified.",
  newInformation: "The client’s October 22 email identifies a former facilities manager who may hold the reports. It does not establish that the contractor controls them.",
  interpretation: "Check the former manager’s archive and document who controls each record before recommending the scope of a motion to compel production.",
  pending: "Sofia must review the evidence map and proposed approach. No motion has been approved for filing; no budget or client instruction is changed by this brief.",
  questions: ["Who controls the missing inspection reports?", "Which disputed issue would each requested record help establish?", "What remains an allegation or inference rather than a supported fact?"],
};

const contexts = {};
function document(id, matter, label, title, date, author, text, access = "partner-matter-access") {
  contexts[id] = { label, title, reference: `${id} · ${date} · ${author}`, date, author, matter, text, access: { kind: access, label: access === "published" ? "Reviewed practice guidance · available to the litigation team" : access === "explicit-share" ? "Sofia explicitly shared this excerpt for Avery’s Northstar assignment" : access === "current-matter" ? "Assigned Northstar matter team" : "Fictional partner access to this matter’s records" }, facts: [["Record type", label], ["Author / owner", author], ["Date", date], ["Use", "Fictional internal record. It is not legal authority or a real court filing."]] };
}

for (const matter of priorMatters) {
  const prefix = matter.number;
  matter.sources = { assessment: `${prefix}-ECA`, brief: `${prefix}-BRIEF`, decision: `${prefix}-DECISION`, review: `${prefix}-REVIEW`, cost: `${prefix}-COST`, closeout: `${prefix}-CLOSE` };
  document(matter.sources.assessment, matter.id, "Initial matter assessment", `${matter.client} · initial assessment`, `${Number(matter.year) - 1}-11-02`, matter.lead, `${matter.issue}\n\nIssue: ${matter.legalIssue}.\n\n${matter.initial} This was the team’s view at the time, not a later-established fact.`);
  document(matter.sources.brief, matter.id, "Internal motion drafts", `${matter.client} · argument and revision`, matter.motion.date, matter.author, `Issue: ${matter.legalIssue}.\n\nRequested relief: ${matter.motion.requested}\n\nThe firm’s argument: ${matter.motion.argument}\n\nDraft 1: ${matter.motion.v1}\n\nReviewed draft: ${matter.motion.v2}`);
  document(matter.sources.decision, matter.id, matter.motion.kind, `${matter.client} · ${matter.motion.result.toLowerCase()}`, matter.motion.date, matter.motion.kind === "Court order" ? "Fictional court record" : matter.lead, `${matter.motion.result}. ${matter.motion.court}`);
  document(matter.sources.review, matter.id, "Partner review", `${matter.client} · review reasoning`, matter.closeDate, matter.lead, `${matter.motion.review}\n\nWhat the team would carry forward: ${matter.motion.lesson}\n\nLimit: ${matter.limit}`);
  document(matter.sources.cost, matter.id, "Budget and actuals", `${matter.client} · cost reconciliation`, matter.closeDate, "Fictional matter billing record", `Approved matter budget: $${matter.budget.approved.toLocaleString("en-US")}. Actual fees: $${matter.budget.actual.toLocaleString("en-US")}.\n\n${matter.budget.phase}: $${matter.budget.phaseApproved.toLocaleString("en-US")} approved; $${matter.budget.phaseActual.toLocaleString("en-US")} actual.\n\nDocumented explanation: ${matter.budget.reason}`);
  document(matter.sources.closeout, matter.id, "Reviewed close-out", `${matter.client} · what changed and what happened`, matter.closeDate, matter.lead, `Initial view: ${matter.initial}\n\nWhat changed: ${matter.changed}\n\nResult: ${matter.outcome}\n\nTransfer limit: ${matter.limit}`);
  contexts[matter.id] = { label: "Completed matter", title: matter.client, reference: `${matter.number} · Closed ${matter.year}`, text: matter.issue, facts: [["Legal issue", matter.legalIssue], ["The firm’s argument", matter.motion.argument], ["Recorded motion result", `${matter.motion.result}. ${matter.motion.court}`], ["Partner review", matter.motion.review], ["Initial assessment", matter.initial], ["Result and limits", matter.outcome], ["Reuse limit", matter.limit], ["Lead / reviewer", matter.lead], ["Contributor", `${matter.author} · ${matter.role}`], ["Budget / actual fees", `$${matter.budget.approved.toLocaleString("en-US")} / $${matter.budget.actual.toLocaleString("en-US")}`], ["Documented cost explanation", matter.budget.reason]], access: { kind: "partner-matter-access", label: "Fictional partner access · source documents retain their matter context" } };
}

document("NS-INSTRUCTIONS", "northstar", "Client instructions", "Northstar · agreed starting position", "2026-10-19", "Margaret Whitfield · client call record", `${currentMatter.instruction}\n\n${currentMatter.established}`, "current-matter");
document("NS-ASSIGNMENT", "northstar", "Approved assignment", "Avery’s Northstar assignment", "2026-10-20", "Margaret Whitfield", currentMatter.assignment, "current-matter");
document("NS-CHRONOLOGY", "northstar", "Working matter chronology", "Northstar · received materials and unresolved facts", "2026-10-20", "Avery Ross", `${currentMatter.established}\n\n${currentMatter.originalAssumption}\n\nThe team has not established liability, records control or a filing recommendation.`, "current-matter");
document("NS-EMAIL-22", "northstar", "Client email", "Former facilities manager may hold the reports", "2026-10-22", "Fictional Northstar client contact", currentMatter.newInformation, "current-matter");
document("NS-REVIEW", "northstar", "Partner review of handoff revision 1", "Sofia’s review · distinguish assumption from evidence", "2026-10-22", "Sofia Patel", "State the current custodian assumption as unverified. Explain what the new client email changes. Separate client instructions, received materials, working interpretations and decisions that still require my review.", "current-matter");
document("PRACTICE-07", "practice", "Published practice note", "Records control and focused production requests", "2026-09-03", "Sofia Patel · Litigation Practice Group", "Map each proposed request to a disputed issue, supporting material and an identified custodian. Distinguish an inference from evidence of control. Preserve the client’s instructions and the limits of the available record. This reviewed practice note provides a method; current legal requirements and legal authorities need separate attorney verification.", "published");
document("HARBOR-SHARED-REVIEW", "northstar", "Explicitly shared review excerpt", "Avery’s Harbor draft · Sofia’s shared review", "2026-10-20", "Sofia Patel", "For Avery’s Northstar assignment, Sofia shared the review of his Harbor draft: identify the custodian, connect each request to a disputed issue and supporting exhibit, and keep an unsupported other-project request separate. This excerpt is permitted for this assignment; it does not grant access to Harbor’s full file.", "explicit-share");
contexts.discovery = { label: "Current matter", title: currentMatter.client, reference: `${currentMatter.number} · ${currentMatter.title} · As of October 23, 2026`, text: currentMatter.instruction, facts: [["Matter lead", currentMatter.lead], ["Assigned associate", currentMatter.associate], ["Reviewer", currentMatter.reviewer], ["Assignment", currentMatter.assignment], ["Working assumption", currentMatter.originalAssumption], ["Latest client information", currentMatter.newInformation], ["Pending decisions", currentMatter.pending]], access: { kind: "current-matter", label: "Assigned Northstar matter team" } };
export const legalContexts = contexts;
export const handoffSources = ["discovery", "NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "NS-EMAIL-22", "NS-REVIEW", "PRACTICE-07", "HARBOR-SHARED-REVIEW"];
export function resolveLegalSource(phase, key) {
  if (!Object.hasOwn(legalStories, phase) || !Object.hasOwn(legalContexts, key)) return null;
  return phase === "deliver" && !handoffSources.includes(key) ? null : key;
}

export const legalStories = {
  scope: {
    label: "Similar matters", thread: "Comparable matters", person: "Margaret Whitfield", role: "Partner", initials: "MW",
    prompt: "For Northstar’s construction dispute, where have we dealt with similar inspection-record issues? Show me the arguments and what changed our approach.",
    answer: "Three matters address different parts of that question. Harbor linked inspection reports to specific defects, but did not support its broader other-project request. Cedar Ridge used a missing-document schedule and obtained production before the hearing. Briar Glen relied on an unproven assumption about the respondent’s control of records. The drafts, decision records and partner review show what mattered in each.",
    answerDuration: 2400, artifact: "legal-comparison", artifactAt: legalTiming.scope.artifact, artifactUntil: legalTiming.scope.firstReady, duration: legalTiming.scope.end,
    commands: [{ typingAt: legalTiming.scope.typing, sentAt: legalTiming.scope.sent, answerAt: legalTiming.scope.answer, answerDuration: 2000, artifact: "legal-questions", artifactAt: legalTiming.scope.nextArtifact, prompt: "What should we carry into Northstar’s motion assessment, and what still needs evidence?", answer: "Carry Harbor’s issue-and-exhibit mapping, Cedar Ridge’s missing-record schedule and Briar Glen’s distinction between a contractor’s role and evidence of records control. For Northstar, identify the missing reports, connect each request to a disputed issue and establish the custodian evidence. Those steps support a motion assessment; they do not establish the underlying defect claim or approve a filing." }],
    activity: [[0, "Connecting the matter records and reviewed source material"]],
    summary: "Three fictional matters connect legal issues, the firm’s arguments, disposition records and partner review to the evidence Northstar still needs. People and economics remain in supporting matter records.",
  },
  plan: {
    label: "Motion history", thread: "Arguments and review", person: "Margaret Whitfield", role: "Partner", initials: "MW",
    prompt: "How did our motions to compel production go in those matters? Show what we argued, what the court decided and the partner’s review.",
    answer: "The results differ: Harbor was granted in part, Cedar Ridge was withdrawn after production, and Briar Glen was denied without prejudice. I’ve kept the requested relief, the decision record and the partner’s interpretation separate. Cedar Ridge is not a court win; none of these records predicts Northstar’s outcome.",
    answerDuration: 2200, artifact: "legal-motions", artifactAt: legalTiming.plan.artifact, artifactUntil: legalTiming.plan.firstReady, duration: legalTiming.plan.end,
    commands: [{ typingAt: legalTiming.plan.typing, sentAt: legalTiming.plan.sent, answerAt: legalTiming.plan.answer, answerDuration: 1800, artifact: "legal-review", artifactAt: legalTiming.plan.nextArtifact, prompt: "What changed between Harbor’s first draft and the reviewed version, and what matters for Northstar?", answer: "Sofia’s review asked Avery to establish the custodian and tie each request to an issue and exhibit. The revised draft focused the inspection-report request and separated the other-project request. The order still refused that broader request. For Northstar, confirming records control is the next evidence question; the reviewer must decide what the current record supports." }],
    activity: [[0, "Tracing arguments, decision records and partner observations"]],
    summary: "The motion history distinguishes court reasoning, a withdrawal after production, partner review and the limits of applying that experience to Northstar.",
  },
  deliver: {
    label: "Handoff", thread: "Matter handoff", person: "Avery Ross", role: "Associate", initials: "AR", threads: ["deliver"],
    prompt: "I’m joining Northstar. What has been decided, what is still open, and what am I responsible for?",
    answer: "Margaret assigned you an internal assessment of a possible motion to compel production and an evidence map for Sofia’s review. The client wants a targeted records approach with limited operational disruption. The file contains the agreement, chronology and photographs; it does not establish liability or who controls the missing reports. Sofia has shared a Harbor review excerpt and the published practice note for this assignment.",
    answerDuration: 2300, artifact: "legal-handoff", artifactAt: legalTiming.deliver.artifact, artifactUntil: legalTiming.deliver.firstReady, duration: legalTiming.deliver.end,
    commands: [{ typingAt: legalTiming.deliver.typing, sentAt: legalTiming.deliver.sent, answerAt: legalTiming.deliver.answer, answerDuration: 2300, artifact: "legal-handoff-revised", artifactAt: legalTiming.deliver.nextArtifact, prompt: "Prepare the assessment and evidence map using our Litigation Matter Brief template. Include Sofia’s feedback and the latest client email.", answer: "I’ve used the firm’s Litigation Matter Brief format and letterhead. Revision 2 retains the earlier custodian assumption, adds the October 22 email and explains the response to Sofia’s feedback. The evidence map separates the record from proposed work. The Word draft is ready for Sofia’s review. No filing, budget change or change to client instructions has been approved." }],
    activity: [[0, "Grounding the handoff in the approved assignment and permitted sources"]],
    summary: "The handoff keeps client instructions, evidence, an earlier assumption, new correspondence, review reasoning and pending decisions distinct. The sources retain their access boundaries.",
  },
};

export const matterBriefRevisions = [
  { revision: 1, sourceIds: ["NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "PRACTICE-07", "HARBOR-SHARED-REVIEW"], custodian: currentMatter.originalAssumption },
  { revision: 2, sourceIds: ["NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "NS-EMAIL-22", "NS-REVIEW", "PRACTICE-07", "HARBOR-SHARED-REVIEW"], custodian: currentMatter.newInformation, interpretation: currentMatter.interpretation, status: "For Sofia’s review" },
];

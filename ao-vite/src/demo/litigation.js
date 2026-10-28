// Fictional records, not actual client work or records of Hellmuth & Johnson.
export const legalTiming = {
  scope: { artifact: 4000, firstReady: 16800, ready: 16800, end: 23200 },
  reasoning: { artifact: 3900, firstReady: 13200, typing: 15100, sent: 18400, answer: 18600, nextArtifact: 21300, ready: 30100, end: 36500 },
  deliver: { artifact: 3500, firstReady: 12900, updateAt: 15500, updateArtifact: 18100, updateReady: 23600, reviseTyping: 25800, reviseSent: 29400, reviseAnswer: 29600, nextArtifact: 32200, ready: 47200, end: 54400 },
};
export const priorMatters = [
  {
    id: "harbor", number: "HG-21-041", client: "Harbor Point Owners", year: "2023", fictional: true,
    issue: "Recurring water intrusion after repairs; responsibility disputed between roofing and facade trades.",
    legalIssue: "What the repair history and engineering evidence established",
    precedentSummary: "The first assessment favored a roofing claim. Later engineering separated roof defects from facade interfaces, and an earlier patch did not explain every leak. The matter settled after that investigation, without a liability finding.",
    northstarQuestion: "Do the earlier repair and current leaks concern the same defect?",
    northstarApplication: "Compare locations, repair scope and the engineering record before treating Northstar’s September recurrence as a new event.",
    lead: "Sofia Patel", author: "Avery Ross", role: "Prepared the chronology, production requests and motion outline",
    initial: "The team initially treated the roof as the principal cause and the earlier patch as a completed repair. The first collection was expected to provide a sufficient chronology.",
    changed: "Engineering evidence identified separate roof and facade issues. A custodian interview located a second archive with post-repair leakage reports. The team revised its causation analysis and expanded the collection.",
    outcome: "Resolved at mediation after additional engineering and records work. The settlement did not establish liability or when an injury was discovered.",
    budget: { approved: 90000, actual: 112500, phase: "Document discovery", phaseApproved: 30000, phaseActual: 49500, reason: "Time narratives and Sofia’s reviewed closeout attribute the additional discovery work to a second archive, repeat collection and reconciliation of the repair chronology." },
    motion: {
      result: "Granted in part", kind: "Court order", date: "2023-04-17",
      argument: "Identified inspection reports were connected to east-elevation defects and a defined work period. The separate other-project request lacked a supported connection to those defects.",
      recordPoint: "The identified reports were ordered produced; the broader request was refused. Liability was not decided.",
      requested: "Identified inspection reports and other-project inspection files.",
      court: "The order required the identified reports and refused the unsupported other-project request. It did not decide liability or a limitations defense.",
      v1: "Requested six years of records and other-project files. It assumed records control from the contractor’s role and did not connect every request to a disputed defect.",
      v2: "Linked the inspection reports to east-elevation defects, the work period and exhibits. The broader request remained separate, with its evidentiary limits stated.",
      review: "Sofia required evidence of records control and an issue-by-issue exhibit map. She also challenged the assumption that a completed patch meant the underlying water problem had ended.",
      lesson: "Establish the repair chronology and records control before expanding a request or carrying an earlier assessment forward.",
    },
    limit: "Partial production relief did not decide liability. A repaired roof and a later leak do not establish the same defect or a new injury.", closeDate: "2023-09-22",
  },
  {
    id: "cedar", number: "CR-22-018", client: "Cedar Ridge Logistics", year: "2024", fictional: true,
    issue: "Distribution-building moisture; competing explanations included installation defects and operating conditions.",
    legalIssue: "Similar symptoms with a different evidentiary explanation",
    precedentSummary: "Operating logs let the engineer test competing causes. A focused request obtained the missing reports before the hearing. The motion was withdrawn; there was no merits ruling.",
    northstarQuestion: "Could operating conditions explain any of the moisture?",
    northstarApplication: "Test alternatives against engineering evidence. Cedar Ridge’s complete inventory cannot be assumed for Northstar.",
    lead: "Jordan Hale", author: "Daniel Okafor", role: "Prepared the inventory and evidence schedule",
    initial: "The client attributed all moisture to defects. The team kept causation open pending operating logs and engineering review.",
    changed: "The engineer separated operational condensation from the alleged installation defects. A targeted request resolved the production gap before the hearing.",
    outcome: "Settled after the engineering report. No merits ruling established the cause of every moisture event.",
    budget: { approved: 100000, actual: 97000, phase: "Document discovery", phaseApproved: 31000, phaseActual: 28000, reason: "The existing inventory limited repeat collection. Jordan’s closeout credited the inventory and voluntary production, rather than a court victory." },
    motion: {
      result: "Withdrawn after production", kind: "Withdrawal notice", date: "2024-03-11",
      argument: "A missing-document schedule identified the inspection and completion reports sought. An established inventory allowed the team to verify the response.",
      recordPoint: "The reports were produced before the hearing. The motion was withdrawn without a merits ruling.",
      requested: "The reports identified in the missing-document schedule.",
      court: "No merits ruling. The withdrawal notice records production before the hearing.",
      v1: "Outlined a motion while the team checked which reports were missing.",
      v2: "Used the verified schedule to obtain production before the hearing.",
      review: "Jordan recorded that the inventory and named contact made the request practical. This is not evidence that the motion would have succeeded.",
      lesson: "Investigate competing causes and use the inventory before expanding the dispute.",
    },
    limit: "Northstar lacks Cedar Ridge’s complete inventory. Similar moisture does not establish the same cause or effort requirement.", closeDate: "2024-08-16",
  },
  {
    id: "briar", number: "BG-23-067", client: "Briar Glen Properties", year: "2025", fictional: true,
    issue: "Building-envelope claim with earlier complaints located in an owner-side archive.",
    legalIssue: "An earlier complaint changed the chronology assessment",
    precedentSummary: "An archived complaint challenged the initial chronology. The team investigated what had been known and repaired. Its production motion had failed to establish who controlled the reports.",
    northstarQuestion: "What was known after the earlier repair, and who can establish it?",
    northstarApplication: "An earlier complaint is not proof of the same injury. Investigate the reports and witness account before revising the legal position.",
    lead: "Sofia Patel", author: "Lena Ortiz", role: "Prepared the assessment and custodian investigation",
    initial: "The assessment used the client’s first reported recurrence as the starting chronology and assumed the contractor controlled the reports.",
    changed: "The owner-side archive held an earlier unresolved complaint. Sofia required a revised chronology and analysis of what the client knew, without treating the email as resolving a time-bar defense.",
    outcome: "A negotiated resolution followed further records work. No court finding established the legal effect of the earlier complaint.",
    budget: { approved: 120000, actual: 132000, phase: "Document discovery", phaseApproved: 36000, phaseActual: 48000, reason: "The reviewed closeout links added discovery effort to finding the owner archive and reconstructing the complaint and repair history." },
    motion: {
      result: "Denied without prejudice", kind: "Court order", date: "2025-02-10",
      argument: "The request assumed contractor control from its contractual role. The submitted record did not support that assumption.",
      recordPoint: "Relief was denied without prejudice for insufficient evidence of control, not on the defect allegations.",
      requested: "Inspection reports assumed to be held by the contractor.",
      court: "The record did not establish the respondent’s control. The order did not decide the defect allegations.",
      v1: "Relied on the contractor’s role to assume records control.",
      v2: "Separated contractual responsibility from records control and investigated the owner-side archive.",
      review: "Sofia required the chronology and control assumptions to be tested against underlying evidence before a recommendation advanced.",
      lesson: "An earlier complaint is a reason to investigate the assessment, not a substitute for the investigation.",
    },
    limit: "The order is not a general rule that comparable requests fail. The complaint did not itself determine a legal deadline.", closeDate: "2025-10-03",
  },
];
export const currentMatter = {
  id: "northstar", number: "NS-26-014", client: "Northstar Foods", fictional: true,
  title: "Distribution-center water intrusion", asOf: "2026-10-23",
  lead: "Margaret Whitfield", recipient: "Northstar matter team",
  instruction: "Northstar owns the distribution center. It wants a recovery strategy for recurring water intrusion while keeping the loading operation running. Establish the evidence and options before committing to broader litigation work.",
  established: "The agreement, September 2026 photographs and client chronology are available. A May 2023 invoice records a patch near loading bay 4. The client chronology describes no further leak there until September 2026; that account has not been independently verified.",
  assignment: "Develop the initial assessment: responsibility, repair history, timing issues, evidence gaps and recommended investigation. Apply reviewed firm experience and retain the basis for the recommendation.",
  originalAssumption: "The May 2023 patch was understood to have resolved the earlier leakage. Revision 1 treated the September 2026 recurrence as potentially distinct, subject to checking the repair history and engineering evidence.",
  newInformation: "The client forwarded a November 3, 2023 email reporting that loading bay 4 was leaking again after the patch. Its maintenance attachment records repeated visits. Neither item establishes whether the 2023 and 2026 events share a cause or when a legal claim accrued.",
  interpretation: "The resolved-repair account is no longer supported. Prioritize a verified chronology, the original inspection reports and engineering comparison of the leak locations before settling the litigation approach.",
  pending: "Margaret must review the revised assessment and authorize the proposed investigation. No motion has been approved for filing and no revised client instruction is recorded.",
  questions: ["Do the 2023 and 2026 leaks share a cause?", "What did the client know after the patch?", "Who holds the inspection reports, and what would a focused request establish?"],
};
const contexts = {};
function document(id, matter, label, title, date, author, text, access = "partner-matter-access", extra = {}) {
  contexts[id] = { label, title, reference: `${id} · ${date} · ${author}`, date, author, matter, text, access: { kind: access, label: access === "published" ? "Reviewed practice guidance · litigation team" : access === "explicit-share" ? "Reviewed excerpt authorized for Northstar; underlying files retain their access restrictions" : access === "current-matter" ? "Northstar matter access" : "Demonstration assumes Margaret has authorized access to this prior matter" }, facts: [["Record type", label], ["Author / owner", author], ["Date", date], ["Use", "Fictional internal record, not legal authority or an actual filing"]], ...extra };
}
for (const matter of priorMatters) {
  const prefix = matter.number;
  matter.sources = { assessment: `${prefix}-ECA`, brief: `${prefix}-BRIEF`, decision: `${prefix}-DECISION`, review: `${prefix}-REVIEW`, cost: `${prefix}-COST`, closeout: `${prefix}-CLOSE` };
  document(matter.sources.assessment, matter.id, "Initial assessment", `${matter.client} · initial assessment`, `${Number(matter.year) - 1}-11-02`, matter.lead, `${matter.issue}\n\nIssue: ${matter.legalIssue}.\n\n${matter.initial} This was the team’s view at the time, not a later-established fact.`);
  document(matter.sources.brief, matter.id, "Motion drafts", `${matter.client} · argument and revision`, matter.motion.date, matter.author, `Requested relief: ${matter.motion.requested}\n\nArgument: ${matter.motion.argument}\n\nDraft 1: ${matter.motion.v1}\n\nReviewed draft: ${matter.motion.v2}`);
  document(matter.sources.decision, matter.id, matter.motion.kind, `${matter.client} · ${matter.motion.result.toLowerCase()}`, matter.motion.date, matter.motion.kind === "Court order" ? "Fictional court record" : matter.lead, `${matter.motion.result}. ${matter.motion.court}`);
  document(matter.sources.review, matter.id, "Partner review", `${matter.client} · why the approach changed`, matter.closeDate, matter.lead, `${matter.motion.review}\n\nCarry forward: ${matter.motion.lesson}\n\nLimit: ${matter.limit}`);
  document(matter.sources.cost, matter.id, "Budget and actual fees", `${matter.client} · fees and documented explanation`, matter.closeDate, "Fictional billing record and reviewed closeout", `Approved matter budget: $${matter.budget.approved.toLocaleString("en-US")}. Actual fees: $${matter.budget.actual.toLocaleString("en-US")}.\n\n${matter.budget.phase}: $${matter.budget.phaseApproved.toLocaleString("en-US")} approved; $${matter.budget.phaseActual.toLocaleString("en-US")} actual.\n\nDocumented explanation: ${matter.budget.reason}`);
  document(matter.sources.closeout, matter.id, "Reviewed closeout", `${matter.client} · assessment against result`, matter.closeDate, matter.lead, `Initial view: ${matter.initial}\n\nWhat changed: ${matter.changed}\n\nResult: ${matter.outcome}\n\nReuse limit: ${matter.limit}`);
  contexts[matter.id] = { label: "Completed matter", title: matter.client, reference: `${matter.number} · Closed ${matter.year}`, text: matter.issue, facts: [["Legal issue", matter.legalIssue], ["Initial assessment", matter.initial], ["What changed", matter.changed], ["The firm’s argument", matter.motion.argument], ["Recorded motion result", `${matter.motion.result}. ${matter.motion.court}`], ["Partner review", matter.motion.review], ["Final result and limits", matter.outcome], ["Application to Northstar", matter.northstarApplication], ["Contributor", `${matter.author} · ${matter.role}`], ["Budget / actual fees", `$${matter.budget.approved.toLocaleString("en-US")} / $${matter.budget.actual.toLocaleString("en-US")}`], ["Documented cost explanation", matter.budget.reason]], access: { kind: "partner-matter-access", label: "Authorized access assumed for this fictional demonstration" } };
}
document("NS-INSTRUCTIONS", "northstar", "Client instructions", "Northstar · objectives and agreed approach", "2026-10-19", "Margaret Whitfield · client call", currentMatter.instruction, "current-matter");
document("NS-ASSIGNMENT", "northstar", "Assessment remit", "Northstar · assessment questions", "2026-10-20", currentMatter.lead, currentMatter.assignment, "current-matter");
document("NS-CHRONOLOGY", "northstar", "Initial chronology", "Northstar · chronology available to revision 1", "2026-10-20", currentMatter.lead, `${currentMatter.established}\n\n${currentMatter.originalAssumption}\n\nThis chronology reflects the materials received at that time.`, "current-matter");
document("NS-CONTRACT", "northstar", "Agreement and invoice", "Northstar · agreement and repair invoice", "2026-10-19", "Client-supplied matter documents", "The agreement identifies the contracting parties and work scope. The May 2023 invoice records a patch near loading bay 4. Neither document proves the cause of the current intrusion or that the repair resolved it.", "current-matter");
document("NS-EMAIL-22", "northstar", "Client correspondence", "Northstar · forwarded post-repair leakage email", "2026-10-22", "Alex Morgan · Northstar Operations", currentMatter.newInformation, "current-matter", { receivedAt: "2026-10-22T09:12:00-05:00", originalDate: "2023-11-03", facts: [["Received", "October 22, 2026 · 09:12"], ["Original message", "November 3, 2023 · Facilities manager to contractor"], ["Extract", "Loading bay 4 leaked again during last night’s rain. The patch has not stopped it. Please confirm when the engineer will inspect."], ["Limit", "Cause, completeness and legal effect require investigation."]] });
document("NS-LOG-22", "northstar", "Email attachment", "Northstar · 2023 maintenance log", "2026-10-22", "Northstar Facilities · supplied by Alex Morgan", "The attachment records visits near loading bay 4 on June 14, September 6 and November 3, 2023, including water checks and temporary sealing. It does not identify the technical cause or establish the full repair history.", "current-matter", { originalDate: "2023-11-03", receivedAt: "2026-10-22T09:12:00-05:00" });
document("NS-REVISION-2", "northstar", "Assessment revision record", "Northstar · instruction and revision history", "2026-10-23", currentMatter.lead, "Margaret directed the assessment revision using the forwarded email and maintenance log. Retain revision 1 and explain the changed chronology, unanswered causation question and revised investigation. The generated assessment remains for Margaret’s review.", "current-matter");
document("PRACTICE-07", "practice", "Reviewed practice note", "Construction disputes · assessment and evidence standard", "2026-09-03", "Litigation Practice Group", "Separate the client’s account from verified evidence. Record repair dates, competing causes, contract terms and the basis for each recommendation. Link production requests to disputed issues, exhibits and evidence of records control. Applicable authorities and deadlines require attorney verification.", "published");
document("HARBOR-SHARED-REVIEW", "northstar", "Permitted review excerpt", "Harbor · reviewed reasoning available to Northstar", "2026-10-20", "Sofia Patel", `${priorMatters[0].motion.review}\n\nThis excerpt is authorized for Northstar. It does not grant access to Harbor’s full file.`, "explicit-share");
document("HARBOR-SHARED-CLOSE", "northstar", "Permitted closeout excerpt", "Harbor · assessment and result available to Northstar", "2026-10-20", "Sofia Patel", `${priorMatters[0].initial}\n\n${priorMatters[0].changed}\n\n${priorMatters[0].outcome}\n\nReviewed excerpt authorized for Northstar; access to the underlying file is unchanged.`, "explicit-share");
document("BRIAR-SHARED-CLOSE", "northstar", "Permitted closeout excerpt", "Briar Glen · chronology lesson available to Northstar", "2026-10-20", "Sofia Patel", `${priorMatters[2].changed}\n\n${priorMatters[2].outcome}\n\n${priorMatters[2].limit}\n\nReviewed excerpt authorized for Northstar.`, "explicit-share");
contexts.discovery = { label: "Current matter", title: currentMatter.client, reference: `${currentMatter.number} · ${currentMatter.title} · October 23, 2026`, text: currentMatter.instruction, facts: [["Matter lead", currentMatter.lead], ["Assessment", currentMatter.assignment], ["Earlier view", currentMatter.originalAssumption], ["New evidence", currentMatter.newInformation], ["Recommended response", currentMatter.interpretation], ["Decision", currentMatter.pending]], access: { kind: "current-matter", label: "Authorized Northstar matter team" } };
export const legalContexts = contexts;
export const assessmentSources = ["discovery", "NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "NS-CONTRACT", "NS-EMAIL-22", "NS-LOG-22", "NS-REVISION-2", "PRACTICE-07", "HARBOR-SHARED-REVIEW", "HARBOR-SHARED-CLOSE", "BRIAR-SHARED-CLOSE"];
export function resolveLegalSource(phase, key) {
  if (!Object.hasOwn(legalStories, phase) || !Object.hasOwn(legalContexts, key)) return null;
  return phase === "deliver" && !assessmentSources.includes(key) ? null : key;
}
export const northstarUpdate = {
  id: "northstar-source-update", kind: "agent-event", agent: "AllianceOne",
  label: "New evidence · Northstar correspondence · October 22, 09:12",
  occurredAt: "2026-10-22T09:14:00-05:00", sourceIds: ["NS-EMAIL-22", "NS-LOG-22"], affectedRevision: 1,
  sentAt: legalTiming.deliver.updateAt, answerAt: legalTiming.deliver.updateAt, answerDuration: 2200,
  answer: "Northstar has forwarded a 2023 email and maintenance log describing leakage after the patch. That conflicts with revision 1’s repair history. The chronology, timing analysis and recommended investigation need review; the records do not establish whether the later leaks share a cause.",
  artifact: "legal-change", artifactAt: legalTiming.deliver.updateArtifact, artifactUntil: legalTiming.deliver.updateReady,
};
export const legalStories = {
  scope: {
    label: "Relevant firm experience", thread: "Prior matter experience", actor: currentMatter.lead,
    prompt: "Northstar has recurring water intrusion at its distribution center. Which of our past matters should inform the assessment, and what did we learn?",
    answer: "Harbor, Cedar Ridge and Briar Glen answer different questions: whether a repair resolved the problem, whether similar symptoms shared a cause, and what an earlier complaint changed. I’ve connected the initial views, later evidence and recorded outcomes.",
    answerDuration: 2100, artifact: "legal-comparison", artifactAt: legalTiming.scope.artifact, artifactUntil: legalTiming.scope.firstReady, duration: legalTiming.scope.end,
    commands: [], activity: [[0, "Comparing assessments, review and outcomes"]],
    summary: "Three prior matters show different reasoning, evidence and outcomes, with specific questions for Northstar.",
  },
  reasoning: {
    label: "Reasoning applied to current work", thread: "Assessment and approach", actor: currentMatter.lead,
    prompt: "What did Harbor’s initial assessment miss, and how did the later evidence change the approach?",
    answer: "The team treated the patch as a completed repair. Later records and engineering evidence challenged that view. Sofia’s closeout connects the revised causation analysis, additional discovery and eventual settlement; it does not claim the motion decided liability.",
    answerDuration: 2100, artifact: "legal-reasoning", artifactAt: legalTiming.reasoning.artifact, artifactUntil: legalTiming.reasoning.firstReady, duration: legalTiming.reasoning.end,
    commands: [{ typingAt: legalTiming.reasoning.typing, sentAt: legalTiming.reasoning.sent, answerAt: legalTiming.reasoning.answer, answerDuration: 2300, artifact: "legal-review", artifactAt: legalTiming.reasoning.nextArtifact, artifactUntil: legalTiming.reasoning.ready,
      prompt: "What supported Harbor’s production motion, and what should we establish before taking that approach for Northstar?",
      answer: "The identified reports were tied to defects and exhibits. That supported a partial production order; the other-project request was refused. For Northstar, verify the repair chronology, compare leak locations and establish who controls the reports before defining the request.",
    }], activity: [[0, "Tracing Harbor’s assessment through evidence and review"]],
    summary: "Harbor’s initial view, later evidence, motion outcome and documented effort inform Northstar’s investigation.",
  },
  deliver: {
    label: "Assessment and new evidence", thread: "Northstar assessment", actor: currentMatter.lead,
    prompt: "Prepare Northstar’s initial assessment in our Litigation Matter Brief format. Apply the Harbor and Briar Glen lessons, and separate the evidence from what we still need to establish.",
    answer: "I’ll use the client’s objectives, agreement and current chronology, with the reviewed firm excerpts. The assessment will address responsibility, repair history, timing questions and the evidence needed to choose the next step.",
    answerDuration: 1700, artifact: "legal-assessment", artifactAt: legalTiming.deliver.artifact, artifactUntil: legalTiming.deliver.firstReady, duration: legalTiming.deliver.end,
    events: [northstarUpdate],
    commands: [{ typingAt: legalTiming.deliver.reviseTyping, sentAt: legalTiming.deliver.reviseSent, answerAt: legalTiming.deliver.reviseAnswer, answerDuration: 2200, artifact: "legal-assessment-revised", artifactAt: legalTiming.deliver.nextArtifact, artifactUntil: legalTiming.deliver.ready,
      prompt: "Revise the assessment. Prioritize the earlier repair history and engineering comparison before a production motion. Keep the original view and explain why our recommendation changed.",
      answer: "Revision 2 replaces the resolved-repair assumption with the documented recurrence. It makes chronology and engineering comparison the first work to authorize. Revision 1, the new sources and your instruction remain linked to the change; the legal effect is still an open question.",
    }], activity: [[0, "Applying the assessment standard and reviewed experience"], [legalTiming.deliver.updateAt, "Checking new evidence against the assessment"]],
    summary: "Margaret applies firm experience to a letterhead assessment, examines new evidence and directs a revision that retains the original reasoning.",
  },
};
export const matterBriefRevisions = [
  { revision: 1, sourceIds: ["NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "NS-CONTRACT", "PRACTICE-07", "HARBOR-SHARED-REVIEW", "HARBOR-SHARED-CLOSE", "BRIAR-SHARED-CLOSE"], assessment: currentMatter.originalAssumption },
  { revision: 2, sourceIds: ["NS-INSTRUCTIONS", "NS-ASSIGNMENT", "NS-CHRONOLOGY", "NS-CONTRACT", "PRACTICE-07", "HARBOR-SHARED-REVIEW", "HARBOR-SHARED-CLOSE", "BRIAR-SHARED-CLOSE", "NS-EMAIL-22", "NS-LOG-22", "NS-REVISION-2"], assessment: currentMatter.interpretation, status: "For Margaret’s review" },
];

import { deliveryTiming, planTiming, scopeTiming } from "./demoPlayback.js";
import { planDeliverables, planMilestones, readbackPlan } from "./engagementPlan.js";
export { planDeliverables, planMilestones, readbackPlan };

// Fictional Northstar engagement. All actions and records are illustrated locally.
export const resources = [
  { name: "Margaret Whitfield", role: "Engagement lead", start: 1, end: 14, capacity: 35, hours: 172 },
  { name: "Sofia Patel", role: "Design lead · reviewer", start: 1, end: 10, capacity: 100, hours: 380 },
  { name: "Daniel Okafor", role: "Operating-model design", start: 3, end: 12, capacity: 80, hours: 316 },
  { name: "Jordan Hale", role: "Transition planning", start: 8, end: 14, capacity: 80, hours: 192 },
  { name: "Avery Ross", role: "Assessment · Harbor experience", start: 1, end: 14, capacity: 75, hours: 384, precedent: "harbor" },
  { name: "Lena Torres", role: "Regional validation · Meridian", start: 3, end: 12, capacity: 100, hours: 396, precedent: "meridian" },
];
export const effort = resources.reduce((sum, resource) => sum + resource.hours, 0);
export const staffingCandidates = resources.map((resource, index) => ({ ...resource,
  experience: ["Harbor sponsor decisions and board approval", "Reviewed Harbor evidence and Meridian ownership", "Harbor design options; Meridian governance", "Meridian mobilization roadmap and readiness", "Harbor decision inventory and evidence pack", "Meridian service-ownership matrix"][index],
  source: ["harbor", "harbor", "harbor", "meridian", "harbor", "meridian"][index],
  conditional: resource.name === "Daniel Okafor",
}));
export const assignment = { owner: "Avery Ross", reviewer: "Sofia Patel", effort: 36, due: "September 7", baseline: "Plan v1", deliverable: "Data-readiness assessment" };
// A separate fixture represents the application's response to the illustrated write.
export const readbackAssignment = readbackPlan.assignment;
export const readbackProject = { id: "PRJ-NS-20418", ...readbackPlan.project, deliverables: readbackPlan.deliverables.length, resources: readbackPlan.resources.length, status: "Scheduled" };
export const workstreams = [
  { name: "Diagnostic & evidence", weeks: "1–4", detail: "Hear West and Southeast early; review observed ownership before design.", source: "harbor" },
  { name: "Operating-model design", weeks: "3–8", detail: "Test design options against regional authority, service boundaries and handoffs.", source: "harbor" },
  { name: "Regional validation", weeks: "7–12", detail: "Record dated acknowledgment, named decision makers and unresolved exceptions.", source: "meridian" },
  { name: "Transition roadmap", weeks: "11–14", detail: "Define owners and readiness evidence for the board’s go/no-go decisions.", source: "meridian" },
];
export const approvedPlan = {
  project: { name: "Northstar Foods", manager: "Margaret Whitfield", opportunity: "OPP-20418", start: "August 17", finish: "November 20", effort, baseline: "Plan v1", proposal: "Proposal v5", fee: 400000, billing: "40 / 40 / 20", objective: "Decision ownership across eight regions; service maintained; November 20 board decision.", boundary: "Implementation excluded; West and Southeast evidence remains a client dependency." },
  resources,
  workstreams: workstreams.map(({ name, weeks }, index) => ({ id: `WS-0${index + 1}`, name, weeks })),
  deliverables: planDeliverables,
  milestones: planMilestones,
};
// Retained examples from the workflow prototype's delivery-experience records.
// Historical effort is not established by these excerpts; do not infer a quote.
export const historicalCases = [
  {
    id: "harbor", name: "Harbor Grain", reference: "EV-104",
    conditions: "Five-region operating-model redesign; conflicting decision ownership.",
    deliverables: [
      { id: "HG-D01", title: "Decision inventory & evidence pack", owner: "Avery Ross", format: "Excel", reviewer: "Sofia Patel", accepted: "April 25, 2025" },
      { id: "HG-D02", title: "Operating-model options & escalation design", owner: "Daniel Okafor", format: "PowerPoint", reviewer: "Sofia Patel", accepted: "May 23, 2025" },
      { id: "HG-D03", title: "Sponsor decision & board approval record", owner: "Margaret Whitfield", format: "Word", reviewer: "Harbor COO", accepted: "May 23, 2025" },
    ],
    review: "Sofia’s review separated observed owners from proposed design and required source dates and unresolved exceptions. Regional challenges changed Daniel’s design.",
    reviewSummary: "Observed and proposed owners separated; source dates retained. Regional challenges changed the escalation design.",
    submitted: "HG-D01 v1 combined current and proposed owners; source references were incomplete.",
    acceptedChange: "Sofia’s accepted v2 separated observed ownership from design and retained sources, dates and disputes.",
    northstarAction: "Hear West and Southeast during diagnosis. Give Avery the evidence pack, with Sofia reviewing before design.",
    outcome: "Board approved; one week late after regional validation caused another design pass.",
    carry: "Avery’s evidence gate and early regional input before design.",
    limit: "Northstar has eight regions and a fixed board date. Harbor’s closing record does not establish Northstar’s effort.",
  },
  {
    id: "meridian", name: "Meridian Components", reference: "EV-087",
    conditions: "Six-region transition with a different sponsor and decision structure.",
    deliverables: [
      { id: "MC-D01", title: "Service-ownership matrix", owner: "Lena Torres", format: "Excel", reviewer: "Sofia Patel", accepted: "October 10, 2025" },
      { id: "MC-D02", title: "Mobilization roadmap & readiness checklist", owner: "Jordan Hale", format: "PowerPoint", reviewer: "Margaret Whitfield", accepted: "October 24, 2025" },
      { id: "MC-D03", title: "Regional validation & governance record", owner: "Daniel Okafor", format: "Word", reviewer: "Sofia Patel", accepted: "October 17, 2025" },
    ],
    review: "Reviews added explicit service boundaries, dated regional acknowledgment, and readiness evidence for each mobilization decision.",
    reviewSummary: "Explicit boundaries and dated owner acknowledgment added; readiness tied to evidence and go/no-go decisions.",
    submitted: "MC-D01 v1 treated proposed owners as confirmed; MC-D02 equated completed activities with readiness.",
    acceptedChange: "Reviews added dated owner responses, explicit handoffs and evidence for each go/no-go decision.",
    northstarAction: "Use Lena for regional acknowledgment and Jordan for readiness conditions. Keep implementation outside this scope.",
    outcome: "Model and transition plan delivered on time; subsequent review recorded slower adoption.",
    carry: "Lena’s regional acknowledgment and Jordan’s readiness conditions.",
    limit: "The sponsor structure differs. Document acceptance did not establish adoption or a reusable staffing allocation.",
  },
];
export const stories = {
  scope: {
    label: "Scope", thread: "Understanding the engagement", person: "Margaret Whitfield",
    prompt: "Where have we done similar work, and what should we carry into Northstar?",
    answer: "Harbor Grain is the closest match: regional leaders challenged ownership after design, causing rework and a one-week delay. Meridian’s on-time transition still saw slow adoption. For Northstar, I’d bring regional voices forward and require explicit ownership acknowledgment and readiness evidence.",
    answerDuration: 1900, artifact: "precedent", artifactAt: scopeTiming.precedentAt, artifactUntil: scopeTiming.historyFinished,
    duration: 31000,
    commands: [
      { typingAt: scopeTiming.commandAt, sentAt: scopeTiming.applyAt, answerAt: scopeTiming.responding, answerDuration: 1500, artifact: "scope", artifactAt: scopeTiming.draftAt, artifactUntil: scopeTiming.finished, prompt: "Use those lessons to draft Northstar’s scope and check who could staff it.", answer: "I’ll bring West and Southeast into diagnosis, put an evidence review before design, and make regional acknowledgment and readiness conditions explicit. That gives us the workstreams and review roles to test against a named team." },
      { typingAt: scopeTiming.staffingTyping, sentAt: scopeTiming.staffingAsked, answerAt: scopeTiming.staffingAnswer, answerDuration: 1700, artifact: "staffing", artifactAt: scopeTiming.staffingAt, artifactUntil: scopeTiming.staffingFinished, prompt: "Who from those engagements should we put forward, and are they available?", answer: "Avery fits the evidence work at 75%; Lena is available from Week 3 for regional ownership. Sofia can review through Week 10, Jordan joins for transition from Week 8, and Daniel’s earlier Week 3 release is conditional. I’d take this six-person allocation through feasibility review before committing proposal terms." },
    ],
    activity: [[0, "Connecting discovery with assignments, deliverables and retained reviews"], [3800, "Tracing Harbor’s late regional challenge and accepted evidence revision"], [7100, "Connecting Meridian’s review changes to its later adoption outcome"], [13800, "Applying the precedent to Northstar’s scope"], [22600, "Checking the proposed people against current availability"]],
    summary: "Harbor and Meridian’s client conditions, contributors, deliverables, review changes and outcomes shape Northstar’s scope and resource fit. Current availability is checked separately.",
  },
  plan: {
    label: "Plan", thread: "Engagement planning and staffing", person: "Margaret Whitfield",
    prompt: "Build the plan from Northstar’s accepted proposal and the team we scoped.",
    answer: "Proposal v5 is accepted; OPP-20418 is Won. Daniel’s Week 3 release is now confirmed. The team we evaluated during scoping carries forward, with Avery’s assessment and Sofia’s review connected to the diagnostic baseline.",
    artifact: "plan", artifactUntil: planTiming.reviewed,
    duration: 38000,
    commands: [{ typingAt: planTiming.commandAt, sentAt: planTiming.approved, answerAt: planTiming.responding, answerDuration: 1700, artifact: "commit", artifactAt: planTiming.submissionAt, prompt: "Approve plan v1 and submit the whole engagement plan to Project Operations.", answer: "I’m committing the four workstreams, all fourteen deliverables, their dates, dependencies and acceptance criteria, six resource bookings and four review gates. I’ll file the approved plan in SharePoint, then read every project record back against plan v1." }],
    activity: [[0, "Grounding the plan in the accepted proposal and reviewed resource basis"], [3500, "Sequencing the confirmed resource windows"], [8000, "Connecting assignments to review coverage"], [planTiming.reviewed, "Sofia reviewed the complete plan v1 · ready for Margaret’s approval"], [planTiming.approved, "Margaret approved and submitted the complete plan"], [planTiming.verified, "The complete PSA readback matches approved plan v1"]],
    summary: "The complete Northstar plan is committed to Dynamics 365 Project Operations: four workstreams, fourteen deliverables, six resource bookings and four review gates. The returned records match approved plan v1.",
  },
  deliver: {
    label: "Deliver", thread: "Data-readiness assessment", person: "Avery Ross",
    threads: ["deliver"],
    prompt: "What am I delivering for Northstar, and what does it need to establish?",
    answer: "You own the data-readiness assessment within Northstar’s decision-rights diagnostic. It must establish which evidence can support ownership and escalation findings before design, with the limits of each conclusion explicit.\n\nSix of eight regional extracts are received. Northeast ownership fields are incomplete, Central’s inventory is older, and West and Southeast are missing. Coverage, currency, completeness and traceability still need your assessment.",
    answerDuration: 1900, artifact: "assignment-brief", artifactAt: deliveryTiming.assignmentAt, artifactUntil: deliveryTiming.assignmentReady,
    duration: 43100,
    commands: [
      { typingAt: deliveryTiming.methodTyping, sentAt: deliveryTiming.methodAsked, answerAt: deliveryTiming.methodAnswer, answerDuration: 2200, prompt: "Which version of the ASG Data Readiness Assessment should I use, and what did Sofia challenge in my Harbor evidence pack?", answer: "Use the ASG Data Readiness Assessment (ASG DR01 v1.2) and its companion evidence workbook. Assess coverage, currency, completeness and traceability; link each conclusion to the operating decision it supports.\n\nIn Harbor HG-D01 v1, observed owners and proposed future owners were combined, and some interview summaries lacked record references. Sofia’s accepted v2 required separate fields, a source and date for each material entry, and unresolved conflicts kept visible.\n\nApply that review to Northstar’s evidence: distinguish Northeast’s missing owners from Central’s older inventory, and leave the two absent regions outside an overall readiness conclusion.", sources: [{ key: "method", label: "ASG Data Readiness Assessment · v1.2" }, { key: "harbor", label: "Harbor · Sofia’s HG-D01 review" }] },
      { typingAt: deliveryTiming.draftTyping, sentAt: deliveryTiming.draftAsked, answerAt: deliveryTiming.draftAnswer, answerDuration: 1300, artifact: "assessment-draft", artifactAt: deliveryTiming.draftAt, artifactUntil: deliveryTiming.draftReady, prompt: "Draft Northstar’s report using the ASG Data Readiness Assessment. Apply Sofia’s review and keep the evidence limits explicit.", answer: "I’ll develop the report from your approved assignment and NS-DATA01, using ASG DR01 v1.2. The evidence register will keep source dates, observed ownership and unresolved conflicts alongside the findings. Sofia reviews the assessment before the diagnostic baseline." },
      { typingAt: deliveryTiming.sendTyping, sentAt: deliveryTiming.sentForReview, answerAt: deliveryTiming.sendAnswer, answerDuration: 1200, artifact: "assessment-review", artifactAt: deliveryTiming.reviewArtifactAt, artifactUntil: deliveryTiming.feedbackReceived, prompt: "Send this assessment and its supporting evidence to Sofia for review.", answer: "I’ve sent revision 1 and the Northstar evidence to Sofia. Her comments will stay linked to this exact draft and its approved assignment." },
      { typingAt: deliveryTiming.reviseTyping, sentAt: deliveryTiming.revising, answerAt: deliveryTiming.reviseAnswer, answerDuration: 1300, artifact: "assessment-revision", artifactAt: deliveryTiming.revisionArtifactAt, artifactUntil: deliveryTiming.approved, prompt: "Address Sofia’s feedback. Explain what each evidence gap means for design readiness.", answer: "I’ll distinguish Northeast’s missing owners from Central’s older inventory and keep West and Southeast outside a whole-client readiness conclusion. I’ll return revision 2 to Sofia with the revision rationale." },
      { typingAt: deliveryTiming.exportTyping, sentAt: deliveryTiming.exportStarted, answerAt: deliveryTiming.exportAnswer, answerDuration: 1200, artifact: "assessment-export", artifactAt: deliveryTiming.exportArtifactAt, prompt: "Export the approved revision as a Word document using ASG DR01.", answer: "Sofia approved revision 2. I’m exporting that exact version in ASG DR01 v1.2, with the approval, source evidence and revision history retained in Northstar’s engagement record." },
    ],
    activity: [[0, "Reading Avery’s committed assignment and client requirements"], [deliveryTiming.methodAsked, "Connecting ASG DR01 to Sofia’s retained Harbor review"], [deliveryTiming.draftAsked, "Applying Northstar’s evidence and ASG DR01"], [deliveryTiming.draftReady, "Avery’s draft is ready for review"], [deliveryTiming.sentForReview, "Avery requested review of revision 1"], [deliveryTiming.feedbackReceived, "Sofia asked what the evidence gaps prevent the team from concluding"], [deliveryTiming.revising, "Avery requested a revision addressing Sofia’s feedback"], [deliveryTiming.approved, "Sofia approved revision 2 for export"], [deliveryTiming.exportStarted, "Avery requested the approved Word export"]],
    summary: "Avery sent the assessment to Sofia, addressed her feedback, and received approval for revision 2. The finished Word document is available to download.",
  },
};

export const contexts = {
  method: {
    label: "Firm method and template", title: "ASG Data Readiness Assessment", reference: "ASG DR01 · Version 1.2 · Companion evidence workbook",
    text: "Test coverage, currency, completeness and traceability against the operating decisions the diagnostic must support. The report separates the evidence, practitioner assessment, limitations, approach and outstanding questions.",
    facts: [["Evidence register", "Record observed owners, source references, extract dates and unresolved conflicts."], ["Review standard", "Sofia reviews the reasoning, source-to-conclusion links and implications for design."], ["Client conclusions", "Northstar conclusions require Northstar evidence. A received file does not establish readiness."]],
  },
  "harbor-review": {
    label: "Relevant delivery review", title: "Sofia’s review of Avery’s Harbor evidence pack", reference: "HG-D01 · Accepted v2 · April 25, 2025 · Assignment-relevant excerpt",
    text: "Avery’s first version combined observed decision owners with proposed future owners. Some interview summaries had no underlying record reference. Sofia required those fields to be separated, with a source and date for each material entry and contradictory accounts left visible for a sponsor decision.",
    facts: [["Accepted revision", "V2 separated observed ownership from design proposals and retained source references, dates and disputes."], ["Northstar application", "Keep Northeast’s ownership gaps distinct from Central’s currency limits. Missing regions remain outside a whole-client conclusion."]],
  },
  "meridian-guidance": {
    label: "Relevant delivery method", title: "Regional ownership and service boundaries", reference: "Meridian · Reviewed service-ownership matrix excerpt",
    text: "Lena’s reviewed matrix makes service boundaries, handoffs and dated owner acknowledgment explicit. Use that standard to identify which Northstar decisions are affected by each evidence gap.",
    facts: [["Northstar application", "Trace missing ownership evidence to the affected service boundaries and design decisions."], ["Evidence limit", "A prior engagement’s accepted matrix does not verify Northstar’s owners or readiness."]],
  },
  harbor: {
    label: "Firm engagement record", title: "Harbor Grain", reference: "EV-104 · Assignment register, accepted deliverables, review revisions and closing report",
    text: historicalCases[0].conditions + " " + historicalCases[0].review,
    facts: [...historicalCases[0].deliverables.map(item => [item.id + " · " + item.format, `${item.title}. ${item.owner}; reviewed by ${item.reviewer}. Accepted v2: ${item.accepted}.`]), ["Outcome", historicalCases[0].outcome], ["Transfer limits", historicalCases[0].limit]],
    carry: [["Scope", "Regional voices and an evidence gate before design."], ["Plan", "Avery’s relevant experience informs the proposed assignment; Sofia reviews before the baseline."], ["Deliver", "The assessment retains observed owners, source dates, unresolved evidence and the reviewer’s rationale."]],
  },
  meridian: {
    label: "Firm engagement record", title: "Meridian Components", reference: "EV-087 · Assignment register, accepted deliverables, review revisions and delivery review",
    text: historicalCases[1].conditions + " " + historicalCases[1].review,
    facts: [...historicalCases[1].deliverables.map(item => [item.id + " · " + item.format, `${item.title}. ${item.owner}; reviewed by ${item.reviewer}. Accepted v2: ${item.accepted}.`]), ["Outcome", historicalCases[1].outcome], ["Transfer limits", historicalCases[1].limit]],
    carry: [["Scope", "Explicit service boundaries and transition-readiness criteria."], ["Plan", "Lena owns regional validation, with acknowledgment built into the plan."], ["Deliver", "The assessment identifies which decisions and service boundaries each evidence gap affects."]],
  },
  discovery: {
    label: "Client context", title: "Northstar Foods", reference: "Salesforce OPP-20418 · Sponsor discovery NS-D01",
    text: "Elena Vargas, Northstar’s COO, needs a board decision package by November 20. Clearer decision ownership is required across eight regions without disrupting normal service.",
    facts: [["Engagement manager", "Margaret Whitfield"], ["Open voices", "West and Southeast"], ["Boundary", "Implementation remains excluded"]],
  },
  availability: {
    label: "Current resource confirmation", title: "Capability and availability", reference: "Alicia’s confirmation · checked during pursuit",
    text: "Delivery experience supports fit; current availability is checked separately before proposal submission. These holds become bookings after acceptance and plan approval.",
    facts: [["Avery Ross", "Harbor evidence inventory · available at 75%"], ["Lena Torres", "Meridian ownership matrix · available from Week 3"], ["Daniel Okafor", "Conditionally held from Week 3 at 80%"], ["Reviewed basis", "Six people · 1,840 hours over fourteen weeks"]],
  },
  accepted: {
    label: "Accepted commitment", title: "Northstar proposal v5", reference: "Elena’s exact-version acceptance · OPP-20418 Won",
    text: "The proposed $420,000 fee followed a reviewed $248,140 internal cost basis and Finance’s 40% direct contribution assumption, before overhead. Elena negotiated $400,000 with 40/40/20 milestone billing. The full scope, fourteen weeks and 1,840 hours remain.",
    facts: [["Negotiated additions", "Named resources and explicit deliverable acceptance criteria"], ["Boundary", "Implementation excluded"], ["Planning basis", "Accepted proposal v5 retained as the commitment baseline"]],
  },
  assignment: {
    label: "Approved engagement plan", title: "Avery’s assessment assignment", reference: "Plan v1 · Data-readiness assessment",
    text: "The assignment carries forward the accepted scope and reviewed pursuit team. Sofia reviews before the diagnostic baseline. Margaret owns the later review gates after Sofia’s Week 10 release.",
    facts: [["Owner", assignment.owner], ["Effort", `${assignment.effort} hours`], ["Due", assignment.due], ["Reviewer", assignment.reviewer]],
  },
  evidence: {
    label: "Client evidence", title: "Northstar regional extracts", reference: "NS-DATA01 · Evidence register",
    text: "Six of eight regional extracts are available. Northeast decision-owner fields are incomplete. Central’s inventory is from the prior quarter. West and Southeast extracts remain outstanding. File receipt does not establish suitability for design decisions.",
    facts: [["Coverage", "6 of 8 regional extracts"], ["Ownership", "Northeast fields incomplete"], ["Currency", "Central inventory requires validation"], ["Outstanding", "West and Southeast"]],
  },
  record: {
    label: "Connected engagement record", title: "How the reasoning carries forward", reference: "Northstar · working record",
    text: "Sources, accepted commitments, assignments, review comments and revisions stay linked as the work develops. Practitioners remain responsible for the analysis and decisions.",
    carry: [["Harbor / Meridian", "People, deliverables, review changes and outcomes."], ["Northstar scope", "Evidence gates, boundaries and proposed resource fit."], ["Approved plan", "Avery’s assignment, Sofia’s review and confirmed resource windows."], ["Assessment revision", "Northstar evidence, Sofia’s challenge, Avery’s revision and rationale."]],
  },
};

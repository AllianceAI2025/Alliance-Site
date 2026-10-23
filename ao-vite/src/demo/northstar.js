import { deliveryTiming, planTiming, scopeTiming } from "./demoPlayback.js";

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
export const assignment = { owner: "Avery Ross", reviewer: "Sofia Patel", effort: 36, due: "September 7", baseline: "Plan v1", deliverable: "Data-readiness assessment" };
// A separate fixture represents the application's response to the illustrated write.
export const readbackAssignment = { id: "ASN-NS-DR01", owner: "Avery Ross", reviewer: "Sofia Patel", effort: 36, due: "September 7", baseline: "Plan v1" };
export const readbackProject = { id: "PRJ-NS-20418", name: "Northstar Foods", manager: "Margaret Whitfield", opportunity: "OPP-20418", start: "August 17", finish: "November 20", effort: 1840, deliverables: 14, resources: 6, baseline: "Plan v1", status: "Scheduled" };
export const workstreams = [
  { name: "Diagnostic & evidence", weeks: "1–4", detail: "Hear West and Southeast early; Sofia reviews observed ownership before design.", source: "harbor" },
  { name: "Operating-model design", weeks: "3–8", detail: "Test Daniel’s options against regional authority, service boundaries and handoffs.", source: "harbor" },
  { name: "Regional validation", weeks: "7–12", detail: "Lena records dated acknowledgment, named decision makers and unresolved exceptions.", source: "meridian" },
  { name: "Transition roadmap", weeks: "11–14", detail: "Jordan defines owners and readiness evidence for the board’s go/no-go decisions.", source: "meridian" },
];
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
    answerDuration: 1900, artifactAt: scopeTiming.precedentAt,
    duration: 22000,
    commands: [{ typingAt: scopeTiming.commandAt, sentAt: scopeTiming.applyAt, answerAt: scopeTiming.responding, answerDuration: 1500, prompt: "Use those lessons to draft Northstar’s scope and check who could staff it.", answer: "I’ll involve West and Southeast during diagnosis, place Sofia’s evidence review before design, and carry Meridian’s acknowledgment and readiness checks into the workstreams. Avery and Lena’s current windows support the proposed roles; Daniel’s Week 3 hold remains conditional." }],
    activity: [[0, "Connecting discovery with assignments, deliverables and retained reviews"], [3800, "Tracing Harbor’s late regional challenge and accepted evidence revision"], [5500, "Connecting Meridian’s review changes to its later adoption outcome"], [11800, "Applying the precedent to Northstar’s scope and proposed team"], [17400, "Checking current availability before proposal submission"]],
    summary: "Harbor and Meridian’s client conditions, contributors, deliverables, review changes and outcomes shape Northstar’s scope and resource fit. Current availability is checked separately.",
  },
  plan: {
    label: "Plan", thread: "Engagement planning and staffing", person: "Margaret Whitfield",
    prompt: "Build the plan from Northstar’s accepted proposal and the team we scoped.",
    answer: "Proposal v5 is accepted; OPP-20418 is Won. The reviewed team carries forward, with Avery’s assessment and Sofia’s review connected to the diagnostic baseline.",
    duration: 23000,
    commands: [{ typingAt: planTiming.commandAt, sentAt: planTiming.approved, answerAt: planTiming.responding, answerDuration: 1700, prompt: "Approve plan v1 and submit it to Project Operations.", answer: "I’m creating Northstar’s project, 14 deliverables and six resource assignments from approved plan v1. I’ll file the plan in SharePoint and read the project records back to verify the committed baseline." }],
    activity: [[0, "Grounding the plan in the accepted proposal and reviewed resource basis"], [3500, "Sequencing the confirmed resource windows"], [8000, "Connecting assignments to review coverage"], [10300, "Sofia reviewed plan v1 · ready for Margaret’s approval"], [15200, "Margaret approved plan v1 and requested submission to Project Operations"], [21100, "PSA readback matches the approved assignment"]],
    summary: "Project PRJ-NS-20418 created in Dynamics 365 Project Operations. The returned project and Avery’s assignment are available alongside the approved plan.",
  },
  deliver: {
    label: "Deliver", thread: "Data-readiness assessment", person: "Avery Ross",
    prompt: "Help me develop Northstar’s assessment using our relevant delivery experience.",
    answer: "Your approved assignment provides 36 hours, with Sofia reviewing. Harbor’s evidence standard and Meridian’s service boundaries will inform the assessment and its conclusions. Sofia reviews before the Word export.",
    duration: 29500,
    commands: [
      { typingAt: deliveryTiming.sendTyping, sentAt: deliveryTiming.sentForReview, answerAt: deliveryTiming.sendAnswer, answerDuration: 1200, prompt: "Send this assessment and its supporting evidence to Sofia for review.", answer: "I’ve sent revision 1 and the Northstar evidence to Sofia. Her comments will stay linked to this exact draft and its approved assignment." },
      { typingAt: deliveryTiming.reviseTyping, sentAt: deliveryTiming.revising, answerAt: deliveryTiming.reviseAnswer, answerDuration: 1300, prompt: "Address Sofia’s feedback. Explain what each evidence gap means for design readiness.", answer: "I’ll distinguish Northeast’s missing owners from Central’s older inventory and keep West and Southeast outside a whole-client readiness conclusion. I’ll return revision 2 to Sofia with the revision rationale." },
      { typingAt: deliveryTiming.exportTyping, sentAt: deliveryTiming.exportStarted, answerAt: deliveryTiming.exportAnswer, answerDuration: 1200, prompt: "Export the approved revision as a Word document using the firm template.", answer: "Sofia approved revision 2. I’m exporting that exact version in the firm’s Word template, with the approval, source evidence and revision history retained in Northstar’s engagement record." },
    ],
    activity: [[0, "Bringing forward Avery’s assignment, the firm template and retained reviews"], [3500, "Checking Northstar’s regional evidence"], [7700, "Avery’s draft is ready for review"], [10800, "Avery requested review of revision 1"], [13200, "Sofia asked what the evidence gaps prevent the team from concluding"], [16200, "Avery requested a revision addressing Sofia’s feedback"], [22000, "Sofia approved revision 2 for export"], [25500, "Avery requested the approved Word export"]],
    summary: "Avery sent the assessment to Sofia, addressed her feedback, and received approval for revision 2. The finished Word document is available to download.",
  },
};

export const contexts = {
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

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
export const readbackAssignment = { owner: "Avery Ross", reviewer: "Sofia Patel", effort: 36, due: "September 7", baseline: "Plan v1" };
export const workstreams = [
  { name: "Diagnostic & evidence", weeks: "1–4", detail: "Regional voices and observed ownership before design.", source: "harbor" },
  { name: "Operating-model design", weeks: "3–8", detail: "Decision rights, service boundaries and handoffs.", source: "meridian" },
  { name: "Regional validation", weeks: "7–12", detail: "Dated acknowledgment and unresolved sponsor decisions.", source: "meridian" },
  { name: "Transition roadmap", weeks: "11–14", detail: "Readiness criteria alongside the board decision package.", source: "meridian" },
];
export const stories = {
  scope: {
    label: "Scope", thread: "Understanding the engagement", person: "Margaret Whitfield",
    prompt: "Where have we done similar work, and what should we carry into Northstar?",
    answer: "Harbor’s evidence review and Meridian’s ownership work are relevant. I’m carrying their review guidance into the scope and checking the proposed team’s current availability.",
    duration: 14500,
    activity: [[0, "Connecting sponsor discovery with the firm’s engagement records"], [3000, "Applying Harbor’s evidence review"], [6000, "Carrying forward Meridian’s boundaries and handoffs"], [9000, "Checking current availability before proposal submission"]],
    summary: "Scope developed from Harbor and Meridian precedent, with proposed resource fit and current availability.",
  },
  plan: {
    label: "Plan", thread: "Engagement planning and staffing", person: "Margaret Whitfield",
    prompt: "Build the plan from Northstar’s accepted proposal and the team we scoped.",
    answer: "Proposal v5 is accepted; OPP-20418 is Won. The reviewed team carries forward, with Avery’s assessment and Sofia’s review connected to the diagnostic baseline.",
    duration: 21000,
    activity: [[0, "Grounding the plan in the accepted proposal and reviewed resource basis"], [3500, "Sequencing the confirmed resource windows"], [8000, "Connecting assignments to review coverage"], [10300, "Sofia reviewed plan v1 · ready for Margaret to approve and submit to PSA"], [15200, "Margaret submitted plan v1 to Dynamics 365 Project Operations"], [19100, "PSA readback matches the approved assignment"]],
    summary: "Plan submitted to Dynamics 365 Project Operations. PSA records compared with approved plan v1; readback results are available in the plan.",
  },
  deliver: {
    label: "Deliver", thread: "Data-readiness assessment", person: "Avery Ross",
    prompt: "Help me develop Northstar’s assessment using our relevant delivery experience.",
    answer: "Your approved assignment provides 36 hours, with Sofia reviewing. Harbor’s evidence standard and Meridian’s service boundaries will inform the assessment and its conclusions.",
    duration: 14500,
    activity: [[0, "Bringing forward Avery’s assignment, the firm template and retained reviews"], [3500, "Checking Northstar’s regional evidence"], [7000, "Applying Harbor and Meridian review guidance"], [10000, "Retaining Sofia’s feedback, Avery’s revision and the supporting evidence"]],
    summary: "Assessment revised in response to Sofia’s review, with Harbor and Meridian guidance and Northstar sources retained.",
  },
};

export const contexts = {
  harbor: {
    label: "Firm engagement record", title: "Harbor Grain", reference: "HG-D01 · Evidence inventory and review",
    text: "Avery prepared the evidence inventory. Sofia’s review required observed ownership to remain separate from proposed design, with source dates and ownership disputes retained. Late regional validation caused rework and a one-week delay.",
    facts: [["Prepared by", "Avery Ross"], ["Reviewed by", "Sofia Patel"], ["Outcome", "Rework and a one-week delay after late regional validation"]],
    carry: [["Scope", "Regional voices and an evidence gate before design."], ["Plan", "Avery’s relevant experience informs the proposed assignment; Sofia reviews before the baseline."], ["Deliver", "The assessment retains observed owners, source dates, unresolved evidence and the reviewer’s rationale."]],
  },
  meridian: {
    label: "Firm engagement record", title: "Meridian", reference: "MC-D01 · Service-ownership matrix and review",
    text: "Lena developed the six-region service-ownership matrix. Review clarified service boundaries, handoffs and dated regional acknowledgment. The model was delivered on time; adoption took longer than expected.",
    facts: [["Prepared by", "Lena Torres"], ["Review changed", "Service boundaries, handoffs and dated acknowledgment"], ["Outcome", "Delivered on time; adoption took longer than expected"]],
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

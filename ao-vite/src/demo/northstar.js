// A condensed version of the fictional Northstar story in the workflow prototype.
// No connector calls, client records, or AI requests are made by this demo.
export const resources = [
  { name: "Margaret Whitfield", role: "Engagement lead", start: 1, end: 14, capacity: 35, hours: 172, rate: 210 },
  { name: "Sofia Patel", role: "Design lead · reviewer", start: 1, end: 10, capacity: 100, hours: 380, rate: 170 },
  { name: "Daniel Okafor", role: "Operating-model design", start: 3, end: 12, capacity: 80, hours: 316, rate: 135 },
  { name: "Jordan Hale", role: "Transition planning", start: 8, end: 14, capacity: 80, hours: 192, rate: 130 },
  { name: "Avery Ross", role: "Diagnostic · data readiness", start: 1, end: 14, capacity: 75, hours: 384, rate: 115 },
  { name: "Lena Torres", role: "Regional validation", start: 3, end: 12, capacity: 100, hours: 396, rate: 90 },
];
export const effort = resources.reduce((total, person) => total + person.hours, 0);
export const directCost = resources.reduce((total, person) => total + person.hours * person.rate, 0);
export const streams = [
  { name: "Decision frame and diagnostic", weeks: "1–4", outcome: "Source-linked inventory of decisions, owners and evidence gaps." },
  { name: "Operating-model design", weeks: "3–8", outcome: "Decision rights, governance cadence and regional exceptions." },
  { name: "Regional validation", weeks: "7–12", outcome: "Regional acknowledgment, unresolved conflicts and sponsor decisions." },
  { name: "Transition roadmap", weeks: "11–14", outcome: "Sequenced actions, accountable owners and the board decision package." },
];
export const chapters = [
  { id: "scope", label: "Scope", description: "Understand the engagement, bring forward precedent, and test the proposal." },
  { id: "plan", label: "Plan", description: "Develop and review the plan, then put the approved work into the firm’s systems." },
  { id: "deliver", label: "Deliver", description: "Give the consultant the engagement context, firm methods and review history to do the work." },
];
const sources = {
  discovery: { label: "Sponsor discovery · NS-D01", text: "Elena Vargas, Northstar’s COO, needs a board decision package by November 20. Eight regions are in scope. Service continuity is a constraint. Six regional voices are represented; West and Southeast participation remains outstanding." },
  crm: { label: "Salesforce · OPP-20418", text: "Northstar Foods · owned by Margaret Whitfield. The opportunity begins in pursuit. Won status is recorded only after acceptance of the exact revised proposal." },
  harbor: { label: "Harbor · HG-D01 review", text: "Avery Ross prepared the evidence inventory; Sofia Patel reviewed it. Review separated observed ownership from the proposed design and retained source dates and disputed ownership. Late regional validation caused rework and a one-week delay." },
  meridian: { label: "Meridian · MC-D01 review", text: "Lena Torres developed the service-ownership matrix. Review clarified service boundaries, handoffs and dated regional acknowledgment. The six-region model was delivered on time; adoption took longer than expected." },
  method: { label: "Firm method · FM-012", text: "Frame the decision, establish the evidence, develop options, validate with affected stakeholders and define transition readiness. Keep observed facts, assumptions and proposed design distinct." },
  availability: { label: "Alicia’s resource confirmation", text: "Avery is available at 75%. Alicia conditionally holds Daniel from Week 3 at 80%, subject to the win. Lena starts in Week 3. The reviewed allocation totals 1,840 hours over fourteen weeks. Holds become bookings after acceptance and approval." },
  pricing: { label: "Finance · NS-FC01 / NS-FP01", text: "The reviewed person-level hours and internal cost rates total $248,140. Finance’s 40% direct contribution assumption implies a $413,567 minimum, rounded to a $420,000 proposal. This is before overhead. Client affordability is a separate constraint." },
  accepted: { label: "Elena’s acceptance · proposal v5", text: "Accepted fee: $400,000, negotiated from $420,000. Billing: 40/40/20 against milestones. Fourteen weeks, 1,840 hours and the full agreed scope are retained. Named resources and explicit deliverable acceptance criteria are included. Implementation remains excluded." },
  review: { label: "Sofia’s plan review", text: "The reviewed plan retains the accepted commitments and confirmed resource windows. Sofia reviews Avery’s assessment before the baseline. Margaret owns review gates after Sofia’s Week 10 release. Client evidence dependencies remain explicit." },
  receipts: { label: "Plan v1 · application receipts", text: "The demo simulates creating the project, fourteen deliverables, owner and reviewer assignments, resource bookings and SharePoint workspace. Fifty-five resulting application records are read back against approved plan v1. Each receipt retains its plan basis and verification result." },
  evidence: { label: "Northstar extracts · NS-DATA01", text: "Six of eight regional extracts are available. Northeast decision-owner fields are incomplete. Central’s inventory is from the prior quarter. West and Southeast extracts remain outstanding. Receipt of a file does not establish its suitability for a decision." },
  assessment: { label: "Firm assessment template v1.2", text: "The assessment must tie required data to the diagnostic objectives, test coverage, currency, completeness and traceability, state the implications of gaps, and distinguish observed evidence from assumptions. Avery owns the assessment; Sofia reviews it." },
};
export const engagementReferences = [
  { ...sources.harbor, engagement: "Harbor Grain" },
  { ...sources.meridian, engagement: "Meridian" },
];
// Independent presentations render just the current exchange, never a chat history.
export const presentations = {
  opening: [{ id: "understand", label: "The opportunity" }, { id: "precedent", label: "Firm precedent" }],
  scope: [{ id: "scope-draft", label: "Scope" }, { id: "feasibility", label: "Resources & pricing" }, { id: "proposal", label: "Proposal" }],
  plan: [{ id: "plan", label: "Engagement plan" }, { id: "plan-review", label: "Review" }, { id: "plan-activation", label: "Application records" }],
  deliver: [{ id: "assignment", label: "Assignment", artifact: null }, { id: "assessment-draft", label: "Assessment" }, { id: "assessment-review", label: "Review" }],
};
export const scenes = [
  {
    id: "understand", chapter: "scope", prompt: "Can you give me an overview of this engagement? What do we know?",
    answer: ["Northstar needs clearer decision ownership across eight regions without disrupting service. Elena Vargas, the COO, needs a board decision package by November 20.", "Six regional leaders have contributed. Two voices and complete current extracts are still missing. We should establish the evidence needs and delivery approach before committing terms."],
    activity: ["Grounding the opportunity in Salesforce and sponsor discovery"], sources: [sources.discovery, sources.crm],
  },
  {
    id: "precedent", chapter: "scope", prompt: "Where have we seen something like this before?",
    answer: ["At Harbor Grain, Avery built the evidence inventory. Sofia’s review separated observed ownership from proposed design. Late regional validation still caused rework and a one-week delay.", "Lena built Meridian’s six-region ownership matrix; review clarified service boundaries and handoffs. Bring regional voices into Northstar’s diagnostic early and define transition readiness separately from the board package."],
    activity: ["Comparing Harbor and Meridian’s conditions, decisions and outcomes"], sources: [sources.harbor, sources.meridian],
  },
  {
    id: "people", chapter: "scope", prompt: "Who worked on those engagements, and what changed in review?",
    answer: ["Avery built Harbor’s evidence inventory. Sofia’s review separated observed owners from proposed design and kept disputed ownership open for a sponsor decision.", "Lena developed Meridian’s service-ownership matrix; review clarified boundaries and handoffs. That experience supports their fit for Northstar. Current availability still needs to be checked."],
    activity: ["Tracing people, deliverables and the accepted review revisions"], sources: [sources.harbor, sources.meridian],
  },
  {
    id: "scope-draft", chapter: "scope", prompt: "What should we carry forward? Draft a scope using that approach.",
    answer: ["Start with a source-linked decision inventory, bring regional leaders into diagnosis and option development, and retain a formal validation round.", "The draft uses the firm’s method across four workstreams. West and Southeast participation remains an explicit dependency. Implementation is outside the scope."],
    activity: ["Applying the firm method and retained review guidance", "Building the scope with evidence and boundaries"], sources: [sources.method, sources.harbor, sources.discovery], artifact: "scope",
  },
  {
    id: "feasibility", chapter: "scope", prompt: "Can we staff that approach in time, and what should drive our pricing assumptions?",
    answer: ["Alicia can hold Daniel from Week 3. The reviewed team supports 1,840 hours over fourteen weeks, with Avery at a 75% availability ceiling.", "At the internal cost rates, that allocation costs $248,140. Finance’s 40% direct contribution assumption suggests a $420,000 proposal before overhead. Timing, resource mix and evidence delays remain pricing sensitivities."],
    activity: ["Checking current availability against the required capabilities", "Testing the allocation and internal cost basis"], sources: [sources.availability, sources.pricing], artifact: "pricing",
  },
  {
    id: "proposal", chapter: "scope", prompt: "Prepare the proposal on that basis and have Sofia review it before submission.",
    answer: ["The proposal carries the scope, resource assumptions, acceptance criteria and $420,000 commercial basis. The fourteen-week sequence preserves regional validation and the November 20 board package.", "Sofia’s commercial review is retained with the submitted version. Later client changes will create a successor proposal, preserving what was originally offered."],
    activity: ["Assembling the proposal from the reviewed scope and allocation", "Retaining Sofia’s review with submitted proposal v4"], sources: [sources.pricing, sources.availability, sources.method], artifact: "proposal",
  },
  {
    id: "acceptance", chapter: "scope", signal: "Outlook · Elena Vargas accepted proposal v5", prompt: "What did Elena negotiate, and what have we committed to?",
    answer: ["The accepted fee is $400,000, down from $420,000, with 40/40/20 milestone billing. Named staffing and explicit acceptance criteria were added; the full 1,840-hour scope and fourteen-week sequence remain.", "OPP-20418 is now Won. At the same $248,140 direct cost, the concession reduces direct contribution to 38.0% before overhead. Proposal v5 is the locked basis for planning."],
    activity: ["Comparing the exact accepted proposal with the submitted version", "Recording the accepted commitment and opportunity outcome"], sources: [sources.accepted, sources.crm, sources.pricing], artifact: "accepted",
  },
  {
    id: "plan", chapter: "plan", prompt: "Build the engagement plan from the accepted proposal. Show the resources, deliverables and review coverage.",
    answer: ["Elena negotiated the fee from $420,000 to $400,000 and accepted proposal v5. The fourteen-week scope and 1,840 hours remain; OPP-20418 is Won. The reviewed pursuit team’s resource holds are confirmed.", "The working plan connects fourteen deliverables to owners, reviewers and the four workstreams. Sofia reviews Avery’s assessment before the baseline; Margaret covers the gates after Week 10."],
    activity: ["Carrying accepted proposal v5 into the new planning conversation", "Sequencing deliverables against confirmed resource windows"], sources: [sources.accepted, sources.availability, sources.method], artifact: "plan",
  },
  {
    id: "plan-review", chapter: "plan", prompt: "Have Sofia review this plan before we commit it.",
    answer: ["Sofia endorsed plan v1 with the review handoff made explicit. Avery’s assessment is due September 7; unresolved regional evidence remains visible before the diagnostic baseline.", "The plan retains the accepted scope and fee. Margaret owns the later review gates after Sofia’s release. Her endorsement and the changes made in response stay with the plan."],
    activity: ["Reviewing capacity, deliverable criteria and review ownership", "Retaining Sofia’s endorsement and the response to her notes"], sources: [sources.review, sources.accepted], artifact: "approved",
  },
  {
    id: "plan-activation", chapter: "plan", prompt: "I approve the plan. Set it up in Project Operations and SharePoint, then verify it matches what we agreed.",
    answer: ["The project, fourteen deliverables, owners, reviewers and bookings for six people are now in Dynamics 365 Project Operations. The plan and assessment workspace are in SharePoint.", "I read the resulting records back from both applications. All 55 match approved plan v1. The receipts retain what was created, its plan basis and the verification results."],
    activity: ["Creating the project and deliverable assignments", "Creating resource bookings and the document workspace", "Reading records back from both applications", "Comparing dates and assignments with approved plan v1"], sources: [sources.receipts], artifact: "handoff",
  },
  {
    id: "assignment", chapter: "deliver", prompt: "What am I responsible for, and what should I carry forward from Harbor?",
    answer: ["You own the data-readiness assessment for the diagnostic, due September 7. Sofia is your reviewer; the approved assignment provides 36 hours.", "Use the firm’s assessment template. Harbor’s review is directly relevant: separate observed ownership from proposed design, retain source dates and conflicts, and keep missing evidence visible."],
    activity: ["Grounding Avery’s assignment in approved plan v1", "Bringing forward the firm template and Harbor review"], sources: [sources.assessment, sources.harbor, sources.review], artifact: "assessment",
  },
  {
    id: "assessment-draft", chapter: "deliver", prompt: "Build the assessment from the available evidence. Show me what remains unresolved.",
    answer: ["Six regional extracts support a bounded diagnostic. Northeast ownership is incomplete, Central’s inventory needs a currency check, and West and Southeast extracts are missing.", "The Word assessment and companion evidence workbook keep those limits attached to the conclusion. File receipt alone does not establish readiness for design decisions."],
    activity: ["Checking coverage, ownership and currency in the regional extracts", "Developing the assessment in the firm’s Word and workbook templates"], sources: [sources.evidence, sources.assessment, sources.harbor], artifact: "assessment-draft",
  },
  {
    id: "assessment-review", chapter: "deliver", signal: "Teams · Sofia’s assessment review is available", prompt: "Address Sofia’s review. Explain what each evidence gap means for the diagnostic and design.",
    answer: ["The revised assessment distinguishes incomplete ownership, uncertain currency and unavailable regional evidence. It supports initial diagnostic work; design decisions remain conditional on resolving the affected gaps.", "Sofia’s challenge, your revision and the supporting Northstar sources remain linked to the assessment and approved assignment. Harbor’s review rationale carries through into the work."],
    activity: ["Resolving the anchored review feedback against the source evidence", "Retaining the revision, rationale and reviewer response"], sources: [sources.evidence, sources.harbor, sources.assessment], artifact: "assessment-reviewed",
  },
];

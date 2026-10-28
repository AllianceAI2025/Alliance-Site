// Fictional approved work breakdown. Resource effort is booked at engagement
// level; Avery's 36-hour task is part of his 384-hour engagement allocation.
export const planDeliverables = [
  { id: "NS-D01", stream: "WS-01", title: "Data-readiness assessment", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 17", due: "September 7", effort: 36, dependsOn: [], acceptance: "Source dates, missing owners and regional gaps stated; evidence separated from proposed design." },
  { id: "NS-D02", stream: "WS-01", title: "Discovery and stakeholder findings", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 17", due: "August 28", dependsOn: [], acceptance: "West and Southeast heard; sponsor objectives and unresolved questions recorded." },
  { id: "NS-D03", stream: "WS-01", title: "Decision-ownership inventory", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 24", due: "September 11", dependsOn: ["NS-D01", "NS-D02"], acceptance: "Observed owners, disputes and supporting evidence traceable by region." },
  { id: "NS-D04", stream: "WS-01", title: "Diagnostic baseline", owner: "Sofia Patel", reviewer: "Margaret Whitfield", start: "September 7", due: "September 11", dependsOn: ["NS-D01", "NS-D03"], acceptance: "Evidence limits agreed before design; outstanding client inputs have owners." },
  { id: "NS-D05", stream: "WS-02", title: "Design principles and decision criteria", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 7", due: "September 18", dependsOn: ["NS-D04"], acceptance: "Sponsor confirms decision rights and the criteria for assessing options." },
  { id: "NS-D06", stream: "WS-02", title: "Operating-model options", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 14", due: "October 2", dependsOn: ["NS-D05"], acceptance: "Options tested with regional leaders; tradeoffs and recommendation retained." },
  { id: "NS-D07", stream: "WS-02", title: "Service boundaries and handoff design", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 21", due: "October 9", dependsOn: ["NS-D05"], acceptance: "Accountability across regions and service handoffs is explicit." },
  { id: "NS-D08", stream: "WS-02", title: "Governance and escalation design", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 28", due: "October 9", dependsOn: ["NS-D06", "NS-D07"], acceptance: "Escalation owners and unresolved exceptions reviewed before regional sign-off." },
  { id: "NS-D09", stream: "WS-03", title: "Regional ownership matrix", owner: "Lena Torres", reviewer: "Sofia Patel", start: "September 28", due: "October 23", dependsOn: ["NS-D06", "NS-D07"], acceptance: "Eight regions have named decision makers and dated acknowledgment." },
  { id: "NS-D10", stream: "WS-03", title: "Regional validation record", owner: "Lena Torres", reviewer: "Margaret Whitfield", start: "October 12", due: "November 6", dependsOn: ["NS-D08", "NS-D09"], acceptance: "Regional responses and remaining disagreements remain linked to the design." },
  { id: "NS-D11", stream: "WS-03", title: "Exceptions and resolution log", owner: "Lena Torres", reviewer: "Margaret Whitfield", start: "October 12", due: "November 6", dependsOn: ["NS-D09"], acceptance: "Each exception has an owner, decision date and documented resolution or escalation." },
  { id: "NS-D12", stream: "WS-04", title: "Transition roadmap", owner: "Jordan Hale", reviewer: "Margaret Whitfield", start: "October 26", due: "November 13", dependsOn: ["NS-D10", "NS-D11"], acceptance: "Sequence, accountable owners and service-continuity dependencies agreed." },
  { id: "NS-D13", stream: "WS-04", title: "Readiness and go/no-go criteria", owner: "Jordan Hale", reviewer: "Margaret Whitfield", start: "October 26", due: "November 13", dependsOn: ["NS-D10", "NS-D11"], acceptance: "Mobilization decisions depend on evidence; task completion alone is insufficient." },
  { id: "NS-D14", stream: "WS-04", title: "Board decision package", owner: "Margaret Whitfield", reviewer: "Elena Vargas", start: "November 9", due: "November 20", dependsOn: ["NS-D12", "NS-D13"], acceptance: "Sponsor accepts the recommendation, residual risks and transition decisions; implementation excluded." },
];

export const planMilestones = [
  { id: "G1", title: "Diagnostic baseline accepted", due: "September 11", reviewer: "Margaret Whitfield", requires: ["NS-D01", "NS-D02", "NS-D03", "NS-D04"] },
  { id: "G2", title: "Design review complete", due: "October 9", reviewer: "Sofia Patel", requires: ["NS-D05", "NS-D06", "NS-D07", "NS-D08"] },
  { id: "G3", title: "Regional validation accepted", due: "November 6", reviewer: "Margaret Whitfield", requires: ["NS-D09", "NS-D10", "NS-D11"] },
  { id: "G4", title: "Board decision", due: "November 20", reviewer: "Elena Vargas", requires: ["NS-D12", "NS-D13", "NS-D14"] },
];

export const planBillingSchedule = [
  { id: "B1", title: "Mobilization · 40%", percent: 40, date: "August 17" },
  { id: "B2", title: "Design review accepted · 40%", percent: 40, gate: "G2" },
  { id: "B3", title: "Board decision · 20%", percent: 20, gate: "G4" },
];

// Independent returned records for the illustrated PSA write.
// These do not reuse approved plan objects, so readback can detect differences.
export const readbackPlan = {
  billingSchedule: [
    { id: "B1", title: "Mobilization · 40%", percent: 40, date: "August 17" },
    { id: "B2", title: "Design review accepted · 40%", percent: 40, gate: "G2" },
    { id: "B3", title: "Board decision · 20%", percent: 20, gate: "G4" },
  ],
  project: { name: "Northstar Foods", manager: "Margaret Whitfield", opportunity: "OPP-20418", start: "August 17", finish: "November 20", effort: 1840, baseline: "Plan v1", proposal: "Proposal v5", fee: 400000, billing: "40 / 40 / 20", objective: "Decision ownership across eight regions; service maintained; November 20 board decision.", boundary: "Implementation excluded; West and Southeast evidence remains a client dependency." },
  resources: [
    { id: "950001", name: "Margaret Whitfield", role: "Engagement lead", start: 1, end: 14, capacity: 35, hours: 172 },
    { id: "950002", name: "Sofia Patel", role: "Design lead · reviewer", start: 1, end: 10, capacity: 100, hours: 380 },
    { id: "950003", name: "Daniel Okafor", role: "Operating-model design", start: 3, end: 12, capacity: 80, hours: 316 },
    { id: "950004", name: "Jordan Hale", role: "Transition planning", start: 8, end: 14, capacity: 80, hours: 192 },
    { id: "950005", name: "Avery Ross", role: "Assessment · Harbor experience", start: 1, end: 14, capacity: 75, hours: 384 },
    { id: "950006", name: "Lena Torres", role: "Regional validation · Meridian", start: 3, end: 12, capacity: 100, hours: 396 },
  ],
  workstreams: [
    { id: "WS-01", name: "Diagnostic & evidence", weeks: "1–4" },
    { id: "WS-02", name: "Operating-model design", weeks: "3–8" },
    { id: "WS-03", name: "Regional validation", weeks: "7–12" },
    { id: "WS-04", name: "Transition roadmap", weeks: "11–14" },
  ],
  deliverables: [
    { recordId: "930001", id: "NS-D01", stream: "WS-01", title: "Data-readiness assessment", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 17", due: "September 7", effort: 36, dependsOn: [], acceptance: "Source dates, missing owners and regional gaps stated; evidence separated from proposed design." },
    { recordId: "930002", id: "NS-D02", stream: "WS-01", title: "Discovery and stakeholder findings", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 17", due: "August 28", dependsOn: [], acceptance: "West and Southeast heard; sponsor objectives and unresolved questions recorded." },
    { recordId: "930003", id: "NS-D03", stream: "WS-01", title: "Decision-ownership inventory", owner: "Avery Ross", reviewer: "Sofia Patel", start: "August 24", due: "September 11", dependsOn: ["NS-D01", "NS-D02"], acceptance: "Observed owners, disputes and supporting evidence traceable by region." },
    { recordId: "930004", id: "NS-D04", stream: "WS-01", title: "Diagnostic baseline", owner: "Sofia Patel", reviewer: "Margaret Whitfield", start: "September 7", due: "September 11", dependsOn: ["NS-D01", "NS-D03"], acceptance: "Evidence limits agreed before design; outstanding client inputs have owners." },
    { recordId: "930005", id: "NS-D05", stream: "WS-02", title: "Design principles and decision criteria", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 7", due: "September 18", dependsOn: ["NS-D04"], acceptance: "Sponsor confirms decision rights and the criteria for assessing options." },
    { recordId: "930006", id: "NS-D06", stream: "WS-02", title: "Operating-model options", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 14", due: "October 2", dependsOn: ["NS-D05"], acceptance: "Options tested with regional leaders; tradeoffs and recommendation retained." },
    { recordId: "930007", id: "NS-D07", stream: "WS-02", title: "Service boundaries and handoff design", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 21", due: "October 9", dependsOn: ["NS-D05"], acceptance: "Accountability across regions and service handoffs is explicit." },
    { recordId: "930008", id: "NS-D08", stream: "WS-02", title: "Governance and escalation design", owner: "Daniel Okafor", reviewer: "Sofia Patel", start: "September 28", due: "October 9", dependsOn: ["NS-D06", "NS-D07"], acceptance: "Escalation owners and unresolved exceptions reviewed before regional sign-off." },
    { recordId: "930009", id: "NS-D09", stream: "WS-03", title: "Regional ownership matrix", owner: "Lena Torres", reviewer: "Sofia Patel", start: "September 28", due: "October 23", dependsOn: ["NS-D06", "NS-D07"], acceptance: "Eight regions have named decision makers and dated acknowledgment." },
    { recordId: "930010", id: "NS-D10", stream: "WS-03", title: "Regional validation record", owner: "Lena Torres", reviewer: "Margaret Whitfield", start: "October 12", due: "November 6", dependsOn: ["NS-D08", "NS-D09"], acceptance: "Regional responses and remaining disagreements remain linked to the design." },
    { recordId: "930011", id: "NS-D11", stream: "WS-03", title: "Exceptions and resolution log", owner: "Lena Torres", reviewer: "Margaret Whitfield", start: "October 12", due: "November 6", dependsOn: ["NS-D09"], acceptance: "Each exception has an owner, decision date and documented resolution or escalation." },
    { recordId: "930012", id: "NS-D12", stream: "WS-04", title: "Transition roadmap", owner: "Jordan Hale", reviewer: "Margaret Whitfield", start: "October 26", due: "November 13", dependsOn: ["NS-D10", "NS-D11"], acceptance: "Sequence, accountable owners and service-continuity dependencies agreed." },
    { recordId: "930013", id: "NS-D13", stream: "WS-04", title: "Readiness and go/no-go criteria", owner: "Jordan Hale", reviewer: "Margaret Whitfield", start: "October 26", due: "November 13", dependsOn: ["NS-D10", "NS-D11"], acceptance: "Mobilization decisions depend on evidence; task completion alone is insufficient." },
    { recordId: "930014", id: "NS-D14", stream: "WS-04", title: "Board decision package", owner: "Margaret Whitfield", reviewer: "Elena Vargas", start: "November 9", due: "November 20", dependsOn: ["NS-D12", "NS-D13"], acceptance: "Sponsor accepts the recommendation, residual risks and transition decisions; implementation excluded." },
  ],
  milestones: [
    { recordId: "935001", id: "G1", title: "Diagnostic baseline accepted", due: "September 11", reviewer: "Margaret Whitfield", requires: ["NS-D01", "NS-D02", "NS-D03", "NS-D04"] },
    { recordId: "935002", id: "G2", title: "Design review complete", due: "October 9", reviewer: "Sofia Patel", requires: ["NS-D05", "NS-D06", "NS-D07", "NS-D08"] },
    { recordId: "935003", id: "G3", title: "Regional validation accepted", due: "November 6", reviewer: "Margaret Whitfield", requires: ["NS-D09", "NS-D10", "NS-D11"] },
    { recordId: "935004", id: "G4", title: "Board decision", due: "November 20", reviewer: "Elena Vargas", requires: ["NS-D12", "NS-D13", "NS-D14"] },
  ],
  assignment: { id: "960001", owner: "Avery Ross", reviewer: "Sofia Patel", effort: 36, due: "September 7", baseline: "Plan v1" },
};

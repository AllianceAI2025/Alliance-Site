// Public content drawn from Main's Explore AllianceOne / How It Works pages
// and the September 2026 business case. Product = maintained knowledge and
// engagement state. Solutions = decisions and work supported across an engagement.
export const navigation = [
  { key: "home", label: "Home", href: "/" },
  { key: "product", label: "Product", href: "/allianceone/" },
  { key: "solutions", label: "Solutions", href: "/solutions/" },
  { key: "company", label: "Company", href: "/company/" },
];

export const waysOfWorking = [
  ["Approach", "How the firm frames the problem, the questions it asks first, the evidence it trusts, and the experience it brings forward."],
  ["Think", "The options considered, the tradeoffs made, the assumptions carried, and the reasoning behind the recommendation."],
  ["Deliver", "How scope, staffing, sequence, governance, decisions, changes, and outcomes fit together in practice."],
];

export const firmKnowledge = [
  {
    id: "methods", title: "Methods and frameworks", short: "The questions the firm asks, the evidence it trusts, and the way it structures a problem.",
    body: "Your methodologies, proprietary frameworks, diagnostic tools, training and internal publications establish how your firm works. AllianceOne connects that practice knowledge with the conditions in which it has been applied, so a team can understand which approach fits and how to adapt it.",
    exampleTitle: "Ownership and Handoffs", exampleType: "Practice Methods Library",
    example: "Separate observed ownership from a proposed future model. Record the evidence, date and unresolved conflicts before recommending a design.",
    detail: "Prepared by Lena Torres · Reviewed by Sofia Patel",
    note: "Published practice guidance can inform the work within its permitted audience. A firm's point of view and evidence of a client result remain distinguishable.",
  },
  {
    id: "deliverables", title: "Deliverable types and templates", short: "The proven shapes, required sections, source expectations, and review gates behind client work.",
    body: "Report formats, diagnostic workbooks and presentation structures carry more than a visual identity. They establish required sections, source expectations, analysis and review gates. Teams can develop a deliverable with those requirements present throughout the work, rather than discover them in final review.",
    exampleTitle: "Data Readiness Assessment", exampleType: "Report format and companion evidence workbook",
    example: "Purpose and boundaries. Evidence by region. Observed ownership. Unresolved conflicts. Implications for design readiness. Conclusions and source references.",
    detail: "Practice Methods team · Consultant preparation · Engagement review",
    note: "A named report format provides the structure. The engagement's own evidence supports the client conclusions.",
  },
  {
    id: "precedent", title: "Prior work and experience", short: "Comparable scopes, staffing patterns, decisions, changes, outcomes, and lessons from delivery.",
    body: "Comparable work connects client conditions, scope, people, effort, decisions and observed results. Review feedback and the revisions it produced help explain what mattered. A team can examine both the similarity and the limits before applying an earlier approach to a new client.",
    exampleTitle: "Harbor → Northstar", exampleType: "Relevant delivery experience",
    example: "Avery's Harbor review distinguished observed decision owners from design proposals. For Northstar, that experience informs the evidence register and the questions to resolve before design.",
    detail: "Avery Ross · Evidence preparation / Sofia Patel · Review",
    note: "The manager examines the relevant engagement record. Avery uses the review excerpt Sofia explicitly shared for his Northstar assignment.",
  },
  {
    id: "quality", title: "Review and quality standards", short: "The criteria partners and engagement leaders use to determine whether work is ready to advance.",
    body: "Partner and engagement-leader review makes the firm's standards concrete. The record can retain what a reviewer challenged, the evidence requested, the consultant's response and the resulting change. That reasoning helps the current team improve the work and gives later teams a more useful basis for preparation.",
    exampleTitle: "What does the evidence allow us to conclude?", exampleType: "Northstar assessment review",
    example: "Sofia asks Avery to explain what each evidence gap prevents the team from concluding. Revision 2 carries those implications into the assessment's conclusion before approval and export.",
    detail: "Revision 1 → Review feedback → Revised conclusion → Approval",
    note: "Feedback stays linked to the draft and assignment it concerns. Practitioners remain responsible for the analysis and the decision to approve it.",
  },
];

export const precedentChain = [
  ["Conditions", "The client problem, objectives, constraints and information available at the time."],
  ["Approach", "The method chosen, assumptions carried, alternatives considered and reasons for the choice."],
  ["People", "Who contributed, what they delivered and which capability or experience the work required."],
  ["Review", "What was challenged, what changed and why the revised work was accepted."],
  ["Results", "What was observed, what remains uncertain and when the experience is relevant again."],
];

export const systemSources = [
  { name: "CRM", owns: "Accounts, contacts, opportunity stage, pipeline and activities", contributes: "The client situation, opportunity owner and the context behind a new pursuit", icon: "salesforce" },
  { name: "PSA / project management", owns: "Projects, work breakdown, assignments, milestones, time and status", contributes: "The approved plan goes into execution; operating records return as evidence", icon: "psa" },
  { name: "Documents and communications", owns: "Files, email, meetings, deliverables and practice materials", contributes: "Sources, conversations and review evidence linked to the engagement they concern", icon: "sharepoint" },
  { name: "ERP and billing", owns: "Actual costs, invoices, revenue, collections and financial reporting", contributes: "Available actuals give commercial decisions and delivery variance their context", icon: "dynamics" },
];

export const productBenefits = [
  ["More realistic commitments.", "Test scope, staffing, effort and price against comparable work before the firm commits."],
  ["Act sooner when delivery drifts.", "Compare delivery with the approved plan while there is still time to act."],
  ["Every engagement informs the next.", "Reviewed decisions and results become knowledge the next team can use."],
  ["Build proof into the proposition.", "Connect the firm’s methods to observed results when explaining its value to a new client."],
];

export const firmTypes = [
  ["Management consulting", "Pressure-test scope, staffing and assumptions against comparable engagements, and keep the reasoning behind recommendations."],
  ["Specialist advisory", "Reuse prior work with its facts, caveats and permitted reuse clear, and information barriers validated for the selected practice."],
  ["Technology and transformation", "Keep commercial commitments, dependencies and delivery decisions connected across long programs, teams and vendors."],
  ["Law firms", "Bring practice guidance, prior matters and review standards into current client work, with client confidentiality and information barriers validated for the selected practice."],
];

export const solutionChapters = [
  {
    id: "scope", label: "Relevant experience", title: "Turn early context into an approved scope.",
    intro: "A new opportunity already has a history. AllianceOne brings the client’s situation together with firm methods, comparable work and current availability, so the scope and proposal start from evidence.",
    sections: [
      ["Start with the client situation", "Discovery findings, objectives and open questions form the brief, and new correspondence keeps it current."],
      ["Find comparable experience, including the people", "See who did similar work, what review changed and what the evidence later showed, with differences and limits in view."],
      ["Test the team and assumptions before committing", "Compare team options, availability, effort and pricing assumptions before the proposal is approved."],
    ],
    result: "A reviewed scope and proposal, with its assumptions, sources and approval history.",
  },
  {
    id: "plan", label: "Plan and staffing", title: "Translate the commitment into a delivery plan.",
    intro: "The accepted proposal becomes a staffed plan: workstreams, deliverables, effort, dates and review gates, tested against current availability.",
    sections: [
      ["Keep the accepted commitment visible", "Negotiated terms and the commercial baseline stay attached as the plan develops."],
      ["Review and approve the whole plan", "The team agrees assignments and review responsibilities. Approval sets the governing baseline; later changes stay distinct until authorized."],
    ],
    result: "An approved plan, written to the firm’s PSA and verified against what was approved.",
  },
  {
    id: "deliver", label: "Assigned work", title: "Give each team member the context to deliver well.",
    intro: "Each person starts from an approved assignment, with the client’s objectives, current decisions, firm methods and relevant review experience at hand.",
    sections: [
      ["Begin with the assignment", "Purpose, due date, effort, reviewer and acceptance criteria carry forward from the plan."],
      ["Develop the analysis with the firm behind it", "Firm formats and templates shape the work; the client’s evidence supports the conclusions."],
      ["Work through review", "Feedback stays linked to the draft, revisions keep what changed and why, and the approved version can be exported."],
    ],
    result: "A reviewed deliverable, with the reasoning, sources and revisions that explain it.",
  },
];

export const implementationSteps = [
  ["Choose the work", "Agree one recurring engagement type, its owner, a primary benefit and the quality criteria that will make the workflow useful."],
  ["Establish the context", "Select historical and current practice sources, validate useful knowledge, and configure methods, report formats, review standards and permitted reuse."],
  ["Connect the execution system", "Map the approved plan to one PSA or project-management system. Validate writes, retained record identifiers, readback, differences and approved changes."],
  ["Measure use and refine", "Review preparation and correction effort, decision quality, useful management action and deployment cost with the sponsor and practitioners."],
];

export const practiceServices = [
  ["Systems integration", "Connect the selected CRM, PSA, project, document, communication and finance sources. Define record ownership, data flows and the mappings required for the engagement workflow."],
  ["Practice configuration", "Bring your methods, frameworks, report formats and review standards into the work. Establish which practice materials and prior experience are useful, supported and permitted for reuse."],
  ["Workflow design", "Define how an opportunity becomes an approved scope, proposal and delivery plan, and how authorized decisions carry into the systems that run the work."],
  ["Adoption and governance", "Work with sponsors, managers, consultants and reviewers on approval rights, source access, evidence standards, responsibilities and the measures of useful adoption."],
];

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
  ["More realistic commitments.", "Client conditions, firm methods, comparable work and current resource availability give leaders a basis for testing scope, staffing, effort and pricing assumptions before committing. Gaps and differences remain available for review."],
  ["Act sooner when delivery drifts.", "Time, milestones, client changes and available financial actuals return from selected firm systems and are compared with the approved plan. Managers can examine causes, affected commitments and context before authorizing changes to scope, resources or sequence."],
  ["Every engagement informs the next.", "Decisions, review changes and observed results stay connected to client conditions and supporting sources. Practitioners review lessons and limits of permitted reuse before that experience informs new scopes, plans and delivery."],
  ["Build proof into the proposition.", "Methods and points of view stay connected to the conditions in which they were applied and the results observed. That evidence helps the firm explain its expertise, support proposals and discuss the value behind its fees."],
];

export const firmTypes = [
  ["Management consulting", "Similar problem types recur, while each client's facts and constraints change the approach. Relevant engagement experience helps leaders pressure-test scope, staffing and assumptions, and retain the reasoning behind recommendations."],
  ["Specialist advisory", "Prior work is useful when the facts, caveats and permitted reuse remain clear. Advisory work requires careful source access and information barriers; these requirements are agreed and validated for the selected practice."],
  ["Technology and transformation", "Longer programs span workstreams, specialists, vendors and operating systems. The approved commercial commitment, dependencies, delivery decisions and implementation evidence need to remain connected across that work."],
  ["Law firms", "Bring the firm’s practice guidance, prior matters and review standards into current client work, with client confidentiality, information barriers and permitted reuse validated for the selected practice."],
];

export const solutionChapters = [
  {
    id: "scope", label: "Scope", title: "Turn early context into an approved scope.",
    intro: "A new opportunity already has a history: the client conversations, objectives and assumptions that made it worth pursuing. AllianceOne brings that context together with firm methods, relevant delivery experience and current resource information to help the manager develop the scope and proposal.",
    sections: [
      ["Start with the client situation", "An opportunity assigned in CRM gives the engagement manager an owner-linked starting point. Client objectives, discovery findings, source documents, current communications and open questions form the brief. The manager can ask what is known, test assumptions and investigate gaps. New correspondence updates the engagement context so the conversation can focus on what it changes for the proposed work."],
      ["Find comparable experience, including the people", "Ask where the firm has faced similar conditions. Examine who performed the work, what they delivered, what review changed and what the evidence later showed. Firm methods, frameworks and intellectual property provide an approach; the delivery record helps explain how it worked in practice. The comparison carries its differences and limits so the manager can decide what belongs in the new scope."],
      ["Test the team, effort and assumptions before committing", "Past delivery identifies relevant capability and prior contributions; current resource information establishes who is available and when. Compare team options, capacity, timing and dependencies before committing. These choices inform the scope boundary, proposed deliverables, effort and pricing assumptions. The manager reviews inclusions, exclusions, client responsibilities and unresolved assumptions before preparing and approving the client proposal."],
    ],
    result: "A reviewed scope and client proposal, with their assumptions, source evidence and approval history.",
  },
  {
    id: "plan", label: "Plan", title: "Translate the commitment into a delivery plan.",
    intro: "The accepted proposal establishes what the firm has agreed to deliver. AllianceOne brings the negotiated terms, reviewed staffing assumptions and relevant delivery experience into a feasible engagement plan, with current resource information available to test timing and capacity.",
    sections: [
      ["Keep the accepted commitment visible", "The opportunity's won status, accepted proposal and negotiated changes establish the commercial baseline. Workstreams, deliverables, team allocations, effort, dates, dependencies, client responsibilities and review gates are developed against that commitment."],
      ["Review the whole plan", "The engagement manager can compare staffing options and work through resource capability, current availability, effort, timing and delivery dependencies. The team agrees assignments, deliverables and review responsibilities as part of the whole plan. Approval establishes the governing baseline. Later proposed changes remain distinct until reviewed and authorized, with the original commitment and its reasoning still available."],
      ["Put the approved plan into the project system", "An approved request creates or updates the corresponding project, work breakdown, assignments, milestones and review gates in the selected PSA or project-management system. Record identifiers and mappings preserve the connection. Readback checks the resulting records against the approved work and exposes missing or different information."],
    ],
    result: "An approved engagement plan, mapped operating records and evidence that the intended write was completed correctly.",
  },
  {
    id: "deliver", label: "Deliver", title: "Give each consultant the context to deliver well.",
    intro: "AllianceOne brings the client’s objectives, agreed commitments, discovery findings and current engagement decisions into each consultant’s approved assignment. Consultants can ask questions, examine evidence and draw on firm methods, templates and relevant, permitted delivery experience as they develop deliverables and work through review.",
    sections: [
      ["Begin with the assignment", "The deliverable's purpose, due date, effort, reviewer, dependencies and acceptance criteria carry forward from the plan. The consultant can ask what is known, what remains unresolved and how those facts affect the work they are responsible for. Client clarifications and current engagement decisions inform the assignment as the wider engagement evolves."],
      ["Develop the analysis with the firm behind it", "Named report formats, workbooks and presentation structures provide the expected shape. Client evidence supports the conclusions. Published practice guidance and explicitly shared review experience help the consultant adapt the approach, examine sources and explain their reasoning."],
      ["Work through review and export", "Send a draft and its supporting evidence to the reviewer. Comments stay linked to that version; revisions retain what changed and why. The approved deliverable can be exported in the relevant document format. The consultant’s reasoning, feedback, sources and revisions accumulate as part of the work, linked to the wider engagement and its approval record."],
    ],
    result: "A reviewed client deliverable and the reasoning, sources and revisions that explain the finished work.",
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

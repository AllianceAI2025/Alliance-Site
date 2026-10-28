// Public messaging spans professional practices; legal details stay in example records.
export const navigation = [
  { key: "home", label: "Home", href: "/" },
  { key: "product", label: "Product", href: "/allianceone/" },
  { key: "solutions", label: "Solutions", href: "/solutions/" },
  { key: "company", label: "Company", href: "/company/" },
];

export const waysOfWorking = [
  ["Approach", "How the firm frames the problem, the questions it asks first, the evidence it trusts, and the precedent it brings forward."],
  ["Think", "The options considered, the tradeoffs made, the assumptions carried, and the reasoning behind the recommendation."],
  ["Deliver", "How scope, staffing, sequence, review, decisions, changes and outcomes fit together in practice."],
];

export const firmKnowledge = [
  {
    id: "methods", title: "Methods and practice guidance", short: "The questions the firm asks, the evidence it trusts, and the way it structures the work.",
    body: "Practice guidance, methodologies, frameworks and internal publications establish how your firm works. AllianceOne connects that guidance with the conditions in which it has been applied. Teams can examine the method, its sources and its limits while deciding how to approach the current assignment.",
    exampleTitle: "Records control and focused production requests", exampleType: "Litigation Practice Library",
    example: "Map each proposed request to a disputed issue, supporting material and an identified custodian. Distinguish an inference about custody from evidence of control.",
    detail: "Sofia Patel · Reviewed practice guidance · September 3, 2026",
    note: "Fictional practice note. Internal guidance provides a method; current legal requirements and authorities need separate attorney verification.",
  },
  {
    id: "deliverables", title: "Work product and templates", short: "The structure, source expectations and review standards behind the finished work.",
    body: "Assessments, reports, presentations and workbooks carry more than a visual identity. They establish what needs to be addressed, which evidence supports a conclusion and who reviews the work. Each assignment supplies the client context; the firm’s templates and review standards guide how the work is developed.",
    exampleTitle: "Initial Matter Assessment", exampleType: "Litigation Matter Brief",
    example: "Client instructions. Received materials. Disputed issues. Evidence and missing records. Working assumptions. Options for partner review. Source references and open decisions.",
    detail: "Margaret Whitfield · Matter lead · Revisions retained",
    note: "A named format provides the structure. Claims remain traceable to the current matter’s record and review.",
  },
  {
    id: "precedent", title: "Prior work and experience", short: "Comparable conditions, contributors, approaches, costs, decisions and observed results.",
    body: "A useful comparison goes beyond finding a similar document. It brings together the initial assessment, what the team did, what changed in review, the eventual result and cost against budget. Relevant differences remain visible. Where the record stops, AllianceOne can identify the contributor to ask rather than invent an explanation.",
    exampleTitle: "Harbor Point Owners → Northstar", exampleType: "Relevant internal matter experience",
    example: "Harbor’s engineering evidence and second archive changed its initial causation assessment. The reviewed closeout explains the additional discovery effort. Northstar uses that experience to test its repair history before settling the approach.",
    detail: "Avery Ross · Motion preparation / Sofia Patel · Review and close-out",
    note: "Fictional example. A partner’s matter access does not automatically extend to the associate on another matter. Explicitly shared excerpts retain their permitted use.",
  },
  {
    id: "quality", title: "Review and quality standards", short: "What reviewers challenge, what changes and what remains a professional decision.",
    body: "Review makes the firm’s standards concrete. The record retains the draft, the reviewer’s challenge, the response and what changed. Supporting evidence, the team’s interpretation and an approved decision remain distinguishable. Practitioners own the analysis and the decision to advance the work.",
    exampleTitle: "Separate the assumption from the evidence.", exampleType: "Northstar assessment review",
    example: "New correspondence challenges the resolved-repair account in Northstar’s first assessment. Margaret directs a revised chronology and engineering comparison. Revision 2 retains the earlier view, new evidence and reason for the recommendation.",
    detail: "Revision 1 → New evidence → Margaret’s instruction → Revision 2",
    note: "Fictional review. A proposed response and an approved decision remain separate, with the earlier account retained.",
  },
];

export const systemSources = [
  { name: "Client, practice and project systems", owns: "Client and work identifiers, teams, assignments and status", contributes: "The current assignment, responsible people and context for the work" },
  { name: "Document management", owns: "Files, versions, work product and document access", contributes: "Analyses, reports, review history and supporting evidence, linked to their sources" },
  { name: "Email and communications", owns: "Messages, participants, dates and attachments", contributes: "Client instructions, clarifications and the conversations behind decisions" },
  { name: "Time and billing", owns: "Time narratives, budgets, fees and invoices", contributes: "Actual effort and cost, examined alongside the documented reasons for change" },
];

export const productBenefits = [
  ["Start from experience.", "Practitioners and engagement leaders can find comparable work, who contributed, what changed and what it cost. Source-linked differences help them test an approach, scope or estimate while accounting for the conditions behind the earlier result."],
  ["See what changed, and why.", "New evidence, client instructions and available time or cost records remain connected to the earlier assessment. Leaders can examine what is affected and decide whether the approach, staffing, scope or budget needs to change."],
  ["Make the next team stronger.", "Decisions, reviewed revisions and observed results stay connected to their conditions and supporting sources. The next team can draw on that experience within the firm’s access rules, with gaps and limits of reuse visible."],
  ["Build evidence of value.", "Connect the firm’s methods and experience with what actually happened in the work. Leadership gains a clearer account of effort, outcomes and the reasons behind them, rather than relying on a finished document or fee total alone."],
];

export const firmTypes = [
  ["Law firms", "Bring the firm’s methods, prior work, client context and review standards into current assignments. Keep decisions, costs and results connected within the selected practice’s access and reuse rules."],
  ["Management consulting", "Use comparable engagements, firm methods and resource experience to pressure-test scope, staffing and assumptions. Keep the reasoning behind recommendations and delivery changes available for the next team."],
  ["Specialist advisory", "Bring specialist methods and experience into recurring client work, with the facts, caveats and permitted reuse still clear. Validate source access and information barriers for the selected practice."],
  ["Technology and transformation", "Keep commercial commitments, dependencies, specialist contributions and implementation evidence connected across workstreams, vendors and operating systems."],
];

export const solutionChapters = [
  {
    id: "scope", label: "Relevant experience", title: "Find what the firm already learned.",
    intro: "Each new assignment raises questions the firm may have worked through before. AllianceOne brings relevant experience to the team, with the client context, contributors, decisions and economics that make a comparison useful.",
    sections: [
      ["Compare the conditions", "Examine the client’s objectives, constraints and initial assessment alongside what later evidence changed. See why the team chose its approach, what the work depended on and which differences matter for the current assignment."],
      ["Connect the people and economics", "See who prepared the work, who reviewed it and what experience they contributed. Read effort and cost against budget alongside time records and the reasons documented during delivery and close-out. Gaps in that account remain visible, with the people to ask identified."],
      ["Carry forward better questions", "Use relevant experience to test the proposed approach, scope, resource fit and effort assumptions. Identify the evidence still needed and the questions worth asking earlier. The team decides what applies to the client’s situation."],
    ],
    result: "A supported comparison, the people behind it and a clearer basis for the current approach and commitments.",
  },
  {
    id: "plan", label: "Reasoning and review", title: "Understand the work behind the result.",
    intro: "A finished deliverable rarely explains all the decisions behind it. AllianceOne connects the options considered, supporting evidence, draft changes and review feedback so teams can understand how the work reached its conclusion.",
    sections: [
      ["Trace the reasoning and its revision", "Ask which options the team considered, why it chose an approach and what the reviewer challenged. Keep the original draft, feedback, response and revised work together, with the assumptions and tradeoffs that explain the change."],
      ["Distinguish evidence from interpretation", "Examine what the sources established, what the team inferred and what the reviewer approved. Retain unresolved questions and the conditions behind a result so later teams can judge whether the experience is relevant."],
      ["Apply experience with its limits", "Bring useful review standards and prior reasoning into current analysis. Test them against this client’s objectives, evidence and constraints. Practitioners remain responsible for the recommendation, its supporting work and the decision to advance it."],
    ],
    result: "A source-linked account of reasoning, review and revisions that helps the team develop stronger work.",
  },
  {
    id: "deliver", label: "Continuity of work", title: "Keep the reasoning available as work changes.",
    intro: "As work develops, new evidence, client instructions and review can change the team’s understanding. AllianceOne keeps the current assessment connected to its sources, earlier assumptions and the decisions still requiring review.",
    sections: [
      ["Keep the agreed basis in view", "Keep the client’s objectives, scope, responsibilities, dependencies and review expectations connected to the analysis. Distinguish approved decisions from working assumptions and proposals awaiting review as the work develops."],
      ["Draw on the relevant firm knowledge", "Use practice guidance, templates, quality standards and relevant delivery experience while developing the assignment. Context follows the firm’s source access and reuse rules; work on one assignment does not automatically grant access to another."],
      ["Explain what new information changes", "Connect new correspondence, discovery and review feedback with the earlier understanding. Show which assumptions or deliverables are affected and why a revision is proposed. Keep the earlier version, the source and the response together as the team works through the decision."],
    ],
    result: "A current working record that supports delivery, preserves the reasons for change and makes responsibilities clear.",
  },
];

export const implementationSteps = [
  ["Choose the work", "Agree one recurring client workflow, its owner, a primary benefit and the quality criteria that will make it useful."],
  ["Establish the context", "Select historical and current sources. Configure practice guidance, work product formats and review standards; validate useful experience and permitted reuse."],
  ["Connect and validate the sources", "Agree the selected client, project, document, communication and finance sources. Test identity, source access, version handling and traceability before relying on the answers."],
  ["Measure use and refine", "Review preparation and correction effort, useful retrieval, decision support and deployment cost with the sponsor and practitioners."],
];

export const practiceServices = [
  ["Systems integration", "Connect selected client, project, document, communication and finance sources. Agree ownership, data flows and access checks for the workflow."],
  ["Practice configuration", "Bring practice guidance, frameworks, work product formats and review standards into the work. Establish which prior experience is supported and permitted for reuse."],
  ["Workflow design", "Define how practitioners assess work, draw on experience, develop analysis and work through review. Preserve decisions, revisions and the reasons behind them as the work develops."],
  ["Adoption and governance", "Work with practitioners, reviewers, engagement leaders and system owners on source access, review rights, responsibilities and measures of useful adoption."],
];

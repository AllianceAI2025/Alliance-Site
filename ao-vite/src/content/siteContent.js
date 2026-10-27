// Shared public copy. Fictional legal examples use the same records as the demos.
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
    body: "Practice notes, methodologies, frameworks, training and internal publications establish how your firm works. AllianceOne connects that guidance with the conditions in which it has been applied. Attorneys and consultants can examine the method, its sources and its limits while deciding how to approach the current work.",
    exampleTitle: "Records control and focused production requests", exampleType: "Litigation Practice Library",
    example: "Map each proposed request to a disputed issue, supporting material and an identified custodian. Distinguish an inference about custody from evidence of control.",
    detail: "Sofia Patel · Reviewed practice guidance · September 3, 2026",
    note: "Fictional practice note. Internal guidance provides a method; current legal requirements and authorities need separate attorney verification.",
  },
  {
    id: "deliverables", title: "Work product and templates", short: "The structure, source expectations and review standards behind the finished work.",
    body: "Matter assessments, motion outlines, client reports and consulting workbooks carry more than a visual identity. They establish what needs to be addressed, which evidence supports a conclusion and who reviews the work. The current matter or engagement supplies the facts; a template does not supply the answer.",
    exampleTitle: "Matter Assessment and Evidence Map", exampleType: "Litigation Matter Brief",
    example: "Client instructions. Received materials. Disputed issues. Evidence and missing records. Working assumptions. Options for partner review. Source references and open decisions.",
    detail: "Associate preparation · Partner review · Revisions retained",
    note: "A named format provides the structure. Claims remain traceable to the current matter’s record and review.",
  },
  {
    id: "precedent", title: "Prior work and experience", short: "Comparable conditions, contributors, arguments, costs, decisions and observed results.",
    body: "A useful comparison goes beyond finding a similar document. It brings together the initial assessment, what the team did, what changed in review, the eventual result and cost against budget. Relevant differences remain visible. Where the record stops, AllianceOne can identify the contributor to ask rather than invent an explanation.",
    exampleTitle: "Harbor Point Owners → Northstar", exampleType: "Relevant internal matter experience",
    example: "Harbor’s second collection followed a custodian change. Its discovery fees were $49,500 against a $30,000 budget. The close-out note explains why. Northstar still needs to establish who holds its missing reports.",
    detail: "Avery Ross · Motion preparation / Sofia Patel · Review and close-out",
    note: "Fictional example. A partner’s matter access does not automatically extend to the associate on another matter. Explicitly shared excerpts retain their permitted use.",
  },
  {
    id: "quality", title: "Review and quality standards", short: "What partners challenge, what changes and what remains a professional decision.",
    body: "Partner review makes the firm’s standards concrete. The record retains the draft, the reviewer’s challenge, the response and what changed. A court’s stated grounds, the firm’s retrospective observations and a proposed interpretation remain distinguishable. Practitioners own the analysis and the decision to advance the work.",
    exampleTitle: "Separate the assumption from the evidence.", exampleType: "Northstar handoff review",
    example: "Sofia asks Avery to retain the unverified custodian assumption, add the client’s new email and explain what it changes. Revision 2 proposes further records-control work; it does not approve a motion for filing.",
    detail: "Revision 1 → Partner feedback → Revision 2 for review",
    note: "Fictional review. A proposed response and an approved decision remain separate, with the earlier account retained.",
  },
];

export const systemSources = [
  { name: "Matter, practice and client systems", owns: "Matter identifiers, clients, teams, assignments and status", contributes: "The current matter, responsible people and context for the work" },
  { name: "Document management", owns: "Files, versions, work product and document access", contributes: "Arguments, reports, court records and review evidence, linked to their sources" },
  { name: "Email and communications", owns: "Messages, participants, dates and attachments", contributes: "Client instructions, clarifications and the conversations behind decisions" },
  { name: "Time and billing", owns: "Time narratives, budgets, fees and invoices", contributes: "Actual effort and cost, examined alongside the documented reasons for change" },
];

export const productBenefits = [
  ["Start from experience.", "Attorneys and engagement leaders can find comparable matters or projects, who contributed, what changed and what it cost. Source-linked differences help them test an approach, scope or estimate without treating a past result as a forecast."],
  ["See what changed, and why.", "New evidence, client instructions and available time or cost records remain connected to the earlier assessment. Leaders can examine what is affected and decide whether the approach, staffing, scope or budget needs to change."],
  ["Make the next team stronger.", "Decisions, reviewed revisions and observed results stay connected to their conditions and supporting sources. The next team can draw on that experience within the firm’s access rules, with gaps and limits of reuse visible."],
  ["Build evidence of value.", "Connect the firm’s methods and experience with what actually happened in the work. Leadership gains a clearer account of effort, outcomes and the reasons behind them, rather than relying on a finished document or fee total alone."],
];

export const firmTypes = [
  ["Law firms", "Make internal matter experience usable during assessment, litigation and handoff. Connect arguments, motion records, partner review, costs and client instructions within the selected practice’s access and reuse rules."],
  ["Management consulting", "Use comparable engagements, firm methods and resource experience to pressure-test scope, staffing and assumptions. Keep the reasoning behind recommendations and delivery changes available for the next team."],
  ["Specialist advisory", "Bring specialist methods and experience into recurring client work, with the facts, caveats and permitted reuse still clear. Validate source access and information barriers for the selected practice."],
  ["Technology and transformation", "Keep commercial commitments, dependencies, specialist contributions and implementation evidence connected across workstreams, vendors and operating systems."],
];

export const solutionChapters = [
  {
    id: "scope", label: "Similar matters", title: "Find what the firm already learned.",
    intro: "A new matter raises questions the firm may have worked through before. AllianceOne brings relevant internal experience to the attorney, with the facts, contributors, decisions and costs that make a comparison useful.",
    sections: [
      ["Compare the conditions, not just the topic", "Examine what the prior matter depended on, the early assessment and what later evidence changed. Northstar’s construction dispute draws on Harbor Point, Cedar Ridge and Briar Glen. The differences are part of the answer: an existing inventory, a custodian change and an unsupported assumption led to different work and results."],
      ["Connect the people and economics", "See who prepared the work and who reviewed it. Read the budget and actual fees alongside time narratives and a reviewed close-out account. Those records explain a cost difference; where no explanation is recorded, the answer should say so and identify whom to ask."],
      ["Carry forward better questions", "Prior work informs the questions to investigate, not the facts of the current matter. Northstar needs to establish who controls its reports before reusing a collection approach or effort assumption. Attorneys decide which experience applies."],
    ],
    result: "A supported comparison, the people behind it and a clearer set of questions for the current matter.",
  },
  {
    id: "plan", label: "Motion history", title: "Understand the work behind the result.",
    intro: "Public legal research and internal firm experience answer different questions. AllianceOne brings the firm’s own arguments, draft changes and partner observations together with the relevant decision record.",
    sections: [
      ["Trace the argument and its revision", "Ask what relief the team sought, how the argument developed and what the partner challenged. Harbor’s first draft sought broad records. Sofia’s review asked Avery to connect each request with a disputed issue, exhibit and custodian. The revised draft and the review remain available together."],
      ["Keep distinct kinds of evidence distinct", "Harbor’s order granted relief in part. Cedar Ridge withdrew after production, without a merits ruling. Briar Glen was denied without prejudice because its supporting record did not establish control. The court’s stated grounds stay separate from partner interpretation; these dispositions are not collapsed into a success rate."],
      ["Apply the lesson with its limits", "Bring the relevant review into the current evidence map. An earlier result does not establish Northstar’s facts or predict its outcome. Current legal requirements, authorities and filing decisions remain with the attorney; the demo’s records are fictional internal experience."],
    ],
    result: "A source-linked account of arguments, dispositions and review that helps the attorney prepare and ask better questions.",
  },
  {
    id: "deliver", label: "Matter handoff", title: "Keep the matter’s reasoning available.",
    intro: "Joining a matter should not require reconstructing its history from scattered messages and files. The assigned attorney can ask what has been decided, why, what remains open and what they are responsible for.",
    sections: [
      ["Start with the approved assignment", "Avery’s Northstar brief distinguishes client instructions, received materials, working assumptions and decisions still awaiting review. The assignment names Sofia as reviewer. The materials received do not, by themselves, establish liability or records control."],
      ["Use the knowledge the attorney may access", "Avery can use Northstar’s matter record, published practice guidance and the Harbor review excerpt Sofia explicitly shared for this assignment. Prior authorship does not grant access to Harbor’s whole file. Matter permissions and permitted reuse must be validated in a live deployment."],
      ["Explain what new information changes", "A new client email identifies a former facilities manager who may hold reports. Using the firm’s Litigation Matter Brief template, Avery develops a matter assessment and evidence map. Revision 2 retains the earlier assumption, cites the email and records the proposed response to Sofia’s feedback. It is a draft for review, not an approved filing or a change to the client’s instructions."],
    ],
    result: "An up-to-date handoff that preserves the earlier account, the new source and the decisions that still need an owner.",
  },
];

export const implementationSteps = [
  ["Choose the work", "Agree one recurring matter or engagement workflow, its owner, a primary benefit and the quality criteria that will make it useful."],
  ["Establish the context", "Select historical and current sources. Configure practice guidance, work product formats and review standards; validate useful experience and permitted reuse."],
  ["Connect and validate the sources", "Agree the selected document, communication, matter and billing sources. Test identity, source access, version handling and traceability before relying on the answers."],
  ["Measure use and refine", "Review preparation and correction effort, useful retrieval, decision support and deployment cost with the sponsor and practitioners."],
];

export const practiceServices = [
  ["Systems integration", "Connect selected document, communication, matter, client and finance sources. Agree ownership, data flows and access checks for the workflow."],
  ["Practice configuration", "Bring practice guidance, frameworks, work product formats and review standards into the work. Establish which prior experience is supported and permitted for reuse."],
  ["Workflow design", "Define how practitioners assess work, draw on experience, develop analysis and work through review. Preserve decisions, revisions and the reasons behind them as the work develops."],
  ["Adoption and governance", "Work with partners, attorneys, engagement leaders, consultants and system owners on source access, review rights, responsibilities and measures of useful adoption."],
];

# AllianceOne website

React + Vite marketing site for law, consulting and advisory firms. The active
homepage separates its brand hero from the first demo and retains the original
conversation window sizing from 1891aa2.
It demonstrates internal litigation experience across three continuous chat scenes: **Relevant experience → Reasoning and review → Continuity of work**. The current
visual system and autonomous playback are retained. There is no PSA writeback
in this narrative.

## Development

```sh
npm install
npm run dev
npm test
npm run build
```

The existing preview is http://localhost:5176. `npm run build` produces `dist/`.
`npm test` runs 39 checks: shared playback and retained consulting fixtures,
plus the active litigation corpus, chronology and source-access scenarios.

## The fictional firm record

`src/demo/litigation.js` is the single source of truth for the active demo,
source inspector and Product overview. It contains three closed matters and one
current matter. These are invented records and people, not legal authorities,
actual client work or Hellmuth & Johnson's matters. No real firm endorsement or
production connection is represented.

| Matter | Experience | Motion disposition | Budget / actual fees |
| --- | --- | --- | --- |
| Harbor Point Owners | Unverified collection assumptions; a custodian change and second collection | Granted in part; the other-project request was refused | $90,000 / $112,500 |
| Cedar Ridge Logistics | Existing inventory and a specific missing-document request | Withdrawn after production; no merits ruling | $100,000 / $97,000 |
| Briar Glen Properties | Contract role treated as evidence of records control, then corrected | Denied without prejudice on the submitted record | $120,000 / $132,000 |
| Northstar Foods | Current distribution-center construction dispute; records control unresolved | No motion approved for filing | No budget decision shown |

Each historical matter has an initial assessment, internal draft and revision,
decision or withdrawal record, partner review, cost reconciliation and reviewed
close-out. Each excerpt carries an identifier, matter, author, date, record type
and demonstration access designation. The source buttons open these records;
they do not point to public case law. Fee records include discovery-phase figures
and the documented explanation, rather than inventing a cause from the total.

### 1. Relevant experience — Margaret Whitfield, partner

Margaret asks where the firm has handled comparable inspection-record issues,
what it argued and what changed its approach. The comparison develops the legal
issue, the firm's position and the recorded disposition in each matter. Her
follow-up asks what Northstar can carry forward and what still needs evidence:
issue-and-exhibit mapping, a missing-record schedule and proof of records control.
The original arguments, disposition records and partner review remain inspectable.
People, fees and documented cost explanations remain in supporting matter records;
they are not the opening conversation or the comparison's leading fields.

### 2. Reasoning and review — Margaret Whitfield, partner

The same three matters supply the requested relief, decision record and partner
review. A withdrawal after production is not counted as a court win. A partial
order is not presented as a liability ruling. Margaret then examines Harbor's
first draft, Sofia's review and what changed in the revised argument. The order's
stated grounds remain separate from a partner's retrospective observation.

### 3. Continuity of work — Avery Ross, assigned associate

Avery asks what has been decided, what remains open and what he is responsible
for. Handoff revision 1 (October 21) contains the client instructions, assignment,
received materials and unverified custodian assumption. A follow-up uses Sofia's
review and the October 22 client email to develop revision 2 (October 23).
The earlier account remains visible in the thread. Avery asks for the firm’s
Litigation Matter Brief template; revision 2 develops into a two-page matter
assessment and evidence map on fictional Whitfield Hale LLP letterhead. The new email, proposed
interpretation and pending partner decision are distinct. No filing, budget
change or amendment of client instructions is approved by creating the brief.

The finished brief remains an in-chat artifact with no download control. Its
letterhead, content, evidence map and source record use `matterBrief.js`. An
internal Word reference is retained at `public/demo/northstar-matter-assessment.docx`
for engineering and template QA; it is not linked from the website. The brief
remains a draft for Sofia’s review. No filing approval is implied.

Avery's scene shows only his handoff thread. It permits Northstar material,
published practice guidance and the Harbor excerpt Sofia explicitly shared for
this assignment. It does not expose the full Harbor, Cedar Ridge or Briar Glen
files, even though Avery helped prepare Harbor's earlier work.

## Website structure

- **Home:** the first demo's Relevant experience introduction sits on its own
  light surface below the brand hero. Its full-width window retains the
  conversation height from 1891aa2, with its header and composer outside that
  height. The windows contain the legal
  narrative. The existing dark green, warm white and restrained accents remain.
- **Product (`/allianceone/`):** firm knowledge, practice guidance, work product,
  matter/engagement record, source ownership, decision rights and accountable
  deployment. A Northstar overview uses the same current-matter data as the demo.
- **Solutions (`/solutions/`):** fuller explanations of comparison, arguments and
  review, handoff, changing evidence and reviewed future reuse. Comparison and
  review illustrations reuse Home’s records. The full letterhead brief appears
  as an artifact in the demo only; the Solutions handoff section is text only. Consulting and
  advisory applications remain part of the broader story.
- **Company and Design partners:** law firms join consulting and advisory firms
  in the audience, with practice configuration, source integration, adoption and
  a bounded first deployment described consistently.

The positioning remains firm knowledge at the point of work. This is not a claim
that other AI tools cannot retrieve internal sources or reason across systems.
Internal firm experience complements current legal research; it does not supply
verified legal authorities or make the attorney's decision.

## Playback and implementation map

- `src/demo/EngagementDemo.jsx`: shared player, sidebar, source dialog, watchability
  and automatic conversation following.
- `src/demo/litigation.js`: corpus, story text, events, revisions and source resolver.
- `src/demo/LegalDemoArtifacts.jsx`: comparison, questions, motion history, draft
  comparison and two retained handoff versions; fields build progressively.
- `src/demo/matterBrief.js`: shared firm template and versioned brief content.
- `src/demo/legal-demo.css`: artifact styling within the existing visual system.
- `src/demo/demoPlayback.js`: shared timeline, visibility and scrolling helpers.
- `src/demo/legalDemo.test.js`: active corpus and narrative invariants.

The internal phase keys `scope`, `plan`, `deliver` remain for existing anchors,
layout classes and playback code. Their visible labels are **Relevant experience**,
**Reasoning and review**, and **Continuity of work**. Follow-ups append to the same conversation;
earlier artifacts freeze at their completed version. Each scene plays once,
holds its last frame, and restarts after leaving and returning. Partial clipping
of the feed or composer pauses the clock; reduced motion shows the final state.
Playback runs at 80% speed, about two minutes for the three scenes combined.
Handoff allows time for the two-page brief to build and holds the completed draft
before the visit ends.

This is a deterministic frontend demonstration. It does not call an AI model,
query a real DMS, send email or enforce production authorization. The local source
resolver demonstrates the persona boundary only. A live implementation must
perform authorization before retrieval and generation, honor matter barriers,
retain source identifiers/versions and preserve decision/revision provenance.

Engineering mapping for the selected workflow:

1. Establish matter and user identity, assignment and allowed source scope.
2. Retrieve comparable records with supporting assessment, cost and review evidence.
3. Assemble the comparison with stated relevance, differences and missing information.
4. Link argument versions, disposition records and partner observations separately.
5. Maintain the current matter's instructions, evidence, assumptions and decisions.
6. When new evidence arrives, retain the prior state and link the source, interpretation,
   reviewer and proposed revision. Approval remains a separate event.
7. Review reusable experience and its permitted audience before future retrieval.

The older consulting fixtures (`northstar.js`, `engagementPlan.js`,
`DemoArtifacts.jsx`, `assessment.json`) and their tests remain available as
reference material. They are not imported by the active legal scenes or public
page illustrations. No project-system writeback is shown in the legal demo.

## Rebuilding the internal Word reference

The checked-in file is an internal reference for template QA, not a website download. The builder uses python-docx;
the website build does not require Python. To regenerate after changing the shared
brief content:

```sh
node scripts/generate-legal-brief.mjs --python <python-with-python-docx>
```

The builder applies named Word styles for the firm letterhead, template, title,
metadata, evidence table and source references. Page size is Letter; source IDs,
author, reviewer, revision and review status remain in the document. The firm
identity is invented for the demonstration.

For layout QA in this Windows environment, the packaged render_docx.py was tried
but LibreOffice was unavailable. The draft was exported read-only with installed
Microsoft Word and both pages were rendered and visually inspected. The Word
file and the chat preview are checked for consistent content and permitted sources.

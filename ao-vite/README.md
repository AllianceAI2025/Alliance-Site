# AllianceOne website

React + Vite marketing site for law, consulting and advisory firms. The active
homepage brings the first demo window into the brand hero, with its explanatory
copy beneath it, and retains the original conversation window sizing from 1891aa2.
It demonstrates internal litigation experience in two continuous conversations: **Apply firm experience → Keep current work grounded**. The current
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
`npm test` runs 41 checks: shared playback and retained consulting fixtures,
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

### 1. Apply firm experience — Margaret Whitfield, partner

Margaret asks where the firm has handled comparable inspection-record issues.
The three-matter comparison surfaces relevant conditions, arguments and recorded
results, with contributors and original sources available. It then moves to one
concrete review: why Sofia changed Avery’s Harbor draft and what Northstar
should carry forward. The original and reviewed drafts, court decision and
current evidence questions appear in that same thread. There is no second
retelling of the three motion outcomes. People and documented economics remain
available in supporting matter records.

### 2. Keep current work grounded — Avery Ross, assigned associate

Avery starts from his assignment, client objectives and permitted firm guidance.
He asks for the Litigation Matter Brief template and instructs AllianceOne to
send the first draft to Sofia for review. Revision 1 develops in the thread,
with its source references and a linked review-request record.

The Northstar monitor then posts an unprompted source update. It connects the
October 22 client email and Sofia’s review to revision 1’s custodian section and
proposed records approach. The update shows the earlier assumption, the new
source, the work affected and the decisions still requiring review. It does not
navigate away or invent a user request to read communications.

Avery then asks for revision 2. The two-page assessment and evidence map build
on fictional Whitfield Hale LLP letterhead, retaining the earlier account and
explaining what changed and why. No filing, budget change or amendment of client
instructions is approved by creating the brief.

The finished brief remains an in-chat artifact with no download control. Its
letterhead, content, evidence map and source record use `matterBrief.js`. An
internal Word reference is retained at `public/demo/northstar-matter-assessment.docx`
for engineering and template QA; it is not linked from the website. The brief
remains a draft for Sofia’s review. No filing approval is implied.

Avery's scene shows only his assessment thread. It permits Northstar material,
published practice guidance and the Harbor excerpt Sofia explicitly shared for
this assignment. It does not expose the full Harbor, Cedar Ridge or Briar Glen
files, even though Avery helped prepare Harbor's earlier work.

## Website structure

- **Home:** each demo uses its main headline and a cross-practice description
  without a separate phase label.
  The first demo's full-width window overlaps the brand hero; its introduction
  follows on the light surface below. The window retains the
  conversation height from 1891aa2, with its header and composer outside that
  height. The windows contain the legal
  narrative. The existing dark green, warm white and restrained accents remain.
- **Product (`/allianceone/`):** firm knowledge, practice guidance, work product,
  matter/engagement record, source ownership, decision rights and accountable
  deployment across law, consulting and advisory. Legal details stay in the
  example panels; a Northstar overview uses the same current-matter data as the demo.
- **Solutions (`/solutions/`):** cross-practice explanations of comparison, reasoning
  and review, continuity, changing evidence and reviewed future reuse. Comparison and
  review illustrations reuse Home’s records. The full letterhead brief appears
  as an artifact in the demo only; the Solutions handoff section is text only. Consulting and
  advisory applications remain part of the broader story.
- **Company and Design partners:** law firms join consulting and advisory firms
  in the audience. Practice configuration, source integration, adoption and a
  recurring client workflow are described consistently, with agreed quality
  criteria and benefit measures. The inquiry fields and submission behavior are unchanged.

The positioning remains firm knowledge at the point of work. This is not a claim
that other AI tools cannot retrieve internal sources or reason across systems.
Internal firm experience complements current legal research; it does not supply
verified legal authorities or make the attorney's decision.

## Playback and implementation map

- `src/demo/EngagementDemo.jsx`: shared player, sidebar, source dialog, watchability
  and automatic conversation following.
- `src/demo/litigation.js`: corpus, story text, events, revisions and source resolver.
- `src/demo/LegalDemoArtifacts.jsx`: comparison, retained draft review, assignment,
  source update and two retained brief versions; fields build progressively.
- `src/demo/matterBrief.js`: shared firm template and versioned brief content.
- `src/demo/legal-demo.css`: artifact styling within the existing visual system.
- `src/demo/demoPlayback.js`: shared timeline, visibility and scrolling helpers.
- `src/demo/legalDemo.test.js`: active corpus and narrative invariants.

The public stories use `scope` and `deliver` as compatibility keys for existing
window sizing and anchors. Home no longer renders a `plan` demo. Old Home
`#plan` links resolve to the combined precedent conversation; the Solutions
reasoning-and-review chapter remains a valid independent section.

`conversationAt` merges typed requests and agent events in chronological order.
An agent event has its own author, timestamp and source references, without a
user bubble. Earlier artifact versions freeze at their completed frame. Each
scene plays once, holds its last frame, and restarts after leaving and returning.
Partial clipping of the feed or composer pauses the clock; reduced motion shows
the final state. Playback runs at 80% speed, about two minutes for both stories,
with a final reading hold. The hero overlap and both retained window dimensions
are unchanged.

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

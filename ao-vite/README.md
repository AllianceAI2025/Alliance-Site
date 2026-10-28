# AllianceOne website

React + Vite marketing site for law, consulting and advisory firms. The homepage
keeps the brand hero, overlapping opening window and established window sizes.
Three focused scenes follow one lead attorney, Margaret Whitfield, through one
fictional Northstar matter. These are views of connected work, not lifecycle gates.

## Development

```sh
npm install
npm run dev
npm test
npm run build
```

Existing preview: http://localhost:5176. Production build: `dist/`.
The 41 checks cover playback, the retained consulting fixtures and the active
litigation narrative, source chronology, permitted reuse and document revisions.

## The demonstration

1. **Relevant experience.** Three prior matters answer different questions about
   repair history, competing causes and earlier complaints. Each connects the
   initial assessment with later evidence and its recorded result. The question
   for Northstar is explicit. The opening contains no staffing or pricing pitch.
2. **Reasoning and approach.** Margaret asks what Harbor's assessment missed.
   Its initial view, engineering evidence, revised investigation, settlement and
   documented discovery effort build in sequence. A follow-up examines what
   supported the production motion, what review changed and what the actual
   order decided. The Northstar recommendation follows from those differences.
3. **Work product and new evidence.** Margaret requests an initial assessment in
   the firm's Litigation Matter Brief format. The document builds on Whitfield
   Hale LLP letterhead. A proactive agent event connects a newly received email
   and attachment to the assessment's repair-history assumption. Margaret directs
   a revision. Revision 2 prioritizes chronology and engineering comparison,
   retains revision 1 and explains the change. Its legal effect remains open.

There is no associate handoff, persona profile, PSA writeback, download action or
separate lesson-admission step. Document authorship and source attribution stay
available. The attorney remains responsible for the recommendation and release.

## Fictional corpus and evidence

`src/demo/litigation.js` supplies the shared corpus, source inspector, stories and
Product overview. These are invented matters and people, not legal authorities,
actual client work or records of Hellmuth & Johnson. No real firm's letterhead,
endorsement or production connection is represented.

| Matter | Distinct experience | Recorded result |
| --- | --- | --- |
| Harbor Point Owners | A completed patch was mistaken for a resolved problem; later engineering and a second archive changed the assessment | Partial production order, followed later by mediation; no liability finding |
| Cedar Ridge Logistics | Operating logs helped distinguish condensation from alleged defects | Production before the hearing; motion withdrawn without a merits ruling |
| Briar Glen Properties | An earlier complaint challenged the initial chronology; records control was assumed without sufficient evidence | Motion denied without prejudice; later negotiated resolution |
| Northstar Foods | Current distribution-center water intrusion, initially understood through a patch and later recurrence | Assessment and proposed investigation; no filing approved |

Each closed matter retains six attributed records: initial assessment, motion
versions, court order or withdrawal, partner review, fees and reviewed closeout.
Fees have phase figures and a documented explanation rather than a causal story
inferred from the amount. The source dialog distinguishes argument, review,
recorded outcome and transfer limits.

Northstar's initial sources were available by October 21, 2026. The October 22
forwarded email encloses a November 3, 2023 message and maintenance log. Source
`date` and `receivedAt` describe receipt; `originalDate` describes the old evidence.
The new evidence describes post-patch leakage. It does not establish the same
cause, determine accrual or settle a legal defense. Margaret's October 23
instruction is a separate source in revision 2.

The assessment uses current-matter records, reviewed guidance and authorized
Harbor/Briar excerpts. Access to those excerpts does not grant access to full
prior-matter files. The first two scenes assume Margaret has authorized access
to the compared matters. Production access must enforce actual firm policies.

## Documents

`src/demo/matterBrief.js` is the versioned content model for the letterhead
artifact and internal Word reference. Both revisions have Margaret as author.
The website shows the document and an expandable source record; it does not
initiate a file download. The retained reference is
`public/demo/northstar-matter-assessment.docx`.

Regenerate the reference after content changes:

```sh
node scripts/generate-legal-brief.mjs --python /path/to/python
```

This requires python-docx. The reference contains the assessment, evidence table
and source appendix. Its OOXML content is checked against the displayed model.
The current local runtime lacks bundled LibreOffice, so standalone Word page
rendering is unavailable here; browser artifact layout is verified separately.

## Playback and engineering map

- `EngagementDemo.jsx`: shared shell, sidebar, sources, visibility and following.
- `litigation.js`: corpus, actors, timing, proactive event and source permissions.
- `LegalDemoArtifacts.jsx`: progressively built comparison, reasoning, motion
  review, incoming evidence, original document and revised document.
- `demoPlayback.js`: retained exchanges, typed follow-ups, frozen artifact clocks,
  reading holds and automatic scroll calculations.
- `matterBrief.js`: shared document content and revision-specific evidence.

A scene plays on entering view, pauses when its reading area is clipped and holds
its completed artifact. Leaving and returning restarts only that scene. The
response-only hero can begin once the reading pane fits; scenes with follow-up
requests wait for their composer too. Sources pause the scene and open in a
local dialog. They do not navigate to an overview or another page. Follow-up
requests append beneath retained messages; an agent event never invents a user
request. Each artifact stops changing when its exchange finishes.

For backend implementation, retain stable matter/source/version identifiers,
authorship and access, original and received dates, evidence-to-claim links,
assumptions and their status, the attorney's instruction, and the affected
revision. Capture review and changes as work occurs; reviewed reuse keeps its
source and limits. A generated explanation is not a verified causal conclusion.

## Website structure

Home is the cross-practice overview with concrete legal examples. Product explains
firm knowledge, the maintained record, system ownership and deployment.
Solutions explains comparison, review, changing evidence and reuse. Their legal
examples share the same records as Home; the full brief appears only in the demo.
Company and Design partners address law, consulting and advisory consistently.

The positioning is firm knowledge at the point of work. This demonstration does
not claim other platforms cannot search internal precedent, connect systems,
produce documents or run agents. It illustrates the quality and continuity of
the firm's reasoning as it is applied to live work.

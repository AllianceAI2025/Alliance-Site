# AllianceOne website

React + Vite marketing site. The landing page leads with an illustrative Northstar
engagement demo, followed by AllianceOne, Alliance Systems Group and the design
partner invitation. Existing site wording and forest, cream and lime branding are
retained; decorative grids and the six stacked phase demos are removed.

## Local development

```sh
npm install
npm run dev
```

The dev server uses http://localhost:5176. `npm run build` produces `dist/`;
`npm run preview` serves a production build.

## Where to edit

- `src/LandingPage.jsx` and `src/landing.css`: page structure and marketing copy.
- `src/demo/northstar.js`: fictional conversation, sources, resources and sequence.
- `src/demo/EngagementDemo.jsx`: typing, playback, pause/resume, seeking and chapters.
- `src/demo/DemoArtifacts.jsx`: scope, pricing, proposal, resource plan, application
  receipts, Word-style assessment and evidence workbook.
- `src/demo/engagement-demo.css`: the product demo appearance and responsive layout.
- `src/Site.jsx` and `src/site-chrome.css`: shared navigation, footer and the
  existing design partner inquiry form. `src/App.jsx` keeps compatibility exports.
- `src/CompanyPage.jsx`: concise company and services page.
- `src/SecurityPage.jsx` and `src/DesignPartnerPage.jsx`: security and inquiry pages.
- Page entry HTML files: SEO metadata and canonical URLs.
- `public/brand/asg/alliance-systems-group-mark-refined.png`: approved lion concept.
- `public/brand/systems/SOURCES.md`: application mark sources and usage context.

## Demo narrative

**Scope:** establish context, find Harbor and Meridian precedent, trace people and
review feedback, draft scope, check current resource availability and internal
costs, prepare a proposal, then record the negotiated exact-version acceptance.

**Plan:** begin a separate planning conversation using the accepted commitments
and reviewed pursuit team. Develop the schedule, retain the plan review, obtain
approval, create Project Operations and SharePoint records, and read them back
against the approved plan. Application setup is part of Plan.

**Deliver:** Avery inherits the approved assignment, methods and Harbor review
context. Develop a data-readiness assessment using the firm template and evidence
workbook, then retain Sofia's challenge and the response in the revised assessment.

The demo uses local scripted data, not connected accounts or a live model. It is
labeled as fictional on the page. Playback starts on arrival: the opening prompt
types, agent activity appears and the response streams. Pause retains progress;
Replay starts the conversation again. The engagement sidebar shows Northstar's
scoping, planning and assessment threads and follows the active conversation.
Selecting a thread or opening a source or artifact pauses playback for inspection.
Harbor and Meridian open their retained engagement context. On smaller screens,
the header menu opens the same sidebar. Chapters and the progress control also
allow seeking. Reduced motion skips character animation.

## Routes and publishing

`/` is the full landing page. `/allianceone/` retains the product-focused version;
`/how-it-works/` opens the same condensed demo without the longer product sections.
`/company/`, `/security/` and `/design-partners/` remain available. `/platform/`
continues to redirect to `/allianceone/`.

GitHub Actions publishes pushes to `main`. Work on `refactor` remains a branch
preview until it is merged. Do not run `npm run deploy` for branch review.

Keep claims grounded in the existing positioning: `POSITIONING.md` documents the
language and ownership rules. Practitioners retain responsibility for judgments
and approvals; source systems remain authoritative for the facts they own.

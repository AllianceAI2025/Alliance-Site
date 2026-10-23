# AllianceOne website

React + Vite marketing site. The landing page leads with an illustrative Northstar
engagement conversation, followed by separate Scope, Plan and Deliver sections,
Alliance Systems Group and the design partner invitation. Main’s Inter Tight
typography, signature lime, ink, bone and atmospheric green backgrounds form the
design foundation. Dense grids and the previous six-phase presentation are removed.

## Local development

```sh
npm install
npm run dev
```

The dev server uses http://localhost:5176. `npm run build` produces `dist/`;
`npm run preview` serves a production build.

## Where to edit

- `src/LandingPage.jsx` and `src/landing.css`: page structure and marketing copy.
- `src/demo/northstar.js`: fictional conversation, sources, resources and the
  `presentations` mapping for the opening and three phase players.
- `src/demo/EngagementDemo.jsx`: single-exchange rendering, typing, visible-player
  autoplay, pause/resume, replay, example selection and source inspection.
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

**Opening:** establish Northstar’s context, then find Harbor and Meridian precedent.
The hero includes the engagement sidebar and Northstar’s three work threads.

**Scope:** carry precedent into the draft scope, check current resource availability
and internal costs, then prepare the reviewed proposal. Pricing follows the
resource and effort basis; it is not introduced in the opportunity overview.

**Plan:** begin a separate planning conversation using the negotiated $400,000
proposal v5, Won opportunity and confirmed pursuit team. Develop the schedule,
retain the plan review, obtain
approval, create Project Operations and SharePoint records, and read them back
against the approved plan. Application setup is part of Plan.

**Deliver:** Avery inherits the approved assignment, methods and Harbor review
context. Develop a data-readiness assessment using the firm template and evidence
workbook, then retain Sofia's challenge and the response in the revised assessment.

The demo uses local scripted data, not connected accounts or a live model. It is
labeled as fictional on the page. Each player shows exactly one user/assistant
exchange at a time, replacing the previous exchange rather than accumulating a
transcript. The opening starts on arrival; phase players start when scrolled into
view. Offscreen players and hidden browser tabs retain their playback position.

The prompt types, agent activity appears and the response streams. Pause retains
progress; Replay restarts that player. The text controls below each player select
a completed example for inspection. Sidebar thread links lead to the corresponding
phase section. Harbor and Meridian open their retained engagement context.
Opening a source, interacting with an artifact or expanding agent activity pauses
playback. On smaller screens, the hero header menu opens the engagement sidebar.
Phase players omit the sidebar to keep the work legible. Reduced motion skips
character animation. Players remain independent and never navigate the page or
another player when advancing to the next exchange.

## Routes and publishing

`/` is the full landing page. `/allianceone/` retains the product-focused version;
`/how-it-works/` opens the same opening and three phase demonstrations without the
company section.
`/company/`, `/security/` and `/design-partners/` remain available. `/platform/`
continues to redirect to `/allianceone/`.

GitHub Actions publishes pushes to `main`. Work on `refactor` remains a branch
preview until it is merged. Do not run `npm run deploy` for branch review.

Keep claims grounded in the existing positioning: `POSITIONING.md` documents the
language and ownership rules. Practitioners retain responsibility for judgments
and approvals; source systems remain authoritative for the facts they own.

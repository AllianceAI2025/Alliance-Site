# AllianceOne website

React + Vite marketing site. Three single-exchange demonstrations show how Harbor
and Meridian experience carries into Northstar's scope, plan and delivery work.
Scope is the opening demonstration; there is no separate opening player or
multi-frame sequence. Total playback across the three examples is 45 seconds.

## Local development

```sh
npm install
npm run dev
npm test
npm run build
```

The existing dev server uses http://localhost:5176. The build produces `dist/`.
`npm run preview` serves a production build. No dependencies were added for motion.

## Where to edit

- `src/LandingPage.jsx` and `src/landing.css`: page composition, copy and light
  neutral palette. Brand marks and existing positioning are retained.
- `src/demo/northstar.js`: the three prompts, responses, sources, people, accepted
  commitment and connected record. This is the fictional data contract.
- `src/demo/EngagementDemo.jsx`: independent visibility-aware clocks, typing,
  pause/resume, replay, source dialogs and a single inline artifact per exchange.
- `src/demo/DemoArtifacts.jsx`: progressively built scope, resource schedule,
  illustrated approval/write/readback, and the Word-style assessment revision.
- `src/demo/demoPlayback.js`: build progress and execution ordering. Approval must
  precede application writes; readback occurs after both application operations.
- `src/demo/demoPlayback.test.js`: narrative continuity, available capacity,
  execution ordering, independent readback comparisons and incomplete build states.
- `src/demo/engagement-demo.css`: product shell, in-chat cards and responsive views.
- `src/Site.jsx`, `src/site-chrome.css`, `src/CompanyPage.jsx`: shared navigation,
  footer, company page and inquiry form.
- `public/brand/asg/alliance-systems-group-mark-refined.png`: retained lion concept.
- `public/brand/systems/SOURCES.md`: application mark sources and usage context.

## What each example proves

**Scope (14.5s):** One question asks about relevant past work. The scope develops
its objective and four workstreams. Harbor's evidence review explains an early
evidence gate; Meridian's review explains explicit boundaries, acknowledgment and
transition readiness. Avery and Lena's relevant delivery experience is paired
with a separate current availability check before a proposal is submitted.

**Plan (16s):** A separate conversation begins from accepted proposal v5 and a Won
opportunity. The reviewed pursuit team carries forward. Six resource windows build
row by row; bars grow into their confirmed weeks. Avery's 36-hour assessment,
September 7 deadline and Sofia's review are tied to the diagnostic baseline.
Sofia reviews the plan before Margaret approves it. The illustrated approval then
creates Project Operations and SharePoint records. A separate application-response
fixture is compared with the approved assignment's owner, reviewer, effort, due
date and baseline. A mismatch produces a discrepancy rather than a success claim.
The accepted-proposal source retains the pricing basis and negotiated changes.

**Deliver (14.5s):** Avery inherits the approved assignment and firm template.
Northstar evidence populates the report, with Harbor and Meridian guidance beside
the work. Sofia asks what the gaps prevent the team from concluding. Avery's
revision explicitly limits design readiness. Sources, review feedback and revision
rationale remain part of the connected engagement record as the work develops.

The animation clock drives real intermediate content and bar geometry. Artifact
rows and sections are absent until their build point; cards do not arrive complete.
There are no scene counters, example tabs or automatic chapter changes.

## Playback and inspection

Each example starts when visible, retains its position offscreen, and pauses when
the browser document is hidden. Pause/Play retains partial builds; Replay restarts
that example. Scrolling or interacting with an artifact pauses it. Source links
open an accessible modal without replacing the work. The hero sidebar lists three
Northstar threads and the Harbor and Meridian engagement records; thread links
scroll to the corresponding section. Mobile uses the same sidebar behind a menu.
Reduced motion shows each finished example without character or construction motion.

All data, approvals and connector actions are illustrative. The page makes no live
model requests and does not connect to client systems. The illustrated approval
runs as part of playback; viewers can also use the approval button after review.
These fixtures specify the intended behavior for engineering, not a working backend.

## Routes and publishing

`/` includes the three demonstrations, product explanation, Alliance Systems Group
and the design partner invitation. `/allianceone/` and `/how-it-works/` retain the
same three examples without the company section. `/company/`, `/security/` and
`/design-partners/` remain available; `/platform/` redirects to `/allianceone/`.

GitHub Actions publishes pushes to `main`. Changes on `refactor` remain a branch
preview until merged. Do not run `npm run deploy` for branch review.

`POSITIONING.md` records the ownership and language rules. Practitioners retain
responsibility for judgments and approvals; source systems remain authoritative
for the facts they own. The longer workflow prototype is a separate application.

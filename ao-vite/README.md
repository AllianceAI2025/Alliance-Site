# AllianceOne website

React + Vite marketing site. Three autonomous demonstrations show how Harbor
and Meridian experience carries into Northstar's scope, plan and delivery work.
Scope is the opening demonstration. Each scene is a continuous thread: new requests and results
append below earlier messages and artifacts. Playback runs at 80% speed: about 104 seconds of active content across the three
examples. Each holds its finished artifact for 10 seconds before looping in place.

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

- `src/LandingPage.jsx` and `src/landing.css`: page composition, copy and the
  Main brand palette: ink, bone, paper and signature lime. Dark demo surrounds,
  light document surfaces and restrained green accents replace decorative grids.
- `src/demo/northstar.js`: the three prompts, responses, sources, people, accepted
  commitment and connected record. This is the fictional data contract.
- `src/demo/EngagementDemo.jsx`: independent visibility-aware clocks, typing,
  pause/resume, automatic loops, source dialogs and retained exchanges in a continuous conversation.
- `src/demo/DemoArtifacts.jsx`: progressively built scope, resource schedule,
  illustrated approval/write/readback, and the Word-style assessment revision.
- `src/demo/demoPlayback.js`: build progress and execution ordering. Approval must
  precede application writes; readback occurs after both application operations.
- `src/demo/demoPlayback.test.js`: narrative continuity, available capacity,
  execution ordering, independent readback comparisons, incomplete builds and loop boundaries.
- `src/demo/engagement-demo.css`: product shell, in-chat cards and responsive views.
- `src/Site.jsx`, `src/site-chrome.css`, `src/CompanyPage.jsx`: shared navigation,
  footer, company page and inquiry form.
- `src/demo/assessment.json`: shared report copy used by the preview and Word builder.
- `scripts/build-assessment.py`: regenerates the Word export with `python-docx`.
- `public/demo/northstar-data-readiness-assessment.docx`: downloadable approved revision 2.
- `public/brand/asg/alliance-systems-group-mark-refined.png`: retained lion concept.
- `public/brand/systems/SOURCES.md`: application mark sources and usage context.

## What each example proves

**Scope (38.8s + 10s reading hold):** The question about similar work gets a substantive
answer: Harbor's late regional challenge caused another design pass and a one-week
delay; Meridian's on-time delivery still saw slower adoption. The findings card
names the contributors, compares submitted v1 with reviewed v2, and states each
record's practical implication for Northstar. Its heading, conditions, findings,
contributors, submitted/accepted revisions and Northstar implications write in
progressively. There is no “Developing” label. Margaret's request to apply the
lessons appears below that completed response. A new scope artifact grows under
the new reply; the historical record remains above it. A separate staffing question
then asks who fits and whether they are available. Six proposed people appear
with relevant work, current windows and proposed effort. Daniel's Week 3 hold
remains conditional, and Sofia's Week 10 release needs later review coverage.
The six-person, 1,840-hour basis carries into Plan after acceptance and confirmation.

**Plan (28.8s + 10s reading hold):** A separate conversation begins from accepted proposal v5 and a Won
opportunity. The reviewed pursuit team carries forward. Six resource windows build
row by row; bars grow into their confirmed weeks. Avery's 36-hour assessment,
September 7 deadline and Sofia's review are tied to the diagnostic baseline.
Sofia reviews the completed plan. Margaret then types “Approve plan v1 and submit
it to Project Operations.” The sent message appends below the reviewed schedule.
That schedule stays in the thread while a separate result describes the write, creates
the project, 14 deliverables and six resource assignments, and files the plan in
SharePoint. No submission button or viewer interaction is required. A separate application-response
fixture is compared with the approved assignment's owner, reviewer, effort, due
date and baseline. A mismatch produces a discrepancy rather than a success claim.
The accepted-proposal source retains the pricing basis and negotiated changes.
After creation, the same artifact reveals Project Operations record PRJ-NS-20418
and assignment ASN-NS-DR01. Project dates, ownership, planned hours and the returned
assignment are visible. The PSA view is a local response fixture, not a live
Microsoft connection.

**Deliver (36.9s + 10s reading hold):** Avery inherits the approved assignment and firm template.
Northstar evidence populates the report, with Harbor and Meridian guidance beside
the work. Avery automatically types a request to send revision 1 and its evidence
to Sofia. Her feedback asks what the evidence gaps prevent the team from concluding.
Avery types a request to address it. The report develops the decision implication
of each evidence gap, then rewrites the conclusion. Revision 2 returns to Sofia,
and she approves it. Avery then types a request to export the approved version in
the firm template. Earlier requests stay in the conversation. Revision 1, Sofia's
review, revised/approved revision 2, and the export receipt each remain under the
request that produced them. Export produces
a Word-file receipt with a real download. Review requests, feedback, revision
rationale and approval remain linked to the engagement.

Review, revision and export run automatically and show the actor and resulting
status, with no action buttons to advance the story. Autoplay illustrates the export
without downloading a file on every loop; an optional finished-file link starts a
browser download. The client-facing document uses Northstar
evidence and excludes other clients' names and internal precedent discussions.

The animation clock drives real intermediate content and bar geometry. Artifact
rows and sections are absent until their build point; cards do not arrive complete.
There are no scene counters, example tabs or automatic chapter changes.

## Playback and inspection

Each example starts when visible, retains its position offscreen, and pauses when
the browser document is hidden. A finished scene holds for 10 seconds, then resets
its own conversation and feed scroll position without navigating to another section.
A small Pause/Play icon appears on hover, keyboard focus or touch devices. It retains
partial builds when paused. Scrolling, touch and artifact focus do not pause playback.
The conversation follows explicit narrative timestamps and actual content size,
including changes from plan to PSA record and from review to revision. It scrolls
only the internal feed; it never moves the webpage. Sending a follow-up appends
the new exchange below the preceding result without resetting the scroll position.
Completed artifacts have capped clocks so their original versions stay unchanged.
Only a new loop clears the conversation and resets its own feed. Source links
open an accessible modal without replacing the work; closing it resumes playback. The hero sidebar lists three
Northstar threads and the Harbor and Meridian engagement records; thread links
scroll to the corresponding section. Mobile uses the same sidebar behind a menu.
Reduced motion shows each finished example without character, construction or loop motion.

All data, approvals and connector actions are illustrative. The page makes no live
model requests and does not connect to client systems. The illustrated approval and PSA submission
run entirely as part of playback.
These fixtures specify the intended behavior for engineering, not a working backend.

The Word builder uses Python with `python-docx`. Regenerate with
`python scripts/build-assessment.py`. Word pagination QA requires a DOCX renderer
such as LibreOffice; the Windows workspace currently has no bundled renderer.
The report content and OOXML package are checked separately from browser QA.

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

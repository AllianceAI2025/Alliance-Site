# AllianceOne website

React + Vite marketing site. Three autonomous demonstrations show how Harbor
and Meridian experience carries into Northstar's scope, plan and delivery work.
Scope is the opening demonstration. Each scene is a continuous thread: new requests and results
append below earlier messages and artifacts. Playback runs at 80% speed: about 140 seconds of active content across the three
examples. Each plays once per visit and holds its finished artifact until you leave the section.

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
- `src/demo/engagementPlan.js`: the complete approved work breakdown and independent
  Project Operations response fixture.
- `src/demo/EngagementDemo.jsx`: independent visibility-aware clocks, typing,
  pause/resume, completion holds, source dialogs and retained exchanges in a continuous conversation.
- `src/demo/DemoArtifacts.jsx`: progressively built scope, resource schedule,
  illustrated approval/write/readback, and the Word-style assessment revision.
- `src/demo/demoPlayback.js`: build progress and execution ordering. Approval must
  precede application writes; readback occurs after both application operations.
- `src/demo/demoPlayback.test.js`: narrative continuity, available capacity,
  execution ordering, independent readback comparisons, incomplete builds, complete-plan readback and single-play completion.
- `src/demo/engagement-demo.css`: product shell, in-chat cards and responsive views.
- `src/Site.jsx`, `src/site-chrome.css`, `src/CompanyPage.jsx`: shared navigation,
  footer, company page and inquiry form.
- `src/demo/assessment.json`: shared report copy used by the preview and Word builder.
- `scripts/build-assessment.py`: regenerates the Word export with `python-docx`.
- `public/demo/northstar-data-readiness-assessment.docx`: downloadable approved revision 2.
- `public/brand/asg/alliance-systems-group-mark-refined.png`: retained lion concept.
- `public/brand/systems/SOURCES.md`: application mark sources and usage context.

## What each example proves

**Scope (38.8s, then holds):** The question about similar work gets a substantive
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

**Plan (47.5s, then holds):** A separate conversation begins from accepted proposal v5
and a Won opportunity. The same six resources and confirmed windows carry forward.
The schedule, all fourteen deliverables across four workstreams, and four review gates
build progressively. Each deliverable has dates, an owner, reviewer, acceptance criteria
and input dependencies. Avery's 36-hour assessment remains within his 384-hour booking.
Dependencies apply at acceptance; preparation can overlap.

Sofia reviews the full plan. Margaret types a request to approve plan v1 and submit the
whole plan to Project Operations. The separate write result creates the project, then
shows all six bookings, four workstreams, fourteen task records and four gates being
written. Accepted commercial terms, scope boundary and client dependencies accompany
the baseline. The approved plan and accepted proposal are linked in SharePoint.
A separate response fixture is compared against every approved project field, resource
booking, deliverable (including dates, reviewers, dependencies and acceptance criteria)
and review gate, alongside Avery's assignment. Missing or changed records produce a
discrepancy rather than a success claim. The final receipt confirms the full write and
readback. The PSA view is a local response fixture, not a live Microsoft connection.

**Deliver (53.9s, then holds):** Avery's sidebar contains his assessment thread;
the manager's pursuit and staffing conversations are absent. Following the workflow
prototype's consultant sequence, he first asks what he is delivering and what it must
establish. An assignment brief shows the same 36-hour task, September 7 deadline,
Sofia review, acceptance criteria and verified PSA assignment from plan v1.
He then asks which report format applies and what Sofia challenged in his Harbor
HG-D01 evidence pack. The response identifies the v1 ownership/source defects,
the accepted v2 corrections and their application to Northstar's evidence limits.
The report format is named Data Readiness Assessment; the client file is named
Northstar Foods — Data Readiness Assessment.docx. Template identifiers are not used
as presentation names. Source links distinguish published practice material from
Sofia's review excerpt explicitly shared for Northstar.
Only after these exchanges does Avery request a draft. Northstar evidence then
populates the Word-style report, with Avery’s shared Harbor review and the published Ownership and Handoffs note beside
the work. The Word artifact grows progressively after that drafting request.
Avery automatically types a request to send revision 1 and its evidence to Sofia. Her feedback asks what the evidence gaps prevent the team from concluding.
Avery types a request to address it. The report develops the decision implication
of each evidence gap, then rewrites the conclusion. Revision 2 returns to Sofia,
and she approves it. Avery then types a request to export the approved version in
the named assessment report format. Earlier requests stay in the conversation. Revision 1, Sofia's
review, revised/approved revision 2, and the export receipt each remain under the
request that produced them. Export produces
a Word-file receipt with a real download. Review requests, feedback, revision
rationale and approval remain linked to the engagement.

Review, revision and export run automatically and show the actor and resulting
status, with no action buttons to advance the story. Autoplay illustrates the export
without downloading a file automatically; an optional finished-file link starts a
browser download. The client-facing document uses Northstar
evidence and excludes other clients' names and internal precedent discussions.

The animation clock drives real intermediate content and bar geometry. Artifact
rows and sections are absent until their build point; cards do not arrive complete.
There are no scene counters, example tabs or automatic chapter changes.

## Playback and inspection

Each example starts from the beginning when enough of its window is visible to
watch. Leaving the window resets its clock, conversation and internal scroll;
returning starts a fresh playback, even if it was manually paused on the last visit.
Small scrolls near the visibility boundary do not repeatedly restart it, and a
brief arrival delay lets anchor navigation settle before the opening request types.
Playback pauses while the browser document is hidden. Each scene plays once and holds
its finished conversation indefinitely. It restarts only after leaving and returning.
A small Pause/Play icon appears on hover, keyboard focus or touch devices. It retains
partial builds when paused. Scrolling, touch and artifact focus do not pause playback.
The conversation follows explicit narrative timestamps and actual content size,
including changes from plan to PSA record and from review to revision. It scrolls
only the internal feed; it never moves the webpage. Sending a follow-up appends
the new exchange below the preceding result without resetting the scroll position.
Completed artifacts have capped clocks so their original versions stay unchanged.
Leaving the window clears the conversation and resets its own feed. Source links
open an accessible modal without replacing the work; closing it resumes unfinished playback.
Every phase uses the same sidebar and window dimensions, capped to fit the viewport,
with its current thread selected. The manager sidebar lists three
Northstar threads and the Harbor and Meridian engagement records; thread links
scroll to the corresponding section. Avery sees only Northstar and his assessment thread, without historical client folders.
His source resolver uses an explicit allowlist with no fallback to manager records:
Northstar delivery context, his assignment, shared client evidence, a published report
format, Sofia's explicitly shared review excerpt, published practice guidance, and his
assessment/review history. Raw Harbor/Meridian records, commercial negotiation and
resource-allocation records are unavailable from the consultant view. The published
Ownership and Handoffs note credits Lena and Sofia without exposing the source client.
These are illustrative grants for the demo persona. Engineering must enforce actual
project membership, source permissions, sharing grants and publication audiences in
the backend before retrieval, model context assembly and source/document access; the
static marketing bundle itself is not a production authorization boundary.
Mobile uses the same sidebar behind a menu.
Reduced motion shows each finished example without character or construction motion.
At completion, automatic follow reaches the true bottom of the feed, including artifact
footers and padding; no timer remains running and the viewer can scroll back to inspect.

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

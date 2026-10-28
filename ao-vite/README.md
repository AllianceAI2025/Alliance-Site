# AllianceOne website

React + Vite marketing site for consulting, advisory and law firms. Three autonomous demonstrations show how Harbor
and Meridian experience carries into Northstar's scope, plan and delivery work.
Scope is the opening demonstration. Each scene is a continuous thread: new requests and results
append below earlier messages and artifacts. Playback runs at 80% speed: about 140 seconds of active content across the three
examples. Each plays once per visit and holds its finished artifact until you leave the section.
The opening question is visible before playback begins. Replies and later typed
requests run on the existing clock, so an offscreen or newly entered window is
never an empty chat.
Playback waits until the feed and composer fit in the visible viewport. Scrolling
partway past the writing area pauses its clock; bringing it back resumes from the
same point. Leaving the section entirely still resets the demonstration. Narrow
windows use a fixed total height, so longer typed questions wrap within the frame.

## Local development

```sh
npm install
npm run dev
npm test
npm run build
```

The existing dev server uses http://localhost:5176. The build produces `dist/`.
`npm run preview` serves a production build. No dependencies were added for motion.

## Product story and business-case alignment

The site now has four distinct destinations. "Solutions" is the working name
for the engagement-workflow page formerly called How It Works.

| Destination | Content and source |
| --- | --- |
| Home | The hero and Scope, Plan and Deliver demos show the application. Better conditions for delivery completes the loop for firm leadership: more realistic commitments, acting sooner on delivery variance, and reviewed experience informing the next engagement. The closing label connects these benefits to engagement economics and evidence of value. Scope remains separate from the hero. |
| Product (`/allianceone/`) | Firm knowledge leads the hero beside a Northstar overview grounded in the same accepted proposal, approved plan and reviewed assessment as the demos. The IP explorer carries the consolidated methods, templates, precedent and quality explanation. Approved engagement state and source-system ownership follow. The model section includes accountable deployment; benefits use Home's three names plus evidence supporting the firm's proposition. |
| Solutions (`/solutions/`) | Main's How It Works plus relevant Explore material: opportunity ownership, context and precedent; resource fit and availability before proposal approval; accepted scope and planning; approved PSA writeback/readback; consultant assignment, review and export; delivery signals, decisions and reviewed future reuse. |
| Company (`/company/`) | Alliance Systems Group's software and services, systems integration, practice configuration, workflow design, adoption and the bounded implementation approach. |

Product explains what AllianceOne maintains. Precedent is part of firm knowledge;
the approved engagement record and source-system ownership form one connected
section. The model section retains “Frontier models know how to reason.
AllianceOne knows how your firm works.” and explains practice configuration,
validated system mappings, implementation and ongoing support for the selected
workflow. Solutions explains how practitioners use
it. Both preserve the business case's terms: firm knowledge, engagement record
and approved baseline.

The content follows the September 2026 investor business case, particularly
sections 3 (customer value), 4 (knowledge and the engagement loop), 7.4–7.5
(the consulting workflow around frontier AI), 8.1 (bounded first deployment)
and 10.1 (access and human approval). Current practice knowledge includes
frameworks, diagnostic tools, training, publications and practitioner judgment,
as well as historical engagement evidence.

The public sequence remains Scope, Plan and Deliver. Materializing the approved
plan is part of Plan; reconciliation and reviewed experience continue through
delivery and into the next engagement. Capturing conversations, decisions and
revisions is part of doing the work. Practitioners review lessons before future
reuse; the application does not ask a consultant to manually "admit" one in chat.
Staffing capability and current availability are checked during pursuit, before
commercial commitments are accepted.

The Northstar, Harbor and Meridian examples remain fictional. Product illustrations
are readable static views, the knowledge explorer and signal examples are local
controls, and the homepage demos keep their existing scripted playback. None
claims a live connector or production authorization boundary. The confidential
business case is not bundled or linked. No customer ROI, certifications,
universal connectors or automatic improvement from unreviewed data is claimed.

## Where to edit

- `src/LandingPage.jsx`: the homepage hero and shared text / demo section structure.
- `src/home.css`: the separate hero and Scope layout, outcome introductions, artifact-focused
  Plan and Deliver chapters, and the three delivery outcomes in the value section.
  Container queries adapt application navigation and artifacts to each window’s
  available width. Scope remains the first product surface on narrow screens.
- `src/PlatformPage.jsx`: the Product / Explore AllianceOne page.
- `src/ProductEngagementOverview.jsx`: the Product hero's Northstar overview, using shared plan and assessment fixtures without changing the demos.
- `src/product-knowledge.css`: Product overview, deployment explanation and responsive knowledge explorer summaries.
- `src/SolutionsPage.jsx`: the engagement-workflow Solutions page.
- `src/CompanyPage.jsx`: the company and implementation story.
- `src/content/siteContent.js`: shared navigation and the fuller public content.
- `src/PageParts.jsx`: shared page shell, knowledge explorer, readable precedent,
  approved-record, resource-plan, writeback, assessment and agent-signal views.
- `src/studio.css`: marketing composition, Instrument Serif display typography,
  Inter reading text, light product windows, ink / warm-white / signature lime.
- `src/Site.jsx` and `src/site-chrome.css`: floating page navigation, selected
  states, responsive menu, shared footer and the existing partner form.
- `src/demo/northstar.js`: the three prompts, responses, sources, people, accepted
  commitment and connected record. This is the fictional data contract.
- `src/demo/engagementPlan.js`: the complete approved work breakdown and independent
  PSA (Kantata) response fixture.
- `src/demo/EngagementDemo.jsx`: independent visibility-aware clocks, typing,
  pause/resume, completion holds, source dialogs and retained exchanges in a continuous conversation.
- `src/demo/DemoArtifacts.jsx`: progressively built scope, resource schedule,
  illustrated approval/write/readback, and the Word-style assessment revision.
  Schedule rows enter as they are populated; empty report sections reserve no space.
  The completed export includes a readable preview from the approved Word report.
- `src/demo/demoPlayback.js`: build progress and execution ordering. Approval must
  precede application writes; readback occurs after both application operations.
- `src/demo/demoPlayback.test.js`: narrative continuity, available capacity,
  execution ordering, independent readback comparisons, incomplete builds, complete-plan readback and single-play completion.
- `src/demo/engagement-demo.css`: product shell, in-chat cards and responsive views.
- `src/Site.jsx`, `src/site-chrome.css`, `src/CompanyPage.jsx`: shared navigation,
  footer, company page and inquiry form.
- `src/demo/assessment.json`: shared report copy used by the preview and Word builder.
- `scripts/build-assessment.py`: regenerates the Word export with `python-docx`.
- `public/demo/northstar-data-readiness-assessment.docx`: internal Word reference for approved revision 2.
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

**Plan (48.8s, then holds):** A separate conversation begins from accepted proposal v5
and a Won opportunity. The same six resources and confirmed windows carry forward.
The schedule, all fourteen deliverables across four workstreams, and four review gates
build progressively. Each deliverable has dates, an owner, reviewer, acceptance criteria
and input dependencies. Avery's 36-hour assessment remains within his 384-hour booking.
Dependencies apply at acceptance; preparation can overlap.

Sofia reviews the full plan. Margaret types a request to approve plan v1 and submit the
whole plan to Kantata OX. The separate write result creates the project, then
shows a compact receipt with allocation totals, workstream counts, Avery’s task
and the separate billing schedule. All six allocations, fourteen deliverables and
four milestones remain in the submitted data and full readback. Review and acceptance
instructions map to task descriptions and checklists. Commercial terms, scope boundary and client dependencies accompany
the baseline. The approved plan and accepted proposal are linked in SharePoint.
A separate response fixture is compared against every approved project field, resource
booking, deliverable (including dates, reviewers, dependencies and acceptance criteria)
and review gate, alongside Avery's assignment. Missing or changed records produce a
discrepancy rather than a success claim. The final receipt confirms the full write and
readback. The PSA view is a local OX response fixture, not a live tenant connection.

**Deliver (69.4s, then holds):** Avery's sidebar contains his assessment thread;
the manager's pursuit and staffing conversations are absent. Following the workflow
prototype's consultant sequence, he first asks what he is delivering and what it must
establish. An assignment brief shows the same 36-hour task, September 7 deadline,
Sofia review, acceptance criteria and verified PSA assignment from plan v1.
Avery brings his own analysis: missing owner fields and an older inventory
are different validation problems. AllianceOne applies relevant Harbor review
experience to that question. Avery then reports a client conversation: Central’s
process is unchanged, but written confirmation remains outstanding. He supplies
his recommendation, asks for the practice assessment format, checks the draft,
and writes his own revised conclusion in response to Sofia’s review.
Published practice material and the shared review excerpt retain their source grants.
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
a one-page Word assessment preview. Review requests, feedback, revision
rationale and approval remain linked to the engagement.

Review, revision and export run automatically and show the actor and resulting
status, with no action buttons to advance the story. Autoplay illustrates the export
without requiring a file download. The client-facing document uses Northstar
evidence and approved practice guidance. Internal Harbor provenance is retained
in the model but the exported report does not disclose the prior client's name.

The animation clock drives real intermediate content and bar geometry. Artifact
rows and sections are absent until their build point; cards do not arrive complete.
There are no scene counters, example tabs or automatic chapter changes.

## Playback and inspection

Each example starts from the beginning when enough of its window is visible to
watch. Leaving the window resets its clock, conversation and internal scroll;
returning starts a fresh playback, even if it was manually paused on the last visit.
Small scrolls near the visibility boundary do not repeatedly restart it, and a
brief arrival delay lets anchor navigation settle before replies begin.
Playback pauses while the browser document is hidden. Each scene plays once and holds
its finished conversation indefinitely. It restarts only after leaving and returning.
A small Pause/Play icon appears on hover, keyboard focus or touch devices. It retains
partial builds when paused. Internal scrolling, touch and artifact focus do not pause
playback. Page scrolling pauses the clock when the feed or composer is clipped,
then resumes the same conversation when the writing area is visible again.
The conversation follows explicit narrative timestamps and actual content size.
A single eased animation updates its destination as text grows, without restarting
the browser's smooth scrolling on each character. Long responses follow their newest
lines instead of pinning their headings. Artifact-entry markers reveal a new card's
opening before following its progressively built rows. Only the current exchange can
move the feed; earlier, frozen artifacts cannot reclaim it. A newly active block
entirely above view (such as another precedent column) can reframe once. This covers
changes from plan to PSA record and from review to revision. It scrolls
only the internal feed; it never moves the webpage. Sending a follow-up appends
the new exchange below the preceding result without resetting the scroll position.
Completed artifacts have capped clocks so their original versions stay unchanged.
Leaving the window clears the conversation and resets its own feed. Source links
open an accessible modal without replacing the work; closing it resumes unfinished playback.
Every phase uses the same sidebar and window shell, with a height suited to its layout,
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

## Review checks for the page redesign

- All 32 demo tests pass; the multi-page production build includes
  the new Solutions destination and its legacy alias.
- Home, Product, Solutions, Company, Design partners, Security and the legacy
  How It Works route were checked at phone width, with no horizontal page overflow
  or unresolved internal section links.
- Product's knowledge controls support keyboard selection. Delivery signal
  examples switch context without leaving the page. Product and Solutions omit FAQ sections.
- Scope, Plan and Deliver were run through completion in the new shell. Plan's
  complete write/readback and Avery's review/revision/approved Word export remain
  intact, each feed reaches its bottom, and leaving resets the finished example.
- The resource-plan and report illustrations use separate class names from the
  animated artifacts. The tablet demo retains its full width with navigation collapsed.
- The revised Home layout was checked at 1440×1000, 1280×720, 390×844 and
  320×740. The composer fits inside its window, clipped playback waits, and
  short-screen navigation scrolls without stretching the frame.

## Routes and publishing

`/` is the demo-led homepage. `/allianceone/` is Product; `/solutions/` is
Solutions; `/company/` is Company. Each has a distinct navigation state and content.
`/how-it-works/` remains a working legacy URL for Solutions and declares
`/solutions/` as its canonical URL. `/platform/` redirects to `/allianceone/`.
`/security/` and `/design-partners/` remain available with the shared navigation.
Cross-page section links resolve after React mounts. Legacy loop / execution /
materialization / learning anchors resolve to their corresponding Solutions content.
The homepage's `#demo`, `#plan-demo` and `#deliver-demo` anchors remain stable.

GitHub Actions publishes pushes to `main`. Changes on `refactor` remain a branch
preview until merged. Do not run `npm run deploy` for branch review.

`POSITIONING.md` records the ownership and language rules. Practitioners retain
responsibility for judgments and approvals; source systems remain authoritative
for the facts they own. The longer workflow prototype is a separate application.

## PSA shown in the demo

The Plan demonstration writes the approved plan to Kantata OX. The destination and
official orange wordmark are configured in `src/demo/psaSystem.js`. The original
SVG from Kantata's media kit is retained unchanged, with its source recorded in
`public/brand/systems/SOURCES.md`. `PsaMark.jsx` displays it at its original aspect
ratio and at least 100px wide, including in the Product overview. The write is
illustrated; it does not connect to a Kantata account.

The OX record uses project fields, a complete Task Tracker hierarchy, hard
allocations, task/resource estimates and a separate Billing Schedule. The
[field mapping and research](docs/kantata-ox-demo.md) describe the supported API
objects, unit conversions and tenant-specific implementation work. A separate
API-shaped fixture is checked against the approved write model; 32 tests include
missing/changed task, checklist, allocation and billing response cases.

Deliver builds one concise report page on firm letterhead: Avery’s recommendation,
three evidence checks, follow-up owners/dates, and a short review/source note. The
fuller context remains linked to the work. The website requires no file download.

Law firms are named as a segment across the site. Law-specific demonstrations live
in the separate demo application, not on the public site.

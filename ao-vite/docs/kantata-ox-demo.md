# Kantata OX demonstration mapping

The website illustrates Kantata OX (formerly Mavenlink), not Kantata SX. There
are no credentials, network writes or live tenant responses in this demo. The
orange wordmark is the original asset from Kantata's official media kit.

Researched against Kantata's public documentation on October 28, 2026. This is a
field and interaction specification for engineering; it is not a certified
integration or a pixel reproduction of the complete Kantata application.

## What the visitor sees

Margaret reviews the plan developed from the accepted proposal, then types an
instruction to approve and submit it. AllianceOne creates a project, writes the
complete work breakdown and resource allocations, prepares the billing schedule,
then compares the returned records with the approved baseline. The returned
artifact uses OX Task Tracker, Resourcing and Billing Schedule terminology.

The source plan remains in the conversation. Returning system records do not
replace the approval or the firm's reasoning with a second, disconnected plan.

## Records and field types

| Approved plan | OX object and fields | Important distinction |
| --- | --- | --- |
| Northstar project | `POST /workspaces`: `title` string, `description` string, `primary_maven_id` integer, `start_date` and `due_date` ISO dates | OX's UI calls the provider's lead **Provider Lead**. The account's project statuses are configurable; the receipt's “Project created” is an integration result, not an invented project status. |
| $400,000 accepted fee | Workspace `budgeted: true`, `currency: "USD"`, `price: 400000` | Workspace price uses currency units; the response also exposes `price_in_cents`. Internal cost and contribution assumptions are not client fee fields. |
| Six confirmed people | `POST /workspace_resources`: `workspace_id`, `user_id`, optional configured `role_id` | Map people to real account users first. A workspace resource links the person/role to task assignments and allocations. |
| 1,840 project hours | `POST /workspace_allocations`: `resource_id`, ISO `start_date` / `end_date`, integer `minutes`, boolean `hard`, `notes` | Hard means confirmed. The 35–100% labels in AllianceOne's planning chart are availability ceilings, not percentages to write as booked allocations. |
| Four workstreams | `POST /stories`, `story_type: "task"` | Parent tasks organize the work breakdown. Parent dates roll up from the children. |
| Fourteen deliverables | Stories with `story_type: "deliverable"`, `parent_id`, `assignee_ids`, `state`, `start_date`, `due_date` | Task Tracker columns use WBS, Type, Title, Assignees, Status, Start and Due. The example uses the standard “Not Started” state rather than a tenant-specific custom status set. |
| Four review gates | Stories with `story_type: "milestone"` | Gate reviewers and required deliverables are retained in the description. A milestone is not an invoice. |
| Review and acceptance instructions | Story `description` string and `checklist` array of strings | OX does not expose the demo's generic Reviewer and Acceptance fields as native story properties. Do not misuse the workspace `approver_id`, which concerns time approval. |
| Avery's 36-hour assessment | Story `time_estimate_in_minutes: 2160`; `POST /assignments` with `story_id`, `resource_id`, `current: true`, `estimated_minutes: 2160` | Task Est. Hours and Resource Estimated Hours are distinct. These 36 hours are included in Avery's 384-hour project allocation. Other deliverables do not receive fabricated estimates merely to distribute the full project effort. Daily Scheduled Hours are not populated by this demonstration. |
| 40 / 40 / 20 billing | `POST /billing_milestones`: `title`, `workspace_id`, integer `amount_in_cents`, `billing_type`, optional ISO `date_to_invoice` or `story_id` | $160,000 / $160,000 / $80,000. The fixture assumes mobilization on the start date, then design-review and board-decision completion. The accepted proposal must define these triggers in a real deployment. No invoice is sent by creating this schedule. |
| Plan/source identity | `external_reference`: `service_name`, `service_model`, `service_model_ref` | Internal NS-D01 / Plan v1 identifiers remain separate from numeric OX IDs. Approval, proposal, client dependencies and decision rationale remain in the AllianceOne record. Custom field IDs would be discovered/configured per tenant, not invented. |

## Dependencies and overlapping preparation

The Northstar dependencies are acceptance prerequisites. Several successor
deliverables start while preparation on predecessors is still underway. The
mapping therefore retains these prerequisites in descriptions and checklists;
it does **not** convert them indiscriminately into Finish-to-Start constraints
that would change the agreed dates.

OX supports FS, SS, FF and SF dependencies in its UI. Its public Story Dependencies
reference currently documents GET operations. A production implementation must
validate a supported dependency authoring route, such as an agreed project
template or another vendor-supported interface, before claiming native dependency
creation. The demonstration does not claim that a POST dependency endpoint exists.

## Fixture and verification

- `src/demo/kantataOX.js` maps the canonical approved plan to public OX request
  field names and units. Fictional account IDs stand in for tenant discovery.
- `src/demo/kantata-readback.json` is a checked-in, separate response fixture.
  It consolidates the indexed maps returned by several reads; it is not a claim
  that one endpoint returns every object in the file. Checklist items have their
  own IDs, names and story links. Source references remain separate objects.
- `compareOXReadback` checks project values, hierarchy, dates, assignees, review
  instructions, checklists, assignment estimates, allocations, source references
  and billing amounts/triggers. Mutation tests prove that missing or changed
  records do not produce a successful receipt.
- `KantataRecord.jsx` renders a compact projection of the response fixture:
  four workstream totals, Avery's assessment task, allocation totals and billing.
  All 22 task records and six allocations remain in the readback and comparison;
  shortening the visible receipt does not reduce what was submitted.

Before a live connection: resolve account membership and configured roles,
validate access and financial permissions, discover status sets and custom
fields, and confirm the commercial triggers. Use OAuth against the documented
`https://api.mavenlink.com/api/v1/` API. Writes are separate operations: retain
the source version and receipt for each, reconcile external references on retry,
and surface partial failure instead of claiming an atomic commit. Re-read each
collection with pagination before showing success. Do not mark the external
project locked merely because AllianceOne retains an approved baseline.

## Report output

`assessment.json` supplies the in-chat draft, reviewed revision, one-page browser
preview and internal Word reference. Avery contributes evidence analysis, a
reported Central client conversation (NS-C01), and the wording of his revised
conclusion. The preview keeps the recommendation, three evidence checks, actions
and a short review/source note. The fuller findings and source metadata remain
in the model. Approval does not resolve outstanding evidence or turn a reported
conversation into confirmed client evidence.

The website previews the export automatically without requiring a download.
`scripts/build-assessment.py` regenerates the internal `.docx` reference from the
same content. Browser preview QA and Word pagination QA are separate: the current
workspace has no bundled LibreOffice executable, so the packaged Word renderer
cannot confirm DOCX pagination. Do not represent the browser pages as screenshots
from Word or the DOCX as visually validated until an actual Word render is checked.

## Primary references

- [Workspaces API](https://developer.kantata.com/kantata/specification/workspaces/create%20workspace)
- [Stories API](https://developer.kantata.com/kantata/specification/stories/create%20story)
- [Workspace Resources API](https://developer.kantata.com/kantata/specification/workspace-resources)
- [Allocations API](https://developer.kantata.com/kantata/specification/workspace-allocations/create%20workspace%20allocation)
- [Assignments API](https://developer.kantata.com/kantata/specification/assignments)
- [Billing Milestones API](https://developer.kantata.com/kantata/specification/billing-milestones)
- [Story Dependencies API](https://developer.kantata.com/kantata/specification/story-dependencies)
- [Task Tracker columns](https://knowledge.kantata.com/hc/en-us/articles/13632628443547-Task-Tracker-Columns)
- [Project Task Tracker](https://knowledge.kantata.com/hc/en-us/articles/202490134-Project-Task-Tracker)
- [Managing allocations in Resourcing](https://knowledge.kantata.com/hc/en-us/articles/115004722914-Managing-Allocations-in-Resourcing)
- [Project Settings](https://knowledge.kantata.com/hc/en-us/articles/204346530-Project-Settings-Overview)

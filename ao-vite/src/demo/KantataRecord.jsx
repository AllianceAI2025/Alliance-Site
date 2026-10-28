import React from "react";
import { PsaMark } from "./PsaMark.jsx";
import response from "./kantata-readback.json";
import { oxAccount, oxDisplayDate } from "./kantataOX.js";
import { planTiming } from "./demoPlayback.js";
import "./kantata-record.css";

const project = response.workspaces[oxAccount.workspaceId];
const names = Object.fromEntries(Object.entries(oxAccount.users).map(([name, id]) => [id, name]));
const allTasks = Object.values(response.stories);
const groups = allTasks.filter(task => task.story_type === "task");
const gates = allTasks.filter(task => task.story_type === "milestone");
const rows = groups.flatMap((group, index) => [
  { ...group, wbs: String(index + 1) },
  ...allTasks.filter(task => task.parent_id === group.id && task.story_type === "deliverable").map((task, child) => ({ ...task, wbs: `${index + 1}.${child + 1}` })),
  { ...gates[index], wbs: `${index + 1}.${allTasks.filter(task => task.parent_id === group.id).length}` },
]);
const assessment = response.stories[930001];
const money = cents => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

export function KantataRecord({ elapsed, verified }) {
  return <section className="psa-record ox-record" aria-label="Created Kantata OX project" data-project-id={project.id}>
    <header className="psa-record-system"><PsaMark /><span className="ox-edition">OX</span><small>{verified ? "Readback complete" : "Project created"}</small></header>
    <div className="psa-record-title" data-follow-at={planTiming.projectCreated}><div><p>Project {project.id}</p><h4>{project.title}</h4></div></div>
    <dl className="psa-record-fields" data-follow-at={planTiming.projectCreated + 200}>
      {[["Provider Lead", names[project.primary_maven_id]], ["Start Date", oxDisplayDate(project.start_date)], ["Due Date", oxDisplayDate(project.due_date)], ["Budget", money(project.price_in_cents)], ["Currency", project.currency], ["Client", "Northstar Foods"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
    {elapsed >= planTiming.resourcesWrittenAt && <section className="ox-section" aria-label="Kantata OX resourcing">
      <h4>Resourcing <span>1,840 allocated hours</span></h4>
      <table className="ox-resource-table"><thead><tr><th>Resource</th><th>Start</th><th>End</th><th><span className="ox-desktop-label">Allocated Hours</span><span className="ox-mobile-label">Hours</span></th><th><span className="ox-desktop-label">Allocation</span><span className="ox-mobile-label">Type</span></th></tr></thead><tbody>{Object.values(response.workspace_allocations).map((allocation, index) => {
        const at = planTiming.resourcesWrittenAt + index * 450;
        return elapsed >= at && <tr key={allocation.id} data-follow-at={at} data-allocation-id={allocation.id}><td>{names[response.workspace_resources[allocation.workspace_resource_id].user_id]}<small className="ox-mobile-label">{oxDisplayDate(allocation.start_date)} – {oxDisplayDate(allocation.end_date)}</small></td><td>{oxDisplayDate(allocation.start_date)}</td><td>{oxDisplayDate(allocation.end_date)}</td><td>{allocation.minutes / 60}h</td><td>Hard</td></tr>;
      })}</tbody></table>
      <p className="ox-note">Confirmed project allocations. Task estimates and daily scheduled hours are maintained separately.</p>
    </section>}
    {elapsed >= planTiming.deliverablesWrittenAt && <section className="ox-section" aria-label="Kantata OX Task Tracker">
      <h4>Task Tracker <span>4 parent tasks · 14 deliverables · 4 milestones</span></h4>
      <table className="ox-task-table"><thead><tr><th>WBS</th><th>Type</th><th>Title</th><th>Assignees</th><th>Status</th><th>Start</th><th>Due</th></tr></thead><tbody>{rows.map((task, index) => {
        const at = planTiming.deliverablesWrittenAt + index * 230;
        const sourceId = response.external_references[task.external_reference_ids[0]].service_model_ref;
        return elapsed >= at && <tr key={task.id} className={`ox-row--${task.story_type}`} data-record-id={task.id} data-deliverable-id={task.story_type === "deliverable" ? sourceId : undefined} data-gate-id={task.story_type === "milestone" ? sourceId : undefined} data-follow-at={at}>
          <td>{task.wbs}</td><td><span className={`ox-type ox-type--${task.story_type}`} title={task.story_type} aria-label={task.story_type}>{task.story_type === "milestone" ? "◇" : task.story_type === "deliverable" ? "▱" : "▤"}</span></td><td>{task.title}</td><td>{task.assignee_ids?.map(id => names[id]).join(", ") || "—"}</td><td>Not Started</td><td>{oxDisplayDate(task.start_date)}</td><td>{oxDisplayDate(task.due_date)}</td>
        </tr>;
      })}</tbody></table>
    </section>}
    {elapsed >= planTiming.billingWrittenAt && <section className="ox-section" aria-label="Kantata OX Billing Schedule" data-follow-at={planTiming.billingWrittenAt}>
      <h4>Billing Schedule <span>{money(project.price_in_cents)} · fixed-fee engagement</span></h4>
      <table className="ox-billing-table"><thead><tr><th>Billing Milestone</th><th>Amount</th><th>Invoiceable</th></tr></thead><tbody>{Object.values(response.billing_milestones).map(bill => <tr key={bill.id}><td>{bill.title}</td><td>{money(bill.amount_in_cents)}</td><td>{bill.billing_type === "fixed_date" ? oxDisplayDate(bill.date_to_invoice) : `On completion: ${response.stories[bill.story_id].title}`}</td></tr>)}</tbody></table>
      <p className="ox-note">Billing milestones are separate from the delivery milestones in the Task Tracker.</p>
    </section>}
    {elapsed >= planTiming.taskDetailsAt && <section className="ox-task-detail" aria-label="Returned assessment task details" data-follow-at={planTiming.taskDetailsAt}>
      <p>Task details · {assessment.id}</p><h4>{assessment.title}</h4>
      <dl><div><dt>Assignee</dt><dd>{names[assessment.assignee_ids[0]]}</dd></div><div><dt>Task Est. Hours</dt><dd>{assessment.time_estimate_in_minutes / 60}h</dd></div><div><dt>Resource Estimated Hours</dt><dd>{response.assignments[960001].estimated_minutes / 60}h</dd></div><div><dt>Due</dt><dd>{oxDisplayDate(assessment.due_date)}</dd></div></dl>
      <h5>Description</h5><p>{assessment.description.split("\n").slice(0, 2).join(" · ")}</p>
      <h5>Checklist</h5><ul>{assessment.story_task_ids.map(id => <li key={id}>{response.story_tasks[id].name}</li>)}</ul>
    </section>}
    {elapsed >= planTiming.workspaceCreated && <p className="psa-record-origin" data-follow-at={planTiming.workspaceCreated}>Plan v1 · Proposal v5 · OPP-20418 linked through AllianceOne’s source references. Margaret’s approval and the engagement rationale stay with the approved baseline.</p>}
  </section>;
}

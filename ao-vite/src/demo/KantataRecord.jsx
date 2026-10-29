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
const assessment = response.stories[930001];
const allocations = Object.values(response.workspace_allocations);
const rows = groups.flatMap((group,index) => [
  { ...group, wbs: String(index+1), children: allTasks.filter(task=>task.parent_id===group.id) },
  ...(index===0 ? [{...assessment,wbs:"1.1"}] : []),
]);
const money = cents => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

export function KantataRecord({ elapsed, verified }) {
  return <section className="psa-record ox-record" aria-label="Created Kantata OX project" data-project-id={project.id}>
    <header className="psa-record-system"><PsaMark /><span className="ox-edition">OX</span><small>{verified ? "Readback complete" : "Project created"}</small></header>
    <div className="psa-record-title" data-follow-at={planTiming.projectCreated}><div><p>Project {project.id}</p><h4>{project.title}</h4></div></div>
    <dl className="psa-record-fields" data-follow-at={planTiming.projectCreated + 200}>
      {[["Provider Lead", names[project.primary_maven_id]], ["Start / Due", `${oxDisplayDate(project.start_date)} – ${oxDisplayDate(project.due_date)}`], ["Budget", `${money(project.price_in_cents)} USD`]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
    {elapsed >= planTiming.resourcesWrittenAt && <div className="ox-allocation-summary" aria-label="Kantata OX resourcing" data-follow-at={planTiming.resourcesWrittenAt}><strong>Resourcing</strong><span>{allocations.length} hard allocations · {(allocations.reduce((sum,item)=>sum+item.minutes,0)/60).toLocaleString()} hours</span></div>}
    {elapsed >= planTiming.deliverablesWrittenAt && <section className="ox-section" aria-label="Kantata OX Task Tracker">
      <h4>Task Tracker <span>14 deliverables · 4 milestones</span></h4>
      <table className="ox-task-table"><thead><tr><th>WBS</th><th>Type</th><th>Title</th><th>Assignees</th><th>Status</th><th>Start</th><th>Due</th></tr></thead><tbody>{rows.map((task, index) => {
        const at = planTiming.deliverablesWrittenAt + index * 350;
        return elapsed >= at && <tr key={task.id} className={`ox-row--${task.story_type}`} data-record-id={task.id} data-follow-at={at}>
          <td>{task.wbs}</td><td><span className="ox-type" title={task.story_type} aria-label={task.story_type}>{task.story_type === "deliverable" ? "▱" : "▤"}</span></td><td>{task.title}{task.children && <small className="ox-row-count">{task.children.filter(item=>item.story_type==="deliverable").length} deliverables · 1 milestone</small>}</td><td>{task.assignee_ids?.map(id => names[id]).join(", ") || "—"}</td><td>Not Started</td><td>{oxDisplayDate(task.start_date)}</td><td>{oxDisplayDate(task.due_date)}</td>
        </tr>;
      })}</tbody></table>
    </section>}
    {elapsed >= planTiming.billingWrittenAt && <section className="ox-section" aria-label="Kantata OX Billing Schedule" data-follow-at={planTiming.billingWrittenAt}>
      <h4>Billing Schedule <span>{money(project.price_in_cents)}</span></h4>
      <table className="ox-billing-table"><thead><tr><th>Billing Milestone</th><th>Amount</th><th>Invoiceable</th></tr></thead><tbody>{Object.values(response.billing_milestones).map(bill => <tr key={bill.id}><td>{bill.title}</td><td>{money(bill.amount_in_cents)}</td><td>{bill.billing_type === "fixed_date" ? oxDisplayDate(bill.date_to_invoice) : "On completion"}</td></tr>)}</tbody></table>
    </section>}
    {elapsed >= planTiming.taskDetailsAt && <section className="ox-task-detail ox-task-detail--compact" aria-label="Returned assessment task details" data-follow-at={planTiming.taskDetailsAt}>
      <h4>{assessment.title}</h4><p>{names[assessment.assignee_ids[0]]} · {response.assignments[960001].estimated_minutes / 60}h · Due {oxDisplayDate(assessment.due_date)}</p>
      <h5>Checklist</h5><ul>{assessment.story_task_ids.map(id => <li key={id}>{response.story_tasks[id].name}</li>)}</ul>
    </section>}
    {elapsed >= planTiming.workspaceCreated && <p className="psa-record-origin" data-follow-at={planTiming.workspaceCreated}>Plan v1 · Proposal v5 · Margaret’s approval retained with the returned records.</p>}
  </section>;
}

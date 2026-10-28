// Public OX API field model, not a connector. IDs belong to this fictional
// account. See docs/kantata-ox-demo.md for sources and implementation boundaries.
export const oxAccount = {
  workspaceId: 9120418,
  users: {
    "Margaret Whitfield": 61001, "Sofia Patel": 61002,
    "Daniel Okafor": 61003, "Jordan Hale": 61004,
    "Avery Ross": 61005, "Lena Torres": 61006,
  },
};
export const oxDate = date => new Date(`${date}, 2026 12:00:00 GMT`).toISOString().slice(0, 10);
export const oxDisplayDate = date => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
const weekDate = (week, end = false) => new Date(Date.UTC(2026, 7, 17 + (week - 1) * 7 + (end ? 4 : 0))).toISOString().slice(0, 10);
const reference = (model, id) => ({ service_name: "AllianceOne", service_model: model, service_model_ref: id });
const taskId = id => 930000 + Number(id.replace("NS-D", ""));
const groupId = id => 920000 + Number(id.replace("WS-", ""));

// Review and acceptance dependencies are instructions, not fabricated native
// Reviewer fields or finish-to-start scheduling constraints. Preparation overlaps.
export function oxTaskDescription(task) {
  return `${task.id} · Plan v1\nReview: ${task.reviewer}\nAcceptance: ${task.acceptance}${task.dependsOn.length ? `\nRequired before acceptance: ${task.dependsOn.join(", ")}. Preparation can overlap.` : ""}`;
}

export function mapPlanToOX(plan) {
  const workspaceId = oxAccount.workspaceId;
  const workspace = {
    title: plan.project.name, description: `${plan.project.objective}\n${plan.project.boundary}\n${plan.project.proposal} · ${plan.project.baseline} · ${plan.project.opportunity}`,
    start_date: oxDate(plan.project.start), due_date: oxDate(plan.project.finish),
    primary_maven_id: oxAccount.users[plan.project.manager],
    budgeted: true, price: plan.project.fee, currency: "USD",
    external_reference: reference("engagement_plan", "NS-PLAN-1"),
  };
  const workspace_resources = plan.resources.map((person, index) => ({
    workspace_id: workspaceId, user_id: oxAccount.users[person.name],
    external_reference: reference("resource_commitment", `NS-R0${index + 1}`),
  }));
  const allocations = plan.resources.map((person, index) => ({
    resource_id: 940001 + index, start_date: weekDate(person.start), end_date: weekDate(person.end, true),
    minutes: person.hours * 60, hard: true,
    notes: `${person.role}. Approved plan v1; availability checked before commitment.`,
    external_reference: reference("resource_allocation", `NS-R0${index + 1}`),
  }));
  const groups = plan.workstreams.map(stream => {
    const tasks = plan.deliverables.filter(task => task.stream === stream.id);
    return { internalId: stream.id, id: groupId(stream.id), story: {
      workspace_id: workspaceId, title: stream.name, story_type: "task", state: "not started",
      start_date: tasks.map(task => oxDate(task.start)).sort()[0],
      due_date: tasks.map(task => oxDate(task.due)).sort().at(-1),
      external_reference: reference("workstream", stream.id),
    } };
  });
  const deliverables = plan.deliverables.map(task => ({ internalId: task.id, id: taskId(task.id), story: {
    workspace_id: workspaceId, title: task.title, story_type: "deliverable", state: "not started",
    parent_id: groupId(task.stream), assignee_ids: [oxAccount.users[task.owner]],
    start_date: oxDate(task.start), due_date: oxDate(task.due),
    description: oxTaskDescription(task), checklist: [task.acceptance, `Review with ${task.reviewer} before acceptance.`],
    ...(task.effort ? { time_estimate_in_minutes: task.effort * 60 } : {}),
    external_reference: reference("deliverable", task.id),
  } }));
  const gates = plan.milestones.map((gate, index) => ({ internalId: gate.id, id: 935001 + index, story: {
    workspace_id: workspaceId, title: gate.title, story_type: "milestone", state: "not started",
    parent_id: groupId(plan.workstreams[index].id),
    start_date: oxDate(gate.due), due_date: oxDate(gate.due),
    description: `Review: ${gate.reviewer}\nRequired before acceptance: ${gate.requires.join(", ")}.`,
    external_reference: reference("review_gate", gate.id),
  } }));
  const assignments = plan.deliverables.map(task => ({
    story_id: taskId(task.id), resource_id: 940001 + plan.resources.findIndex(person => person.name === task.owner),
    current: true, ...(task.effort ? { estimated_minutes: task.effort * 60 } : {}),
  }));
  const billing_milestones = plan.billingSchedule.map(bill => ({
    workspace_id: workspaceId, title: bill.title, amount_in_cents: Math.round(plan.project.fee * bill.percent),
    ...(bill.gate ? { billing_type: "upon_completion", story_id: gates.find(gate => gate.internalId === bill.gate).id } : { billing_type: "fixed_date", date_to_invoice: oxDate(bill.date) }),
  }));
  return { workspace, workspace_resources, allocations, stories: [...groups, ...deliverables, ...gates], assignments, billing_milestones };
}

// Compare a separate, API-shaped response to the approved write model. Check
// values and links, rather than declaring success from matching record counts.
export function compareOXReadback(plan, response) {
  const expected = mapPlanToOX(plan);
  const differences = [];
  const check = (label, actual, wanted) => { if (JSON.stringify(actual) !== JSON.stringify(wanted)) differences.push(label); };
  const project = response.workspaces?.[oxAccount.workspaceId];
  for (const key of ["title", "description", "start_date", "due_date", "currency"]) check(`project.${key}`, project?.[key], expected.workspace[key]);
  check("project.price", Number(project?.price), expected.workspace.price);
  check("project.primary_maven_id", Number(project?.primary_maven_id), expected.workspace.primary_maven_id);
  check("stories.count", Object.keys(response.stories ?? {}).length, expected.stories.length);
  for (const { id, story } of expected.stories) {
    const actual = response.stories?.[id];
    for (const key of ["title", "story_type", "state", "start_date", "due_date", "description", "time_estimate_in_minutes"]) check(`story.${id}.${key}`, actual?.[key], story[key]);
    check(`story.${id}.workspace_id`, Number(actual?.workspace_id), oxAccount.workspaceId);
    if (story.parent_id) check(`story.${id}.parent_id`, Number(actual?.parent_id), story.parent_id);
    if (story.assignee_ids) check(`story.${id}.assignee_ids`, actual?.assignee_ids?.map(Number), story.assignee_ids);
    if (story.checklist) check(`story.${id}.checklist`, actual?.story_task_ids?.map(key => response.story_tasks?.[key]?.name), story.checklist);
    check(`story.${id}.source`, response.external_references?.[actual?.external_reference_ids?.[0]]?.service_model_ref, story.external_reference.service_model_ref);
  }
  check("allocations.count", Object.keys(response.workspace_allocations ?? {}).length, expected.allocations.length);
  expected.allocations.forEach((allocation, index) => {
    const actual = response.workspace_allocations?.[950001 + index];
    for (const key of ["start_date", "end_date", "minutes", "hard", "notes"]) check(`allocation.${index}.${key}`, actual?.[key], allocation[key]);
    check(`allocation.${index}.resource`, Number(actual?.workspace_resource_id), allocation.resource_id);
    check(`resource.${index}.user`, Number(response.workspace_resources?.[allocation.resource_id]?.user_id), expected.workspace_resources[index].user_id);
  });
  check("assignments.count", Object.keys(response.assignments ?? {}).length, expected.assignments.length);
  expected.assignments.forEach((assignment, index) => {
    const actual = response.assignments?.[960001 + index];
    for (const key of ["story_id", "resource_id"]) check(`assignment.${index}.${key}`, Number(actual?.[key]), assignment[key]);
    check(`assignment.${index}.estimated_minutes`, actual?.estimated_minutes, assignment.estimated_minutes);
  });
  check("billing.count", Object.keys(response.billing_milestones ?? {}).length, expected.billing_milestones.length);
  expected.billing_milestones.forEach((bill, index) => {
    const actual = response.billing_milestones?.[970001 + index];
    for (const key of ["title", "amount_in_cents", "billing_type", "date_to_invoice"]) check(`billing.${index}.${key}`, actual?.[key], bill[key]);
    if (bill.story_id) check(`billing.${index}.story_id`, Number(actual?.story_id), bill.story_id);
  });
  return differences;
}

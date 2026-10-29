import { approvedPlan, staffingCandidates } from "./demo/northstar.js";
import { compareOXReadback, oxAccount } from "./demo/kantataOX.js";
import readback from "./demo/kantata-readback.json";

// Short, local presentation states. The examples share the homepage's fictional
// Northstar record; these views never call models or connected applications.
export const snippetTiming = [900, 2800];
const assessmentHours = approvedPlan.deliverables.find(task => task.id === "NS-D01").effort;
const timeExample = { logged: 32, remaining: 10 };

export const resourceChoices = ["Avery Ross", "Lena Torres", "Daniel Okafor"].map(name => {
  const person = staffingCandidates.find(candidate => candidate.name === name);
  return { ...person, window: `W${person.start}–${person.end}`, detail: {
    "Avery Ross": "Prepared Harbor’s evidence pack. Sofia’s review experience carries into Northstar’s assessment.",
    "Lena Torres": "Built Meridian’s ownership matrix. Her experience fits Northstar’s regional validation work.",
    "Daniel Okafor": "Developed Harbor’s design options. Confirm his Week 3 release before committing the proposal.",
  }[name] };
});

export function projectReceipt() {
  const workspace = readback.workspaces[oxAccount.workspaceId];
  const tasks = Object.values(readback.stories);
  const allocations = Object.values(readback.workspace_allocations);
  return {
    project: workspace.title,
    id: workspace.id,
    deliverables: tasks.filter(task => task.story_type === "deliverable").length,
    milestones: tasks.filter(task => task.story_type === "milestone").length,
    people: allocations.length,
    hours: allocations.reduce((sum, item) => sum + item.minutes, 0) / 60,
    fee: Number(workspace.price),
    verified: compareOXReadback(approvedPlan, readback).length === 0,
  };
}

// Additional illustrative events show how operating updates are examined against
// the existing baseline. Forecast effort includes an explicit remaining estimate.
export const signalExamples = [
  {
    id: "time", label: "Time", title: "The assessment may exceed its allocation.",
    source: "Kantata time · Avery’s remaining estimate", date: "September 4",
    facts: [["Planned", `${assessmentHours}h`], ["Logged", `${timeExample.logged}h`], ["Remaining estimate", `${timeExample.remaining}h`]],
    finding: `Forecast: ${timeExample.logged + timeExample.remaining}h against ${assessmentHours}h planned.`,
    context: "Avery’s estimate includes further regional validation. Review the remaining work before changing the allocation.",
    record: "NS-D01 · Data-readiness assessment · Plan v1",
  },
  {
    id: "project", label: "Project", title: "The baseline gate has moved in the project system.",
    source: "Kantata OX · Milestone update", date: "September 8",
    facts: [["Approved gate", "Sep 11"], ["Current date", "Sep 14"]],
    finding: "Three days later than the approved plan.",
    context: "Design acceptance depends on this gate. Check the effect on Daniel’s work before authorizing a revised baseline.",
    record: "G1 · Diagnostic baseline · Plan v1 retained",
  },
  {
    id: "client", label: "Client", title: "Elena has asked about supporting the rollout.",
    source: "Client email · Elena Vargas", date: "September 8",
    facts: [["Client request", "Rollout support"], ["Accepted scope", "Implementation excluded"]],
    finding: "This extends the accepted scope.",
    context: "Clarify the support requested and its staffing implications. The request remains proposed until the manager approves a change.",
    record: "Proposal v5 · Client request · Decision pending",
  },
];

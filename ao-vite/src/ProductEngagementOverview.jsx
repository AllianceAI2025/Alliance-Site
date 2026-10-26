import React from "react";
import { LogoMark } from "./Site.jsx";
import { readbackPlan } from "./demo/engagementPlan.js";
import assessment from "./demo/assessment.json";

export default function ProductEngagementOverview() {
  const { project, resources, deliverables } = readbackPlan;
  const task = deliverables.find(item => item.id === "NS-D01");
  const coverage = assessment.evidence.find(item => item.label === "Coverage");

  return <figure className="product-engagement-overview" aria-label="Northstar engagement overview">
    <div className="product-overview-top"><LogoMark size={27} /><span>Engagement overview</span></div>
    <h3>{project.name}</h3>
    <p className="product-overview-objective">{project.objective}</p>
    <dl className="product-overview-baseline">
      <div><dt>Accepted commitment</dt><dd>{project.proposal} · Client accepted</dd></div>
      <div><dt>Approved plan</dt><dd>{project.baseline} · {resources.length} resources · {deliverables.length} deliverables<small>{project.effort.toLocaleString("en-US")} hours · {project.manager}</small></dd></div>
    </dl>
    <section className="product-overview-work" aria-label="Current delivery and review">
      <p className="product-overview-label">Current delivery</p>
      <h4>{task.title}</h4>
      <p className="product-overview-byline">{task.owner} · Review: {task.reviewer}</p>
      <div className="product-overview-evidence"><strong>{coverage.finding}</strong><span>{coverage.gap}</span></div>
      <p className="product-overview-review">Revision {assessment.revision} · {assessment.reviewer} approved</p>
      <p className="product-overview-conclusion">{assessment.conclusion}</p>
    </section>
    <div className="product-overview-system"><img src="/brand/systems/project-operations.svg" alt="" /><span>Approved plan verified in Project Operations</span></div>
    <figcaption>From the Northstar demonstration. Approval, source evidence and review remain linked.</figcaption>
  </figure>;
}

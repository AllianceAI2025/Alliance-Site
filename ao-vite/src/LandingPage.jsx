import React from "react";
import { capture, Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

const planSystems = [
  ["project-operations", "Project Operations"],
  ["sharepoint", "SharePoint"],
];

function DemoSection({ phase, label, headline, caption, children, primary = false }) {
  return <Track name={phase} id={phase} className={`studio-home-scene studio-home-scene--${phase}${phase === "plan" ? " studio-dark-field" : ""}`}>
    <div className="studio-container studio-demo-layout">
      <header className="studio-demo-intro">
        <div className="studio-demo-heading"><p className="studio-phase-label">{label}</p><h2>{headline}</h2></div>
        <p className="studio-demo-description">{children}</p>
      </header>
      <figure className="studio-demo-proof">
        <EngagementDemo phase={phase} primary={primary} />
        <figcaption className="studio-demo-caption">{caption}
          {phase === "plan" && <div className="studio-example-systems">
            <p>Systems shown in this demonstration</p>
            <ul>{planSystems.map(([icon, name]) => <li key={icon}><img src={`/brand/systems/${icon}.svg`} alt="" />{name}</li>)}</ul>
            <small>Production connections are scoped and validated with each firm.</small>
          </div>}
        </figcaption>
      </figure>
    </div>
  </Track>;
}

export default function LandingPage() {
  return <PageShell page="home" dark>
    <Track name="home_hero" className="studio-home-hero studio-dark-field">
      <div className="studio-container studio-home-heading">
        <h1>Firm knowledge at{" "}<br />the point of work.</h1>
        <div className="studio-home-summary">
          <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work.</p>
          <div className="studio-home-actions">
            <a className="studio-button studio-button--green" href="/design-partners/" onClick={() => capture("cta_clicked", { location: "home_hero" })}>Become a design partner <span aria-hidden="true">↗</span></a>
            <a className="studio-demo-jump" href="#demo">See it work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </Track>
    <DemoSection phase="scope" label="Scope" headline="Start with relevant firm experience." caption="Harbor’s review informs Northstar’s evidence gate; Meridian’s experience shapes regional validation and resource fit." primary>
      Bring client context, firm methods, delivery experience and current resource availability into the scope and proposal before the firm commits.
    </DemoSection>
    <DemoSection phase="plan" label="Plan" headline="Carry the approved plan into delivery." caption="The complete approved plan is written and verified in Project Operations, with its approval and readback retained.">
      Develop the deliverables, resource allocations, effort, dependencies and review gates. Review the commitments before creating and verifying records in the firm’s PSA or project system.
    </DemoSection>
    <DemoSection phase="deliver" label="Deliver" headline="Bring firm knowledge into each assignment." caption="Sofia’s feedback and Avery’s revision stay linked to the assignment, supporting evidence and approved report.">
      Give consultants the engagement context, methods and relevant review experience to develop their analysis, examine evidence and work through feedback.
    </DemoSection>
    <Track name="workflow" id="workflow" className="studio-home-value"><div className="studio-container">
      <h2>Better conditions for delivery.</h2>
      <div className="studio-home-benefits">
        <article><h3>Better-informed commitments</h3><p>Test scope, staffing, effort and commercial assumptions before the firm commits.</p></article>
        <article><h3>Less reconstruction and rework</h3><p>Carry relevant context, methods and review standards into each assignment.</p></article>
        <article><h3>Earlier action on delivery changes</h3><p>Examine current signals against the approved plan and decide how to respond.</p></article>
      </div>
      <figure className="studio-home-experience">
        <ol aria-label="How relevant experience carries through the engagement">
          <li><span>Harbor</span><strong>A reviewed evidence standard</strong></li>
          <li><span>Northstar’s plan</span><strong>A review gate before design</strong></li>
          <li><span>Avery’s assessment</span><strong>A clearer, reviewed conclusion</strong></li>
        </ol>
        <figcaption>Sources, decisions and review remain with the engagement.</figcaption>
      </figure>
    </div></Track>
    <PartnerInvitation />
  </PageShell>;
}

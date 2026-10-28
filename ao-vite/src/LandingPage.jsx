import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

const deliveryOutcomes = [
  ["More realistic commitments.", "Test scope, resource fit, availability, effort and pricing assumptions before the firm commits."],
  ["Act sooner when delivery drifts.", "Time, milestones and changes return from the firm’s systems and are compared with the approved plan while there is still time to act."],
  ["Every engagement informs the next.", "Reviewed decisions, results and lessons become firm knowledge the next team can draw on."],
];

function DemoSection({ phase, label, headline, children, primary = false }) {
  return <Track name={phase} id={phase} className={`studio-home-scene studio-home-scene--${phase}${phase === "plan" ? " studio-dark-field" : ""}`}>
    <div className="studio-container studio-demo-layout">
      <header className="studio-demo-intro">
        <div className="studio-demo-heading"><p className="studio-phase-label">{label}</p><h2>{headline}</h2></div>
        {children && <p className="studio-demo-description">{children}</p>}
      </header>
      <div className="studio-demo-proof">
        <EngagementDemo phase={phase} primary={primary} />
      </div>
    </div>
  </Track>;
}

export default function LandingPage() {
  return <PageShell page="home" dark>
    <Track name="home_hero" className="studio-home-hero studio-dark-field">
      <div className="studio-container studio-home-heading">
        <h1>Firm knowledge at{" "}<br />the point of work.</h1>
        <div className="studio-home-summary">
          <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work. For consulting, advisory and law firms.</p>
        </div>
      </div>
    </Track>
    <DemoSection phase="scope" label="Scope" headline="Start with relevant firm experience." primary>
      Develop the scope and proposal using client context, firm methods, comparable work and current resource availability.
    </DemoSection>
    <DemoSection phase="plan" label="Plan" headline="Carry the approved plan into delivery.">
      Develop the deliverables, resource allocations, effort, dependencies and review gates. Review the commitments before creating and verifying records in the firm’s PSA or project system.
    </DemoSection>
    <DemoSection phase="deliver" label="Deliver" headline="Bring firm knowledge into each assignment.">
      Give consultants the engagement context, methods and relevant review experience to develop their analysis, examine evidence and work through feedback.
    </DemoSection>
    <Track name="workflow" id="workflow" className="studio-home-value"><div className="studio-container">
      <header className="studio-home-value-heading">
        <p className="studio-home-value-kicker">Better engagement economics. Stronger evidence of value.</p>
        <h2>Better conditions for delivery.</h2>
        <p>AllianceOne keeps approved commitments connected to what happens in delivery, so leaders act with better context and each engagement strengthens the next.</p>
      </header>
      <div className="studio-home-benefits">
        {deliveryOutcomes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </div></Track>
    <PartnerInvitation />
  </PageShell>;
}

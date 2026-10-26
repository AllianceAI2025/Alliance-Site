import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

const waysOfWorking = [
  ["Approach", "How the firm frames the problem, the questions it asks first, the evidence it trusts, and the precedent it brings forward."],
  ["Think", "The options considered, the tradeoffs made, the assumptions carried, and the reasoning behind the recommendation."],
  ["Deliver", "How scope, staffing, sequence, governance, decisions, changes, and outcomes fit together in practice."],
];

const firmIP = [
  ["Methods and frameworks", "The questions the firm asks, the evidence it trusts, and the way it structures a problem."],
  ["Deliverable types and templates", "The proven shapes, required sections, source expectations, and review gates behind client work."],
  ["Prior work and precedent", "Comparable scopes, staffing patterns, decisions, changes, outcomes, and lessons from delivery."],
  ["Review and quality standards", "The criteria partners and engagement leaders use to determine whether work is ready to advance."],
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
          <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work.</p>
        </div>
      </div>
    </Track>
    <DemoSection phase="scope" label="Scope" headline="Start with relevant firm experience." primary />
    <DemoSection phase="plan" label="Plan" headline="Carry the approved plan into delivery.">
      Develop the deliverables, resource allocations, effort, dependencies and review gates. Review the commitments before creating and verifying records in the firm’s PSA or project system.
    </DemoSection>
    <DemoSection phase="deliver" label="Deliver" headline="Bring firm knowledge into each assignment.">
      Give consultants the engagement context, methods and relevant review experience to develop their analysis, examine evidence and work through feedback.
    </DemoSection>
    <Track name="workflow" id="workflow" className="studio-home-value"><div className="studio-container">
      <header className="studio-home-value-heading">
        <h2>Better conditions for delivery.</h2>
        <p>Firm knowledge informs the scope and plan, gives consultants a clear basis for their work, and helps managers understand when delivery diverges from the commitment.</p>
      </header>
      <section aria-labelledby="judgment-chain">
        <header className="studio-home-judgment-heading">
          <h3 id="judgment-chain">Preserve the chain that makes judgment credible.</h3>
          <p>A useful precedent shows more than what a prior team produced. It explains the situation they faced, why they chose an approach, and what the evidence later showed.</p>
        </header>
        <div className="studio-home-benefits">
          {waysOfWorking.map(([title, body]) => <article key={title}><h4>{title}</h4><p>{body}</p></article>)}
        </div>
        <div className="studio-home-ip">
          <p className="studio-home-ip-statement">The firm’s intellectual property stays active while teams are making decisions, not dormant in a repository or flattened into a generic answer.</p>
          <div className="studio-home-ip-types">
            {firmIP.map(([title, body]) => <article key={title}><h4>{title}</h4><p>{body}</p></article>)}
          </div>
        </div>
      </section>
      <p className="studio-home-experience">As people work, conversations, decisions, revisions and their supporting evidence become part of the engagement record. Practitioners review the resulting experience before it informs another engagement, with the original context and limits available to the next team.</p>
    </div></Track>
    <PartnerInvitation />
  </PageShell>;
}

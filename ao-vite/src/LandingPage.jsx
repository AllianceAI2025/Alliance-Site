import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

const waysOfWorking = [
  ["Approach", "Bring the firm’s methods, frameworks and precedent into how teams frame the problem, ask questions and assess evidence. Relevant client conditions, past results and resource availability inform the scope and proposal before the firm commits."],
  ["Think", "Keep the options considered, assumptions, tradeoffs and reasoning behind each recommendation connected to their sources. Consultants and reviewers can examine why an approach fits this engagement and build on prior judgment instead of reconstructing it."],
  ["Deliver", "Connect scope, staffing, sequence and governance with the work people deliver. Approved plans become records in the firm’s systems; delivery signals, decisions, changes, review and outcomes stay linked to the commitments they affect."],
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
        <p>AllianceOne brings together how your firm approaches a problem, reasons through it and delivers the work. Methods and intellectual property stay connected to the client conditions, people, decisions and outcomes that give them meaning.</p>
      </header>
      <div className="studio-home-benefits">
        {waysOfWorking.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
      <p className="studio-home-experience">As people work, conversations, decisions, revisions and their supporting evidence become part of the engagement record. Practitioners review the resulting experience before it informs another engagement, with the original context and limits available to the next team.</p>
    </div></Track>
    <PartnerInvitation />
  </PageShell>;
}

import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

const deliveryOutcomes = [
  ["Start from experience.", "Find comparable matters and engagements, the arguments and approaches used, what review changed and what the evidence established."],
  ["See what changed, and why.", "Connect new evidence and client instructions with earlier assessments, open questions and decisions that need attention."],
  ["Make the next team stronger.", "Carry reviewed reasoning and results into future work, with their sources, limits and permitted use intact."],
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
          <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and past work with the decisions your people make today. For law, consulting and advisory firms.</p>
        </div>
      </div>
    </Track>
    <DemoSection phase="scope" label="Similar matters" headline="Start with relevant firm experience." primary />
    <DemoSection phase="plan" label="Motion history" headline="Go beyond the outcome.">
      Bring the firm’s arguments, court records and partner review into view. Understand what changed in the work and which lessons apply to the matter in front of you.
    </DemoSection>
    <DemoSection phase="deliver" label="Matter handoff" headline="Get up to speed. Keep the reasoning.">
      Give the assigned attorney the client’s instructions, decisions, open questions and relevant shared experience. New information updates the brief without erasing what the team understood before.
    </DemoSection>
    <Track name="workflow" id="workflow" className="studio-home-value"><div className="studio-container">
      <header className="studio-home-value-heading">
        <p className="studio-home-value-kicker">Better firm economics. Stronger evidence of value.</p>
        <h2>Better conditions for delivery.</h2>
        <p>When the firm’s knowledge is present while decisions are made, teams spend less time reconstructing the past. Leaders can examine the reasoning, effort and results together, and each matter or engagement strengthens the next.</p>
      </header>
      <div className="studio-home-benefits">
        {deliveryOutcomes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </div></Track>
    <PartnerInvitation />
  </PageShell>;
}

import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { PageShell, PartnerInvitation } from "./PageParts.jsx";
import "./home.css";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

function DemoSection({ phase, label, children, primary = false }) {
  return <Track name={phase} id={phase} className={`studio-home-scene studio-home-scene--${phase}${phase === "plan" ? " studio-dark-field" : ""}`}>
    <div className="studio-container studio-demo-layout">
      <header className="studio-demo-intro"><h2>{label}</h2><p>{children}</p></header>
      <EngagementDemo phase={phase} primary={primary} />
    </div>
  </Track>;
}

export default function LandingPage() {
  return <PageShell page="home" dark>
    <Track name="home_hero" className="studio-home-hero studio-dark-field">
      <div className="studio-container studio-home-heading">
        <h1>Firm knowledge at{" "}<br />the point of work.</h1>
        <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work.</p>
      </div>
    </Track>
    <DemoSection phase="scope" label="Scope" primary>
      Combine the client’s objectives and engagement context with firm knowledge, relevant delivery experience and resource availability to develop the scope and proposal.
    </DemoSection>
    <DemoSection phase="plan" label="Plan">
      Turn the agreed scope into a staffed engagement plan, review the commitments, and carry the approved plan into the firm’s PSA or project system.
    </DemoSection>
    <DemoSection phase="deliver" label="Deliver">
      Give consultants the engagement context, firm methods and relevant experience to develop deliverables, examine evidence and work through review.
    </DemoSection>
    <Track name="workflow" id="workflow" className="studio-home-continuity studio-container"><h2>What was committed and what{" "}<br />was delivered stay connected.</h2><p>Approved commitments, current delivery signals and the reasoning behind changes form one engagement record. As work develops, that experience becomes something the next team can draw on.</p></Track>
    <PartnerInvitation />
  </PageShell>;
}

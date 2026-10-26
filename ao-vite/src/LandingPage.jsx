import React from "react";
import { Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import { CompanyOverview, PageShell, PartnerInvitation } from "./PageParts.jsx";

export { CompanyOverview, PartnerInvitation } from "./PageParts.jsx";
export { practiceServices } from "./content/siteContent.js";

export default function LandingPage() {
  return <PageShell page="home" dark>
    <Track name="scope" id="scope" className="studio-home-hero studio-dark-field">
      <div className="studio-container">
        <div className="studio-home-heading"><h1>Firm knowledge at{" "}<br />the point of work.</h1><p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work.</p></div>
        <EngagementDemo phase="scope" primary />
        <div className="studio-demo-caption"><span className="studio-phase-label">Scope</span><p>Bring the people, decisions and reviews behind previous engagements into the next scope.</p></div>
      </div>
    </Track>
    <Track name="plan" id="plan" className="studio-home-scene studio-home-scene--plan"><div className="studio-container"><div className="studio-scene-heading"><p className="studio-kicker studio-phase-label">Plan</p><h2>Translate the commitment{" "}<br />into a delivery plan.</h2><p>AllianceOne brings the scope, relevant delivery experience, resource capabilities and current availability together to help managers build a feasible engagement plan. Teams can compare staffing options, work through effort and timing, and agree assignments, deliverables, dependencies and review responsibilities. Once approved, the full plan is carried into the firm’s PSA or project system, with the resulting records checked against the approved commitments.</p></div><EngagementDemo phase="plan" /></div></Track>
    <Track name="deliver" id="deliver" className="studio-home-scene studio-home-scene--deliver"><div className="studio-container"><div className="studio-scene-heading"><p className="studio-kicker studio-phase-label">Deliver</p><h2>Give each consultant the{" "}<br />context to deliver well.</h2><p>AllianceOne brings the client’s objectives, agreed commitments, discovery findings and current engagement decisions into each consultant’s assignment. Consultants can ask questions, examine evidence and draw on firm methods, templates and relevant delivery experience as they develop deliverables and work through review. Their reasoning, feedback and revisions stay connected to the wider engagement as the work evolves.</p></div><EngagementDemo phase="deliver" /></div></Track>
    <Track name="workflow" id="workflow" className="studio-home-continuity studio-container"><h2>What was promised and what{" "}<br />was delivered stay connected.</h2><p>Approved commitments, current delivery signals and the reasoning behind changes form one engagement record. As work develops, that experience becomes something the next team can draw on.</p></Track>
    <CompanyOverview />
    <PartnerInvitation />
  </PageShell>;
}

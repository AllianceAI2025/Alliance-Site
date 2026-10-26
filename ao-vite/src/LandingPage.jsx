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
        <div className="studio-home-heading"><h1>Firm knowledge at{" "}<br />the point of work.</h1></div>
        <div className="studio-scope-heading"><p className="studio-kicker studio-phase-label">Scope</p><p>Combine the client’s objectives and engagement context with firm knowledge, relevant delivery experience and resource availability to develop the scope and proposal.</p></div>
        <EngagementDemo phase="scope" primary />
      </div>
    </Track>
    <Track name="plan" id="plan" className="studio-home-scene studio-home-scene--plan"><div className="studio-container"><div className="studio-scene-heading"><p className="studio-kicker studio-phase-label">Plan</p><h2>Translate the commitment{" "}<br />into a delivery plan.</h2><p>Turn the agreed scope into a staffed engagement plan, review the commitments, and carry the approved plan into the firm’s PSA or project system.</p></div><EngagementDemo phase="plan" /></div></Track>
    <Track name="deliver" id="deliver" className="studio-home-scene studio-home-scene--deliver"><div className="studio-container"><div className="studio-scene-heading"><p className="studio-kicker studio-phase-label">Deliver</p><h2>Give each consultant the{" "}<br />context to deliver well.</h2><p>Give consultants the engagement context, firm methods and relevant experience to develop deliverables, examine evidence and work through review.</p></div><EngagementDemo phase="deliver" /></div></Track>
    <Track name="workflow" id="workflow" className="studio-home-continuity studio-container"><h2>What was committed and what{" "}<br />was delivered stay connected.</h2><p>Approved commitments, current delivery signals and the reasoning behind changes form one engagement record. As work develops, that experience becomes something the next team can draw on.</p></Track>
    <CompanyOverview />
    <PartnerInvitation />
  </PageShell>;
}

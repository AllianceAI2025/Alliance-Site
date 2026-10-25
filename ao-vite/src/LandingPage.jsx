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
        <div className="studio-demo-caption"><span>Scope</span><p>Bring the people, decisions and reviews behind previous engagements into the next scope.</p></div>
      </div>
    </Track>
    <Track name="plan" id="plan" className="studio-home-scene studio-home-scene--plan"><div className="studio-container"><div className="studio-scene-heading studio-scene-heading--center"><p className="studio-kicker">Plan</p><h2>Translate the commitment{" "}<br />into a delivery plan.</h2><p>Carry the accepted scope and reviewed team into assignments, dates and review gates. Approve the plan, send it to the project system and verify the resulting records.</p></div><EngagementDemo phase="plan" /><div className="studio-demo-caption"><p>The whole engagement plan becomes work in Project Operations, with approval and readback retained.</p></div></div></Track>
    <Track name="deliver" id="deliver" className="studio-home-scene studio-home-scene--deliver"><div className="studio-container"><div className="studio-scene-heading"><p className="studio-kicker">Deliver</p><h2>Give each consultant the{" "}<br />context to deliver well.</h2><p>Avery's assignment carries Northstar's requirements, firm methods and relevant review experience into the assessment. Sources, feedback and the reasoning behind revisions stay with the work.</p></div><EngagementDemo phase="deliver" /><div className="studio-demo-caption"><p>From a clear assignment to Sofia's review and an approved Word document.</p></div></div></Track>
    <Track name="workflow" id="workflow" className="studio-home-continuity studio-container"><h2>What was promised and what{" "}<br />was delivered stay connected.</h2><p>Approved commitments, current delivery signals and the reasoning behind changes form one engagement record. As work develops, that experience becomes something the next team can draw on.</p></Track>
    <CompanyOverview />
    <PartnerInvitation />
  </PageShell>;
}

import React from "react";
import { Footer, Nav, useFonts } from "./Site.jsx";
import { capture, Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import "./landing.css";

export const practiceServices = [
  ["Systems integration", "Connect AllianceOne to the CRM, PSA, project, document, communication and finance systems your teams use."],
  ["Practice configuration", "Shape methods, templates and review standards around the way your practitioners work."],
  ["Workflow design", "Define how pursuits become approved plans, and how decisions carry into delivery."],
  ["Adoption and governance", "Establish approval rights, evidence standards and team practices for live engagements."],
];

export function CompanyOverview({ detailed = false }) {
  return <Track name="company" id="company" className={`landing-company${detailed ? " landing-company--detailed" : ""}`}>
    <div className="landing-container landing-company-grid"><div className="landing-company-identity"><a className="landing-company-logo" href="/company/" aria-label="Alliance Systems Group"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance<small>Systems Group</small></span></a><h2>We make the product<br />fit the practice.</h2></div><div className="landing-company-copy"><p>{detailed ? "AllianceOne becomes useful when it reflects how your firm sells, decides, delivers, and reviews work. Our services connect the technology, operating model, and adoption required for live client engagements." : "Alliance Systems Group builds software and services for consulting and advisory firms. We help make accumulated delivery experience usable in live work without replacing professional judgment or the systems your teams already use."}</p><div className="landing-services">{practiceServices.map(([name, text]) => <div key={name}><h3>{name}</h3>{detailed && <p>{text}</p>}</div>)}</div>{!detailed && <a className="landing-text-link" href="/company/">About Alliance Systems Group <span aria-hidden="true">↗</span></a>}</div></div>
  </Track>;
}

export function PartnerInvitation() {
  return <Track name="design_partners" className="landing-invitation"><div className="landing-container landing-invitation-grid"><h2>We are looking for a small<br />number of design partners.</h2><div><p>We’re inviting consulting and advisory firms to get early access, work directly with our team, and have a say in how AllianceOne develops.</p><a href="/design-partners/" onClick={() => capture("cta_clicked", { location: "page_cta" })}>Discuss a design partnership <span aria-hidden="true">↗</span></a></div></div></Track>;
}

export default function LandingPage({ mode = "home" }) {
  useFonts();
  const inquire = () => window.location.assign("/design-partners/");
  return <div className="landing-page"><Nav onCta={inquire} /><main id="main-content">
    <Track name="scope" id="scope" className="landing-hero"><div className="landing-container"><div className="landing-hero-copy"><h1>Make every engagement <span>an advantage.</span></h1><p>AllianceOne turns delivery history into the scope, staffing, workstreams, effort, and deliverables for new client work.</p></div><EngagementDemo phase="scope" primary /><p className="landing-scope-caption">Scope with evidence from the people, decisions and reviews behind previous engagements.</p></div></Track>
    <Track name="product" id="product" className="landing-product"><div className="landing-container landing-product-intro"><h2>AllianceOne turns delivery<br />history into working precedent.</h2><p>It connects the conditions a team faced, the choices it made, the reasoning behind them, and what happened next. That record informs new scopes and plans while your existing systems continue to run the work they own.</p></div></Track>
    <Track name="plan" id="plan" className="landing-phase landing-phase--plan"><div className="landing-container"><div className="landing-phase-heading"><div><p className="landing-phase-label">Plan</p><h2>Translate the commitment<br />into a delivery plan.</h2></div><p>Carry the accepted scope and reviewed team into assignments, dates and review gates. Approve the plan, create the application records, and verify them against the agreed work.</p></div><EngagementDemo phase="plan" /></div></Track>
    <Track name="deliver" id="deliver" className="landing-phase landing-phase--deliver"><div className="landing-container"><div className="landing-phase-heading"><div><p className="landing-phase-label">Deliver</p><h2>Give each consultant the<br />context to deliver well.</h2></div><p>Avery’s approved assignment carries Northstar’s requirements, firm methods and relevant review experience into the assessment. Sources, feedback and the reasoning behind revisions stay with the work.</p></div><EngagementDemo phase="deliver" /></div></Track>
    {mode === "home" && <CompanyOverview />}
    <PartnerInvitation />
  </main><Footer onCta={inquire} /></div>;
}

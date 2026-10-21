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
  return <div className="landing-page"><Nav dark onCta={inquire} /><main id="main-content">
    <Track name="hero" className="landing-hero"><div className="landing-container"><div className="landing-hero-copy"><h1>Make every engagement<br />an advantage.</h1><p>AllianceOne turns delivery history into the scope, staffing, workstreams, effort, and deliverables for new client work.</p></div><EngagementDemo /></div></Track>
    {mode !== "demo" && <Track name="product" id="product" className="landing-product"><div className="landing-container"><div className="landing-product-intro"><h2>AllianceOne turns delivery<br />history into working precedent.</h2><p>It connects the conditions a team faced, the choices it made, the reasoning behind them, and what happened next. That record informs new scopes and plans while your existing systems continue to run the work they own.</p></div><div className="landing-benefits"><article><h3>Scope with evidence</h3><p>Comparable engagements give teams a grounded basis for shaping scope, staffing, effort, and price.</p></article><article><h3>Deliver with control</h3><p>Approved commitments remain connected to assignments, milestones, decisions, hours, and billing.</p></article><article><h3>Build proof into the proposition</h3><p>Methods and points of view stay connected to the situations in which they were used and the outcomes that followed.</p></article></div></div></Track>}
    {mode === "home" && <CompanyOverview />}
    <PartnerInvitation />
  </main><Footer onCta={inquire} /></div>;
}

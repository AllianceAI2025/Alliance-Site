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

const phases = [
  {
    id: "scope", title: "Turn early context into an approved scope.", role: "For the engagement manager",
    description: "Bring together client context, the firm’s method and relevant delivery experience. Test the approach against current resource availability, effort and pricing assumptions before preparing the proposal.",
    detail: "See what happened at Harbor and Meridian, what changed in review, and what Northstar should carry forward.",
  },
  {
    id: "plan", title: "Translate the commitment into a delivery plan.", role: "For the engagement manager",
    description: "Carry the accepted proposal into resources, deliverables, dates and review responsibilities. Develop the plan, work through review and approve the version the team will deliver.",
    detail: "Then create the project and assignments in the firm’s applications—and read the records back against the approved plan.",
  },
  {
    id: "deliver", title: "Give each consultant the context to deliver well.", role: "For the consultant",
    description: "Start from the approved assignment with the client’s objectives, firm templates and relevant review experience already in context. Develop the work, examine its sources and resolve review feedback.",
    detail: "Follow Avery’s assessment from the evidence available to the revised conclusion, with the reasoning and review kept alongside it.",
  },
];

function WorkflowPhase({ phase }) {
  return <Track name={phase.id} id={phase.id} className={`landing-phase landing-phase--${phase.id}`}>
    <div className="landing-container landing-phase-grid">
      <div className="landing-phase-copy"><p className="landing-phase-label">{phase.id}</p><h2>{phase.title}</h2><p>{phase.description}</p><p>{phase.detail}</p><span className="landing-phase-role">{phase.role}</span></div>
      <EngagementDemo presentation={phase.id} />
    </div>
    {phase.id === "plan" && <div className="landing-container landing-systems"><p>Your existing systems continue<br />to run the work they own.</p><div><span><img src="/brand/systems/project-operations.svg" alt="" />Dynamics 365 Project Operations</span><span><img src="/brand/systems/sharepoint.svg" alt="" />SharePoint</span></div></div>}
  </Track>;
}

export default function LandingPage({ mode = "home" }) {
  useFonts();
  const inquire = () => window.location.assign("/design-partners/");
  return <div className="landing-page"><Nav onCta={inquire} /><main id="main-content">
    <Track name="hero" className="landing-hero"><div className="landing-container"><div className="landing-hero-copy"><h1>Make every engagement<br /><span>an advantage.</span></h1><p>AllianceOne turns delivery history into the scope, staffing, workstreams, effort, and deliverables for new client work.</p></div><EngagementDemo presentation="opening" /></div></Track>
    <Track name="product" id="product" className="landing-product"><div className="landing-container landing-product-intro"><h2>AllianceOne turns delivery<br />history into working precedent.</h2><p>It connects the conditions a team faced, the choices it made, the reasoning behind them, and what happened next. That record informs new scopes and plans while your existing systems continue to run the work they own.</p></div></Track>
    {phases.map(phase => <WorkflowPhase key={phase.id} phase={phase} />)}
    {mode === "home" && <CompanyOverview />}
    <PartnerInvitation />
  </main><Footer onCta={inquire} /></div>;
}

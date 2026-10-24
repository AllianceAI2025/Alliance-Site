import React, { useLayoutEffect } from "react";
import { Footer, LogoMark, Nav, useFonts } from "./Site.jsx";
import { capture, Track } from "./analytics";
import EngagementDemo from "./demo/EngagementDemo.jsx";
import "./landing.css";

export const practiceServices = [
  ["Systems integration", "Connect AllianceOne to the CRM, PSA, project, document, communication and finance systems your teams use."],
  ["Practice configuration", "Shape methods, templates and review standards around the way your practitioners work."],
  ["Workflow design", "Define how pursuits become approved plans, and how decisions carry into delivery."],
  ["Adoption and governance", "Establish approval rights, evidence standards and team practices for live engagements."],
];

const knowledgeInputs = [
  ["Methods and intellectual property", "Frameworks, diagnostic tools, templates and review standards inform the approach. Teams can see how a method was applied and where it needed to change."],
  ["People and delivery experience", "Comparable engagements connect the client conditions, people involved, work delivered and changes made in review, with the evidence and limits of the comparison."],
  ["Current engagement context", "Client objectives, conversations, source documents and resource availability ground the work in what is known today. Open questions and unsupported assumptions stay visible."],
];

function FirmKnowledge() {
  return <Track name="product" id="product" className="landing-product">
    <div className="landing-container">
      <div className="landing-product-intro">
        <div><p className="landing-section-label">AllianceOne</p><h2>Firm knowledge at<br />the point of work.</h2></div>
        <p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work. That context helps teams test assumptions before they commit and spend less effort reconstructing what the firm already knows.</p>
      </div>
      <div className="landing-knowledge-inputs">
        {knowledgeInputs.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </div>
  </Track>;
}

function EngagementRecord() {
  return <Track name="engagement_record" id="how-it-works" className="landing-record">
    <div className="landing-container">
      <div className="landing-record-heading">
        <div><p className="landing-section-label">How it works</p><h2>What was promised and what was delivered stay connected.</h2></div>
        <p>AllianceOne is designed to keep the accepted scope, approved plan and reasoning behind changes connected. Your CRM, PSA, project, document and finance systems continue to own the records they run.</p>
      </div>
      <div className="landing-record-layout">
        <figure className="landing-record-figure">
          <div className="landing-record-visual" role="group" aria-label="Approved plan written to the PSA, with execution records read back into the engagement record">
            <div className="landing-record-origin">
              <div className="landing-record-brand"><LogoMark size={27} /><strong>AllianceOne</strong><span>Engagement record</span></div>
              <dl className="landing-record-contents">
                <div><dt>Commitment</dt><dd>Accepted scope<br />Commercial terms</dd></div>
                <div><dt>Plan</dt><dd>People and effort<br />Deliverables and dates</dd></div>
                <div><dt>Decisions</dt><dd>Approvals and changes<br />Supporting reasoning</dd></div>
              </dl>
            </div>
            <div className="landing-record-flows">
              <div><span aria-hidden="true">↓</span><p>Write the<br /><strong>approved plan</strong></p></div>
              <div><span aria-hidden="true">↑</span><p>Read back<br /><strong>delivery evidence</strong></p></div>
            </div>
            <div className="landing-record-destination"><strong>PSA / project management</strong><p>Projects, tasks, assignments, milestones and time</p></div>
          </div>
          <figcaption>CRM adds opportunity context. Documents and communications supply evidence. Finance contributes available actuals. Each record retains its source.</figcaption>
        </figure>
        <div className="landing-record-explanation">
          <article><h3>Approve the plan. Verify the write.</h3><p>The engagement manager reviews the work, team and effort before the plan is sent to the project system. Reading the resulting records back checks that they match the approved commitment.</p></article>
          <article><h3>Act when delivery changes.</h3><p>Changes in time, assignments, milestones and communications give agents signals to compare with the plan. Material differences reach the manager with their supporting context. Approved revisions preserve the original commitment and why it changed.</p></article>
          <article><h3>Make the experience useful again.</h3><p>Conversations, review feedback, decisions and revisions are captured as the work develops. Practitioners review the resulting lessons, their evidence and their limits before they inform future engagements.</p></article>
        </div>
      </div>
      <div className="landing-record-governance"><p>Practitioners remain responsible for the analysis and decisions. Source access and reuse follow the permissions of the person and engagement.</p></div>
    </div>
  </Track>;
}

export function CompanyOverview({ detailed = false }) {
  return <Track name="company" id="company" className={`landing-company${detailed ? " landing-company--detailed" : ""}`}>
    <div className="landing-container landing-company-grid"><div className="landing-company-identity"><a className="landing-company-logo" href="/company/" aria-label="Alliance Systems Group"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance<small>Systems Group</small></span></a><h2>We make the product<br />fit the practice.</h2></div><div className="landing-company-copy"><p>{detailed ? "AllianceOne becomes useful when it reflects how your firm sells, decides, delivers, and reviews work. Our services connect the technology, operating model, and adoption required for live client engagements." : "Alliance Systems Group builds software and services for consulting and advisory firms. We help make accumulated delivery experience usable in live work without replacing professional judgment or the systems your teams already use."}</p><div className="landing-services">{practiceServices.map(([name, text]) => <div key={name}><h3>{name}</h3>{detailed && <p>{text}</p>}</div>)}</div>{!detailed && <a className="landing-text-link" href="/company/">About Alliance Systems Group <span aria-hidden="true">↗</span></a>}</div></div>
  </Track>;
}

export function PartnerInvitation() {
  return <Track name="design_partners" className="landing-invitation"><div className="landing-container landing-invitation-grid"><h2>We are looking for a small<br />number of design partners.</h2><div><p>We’re inviting consulting and advisory firms to get early access, work directly with our team, and have a say in how AllianceOne develops.</p><p>We begin with one practice, one recurring engagement type and one PSA or project system, with the intended benefit and review criteria agreed together.</p><a href="/design-partners/" onClick={() => capture("cta_clicked", { location: "page_cta" })}>Discuss a design partnership <span aria-hidden="true">↗</span></a></div></div></Track>;
}

export default function LandingPage({ mode = "home" }) {
  useFonts();
  useLayoutEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  const inquire = () => window.location.assign("/design-partners/");
  return <div className="landing-page"><Nav onCta={inquire} /><main id="main-content">
    <Track name="scope" id="scope" className="landing-hero"><div className="landing-container"><div className="landing-hero-copy"><h1>Make every engagement <span>an advantage.</span></h1><p>AllianceOne turns delivery history into the scope, staffing, workstreams, effort, and deliverables for new client work.</p></div><EngagementDemo phase="scope" primary /><p className="landing-scope-caption">Scope with evidence from the people, decisions and reviews behind previous engagements.</p></div></Track>
    <FirmKnowledge />
    <Track name="plan" id="plan" className="landing-phase landing-phase--plan"><div className="landing-container"><div className="landing-phase-heading"><div><p className="landing-phase-label">Plan</p><h2>Translate the commitment<br />into a delivery plan.</h2></div><p>Carry the accepted scope and reviewed team into assignments, dates and review gates. Approve the plan, create the application records, and verify them against the agreed work.</p></div><EngagementDemo phase="plan" /></div></Track>
    <Track name="deliver" id="deliver" className="landing-phase landing-phase--deliver"><div className="landing-container"><div className="landing-phase-heading"><div><p className="landing-phase-label">Deliver</p><h2>Give each consultant the<br />context to deliver well.</h2></div><p>Avery’s approved assignment carries Northstar’s requirements, firm methods and relevant review experience into the assessment. Sources, feedback and the reasoning behind revisions stay with the work.</p></div><EngagementDemo phase="deliver" /></div></Track>
    <EngagementRecord />
    {mode === "home" && <CompanyOverview />}
    <PartnerInvitation />
  </main><Footer onCta={inquire} /></div>;
}

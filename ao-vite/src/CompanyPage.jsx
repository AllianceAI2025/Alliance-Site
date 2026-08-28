import React, { useEffect, useState } from "react";
import { Btn, Logo, Modal, Wrap, useFonts } from "./App.jsx";

const operatingContrasts = [
  ["Memory", "A model can retain or retrieve context.", "AllianceOne maintains the approved state of the engagement."],
  ["Access", "A model can search records and call connected tools.", "AllianceOne resolves authority, versions, ownership, and approvals."],
  ["Generation", "A model can produce an answer, plan, or artifact.", "AllianceOne turns approved work into a governed commitment."],
  ["Action", "A model can write into another application.", "AllianceOne materializes approved intent and preserves the receipt."],
];

const firmIntelligence = [
  ["Methods and frameworks", "The questions your firm asks, the evidence it trusts, and the way it structures a problem."],
  ["Templates and deliverables", "The proven shapes, required sections, review gates, and quality standards behind client work."],
  ["Prior engagements", "Comparable scopes, staffing patterns, decisions, changes, outcomes, and lessons from delivery."],
  ["Review standards", "The criteria partners and engagement leaders use to determine whether work is ready to advance."],
];

const lifecycle = ["Scope", "Plan", "Materialize", "Execute", "Reconcile", "Learn"];

const services = [
  ["Implementation and integration", "Connect AllianceOne to CRM, PSA, project, document, communication, and ERP systems while preserving each system's authority."],
  ["Engagement operating model", "Define how opportunities become approved scopes, how commitments become delivery plans, and how changes are governed through close-out."],
  ["Knowledge and IP configuration", "Structure your firm's methods, templates, deliverable types, precedent, and review standards so they can be applied during live work."],
  ["Governance and adoption", "Establish approval rights, evidence standards, operating controls, and team practices for dependable use in client delivery."],
];

function CorporateNav({ onCta }) {
  const [open, setOpen] = useState(false);
  return <header className="asg-nav">
    <Wrap className="asg-nav-inner">
      <a href="/company/" className="asg-brand" aria-label="Alliance Systems Group home">
        <img src="/brand/asg/alliance-systems-group-horizontal-white.png" alt="Alliance Systems Group" />
      </a>
      <nav className="asg-desktop-nav" aria-label="Alliance Systems Group navigation">
        <a href="/#platform">AllianceOne</a>
        <a href="#thesis">Our thesis</a>
        <a href="#services">Services</a>
        <a href="#company">Company</a>
        <button onClick={onCta}>Discuss a partnership</button>
      </nav>
      <button className="asg-menu" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
    </Wrap>
    {open && <nav className="asg-mobile-nav" aria-label="Mobile navigation">
      <a href="/#platform" onClick={() => setOpen(false)}>AllianceOne</a>
      <a href="#thesis" onClick={() => setOpen(false)}>Our thesis</a>
      <a href="#services" onClick={() => setOpen(false)}>Services</a>
      <a href="#company" onClick={() => setOpen(false)}>Company</a>
      <button onClick={() => { setOpen(false); onCta(); }}>Discuss a partnership</button>
    </nav>}
  </header>;
}

function CorporateFooter({ onCta }) {
  return <footer className="asg-footer">
    <Wrap>
      <div className="asg-footer-main">
        <img src="/brand/asg/alliance-systems-group-horizontal-white.png" alt="Alliance Systems Group" />
        <p>Operating infrastructure for expert work.</p>
        <nav aria-label="Footer navigation">
          <a href="/">AllianceOne</a>
          <a href="/how-it-works/">How it works</a>
          <a href="/security/">Security</a>
          <button onClick={onCta}>Design partner program</button>
        </nav>
      </div>
      <div className="asg-footer-base"><span>Alliance Systems Group Inc.</span><span>© 2026 Alliance Systems Group Inc. All rights reserved.</span></div>
    </Wrap>
  </footer>;
}

export default function CompanyPage() {
  const [modal, setModal] = useState(false);
  useFonts();

  useEffect(() => {
    document.documentElement.classList.add("asg-document");
    return () => document.documentElement.classList.remove("asg-document");
  }, []);

  return <div className="asg-page">
    <CorporateNav onCta={() => setModal(true)} />
    <main>
      <section className="asg-hero">
        <div className="asg-hero-grid" aria-hidden="true"><span /><span /><span /><span /></div>
        <img className="asg-hero-mark" src="/brand/asg/alliance-systems-group-mark-white.png" alt="" aria-hidden="true" />
        <Wrap>
          <div className="asg-hero-copy">
            <h1>Operating infrastructure for expert work.</h1>
            <p>Alliance Systems Group Inc. builds software and provides specialized professional services for firms whose value depends on expert judgment, repeatable delivery, and the ability to learn from every engagement.</p>
            <div className="asg-hero-actions">
              <a href="/">Explore AllianceOne <span aria-hidden="true">↗</span></a>
              <button onClick={() => setModal(true)}>Discuss a partnership <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <div className="asg-hero-statement">
            <strong>Our flagship product</strong>
            <Logo light />
            <p>The engagement operating system for professional-services firms.</p>
          </div>
        </Wrap>
      </section>

      <section id="thesis" className="asg-section asg-thesis">
        <Wrap>
          <div className="asg-section-head">
            <h2>A powerful model is not an operating system.</h2>
            <div>
              <p>Frontier models can reason across large bodies of information, retain project context, search connected systems, and take action. Those capabilities are essential. They do not establish the authoritative state of an engagement.</p>
              <p>Professional-services firms need a durable layer that knows what was proposed, what was approved, which record governs, why a decision changed, what moved into the operating stack, and how delivery ultimately performed.</p>
            </div>
          </div>
          <div className="asg-contrast">
            <div className="asg-contrast-head"><span /><strong>Model capability</strong><strong>Operating state</strong></div>
            {operatingContrasts.map(([name, capability, state]) => <div className="asg-contrast-row" key={name}><h3>{name}</h3><p>{capability}</p><p>{state}</p></div>)}
          </div>
        </Wrap>
      </section>

      <section className="asg-section asg-ip">
        <Wrap>
          <div className="asg-section-head">
            <h2>Your firm's intellectual property should be active in the work.</h2>
            <div>
              <p>A library stores documents. An operating system applies the right methods, precedent, templates, and review standards at the point a team is making a decision.</p>
              <p>AllianceOne turns your firm's accumulated experience into live context for scoping, planning, staffing, delivery, reconciliation, and learning.</p>
            </div>
          </div>
          <div className="asg-ip-grid">
            {firmIntelligence.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
          </div>
          <div className="asg-ip-flow" aria-label="How firm intellectual property moves through an engagement">
            {lifecycle.map((phase) => <span key={phase}>{phase}</span>)}
          </div>
        </Wrap>
      </section>

      <section className="asg-section asg-operating-layer">
        <Wrap>
          <div className="asg-section-head">
            <h2>A governed layer between intelligence and execution.</h2>
            <div><p>AllianceOne does not replace the models your teams use or the systems that run your firm. It gives both a shared, governed engagement state.</p></div>
          </div>
          <div className="asg-layer-map">
            <div className="asg-layer-sources">
              <strong>Firm intelligence</strong>
              <span>Methods and frameworks</span><span>Templates and deliverables</span><span>Prior engagements</span><span>Review standards</span>
            </div>
            <div className="asg-layer-core">
              <img src="/brand/asg/alliance-systems-group-mark-white.png" alt="" aria-hidden="true" />
              <strong>AllianceOne</strong>
              <p>Intent · commitments · approvals · decisions · outcomes</p>
            </div>
            <div className="asg-layer-sources">
              <strong>Operating stack</strong>
              <span>CRM</span><span>PSA and project systems</span><span>Microsoft 365</span><span>ERP and billing</span>
            </div>
          </div>
          <div className="asg-layer-result"><span>Models and teams work with governed context</span><i aria-hidden="true" /><span>Approved intent becomes execution state</span><i aria-hidden="true" /><span>Actual delivery becomes institutional learning</span></div>
        </Wrap>
      </section>

      <section id="platform" className="asg-section asg-product">
        <Wrap>
          <div className="asg-product-head">
            <div><Logo /><h2>One engagement state, from the first signal through close-out.</h2></div>
            <p>AllianceOne is the flagship product of Alliance Systems Group Inc. It helps professional-services firms scope, plan, staff, deliver, reconcile, and learn from client engagements without replacing the systems they already use.</p>
          </div>
          <div className="asg-product-flow">{lifecycle.map((phase) => <div key={phase}><strong>{phase}</strong></div>)}</div>
          <a className="asg-product-link" href="/">Explore the AllianceOne platform <span aria-hidden="true">↗</span></a>
        </Wrap>
      </section>

      <section id="services" className="asg-section asg-services">
        <Wrap>
          <div className="asg-section-head">
            <h2>Software establishes the operating model. Services make it real.</h2>
            <div><p>Our professional services are focused on deployment, integration, configuration, governance, and adoption. The objective is a durable client capability built on a reusable product platform.</p></div>
          </div>
          <div className="asg-services-list">
            {services.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
          </div>
        </Wrap>
      </section>

      <section id="company" className="asg-section asg-company">
        <Wrap>
          <div className="asg-company-grid">
            <h2>One company. A product platform and the expertise to deploy it.</h2>
            <div>
              <p>Alliance Systems Group Inc. owns and develops AllianceOne. The company combines product development with specialized professional services because engagement infrastructure cannot be installed as a generic software layer.</p>
              <p>The product remains the center of the model. Services help each firm connect its systems, encode its operating methods, establish governance, and move into production with confidence.</p>
            </div>
          </div>
        </Wrap>
      </section>

      <section className="asg-cta">
        <Wrap>
          <h2>Build the operating layer around your firm.</h2>
          <div><p>We are working with a small number of professional-services firms to shape integrations, operating workflows, and production rollout.</p><Btn variant="dark" onClick={() => setModal(true)}>Discuss a design partnership</Btn></div>
        </Wrap>
      </section>
    </main>
    <CorporateFooter onCta={() => setModal(true)} />
    <Modal open={modal} onClose={() => setModal(false)} />
  </div>;
}

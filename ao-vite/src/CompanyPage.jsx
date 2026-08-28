import React, { useEffect, useState } from "react";
import { Btn, Logo, Modal, Wrap, useFonts } from "./App.jsx";

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
            <h2>We build where intelligence becomes operations.</h2>
            <div>
              <p>The largest AI models are becoming more capable at reasoning, retrieval, and action. Firms still need systems that turn those capabilities into governed, repeatable work.</p>
              <p>Alliance Systems Group develops the operating infrastructure that connects institutional knowledge, human judgment, approved decisions, and the applications where work is executed.</p>
            </div>
          </div>
        </Wrap>
      </section>

      <section id="platform" className="asg-section asg-product">
        <Wrap>
          <div className="asg-product-head">
            <div><Logo /><h2>The engagement operating system for professional services.</h2></div>
            <div className="asg-product-summary"><p>AllianceOne is the flagship product of Alliance Systems Group Inc. It creates a governed engagement state across the systems, conversations, methods, decisions, and outcomes that shape client work.</p><p>The product page carries the complete story of how AllianceOne works.</p></div>
          </div>
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

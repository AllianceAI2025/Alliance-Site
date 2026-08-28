import React, { useEffect, useState } from "react";
import { Btn, Footer, Logo, Modal, Nav, Wrap, useFonts } from "./App.jsx";

const services = [
  ["Implementation and integration", "Connect AllianceOne to CRM, PSA, project, document, communication, and ERP systems while preserving each system's authority."],
  ["Engagement operating model", "Define how opportunities become approved scopes, how commitments become delivery plans, and how changes are governed through close-out."],
  ["Knowledge and IP configuration", "Structure your firm's methods, templates, deliverable types, precedent, and review standards so they can be applied during live work."],
  ["Governance and adoption", "Establish approval rights, evidence standards, operating controls, and team practices for dependable use in client delivery."],
];

export default function CompanyPage() {
  const [modal, setModal] = useState(false);
  useFonts();

  useEffect(() => {
    document.documentElement.classList.add("asg-document");
    return () => document.documentElement.classList.remove("asg-document");
  }, []);

  return <div className="asg-page">
    <Nav dark onCta={() => setModal(true)} />
    <main>
      <section className="asg-hero">
        <div className="asg-hero-grid" aria-hidden="true"><span /><span /><span /><span /></div>
        <img className="asg-hero-mark" src="/brand/asg/alliance-systems-group-mark-white.png" alt="" aria-hidden="true" />
        <Wrap>
          <div className="asg-hero-copy">
            <h1>Operating infrastructure for expert work.</h1>
            <p>Alliance Systems Group Inc. builds software and provides specialized professional services for firms whose value depends on expert judgment, repeatable delivery, and the ability to learn from every engagement.</p>
            <div className="asg-hero-actions">
              <a href="/allianceone/">Explore AllianceOne <span aria-hidden="true">↗</span></a>
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
            <div className="asg-product-summary"><p>Alliance Systems Group Inc. owns and develops AllianceOne. The product creates a governed engagement state across the systems, conversations, methods, decisions, and outcomes that shape client work.</p></div>
          </div>
          <a className="asg-product-link" href="/allianceone/">Explore the AllianceOne platform <span aria-hidden="true">↗</span></a>
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

      <section className="asg-cta">
        <Wrap>
          <h2>Build the operating layer around your firm.</h2>
          <div><p>We are working with a small number of professional-services firms to shape integrations, operating workflows, and production rollout.</p><Btn variant="dark" onClick={() => setModal(true)}>Discuss a design partnership</Btn></div>
        </Wrap>
      </section>
    </main>
    <Footer onCta={() => setModal(true)} />
    <Modal open={modal} onClose={() => setModal(false)} />
  </div>;
}

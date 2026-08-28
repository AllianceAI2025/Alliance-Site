import React, { useEffect, useState } from "react";
import { Btn, Footer, Logo, Modal, Nav, Wrap, useFonts } from "./App.jsx";
import { capture, Track } from "./analytics";

const services = [
  ["Systems integration", "Connect AllianceOne to CRM, PSA, project, document, communication, and finance systems. Define which records each system owns and how approved plans and delivery actuals move between them."],
  ["Practice configuration", "Configure engagement types, methods, templates, deliverable standards, review gates, and comparable-work criteria around your firm's practices."],
  ["Workflow design", "Define how pursuits become scopes, scopes become approved plans, and plan changes are reviewed, written back, and retained."],
  ["Adoption and governance", "Set approval rights, evidence standards, operating controls, and team practices, then support rollout across initial engagements."],
];

export default function CompanyPage() {
  const [modal, setModal] = useState(false);
  useFonts();

  useEffect(() => {
    document.documentElement.classList.add("asg-document");
    if (!window.location.hash) {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      html.style.scrollBehavior = previous;
    }
    return () => document.documentElement.classList.remove("asg-document");
  }, []);

  return <div className="asg-page">
    <Nav dark onCta={() => setModal(true)} />
    <main>
      <Track name="hero" className="asg-hero">
        <div className="asg-hero-grid" aria-hidden="true"><span /><span /><span /><span /></div>
        <img className="asg-hero-mark" src="/brand/asg/alliance-systems-group-mark-white.png" alt="" aria-hidden="true" />
        <Wrap>
          <div className="asg-hero-copy">
            <h1>Software and services for professional firms.</h1>
            <p>Alliance Systems Group Inc. develops AllianceOne and works with consulting and advisory firms to put it into practice. We connect the product to the systems your firm already uses, configure it around your methods, and help your teams adopt it in live engagements.</p>
            <div className="asg-hero-actions">
              <a href="/allianceone/">View AllianceOne <span aria-hidden="true">↗</span></a>
              <button onClick={() => { capture("cta_clicked", { location: "hero" }); setModal(true); }}>Talk with us <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <div className="asg-hero-statement">
            <strong>Flagship product</strong>
            <Logo light />
            <p>Our software for scoping, planning, delivering, and learning from client engagements.</p>
          </div>
        </Wrap>
      </Track>

      <Track name="thesis" id="thesis" className="asg-section asg-thesis">
        <Wrap>
          <div className="asg-section-head">
            <h2>A firm should be able to use what it has already learned.</h2>
            <div>
              <p>Most professional firms have years of useful experience spread across proposals, project plans, deliverables, email, time records, billing systems, and the people who led the work.</p>
              <p>We build software and services that make that experience available while new work is being scoped, planned, staffed, and delivered.</p>
            </div>
          </div>
        </Wrap>
      </Track>

      <Track name="product" id="platform" className="asg-section asg-product">
        <Wrap>
          <div className="asg-product-head">
            <div><Logo /><h2>AllianceOne keeps the engagement connected from pursuit through close-out.</h2></div>
            <div className="asg-product-summary"><p>AllianceOne is the flagship product of Alliance Systems Group Inc. It maintains the approved scope, plan, staffing, decisions, delivery evidence, and outcomes of an engagement while CRM, PSA, document, and finance systems continue to run the work they own.</p></div>
          </div>
          <a className="asg-product-link" href="/allianceone/">See the AllianceOne product <span aria-hidden="true">↗</span></a>
        </Wrap>
      </Track>

      <Track name="services" id="services" className="asg-section asg-services">
        <Wrap>
          <div className="asg-section-head">
            <h2>We help firms put AllianceOne into production.</h2>
            <div><p>Our services cover the work required to connect the product to your firm, configure it around how your teams operate, and establish the governance needed for live client work.</p></div>
          </div>
          <div className="asg-services-list">
            {services.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
          </div>
        </Wrap>
      </Track>

      <Track name="cta" className="asg-cta">
        <Wrap>
          <h2>Talk with us about your firm.</h2>
          <div><p>We are working with a small number of professional-services firms on design partnerships, implementation planning, and early production use.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); setModal(true); }}>Discuss a partnership</Btn></div>
        </Wrap>
      </Track>
    </main>
    <Footer onCta={() => setModal(true)} />
    <Modal open={modal} onClose={() => setModal(false)} />
  </div>;
}

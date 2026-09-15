import React, { useEffect, useState } from "react";
import { Btn, Footer, Logo, Modal, Nav, Wrap, useFonts } from "./App.jsx";
import { capture, Track } from "./analytics";

const services = [
  ["Systems integration", "Connect AllianceOne to CRM, PSA, project, document, communication, and finance systems. Define what each system owns and how approved plans and delivery evidence move between them."],
  ["Practice configuration", "Shape engagement types, methods, templates, review standards, and comparable-work criteria around the way your practitioners actually work."],
  ["Workflow design", "Define how pursuits become scopes, scopes become approved plans, and material decisions are reviewed, carried into delivery, and retained."],
  ["Adoption and governance", "Establish approval rights, evidence standards, operating controls, and team practices, then support adoption through the first live engagements."],
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
            <h1>Turn what your firm has learned into how it works.</h1>
            <p>Alliance Systems Group builds software and services for consulting and advisory firms. We help make accumulated delivery experience usable in live work without replacing professional judgment or the systems your teams already use.</p>
            <div className="asg-hero-actions">
              <a href="/allianceone/">View AllianceOne <span aria-hidden="true">↗</span></a>
              <button onClick={() => { capture("cta_clicked", { location: "hero" }); setModal(true); }}>Talk with us <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <div className="asg-hero-statement">
            <strong>Flagship product</strong>
            <Logo light />
            <p>Our software for carrying firm-specific experience through scoping, planning, delivery, and review.</p>
          </div>
        </Wrap>
      </Track>

      <Track name="thesis" id="thesis" className="asg-section asg-thesis">
        <Wrap>
          <div className="asg-section-head">
            <h2>Generic capability is getting cheaper. Firm-specific judgment is not.</h2>
            <div>
              <p>Every firm can access increasingly capable AI. What competitors cannot access is your history of solving particular problems: the patterns your people have recognized, the methods they have refined, and the evidence showing when those methods worked.</p>
              <p>That experience is rarely absent. It is unassembled and distributed across people, proposals, plans, deliverables, conversations, and financial records. We help firms put it back to work.</p>
            </div>
          </div>
        </Wrap>
      </Track>

      <Track name="product" id="platform" className="asg-section asg-product">
        <Wrap>
          <div className="asg-product-head">
            <div><Logo /><h2>AllianceOne turns delivery history into working precedent.</h2></div>
            <div className="asg-product-summary"><p>AllianceOne connects the conditions a team faced, the choices it made, the reasoning behind them, and what happened next. That record informs new scopes and plans while CRM, PSA, document, and finance systems continue to run the work they own.</p></div>
          </div>
          <a className="asg-product-link" href="/allianceone/">See the AllianceOne product <span aria-hidden="true">↗</span></a>
        </Wrap>
      </Track>

      <Track name="services" id="services" className="asg-section asg-services">
        <Wrap>
          <div className="asg-section-head">
            <h2>We make the product fit the practice.</h2>
            <div><p>AllianceOne becomes useful when it reflects how your firm sells, decides, delivers, and reviews work. Our services connect the technology, operating model, and adoption required for live client engagements.</p></div>
          </div>
          <div className="asg-services-list">
            {services.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
          </div>
        </Wrap>
      </Track>

      <Track name="cta" className="asg-cta">
        <Wrap>
          <h2>Put your firm’s experience to work.</h2>
          <div><p>We are working with a small number of professional-services firms on design partnerships, implementation planning, and early production use.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); setModal(true); }}>Discuss a partnership</Btn></div>
        </Wrap>
      </Track>
    </main>
    <Footer onCta={() => setModal(true)} />
    <Modal open={modal} onClose={() => setModal(false)} />
  </div>;
}

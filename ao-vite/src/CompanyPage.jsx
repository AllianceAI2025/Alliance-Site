import React, { useEffect, useState } from "react";
import { Btn, Footer, Logo, Modal, Nav, Wrap, useFonts } from "./App.jsx";
import { capture, Track } from "./analytics";

const services = [
  ["Systems integration", "Connect AllianceOne to your CRM, PSA, document, and finance systems."],
  ["Practice configuration", "Shape engagement types, methods, and review standards around how your practitioners work."],
  ["Workflow design", "Define how pursuits become approved plans and how decisions carry into delivery."],
  ["Adoption and governance", "Set approval rights and evidence standards, and support the first live engagements."],
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
            <p>Alliance Systems Group builds software and services that put a consulting or advisory firm’s own experience to work in every engagement.</p>
            <div className="asg-hero-actions">
              <a href="/allianceone/">View AllianceOne <span aria-hidden="true">↗</span></a>
              <button onClick={() => { capture("cta_clicked", { location: "hero" }); setModal(true); }}>Talk with us <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <div className="asg-hero-statement">
            <strong>Flagship product</strong>
            <Logo light />
            <p>Frontier models know how to reason. AllianceOne knows how your firm works.</p>
          </div>
        </Wrap>
      </Track>

      <Track name="thesis" id="thesis" className="asg-section asg-thesis">
        <Wrap>
          <div className="asg-section-head">
            <h2>Every firm has access to the same AI. Only yours has your experience.</h2>
            <div>
              <p>That experience is rarely missing. It is spread across people, proposals, plans, deliverables, and financial records. We bring it to the point of work, using leading frontier models, without replacing professional judgment or the systems your teams already use.</p>
            </div>
          </div>
        </Wrap>
      </Track>

      <Track name="product" id="platform" className="asg-section asg-product">
        <Wrap>
          <div className="asg-product-head">
            <div><Logo /><h2>AllianceOne connects firm knowledge to every engagement.</h2></div>
            <div className="asg-product-summary"><p>It grounds scopes and plans in your firm’s methods and precedent, carries the approved plan into the systems that run the work, and connects what was delivered back to what was committed.</p></div>
          </div>
          <a className="asg-product-link" href="/allianceone/">See the AllianceOne product <span aria-hidden="true">↗</span></a>
        </Wrap>
      </Track>

      <Track name="services" id="services" className="asg-section asg-services">
        <Wrap>
          <div className="asg-section-head">
            <h2>We make the product fit the practice.</h2>
            <div><p>AllianceOne is useful when it reflects how your firm sells, decides, and delivers. Our services close that gap.</p></div>
          </div>
          <div className="asg-services-list">
            {services.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
          </div>
        </Wrap>
      </Track>

      <Track name="cta" className="asg-cta">
        <Wrap>
          <h2>We are looking for a small number of design partners.</h2>
          <div><p>For consulting and advisory firms ready to prove AllianceOne on one live workflow, with success criteria agreed before we begin.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); setModal(true); }}>Discuss a design partnership</Btn></div>
        </Wrap>
      </Track>
    </main>
    <Footer onCta={() => setModal(true)} />
    <Modal open={modal} onClose={() => setModal(false)} />
  </div>;
}

import React, { useState } from "react";
import { useFonts, Btn, Logo, Wrap, Nav, Footer, Modal } from "./App.jsx";
import { capture, Track } from "./analytics";

const assets = [
  ["Scope with less rework", "Comparable engagements test whether scope, staffing, effort, and price are realistic before the firm commits. Senior review starts from something grounded, not a blank page."],
  ["Hand off cleanly to delivery", "The approved plan moves into the systems that run the work, so delivery teams start from the commitment instead of reconstructing it."],
  ["Act sooner on variance", "The approved baseline shows where delivery is diverging while there is still time to act, and reviewed lessons carry into the next pursuit."],
];

const lifecycle = [
  ["Scope", "Turn early client context into a grounded scope, price, and proposal."],
  ["Plan", "Translate the accepted commitment into workstreams, staffing, and effort."],
  ["Materialize", "Write the approved plan into the firm’s PSA or project system."],
  ["Execute", "Give each team member the methods and context to deliver."],
  ["Reconcile", "Compare actual delivery with the approved baseline and record why it changed."],
  ["Learn", "Admit reviewed lessons as precedent for the next engagement."],
];

const comparison = [
  ["Scope", "Reads every version of a proposal", "Knows which version became the contracted scope, and what changed after"],
  ["Delivery", "Queries CRM, PSA, and finance data", "Reconciles what was sold, planned, staffed, billed, and delivered"],
  ["Conflicts", "Reports what each source says", "Resolves which source governs and treats the discrepancy as evidence"],
  ["Method", "Drafts from general best practice", "Builds from how your firm scopes, staffs, and delivers this kind of work"],
  ["Action", "Uses tools when asked", "Knows which actions each engagement stage permits and who must approve them"],
];

const firms = [
  ["Management consulting", "Shape each approach from comparable engagements, and see where delivery followed the plan."],
  ["Specialist advisory", "Bring relevant precedent into high-stakes matters without losing its facts, caveats, or ownership."],
  ["Technology and transformation consulting", "Keep commercial commitments connected to delivery across long programs, teams, and systems."],
];

export default function PlatformPage() {
  const [modal, setModal] = useState(false);
  useFonts();
  const open = () => setModal(true);

  return <div className="site-shell platform-page"><Nav onCta={open} /><main>
    <Track name="hero" id="platform" className="pf-hero">
      <div className="pf-hero-field" aria-hidden="true"><span /><span /><span /><span /></div>
      <Wrap>
        <div className="pf-hero-grid">
          <div className="pf-hero-title">
            <div className="pf-product-kicker"><Logo light /></div>
            <h1>Make every engagement an advantage.</h1>
          </div>
          <div className="pf-hero-copy">
            <p>AllianceOne connects your firm’s methods, experience, and engagement history to how teams scope, staff, plan, and deliver client work, and keeps approved commitments connected to what actually happens.</p>
            <strong>Frontier models know how to reason. AllianceOne knows how your firm works.</strong>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="assets" className="pf-section pf-assets">
      <Wrap>
        <div className="pf-section-head">
          <h2>Better engagement economics. Stronger evidence of value.</h2>
          <p>The value appears where engagement performance is decided: how work is scoped, how it is handed to delivery, and how quickly leaders can act when it drifts.</p>
        </div>
        <div className="pf-asset-grid pf-grid--three">
          {assets.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
      </Wrap>
    </Track>

    <Track name="lifecycle" className="pf-section pf-lifecycle">
      <Wrap>
        <div className="pf-section-head">
          <h2>One loop, from first signal to the next engagement.</h2>
          <p>Each phase adds to the engagement record, and people approve every step that changes a commitment.</p>
        </div>
        <div className="pf-lifecycle-list">
          {lifecycle.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <a className="pf-text-link" href="/how-it-works/#loop">See how it works <span aria-hidden="true">↗</span></a>
      </Wrap>
    </Track>

    <Track name="model" className="pf-section pf-model">
      <Wrap>
        <div className="pf-section-head">
          <h2>The model is not the edge.</h2>
          <p>Frontier AI from OpenAI, Anthropic, and Google can reason, search, and act across enterprise systems. AllianceOne uses those models too. What it adds is the professional-services layer around them.</p>
        </div>
        <div className="pf-comparison">
          <p className="pf-model-declaration">General-purpose AI brings the intelligence. AllianceOne brings how your firm works.</p>
          <div className="pf-comparison-head"><span /><strong>General-purpose AI</strong><strong>AllianceOne</strong></div>
          {comparison.map(([dimension, model, alliance]) => <div className="pf-comparison-row" key={dimension}><strong>{dimension}</strong><p data-label="General-purpose AI">{model}</p><p data-label="AllianceOne">{alliance}</p></div>)}
        </div>
        <div className="pf-model-moat">
          <h3>You could build this on a frontier platform. We make buying the better choice.</h3>
          <p>AllianceOne arrives with a maintained engagement model, configured firm methods, approval rules, tested PSA mappings, and an accountable team. It runs on leading frontier models, and every model change is evaluated against real engagement work before it reaches your practice.</p>
        </div>
      </Wrap>
    </Track>

    <Track name="principle" className="pf-principle">
      <Wrap>
        <h2>AllianceOne is the system of record for how your firm works.</h2>
        <div className="pf-principle-grid">
          <div>
            <h3>What AllianceOne maintains</h3>
            <p>Your firm knowledge: methods, standards, and precedent. The engagement record: scope, the approved baseline, staffing, decisions, and the reason for every change. And the lessons your people review from what was delivered.</p>
          </div>
          <div className="pf-principle-link" aria-hidden="true"><span /><i /><span /></div>
          <div>
            <h3>What your systems keep</h3>
            <p>CRM, PSA, ERP, and document systems remain authoritative for the facts they own: opportunities, tasks, time, invoices, and files. AllianceOne writes the approved plan in and reads delivery back.</p>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="firms" id="firms" className="pf-section pf-firms">
      <Wrap>
        <div className="pf-section-head pf-section-head--compact">
          <h2>For project-based professional services.</h2>
        </div>
        <div className="pf-firm-list">
          {firms.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
      </Wrap>
    </Track>

    <Track name="cta" className="pf-cta">
      <Wrap>
        <h2>We are looking for a small number of design partners.</h2>
        <div className="pf-cta-detail">
          <div className="pf-cta-copy">
            <p>For consulting and advisory firms ready to prove AllianceOne on one live workflow: one practice, one recurring engagement type, and success criteria agreed before we begin.</p>
          </div>
          <Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Discuss a design partnership</Btn>
        </div>
      </Wrap>
    </Track>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

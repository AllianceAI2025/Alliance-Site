import React, { useState } from "react";
import { useFonts, Btn, Wrap, Nav, Footer, Modal } from "./App.jsx";

const systems = [
  ["CRM", "Opportunity, client, commercials"],
  ["PSA / PM", "Tasks, owners, milestones, status"],
  ["Microsoft 365", "Documents, meetings, decisions"],
  ["ERP", "Time, billing, margin, actuals"],
];

const firms = [
  ["Management consulting", "Where the deliverable is judgment itself: which approach, why, and whether it worked. The reasoning behind every recommendation becomes reusable, instead of leaving with the partner who made it."],
  ["Advisory", "Deals, risk, restructuring. High-stakes, precedent-driven work where what you did last time, and how it turned out, is the most valuable thing in the room."],
  ["Accounting & tax", "Where engagement history, positions taken, and institutional knowledge shape quality, risk, and margin across hundreds of recurring engagements."],
];

const waysOfWorking = [
  ["Approach", "How the firm frames the problem, the questions it asks first, the evidence it trusts, and the precedent it brings forward."],
  ["Think", "The options considered, the tradeoffs made, the assumptions carried, and the reasoning behind the recommendation."],
  ["Deliver", "How scope, staffing, sequence, governance, decisions, changes, and outcomes fit together in practice."],
];

const assets = [
  ["Traceable", "Every commitment, change, and conclusion remains connected to its source, owner, approval, and outcome."],
  ["Repeatable", "Teams begin with the methods, delivery shapes, and lessons that proved relevant in comparable work."],
  ["Compounding", "Each completed engagement improves how the firm scopes, staffs, governs, and delivers the next one."],
];

const lifecycle = [
  ["Scope", "Turn fragmented pursuit context into a grounded scope and proposal."],
  ["Plan", "Translate the accepted commitment into workstreams, deliverables, staffing, and effort."],
  ["Materialize", "Write the approved plan into the firm's PSA or project system."],
  ["Execute", "Give every team member the context, evidence, methods, and guidance to deliver."],
  ["Reconcile", "Compare actual delivery with what was committed and preserve why it changed."],
  ["Learn", "Admit proven outcomes and lessons into the firm's body of precedent."],
];

const comparison = [
  ["Context", "Assembled for the current request", "Maintained across the engagement lifecycle"],
  ["Authority", "Can interpret records", "Knows which approved record governs"],
  ["Memory", "Retrieved from available material", "Resolved around clients, people, decisions, and outcomes"],
  ["Learning", "Improves the general capability", "Improves the firm's own way of working"],
];

const architecture = [
  ["Practice", "Methods, archetypes, capabilities, evidence health"],
  ["Learning", "Outcomes, variances, end states, calibration"],
  ["Engagement state", "Intent, commitments, plans, decisions"],
  ["Evidence", "Documents, conversations, actuals, attribution"],
  ["Identity", "Engagements, clients, people, systems"],
  ["Source systems", "CRM, PSA, Microsoft 365, ERP, HRIS"],
];

export default function PlatformPage() {
  const [modal, setModal] = useState(false);
  useFonts();
  const open = () => setModal(true);

  return <div className="site-shell platform-page"><Nav onCta={open} /><main>
    <section className="pf-hero">
      <div className="pf-hero-field" aria-hidden="true"><span /><span /><span /><span /></div>
      <Wrap>
        <div className="pf-hero-grid">
          <h1>One system for the entire engagement.</h1>
          <div className="pf-hero-copy">
            <p>From the first client signal through scope, planning, delivery, and close-out, AllianceOne keeps the firm's intent, decisions, work, and outcomes connected.</p>
            <strong>The system of record for professional-services engagements.</strong>
          </div>
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-gap">
      <Wrap>
        <div className="pf-section-head">
          <h2>Every system records part of the work.</h2>
          <p>The operating stack is rich in evidence and poor in continuity. Each system sees a different part of the engagement. None can tell the full story or establish which commitment governs when the records diverge.</p>
        </div>
        <div className="pf-system-map">
          <div className="pf-system-list">
            {systems.map(([name, body]) => <div className="pf-system-row" key={name}><strong>{name}</strong><span>{body}</span><i aria-hidden="true" /></div>)}
          </div>
          <div className="pf-record">
            <h3>Engagement state</h3>
            <p>A continuous, governed record of intent, commitments, decisions, delivery, and outcomes.</p>
            <div><span>Approved scope</span><span>Current plan</span><span>Decision history</span><span>Delivered outcome</span></div>
          </div>
        </div>
      </Wrap>
    </section>

    <section className="pf-principle">
      <Wrap>
        <h2>AllianceOne owns intent. The operating stack owns execution.</h2>
        <div className="pf-principle-grid">
          <div>
            <h3>Intent</h3>
            <p>The accepted scope, approved plan, staffing model, assumptions, decision gates, and the rationale behind them remain durable in AllianceOne.</p>
          </div>
          <div className="pf-principle-link" aria-hidden="true"><span /><i /><span /></div>
          <div>
            <h3>Execution</h3>
            <p>CRM, PSA, project, document, time, and billing systems remain authoritative for the activities and actuals they are built to manage.</p>
          </div>
        </div>
        <p className="pf-principle-result">The firm can see what happened against what was intended, without replacing the systems its teams already use.</p>
      </Wrap>
    </section>

    <section id="firms" className="pf-section pf-firms">
      <Wrap>
        <div className="pf-section-head pf-section-head--compact">
          <h2>For project-based professional services.</h2>
        </div>
        <div className="pf-firm-list">
          {firms.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-method">
      <Wrap>
        <div className="pf-section-head">
          <h2>How your firm works becomes part of the record.</h2>
          <p>AllianceOne captures more than final documents. It preserves how the firm approaches a problem, thinks through possible solutions, and turns judgment into delivery.</p>
        </div>
        <div className="pf-method-grid">
          {waysOfWorking.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <div className="pf-method-line" aria-hidden="true"><span>Problem</span><i /><span>Judgment</span><i /><span>Commitment</span><i /><span>Outcome</span></div>
      </Wrap>
    </section>

    <section className="pf-section pf-assets">
      <Wrap>
        <div className="pf-section-head">
          <h2>Expertise that behaves like an asset.</h2>
          <p>The work no longer disappears into folders, disconnected systems, or personal memory. The record remains usable by the next team facing a similar decision.</p>
        </div>
        <div className="pf-asset-grid">
          {assets.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-lifecycle">
      <Wrap>
        <div className="pf-section-head">
          <h2>One engagement state, from pursuit through close-out.</h2>
          <p>The record develops with the work. Each phase creates the context, commitments, and evidence required by the next.</p>
        </div>
        <div className="pf-lifecycle-list">
          {lifecycle.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <a className="pf-text-link" href="/how-it-works/#loop">See the engagement lifecycle <span aria-hidden="true">↗</span></a>
      </Wrap>
    </section>

    <section className="pf-section pf-model">
      <Wrap>
        <div className="pf-section-head">
          <h2>A powerful model is not an operating system.</h2>
          <p>Capable models provide reasoning. Retrieval provides material. AllianceOne provides the firm-specific state, authority, identity, and lifecycle governance that make both dependable in delivery.</p>
        </div>
        <div className="pf-comparison">
          <div className="pf-comparison-head"><span /><strong>General model</strong><strong>AllianceOne</strong></div>
          {comparison.map(([dimension, model, alliance]) => <div className="pf-comparison-row" key={dimension}><strong>{dimension}</strong><p>{model}</p><p>{alliance}</p></div>)}
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-architecture">
      <Wrap>
        <div className="pf-architecture-grid">
          <div className="pf-section-head pf-section-head--stacked">
            <h2>Built upward from evidence.</h2>
            <p>Source systems retain authority over the records they own. AllianceOne resolves identity across them, establishes engagement state, and admits learning into firm practice only when the evidence supports it.</p>
          </div>
          <div className="pf-architecture-stack">
            {architecture.map(([name, body]) => <div key={name}><strong>{name}</strong><span>{body}</span></div>)}
          </div>
        </div>
      </Wrap>
    </section>

    <section className="pf-moat">
      <Wrap>
        <div>
          <h2>Every engagement widens the advantage.</h2>
          <p>A competitor can license the same model. It cannot license your firm's history of decisions, delivery patterns, outcomes, and proven judgment. That advantage is private to the firm and grows with every completed engagement.</p>
        </div>
      </Wrap>
    </section>

    <section className="pf-cta">
      <Wrap>
        <div><h2>Build the engagement record around your firm.</h2></div>
        <div><p>We are working with a small number of professional-services firms to shape integrations, operating workflows, and production rollout.</p><Btn variant="dark" onClick={open}>Discuss a design partnership</Btn></div>
      </Wrap>
    </section>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

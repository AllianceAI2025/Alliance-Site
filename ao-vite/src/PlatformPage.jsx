import React, { useState } from "react";
import { useFonts, Btn, Logo, Wrap, Nav, Footer, Modal } from "./App.jsx";

const systems = [
  ["CRM", "Opportunity, client, commercials"],
  ["PSA / PM", "Tasks, owners, milestones, status"],
  ["Microsoft 365", "Documents, meetings, decisions"],
  ["ERP", "Time, billing, margin, actuals"],
];

const firms = [
  ["Management consulting", "These firms advise clients on strategy, operations, organization, growth, and performance. Similar problem types recur, but the recommended approach must still reflect each client's facts and constraints. AllianceOne helps engagement leaders use comparable work to shape the current approach, preserve the reasoning behind material choices, and understand whether the plan held during delivery. The economic pressure is concentrated in scoping, staffing, and margin, where decisions are often rebuilt from partner memory."],
  ["Specialist advisory", "These firms handle transactions, restructuring, risk, investigations, regulatory response, and other high-stakes matters. Time is constrained, information is incomplete, and prior positions or analogous matters can materially affect the response. AllianceOne makes precedent usable in the moment and preserves how the firm adapted it, which reduces dependence on the few people who remember the matter."],
  ["Technology and transformation consulting", "These firms lead system implementations, operating-model redesigns, process transformation, data migration, and adoption programs. Delivery is distributed across workstreams, vendors, client teams, and execution systems. AllianceOne maintains the connection between the commercial commitment, the approved engagement plan, the decisions made during delivery, and the work recorded across the stack."],
];

const waysOfWorking = [
  ["Approach", "How the firm frames the problem, the questions it asks first, the evidence it trusts, and the precedent it brings forward."],
  ["Think", "The options considered, the tradeoffs made, the assumptions carried, and the reasoning behind the recommendation."],
  ["Deliver", "How scope, staffing, sequence, governance, decisions, changes, and outcomes fit together in practice."],
];

const firmIP = [
  ["Methods and frameworks", "The questions the firm asks, the evidence it trusts, and the way it structures a problem."],
  ["Deliverable types and templates", "The proven shapes, required sections, source expectations, and review gates behind client work."],
  ["Prior work and precedent", "Comparable scopes, staffing patterns, decisions, changes, outcomes, and lessons from delivery."],
  ["Review and quality standards", "The criteria partners and engagement leaders use to determine whether work is ready to advance."],
];

const assets = [
  ["Traceable", "Every commitment, change, and conclusion remains connected to its source, owner, approval, and outcome."],
  ["Repeatable", "Teams begin with the methods, delivery shapes, and lessons that proved relevant in comparable work."],
  ["Compounding", "Each completed engagement improves how the firm scopes, staffs, governs, and delivers the next one."],
];

const lifecycle = [
  ["Scope", "Turn fragmented pursuit context into a grounded scope, price, and proposal."],
  ["Plan", "Translate the accepted commitment into workstreams, deliverables, staffing, and effort."],
  ["Materialize", "Write the approved plan into the firm's PSA or project system."],
  ["Execute", "Give every team member the context, evidence, methods, and guidance to deliver."],
  ["Reconcile", "Compare actual delivery with what was committed and preserve why it changed."],
  ["Learn", "Admit proven outcomes and lessons into the practice."],
];

const comparison = [
  ["Unit of work", "A conversation, request, or task", "The engagement, from opportunity through outcome"],
  ["Memory", "Retains or retrieves available context", "Maintains governed engagement state"],
  ["Access", "Searches records and calls connected tools", "Resolves authority, versions, owners, and approvals"],
  ["Generation", "Produces an answer, plan, or artifact", "Moves approved work through a governed workflow"],
  ["Action", "Writes to a connected application", "Materializes approved intent and retains the receipt"],
  ["Learning", "Carries forward available context", "Connects decisions and methods to delivery outcomes"],
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
    <section id="platform" className="pf-hero">
      <div className="pf-hero-field" aria-hidden="true"><span /><span /><span /><span /></div>
      <Wrap>
        <div className="pf-hero-grid">
          <div className="pf-hero-title">
            <div className="pf-product-kicker"><Logo light /></div>
            <h1>One system for the entire engagement.</h1>
          </div>
          <div className="pf-hero-copy">
            <p>From the first client signal through scope, planning, delivery, and close-out, AllianceOne keeps your firm's intent, decisions, work, and outcomes connected.</p>
            <strong>The engagement operating system for professional services.</strong>
          </div>
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-gap">
      <Wrap>
        <div className="pf-section-head">
          <h2>Every system records part of the work.</h2>
          <p>CRM, project tools, documents, and billing are rich in evidence and poor in continuity. Each system sees a different part of the engagement. None can tell the full story or establish which commitment governs when the records diverge.</p>
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

    <section className="pf-section pf-model">
      <Wrap>
        <div className="pf-section-head">
          <h2>A powerful model is not an operating system.</h2>
          <p>Frontier models can reason across large bodies of information, retain project context, search connected systems, and take action. Those capabilities are essential. They do not, by themselves, establish the authoritative state of an engagement.</p>
        </div>
        <div className="pf-comparison">
          <p className="pf-model-declaration">A model answers a request. AllianceOne maintains the engagement the request belongs to.</p>
          <div className="pf-comparison-head"><span /><strong>AI assistant</strong><strong>AllianceOne</strong></div>
          {comparison.map(([dimension, model, alliance]) => <div className="pf-comparison-row" key={dimension}><strong>{dimension}</strong><p>{model}</p><p>{alliance}</p></div>)}
        </div>
        <div className="pf-model-moat">
          <h3>Every engagement widens the advantage.</h3>
          <p>A competitor can license the same model. It cannot license the firm's history of decisions, delivery patterns, outcomes, and proven judgment. That advantage is private to the firm and grows with every completed engagement.</p>
        </div>
      </Wrap>
    </section>

    <section className="pf-principle">
      <Wrap>
        <h2>AllianceOne owns intent. Your existing tools own execution.</h2>
        <div className="pf-principle-grid">
          <div>
            <h3>Intent</h3>
            <p>AllianceOne maintains the accepted scope, approved plan, staffing and effort model, deliverable commitments, assumptions, decision gates, and the rationale for every approved change. That record remains intact from pursuit through close-out.</p>
          </div>
          <div className="pf-principle-link" aria-hidden="true"><span /><i /><span /></div>
          <div>
            <h3>Execution</h3>
            <p>CRM, PSA, project, document, time, and billing systems continue to manage opportunities, tasks, assignments, files, hours, invoices, and delivery status. AllianceOne writes approved intent into those systems and reads delivery evidence back.</p>
          </div>
        </div>
        <div className="pf-principle-result">
          <h3>What was promised and what was delivered stay connected.</h3>
          <p>Leaders can see the original commitment, every approved change, and how delivery compared with the plan. Teams keep working in the systems they already use while AllianceOne preserves the meaning across them.</p>
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-method">
      <Wrap>
        <div className="pf-section-head">
          <h2>How the firm works becomes part of the record.</h2>
          <p>AllianceOne captures more than final documents. It preserves how the firm approaches a problem, thinks through possible solutions, and turns judgment into delivery.</p>
        </div>
        <div className="pf-method-grid pf-grid--three">
          {waysOfWorking.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <p className="pf-method-note">The firm's intellectual property stays active in the work while teams are still making decisions, not dormant in a repository.</p>
        <div className="pf-ip-row">
          {firmIP.map(([name, body]) => <div key={name}><h4>{name}</h4><p>{body}</p></div>)}
        </div>
      </Wrap>
    </section>

    <section className="pf-section pf-assets">
      <Wrap>
        <div className="pf-section-head">
          <h2>The next engagement can start from the last one.</h2>
          <p>The record remains usable by the next team facing a similar decision. What the firm learned becomes practical guidance, with its source, context, and outcome still attached.</p>
        </div>
        <div className="pf-asset-grid pf-grid--three">
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

    <section className="pf-cta">
      <Wrap>
        <div><h2>Build the engagement record around your firm.</h2></div>
        <div><p>We are working with a small number of professional-services firms to shape integrations, operating workflows, and production rollout.</p><Btn variant="dark" onClick={open}>Discuss a design partnership</Btn></div>
      </Wrap>
    </section>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

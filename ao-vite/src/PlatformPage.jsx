import React, { useState } from "react";
import { useFonts, Btn, Logo, Wrap, Nav, Footer, Modal } from "./App.jsx";
import { capture, Track } from "./analytics";

const systems = [
  ["CRM", "Opportunity, client, commercials"],
  ["PSA / PM", "Tasks, owners, milestones, status"],
  ["Microsoft 365", "Documents, meetings, decisions"],
  ["ERP", "Time, billing, margin, actuals"],
];

const firms = [
  ["Management consulting", "Use comparable engagements to shape a specific approach, pressure-test scope and staffing, and retain the reasoning behind recommendations. Leaders can see where delivery followed the plan and where it did not."],
  ["Specialist advisory", "Bring relevant precedent into high-stakes work without stripping away its original facts, caveats, or ownership. Teams can adapt prior positions while preserving why the current matter required a different choice."],
  ["Technology and transformation consulting", "Keep commercial commitments, workstream decisions, dependencies, and delivery evidence connected across long-running programs, multiple teams, and execution systems."],
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
  ["Scope with evidence", "Comparable engagements give teams a grounded basis for shaping scope, staffing, effort, and price. Less work is rebuilt from memory, and senior review starts from something more specific than a blank page."],
  ["Deliver with control", "Approved commitments remain connected to assignments, milestones, decisions, hours, and billing. Leaders can see where delivery diverged, why it changed, and which patterns put margin or quality at risk."],
  ["Build proof into the proposition", "Methods and points of view remain connected to the situations in which they were used and the outcomes that followed. The firm develops a stronger basis for demonstrating specific expertise, reducing buyer risk, and defending value beyond hours."],
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
  ["Capability", "Researches, reasons, and generates", "Applies those capabilities to the firm’s governed record"],
  ["Unit of work", "A conversation, request, or task", "The engagement, from first signal through outcome"],
  ["Firm context", "Retrieves available information", "Connects people, commitments, decisions, and precedent"],
  ["Authority", "Interprets the records it receives", "Resolves which source, version, owner, and approval governs"],
  ["Action", "Produces or writes an artifact", "Moves approved intent into execution and retains the receipt"],
  ["Improvement", "Improves general model capability", "Tests the firm’s own methods against delivery evidence"],
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
    <Track name="hero" id="platform" className="pf-hero">
      <div className="pf-hero-field" aria-hidden="true"><span /><span /><span /><span /></div>
      <Wrap>
        <div className="pf-hero-grid">
          <div className="pf-hero-title">
            <div className="pf-product-kicker"><Logo light /></div>
            <h1>Make every engagement an advantage.</h1>
          </div>
          <div className="pf-hero-copy">
            <p>AllianceOne turns delivery history into the scope, staffing, workstreams, effort, and deliverables for new client work. It carries the approved plan into the systems your firm already uses, then connects actual delivery and outcomes back to the decisions that shaped it.</p>
            <strong>Make firm-specific judgment usable in live engagements.</strong>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="systems" className="pf-section pf-gap">
      <Wrap>
        <div className="pf-section-head">
          <h2>The evidence behind judgment is already there.</h2>
          <p>CRM, project tools, documents, conversations, and billing each hold part of the engagement. AllianceOne connects those records without replacing the systems that own them, so a final deliverable is not mistaken for the full story.</p>
        </div>
        <div className="pf-system-map">
          <div className="pf-system-list">
            {systems.map(([name, body]) => <div className="pf-system-row" key={name}><strong>{name}</strong><span>{body}</span><i aria-hidden="true" /></div>)}
          </div>
          <div className="pf-record">
            <h3>Connected engagement record</h3>
            <p>The context, commitments, decisions, delivery evidence, and outcomes that make prior work usable.</p>
            <div><span>Approved scope</span><span>Current plan</span><span>Decision history</span><span>Delivered outcome</span></div>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="model" className="pf-section pf-model">
      <Wrap>
        <div className="pf-section-head">
          <h2>The model is not the edge.</h2>
          <p>Frontier models from OpenAI and Anthropic can research, analyze, generate, and act. Every firm can access them. What they do not bring is your history of solving specific problems or the evidence required to know when prior experience should apply.</p>
        </div>
        <div className="pf-comparison">
          <p className="pf-model-declaration">General AI brings capability. AllianceOne brings your firm’s earned context.</p>
          <div className="pf-comparison-head"><span /><strong>AI assistant</strong><strong>AllianceOne</strong></div>
          {comparison.map(([dimension, model, alliance]) => <div className="pf-comparison-row" key={dimension}><strong>{dimension}</strong><p>{model}</p><p>{alliance}</p></div>)}
        </div>
        <div className="pf-model-moat">
          <h3>Your experience is the part competitors cannot license.</h3>
          <p>When decisions remain connected to their conditions and outcomes, each completed engagement adds evidence to the firm’s methods, points of view, and ability to deliver with confidence.</p>
        </div>
      </Wrap>
    </Track>

    <Track name="principle" className="pf-principle">
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
    </Track>

    <Track name="method" className="pf-section pf-method">
      <Wrap>
        <div className="pf-section-head">
          <h2>Preserve the chain that makes judgment credible.</h2>
          <p>A useful precedent shows more than what a prior team produced. It explains the situation they faced, why they chose an approach, and what the evidence later showed.</p>
        </div>
        <div className="pf-method-grid pf-grid--three">
          {waysOfWorking.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <p className="pf-method-note">The firm’s intellectual property stays active while teams are making decisions, not dormant in a repository or flattened into a generic answer.</p>
        <div className="pf-ip-row">
          {firmIP.map(([name, body]) => <div key={name}><h4>{name}</h4><p>{body}</p></div>)}
        </div>
      </Wrap>
    </Track>

    <Track name="assets" className="pf-section pf-assets">
      <Wrap>
        <div className="pf-section-head">
          <h2>Better scoping. More controlled delivery. Stronger proof.</h2>
          <p>The economic value appears where engagement performance is shaped: how work is scoped and priced, how delivery is governed, and how the firm demonstrates differentiated value to buyers.</p>
        </div>
        <div className="pf-asset-grid pf-grid--three">
          {assets.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
      </Wrap>
    </Track>

    <Track name="lifecycle" className="pf-section pf-lifecycle">
      <Wrap>
        <div className="pf-section-head">
          <h2>The record develops with the work.</h2>
          <p>Each phase contributes something distinct: context, commitment, execution evidence, or an outcome the firm can responsibly learn from.</p>
        </div>
        <div className="pf-lifecycle-list">
          {lifecycle.map(([name, body]) => <article key={name}><h3>{name}</h3><p>{body}</p></article>)}
        </div>
        <a className="pf-text-link" href="/how-it-works/#loop">See the engagement lifecycle <span aria-hidden="true">↗</span></a>
      </Wrap>
    </Track>

    <Track name="architecture" className="pf-section pf-architecture">
      <Wrap>
        <div className="pf-architecture-grid">
          <div className="pf-section-head pf-section-head--stacked">
          <h2>Evidence before inference.</h2>
          <p>Source systems retain authority over the records they own. AllianceOne resolves identity and engagement state across them, and only carries a lesson into firm practice when the supporting evidence is known.</p>
          </div>
          <div className="pf-architecture-stack">
            {architecture.map(([name, body]) => <div key={name}><strong>{name}</strong><span>{body}</span></div>)}
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
        <div><h2>We are looking for a small number of pilot partners.</h2></div>
        <div><div className="pf-cta-copy"><p>The pilot is for consulting and advisory firms ready to test AllianceOne against one defined, live operating workflow. We will configure the product around your methods, connect the relevant systems, and agree on success criteria before the pilot begins.</p><p>Start with one engagement type or workflow. Prove where AllianceOne improves scoping, delivery control, or the firm’s ability to reuse what it has learned. Then decide together whether to expand.</p></div><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Discuss a pilot</Btn></div>
      </Wrap>
    </Track>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

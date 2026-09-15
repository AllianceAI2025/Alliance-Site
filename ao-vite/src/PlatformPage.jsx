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
  ["Context", "The client conditions, constraints, starting assumptions, and comparable situations that made a choice appropriate."],
  ["Reasoning", "The options considered, evidence used, tradeoffs made, and rationale behind the team’s recommendation."],
  ["Outcome", "What was delivered, what changed during the work, and what the evidence supports carrying into future engagements."],
];

const firmIP = [
  ["Methods and frameworks", "The questions the firm asks, the evidence it trusts, and the way it structures a problem."],
  ["Deliverable types and templates", "The proven shapes, required sections, source expectations, and review gates behind client work."],
  ["Prior work and precedent", "Comparable scopes, staffing patterns, decisions, changes, outcomes, and lessons from delivery."],
  ["Review and quality standards", "The criteria partners and engagement leaders use to determine whether work is ready to advance."],
];

const assets = [
  ["Relevant", "Precedent is matched by the problem conditions, decision dynamics, delivery shape, and outcome—not just similar words."],
  ["Traceable", "Every material commitment and conclusion remains connected to its source, owner, approval, and supporting evidence."],
  ["Repeatable", "Teams can apply proven methods and delivery patterns without treating them as universal answers."],
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
            <h1>Turn every engagement into an advantage the next team can use.</h1>
          </div>
          <div className="pf-hero-copy">
            <p>AllianceOne connects the context behind a decision, the approach your team chose, and what happened next. Your firm’s accumulated experience becomes practical guidance for new work, with its evidence still attached.</p>
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
          <p>Capable models can research, analyze, generate, and act. Every firm can access them. What they do not bring is your history of solving specific problems—or the evidence required to know when prior experience should apply.</p>
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
        <h2>People exercise judgment. AllianceOne preserves the evidence behind it.</h2>
        <div className="pf-principle-grid">
          <div>
            <h3>Professional judgment</h3>
            <p>Practitioners determine what precedent applies, choose the approach, approve the plan, make material tradeoffs, and decide what the firm should carry forward.</p>
          </div>
          <div className="pf-principle-link" aria-hidden="true"><span /><i /><span /></div>
          <div>
            <h3>Operating record</h3>
            <p>AllianceOne keeps each approved choice connected to its context and rationale, writes the resulting plan into execution systems, and reads delivery evidence back against it.</p>
          </div>
        </div>
        <div className="pf-principle-result">
          <h3>The system makes judgment visible. It does not make the judgment.</h3>
          <p>Teams remain accountable for the work. AllianceOne gives them a traceable basis for deciding, acting, reviewing, and learning together.</p>
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
        <p className="pf-method-note">The firm’s intellectual property stays active while teams are making decisions—not dormant in a repository or flattened into a generic answer.</p>
        <div className="pf-ip-row">
          {firmIP.map(([name, body]) => <div key={name}><h4>{name}</h4><p>{body}</p></div>)}
        </div>
      </Wrap>
    </Track>

    <Track name="assets" className="pf-section pf-assets">
      <Wrap>
        <div className="pf-section-head">
          <h2>Give the next team a better starting point.</h2>
          <p>AllianceOne brings forward the prior work that fits the current situation and shows the basis for using it. Teams inherit an informed starting point while remaining free to reach a different conclusion.</p>
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
        <div><h2>Make your firm’s experience easier to apply—and harder to imitate.</h2></div>
        <div><p>We are working with a small number of professional-services firms to shape AllianceOne around their methods, operating workflows, and existing systems.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Discuss a design partnership</Btn></div>
      </Wrap>
    </Track>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

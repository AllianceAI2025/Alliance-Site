import React, { useState } from "react";
import { useFonts, Head, Btn, Logo, Wrap, Nav, Footer, Modal } from "./App.jsx";
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
  ["Scope", "Reads every version of a proposal", "Knows which version became the contracted scope, and what changed after"],
  ["Structure", "Summarizes a statement of work", "Represents scope as structured work: workstreams, deliverables, effort, and economics"],
  ["Delivery", "Queries CRM, PSA, and finance data", "Reconciles what was sold, planned, staffed, billed, and delivered"],
  ["Conflicts", "Reports what each source says", "Resolves which source governs and treats the discrepancy as evidence"],
  ["Method", "Drafts a plan from general best practice", "Builds from how your firm actually scopes, staffs, and delivers this kind of work"],
  ["Action", "Uses tools when asked", "Knows which actions each engagement stage permits and who must approve them"],
  ["Evidence", "Cites the documents it read", "Keeps lineage behind every material assertion, across versions and years"],
  ["Learning", "Improves as general models improve", "Tests the firm’s methods against delivery outcomes, on top of model gains"],
];

const answers = [
  ["Why not build this on our enterprise AI platform?", "Enterprise AI platforms provide strong building blocks: connectors, agents, memory, and governance. They do not arrive knowing what a professional-services engagement is, how scope becomes staffed work, or which of several conflicting records reflects what was actually delivered. AllianceOne is that professional-services layer, built so the reasoning underneath can come from leading frontier models."],
  ["Which models does AllianceOne use?", "AllianceOne uses leading frontier models for reasoning, language, and tool use, and it is designed so those models can change as the field moves. Your firm’s knowledge lives in its own governed record, not in any model’s weights, so changing models does not mean starting over."],
  ["What happens as the models get better?", "AllianceOne gets better with them. Stronger models reason more effectively over the same record of how your firm works. The model supplies the intelligence; AllianceOne supplies what is true about your firm, what matters, what is permitted, and what happened last time."],
];

const architecture = [
  ["Frontier models", "Reasoning, language, tool use; interchangeable as the field moves"],
  ["Practice", "Methods, archetypes, capabilities, evidence health"],
  ["Learning", "Outcomes, variances, end states, calibration"],
  ["Engagement state", "Intent, commitments, plans, decisions"],
  ["Evidence", "Documents, conversations, actuals, attribution"],
  ["Identity", "The same client, person, and engagement, recognized across every system"],
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
            <strong>Frontier models know how to reason. AllianceOne knows how your firm works.</strong>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="systems" className="pf-section pf-gap">
      <Wrap>
        <div className="pf-section-head">
          <h2>The evidence behind judgment is already there.</h2>
          <p>CRM, project tools, documents, conversations, and billing each hold part of the engagement. AllianceOne connects those records without replacing the systems that own them, so a final deliverable is not mistaken for the full story, and no one has to rediscover the engagement every time they ask about it.</p>
        </div>
        <div className="pf-system-map">
          <div className="pf-system-list">
            {systems.map(([name, body]) => <div className="pf-system-row" key={name}><strong>{name}</strong><span>{body}</span><i aria-hidden="true" /></div>)}
          </div>
          <div className="pf-record">
            <h3>Connected engagement record</h3>
            <p>A durable, structured account of each engagement, with every material fact tied to its source, version, and evidence.</p>
            <div><span>Approved scope</span><span>Current plan</span><span>Decision history</span><span>Delivered outcome</span></div>
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="model" className="pf-section pf-model">
      <Wrap>
        <div className="pf-section-head">
          <h2>The model is not the edge.</h2>
          <p>Frontier models from OpenAI, Anthropic, and Google can reason, research, use tools, and act across enterprise systems. Every firm can access them, and AllianceOne uses them too. What they do not maintain by default is a governed account of how your firm works: how it approaches a problem, what it committed, what it actually delivered, and what the evidence later showed.</p>
        </div>
        <div className="pf-comparison">
          <p className="pf-model-declaration">General-purpose AI brings the intelligence. AllianceOne brings how your firm works.</p>
          <div className="pf-comparison-head"><span /><strong>General-purpose AI</strong><strong>AllianceOne</strong></div>
          {comparison.map(([dimension, model, alliance]) => <div className="pf-comparison-row" key={dimension}><strong>{dimension}</strong><p data-label="General-purpose AI">{model}</p><p data-label="AllianceOne">{alliance}</p></div>)}
        </div>
        <div className="pf-model-moat">
          <h3>Better models make AllianceOne better. Your experience is the part competitors cannot license.</h3>
          <p>Every improvement in frontier models improves how AllianceOne reasons over your firm’s record. The record itself stays with your firm: when decisions remain connected to their conditions and outcomes, each completed engagement adds evidence to the firm’s methods, points of view, and ability to deliver with confidence.</p>
        </div>
      </Wrap>
    </Track>

    <Track name="principle" className="pf-principle">
      <Wrap>
        <h2>AllianceOne is the system of record for how your firm works.</h2>
        <div className="pf-principle-grid">
          <div>
            <h3>How the firm works</h3>
            <p>AllianceOne maintains how your firm thinks, sells, scopes, and delivers: its methods, standards, and precedent; the intent behind every engagement, from accepted scope and approved plan to staffing, commitments, and the rationale for each change; and what the firm has learned from the outcomes. That record remains intact from pursuit through close-out, and from one engagement to the next.</p>
          </div>
          <div className="pf-principle-link" aria-hidden="true"><span /><i /><span /></div>
          <div>
            <h3>The facts they record</h3>
            <p>CRM, PSA, project, document, time, and billing systems remain authoritative for the facts they own: opportunities, tasks, assignments, files, hours, invoices, and delivery status. AllianceOne writes approved intent into those systems and reads delivery evidence back.</p>
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
          <p>Frontier models provide the reasoning. AllianceOne provides the institutional layer they reason over. Source systems retain authority over the facts they own; AllianceOne resolves identity and engagement state across them, and only carries a lesson into firm practice when the supporting evidence is known.</p>
          </div>
          <div className="pf-architecture-stack">
            {architecture.map(([name, body]) => <div key={name} className={name === "Practice" ? "is-core" : name === "Frontier models" ? "is-model" : undefined}><strong>{name}</strong><span>{body}</span></div>)}
          </div>
        </div>
      </Wrap>
    </Track>

    <Track name="questions" className="section straight-section">
      <Wrap>
        <div className="straight-grid">
          <div><Head light size="quiet">Questions about AI you should ask us.</Head></div>
          <div className="straight-list">{answers.map(([q, a]) => <article className="straight-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
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
        <h2>We are looking for a small number of pilot partners.</h2>
        <div className="pf-cta-detail">
          <div className="pf-cta-copy">
            <p>The pilot is for consulting and advisory firms ready to test AllianceOne against one defined, live operating workflow. We will configure the product around your methods, connect the relevant systems, and agree on success criteria before the pilot begins.</p>
            <p>Prove where AllianceOne improves scoping, delivery control, or the firm’s ability to reuse what it has learned. Then decide together whether to expand.</p>
          </div>
          <Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Discuss a pilot</Btn>
        </div>
      </Wrap>
    </Track>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

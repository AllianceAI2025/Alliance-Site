import React, { useState } from "react";
import { useFonts, Head, Btn, Wrap, Section, Nav, Footer, Modal } from "./App.jsx";

const details = [
  { title: "Plan from precedent", body: "A pursuit is compared with the firm’s completed work across problem, delivery shape, deal context, decision dynamics, and economics. AllianceOne turns that evidence into a working scope, team, roadmap, and commercial model.", points: ["Workstreams and deliverables", "Staffing shape and role requirements", "Effort, duration, and commercial assumptions", "Risks, dependencies, and decision points"] },
  { title: "Establish intent", body: "The accepted proposal becomes the commitment baseline. The roadmap preserves what should happen, in what sequence, with which people, under which assumptions, and why the firm chose that approach.", points: ["Original commitment remains immutable", "Plan revisions form an audit trail", "Material changes require confirmation", "The precedent behind the estimate remains attached"] },
  { title: "Operate across the stack", body: "AllianceOne carries the approved plan into the systems the firm already uses through writeback or guided entry. Those systems remain authoritative for execution while AllianceOne retains the intent they are executing.", points: ["CRM commercial context", "PM tasks, owners, and status", "Documents, conversations, and decisions", "Billing, effort, and financial actuals"] },
  { title: "Reconcile delivery", body: "Actual work is read against both the commitment and the current plan. Scope changes, schedule movement, effort variance, and delivery decisions remain connected to their source, approval, and rationale.", points: ["Committed versus planned versus actual", "Append-only rebaselines", "Decision and conversation attribution", "Delivery drift and emerging risk"] },
  { title: "Update the practice", body: "Close-out turns the engagement into usable precedent. Methods, archetypes, staffing patterns, and delivery assumptions change only when the delivered outcome supports the change.", points: ["Methods validated, contradicted, or refined", "Outcome-aware precedent matching", "A living model of how the firm delivers", "Evidence health and known gaps"] },
];

const limits = [
  ["Conversation is not state", "A transcript can preserve what was said. It does not establish the approved scope, the governing assumption, the current plan, or the reason a decision changed."],
  ["Retrieval is not authority", "Search can find a proposal, a project plan, and an invoice. It cannot determine which commitment governs when those records disagree or when the engagement has been rebaselined."],
  ["A model is not firm memory", "A general model has no durable, permissioned record of the firm’s engagements, people, decisions, methods, and outcomes. Without that structure, every new interaction must reconstruct the firm from fragments."],
];

const modelLimits = [
  ["Context is assembled for the moment", "The model reasons over the prompt and retrieved material available to it. It does not independently maintain the evolving state of an engagement across months, systems, and teams."],
  ["The model cannot appoint a canonical record", "It can summarize conflicting evidence, but it should not decide which scope was approved, which plan governs delivery, or which outcome should change firm practice without an explicit operating model and human authority."],
  ["The model does not observe the whole lifecycle", "CRM, project delivery, documents, time, billing, and conversations each expose a different part of the engagement. The value appears only when those records are resolved around one engagement and one commitment."],
];

const firms = [
  ["Management consulting", "Where the deliverable is judgment itself: which approach, why, and whether it worked. The reasoning behind every recommendation becomes reusable, instead of leaving with the partner who made it."],
  ["Advisory", "Deals, risk, restructuring. High-stakes, precedent-driven work where what you did last time, and how it turned out, is the most valuable thing in the room."],
  ["Accounting & tax", "Where engagement history, positions taken, and institutional knowledge shape quality, risk, and margin across hundreds of recurring engagements."],
];

function Architecture() {
  const layers = [["Practice", "Methods, archetypes, capabilities, evidence health"], ["Learning", "Outcomes, variances, endgames, calibration"], ["Engagement state", "Intent, commitment, execution, decisions"], ["Evidence", "Documents, conversations, actuals, attribution"], ["Identity", "Engagements, people, clients across systems"], ["Source systems", "CRM, PM, M365, billing, HRIS"]];
  return <Section className="architecture-section"><Wrap><div className="architecture-grid"><div className="architecture-copy"><Head light size="quiet">The model is built upward from evidence.</Head><p>Source systems retain authority over the records they own. AllianceOne resolves identity across them, assembles engagement state, and distills practice knowledge without turning inference into fact.</p></div><div className="architecture-rail">{layers.map(([name, body]) => <div key={name}><strong>{name}</strong><p>{body}</p></div>)}</div></div></Wrap></Section>;
}

export default function PlatformPage() {
  const [modal, setModal] = useState(false); useFonts(); const open = () => setModal(true);
  return <div className="site-shell"><Nav onCta={open} /><main>
    <section className="inner-hero platform-hero"><Wrap><div className="inner-hero-grid"><div><h1>The missing layer is engagement state.</h1></div><p>Professional-services firms have systems for sales, projects, documents, time, and billing. None of them preserve the complete intent of the engagement or connect that intent to what was ultimately delivered.</p></div></Wrap></section>
    <Section className="platform-gap"><Wrap><div className="platform-thesis"><h2>Your firm has the data.</h2><p>What it does not have is a continuous, governed record of the engagement. Today’s operating stack captures activity in separate systems. AI can search those systems and summarize what it finds, but the engagement itself remains implicit: scattered across records, conversations, approvals, and the judgment of the people involved.</p></div><div className="stateless-grid">{limits.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><div className="platform-answer"><Head size="display">AllianceOne owns intent. The operating stack owns execution.</Head><p>AllianceOne creates the durable engagement record that sits between the firm’s judgment and its systems. It preserves what was understood, proposed, approved, planned, changed, delivered, and learned. That state remains available to the people and models working on the next engagement.</p></div></Wrap></Section>
    <Section className="model-limit-section"><Wrap><div className="model-limit-intro"><h2>A powerful model is not an operating system.</h2><p>The large AI labs provide increasingly capable reasoning engines. They do not provide the firm-specific state, authority, identity resolution, and lifecycle governance required to make those engines reliable in professional-services delivery. That layer has to be built around the model.</p></div><div className="model-limit-list">{modelLimits.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></Wrap></Section>
    <Section className="platform-detail"><Wrap>{details.map((d) => <article className="detail-row" key={d.title}><h3>{d.title}</h3><div className="detail-row-body"><p>{d.body}</p><div className="detail-points">{d.points.map((p) => <div key={p}><strong>{p}</strong></div>)}</div></div></article>)}</Wrap></Section>
    <Architecture />
    <Section id="firms" className="firms-section firms-section--platform"><Wrap><div className="firms-intro"><h2>For project-based professional services.</h2></div><div className="firms-list firms-list--plain">{firms.map(([name, body]) => <div key={name}><h3>{name}</h3><p>{body}</p></div>)}</div></Wrap></Section>
    <section className="partner-section"><Wrap><div><h2>Build the engagement loop around your firm.</h2></div><div><p>We are partnering with a small number of professional-services firms to shape integrations, operating workflows, and production rollout.</p><Btn variant="dark" onClick={open}>Discuss a design partnership</Btn></div></Wrap></section>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

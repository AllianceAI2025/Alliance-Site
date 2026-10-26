import React, { useId, useLayoutEffect, useState } from "react";
import { Footer, LogoMark, Nav, useFonts } from "./Site.jsx";
import { Track, capture } from "./analytics";
import { firmKnowledge, practiceServices, systemSources } from "./content/siteContent.js";
import { readbackPlan } from "./demo/engagementPlan.js";
import "./studio.css";

export function PageShell({ page, dark = false, children }) {
  useFonts();
  useLayoutEffect(() => {
    const aliases = { "scope-demo": "demo", "how-it-works": "workflow", loop: "workflow", "phase-execute": "phase-deliver", "phase-materialize": "execution", "phase-reconcile": "delivery-signals", "phase-learn": "experience" };
    const hash = window.location.hash.slice(1);
    document.getElementById(aliases[hash] || hash)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  const inquire = () => window.location.assign("/design-partners/");
  return <div className={`studio-page studio-page--${page}`}><Nav dark={dark} onCta={inquire} /><main id="main-content">{children}</main><Footer onCta={inquire} /></div>;
}

export function PartnerInvitation() {
  return <Track name="design_partners" className="studio-partner"><div className="studio-container studio-partner-inner"><h2>We are looking for a small{" "}<br />number of design partners.</h2><p>We’re inviting consulting and advisory firms to get early access, work directly with our team, and have a say in how AllianceOne develops.</p><a className="studio-button studio-button--green" href="/design-partners/" onClick={() => capture("cta_clicked", { location: "page_cta" })}>Discuss a design partnership <span aria-hidden="true">↗</span></a></div></Track>;
}

export function CompanyOverview({ detailed = false }) {
  return <Track name="company" id="company" className={`studio-company-preview${detailed ? " studio-company-preview--detailed" : ""}`}><div className="studio-container studio-company-grid"><div>{!detailed && <a className="studio-asg" href="/company/" aria-label="Alliance Systems Group"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance<small>Systems Group</small></span></a>}<h2>We make the product{" "}<br />fit the practice.</h2></div><div><p className="studio-body">{detailed ? "AllianceOne becomes useful when it reflects how your firm sells, decides, delivers and reviews work. Our services connect the technology, operating model and adoption required for live client engagements." : "Alliance Systems Group builds software and services for consulting and advisory firms. We connect the technology, operating model and adoption required to make firm knowledge useful in live client work."}</p>{detailed && <div className="studio-service-list">{practiceServices.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>}</div></div></Track>;
}

export function KnowledgeExplorer() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const item = firmKnowledge[selected];
  const keyboard = (event) => {
    const keys = { ArrowDown: (selected + 1) % firmKnowledge.length, ArrowUp: (selected + firmKnowledge.length - 1) % firmKnowledge.length, Home: 0, End: firmKnowledge.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    setSelected(keys[event.key]);
    document.getElementById(`${id}-tab-${keys[event.key]}`)?.focus();
  };
  return <div className="knowledge-explorer"><div className="knowledge-menu" role="tablist" aria-label="Explore firm knowledge" aria-orientation="vertical" onKeyDown={keyboard}>{firmKnowledge.map((entry, index) => <button key={entry.id} id={`${id}-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}><strong>{entry.title}</strong><span>{entry.short}</span><i aria-hidden="true">↗</i></button>)}</div><div id={`${id}-panel`} className="knowledge-panel" role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}><p className="knowledge-description">{item.body}</p><article className="practice-paper"><div className="practice-paper-top"><LogoMark size={27} /><span>{item.exampleType}</span></div><h3>{item.exampleTitle}</h3><p>{item.example}</p><div className="practice-paper-author">{item.detail}</div></article><p className="knowledge-note">{item.note}</p></div></div>;
}

export function PrecedentRecord() {
  return <article className="precedent-record"><div className="visual-document-top"><LogoMark size={27} /><span>Firm delivery experience</span></div><h3>Harbor Grain</h3><p className="visual-subtitle">Ownership and escalation diagnostic</p><div className="precedent-authors"><div><span className="person-initials">AR</span><div><strong>Avery Ross</strong><small>Evidence preparation</small></div></div><div><span className="person-initials">SP</span><div><strong>Sofia Patel</strong><small>Engagement review</small></div></div></div><dl className="precedent-record-details"><div><dt>What review established</dt><dd>Observed decision owners and proposed future owners need separate fields. Material claims need a source and date.</dd></div><div><dt>What changed</dt><dd>The revised evidence register retained conflicting accounts and the questions requiring a sponsor decision.</dd></div><div className="precedent-carry-forward"><dt>What Northstar carries forward</dt><dd>Establish ownership evidence and its limits before beginning the design.</dd></div></dl><p className="visual-footnote">Illustrated from the Northstar demonstration. Reuse follows source permissions and explicit sharing.</p></article>;
}

export function EngagementRecordVisual() {
  return <figure className="engagement-record-visual"><div className="visual-document-top"><LogoMark size={29} /><span>Northstar Foods · Engagement record</span></div><h3>One commitment.{" "}<br />A clear account of change.</h3><ol className="record-version-list"><li><span className="record-version-dot" /><div><strong>Accepted proposal</strong><p>Client objectives, scope boundaries and agreed commercial terms.</p><small>Proposal v5 · Client acceptance</small></div></li><li><span className="record-version-dot" /><div><strong>Approved engagement plan</strong><p>Workstreams, resources, effort, dependencies, dates and review gates.</p><small>Plan v1 · Engagement-manager approval</small></div></li><li><span className="record-version-dot" /><div><strong>Delivery and authorized changes</strong><p>The operating record, supporting conversations and the reasoning behind each approved revision.</p><small>Original baseline retained</small></div></li></ol><figcaption>Proposed, approved, changed and delivered remain distinct.</figcaption></figure>;
}

export function ConnectionVisual() {
  return <figure className="connection-visual"><div className="connection-origin"><LogoMark size={33} /><strong>AllianceOne</strong><p>Accepted scope · Approved plan · Decision history</p></div><div className="connection-directions"><div><span aria-hidden="true">↓</span><p>Write the{" "}<br /><strong>approved plan</strong></p></div><div><span aria-hidden="true">↑</span><p>Read back{" "}<br /><strong>delivery evidence</strong></p></div></div><div className="connection-system"><img src="/brand/systems/project-operations.svg" alt="" /><div><strong>PSA / project management</strong><p>Projects, work breakdown, assignments,{" "}<br />milestones, review gates and time</p></div></div><figcaption>The Northstar demonstration uses Project Operations. Production connections are scoped and validated with each firm.</figcaption></figure>;
}

export function PlanScheduleVisual() {
  return <figure className="plan-schedule-visual"><div className="visual-document-top"><LogoMark size={28} /><span>Northstar Foods · Plan v1</span></div><h3>Engagement plan</h3><p className="visual-subtitle">14 weeks · 6 resources · 1,840 hours</p><div className="mini-schedule-axis"><strong>Resources</strong><div><span>Week 1</span><span>Week 7</span><span>Week 14</span></div></div><div className="mini-schedule-people">{readbackPlan.resources.map((person) => <div className="mini-schedule-person" key={person.id}><div><strong>{person.name}</strong><small>{person.role.split(" · ")[0]}</small></div><div className="mini-schedule-track"><span style={{ gridColumn: `${person.start} / ${person.end + 1}` }}>{person.capacity}%</span></div></div>)}</div><div className="mini-schedule-deliverables"><strong>14 deliverables</strong><span>4 workstreams · 4 review gates</span></div><figcaption>The reviewed team becomes assignments in the approved plan. Availability is checked during pursuit, before the proposal is submitted.</figcaption></figure>;
}

export function AssessmentReviewVisual() {
  return <figure className="assessment-review-visual"><article className="assessment-paper"><div className="assessment-paper-top"><img src="/brand/systems/word.svg" alt="" /><span>Northstar Foods</span></div><h3>Data Readiness{" "}<br />Assessment</h3><p className="preview-assessment-byline">Prepared by Avery Ross{" "}<br />Reviewed by Sofia Patel</p><h4>Evidence and design readiness</h4><p>Observed decision owners remain separate from proposed future owners. Missing regional evidence limits the conclusions that can support design.</p><h4>Implications for the diagnostic</h4><p>Resolve the source dates, ownership gaps and contradictory accounts before a whole-client readiness conclusion is accepted.</p><div className="assessment-paper-footer"><span>Northstar engagement record</span><span>Revision 2</span></div></article><aside className="assessment-review-note"><span className="person-initials">SP</span><div><strong>Sofia Patel · Review</strong><p>Explain what each evidence gap prevents the team from concluding.</p><small>Addressed in the revised conclusion</small></div></aside><figcaption>The draft, review feedback, revision and approval stay linked to Avery's assignment.</figcaption></figure>;
}

export function SourceOwnership() {
  return <div className="source-ownership" role="table" aria-label="System ownership and engagement context"><div className="source-ownership-head" role="row"><span role="columnheader">Source system</span><span role="columnheader">What it continues to own</span><span role="columnheader">Its part in the engagement record</span></div>{systemSources.map((system) => <div className="source-ownership-row" key={system.name} role="row"><strong role="rowheader">{system.name}</strong><p role="cell" data-label="System records">{system.owns}</p><p role="cell" data-label="Engagement context">{system.contributes}</p></div>)}</div>;
}

const signals = [
  { label: "Time and effort", title: "Data preparation is taking more effort than planned.", source: "PSA time entries and the approved effort model", context: "Compare the current work with its planned effort, readiness assumptions and outstanding client evidence.", decision: "The manager reviews the cause and decides whether to change staffing, sequence or scope." },
  { label: "Project changes", title: "An assignment change affects a delivery dependency.", source: "Project assignments, milestones and the approved plan", context: "Bring the specialist's role, affected deliverables and dependent review dates into the same account.", decision: "The manager confirms cover and approves any resulting change before updating the plan." },
  { label: "Client communications", title: "A client request changes what the team needs to establish.", source: "Current correspondence and the accepted scope", context: "Identify which requirement changed, what the original commitment covered and which work may be affected.", decision: "The manager works through the implications, records the conversation and authorizes the response." },
];

export function DeliverySignals() {
  const [selected, setSelected] = useState(0);
  const item = signals[selected];
  return <div className="delivery-signal-example"><div className="signal-selector" aria-label="Delivery signal examples">{signals.map((signal, index) => <button key={signal.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{signal.label}</button>)}</div><article className="signal-message"><div className="visual-document-top"><LogoMark size={25} /><span>AllianceOne · Engagement manager</span></div><h3>{item.title}</h3><p className="signal-source">{item.source}</p><dl><div><dt>Context to examine</dt><dd>{item.context}</dd></div><div><dt>The decision stays with the manager</dt><dd>{item.decision}</dd></div></dl><p className="visual-footnote">Illustrative workflow · A signal prompts review of the evidence and commitment.</p></article></div>;
}

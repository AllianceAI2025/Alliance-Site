import React, { useId, useLayoutEffect, useState } from "react";
import { Footer, LogoMark, Nav, useFonts } from "./Site.jsx";
import { Track, capture } from "./analytics";
import { firmKnowledge, practiceServices, systemSources } from "./content/siteContent.js";
import "./studio.css";

export function PageShell({ page, dark = false, children }) {
  useFonts();
  useLayoutEffect(() => {
    const aliases = { "scope-demo": "demo", "how-it-works": "workflow", loop: "workflow", "phase-execute": "phase-deliver", "phase-materialize": "execution", "phase-reconcile": "delivery-signals", "phase-learn": "experience" };
    const hash = window.location.hash.slice(1);
    const previousHomeDemo = page === "home" && ["plan", "plan-demo"].includes(hash);
    const target = previousHomeDemo ? "demo" : aliases[hash] || hash;
    if (previousHomeDemo) window.history.replaceState(window.history.state, "", "#demo");
    document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  const inquire = () => window.location.assign("/design-partners/");
  return <div className={`studio-page studio-page--${page}`}><Nav dark={dark} onCta={inquire} /><main id="main-content">{children}</main><Footer onCta={inquire} /></div>;
}

export function PartnerInvitation() {
  return <Track name="design_partners" className="studio-partner"><div className="studio-container studio-partner-inner"><h2>We are looking for a small{" "}<br />number of design partners.</h2><p>We’re inviting law, consulting and advisory firms to get early access, work directly with our team, and have a say in how AllianceOne develops.</p><a className="studio-button studio-button--green" href="/design-partners/" onClick={() => capture("cta_clicked", { location: "page_cta" })}>Discuss a design partnership <span aria-hidden="true">↗</span></a></div></Track>;
}

export function CompanyOverview({ detailed = false }) {
  return <Track name="company" id="company" className={`studio-company-preview${detailed ? " studio-company-preview--detailed" : ""}`}><div className="studio-container studio-company-grid"><div>{!detailed && <a className="studio-asg" href="/company/" aria-label="Alliance Systems Group"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance<small>Systems Group</small></span></a>}<h2>We make the product{" "}<br />fit the practice.</h2></div><div><p className="studio-body">{detailed ? "AllianceOne becomes useful when it reflects how your firm assesses, decides, prepares and reviews work. Our services connect practice knowledge, technology and adoption in current client work." : "Alliance Systems Group builds software and services for law, consulting and advisory firms. We connect the technology, operating model and adoption required to make firm knowledge useful in live client work."}</p>{detailed && <div className="studio-service-list">{practiceServices.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>}</div></div></Track>;
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
  return <div className="knowledge-explorer"><div className="knowledge-menu" role="tablist" aria-label="Explore firm knowledge" aria-orientation="vertical" onKeyDown={keyboard}>{firmKnowledge.map((entry, index) => <button key={entry.id} id={`${id}-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}><strong>{entry.title}</strong><span>{entry.short}</span><i aria-hidden="true">↗</i></button>)}</div><div id={`${id}-panel`} className="knowledge-panel" role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}><p className="knowledge-description">{item.body}</p><article className="practice-paper"><div className="practice-paper-top"><LogoMark size={27} /><span>{item.exampleType}</span></div><h3>{item.exampleTitle}</h3><p>{item.example}</p><div className="practice-paper-author">{item.detail}</div><footer className="knowledge-note">{item.note}</footer></article></div></div>;
}

export function EngagementRecordVisual() {
  return <figure className="engagement-record-visual"><div className="visual-document-top"><LogoMark size={29} /><span>Northstar Foods · Matter record</span></div><h3>A clear account<br />of how we got here.</h3><ol className="record-version-list"><li><span className="record-version-dot" /><div><strong>Instructions and assignment</strong><p>Margaret develops the initial assessment using the client chronology and reviewed firm experience.</p><small>Client call · October 19 / Assessment · October 21</small></div></li><li><span className="record-version-dot" /><div><strong>New information</strong><p>A forwarded 2023 email describes renewed leakage after the patch.</p><small>Email · October 22 / Earlier assumption retained</small></div></li><li><span className="record-version-dot" /><div><strong>Revised assessment for review</strong><p>Verify the repair history and compare causes before settling the litigation approach.</p><small>Revision 2 · Margaret’s review pending</small></div></li></ol><figcaption>Fictional matter. Instructions, evidence, interpretation and approval remain distinct.</figcaption></figure>;
}

export function SourceOwnership() {
  return <div className="source-ownership" role="table" aria-label="System ownership and client work"><div className="source-ownership-head" role="row"><span role="columnheader">Source system</span><span role="columnheader">What it continues to own</span><span role="columnheader">Its part in the working record</span></div>{systemSources.map((system) => <div className="source-ownership-row" key={system.name} role="row"><strong role="rowheader">{system.name}</strong><p role="cell" data-label="System records">{system.owns}</p><p role="cell" data-label="Working context">{system.contributes}</p></div>)}</div>;
}

const signals = [
  { label: "Client email", title: "An earlier recurrence challenges the repair history.", source: "Northstar client email · October 22, 2026", context: "The forwarded email and log describe post-patch leakage. Whether the later events share a cause remains unresolved.", decision: "Margaret reviews the affected assessment and directs the next investigation." },
  { label: "Partner review", title: "The assessment needs to distinguish assumption from evidence.", source: "Margaret’s instruction on assessment revision 1", context: "Retain the initial view, connect the new evidence and explain why chronology and engineering comparison now take priority.", decision: "Revision 2 remains for Margaret’s review; the earlier version and instruction stay linked." },
  { label: "Time and cost", title: "Discovery cost needs its documented explanation.", source: "Harbor Point · Cost reconciliation and partner close-out", context: "Discovery fees were $49,500 against a $30,000 budget. Time narratives and the close-out identify the custodian change and second collection.", decision: "The partner tests Northstar’s collection assumption before using Harbor’s effort as an estimate." },
];

export function DeliverySignals() {
  const [selected, setSelected] = useState(0);
  const item = signals[selected];
  return <div className="delivery-signal-example"><div className="signal-selector" aria-label="Delivery signal examples">{signals.map((signal, index) => <button key={signal.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{signal.label}</button>)}</div><article className="signal-message"><div className="visual-document-top"><LogoMark size={25} /><span>AllianceOne · Matter team</span></div><h3>{item.title}</h3><p className="signal-source">{item.source}</p><dl><div><dt>Context to examine</dt><dd>{item.context}</dd></div><div><dt>The decision stays with the team</dt><dd>{item.decision}</dd></div></dl><p className="visual-footnote">Fictional examples · A signal prompts review; it does not approve a change.</p></article></div>;
}

import React, { useEffect, useId, useRef, useState } from "react";
import { LogoMark } from "./Site.jsx";
import { PsaMark } from "./demo/PsaMark.jsx";
import { approvedPlan } from "./demo/northstar.js";
import assessment from "./demo/assessment.json";
import { firmKnowledge } from "./content/siteContent.js";
import { projectReceipt, resourceChoices, signalExamples, snippetTiming } from "./productSnippets.js";
import "./product-snippets.css";

function Icon({ name = "file", size = 16 }) {
  const paths = {
    file: <><path d="M5 3h8l4 4v14H5z" /><path d="M13 3v5h4M8 12h6M8 16h6" /></>,
    source: <><path d="M9 4H4v16h16v-5M13 4h7v7M20 4l-10 10" /><path d="M8 17h7" /></>,
    arrow: <path d="m8 5 7 7-7 7" />,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    message: <path d="M4 4h16v12H9l-5 4z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.file}</svg>;
}

function useSnippet(sceneKey) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(media.matches);
    const onVisibility = () => setForeground(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setVisible(false);
      else if (entry.intersectionRatio >= .3) setVisible(true);
    }, { threshold: [0, .3, .6] });
    observer.observe(ref.current);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); media.removeEventListener("change", onMotion); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  useEffect(() => {
    setManual(null);
    setStep(reduced ? 2 : 0);
    if (!visible || !foreground || reduced) return;
    const timers = snippetTiming.map((at, index) => setTimeout(() => setStep(index + 1), at));
    return () => timers.forEach(clearTimeout);
  }, [visible, foreground, reduced, sceneKey]);
  return { ref, step: manual ?? step, choose: setManual };
}

function Stage({ playback, tone = "sage", name, className = "", children }) {
  return <figure ref={playback.ref} className={`product-snippet product-snippet--${tone} ${className}`} aria-label={name} data-snippet={name} data-snippet-step={playback.step}>{children}</figure>;
}
function Window({ title = "Northstar Foods", label, icon, children, className = "" }) {
  return <div className={`snippet-window ${className}`}><div className="snippet-toolbar"><span>{icon ? <Icon name={icon} /> : <LogoMark size={18} />}{title}</span>{label && <small>{label}</small>}</div>{children}</div>;
}
function Assistant({ children }) {
  return <div className="snippet-answer"><div className="snippet-author"><LogoMark size={17} /><span>AllianceOne</span></div><p>{children}</p></div>;
}

export function EngagementContextSnippet() {
  const playback = useSnippet("context");
  return <Stage playback={playback} name="Northstar context and current client update" className="snippet-context">
    <Window label="Engagement overview"><div className="snippet-context-body">
      <h3>Northstar Foods</h3><p className="snippet-context-objective">Decision ownership across eight regions.</p>
      <dl className="snippet-context-facts"><div><dt>Accepted commitment</dt><dd>Proposal v5</dd></div><div><dt>Approved plan</dt><dd>Plan v1 · 14 weeks</dd></div></dl>
      <div className="snippet-assignment-line"><Icon /><div><strong>Data-readiness assessment</strong><span>Avery Ross · Review: Sofia Patel</span></div></div>
      <button className="snippet-update-link" aria-expanded={playback.step > 0} onClick={() => playback.choose(playback.step > 0 ? 0 : 2)}><Icon name="message" /><span>Central’s process is unchanged<small>Reported by Avery · Confirmation outstanding</small></span><Icon name="arrow" /></button>
      {playback.step > 0 && <div className="snippet-context-source snippet-enter"><span>NS-C01 · September 7</span><p>{assessment.consultantUpdate.statement}</p><small>Written client confirmation remains open.</small></div>}
    </div></Window>
  </Stage>;
}

const knowledgeViews = [
  { prompt: "How should we approach the ownership gaps?", answer: "Use the firm’s Ownership and Handoffs method. Keep observed owners separate from proposed design.", source: "Ownership and Handoffs", meta: "Practice Methods Library", quote: "Record the evidence, date and unresolved conflicts before recommending a design.", foot: "Lena Torres · Reviewed by Sofia Patel" },
  { prompt: "Which assessment format applies?", answer: "The practice’s Data Readiness Assessment fits this assignment. Develop the conclusion from Northstar’s own evidence.", source: "Data Readiness Assessment", meta: "Practice report and evidence workbook", quote: "Purpose and boundaries. Evidence and its limits. Recommendation. Follow-up owners and review.", foot: "Practice Methods team · Northstar assignment" },
  { prompt: "What from Harbor applies to Northstar?", answer: "Harbor’s review changed how the evidence pack handled decision ownership. Apply that distinction to Northeast’s missing fields.", source: "Harbor · HG-D01 · Accepted v2", meta: "Review excerpt shared by Sofia", quote: "Observed ownership and proposed design were separated; source dates and conflicting accounts stayed visible.", foot: "Northstar has eight regions; Harbor had five." },
  { prompt: "What needs to be true before this advances?", answer: "The review standard asks whether each conclusion follows from the evidence, and which decisions must remain conditional.", source: "Assessment review standard", meta: "Practice quality guidance", quote: "Make the decision boundary explicit. Approval of the report does not resolve outstanding evidence actions.", foot: "Applied to the assessment and its approved assignment" },
];

function KnowledgeSnippet({ selected }) {
  const view = knowledgeViews[selected];
  const playback = useSnippet(`knowledge-${selected}`);
  return <Stage playback={playback} tone="blue" name="Firm knowledge with supporting source" className="snippet-knowledge">
    <Window label="Working with firm knowledge"><div className="snippet-chat-body">
      <p className="snippet-question">{view.prompt}</p><Assistant>{view.answer}</Assistant>
      <button className="snippet-source-link" aria-expanded={playback.step > 0} onClick={() => playback.choose(playback.step > 0 ? 0 : 2)}><Icon name="file" />{view.source}<Icon name="source" size={13} /></button>
      {playback.step > 0 && <aside className="snippet-source-excerpt snippet-enter"><span>{view.meta}</span><p>{view.quote}</p><small>{view.foot}</small></aside>}
    </div></Window>
  </Stage>;
}

export function ProductKnowledgeSnippets() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const names = ["Methods", "Templates", "Experience", "Review"];
  const item = firmKnowledge[selected];
  const keyboard = event => {
    const keys = { ArrowRight: (selected + 1) % 4, ArrowLeft: (selected + 3) % 4, Home: 0, End: 3 };
    if (!(event.key in keys)) return;
    event.preventDefault(); setSelected(keys[event.key]);
    document.getElementById(`${id}-tab-${keys[event.key]}`)?.focus();
  };
  return <div className="product-knowledge-snippets">
    <div className="snippet-feature-tabs" role="tablist" aria-label="Explore firm knowledge" onKeyDown={keyboard}>{firmKnowledge.map((entry, index) => <button key={entry.id} id={`${id}-tab-${index}`} role="tab" aria-label={entry.title} aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}>{names[index]}</button>)}</div>
    <div className="snippet-knowledge-layout" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`}><div className="snippet-knowledge-copy"><h3>{item.title}</h3><p>{item.body}</p><p className="snippet-knowledge-note">{item.note}</p></div><KnowledgeSnippet key={selected} selected={selected} /></div>
  </div>;
}

export function ChangeRecordSnippet() {
  const playback = useSnippet("change");
  return <Stage playback={playback} tone="sand" name="A proposed change compared with the accepted scope" className="snippet-change">
    <Window label="Engagement record"><div className="snippet-change-body">
      <div className="snippet-change-request"><Icon name="message" /><div><span>Elena Vargas · Client email</span><p>“Can your team also support the rollout?”</p></div></div>
      <button className="snippet-source-link" aria-expanded={playback.step > 0} onClick={() => playback.choose(playback.step > 0 ? 0 : 2)}>Compare with the accepted scope<Icon name="source" size={13} /></button>
      {playback.step > 0 && <div className="snippet-scope-comparison snippet-enter"><div><span>Accepted · Proposal v5</span><p>Operating-model design and transition roadmap.</p><strong>Implementation excluded.</strong></div><div><span>Proposed change</span><p>Rollout support, team and effort to be defined.</p><strong>Manager decision required.</strong></div></div>}
      <p className="snippet-record-note"><Icon name="clock" size={14} />The approved baseline stays in force.</p>
    </div></Window>
  </Stage>;
}

export function ResourceFitSnippet() {
  const [selected, setSelected] = useState(0);
  const playback = useSnippet("resource");
  const person = resourceChoices[selected];
  return <Stage playback={playback} tone="sage" name="Relevant experience and resource availability" className="snippet-resource">
    <Window label="Resource fit"><div className="snippet-resource-body"><p className="snippet-question">Who fits the work, and are they available?</p>
      <div className="snippet-resource-head"><span>Resource / relevant work</span><span>Availability</span></div>
      {resourceChoices.map((resource, index) => <button key={resource.name} className="snippet-resource-choice" aria-pressed={selected === index} onClick={() => { setSelected(index); playback.choose(2); }}><span><strong>{resource.name}</strong><small>{resource.experience}</small></span><span>{resource.capacity}%<small>{resource.window}{resource.conditional ? " · Conditional" : ""}</small></span></button>)}
      {playback.step > 0 && <div className="snippet-resource-rationale snippet-enter"><span>Why {person.name.split(" ")[0]}</span><p>{person.detail}</p></div>}
      <p className="snippet-record-note">Availability is checked before proposal commitment.</p>
    </div></Window>
  </Stage>;
}

export function PlanApprovalSnippet() {
  const playback = useSnippet("plan");
  const tasks = ["NS-D01", "NS-D06", "NS-D12"].map(id => approvedPlan.deliverables.find(task => task.id === id));
  return <Stage playback={playback} tone="blue" name="Assignments and approval of the engagement plan" className="snippet-plan">
    <Window label="Engagement plan"><div className="snippet-plan-body"><div className="snippet-plan-title"><div><h3>Plan v1</h3><p>Accepted proposal v5 · 14 weeks</p></div><Icon name="file" size={24} /></div>
      <div className="snippet-plan-stats"><span><strong>6</strong> resources</span><span><strong>14</strong> deliverables</span><span><strong>4</strong> review gates</span></div>
      <div className="snippet-plan-assignments">{tasks.map(task => <div key={task.id}><span><strong>{task.title}</strong><small>{task.owner} · Review: {task.reviewer}</small></span><span>{task.due}</span></div>)}</div>
      <div className="snippet-approval"><span><Icon name="check" />Sofia reviewed the plan</span>{playback.step > 0 && <span className="snippet-enter"><Icon name="check" />Margaret approved plan v1</span>}</div>
    </div></Window>
  </Stage>;
}

export function WritebackSnippet() {
  const playback = useSnippet("writeback");
  const receipt = projectReceipt();
  const rows = [["Deliverables / milestones", `${receipt.deliverables} / ${receipt.milestones}`], ["Allocations / hours", `${receipt.people} / ${receipt.hours.toLocaleString()}h`], ["Project budget", `$${receipt.fee.toLocaleString()}`]];
  return <Stage playback={playback} tone="stone" name="Approved plan checked against the Kantata readback" className="snippet-writeback">
    <Window title="Plan v1 → Project records" label="Readback"><div className="snippet-writeback-body"><div className="snippet-destination"><PsaMark /><span>Project {receipt.id}</span></div><h3>{receipt.project}</h3>
      <table className="snippet-readback-table"><thead><tr><th>Plan v1</th><th>Returned record</th><th><span className="snippet-sr-only">Result</span></th></tr></thead><tbody>{rows.map(([label,value],index) => <tr key={label}><td>{label}</td><td>{value}</td><td>{receipt.verified && playback.step >= (index === 0 ? 1 : 2) && <Icon name="check" />}</td></tr>)}</tbody></table>
      <p className="snippet-readback-result">{playback.step === 2 ? <><Icon name={receipt.verified ? "check" : "clock"} />{receipt.verified ? "Returned records match the approved plan." : "Returned records require review."}</> : "Checking the returned project records…"}</p>
      <p className="snippet-record-note">Margaret’s approval and source plan retained.</p>
    </div></Window>
  </Stage>;
}

export function ReviewRevisionSnippet() {
  const playback = useSnippet("review");
  const revised = playback.step === 2;
  return <Stage playback={playback} tone="sand" name="Sofia’s review and Avery’s revised conclusion" className="snippet-review">
    <Window title="Data Readiness Assessment" icon="file" label="Northstar Foods"><div className="snippet-review-body">
      <div className="snippet-revision-tabs" role="group" aria-label="Assessment revision"><button aria-pressed={!revised} onClick={() => playback.choose(0)}>Revision 1</button><button aria-pressed={revised} onClick={() => playback.choose(2)}>Revision 2</button></div>
      <div className="snippet-document-excerpt"><span>Recommendation</span><p className={revised ? "snippet-revised-text" : ""}>{revised ? assessment.conclusion : assessment.initialConclusion}</p></div>
      <div className="snippet-review-comment"><span>Sofia Patel · Review</span><p>{assessment.reviewComment}</p></div>
      <p className="snippet-review-state">{revised ? <><Icon name="check" />Avery revised the conclusion · Sofia approved</> : "Review linked to Avery’s draft and assignment"}</p>
    </div></Window>
  </Stage>;
}

export function AgentSignalSnippet() {
  const [selected, setSelected] = useState(0);
  const playback = useSnippet("signal");
  const signal = signalExamples[selected];
  return <Stage playback={playback} tone="blue" name="Agent update grounded in the engagement baseline" className="snippet-signal">
    <Window label="Engagement updates"><div className="snippet-signal-body"><div className="snippet-signal-tabs" role="group" aria-label="Delivery signal examples">{signalExamples.map((item,index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); playback.choose(2); }}>{item.label}</button>)}</div>
      <p className="snippet-signal-date">{signal.date} · Northstar Foods</p><Assistant>{signal.title}</Assistant>
      <dl className="snippet-signal-facts">{signal.facts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <button className="snippet-source-link" aria-expanded={playback.step > 0} onClick={() => playback.choose(playback.step > 0 ? 0 : 2)}><Icon name="source" size={14} />{signal.source}</button>
      {playback.step > 0 && <div className="snippet-signal-context snippet-enter"><strong>{signal.finding}</strong><p>{signal.context}</p><small>{signal.record}</small></div>}
    </div></Window>
  </Stage>;
}

import React from "react";
import { currentMatter, legalContexts, legalTiming, northstarUpdate, priorMatters } from "./litigation.js";
import { buildMatterBrief } from "./matterBrief.js";
import { textAt } from "./demoPlayback.js";
import "./engagement-demo.css";
import "./legal-demo.css";

function Text({ children, elapsed, at, duration = 950 }) {
  return elapsed < at ? null : <span data-follow-at={at}>{textAt(children, elapsed, at, duration)}</span>;
}
function Source({ id, label, onInspect }) {
  const text = label || legalContexts[id]?.title || id;
  return onInspect ? <button className="artifact-source" onClick={() => onInspect(id)}>{text} <span aria-hidden="true">↗</span></button> : <span className="legal-static-source">{text}</span>;
}
function Head({ label, title, elapsed, at }) {
  return <header className="artifact-head"><div><p className="artifact-kicker"><Text elapsed={elapsed} at={at} duration={450}>{label}</Text></p><h3><Text elapsed={elapsed} at={at + 150}>{title}</Text></h3></div></header>;
}
export function LegalMatterComparison({ elapsed = legalTiming.scope.firstReady, onInspect }) {
  const start = legalTiming.scope.artifact;
  return <article className="inline-artifact legal-comparison" aria-label="Comparable firm matters">
    <Head label="Firm experience" title="Three matters that inform Northstar" elapsed={elapsed} at={start} />
    <div className="legal-record-list">{priorMatters.map((matter, index) => {
      const at = start + 700 + index * 3500;
      return elapsed < at ? null : <section className="legal-record" key={matter.id}>
        <h4><Text elapsed={elapsed} at={at}>{matter.client}</Text><span className="legal-record-year">{matter.year}</span></h4>
        <p><Text elapsed={elapsed} at={at + 400} duration={1500}>{matter.precedentSummary}</Text></p>
        {elapsed >= at + 2000 && <p className="legal-application"><strong>For Northstar </strong><Text elapsed={elapsed} at={at + 2000} duration={850}>{matter.northstarQuestion}</Text></p>}
        {elapsed >= at + 2900 && <div className="legal-record-sources" data-follow-at={at + 2900}><Source id={matter.sources.assessment} label="Initial assessment" onInspect={onInspect} /><Source id={matter.sources.closeout} label="Reviewed result" onInspect={onInspect} /></div>}
      </section>;
    })}</div>
    {elapsed >= start + 11700 && <p className="legal-artifact-note" data-follow-at={start + 11700}>Comparisons retain the original assessment, later evidence and limits of each outcome.</p>}
  </article>;
}

export function LegalReasoning({ elapsed = legalTiming.reasoning.firstReady, onInspect }) {
  const at = legalTiming.reasoning.artifact, harbor = priorMatters[0];
  const stages = [["The initial view", harbor.initial, harbor.sources.assessment], ["What the evidence changed", harbor.changed, harbor.sources.closeout], ["The result", harbor.outcome, harbor.sources.closeout]];
  return <article className="inline-artifact legal-reasoning" aria-label="Harbor assessment compared with its outcome">
    <Head label="Harbor Point Owners · Assessment to outcome" title="What the first assessment missed" elapsed={elapsed} at={at} />
    <ol className="legal-reasoning-chain">{stages.map(([title, body, source], index) => {
      const time = at + 600 + index * 1900;
      return elapsed < time ? null : <li key={title}><h4>{title}</h4><p><Text elapsed={elapsed} at={time} duration={1400}>{body}</Text></p>{elapsed >= time + 1450 && <Source id={source} onInspect={onInspect} />}</li>;
    })}</ol>
    {elapsed >= at + 6500 && <section className="legal-effort" data-follow-at={at + 6500}><div><span>Discovery fees</span><strong>$30,000 <span>budget</span> → $49,500 <span>actual</span></strong></div><p><Text elapsed={elapsed} at={at + 6500} duration={1200}>The closeout and time narratives attribute the additional work to a second archive and reconstruction of the repair history.</Text></p><Source id={harbor.sources.cost} label="Fees and documented explanation" onInspect={onInspect} /></section>}
    {elapsed >= at + 8000 && <p className="legal-carry" data-follow-at={at + 8000}><Text elapsed={elapsed} at={at + 8000} duration={900}>For Northstar: verify what happened after the patch before treating the September recurrence as a distinct event.</Text></p>}
  </article>;
}

export function LegalMotionReview({ elapsed = legalTiming.reasoning.ready, onInspect }) {
  const at = legalTiming.reasoning.nextArtifact, harbor = priorMatters[0];
  return <article className="inline-artifact" aria-label="Harbor review applied to Northstar">
    <Head label="Harbor Point Owners · Motion and review" title="What supported the request" elapsed={elapsed} at={at} />
    <div className="legal-draft-comparison">
      {elapsed >= at + 600 && <section><h4>Original argument</h4><p><Text elapsed={elapsed} at={at + 600} duration={1300}>{harbor.motion.v1}</Text></p></section>}
      {elapsed >= at + 2100 && <section><h4>After Sofia’s review</h4><p><Text elapsed={elapsed} at={at + 2100} duration={1300}>{harbor.motion.v2}</Text></p></section>}
    </div>
    {elapsed >= at + 3700 && <section className="legal-record"><h4>The recorded order</h4><p><Text elapsed={elapsed} at={at + 3700} duration={1300}>{harbor.motion.court}</Text></p></section>}
    {elapsed >= at + 5300 && <p className="legal-carry"><Text elapsed={elapsed} at={at + 5300} duration={1400}>For Northstar: establish the chronology and cause, identify the reports that answer those questions, then confirm their holder. A targeted request follows that evidence work.</Text></p>}
    {elapsed >= at + 7000 && <div className="legal-record-sources" data-follow-at={at + 7000}><Source id={harbor.sources.brief} label="Motion drafts" onInspect={onInspect} /><Source id={harbor.sources.review} label="Partner review" onInspect={onInspect} /><Source id={harbor.sources.decision} label="Court order" onInspect={onInspect} /></div>}
  </article>;
}

export function LegalSourceUpdate({ elapsed, onInspect }) {
  const at = legalTiming.deliver.updateArtifact;
  return <article className="inline-artifact legal-source-update" aria-label="New evidence affecting revision 1">
    <Head label="Northstar · Evidence received after revision 1" title="Leakage reported after the repair" elapsed={elapsed} at={at} />
    {elapsed >= at + 500 && <blockquote className="legal-email-excerpt"><p><Text elapsed={elapsed} at={at + 500} duration={1300}>“Loading bay 4 leaked again during last night’s rain. The patch has not stopped it.”</Text></p><cite>Facilities manager to contractor · November 3, 2023<br />Forwarded by Northstar · October 22, 2026</cite></blockquote>}
    {elapsed >= at + 2100 && <div className="legal-change-comparison"><section><h4>Revision 1 assumed</h4><p><Text elapsed={elapsed} at={at + 2100} duration={1000}>The May patch resolved the earlier leakage; the September 2026 event might be distinct.</Text></p></section><section><h4>The new record shows</h4><p><Text elapsed={elapsed} at={at + 3300} duration={1000}>Leakage was reported after that patch. Whether it shares a cause with the 2026 event remains open.</Text></p></section></div>}
    {elapsed >= at + 4500 && <div className="legal-record-sources" data-follow-at={at + 4500}><Source id="NS-EMAIL-22" label="Forwarded email" onInspect={onInspect} /><Source id="NS-LOG-22" label="Maintenance attachment" onInspect={onInspect} /><Source id="NS-CHRONOLOGY" label="Earlier chronology" onInspect={onInspect} /></div>}
    {elapsed >= at + 4900 && <p className="legal-artifact-note" data-follow-at={at + 4900}>Linked to revision {northstarUpdate.affectedRevision} · Repair history, timing analysis and next steps affected.</p>}
  </article>;
}

export function LegalAssessment({ elapsed = legalTiming.deliver.ready, revised = true, onInspect }) {
  const at = revised ? legalTiming.deliver.nextArtifact : legalTiming.deliver.artifact;
  const brief = buildMatterBrief(revised), footerAt = at + (revised ? 14500 : 9000);
  const letterhead = <div className="legal-firm-letterhead"><strong>{brief.firm}</strong><span>{brief.practice}</span></div>;
  return <article className="inline-artifact legal-brief-artifact" aria-label={`Northstar assessment revision ${brief.revision}`} data-revision={brief.revision}>
    <div className="legal-document-title"><img src="/brand/systems/word.svg" alt="" /><Text elapsed={elapsed} at={at}>{`Northstar Foods · Matter Assessment · Revision ${brief.revision}`}</Text></div>
    <div className="legal-document-page">
      {letterhead}<p className="legal-template-name">{brief.name}</p>
      <h3><Text elapsed={elapsed} at={at + 300}>{brief.documentTitle}</Text></h3>
      <p className="legal-document-subtitle">{brief.subtitle}</p>
      <dl className="legal-memo-metadata"><div><dt>To</dt><dd>{brief.recipient}</dd></div><div><dt>From</dt><dd>{brief.author}</dd></div><div><dt>Matter</dt><dd>{brief.matter}</dd></div><div><dt>Date</dt><dd>{brief.date} · Revision {brief.revision}</dd></div></dl>
      {elapsed >= at + 1000 && <p className="legal-brief-introduction"><Text elapsed={elapsed} at={at + 1000} duration={1300}>{brief.introduction}</Text></p>}
      {brief.sections.map((part, index) => {
        const time = at + 2600 + index * 1200;
        return elapsed < time ? null : <section key={part.title} className={revised && index === 2 ? "legal-revised-section" : undefined}><h4>{part.title}</h4><p><Text elapsed={elapsed} at={time} duration={1100}>{part.body}</Text></p></section>;
      })}
      {!revised && elapsed >= at + 7600 && <section><h4>{brief.review.title}</h4><p><Text elapsed={elapsed} at={at + 7600} duration={1000}>{brief.review.body}</Text></p></section>}
      {elapsed >= at + 8700 && <div className="legal-page-footer"><span>{brief.matter} · For attorney review</span><span>{revised ? "1 / 2" : "1"}</span></div>}
    </div>
    {revised && elapsed >= at + 7800 && <div className="legal-document-page legal-evidence-page">
      {letterhead}<h3><Text elapsed={elapsed} at={at + 7800}>Evidence and recommended work</Text></h3><p className="legal-document-byline">Investigation proposed for Margaret’s review</p>
      <table className="legal-evidence-map"><thead><tr><th>Question</th><th>Record and limit</th><th>Next work</th></tr></thead><tbody>{brief.evidence.map((item, index) => {
        const time = at + 8600 + index * 1150;
        return elapsed < time ? null : <tr key={item.question}><th scope="row">{item.question}</th><td><Text elapsed={elapsed} at={time} duration={950}>{item.record}</Text></td><td><Text elapsed={elapsed} at={time + 150} duration={950}>{item.action}</Text></td></tr>;
      })}</tbody></table>
      {elapsed >= at + 12200 && <section className="legal-revision-reason"><h4>{brief.review.title}</h4><p><Text elapsed={elapsed} at={at + 12200} duration={1400}>{brief.review.body}</Text></p></section>}
      {elapsed >= at + 13800 && <p className="legal-artifact-note" data-follow-at={at + 13800}>{brief.decision}</p>}
      {elapsed >= footerAt && <div className="legal-page-footer"><span>{brief.matter} · Revision 1 retained</span><span>2 / 2</span></div>}
    </div>}
    {elapsed >= footerAt && <footer className="legal-document-sources" data-follow-at={footerAt}>
      <p>{brief.revisionNote}</p>
      <details><summary>Sources and document history</summary><div className="legal-record-sources">{brief.sources.map(item => <Source key={item.id} id={item.id} onInspect={onInspect} />)}</div></details>
    </footer>}
  </article>;
}
export default function LegalDemoArtifact({ type, elapsed, onInspect }) {
  const shared = { elapsed, onInspect };
  if (type === "legal-comparison") return <LegalMatterComparison {...shared} />;
  if (type === "legal-reasoning") return <LegalReasoning {...shared} />;
  if (type === "legal-change") return <LegalSourceUpdate {...shared} />;
  if (type === "legal-review") return <LegalMotionReview {...shared} />;
  if (type === "legal-assessment" || type === "legal-assessment-revised") return <LegalAssessment {...shared} revised={type === "legal-assessment-revised"} />;
  return null;
}

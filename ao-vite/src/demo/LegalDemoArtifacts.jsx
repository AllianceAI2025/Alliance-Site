import React from "react";
import { currentMatter, legalContexts, legalTiming, northstarUpdate, priorMatters } from "./litigation.js";
import { buildMatterBrief } from "./matterBrief.js";
import { textAt } from "./demoPlayback.js";
import "./engagement-demo.css";
import "./legal-demo.css";

function Text({ children, elapsed, at, duration = 800 }) {
  return elapsed < at ? null : <span data-follow-at={at}>{textAt(children, elapsed, at, duration)}</span>;
}
function Source({ id, onInspect }) {
  const label = legalContexts[id]?.title || id;
  return onInspect ? <button className="artifact-source" onClick={() => onInspect(id)}>{label} <span aria-hidden="true">↗</span></button> : <span className="legal-static-source">{label}</span>;
}
function Head({ label, title, elapsed, at }) {
  return <header className="artifact-head"><div><p className="artifact-kicker"><Text elapsed={elapsed} at={at} duration={450}>{label}</Text></p><h3><Text elapsed={elapsed} at={at + 150}>{title}</Text></h3></div></header>;
}
export function LegalMatterComparison({ elapsed = legalTiming.scope.firstReady, onInspect }) {
  const start = legalTiming.scope.artifact;
  return <article className="inline-artifact legal-comparison" aria-label="Comparable firm matters">
    <Head label="Internal firm experience" title="Three approaches to the records question" elapsed={elapsed} at={start} />
    <div className="legal-record-list">{priorMatters.map((matter, index) => {
      const at = start + 700 + index * 3500;
      return elapsed < at ? null : <section className="legal-record" key={matter.id}>
        <h4><Text elapsed={elapsed} at={at}>{matter.client}</Text></h4>
        <p className="legal-issue"><Text elapsed={elapsed} at={at + 300}>{matter.legalIssue}</Text></p>
        <p><Text elapsed={elapsed} at={at + 850} duration={1200}>{matter.precedentSummary}</Text></p>
        {elapsed >= at + 2100 && <p className="legal-record-people" data-follow-at={at + 2100}>Prepared by {matter.author} · Reviewed by {matter.lead}</p>}
        {elapsed >= at + 2700 && <div className="legal-record-sources" data-follow-at={at + 2700}><Source id={matter.sources.brief} onInspect={onInspect} /><Source id={matter.sources.decision} onInspect={onInspect} /></div>}
      </section>;
    })}</div>
    {elapsed >= start + 11500 && <p className="legal-artifact-note" data-follow-at={start + 11500}><Text elapsed={elapsed} at={start + 11500}>{"Use these matters to test Northstar’s evidence and records-control questions. Their outcomes do not establish Northstar’s facts."}</Text></p>}
  </article>;
}

export function LegalMotionReview({ elapsed = legalTiming.scope.ready, onInspect }) {
  const at = legalTiming.scope.nextArtifact;
  const harbor = priorMatters[0];
  return <article className="inline-artifact" aria-label="Harbor review applied to Northstar">
    <Head label="Harbor Point Owners · Retained review" title="Why the draft changed" elapsed={elapsed} at={at} />
    <div className="legal-draft-comparison">
      {elapsed >= at + 650 && <section data-follow-at={at + 650}><h4>Draft 1 · Avery Ross</h4><p><Text elapsed={elapsed} at={at + 650} duration={1200}>{harbor.motion.v1}</Text></p></section>}
      {elapsed >= at + 2150 && <section data-follow-at={at + 2150}><h4>Reviewed draft · Sofia Patel</h4><p><Text elapsed={elapsed} at={at + 2150} duration={1400}>{harbor.motion.v2}</Text></p></section>}
    </div>
    {elapsed >= at + 3800 && <p className="legal-carry" data-follow-at={at + 3800}><Text elapsed={elapsed} at={at + 3800} duration={1300}>{harbor.motion.review}</Text></p>}
    {elapsed >= at + 5300 && <p className="legal-artifact-note" data-follow-at={at + 5300}><Text elapsed={elapsed} at={at + 5300} duration={1000}>{"The court ordered the identified reports produced but still refused the other-project request. The review and the court’s decision remain separate records."}</Text></p>}
    {elapsed >= at + 6500 && <section className="legal-record" data-follow-at={at + 6500}><h4>Carry into Northstar</h4><p><Text elapsed={elapsed} at={at + 6500} duration={1000}>{"Build an issue-by-issue evidence map and establish who controls each missing report. Northstar’s agreement, chronology and photographs do not resolve that question."}</Text></p></section>}
    {elapsed >= at + 7800 && <div className="legal-record-sources" data-follow-at={at + 7800}><Source id={harbor.sources.brief} onInspect={onInspect} /><Source id={harbor.sources.decision} onInspect={onInspect} /><Source id={harbor.sources.review} onInspect={onInspect} /></div>}
  </article>;
}

export function LegalSourceUpdate({ elapsed, onInspect }) {
  const at = legalTiming.deliver.updateArtifact;
  return <article className="inline-artifact legal-source-update" aria-label="New sources affecting revision 1">
    <Head label="Northstar Foods · Revision 1" title="What the new information affects" elapsed={elapsed} at={at} />
    {[
      ["Earlier assumption", currentMatter.originalAssumption, "NS-CHRONOLOGY"],
      ["New client information", currentMatter.newInformation, "NS-EMAIL-22"],
      ["Work affected", "The custodian section and proposed records approach need to distinguish the new archive lead from evidence of control. Sofia asks for the earlier account and the reason for revision to remain visible.", "NS-REVIEW"],
    ].map(([title, body, source], index) => {
      const time = at + 500 + index * 1000;
      return elapsed < time ? null : <section className="legal-record" key={source}><h4>{title}</h4><p><Text elapsed={elapsed} at={time} duration={850}>{body}</Text></p>{elapsed >= time + 850 && <Source id={source} onInspect={onInspect} />}</section>;
    })}
    {elapsed >= at + 3900 && <p className="legal-artifact-note" data-follow-at={at + 3900}>Linked to revision {northstarUpdate.affectedRevision} · Proposed changes await Avery’s instruction and Sofia’s review.</p>}
  </article>;
}

export function LegalAssessment({ elapsed = legalTiming.deliver.ready, revised = true, onInspect }) {
  const at = revised ? legalTiming.deliver.nextArtifact : legalTiming.deliver.artifact;
  const brief = buildMatterBrief(revised);
  const footerAt = at + (revised ? 13800 : 8300);
  const letterhead = <div className="legal-firm-letterhead"><strong>{brief.firm}</strong><span>{brief.practice}</span></div>;
  return <article className="inline-artifact legal-brief-artifact" aria-label={`Northstar assessment revision ${brief.revision}`}>
    <div className="legal-document-title"><img src="/brand/systems/word.svg" alt="" /><Text elapsed={elapsed} at={at}>{`Northstar Foods · Matter Assessment · Revision ${brief.revision}`}</Text></div>
    <div className="legal-document-page">
      {letterhead}
      <p className="legal-template-name">{brief.name}</p>
      <h3><Text elapsed={elapsed} at={at + 300}>{brief.documentTitle}</Text></h3>
      <p className="legal-document-subtitle">{brief.subtitle}</p>
      <dl className="legal-memo-metadata"><div><dt>To</dt><dd>{brief.reviewer}</dd></div><div><dt>From</dt><dd>{brief.author}</dd></div><div><dt>Matter</dt><dd>{brief.matter}</dd></div><div><dt>Date</dt><dd>{brief.date} · Revision {brief.revision}</dd></div></dl>
      {elapsed >= at + 1000 && <p className="legal-brief-introduction" data-follow-at={at + 1000}><Text elapsed={elapsed} at={at + 1000} duration={1000}>{brief.introduction}</Text></p>}
      {brief.sections.map((part, index) => {
        const time = at + 2100 + index * 950;
        return elapsed < time ? null : <section key={part.title} data-follow-at={time}><h4>{part.title}</h4><p><Text elapsed={elapsed} at={time} duration={850}>{part.body}</Text></p></section>;
      })}
      {!revised && elapsed >= at + 7000 && <section data-follow-at={at + 7000}><h4>Questions for partner review</h4><p><Text elapsed={elapsed} at={at + 7000} duration={900}>{brief.review.body}</Text></p></section>}
      {elapsed >= at + 7000 && <div className="legal-page-footer"><span>{brief.matter} · Internal draft</span><span>{revised ? "1 / 2" : "1"}</span></div>}
    </div>
    {revised && elapsed >= at + 7400 && <div className="legal-document-page legal-evidence-page" data-follow-at={at + 7400}>
      {letterhead}
      <h3><Text elapsed={elapsed} at={at + 7400}>{"Evidence map and review"}</Text></h3>
      <p className="legal-document-byline">Proposed work for partner review</p>
      <table className="legal-evidence-map"><thead><tr><th>Question</th><th>Record and limit</th><th>Proposed work</th></tr></thead><tbody>{brief.evidence.map((item, index) => {
        const time = at + 8100 + index * 1100;
        return elapsed < time ? null : <tr key={item.question} data-follow-at={time}><th scope="row">{item.question}</th><td><Text elapsed={elapsed} at={time} duration={1000}>{item.record}</Text></td><td><Text elapsed={elapsed} at={time + 200} duration={900}>{item.action}</Text></td></tr>;
      })}</tbody></table>
      {elapsed >= at + 11700 && <section data-follow-at={at + 11700}><h4>{brief.review.title}</h4><p><Text elapsed={elapsed} at={at + 11700} duration={1000}>{brief.review.body}</Text></p></section>}
      {elapsed >= at + 13000 && <section data-follow-at={at + 13000}><h4>Decision for partner review</h4><p><Text elapsed={elapsed} at={at + 13000} duration={700}>{brief.decision}</Text></p></section>}
      {elapsed >= footerAt && <div className="legal-page-footer"><span>{brief.matter} · Internal draft</span><span>2 / 2</span></div>}
    </div>}
    {elapsed >= footerAt && <footer className="legal-document-sources" data-follow-at={footerAt}>
      <p>{brief.revisionNote}</p>
      {!revised && <p className="legal-review-receipt">Revision 1 sent to Sofia for review · Northstar source references included. <Source id="NS-REVIEW-REQUEST" onInspect={onInspect} /></p>}
      <div className="legal-record-sources">{brief.sources.map(item => <Source key={item.id} id={item.id} onInspect={onInspect} />)}</div>
    </footer>}
  </article>;
}

export default function LegalDemoArtifact({ type, elapsed, onInspect }) {
  const shared = { elapsed, onInspect };
  if (type === "legal-comparison") return <LegalMatterComparison {...shared} />;
  if (type === "legal-change") return <LegalSourceUpdate {...shared} />;
  if (type === "legal-review") return <LegalMotionReview {...shared} />;
  if (type === "legal-assessment" || type === "legal-assessment-revised") return <LegalAssessment {...shared} revised={type === "legal-assessment-revised"} />;
  return null;
}

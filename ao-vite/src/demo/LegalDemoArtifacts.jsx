import React from "react";
import { legalContexts, legalTiming, priorMatters } from "./litigation.js";
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
const money = value => `$${value.toLocaleString("en-US")}`;

export function LegalMatterComparison({ elapsed = legalTiming.scope.firstReady, onInspect }) {
  const start = legalTiming.scope.artifact;
  return <article className="inline-artifact legal-comparison" aria-label="Comparable firm matters">
    <Head label="Firm matter experience" title="What carries into Northstar" elapsed={elapsed} at={start} />
    <div className="legal-record-list">{priorMatters.map((matter, index) => {
      const at = start + 700 + index * 3600;
      return elapsed < at ? null : <section className="legal-record" key={matter.id}>
        <h4><Text elapsed={elapsed} at={at}>{matter.client}</Text></h4>
        <p><Text elapsed={elapsed} at={at + 450}>{matter.issue}</Text></p>
        {elapsed >= at + 1100 && <p className="legal-record-people" data-follow-at={at + 1100}><Text elapsed={elapsed} at={at + 1100}>{`${matter.author} prepared the work · ${matter.lead} led / reviewed`}</Text></p>}
        {elapsed >= at + 1700 && <p data-follow-at={at + 1700}><Text elapsed={elapsed} at={at + 1700}>{`${money(matter.budget.actual)} actual / ${money(matter.budget.approved)} budget. ${matter.changed}`}</Text></p>}
        {elapsed >= at + 2700 && <p className="legal-carry" data-follow-at={at + 2700}><Text elapsed={elapsed} at={at + 2700}>{matter.motion.lesson}</Text></p>}
        {elapsed >= at + 3300 && <div className="legal-record-sources" data-follow-at={at + 3300}><Source id={matter.sources.closeout} onInspect={onInspect} /><Source id={matter.sources.cost} onInspect={onInspect} /></div>}
      </section>;
    })}</div>
    {elapsed >= 15100 && <p className="legal-artifact-note" data-follow-at={15100}>Comparable conditions inform the questions. They do not establish Northstar’s facts or predict an outcome.</p>}
  </article>;
}

export function LegalMatterQuestions({ elapsed, onInspect }) {
  const at = legalTiming.scope.nextArtifact;
  return <article className="inline-artifact" aria-label="Questions to carry into Northstar">
    <Head label="Northstar Foods · Internal assessment" title="Start with the unresolved evidence" elapsed={elapsed} at={at} />
    {priorMatters.map((matter, index) => {
      const time = at + 750 + index * 1350;
      return elapsed < time ? null : <section className="legal-record" key={matter.id} data-follow-at={time}>
        <h4><Text elapsed={elapsed} at={time}>{`${matter.author} · ${matter.role}`}</Text></h4>
        <p><Text elapsed={elapsed} at={time + 350}>{matter.limit}</Text></p>
        {elapsed >= time + 1000 && <Source id={matter.sources.review} onInspect={onInspect} />}
      </section>;
    })}
    {elapsed >= at + 4900 && <p className="legal-carry" data-follow-at={at + 4900}><Text elapsed={elapsed} at={at + 4900}>{"For Northstar: establish the custodian, map each request to an issue and exhibit, and test the collection assumption before extending it to effort or cost."}</Text></p>}
  </article>;
}

export function LegalMotionHistory({ elapsed = legalTiming.plan.firstReady, onInspect }) {
  const start = legalTiming.plan.artifact;
  return <article className="inline-artifact" aria-label="Firm motion history">
    <Head label="Firm litigation experience" title="Arguments, decisions and review" elapsed={elapsed} at={start} />
    {priorMatters.map((matter, index) => {
      const at = start + 650 + index * 3700;
      return elapsed < at ? null : <section className="legal-record" key={matter.id}>
        <h4><Text elapsed={elapsed} at={at}>{`${matter.client} · ${matter.motion.result}`}</Text></h4>
        {elapsed >= at + 500 && <p data-follow-at={at + 500}><strong>Requested </strong><Text elapsed={elapsed} at={at + 500}>{matter.motion.requested}</Text></p>}
        {elapsed >= at + 1250 && <p data-follow-at={at + 1250}><strong>{matter.motion.kind === "Court order" ? "Order states " : "Withdrawal record "}</strong><Text elapsed={elapsed} at={at + 1250} duration={1000}>{matter.motion.court}</Text></p>}
        {elapsed >= at + 2500 && <p className="legal-carry" data-follow-at={at + 2500}><strong>Partner observation </strong><Text elapsed={elapsed} at={at + 2500}>{matter.motion.lesson}</Text></p>}
        {elapsed >= at + 3300 && <div className="legal-record-sources" data-follow-at={at + 3300}><Source id={matter.sources.brief} onInspect={onInspect} /><Source id={matter.sources.decision} onInspect={onInspect} /><Source id={matter.sources.review} onInspect={onInspect} /></div>}
      </section>;
    })}
    {elapsed >= 15000 && <p className="legal-artifact-note" data-follow-at={15000}>These are different dispositions and supporting records, not a motion success rate. Legal authorities require separate attorney verification.</p>}
  </article>;
}

export function LegalMotionReview({ elapsed = legalTiming.plan.ready, onInspect }) {
  const at = legalTiming.plan.nextArtifact;
  const harbor = priorMatters[0];
  return <article className="inline-artifact" aria-label="Harbor draft and partner review">
    <Head label="Harbor Point Owners · Retained review" title="What changed in the argument" elapsed={elapsed} at={at} />
    <div className="legal-draft-comparison">
      {elapsed >= at + 650 && <section data-follow-at={at + 650}><h4>Draft 1 · Avery Ross</h4><p><Text elapsed={elapsed} at={at + 650} duration={1500}>{harbor.motion.v1}</Text></p></section>}
      {elapsed >= at + 2450 && <section data-follow-at={at + 2450}><h4>Reviewed draft · Sofia Patel</h4><p><Text elapsed={elapsed} at={at + 2450} duration={1500}>{harbor.motion.v2}</Text></p></section>}
    </div>
    {elapsed >= at + 4200 && <p className="legal-carry" data-follow-at={at + 4200}><Text elapsed={elapsed} at={at + 4200} duration={1200}>{harbor.motion.review}</Text></p>}
    {elapsed >= at + 5700 && <div data-follow-at={at + 5700}><p className="legal-artifact-note">The narrower draft did not make the other-project request succeed. The order’s stated grounds and the partner’s retrospective observations remain separate.</p><div className="legal-record-sources"><Source id={harbor.sources.brief} onInspect={onInspect} /><Source id={harbor.sources.decision} onInspect={onInspect} /><Source id={harbor.sources.review} onInspect={onInspect} /></div></div>}
  </article>;
}

export function LegalHandoff({ elapsed = legalTiming.deliver.ready, revised = true, onInspect }) {
  const at = revised ? legalTiming.deliver.nextArtifact : legalTiming.deliver.artifact;
  const brief = buildMatterBrief(revised);
  const footerAt = at + (revised ? 13800 : 8300);
  const letterhead = <div className="legal-firm-letterhead"><strong>{brief.firm}</strong><span>{brief.practice}</span></div>;
  return <article className="inline-artifact legal-brief-artifact" aria-label={`Northstar matter handoff revision ${brief.revision}`}>
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
      <div className="legal-record-sources">{brief.sources.map(item => <Source key={item.id} id={item.id} onInspect={onInspect} />)}</div>
      {revised && elapsed >= legalTiming.deliver.ready && <a className="legal-word-download" href={brief.downloadPath} download={brief.fileName} data-follow-at={legalTiming.deliver.ready}><img src="/brand/systems/word.svg" alt="" />Download Word draft <span aria-hidden="true">↓</span></a>}
    </footer>}
  </article>;
}

export default function LegalDemoArtifact({ type, elapsed, onInspect }) {
  const shared = { elapsed, onInspect };
  if (type === "legal-comparison") return <LegalMatterComparison {...shared} />;
  if (type === "legal-questions") return <LegalMatterQuestions {...shared} />;
  if (type === "legal-motions") return <LegalMotionHistory {...shared} />;
  if (type === "legal-review") return <LegalMotionReview {...shared} />;
  return <LegalHandoff {...shared} revised={type === "legal-handoff-revised"} />;
}

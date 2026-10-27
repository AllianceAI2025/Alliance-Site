import React from "react";
import { currentMatter, legalContexts, legalTiming, matterBriefRevisions, priorMatters } from "./litigation.js";
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
  const version = matterBriefRevisions[revised ? 1 : 0];
  const blocks = [
    ["Client instructions", currentMatter.instruction],
    ["Avery’s assignment", currentMatter.assignment],
    ["Received materials and limits", currentMatter.established],
    [revised ? "Earlier assumption retained" : "Working assumption · unverified", currentMatter.originalAssumption],
    ...(revised ? [["New source · Client email, October 22", version.custodian], ["Working interpretation · For partner review", version.interpretation]] : [["Open questions", currentMatter.questions.join(" ")]]),
  ];
  return <article className="inline-artifact legal-brief-artifact" aria-label={`Northstar matter handoff revision ${version.revision}`}>
    <div className="legal-document-title"><Text elapsed={elapsed} at={at}>{`Northstar Foods · Matter handoff · Revision ${version.revision}`}</Text></div>
    <div className="legal-document-page">
      <p className="artifact-kicker"><Text elapsed={elapsed} at={at + 200}>{`NS-26-014 · ${revised ? "October 23" : "October 21"}, 2026`}</Text></p>
      <h3><Text elapsed={elapsed} at={at + 300}>{"Construction dispute: records and next decisions"}</Text></h3>
      <p className="legal-document-byline">Avery Ross · Reviewing partner: Sofia Patel</p>
      {blocks.map(([label, body], index) => {
        const time = at + 900 + index * (revised ? 950 : 1100);
        return elapsed < time ? null : <section key={label} data-follow-at={time}><h4>{label}</h4><p><Text elapsed={elapsed} at={time} duration={850}>{body}</Text></p></section>;
      })}
      {elapsed >= at + (revised ? 6900 : 6500) && <section data-follow-at={at + (revised ? 6900 : 6500)}><h4>Decision still required</h4><p>{currentMatter.pending}</p></section>}
    </div>
    {elapsed >= at + (revised ? 7600 : 6900) && <footer className="legal-document-sources" data-follow-at={at + (revised ? 7600 : 6900)}>
      {revised && <p>Revision 2 retains the earlier assumption, adds the email and review, and records the proposed response. It is ready for Sofia’s review.</p>}
      <div className="legal-record-sources">{version.sourceIds.map(id => <Source key={id} id={id} onInspect={onInspect} />)}</div>
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

import React from "react";
import assessment from "./assessment.json";
import { deliveryTiming, textAt } from "./demoPlayback.js";
import "./assessment-report.css";

function Text({ children, elapsed, at, duration = 650 }) {
  return <>{textAt(children, elapsed, at, duration)}</>;
}
function Page({ number, children, elapsed, at }) {
  if (elapsed < at) return null;
  return <section className="assessment-page report-page" aria-label={`Assessment report page ${number}`} data-report-page={number} data-follow-at={at}>
    <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
    {children}
    <footer className="report-page-footer"><span>Northstar Foods · Confidential · September 7, 2026</span><span>{number} / 3</span></footer>
  </section>;
}
export function AssessmentReport({ elapsed }) {
  const timing = deliveryTiming;
  return <div className="report-pages" aria-label="Approved three-page assessment">
    <Page number={1} elapsed={elapsed} at={timing.exportPageOne}>
      <p className="assessment-client">Northstar Foods</p><h3>{assessment.title}</h3>
      <p className="report-subtitle">Decision rights & operating model</p>
      <p className="assessment-byline">Prepared by Avery Ross · Reviewed by Sofia Patel<br />September 7, 2026 · Approved revision 2</p>
      <section className="report-executive" data-follow-at={timing.exportPageOne + 200}><p className="report-section-number">01 / Executive assessment</p><h4><Text elapsed={elapsed} at={timing.exportPageOne + 200}>{assessment.decisionTitle}</Text></h4><p><Text elapsed={elapsed} at={timing.exportPageOne + 700} duration={1100}>{assessment.executiveSummary}</Text></p></section>
      <section className="report-decision-list" aria-label="Decisions supported by the evidence">{assessment.decisions.map((decision, index) => {
        const at = timing.exportPageOne + 2200 + index * 900;
        return elapsed >= at && <div key={decision.label} data-follow-at={at}><span>{decision.label}</span><div><h4>{decision.decision}</h4><p><Text elapsed={elapsed} at={at} duration={700}>{decision.basis}</Text></p></div></div>;
      })}</section>
      {elapsed >= timing.exportMethodAt && <section className="report-method" data-follow-at={timing.exportMethodAt}><h4>Assessment method</h4><dl>{assessment.method.map(item => <div key={item.criterion}><dt>{item.criterion}</dt><dd>{item.test}</dd></div>)}</dl><p className="report-source-note">Basis: NS-DATA01, approved plan v1 and the practice assessment method. Source register on page 3.</p></section>}
    </Page>
    <Page number={2} elapsed={elapsed} at={timing.exportPageTwo}>
      <p className="report-section-number">02 / Findings and decision limits</p><h3>Evidence before design</h3>
      {assessment.findings.map((finding, index) => {
        const at = timing.exportPageTwo + 350 + index * 1700;
        return elapsed >= at && <section className="report-finding" key={finding.id} data-follow-at={at}>
          <h4>{finding.id} · {finding.title}</h4><p className="report-source-note">{finding.source}</p>
          <p><Text elapsed={elapsed} at={at} duration={550}>{finding.observation}</Text></p>
          {elapsed >= at + 600 && <p className="report-decision-consequence" data-follow-at={at + 600}><strong>Decision consequence</strong><Text elapsed={elapsed} at={at + 600} duration={500}>{finding.consequence}</Text></p>}
          {elapsed >= at + 1150 && <p data-follow-at={at + 1150}><strong>Release condition</strong><Text elapsed={elapsed} at={at + 1150} duration={450}>{finding.release}</Text></p>}
        </section>;
      })}
      {elapsed >= timing.exportPageTwo + 5400 && <section className="report-limitations" data-follow-at={timing.exportPageTwo + 5400}><h4>Assessment boundaries</h4><p>{assessment.limitations}</p></section>}
    </Page>
    <Page number={3} elapsed={elapsed} at={timing.exportPageThree}>
      <p className="report-section-number">03 / Action and review record</p><h3>Close the evidence gaps</h3>
      <p className="report-action-intro">Follow-up targets precede the September 11 baseline gate. Northstar owns its evidence; Avery coordinates validation and Sofia reviews the remaining conditions.</p>
      <table className="report-action-table"><thead><tr><th>Action / finding</th><th>Accountable owner</th><th>Target</th></tr></thead><tbody>{assessment.actionPlan.map((action, index) => {
        const at = timing.exportPageThree + 400 + index * 850;
        return elapsed >= at && <tr key={action.id} data-follow-at={at}><td><strong>{action.id} · {action.action}</strong><span>{action.finding}</span><p><Text elapsed={elapsed} at={at} duration={650}>{action.doneWhen}</Text></p></td><td>{action.owner}<small>Coordinate: {action.coordinator}</small></td><td>{action.target}</td></tr>;
      })}</tbody></table>
      {elapsed >= timing.exportReviewAt && <section className="report-review-record" data-follow-at={timing.exportReviewAt}><h4>Reviewed revision · Sofia Patel</h4><p><Text elapsed={elapsed} at={timing.exportReviewAt} duration={1100}>{assessment.reviewResponse}</Text></p></section>}
      {elapsed >= timing.exportSourcesAt && <section className="report-source-register" data-follow-at={timing.exportSourcesAt}><h4>Source register</h4>{assessment.sourceRegister.map(source => <div key={source.id}><span>{source.id}</span><p><strong>{source.name}</strong>{source.use}</p></div>)}</section>}
    </Page>
  </div>;
}

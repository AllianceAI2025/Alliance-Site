import React from "react";
import assessment from "./assessment.json";
import { deliveryTiming, textAt } from "./demoPlayback.js";
import "./assessment-report.css";

function Text({ children, elapsed, at, duration = 650 }) {
  return <>{textAt(children, elapsed, at, duration)}</>;
}
export function AssessmentReport({ elapsed }) {
  const timing = deliveryTiming;
  if (elapsed < timing.exportPageOne) return null;
  return <div className="report-pages" aria-label="Approved one-page assessment">
    <section className="assessment-page report-page report-page--brief" aria-label="Assessment report page 1" data-report-page="1" data-follow-at={timing.exportPageOne}>
      <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
      <p className="assessment-client">Northstar Foods</p><h3>{assessment.title}</h3>
      <p className="assessment-byline">Avery Ross · Reviewed by Sofia Patel<br />September 7, 2026 · Approved revision 2</p>
      <section className="report-executive" data-follow-at={timing.exportPageOne + 200}><h4>Recommendation</h4><p><Text elapsed={elapsed} at={timing.exportPageOne + 200} duration={900}>{assessment.conclusion}</Text></p></section>
      {elapsed >= timing.exportFindingsAt && <section className="report-brief-evidence"><h4>Evidence and follow-up</h4>{assessment.brief.findings.map((finding, index) => {
        const at = timing.exportFindingsAt + index * 600;
        return elapsed >= at && <div key={finding.area} data-follow-at={at}><strong>{finding.area}</strong><p><Text elapsed={elapsed} at={at} duration={450}>{`${finding.finding} ${finding.action}`}</Text></p></div>;
      })}</section>}
      {elapsed >= timing.exportActionsAt && <section className="report-brief-actions" data-follow-at={timing.exportActionsAt}><h4>Next actions</h4><ul>{assessment.brief.actions.map((action,index) => {
        const at=timing.exportActionsAt+index*350;
        return elapsed >= at && <li key={action} data-follow-at={at}><Text elapsed={elapsed} at={at} duration={350}>{action}</Text></li>;
      })}</ul></section>}
      {elapsed >= timing.exportReviewAt && <p className="report-brief-review" data-follow-at={timing.exportReviewAt}><Text elapsed={elapsed} at={timing.exportReviewAt} duration={600}>{assessment.brief.review}</Text></p>}
      {elapsed >= timing.exportSourcesAt && <p className="report-source-note" data-follow-at={timing.exportSourcesAt}>Basis: {assessment.brief.sources}</p>}
      <footer className="report-page-footer"><span>Northstar Foods · Confidential</span><span>1 / 1</span></footer>
    </section>
  </div>;
}

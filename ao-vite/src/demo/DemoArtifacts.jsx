import React from "react";
import { assignment, effort, readbackAssignment, resources, workstreams } from "./northstar.js";
import { compareAssignment, planExecutionAt, planTiming, progressAt, textAt } from "./demoPlayback.js";

function BuildText({ children, elapsed, at, duration = 500 }) {
  return <>{textAt(children, elapsed, at, duration)}</>;
}
function SourceLink({ source, children, onInspect }) {
  return <button className="artifact-source" onClick={() => onInspect(source)}>{children}<span aria-hidden="true">↗</span></button>;
}
function ArtifactHead({ label, title, meta, elapsed, finishedAt }) {
  return <header className="artifact-head"><div><p>{label}</p><h3>{title}</h3></div><span className="artifact-meta">{elapsed < finishedAt ? <><i className="build-pulse" />Developing</> : meta}</span></header>;
}

export function ScopeArtifact({ elapsed, onInspect }) {
  return <article className="inline-artifact scope-artifact" aria-label="Northstar engagement scope" aria-busy={elapsed < 11900}>
    <ArtifactHead label="Northstar Foods · Engagement scope" title="Operating model & decision rights" meta="Working draft" elapsed={elapsed} finishedAt={11900} />
    <p className="artifact-purpose"><BuildText elapsed={elapsed} at={2800} duration={700}>Clearer decision ownership across eight regions, with normal service maintained and a board package by November 20.</BuildText></p>
    <div className="scope-columns">
      <section className="scope-workstreams"><h4>Four workstreams · fourteen weeks</h4>{workstreams.map((stream, index) => <div className="scope-stream build-slot" key={stream.name} data-built={elapsed >= 3700 + index * 650}>
        {elapsed >= 3700 + index * 650 && <><div><strong><BuildText elapsed={elapsed} at={3700 + index * 650} duration={350}>{stream.name}</BuildText></strong><span>W{stream.weeks}</span></div><p><BuildText elapsed={elapsed} at={3950 + index * 650} duration={400}>{stream.detail}</BuildText></p></>}
      </div>)}</section>
      <section className="scope-precedent"><h4>Firm experience applied</h4>
        <div className="precedent-entry build-slot" data-built={elapsed >= 6500}>{elapsed >= 6500 && <><SourceLink source="harbor" onInspect={onInspect}>Harbor Grain · HG-D01</SourceLink><p>Avery’s inventory; Sofia separated observed owners from design. Late regional input caused rework and a one-week delay.</p><p className="precedent-application">Carry forward: early voices and an evidence gate.</p></>}</div>
        <div className="precedent-entry build-slot" data-built={elapsed >= 7900}>{elapsed >= 7900 && <><SourceLink source="meridian" onInspect={onInspect}>Meridian · MC-D01</SourceLink><p>Lena’s matrix; review clarified boundaries and acknowledgment. On-time model, slower adoption.</p><p className="precedent-application">Carry forward: handoffs and transition readiness.</p></>}</div>
      </section>
    </div>
    <section className="scope-resource-fit"><div className="artifact-section-heading"><h4>Proposed resource fit</h4>{elapsed >= 10500 && <SourceLink source="availability" onInspect={onInspect}>Current availability</SourceLink>}</div>
      <div className="resource-fit-row build-slot" data-built={elapsed >= 9300}>{elapsed >= 9300 && <><strong>Avery Ross</strong><span>Harbor evidence inventory</span><small>{elapsed >= 10500 ? "75% available" : "Checking availability…"}</small></>}</div>
      <div className="resource-fit-row build-slot" data-built={elapsed >= 9900}>{elapsed >= 9900 && <><strong>Lena Torres</strong><span>Meridian ownership matrix</span><small>{elapsed >= 11000 ? "Available from W3" : "Checking availability…"}</small></>}</div>
    </section>
    <footer className="artifact-footer build-slot">{elapsed >= 11900 && <><span>Implementation excluded. West and Southeast input remains outstanding.</span><SourceLink source="discovery" onInspect={onInspect}>Client context</SourceLink></>}</footer>
  </article>;
}

export function PlanArtifact({ elapsed, onInspect, onApprove }) {
  const execution = planExecutionAt(elapsed);
  const mismatches = compareAssignment(assignment, readbackAssignment);
  const verified = execution.readbackReady && mismatches.length === 0;
  return <article className="inline-artifact plan-artifact" aria-label="Northstar engagement plan" aria-busy={!execution.readbackReady}>
    <ArtifactHead label="Northstar Foods · Engagement plan" title="Resources and delivery schedule" meta="Approved plan v1" elapsed={elapsed} finishedAt={planTiming.approved} />
    <div className="plan-basis"><SourceLink source="accepted" onInspect={onInspect}>Accepted proposal v5</SourceLink><span>14 weeks</span><span>{effort.toLocaleString()} hours</span><span>14 deliverables</span><span>August 17 – November 20</span></div>
    <div className="resource-schedule" role="group" aria-label="Resources across fourteen weeks">
      <div className="schedule-axis"><span>Resources</span><div>{[1, 4, 8, 12, 14].map(week => <span key={week}>W{week}</span>)}</div><span>Effort</span></div>
      {resources.map((person, index) => {
        const at = 3300 + index * 650;
        const width = (person.end - person.start + 1) / 14 * 100 * progressAt(elapsed, at + 250, 650);
        return <div className={`schedule-row build-slot${person.precedent ? " schedule-row--precedent" : ""}`} key={person.name} data-built={elapsed >= at}>
          <div className="schedule-person">{elapsed >= at && <><strong>{person.precedent ? <button onClick={() => onInspect(person.precedent)}>{person.name}</button> : person.name}</strong><small>{person.role}</small></>}</div>
          <div className="schedule-track">{elapsed >= at && <div className="schedule-bar" style={{left:`${(person.start - 1) / 14 * 100}%`,width:`${width}%`}} role="img" aria-label={`${person.name}, weeks ${person.start}–${person.end}, ${person.capacity}% weekly availability ceiling`}><span>{width > 20 ? `${person.capacity}%` : ""}</span></div>}</div>
          <span className="schedule-hours">{elapsed >= at + 650 && `${person.hours}h`}</span>
        </div>;
      })}
    </div>
    <p className="schedule-caption">Bars show confirmed windows; labels are weekly availability ceilings.</p>
    <div className="plan-review-gate build-slot" data-built={elapsed >= 8000}>{elapsed >= 8000 && <><div><strong>Avery’s assessment</strong><span>{assignment.effort}h · {assignment.due}</span></div><span className="gate-arrow" aria-hidden="true">→</span><div><strong>Sofia’s review</strong><span>Before the diagnostic baseline</span></div><SourceLink source="assignment" onInspect={onInspect}>Assignment basis</SourceLink></>}</div>
    <p className="plan-continuity build-slot">{elapsed >= 9000 && <>Harbor informs Avery’s evidence gate; Meridian informs Lena’s regional validation. Daniel’s W3 hold carries forward. <SourceLink source="availability" onInspect={onInspect}>Resource basis</SourceLink></>}</p>
    <div className="plan-execution build-slot" data-built={elapsed >= planTiming.reviewed} data-approved={execution.approved} data-verified={verified}>
      {!execution.approved ? <div className="plan-approval"><span>{execution.reviewed ? "Sofia reviewed plan v1. Ready for Margaret’s approval." : "Developing assignments and review coverage."}</span><button disabled={!execution.reviewed} onClick={onApprove}>Approve & set up <span aria-hidden="true">↗</span></button></div> : <>
        <div className="execution-heading"><span className="execution-check" aria-hidden="true">✓</span><strong>Margaret approved plan v1</strong><span>Approved basis retained</span></div>
        <div className="execution-receipts"><div><img src="/brand/systems/project-operations.svg" alt="" /><span>Project Operations</span><small>{execution.projectCreated ? "Project, deliverables & assignments created" : "Creating project & assignments…"}</small>{execution.projectCreated && <span className="execution-check" aria-label="Created">✓</span>}</div><div><img src="/brand/systems/sharepoint.svg" alt="" /><span>SharePoint</span><small>{execution.workspaceCreated ? "Approved plan workspace created" : "Preparing workspace…"}</small>{execution.workspaceCreated && <span className="execution-check" aria-label="Created">✓</span>}</div></div>
        <p className={`execution-readback${verified ? " is-verified" : ""}`}>{verified ? <><span aria-hidden="true">✓</span> Readback matched: Avery · {readbackAssignment.effort}h · {readbackAssignment.due} · Sofia reviews</> : execution.readbackReady ? `Readback differs on ${mismatches.join(", ")}. Review before finalizing.` : "Reading the resulting records back against approved plan v1…"}</p>
      </>}
    </div>
  </article>;
}

export function DeliveryArtifact({ elapsed, onInspect }) {
  const reviewed = elapsed >= 10000;
  return <article className="inline-artifact delivery-artifact" aria-label="Northstar data-readiness assessment" aria-busy={elapsed < 11900}>
    <header className="document-file"><img src="/brand/systems/word.svg" alt="Word" /><span>Northstar · Data-readiness assessment.docx</span><small>Firm template v1.2</small></header>
    <div className="assessment-layout"><div className="assessment-page">
      <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
      <p className="assessment-client">Northstar Foods</p><h3>Data-readiness assessment</h3><p className="assessment-byline">Avery Ross · Reviewer: Sofia Patel · {reviewed ? "Revision 2" : "Working draft"}</p>
      <section className="assessment-purpose build-slot">{elapsed >= 3100 && <><h4>Purpose and assessment basis</h4><p><BuildText elapsed={elapsed} at={3100} duration={650}>Establish which regional evidence can support the decision-rights diagnostic, with observed ownership kept separate from proposed design.</BuildText></p></>}</section>
      <div className="assessment-evidence"><div className="assessment-evidence-row build-slot">{elapsed >= 4200 && <><span>Coverage</span><strong>6 of 8 regional extracts</strong><small>West and Southeast outstanding</small></>}</div><div className="assessment-evidence-row build-slot">{elapsed >= 4900 && <><span>Ownership</span><strong>Northeast incomplete</strong><small>Affected decision owners need validation</small></>}</div><div className="assessment-evidence-row build-slot">{elapsed >= 5600 && <><span>Currency</span><strong>Central: prior quarter</strong><small>Confirm suitability for current decisions</small></>}</div></div>
      <section className="assessment-conclusion build-slot" data-revised={reviewed}>{elapsed >= 6600 && <><h4>Assessment and implications</h4><p>{reviewed ? <BuildText elapsed={elapsed} at={10000} duration={900}>Proceed with initial diagnostic work for the six supplied regions. Design decisions remain conditional on resolving ownership, currency and the missing regional evidence.</BuildText> : "Six regional extracts are available for the diagnostic. Ownership and currency gaps remain open."}</p></>}</section>
      <footer className="assessment-sources build-slot">{elapsed >= 11300 && <><SourceLink source="evidence" onInspect={onInspect}>Northstar evidence</SourceLink><SourceLink source="assignment" onInspect={onInspect}>Approved assignment</SourceLink></>}</footer>
    </div><aside className="assessment-margin" aria-label="Firm guidance and review">
      <div className="delivery-guidance build-slot">{elapsed >= 7100 && <><p className="margin-label">Carried into this work</p><SourceLink source="harbor" onInspect={onInspect}>Harbor · Sofia’s review</SourceLink><p>Retain source dates and disputed ownership. Keep observed evidence distinct from design.</p><SourceLink source="meridian" onInspect={onInspect}>Meridian · Lena’s matrix</SourceLink><p>Identify the service boundaries and handoffs each evidence gap affects.</p></>}</div>
      <div className={`assessment-review build-slot${reviewed ? " is-resolved" : ""}`}>{elapsed >= 8500 && <><strong>Sofia Patel <span>Review</span></strong><p>Explain what these gaps prevent us from concluding about design readiness.</p>{reviewed && <p className="review-resolution"><span aria-hidden="true">✓</span> Avery clarified the limits of the conclusion.</p>}</>}</div>
      <div className="delivery-record build-slot">{elapsed >= 11900 && <><p>Sources, feedback and revision rationale retained.</p><SourceLink source="record" onInspect={onInspect}>Engagement record</SourceLink></>}</div>
    </aside></div>
  </article>;
}

export default function DemoArtifact({ phase, elapsed, onInspect, onApprove }) {
  if (phase === "scope") return <ScopeArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (phase === "plan") return <PlanArtifact elapsed={elapsed} onInspect={onInspect} onApprove={onApprove} />;
  return <DeliveryArtifact elapsed={elapsed} onInspect={onInspect} />;
}

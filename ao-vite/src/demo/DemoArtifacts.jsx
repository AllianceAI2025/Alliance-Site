import React, { useEffect, useState } from "react";
import { assignment, effort, readbackAssignment, readbackProject, resources, workstreams } from "./northstar.js";
import { compareAssignment, deliveryStateAt, deliveryTiming, planExecutionAt, planTiming, progressAt, textAt } from "./demoPlayback.js";
import assessment from "./assessment.json";

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

function PSARecord({ verified }) {
  return <section className="psa-record build-slot" aria-label="Created Project Operations record" data-project-id={readbackProject.id}>
    <header className="psa-record-system"><img src="/brand/systems/project-operations.svg" alt="" /><span>Dynamics 365 Project Operations</span><small>Project created</small></header>
    <div className="psa-record-title"><div><p>{readbackProject.id}</p><h4>{readbackProject.name}</h4></div><span>{readbackProject.status}</span></div>
    <dl className="psa-record-fields">{[["Project manager", readbackProject.manager], ["Opportunity", readbackProject.opportunity], ["Start / finish", `${readbackProject.start} – ${readbackProject.finish}`], ["Planned effort", `${readbackProject.effort.toLocaleString()} hours`], ["Deliverables / resources", `${readbackProject.deliverables} deliverables · ${readbackProject.resources} resources`], ["Commitment baseline", readbackProject.baseline]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="psa-assignment-heading"><h4>Deliverable assignment · {readbackAssignment.id}</h4><span>{verified ? "Read back from PSA" : "Reading the created assignment…"}</span></div>
    <table className="psa-assignment"><thead><tr>{["Owner", "Deliverable", "Effort", "Due", "Reviewer"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody><tr>{[["Owner", readbackAssignment.owner], ["Deliverable", assignment.deliverable], ["Effort", `${readbackAssignment.effort}h`], ["Due", readbackAssignment.due], ["Reviewer", readbackAssignment.reviewer]].map(([label, value]) => <td data-label={label} key={label}>{value}</td>)}</tr></tbody></table>
    <p className="psa-record-origin">Source: Northstar plan v1 · Approved by Margaret Whitfield</p>
  </section>;
}

export function PlanArtifact({ elapsed, onInspect, onSubmit }) {
  const execution = planExecutionAt(elapsed);
  const [view, setView] = useState(execution.projectCreated ? "psa" : "plan");
  useEffect(() => { if (execution.projectCreated) setView("psa"); }, [execution.projectCreated]);
  const submitting = execution.reviewed && elapsed >= planTiming.approved - 600;
  const mismatches = compareAssignment(assignment, readbackAssignment);
  const verified = execution.readbackReady && mismatches.length === 0;
  return <article className="inline-artifact plan-artifact" aria-label="Northstar engagement plan" data-view={view} aria-busy={!execution.reviewed || (execution.approved && !execution.readbackReady)}>
    <ArtifactHead label={view === "psa" ? "Northstar Foods · Committed engagement plan" : "Northstar Foods · Engagement plan"} title={view === "psa" ? "Plan committed to Project Operations" : "Resources and delivery schedule"} meta={execution.approved ? "Approved plan v1" : "Reviewed plan v1"} elapsed={elapsed} finishedAt={planTiming.reviewed} />
    {execution.projectCreated && <nav className="artifact-view-tabs" aria-label="Plan and project records"><button aria-pressed={view === "plan"} onClick={() => setView("plan")}>Engagement plan</button><button aria-pressed={view === "psa"} onClick={() => setView("psa")}>PSA record</button></nav>}
    {view === "plan" ? <>
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
    </> : <PSARecord verified={verified} />}
    <div className="plan-execution build-slot" data-built={elapsed >= planTiming.reviewed} data-approved={execution.approved} data-verified={verified}>
      {!execution.approved ? <div className="plan-approval"><div className="plan-commit-copy"><strong>{execution.reviewed ? "Sofia reviewed plan v1. Ready to commit." : "Developing assignments and review coverage."}</strong><p><img src="/brand/systems/project-operations.svg" alt="" />Dynamics 365 Project Operations</p><span>Create the project, 14 deliverables and 6 resource assignments. File the approved plan in SharePoint.</span></div><button className={submitting ? "is-submitting" : undefined} disabled={!execution.reviewed || submitting} onClick={onSubmit}>{submitting ? "Submitting to PSA…" : "Approve & submit to PSA"}<span aria-hidden="true">↗</span></button></div> : <>
        <div className="execution-heading"><span className="execution-check" aria-hidden="true">✓</span><strong>Margaret approved and submitted plan v1 to PSA</strong><span>Approved baseline retained</span></div>
        {view === "plan" ? <div className="execution-receipts"><div><img src="/brand/systems/project-operations.svg" alt="" /><span>Project Operations · PSA</span><small>{execution.projectCreated ? `${readbackProject.id} · 14 deliverables & 6 assignments` : "Writing project, deliverables & assignments…"}</small>{execution.projectCreated && <span className="execution-check" aria-label="Created">✓</span>}</div><div><img src="/brand/systems/sharepoint.svg" alt="" /><span>SharePoint</span><small>{execution.workspaceCreated ? "Approved plan workspace created" : "Preparing workspace…"}</small>{execution.workspaceCreated && <span className="execution-check" aria-label="Created">✓</span>}</div></div> : <p className="psa-filing"><img src="/brand/systems/sharepoint.svg" alt="" />{execution.workspaceCreated ? "Approved plan filed in SharePoint" : "Filing the approved plan in SharePoint…"}</p>}
        <p className={`execution-readback${verified ? " is-verified" : ""}`}>{verified ? <><span aria-hidden="true">✓</span> PSA readback matched plan v1: Avery · {readbackAssignment.effort}h · {readbackAssignment.due} · Sofia reviews</> : execution.readbackReady ? `Readback differs on ${mismatches.join(", ")}. Review before finalizing.` : "Reading the PSA records back against approved plan v1…"}</p>
      </>}
    </div>
  </article>;
}

export function DeliveryArtifact({ elapsed, onInspect, onAction }) {
  const state = deliveryStateAt(elapsed);
  return <article className="inline-artifact delivery-artifact" aria-label="Northstar data-readiness assessment" aria-busy={!state.draftReady || (state.revising && !state.revised)} data-review-status={state.approved ? "approved" : state.feedbackReceived ? "feedback" : state.sentForReview ? "in-review" : "draft"} data-export-ready={state.exportReady}>
    <header className="document-file"><img src="/brand/systems/word.svg" alt="Word" /><span>Northstar · Data-readiness assessment.docx</span><small>{state.approved ? "Sofia approved revision 2" : "Firm template v1.2"}</small></header>
    <div className="assessment-layout"><div className="assessment-page">
      <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
      <p className="assessment-client">Northstar Foods</p><h3>Data-readiness assessment</h3><p className="assessment-byline">Avery Ross · Reviewer: Sofia Patel · {state.revising ? "Revision 2" : "Revision 1"}</p>
      <section className="assessment-purpose build-slot">{elapsed >= 3100 && <><h4>Purpose and assessment basis</h4><p><BuildText elapsed={elapsed} at={3100} duration={650}>{assessment.purpose}</BuildText></p></>}</section>
      <div className="assessment-evidence">{assessment.evidence.map((item, index) => <div className="assessment-evidence-row build-slot" key={item.label}>{elapsed >= 4200 + index * 700 && <><span>{item.label}</span><strong>{item.finding}</strong><small>{item.gap}</small></>}</div>)}</div>
      <section className="assessment-conclusion build-slot" data-revised={state.revising}>{elapsed >= 6600 && <><h4>Assessment and implications</h4><p>{state.revising ? <BuildText elapsed={elapsed} at={deliveryTiming.revising} duration={deliveryTiming.revised - deliveryTiming.revising}>{assessment.conclusion}</BuildText> : assessment.initialConclusion}</p></>}</section>
      <footer className="assessment-sources build-slot">{state.draftReady && <><SourceLink source="evidence" onInspect={onInspect}>Northstar evidence</SourceLink><SourceLink source="assignment" onInspect={onInspect}>Approved assignment</SourceLink></>}</footer>
    </div><aside className="assessment-margin" aria-label="Firm guidance and review">
      <div className="delivery-guidance build-slot">{elapsed >= 7100 && <><p className="margin-label">Carried into this work</p><SourceLink source="harbor" onInspect={onInspect}>Harbor · Sofia’s review</SourceLink><p>Retain source dates and disputed ownership. Keep observed evidence distinct from design.</p><SourceLink source="meridian" onInspect={onInspect}>Meridian · Lena’s matrix</SourceLink><p>Identify the service boundaries and handoffs each evidence gap affects.</p></>}</div>
      <div className={`assessment-review build-slot${state.revised ? " is-resolved" : ""}`} data-built={state.feedbackReceived}>{state.feedbackReceived && <><strong>Sofia Patel <span>Review of revision 1</span></strong><p>{assessment.reviewComment}</p>{state.revised && <p className="review-resolution"><span aria-hidden="true">✓</span> Avery clarified the limits of the conclusion and returned revision 2.</p>}{state.approved && <p className="review-approval">Sofia approved revision 2 for export.</p>}</>}</div>
      <div className="delivery-record build-slot" data-built={state.revised}>{state.revised && <><p>Review request, feedback, revision rationale and approval retained with their sources.</p><SourceLink source="record" onInspect={onInspect}>Engagement record</SourceLink></>}</div>
    </aside></div>
    <footer className="delivery-workflow build-slot" data-built={state.draftReady}>
      {state.draftReady && (!state.sentForReview ? <><div><strong>Avery’s draft is ready for review</strong><p>Send revision 1 and its supporting evidence to Sofia Patel.</p></div><button className={elapsed >= deliveryTiming.sentForReview - 600 ? "is-acting" : undefined} onClick={() => onAction("send")}>Send to Sofia for review <span aria-hidden="true">↗</span></button></> : !state.feedbackReceived ? <><div><strong>Avery sent revision 1 to Sofia</strong><p>Sofia is reviewing the assessment against the firm’s evidence standard.</p></div><span className="delivery-action-status"><i className="build-pulse" />In review</span></> : !state.revising ? <><div><strong>Sofia returned one review comment</strong><p>Explain which design decisions remain conditional on the evidence gaps.</p></div><button className={elapsed >= deliveryTiming.revising - 600 ? "is-acting" : undefined} onClick={() => onAction("revise")}>Address Sofia’s feedback <span aria-hidden="true">↗</span></button></> : !state.approved ? <><div><strong>{state.revised ? "Avery returned revision 2 to Sofia" : "Avery is addressing the review"}</strong><p>{state.revised ? "Sofia is checking the revised conclusion before approval." : "Clarifying design readiness using the evidence gaps and Harbor’s review standard."}</p></div><span className="delivery-action-status"><i className="build-pulse" />{state.revised ? "Final review" : "Revising"}</span></> : state.exportReady ? <><div className="delivery-export-file"><img src="/brand/systems/word.svg" alt="" /><div><strong>Northstar · Data-readiness assessment.docx</strong><p>Revision 2 · Sofia approved · Firm template v1.2</p></div></div><a className="delivery-download" href={assessment.downloadPath} download onClick={() => onAction("export")}>Download Word <span aria-hidden="true">↓</span></a></> : state.exporting ? <><div><strong>Exporting the approved assessment</strong><p>Preparing revision 2 in the firm’s Word template.</p></div><span className="delivery-action-status"><i className="build-pulse" />Preparing Word</span></> : <><div><strong>Sofia approved revision 2</strong><p>The finished assessment is ready to export in the firm’s Word template.</p></div><a className={elapsed >= deliveryTiming.exportStarted - 600 ? "is-acting" : undefined} href={assessment.downloadPath} download onClick={() => onAction("export")}>Export Word <span aria-hidden="true">↓</span></a></>)}
    </footer>
  </article>;
}

export default function DemoArtifact({ phase, elapsed, onInspect, onSubmit, onDeliveryAction }) {
  if (phase === "scope") return <ScopeArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (phase === "plan") return <PlanArtifact elapsed={elapsed} onInspect={onInspect} onSubmit={onSubmit} />;
  return <DeliveryArtifact elapsed={elapsed} onInspect={onInspect} onAction={onDeliveryAction} />;
}

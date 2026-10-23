import React from "react";
import { assignment, effort, historicalCases, readbackAssignment, readbackProject, resources, workstreams } from "./northstar.js";
import { compareAssignment, deliveryStateAt, deliveryTiming, planExecutionAt, planTiming, progressAt, scopeTiming, textAt } from "./demoPlayback.js";
import assessment from "./assessment.json";

function BuildText({ children, elapsed, at, duration = 500 }) {
  return <>{textAt(children, elapsed, at, duration)}</>;
}
function SourceLink({ source, children, onInspect }) {
  return <button className="artifact-source" onClick={() => onInspect(source)}>{children}<span aria-hidden="true">↗</span></button>;
}
function ArtifactHead({ label, title, meta, elapsed, finishedAt, at = 2700 }) {
  return <header className="artifact-head" data-follow-at={at}><div><p>{label}</p><h3>{title}</h3></div><span className="artifact-meta">{elapsed < finishedAt ? <><i className="build-pulse" />Developing</> : meta}</span></header>;
}

function PrecedentResponse({ elapsed, onInspect }) {
  return <article className="inline-artifact precedent-response" aria-label="Historical findings for Northstar">
    <ArtifactHead label="Firm delivery experience" title="What carries into Northstar" meta="2 engagement records" elapsed={elapsed} finishedAt={scopeTiming.meridianAt + 1000} at={scopeTiming.precedentAt} />
    <div className="precedent-findings">{historicalCases.map((record, index) => {
      const at = index ? scopeTiming.meridianAt : scopeTiming.harborAt;
      return <section className="precedent-finding" key={record.id} data-follow-at={at}>{elapsed >= at && <>
        <SourceLink source={record.id} onInspect={onInspect}>{record.name} · {record.reference}</SourceLink>
        <p className="precedent-conditions">{record.conditions}</p>
        <h4>{index ? "On-time delivery; slower adoption." : "Late validation forced another design pass."}</h4>
        <p>{record.outcome}</p>
        <p className="precedent-people">{index ? "Lena Torres built the ownership matrix; Jordan Hale developed the readiness roadmap." : "Avery Ross built the evidence pack; Daniel Okafor developed the design options. Sofia Patel reviewed both."}</p>
        <div className="precedent-review-change"><p><strong>Submitted v1</strong>{record.submitted}</p><p><strong>Reviewed v2</strong>{record.acceptedChange}</p></div>
        <div className="precedent-northstar"><strong>For Northstar</strong><p>{record.northstarAction}</p></div>
      </>}</section>;
    })}</div>
    <p className="precedent-transfer-limit">Northstar spans eight regions with a fixed November 20 board gate. These records inform the method and team fit; current availability is checked separately.</p>
  </article>;
}

export function ScopeArtifact({ elapsed, onInspect }) {
  if (elapsed < scopeTiming.draftAt) return <PrecedentResponse elapsed={elapsed} onInspect={onInspect} />;
  return <article className="inline-artifact scope-artifact" aria-label="Northstar engagement scope" aria-busy={elapsed < scopeTiming.finished}>
    <ArtifactHead label="Northstar Foods · Engagement scope" title="Operating model & decision rights" meta="Working draft" elapsed={elapsed} finishedAt={scopeTiming.finished} at={scopeTiming.draftAt} />
    <p className="artifact-purpose" data-follow-at={scopeTiming.draftAt + 100}><BuildText elapsed={elapsed} at={scopeTiming.draftAt + 100} duration={500}>Clearer decision ownership across eight regions, with normal service maintained and a board package by November 20.</BuildText></p>
    <div className="scope-basis"><span>Applied from</span><SourceLink source="harbor" onInspect={onInspect}>Harbor · HG-D01 / HG-D02</SourceLink><SourceLink source="meridian" onInspect={onInspect}>Meridian · MC-D01 / MC-D02</SourceLink></div>
    <section className="scope-workstreams"><h4>Four workstreams · fourteen weeks</h4>{workstreams.map((stream, index) => {
      const at = scopeTiming.workstreamsAt + index * 500;
      return <div className="scope-stream build-slot" key={stream.name} data-follow-at={at}>{elapsed >= at && <><div><strong><BuildText elapsed={elapsed} at={at} duration={300}>{stream.name}</BuildText></strong><span>W{stream.weeks}</span></div><p><BuildText elapsed={elapsed} at={at + 200} duration={350}>{stream.detail}</BuildText></p></>}</div>;
    })}</section>
    <section className="scope-resource-fit"><div className="artifact-section-heading"><h4>Proposed resource fit</h4>{elapsed >= scopeTiming.availabilityAt && <SourceLink source="availability" onInspect={onInspect}>Current availability</SourceLink>}</div>
      {[["Avery Ross", "Harbor · evidence pack", "75% available"], ["Lena Torres", "Meridian · regional ownership", "Available from W3"], ["Daniel Okafor", "Harbor · operating-model options", "Conditional W3 hold"]].map(([name, experience, availability], index) => {
        const at = scopeTiming.resourcesAt + index * 600;
        return <div className="resource-fit-row build-slot" key={name} data-follow-at={at}>{elapsed >= at && <><strong>{name}</strong><span>{experience}</span><small>{elapsed >= scopeTiming.availabilityAt + index * 250 ? availability : "Checking availability…"}</small></>}</div>;
      })}
    </section>
    <footer className="artifact-footer build-slot" data-follow-at={scopeTiming.finished}>{elapsed >= scopeTiming.finished && <><span>Implementation excluded. West and Southeast participation remains a client dependency.</span><SourceLink source="discovery" onInspect={onInspect}>Client context</SourceLink></>}</footer>
  </article>;
}

function PSARecord({ verified }) {
  return <section className="psa-record build-slot" aria-label="Created Project Operations record" data-project-id={readbackProject.id}>
    <header className="psa-record-system"><img src="/brand/systems/project-operations.svg" alt="" /><span>Dynamics 365 Project Operations</span><small>Project created</small></header>
    <div className="psa-record-title" data-follow-at={planTiming.projectCreated}><div><p>{readbackProject.id}</p><h4>{readbackProject.name}</h4></div><span>{readbackProject.status}</span></div>
    <dl className="psa-record-fields" data-follow-at={planTiming.projectCreated + 700}>{[["Project manager", readbackProject.manager], ["Opportunity", readbackProject.opportunity], ["Start / finish", `${readbackProject.start} – ${readbackProject.finish}`], ["Planned effort", `${readbackProject.effort.toLocaleString()} hours`], ["Deliverables / resources", `${readbackProject.deliverables} deliverables · ${readbackProject.resources} resources`], ["Commitment baseline", readbackProject.baseline]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="psa-assignment-heading"><h4>Deliverable assignment · {readbackAssignment.id}</h4><span>{verified ? "Read back from PSA" : "Reading the created assignment…"}</span></div>
    <table className="psa-assignment" data-follow-at={planTiming.workspaceCreated}><thead><tr>{["Owner", "Deliverable", "Effort", "Due", "Reviewer"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody><tr>{[["Owner", readbackAssignment.owner], ["Deliverable", assignment.deliverable], ["Effort", `${readbackAssignment.effort}h`], ["Due", readbackAssignment.due], ["Reviewer", readbackAssignment.reviewer]].map(([label, value]) => <td data-label={label} key={label}>{value}</td>)}</tr></tbody></table>
    <p className="psa-record-origin">Source: Northstar plan v1 · Approved by Margaret Whitfield</p>
  </section>;
}

function PSAWrite() {
  return <section className="psa-write" aria-label="Submitting approved plan to Project Operations" data-follow-at={planTiming.approved}>
    <div><img src="/brand/systems/project-operations.svg" alt="" /><div><strong>Dynamics 365 Project Operations</strong><p>Creating Northstar’s project, 14 deliverables and 6 resource assignments.</p></div><i className="build-pulse" /></div>
    <div><img src="/brand/systems/sharepoint.svg" alt="" /><div><strong>SharePoint</strong><p>Preparing the approved plan and its linked engagement workspace.</p></div></div>
    <p>Source: plan v1 · Margaret’s approval retained with the write request.</p>
  </section>;
}

export function PlanArtifact({ elapsed, onInspect }) {
  const execution = planExecutionAt(elapsed);
  const view = execution.approved ? "psa" : "plan";
  const mismatches = compareAssignment(assignment, readbackAssignment);
  const verified = execution.readbackReady && mismatches.length === 0;
  return <article className="inline-artifact plan-artifact" aria-label="Northstar engagement plan" data-view={view} aria-busy={!execution.reviewed || (execution.approved && !execution.readbackReady)}>
    <ArtifactHead label={view === "psa" ? "Northstar Foods · Approved engagement plan" : "Northstar Foods · Engagement plan"} title={execution.projectCreated ? "Plan committed to Project Operations" : execution.approved ? "Submitting plan to Project Operations" : "Resources and delivery schedule"} meta={execution.approved ? "Approved plan v1" : "Reviewed plan v1"} elapsed={elapsed} finishedAt={planTiming.reviewed} />
    {view === "plan" ? <>
    <div className="plan-basis"><SourceLink source="accepted" onInspect={onInspect}>Accepted proposal v5</SourceLink><span>14 weeks</span><span>{effort.toLocaleString()} hours</span><span>14 deliverables</span><span>August 17 – November 20</span></div>
    <div className="resource-schedule" role="group" aria-label="Resources across fourteen weeks">
      <div className="schedule-axis"><span>Resources</span><div>{[1, 4, 8, 12, 14].map(week => <span key={week}>W{week}</span>)}</div><span>Effort</span></div>
      {resources.map((person, index) => {
        const at = 3300 + index * 650;
        const width = (person.end - person.start + 1) / 14 * 100 * progressAt(elapsed, at + 250, 650);
        return <div className={`schedule-row build-slot${person.precedent ? " schedule-row--precedent" : ""}`} key={person.name} data-follow-at={at}>
          <div className="schedule-person">{elapsed >= at && <><strong>{person.precedent ? <button onClick={() => onInspect(person.precedent)}>{person.name}</button> : person.name}</strong><small>{person.role}</small></>}</div>
          <div className="schedule-track">{elapsed >= at && <div className="schedule-bar" style={{left:`${(person.start - 1) / 14 * 100}%`,width:`${width}%`}} role="img" aria-label={`${person.name}, weeks ${person.start}–${person.end}, ${person.capacity}% weekly availability ceiling`}><span>{width > 20 ? `${person.capacity}%` : ""}</span></div>}</div>
          <span className="schedule-hours">{elapsed >= at + 650 && `${person.hours}h`}</span>
        </div>;
      })}
    </div>
    <p className="schedule-caption">Bars show confirmed windows; labels are weekly availability ceilings.</p>
    <div className="plan-review-gate build-slot" data-follow-at={8000}>{elapsed >= 8000 && <><div><strong>Avery’s assessment</strong><span>{assignment.effort}h · {assignment.due}</span></div><span className="gate-arrow" aria-hidden="true">→</span><div><strong>Sofia’s review</strong><span>Before the diagnostic baseline</span></div><SourceLink source="assignment" onInspect={onInspect}>Assignment basis</SourceLink></>}</div>
    <p className="plan-continuity build-slot" data-follow-at={9000}>{elapsed >= 9000 && <>Harbor informs Avery’s evidence gate; Meridian informs Lena’s regional validation. Daniel’s W3 hold carries forward. <SourceLink source="availability" onInspect={onInspect}>Resource basis</SourceLink></>}</p>
    </> : execution.projectCreated ? <PSARecord verified={verified} /> : <PSAWrite />}
    <div className="plan-execution build-slot" data-follow-at={execution.readbackReady ? planTiming.verified : planTiming.reviewed} data-approved={execution.approved} data-verified={verified}>
      {!execution.approved ? <div className="plan-approval"><div className="plan-commit-copy"><strong>{execution.reviewed ? "Sofia reviewed plan v1. Ready for Margaret’s approval." : "Developing assignments and review coverage."}</strong><p><img src="/brand/systems/project-operations.svg" alt="" />Dynamics 365 Project Operations</p><span>The reviewed plan retains the accepted proposal, resource windows and assignment rationale.</span></div></div> : execution.projectCreated && <>
        <div className="execution-heading"><span className="execution-check" aria-hidden="true">✓</span><strong>Margaret approved and submitted plan v1 to PSA</strong><span>Approved baseline retained</span></div>
        {view === "plan" ? <div className="execution-receipts"><div><img src="/brand/systems/project-operations.svg" alt="" /><span>Project Operations · PSA</span><small>{execution.projectCreated ? `${readbackProject.id} · 14 deliverables & 6 assignments` : "Writing project, deliverables & assignments…"}</small>{execution.projectCreated && <span className="execution-check" aria-label="Created">✓</span>}</div><div><img src="/brand/systems/sharepoint.svg" alt="" /><span>SharePoint</span><small>{execution.workspaceCreated ? "Approved plan workspace created" : "Preparing workspace…"}</small>{execution.workspaceCreated && <span className="execution-check" aria-label="Created">✓</span>}</div></div> : <p className="psa-filing"><img src="/brand/systems/sharepoint.svg" alt="" />{execution.workspaceCreated ? "Approved plan filed in SharePoint" : "Filing the approved plan in SharePoint…"}</p>}
        <p className={`execution-readback${verified ? " is-verified" : ""}`}>{verified ? <><span aria-hidden="true">✓</span> PSA readback matched plan v1: Avery · {readbackAssignment.effort}h · {readbackAssignment.due} · Sofia reviews</> : execution.readbackReady ? `Readback differs on ${mismatches.join(", ")}. Review before finalizing.` : "Reading the PSA records back against approved plan v1…"}</p>
      </>}
    </div>
  </article>;
}

export function DeliveryArtifact({ elapsed, onInspect }) {
  const state = deliveryStateAt(elapsed);
  return <article className="inline-artifact delivery-artifact" aria-label="Northstar data-readiness assessment" aria-busy={!state.draftReady || (state.revising && !state.revised)} data-review-status={state.approved ? "approved" : state.feedbackReceived ? "feedback" : state.sentForReview ? "in-review" : "draft"} data-export-ready={state.exportReady}>
    <header className="document-file"><img src="/brand/systems/word.svg" alt="Word" /><span>Northstar · Data-readiness assessment.docx</span><small>{state.approved ? "Sofia approved revision 2" : "Firm template v1.2"}</small></header>
    <div className="assessment-layout"><div className="assessment-page">
      <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
      <p className="assessment-client">Northstar Foods</p><h3>Data-readiness assessment</h3><p className="assessment-byline">Avery Ross · Reviewer: Sofia Patel · {state.revising ? "Revision 2" : "Revision 1"}</p>
      <section className="assessment-purpose build-slot" data-follow-at={3100}>{elapsed >= 3100 && <><h4>Purpose and assessment basis</h4><p><BuildText elapsed={elapsed} at={3100} duration={650}>{assessment.purpose}</BuildText></p></>}</section>
      <div className="assessment-evidence">{assessment.evidence.map((item, index) => {
        const reviseAt = deliveryTiming.revisionContent + index * 500;
        return <div className="assessment-evidence-row build-slot" key={item.label} data-follow-at={state.revising ? reviseAt : 4200 + index * 700}>{elapsed >= 4200 + index * 700 && <><span>{item.label}</span><strong>{item.finding}</strong><small>{item.gap}</small>{elapsed >= reviseAt && <p className="assessment-evidence-implication"><BuildText elapsed={elapsed} at={reviseAt} duration={450}>{item.implication}</BuildText></p>}</>}</div>;
      })}</div>
      <section className="assessment-conclusion build-slot" data-follow-at={state.revising ? deliveryTiming.conclusionContent : 6600} data-revised={elapsed >= deliveryTiming.conclusionContent}>{elapsed >= 6600 && <><h4>Assessment and implications</h4><p>{elapsed >= deliveryTiming.conclusionContent ? <BuildText elapsed={elapsed} at={deliveryTiming.conclusionContent} duration={deliveryTiming.revised - deliveryTiming.conclusionContent}>{assessment.conclusion}</BuildText> : assessment.initialConclusion}</p></>}</section>
      <footer className="assessment-sources build-slot">{state.draftReady && <><SourceLink source="evidence" onInspect={onInspect}>Northstar evidence</SourceLink><SourceLink source="assignment" onInspect={onInspect}>Approved assignment</SourceLink></>}</footer>
    </div><aside className="assessment-margin" aria-label="Firm guidance and review">
      <div className="delivery-guidance build-slot" data-follow-at={7100}>{elapsed >= 7100 && <><p className="margin-label">Carried into this work</p><SourceLink source="harbor" onInspect={onInspect}>Harbor · Sofia’s review</SourceLink><p>Retain source dates and disputed ownership. Keep observed evidence distinct from design.</p><SourceLink source="meridian" onInspect={onInspect}>Meridian · Lena’s matrix</SourceLink><p>Identify the service boundaries and handoffs each evidence gap affects.</p></>}</div>
      <div className={`assessment-review build-slot${state.revised ? " is-resolved" : ""}`} data-follow-at={state.revised ? deliveryTiming.revised : deliveryTiming.feedbackReceived}>{state.feedbackReceived && <><strong>Sofia Patel <span>Review of revision 1</span></strong><p>{assessment.reviewComment}</p>{state.revised && <p className="review-resolution"><span aria-hidden="true">✓</span> Avery clarified the limits of the conclusion and returned revision 2.</p>}{state.approved && <p className="review-approval">Sofia approved revision 2 for export.</p>}</>}</div>
      <div className="delivery-record build-slot" data-follow-at={deliveryTiming.approved}>{state.revised && <><p>Review request, feedback, revision rationale and approval retained with their sources.</p><SourceLink source="record" onInspect={onInspect}>Engagement record</SourceLink></>}</div>
    </aside></div>
    <footer className="delivery-workflow build-slot" data-follow-at={state.exportReady ? deliveryTiming.exportReady : state.exporting ? deliveryTiming.exportStarted : state.sentForReview && !state.feedbackReceived ? deliveryTiming.sentForReview : deliveryTiming.draftReady}>
      {state.draftReady && (!state.sentForReview ? <><div><strong>Avery’s draft is ready for review</strong><p>Revision 1 and its supporting evidence are ready for Sofia.</p></div><span className="delivery-action-status">Draft ready</span></> : !state.feedbackReceived ? <><div><strong>Avery sent revision 1 to Sofia</strong><p>Sofia is reviewing the assessment against the firm’s evidence standard.</p></div><span className="delivery-action-status"><i className="build-pulse" />In review</span></> : !state.revising ? <><div><strong>Sofia returned one review comment</strong><p>Explain which design decisions remain conditional on the evidence gaps.</p></div><span className="delivery-action-status">Feedback received</span></> : !state.approved ? <><div><strong>{state.revised ? "Avery returned revision 2 to Sofia" : "Avery is addressing the review"}</strong><p>{state.revised ? "Sofia is checking the revised conclusion before approval." : "Clarifying design readiness using the evidence gaps and Harbor’s review standard."}</p></div><span className="delivery-action-status"><i className="build-pulse" />{state.revised ? "Final review" : "Revising"}</span></> : state.exportReady ? <><div className="delivery-export-file"><img src="/brand/systems/word.svg" alt="" /><div><strong>Northstar · Data-readiness assessment.docx</strong><p>Exported · Revision 2 · Sofia approved · Firm template v1.2</p></div></div><a className="delivery-download" href={assessment.downloadPath} download>View Word document <span aria-hidden="true">↓</span></a></> : state.exporting ? <><div><strong>Avery is exporting the approved assessment</strong><p>Preparing revision 2 in the firm’s Word template.</p></div><span className="delivery-action-status"><i className="build-pulse" />Preparing Word</span></> : <><div><strong>Sofia approved revision 2</strong><p>The approved version is ready for Avery’s export request.</p></div><span className="delivery-action-status">Approved for export</span></>)}
    </footer>
  </article>;
}

export default function DemoArtifact({ phase, elapsed, onInspect }) {
  if (phase === "scope") return <ScopeArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (phase === "plan") return <PlanArtifact elapsed={elapsed} onInspect={onInspect} />;
  return <DeliveryArtifact elapsed={elapsed} onInspect={onInspect} />;
}

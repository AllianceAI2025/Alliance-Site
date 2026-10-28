import React from "react";
import { PsaMark } from "./PsaMark.jsx";
import { psaSystem } from "./psaSystem.js";
import { approvedPlan, assessmentFileName, assessmentFormatName, assignment, effort, historicalCases, readbackAssignment, readbackPlan, readbackProject, resources, staffingCandidates, workstreams } from "./northstar.js";
import { compareAssignment, comparePlan, deliveryStateAt, deliveryTiming, planExecutionAt, planTiming, precedentBuildAt, progressAt, scopeTiming, textAt } from "./demoPlayback.js";
import assessment from "./assessment.json";

function BuildText({ children, elapsed, at, duration = 500 }) {
  return <>{textAt(children, elapsed, at, duration)}</>;
}
function SourceLink({ source, children, onInspect }) {
  return <button className="artifact-source" onClick={() => onInspect(source)}>{children}<span aria-hidden="true">↗</span></button>;
}
function ArtifactHead({ label, title, meta, elapsed, finishedAt = 0, at = 2700 }) {
  return <header className="artifact-head" data-follow-at={at}><div><p>{label}</p><h3>{title}</h3></div>{elapsed >= finishedAt && meta && <span className="artifact-meta">{meta}</span>}</header>;
}

function PrecedentResponse({ elapsed, onInspect }) {
  return <article className="inline-artifact precedent-response" aria-label="Historical findings for Northstar">
    <ArtifactHead label={<BuildText elapsed={elapsed} at={scopeTiming.precedentAt} duration={400}>Firm delivery experience</BuildText>} title={<BuildText elapsed={elapsed} at={scopeTiming.precedentAt + 100} duration={500}>What carries into Northstar</BuildText>} meta="2 engagement records" elapsed={elapsed} finishedAt={scopeTiming.historyFinished} at={scopeTiming.precedentAt} />
    <div className="precedent-findings">{historicalCases.map((record, index) => {
      const at = index ? scopeTiming.meridianAt : scopeTiming.harborAt;
      const build = precedentBuildAt(at);
      return <section className="precedent-finding" key={record.id}>{elapsed >= at && <>
        <SourceLink source={record.id} onInspect={onInspect}><BuildText elapsed={elapsed} at={build.source} duration={250}>{`${record.name} · ${record.reference}`}</BuildText></SourceLink>
        {elapsed >= build.conditions && <p className="precedent-conditions" data-follow-at={build.conditions}><BuildText elapsed={elapsed} at={build.conditions} duration={300}>{record.conditions}</BuildText></p>}
        {elapsed >= build.finding && <h4 data-follow-at={build.finding}><BuildText elapsed={elapsed} at={build.finding} duration={350}>{index ? "On-time delivery; slower adoption." : "Late validation forced another design pass."}</BuildText></h4>}
        {elapsed >= build.outcome && <p data-follow-at={build.outcome}><BuildText elapsed={elapsed} at={build.outcome} duration={300}>{record.outcome}</BuildText></p>}
        {elapsed >= build.people && <p className="precedent-people" data-follow-at={build.people}><BuildText elapsed={elapsed} at={build.people} duration={500}>{index ? "Lena Torres built the ownership matrix; Jordan Hale developed the readiness roadmap." : "Avery Ross built the evidence pack; Daniel Okafor developed the design options. Sofia Patel reviewed both."}</BuildText></p>}
        <div className="precedent-review-change">{elapsed >= build.submitted && <p data-follow-at={build.submitted}><strong>Submitted v1</strong><BuildText elapsed={elapsed} at={build.submitted} duration={400}>{record.submitted}</BuildText></p>}{elapsed >= build.reviewed && <p data-follow-at={build.reviewed}><strong>Reviewed v2</strong><BuildText elapsed={elapsed} at={build.reviewed} duration={500}>{record.acceptedChange}</BuildText></p>}</div>
        {elapsed >= build.application && <div className="precedent-northstar" data-follow-at={build.application}><strong>For Northstar</strong><p><BuildText elapsed={elapsed} at={build.application} duration={600}>{record.northstarAction}</BuildText></p></div>}
      </>}</section>;
    })}</div>
    {elapsed >= scopeTiming.historyFinished - 500 && <p className="precedent-transfer-limit" data-follow-at={scopeTiming.historyFinished - 500}><BuildText elapsed={elapsed} at={scopeTiming.historyFinished - 500} duration={400}>Northstar spans eight regions with a fixed November 20 board gate. These records inform the method and team fit; current availability is checked separately.</BuildText></p>}
  </article>;
}

export function ScopeArtifact({ elapsed, onInspect }) {
  return <article className="inline-artifact scope-artifact" aria-label="Northstar engagement scope" aria-busy={elapsed < scopeTiming.finished}>
    <ArtifactHead label="Northstar Foods · Engagement scope" title="Operating model & decision rights" meta="Working draft" elapsed={elapsed} finishedAt={scopeTiming.finished} at={scopeTiming.draftAt} />
    <p className="artifact-purpose" data-follow-at={scopeTiming.draftAt + 100}><BuildText elapsed={elapsed} at={scopeTiming.draftAt + 100} duration={500}>Clearer decision ownership across eight regions, with normal service maintained and a board package by November 20.</BuildText></p>
    <div className="scope-basis"><span>Applied from</span><SourceLink source="harbor" onInspect={onInspect}>Harbor · HG-D01 / HG-D02</SourceLink><SourceLink source="meridian" onInspect={onInspect}>Meridian · MC-D01 / MC-D02</SourceLink></div>
    <section className="scope-workstreams"><h4>Four workstreams · fourteen weeks</h4>{workstreams.map((stream, index) => {
      const at = scopeTiming.workstreamsAt + index * 500;
      return <div className="scope-stream build-slot" key={stream.name} data-follow-at={at}>{elapsed >= at && <><div><strong><BuildText elapsed={elapsed} at={at} duration={300}>{stream.name}</BuildText></strong><span>W{stream.weeks}</span></div><p><BuildText elapsed={elapsed} at={at + 200} duration={350}>{stream.detail}</BuildText></p></>}</div>;
    })}</section>
    <footer className="artifact-footer build-slot" data-follow-at={scopeTiming.finished}>{elapsed >= scopeTiming.finished && <><span>Implementation excluded. West and Southeast participation remains a client dependency.</span><SourceLink source="discovery" onInspect={onInspect}>Client context</SourceLink></>}</footer>
  </article>;
}

function StaffingArtifact({ elapsed, onInspect }) {
  return <article className="inline-artifact staffing-artifact" aria-label="Proposed Northstar team" aria-busy={elapsed < scopeTiming.staffingFinished}>
    <ArtifactHead label="Northstar Foods · Staffing basis" title="People to put forward" meta="Proposed allocation" elapsed={elapsed} finishedAt={scopeTiming.staffingFinished} at={scopeTiming.staffingAt} />
    <table className="staffing-table"><thead><tr><th>Resource</th><th>Relevant delivery experience</th><th>Current window</th><th>Proposed effort</th></tr></thead><tbody>{staffingCandidates.map((person, index) => {
      const at = scopeTiming.candidatesAt + index * 550;
      return <tr key={person.name} data-follow-at={at}>{elapsed >= at && <><td data-label="Resource"><strong><BuildText elapsed={elapsed} at={at} duration={200}>{person.name}</BuildText></strong><small>{person.role}</small></td><td data-label="Relevant experience"><SourceLink source={person.source} onInspect={onInspect}><BuildText elapsed={elapsed} at={at + 100} duration={350}>{person.experience}</BuildText></SourceLink></td><td data-label="Current window"><BuildText elapsed={elapsed} at={at + 200} duration={300}>{`W${person.start}–${person.end} · ${person.capacity}%${person.conditional ? " · conditional hold" : " available"}`}</BuildText></td><td data-label="Proposed effort">{elapsed >= at + 450 && `${person.hours}h`}</td></>}</tr>;
    })}</tbody></table>
    {elapsed >= scopeTiming.availabilityAt && <p className="staffing-basis" data-follow-at={scopeTiming.availabilityAt}><strong>{effort.toLocaleString()} hours · 14 weeks · 6 people</strong><SourceLink source="availability" onInspect={onInspect}>Current resource confirmation</SourceLink></p>}
    {elapsed >= scopeTiming.staffingFinished && <p className="staffing-conditions" data-follow-at={scopeTiming.staffingFinished}>Daniel’s Week 3 release remains conditional. Sofia’s review window ends in Week 10; Margaret covers later gates. Feasibility review and conditional holds precede proposal commitment; allocations follow acceptance and plan approval.</p>}
  </article>;
}

function PlanWorkbreakdown({ elapsed, written = false }) {
  const plan = written ? readbackPlan : approvedPlan;
  const start = written ? planTiming.deliverablesWrittenAt : planTiming.deliverablesAt;
  const step = written ? 320 : 260;
  if (elapsed < start) return null;
  return <section className="plan-workbreakdown" aria-label={written ? "Four workstreams and fourteen committed deliverables" : "Four workstreams and fourteen planned deliverables"}>
    <h4 data-follow-at={start}>Workstreams and deliverables <span>{written ? `Written to ${psaSystem.name}` : "Plan v1"}</span></h4>
    {plan.workstreams.map(stream => {
      const tasks = plan.deliverables.filter(item => item.stream === stream.id);
      const firstAt = start + plan.deliverables.indexOf(tasks[0]) * step;
      if (elapsed < firstAt) return null;
      return <section className="plan-workstream" key={stream.id} data-workstream={stream.id}>
        <header><strong>{stream.name}</strong><span>W{stream.weeks}</span></header>
        {tasks.map(task => {
          const at = start + plan.deliverables.indexOf(task) * step;
          if (elapsed < at) return null;
          return <div className="plan-deliverable" key={task.id} data-deliverable-id={task.id} data-record-id={task.recordId} data-follow-at={at}>
            <div className="plan-deliverable-content"><small>{task.id}{written ? ` · ${task.recordId}` : ""}</small><strong><BuildText elapsed={elapsed} at={at} duration={130}>{task.title}</BuildText></strong><p><BuildText elapsed={elapsed} at={at + 100} duration={150}>{task.acceptance}</BuildText></p>{task.dependsOn.length > 0 && <small>Requires {task.dependsOn.join(" · ")} before acceptance</small>}</div>
            <div className="plan-deliverable-owner"><strong>{task.owner}</strong><span>Review · {task.reviewer}</span>{task.effort && <small>{task.effort}h assignment</small>}</div>
            <div className="plan-deliverable-date"><span>{task.start} –</span><strong>{task.due}</strong></div>
          </div>;
        })}
      </section>;
    })}
    <p className="plan-dependency-note">Dependencies apply at acceptance; preparation can overlap. Resource allocations cover delivery, review and engagement management.</p>
  </section>;
}

function PlanMilestones({ elapsed, written = false }) {
  const plan = written ? readbackPlan : approvedPlan;
  const start = written ? planTiming.milestonesWrittenAt : planTiming.milestonesAt;
  if (elapsed < start) return null;
  return <section className="plan-milestones" aria-label={written ? "Committed review gates" : "Planned review gates"}><h4>Review and client decision gates</h4>{plan.milestones.map((gate, index) => {
    const at = start + index * 250;
    return elapsed >= at && <div key={gate.id} data-gate-id={gate.id} data-follow-at={at}><div><strong>{gate.title}</strong><span>{gate.reviewer} · {gate.requires.join(" / ")}</span></div><span>{gate.due}</span></div>;
  })}</section>;
}

function PSARecord({ elapsed, verified }) {
  return <section className="psa-record build-slot" aria-label={`Created ${psaSystem.name} record`} data-project-id={readbackProject.id}>
    <header className="psa-record-system"><PsaMark />{!psaSystem.logo && <span>{psaSystem.name}</span>}<small>{verified ? "Complete plan verified" : "Project created"}</small></header>
    <div className="psa-record-title" data-follow-at={planTiming.projectCreated}><div><p>{readbackProject.id}</p><h4>{readbackProject.name}</h4></div><span>{readbackProject.status}</span></div>
    <dl className="psa-record-fields" data-follow-at={planTiming.projectCreated + 200}>{[["Project manager", readbackProject.manager], ["Opportunity", readbackProject.opportunity], ["Start / finish", `${readbackProject.start} – ${readbackProject.finish}`], ["Planned effort", `${readbackProject.effort.toLocaleString()} hours`], ["Commitment", "$400,000 · 40 / 40 / 20 billing"], ["Commitment baseline", `${readbackProject.proposal} · ${readbackProject.baseline}`]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <p className="psa-plan-boundary">{readbackProject.objective} {readbackProject.boundary}</p>
    {elapsed >= planTiming.resourcesWrittenAt && <section className="psa-bookings" aria-label="Six committed resource allocations"><h4>Resource allocations <span>1,840 hours across six people</span></h4>{readbackPlan.resources.map((person, index) => {
      const at = planTiming.resourcesWrittenAt + index * 450;
      return elapsed >= at && <div className="psa-booking" key={person.id} data-booking-id={person.id} data-follow-at={at}><div><strong>{person.name}</strong><span>{person.role}</span></div><span>W{person.start}–{person.end}<small>{person.capacity}% ceiling</small></span><strong>{person.hours}h</strong></div>;
    })}</section>}
    <div className="psa-plan-detail"><PlanWorkbreakdown elapsed={elapsed} written /><PlanMilestones elapsed={elapsed} written /></div>
    {elapsed >= planTiming.workspaceCreated && <p className="psa-record-origin" data-follow-at={planTiming.workspaceCreated}>Complete plan v1 and the accepted proposal linked to {readbackProject.id}. Avery’s {readbackAssignment.effort}h assessment assignment retained as {readbackAssignment.id}. Approved by Margaret Whitfield.</p>}
  </section>;
}

function PSAWrite() {
  return <section className="psa-write" aria-label={`Submitting approved plan to ${psaSystem.name}`} data-follow-at={planTiming.approved}>
    <div><PsaMark /><div>{!psaSystem.logo && <strong>{psaSystem.name}</strong>}<p>Creating the complete plan: four workstreams, fourteen deliverables with dependencies and acceptance criteria, six resource allocations and four review gates.</p></div><i className="build-pulse" /></div>
    <div><img src="/brand/systems/sharepoint.svg" alt="" /><div><strong>SharePoint</strong><p>Preparing the approved plan and its linked engagement workspace.</p></div></div>
    <p>Source: plan v1 · Margaret’s approval retained with the write request.</p>
  </section>;
}

export function PlanArtifact({ elapsed, onInspect }) {
  const execution = planExecutionAt(elapsed);
  return <article className="inline-artifact plan-artifact" aria-label="Northstar engagement plan" data-view="plan" aria-busy={!execution.reviewed}>
    <ArtifactHead label="Northstar Foods · Engagement plan" title="Resources and delivery schedule" meta="Reviewed plan v1" elapsed={elapsed} finishedAt={planTiming.reviewed} />
    <div className="plan-basis"><SourceLink source="accepted" onInspect={onInspect}>Accepted proposal v5</SourceLink><span>14 weeks</span><span>{effort.toLocaleString()} hours</span><span>14 deliverables</span><span>August 17 – November 20</span></div>
    <div className="resource-schedule" role="group" aria-label="Resources across fourteen weeks">
      <div className="schedule-axis"><span>Resources</span><div>{[1, 4, 8, 12, 14].map(week => <span key={week}>W{week}</span>)}</div><span>Effort</span></div>
      {resources.map((person, index) => {
        const at = 3300 + index * 650;
        if (elapsed < at) return null;
        const width = (person.end - person.start + 1) / 14 * 100 * progressAt(elapsed, at + 250, 650);
        return <div className={`schedule-row build-slot${person.precedent ? " schedule-row--precedent" : ""}`} key={person.name} data-follow-at={at}>
          <div className="schedule-person"><strong>{person.precedent ? <button onClick={() => onInspect(person.precedent)}>{person.name}</button> : person.name}</strong><small>{person.role}</small></div>
          <div className="schedule-track"><div className="schedule-bar" style={{left:`${(person.start - 1) / 14 * 100}%`,width:`${width}%`}} role="img" aria-label={`${person.name}, weeks ${person.start}–${person.end}, ${person.capacity}% weekly availability ceiling`}><span>{width > 20 ? `${person.capacity}%` : ""}</span></div></div>
          <span className="schedule-hours">{elapsed >= at + 650 && `${person.hours}h`}</span>
        </div>;
      })}
    </div>
    <p className="schedule-caption">Bars show confirmed windows; labels are weekly availability ceilings.</p>
    {elapsed >= 8000 && <div className="plan-review-gate" data-follow-at={8000}><div><strong>Avery’s assessment</strong><span>{assignment.effort}h · {assignment.due}</span></div><span className="gate-arrow" aria-hidden="true">→</span><div><strong>Sofia’s review</strong><span>Before the diagnostic baseline</span></div><SourceLink source="assignment" onInspect={onInspect}>Assignment basis</SourceLink></div>}
    {elapsed >= 9000 && <p className="plan-continuity" data-follow-at={9000}>Harbor informs Avery’s evidence gate; Meridian informs Lena’s regional validation. Daniel’s W3 release is confirmed. <SourceLink source="availability" onInspect={onInspect}>Resource basis</SourceLink></p>}
    <PlanWorkbreakdown elapsed={elapsed} />
    <PlanMilestones elapsed={elapsed} />
    {execution.reviewed && <p className="plan-reviewed" data-follow-at={planTiming.reviewed}>Sofia reviewed plan v1. The accepted scope, proposed team and assignment rationale remain linked to this version.</p>}
  </article>;
}

function PlanCommitArtifact({ elapsed }) {
  const execution = planExecutionAt(elapsed);
  const mismatches = [...comparePlan(approvedPlan, readbackPlan), ...compareAssignment(assignment, readbackAssignment)];
  const verified = execution.readbackReady && mismatches.length === 0;
  return <article className="inline-artifact plan-artifact plan-commit-artifact" aria-label={`${psaSystem.name} submission`} data-view="psa" aria-busy={!execution.readbackReady}>
    <ArtifactHead label="Northstar Foods · Approved plan v1" title={execution.readbackReady ? `Complete plan committed to ${psaSystem.name}` : "Committing the engagement plan"} elapsed={elapsed} at={planTiming.submissionAt} />
    {execution.projectCreated ? <PSARecord elapsed={elapsed} verified={verified} /> : <PSAWrite />}
    <div className="plan-execution" data-follow-at={planTiming.verified} data-approved={execution.approved} data-verified={verified}>{execution.readbackReady && <>
      <div className="execution-heading"><span className="execution-check" aria-hidden="true">✓</span><strong>Margaret approved and submitted plan v1 to {psaSystem.name}</strong><span>Approved baseline retained</span></div>
      <p className="psa-filing"><img src="/brand/systems/sharepoint.svg" alt="" />{execution.workspaceCreated ? "Approved plan filed in SharePoint" : "Filing the approved plan in SharePoint…"}</p>
      <p className={`execution-readback${verified ? " is-verified" : ""}`}>{verified ? <><span aria-hidden="true">✓</span> Full readback matched plan v1: 4 workstreams · 14 deliverables · 6 allocations / 1,840h · 4 gates. Dates, reviewers, dependencies, acceptance criteria and commercial terms verified.</> : `Readback differs on ${mismatches.join(", ")}. Review before finalizing.`}</p>
    </>}</div>
  </article>;
}

function AssignmentBrief({ elapsed, onInspect }) {
  const task = approvedPlan.deliverables.find(item => item.id === "NS-D01");
  return <article className="inline-artifact assignment-brief" aria-label="Avery’s committed assessment assignment">
    <ArtifactHead label="Northstar Foods · Your assignment" title="Data-readiness assessment" elapsed={elapsed} at={deliveryTiming.assignmentAt} />
    <dl className="assignment-brief-facts">{[["Planned effort", `${assignment.effort} hours`], ["Due", assignment.due], ["Reviewer", assignment.reviewer]].map(([label, value], index) => <div key={label} data-follow-at={3900 + index * 150}>{elapsed >= 3900 + index * 150 && <><dt>{label}</dt><dd><BuildText elapsed={elapsed} at={3900 + index * 150} duration={200}>{value}</BuildText></dd></>}</div>)}</dl>
    {elapsed >= 4500 && <section data-follow-at={4500}><h4>What it must establish</h4><p><BuildText elapsed={elapsed} at={4500} duration={550}>{assessment.purpose}</BuildText></p></section>}
    {elapsed >= 5200 && <section data-follow-at={5200}><h4>Acceptance criteria</h4><p><BuildText elapsed={elapsed} at={5200} duration={550}>{task.acceptance}</BuildText></p></section>}
    {elapsed >= deliveryTiming.assignmentReady && <footer className="artifact-footer" data-follow-at={deliveryTiming.assignmentReady}><span>Plan v1 · {readbackAssignment.id} · Verified in {psaSystem.name}</span><SourceLink source="assignment" onInspect={onInspect}>Approved assignment</SourceLink></footer>}
  </article>;
}

export function DeliveryArtifact({ elapsed, onInspect }) {
  const state = deliveryStateAt(elapsed);
  return <article className="inline-artifact delivery-artifact" aria-label="Northstar data-readiness assessment" aria-busy={!state.draftReady || (state.revising && !state.revised)} data-review-status={state.approved ? "approved" : state.feedbackReceived ? "feedback" : state.sentForReview ? "in-review" : "draft"} data-export-ready={state.exportReady}>
    <header className="document-file"><img src="/brand/systems/word.svg" alt="Word" /><span>{assessmentFileName}</span><small>{state.approved ? "Sofia approved revision 2" : "Practice library report"}</small></header>
    <div className="assessment-layout"><div className="assessment-page">
      <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
      <p className="assessment-client">Northstar Foods</p><h3>{assessmentFormatName}</h3><p className="assessment-byline">Avery Ross · Reviewer: Sofia Patel · {state.revising ? "Revision 2" : "Revision 1"}</p>
      <section className="assessment-purpose build-slot" data-follow-at={deliveryTiming.purposeAt}>{elapsed >= deliveryTiming.purposeAt && <><h4>Purpose and assessment basis</h4><p><BuildText elapsed={elapsed} at={deliveryTiming.purposeAt} duration={650}>{assessment.purpose}</BuildText></p></>}</section>
      <div className="assessment-evidence">{assessment.evidence.map((item, index) => {
        const reviseAt = deliveryTiming.revisionContent + index * 500;
        return <div className="assessment-evidence-row build-slot" key={item.label} data-follow-at={state.revising ? reviseAt : deliveryTiming.evidenceAt + index * 700}>{elapsed >= deliveryTiming.evidenceAt + index * 700 && <><span>{item.label}</span><strong>{item.finding}</strong><small>{item.gap}</small>{elapsed >= reviseAt && <p className="assessment-evidence-implication"><BuildText elapsed={elapsed} at={reviseAt} duration={450}>{item.implication}</BuildText></p>}</>}</div>;
      })}</div>
      <section className="assessment-conclusion build-slot" data-follow-at={state.revising ? deliveryTiming.conclusionContent : deliveryTiming.initialConclusionAt} data-revised={elapsed >= deliveryTiming.conclusionContent}>{elapsed >= deliveryTiming.initialConclusionAt && <><h4>Assessment and implications</h4><p>{elapsed >= deliveryTiming.conclusionContent ? <BuildText elapsed={elapsed} at={deliveryTiming.conclusionContent} duration={deliveryTiming.revised - deliveryTiming.conclusionContent}>{assessment.conclusion}</BuildText> : assessment.initialConclusion}</p></>}</section>
      <footer className="assessment-sources build-slot">{state.draftReady && <><SourceLink source="evidence" onInspect={onInspect}>Northstar evidence</SourceLink><SourceLink source="assignment" onInspect={onInspect}>Approved assignment</SourceLink></>}</footer>
    </div><aside className="assessment-margin" aria-label="Firm guidance and review">
      <div className="delivery-guidance build-slot" data-follow-at={deliveryTiming.guidanceAt}>{elapsed >= deliveryTiming.guidanceAt && <><p className="margin-label">Carried into this work</p><SourceLink source="harbor-review" onInspect={onInspect}>Avery’s Harbor review · Shared by Sofia</SourceLink><p>Keep observed ownership separate from proposed design, with source dates and disputes retained.</p><SourceLink source="ownership-guidance" onInspect={onInspect}>Ownership and Handoffs · Published practice note</SourceLink><p>Identify the service boundaries and decisions affected by each evidence gap.</p></>}</div>
      <div className={`assessment-review build-slot${state.revised ? " is-resolved" : ""}`} data-follow-at={state.revised ? deliveryTiming.revised : deliveryTiming.feedbackReceived}>{state.feedbackReceived && <><strong>Sofia Patel <span>Review of revision 1</span></strong><p>{assessment.reviewComment}</p>{state.revised && <p className="review-resolution"><span aria-hidden="true">✓</span> Avery clarified the limits of the conclusion and returned revision 2.</p>}{state.approved && <p className="review-approval">Sofia approved revision 2 for export.</p>}</>}</div>
      <div className="delivery-record build-slot" data-follow-at={deliveryTiming.approved}>{state.revised && <><p>Review request, feedback, revision rationale and approval retained with their sources.</p><SourceLink source="record" onInspect={onInspect}>Assessment record</SourceLink></>}</div>
    </aside></div>
    <footer className="delivery-workflow build-slot" data-follow-at={state.exportReady ? deliveryTiming.exportReady : state.exporting ? deliveryTiming.exportStarted : state.sentForReview && !state.feedbackReceived ? deliveryTiming.sentForReview : deliveryTiming.draftReady}>
      {state.draftReady && (!state.sentForReview ? <><div><strong>Avery’s draft is ready for review</strong><p>Revision 1 and its supporting evidence are ready for Sofia.</p></div><span className="delivery-action-status">Draft ready</span></> : !state.feedbackReceived ? <><div><strong>Avery sent revision 1 to Sofia</strong><p>Sofia is reviewing the assessment against the firm’s evidence standard.</p></div><span className="delivery-action-status"><i className="build-pulse" />In review</span></> : !state.revising ? <><div><strong>Sofia returned one review comment</strong><p>Explain which design decisions remain conditional on the evidence gaps.</p></div><span className="delivery-action-status">Feedback received</span></> : !state.approved ? <><div><strong>{state.revised ? "Avery returned revision 2 to Sofia" : "Avery is addressing the review"}</strong><p>{state.revised ? "Sofia is checking the revised conclusion before approval." : "Clarifying design readiness using the evidence gaps and Harbor’s review standard."}</p></div><span className="delivery-action-status"><i className="build-pulse" />{state.revised ? "Final review" : "Revising"}</span></> : state.exportReady ? <><div className="delivery-export-file"><img src="/brand/systems/word.svg" alt="" /><div><strong>{assessmentFileName}</strong><p>Exported · Revision 2 · Sofia approved</p></div></div><a className="delivery-download" href={assessment.downloadPath} download={assessmentFileName}>View Word document <span aria-hidden="true">↓</span></a></> : state.exporting ? <><div><strong>Avery is exporting the approved assessment</strong><p>Preparing the approved report for Word export.</p></div><span className="delivery-action-status"><i className="build-pulse" />Preparing Word</span></> : <><div><strong>Sofia approved revision 2</strong><p>The approved version is ready for Avery’s export request.</p></div><span className="delivery-action-status">Approved for export</span></>)}
    </footer>
  </article>;
}

function AssessmentReviewArtifact({ elapsed }) {
  const feedback = elapsed >= deliveryTiming.feedbackReceived;
  return <article className="inline-artifact assessment-review-receipt" aria-label="Sofia’s review of assessment revision 1">
    <p data-follow-at={deliveryTiming.reviewArtifactAt}>Revision 1 and its supporting evidence sent to Sofia Patel.</p>
    {feedback && <div className="assessment-review" data-follow-at={deliveryTiming.feedbackReceived}><strong>Sofia Patel <span>Review of revision 1</span></strong><p>{assessment.reviewComment}</p></div>}
  </article>;
}

function AssessmentExportArtifact({ elapsed }) {
  const ready = elapsed >= deliveryTiming.exportReady;
  return <article className="inline-artifact delivery-export-receipt" aria-label="Approved Word export" data-export-ready={ready} data-follow-at={ready ? deliveryTiming.exportReady : deliveryTiming.exportArtifactAt}>
    <div className="delivery-export-file"><img src="/brand/systems/word.svg" alt="Word" /><div><strong>{assessmentFileName}</strong><p>{ready ? "Exported · Revision 2 · Sofia approved" : "Exporting the approved report to Word…"}</p></div></div>
    {ready && <>
      <section className="assessment-page export-document-page" aria-label="Preview of the approved assessment">
        <div className="assessment-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div>
        <p className="assessment-client">Northstar Foods</p><h3>{assessmentFormatName}</h3>
        <p className="assessment-byline">Avery Ross · Reviewed by Sofia Patel · Revision 2</p>
        <h4>Assessment and implications</h4><p>{assessment.conclusion}</p>
      </section>
      <a className="delivery-download" href={assessment.downloadPath} download={assessmentFileName}>View Word document <span aria-hidden="true">↓</span></a>
    </>}
  </article>;
}

export default function DemoArtifact({ type, elapsed, onInspect }) {
  if (type === "precedent") return <PrecedentResponse elapsed={elapsed} onInspect={onInspect} />;
  if (type === "scope") return <ScopeArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (type === "staffing") return <StaffingArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (type === "plan") return <PlanArtifact elapsed={elapsed} onInspect={onInspect} />;
  if (type === "commit") return <PlanCommitArtifact elapsed={elapsed} />;
  if (type === "assignment-brief") return <AssignmentBrief elapsed={elapsed} onInspect={onInspect} />;
  if (type === "assessment-review") return <AssessmentReviewArtifact elapsed={elapsed} />;
  if (type === "assessment-export") return <AssessmentExportArtifact elapsed={elapsed} />;
  return <DeliveryArtifact elapsed={elapsed} onInspect={onInspect} />;
}

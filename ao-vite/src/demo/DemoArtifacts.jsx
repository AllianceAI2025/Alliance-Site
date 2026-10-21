import React, { useState } from "react";
import { directCost, effort, resources, streams } from "./northstar.js";

const money = (value) => "$" + value.toLocaleString("en-US");
const system = (name) => `/brand/systems/${name}.svg`;

function DocumentHead({ label, title, children }) {
  return <header className="demo-document-head"><p>{label}</p><h3>{title}</h3>{children}</header>;
}
export function ScopeDocument() {
  return <article className="demo-document demo-scope">
    <DocumentHead label="Northstar Foods · working scope" title="Operating model and decision rights"><p>Establish clear decision ownership across eight regions while normal service continues.</p></DocumentHead>
    <div className="demo-document-metrics"><div><strong>14</strong><span>weeks</span></div><div><strong>{effort.toLocaleString()}h</strong><span>proposed effort</span></div><div><strong>4</strong><span>workstreams</span></div></div>
    <ol className="demo-scope-streams">{streams.map((stream, index) => <li key={stream.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{stream.name}</h4><p>{stream.outcome}</p></div><small>W{stream.weeks}</small></li>)}</ol>
    <section className="demo-document-note"><h4>What we carry forward</h4><p>Source-linked ownership, early regional participation and a formal validation round. Harbor’s review guidance informs the evidence gate.</p></section>
    <dl className="demo-document-facts"><div><dt>Open dependency</dt><dd>West and Southeast participation and extracts.</dd></div><div><dt>Boundary</dt><dd>Implementation and full source-record audit are excluded.</dd></div></dl>
    <footer>Basis: sponsor discovery · FM-012 · Harbor and Meridian reviews</footer>
  </article>;
}

export function PricingDocument() {
  return <article className="demo-document">
    <DocumentHead label="Northstar Foods · internal working" title="From delivery plan to proposal fee"><p>The reviewed team, current resource windows and effort establish the cost basis.</p></DocumentHead>
    <div className="demo-pricing-table"><table><caption className="demo-sr-only">Reviewed resource effort and internal cost</caption><thead><tr><th scope="col">Resource</th><th scope="col">Effort × rate</th><th scope="col">Direct cost</th></tr></thead><tbody>{resources.map(person => <tr key={person.name}><th scope="row">{person.name}</th><td>{person.hours}h × {money(person.rate)}</td><td>{money(person.hours * person.rate)}</td></tr>)}</tbody><tfoot><tr><th scope="row">Total</th><td>{effort.toLocaleString()}h</td><td>{money(directCost)}</td></tr></tfoot></table></div>
    <section className="demo-document-note"><h4>Finance’s contribution assumption</h4><p>{money(directCost)} ÷ 60% = {money(Math.ceil(directCost / .6))} minimum. Rounded proposal recommendation: <strong>$420,000</strong>.</p></section>
    <dl className="demo-document-facts"><div><dt>Timing</dt><dd>August 17 start · fourteen weeks · Daniel held from Week 3.</dd></div><div><dt>Sensitivity</dt><dd>10% extra effort reduces direct contribution at the quote to 35.0%, before overhead.</dd></div></dl>
    <footer>NS-FC01 · NS-FP01 · current resource confirmation. Client affordability is a separate constraint.</footer>
  </article>;
}

export function ProposalDocument({ accepted }) {
  return <article className="demo-document demo-proposal">
    <DocumentHead label={accepted ? "Northstar Foods · accepted proposal v5" : "Northstar Foods · submitted proposal v4"} title="Engagement proposal"><p>Operating-model diagnostic, design, regional validation and transition roadmap.</p></DocumentHead>
    <div className="demo-proposal-fee"><strong>{accepted ? "$400,000" : "$420,000"}</strong><span>{accepted ? "Accepted fixed fee" : "Proposed fixed fee"}</span></div>
    <dl className="demo-document-facts"><div><dt>Delivery</dt><dd>Fourteen weeks · {effort.toLocaleString()}h · board package November 20.</dd></div><div><dt>Resources</dt><dd>The reviewed pursuit team and confirmed timing assumptions.</dd></div><div><dt>Acceptance</dt><dd>Decision rights, governance cadence, regional exceptions and a sequenced roadmap.</dd></div><div><dt>Boundary</dt><dd>Implementation remains outside the agreed scope.</dd></div></dl>
    {accepted && <section className="demo-document-note"><h4>What changed in negotiation</h4><p>$20,000 fee concession. 40/40/20 milestone billing, named staffing and explicit acceptance criteria. Full scope and delivery effort retained.</p><p><strong>Salesforce OPP-20418 · Won</strong></p></section>}
    <footer>{accepted ? "Elena’s exact-version acceptance is retained. Proposal v5 is the locked basis for planning." : "Cost and capacity basis retained with Sofia’s commercial review."}</footer>
  </article>;
}

export function PlanDocument({ approved }) {
  return <article className="demo-document demo-plan">
    <DocumentHead label={`Northstar Foods · ${approved ? "reviewed plan v1" : "working engagement plan"}`} title="Team and delivery schedule"><p>Accepted proposal v5 · August 17–November 20 · $400,000</p></DocumentHead>
    <div className="demo-resource-chart" role="group" aria-label="Six resources across fourteen weeks. Daniel and Lena start in Week 3; Sofia finishes in Week 10; Margaret covers later reviews.">
      <div className="demo-resource-axis"><span>Resources</span><div><span>W1</span><span>W4</span><span>W8</span><span>W12</span><span>W14</span></div><span>Effort</span></div>
      {resources.map(person => <div className="demo-resource-row" key={person.name}><div><strong>{person.name}</strong><small>{person.role}</small></div><div className="demo-resource-track" role="img" aria-label={`Weeks ${person.start} through ${person.end}, ${person.capacity}% weekly availability ceiling`}><div className="demo-resource-bar" style={{ left: `${(person.start - 1) / 14 * 100}%`, width: `${(person.end - person.start + 1) / 14 * 100}%` }}><i style={{ width: `${person.capacity}%` }} /><span>{person.capacity}%</span></div></div><span>{person.hours}h</span></div>)}
    </div>
    <p className="demo-chart-caption">Bars show confirmed resource windows; fill shows the weekly availability ceiling. Effort is the reviewed allocation.</p>
    <div className="demo-document-metrics"><div><strong>{effort.toLocaleString()}h</strong><span>planned</span></div><div><strong>6</strong><span>resources</span></div><div><strong>14</strong><span>deliverables</span></div></div>
    <section className="demo-document-note"><h4>Review coverage</h4><p>Sofia reviews Avery’s readiness assessment on September 7 before the baseline. Margaret owns the later gates after Sofia’s Week 10 release.</p></section>
    <footer>{approved ? "Sofia’s endorsement and the response to her notes are retained with plan v1. Ready for Margaret’s approval." : "Client evidence dependencies, deliverable criteria and the accepted commitments carry forward."}</footer>
  </article>;
}

export function HandoffDocument({ progress = 4 }) {
  const rows = [
    ["Project and fourteen deliverables", "Owners, reviewers and acceptance dates", 1],
    ["Resource bookings", "Six people · confirmed windows", 2],
    ["SharePoint workspace", "Approved plan and assessment workspace", 2],
    ["Independent readback", "Dates and assignments compared with plan v1", 4],
  ];
  return <article className="demo-document demo-handoff">
    <DocumentHead label="Approved plan v1 · application records" title="The plan, put into action."><p>The approved assignments and dates retain their plan basis.</p></DocumentHead>
    <div className="demo-system-name"><img src={system("project-operations")} alt="" />Dynamics 365 Project Operations</div>
    <div className="demo-receipts">{rows.map(([name, detail, threshold]) => <div key={name}><span aria-hidden="true">{progress >= threshold ? "✓" : "·"}</span><div><h4>{name}</h4><p>{detail}</p></div><small>{progress >= threshold ? progress >= 4 ? "Verified" : "Created" : "Pending"}</small></div>)}</div>
    <section className="demo-document-note"><h4>{progress >= 4 ? "55 records verified" : progress >= 3 ? "Reading records back" : "Setting up the approved work"}</h4><p>{progress >= 4 ? "The application records match approved plan v1. Write receipts and readback results remain with the engagement." : "Creating the records is followed by an independent check against the approved plan."}</p></section>
    <footer><img src={system("sharepoint")} alt="" />SharePoint · plan basis, document workspace and verification receipts</footer>
  </article>;
}

export function AssessmentDocument({ version }) {
  const [view, setView] = useState("assessment");
  const reviewed = version === "assessment-reviewed";
  const developed = version !== "assessment";
  return <article className="demo-office-document">
    <div className="demo-office-toolbar">{view === "assessment" && <img src={system("word")} alt="Word" />}<span>Northstar · {view === "assessment" ? "Data-readiness assessment" : "Evidence workbook"}</span><small>Firm template v1.2</small></div>
    <div className="demo-office-tabs" role="tablist" aria-label="Assessment views"><button id="assessment-tab" role="tab" aria-controls="assessment-panel" aria-selected={view === "assessment"} onClick={() => setView("assessment")}>Assessment</button><button id="workbook-tab" role="tab" aria-controls="assessment-panel" aria-selected={view === "workbook"} onClick={() => setView("workbook")}>Evidence workbook</button></div>
    <div id="assessment-panel" role="tabpanel" aria-labelledby={view === "assessment" ? "assessment-tab" : "workbook-tab"}>
      {view === "assessment" ? <div className="demo-word-page"><div className="demo-word-letterhead"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance Systems Group</span></div><p className="demo-word-client">Northstar Foods</p><h3>Data-readiness assessment</h3><p className="demo-word-meta">Avery Ross · Reviewer: Sofia Patel · {reviewed ? "Revision 2" : "Working draft"}</p><h4>Purpose and assessment basis</h4><p>Establish which regional source data can support the decision-rights diagnostic. Test coverage, currency, completeness and traceability before design.</p><h4>Assessment and limitations</h4><p>{developed ? "Readiness is conditional for the six supplied regions. Northeast ownership gaps and Central’s prior-quarter inventory require source-level validation. West and Southeast evidence remains unavailable." : "The assignment provides 36 hours for the diagnostic assessment, due September 7. Required evidence and its limitations will be checked against the approved engagement plan."}</p><h4>Approach</h4><p>Keep observed ownership separate from proposed design. Retain the source date, conflicts and missing evidence, following the firm standard and Harbor’s accepted review.</p>{reviewed && <aside className="demo-review-note"><strong>Sofia’s review → Avery’s revision</strong><p>Explain which gaps affect the conclusion. The revision supports initial diagnostic work; affected design decisions remain conditional.</p></aside>}<footer>Plan v1 · FM-012 · HG-D01 review · NS-DATA01</footer></div> : <div className="demo-workbook"><div className="demo-formula"><span>D8</span><span>fx</span><span>Ownership incomplete</span></div><div className="demo-workbook-scroll"><table><caption className="demo-sr-only">Northstar regional evidence register</caption><thead><tr><th></th><th>A · Region</th><th>B · Evidence</th><th>C · Implication</th></tr></thead><tbody>{[["Northeast", "Ownership incomplete", "Validate affected decisions"], ["Central", "Prior-quarter inventory", "Confirm currency"], ["West", "Extract outstanding", "No readiness conclusion"], ["Southeast", "Extract outstanding", "No readiness conclusion"]].map((row, index) => <tr key={row[0]}><th scope="row">{index + 8}</th>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><section><h4>Six of eight extracts received</h4><p>Receipt coverage is not a readiness conclusion. Source dates, ownership gaps and review context remain with each entry.</p></section><div className="demo-sheet-tabs"><strong>Evidence</strong><span>Firm template · NS-DATA01</span></div></div>}
    </div>
  </article>;
}

export default function DemoArtifact({ kind, progress }) {
  if (kind === "scope") return <ScopeDocument />;
  if (kind === "pricing") return <PricingDocument />;
  if (kind === "proposal" || kind === "accepted") return <ProposalDocument accepted={kind === "accepted"} />;
  if (kind === "plan" || kind === "approved") return <PlanDocument approved={kind === "approved"} />;
  if (kind === "handoff") return <HandoffDocument progress={progress} />;
  return <AssessmentDocument version={kind} />;
}

import React from "react";

const Chip = ({ children, tone = "neutral" }) => <span className={`ps-chip ps-chip--${tone}`}>{children}</span>;

function ProductFrame({ section, title, status, children, className = "" }) {
  return <div className={`ps-frame ${className}`} aria-label={`Illustrative AllianceOne ${section} view`}>
    <div className="ps-appbar">
      <div className="ps-brand"><span className="ps-brand-mark">A.</span><span>AllianceOne</span></div>
      <div className="ps-breadcrumb"><span>Northstar Foods</span><b>/</b><strong>{title}</strong></div>
      <div className="ps-appbar-meta"><Chip tone="success">{status}</Chip><span>ILLUSTRATIVE DATA</span></div>
    </div>
    <div className="ps-body">
      <aside className="ps-rail" aria-hidden="true"><b>01</b><span /><span /><span /><i /></aside>
      <div className="ps-content">
        <div className="ps-viewhead"><div><span>{section}</span><h4>{title}</h4></div><div className="ps-viewtabs"><b>Overview</b><span>Plan</span><span>Team</span><span>Evidence</span></div></div>
        {children}
      </div>
    </div>
  </div>;
}

export function ChatScene() {
  return <ProductFrame section="Engagement chat" title="Scope the engagement" status="Grounded" className="ps-chat">
    <div className="ps-chat-thread">
      <div className="ps-user-turn">
        <span>YOU</span>
        <p>What should we carry forward from similar operating-model engagements before we lock the scope?</p>
        <i>MC</i>
      </div>
      <div className="ps-assistant-turn">
        <div className="ps-assistant-id"><span className="ps-ai-mark">A.</span><b>AllianceOne</b><Chip tone="success">Grounded in 59 items across 7 engagements</Chip></div>
        <h5>Three decisions should shape the scope now.</h5>
        <p>The strongest precedents point to the same delivery pattern: protect the fixed governance date, make regional validation explicit, and settle decision rights before detailed role design begins.</p>
        <div className="ps-chat-findings">
          <div><b>01</b><span><strong>Protect the board decision date.</strong><small>Add regional validation as a defined workstream rather than absorbing it into design.</small></span><em>7 engagements</em></div>
          <div><b>02</b><span><strong>Sequence governance before role design.</strong><small>Past teams reduced rework when decision rights were approved first.</small></span><em>5 engagements</em></div>
          <div><b>03</b><span><strong>Price the transition contingency.</strong><small>Three comparable engagements required a scoped extension near implementation.</small></span><em>3 engagements</em></div>
        </div>
        <div className="ps-chat-gap"><span>STILL NEEDS CONFIRMATION</span><p>Peak-season freeze dates · regional sponsor availability · financial-system owner</p></div>
        <div className="ps-chat-actions"><div><Chip>Harbor Grain · close-out</Chip><Chip>Meridian · plan v3</Chip><Chip>5 more sources</Chip></div><button>Promote findings to plan <span>→</span></button></div>
      </div>
    </div>
    <div className="ps-composer"><span>Ask about the engagement, compare precedent, or update the plan…</span><div><b>＋</b><b>#</b><button>Send ↑</button></div></div>
  </ProductFrame>;
}

export function PursuitScene() {
  return <ProductFrame section="Pursuit intelligence" title="Operating model redesign" status="Qualified" className="ps-pursuit">
    <div className="ps-pursuit-grid">
      <section className="ps-panel ps-brief-panel">
        <div className="ps-labelrow"><span>THE MANDATE</span><Chip>4 evidence threads</Chip></div>
        <h5>Redesign the operating model without disrupting peak-season service.</h5>
        <p>Northstar needs a board-ready design across field operations, shared services, and governance. The decision must be made in 14 weeks.</p>
        <div className="ps-questions">
          <span>THE ENGAGEMENT MUST ANSWER</span>
          <b>01</b><p>Which activities should centralize, federate, or remain local?</p>
          <b>02</b><p>What transition sequence protects service continuity?</p>
        </div>
      </section>
      <section className="ps-panel ps-signal-panel">
        <div className="ps-labelrow"><span>IN EVIDENCE</span><Chip tone="success">Coverage 86%</Chip></div>
        <h5>Three operating signals materially change the shape of the work.</h5>
        <div className="ps-metrics"><div><span>REGIONS</span><strong>8</strong></div><div><span>ROLE OVERLAP</span><strong>31%</strong></div><div><span>PEAK WINDOW</span><strong>6 wk</strong></div></div>
        <ul><li>Decision rights differ across all eight regions.</li><li>Two previous redesigns stalled at local adoption.</li><li>Service continuity is the binding constraint.</li></ul>
      </section>
    </div>
    <div className="ps-precedent-strip">
      <div><span>PRECEDENT BASIS</span><strong>7 comparable engagements</strong></div>
      <div className="ps-precedent"><b>91%</b><span>Harbor Grain Co.</span><em>Decision dynamics · strong</em></div>
      <div className="ps-precedent"><b>84%</b><span>Meridian Components</span><em>Delivery shape · strong</em></div>
      <div className="ps-precedent"><b>76%</b><span>Redwood Consumer Group</span><em>Economics · moderate</em></div>
    </div>
  </ProductFrame>;
}

const planRows = [
  ["01", "Decision frame & diagnostic", "M. Chen", "0", "30", "420h"],
  ["02", "Operating model design", "S. Patel", "18", "68", "760h"],
  ["03", "Regional validation", "D. Okafor", "52", "84", "360h"],
  ["04", "Transition roadmap", "J. Hale", "72", "98", "300h"],
];

const planTeam = [
  ["MC", "Maya Chen", "Engagement partner", "35%", "All phases"],
  ["SP", "Sofia Patel", "Operating-model lead", "100%", "W1–10"],
  ["DO", "Daniel Okafor", "Regional validation lead", "80%", "W5–12"],
  ["JH", "Jordan Hale", "Transition lead", "80%", "W8–14"],
  ["AR", "Avery Ross", "Senior consultant", "100%", "W1–14"],
  ["LT", "Lena Torres", "Consultant", "100%", "W1–12"],
];

const planPrecedents = [
  ["91%", "Harbor Grain Co.", "Board date protected", "Sequence design around governance gates"],
  ["84%", "Meridian Components", "Regional model adopted", "Fund local validation explicitly"],
  ["76%", "Redwood Consumer Group", "Transition extended", "Price a controlled implementation option"],
];

export function PlanScene() {
  return <ProductFrame section="Engagement intent" title="Operating model redesign" status="Baseline approved" className="ps-plan">
    <div className="ps-intent-brief">
      <div><span>APPROVED INTENT / V4</span><h5>Redesign the operating model without disrupting peak-season service.</h5><p>Align eight regions around a common governance model, validate the design locally, and give the board a transition-ready decision by November 20.</p></div>
      <div><Chip tone="success">Scope approved</Chip><small>Approved Aug 08, 2026</small></div>
    </div>
    <div className="ps-plan-summary">
      <div><span>COMMITMENT</span><strong>14 weeks</strong><small>Board decision · Nov 20</small></div>
      <div><span>EFFORT</span><strong>1,840h</strong><small>6-person core team</small></div>
      <div><span>COMMERCIALS</span><strong>$420K</strong><small>Capped T&amp;M</small></div>
      <div><span>PRECEDENT</span><strong>7</strong><small>3 pinned by partner</small></div>
    </div>
    <div className="ps-plan-main">
      <section className="ps-contract-panel">
        <div className="ps-contract-head"><div><span>CONTRACT SCHEDULE</span><strong>Four workstreams, sequenced around one fixed decision gate.</strong></div><Chip>Approved baseline</Chip></div>
        <div className="ps-phase-grid">
          <div><span>PHASE 01 · W1–4</span><b>Frame</b><small>Decision rights, current-state evidence, design principles</small></div>
          <div><span>PHASE 02 · W3–9</span><b>Design</b><small>Future-state model, governance, role implications</small></div>
          <div><span>PHASE 03 · W8–12</span><b>Validate</b><small>Eight-region review and service-continuity testing</small></div>
          <div><span>PHASE 04 · W11–14</span><b>Mobilize</b><small>Transition roadmap and board decision package</small></div>
        </div>
        <div className="ps-timeline-panel">
        <div className="ps-timeline-head"><span>WORKSTREAM</span><div><b>W1</b><b>W4</b><b>W8</b><b>W12</b><b>W14</b></div></div>
        {planRows.map(([n, name, owner, start, end, effort]) => <div className="ps-timeline-row" key={n}>
          <span>{n}</span><div><strong>{name}</strong><small>{owner} · {effort}</small></div>
          <div className="ps-track"><i style={{ left: `${start}%`, width: `${Number(end) - Number(start)}%` }} /></div>
        </div>)}
        <div className="ps-gate"><span>DECISION GATE</span><b>Board operating-model approval</b><em>NOV 20</em></div>
        </div>
      </section>
      <aside className="ps-team-panel">
        <div className="ps-labelrow"><span>COMMITTED TEAM</span><Chip tone="success">Precedent fit</Chip></div>
        <p>Six roles shaped from teams that delivered comparable work.</p>
        <div className="ps-team-full">
          {planTeam.map(([initials, name, role, loading, phase]) => <div key={name}><i>{initials}</i><span><b>{name}</b><small>{role}</small></span><em>{loading}<small>{phase}</small></em></div>)}
        </div>
      </aside>
    </div>
    <section className="ps-plan-precedents">
      <div className="ps-plan-precedent-head"><div><span>SIMILAR ENGAGEMENTS</span><strong>What this plan carries forward from the firm’s delivery record</strong></div><Chip>7 compared · 3 pinned</Chip></div>
      <div className="ps-plan-precedent-grid">
        {planPrecedents.map(([fit, name, outcome, lesson]) => <div key={name}><b>{fit}</b><span><strong>{name}</strong><small>{outcome}</small></span><p>{lesson}</p></div>)}
      </div>
    </section>
    <div className="ps-plan-approval"><div><span>CANONICAL BASELINE</span><b>Scope · workstreams · team · effort · commercials · decision gates</b></div><button>Approve &amp; materialize <span>→</span></button></div>
  </ProductFrame>;
}

const writebackRows = [
  ["CRM", "Engagement record", "Fee cap · dates · owner · stage", "Written", "Salesforce"],
  ["PM", "Delivery workspace", "3 workstreams · 14 deliverables · 6 resources", "18 records created", "Workfront"],
  ["DMS", "Engagement evidence", "Brief · approved scope · governance structure", "Published", "Microsoft 365"],
  ["ERP", "Project financials", "Project code · billing plan · revised NTE", "Approval required", "NetSuite"],
];

export function MaterializeScene() {
  return <ProductFrame section="Plan materialization" title="Writeback run AO-2048" status="Ready to publish" className="ps-materialize">
    <div className="ps-materialize-head">
      <div><span>CANONICAL INTENT</span><strong>Operating model redesign · v4</strong><small>Approved by Maya Chen · Aug 08, 2026</small></div>
      <div><span>WRITEBACK POLICY</span><strong>Publish approved fields</strong><small>Financial records require controller approval</small></div>
      <button>Materialize plan <span>→</span></button>
    </div>
    <div className="ps-writeback-map">
      <div className="ps-writeback-head"><span>DESTINATION</span><span>OBJECT</span><span>FIELDS FROM COMMITTED PLAN</span><span>STATUS</span></div>
      {writebackRows.map(([system, object, fields, status, example], i) => <div className="ps-writeback-row" key={system}>
        <div><b>{system}</b><small>{example}</small></div>
        <strong>{object}</strong>
        <span>{fields}</span>
        <em className={i === 3 ? "ps-writeback-pending" : "ps-writeback-done"}>{status}</em>
      </div>)}
    </div>
    <div className="ps-materialize-foot">
      <div><span>INTENT PRESERVED IN ALLIANCEONE</span><b>Scope · workstreams · staffing · effort · commercials · decision gates</b></div>
      <i>→</i>
      <div><span>EXECUTION OWNED BY THE FIRM STACK</span><b>Tasks · time · documents · invoices · delivery status</b></div>
    </div>
  </ProductFrame>;
}

export function ReconcileScene() {
  return <ProductFrame section="Commitment reconciliation" title="Operating model redesign" status="In delivery" className="ps-reconcile">
    <div className="ps-reconcile-top">
      <div><span>ORIGINAL COMMITMENT</span><strong>$420K</strong><small>Approved Aug 08</small></div><i>→</i>
      <div><span>APPROVED CHANGE</span><strong>+$42K</strong><small>CO-01 · Oct 02</small></div><i>→</i>
      <div><span>REVISED CAP</span><strong>$462K</strong><small>Canonical baseline</small></div><i>→</i>
      <div className="ps-actual"><span>ACTUAL</span><strong>$448K</strong><small>3.0% under cap</small></div>
    </div>
    <div className="ps-reconcile-grid">
      <section className="ps-variance-table">
        <div className="ps-vrow ps-vhead"><span>ENGAGEMENT DETAIL</span><span>COMMITTED</span><span>DELIVERED</span><span>SOURCE / DELTA</span></div>
        <div className="ps-vrow"><b>Duration</b><span>14 weeks</span><span>15 weeks</span><em className="ps-alert">PM · +1 WK</em></div>
        <div className="ps-vrow"><b>Team effort</b><span>1,840h</span><span>1,915h</span><em className="ps-alert">PM / TIME · +4.1%</em></div>
        <div className="ps-vrow"><b>Fee cap</b><span>$462K</span><span>$448K</span><em className="ps-good">ERP · −$14K</em></div>
        <div className="ps-vrow"><b>Deliverables accepted</b><span>14</span><span>14</span><em className="ps-good">DMS · COMPLETE</em></div>
        <div className="ps-vrow"><b>Board decision</b><span>NOV 20</span><span>NOV 20</span><em className="ps-good">CRM · PROTECTED</em></div>
      </section>
      <aside className="ps-decision-card">
        <div className="ps-labelrow"><span>DECISION TRACE / OCT 02</span><Chip tone="success">Confirmed</Chip></div>
        <h5>Extend regional validation by one week.</h5>
        <p>Three regional leaders requested an additional service-continuity review. The board date remains fixed; transition-roadmap effort moves into the approved change order.</p>
        <div><span>DECIDED BY</span><b>Maya Chen · Evan Brooks</b></div>
        <div><span>RATIONALE</span><b>Protect adoption without moving the client commitment.</b></div>
      </aside>
    </div>
    <div className="ps-source-feeds">
      <div><b>PM</b><span>Workfront</span><em>Tasks · milestones · effort</em><small>14 min ago</small></div>
      <div><b>ERP</b><span>NetSuite</span><em>Invoices · actuals · fee cap</em><small>Period closed</small></div>
      <div><b>CRM</b><span>Salesforce</span><em>Scope · ownership · status</em><small>Current</small></div>
      <div><b>DMS</b><span>Microsoft 365</span><em>Decisions · approvals · evidence</em><small>11 admitted</small></div>
    </div>
  </ProductFrame>;
}

export function PracticeScene() {
  return <ProductFrame section="Institutional learning" title="Practice intelligence" status="Evidence mature" className="ps-practice">
    <div className="ps-practice-grid">
      <section className="ps-analog-detail">
        <div className="ps-labelrow"><span>PINNED PRECEDENT</span><Chip tone="success">91% fit</Chip></div>
        <h5>Harbor Grain Co. operating-model transformation</h5>
        <p>Closest match on problem, engagement shape, and decision dynamics. The team protected a fixed board date while extending regional validation.</p>
        <div className="ps-fit-grid"><span>Problem <b>Strong</b></span><span>Shape <b>Strong</b></span><span>Decisions <b>Strong</b></span><span>Economics <b>Moderate</b></span></div>
        <div className="ps-carry"><span>CARRY FORWARD</span><strong>Sequence design around decision gates, not functional workstreams.</strong><p>This reduced rework and kept the client’s fixed governance dates intact.</p></div>
      </section>
      <aside className="ps-learning-panel">
        <span className="ps-section-label">WHAT THE FIRM NOW KNOWS</span>
        <div><b>01</b><p>Regional validation requires explicit effort in the baseline.</p><Chip tone="success">Validated · 8</Chip></div>
        <div><b>02</b><p>Centralization decisions should precede role design.</p><Chip tone="success">Refined · 5</Chip></div>
        <div><b>03</b><p>A fixed board date can survive a scoped validation extension.</p><Chip>Observed · 3</Chip></div>
        <div className="ps-evidence-foot"><span>BUILT FROM</span><b>36 engagements · 214 admitted sources</b></div>
      </aside>
    </div>
  </ProductFrame>;
}

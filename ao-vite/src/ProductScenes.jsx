import React, { useEffect, useRef, useState } from "react";
import { capture } from "./analytics";

const Chip = ({ children, tone = "neutral" }) => <span className={`ps-chip ps-chip--${tone}`}>{children}</span>;

const playWhenVisibleOptions = { threshold: 0.06, rootMargin: "80px 0px -8% 0px" };

function usePlayWhenVisible(enabled = true, replayKey) {
  const ref = useRef(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const play = () => setRun((value) => value + 1);
    const rect = node.getBoundingClientRect();
    const viewport = window.innerHeight || 0;
    if (rect.bottom > 80 && rect.top < viewport - 40) {
      play();
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, playWhenVisibleOptions);

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, replayKey]);

  return [ref, run, setRun];
}

const leaderItems = {
  scope: [["Opportunity intake", "Signals"], ["Pursuit brief", "Pursuit brief"], ["Scoping", "Scoping"], ["Proposal", "Proposal"]],
  plan: [["Team & staffing", "Team"], ["Engagement plan", "Plan"]],
  materialize: [["Approved plan", "Approved plan"], ["System writeback", "System writeback"]],
  reconcile: [["Commitment reconciliation", "Commitment reconciliation"], ["Decision record", "Decision record"]],
  learn: [["Close-out", "Close-out"]],
};

const phaseMeta = {
  scope: ["Scope", "Opportunity to approved scope"],
  plan: ["Plan", "Won engagement to approved baseline"],
  materialize: ["Materialize", "Approved baseline to execution systems"],
  execute: ["Execute", "Assigned work to accepted delivery"],
  reconcile: ["Reconcile", "Actual delivery against commitment"],
  learn: ["Learn", "Outcome to reusable precedent"],
};

function WorkspaceNav({ stageKey, activeItem, onNavigate, role = "leader" }) {
  if (role === "consultant") return <aside className="ps-workspace-nav" aria-label="Consultant workspaces">
    <div className="ps-workspace-person"><span><b>Avery Ross</b><small>Consultant workspace</small></span><button type="button" aria-label="Switch workspace">⌄</button></div>
    <div className="ps-nav-group"><span>MY WORK · 5</span>
      <div className="ps-nav-project is-open"><button type="button" className="is-project-active"><span><b>Northstar Foods</b><small>Operating model redesign</small></span></button>
        <div className="ps-nav-children"><button type="button" className="is-active"><span>Decision-rights baseline</span><em>In progress</em></button><button type="button"><span>Evidence pack</span><em>Due Fri</em></button><button type="button"><span>Design principles</span><em>Planned</em></button></div>
      </div>
      <div className="ps-nav-project"><button type="button"><span><b>Arcadia Health</b><small>Market entry assessment</small></span><em>2</em></button></div>
      <div className="ps-nav-project"><button type="button"><span><b>Meridian Bank</b><small>PMO diagnostic</small></span><em>1</em></button></div>
    </div>
    <div className="ps-nav-footer"><span>ENGAGEMENT CONTEXT</span><b>Northstar · WS01</b><small>3 assigned deliverables</small></div>
  </aside>;

  const items = leaderItems[stageKey] || [];
  return <aside className="ps-workspace-nav" aria-label="Engagement workspaces">
    <div className="ps-workspace-person"><span><b>Maya Chen</b><small>Managing Director · Operating Model</small></span><button type="button" aria-label="Switch workspace">⌄</button></div>
    <div className="ps-nav-group"><span>{stageKey === "scope" ? "PURSUIT WORKSPACES" : "ACTIVE ENGAGEMENTS"}</span>
      <div className="ps-nav-project is-open"><button type="button" className="is-project-active"><span><b>Northstar Foods</b><small>{stageKey === "scope" ? "Qualified opportunity" : "Operating model redesign"}</small></span></button>
        <div className="ps-phase-tree" aria-label="Northstar engagement phases">
          {Object.entries(phaseMeta).map(([key, meta]) => <div className={`ps-phase-node${stageKey === key ? " is-active" : ""}`} key={key}>
            <a href={`#phase-${key}`} aria-current={stageKey === key ? "step" : undefined}><span><b>{meta[0]}</b></span></a>
            {stageKey === key && items.length > 0 && <div className="ps-nav-children">{items.map(([label, itemKey]) => <button key={itemKey} type="button" disabled={!onNavigate} className={activeItem === itemKey ? "is-active" : ""} onClick={() => { capture("product_visual_view", { scene: stageKey, view: label }); onNavigate?.(itemKey); }}><span>{label}</span>{activeItem === itemKey && <em>Open</em>}</button>)}</div>}
          </div>)}
        </div>
      </div>
      <div className="ps-nav-project"><button type="button"><span><b>Harbor Grain</b><small>{stageKey === "scope" ? "Discovery" : "Transformation program"}</small></span></button></div>
      <div className="ps-nav-project"><button type="button"><span><b>Redwood Consumer</b><small>{stageKey === "scope" ? "Proposal review" : "Shared services"}</small></span></button></div>
    </div>
  </aside>;
}

function ProductFrame({ section, title, status, children, className = "", tabs = [], activeTab, onTabChange, stageKey = "scope", activeItem, onNavigate, role = "leader" }) {
  return <div className={`ps-frame ${className}`} aria-label={`Illustrative AllianceOne ${section} view`}>
    <div className="ps-appbar">
      <div className="ps-brand"><span className="ps-brand-mark">A.</span><span>AllianceOne</span></div>
      <div className="ps-appbar-meta"><span>ILLUSTRATIVE DATA</span><Chip tone="success">{status}</Chip><button type="button" aria-label="Workspace options">•••</button></div>
    </div>
    <div className="ps-body">
      <WorkspaceNav stageKey={stageKey} activeItem={activeItem || activeTab} onNavigate={onNavigate || onTabChange} role={role} />
      <div className="ps-content">
        <div className="ps-viewhead">
          <div><span>{section}</span><h4>{title}</h4></div>
          {tabs.length > 0 && <div className="ps-viewtabs" role="tablist" aria-label={`${section} views`}>
            {tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "is-active" : ""} onClick={() => onTabChange?.(tab)}>{tab}</button>)}
          </div>}
        </div>
        {children}
      </div>
    </div>
  </div>;
}

const scopeQuestion = "Now that we have tentative alignment, can you generate the first draft of the Scope?";
const proposalQuestion = "Incorporate the partner review and the latest client conversations, then generate the first proposal draft.";

const engagementWorkstreams = [
  ["01", "Decision frame & diagnostic", "W1–4", "420h", "Decision-rights baseline · current-state evidence · design principles"],
  ["02", "Operating-model design", "W3–9", "760h", "Future-state model · governance · role implications"],
  ["03", "Regional validation", "W8–12", "360h", "Eight-region validation · service-continuity testing · change readiness"],
  ["04", "Transition roadmap", "W11–14", "300h", "Mobilization roadmap · board working session · decision package"],
];

export function ScopeScene() {
  const [stage, setStage] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [chatPhase, setChatPhase] = useState("idle");
  const [documentProgress, setDocumentProgress] = useState(0);
  const chatEnabled = stage === 2 || stage === 3;
  const [sceneRef, chatRun, setChatRun] = usePlayWhenVisible(chatEnabled, stage);

  useEffect(() => {
    if (!chatRun || !chatEnabled) return undefined;
    const activeQuestion = stage === 2 ? scopeQuestion : proposalQuestion;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedQuestion(activeQuestion);
      setChatPhase("response");
      setDocumentProgress(100);
      return undefined;
    }

    setTypedQuestion("");
    setChatPhase("typing");
    setDocumentProgress(0);
    let cursor = 0;
    let thinkingTimer;
    let responseTimer;
    let documentTimer;
    const typeTimer = window.setInterval(() => {
      cursor += 1;
      setTypedQuestion(activeQuestion.slice(0, cursor));
      if (cursor >= activeQuestion.length) {
        window.clearInterval(typeTimer);
        thinkingTimer = window.setTimeout(() => setChatPhase("thinking"), 350);
        responseTimer = window.setTimeout(() => {
          setChatPhase("response");
          documentTimer = window.setInterval(() => setDocumentProgress((value) => {
            if (value >= 100) {
              window.clearInterval(documentTimer);
              return 100;
            }
            return Math.min(100, value + 4);
          }), 90);
        }, 1350);
      }
    }, 18);

    return () => {
      window.clearInterval(typeTimer);
      window.clearInterval(documentTimer);
      window.clearTimeout(thinkingTimer);
      window.clearTimeout(responseTimer);
    };
  }, [stage, chatRun, chatEnabled]);

  const stageStatus = ["Context assembling", "Workspace populated", "Scoping in progress", "Proposal drafting"][stage];

  const selectStage = (index) => setStage(index);

  const scopeNavItems = ["Signals", "Pursuit brief", "Scoping", "Proposal"];
  const navigateScope = (key) => selectStage(scopeNavItems.indexOf(key));

  return <div ref={sceneRef}><ProductFrame section="Scope" title="Operating model redesign" status={stageStatus} className={`ps-scope ps-scope--stage-${stage}`} stageKey="scope" activeItem={scopeNavItems[stage]} onNavigate={navigateScope}>
    <div className="ps-scope-stage" aria-live="polite">
      {stage === 0 && <div className="ps-intake-view ps-scope-shot">
        <div className="ps-intake-head"><div><span>OPPORTUNITY INTAKE / NORTHSTAR FOODS</span><h5>The CRM opportunity gives earlier conversations a place to land.</h5></div><Chip>Pre-qualified</Chip></div>
        <div className="ps-intake-flow" aria-label="Opportunity context assembly">
          <div><i>01</i><span><b>Prior conversations</b><small>4 emails · 2 meetings · 1 partner note</small></span></div>
          <em>→</em>
          <div className="is-trigger"><i>02</i><span><b>CRM opportunity created</b><small>CRM-2841 · Aug 12, 09:06</small></span></div>
          <em>→</em>
          <div><i>03</i><span><b>History matched &amp; attached</b><small>6 sources · 5 stakeholders</small></span></div>
          <em>→</em>
          <div><i>04</i><span><b>Initial context assembled</b><small>Provisional until qualification</small></span></div>
        </div>
        <div className="ps-intake-detail-grid">
          <section className="ps-intake-card ps-intake-evidence">
            <div className="ps-intake-card-head"><span>MATCHED EVIDENCE</span><small>Attached to CRM-2841</small></div>
            <div><i>EM</i><p><b>Partner and client email thread</b><small>Eight-region redesign and a fixed board date.</small></p><em>4 matched</em></div>
            <div><i>MT</i><p><b>Introductory meetings</b><small>Service continuity and regional autonomy surfaced.</small></p><em>2 matched</em></div>
            <div><i>PN</i><p><b>Partner relationship note</b><small>Five stakeholders recognized across the history.</small></p><em>1 matched</em></div>
          </section>
          <section className="ps-intake-card ps-intake-interpretation">
            <div className="ps-intake-card-head"><span>EMERGING INTERPRETATION</span><Chip>Provisional</Chip></div>
            <h5>Potential operating-model redesign</h5>
            <p>Northstar may need to align decision rights across eight regions without disrupting peak-season service.</p>
            <div><span>LIKELY MANDATE</span><b>Enterprise consistency with local adoption</b></div>
            <div><span>APPARENT URGENCY</span><b>Board decision before peak season</b></div>
          </section>
          <section className="ps-intake-card ps-intake-unknowns">
            <div className="ps-intake-card-head"><span>STILL UNKNOWN</span><small>Requires qualification</small></div>
            <p><i />Confirmed executive sponsor and buying committee</p>
            <p><i />Budget, commercial structure, and decision process</p>
            <p><i />Precise scope boundaries and delivery constraints</p>
            <p><i />Whether all regional voices are represented</p>
          </section>
        </div>
        <div className="ps-intake-foot ps-qualification-gate"><div><span>QUALIFICATION GATE</span><b>Once qualified, this provisional context becomes the consultant's Pursuit Brief.</b></div><button onClick={() => selectStage(1)}>View qualified Pursuit Brief <i>→</i></button></div>
      </div>}

      {stage === 1 && <div className="ps-pursuit-view ps-scope-shot">
        <div className="ps-pursuit-overview">
          <section><span>SITUATION</span><h5>Northstar is preparing to redesign its operating model across eight regions.</h5><p>Initial discussions point to inconsistent decision rights, duplicated shared-services work, and a fixed board decision before peak-season planning. Leadership wants a model that reduces operating friction without forcing a disruptive, one-size-fits-all structure.</p></section>
          <aside><span>INITIAL NARRATIVE / IN EVIDENCE</span><b>Service continuity, not organization design, is the binding constraint.</b><p>Regional autonomy is materially different across the network. Two earlier transformation efforts lost momentum during local adoption.</p><small>Confidence 78% · 6 supporting signals</small></aside>
        </div>
        <div className="ps-pursuit-questions">
          <section><span>WHAT THE ENGAGEMENT MUST ANSWER</span><div><b>01</b><p>Which decisions and activities should centralize, federate, or remain local?</p></div><div><b>02</b><p>What transition sequence protects service continuity through peak season?</p></div></section>
          <aside><span>BEFORE WE COMMIT</span><b>Which regional voices are still unheard?</b><p>West region president · shared-services finance owner · frontline operations leads</p></aside>
        </div>
        <div className="ps-pursuit-columns">
          <section><span>WHAT HURTS</span><p>Decision rights vary by region</p><p>Shared-services ownership overlaps</p><p>Two prior changes stalled at adoption</p></section>
          <section><span>WHY NOW</span><p>Board decision in 14 weeks</p><p>Peak-season planning follows</p><p>Leadership transition is underway</p></section>
          <section><span>WHAT THEY WANT</span><p>Clear enterprise decision rights</p><p>Lower cross-region friction</p><p>A transition-ready roadmap</p></section>
        </div>
        <div className="ps-pursuit-lower">
          <section><div className="ps-pursuit-lower-head"><span>SIMILAR ENGAGEMENTS</span><small>7 surfaced from firm history</small></div><p><b>91%</b><strong>Harbor Grain Co.</strong><em>Fixed governance date · regional adoption</em></p><p><b>84%</b><strong>Meridian Components</strong><em>Federated operating model · completed</em></p><p><b>76%</b><strong>Redwood Consumer Group</strong><em>Shared services · transition extended</em></p></section>
          <section><div className="ps-pursuit-lower-head"><span>WATCH-OUTS</span><small>4 grounded signals</small></div><p><i />A single enterprise model may trigger regional resistance.</p><p><i />Peak-season freeze creates a hard mobilization boundary.</p><p><i />Current service baselines are not yet consistent.</p></section>
        </div>
        <div className="ps-pursuit-evidence"><div><span>STAKEHOLDERS</span><b>CEO · COO · 3 regional presidents · CHRO</b></div><div><span>SOURCES</span><b>4 emails · 2 meetings · CRM opportunity</b></div></div>
      </div>}

      {stage === 2 && <WorkingArtifactScene mode="scope" chatPhase={chatPhase} typedQuestion={typedQuestion} progress={documentProgress} replay={() => setChatRun((run) => run + 1)} />}
      {stage === 3 && <WorkingArtifactScene mode="proposal" chatPhase={chatPhase} typedQuestion={typedQuestion} progress={documentProgress} replay={() => setChatRun((run) => run + 1)} />}
    </div>
  </ProductFrame></div>;
}

function WorkingArtifactScene({ mode, chatPhase, typedQuestion, progress, replay }) {
  const proposal = mode === "proposal";
  const question = proposal ? proposalQuestion : scopeQuestion;
  const paneOpen = chatPhase === "response";
  const historyRef = useRef(null);

  useEffect(() => {
    const history = historyRef.current;
    if (!history) return;
    history.scrollTo({ top: history.scrollHeight, behavior: "smooth" });
  }, [chatPhase]);

  return <div className={`ps-working-scene ps-scope-shot${paneOpen ? " has-artifact" : ""}`}>
    <section className="ps-working-chat">
      <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>{proposal ? "Client email and Teams transcript admitted 8 min ago" : "CRM, email, and Teams context current"}</span></div>
      <div className="ps-conversation-history" ref={historyRef} tabIndex="0" aria-label={`${proposal ? "Proposal" : "Scoping"} conversation history`}>
        {proposal ? <>
          <div className="ps-history-event"><i>✓</i><span><b>Internal scope v3 approved</b><small>Maya Chen · Managing Director · yesterday 16:42</small></span></div>
          <div className="ps-history-turn is-user"><span><b>Maya Chen</b><small>Keep partner coverage at 35% through the governance gates, and keep regional validation explicit.</small></span></div>
          <div className="ps-history-source"><i>EM</i><span><b>Client email admitted</b><small>Northstar asked to add a board working session and name change-readiness outputs.</small></span><em>08:51</em></div>
          <div className="ps-history-source"><i>TM</i><span><b>Teams meeting admitted</b><small>Peak-season freeze moved forward by one week; finance sponsor confirmed.</small></span><em>09:18</em></div>
          <div className="ps-history-turn is-agent"><i className="ps-ai-mark">A.</i><span><b>AllianceOne</b><small>I updated the proposal basis: confirmed 35% partner coverage, added the board session and change-readiness outputs, and resequenced validation around the new freeze.</small></span></div>
        </> : <>
          <div className="ps-history-turn is-user"><span><b>Maya Chen</b><small>Use a small core team, but give each region a named validation lead.</small></span></div>
          <div className="ps-history-turn is-agent"><i className="ps-ai-mark">A.</i><span><b>AllianceOne</b><small>The closest precedents used a six-person core team with regional leads joining during validation. I’ve carried that shape forward.</small></span></div>
          <div className="ps-history-source"><i>TM</i><span><b>Teams meeting admitted</b><small>COO confirmed the board date and asked that service-continuity testing precede role design.</small></span><em>11:42</em></div>
          <div className="ps-history-turn is-user"><span><b>Maya Chen</b><small>Protect the board date. Sequence the roadmap around governance decisions, not functions.</small></span></div>
          <div className="ps-history-turn is-agent"><i className="ps-ai-mark">A.</i><span><b>AllianceOne</b><small>Updated: four workstreams over 14 weeks, with decision rights first, regional validation funded explicitly, and the transition roadmap tied to the November 20 board gate.</small></span></div>
          <div className="ps-history-turn is-user"><span><b>Maya Chen</b><small>Where have similar operating-model engagements run into trouble, and what should we carry into Northstar?</small></span></div>
          <div className="ps-history-research">
            <div className="ps-history-research-head"><i className="ps-ai-mark">A.</i><p><b>AllianceOne</b><small>Seven comparable engagements reviewed · 43 admitted sources</small></p><em>Grounded answer</em></div>
            <p><strong>The recurring failure was underfunding regional validation.</strong> Five of seven comparable engagements treated adoption as a late change activity. Three then slipped when decision-rights design and role design moved in parallel before regional leaders had validated the operating constraints.</p>
            <div><span><b>Harbor Grain</b><small>Validation added four weeks after design</small></span><span><b>Meridian Components</b><small>Decision rights sequenced first · on plan</small></span><span><b>Redwood Consumer</b><small>Service-continuity gate added too late</small></span></div>
            <aside><span>APPLICABLE TO NORTHSTAR</span><b>Fund regional validation as its own workstream, settle decision rights before role design, and make service continuity a formal gate before the November 20 board decision.</b></aside>
          </div>
        </>}
        {(chatPhase === "thinking" || chatPhase === "response") && <div className="ps-history-turn is-user is-final ps-chat-enter"><span><b>Maya Chen</b><small>{question}</small></span></div>}
        {chatPhase === "thinking" && <div className="ps-chat-thinking"><span className="ps-ai-mark">A.</span><div><b>AllianceOne</b><p><i /><i /><i /> {proposal ? "Reconciling approved scope with new client context" : "Assembling the first scope draft"}</p></div></div>}
        {chatPhase === "response" && <div className="ps-history-turn is-agent ps-chat-response"><i className="ps-ai-mark">A.</i><span><b>AllianceOne</b><small>{proposal ? "Building the proposal now. Approved intent is preserved; the partner and client changes are reflected in the narrative and delivery sequence." : "Building the internal scope now. I’m grounding each section in the Pursuit Brief, this conversation, and your firm’s comparable engagements."}</small></span></div>}
      </div>
      <div className={`ps-composer ps-live-composer${chatPhase === "typing" ? " is-typing" : ""}`}><span>{chatPhase === "typing" ? typedQuestion : paneOpen ? "Continue working alongside the draft…" : "Ask about team, timing, roadmap, or precedent…"}{chatPhase === "typing" && <i />}</span><div><b>＋</b><b>#</b><button>{chatPhase === "typing" ? "Typing" : "Send ↑"}</button></div></div>
      <button className="ps-replay-chat" onClick={replay}>Replay generation</button>
    </section>
    <aside className="ps-generating-artifact" aria-hidden={!paneOpen}>
      <div className="ps-generation-toolbar"><div><span>ARTIFACT</span><b>{proposal ? "Proposal: Northstar operating-model redesign" : "Internal Scope: Northstar operating-model redesign"}</b></div><em>{progress < 100 ? `Generating ${progress}%` : proposal ? "Draft ready" : "Ready for partner review"}</em></div>
      <div className="ps-generation-progress"><i style={{ width: `${progress}%` }} /></div>
      <div className="ps-generation-lineage"><span>GROUNDED IN</span><b>{proposal ? "Approved scope v3 · partner review · 2 client updates · Pursuit Brief" : "Pursuit Brief · 6 working conversations · 7 comparable engagements"}</b></div>
      {proposal ? <div className="ps-live-document ps-live-proposal">
        <span className={progress >= 8 ? "is-written" : ""}>ALLIANCEONE ADVISORY</span>
        <h5 className={progress >= 16 ? "is-written" : ""}>Operating model redesign</h5>
        <small className={progress >= 22 ? "is-written" : ""}>Prepared for Northstar Foods · August 2026</small>
        <hr />
        <section className={`ps-proposal-summary${progress >= 30 ? " is-written" : ""}`}><h6>Executive summary</h6><p>Northstar will align decision rights, regional accountability, and shared-services ownership across eight regions while protecting service continuity through peak-season planning. The work concludes with a board-ready operating model and transition decision on November 20.</p></section>
        <div className={`ps-proposal-facts${progress >= 39 ? " is-written" : ""}`}><div><span>HORIZON</span><b>14 weeks</b></div><div><span>WORKSTREAMS</span><b>4</b></div><div><span>EFFORT</span><b>1,840h</b></div><div><span>DELIVERABLES</span><b>14</b></div></div>
        <div className={`ps-proposal-section${progress >= 50 ? " is-written" : ""}`}>
          <div className="ps-proposal-section-head"><span>01 / APPROACH & OUTPUTS</span><b>Board decision · Nov 20</b></div>
          <div className="ps-proposal-workstreams ps-proposal-workstreams--detail">{engagementWorkstreams.map(([n, name, timing, effort, outputs]) => <div key={n}><i>{n}</i><span><b>{name}</b><small>{outputs}</small></span><em>{timing}<small>{effort}</small></em></div>)}</div>
        </div>
        <div className={`ps-proposal-columns${progress >= 66 ? " is-written" : ""}`}>
          <div><span>02 / TEAM & LOADING</span><p><b>Partner 35%</b> · Design lead 100% · Regional lead 80% · Transition lead 80% · Senior consultant 100% · Consultant 100%</p></div>
          <div><span>03 / GOVERNANCE</span><p>Weekly engagement-lead review · biweekly steering committee · formal decision log · change control against the approved scope.</p></div>
        </div>
        <div className={`ps-proposal-columns${progress >= 78 ? " is-written" : ""}`}>
          <div><span>04 / CLIENT COMMITMENTS</span><p>Data access by week 2 · regional leaders available in weeks 8–11 · client PMO owns scheduling and executive coordination.</p></div>
          <div><span>05 / SUCCESS MEASURES</span><p>Eight regions validated · 14 outputs accepted · service continuity protected · board decision enabled by November 20.</p></div>
        </div>
        <div className={`ps-proposal-commercials${progress >= 88 ? " is-written" : ""}`}><div><span>COMMERCIAL MODEL</span><b>Capped T&amp;M · $420K</b><small>Monthly burn transparency · scope changes require written approval</small></div><div><span>SCOPE BOUNDARY</span><b>Design through transition readiness</b><small>Implementation execution begins only through an approved change</small></div></div>
        <div className={`ps-live-change${progress >= 96 ? " is-written" : ""}`}><span>REFLECTS LATEST CONTEXT</span><b>35% partner coverage · board working session · change-readiness outputs · revised freeze date</b></div>
      </div> : <div className="ps-live-document">
        <span className={progress >= 8 ? "is-written" : ""}>ENGAGEMENT SCOPE</span>
        <h5 className={progress >= 16 ? "is-written" : ""}>Operating model redesign</h5>
        <p className={progress >= 23 ? "is-written" : ""}>Define an enterprise operating model across eight regions while protecting service continuity through peak-season planning and enabling a board decision on November 20.</p>
        <div className={`ps-live-metrics${progress >= 34 ? " is-written" : ""}`}><div><span>HORIZON</span><b>14 weeks</b></div><div><span>WORKSTREAMS</span><b>4</b></div><div><span>EFFORT</span><b>1,840h</b></div><div><span>FEE CAP</span><b>$420K</b></div></div>
        <div className={`ps-live-scope-block${progress >= 46 ? " is-written" : ""}`}><div className="ps-scope-block-head"><span>01 / MANDATE &amp; SUCCESS</span><b>One fixed decision gate</b></div><p>Align enterprise decision rights, governance, and shared-services ownership; validate the model in all eight regions; deliver a transition-ready recommendation without moving the November 20 board date.</p><div className="ps-scope-success"><span>8/8 regions validated</span><span>14 deliverables accepted</span><span>Board decision · Nov 20</span></div></div>
        <div className={`ps-live-scope-block${progress >= 58 ? " is-written" : ""}`}><div className="ps-scope-block-head"><span>02 / WORKSTREAMS &amp; OUTPUTS</span><b>Contract schedule</b></div><div className="ps-scope-workstreams">{engagementWorkstreams.map(([n, name, timing, effort, outputs]) => <div key={n}><i>{n}</i><span><b>{name}</b><small>{outputs}</small></span><em>{timing}<small>{effort}</small></em></div>)}</div></div>
        <div className={`ps-live-scope-columns${progress >= 72 ? " is-written" : ""}`}><div><span>03 / IN SCOPE</span><p>Eight regions · field operations · shared services · governance · decision rights · service-continuity validation</p></div><div><span>04 / OUT OF SCOPE</span><p>Implementation execution · system configuration · workforce reductions · post-board operating support</p></div></div>
        <div className={`ps-live-scope-columns${progress >= 84 ? " is-written" : ""}`}><div><span>05 / TEAM &amp; LOADING</span><p>Partner 35% · design lead 100% · regional lead 80% · transition lead 80% · senior consultant 100% · consultant 100%</p></div><div><span>06 / ASSUMPTIONS</span><p>Source data by W2 · regional presidents available W8–11 · peak-season freeze protected · client PMO owns scheduling</p></div></div>
        <div className={`ps-live-scope-block ps-scope-governance${progress >= 94 ? " is-written" : ""}`}><div className="ps-scope-block-head"><span>07 / GOVERNANCE &amp; COMMERCIALS</span><b>Capped T&amp;M · $420,000</b></div><p>Weekly engagement-lead review · biweekly steering committee · formal change control for scope, timing, effort, or deliverables · board working session before the final decision package.</p></div>
      </div>}
      <div className="ps-generation-footer"><span>{progress < 100 ? "Writing from admitted evidence…" : proposal ? "Every material term traces to approved scope v3." : "Partner approval will lock the proposal basis."}</span><b>{progress >= 100 ? "View lineage ↗" : ""}</b></div>
    </aside>
  </div>;
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
  ["MC", "Maya Chen", "Managing Director", "35%", "All phases"],
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

function LegacyPlanScene() {
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
          <div><span>PHASE 04 · W11–14</span><b>Mobilize</b><small>Transition roadmap, board working session, and decision package</small></div>
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
      <div className="ps-plan-precedent-head"><div><span>SIMILAR ENGAGEMENTS</span><strong>What this plan carries forward from your firm’s delivery record</strong></div><Chip>7 compared · 3 pinned</Chip></div>
      <div className="ps-plan-precedent-grid">
        {planPrecedents.map(([fit, name, outcome, lesson]) => <div key={name}><b>{fit}</b><span><strong>{name}</strong><small>{outcome}</small></span><p>{lesson}</p></div>)}
      </div>
    </section>
    <div className="ps-plan-approval"><div><span>CANONICAL BASELINE</span><b>Scope · workstreams · team · effort · commercials · decision gates</b></div><button>Approve &amp; materialize <span>→</span></button></div>
  </ProductFrame>;
}

const planningRows = [
  ["01", "Decision frame & diagnostic", "S. Patel / A. Ross", "W1-4", "420h", "3 deliverables"],
  ["02", "Operating model design", "S. Patel", "W3-9", "760h", "5 deliverables"],
  ["03", "Regional validation", "D. Okafor", "W8-12", "360h", "3 deliverables"],
  ["04", "Transition roadmap", "J. Hale", "W11-14", "300h", "3 deliverables"],
];

const planningTeam = [
  { initials: "MC", name: "Maya Chen", role: "Managing Director", loading: "35%", window: "All phases", availability: "Confirmed", fit: "Executive sponsorship · board governance", precedent: "7 analogous engagements", assignment: "Approval gates · board working session" },
  { initials: "SP", name: "Sofia Patel", role: "Operating-model lead", loading: "100%", window: "W1-10", availability: "Confirmed", fit: "Operating-model design · decision rights", precedent: "91% precedent fit", assignment: "WS01-02 · 8 deliverables" },
  { initials: "DO", name: "Daniel Okafor", role: "Regional validation lead", loading: "80%", window: "W5-12", availability: "Confirmed W5", fit: "Regional governance · validation", precedent: "5 analogous engagements", assignment: "WS03 · 3 deliverables" },
  { initials: "JH", name: "Jordan Hale", role: "Transition lead", loading: "80%", window: "W8-14", availability: "Available W8", fit: "Mobilization · adoption planning", precedent: "84% precedent fit", assignment: "WS04 · 3 deliverables" },
  { initials: "AR", name: "Avery Ross", role: "Senior consultant", loading: "100%", window: "W1-14", availability: "Confirmed", fit: "Decision diagnostics · synthesis", precedent: "3 analogous engagements", assignment: "WS01 · DL-4401 / 4402 / 4405" },
  { initials: "LT", name: "Lena Torres", role: "Consultant", loading: "100%", window: "W1-12", availability: "Confirmed", fit: "Research · regional analysis", precedent: "2 analogous engagements", assignment: "WS01-03 · 6 deliverables" },
];

const planningPrompt = "Build the 14 deliverables under the four committed workstreams. Use the proposed team, check availability, and protect the fee and board date.";
const staffingDecisionPrompt = "Replace Elena with Daniel for regional validation. Keep the 80% loading and update the proposed team.";

function StaffingDecisionChat({ active }) {
  const [sceneRef, run, setRun] = usePlayWhenVisible(active);
  const [step, setStep] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");

  useEffect(() => {
    if (!run) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStep(reduceMotion ? 5 : 0);
    setTypedPrompt(reduceMotion ? staffingDecisionPrompt : "");
    if (reduceMotion) return undefined;

    const timers = [];
    let typeTimer;
    timers.push(window.setTimeout(() => setStep(1), 500));
    timers.push(window.setTimeout(() => {
      setStep(2);
      let cursor = 0;
      typeTimer = window.setInterval(() => {
        cursor += 1;
        setTypedPrompt(staffingDecisionPrompt.slice(0, cursor));
        if (cursor >= staffingDecisionPrompt.length) window.clearInterval(typeTimer);
      }, 12);
    }, 1450));
    const sentAt = 1450 + staffingDecisionPrompt.length * 12 + 260;
    timers.push(window.setTimeout(() => setStep(3), sentAt));
    timers.push(window.setTimeout(() => setStep(4), sentAt + 600));
    timers.push(window.setTimeout(() => setStep(5), sentAt + 1400));
    return () => {
      timers.forEach(window.clearTimeout);
      if (typeTimer) window.clearInterval(typeTimer);
    };
  }, [run]);

  return <section className="ps-planning-chat ps-staffing-decision-chat" ref={sceneRef}>
    <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Resource calendar and delivery history current</span></div>
    <div className="ps-plan-thread">
      <div className="ps-plan-system"><i>CAL</i><p><b>Resource calendar changed</b><small>Elena Marquez is no longer available during W8–12 regional validation.</small></p></div>
      <div className={`ps-plan-agent ps-plan-live-turn${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>Daniel Okafor is available W5–12, has led five analogous multi-region validations, and preserves the planned 80% loading without changing the fee or November 20 gate.</small></p></div>
      <div className={`ps-plan-user ps-plan-live-turn${step >= 3 ? " is-visible" : ""}`}><p><b>Maya Chen</b><small>{staffingDecisionPrompt}</small></p><i>MC</i></div>
      <div className={`ps-plan-thinking${step === 4 ? " is-visible" : ""}`}><i /><i /><i /><span>Updating assignments and plan coverage…</span></div>
      <div className={`ps-plan-agent ps-plan-agent--result ps-plan-live-turn${step >= 5 ? " is-visible" : ""}`}><i>A.</i><p><b>Team change recorded</b><small>Daniel now owns WS03 and its three deliverables. Coverage is restored with no commercial or timeline variance.</small></p></div>
      <div className={`ps-plan-source ps-plan-live-turn${step >= 5 ? " is-visible" : ""}`}><span>TEAM LINEAGE</span><b>Elena Marquez → Daniel Okafor</b><small>Team v1 advanced to Team v2 · just now</small></div>
    </div>
    <div className={`ps-plan-composer${step === 2 ? " is-typing" : ""}`}><span>{step === 2 ? typedPrompt : "Ask about availability, experience, loading, or team coverage…"}{step === 2 && <i />}</span><button type="button">{step === 2 ? "Typing" : "Send ↑"}</button></div>
    <button className="ps-plan-replay" type="button" onClick={() => setRun((value) => value + 1)}>Replay staffing decision</button>
  </section>;
}

export function PlanScene() {
  const [approved, setApproved] = useState(false);
  const [workspaceView, setWorkspaceView] = useState("Team");
  const [selectedMember, setSelectedMember] = useState(4);
  const [typedPlanPrompt, setTypedPlanPrompt] = useState("");
  const [chatStep, setChatStep] = useState(0);
  const [sceneRef, chatRun, setChatRun] = usePlayWhenVisible(workspaceView === "Plan", workspaceView);

  useEffect(() => {
    if (!chatRun) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setChatStep(reduceMotion ? 6 : 0);
    setTypedPlanPrompt(reduceMotion ? planningPrompt : "");
    if (reduceMotion) return undefined;

    const timers = [];
    let typeTimer;
    timers.push(window.setTimeout(() => setChatStep(1), 450));
    timers.push(window.setTimeout(() => {
      setChatStep(2);
      let cursor = 0;
      typeTimer = window.setInterval(() => {
        cursor += 1;
        setTypedPlanPrompt(planningPrompt.slice(0, cursor));
        if (cursor >= planningPrompt.length) window.clearInterval(typeTimer);
      }, 12);
    }, 1650));
    const sentAt = 1650 + planningPrompt.length * 12 + 300;
    timers.push(window.setTimeout(() => setChatStep(3), sentAt));
    timers.push(window.setTimeout(() => setChatStep(4), sentAt + 650));
    timers.push(window.setTimeout(() => setChatStep(5), sentAt + 1450));
    timers.push(window.setTimeout(() => setChatStep(6), sentAt + 2550));
    return () => {
      timers.forEach(window.clearTimeout);
      if (typeTimer) window.clearInterval(typeTimer);
    };
  }, [chatRun]);

  const replayPlanningChat = () => {
    setApproved(false);
    setChatRun((value) => value + 1);
  };

  const selected = planningTeam[selectedMember];

  return <div ref={sceneRef}><ProductFrame section="Engagement planning" title={workspaceView === "Plan" ? "Operating model redesign" : "Team & staffing"} status={approved ? "Plan approved" : workspaceView === "Team" ? "Staffing design" : "Planning mode"} className="ps-plan ps-plan-workbench" activeItem={workspaceView} onNavigate={setWorkspaceView} stageKey="plan">
    <div className="ps-plan-won-event"><i>✓</i><div><span>CRM EVENT / OPPORTUNITY WON</span><b>Northstar Foods · Operating model redesign</b><small>Salesforce · Aug 12, 2026 · Proposal v4 accepted</small></div><Chip tone="success">Engagement opened</Chip></div>
    <div className="ps-plan-locked"><div><span>COMMITTED ENGAGEMENT</span></div><p><span>14 weeks</span><span>4 workstreams</span><span>14 deliverables</span><span>1,840h</span><span>$420K cap</span><span>Nov 20 gate</span></p></div>
    {workspaceView === "Plan" ? <>
    <div className="ps-planning-workspace">
      <section className="ps-planning-chat">
        <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Accepted proposal, CRM, resource calendar, and delivery history current</span></div>
        <div className="ps-plan-thread">
          <div className="ps-plan-system"><i>CRM</i><p><b>Opportunity marked Won</b><small>Accepted proposal and commercial facts admitted to the engagement record.</small></p></div>
          <div className={`ps-plan-agent ps-plan-live-turn${chatStep >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>I carried forward the accepted scope, economics, staffing shape, and November 20 decision gate. Seven comparable engagements suggest funding regional validation explicitly and holding the board working session in week 13.</small></p></div>
          <div className={`ps-plan-user ps-plan-live-turn${chatStep >= 3 ? " is-visible" : ""}`}><p><b>You</b><small>{planningPrompt}</small></p><i>MC</i></div>
          <div className={`ps-plan-thinking${chatStep === 4 || chatStep === 5 ? " is-visible" : ""}`}><i /><i /><i /><span>Structuring deliverables and checking staffing…</span></div>
          <div className={`ps-plan-source ps-plan-live-turn${chatStep >= 5 ? " is-visible" : ""}`}><span>LIVE CONTEXT</span><b>Resource calendar updated · Daniel available W5-12</b><small>Resource management · just now</small></div>
          <div className={`ps-plan-agent ps-plan-agent--result ps-plan-live-turn${chatStep >= 6 ? " is-visible" : ""}`}><i>A.</i><p><b>Draft plan updated</b><small>Four workstreams, 14 deliverables, six named staff, review cycles, dependencies, and the regional validation sequence are now planned. No variance from the accepted proposal.</small></p></div>
        </div>
        <div className={`ps-plan-composer${chatStep === 2 ? " is-typing" : ""}`}><span>{chatStep === 2 ? typedPlanPrompt : "Ask about sequencing, staffing, dependencies, or effort…"}{chatStep === 2 && <i />}</span><button>{chatStep === 2 ? "Typing" : "Send ↑"}</button></div>
        <button className="ps-plan-replay" type="button" onClick={replayPlanningChat}>Replay planning flow</button>
      </section>
      <section className={`ps-plan-draft${approved ? " is-approved" : ""}${chatStep === 4 || chatStep === 5 ? " is-building" : ""}${chatStep >= 6 ? " is-chat-updated" : ""}`}>
        <div className="ps-planning-panel-head"><div><span>ENGAGEMENT PLAN / V1</span><b>{approved ? "Approved delivery baseline" : "Draft plan · approval required"}</b></div><Chip tone={approved ? "success" : "neutral"}>{approved ? "Approved" : "Tentative"}</Chip></div>
        <div className="ps-plan-sync"><i /><span>{chatStep < 4 ? "Waiting for planning instruction" : chatStep < 6 ? "Updating plan from Chat…" : "Updated from Chat · just now"}</span></div>
        <div className="ps-plan-draft-meta"><div><span>PLAN HEALTH</span><b>Aligned</b><small>0 commitment variances</small></div><div><span>STAFFING</span><b>6 / 6</b><small>Availability checked</small></div><div><span>EFFORT</span><b>1,840h</b><small>Within sold envelope</small></div></div>
        <div className="ps-plan-deliverables-head"><span>WORKSTREAM / DELIVERABLE PLAN</span><span>OWNER</span><span>WINDOW</span><span>EFFORT</span></div>
        <div className="ps-plan-deliverables">{planningRows.map(([n, name, owner, timing, effort, deliverables]) => <div key={n}><i>{n}</i><p><b>{name}</b><small>{deliverables}</small></p><span>{owner}</span><span>{timing}</span><strong>{effort}</strong></div>)}</div>
        <div className="ps-plan-assignments"><div><span>DELIVERY ASSIGNMENT / AVERY ROSS</span><b>WS01 · Decision frame &amp; diagnostic · 100% W1–4</b><small>DL-4401 Decision-rights baseline · DL-4402 Evidence pack · DL-4405 Design principles</small></div><div><span>LEAD &amp; DEPENDENCIES</span><b>Sofia Patel · Operating-model lead</b><small>Data W2 · regional interviews W2–3 · design begins W3</small></div></div>
        <div className="ps-plan-draft-gate"><div><span>FIXED DECISION GATE</span><b>Board operating-model approval</b></div><em>NOV 20</em></div>
        <div className="ps-plan-review"><div><span>{approved ? "BASELINE LOCKED" : "REVIEW REQUIRED"}</span><b>{approved ? "Intent v1 is ready for system writeback." : "Approval makes this the authoritative delivery intent."}</b></div><button type="button" onClick={() => setApproved(true)} disabled={approved}>{approved ? "Approved ✓" : "Approve delivery baseline →"}</button></div>
      </section>
    </div>
    </> : <div className="ps-staffing-workspace">
      <div className="ps-staffing-summary">
        <div><span>TEAM SHAPE</span><b>Team v2 · 6 / 6</b><small>Updated Aug 12, 2026</small></div>
        <div><span>AVAILABILITY</span><b>6 confirmed</b><small>Resource calendars checked</small></div>
        <div><span>EFFORT</span><b>1,840h</b><small>Within sold envelope</small></div>
        <div><span>KNOWLEDGE FIT</span><b>Strong</b><small>7 precedents compared</small></div>
      </div>
      <section className="ps-staffing-profile ps-staffing-profile--wide">
        <div className="ps-staffing-profile-head"><div><span>STAFFING RECOMMENDATION</span><h5>{selected.name}</h5><p>{selected.role} · {selected.loading} · {selected.window}</p></div><Chip tone="success">{selected.availability}</Chip></div>
        <div className="ps-staffing-fit">
          <div><span>WHY THIS PERSON</span><b>{selected.fit}</b><small>Role requirements inferred from the approved workstream and deliverable design.</small></div>
          <div><span>FIRM EXPERIENCE</span><b>{selected.precedent}</b><small>Prior delivery evidence, methods used, and outcome quality inform the recommendation.</small></div>
        </div>
        <div className="ps-staffing-assignment"><span>PLAN COVERAGE</span><b>{selected.assignment}</b><small>Assignment is tentative until the delivery baseline is approved.</small></div>
        <div className="ps-staffing-capacity"><div><span>W1</span><span>W4</span><span>W8</span><span>W12</span><span>W14</span></div><i><em /></i><small>Resource calendar · current client load · planned Northstar allocation</small></div>
        <div className="ps-staffing-evidence"><span>GROUNDED IN</span><p><b>Resource calendar</b><small>Availability and existing commitments</small></p><p><b>Delivery history</b><small>Comparable roles, work, and outcomes</small></p><p><b>Engagement plan</b><small>Required expertise, timing, and effort</small></p></div>
      </section>
      <div className="ps-staffing-main ps-staffing-main--decision">
        <StaffingDecisionChat active={workspaceView === "Team"} />
        <section className="ps-staffing-roster">
          <div className="ps-planning-panel-head"><div><span>PROPOSED TEAM</span><b>Fit, availability, and plan coverage</b></div><em>Resource data live</em></div>
          <div className="ps-staffing-list">
            {planningTeam.map((member, index) => <button key={member.name} type="button" className={selectedMember === index ? "is-selected" : ""} onClick={() => setSelectedMember(index)}>
              <span><b>{member.name}</b><small>{member.role}</small></span><em>{member.loading}<small>{member.availability}</small></em>
            </button>)}
          </div>
        </section>
      </div>
    </div>}
  </ProductFrame></div>;
}

const materializePrompt = "Publish approved plan v1 to Dynamics 365 Project Operations. Preserve the approved scope, dates, effort, team, deliverable ownership, dependencies, and November 20 decision gate.";

const writebackRows = [
  ["01", "Project contract", "Northstar Foods · Operating model redesign", "Account · Aug 17–Nov 20 · capped T&M · $420K · 1,840h · USD · Maya Chen", "1 record", "D365-2048"],
  ["02", "Workstreams", "4 approved workstreams", "Names · W1–14 windows · workstream leads · effort budgets · delivery sequence", "4 records", "PH-781–784"],
  ["03", "Deliverables", "14 committed deliverables", "IDs · owners · reviewers · due dates · acceptance criteria · dependency links", "14 records", "DL-4401–4414"],
  ["04", "Resource assignments", "6 named staff assignments", "Role · loading · weekly hours · allocation window · workstream and deliverable ownership", "6 records", "AS-901–906"],
  ["05", "Milestones & governance", "3 decision milestones", "Kickoff · partner reviews · board working session · fixed Nov 20 approval gate", "3 records", "MS-120–122"],
];

export function MaterializeScene() {
  const [materializeView, setMaterializeView] = useState("Approved plan");
  const [step, setStep] = useState(0);
  const [typedWritebackPrompt, setTypedWritebackPrompt] = useState("");
  const [sceneRef, run, setRun] = usePlayWhenVisible(materializeView === "System writeback", materializeView);

  useEffect(() => {
    if (!run) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStep(reduceMotion ? 10 : 0);
    setTypedWritebackPrompt(reduceMotion ? materializePrompt : "");
    if (reduceMotion) return undefined;
    const timers = [];
    let typeTimer;
    timers.push(window.setTimeout(() => setStep(1), 450));
    timers.push(window.setTimeout(() => {
      setStep(2);
      let cursor = 0;
      typeTimer = window.setInterval(() => {
        cursor += 1;
        setTypedWritebackPrompt(materializePrompt.slice(0, cursor));
        if (cursor >= materializePrompt.length) window.clearInterval(typeTimer);
      }, 10);
    }, 1150));
    const sentAt = 1150 + materializePrompt.length * 10 + 260;
    timers.push(window.setTimeout(() => setStep(3), sentAt));
    timers.push(window.setTimeout(() => setStep(4), sentAt + 650));
    for (let index = 0; index < writebackRows.length; index += 1) {
      timers.push(window.setTimeout(() => setStep(5 + index), sentAt + 1450 + index * 600));
    }
    timers.push(window.setTimeout(() => setStep(10), sentAt + 4750));
    return () => {
      timers.forEach(window.clearTimeout);
      if (typeTimer) window.clearInterval(typeTimer);
    };
  }, [run]);

  const replayWriteback = () => setRun((value) => value + 1);
  const progress = step <= 0 ? 0 : step < 5 ? step * 7 : step >= 10 ? 100 : 28 + (step - 4) * 14;
  const navigateMaterialize = (key) => setMaterializeView(key);

  return <div ref={sceneRef}><ProductFrame section="Plan materialization" title={materializeView === "Approved plan" ? "Approved delivery baseline" : "Writeback run AO-2048"} status={materializeView === "Approved plan" ? "Baseline v1 locked" : step >= 10 ? "Published" : "Writing to Dynamics 365"} className="ps-materialize ps-materialize-live" stageKey="materialize" activeItem={materializeView} onNavigate={navigateMaterialize}>
    {materializeView === "Approved plan" ? <div className="ps-approved-plan">
      <div className="ps-approved-plan-head"><div><span>APPROVED PLAN / BASELINE V1</span><h5>Northstar Foods operating model redesign</h5><p>The authoritative delivery intent created from the accepted proposal and the approved staffing and engagement plan.</p></div><div><Chip tone="success">Approved</Chip><small>Maya Chen · Aug 12, 2026 · 10:18 AM</small></div></div>
      <div className="ps-approved-plan-metrics"><div><span>DURATION</span><b>14 weeks</b><small>Aug 17 – Nov 20</small></div><div><span>WORKSTREAMS</span><b>4</b><small>14 deliverables</small></div><div><span>EFFORT</span><b>1,840h</b><small>6 named staff</small></div><div><span>COMMERCIAL CAP</span><b>$420K</b><small>0 commitment variances</small></div><div><span>DECISION GATE</span><b>Nov 20</b><small>Board approval</small></div></div>
      <div className="ps-approved-plan-grid">
        <section className="ps-approved-plan-work"><div className="ps-approved-plan-sectionhead"><span>APPROVED WORKSTREAM &amp; DELIVERABLE PLAN</span><small>Immutable baseline</small></div>{planningRows.map(([n, name, owner, timing, effort, deliverables]) => <div className="ps-approved-workstream" key={n}><i>{n}</i><p><b>{name}</b><small>{deliverables}</small></p><span>{owner}</span><span>{timing}</span><strong>{effort}</strong></div>)}</section>
        <aside className="ps-approved-plan-side">
          <section><span>APPROVED TEAM</span><div className="ps-approved-team"><i>MC</i><i>SP</i><i>DO</i><i>JH</i><i>AR</i><i>LT</i></div><b>Maya Chen · Managing Director</b><small>Sofia Patel leads delivery · Avery Ross owns WS01 diagnostics</small></section>
          <section><span>PROTECTED COMMITMENTS</span><p><b>Scope</b><small>Four workstreams and 14 named outputs</small></p><p><b>Economics</b><small>1,840 planned hours within $420K cap</small></p><p><b>Governance</b><small>Partner review and fixed Nov 20 board gate</small></p></section>
          <section><span>LINEAGE</span><b>Proposal v4 → Team v2 → Plan v1</b><small>Approved facts remain traceable through execution.</small></section>
        </aside>
      </div>
    </div> : <>
    <div className="ps-materialize-baseline">
      <div><span>APPROVED DELIVERY INTENT</span><strong>Engagement plan · baseline v1</strong><small>Approved by Maya Chen · Aug 12, 2026 · immutable source</small></div>
      <i>→</i>
      <div><span>DESTINATION / PSA &amp; PROJECT MANAGEMENT</span><strong>Microsoft Dynamics 365 Project Operations</strong><small>Northstar Foods account · production workspace</small></div>
      <Chip tone="success">Authorized</Chip>
    </div>
    <div className="ps-materialize-command ps-materialize-dialogue">
      <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Approved plan v1 and Dynamics 365 Project Operations schema current</span></div>
      <div className="ps-plan-thread">
        <div className="ps-plan-system"><i>PSA</i><p><b>Destination connected</b><small>Northstar Foods production workspace · permissions and field mapping validated.</small></p></div>
        <div className={`ps-plan-agent ps-plan-live-turn${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>I’m ready to create 28 governed PSA records from the approved baseline: the project contract, four workstreams, 14 deliverables, six resource assignments, and three decision milestones.</small></p></div>
        <div className={`ps-plan-user ps-plan-live-turn${step >= 3 ? " is-visible" : ""}`}><p><b>Maya Chen</b><small>{materializePrompt}</small></p></div>
        <div className={`ps-plan-thinking${step === 4 ? " is-visible" : ""}`}><i /><i /><i /><span>Validating approved fields and creating PSA records…</span></div>
        <div className={`ps-plan-source ps-plan-live-turn${step >= 4 ? " is-visible" : ""}`}><span>VALIDATED MAPPING</span><b>28 records · 0 plan changes · full lineage retained</b><small>Approved plan v1 → Dynamics 365 · just now</small></div>
        <div className={`ps-plan-agent ps-plan-agent--result ps-plan-live-turn${step >= 10 ? " is-visible" : ""}`}><i>A.</i><p><b>Writeback complete</b><small>Every project, workstream, deliverable, assignment, and milestone record was created. Execution can now begin against the approved commitment.</small></p></div>
      </div>
      <div className={`ps-plan-composer${step === 2 ? " is-typing" : ""}`}><span>{step === 2 ? typedWritebackPrompt : "Ask about the PSA mapping, approved fields, or writeback status…"}{step === 2 && <i />}</span><button type="button">{step === 2 ? "Typing" : "Send ↑"}</button></div>
      <div className="ps-materialize-runstate"><div><span>{step < 4 ? "READY TO PUBLISH" : step < 10 ? "WRITEBACK IN PROGRESS" : "TRANSACTION COMPLETE"}</span><b>{step < 4 ? "28 approved records mapped" : step < 10 ? `Creating governed PSA records · ${progress}%` : "28 records created · 0 exceptions"}</b></div><button type="button" onClick={replayWriteback}>{step >= 10 ? "Replay writeback" : "Running…"}</button></div>
      <div className="ps-materialize-progress"><i style={{ width: `${progress}%` }} /></div>
    </div>
    <div className="ps-writeback-map ps-writeback-map--live">
      <div className="ps-writeback-head"><span>PSA OBJECT</span><span>APPROVED PLAN INPUT</span><span>DYNAMICS 365 RECORD</span><span>STATUS</span></div>
      {writebackRows.map(([, object, fields, details, count, record], i) => {
        const rowStep = i + 5;
        const created = step >= rowStep;
        const writing = step === rowStep - 1;
        return <div className={`ps-writeback-row${created ? " is-created" : ""}${writing ? " is-writing" : ""}`} key={object}>
          <div className="ps-writeback-object"><strong>{object}</strong></div>
          <span className="ps-writeback-fields"><b>{fields}</b><small>{details}</small></span>
          <div className="ps-writeback-record"><b>{created ? record : "Not assigned"}</b><small>{created ? count : "Not created"}</small></div>
          <em className={created ? "ps-writeback-done" : writing ? "ps-writeback-active" : "ps-writeback-waiting"}>{created ? "Created ✓" : writing ? "Writing…" : "Queued"}</em>
        </div>;
      })}
    </div>
    <div className={`ps-materialize-receipt${step >= 10 ? " is-visible" : ""}`}>
      <div><span>WRITEBACK RECEIPT / AO-2048</span><b>28 Dynamics 365 records created from approved baseline v1</b><small>Dynamics 365 transaction D365-TX-88421 · completed Aug 12, 2026 10:42 AM</small></div>
      <div><span>BASELINE PROTECTION</span><b>0 changes · 0 exceptions · full lineage retained</b><small>Execution updates now flow back against this commitment.</small></div>
      <em>Open in Dynamics 365 ↗</em>
    </div>
    </>}
  </ProductFrame></div>;
}

const executePrompt = "Give me the context I need to build the decision-rights baseline. Pull the relevant firm methods, comparable work, and the evidence gaps I still need to close.";
const executeResponse = "The load-bearing question is which decisions Northstar should centralize, federate, or leave local, and what evidence each region will accept. Classify the 26 priority decisions, test the proposed owners across all eight regions, and flag service-continuity conflicts explicitly. Start with your firm’s Decision Rights Diagnostic, then adapt the Harbor Grain validation matrix. I found three evidence gaps to close before partner review.";

const executeAssignments = [
  ["DL-4401", "Decision-rights baseline", "In progress", "W4"],
  ["DL-4402", "Current-state evidence pack", "Next", "W3"],
  ["DL-4405", "Design principles memo", "Planned", "W5"],
];

export function ExecuteScene() {
  const [step, setStep] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [sceneRef, run, setRun] = usePlayWhenVisible(true);
  const threadRef = useRef(null);

  useEffect(() => {
    if (!run) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedPrompt(executePrompt);
      setTypedResponse(executeResponse);
      setStep(10);
      return undefined;
    }

    setStep(0);
    setTypedPrompt("");
    setTypedResponse("");
    let promptCursor = 0;
    let responseCursor = 0;
    let typeTimer;
    let responseTimer;
    const timers = [
      window.setTimeout(() => setStep(1), 400),
      window.setTimeout(() => {
        setStep(2);
        typeTimer = window.setInterval(() => {
          promptCursor += 1;
          setTypedPrompt(executePrompt.slice(0, promptCursor));
          if (promptCursor >= executePrompt.length) window.clearInterval(typeTimer);
        }, 12);
      }, 1100),
      window.setTimeout(() => setStep(3), 3050),
      window.setTimeout(() => setStep(4), 3550),
      window.setTimeout(() => setStep(5), 4250),
      window.setTimeout(() => setStep(6), 4950),
      window.setTimeout(() => setStep(7), 5650),
      window.setTimeout(() => {
        setStep(8);
        responseTimer = window.setInterval(() => {
          responseCursor += 1;
          setTypedResponse(executeResponse.slice(0, responseCursor));
          if (responseCursor >= executeResponse.length) window.clearInterval(responseTimer);
        }, 8);
      }, 6350),
      window.setTimeout(() => setStep(9), 9550),
      window.setTimeout(() => setStep(10), 10150),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(typeTimer);
      window.clearInterval(responseTimer);
    };
  }, [run]);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTo({ top: thread.scrollHeight, behavior: step > 1 ? "smooth" : "auto" });
  }, [step, typedResponse]);

  const sourceCount = step < 5 ? 0 : step < 6 ? 1 : step < 7 ? 2 : 3;

  return <div ref={sceneRef}><ProductFrame section="Consultant workspace" title="Decision-rights baseline" status={step >= 10 ? "Work packet ready" : "In delivery"} className="ps-execute" stageKey="execute" role="consultant">
    <div className="ps-execute-summary">
      <div className="ps-execute-person"><i>AR</i><p><span>MY WORK / AVERY ROSS</span><b>Operating model redesign</b><small>Senior Consultant · WS01 Decision frame &amp; diagnostic · 100% W1–4</small></p></div>
      <div><span>ASSIGNED</span><b>3 deliverables</b><small>1 needs attention</small></div>
      <div><span>THIS WORKSTREAM</span><b>420h committed</b><small>Week 1–4</small></div>
      <div><span>CLIENT GATE</span><b>Nov 20</b><small>Board approval</small></div>
    </div>
    <div className="ps-execute-workspace">
      <aside className="ps-execute-assignments">
        <div className="ps-execute-panelhead"><span>ASSIGNED WORK</span><b>My deliverables</b></div>
        {executeAssignments.map(([id, name, status, due], index) => <button type="button" className={index === 0 ? "is-active" : ""} key={id}>
          <span>{id}</span><b>{name}</b><small>{status} · due {due}</small><i>{index === 0 ? "→" : ""}</i>
        </button>)}
        <div className="ps-execute-engagement"><span>ENGAGEMENT BRIEF</span><b>Northstar Foods</b><p>Redesign decision rights and shared services across eight regions without disrupting service continuity.</p><em>Approved plan v1 ↗</em></div>
      </aside>
      <section className="ps-execute-chat">
        <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Engagement evidence, firm research, and delivery activity current</span></div>
        <div className="ps-execute-panelhead"><div><span>DELIVERABLE / DL-4401</span><b>Decision-rights baseline</b></div><em className={step > 0 && step < 10 ? "is-live" : ""}>{step > 0 && step < 10 ? "● RESEARCHING" : "7 sources connected"}</em></div>
        <div className="ps-execute-thread" ref={threadRef}>
          <div className="ps-execute-system"><i>PM</i><p><b>Avery Ross assignment AS-905 admitted from Dynamics 365</b><small>WS01 · 100% W1–4 · 420h workstream budget · Sofia Patel reviewer · three assigned deliverables.</small></p></div>
          <div className={`ps-execute-turn ps-execute-agent${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>Avery, you own DL-4401, DL-4402, and DL-4405 within Workstream 01. Begin with the decision-rights baseline: it must distinguish enterprise, regional, and local authority before Sofia’s future-state design can begin.</small></p></div>
          <div className={`ps-execute-turn ps-execute-user ps-execute-history${step >= 1 ? " is-visible" : ""}`}><p><b>Avery Ross</b><small>Before I start, where have similar operating-model engagements run into trouble during regional decision-rights work?</small></p><i>AR</i></div>
          <div className={`ps-execute-turn ps-execute-agent ps-execute-result ps-execute-history${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>Comparable engagement research</b><small>Across Harbor Grain and Meridian Consumer, the recurring failure was validating the model only with corporate leaders. Regional teams later challenged ownership assumptions, delaying design approval by two to three weeks. For Northstar, interview all eight regions before classifying the 26 priority decisions and record dissent as evidence, not as an exception.</small><em className="is-visible">Grounded in 2 completed engagements · 11 source documents</em></p></div>
          <div className={`ps-execute-turn ps-execute-user${step >= 3 ? " is-visible" : ""}`}><p><b>You</b><small>{executePrompt}</small></p><i>AR</i></div>
          <div className={`ps-execute-thinking${step === 4 || step === 5 ? " is-visible" : ""}`}><i /><i /><i /><span>Reading engagement evidence and firm methods…</span></div>
          <div className={`ps-execute-source-run${step >= 5 && step < 8 ? " is-visible" : ""}`}><i /><span>Grounding response · {sourceCount}/3 priority sources resolved</span></div>
          <div className={`ps-execute-sources${step >= 5 ? " is-visible" : ""}`}><span className={step >= 5 ? "is-resolved" : ""}>APPROVED PLAN / V1</span><span className={step >= 6 ? "is-resolved" : ""}>DECISION RIGHTS DIAGNOSTIC / V6</span><span className={step >= 7 ? "is-resolved" : ""}>HARBOR GRAIN / 91% FIT</span></div>
          <div className={`ps-execute-turn ps-execute-agent ps-execute-result${step >= 8 ? " is-visible" : ""}`}><i>A.</i><p><b>Here is the load-bearing work</b><small>{typedResponse}{step === 8 && <i className="ps-execute-stream-cursor" />}</small><em className={`ps-execute-grounding-note${step >= 9 ? " is-visible" : ""}`}>Grounded in 7 engagement and firm sources · 3 evidence gaps flagged</em></p></div>
        </div>
        <div className={`ps-execute-composer${step === 2 ? " is-typing" : ""}`}><span>{step === 2 ? typedPrompt : "Ask about the deliverable, research your firm’s record, or draft from a template…"}{step === 2 && <i />}</span><button type="button">{step === 2 ? "Typing…" : step >= 3 && step < 9 ? "Sent ✓" : "Send ↑"}</button></div>
        <button className="ps-execute-replay" type="button" onClick={() => setRun((value) => value + 1)}>Replay consultant flow</button>
      </section>
      <aside className={`ps-execute-brief${step >= 9 ? " is-grounded" : ""}`}>
        <div className="ps-execute-panelhead"><div><span>DELIVERABLE BRIEF / DL-4401</span><b>Decision-rights baseline</b></div><Chip tone={step >= 9 ? "success" : "neutral"}>{step >= 9 ? "Grounded" : "Committed"}</Chip></div>
        <div className="ps-execute-briefmeta"><div><span>OWNER / PLAN</span><b>Avery Ross · AS-905</b></div><div><span>REVIEWER</span><b>Sofia Patel</b></div><div><span>EFFORT</span><b>96h of 420h</b></div><div><span>DUE</span><b>Week 4</b></div></div>
        <section><span>WHAT THIS MUST ACCOMPLISH</span><p>Establish the current decision baseline and the evidence needed to recommend which decisions centralize, federate, or remain local.</p></section>
        <section><span>ACCEPTANCE CONDITIONS</span><ul><li>26 priority decisions classified</li><li>All eight regions represented</li><li>Owners and escalation paths named</li><li>Contradictions and evidence gaps explicit</li></ul></section>
        <section className="ps-execute-methods"><span>FIRM METHODS & TEMPLATES</span><div><b>Decision Rights Diagnostic</b><small>Firm method · v6</small></div><div><b>Regional validation matrix</b><small>Adapted from Harbor Grain</small></div></section>
        <div className={`ps-execute-packet${step >= 10 ? " is-visible" : ""}`}><div><span>GROUNDED WORK PACKET</span><b>7 sources · 2 methods · 3 open evidence gaps</b></div><button type="button">Draft from template →</button></div>
      </aside>
    </div>
  </ProductFrame></div>;
}

const reconcilePrompt = "Why did effort run 4.1% over plan if we still finished under the revised fee cap? Tell me whether this was scope drift or an approved delivery decision.";
const reconcileResponse = "This was an approved delivery decision, not unmanaged scope drift. CO-01 funded one additional week of regional validation after three regions raised service-continuity concerns. That decision accounts for 64 of the 75 incremental hours; the remaining 11 hours were partner re-review. The team still finished $14K under the revised cap because unused transition contingency and a lower senior-staffing mix offset the added effort. The Nov 20 board commitment did not move.";

const decisionRecords = [
  ["AUG 12", "PLAN-01", "Commitment", "Delivery baseline approved", "Four workstreams, 14 deliverables, 1,840 hours, and the Nov 20 board gate became the governed commitment."],
  ["SEP 08", "CH-03", "Challenge", "Regional service-continuity risk raised", "West, Central, and Northeast leaders challenged the corporate-only validation approach and requested local operating evidence."],
  ["SEP 12", "TEAM-02", "Team change", "Regional lead reassigned", "Daniel Okafor replaced Elena Marquez for WS03 after a resource-calendar conflict. Loading, fees, and milestones remained unchanged."],
  ["OCT 02", "CO-01", "Scope decision", "Regional validation extended", "Maya Chen and Evan Brooks approved one additional week, 64 incremental hours, and a $42K cap increase while protecting the board date."],
  ["NOV 20", "OUT-01", "Outcome", "Board gate delivered", "The target operating model was approved on the committed date. Actual fees closed $14K below the revised cap."],
];

function DecisionRecord() {
  return <div className="ps-decision-record">
    <div className="ps-decision-summary">
      <div><span>DECISIONS</span><b>3</b><small>Plan, team, and scope</small></div>
      <div><span>CHALLENGES</span><b>1</b><small>Resolved with evidence</small></div>
      <div><span>COMMERCIAL CHANGES</span><b>1</b><small>CO-01 · +$42K</small></div>
      <div><span>OPEN ITEMS</span><b>0</b><small>Record complete</small></div>
    </div>
    <div className="ps-decision-grid">
      <section className="ps-decision-log">
        <div className="ps-decision-head"><span>ENGAGEMENT RECORD</span><b>What changed, why, and what followed</b></div>
        {decisionRecords.map(([date, id, type, title, detail]) => <article className={id === "CO-01" ? "is-selected" : ""} key={id}>
          <time>{date}</time><div><span>{type} · {id}</span><b>{title}</b><small>{detail}</small></div>
        </article>)}
      </section>
      <aside className="ps-decision-detail">
        <div className="ps-decision-head"><span>SELECTED RECORD / CO-01</span><b>Regional validation extension</b></div>
        <section><span>CHALLENGE RAISED</span><p>Three regions would not accept the future-state decision model without testing service-continuity implications against local workflows.</p></section>
        <section><span>ORIGINAL COMMITMENT</span><p>Complete regional validation in two weeks within 1,840 planned hours and a $420K fee cap.</p></section>
        <section><span>DECISION &amp; RATIONALE</span><p>Extend validation by one week and add 64 hours. The added work was narrower and less risky than proceeding with unresolved regional objections.</p></section>
        <div className="ps-decision-impact"><div><span>SCHEDULE</span><b>+1 week</b></div><div><span>EFFORT</span><b>+64h</b></div><div><span>CAP</span><b>+$42K</b></div><div><span>BOARD GATE</span><b>Protected</b></div></div>
        <section><span>DECISION METADATA</span><p><b>Raised by</b> Evan Brooks, Regional Operations Lead<br/><b>Approved by</b> Maya Chen and Evan Brooks<br/><b>Recorded</b> October 2, 2026 · 3:14 PM<br/><b>Confidence</b> High · corroborated across eight sources</p></section>
        <section><span>DELIVERED OUTCOME</span><p>All eight regions completed validation. The board approved the model on Nov 20, and the engagement closed $14K below the revised cap.</p></section>
      </aside>
    </div>
  </div>;
}

export function ReconcileScene() {
  const [step, setStep] = useState(0);
  const [reconcileView, setReconcileView] = useState("Commitment reconciliation");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [sceneRef, run, setRun] = usePlayWhenVisible(reconcileView === "Commitment reconciliation", reconcileView);

  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedPrompt(reconcilePrompt); setTypedResponse(reconcileResponse); setStep(10); return undefined;
    }
    setStep(0); setTypedPrompt(""); setTypedResponse("");
    let promptCursor = 0; let responseCursor = 0; let promptTimer; let responseTimer;
    const timers = [
      window.setTimeout(() => setStep(1), 400),
      window.setTimeout(() => { setStep(2); promptTimer = window.setInterval(() => { promptCursor += 1; setTypedPrompt(reconcilePrompt.slice(0, promptCursor)); if (promptCursor >= reconcilePrompt.length) window.clearInterval(promptTimer); }, 12); }, 950),
      window.setTimeout(() => setStep(3), 2800),
      window.setTimeout(() => setStep(4), 3400),
      window.setTimeout(() => setStep(5), 4050),
      window.setTimeout(() => setStep(6), 4650),
      window.setTimeout(() => setStep(7), 5250),
      window.setTimeout(() => { setStep(8); responseTimer = window.setInterval(() => { responseCursor += 1; setTypedResponse(reconcileResponse.slice(0, responseCursor)); if (responseCursor >= reconcileResponse.length) window.clearInterval(responseTimer); }, 8); }, 5900),
      window.setTimeout(() => setStep(9), 9300),
      window.setTimeout(() => setStep(10), 9950),
    ];
    return () => { timers.forEach(window.clearTimeout); window.clearInterval(promptTimer); window.clearInterval(responseTimer); };
  }, [run]);

  const sourceCount = Math.max(0, Math.min(4, step - 3));
  return <div ref={sceneRef}><ProductFrame section={reconcileView} title={reconcileView === "Decision record" ? "Northstar engagement record" : "Operating model redesign"} status={reconcileView === "Decision record" ? "Record complete" : step >= 10 ? "Variance explained" : "In delivery"} className="ps-reconcile ps-reconcile-live" stageKey="reconcile" activeItem={reconcileView} onNavigate={setReconcileView}>
    {reconcileView === "Commitment reconciliation" ? <>
    <div className="ps-reconcile-top">
      <div><span>ORIGINAL COMMITMENT</span><strong>$420K</strong><small>Approved Aug 08</small></div><i>→</i>
      <div><span>APPROVED CHANGE</span><strong>+$42K</strong><small>CO-01 · Oct 02</small></div><i>→</i>
      <div><span>REVISED CAP</span><strong>$462K</strong><small>Canonical baseline</small></div><i>→</i>
      <div className="ps-actual"><span>ACTUAL</span><strong>$448K</strong><small>3.0% under cap</small></div>
    </div>
    <div className="ps-reconcile-live-grid">
      <section className="ps-reconcile-data">
        <div className="ps-live-panelhead"><div><span>COMMITTED VS. DELIVERED</span><b>Canonical baseline compared with operating systems</b></div><em className={step >= 4 && step < 8 ? "is-live" : ""}>{step >= 4 && step < 8 ? `● READING ${sourceCount}/4` : "4 systems connected"}</em></div>
        <div className="ps-variance-table">
          <div className="ps-vrow ps-vhead"><span>ENGAGEMENT DETAIL</span><span>COMMITTED</span><span>DELIVERED</span><span>SOURCE / DELTA</span></div>
          <div className={`ps-vrow${step >= 4 ? " is-resolved" : ""}`}><b>Duration</b><span>14 weeks</span><span>15 weeks</span><em className="ps-alert">PM · +1 WK</em></div>
          <div className={`ps-vrow${step >= 5 ? " is-resolved" : ""}`}><b>Team effort</b><span>1,840h</span><span>1,915h</span><em className="ps-alert">TIME · +4.1%</em></div>
          <div className={`ps-vrow${step >= 6 ? " is-resolved" : ""}`}><b>Fee cap</b><span>$462K</span><span>$448K</span><em className="ps-good">ERP · −$14K</em></div>
          <div className={`ps-vrow${step >= 7 ? " is-resolved" : ""}`}><b>Board decision</b><span>NOV 20</span><span>NOV 20</span><em className="ps-good">CRM · PROTECTED</em></div>
        </div>
        <div className="ps-source-feeds ps-source-feeds--live">
          {[['PM','Dynamics 365','Tasks · milestones · effort'],['TIME','Replicon','Submitted hours · roles'],['ERP','NetSuite','Invoices · actuals · cap'],['DMS','Microsoft 365','CO-01 · approvals · rationale']].map(([code,name,detail], index) => <div className={step >= index + 4 ? "is-resolved" : ""} key={code}><b>{code}</b><span>{name}</span><em>{detail}</em><small>{step >= index + 4 ? "Resolved ✓" : "Waiting"}</small></div>)}
        </div>
      </section>
      <section className="ps-reconcile-chat">
        <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Commitments, actuals, and decision records current</span></div>
        <div className="ps-reconcile-thread">
          <div className={`ps-live-turn ps-live-agent${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>I found a one-week duration variance, 75 additional hours, and a $14K favorable fee variance against the revised cap.</small></p></div>
          <div className={`ps-live-turn ps-live-user${step >= 3 ? " is-visible" : ""}`}><p><b>You</b><small>{reconcilePrompt}</small></p><i>MC</i></div>
          <div className={`ps-live-thinking${step >= 4 && step < 8 ? " is-visible" : ""}`}><i /><i /><i /><span>Joining commitments, actuals, and decision evidence…</span></div>
          <div className={`ps-live-turn ps-live-agent ps-live-result${step >= 8 ? " is-visible" : ""}`}><i>A.</i><p><b>Variance resolved</b><small>{typedResponse}{step === 8 && <i className="ps-execute-stream-cursor" />}</small><em className={step >= 9 ? "is-visible" : ""}>Grounded in CO-01, Dynamics 365, Replicon, and NetSuite</em></p></div>
        </div>
        <div className={`ps-live-composer-row${step === 2 ? " is-typing" : ""}`}><span>{step === 2 ? typedPrompt : "Ask why delivery diverged from the commitment…"}{step === 2 && <i />}</span><button type="button">{step === 2 ? "Typing…" : step >= 3 && step < 9 ? "Sent ✓" : "Send ↑"}</button></div>
        <button className="ps-live-replay" type="button" onClick={() => setRun((value) => value + 1)}>Replay reconciliation</button>
      </section>
    </div>
    </> : <DecisionRecord />}
  </ProductFrame></div>;
}

const learningPrompt = "Close out Northstar. Which delivery lessons have enough evidence to carry into the next operating-model pursuit, and what should remain only an observation?";
const learningResponse = "The reconciled record supports three practice lessons. CH-03 and CO-01 show that regional validation must be explicit in sold effort when local service continuity constrains the model. The delivery sequence confirms that decision rights should be resolved before role design begins. TEAM-02 shows that a resource substitution can preserve economics and milestones when experience, loading, and decision rationale are recorded together. The fixed-board-date pattern remains an observation because only three comparable engagements support it.";

export function PracticeScene() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [sceneRef, run, setRun] = usePlayWhenVisible(true);

  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTypedPrompt(learningPrompt); setTypedResponse(learningResponse); setStep(9); return undefined; }
    setStep(0); setTypedPrompt(""); setTypedResponse("");
    let promptCursor = 0; let responseCursor = 0; let promptTimer; let responseTimer;
    const timers = [
      window.setTimeout(() => setStep(1), 400),
      window.setTimeout(() => { setStep(2); promptTimer = window.setInterval(() => { promptCursor += 1; setTypedPrompt(learningPrompt.slice(0, promptCursor)); if (promptCursor >= learningPrompt.length) window.clearInterval(promptTimer); }, 12); }, 950),
      window.setTimeout(() => setStep(3), 2850),
      window.setTimeout(() => setStep(4), 3450),
      window.setTimeout(() => setStep(5), 4200),
      window.setTimeout(() => { setStep(6); responseTimer = window.setInterval(() => { responseCursor += 1; setTypedResponse(learningResponse.slice(0, responseCursor)); if (responseCursor >= learningResponse.length) window.clearInterval(responseTimer); }, 8); }, 5050),
      window.setTimeout(() => setStep(7), 8350),
      window.setTimeout(() => setStep(8), 9000),
      window.setTimeout(() => setStep(9), 9600),
    ];
    return () => { timers.forEach(window.clearTimeout); window.clearInterval(promptTimer); window.clearInterval(responseTimer); };
  }, [run]);

  return <div ref={sceneRef}><ProductFrame section="Institutional learning" title="Northstar close-out" status={submitted ? "Close-out submitted" : step >= 9 ? "Ready to submit" : "Learning review"} className="ps-practice ps-practice-live" stageKey="learn" activeItem="Close-out">
    <div className="ps-learning-closeout"><div><span>RECONCILED OUTCOME</span><b>14 / 14 deliverables accepted</b><small>Board gate protected · $14K under revised cap</small></div><div><span>DECISION RECORD</span><b>5 governed events</b><small>PLAN-01 · CH-03 · TEAM-02 · CO-01 · OUT-01</small></div><div><span>CLOSE-OUT STATE</span><b>{submitted ? "Submitted to practice" : step >= 9 ? "Ready to submit" : "Under review"}</b></div></div>
    <div className="ps-practice-live-grid">
      <section className="ps-learning-chat">
        <div className="ps-live-feed"><i /> <b>LIVE CONTEXT</b><span>Reconciled outcome, decisions, challenges, and evidence current</span></div>
        <div className="ps-learning-thread">
          <div className={`ps-live-turn ps-live-agent${step >= 1 ? " is-visible" : ""}`}><i>A.</i><p><b>AllianceOne</b><small>Northstar is complete. Reconcile passed forward the approved baseline, CH-03 regional challenge, TEAM-02 staffing change, CO-01 scope decision, delivery actuals, and board acceptance.</small></p></div>
          <div className={`ps-live-turn ps-live-user${step >= 3 ? " is-visible" : ""}`}><p><b>You</b><small>{learningPrompt}</small></p><i>MC</i></div>
          <div className={`ps-live-thinking${step === 4 || step === 5 ? " is-visible" : ""}`}><i /><i /><i /><span>Comparing outcome, decisions, and 36 prior engagements…</span></div>
          <div className={`ps-learning-source-events${step >= 5 ? " is-visible" : ""}`}><span>CO-01 RECONCILED</span><span>TEAM-02 ADMITTED</span><span>CH-03 RESOLVED</span></div>
          <div className={`ps-live-turn ps-live-agent ps-live-result${step >= 6 ? " is-visible" : ""}`}><i>A.</i><p><b>Practice recommendation</b><small>{typedResponse}{step === 6 && <i className="ps-execute-stream-cursor" />}</small><em className={step >= 7 ? "is-visible" : ""}>2 lessons ready · 1 observation retained with limits</em></p></div>
        </div>
        <div className={`ps-live-composer-row${step === 2 ? " is-typing" : ""}`}><span>{step === 2 ? typedPrompt : "Ask what this engagement changes for the next one…"}{step === 2 && <i />}</span><button type="button">{step === 2 ? "Typing…" : step >= 3 && step < 7 ? "Sent ✓" : "Send ↑"}</button></div>
        <button className="ps-live-replay" type="button" onClick={() => setRun((value) => value + 1)}>Replay learning review</button>
      </section>
      <aside className={`ps-new-precedent${step >= 7 ? " is-building" : ""}${submitted ? " is-admitted" : ""}`}>
        <div className="ps-live-panelhead"><div><span>NEW PRECEDENT / NORTHSTAR FOODS</span><b>Operating model redesign</b></div><Chip tone={submitted ? "success" : "neutral"}>{submitted ? "Admitted" : step >= 9 ? "Ready" : "Draft"}</Chip></div>
        <div className="ps-precedent-outcome"><div><span>OUTCOME</span><b>Board-approved model</b></div><div><span>DELIVERY</span><b>15 weeks · $448K</b></div><div><span>LINEAGE</span><b>5 governed events</b></div></div>
        <section className={step >= 7 ? "is-visible" : ""}><b>01</b><p><strong>Fund regional validation explicitly.</strong><small>CH-03 and CO-01 connect the challenge, decision, added effort, and delivered outcome.</small></p><Chip tone="success">Validated</Chip></section>
        <section className={step >= 8 ? "is-visible" : ""}><b>02</b><p><strong>Resolve decision rights before role design.</strong><small>Northstar strengthens an existing five-engagement pattern.</small></p><Chip tone="success">Refined</Chip></section>
        <section className={step >= 8 ? "is-visible" : ""}><b>03</b><p><strong>Record resource substitutions as delivery decisions.</strong><small>TEAM-02 preserved loading, fees, milestones, and experience fit.</small></p><Chip tone="success">Validated</Chip></section>
        <section className={step >= 8 ? "is-visible" : ""}><b>04</b><p><strong>A fixed board gate can survive validation extension.</strong><small>Useful signal, but only three comparable outcomes.</small></p><Chip>Observed</Chip></section>
        <div className={`ps-precedent-admission${submitted ? " is-visible" : ""}`}><span>ADMITTED TO PRACTICE RECORD</span><b>Future pursuits can now retrieve Northstar with each claim’s evidence strength and decision context intact.</b></div>
      </aside>
    </div>
    <footer className={`ps-closeout-submit${submitted ? " is-submitted" : ""}`}>
      <div><span>CLOSE-OUT APPROVAL</span><b>{submitted ? "Close-out submitted and locked" : "Northstar is ready for final submission"}</b><small>{submitted ? "The precedent and its governed evidence are now available to future pursuits." : "Submit the reconciled outcome, decision record, and approved precedent to close the engagement."}</small></div>
      <button type="button" disabled={step < 9 || submitted} onClick={() => setSubmitted(true)}>{submitted ? "Submitted ✓" : step < 9 ? "Preparing…" : "Submit close-out"}</button>
    </footer>
  </ProductFrame></div>;
}

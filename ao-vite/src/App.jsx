import React, { useEffect, useState } from "react";
import { ExecuteScene, MaterializeScene, PlanScene, PracticeScene, ReconcileScene, ScopeScene } from "./ProductScenes";

export const DEMO_FORM_ENDPOINT = "";

export const C = {
  ink: "#07100E",
  inkSoft: "#3F4B47",
  bone: "#F2F3EE",
  boneDim: "#E7EAE3",
  paper: "#FAFBF7",
  olive: "#86C43D",
  oliveDeep: "#17351F",
  oliveLite: "#66736A",
  gold: "#86C43D",
  goldSoft: "#B8E67F",
  line: "rgba(7,16,14,.20)",
  lineSoft: "rgba(7,16,14,.10)",
};

export const serif = "'Inter Tight', 'Arial Narrow', Arial, sans-serif";
export const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export function useFonts() {
  useEffect(() => {
    if (document.getElementById("ao-fonts")) return;
    const link = document.createElement("link");
    link.id = "ao-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

export function Wrap({ children, className = "", style }) {
  return <div className={`wrap ${className}`} style={style}>{children}</div>;
}

export function Section({ children, className = "", style, id }) {
  return <section id={id} className={`section ${className}`} style={style}>{children}</section>;
}

export function Eyebrow({ children, color, style }) {
  return <p className="eyebrow" style={{ color, ...style }}>{children}</p>;
}

export function Head({ children, light = false, size = "section", style }) {
  return <h2 className={`headline headline--${size}${light ? " headline--light" : ""}`} style={style}>{children}</h2>;
}

export function LogoMark({ size = 30, light = false, tile = false }) {
  const fill = tile || light ? "#FFFFFF" : C.ink;
  return <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="logo-mark">
    {tile && <rect width="48" height="48" fill={C.ink} />}
    <path fill={fill} d="M15 8h6L12 40H5.5z" />
    <path fill={fill} d="M16 8h6l9.5 32H25z" />
    <rect fill={fill} x="13" y="27.5" width="11" height="5.5" />
    <rect className="logo-cursor" fill={C.olive} x="34.5" y="36" width="11" height="4" />
  </svg>;
}

export function Logo({ light = false }) {
  return <span className={`logo-lockup${light ? " logo-lockup--light" : ""}`}><LogoMark size={30} tile light={light} /><span>AllianceOne</span></span>;
}

export function Btn({ children, onClick, variant = "primary", href }) {
  const Tag = href ? "a" : "button";
  return <Tag href={href} onClick={onClick} className={`button button--${variant}`}><span>{children}</span><span aria-hidden="true">↗</span></Tag>;
}

export function AnchorLink({ id, children, onNavigate, ...props }) {
  const click = (event) => {
    const el = document.getElementById(id);
    if (el) { event.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    onNavigate?.();
  };
  return <a href={`/#${id}`} onClick={click} {...props}>{children}</a>;
}

export function Nav({ onCta }) {
  const [open, setOpen] = useState(false);
  return <header className="site-nav">
    <Wrap className="nav-inner">
      <a href="/" className="brand-link" aria-label="AllianceOne home"><Logo /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/platform/">Platform</a>
        <AnchorLink id="loop">How it works</AnchorLink>
        <AnchorLink id="firms">For firms</AnchorLink>
        <a href="/security/">Security</a>
      </nav>
      <button className="nav-cta" onClick={onCta}>Become a design partner <span>↗</span></button>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
    </Wrap>
    {open && <div className="mobile-nav">
      <a href="/platform/">Platform</a><AnchorLink id="loop" onNavigate={() => setOpen(false)}>How it works</AnchorLink><AnchorLink id="firms" onNavigate={() => setOpen(false)}>For firms</AnchorLink><a href="/security/">Security</a>
      <button onClick={() => { setOpen(false); onCta(); }}>Become a design partner ↗</button>
    </div>}
  </header>;
}

function Hero({ onCta }) {
  return <section className="home-hero">
    <Wrap>
      <div className="hero-grid hero-grid--copy">
        <div className="hero-copy">
          <Eyebrow color={C.goldSoft}>Engagement intelligence for professional services</Eyebrow>
          <h1>Plan the next engagement with the full weight of the firm behind it.</h1>
          <p>AllianceOne turns delivery history into the workstreams, staffing, effort, and deliverables for new client work. The plan moves into the firm’s operating stack. Actual delivery flows back against it.</p>
          <div className="hero-actions"><Btn variant="green" onClick={onCta}>Become a design partner</Btn><a className="quiet-link" href="/platform/">Explore the platform <span>→</span></a></div>
        </div>
      </div>
      <div className="hero-proof"><span>ONE ENGAGEMENT STATE</span><p>From first pursuit through final outcome, with every commitment, decision, and change intact.</p><i /></div>
    </Wrap>
  </section>;
}

function IntentStatement() {
  return <Section className="intent-statement">
    <Wrap>
      <div className="intent-kicker"><span>THE OPERATING GAP</span><i /></div>
      <div className="intent-copy"><h2>The stack records activity.<br />AllianceOne carries intent.</h2><p>CRM knows the opportunity. Project management knows the task status. Billing knows the actuals. Documents and conversations hold the reasoning. AllianceOne maintains the plan that connects them—and the story of how that plan changed.</p></div>
    </Wrap>
  </Section>;
}

function PrecedentVisual() {
  const analogs = [
    ["Manufacturing operating model", "91%", "Strong", "Accepted"],
    ["Regional service redesign", "84%", "Moderate", "Refined"],
    ["Post-merger governance", "76%", "Weak", "Delivered"],
  ];
  return <div className="product-window precedent-window">
    <div className="window-bar"><span>PRECEDENT BASIS</span><span>Evidence: mature</span></div>
    <div className="window-lead"><strong>Seven past engagements inform this plan.</strong><p>Ranked for scope and delivery shape, not surface-level similarity.</p></div>
    <div className="analog-head"><span>ENGAGEMENT</span><span>MATCH</span><span>DECISION DYNAMICS</span><span>ENDGAME</span></div>
    {analogs.map((a, i) => <div className={`analog-row${i === 0 ? " analog-row--active" : ""}`} key={a[0]}><span>{a[0]}</span><b>{a[1]}</b><span>{a[2]}</span><span>{a[3]}</span></div>)}
    <div className="window-note"><span>PINNED BY EM</span><p>“Same sponsor tension and decision path. Use this as the anchor.”</p></div>
  </div>;
}

function StackVisual() {
  const systems = [["Salesforce", "Commercial context"], ["ClickUp", "Execution plan"], ["Microsoft 365", "Documents & decisions"], ["NetSuite", "Financial actuals"]];
  return <div className="stack-visual">
    <div className="intent-core"><span>ALLIANCEONE</span><strong>Engagement intent</strong><p>Scope · roadmap · staffing · effort · deliverables</p></div>
    <div className="stack-lines" />
    <div className="stack-systems">{systems.map(([name, role], i) => <div key={name}><span>0{i + 1}</span><strong>{name}</strong><p>{role}</p><em>{i === 0 ? "Read / write" : "Synchronized"}</em></div>)}</div>
  </div>;
}

function VarianceVisual() {
  const rows = [["Discovery complete", "MAR 14", "MAR 14", "ON PLAN"], ["Design decision", "APR 04", "APR 11", "+7 DAYS"], ["Transition roadmap", "MAY 23", "MAY 30", "+7 DAYS"]];
  return <div className="product-window variance-window">
    <div className="window-bar"><span>COMMITMENT / PLAN / ACTUAL</span><span>Updated 14:32</span></div>
    <div className="variance-summary"><div><span>COMMITTED FEE</span><b>$420K</b></div><div><span>BILLED</span><b>$287K</b></div><div><span>EFFORT VARIANCE</span><b className="warn">+6.4%</b></div></div>
    <div className="variance-head"><span>MILESTONE</span><span>COMMITTED</span><span>CURRENT</span><span>DELTA</span></div>
    {rows.map((r) => <div className="variance-row" key={r[0]}>{r.map((cell, i) => <span className={i === 3 && cell !== "ON PLAN" ? "warn" : ""} key={cell}>{cell}</span>)}</div>)}
    <div className="decision-trace"><span>DECISION / APR 02</span><strong>Extend design validation by one week.</strong><p>Client data owners requested an additional regional review before sign-off. Confirmed by Maya Chen, Engagement Manager.</p></div>
  </div>;
}

function PracticeVisual() {
  return <div className="practice-visual">
    <div className="practice-head"><span>PRACTICE PROFILE</span><b>Generated from 36 engagements</b></div>
    <div className="practice-ceiling"><span>DEMONSTRATED CEILING</span><strong>Complex / High-stakes</strong><p>Proven across 8 completed engagements</p></div>
    <div className="method-list"><div className="method-head"><span>SIGNATURE METHOD</span><span>VERDICT</span><span>EVIDENCE</span></div>
      <div><strong>Decision-led operating model design</strong><b>Validated</b><span>11 engagements</span></div>
      <div><strong>Phased governance transition</strong><b>Refined</b><span>7 engagements</span></div>
      <div><strong>Centralize before standardizing</strong><b className="blocked">Contradicted</b><span>4 engagements</span></div>
    </div>
    <div className="evidence-health"><span>EVIDENCE HEALTH</span><div><i style={{ width: "82%" }} /></div><b>82% admitted</b></div>
  </div>;
}

const loopSteps = [
  { n: "01", label: "Scope", title: "Context becomes an approved commercial scope.", body: "AllianceOne carries early conversations into the opportunity, assembles the Pursuit Brief, and gives the consultant a grounded working surface in Chat. The resulting internal scope is reviewed by the engagement lead; only that approved scope can unlock and ground the client proposal.", visual: <ScopeScene /> },
  { n: "02", label: "Plan", title: "What was sold becomes an approved delivery baseline.", body: "When CRM marks the engagement Won, AllianceOne locks the accepted proposal facts and opens planning mode. The engagement manager builds deliverables, assignments, dependencies, effort, and the roadmap in Chat; approval creates the authoritative plan that can be written into the firm’s PM or PSA system.", visual: <PlanScene /> },
  { n: "03", label: "Materialize", title: "The approved plan becomes PSA execution state.", body: "AllianceOne validates the destination mapping, then creates the project, phases, deliverables, assignments, and milestones in the firm’s PSA or project-management system. The destination owns execution; AllianceOne retains the approved baseline and the receipt linking every created record to it.", visual: <MaterializeScene /> },
  { n: "04", label: "Execute", title: "Every consultant works with the full engagement context.", body: "Each person receives a workspace shaped by the approved plan: assigned deliverables, workstream context, review expectations, and the engagement brief. In Chat, they can research the firm record, apply proven methods and templates, surface missing evidence, and develop the work without losing its connection to what the firm committed.", visual: <ExecuteScene /> },
  { n: "05", label: "Reconcile", title: "Delivery is measured against what was committed.", body: "Milestones and effort return from project systems. Billing actuals return from ERP. Scope, approvals, and evidence return from the systems that own them. AllianceOne reconciles the whole engagement without rewriting the baseline.", visual: <ReconcileScene /> },
  { n: "06", label: "Learn", title: "The engagement leaves the practice smarter.", body: "At close-out, outcomes meet the conditions and decisions that produced them. Methods are validated, refined, or contradicted, and the next pursuit begins with a more accurate model of how the firm delivers.", visual: <PracticeScene /> },
];

function Loop() {
  return <Section id="loop" className="loop-section">
    <Wrap>
      <div className="loop-intro"><Eyebrow>How AllianceOne works</Eyebrow><Head size="display">One operating loop, from question to institutional learning.</Head></div>
      <div className="loop-steps">{loopSteps.map((step, i) => <article className={`loop-step loop-step--${i + 1}`} key={step.n}>
        <div className="loop-step-copy"><span className="step-number">{step.n} / {step.label}</span><h3>{step.title}</h3><p>{step.body}</p>{i === 0 && <a href="/platform/">See the full platform <span>→</span></a>}</div>
        <div className="loop-step-visual">{step.visual}</div>
      </article>)}</div>
    </Wrap>
  </Section>;
}

function StateModel() {
  const states = [
    ["Intent", "What the firm plans and why"], ["Commitment", "What the client accepted"], ["Execution", "What the operating stack reports"],
    ["Decision", "What changed, who changed it, and why"], ["Outcome", "What was delivered and achieved"], ["Practice", "What the firm carries forward"],
  ];
  return <Section className="state-section">
    <Wrap>
      <div className="state-heading"><Eyebrow color={C.goldSoft}>State, defined</Eyebrow><Head light>A conversation history is not engagement state.</Head><p>AllianceOne maintains six connected forms of state across the lifecycle. Each one has an owner, a source, and a place in the engagement story.</p></div>
      <div className="state-table">{states.map(([name, desc], i) => <div key={name}><span>0{i + 1}</span><strong>{name}</strong><p>{desc}</p><i /></div>)}</div>
    </Wrap>
  </Section>;
}

function CoverageVisual() {
  const rows = [["CRM / pipeline", "Salesforce", "Covered"], ["Documents", "SharePoint", "Covered"], ["Meeting transcripts", "Teams", "Covered"], ["Financials", "NetSuite", "Declared / no flow"], ["Internal chat", "—", "Known gap"]];
  return <div className="coverage-visual"><div className="coverage-head"><span>FIRM COVERAGE MAP</span><b>8 of 10 data classes mapped</b></div>{rows.map(([d, s, st]) => <div className="coverage-row" key={d}><strong>{d}</strong><span>{s}</span><em className={st === "Covered" ? "covered" : st === "Known gap" ? "gap" : "attention"}>{st}</em></div>)}<p>Absence is never treated as evidence until coverage is established.</p></div>;
}

function Integrity() {
  return <Section className="integrity-section">
    <Wrap>
      <div className="integrity-grid">
        <div className="integrity-copy"><Eyebrow>Built to know its limits</Eyebrow><Head size="quiet">A credible system must distinguish what happened from what it inferred.</Head><p>AllianceOne records where each fact came from, whether the source is authoritative, and whether a human has confirmed it. Unknown remains unknown. Contradicted methods do not quietly return as recommendations.</p><a href="/security/">Security and data governance <span>→</span></a></div>
        <CoverageVisual />
      </div>
      <div className="integrity-principles"><div><span>01</span><strong>Evidence travels with the claim.</strong></div><div><span>02</span><strong>Human judgment binds the system.</strong></div><div><span>03</span><strong>Each firm remains isolated.</strong></div></div>
    </Wrap>
  </Section>;
}

function Firms() {
  const firms = [["Management consulting", "Complex work where engagement shape, decision quality, and delivery approach are the product."], ["Advisory", "High-stakes, precedent-driven engagements shaped by risk, context, and previous outcomes."], ["Accounting & tax", "Recurring work where positions, client history, and delivery economics determine quality and margin."]];
  return <Section id="firms" className="firms-section">
    <Wrap>
      <div className="firms-head"><div><Eyebrow>Built for firms whose product is judgment</Eyebrow><Head>Professional services, planned as a discipline.</Head></div><p>AllianceOne is designed for operating partners, engagement leaders, and teams who need the firm’s best judgment available before work begins—not during the postmortem.</p></div>
      <div className="firms-list">{firms.map(([name, body], i) => <div key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{body}</p><i>→</i></div>)}</div>
    </Wrap>
  </Section>;
}

function DesignPartner({ onCta }) {
  return <section className="partner-section"><Wrap><div><Eyebrow>Initial design partner program</Eyebrow><h2>Bring us one real engagement. We’ll show you what the firm already knows.</h2></div><div><p>We are working with a small group of professional-services firms to shape the production rollout around their operating stack and delivery model.</p><Btn variant="dark" onClick={onCta}>Discuss a design partnership</Btn></div></Wrap></section>;
}

export function Footer({ onCta }) {
  return <footer className="site-footer"><Wrap><div className="footer-main"><div><Logo light /><p>Engagement intelligence for professional-services firms.</p></div><div className="footer-nav"><div><span>Platform</span><a href="/platform/">How it works</a><AnchorLink id="loop">The engagement loop</AnchorLink><AnchorLink id="firms">For firms</AnchorLink></div><div><span>Company</span><a href="/security/">Security &amp; governance</a><button onClick={onCta}>Design partner program</button><a href="mailto:hello@myalliance.ai">hello@myalliance.ai</a></div></div></div><div className="footer-base"><span>A product of Alliance Systems Group</span><span>© 2026 Alliance Systems Group. All rights reserved.</span></div></Wrap></footer>;
}

export function Modal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", firm: "", email: "", role: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => { if (!open) return undefined; const key = (e) => e.key === "Escape" && onClose(); document.body.style.overflow = "hidden"; window.addEventListener("keydown", key); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); }; }, [open, onClose]);
  if (!open) return null;
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const fallback = () => { const subject = encodeURIComponent("AllianceOne design partner conversation"); const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nRole: ${form.role}\nWork email: ${form.email}`); window.location.href = `mailto:hello@myalliance.ai?subject=${subject}&body=${body}`; };
  const submit = async (e) => { e.preventDefault(); if (!DEMO_FORM_ENDPOINT) return fallback(); setStatus("sending"); try { const r = await fetch(DEMO_FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(form) }); setStatus(r.ok ? "sent" : "error"); } catch { setStatus("error"); } };
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="partner-title"><button className="modal-close" onClick={onClose} aria-label="Close">×</button><Eyebrow>Design partner program</Eyebrow>{status === "sent" ? <><h2 id="partner-title">Thank you.</h2><p>We’ll contact you at {form.email}.</p></> : <><h2 id="partner-title">Start with the way your firm actually delivers.</h2><p>Tell us where to reach you. We’ll set up a working session around your engagements and operating stack.</p><form onSubmit={submit}><label>Name<input autoFocus required value={form.name} onChange={update("name")} /></label><label>Firm<input required value={form.firm} onChange={update("firm")} /></label><label>Role<input value={form.role} onChange={update("role")} /></label><label>Work email<input type="email" required value={form.email} onChange={update("email")} /></label><button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a working session ↗"}</button></form>{status === "error" && <p className="form-error">That did not go through. <button onClick={fallback}>Email us directly.</button></p>}</>}</div></div>;
}

export default function App() {
  const [modal, setModal] = useState(false);
  useFonts();
  const open = () => setModal(true);
  return <div className="site-shell"><Nav onCta={open} /><main><Hero onCta={open} /><IntentStatement /><Loop /><StateModel /><Integrity /><Firms /><DesignPartner onCta={open} /></main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

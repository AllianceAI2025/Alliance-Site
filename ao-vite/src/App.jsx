import React, { useEffect, useRef, useState } from "react";
import { capture, useVisualDwell } from "./analytics";
import { ExecuteScene, MaterializeScene, PlanScene, PracticeScene, ReconcileScene, ScopeScene } from "./ProductScenes";

export const DESIGN_PARTNER_EMAIL = "cole.miska@myalliance.ai";
export const DEMO_FORM_ENDPOINT = `https://formsubmit.co/ajax/${DESIGN_PARTNER_EMAIL}`;

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
  return <a href={`/allianceone/#${id}`} onClick={click} {...props}>{children}</a>;
}

export function Nav({ onCta, dark = false }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-nav${dark ? " site-nav--dark" : ""}`}>
    <Wrap className="nav-inner">
      <a href="/" className="brand-link" aria-label="Alliance Systems Group home">
        <img src={dark ? "/brand/asg/alliance-systems-group-horizontal-white.png" : "/brand/asg/alliance-systems-group-horizontal-ink.png"} alt="Alliance Systems Group" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/allianceone/">AllianceOne</a>
        <a href="/how-it-works/">How it works</a>
        <button onClick={onCta}>Become a design partner</button>
      </nav>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
    </Wrap>
    {open && <div className="mobile-nav">
      <a href="/allianceone/" onClick={() => setOpen(false)}>AllianceOne</a><a href="/how-it-works/" onClick={() => setOpen(false)}>How it works</a>
      <button onClick={() => { setOpen(false); onCta(); }}>Become a design partner</button>
    </div>}
  </header>;
}

function Hero() {
  return <section className="home-hero">
    <Wrap>
      <div className="hero-grid hero-grid--copy">
        <div className="hero-copy">
          <div className="product-kicker"><Logo light /></div>
          <h1>Plan the next engagement with the full weight of your firm behind it.</h1>
          <p>AllianceOne turns delivery history into the workstreams, staffing, effort, and deliverables for new client work. The plan moves into the systems your firm already uses. Actual delivery flows back against it.</p>
        </div>
      </div>
    </Wrap>
  </section>;
}

function IntentStatement() {
  return <Section className="intent-statement">
    <Wrap>
      <div className="intent-copy"><h2>Your tools record activity.<br />AllianceOne carries intent.</h2><p>CRM knows the opportunity. Project management knows the task status. Billing knows the actuals. Documents and conversations hold the reasoning. AllianceOne maintains the plan that connects them and the story of how that plan changed.</p></div>
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
    <div className="decision-trace"><span>DECISION / APR 02</span><strong>Extend design validation by one week.</strong><p>Client data owners requested an additional regional review before sign-off. Confirmed by Maya Chen, Managing Director.</p></div>
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
  { n: "01", label: "Scope", title: "Turn early context into an approved scope.", body: "AllianceOne carries early conversations into the opportunity, assembles the Pursuit Brief, and gives the consultant a grounded working surface in Chat. The resulting internal scope is reviewed by the engagement lead; only that approved scope can unlock and ground the client proposal.", visual: <ScopeScene /> },
  { n: "02", label: "Plan", title: "Turn what was sold into a delivery plan.", body: "When CRM marks the engagement Won, AllianceOne locks the accepted proposal facts and opens planning mode. The engagement manager builds deliverables, assignments, dependencies, effort, and the roadmap in Chat; approval creates the authoritative plan that can be written into your firm’s project or PSA system.", visual: <PlanScene /> },
  { n: "03", label: "Materialize", title: "Write the plan into your project system.", body: "AllianceOne validates the destination mapping, then creates the project, phases, deliverables, assignments, and milestones in your firm’s PSA or project-management system. That system owns execution; AllianceOne retains the approved baseline and the receipt linking every created record to it.", visual: <MaterializeScene /> },
  { n: "04", label: "Execute", title: "Give each consultant the engagement context.", body: "Each person receives a workspace shaped by the approved plan: assigned deliverables, workstream context, review expectations, and the engagement brief. In Chat, they can research your firm’s record, apply proven methods and templates, surface missing evidence, and develop the work without losing the connection to what your firm committed.", visual: <ExecuteScene /> },
  { n: "05", label: "Reconcile", title: "Delivery is measured against what was committed.", body: "Milestones and effort return from project systems. Billing actuals return from ERP. Scope, approvals, and evidence return from the systems that own them. AllianceOne reconciles the whole engagement without rewriting the baseline.", visual: <ReconcileScene /> },
  { n: "06", label: "Learn", title: "The engagement leaves the practice smarter.", body: "At close-out, outcomes meet the conditions and decisions that produced them. Methods are validated, refined, or contradicted, and the next pursuit begins with a more accurate model of how your firm delivers.", visual: <PracticeScene /> },
];

function TrackedVisual({ scene, children }) {
  const ref = useVisualDwell(scene);
  return <div className="loop-step-visual" ref={ref}>{children}</div>;
}

function Loop() {
  return <Section id="loop" className="loop-section">
    <Wrap>
      <div className="loop-intro"><Head size="display">One operating loop, from question to institutional learning.</Head></div>
      <div className="loop-steps">{loopSteps.map((step, i) => <article id={`phase-${step.label.toLowerCase()}`} className={`loop-step loop-step--${i + 1}`} key={step.n}>
        <div className="loop-step-copy"><span className="step-number">{step.label}</span><h3>{step.title}</h3><p>{step.body}</p></div>
        <TrackedVisual scene={step.label}>{step.visual}</TrackedVisual>
      </article>)}</div>
    </Wrap>
  </Section>;
}

function StateModel() {
  const states = [
    ["Intent", "What your firm plans and why"], ["Commitment", "What the client accepted"], ["Execution", "What your systems report"],
    ["Decision", "What changed, who changed it, and why"], ["Outcome", "What was delivered and achieved"], ["Practice", "What your firm carries forward"],
  ];
  return <Section className="state-section">
    <Wrap>
      <div className="state-heading"><Head light>A conversation history is not engagement state.</Head><p>AllianceOne maintains six connected forms of state across the lifecycle. Each one has an owner, a source, and a place in the engagement story.</p></div>
      <div className="state-table">{states.map(([name, desc]) => <div key={name}><strong>{name}</strong><p>{desc}</p><i /></div>)}</div>
    </Wrap>
  </Section>;
}

export function Footer({ onCta }) {
  return <footer className="site-footer"><Wrap><div className="footer-main"><div><a href="/" className="footer-brand"><img src="/brand/asg/alliance-systems-group-horizontal-white.png" alt="Alliance Systems Group" /></a><p>Operating infrastructure for expert work.</p></div><div className="footer-nav"><div><span>Product</span><a href="/allianceone/">AllianceOne</a><a href="/how-it-works/">How it works</a><a href="/security/">Security &amp; governance</a></div><div><span>Company</span><a href="/">Alliance Systems Group</a><button onClick={onCta}>Design partner program</button><a href="mailto:hello@myalliance.ai">hello@myalliance.ai</a></div></div></div><div className="footer-base"><span>AllianceOne is a product of Alliance Systems Group Inc.</span><span>© 2026 Alliance Systems Group Inc. All rights reserved.</span></div></Wrap></footer>;
}

export function Modal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", firm: "", email: "", role: "", note: "", botcheck: "" });
  const [status, setStatus] = useState("idle");
  const statusRef = useRef(status);
  statusRef.current = status;
  useEffect(() => {
    if (!open) return undefined;
    setStatus("idle");
    capture("partner_form_opened");
    const key = (e) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open]);
  const close = () => {
    if (statusRef.current !== "sent") capture("partner_form_dismissed");
    onClose();
  };
  if (!open) return null;
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const fallback = () => {
    const subject = encodeURIComponent("AllianceOne design partner conversation");
    const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nRole: ${form.role}\nWork email: ${form.email}${form.note ? `\nNote: ${form.note}` : ""}`);
    window.location.href = `mailto:${DESIGN_PARTNER_EMAIL}?subject=${subject}&body=${body}`;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return;
    if (!DEMO_FORM_ENDPOINT) return fallback();
    setStatus("sending");
    try {
      const r = await fetch(DEMO_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          firm: form.firm,
          role: form.role,
          email: form.email,
          note: form.note,
          _replyto: form.email,
          _subject: "AllianceOne design partner inquiry",
          _template: "table",
          _captcha: "false",
          _honey: "",
          _url: typeof window !== "undefined" ? window.location.href : "https://myalliance.ai/",
        }),
      });
      const data = await r.json().catch(() => ({}));
      const ok = data.success === true || data.success === "true";
      const message = String(data.message || "");
      if (ok) {
        capture("partner_form_submitted");
        setStatus("sent");
      }
      else if (/activat/i.test(message)) setStatus("activate");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="partner-title">
        <button className="modal-close" onClick={close} aria-label="Close">×</button>
        {status === "sent" ? (
          <><h2 id="partner-title">Got it.</h2><p>We’ll reply at {form.email}.</p></>
        ) : (
          <>
            <h2 id="partner-title">Become a design partner</h2>
            <p>Leave your details and we’ll follow up to schedule a conversation.</p>
            <form onSubmit={submit}>
              <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={update("botcheck")} /></label>
              <label>Name<input autoFocus required autoComplete="name" value={form.name} onChange={update("name")} /></label>
              <label>Firm<input required autoComplete="organization" value={form.firm} onChange={update("firm")} /></label>
              <label>Role<input autoComplete="organization-title" value={form.role} onChange={update("role")} /></label>
              <label>Work email<input type="email" required autoComplete="email" value={form.email} onChange={update("email")} /></label>
              <label className="form-span"><span>Note<em>Optional</em></span><textarea rows={3} value={form.note} onChange={update("note")} /></label>
              <p className="form-fineprint">We’ll only use this to follow up.</p>
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send"}</button>
            </form>
            {status === "activate" && (
              <p className="form-note">This form still needs a one-time email confirmation. Check {DESIGN_PARTNER_EMAIL} (including spam), then send again. Or <button type="button" onClick={fallback}>open it in email</button>.</p>
            )}
            {status === "error" && <p className="form-error">Couldn’t send. <button type="button" onClick={fallback}>Email us directly.</button></p>}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(false);
  useFonts();
  const open = () => setModal(true);
  return <div className="site-shell"><Nav onCta={open} /><main><Hero /><IntentStatement /><Loop /><StateModel /></main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

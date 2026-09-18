import React, { useEffect, useRef, useState } from "react";
import { capture, identifyVisitor, Track, useVisualDwell } from "./analytics";
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
  oliveLite: "#5F6C63",
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
        <img className="brand-lockup-image" src={dark ? "/brand/asg/alliance-systems-group-horizontal-white.png" : "/brand/asg/alliance-systems-group-horizontal-ink.png"} alt="Alliance Systems Group" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/allianceone/">AllianceOne</a>
        <a href="/how-it-works/">How it works</a>
        <button onClick={() => { capture("cta_clicked", { location: "nav" }); onCta(); }}>Become a pilot partner</button>
      </nav>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
    </Wrap>
    {open && <div className="mobile-nav">
      <a href="/" onClick={() => setOpen(false)}>Home</a><a href="/allianceone/" onClick={() => setOpen(false)}>AllianceOne</a><a href="/how-it-works/" onClick={() => setOpen(false)}>How it works</a>
      <button onClick={() => { setOpen(false); capture("cta_clicked", { location: "nav_mobile" }); onCta(); }}>Become a pilot partner</button>
    </div>}
  </header>;
}

function Hero() {
  return <Track name="hero" className="home-hero">
    <Wrap>
      <div className="hero-grid hero-grid--copy">
        <div className="hero-copy">
          <div className="product-kicker"><Logo light /></div>
          <h1>Carry judgment from the first client signal to the next engagement.</h1>
          <p>AllianceOne connects what was understood, promised, decided, delivered, and learned across the engagement lifecycle. Each phase gives the next team better context without taking decisions out of people’s hands.</p>
        </div>
      </div>
    </Wrap>
  </Track>;
}

function IntentStatement() {
  return <Track name="intent" className="section intent-statement">
    <Wrap>
      <div className="intent-copy"><h2>Execution systems record activity.<br />AllianceOne preserves what it means.</h2><p>CRM knows the opportunity. Project management knows the task status. Billing knows the actuals. Documents and conversations hold the reasoning. AllianceOne connects those records to the approved plan and preserves why that plan changed.</p></div>
    </Wrap>
  </Track>;
}

const loopSteps = [
  { n: "01", label: "Scope", title: "Turn early context into an approved scope.", body: "Early conversations become a Pursuit Brief: the client situation, open questions, relevant precedent, proposed approach, and evidence still needed. The engagement lead reviews the internal scope before it grounds a client proposal.", visual: <ScopeScene /> },
  { n: "02", label: "Plan", title: "Translate the commitment into a delivery plan.", body: "Once the engagement is won, the accepted proposal becomes the starting point for workstreams, deliverables, assignments, dependencies, effort, and milestones. Approval establishes the baseline that will govern delivery.", visual: <PlanScene /> },
  { n: "03", label: "Materialize", title: "Put the approved plan into the systems that run the work.", body: "AllianceOne creates the corresponding project, phases, assignments, and milestones in the firm’s PSA or project-management system. The execution system owns those records; AllianceOne retains their connection to the approved intent.", visual: <MaterializeScene /> },
  { n: "04", label: "Execute", title: "Give each consultant the context to deliver well.", body: "Every person works from the relevant portion of the approved plan, with the engagement brief, proven methods, source expectations, and review standards close at hand. The work stays connected to what the firm committed.", visual: <ExecuteScene /> },
  { n: "05", label: "Reconcile", title: "Compare delivery with the plan without rewriting history.", body: "Milestones, effort, billing, approvals, changes, and supporting evidence return from the systems that own them. Leaders can see the original commitment, the current position, and the reasons for material variance.", visual: <ReconcileScene /> },
  { n: "06", label: "Learn", title: "Turn the completed engagement into usable precedent.", body: "Close-out connects outcomes to the conditions, methods, and decisions that produced them. What held, what changed, and what failed becomes grounded guidance for the next pursuit instead of an untested rule.", visual: <PracticeScene /> },
];

function TrackedVisual({ scene, children }) {
  const ref = useVisualDwell(scene);
  return <div className="loop-step-visual" ref={ref}>{children}</div>;
}

function Loop() {
  return <Track name="lifecycle" id="loop" className="section loop-section">
    <Wrap>
      <div className="loop-intro"><Head size="display">One operating loop, from first signal to usable precedent.</Head></div>
      <div className="loop-steps">{loopSteps.map((step, i) => <article id={`phase-${step.label.toLowerCase()}`} className={`loop-step loop-step--${i + 1}`} key={step.n}>
        <div className="loop-step-copy"><span className="step-number">{step.label}</span><h3>{step.title}</h3><p>{step.body}</p></div>
        <TrackedVisual scene={step.label}>{step.visual}</TrackedVisual>
      </article>)}</div>
    </Wrap>
  </Track>;
}

function StateModel() {
  const states = [
    ["Intent", "What the firm plans and why"], ["Commitment", "What the client accepted"], ["Execution", "What the systems report"],
    ["Decision", "What changed, who changed it, and why"], ["Outcome", "What was delivered and achieved"], ["Practice", "What the firm carries forward"],
  ];
  return <Track name="state_model" className="section state-section">
    <Wrap>
      <div className="state-heading"><Head light>The engagement becomes more than a collection of records.</Head><p>AllianceOne maintains six connected forms of state across the lifecycle. Together they show what the team intended, what changed, what happened, and what the firm can responsibly carry forward.</p></div>
      <div className="state-table">{states.map(([name, desc]) => <div key={name}><strong>{name}</strong><p>{desc}</p><i /></div>)}</div>
    </Wrap>
  </Track>;
}

export function Footer({ onCta }) {
  return <footer className="site-footer"><Wrap><div className="footer-main"><div><a href="/" className="brand-link footer-brand" aria-label="Alliance Systems Group home"><img className="brand-lockup-image" src="/brand/asg/alliance-systems-group-horizontal-white.png" alt="Alliance Systems Group" /></a><p>Operating infrastructure for firms whose advantage depends on expert judgment.</p></div><div className="footer-nav"><div><span>Product</span><a href="/allianceone/">AllianceOne</a><a href="/how-it-works/">How it works</a></div><div><span>Company</span><a href="/">Alliance Systems Group</a><button onClick={() => { capture("cta_clicked", { location: "footer" }); onCta(); }}>Pilot partner program</button><a href="mailto:hello@myalliance.ai">hello@myalliance.ai</a></div></div></div><div className="footer-base"><span>AllianceOne is a product of Alliance Systems Group Inc.</span><span>© 2026 Alliance Systems Group Inc. All rights reserved.</span></div></Wrap></footer>;
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
    const subject = encodeURIComponent("AllianceOne pilot partner conversation");
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
          _subject: "AllianceOne pilot partner inquiry",
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
        identifyVisitor(form.email, { name: form.name, firm: form.firm, role: form.role });
        capture("partner_form_submitted", { firm: form.firm, role: form.role });
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
            <h2 id="partner-title">Become a pilot partner</h2>
            <p>Tell us about your firm and the workflow you would like to explore. We’ll follow up to schedule a conversation.</p>
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

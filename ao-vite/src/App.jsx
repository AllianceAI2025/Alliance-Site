import React, { useEffect, useState } from "react";

export const DEMO_FORM_ENDPOINT = "";

export const C = {
  ink: "#111318",
  inkSoft: "#525965",
  bone: "#F5F3ED",
  boneDim: "#ECEBE5",
  paper: "#FFFFFF",
  olive: "#86C43D",
  oliveDeep: "#24301D",
  oliveLite: "#6C7467",
  gold: "#86C43D",
  goldSoft: "#BCE780",
  line: "rgba(17,19,24,.18)",
  lineSoft: "rgba(17,19,24,.09)",
};

export const serif = "'Newsreader', Georgia, serif";
export const sans = "'Manrope', 'Helvetica Neue', Arial, sans-serif";

export function useFonts() {
  useEffect(() => {
    if (document.getElementById("ao-fonts")) return;
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect);
    const link = document.createElement("link");
    link.id = "ao-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap";
    document.head.appendChild(link);
  }, []);
}

export function Wrap({ children, style }) {
  return <div className="wrap" style={style}>{children}</div>;
}

export function Section({ children, style, className = "" }) {
  return <section className={`section ${className}`} style={style}>{children}</section>;
}

export function Eyebrow({ children, color, style }) {
  return <p className="eyebrow" style={{ color, ...style }}>{children}</p>;
}

export function Head({ children, light = false, size = "section", style }) {
  return <h2 className={`section-title section-title--${size}${light ? " is-light" : ""}`} style={style}>{children}</h2>;
}

export function LogoMark({ size = 30, light = false, tile = false }) {
  const stroke = tile || light ? "#fff" : C.ink;
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="logo-mark">
      {tile && <rect width="48" height="48" fill={C.ink} />}
      <path fill={stroke} d="M15 8h6L12 40H5.5z" />
      <path fill={stroke} d="M16 8h6l9.5 32H25z" />
      <rect fill={stroke} x="13" y="27.5" width="11" height="5.5" />
      <rect className="logo-cursor" fill={C.olive} x="34.5" y="36" width="11" height="4" />
    </svg>
  );
}

export function Logo({ light = false, size = 1 }) {
  return (
    <span className={`logo${light ? " is-light" : ""}`} style={{ fontSize: `${1.04 * size}rem` }}>
      <LogoMark size={30 * size} tile light={light} />
      <span>AllianceOne</span>
    </span>
  );
}

export function Btn({ children, onClick, variant = "primary", href }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} className={`button button--${variant}`}>
      <span>{children}</span><span aria-hidden="true">↗</span>
    </Tag>
  );
}

export function AnchorLink({ id, children, onNavigate, ...rest }) {
  const go = (event) => {
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onNavigate?.();
  };
  return <a href={`/#${id}`} onClick={go} {...rest}>{children}</a>;
}

const navItems = [["record", "The record"], ["product", "How it works"], ["outcomes", "What compounds"], ["difference", "The difference"]];

export function Nav({ onCta }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a className="brand-link" href="/" aria-label="AllianceOne home"><Logo /></a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([id, label]) => <AnchorLink key={id} id={id}>{label}</AnchorLink>)}
        </nav>
        <button className="nav-cta" onClick={onCta}>Request a conversation</button>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          <span /><span />
        </button>
      </Wrap>
      {open && <div className="mobile-nav">
        {navItems.map(([id, label]) => <AnchorLink key={id} id={id} onNavigate={() => setOpen(false)}>{label}</AnchorLink>)}
        <button onClick={() => { setOpen(false); onCta(); }}>Request a conversation</button>
      </div>}
    </header>
  );
}

function RecordPanel() {
  const fields = [
    ["Context", "What the client needed and what constrained the work"],
    ["Decision", "The approach chosen—and the alternatives declined"],
    ["Delivery", "The sequence, staffing, and changes made in flight"],
    ["Outcome", "What worked, what did not, and the actual result"],
  ];
  return (
    <aside className="record-panel" aria-label="An example engagement record">
      <div className="record-panel__head">
        <span>ENG–0247</span><span>VERIFIED RECORD</span>
      </div>
      <div className="record-panel__title">
        <p>Engagement</p>
        <strong>Operating model redesign</strong>
      </div>
      <div className="record-fields">
        {fields.map(([label, value], index) => <div className="record-field" key={label}>
          <span>0{index + 1}</span><b>{label}</b><p>{value}</p>
        </div>)}
      </div>
      <div className="record-panel__foot">
        <span>12 sources connected</span><span>Evidence retained</span>
      </div>
    </aside>
  );
}

function Hero({ onCta }) {
  return (
    <main>
      <section className="hero">
        <Wrap>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow>For consulting, advisory &amp; professional-services firms</Eyebrow>
              <h1>Your firm has already paid to learn this.</h1>
              <p className="hero-deck">Every engagement leaves behind decisions, delivery patterns, and outcomes. AllianceOne connects them into a working record the next team can use.</p>
              <div className="hero-actions">
                <Btn variant="gold" onClick={onCta}>See it on your firm’s work</Btn>
                <AnchorLink id="record" className="text-link">Explore the record <span>↓</span></AnchorLink>
              </div>
            </div>
            <RecordPanel />
          </div>
          <div className="hero-footnote">
            <span>AllianceOne</span>
            <p>The system of record for the engagement—from first context to final outcome.</p>
          </div>
        </Wrap>
      </section>

      <TheRecord />
      <Product />
      <Outcomes />
      <ForFirms />
      <Difference />
      <Close onCta={onCta} />
    </main>
  );
}

function TheRecord() {
  const stack = [
    ["Project tools", "Tasks, status, hours"],
    ["Email & meetings", "Correspondence"],
    ["Document stores", "Final deliverables"],
    ["Finance systems", "Fees and actuals"],
  ];
  return (
    <Section className="record-section">
      <div id="record" className="anchor" />
      <Wrap>
        <div className="section-intro">
          <Eyebrow>01 / The missing record</Eyebrow>
          <Head size="display">Your systems keep the pieces. The engagement disappears between them.</Head>
        </div>
        <div className="gap-layout">
          <div className="system-ledger">
            {stack.map(([name, holds], i) => <div className="system-row" key={name}>
              <span>0{i + 1}</span><strong>{name}</strong><p>{holds}</p><i>Fragment</i>
            </div>)}
            <div className="system-row system-row--missing">
              <span>05</span><strong>The engagement</strong><p>Context, reasoning, delivery, outcome</p><i>AllianceOne</i>
            </div>
          </div>
          <div className="gap-copy">
            <p className="lead">No existing system holds the thread: how the problem arrived, why one approach won, what changed during delivery, and how the work turned out.</p>
            <p>AllianceOne builds that record from the work already happening across your firm. It connects the evidence without asking teams to write a second account of the engagement.</p>
            <div className="note-rule">
              <span>NO NEW REPORTING LAYER</span>
              <p>Meeting transcripts, correspondence, task history, drafts, and actuals become one governed engagement record.</p>
            </div>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

function Product() {
  const stages = [
    ["Discover", "A new pursuit is read against the firm’s history. Relevant engagements surface with their approach, result, and watch-outs intact."],
    ["Scope", "Precedent becomes a grounded first plan: the workstreams, constraints, and estimates your firm has actually used."],
    ["Propose", "The proposal draws from deliverables your firm shipped—not a generic template—and carries the reasoning behind the structure."],
    ["Deliver", "The team works with precedent at hand. Decisions and actuals return to the record, ready for the next engagement."],
  ];
  return (
    <Section className="product-section">
      <div id="product" className="anchor" />
      <Wrap>
        <div className="product-head">
          <div><Eyebrow color={C.goldSoft}>02 / In the work</Eyebrow><Head light>From first read to final delivery.</Head></div>
          <p>AllianceOne follows the engagement rather than sitting beside it as another chat window.</p>
        </div>
        <div className="stage-list">
          {stages.map(([name, text], i) => <article className="stage" key={name}>
            <span className="stage-number">0{i + 1}</span>
            <h3>{name}</h3>
            <p>{text}</p>
            <span className="stage-state">{i === 3 ? "Returns to record" : "Draws from record"}</span>
          </article>)}
        </div>
        <div className="product-footer"><span>ONE CONTINUOUS RECORD</span><div /><span>Practice intelligence, applied</span></div>
      </Wrap>
    </Section>
  );
}

function Outcomes() {
  const items = [
    ["Traceable", "A recommendation can be followed back to the engagements, decisions, and outcomes behind it."],
    ["Repeatable", "A method carries the conditions that made it work, so another team can apply it with judgment intact."],
    ["Compounding", "Each completed engagement updates what the firm knows. The next one begins with a better starting point."],
  ];
  return (
    <Section className="outcomes-section">
      <div id="outcomes" className="anchor" />
      <Wrap>
        <div className="outcomes-grid">
          <div className="outcomes-sticky">
            <Eyebrow>03 / What compounds</Eyebrow>
            <Head>Expertise that behaves like a firm asset.</Head>
            <p>Not a case library. A body of evidence that stays current because the work itself keeps teaching it.</p>
          </div>
          <div className="outcome-list">
            {items.map(([name, text], i) => <div className="outcome" key={name}>
              <span>0{i + 1}</span><h3>{name}</h3><p>{text}</p>
            </div>)}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

function ForFirms() {
  const firms = [
    ["Management consulting", "Where the differentiator is not the framework, but the judgment used to apply it."],
    ["Advisory", "Where precedent, risk, and the outcome of the last decision shape the next one."],
    ["Accounting & tax", "Where positions taken and engagement history influence quality across recurring work."],
  ];
  return (
    <Section className="firms-section">
      <Wrap>
        <div className="firms-head">
          <Eyebrow>Built for professional judgment</Eyebrow>
          <Head size="quiet">For firms whose product walks out the door as advice, analysis, and decisions.</Head>
        </div>
        <div className="firm-table">
          {firms.map(([name, text]) => <div className="firm-row" key={name}><h3>{name}</h3><p>{text}</p><span>→</span></div>)}
        </div>
        <div className="partner-note"><strong>For the partner accountable for the whole firm.</strong><p>Quality should not depend on who happens to be staffed. AllianceOne gives operating and managing partners a durable view of how engagements actually run.</p></div>
      </Wrap>
    </Section>
  );
}

function Difference() {
  const rows = [
    ["Starting point", "The prompt and whatever is attached", "The firm’s connected engagement history"],
    ["Unit of knowledge", "A passage or retrieved document", "The engagement, including decisions and outcomes"],
    ["Evidence", "Available when supplied", "Retained with every method and claim"],
    ["What improves", "The model", "Your firm’s own body of evidence"],
  ];
  return (
    <Section className="difference-section">
      <div id="difference" className="anchor" />
      <Wrap>
        <div className="difference-head">
          <div><Eyebrow>04 / The difference</Eyebrow><Head>Use the models. Own the record.</Head></div>
          <p>AllianceOne does not compete with general AI on intelligence. It supplies what a general model cannot arrive with: your firm’s evidence, structured around the work that produced it.</p>
        </div>
        <div className="comparison" role="table" aria-label="General AI and AllianceOne comparison">
          <div className="comparison-row comparison-row--head" role="row"><span /><b>GENERAL AI</b><b>ALLIANCEONE</b></div>
          {rows.map(([label, general, ours]) => <div className="comparison-row" role="row" key={label}><strong>{label}</strong><p>{general}</p><p>{ours}</p></div>)}
        </div>
        <p className="difference-close">A competitor can license the same model tomorrow. It cannot license your history.</p>
      </Wrap>
    </Section>
  );
}

function Close({ onCta }) {
  return (
    <section className="close-section">
      <Wrap>
        <div><Eyebrow>AllianceOne</Eyebrow><h2>Make the next engagement better before it begins.</h2></div>
        <Btn variant="primary" onClick={onCta}>Request a conversation</Btn>
      </Wrap>
    </section>
  );
}

export function Footer({ onCta }) {
  return (
    <footer className="site-footer">
      <Wrap>
        <div className="footer-main">
          <div><Logo light /><p>The system of record for professional-services engagements.</p></div>
          <div className="footer-links">
            <div><span>Explore</span>{navItems.map(([id, label]) => <AnchorLink id={id} key={id}>{label}</AnchorLink>)}<a href="/security/">Security &amp; data ownership</a></div>
            <div><span>Connect</span><button onClick={onCta}>Request a conversation</button><a href="mailto:hello@myalliance.ai">hello@myalliance.ai</a></div>
          </div>
        </div>
        <div className="footer-base"><span>A product of Alliance Systems Group</span><span>© 2026 Alliance Systems Group</span></div>
      </Wrap>
    </footer>
  );
}

export function Modal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", firm: "", email: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open, onClose]);
  if (!open) return null;
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const mail = () => {
    const subject = encodeURIComponent("AllianceOne conversation request");
    const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nWork email: ${form.email}`);
    window.location.href = `mailto:hello@myalliance.ai?subject=${subject}&body=${body}`;
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!DEMO_FORM_ENDPOINT) return mail();
    setStatus("sending");
    try {
      const response = await fetch(DEMO_FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(form) });
      setStatus(response.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <Eyebrow>Private working session</Eyebrow>
        {status === "sent" ? <><h2 id="modal-title">Thank you.</h2><p>We’ll be in touch at {form.email}.</p></> : <>
          <h2 id="modal-title">See AllianceOne against the work your firm already knows.</h2>
          <p>A focused 30-minute conversation. No generic product tour.</p>
          <form onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={update("name")} autoFocus /></label>
            <label>Firm<input required value={form.firm} onChange={update("firm")} /></label>
            <label>Work email<input required type="email" value={form.email} onChange={update("email")} /></label>
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a conversation ↗"}</button>
          </form>
          {status === "error" && <p className="form-error">That did not go through. <button onClick={mail}>Email us instead.</button></p>}
        </>}
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(false);
  useFonts();
  return <div className="site-shell"><Nav onCta={() => setModal(true)} /><Hero onCta={() => setModal(true)} /><Footer onCta={() => setModal(true)} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

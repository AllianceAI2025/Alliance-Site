import React, { useEffect, useRef, useState } from "react";
import { capture, identifyVisitor } from "./analytics";
import { navigation } from "./content/siteContent.js";
import "./site-chrome.css";

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
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600&display=swap";
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
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  const page = path === "/" ? "home" : /^\/(allianceone|platform)(\/|$)/.test(path) ? "product" : /^\/(solutions|how-it-works)(\/|$)/.test(path) ? "solutions" : path.startsWith("/company") ? "company" : null;
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);
  const inquire = () => { setOpen(false); capture("cta_clicked", { location: "nav" }); onCta(); };
  return <header className={`site-nav quiet-nav${dark ? " quiet-nav--dark" : ""}`}>
    <a className="quiet-skip" href="#main-content">Skip to content</a>
    <div className="quiet-nav-inner">
      <a href="/" className="quiet-brand" aria-label="AllianceOne home"><LogoMark size={31} light={dark} /><span>AllianceOne</span></a>
      <nav className="quiet-desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <a key={item.key} href={item.href} aria-current={page === item.key ? "page" : undefined}>{item.label}</a>)}
      </nav>
      <button className="quiet-partner-button" onClick={inquire}>Become a design partner <span aria-hidden="true">↗</span></button>
      <button className="quiet-menu" onClick={() => { capture(open ? "mobile_menu_closed" : "mobile_menu_opened"); setOpen(!open); }} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-navigation">{open ? "Close" : "Menu"}</button>
    </div>
    {open && <nav id="mobile-navigation" className="quiet-mobile-nav" aria-label="Mobile navigation">
      {navigation.map((item) => <a key={item.key} href={item.href} aria-current={page === item.key ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
      <button onClick={inquire}>Become a design partner</button>
    </nav>}
  </header>;
}

export function Footer({ onCta }) {
  return <footer className="site-footer quiet-footer"><div className="quiet-footer-inner"><a className="quiet-company-mark" href="/company/" aria-label="Alliance Systems Group"><img src="/brand/asg/alliance-systems-group-mark-refined.png" alt="" /><span>Alliance<small>Systems Group</small></span></a><nav aria-label="Footer navigation"><a href="/allianceone/">Product</a><a href="/solutions/">Solutions</a><a href="/company/">Company</a><button onClick={() => { capture("cta_clicked", { location: "footer" }); onCta(); }}>Design partners</button><a href="mailto:hello@myalliance.ai">Contact</a></nav><div className="quiet-footer-base"><span>AllianceOne is a product of Alliance Systems Group Inc.</span><div><span>© 2026 Alliance Systems Group Inc.</span></div></div></div></footer>;
}

export function PartnerForm() {
  const [form, setForm] = useState({ name: "", firm: "", email: "", role: "", note: "", botcheck: "" });
  const [status, setStatus] = useState("idle");
  const resultRef = useRef(null);
  useEffect(() => { capture("partner_form_opened"); }, []);
  useEffect(() => { if (status === "sent") resultRef.current?.focus(); }, [status]);
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const fallback = () => {
    const subject = encodeURIComponent("AllianceOne design partner conversation");
    const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nRole: ${form.role}\nWork email: ${form.email}${form.note ? `\nNote: ${form.note}` : ""}`);
    window.location.href = `mailto:${DESIGN_PARTNER_EMAIL}?subject=${subject}&body=${body}`;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck || status === "sending") return;
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
      if (r.ok && ok) {
        identifyVisitor(form.email, { name: form.name, firm: form.firm, role: form.role });
        capture("partner_form_submitted", { firm: form.firm, role: form.role });
        setStatus("sent");
      }
      else if (/activat/i.test(message)) {
        capture("partner_form_failed", { reason: "activation_required" });
        setStatus("activate");
      }
      else {
        capture("partner_form_failed", { reason: "rejected" });
        setStatus("error");
      }
    } catch {
      capture("partner_form_failed", { reason: "network" });
      setStatus("error");
    }
  };
  return (
    <section className="partner-form" id="inquiry" aria-labelledby="partner-title">
        {status === "sent" ? (
          <div ref={resultRef} tabIndex={-1} className="partner-success"><span aria-hidden="true">✓</span><h2 id="partner-title">Thanks for reaching out.</h2><p>We’ll reply at <strong>{form.email}</strong> to arrange an introductory conversation.</p><p>We look forward to hearing about your firm and what you have in mind for AllianceOne.</p><a href="/allianceone/">Explore AllianceOne →</a></div>
        ) : (
          <>
            <p className="eyebrow">LET’S TALK</p><h2 id="partner-title">Tell us a little about your firm.</h2>
            <p>You don’t need a detailed plan. We’ll start with a conversation about your team and what you’re looking for.</p>
            <form onSubmit={submit}>
              <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={update("botcheck")} /></label>
              <label>Name<input required autoComplete="name" value={form.name} onChange={update("name")} /></label>
              <label>Firm<input required autoComplete="organization" value={form.firm} onChange={update("firm")} /></label>
              <label>Role <small>Optional</small><input autoComplete="organization-title" value={form.role} onChange={update("role")} /></label>
              <label>Work email<input type="email" required autoComplete="email" value={form.email} onChange={update("email")} /></label>
              <label className="form-span"><span>What would you like AllianceOne to help your team with? <small>Optional</small></span><textarea aria-describedby="note-help" rows={4} value={form.note} onChange={update("note")} /><small id="note-help">A sentence or two is plenty.</small></label>
              <p className="form-fineprint">We’ll only use this to follow up.</p>
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Start a conversation →"}</button>
            </form>
            {status === "activate" && (
              <p className="form-note" role="alert">We couldn’t deliver your inquiry just yet. Please <button type="button" onClick={fallback}>open it in email</button>.</p>
            )}
            {status === "error" && <p className="form-error" role="alert">Couldn’t send. <button type="button" onClick={fallback}>Email us directly.</button></p>}
          </>
        )}
    </section>
  );
}

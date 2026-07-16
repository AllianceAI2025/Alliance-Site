import React, { useState, useEffect, useRef } from "react";

// ============================================================
// AllianceOne, product site v7 (Upgrade Blueprint, Phase 1)
// Spine: Consulting is applying proven frameworks to specific problems.
//   Frameworks are the easy part (every firm AND every AI has them).
//   The asset is the firm's accumulated EXPERIENCE (every engagement,
//   decision, and outcome), assembled into usable EXPERTISE, with JUDGMENT
//   (which approach, for whom, why, whether it worked) as the apex/moat.
//   AllianceOne assembles that distributed experience into one living system.
// Voice: anti-hype, calm, firm-as-hero. No "neural network"/"brain" in copy.
// ASG appears only as quiet plumbing in the footer.
// v4: consolidated to remove repetition. Thesis stated once, sections halved,
//   hierarchy via the Head atom, one display peak.
// v5: value-forward. The hero leads with the firm's own knowledge as the asset
//   (not an AI-market reframe). The AI-fatigue framing is gone; calm is the
//   tone, not the lede.
// v6: product-site IA. Three body sections. Product (what it is + what it
//   captures + where it shows up in the work), Approach (the philosophy, with
//   "why not just AI" folded in), and Industries (the firms it's built for).
//   Logo mark removed; wordmark only.
// v7: demo-driving teaser (Upgrade Blueprint). PHASE 1 done. Lead with the
//   day-one job, one repeated CTA ("Request a demo", gold). New hero +
//   DayOne (the wedge in words) + ClosingCTA + minimal demo form; nav relabel
//   (How it works · Why AllianceOne · Who it's for) with scroll-spy. PHASE 2
//   pending: how-it-shows diagram, four-dimensions honesty reframe, split
//   why-not-AI, worked example (real fixtures + screenshots), partner/role.
// v8: content-review pass. Proof moved up (after DayOne) and its bullets
//   rewritten to match what the screenshot actually shows; Execution-stage
//   claim trimmed to shipped capability; Who relabeled "table stakes";
//   memory-proof rewrite of the "starts fresh" contrast; demo form POSTs to
//   a configurable endpoint (mailto fallback); real anchors for nav/footer;
//   /security/ page added (Vite MPA) and linked.
// v9: editorial dossier body (capability frame: model the PRACTICE, not the
//   archive; expertise made traceable / repeatable / compounding). Mono
//   accent, numbered markers, ruled tables, receipts with sources; no card
//   grids or graph animation.
// v10: hero leads "the practice, not the projects" (engagements as
//   observations; the three-axes cognitive fingerprint), 02 extends it
//   (every engagement teaches the system). Practice Profile messaging
//   retired; replaced by 03 The product: Discover -> Scope -> Propose ->
//   Deliver, data-driven with an optional screenshot per stage (Scope has
//   the real one). Order: hero, 01 who-it's-for, 02 what-it-is + what-you-
//   get, 03 the product, 04 the shift, 05 the difference, close.
// ============================================================

// Demo-form endpoint (Formspree-style: accepts JSON POST, returns 2xx on ok).
// Leave "" to fall back to a pre-filled mailto:. To go live, create a form at
// formspree.io (or any equivalent) and paste its URL here, e.g.
// "https://formspree.io/f/XXXXXXXX".
export const DEMO_FORM_ENDPOINT = "";

export const C = {
  ink: "#14160f",
  inkSoft: "#2a2d22",
  bone: "#f4f1e8",
  boneDim: "#e7e2d3",
  paper: "#fbfaf5",
  olive: "#5c6444",
  oliveDeep: "#3f4630",
  oliveLite: "#8a916f",
  gold: "#b4965a",
  goldSoft: "#c9b184",
  line: "rgba(20,22,15,0.12)",
  lineSoft: "rgba(20,22,15,0.07)",
};

export const serif = "'Cormorant Garamond', Georgia, serif";
export const sans = "'DM Sans', system-ui, sans-serif";
const mono = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const ease = "cubic-bezier(.22,1,.36,1)";

// Loads the shared web fonts once. Exported so the /security page reuses it.
export function useFonts() {
  useEffect(() => {
    if (document.getElementById("ao-fonts")) return;
    const link = document.createElement("link");
    link.id = "ao-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ---- atoms ---------------------------------------------------------------

export function Eyebrow({ children, color = C.olive, style }) {
  return (
    <p style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color, margin: 0, ...style }}>
      {children}
    </p>
  );
}

// Section headline with a deliberate size hierarchy so the page has rest:
//   display (the one peak / centerpiece), section (the working default),
//   quiet (recessive; qualification strips that shouldn't compete).
export function Head({ children, light = false, size = "section", style }) {
  const sizes = {
    display: "clamp(2.1rem,4.6vw,3.5rem)",
    section: "clamp(1.8rem,3.6vw,2.8rem)",
    quiet: "clamp(1.45rem,2.8vw,2rem)",
  };
  return (
    <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: sizes[size], lineHeight: 1.06, letterSpacing: "-0.015em", color: light ? C.bone : C.ink, margin: "0.9rem 0 0", ...style }}>
      {children}
    </h2>
  );
}

export function Btn({ children, onClick, variant = "primary", href }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "0.6rem",
    fontFamily: sans, fontSize: "0.92rem", fontWeight: 600,
    padding: "0.95rem 1.7rem", borderRadius: 2, cursor: "pointer",
    border: "1px solid transparent", transition: `all .35s ${ease}`, textDecoration: "none",
  };
  const variants = {
    primary: { background: C.ink, color: C.bone },
    gold: { background: C.gold, color: C.ink },
    ghost: { background: "transparent", color: C.ink, borderColor: C.line },
    bone: { background: C.bone, color: C.ink },
  };
  const hoverStyle = {
    primary: { background: C.oliveDeep, transform: "translateY(-2px)" },
    gold: { transform: "translateY(-2px)", background: C.goldSoft },
    ghost: { background: C.ink, color: C.bone, borderColor: C.ink },
    bone: { transform: "translateY(-2px)" },
  }[variant];
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(hover ? hoverStyle : {}) }}>
      {children}
      <span style={{ transition: `transform .35s ${ease}`, transform: hover ? "translateX(4px)" : "none" }}>→</span>
    </Tag>
  );
}

export function Logo({ light = false, size = 1 }) {
  return (
    <span style={{ fontFamily: serif, fontWeight: 600, fontSize: `${1.32 * size}rem`, letterSpacing: "-0.01em", lineHeight: 1, color: light ? C.bone : C.ink }}>
      Alliance<span style={{ color: light ? C.gold : C.olive }}>One</span>
    </span>
  );
}

export function Wrap({ children, style }) {
  return <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,4.5rem)", ...style }}>{children}</div>;
}
export function Section({ children, style }) {
  return <section style={{ padding: "clamp(4.5rem,9vw,8rem) 0", ...style }}>{children}</section>;
}

// ---- nav -----------------------------------------------------------------

// Three plain-language anchors + one persistent gold CTA (NN/g). The active
// section is highlighted as you scroll; labels describe, they don't brand.
const SECTIONS = [
  ["who", "Who it's for"],
  ["model", "What it is"],
  ["product", "The product"],
  ["why", "Why AllianceOne"],
];

// Smart anchor: real <a href> (crawlable, keyboard-focusable) that upgrades to
// a smooth scroll when the target section exists on the current page, and
// falls through to normal navigation (e.g. /security/ -> /#how-it-works) when
// it doesn't.
export function AnchorLink({ id, children, style, onNavigate, ...rest }) {
  const handle = (e) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onNavigate?.();
  };
  return (
    <a href={`/#${id}`} onClick={handle} style={{ textDecoration: "none", ...style }} {...rest}>
      {children}
    </a>
  );
}

export function Nav({ onCta }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const goldCta = { fontFamily: sans, fontSize: "0.84rem", fontWeight: 600, padding: "0.6rem 1.25rem", background: C.gold, color: C.ink, borderRadius: 2, cursor: "pointer", border: 0 };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", background: "rgba(244,241,232,0.82)", borderBottom: `1px solid ${C.lineSoft}` }}>
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem clamp(1.25rem,5vw,4.5rem)" }}>
        <a href="/" onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }} style={{ textDecoration: "none" }} aria-label="AllianceOne home">
          <Logo />
        </a>
        <nav className="ao-desktop" style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
          {SECTIONS.map(([id, label]) => {
            const on = active === id || hover === id;
            return (
              <AnchorLink key={id} id={id} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)}
                style={{ fontFamily: sans, fontSize: "0.84rem", fontWeight: active === id ? 600 : 500, color: on ? C.ink : C.inkSoft, cursor: "pointer", position: "relative", padding: "0.2rem 0", transition: `color .25s ${ease}` }}>
                {label}
                <span style={{ position: "absolute", left: 0, bottom: -2, height: 1, background: C.olive, width: on ? "100%" : 0, transition: `width .35s ${ease}` }} />
              </AnchorLink>
            );
          })}
          <button onClick={onCta} style={goldCta}>Request a demo</button>
        </nav>
        <button className="ao-mobile-btn" onClick={() => setOpen((o) => !o)} style={{ display: "none", background: "none", border: 0, cursor: "pointer", padding: 6 }} aria-label="Menu" aria-expanded={open}>
          {[0, 1, 2].map((i) => <span key={i} style={{ display: "block", width: 24, height: 2, background: C.ink, margin: "5px 0" }} />)}
        </button>
      </Wrap>
      {open && (
        <div style={{ background: C.bone, borderBottom: `1px solid ${C.line}`, padding: "1.4rem clamp(1.25rem,5vw,4.5rem) 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {SECTIONS.map(([id, label]) => (
            <AnchorLink key={id} id={id} onNavigate={() => setOpen(false)} style={{ fontFamily: sans, fontSize: "1rem", fontWeight: 500, color: C.inkSoft, cursor: "pointer" }}>{label}</AnchorLink>
          ))}
          <button onClick={() => { setOpen(false); onCta(); }} style={{ ...goldCta, fontSize: "1rem", textAlign: "center" }}>Request a demo</button>
        </div>
      )}
      <style>{`@media (max-width:1040px){.ao-desktop{display:none!important}.ao-mobile-btn{display:block!important}}`}</style>
    </header>
  );
}

// ---- hero ----------------------------------------------------------------
// Leads with the firm's own knowledge as the asset, then plants the
// general-AI distinction so the next section pays it off.

// Mono section marker: "NN / LABEL", the report-style divider that replaces
// the generic eyebrow on the rebuilt (dossier) sections.
function Marker({ n, children, color = C.oliveLite }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color }}>
      <span style={{ fontWeight: 500 }}>{n}</span>
      <span style={{ width: 26, height: 1, background: color, opacity: 0.5, display: "inline-block" }} />
      <span>{children}</span>
    </div>
  );
}

function Hero({ onCta }) {
  const spec = [
    ["What it is", "A system that models how your firm actually works, across every engagement."],
    ["What it does", "Turns your best partners' judgment into methods the whole firm can run."],
    ["Instead of", "Generic AI that hands every firm the same average answer."],
  ];
  return (
    <section style={{ borderBottom: `1px solid ${C.line}` }}>
      <Wrap style={{ padding: "clamp(3rem,6vw,5.5rem) clamp(1.25rem,5vw,4.5rem) clamp(3rem,6vw,5rem)" }}>
        <p style={{ fontFamily: mono, fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.olive, margin: 0 }}>
          For consulting, advisory &amp; professional-services firms
        </p>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.7rem,6.2vw,5.2rem)", lineHeight: 1.0, letterSpacing: "-0.03em", maxWidth: "15ch", margin: "1.5rem 0 0" }}>
          Your firm's expertise, made <em style={{ fontStyle: "italic", color: C.olive }}>repeatable.</em>
        </h1>
        <p style={{ fontSize: "clamp(1.1rem,1.7vw,1.4rem)", maxWidth: "56ch", marginTop: "1.7rem", color: C.ink, fontWeight: 500, lineHeight: 1.5 }}>
          AllianceOne models the practice, not the projects. Every engagement is an observation of how your firm approaches client problems, thinks through solutions, and delivers. Those three axes are your firm's cognitive fingerprint, captured in one system. Your expertise becomes traceable, repeatable, and compounding.
        </p>
        <div style={{ marginTop: "2.8rem", borderTop: `2px solid ${C.ink}`, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "0" }}>
          {spec.map(([label, text], i) => (
            <div key={i} style={{ padding: "1.4rem 1.6rem 0.4rem 0" }}>
              <p style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oliveLite, margin: "0 0 0.5rem" }}>{label}</p>
              <p style={{ fontSize: "0.98rem", color: C.inkSoft, margin: 0, maxWidth: "30ch" }}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2.6rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
          <Btn variant="ghost" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>
        </div>
      </Wrap>
    </section>
  );
}

// ---- 03 the product (discover -> scope -> propose -> deliver) --------------
// Data-driven: each stage takes an optional screenshot (img + alt). Scope has
// the real one; drop new files in public/ and fill the img fields as they come.

function TheProduct() {
  const stages = [
    ["Discover", "A new pursuit opens and AllianceOne reads it against everything your firm has done. The closest engagements surface ranked, each carrying how it was run, what it produced, and the watch-outs it hit along the way.", null, null],
    ["Scope", "Discovery feeds the scope directly. Similar engagements, constraints, and watch-outs carry straight in, so the first draft is your firm's real approach to this kind of problem, not a generic template.",
      "/worked-example.png",
      "The Scope view in AllianceOne: a new engagement scoped from similar past engagements ranked by match, in-scope items and constraints carried from discovery, and watch-outs surfaced automatically."],
    ["Propose", "The proposal assembles from deliverables your firm has actually shipped: their structure, what they included, and why. What worked in past engagements is reinforced, and the missteps surface before they're repeated.", null, null],
    ["Deliver", "The team executes with the firm's precedent at hand. As the engagement closes, its decisions and outcomes feed back into the model, so the next engagement starts sharper than this one did.", null, null],
  ];
  return (
    <Section>
      <div id="product" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Marker n="03">The product</Marker>
        <Head size="display" style={{ maxWidth: "18ch", margin: "1.5rem 0 0" }}>
          From first read to final delivery.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.1rem", maxWidth: "60ch", marginTop: "1.4rem", lineHeight: 1.6 }}>
          Not a chatbot bolted to the side. AllianceOne works the way an engagement actually moves, in four stages, each drawing on the practice.
        </p>
        <div style={{ borderTop: `2px solid ${C.ink}`, marginTop: "2.6rem" }}>
          {stages.map(([name, body, img, alt], i) => (
            <div key={i} style={{ borderBottom: `1px solid ${C.line}`, padding: "2rem 0" }}>
              <div className="ao-def" style={{ display: "grid", gridTemplateColumns: "minmax(190px,0.7fr) 1.5fr", gap: "0.8rem 3rem", alignItems: "start" }}>
                <div>
                  <span style={{ fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold }}>Stage {`0${i + 1}`}</span>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(1.8rem,2.8vw,2.3rem)", margin: "0.35rem 0 0", lineHeight: 1 }}>{name}</h3>
                </div>
                <p style={{ color: C.inkSoft, fontSize: "1.06rem", margin: 0, lineHeight: 1.6, maxWidth: "56ch" }}>{body}</p>
              </div>
              {img && (
                <figure style={{ margin: "2.2rem 0 0.4rem" }}>
                  <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 36px 70px -34px rgba(20,22,15,0.5)", background: C.paper }}>
                    <img src={img} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                  <figcaption style={{ fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.04em", color: C.oliveLite, marginTop: "0.9rem" }}>
                    AllianceOne · {name} view · firm names shown are illustrative
                  </figcaption>
                </figure>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.98rem", color: C.inkSoft, marginTop: "1.6rem", marginBottom: 0 }}>
          Your engagements stay yours. <a href="/security/" style={{ color: C.olive, fontWeight: 600 }}>How we handle your firm's data →</a>
        </p>
      </Wrap>
    </Section>
  );
}

// ---- 04 the shift (the market moved to us; receipts with sources) ---------

function TheShift() {
  const findings = [
    ["95% of enterprise AI pilots delivered no measurable P&L impact.", "MIT · The GenAI Divide · 2025"],
    ["Enterprises are “livid” over AI models that capture their business value. The real fight is control and ownership.", "Palantir CEO Alex Karp · 2026"],
    ["Up to 90% of a firm's value is tacit knowledge, the one thing competitors cannot copy.", "California Management Review · 2026"],
  ];
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <div id="shift" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Marker n="04" color={C.gold}>The shift</Marker>
        <Head light size="display" style={{ maxWidth: "18ch", margin: "1.5rem 0 0" }}>
          Generic AI gave everyone the average.
        </Head>
        <p style={{ color: "rgba(244,241,232,0.74)", fontSize: "1.14rem", maxWidth: "62ch", marginTop: "1.4rem", lineHeight: 1.6 }}>
          Two years of enterprise AI proved a point the market is only now saying out loud. A model trained on everyone else's work hands your firm the same answer it hands your competitors, and quietly exports your value to whoever owns the model. The counter-move is to model and own your own intelligence. For a firm whose product is expertise, that intelligence is the practice.
        </p>
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(244,241,232,0.22)" }}>
          {findings.map(([claim, src], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "0.5rem", alignItems: "start", padding: "1.5rem 0", borderBottom: "1px solid rgba(244,241,232,0.12)" }}>
              <span style={{ fontFamily: mono, fontSize: "0.8rem", color: C.gold, paddingTop: "0.4rem" }}>{`0${i + 1}`}</span>
              <div>
                <p style={{ fontFamily: serif, fontSize: "clamp(1.25rem,2vw,1.5rem)", color: C.bone, margin: 0, lineHeight: 1.3, maxWidth: "46ch" }}>{claim}</p>
                <p style={{ fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.04em", color: "rgba(244,241,232,0.5)", margin: "0.6rem 0 0" }}>{src}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- 02 model the practice (what it is; the three-axes table) -------------

function ModelThePractice() {
  const axes = [
    ["How you approach", "Problem framing, what you look at first, your diagnostic style."],
    ["How you think", "The options you weigh, the rationale, which frameworks you choose and why."],
    ["How you deliver", "Work structures, sequencing, staffing shapes, how you handle variance."],
  ];
  return (
    <Section>
      <div id="model" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Marker n="02">What it is</Marker>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "2.6rem 4.5rem", marginTop: "1.5rem", alignItems: "start" }}>
          <div>
            <Head size="display" style={{ maxWidth: "18ch", margin: 0 }}>
              Every engagement teaches the system how your firm works.
            </Head>
            <p style={{ color: C.inkSoft, fontSize: "1.1rem", marginTop: "1.5rem", maxWidth: "46ch", lineHeight: 1.6 }}>
              Everyone else in AI for consulting indexes your documents and retrieves the ones that look similar. They model the archive. AllianceOne reads each engagement as an observation: how your firm framed the problem, why it chose the approach it did, and how the delivery actually went. Observation by observation, the fingerprint comes into focus.
            </p>
            <p style={{ color: C.ink, fontSize: "1.1rem", fontWeight: 500, marginTop: "1.1rem", maxWidth: "46ch", lineHeight: 1.6 }}>
              The moat was never the case library. It's the why's and how's, with receipts, and the loop that keeps them current.
            </p>
          </div>
          <div style={{ borderTop: `2px solid ${C.ink}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0 0.9rem", fontFamily: mono, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oliveLite, borderBottom: `1px solid ${C.line}` }}>
              <span>Axis</span><span>The cognitive fingerprint</span>
            </div>
            {axes.map(([axis, desc], i) => (
              <div key={i} style={{ padding: "1.4rem 0", borderBottom: `1px solid ${C.line}`, display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0.6rem", alignItems: "baseline" }}>
                <span style={{ fontFamily: mono, fontSize: "0.72rem", color: C.gold }}>{`0${i + 1}`}</span>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.4rem", margin: 0 }}>{axis}</h3>
                  <p style={{ color: C.inkSoft, fontSize: "0.98rem", margin: "0.35rem 0 0", maxWidth: "40ch" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "3.6rem", borderTop: `2px solid ${C.ink}`, paddingTop: "2.2rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oliveLite, margin: 0 }}>What you get</p>
          <Head size="section" style={{ maxWidth: "22ch", margin: "0.9rem 0 0" }}>
            Expertise that behaves like an asset.
          </Head>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", maxWidth: "62ch", marginTop: "1.2rem", lineHeight: 1.6 }}>
            Firms sell solutions and expertise. AllianceOne makes that expertise traceable, repeatable, and compounding.
          </p>
          <div style={{ borderTop: `1px solid ${C.line}`, marginTop: "2.2rem" }}>
            {[
              ["Traceable", "Every method and claim cites the engagements that prove it. Not “we're good at this,” but “here are the four engagements where this approach worked, the one where it didn't, and why.”"],
              ["Repeatable", "Methods carry their conditions of application, so your best partner's judgment is deliverable by more than the partner who invented it. Your second-year executes with partner-grade judgment encoded in the method."],
              ["Compounding", "Every engagement refines the methods, and refined methods sharpen every future one, including the ones that look nothing alike. The system gets better the more the firm works."],
            ].map(([term, body], i) => (
              <div key={i} className="ao-def" style={{ display: "grid", gridTemplateColumns: "minmax(190px,0.75fr) 1.5fr", gap: "1.4rem 3rem", padding: "2rem 0", borderBottom: `1px solid ${C.line}`, alignItems: "start" }}>
                <div>
                  <span style={{ fontFamily: mono, fontSize: "0.72rem", color: C.gold }}>{`0${i + 1}`}</span>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(1.8rem,2.8vw,2.3rem)", margin: "0.35rem 0 0", lineHeight: 1 }}>{term}</h3>
                </div>
                <p style={{ color: C.inkSoft, fontSize: "1.06rem", margin: 0, lineHeight: 1.6, maxWidth: "54ch" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
      <style>{`@media (max-width:720px){.ao-def{grid-template-columns:1fr !important;gap:0.6rem !important}}`}</style>
    </Section>
  );
}



// ---- 05 why AllianceOne (the vs-general-model columns + the moat) ---------

function WhyNotGenericAI({ onCta }) {
  const general = [
    "Has read every framework ever published, so it gives you the average of all consulting knowledge.",
    "Sees only the fragment you paste, disconnected from everything around it.",
    "Remembers fragments for one user at a time. Nothing assembles into a firm-wide record of decisions and outcomes.",
    "Knows the frameworks. It can't know your firm's earned opinion of them.",
  ];
  const ours = [
    "Holds your firm's hard-won deviation from the average: what you learned actually works, and where.",
    "Sees the whole: how each piece connects to the decision behind it and the outcome it led to.",
    "Accumulates. Every completed engagement makes the system richer and the firm sharper.",
    "Carries your firm's judgment about the frameworks, the thing a client pays a premium for.",
  ];
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <div id="why" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Marker n="05" color={C.gold}>Why AllianceOne</Marker>
        <Head light size="section" style={{ maxWidth: "24ch", margin: "1.5rem 0 0" }}>
          &ldquo;Couldn't we just do this with Claude or ChatGPT?&rdquo;
        </Head>
        <p style={{ color: "rgba(244,241,232,0.72)", fontSize: "1.05rem", maxWidth: "60ch", marginTop: "1.1rem" }}>
          Good tools. You're probably already using them, and you should keep doing so. But there's one thing they can't do, and it's not from any lack of capability. It's because of what they fundamentally are.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1px", background: "rgba(244,241,232,0.14)", border: "1px solid rgba(244,241,232,0.14)", marginTop: "2.4rem" }}>
          <div style={{ background: C.ink, padding: "2.2rem 2rem" }}>
            <h3 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,241,232,0.55)", margin: "0 0 1.2rem" }}>A general model</h3>
            {general.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", padding: "0.7rem 0", borderTop: i === 0 ? "none" : "1px solid rgba(244,241,232,0.1)" }}>
                <span style={{ color: "rgba(244,241,232,0.4)", flex: "none" }}>·</span>
                <span style={{ fontSize: "0.96rem", color: "rgba(244,241,232,0.78)" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.oliveDeep, padding: "2.2rem 2rem" }}>
            <h3 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold, margin: "0 0 1.2rem" }}>AllianceOne</h3>
            {ours.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", padding: "0.7rem 0", borderTop: i === 0 ? "none" : "1px solid rgba(244,241,232,0.14)" }}>
                <span style={{ color: C.gold, flex: "none" }}>✓</span>
                <span style={{ fontSize: "0.96rem", color: "rgba(244,241,232,0.9)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ color: "rgba(244,241,232,0.72)", fontSize: "1.05rem", maxWidth: "62ch", margin: "2.4rem 0 0" }}>
          It's not a contest of quality, and a better model won't close the gap. A general model hands anyone an opinion in seconds, the same average one your competitors get. What it can't hand them is <em style={{ fontStyle: "italic", color: C.goldSoft }}>evidence</em>: what actually worked, for whom, and why. General models <em style={{ fontStyle: "italic", color: C.goldSoft }}>retrieve</em> from everything. AllianceOne <em style={{ fontStyle: "italic", color: C.goldSoft }}>accumulates</em> that evidence from your firm. It's the one thing no model brings.
        </p>
        <div style={{ marginTop: "3rem", borderLeft: `3px solid ${C.gold}`, paddingLeft: "1.6rem", maxWidth: "70ch" }}>
          <p style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, margin: "0 0 0.6rem" }}>The moat</p>
          <p style={{ fontFamily: serif, fontSize: "clamp(1.3rem,2.1vw,1.6rem)", color: C.bone, margin: 0, lineHeight: 1.3 }}>
            Every engagement you complete widens a gap no better model can close.
          </p>
          <p style={{ color: "rgba(244,241,232,0.72)", fontSize: "1.02rem", margin: "0.9rem 0 0", lineHeight: 1.6 }}>
            The advantage compounds in private. Your evidence accumulates inside your own system, sharpening your firm's fingerprint with every engagement, and it never leaves to train anyone else's model. A competitor can license the same AI tomorrow. They can't license your history.
          </p>
        </div>
        <div style={{ marginTop: "2.8rem" }}>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- 01 who it's for (the firms and the partner) ---------------------------

function WhoItsFor() {
  const verticals = [
    ["Management consulting", "Where the deliverable is judgment itself: which approach, why, and whether it worked. The reasoning behind every recommendation becomes reusable, instead of leaving with the partner who made it."],
    ["Advisory", "Deals, risk, restructuring. High-stakes, precedent-driven work where what you did last time, and how it turned out, is the most valuable thing in the room."],
    ["Accounting & tax", "Where engagement history, positions taken, and institutional knowledge shape quality, risk, and margin across hundreds of recurring engagements."],
  ];
  return (
    <Section style={{ background: C.boneDim }}>
      <div id="who" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Marker n="01">Who it's for</Marker>
        <Head size="display" style={{ maxWidth: "22ch", margin: "1.5rem 0 0" }}>
          Firms whose product is expertise.
        </Head>
        <div style={{ borderTop: `2px solid ${C.ink}`, marginTop: "2.4rem" }}>
          {verticals.map(([h, p], i) => (
            <div key={i} className="ao-def" style={{ display: "grid", gridTemplateColumns: "minmax(210px,0.7fr) 1.5fr", gap: "0.8rem 3rem", padding: "1.8rem 0", borderBottom: `1px solid ${C.line}`, alignItems: "baseline" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.6rem", margin: 0 }}>{h}</h3>
              <p style={{ color: C.inkSoft, fontSize: "1.02rem", margin: 0, maxWidth: "58ch", lineHeight: 1.55 }}>{p}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2.8rem", borderLeft: `3px solid ${C.gold}`, paddingLeft: "1.6rem", maxWidth: "72ch" }}>
          <p style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oliveLite, margin: "0 0 0.6rem" }}>And the person who carries it</p>
          <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.7rem", margin: "0 0 0.7rem" }}>Built for the partner who carries the firm.</h3>
          <p style={{ color: C.inkSoft, fontSize: "1.04rem", margin: 0, lineHeight: 1.6 }}>
            AllianceOne is for the operating and managing partners whose margin, quality, and risk ride on judgment that today lives in scattered files and a few senior people's heads. It puts the firm's accumulated experience where the whole firm can draw on it, so the best thinking doesn't leave with the person who had it, and quality doesn't depend on who's staffed.
          </p>
        </div>

      </Wrap>
    </Section>
  );
}

// ---- close (own your practice; final CTA) ---------------------------------

function Close({ onCta }) {
  return (
    <Section>
      <Wrap>
        <Head size="display" style={{ maxWidth: "16ch", margin: 0 }}>
          Own your practice.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.16rem", maxWidth: "54ch", marginTop: "1.4rem", lineHeight: 1.6 }}>
          Your firm's expertise is its most valuable asset. Today it's also its least usable. AllianceOne is how you change that.
        </p>
        <div style={{ marginTop: "2.2rem" }}>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- footer (ASG as quiet plumbing) -----------------------------------------

export function Footer({ onCta }) {
  const links = [["who", "Who it's for"], ["model", "What it is"], ["product", "The product"], ["why", "Why AllianceOne"]];
  const linkStyle = { display: "block", fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer", textDecoration: "none" };
  return (
    <footer style={{ background: C.ink, color: C.bone, padding: "4rem 0 2.5rem", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
      <Wrap>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "38ch" }}>
            <Logo light />
            <p style={{ color: "rgba(244,241,232,0.6)", fontSize: "0.92rem", marginTop: "1rem" }}>
              Your firm's own experience, assembled into usable expertise, in the hands of the people who built it.
            </p>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Explore</h5>
              {links.map(([id, label]) => (
                <AnchorLink key={id} id={id} style={linkStyle}>{label}</AnchorLink>
              ))}
              <a href="/security/" style={linkStyle}>Security &amp; data ownership</a>
            </div>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Connect</h5>
              <button onClick={onCta} style={{ ...linkStyle, background: "none", border: 0, padding: 0, fontFamily: "inherit", textAlign: "left" }}>Request a demo</button>
              <a href="mailto:hello@myalliance.ai" style={{ ...linkStyle, marginBottom: 0 }}>hello@myalliance.ai</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "3rem", paddingTop: "1.6rem", borderTop: "1px solid rgba(244,241,232,0.1)", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(244,241,232,0.55)" }}>
            <svg viewBox="0 0 32 32" width="16" height="16"><path d="M16 4 L29 28 H21.5 L16 15 L10.5 28 H3 Z" fill={C.gold} /><path d="M16 4 L29 28 H21.5 L16 15 Z" fill={C.oliveLite} /></svg>
            A product of Alliance Systems Group
          </span>
          <span style={{ fontSize: "0.82rem", color: "rgba(244,241,232,0.45)" }}>© 2026 Alliance Systems Group. All rights reserved.</span>
        </div>
      </Wrap>
    </footer>
  );
}

// ---- contact modal ----------------------------------------------------------

export function Modal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", firm: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const mailtoFallback = () => {
    const subject = encodeURIComponent("AllianceOne demo request");
    const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nWork email: ${form.email}\n\nWe'd like to see AllianceOne on our firm's own work.`);
    window.location.href = `mailto:hello@myalliance.ai?subject=${subject}&body=${body}`;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!DEMO_FORM_ENDPOINT) { mailtoFallback(); return; }
    setStatus("sending");
    try {
      const res = await fetch(DEMO_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, firm: form.firm, email: form.email, _subject: "AllianceOne demo request" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };
  const field = { fontFamily: sans, fontSize: "0.95rem", padding: "0.75rem 0.9rem", borderRadius: 4, border: `1px solid ${C.line}`, background: C.bone, color: C.ink, width: "100%", boxSizing: "border-box" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,22,15,0.55)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <div role="dialog" aria-modal="true" aria-label="Request a demo" onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 10, maxWidth: 460, width: "100%", padding: "2.5rem", position: "relative", boxShadow: "0 40px 80px -30px rgba(20,22,15,0.5)" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 18, right: 18, background: "none", border: 0, fontSize: "1.4rem", lineHeight: 1, cursor: "pointer", color: C.inkSoft }}>×</button>
        <Eyebrow>Request a demo</Eyebrow>
        {status === "sent" ? (
          <>
            <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.9rem", margin: "0.8rem 0 0.6rem", lineHeight: 1.1 }}>Thank you. We'll be in touch.</h3>
            <p style={{ color: C.inkSoft, fontSize: "0.97rem", marginBottom: 0 }}>
              We'll reach out at {form.email} to set up a 30-minute walkthrough on engagements like yours.
            </p>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.9rem", margin: "0.8rem 0 0.6rem", lineHeight: 1.1 }}>See it on your firm's own work.</h3>
            <p style={{ color: C.inkSoft, fontSize: "0.97rem", marginBottom: "1.6rem" }}>
              A 30-minute walkthrough on engagements like yours. Tell us where to reach you and we'll set it up.
            </p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <input style={field} type="text" required placeholder="Name" aria-label="Name" value={form.name} onChange={set("name")} />
              <input style={field} type="text" required placeholder="Firm" aria-label="Firm" value={form.firm} onChange={set("firm")} />
              <input style={field} type="email" required placeholder="Work email" aria-label="Work email" value={form.email} onChange={set("email")} />
              <button type="submit" disabled={status === "sending"} style={{ marginTop: "0.4rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: C.gold, color: C.ink, fontFamily: sans, fontWeight: 600, fontSize: "0.95rem", padding: "0.95rem 1.7rem", borderRadius: 2, border: 0, cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending…" : "Request a demo →"}
              </button>
            </form>
            {status === "error" && (
              <p style={{ fontSize: "0.85rem", color: "#a0522d", marginTop: "0.9rem", marginBottom: 0 }}>
                That didn't go through. <a href="#" onClick={(e) => { e.preventDefault(); mailtoFallback(); }} style={{ color: C.olive }}>Email us instead</a> and we'll take it from there.
              </p>
            )}
          </>
        )}
        <p style={{ fontSize: "0.8rem", color: C.oliveLite, marginTop: "1.2rem", marginBottom: 0 }}>
          Prefer email? <a href="mailto:hello@myalliance.ai?subject=AllianceOne%20demo" style={{ color: C.olive }}>hello@myalliance.ai</a>
        </p>
      </div>
    </div>
  );
}

// ---- root ----------------------------------------------------------------

export default function App() {
  const [modal, setModal] = useState(false);
  const openCta = () => setModal(true);
  useFonts();

  return (
    <div style={{ fontFamily: sans, background: C.bone, color: C.ink, fontSize: 17, lineHeight: 1.6, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav onCta={openCta} />
      <Hero onCta={openCta} />
      <WhoItsFor />
      <ModelThePractice />
      <TheProduct />
      <TheShift />
      <WhyNotGenericAI onCta={openCta} />
      <Close onCta={openCta} />
      <Footer onCta={openCta} />
      <Modal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

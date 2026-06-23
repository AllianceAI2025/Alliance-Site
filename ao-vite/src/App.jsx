import React, { useState, useEffect } from "react";

// ============================================================
// AllianceOne — product site v4
// Spine: Consulting is applying proven frameworks to specific problems.
//   Frameworks are the easy part (every firm AND every AI has them).
//   The judgment — which approach, for whom, why, and whether it worked —
//   is the moat. AllianceOne operationalizes that judgment by assembling
//   the firm's own distributed knowledge into a usable, living account.
// Voice: anti-hype, calm, firm-as-hero. No "neural network"/"brain" in copy.
// ASG appears only as quiet plumbing in the footer.
// v4: consolidated to remove repetition. The thesis is stated once (Craft →
//   Capture), every section is roughly halved, and only two beats run dark so
//   the page breathes. Hierarchy via the Head atom — one display peak.
// ============================================================

const C = {
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

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', system-ui, sans-serif";
const ease = "cubic-bezier(.22,1,.36,1)";

// ---- atoms ---------------------------------------------------------------

function Eyebrow({ children, color = C.olive, style }) {
  return (
    <p style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color, margin: 0, ...style }}>
      {children}
    </p>
  );
}

// Section headline with a deliberate size hierarchy so the page has rest:
//   display — the one peak (the centerpiece); section — the working default;
//   quiet — recessive (qualification strips that shouldn't compete).
function Head({ children, light = false, size = "section", style }) {
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

function Btn({ children, onClick, variant = "primary", href }) {
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

function Logo({ light = false, size = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
      <svg viewBox="0 0 36 36" width={30 * size} height={30 * size} style={{ display: "block", flex: "none" }}>
        <circle cx="18" cy="18" r="16" fill="none" stroke={light ? C.gold : C.olive} strokeWidth="2" />
        <circle cx="18" cy="18" r="3" fill={light ? C.gold : C.olive} />
        <circle cx="18" cy="4.5" r="2.4" fill={light ? C.goldSoft : C.oliveLite} />
        <circle cx="31.5" cy="24" r="2.4" fill={light ? C.goldSoft : C.oliveLite} />
        <circle cx="6" cy="24" r="2.4" fill={light ? C.goldSoft : C.oliveLite} />
        <g stroke={light ? C.gold : C.olive} strokeWidth="1.2" opacity="0.8">
          <line x1="18" y1="18" x2="18" y2="4.5" />
          <line x1="18" y1="18" x2="31.5" y2="24" />
          <line x1="18" y1="18" x2="6" y2="24" />
        </g>
      </svg>
      <span style={{ fontFamily: serif, fontWeight: 600, fontSize: `${1.32 * size}rem`, letterSpacing: "-0.01em", lineHeight: 1, color: light ? C.bone : C.ink }}>
        Alliance<span style={{ color: light ? C.gold : C.olive }}>One</span>
      </span>
    </div>
  );
}

function Wrap({ children, style }) {
  return <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,4.5rem)", ...style }}>{children}</div>;
}
function Section({ children, style }) {
  return <section style={{ padding: "clamp(4.5rem,9vw,8rem) 0", ...style }}>{children}</section>;
}

// ---- nav -----------------------------------------------------------------

// Four anchors, not six — a shorter nav reads as a shorter page. Reality is a
// quick opening beat and Capture now lives inside Craft, so neither needs a link.
const SECTIONS = [
  ["craft", "The craft"],
  ["different", "Why not just AI"],
  ["honest", "Straight answers"],
  ["adopt", "Build partners"],
];

function Nav({ onCta }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", background: "rgba(244,241,232,0.82)", borderBottom: `1px solid ${C.lineSoft}` }}>
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem clamp(1.25rem,5vw,4.5rem)" }}>
        <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo />
        </div>
        <nav className="ao-desktop" style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
          {SECTIONS.map(([id, label]) => (
            <span key={id} onClick={() => goTo(id)} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)}
              style={{ fontFamily: sans, fontSize: "0.84rem", fontWeight: 500, color: C.inkSoft, cursor: "pointer", position: "relative", padding: "0.2rem 0" }}>
              {label}
              <span style={{ position: "absolute", left: 0, bottom: -2, height: 1, background: C.olive, width: hover === id ? "100%" : 0, transition: `width .35s ${ease}` }} />
            </span>
          ))}
          <span onClick={onCta} style={{ fontFamily: sans, fontSize: "0.84rem", fontWeight: 600, padding: "0.6rem 1.25rem", border: `1px solid ${C.ink}`, borderRadius: 2, cursor: "pointer" }}>
            Talk to us
          </span>
        </nav>
        <button className="ao-mobile-btn" onClick={() => setOpen((o) => !o)} style={{ display: "none", background: "none", border: 0, cursor: "pointer", padding: 6 }} aria-label="Menu">
          {[0, 1, 2].map((i) => <span key={i} style={{ display: "block", width: 24, height: 2, background: C.ink, margin: "5px 0" }} />)}
        </button>
      </Wrap>
      {open && (
        <div style={{ background: C.bone, borderBottom: `1px solid ${C.line}`, padding: "1.4rem clamp(1.25rem,5vw,4.5rem) 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {SECTIONS.map(([id, label]) => (
            <span key={id} onClick={() => goTo(id)} style={{ fontFamily: sans, fontSize: "1rem", fontWeight: 500, color: C.inkSoft, cursor: "pointer" }}>{label}</span>
          ))}
          <span onClick={() => { setOpen(false); onCta(); }} style={{ fontFamily: sans, fontSize: "1rem", fontWeight: 600, color: C.ink, cursor: "pointer" }}>Talk to us</span>
        </div>
      )}
      <style>{`@media (max-width:1040px){.ao-desktop{display:none!important}.ao-mobile-btn{display:block!important}}`}</style>
    </header>
  );
}

// ---- hero ----------------------------------------------------------------

function Hero({ onCta }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(4rem,8vw,7rem) 0 clamp(4rem,7vw,6rem)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: `linear-gradient(${C.lineSoft} 1px, transparent 1px), linear-gradient(90deg, ${C.lineSoft} 1px, transparent 1px)`, backgroundSize: "64px 64px", WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 72% 32%, #000 0%, transparent 72%)", maskImage: "radial-gradient(ellipse 75% 70% at 72% 32%, #000 0%, transparent 72%)" }} />
      <Wrap style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow>For professional services firms</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: "18ch", margin: "0.8rem 0 0" }}>
          AI in your firm is inevitable. <em style={{ fontStyle: "italic", color: C.olive }}>The hype is optional.</em>
        </h1>
        <p style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)", maxWidth: "54ch", marginTop: "1.6rem", color: C.ink, fontWeight: 500 }}>
          AllianceOne assembles your firm's own knowledge — the work, the decisions, the outcomes — into a living account of how your firm actually solves problems, so your judgment travels with every new engagement.
        </p>
        <div style={{ marginTop: "2.4rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn variant="primary" onClick={onCta}>Start a deliberate conversation</Btn>
          <Btn variant="ghost" onClick={() => document.getElementById("craft")?.scrollIntoView({ behavior: "smooth" })}>See how it thinks</Btn>
        </div>
      </Wrap>
    </section>
  );
}

// ---- the reality (empathy / anti-hype) ------------------------------------
// Dark beat #1. Cards carry it — no intro paragraph.

function Reality() {
  const items = [
    ["The pitches all sound the same", "Tenfold productivity. Total transformation. Adopt now or fall behind. You've heard it weekly for three years — your skepticism is earned."],
    ["Paralysis on one side, panic on the other", "Some firms freeze, unable to choose among a hundred near-identical tools. Others buy something — anything — to say they did. Neither is a strategy."],
    ["The real question goes unasked", "Not “which AI tool?” but: what is our firm's actual edge now that drafting is cheap, and how do we make it compound instead of leak away?"],
  ];
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <Wrap>
        <Eyebrow color={C.gold}>The reality</Eyebrow>
        <Head light size="section" style={{ maxWidth: "22ch" }}>
          You're not behind. You're exhausted — and rightly so.
        </Head>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "2.5rem", marginTop: "3rem" }}>
          {items.map(([h, p], i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(244,241,232,0.18)", paddingTop: "1.4rem" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.55rem", margin: "0 0 0.6rem", lineHeight: 1.1 }}>{h}</h3>
              <p style={{ color: "rgba(244,241,232,0.66)", fontSize: "0.97rem", margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- the craft → what we capture (the spine; the page's heart) ------------
// The thesis is stated ONCE here, then resolves straight into the four-part
// capture. This is the single display-size peak.

function Craft() {
  const cards = [
    ["Who", "The client, the context, the constraints — the specific situation the work answered to.", false],
    ["What", "The approach: framework, methodology, plan. The part every firm — and every general AI — already has.", false],
    ["Why", "The reasoning behind the choice. Why this approach over the obvious alternative — the judgment that rarely gets written down.", true],
    ["Outcome", "What actually happened: promised versus delivered, what worked and what didn't. The dimension that turns a record into calibrated judgment.", true],
  ];
  return (
    <Section>
      <div id="craft" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <div style={{ maxWidth: "60ch" }}>
          <Eyebrow>The craft</Eyebrow>
          <Head size="display" style={{ maxWidth: "20ch", marginBottom: "1.3rem" }}>
            The framework was never the hard part.
          </Head>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", marginBottom: "1.1rem" }}>
            Consulting is the craft of applying proven frameworks to specific problems. But the frameworks were never what made a firm valuable. Every firm has them. Now every AI has them too.
          </p>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", margin: 0 }}>
            The hard part — the part that takes a career — is the <strong style={{ color: C.ink, fontWeight: 600 }}>judgment</strong>: which approach fits which problem, why, and whether it actually worked. It isn't lost. It's <strong style={{ color: C.ink, fontWeight: 600 }}>unassembled</strong> — scattered across your proposals, email, teams, methodologies, and people, so no one has ever seen the whole of it at once.
          </p>
        </div>

        <p style={{ color: C.ink, fontWeight: 500, fontSize: "1.12rem", maxWidth: "58ch", margin: "3.4rem 0 0" }}>
          AllianceOne assembles it around the shape of the work itself — four things, for every engagement your firm has done.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.4rem", marginTop: "1.8rem" }}>
          {cards.map(([term, desc, moat], i) => (
            <div key={i} style={{ background: moat ? C.ink : C.paper, color: moat ? C.bone : C.ink, border: `1px solid ${moat ? C.ink : C.line}`, borderRadius: 8, padding: "2rem 1.8rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.9rem", margin: 0, color: moat ? C.gold : C.oliveDeep }}>{term}</h3>
                <span style={{ fontFamily: sans, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: moat ? C.gold : C.oliveLite, border: `1px solid ${moat ? "rgba(180,150,90,0.4)" : C.line}`, borderRadius: 100, padding: "0.2rem 0.55rem" }}>
                  {moat ? "the moat" : "commodity"}
                </span>
              </div>
              <p style={{ fontSize: "0.93rem", color: moat ? "rgba(244,241,232,0.72)" : C.inkSoft, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.3rem", color: C.oliveDeep, maxWidth: "62ch", margin: "2.4rem 0 0", lineHeight: 1.4 }}>
          The What is the part anyone can already give you. The Why and the Outcome live only in your firm's own history — and they're what your judgment is made of.
        </p>
      </Wrap>
    </Section>
  );
}

// ---- the assembly (firm-as-hero synthesis + living model) -----------------

function GraphCard() {
  return (
    <div style={{ background: C.ink, borderRadius: 8, padding: "2.4rem", position: "relative", minHeight: 380, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(20,22,15,0.5)" }}>
      <svg viewBox="0 0 420 360" style={{ width: "100%", height: "auto", display: "block" }} aria-label="Distributed sources assembled into one connected account">
        <defs>
          <linearGradient id="ed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.85" />
            <stop offset="1" stopColor={C.oliveLite} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#ed)" strokeWidth="1.4" fill="none">
          <line x1="210" y1="185" x2="95" y2="70" /><line x1="210" y1="185" x2="335" y2="80" />
          <line x1="210" y1="185" x2="70" y2="200" /><line x1="210" y1="185" x2="350" y2="210" />
          <line x1="210" y1="185" x2="130" y2="305" /><line x1="210" y1="185" x2="300" y2="300" />
        </g>
        <circle cx="210" cy="185" r="40" fill={C.gold} />
        <text x="210" y="181" textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="700" fill={C.ink}>Your firm's</text>
        <text x="210" y="194" textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="700" fill={C.ink}>judgment</text>
        <g fontFamily={sans} fontSize="9.5" fontWeight="500" fill={C.bone} textAnchor="middle">
          <circle cx="95" cy="70" r="25" fill={C.olive} /><text x="95" y="73">Proposals</text>
          <circle cx="335" cy="80" r="25" fill={C.olive} /><text x="335" y="83">Email</text>
          <circle cx="70" cy="200" r="25" fill={C.olive} /><text x="70" y="203">Teams</text>
          <circle cx="350" cy="210" r="25" fill={C.olive} /><text x="350" y="213">Methods</text>
          <circle cx="130" cy="305" r="25" fill={C.olive} /><text x="130" y="308">People</text>
          <circle cx="300" cy="300" r="25" fill={C.olive} /><text x="300" y="303">Outcomes</text>
        </g>
      </svg>
      <span style={{ position: "absolute", bottom: "1.3rem", left: "2.4rem", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)" }}>
        Scattered everywhere — assembled into one account
      </span>
    </div>
  );
}

function Assembly() {
  return (
    <Section style={{ background: C.boneDim }}>
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <Eyebrow>The assembly</Eyebrow>
            <Head size="section" style={{ maxWidth: "20ch", marginBottom: "1.1rem" }}>
              It's the firm, and everyone in it.
            </Head>
            <p style={{ color: C.inkSoft, marginBottom: "1.1rem" }}>
              AllianceOne doesn't replace your people or mine them for what they know. The knowledge is already there — in the documents, the threads, the methodologies, and the people who built it. We assemble it into <strong style={{ color: C.ink, fontWeight: 600 }}>one living account</strong> of how your firm works, and put it back in their hands.
            </p>
            <p style={{ color: C.inkSoft, margin: 0 }}>
              We don't train a model on your firm; we build a living model <em style={{ fontStyle: "italic" }}>of</em> it. The structure stays explicit, so every connection is traceable to its source — legible, auditable, and yours.
            </p>
          </div>
          <GraphCard />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.6rem", marginTop: "4rem" }}>
          {[
            ["Juniors deliver like the firm", "A junior drafts against the firm's real precedents and voice — work that reads like the firm wrote it, not a generic model."],
            ["Seniors review reasoning, not piles", "Work carries its grounding with it, so review starts from “does this match how we've handled this — and should it?” not a blank page."],
            ["The firm gets sharper with use", "As engagements complete, decisions connect to outcomes. What surfaces next is shaped by what actually happened — so judgment compounds."],
          ].map(([h, p], i) => (
            <div key={i} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 6, padding: "2rem 1.8rem" }}>
              <div style={{ width: 34, height: 34, color: C.olive, marginBottom: "1rem" }}>
                {i === 0 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>}
                {i === 1 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>}
                {i === 2 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3v18h18" /><path d="M7 14l3-4 3 3 5-7" /></svg>}
              </div>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.4rem", margin: "0 0 0.55rem" }}>{h}</h3>
              <p style={{ fontSize: "0.95rem", color: C.inkSoft, margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- why not just use general AI ------------------------------------------
// Dark beat #2. One setup line, the contrast does the work, one payoff line.

function Different() {
  const general = [
    "Has read every framework ever published — so it gives you the average of all consulting knowledge.",
    "Sees only the fragment you paste, disconnected from everything around it.",
    "Starts fresh each time. Nothing it learns on your work today survives tomorrow.",
    "Knows the frameworks. It can't know your firm's earned opinion of them.",
  ];
  const ours = [
    "Holds your firm's hard-won deviation from the average — what you learned actually works, and where.",
    "Sees the whole: how each piece connects to the decision behind it and the outcome it led to.",
    "Accumulates. Every completed engagement makes the account richer and the firm sharper.",
    "Carries your firm's judgment about the frameworks — the thing a client pays a premium for.",
  ];
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <div id="different" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Eyebrow color={C.gold}>Why not just AI</Eyebrow>
        <Head light size="section" style={{ maxWidth: "24ch" }}>
          &ldquo;Couldn't we just do this with Claude or ChatGPT?&rdquo;
        </Head>
        <p style={{ color: "rgba(244,241,232,0.72)", fontSize: "1.05rem", maxWidth: "60ch", marginTop: "1.1rem" }}>
          Good tools — you're probably already using them, and you should keep doing so. But there's one thing they can't do: not from any lack of capability, but because of what they fundamentally are.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1px", background: "rgba(244,241,232,0.14)", border: "1px solid rgba(244,241,232,0.14)", marginTop: "2.8rem" }}>
          <div style={{ background: C.ink, padding: "2.2rem 2rem" }}>
            <h3 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,241,232,0.55)", margin: "0 0 1.2rem" }}>A general model</h3>
            {general.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", padding: "0.7rem 0", borderTop: i === 0 ? "none" : "1px solid rgba(244,241,232,0.1)" }}>
                <span style={{ color: "rgba(244,241,232,0.4)", flex: "none" }}>—</span>
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

        <p style={{ color: "rgba(244,241,232,0.72)", fontSize: "1.05rem", maxWidth: "62ch", marginTop: "2.4rem" }}>
          It's not a contest of quality, and a better model won't close the gap. General models <em style={{ fontStyle: "italic", color: C.goldSoft }}>retrieve</em> from everything; AllianceOne <em style={{ fontStyle: "italic", color: C.goldSoft }}>accumulates</em> from your firm. We use models too — to reason over that history. The history is the difference, and it's the one thing no model brings.
        </p>
      </Wrap>
    </Section>
  );
}

// ---- straight answers (what we won't / will promise) -----------------------

function Honest() {
  const wont = [
    "That AI will replace your professionals",
    "Tenfold productivity by Friday",
    "That one tool transforms your culture",
    "That we've perfected this — we're early, and we'll tell you so",
  ];
  const will = [
    "A working platform today, with a clear, honest view of where it's headed",
    "Your firm's own knowledge, assembled and traceable to its source",
    "Senior judgment carried forward — operationalized, never commoditized",
    "A deliberate adoption path, sized to your firm, with checkpoints to walk away",
  ];
  return (
    <Section>
      <div id="honest" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Eyebrow>Straight answers</Eyebrow>
        <Head size="section" style={{ maxWidth: "20ch" }}>
          What we won't promise — and what we will.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.05rem", maxWidth: "56ch", marginTop: "1.1rem" }}>
          You've been promised enough. Here's the boundary of our claims — because in this market, trust is built by what a vendor refuses to say.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.6rem", marginTop: "2.8rem" }}>
          <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 8, padding: "2.2rem 2rem" }}>
            <h3 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.inkSoft, margin: "0 0 1.4rem" }}>We won't promise</h3>
            {wont.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", padding: "0.65rem 0", borderTop: i === 0 ? "none" : `1px solid ${C.lineSoft}` }}>
                <span style={{ color: C.oliveLite, fontFamily: serif, fontStyle: "italic", flex: "none" }}>—</span>
                <span style={{ fontSize: "0.97rem", color: C.inkSoft }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.ink, color: C.bone, borderRadius: 8, padding: "2.2rem 2rem" }}>
            <h3 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, margin: "0 0 1.4rem" }}>We will deliver</h3>
            {will.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", padding: "0.65rem 0", borderTop: i === 0 ? "none" : "1px solid rgba(244,241,232,0.12)" }}>
                <span style={{ color: C.gold, flex: "none" }}>✓</span>
                <span style={{ fontSize: "0.97rem", color: "rgba(244,241,232,0.85)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- who it's for (quiet qualification strip — recedes by design) ----------

function Who() {
  const items = [
    ["Managing partners", "Adapting the firm's model — tired of choosing between paralysis and a panic purchase."],
    ["Senior practitioners", "Whose judgment is the firm's edge, and who'd rather see it scale than retire with them."],
    ["Advisory, accounting & tax", "Where engagement history and institutional knowledge shape quality, risk, and margin."],
    ["Firms building what's next", "Rethinking how judgment develops and travels now the apprenticeship path has changed shape."],
  ];
  return (
    <Section style={{ paddingBottom: "clamp(2.5rem,5vw,4rem)" }}>
      <Wrap>
        <Eyebrow>Who it's for</Eyebrow>
        <Head size="quiet" style={{ maxWidth: "26ch", marginBottom: "2.2rem" }}>
          Built for firms whose product is judgment.
        </Head>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "2rem 2.5rem" }}>
          {items.map(([h, p]) => (
            <div key={h} style={{ borderTop: `1px solid ${C.line}`, paddingTop: "1rem" }}>
              <h4 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.oliveDeep, margin: "0 0 0.5rem" }}>{h}</h4>
              <p style={{ fontSize: "0.94rem", color: C.inkSoft, margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- the close (build partners + final CTA, merged) ------------------------

function Adopt({ onCta }) {
  return (
    <Section style={{ paddingTop: "clamp(2.5rem,5vw,4rem)" }}>
      <div id="adopt" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <div style={{ background: C.oliveDeep, color: C.bone, borderRadius: 10, padding: "clamp(2.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 88% 12%, rgba(180,150,90,0.25), transparent 42%), radial-gradient(circle at 5% 95%, rgba(138,145,111,0.25), transparent 48%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "64ch" }}>
            <Eyebrow color={C.gold}>Build partners</Eyebrow>
            <Head light size="display" style={{ maxWidth: "26ch", margin: "1rem 0 1.2rem" }}>
              The antidote to a rushed AI decision is a small, honest one.
            </Head>
            <p style={{ color: "rgba(244,241,232,0.82)", fontSize: "1.05rem", marginBottom: "1.8rem" }}>
              We're working with a small number of founding build partners — firms that shape AllianceOne around their real engagements. Founding terms, direct influence over the roadmap, and clear checkpoints where either side can step away. It's how a careful firm tries the new baseline without betting on a slogan.
            </p>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.45rem", color: C.bone, lineHeight: 1.3, margin: "0 0 2rem", maxWidth: "30ch" }}>
              Your firm already knows more than it can see. Let's put it to work.
            </p>
            <Btn variant="gold" onClick={onCta}>Start the conversation</Btn>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- footer (ASG as quiet plumbing) -----------------------------------------

function Footer({ onCta }) {
  const links = [["craft", "The craft"], ["different", "Why not just AI"], ["honest", "Straight answers"], ["adopt", "Build partners"]];
  return (
    <footer style={{ background: C.ink, color: C.bone, padding: "4rem 0 2.5rem", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
      <Wrap>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "38ch" }}>
            <Logo light />
            <p style={{ color: "rgba(244,241,232,0.6)", fontSize: "0.92rem", marginTop: "1rem" }}>
              A living model of your firm — assembling your own knowledge into usable judgment, in the hands of the people who built it.
            </p>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Explore</h5>
              {links.map(([id, label]) => (
                <div key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>{label}</div>
              ))}
            </div>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Connect</h5>
              <div onClick={onCta} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>Talk to us</div>
              <div style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)" }}>hello@myalliance.ai</div>
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

function Modal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,22,15,0.55)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 10, maxWidth: 460, width: "100%", padding: "2.5rem", position: "relative", boxShadow: "0 40px 80px -30px rgba(20,22,15,0.5)" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 18, right: 18, background: "none", border: 0, fontSize: "1.4rem", lineHeight: 1, cursor: "pointer", color: C.inkSoft }}>×</button>
        <Eyebrow>A quieter conversation</Eyebrow>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.9rem", margin: "0.8rem 0 0.8rem", lineHeight: 1.1 }}>No pitch deck. Just talk.</h3>
        <p style={{ color: C.inkSoft, fontSize: "0.97rem", marginBottom: "1.6rem" }}>
          Tell us about your firm and what adoption pressure looks like from where you sit. We're keeping the founding cohort small, so every note gets read personally.
        </p>
        <a href="mailto:hello@myalliance.ai?subject=AllianceOne%20inquiry" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: C.ink, color: C.bone, fontFamily: sans, fontWeight: 600, fontSize: "0.92rem", padding: "0.95rem 1.7rem", borderRadius: 2, textDecoration: "none" }}>
          Email hello@myalliance.ai →
        </a>
        <p style={{ fontSize: "0.8rem", color: C.oliveLite, marginTop: "1.4rem" }}>
          A full inquiry form will live here once the site is hosted — for now this opens your email client.
        </p>
      </div>
    </div>
  );
}

// ---- root ----------------------------------------------------------------

export default function App() {
  const [modal, setModal] = useState(false);
  const openCta = () => setModal(true);

  useEffect(() => {
    if (!document.getElementById("ao-fonts")) {
      const link = document.createElement("link");
      link.id = "ao-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ fontFamily: sans, background: C.bone, color: C.ink, fontSize: 17, lineHeight: 1.6, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav onCta={openCta} />
      <Hero onCta={openCta} />
      <Reality />
      <Craft />
      <Assembly />
      <Different />
      <Honest />
      <Who />
      <Adopt onCta={openCta} />
      <Footer onCta={openCta} />
      <Modal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

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
//   display (the one peak / centerpiece), section (the working default),
//   quiet (recessive; qualification strips that shouldn't compete).
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
    <span style={{ fontFamily: serif, fontWeight: 600, fontSize: `${1.32 * size}rem`, letterSpacing: "-0.01em", lineHeight: 1, color: light ? C.bone : C.ink }}>
      Alliance<span style={{ color: light ? C.gold : C.olive }}>One</span>
    </span>
  );
}

function Wrap({ children, style }) {
  return <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,4.5rem)", ...style }}>{children}</div>;
}
function Section({ children, style }) {
  return <section style={{ padding: "clamp(4.5rem,9vw,8rem) 0", ...style }}>{children}</section>;
}

// ---- nav -----------------------------------------------------------------

// Three plain-language anchors + one persistent gold CTA (NN/g). The active
// section is highlighted as you scroll; labels describe, they don't brand.
const SECTIONS = [
  ["how-it-works", "How it works"],
  ["why", "Why AllianceOne"],
  ["who", "Who it's for"],
];

function Nav({ onCta }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [active, setActive] = useState(null);
  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const goldCta = { fontFamily: sans, fontSize: "0.84rem", fontWeight: 600, padding: "0.6rem 1.25rem", background: C.gold, color: C.ink, borderRadius: 2, cursor: "pointer" };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", background: "rgba(244,241,232,0.82)", borderBottom: `1px solid ${C.lineSoft}` }}>
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem clamp(1.25rem,5vw,4.5rem)" }}>
        <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo />
        </div>
        <nav className="ao-desktop" style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
          {SECTIONS.map(([id, label]) => {
            const on = active === id || hover === id;
            return (
              <span key={id} onClick={() => goTo(id)} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)}
                style={{ fontFamily: sans, fontSize: "0.84rem", fontWeight: active === id ? 600 : 500, color: on ? C.ink : C.inkSoft, cursor: "pointer", position: "relative", padding: "0.2rem 0", transition: `color .25s ${ease}` }}>
                {label}
                <span style={{ position: "absolute", left: 0, bottom: -2, height: 1, background: C.olive, width: on ? "100%" : 0, transition: `width .35s ${ease}` }} />
              </span>
            );
          })}
          <span onClick={onCta} style={goldCta}>Request a demo</span>
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
          <span onClick={() => { setOpen(false); onCta(); }} style={{ ...goldCta, fontSize: "1rem", textAlign: "center" }}>Request a demo</span>
        </div>
      )}
      <style>{`@media (max-width:1040px){.ao-desktop{display:none!important}.ao-mobile-btn{display:block!important}}`}</style>
    </header>
  );
}

// ---- hero ----------------------------------------------------------------
// Leads with the firm's own knowledge as the asset, then plants the
// general-AI distinction so the next section pays it off.

function Hero({ onCta }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(4rem,8vw,7rem) 0 clamp(4rem,7vw,6rem)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: `linear-gradient(${C.lineSoft} 1px, transparent 1px), linear-gradient(90deg, ${C.lineSoft} 1px, transparent 1px)`, backgroundSize: "64px 64px", WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 72% 32%, #000 0%, transparent 72%)", maskImage: "radial-gradient(ellipse 75% 70% at 72% 32%, #000 0%, transparent 72%)" }} />
      <Wrap style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow style={{ marginBottom: "1.4rem" }}>For firms whose product is expertise</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.3rem,5.2vw,4.2rem)", lineHeight: 1.06, letterSpacing: "-0.025em", maxWidth: "24ch", margin: 0 }}>
          Start the next engagement from every one your firm has <em style={{ fontStyle: "italic", color: C.olive }}>already run.</em>
        </h1>
        <p style={{ fontSize: "clamp(1.1rem,1.7vw,1.34rem)", maxWidth: "60ch", marginTop: "1.6rem", color: C.ink, fontWeight: 500 }}>
          AllianceOne is the system that holds your firm's engagements whole: the problem, the approach, the reasoning behind it, and how it turned out.
        </p>
        <p style={{ fontSize: "clamp(1rem,1.4vw,1.14rem)", maxWidth: "62ch", marginTop: "1.1rem", color: C.inkSoft }}>
          When your team scopes new work, the closest past engagements are already on the page, with their methods, their watch-outs, and their results. Not a blank page, and not the generic average a general model returns. And the system gets sharper with every engagement you close.
        </p>
        <div style={{ marginTop: "2.4rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
          <Btn variant="ghost" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>
        </div>
      </Wrap>
    </section>
  );
}



// ---- what you can do on day one (the wedge, in words) ----------------------
// The loudest concrete section: jobs a partner gets the week history loads.
// Each card pairs a job-to-be-done with an "instead of" contrast.

function DayOne() {
  const cards = [
    ["Scope a new engagement from real precedent", "Pull the approach, team shape, and risks from how your firm actually ran the closest past engagements", "instead of a blank page or a generic template."],
    ["Interrogate your own past work", "Ask what your firm did, for whom, and how it was structured, across every engagement at once", "instead of hunting through drives, threads, and people's memories."],
    ["Plan deliverables from what shipped before", "Build a project and deliverable plan off the closest real engagements, drawing on their structure, what they included, and why", "instead of rebuilding the same scaffolding every time."],
    ["Adapt precedent you can trust", "Find the documents, sections, and structures your firm has used before, each carrying how its engagement turned out, so you build on what worked and learn from what didn't", "instead of reusing similar-looking work with no idea whether it succeeded."],
  ];
  return (
    <Section style={{ background: C.boneDim }}>
      <div id="how-it-works" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Eyebrow>What you can do on day one</Eyebrow>
        <Head size="display" style={{ maxWidth: "20ch", marginBottom: "1.1rem" }}>
          Useful the day your history is loaded.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.08rem", maxWidth: "60ch", marginBottom: "2.8rem" }}>
          AllianceOne ingests the engagements your firm has already done. From day one, your people can:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.4rem" }}>
          {cards.map(([h, body, instead], i) => (
            <div key={i} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 8, padding: "2rem 1.9rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div style={{ display: "flex", gap: "0.9rem", alignItems: "baseline" }}>
                <span style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 600, color: C.gold, lineHeight: 1, flex: "none" }}>{`0${i + 1}`}</span>
                <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.4rem", margin: 0, lineHeight: 1.15 }}>{h}.</h3>
              </div>
              <p style={{ fontSize: "0.97rem", color: C.inkSoft, margin: 0 }}>{body}.</p>
              <p style={{ fontSize: "0.92rem", color: C.oliveLite, fontStyle: "italic", margin: "auto 0 0", paddingTop: "0.4rem" }}>{instead}</p>
            </div>
          ))}
        </div>
        <p style={{ color: C.ink, fontWeight: 500, fontSize: "1.08rem", maxWidth: "64ch", marginTop: "2.8rem" }}>
          And it compounds: as each engagement completes, its decisions connect to outcomes and feed back in, so the system gets richer and the people drawing on it get sharper with every engagement.
        </p>
      </Wrap>
    </Section>
  );
}

// Animated: source documents stream extracted data into a knowledge graph that
// assembles around the firm's expertise. Builds once when scrolled into view,
// then settles into a calm steady state (mote flow + soft pulse). Honors
// prefers-reduced-motion by showing the finished, static graph.
function GraphCard() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  const [reduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setPlay(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const core = { x: 230, y: 196 };
  const sources = [
    { label: "Proposals", x: 80, y: 70 },
    { label: "Email", x: 380, y: 70 },
    { label: "Deliverables", x: 58, y: 196 },
    { label: "Delivery plans", x: 402, y: 196 },
    { label: "Methods", x: 100, y: 322 },
    { label: "Outcomes", x: 360, y: 322 },
  ];
  const inner = [
    { x: 230, y: 132 }, { x: 296, y: 174 }, { x: 272, y: 250 }, { x: 190, y: 252 }, { x: 166, y: 176 },
  ];
  const cls = `ao-graph${reduce ? "" : " arm"}${play ? " play" : ""}`;

  return (
    <div ref={ref} className={cls} style={{ ["--e"]: ease, background: C.ink, borderRadius: 8, padding: "2.2rem 2.2rem 1.6rem", overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(20,22,15,0.5)" }}>
      <svg viewBox="0 0 460 400" role="img" aria-label="AllianceOne extracting a firm's proposals, email, deliverables, delivery plans, methods, and outcomes, and assembling that experience into one connected system of the firm's expertise">
        <title>Your firm's scattered experience, assembled into usable expertise</title>
        <defs>
          <linearGradient id="ed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.85" />
            <stop offset="1" stopColor={C.oliveLite} stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="coreglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.32" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* perimeter connectors: source -> core */}
        {sources.map((s, i) => (
          <path key={`e${i}`} className="ao-edge" d={`M${s.x},${s.y} L${core.x},${core.y}`} pathLength="1"
            fill="none" stroke="url(#ed)" strokeWidth="1.3" strokeDasharray="1"
            style={{ animationDelay: `${0.5 + i * 0.06}s` }} />
        ))}

        {/* inner knowledge-graph edges: spokes + ring */}
        {inner.map((n, j) => (
          <path key={`sp${j}`} className="ao-edge-inner" d={`M${core.x},${core.y} L${n.x},${n.y}`} pathLength="1"
            fill="none" stroke={C.goldSoft} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="1"
            style={{ animationDelay: `${1.0 + j * 0.05}s` }} />
        ))}
        {inner.map((n, j) => {
          const m = inner[(j + 1) % inner.length];
          return (
            <path key={`rg${j}`} className="ao-edge-inner" d={`M${n.x},${n.y} L${m.x},${m.y}`} pathLength="1"
              fill="none" stroke={C.oliveLite} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="1"
              style={{ animationDelay: `${1.2 + j * 0.05}s` }} />
          );
        })}

        {/* source documents */}
        {sources.map((s, i) => (
          <g key={`d${i}`} className="ao-src" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
            <g transform={`translate(${s.x - 13},${s.y - 16})`}>
              <path d="M0,2 a2,2 0 0 1 2,-2 h16 l8,8 v22 a2,2 0 0 1 -2,2 h-22 a2,2 0 0 1 -2,-2 z" fill={C.oliveDeep} stroke={C.oliveLite} strokeWidth="1" />
              <path d="M18,0 v6 a2,2 0 0 0 2,2 h6" fill="none" stroke={C.oliveLite} strokeWidth="1" />
              <line x1="5" y1="14" x2="21" y2="14" stroke={C.goldSoft} strokeOpacity="0.7" strokeWidth="1.4" />
              <line x1="5" y1="19" x2="21" y2="19" stroke={C.goldSoft} strokeOpacity="0.5" strokeWidth="1.4" />
              <line x1="5" y1="24" x2="15" y2="24" stroke={C.goldSoft} strokeOpacity="0.4" strokeWidth="1.4" />
            </g>
            <text x={s.x} y={s.y + 34} textAnchor="middle" fontFamily={sans} fontSize="9.5" fontWeight="600" fill="rgba(244,241,232,0.62)" letterSpacing="0.04em">{s.label}</text>
          </g>
        ))}

        {/* data motes streaming source -> core */}
        {sources.map((s, i) => {
          const dx = core.x - s.x, dy = core.y - s.y;
          return [0, 1].map((k) => (
            <circle key={`m${i}-${k}`} className="ao-mote" cx={s.x} cy={s.y} r="3.1" fill={C.gold}
              style={{ ["--dx"]: `${dx}px`, ["--dy"]: `${dy}px`, animationDelay: `${0.9 + i * 0.12 + k * 1.3}s` }} />
          ));
        })}

        {/* inner graph nodes */}
        {inner.map((n, j) => (
          <circle key={`n${j}`} className="ao-node" cx={n.x} cy={n.y} r="5" fill={C.goldSoft}
            style={{ animationDelay: `${1.15 + j * 0.07}s` }} />
        ))}

        {/* core: the firm's expertise */}
        <g className="ao-core">
          <circle cx={core.x} cy={core.y} r="58" fill="url(#coreglow)" />
          <circle cx={core.x} cy={core.y} r="34" fill={C.gold} />
          <text x={core.x} y={core.y - 3} textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="700" fill={C.ink}>Your firm's</text>
          <text x={core.x} y={core.y + 10} textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="700" fill={C.ink}>expertise</text>
        </g>
      </svg>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", textAlign: "center", margin: "0.6rem 0 0" }}>
        Your firm's experience, assembled into expertise your people can use
      </p>

      <style>{`
        .ao-graph svg{width:100%;height:auto;display:block}
        .ao-graph .ao-node,.ao-graph .ao-core{transform-box:fill-box;transform-origin:center}
        .ao-graph .ao-mote{opacity:0}
        @media (prefers-reduced-motion: no-preference){
          .ao-graph.arm .ao-src,.ao-graph.arm .ao-edge,.ao-graph.arm .ao-edge-inner,.ao-graph.arm .ao-node,.ao-graph.arm .ao-core{opacity:0}
          .ao-graph.play .ao-src{animation:ao-rise .7s var(--e) both}
          .ao-graph.play .ao-edge{animation:ao-draw .9s var(--e) both}
          .ao-graph.play .ao-edge-inner{animation:ao-draw 1s var(--e) both}
          .ao-graph.play .ao-node{animation:ao-pop .6s var(--e) both, ao-bob 5s ease-in-out 1.8s infinite}
          .ao-graph.play .ao-core{animation:ao-pop .7s var(--e) .45s both, ao-pulse 4.5s ease-in-out 2s infinite}
          .ao-graph.play .ao-mote{animation:ao-mote 2.6s linear infinite}
        }
        @keyframes ao-rise{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
        @keyframes ao-pop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:none}}
        @keyframes ao-draw{from{stroke-dashoffset:1;opacity:1}to{stroke-dashoffset:0;opacity:1}}
        @keyframes ao-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
        @keyframes ao-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes ao-mote{0%{transform:translate(0,0);opacity:0}14%{opacity:1}80%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}
      `}</style>
    </div>
  );
}



// ---- how it shows up (the engagement arc, as a picture) -------------------

function HowItShows() {
  const stages = [
    ["Planning", "Scope from what actually worked, not just what was done before.",
      "Shape the engagement from the closest past work, and see how those engagements turned out before you commit to an approach. Lean on what delivered, and flag the patterns that led somewhere your firm regretted. A blank page can't warn you. Neither can precedent that doesn't know its own result.",
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3v18h18" /><path d="M7 14l3-4 3 3 5-7" /></svg>],
    ["Execution", "Build against precedent that carries its verdict.",
      "Start the deliverable from the structure of real past work, with what worked in those engagements reinforced and the missteps surfaced so they aren't repeated. The team builds on the firm's best version of this, not the nearest lookalike. Retrieval finds you something similar. It can't tell you whether it succeeded.",
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>],
    ["Review", "Check the reasoning, not just the format.",
      "Work arrives carrying the decisions behind it, so a senior reviews why this approach, checking it against how the firm's comparable calls actually played out, instead of re-deriving the judgment from scratch or rubber-stamping the shape. The hardest part of review was never checking the formatting.",
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>],
  ];
  return (
    <Section>
      <Wrap>
        <Eyebrow>How it shows up in the work</Eyebrow>
        <Head size="section" style={{ maxWidth: "24ch", marginBottom: "1rem" }}>
          One system, across the whole engagement.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.08rem", maxWidth: "66ch", marginBottom: "3.4rem" }}>
          The system isn't a chatbot off to the side. Your team works from it at every stage, and at each one, the closest past engagements arrive whole: the problem they faced, the approach they took, the watch-outs, and how they turned out.
        </p>
        <div>
          {stages.map(([name, headline, body, icon], i) => (
            <div key={i} style={{ display: "flex", gap: "clamp(1rem,3vw,2.2rem)", alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.oliveDeep, color: C.bone, display: "grid", placeItems: "center", flex: "none" }}>{icon}</div>
                {i < stages.length - 1 && <div style={{ width: 2, flex: 1, background: C.line, marginTop: 6, marginBottom: 6 }} />}
              </div>
              <div style={{ paddingBottom: i < stages.length - 1 ? "2.8rem" : 0 }}>
                <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.oliveLite, margin: "0.5rem 0 0.6rem" }}>Stage {i + 1} &middot; {name}</p>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(1.45rem,2.4vw,1.95rem)", margin: "0 0 0.7rem", lineHeight: 1.15, maxWidth: "30ch" }}>{headline}</h3>
                <p style={{ fontSize: "1.02rem", color: C.inkSoft, margin: 0, maxWidth: "66ch" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- what it captures (the four dimensions of every engagement) ------------

function Product() {
  const capture = [
    ["Who", "The client, the context, the constraints. The specific situation the work answered to.", false],
    ["What", "The approach: framework, methodology, plan. The part every firm, and every general AI, already has.", false],
    ["Why", "The reasoning behind the choice: this approach over the obvious alternative. The judgment that rarely gets written down, captured where your history already holds it and recorded with every new engagement.", true],
    ["Outcome", "Promised versus delivered, what worked and what didn't. The evidence only your firm holds. It turns activity into calibrated judgment, and it deepens with every engagement that completes inside AllianceOne.", true],
  ];
  return (
    <Section style={{ background: C.boneDim }}>
      <div id="product" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <Eyebrow>What it captures</Eyebrow>
            <Head size="display" style={{ maxWidth: "18ch", marginBottom: "1.1rem" }}>
              Your firm's expertise, working for everyone in it.
            </Head>
            <p style={{ color: C.inkSoft, fontSize: "1.08rem", marginBottom: "1.1rem" }}>
              Today your firm's <strong style={{ color: C.ink, fontWeight: 600 }}>experience</strong> is scattered across documents, threads, methodologies, and people. AllianceOne brings every engagement into one system, whole and connected, so the firm's hard-won <strong style={{ color: C.ink, fontWeight: 600 }}>expertise</strong> is there for the people doing the next one.
            </p>
            <p style={{ color: C.inkSoft, margin: 0 }}>
              We don't train a model on your firm. We assemble your firm's own history into a structure your people can use. It's explicit, traceable, and yours.
            </p>
          </div>
          <GraphCard />
        </div>

        <p style={{ color: C.ink, fontWeight: 500, fontSize: "1.12rem", maxWidth: "58ch", margin: "4rem 0 0" }}>
          Every engagement is four things, captured together: the problem it solved, the approach taken, the reasoning behind it, and how it turned out.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.4rem", marginTop: "1.8rem" }}>
          {capture.map(([term, desc, moat], i) => (
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
        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.5rem", color: C.oliveDeep, maxWidth: "60ch", margin: "2.8rem 0 0", lineHeight: 1.35 }}>
          Any one of these is a fragment. The four together are the engagement.
        </p>
        <p style={{ color: C.inkSoft, fontSize: "1.02rem", maxWidth: "62ch", marginTop: "1.1rem" }}>
          A general model works from the fragment you paste. AllianceOne works from the whole engagement, problem through outcome, connected the way your firm actually ran it. A lookalike can't reconstruct that.
        </p>
      </Wrap>
    </Section>
  );
}

// ---- approach (the framework-is-commodity argument) -----------------------

function Approach() {
  return (
    <Section>
      <div id="approach" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <div style={{ maxWidth: "60ch" }}>
          <Eyebrow>Approach</Eyebrow>
          <Head size="section" style={{ maxWidth: "20ch", marginBottom: "1.3rem" }}>
            The framework was never the hard part.
          </Head>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", marginBottom: "1.1rem" }}>
            Consulting is the craft of applying proven frameworks to specific problems. But the frameworks were never what made a firm valuable. Every firm has them. Now every AI has them too.
          </p>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", marginBottom: "1.1rem" }}>
            When the same competent answer is available to everyone in seconds, the framework alone stops being a differentiator, and advice built on it competes on price.
          </p>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", margin: 0 }}>
            What doesn't commoditize is the <strong style={{ color: C.ink, fontWeight: 600 }}>judgment</strong> underneath, the part that takes a career: which approach fits which problem, why, and whether it actually worked. It isn't lost. It's <strong style={{ color: C.ink, fontWeight: 600 }}>unassembled</strong>, scattered across your proposals, email, teams, methodologies, and people, so no one has ever seen the whole of it at once.
          </p>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- why not just AI (the vs-general-model argument, its own dark section) -

function WhyNotAI({ onCta }) {
  const general = [
    "Has read every framework ever published, so it gives you the average of all consulting knowledge.",
    "Sees only the fragment you paste, disconnected from everything around it.",
    "Starts fresh each time. Nothing it learns on your work today survives tomorrow.",
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
        <Eyebrow color={C.gold}>Why AllianceOne</Eyebrow>
        <Head light size="section" style={{ maxWidth: "24ch" }}>
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
        <div style={{ marginTop: "2.8rem" }}>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- proof (a real product view of scoping a new engagement) --------------

function Proof() {
  const points = [
    ["Similar engagements, ranked", "The closest past engagements surface on their own, each with how it was actually run, not just that it exists."],
    ["Watch-outs from history", "The risks the firm hit before are flagged before scoping, so they aren't walked into a second time."],
    ["A scope that starts written", "Discovery feeds the scope directly. The first draft is the firm's real approach, not a generic template."],
  ];
  return (
    <Section>
      <Wrap>
        <Eyebrow>See it on real work</Eyebrow>
        <Head size="section" style={{ maxWidth: "28ch", marginBottom: "1rem" }}>
          Scoping a new engagement, grounded in the ones before it.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.08rem", maxWidth: "66ch", marginBottom: "2.6rem" }}>
          A partner opens a new engagement, and the scope starts to build itself from the firm's closest past work: the engagements that resemble it, the methods they used, and the watch-outs that surfaced along the way. The blank page is already filled in with the firm's own experience.
        </p>
        <figure style={{ margin: 0 }}>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 36px 70px -34px rgba(20,22,15,0.5)", background: C.paper }}>
            <img src="/worked-example.png" alt="The Scope view in AllianceOne: a new engagement being scoped from similar past engagements ranked by match, the in-scope items and constraints carried from discovery, and watch-outs surfaced automatically." style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <figcaption style={{ fontFamily: sans, fontSize: "0.8rem", color: C.oliveLite, marginTop: "0.9rem", textAlign: "center" }}>
            The Scope view in AllianceOne. Firm names shown are illustrative.
          </figcaption>
        </figure>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.6rem 2rem", marginTop: "3rem" }}>
          {points.map(([h, p], i) => (
            <div key={i} style={{ borderTop: `2px solid ${C.olive}`, paddingTop: "1rem" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.3rem", margin: "0 0 0.5rem" }}>{h}</h3>
              <p style={{ fontSize: "0.95rem", color: C.inkSoft, margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ---- industries (the firms it's built for; verticals whose product is expertise)

function Industries() {
  const items = [
    ["Management consulting", "Where the deliverable is judgment itself: which approach, why, and whether it worked. The reasoning behind every recommendation becomes reusable, instead of walking out the door with the partner who made it."],
    ["Advisory", "Deals, risk, restructuring. High-stakes, precedent-driven work where what you did last time, and how it actually turned out, is the most valuable thing in the room."],
    ["Accounting & tax", "Where engagement history, positions taken, and institutional knowledge shape quality, risk, and margin across hundreds of recurring engagements."],
  ];
  return (
    <Section style={{ background: C.boneDim }}>
      <div id="who" style={{ scrollMarginTop: 80 }} />
      <Wrap>
        <Eyebrow>Industries</Eyebrow>
        <Head size="section" style={{ maxWidth: "24ch", marginBottom: "1.1rem" }}>
          Built for firms whose product is expertise.
        </Head>
        <p style={{ color: C.inkSoft, fontSize: "1.05rem", maxWidth: "58ch", marginBottom: "2.8rem" }}>
          The work differs, but the asset is the same: decades of hard-won experience, distributed across people and engagements, and never assembled until now.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem 2.5rem" }}>
          {items.map(([h, p]) => (
            <div key={h} style={{ borderTop: `2px solid ${C.olive}`, paddingTop: "1.1rem" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.5rem", margin: "0 0 0.6rem" }}>{h}</h3>
              <p style={{ fontSize: "0.97rem", color: C.inkSoft, margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3.4rem", background: C.paper, border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.gold}`, borderRadius: 6, padding: "2rem 2.2rem", maxWidth: "72ch" }}>
          <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.6rem", margin: "0 0 0.7rem" }}>Built for the partner who carries the firm.</h3>
          <p style={{ color: C.inkSoft, fontSize: "1.02rem", margin: 0 }}>
            AllianceOne is for the operating and managing partners whose margin, quality, and risk ride on judgment that today lives in scattered files and a few senior people's heads. It puts the firm's accumulated experience where the whole firm can draw on it, so the best thinking doesn't walk out the door, and quality doesn't depend on who's staffed.
          </p>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- closing CTA (end on the action) ---------------------------------------

function ClosingCTA({ onCta }) {
  return (
    <Section>
      <Wrap>
        <div style={{ maxWidth: "62ch", margin: "0 auto", textAlign: "center" }}>
          <Head size="display" style={{ margin: "0 auto 1.4rem" }}>
            Your firm's experience is its most valuable asset. It's also its least usable.
          </Head>
          <p style={{ color: C.inkSoft, fontSize: "1.12rem", marginBottom: "2rem" }}>
            See what AllianceOne does with it.
          </p>
          <Btn variant="gold" onClick={onCta}>Request a demo</Btn>
        </div>
      </Wrap>
    </Section>
  );
}

// ---- footer (ASG as quiet plumbing) -----------------------------------------

function Footer({ onCta }) {
  const links = [["how-it-works", "How it works"], ["why", "Why AllianceOne"], ["who", "Who it's for"]];
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
                <div key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>{label}</div>
              ))}
            </div>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Connect</h5>
              <div onClick={onCta} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>Request a demo</div>
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
  const [form, setForm] = useState({ name: "", firm: "", email: "" });
  if (!open) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("AllianceOne demo request");
    const body = encodeURIComponent(`Name: ${form.name}\nFirm: ${form.firm}\nWork email: ${form.email}\n\nWe'd like to see AllianceOne on our firm's own work.`);
    window.location.href = `mailto:hello@myalliance.ai?subject=${subject}&body=${body}`;
  };
  const field = { fontFamily: sans, fontSize: "0.95rem", padding: "0.75rem 0.9rem", borderRadius: 4, border: `1px solid ${C.line}`, background: C.bone, color: C.ink, width: "100%", boxSizing: "border-box" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,22,15,0.55)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 10, maxWidth: 460, width: "100%", padding: "2.5rem", position: "relative", boxShadow: "0 40px 80px -30px rgba(20,22,15,0.5)" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 18, right: 18, background: "none", border: 0, fontSize: "1.4rem", lineHeight: 1, cursor: "pointer", color: C.inkSoft }}>×</button>
        <Eyebrow>Request a demo</Eyebrow>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.9rem", margin: "0.8rem 0 0.6rem", lineHeight: 1.1 }}>See it on your firm's own work.</h3>
        <p style={{ color: C.inkSoft, fontSize: "0.97rem", marginBottom: "1.6rem" }}>
          A 30-minute walkthrough on engagements like yours. Tell us where to reach you and we'll set it up.
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <input style={field} type="text" required placeholder="Name" value={form.name} onChange={set("name")} />
          <input style={field} type="text" required placeholder="Firm" value={form.firm} onChange={set("firm")} />
          <input style={field} type="email" required placeholder="Work email" value={form.email} onChange={set("email")} />
          <button type="submit" style={{ marginTop: "0.4rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: C.gold, color: C.ink, fontFamily: sans, fontWeight: 600, fontSize: "0.95rem", padding: "0.95rem 1.7rem", borderRadius: 2, border: 0, cursor: "pointer" }}>
            Request a demo →
          </button>
        </form>
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
      <DayOne />
      <HowItShows />
      <Product />
      <Approach />
      <WhyNotAI onCta={openCta} />
      <Proof />
      <Industries />
      <ClosingCTA onCta={openCta} />
      <Footer onCta={openCta} />
      <Modal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

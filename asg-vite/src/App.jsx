import React, { useState, useEffect } from "react";

// ============================================================
// Alliance Systems Group — single-file React site
// Pages: Home / Solutions / AllianceOne / About
// Type: Cormorant Garamond (display) + DM Sans (body)
// Palette: deep olive ink, warm bone, olive accent, metallic gold
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
  line: "rgba(20,22,15,0.12)",
  lineSoft: "rgba(20,22,15,0.07)",
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', system-ui, sans-serif";

// ---- shared atoms ---------------------------------------------------------

function Eyebrow({ children, color = C.olive, style }) {
  return (
    <p
      style={{
        fontFamily: sans,
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Btn({ children, onClick, variant = "primary", href }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    fontFamily: sans,
    fontSize: "0.92rem",
    fontWeight: 600,
    padding: "0.95rem 1.7rem",
    borderRadius: 2,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all .35s cubic-bezier(.22,1,.36,1)",
    textDecoration: "none",
  };
  const variants = {
    primary: { background: C.ink, color: C.bone },
    ghost: { background: "transparent", color: C.ink, borderColor: C.line },
    bone: { background: C.bone, color: C.ink },
    gold: { background: C.gold, color: C.ink },
  };
  const [hover, setHover] = useState(false);
  const hoverStyle =
    variant === "primary"
      ? { background: C.oliveDeep, transform: "translateY(-2px)" }
      : variant === "ghost"
      ? { background: C.ink, color: C.bone, borderColor: C.ink }
      : { transform: "translateY(-2px)" };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(hover ? hoverStyle : {}) }}
    >
      {children}
      <span
        style={{
          transition: "transform .35s cubic-bezier(.22,1,.36,1)",
          transform: hover ? "translateX(4px)" : "none",
        }}
      >
        →
      </span>
    </Tag>
  );
}

function Mark({ gold = false, size = 30 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ display: "block", flex: "none" }}>
      <path d="M16 2 L29 27 H21.5 L16 13 L10.5 27 H3 Z" fill={gold ? C.gold : C.olive} />
      <path d="M16 2 L29 27 H21.5 L16 13 Z" fill={gold ? C.oliveLite : C.oliveDeep} />
    </svg>
  );
}

function Wrap({ children, style }) {
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,5rem)", ...style }}>
      {children}
    </div>
  );
}

function Section({ children, style }) {
  return <section style={{ padding: "clamp(4.5rem,10vw,9rem) 0", ...style }}>{children}</section>;
}

function Divider() {
  return <hr style={{ height: 1, background: C.line, border: 0, margin: 0 }} />;
}

function SecHead({ eyebrow, title, body, light = false }) {
  return (
    <div style={{ maxWidth: "60ch" }}>
      <Eyebrow color={light ? C.gold : C.olive}>{eyebrow}</Eyebrow>
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: "clamp(2rem,4.4vw,3.4rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.01em",
          margin: "0.9rem 0 0",
          color: light ? C.bone : C.ink,
        }}
      >
        {title}
      </h2>
      {body && (
        <p
          style={{
            marginTop: "1.2rem",
            color: light ? "rgba(244,241,232,0.72)" : C.inkSoft,
            fontSize: "1.08rem",
            maxWidth: "56ch",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

// ---- nav ------------------------------------------------------------------

const PAGES = [
  ["home", "Home"],
  ["solutions", "Solutions"],
  ["allianceone", "AllianceOne"],
  ["about", "About"],
];

function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(244,241,232,0.82)",
        borderBottom: `1px solid ${C.lineSoft}`,
      }}
    >
      <Wrap style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.05rem clamp(1.25rem,5vw,5rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer" }} onClick={() => go("home")}>
          <Mark />
          <div>
            <div style={{ fontFamily: serif, fontSize: "1.32rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>
              Alliance <span style={{ color: C.olive }}>Systems Group</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: C.oliveLite, marginTop: 3 }}>
              Advisory · Engineering · Products
            </div>
          </div>
        </div>

        {/* desktop links */}
        <nav className="asg-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}>
          {PAGES.map(([key, label]) => (
            <span
              key={key}
              onClick={() => go(key)}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
              style={{
                fontFamily: sans,
                fontSize: "0.86rem",
                fontWeight: 500,
                color: page === key ? C.ink : C.inkSoft,
                cursor: "pointer",
                position: "relative",
                padding: "0.2rem 0",
              }}
            >
              {label}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -2,
                  height: 1,
                  background: C.olive,
                  width: page === key || hover === key ? "100%" : 0,
                  transition: "width .35s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </span>
          ))}
          <span
            onClick={() => go("about")}
            style={{
              fontFamily: sans,
              fontSize: "0.84rem",
              fontWeight: 600,
              padding: "0.6rem 1.25rem",
              border: `1px solid ${C.ink}`,
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            Start a conversation
          </span>
        </nav>

        {/* mobile toggle */}
        <button
          className="asg-mobile-btn"
          onClick={() => setOpen((o) => !o)}
          style={{ display: "none", background: "none", border: 0, cursor: "pointer", padding: 6 }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: C.ink, margin: "5px 0" }} />
          ))}
        </button>
      </Wrap>

      {open && (
        <div style={{ background: C.bone, borderBottom: `1px solid ${C.line}`, padding: "1.4rem clamp(1.25rem,5vw,5rem) 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {PAGES.map(([key, label]) => (
            <span key={key} onClick={() => { go(key); setOpen(false); }} style={{ fontFamily: sans, fontSize: "1rem", fontWeight: 500, color: page === key ? C.ink : C.inkSoft, cursor: "pointer" }}>
              {label}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .asg-desktop-nav { display: none !important; }
          .asg-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

// ---- hero shell -----------------------------------------------------------

function Hero({ children, dark = false }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(4rem,9vw,7.5rem) 0 clamp(4rem,8vw,6.5rem)",
        background: dark ? C.oliveDeep : "transparent",
      }}
    >
      {!dark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            backgroundImage: `linear-gradient(${C.lineSoft} 1px, transparent 1px), linear-gradient(90deg, ${C.lineSoft} 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, #000 0%, transparent 75%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, #000 0%, transparent 75%)",
          }}
        />
      )}
      {dark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 15%, rgba(180,150,90,0.22), transparent 45%), radial-gradient(circle at 10% 90%, rgba(138,145,111,0.25), transparent 50%)",
          }}
        />
      )}
      <Wrap style={{ position: "relative", zIndex: 1 }}>{children}</Wrap>
    </section>
  );
}

// ---- card pieces ----------------------------------------------------------

function CapCard({ num, title, body, tags }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? C.boneDim : C.paper, padding: "2.6rem 2.1rem 2.9rem", transition: "background .4s" }}
    >
      <span style={{ fontFamily: serif, fontSize: "0.95rem", color: C.oliveLite, fontStyle: "italic" }}>{num}</span>
      <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.6rem", margin: "1rem 0 0.7rem", lineHeight: 1.05 }}>{title}</h3>
      <p style={{ fontSize: "0.97rem", color: C.inkSoft, margin: 0 }}>{body}</p>
      <div style={{ marginTop: "1.3rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
        {tags.map((t) => (
          <span key={t} style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.04em", padding: "0.28rem 0.6rem", border: `1px solid ${C.line}`, borderRadius: 2, color: C.oliveDeep }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CapGrid({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 1,
        background: C.line,
        border: `1px solid ${C.line}`,
        marginTop: "3.5rem",
      }}
    >
      {items.map((it) => (
        <CapCard key={it.title} {...it} />
      ))}
    </div>
  );
}

function ThesisBand({ eyebrow, quote, paras }) {
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <Wrap>
        <Eyebrow color={C.gold}>{eyebrow}</Eyebrow>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(1.8rem,4vw,3.25rem)", lineHeight: 1.12, letterSpacing: "-0.015em", maxWidth: "22ch", marginTop: "1.4rem" }}>
          {quote}
        </p>
        <div style={{ marginTop: "2.4rem", display: "flex", gap: "3rem", flexWrap: "wrap", maxWidth: "62ch" }}>
          {paras.map((p, i) => (
            <p key={i} style={{ color: "rgba(244,241,232,0.72)", fontSize: "0.98rem", maxWidth: "40ch", margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function CtaBand({ eyebrow, title, body, btnLabel, btnVariant = "bone", onClick, href }) {
  return (
    <Section style={{ background: C.ink, color: C.bone, textAlign: "center" }}>
      <Wrap>
        <Eyebrow color={C.gold}>{eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.2rem,5vw,3.8rem)", maxWidth: "18ch", margin: "1rem auto 0", lineHeight: 1.05 }}>{title}</h2>
        <p style={{ color: "rgba(244,241,232,0.7)", margin: "1.3rem auto 2.4rem", maxWidth: "48ch" }}>{body}</p>
        <Btn variant={btnVariant} onClick={onClick} href={href}>{btnLabel}</Btn>
      </Wrap>
    </Section>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ background: C.ink, color: C.bone, padding: "4rem 0 2.5rem", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
      <Wrap>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer" }} onClick={() => go("home")}>
            <Mark gold />
            <div>
              <div style={{ fontFamily: serif, fontSize: "1.32rem", fontWeight: 600, color: C.bone, lineHeight: 1 }}>
                Alliance <span style={{ color: C.gold }}>Systems Group</span>
              </div>
              <div style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(244,241,232,0.45)", marginTop: 3 }}>
                Advisory · Engineering · Products
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Company</h5>
              {[["solutions", "Solutions"], ["allianceone", "AllianceOne"], ["about", "About"]].map(([k, l]) => (
                <div key={k} onClick={() => go(k)} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <h5 style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)", marginBottom: "1rem" }}>Connect</h5>
              <div onClick={() => go("about")} style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)", marginBottom: "0.6rem", cursor: "pointer" }}>Contact</div>
              <div style={{ fontSize: "0.92rem", color: "rgba(244,241,232,0.8)" }}>myalliance.ai</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "3rem", paddingTop: "1.6rem", borderTop: "1px solid rgba(244,241,232,0.1)", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", fontSize: "0.82rem", color: "rgba(244,241,232,0.5)" }}>
          <span>© 2026 Alliance Systems Group. All rights reserved.</span>
          <span>Making good things great, and great things exceptional.</span>
        </div>
      </Wrap>
    </footer>
  );
}

// ---- pages ----------------------------------------------------------------

function Home({ go }) {
  return (
    <>
      <Hero>
        <Eyebrow>Alliance Systems Group</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.8rem,6.6vw,5.6rem)", lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: "16ch", margin: "0.6rem 0 0" }}>
          AI shouldn't disrupt your business. It should <em style={{ fontStyle: "italic", color: C.olive }}>amplify</em> it.
        </h1>
        <p style={{ fontSize: "clamp(1.05rem,1.7vw,1.32rem)", maxWidth: "52ch", marginTop: "1.8rem", color: C.inkSoft }}>
          We're an advisory, engineering, and product company built on a simple conviction: the goal of intelligent technology isn't to replace what makes an organization good — it's to make good things great, and great things exceptional.
        </p>
        <div style={{ marginTop: "2.6rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn onClick={() => go("solutions")}>How we work</Btn>
          <Btn variant="ghost" onClick={() => go("allianceone")}>Meet AllianceOne</Btn>
        </div>
      </Hero>

      <ThesisBand
        eyebrow="Our point of view"
        quote={<>Most of the value in a business already exists. It just lives in <em style={{ fontStyle: "italic", color: C.gold }}>people, judgment, and patterns</em> that don't scale on their own.</>}
        paras={[
          "The market sells AI as a rupture — a reason to rebuild everything, replace everyone, start over. We see it differently.",
          "The organizations worth working with are already excellent at something. Our job is to find that excellence, give it leverage, and let it compound.",
        ]}
      />

      <Section>
        <Wrap>
          <SecHead eyebrow="What we do" title="Three ways we create leverage" body="We meet organizations wherever they are — from a strategic question to a shipped system to a platform we built ourselves. Often it's all three, in sequence." />
          <CapGrid
            items={[
              { num: "01 — Advisory", title: "Strategy & Advisory", body: "We help leaders cut through the noise: where AI genuinely creates value, where it's a distraction, and how to sequence investment so it pays off. Honest assessment before anyone writes code.", tags: ["AI readiness", "Opportunity mapping", "Roadmaps", "Governance"] },
              { num: "02 — Engineering", title: "Engineering & Delivery", body: "Strategy is worthless unshipped. We design and build the systems, integrations, and intelligent workflows that turn a plan into something working inside your business — fitted to the stack you already run.", tags: ["Applied AI", "Data systems", "Integration", "Custom builds"] },
              { num: "03 — Products", title: "Our Own Products", body: "We don't just advise from the sidelines — we build and operate our own software. AllianceOne, our intelligence platform for professional services, is where our thinking about durable, compounding value takes its sharpest form.", tags: ["AllianceOne", "Platform", "Owned IP"] },
            ]}
          />
        </Wrap>
      </Section>

      <Divider />

      {/* AllianceOne teaser */}
      <Section style={{ background: C.oliveDeep, color: C.bone, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 15%, rgba(180,150,90,0.22), transparent 45%), radial-gradient(circle at 10% 90%, rgba(138,145,111,0.25), transparent 50%)" }} />
        <Wrap style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow color={C.gold}>Our flagship product</Eyebrow>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.2rem,5vw,3.8rem)", marginTop: "1rem", maxWidth: "20ch", lineHeight: 1.05 }}>
            AllianceOne gives professional services a memory.
          </h2>
          <p style={{ color: "rgba(244,241,232,0.78)", maxWidth: "54ch", marginTop: "1.4rem", fontSize: "1.1rem" }}>
            Most tools help you produce the next document faster. AllianceOne does something more durable — it treats every engagement as a living record of problems, decisions, and outcomes, so a firm's hardest-won judgment stops walking out the door.
          </p>
          <div style={{ marginTop: "2.2rem" }}>
            <Btn variant="gold" onClick={() => go("allianceone")}>Explore AllianceOne</Btn>
          </div>
        </Wrap>
      </Section>

      <CtaBand
        eyebrow="Let's talk"
        title={<>Already good at something? Let's make it <em style={{ fontStyle: "italic", color: C.gold }}>exceptional</em>.</>}
        body="Whether you're weighing where AI fits, need a partner to build, or want to see what AllianceOne could do for your firm — we'd like to hear what you're working on."
        btnLabel="Start a conversation"
        onClick={() => go("about")}
      />
    </>
  );
}

function Solutions({ go }) {
  return (
    <>
      <Hero>
        <Eyebrow>Solutions</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.8rem,6.6vw,5.6rem)", lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: "16ch", margin: "0.6rem 0 0" }}>
          From the <em style={{ fontStyle: "italic", color: C.olive }}>question</em> to the system that answers it.
        </h1>
        <p style={{ fontSize: "clamp(1.05rem,1.7vw,1.32rem)", maxWidth: "52ch", marginTop: "1.8rem", color: C.inkSoft }}>
          We work across the full arc — helping leaders decide where AI belongs, building the systems that deliver it, and bringing our own products to bear when they fit. The throughline is always the same: amplify the strength that's already there.
        </p>
      </Hero>

      <Divider />

      <Section>
        <Wrap>
          <SecHead eyebrow="Capabilities" title="What we help with" body="Engagements rarely fit a single box. Most start with a strategic question and move into building — and the ones that matter most are where the two reinforce each other." />
          <CapGrid
            items={[
              { num: "01", title: "Strategy & Advisory", body: "We start by understanding what your organization is genuinely good at and where intelligent technology can extend that edge. Clear-eyed assessment, opportunity mapping, and a sequenced plan — without the hype tax.", tags: ["AI readiness", "Use-case discovery", "Roadmapping", "Build vs. buy", "Governance"] },
              { num: "02", title: "Engineering & Delivery", body: "We design and ship the working systems behind the strategy — applied AI, data pipelines, integrations, and intelligent workflows — engineered to live inside the tools and processes you already depend on.", tags: ["Applied AI", "Data architecture", "Workflow automation", "Systems integration"] },
              { num: "03", title: "Products", body: "When the right answer is something we've already built, we bring it. AllianceOne is our intelligence platform for professional services — and the clearest expression of how we think about durable, compounding value.", tags: ["AllianceOne", "Implementation", "Owned IP"] },
            ]}
          />
        </Wrap>
      </Section>

      <Divider />

      <Section>
        <Wrap>
          <SecHead eyebrow="How we work" title="A method built around amplification" body="We don't arrive with a template solution looking for a problem. The work moves in a deliberate sequence, and we're comfortable stopping at any stage if that's what serves you." />
          <div style={{ marginTop: "3.5rem" }}>
            {[
              ["i.", "Understand the strength", "Before any recommendation, we learn what you already do well — the judgment, relationships, and patterns that make the business work. That's the asset we're trying to amplify, not replace."],
              ["ii.", "Find the leverage", "We identify where intelligent systems create disproportionate return — and, just as important, where they don't. You leave this stage with a clear, honest picture and a sequenced plan, whether or not you build with us."],
              ["iii.", "Build what works", "We design and deliver the system, fitted to your existing stack with minimal switching cost. Real software, in production, doing real work — not a slide deck or a pilot that never ships."],
              ["iv.", "Compound the value", "The best systems get more valuable the longer they run. We design for that — so the leverage you gain this quarter keeps deepening, rather than depreciating the moment the project ends."],
            ].map(([idx, title, body], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "2rem", padding: "2.2rem 0", borderTop: `1px solid ${C.line}`, borderBottom: i === 3 ? `1px solid ${C.line}` : "none", alignItems: "start" }}>
                <span style={{ fontFamily: serif, fontSize: "2.6rem", color: C.olive, fontStyle: "italic", lineHeight: 1 }}>{idx}</span>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.5rem", marginBottom: "0.5rem" }}>{title}</h3>
                  <p style={{ color: C.inkSoft, fontSize: "1rem", maxWidth: "60ch", margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <Divider />

      <Section>
        <Wrap>
          <SecHead eyebrow="Who we serve" title="Where we do our best work" body="We're at our sharpest with organizations whose value lives in expertise — where knowledge, judgment, and trust are the product." />
          <Audience
            items={[
              ["Professional services", "Advisory, accounting, tax, and consulting firms where senior judgment is the asset and scaling it is the constraint."],
              ["Finance & operations leaders", "Teams that need clarity on where AI genuinely earns its keep — and a partner who will tell them where it doesn't."],
              ["Founders & owners", "Businesses that are already good at something and want to make it exceptional without rebuilding from scratch."],
              ["Teams ready to build", "Organizations past the strategy stage that need an engineering partner who ships and stays accountable to outcomes."],
            ]}
          />
        </Wrap>
      </Section>

      <CtaBand
        eyebrow="Let's talk"
        title={<>Tell us what you're already <em style={{ fontStyle: "italic", color: C.gold }}>great</em> at.</>}
        body="The most useful first conversation is usually the simplest: what does your organization do well, and where does it feel like that strength hits a ceiling?"
        btnLabel="Start a conversation"
        onClick={() => go("about")}
      />
    </>
  );
}

function Audience({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}`, marginTop: "3rem" }}>
      {items.map(([h, p]) => (
        <div key={h} style={{ background: C.bone, padding: "1.8rem 1.9rem" }}>
          <h4 style={{ fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.olive, marginBottom: "0.6rem" }}>{h}</h4>
          <p style={{ fontSize: "0.97rem", color: C.inkSoft, margin: 0 }}>{p}</p>
        </div>
      ))}
    </div>
  );
}

function GraphCard() {
  return (
    <div style={{ background: C.ink, borderRadius: 6, padding: "2.4rem", position: "relative", minHeight: 380, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(20,22,15,0.5)" }}>
      <svg viewBox="0 0 420 360" style={{ width: "100%", height: "auto", display: "block" }} aria-label="Connected engagement graph">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.8" />
            <stop offset="1" stopColor={C.oliveLite} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#edge)" strokeWidth="1.4" fill="none">
          <line x1="210" y1="180" x2="100" y2="80" />
          <line x1="210" y1="180" x2="330" y2="90" />
          <line x1="210" y1="180" x2="90" y2="270" />
          <line x1="210" y1="180" x2="340" y2="270" />
          <line x1="100" y1="80" x2="330" y2="90" />
          <line x1="90" y1="270" x2="340" y2="270" />
          <line x1="330" y1="90" x2="340" y2="270" />
        </g>
        <circle cx="210" cy="180" r="34" fill={C.gold} />
        <text x="210" y="184" textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="600" fill={C.ink}>Engagement</text>
        <g fontFamily={sans} fontSize="9.5" fontWeight="500" fill={C.bone} textAnchor="middle">
          <circle cx="100" cy="80" r="24" fill={C.olive} /><text x="100" y="83">Problems</text>
          <circle cx="330" cy="90" r="24" fill={C.olive} /><text x="330" y="93">Decisions</text>
          <circle cx="90" cy="270" r="24" fill={C.olive} /><text x="90" y="273">Outcomes</text>
          <circle cx="340" cy="270" r="24" fill={C.olive} /><text x="340" y="273">People</text>
        </g>
      </svg>
      <span style={{ position: "absolute", bottom: "1.3rem", left: "2.4rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)" }}>
        Every engagement, connected and remembered
      </span>
    </div>
  );
}

function AllianceOne({ go }) {
  return (
    <>
      <Hero dark>
        <Eyebrow color={C.gold}>A product by Alliance Systems Group</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.8rem,6.6vw,5.6rem)", lineHeight: 1.04, letterSpacing: "-0.025em", color: C.bone, margin: "0.6rem 0 0" }}>
          Alliance<span style={{ color: C.gold }}>One</span>
        </h1>
        <p style={{ fontSize: "clamp(1.05rem,1.7vw,1.32rem)", maxWidth: "56ch", marginTop: "1.4rem", color: "rgba(244,241,232,0.82)" }}>
          An intelligence platform for professional services. AllianceOne gives a firm something it has never really had: a memory for its own judgment — the decisions, trade-offs, and outcomes that usually live only in people's heads.
        </p>
      </Hero>

      <Section>
        <Wrap>
          <SecHead eyebrow="The problem worth solving" title="A firm's most valuable asset is its hardest to keep." body="In professional services, the real product isn't the deliverable — it's the judgment behind it. Why a scope was set the way it was. Which risks a senior partner sensed early. What actually drove the outcome. That knowledge is enormously valuable, and almost none of it is ever captured." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "2rem", marginTop: "3.5rem" }}>
            {[
              ["In people", "The judgment that wins and runs engagements lives in heads, not systems."],
              ["Lost", "When someone leaves — or simply forgets — the firm relearns what it already knew."],
              ["Repeated", "The same scoping mistakes recur because nothing connects a decision to its result."],
            ].map(([big, lbl]) => (
              <div key={big}>
                <div style={{ fontFamily: serif, fontSize: "clamp(2.6rem,5vw,4rem)", color: C.olive, lineHeight: 1 }}>{big}</div>
                <div style={{ marginTop: "0.6rem", fontSize: "0.9rem", color: C.inkSoft, maxWidth: "24ch" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <Divider />

      <Section>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <Eyebrow>The idea</Eyebrow>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", margin: "0.9rem 0 1.1rem", lineHeight: 1.05 }}>The engagement is the unit of memory.</h3>
              <p style={{ color: C.inkSoft, marginBottom: "1.1rem" }}>Most software in this space is built around documents — generate the next memo, retrieve the last one, move on. Useful, but forgettable. The moment a project ends, the tool forgets it ever happened.</p>
              <p style={{ color: C.inkSoft, marginBottom: "1.1rem" }}>AllianceOne is built around a different center of gravity: <strong style={{ color: C.ink, fontWeight: 600 }}>the engagement itself.</strong> Every problem framed, decision made, and outcome reached connects into a living record that persists and grows.</p>
              <p style={{ color: C.inkSoft, margin: 0 }}>The result is a system that doesn't just help you produce work faster — it <strong style={{ color: C.ink, fontWeight: 600 }}>remembers how the work actually went</strong>, and gets smarter every time you use it.</p>
            </div>
            <GraphCard />
          </div>
        </Wrap>
      </Section>

      <Divider />

      <Section>
        <Wrap>
          <SecHead eyebrow="What makes it different" title="Not a faster typewriter. A memory." body="Plenty of tools accelerate output. AllianceOne is built for something more durable — turning a firm's accumulated experience into an asset that compounds." />
          <div style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.6rem" }}>
            {[
              ["It connects, not just stores", "Information doesn't sit in folders. It links — problem to decision, decision to outcome — so the firm can finally see why things turned out the way they did."],
              ["It closes the loop", "AllianceOne can trace an outcome back to the choice that shaped it — so a firm learns from its own history instead of quietly repeating it."],
              ["It compounds over time", "Every engagement makes the next one sharper. The platform's value grows with use — the opposite of a tool you outgrow."],
            ].map(([h, p], i) => (
              <div key={i} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 4, padding: "2rem 1.8rem" }}>
                <div style={{ width: 38, height: 38, color: C.olive, marginBottom: "1.1rem" }}>
                  {i === 0 && (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /><circle cx="12" cy="12" r="3" /></svg>)}
                  {i === 1 && (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3v18h18" /><path d="M7 14l3-4 3 3 5-7" /></svg>)}
                  {i === 2 && (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>)}
                </div>
                <h4 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.35rem", marginBottom: "0.55rem" }}>{h}</h4>
                <p style={{ fontSize: "0.93rem", color: C.inkSoft, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <ThesisBand
        eyebrow="What it represents"
        quote={<>A firm that <em style={{ fontStyle: "italic", color: C.gold }}>remembers</em> beats a firm that merely produces.</>}
        paras={[
          "AllianceOne is the clearest expression of how Alliance Systems Group thinks about AI: not as a replacement for expertise, but as a way to give expertise permanence and leverage.",
          "It takes the thing a great firm already does best — apply hard-won judgment to hard problems — and makes that judgment durable, shareable, and ever-improving.",
        ]}
      />

      <Section>
        <Wrap>
          <SecHead eyebrow="Who it's for" title="Built for firms whose product is judgment" body="AllianceOne is purpose-built for professional services — beginning with the advisory, accounting, and tax firms where senior expertise is the asset and capturing it is the unsolved problem." />
          <Audience
            items={[
              ["Advisory & consulting", "Firms whose value rests on scoping the right problem and bringing pattern recognition no junior could replicate."],
              ["Accounting & tax", "Practices where institutional knowledge and engagement history directly shape quality, risk, and margin."],
              ["Boutique professional firms", "Lean teams where the loss of one senior person can mean the loss of years of accumulated know-how."],
              ["Growth-stage practices", "Firms scaling past the point where everything fits in a few people's heads — and feeling the strain."],
            ]}
          />
        </Wrap>
      </Section>

      <CtaBand
        eyebrow="See it for your firm"
        title={<>Give your firm a <em style={{ fontStyle: "italic", color: C.gold }}>memory</em>.</>}
        body="We're working with a select group of professional services firms to shape AllianceOne around real engagements. If that sounds like yours, we'd like to talk."
        btnLabel="Request a conversation"
        btnVariant="gold"
        onClick={() => go("about")}
      />
    </>
  );
}

function About({ go }) {
  return (
    <>
      <Hero>
        <Eyebrow>About</Eyebrow>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.8rem,6.6vw,5.6rem)", lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: "18ch", margin: "0.6rem 0 0" }}>
          We build leverage for businesses that are <em style={{ fontStyle: "italic", color: C.olive }}>already good</em>.
        </h1>
        <p style={{ fontSize: "clamp(1.05rem,1.7vw,1.32rem)", maxWidth: "52ch", marginTop: "1.8rem", color: C.inkSoft }}>
          Alliance Systems Group is an advisory, engineering, and product company. We exist because the loudest story about AI — that it will disrupt and replace everything — gets the most important part wrong.
        </p>
      </Hero>

      <Divider />

      <Section>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <Eyebrow>Why we exist</Eyebrow>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", margin: "0.9rem 0 1.1rem", lineHeight: 1.05 }}>A different bet on what AI is for.</h3>
              <p style={{ color: C.inkSoft, marginBottom: "1.1rem" }}>The market is crowded with companies selling rupture — rebuild your stack, replace your people, start from zero. We think that's both wrong and wasteful.</p>
              <p style={{ color: C.inkSoft, marginBottom: "1.1rem" }}>Most organizations are already excellent at something hard-won. <strong style={{ color: C.ink, fontWeight: 600 }}>The opportunity isn't to erase that — it's to amplify it.</strong> To take the judgment, relationships, and patterns a business already has and give them leverage they could never reach alone.</p>
              <p style={{ color: C.inkSoft, margin: 0 }}>That conviction runs through everything we do: the advice we give, the systems we build, and the products we own.</p>
            </div>
            <div style={{ background: C.oliveDeep, borderRadius: 6, padding: "2.4rem", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "0 30px 60px -30px rgba(20,22,15,0.5)" }}>
              <div>
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.bone, lineHeight: 1.2, maxWidth: "18ch", margin: "0 auto" }}>
                  Good things, made great. Great things, made exceptional.
                </p>
                <span style={{ display: "block", marginTop: "1.6rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,232,0.5)" }}>Our operating principle</span>
              </div>
            </div>
          </div>
        </Wrap>
      </Section>

      <Divider />

      <Section>
        <Wrap>
          <SecHead eyebrow="How we think" title="What guides the work" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "2.6rem 4rem", marginTop: "3.5rem" }}>
            {[
              ["01.", "Amplify, don't replace", "We start from what an organization already does well and build outward. Technology earns its place by extending strength, not erasing it."],
              ["02.", "Honesty over hype", "We'll tell you where AI creates real value and, just as readily, where it doesn't. A clear no is worth more than an expensive maybe."],
              ["03.", "Ship real things", "Strategy that never becomes a working system is just expensive opinion. We're accountable to what actually runs in production."],
              ["04.", "Build for compounding", "The best systems get more valuable with time. We design so the leverage you gain today keeps deepening tomorrow."],
            ].map(([n, h, p]) => (
              <div key={n}>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.5rem", marginBottom: "0.6rem" }}>
                  <span style={{ color: C.olive, fontStyle: "italic" }}>{n}</span> {h}
                </h3>
                <p style={{ color: C.inkSoft, fontSize: "1rem", margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <Divider />

      <Section style={{ background: C.ink, color: C.bone, textAlign: "center" }}>
        <Wrap>
          <Eyebrow color={C.gold}>Start a conversation</Eyebrow>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.2rem,5vw,3.8rem)", maxWidth: "18ch", margin: "1rem auto 0", lineHeight: 1.05 }}>
            Let's make your <em style={{ fontStyle: "italic", color: C.gold }}>best</em> work scale.
          </h2>
          <p style={{ color: "rgba(244,241,232,0.7)", margin: "1.3rem auto 2.4rem", maxWidth: "48ch" }}>
            Tell us what your organization does well and where it feels like that strength hits a ceiling. That's almost always the right place to begin.
          </p>
          <Btn variant="bone" href="mailto:hello@myalliance.ai?subject=Conversation%20with%20Alliance%20Systems%20Group">hello@myalliance.ai</Btn>
          <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "rgba(244,241,232,0.5)" }}>Alliance Systems Group · myalliance.ai</p>
        </Wrap>
      </Section>
    </>
  );
}

// ---- root -----------------------------------------------------------------

export default function App() {
  const [page, setPage] = useState("home");
  const [fade, setFade] = useState(false);

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    setFade(false);
    const t = requestAnimationFrame(() => setFade(true));
    return () => cancelAnimationFrame(t);
  }, [page]);

  useEffect(() => {
    if (!document.getElementById("asg-fonts")) {
      const link = document.createElement("link");
      link.id = "asg-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ fontFamily: sans, background: C.bone, color: C.ink, fontSize: 17, lineHeight: 1.6, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav page={page} go={go} />
      <div style={{ opacity: fade ? 1 : 0, transform: fade ? "none" : "translateY(12px)", transition: "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)" }}>
        {page === "home" && <Home go={go} />}
        {page === "solutions" && <Solutions go={go} />}
        {page === "allianceone" && <AllianceOne go={go} />}
        {page === "about" && <About go={go} />}
      </div>
      <Footer go={go} />
    </div>
  );
}

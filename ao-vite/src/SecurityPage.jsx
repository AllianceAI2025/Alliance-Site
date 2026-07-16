import React, { useState } from "react";
import { C, serif, sans, useFonts, Eyebrow, Head, Btn, Wrap, Section, Nav, Footer, Modal } from "./App.jsx";

// ============================================================
// Security & data ownership (/security/)
// The page behind "It's explicit, traceable, and yours." Written to the
// positioning rules: every claim sits beside its mechanism, no superlatives,
// and what isn't built yet is said out loud (Straight answers).
// ============================================================

function Pillars() {
  const pillars = [
    ["One firm, one graph",
      "Your history is assembled into a knowledge graph and vector store provisioned for your firm. It isn't a shared index across customers, and nothing from your graph informs any other firm's system."],
    ["No model trained on your data",
      "No foundation model is trained or fine-tuned on your documents. Models reason over your firm's own records at answer time, and what they produce is grounded in what your firm actually did. Your data lives in your graph, not in model weights."],
    ["Documents stay where they live",
      "For files in your Microsoft 365, AllianceOne works by reference: opening a precedent mints a short-lived link from SharePoint or OneDrive at that moment. Copies aren't hoarded in our store, and a file you move, delete, or restrict stays moved, deleted, or restricted."],
    ["Traceable to the source",
      "Every extracted decision, risk, and outcome carries a reference to the document and passage it came from. If the system says your firm learned something, you can open the engagement where it learned it."],
    ["Yours, including on the way out",
      "The structure is explicit: engagements, decisions, outcomes, people. Not an opaque embedding. That's what makes it auditable while you're a customer, and extractable if you ever leave."],
  ];
  return (
    <Section style={{ paddingTop: "clamp(2.5rem,5vw,4rem)" }}>
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.4rem" }}>
          {pillars.map(([h, body], i) => (
            <div key={i} style={{ background: C.paper, border: `1px solid ${C.line}`, borderTop: `2px solid ${C.olive}`, borderRadius: 8, padding: "2rem 1.9rem" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.4rem", margin: "0 0 0.7rem", lineHeight: 1.15 }}>{h}.</h3>
              <p style={{ fontSize: "0.97rem", color: C.inkSoft, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function StraightAnswers() {
  const qas = [
    ["Do you train AI models on our engagement files?",
      "No. We use models to reason over your firm's history; we don't train or fine-tune them on it. The distinction matters: training moves your knowledge into weights you can't inspect or take back. Assembly keeps it in a structure you can."],
    ["Our engagement files contain our clients' confidential information.",
      "They do, and that obligation is the design constraint, not an afterthought. Access requires an authenticated member of your firm, every request is scoped to your firm alone, and source documents in your Microsoft 365 keep living under the permissions you already manage there."],
    ["Can we wall off specific engagements?",
      "A straight answer: today, the people your firm authorizes can draw on its full history, and for most firms that reach is the point of the product. Per-engagement walls, for independence rules and client-specific restrictions, are designed into the access path but not yet enforced. If your firm needs them from day one, raise it in the demo and we'll be straight about timing."],
    ["What happens if we leave?",
      "Your documents never stopped being yours; most never left your systems. The graph built from them is explicit and exportable. We'd rather keep you by being useful than by being sticky."],
  ];
  return (
    <Section style={{ background: C.ink, color: C.bone }}>
      <Wrap>
        <Eyebrow color={C.gold}>Straight answers</Eyebrow>
        <Head light size="section" style={{ maxWidth: "24ch", marginBottom: "2.2rem" }}>
          The questions we'd ask, answered plainly.
        </Head>
        <div style={{ maxWidth: "72ch" }}>
          {qas.map(([q, a], i) => (
            <div key={i} style={{ padding: "1.6rem 0", borderTop: i === 0 ? "none" : "1px solid rgba(244,241,232,0.12)" }}>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "1.45rem", margin: "0 0 0.6rem", color: C.goldSoft, lineHeight: 1.2 }}>&ldquo;{q}&rdquo;</h3>
              <p style={{ fontSize: "1rem", color: "rgba(244,241,232,0.82)", margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

export default function SecurityPage() {
  const [modal, setModal] = useState(false);
  const openCta = () => setModal(true);
  useFonts();

  return (
    <div style={{ fontFamily: sans, background: C.bone, color: C.ink, fontSize: 17, lineHeight: 1.6, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav onCta={openCta} />
      <section style={{ padding: "clamp(3.5rem,7vw,6rem) 0 0" }}>
        <Wrap>
          <Eyebrow style={{ marginBottom: "1.4rem" }}>Security &amp; data ownership</Eyebrow>
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(2.1rem,4.6vw,3.5rem)", lineHeight: 1.06, letterSpacing: "-0.025em", maxWidth: "22ch", margin: 0 }}>
            Your firm's history stays <em style={{ fontStyle: "italic", color: C.olive }}>your firm's.</em>
          </h1>
          <p style={{ fontSize: "clamp(1.05rem,1.6vw,1.25rem)", maxWidth: "62ch", marginTop: "1.6rem", color: C.ink, fontWeight: 500 }}>
            Engagement files are the most sensitive thing a professional-services firm holds, and much of what's in them belongs to your clients under obligations you've signed. Here is how AllianceOne handles them, each claim next to the mechanism behind it.
          </p>
        </Wrap>
      </section>
      <Pillars />
      <StraightAnswers />
      <Section>
        <Wrap>
          <div style={{ maxWidth: "62ch", margin: "0 auto", textAlign: "center" }}>
            <Head size="section" style={{ margin: "0 auto 1.4rem" }}>
              Ask us the hard questions.
            </Head>
            <p style={{ color: C.inkSoft, fontSize: "1.08rem", marginBottom: "2rem" }}>
              A demo runs on engagements like yours. Bring the person who owns risk at your firm.
            </p>
            <Btn variant="gold" onClick={openCta}>Request a demo</Btn>
          </div>
        </Wrap>
      </Section>
      <Footer onCta={openCta} />
      <Modal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

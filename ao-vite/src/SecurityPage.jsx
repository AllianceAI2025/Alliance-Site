import React, { useState } from "react";
import { useFonts, Head, Btn, Wrap, Nav, Footer, Modal } from "./App.jsx";
import { capture, Track } from "./analytics";

const pillars = [
  ["Firm isolation", "Each firm’s data lives in its own graph, scoped by firm identity. Nothing from your firm informs another firm’s system."],
  ["Source ownership", "Your CRM, project, document, and finance systems remain authoritative for the facts they own. AllianceOne records where each fact came from."],
  ["Evidence before inference", "Every claim about your practice carries its source and review state. Stronger evidence can replace a weaker inference, never the reverse."],
  ["Known gaps stay visible", "AllianceOne tracks which sources are connected, excluded, or not yet mapped, so missing data is never treated as a conclusion."],
  ["Human authority", "Models propose. Your people approve anything that changes a plan, a client artifact, or your firm’s methods."],
  ["Permission-aware access", "People see what their role and participation allow. Others’ conversations contribute attributed signals, not searchable raw text."],
];

const answers = [
  ["Do you train foundation models on our engagement data?", "No. Models reason over your firm’s records when they answer. Your firm knowledge and engagement record stay within your data boundary, not in shared model weights."],
  ["What happens when systems disagree?", "The system that owns the fact governs. A billing record outranks a number extracted from a proposal, and the discrepancy itself becomes a signal worth reviewing."],
  ["Can the model silently change your firm’s methods?", "No. Machines propose and people confirm. Claims that are contradicted or poorly supported can be downgraded or blocked from reuse."],
  ["What should a design partner expect?", "We map your source systems and permission requirements before making any coverage claims, and we name any control or connector that is not ready."],
];

export default function SecurityPage() {
  const [modal, setModal] = useState(false); useFonts(); const open = () => setModal(true);
  return <div className="site-shell"><Nav onCta={open} /><main>
    <Track name="hero" className="security-hero"><Wrap><div className="security-hero-grid"><div><h1>Your firm’s knowledge stays attributable, governed, and yours.</h1></div><p>AllianceOne works across client work, commercial systems, and internal judgment. It treats provenance, permission, and known uncertainty as part of the product, not as metadata.</p></div></Wrap></Track>
    <Track name="pillars" className="section security-pillars"><Wrap><div className="security-pillars-head"><Head size="display">Trust is established claim by claim.</Head></div><div className="security-pillar-list">{pillars.map(([title, body]) => <article className="security-pillar" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></Wrap></Track>
    <Track name="questions" className="section straight-section"><Wrap><div className="straight-grid"><div><Head light size="quiet">Questions your risk leader should ask.</Head></div><div className="straight-list">{answers.map(([q, a]) => <article className="straight-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></Wrap></Track>
    <Track name="cta" className="section security-close"><Wrap><Head>Bring the hard questions before you bring the data.</Head><p>We will walk through tenancy, coverage, access requirements, model use, and the source systems involved in your engagement lifecycle.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Start a security conversation</Btn></Wrap></Track>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

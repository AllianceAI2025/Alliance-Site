import React, { useState } from "react";
import { useFonts, Head, Btn, Wrap, Section, Nav, Footer, Modal } from "./App.jsx";

const pillars = [
  ["Firm isolation", "Each firm is routed to its own graph and every operational record is scoped by firm identity. A firm’s model does not inform another firm’s system."],
  ["Source ownership", "CRM, project, document, and financial systems remain authoritative for the facts they own. AllianceOne records where each fact came from and reconciles copies against the proper source."],
  ["Evidence before inference", "Every practice claim carries a truth class, provenance, and review state. Stronger evidence can replace a weaker inference; the reverse is blocked."],
  ["Known gaps stay visible", "The coverage map records which data classes are flowing, which are intentionally excluded, and which remain unmapped. Missing data is not silently converted into a conclusion."],
  ["Human authority", "Models may propose engagement shapes, precedents, methods, and changes. Consultants confirm the actions that alter plans or the firm’s practice model."],
  ["Permission-aware retrieval", "Raw conversations are reached through participation and authorship rules. Other people’s communications contribute attributed signals without becoming broadly searchable raw text."],
];

const answers = [
  ["Do you train foundation models on our engagement data?", "No. Models reason over the firm’s records at answer time. The firm’s engagement state and practice model remain in its own data boundary rather than being absorbed into shared model weights."],
  ["What happens when systems disagree?", "AllianceOne uses source authority and truth ranking. A billing record can outrank a number extracted from a proposal, while the discrepancy itself becomes a delivery-variance signal."],
  ["Can the system distinguish missing data from a negative result?", "Yes. Coverage is declared and observed by data class. A known gap means absence carries no evidentiary weight; an unmapped class becomes an onboarding question rather than a hidden assumption."],
  ["Can the model silently change the firm’s methods?", "No. Machines propose and humans confirm. Confirmed archetypes and methods are not silently re-clustered, and contradicted or poorly founded claims can be downgraded or blocked from use."],
  ["What should a design partner expect today?", "We will map the firm’s source systems and permission requirements before making coverage claims. If a required control or connector is not ready, we will identify it explicitly during the design-partner process."],
];

export default function SecurityPage() {
  const [modal, setModal] = useState(false); useFonts(); const open = () => setModal(true);
  return <div className="site-shell"><Nav onCta={open} /><main>
    <section className="security-hero"><Wrap><div className="security-hero-grid"><div><h1>Your firm’s knowledge stays attributable, governed, and yours.</h1></div><p>AllianceOne operates across client work, commercial systems, and internal judgment. The architecture treats provenance, permission, and known uncertainty as part of the product, not administrative metadata.</p></div></Wrap></section>
    <Section className="security-pillars"><Wrap><div className="security-pillars-head"><Head size="display">Trust is established claim by claim.</Head></div><div className="security-pillar-list">{pillars.map(([title, body]) => <article className="security-pillar" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></Wrap></Section>
    <Section className="straight-section"><Wrap><div className="straight-grid"><div><Head light size="quiet">Questions your risk leader should ask.</Head></div><div className="straight-list">{answers.map(([q, a]) => <article className="straight-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></Wrap></Section>
    <Section className="security-close"><Wrap><Head>Bring the hard questions before you bring the data.</Head><p>We will walk through tenancy, coverage, access requirements, model use, and the source systems involved in your engagement lifecycle.</p><Btn variant="dark" onClick={open}>Start a security conversation</Btn></Wrap></Section>
  </main><Footer onCta={open} /><Modal open={modal} onClose={() => setModal(false)} /></div>;
}

import React, { useState } from "react";
import { useFonts, Head, Btn, Wrap, Nav, Footer } from "./Site.jsx";
import { capture, Track } from "./analytics";

const pillars = [
  ["Firm isolation", "A production deployment must isolate each firm’s data and enforce access within the firm. Engagement restrictions apply to retrieved context, generated artifacts and exports."],
  ["Source ownership", "CRM, project, document, and financial systems remain authoritative for the facts they own. AllianceOne records where each fact came from and reconciles copies against the proper source."],
  ["Evidence before inference", "Material claims need identifiable sources and a known review state. Recorded facts, practitioner recollections and proposed interpretations must remain distinguishable."],
  ["Known gaps stay visible", "The selected sources, missing evidence and unsupported assumptions need to be clear. Missing data must not silently become a conclusion about an engagement or its outcome."],
  ["Human authority", "Practitioners approve scope, staffing, pricing, client artifacts and writes to operating systems. An approved baseline remains distinct from a proposed change until the change is authorized."],
  ["Permission-aware retrieval", "Retrieval and reuse must respect source permissions, engagement restrictions and explicit sharing grants. A person’s involvement in prior work is not, by itself, permission to access its full record."],
];

const answers = [
  ["How is our data used by models?", "The intended design uses models to reason over permitted firm context. Customer agreements define data ownership, permitted processing, provider access, retention, deletion and training use before production data is accepted."],
  ["What happens when systems disagree?", "The authoritative source is agreed for each type of record. Readback and reconciliation should expose differences against the approved scope, plan and authorized changes. A new document or system update does not, on its own, replace that commitment."],
  ["How is incomplete history handled?", "The initial workflow uses a selected source corpus that practitioners validate. Known gaps and unsupported interpretations remain visible. If the available evidence cannot support a decision, the scope of the workflow needs to change."],
  ["How do lessons become firm knowledge?", "Conversations, decisions and revisions contribute context as work develops. Practitioners review the resulting lessons, supporting evidence and permitted reuse before they inform future engagements."],
  ["What should a design partner expect today?", "We agree the workflow, source access, permissions, integration responsibilities and acceptance criteria together. Production controls and required connectors must be validated before live client data is accepted. We will identify what is ready and what still needs work."],
];

export default function SecurityPage() {
 useFonts(); const open = () => window.location.assign("/design-partners/");
  return <div className="site-shell"><Nav onCta={open} /><main id="main-content">
    <Track name="hero" className="security-hero"><Wrap><div className="security-hero-grid"><div><h1>Your firm’s knowledge stays attributable, governed, and yours.</h1></div><p>AllianceOne is being built for sensitive client, commercial and delivery information. Source evidence, access and human approval are part of the product design. Production readiness must be established against each customer’s requirements.</p></div></Wrap></Track>
    <Track name="pillars" className="section security-pillars"><Wrap><div className="security-pillars-head"><Head size="display">Trust is established claim by claim.</Head></div><div className="security-pillar-list">{pillars.map(([title, body]) => <article className="security-pillar" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></Wrap></Track>
    <Track name="questions" className="section straight-section"><Wrap><div className="straight-grid"><div><Head light size="quiet">Questions your risk leader should ask.</Head></div><div className="straight-list">{answers.map(([q, a]) => <article className="straight-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></Wrap></Track>
    <Track name="cta" className="section security-close"><Wrap><Head>Bring the hard questions before you bring the data.</Head><p>We will walk through tenancy, coverage, access requirements, model use, and the source systems involved in your engagement lifecycle.</p><Btn variant="dark" onClick={() => { capture("cta_clicked", { location: "page_cta" }); open(); }}>Start a security conversation</Btn></Wrap></Track>
  </main><Footer onCta={open} /></div>;
}

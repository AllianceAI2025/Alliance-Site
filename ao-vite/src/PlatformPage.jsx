import React from "react";
import { Track } from "./analytics";
import { EngagementRecordVisual, KnowledgeExplorer, PageShell, PartnerInvitation, SourceOwnership } from "./PageParts.jsx";
import ProductEngagementOverview from "./ProductEngagementOverview.jsx";
import { firmTypes, productBenefits } from "./content/siteContent.js";
import "./product-knowledge.css";

export default function PlatformPage() {
  return <PageShell page="product">
    <Track name="product_hero" className="studio-product-hero"><div className="studio-container studio-product-hero-grid">
      <div className="studio-product-hero-copy"><p className="studio-kicker">Explore AllianceOne</p><h1>Put your firm’s knowledge to work in every matter and engagement.</h1><p>AllianceOne connects your firm’s methods, intellectual property, practitioner judgment and past work with the decisions your people make today.</p><p>For law, consulting and advisory firms, it brings the relevant experience into assessment, preparation, review and handoff. The sources, reasoning and changes remain connected as the work develops.</p></div>
      <div className="studio-paper-scene"><ProductEngagementOverview /></div>
    </div></Track>
    <Track name="firm_knowledge" id="knowledge" className="studio-section studio-knowledge studio-product-knowledge"><div className="studio-container">
      <header className="studio-section-heading"><p className="studio-kicker">The firm’s intellectual property</p><h2>Preserve the chain that makes judgment credible.</h2><p id="precedent">The firm’s intellectual property stays active while teams are making decisions, not dormant in a repository or flattened into a generic answer. Examine how a problem was framed, why an approach was chosen and what the evidence later showed.</p></header>
      <KnowledgeExplorer />
    </div></Track>
    <Track name="engagement_record" id="record" className="studio-section studio-product-record"><div className="studio-container">
      <div className="studio-record-feature"><div className="studio-feature-copy"><p className="studio-kicker">The matter and engagement record</p><h2>Keep the decisions{" "}<br />with the work.</h2><p>Client instructions, assignments, working assumptions and approved decisions have different roles. New evidence and conversations explain proposed revisions. The earlier account, reviewer, source and reason for each change remain available, so a new team member can understand how the work arrived here.</p></div><EngagementRecordVisual /></div>
      <section id="systems" className="studio-record-systems" aria-labelledby="product-systems-title"><header><h3 id="product-systems-title">Connected to your firm’s systems.</h3><p>AllianceOne connects context across matter and client systems, documents, communications and billing. Each source continues to own its records and access controls.</p></header><SourceOwnership /><p className="studio-section-note">Sources and production connections are selected and validated with each firm. Information barriers, source permissions and limits on reuse form part of that work; the demonstration does not connect to live firm systems.</p></section>
    </div></Track>
    <Track name="models" className="studio-section studio-model-section"><div className="studio-container">
      <div className="studio-model-intro"><p className="studio-kicker">The application around the models</p><h2>The model is not the edge.</h2><p>Frontier models know how to reason. AllianceOne knows how your firm works.</p></div>
      <div className="studio-model-responsibilities">
        <article><h3>Relevant firm context</h3><p>The methods, practitioner reasoning and past work that apply to this client’s situation, with the sources and differences that explain the comparison.</p></article>
        <article><h3>Access and decision rights</h3><p>Which sources the practitioner may use, what has been approved, what remains an assumption and who decides whether the work advances.</p></article>
        <article><h3>Continuity after the conversation</h3><p>The assignment, evidence, review and revisions that remain available as the matter develops and when experience is considered for reuse.</p></article>
      </div>
      <section className="studio-product-deployment" aria-labelledby="product-deployment-title"><h3 id="product-deployment-title">An accountable deployment.</h3><p>A firm can assemble capabilities on a frontier platform. AllianceOne brings a maintained matter and engagement model, configured practice knowledge, review rules and validated source connections. Alliance Systems Group implements the selected workflow with your team and provides ongoing support, with responsibilities and acceptance criteria agreed together.</p></section>
    </div></Track>
    <Track name="value" id="value" className="studio-section"><div className="studio-container studio-value-layout"><header className="studio-section-heading"><h2>Better firm economics.{" "}<br />Stronger evidence of value.</h2><p>Firm knowledge, an account of the decisions and reviewed results help leaders understand how the work was shaped, where effort went and what can improve next time.</p></header><div className="studio-value-list">{productBenefits.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}<p className="studio-section-note">A design partner agrees the primary benefit and baseline before measurement. Quality, senior review and correction effort are part of the assessment.</p></div></div></Track>
    <Track name="firms" id="firms" className="studio-firms studio-section"><div className="studio-container"><header className="studio-section-heading"><h2>For firms whose experience{" "}<br />shapes their next decision.</h2><p>Law firms, consulting practices and specialist advisers share a need to use what the firm knows while preserving the client context and professional judgment behind it. Configuration follows the selected practice and workflow.</p></header><div className="studio-firm-list">{firmTypes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></Track>
    <PartnerInvitation />
  </PageShell>;
}

import React from "react";
import { Track } from "./analytics";
import { EngagementRecordVisual, KnowledgeExplorer, PageShell, PartnerInvitation, SourceOwnership } from "./PageParts.jsx";
import ProductEngagementOverview from "./ProductEngagementOverview.jsx";
import { firmTypes, productBenefits } from "./content/siteContent.js";
import "./product-knowledge.css";

export default function PlatformPage() {
  return <PageShell page="product">
    <Track name="product_hero" className="studio-product-hero"><div className="studio-container studio-product-hero-grid"><div className="studio-product-hero-copy"><p className="studio-kicker">Explore AllianceOne</p><h1>Put your firm’s knowledge to work in every engagement.</h1><p>AllianceOne connects your firm's methods, intellectual property, practitioner judgment and engagement history with how teams scope, staff, plan and deliver client work.</p><p>It carries the approved plan into the systems your firm already uses, then connects actual delivery and outcomes back to the decisions that shaped it.</p></div><div className="studio-paper-scene"><ProductEngagementOverview /></div></div></Track>
    <Track name="firm_knowledge" id="knowledge" className="studio-section studio-knowledge studio-product-knowledge"><div className="studio-container">
      <header className="studio-section-heading">
        <p className="studio-kicker">The firm's intellectual property</p>
        <h2>Preserve the chain that makes judgment credible.</h2>
        <p id="precedent">The firm’s intellectual property stays active while teams are making decisions, not dormant in a repository or flattened into a generic answer.</p>
      </header>
      <KnowledgeExplorer />
    </div></Track>
    <Track name="engagement_record" id="record" className="studio-section studio-product-record"><div className="studio-container">
      <div className="studio-record-feature"><div className="studio-feature-copy"><p className="studio-kicker">The approved engagement record</p><h2>Keep the decisions{" "}<br />with the work.</h2><p>Accepted scope, commercial assumptions and the approved plan establish the commitment. Workstreams, assignments and review gates stay linked as delivery develops. Conversations and sources explain proposed revisions; authorized changes retain the earlier baseline, who approved them and why.</p></div><EngagementRecordVisual /></div>
    </div></Track>
    <Track name="source_systems" id="systems" className="studio-section studio-product-systems"><div className="studio-container">
      <header className="studio-section-heading"><p className="studio-kicker">Your existing systems</p><h2>Connected to the systems{" "}<br />your firm already runs.</h2><p>AllianceOne connects the context across CRM, project tools, documents and billing. Each system continues to own its records; sources and permissions are agreed for the selected workflow.</p></header>
      <SourceOwnership />
    </div></Track>
    <Track name="models" className="studio-section studio-model-section"><div className="studio-container"><div className="studio-model-intro"><p className="studio-kicker">The application around the models</p><h2>The model is not the edge.</h2><p>Frontier models know how to reason. AllianceOne knows how your firm works.</p></div><div className="studio-model-responsibilities"><article><h3>Relevant firm context</h3><p>The method, practitioner reasoning and delivery experience that apply to this client's conditions, with their supporting sources and limits.</p></article><article><h3>Authority to act</h3><p>Which scope and plan govern, who approved them, what changed, and which operating records should receive the approved intent.</p></article><article><h3>Continuity after the conversation</h3><p>The decisions, revisions, system receipts and observed results that remain available through delivery and future work.</p></article></div>
      <section className="studio-product-deployment" aria-labelledby="product-deployment-title">
        <h3 id="product-deployment-title">An accountable deployment.</h3>
        <p>AllianceOne combines a maintained engagement model with practice configuration, approval rules and validated mappings to your selected PSA or project system. Alliance Systems Group implements the workflow with your team and provides ongoing support, with responsibilities and acceptance criteria agreed for the deployment.</p>
      </section>
    </div></Track>
    <Track name="value" id="value" className="studio-section"><div className="studio-container studio-value-layout"><header className="studio-section-heading"><h2>Better engagement economics.{" "}<br />Stronger evidence of value.</h2><p>Firm knowledge, an approved baseline and reviewed results give leaders a stronger basis for shaping engagements and explaining the firm’s value.</p><a className="studio-value-link" href="/solutions/">See how it works across an engagement <span aria-hidden="true">↗</span></a></header><div className="studio-value-list">{productBenefits.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></Track>
    <Track name="firms" id="firms" className="studio-firms studio-section"><div className="studio-container"><header className="studio-section-heading"><h2>For project-based{" "}<br />professional services.</h2><p>Our starting focus is management consulting firms that also deliver implementation work. The same model of firm knowledge and connected client work extends to specialist advisory, technology practices and law firms.</p></header><div className="studio-firm-list">{firmTypes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></Track>
    <PartnerInvitation />
  </PageShell>;
}

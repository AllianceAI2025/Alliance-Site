import React from "react";
import { Track } from "./analytics";
import { DeliverySignals, PageShell, PartnerInvitation } from "./PageParts.jsx";
import { LegalMatterComparison, LegalMotionReview } from "./demo/LegalDemoArtifacts.jsx";
import { legalTiming } from "./demo/litigation.js";
import { solutionChapters } from "./content/siteContent.js";

export default function SolutionsPage() {
  return <PageShell page="solutions" dark>
    <Track name="solutions_hero" id="workflow" className="studio-solutions-hero studio-dark-field">
      <div className="studio-container">
        <p className="studio-kicker">Solutions · Firm experience in practice</p>
        <h1>Bring the firm’s experience into the work in front of you.</h1>
        <p>Connect relevant past work, the reasoning behind it and the context of today’s assignment. Support the team from early assessment through review and delivery, with decisions and changes kept together.</p>
        <nav className="studio-journey-nav" aria-label="Explore solutions">
          <a href="#phase-scope">Relevant experience <span aria-hidden="true">↓</span></a>
          <a href="#phase-plan">Reasoning and review <span aria-hidden="true">↓</span></a>
          <a href="#phase-deliver">Continuity of work <span aria-hidden="true">↓</span></a>
        </nav>
      </div>
    </Track>
    {solutionChapters.map(chapter => <Track name={`solution_${chapter.id}`} key={chapter.id} id={`phase-${chapter.id}`} className={`studio-section solution-chapter solution-chapter--${chapter.id}`}>
      <div className="studio-container"><div className="solution-chapter-grid">
        <div className="solution-chapter-copy">
          <p className="studio-kicker">{chapter.label}</p><h2>{chapter.title}</h2>
          <p className="solution-intro">{chapter.intro}</p>
          <div className="solution-details">{chapter.sections.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="solution-result"><p>{chapter.result}</p></div>
        </div>
        {chapter.id !== "deliver" && <div className="solution-chapter-visual studio-legal-visual">{chapter.id === "scope" ? <LegalMatterComparison elapsed={legalTiming.scope.firstReady} /> : <LegalMotionReview elapsed={legalTiming.plan.end} />}</div>}
      </div></div>
    </Track>)}
    <Track name="delivery_signals" id="delivery-signals" className="studio-section studio-signals">
      <div className="studio-container studio-signal-layout">
        <div className="studio-feature-copy">
          <p className="studio-kicker">While the work is happening</p>
          <h2>Notice the change.{" "}<br />Understand its implications.</h2>
          <p>New correspondence, project updates and available time or cost records can change an earlier assessment. An agent update shows the source, the prior understanding and the question that needs attention.</p>
          <p>The team can ask why it matters, which work is affected and where the firm has seen similar conditions. Compare current evidence with the agreed approach and commitments while there is still time to respond.</p>
          <p>Leaders decide whether scope, staffing, sequence or budget needs to change. The proposed response, approval and reasons for the decision stay with the work.</p>
        </div>
        <DeliverySignals />
      </div>
    </Track>
    <Track name="experience" id="experience" className="studio-section studio-experience">
      <div className="studio-container">
        <header className="studio-section-heading studio-section-heading--center">
          <p className="studio-kicker">From one assignment to the next</p>
          <h2>Make completed work{" "}<br />useful to the next team.</h2>
          <p>The record develops through the work: what the client clarified, why the team chose an approach, what the reviewer challenged and what changed afterward.</p>
        </header>
        <div className="studio-experience-copy">
          <p>Close-out connects the initial assessment with actual effort and results, alongside the conditions and decisions that explain the difference. Practitioners review lessons and permitted reuse before they inform future work.</p>
          <p>The next team can draw on the firm’s approaches, staffing experience, review history and observed outcomes. The reasoning, supporting sources and limits stay available alongside the finished work.</p>
        </div>
      </div>
    </Track>
    <Track name="implementation" className="studio-solution-implementation">
      <div className="studio-container">
        <h2>Start with one practice.{" "}<br />Prove a useful workflow.</h2>
        <div>
          <p>Choose a recurring client workflow and a selected body of current and historical records. Practitioners and system owners agree the sources, access rules, review responsibilities and acceptance criteria.</p>
          <p>The first deployment tests useful retrieval, source traceability and continuity in real work. A primary benefit, baseline and quality criteria establish what it needs to prove.</p>
        </div>
      </div>
    </Track>
    <PartnerInvitation />
  </PageShell>;
}

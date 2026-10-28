import React from "react";
import { LogoMark } from "./Site.jsx";
import { currentMatter } from "./demo/litigation.js";

export default function ProductEngagementOverview() {
  return <figure className="product-engagement-overview" aria-label="Northstar matter overview">
    <div className="product-overview-top"><LogoMark size={27} /><span>Matter overview · {currentMatter.number}</span></div>
    <h3>{currentMatter.client}</h3>
    <p className="product-overview-objective">{currentMatter.title}</p>
    <dl className="product-overview-baseline">
      <div><dt>Client instructions</dt><dd>{currentMatter.instruction}</dd></div>
      <div><dt>Current work</dt><dd>{currentMatter.assignment}<small>Matter lead · {currentMatter.lead}</small></dd></div>
    </dl>
    <section className="product-overview-work" aria-label="Current information and pending decision">
      <p className="product-overview-label">What changed · October 22</p>
      <h4>New evidence challenges the repair history.</h4>
      <div className="product-overview-evidence"><strong>{currentMatter.newInformation}</strong><span>{currentMatter.originalAssumption}</span></div>
      <p className="product-overview-review">Assessment revision 2 · For Margaret’s review</p>
      <p className="product-overview-conclusion">{currentMatter.interpretation}</p>
    </section>
    <figcaption>Fictional matter. Earlier assumptions, new sources and proposed decisions remain distinguishable.</figcaption>
  </figure>;
}

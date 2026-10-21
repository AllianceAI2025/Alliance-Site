import React from "react";
import { Nav, Footer, useFonts } from "./Site.jsx";
import { CompanyOverview, PartnerInvitation } from "./LandingPage.jsx";
import { Track } from "./analytics";
import "./landing.css";

export default function CompanyPage() {
  useFonts();
  const inquire = () => window.location.assign("/design-partners/");
  return <div className="company-page"><Nav dark onCta={inquire} /><main id="main-content">
    <Track name="hero" className="company-intro"><div className="landing-container"><h1>Turn what your firm has learned into how it works.</h1><p>Alliance Systems Group builds software and services for consulting and advisory firms. We help make accumulated delivery experience usable in live work without replacing professional judgment or the systems your teams already use.</p></div></Track>
    <CompanyOverview detailed />
    <Track name="product" className="company-product"><div className="landing-container"><h2>AllianceOne turns delivery history into working precedent.</h2><p>AllianceOne connects the conditions a team faced, the choices it made, the reasoning behind them, and what happened next. That record informs new scopes and plans while CRM, PSA, document, and finance systems continue to run the work they own.</p><a className="landing-text-link" href="/#demo">See AllianceOne in action <span aria-hidden="true">↗</span></a></div></Track>
    <PartnerInvitation />
  </main><Footer onCta={inquire} /></div>;
}

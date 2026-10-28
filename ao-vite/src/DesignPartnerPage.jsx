import React from "react";
import { Nav, Footer, Wrap, PartnerForm, DESIGN_PARTNER_EMAIL, useFonts } from "./Site.jsx";
import "./design-partners.css";

export default function DesignPartnerPage() {
  useFonts();
  const inquire = () => { document.getElementById("inquiry").scrollIntoView({ behavior: "smooth" }); document.querySelector("#inquiry input[required]")?.focus({ preventScroll: true }); };
  return <div className="site-shell dp-page">
    <Nav onCta={inquire} />
    <main id="main-content">
      <Wrap className="dp-intro">
        <div className="dp-invitation">
          <p className="eyebrow">ALLIANCEONE / DESIGN PARTNERS</p>
          <h1>Become a<br />design partner.</h1>
          <p className="dp-lead">We’re inviting consulting, advisory and law firms to shape how AllianceOne supports their client work. Get early access, work directly with our team, and bring your firm’s methods, experience and review standards into a useful workflow.</p>
          <section className="dp-next" aria-labelledby="expect-title">
            <h2 id="expect-title">What to expect</h2>
            <div className="dp-next-item"><h3>Start with the work.</h3><p>Tell us about your practice, the systems you use and where relevant experience or current client context would help your team.</p></div>
            <div className="dp-next-item"><h3>Choose a useful workflow.</h3><p>Explore how AllianceOne could support assessment, planning, review or delivery. Together, we’ll identify the sources, access rules and quality standards the work depends on.</p></div>
            <div className="dp-next-item"><h3>Agree on next steps.</h3><p>We’ll agree the scope, time commitment, success measures and commercial terms before you decide to participate.</p></div>
          </section>
          <div className="dp-contact"><div className="dp-monogram" aria-hidden="true">CM</div><div><p>Prefer to start with an email?</p><a href={`mailto:${DESIGN_PARTNER_EMAIL}`}>Email Cole Miska <span aria-hidden="true">↗</span></a></div></div>
        </div>
        <PartnerForm />
      </Wrap>
    </main><Footer onCta={inquire} />
  </div>;
}

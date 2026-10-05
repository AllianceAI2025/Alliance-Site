import React from "react";
import { Nav, Footer, Wrap, PartnerForm, DESIGN_PARTNER_EMAIL, useFonts } from "./App.jsx";
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
          <p className="dp-lead">We’re inviting consulting and advisory firms to become AllianceOne’s first design partners. Get early access, work directly with our team, and have a say in how the product develops.</p>
          <section className="dp-next" aria-labelledby="expect-title">
            <h2 id="expect-title">What to expect</h2>
            <div className="dp-next-item"><h3>Tell us about your team.</h3><p>We’ll talk about the work your firm does, the systems you use, and where you’d like things to work better.</p></div>
            <div className="dp-next-item"><h3>Get to know AllianceOne.</h3><p>We’ll discuss where the product could help and what’s available today.</p></div>
            <div className="dp-next-item"><h3>Agree on next steps.</h3><p>If there’s a fit, we’ll work through the scope, time commitment, and commercial terms before you decide to participate.</p></div>
          </section>
          <div className="dp-contact"><div className="dp-monogram" aria-hidden="true">CM</div><div><p>Prefer to start with an email?</p><a href={`mailto:${DESIGN_PARTNER_EMAIL}`}>Email Cole Miska <span aria-hidden="true">↗</span></a></div></div>
        </div>
        <PartnerForm />
      </Wrap>
    </main><Footer onCta={inquire} />
  </div>;
}

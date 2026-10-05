import React from "react";
import { Nav, Footer, Wrap, PartnerForm, DESIGN_PARTNER_EMAIL, useFonts } from "./App.jsx";
import "./design-partners.css";

const benefits = [
  ["Early access", "Put AllianceOne to work with your team as the product develops."],
  ["A direct relationship", "Work with the people building the product, from the first conversation onward."],
  ["Room for your input", "Share what matters to your firm and help inform what we build next."],
];

export default function DesignPartnerPage() {
  useFonts();
  const inquire = () => { document.getElementById("inquiry").scrollIntoView({ behavior: "smooth" }); document.querySelector("#inquiry input[required]")?.focus({ preventScroll: true }); };
  return <div className="site-shell dp-page">
    <Nav onCta={inquire} />
    <main id="main-content">
      <Wrap className="dp-intro">
        <div className="dp-invitation">
          <p className="eyebrow">ALLIANCEONE / DESIGN PARTNERS</p>
          <h1>Let’s build this<br />with your firm.</h1>
          <p className="dp-lead">We’re inviting consulting and advisory firms to become AllianceOne’s first design partners. Get early access, work directly with our team, and have a say in how the product develops.</p>
          <div className="dp-benefits">{benefits.map(([title, body]) => <div key={title}><div><h2>{title}</h2><p>{body}</p></div></div>)}</div>
          <div className="dp-contact"><div className="dp-monogram" aria-hidden="true">CM</div><div><p>Prefer to start with an email?</p><a href={`mailto:${DESIGN_PARTNER_EMAIL}`}>Email Cole Miska <span aria-hidden="true">↗</span></a></div></div>
        </div>
        <PartnerForm />
      </Wrap>
      <section className="dp-expect"><Wrap>
        <p className="eyebrow">WHAT TO EXPECT</p><h2>A conversation is a good place to start.</h2>
        <div className="dp-steps">
          <article><span>INTRODUCTIONS</span><h3>Tell us about your team.</h3><p>We’ll talk about the work your firm does, the systems you use, and where you’d like things to work better.</p></article>
          <article><span>EXPLORE THE FIT</span><h3>Get to know AllianceOne.</h3><p>We’ll discuss where the product could help and be clear about what’s available and what’s still being developed.</p></article>
          <article><span>AGREE ON NEXT STEPS</span><h3>Decide together.</h3><p>If there’s a fit, we’ll work through the scope, time commitment, and commercial terms before you decide to participate.</p></article>
        </div>
      </Wrap></section>
      <Wrap className="dp-faq"><div><h2>Before we talk.</h2></div><div>
        <details><summary>Who is this for?</summary><p>Consulting and advisory firms interested in working directly with our team as AllianceOne develops.</p></details>
        <details><summary>Do we need a specific use case?</summary><p>No detailed brief is needed. Bring the questions or challenges on your mind, and we can explore them together.</p></details>
        <details><summary>What would participation involve?</summary><p>Using AllianceOne with your team and sharing feedback with us. We’ll agree on the scope, time commitment, and commercial terms before you join.</p></details>
        <details><summary>Does sending an inquiry commit us to anything?</summary><p>No. This starts a conversation so we can learn about your firm and you can learn about AllianceOne.</p></details>
      </div></Wrap>
    </main><Footer onCta={inquire} />
  </div>;
}

# AllianceOne — Website

Product-first landing site for AllianceOne, built with React + Vite, deployed to
GitHub Pages. Alliance Systems Group appears only as quiet plumbing in the footer.

Positioning: the firm's own accumulated judgment is the asset — today scattered
and leaking away; AllianceOne assembles it into a living account so it scales and
compounds. The hero leads with that value (not an AI-market reframe); anti-hype
is the tone, carried mainly by "Straight answers." See `POSITIONING.md` for the
language registers.

---

## Run it locally

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:5173
```

Preview a production build:

```bash
npm run build
npm run preview
```

---

## Where to edit things

- `src/App.jsx` — the homepage. Sections top to bottom: Hero, DayOne (day-one
  jobs), Proof (real Scope-view screenshot + walkthrough), HowItShows
  (planning → execution → review arc), Product (four-part capture + graph
  animation), Approach (framework-is-commodity), WhyNotAI (vs general models),
  Industries (+ partner block), ClosingCTA, Footer, Modal. Colors are in the
  `C` object at the top; section headlines use the `Head` atom (`display` /
  `section` / `quiet` sizes). Shared atoms are exported for the security page.
- `src/SecurityPage.jsx` — the `/security/` page (data ownership, isolation,
  traceability, straight answers). Entry: `security/index.html` +
  `src/security-main.jsx` (Vite multi-page build, see `vite.config.js`).
- `index.html` / `security/index.html` — title, meta description, Open Graph
  tags, canonical URL.
- `public/og-image.png` — the 1200×630 link-preview card (shown when the URL is
  shared in Slack/LinkedIn/iMessage).
- `public/robots.txt` / `public/sitemap.xml` — crawler hygiene; update the
  sitemap if pages are added.
- `public/favicon.svg` — the AllianceOne node-mark tab icon.
- `public/CNAME` — currently `myalliance.ai`. Change this single line if the
  product moves to its own domain (e.g. `allianceone.ai`) or a subdomain.
  If the domain changes, also update the canonical/OG URLs in both HTML files
  and `public/sitemap.xml`.

**Voice rule for all copy edits:** no superlatives, no "transform" /
"revolutionize" / unattributed speed claims. Every claim sits next to its
mechanism. The "Straight answers" section is the contract — don't write
anything elsewhere that breaks it.

---

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

One-time setup:

1. Create a GitHub repo and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. Repo → **Settings → Pages** → Source: **GitHub Actions**.
3. First push triggers the workflow (watch the **Actions** tab). Site is live
   when it finishes.

Every subsequent push to `main` redeploys automatically.

---

## Custom domain

`public/CNAME` tells Pages to serve at `myalliance.ai`. At your DNS registrar,
for an apex domain add four `A` records pointing at GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

(Verify these against GitHub's current Pages docs when you set up — they're
long-stable but worth a 30-second check.)

For a subdomain instead, use a single `CNAME` DNS record pointing to
`YOUR-USERNAME.github.io` and update `public/CNAME` to match. Once DNS
propagates, enable **Enforce HTTPS** in Settings → Pages.

---

## Design partner form

The "Become a design partner" modal posts to [FormSubmit](https://formsubmit.co)
and delivers submissions to `cole.miska@myalliance.ai`. The first successful
browser submit only sends FormSubmit's activation email. Click **Activate Form**
in that message (check spam), then submit again. After activation, inquiries
arrive as normal emails. If the post fails, the modal offers a `mailto:` fallback.

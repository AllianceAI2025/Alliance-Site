# AllianceOne — Website

Product-first landing site for AllianceOne, built with React + Vite, deployed to
GitHub Pages. Alliance Systems Group appears only as quiet plumbing in the footer.

Positioning: anti-hype, "new baseline" — AI adoption is inevitable, the hype is
optional. Lead story is judgment acceleration (junior AI fluency × senior
judgment); the engagement memory / living-model foundation is the credibility
layer underneath. See `POSITIONING.md` for the language registers.

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

- `src/App.jsx` — the entire site. Sections top to bottom: Hero, Reality,
  Shift, Platform, Honest (won't/will promise), Adopt (build partners),
  Who, FinalCta, Footer, Modal. Colors are in the `C` object at the top.
- `index.html` — title, meta description.
- `public/favicon.svg` — the AllianceOne node-mark tab icon.
- `public/CNAME` — currently `myalliance.ai`. Change this single line if the
  product moves to its own domain (e.g. `allianceone.ai`) or a subdomain.

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

## Known placeholder

The "Talk to us" modal opens a `mailto:` link rather than a real inquiry form
(a working form needs a backend). When ready, wire it to Formspree or similar
in the `Modal` component in `src/App.jsx`.

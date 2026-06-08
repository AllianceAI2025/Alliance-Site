# Alliance Systems Group — Website

A single-page React site (Home / Solutions / AllianceOne / About) built with Vite,
deployed to GitHub Pages on the custom domain **myalliance.ai**.

---

## Prerequisites

- [Node.js](https://nodejs.org) 20 or newer (includes `npm`)
- A GitHub account
- Git installed locally

---

## Run it locally

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server, usually at http://localhost:5173
```

Edit files in `src/` and the browser refreshes automatically.

To preview a real production build before deploying:

```bash
npm run build    # outputs to dist/
npm run preview  # serves the built site locally
```

---

## Where to edit things

- `src/App.jsx` — the entire site. All four pages, the nav, footer, colors,
  and copy live here. Page text is in the `Home`, `Solutions`, `AllianceOne`,
  and `About` functions near the bottom.
- `src/index.css` — minimal global reset only. Most styling is inline in `App.jsx`.
- `index.html` — page title, meta description, favicon link.
- `public/favicon.svg` — the browser-tab icon.
- `public/CNAME` — your custom domain. Change this one line if you move to a
  subdomain (e.g. `systems.myalliance.ai`).

The brand colors are defined once at the top of `App.jsx` in the `C` object —
change a value there and it updates everywhere.

---

## Deploy to GitHub Pages (automatic)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and publishes the site every time you push to the `main` branch.

**One-time setup:**

1. Create a new repository on GitHub and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. The workflow runs on that first push. When it finishes (check the **Actions**
   tab), your site is live.

**After that:** every `git push` to `main` redeploys automatically. No manual
build step.

---

## Custom domain (myalliance.ai)

The `public/CNAME` file tells GitHub Pages to serve the site at `myalliance.ai`.

You also need DNS records at your domain registrar. For an **apex domain**
(`myalliance.ai` with no subdomain), add these `A` records pointing at GitHub:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For a **subdomain** (e.g. `systems.myalliance.ai`) instead, add a single `CNAME`
record pointing to `YOUR-USERNAME.github.io`, and change `public/CNAME` to match.

> ⚠️ Note: `myalliance.ai` is also used by your Alliance Advisors site. Two sites
> cannot share the exact same domain. Decide whether this lives on a subdomain,
> a subpath, or replaces the existing site before pointing DNS.

DNS changes can take anywhere from a few minutes to a day to take effect. Once
they do, enable **Enforce HTTPS** under Settings → Pages.

---

## Manual deploy (alternative)

If you prefer not to use GitHub Actions, the `gh-pages` package is included:

```bash
npm run build
npm run deploy   # pushes dist/ to the gh-pages branch
```

Then set Settings → Pages → Source to the `gh-pages` branch. (Use either this
*or* the Actions workflow, not both.)

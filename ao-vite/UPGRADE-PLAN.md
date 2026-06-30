# AllianceOne — Site Upgrade Build Plan

Operationalizes `AllianceOne-Website-Upgrade-Blueprint.md` (Upgrade branch) against the
current `ao-vite/src/App.jsx`.

## Context

The current page reads as a *philosophy statement*: a big "Product" section + "Approach"
+ "Industries", led by a diagnosis hero ("Your firm already knows more than it can see").
The blueprint reframes it as a **demo-driving teaser** for operating/managing partners:
lead with the day-one job, differentiate on **Outcome** (the dimension a similarity-retrieval
competitor can't reach), keep the philosophy as the reason they stay, and drive one action —
**Request a demo**. This plan decomposes today's 3 sections into the blueprint's 9, adds two
new sections (day-one words; worked example), and rebuilds the nav + demo modal.

## Working assumptions (recommended defaults — say the word to change)

1. **Worked example (§4.7):** I draft a credible **before/after** scoping example, clearly
   labeled *illustrative*. No Worx fixtures needed (they aren't in the repo).
2. **Demo form (§6):** minimal form — **name / firm / work email** — that opens a pre-filled
   email on submit. Real form UX, no backend.
3. **Sequencing:** **Phase 1 = conversion core** (punch-list 1–2 + the demo path), review,
   then **Phase 2 = the rest**.

## Target IA & navigation (§3)

Single-page scroll. Sticky header, left→right:
`AllianceOne` · **How it works** · **Why AllianceOne** · **Who it's for** · `[ Request a demo ]`
(gold, persistent) + active-section highlight (weight + color, not color alone).

Section order (replaces current Hero / Product / Approach / Industries):

1. **Hero** — value prop + demo CTA (§4.1)
2. **What you can do on day one** — NEW, the wedge in words (§4.2)
3. **How it shows up in the work** — planning→execution→review **as a diagram** (§4.3)
4. **The four dimensions** — Who / What / Why / Outcome, reframed (§4.4)
5. **Approach** — framework-is-commodity, tightened (§4.5)
6. **Why not just AI** — its own section; keep table + payoff (§4.6)
7. **Proof** — illustrative worked example, NEW (§4.7)
8. **Who it's for** — industries **+ partner/role** framing (§4.8)
9. **Closing CTA** (§4.9)

Nav anchors: "How it works" → §2/§3 cluster · "Why AllianceOne" → §5/§6 · "Who it's for" → §8.

## Component map (current → target, all in `src/App.jsx`)

- **Nav** (rework): relabel; CTA "Talk to us" → gold **"Request a demo"**; add scrollspy active
  state (one `IntersectionObserver`, set active id).
- **Hero** (rewrite copy only): eyebrow `FOR FIRMS WHOSE PRODUCT IS EXPERTISE`; headline
  *"Every engagement should start from how the last one actually turned out."*; new subhead;
  CTAs `Request a demo` / `See how it works ↓`. Text-only (GraphCard leaves the hero).
- **DayOne** (NEW): header "Useful the day your history is loaded." + framing + **4 JTBD cards**
  each with an *"instead of …"* contrast (copy verbatim from §4.2).
- **HowItShows** (rework today's planning/execution/review cards → a **3-stage diagram** of the
  engagement arc; §4.3). 4.2 carries the words, this carries the picture.
- **Dimensions** (rework today's capture cards): Who / What / Why / Outcome; reframe **Why** &
  **Outcome** to "captured where history holds it / deepens with every engagement that completes
  inside AllianceOne" (§4.4); add pull-quote *"Your firm learns from every engagement — including
  the ones that didn't work."* **GraphCard** relocates here as the section's restrained motif
  (toned down; honors reduced-motion already).
- **Approach** (trim to the §4.5 two-paragraph version).
- **WhyNotAI** (extract the dark comparison panel out of today's `Approach` into its own section;
  keep the 4-point table + evidence payoff; replace "we build a living model of it" with
  *"we assemble your firm's own history into a structure your people can use — explicit, traceable,
  and yours."* §4.6).
- **Proof** (NEW): illustrative blank-page-vs-AllianceOne scoping comparison (§4.7).
- **WhoFor** (rework `Industries`): keep 3 industry blocks + add **partner/role** block (§4.8).
- **ClosingCTA** (NEW): *"Your firm's experience is its most valuable asset. It's also its least
  usable."* + `Request a demo` (§4.9).
- **Mid-page CTA**: a single `Request a demo` after Why-not-AI, where conviction peaks (§6).
- **Modal** (rework): minimal demo form (name / firm / work email) → composes a pre-filled email;
  restyle as "Request a demo"; keep ungated content (§6).

## Phase 1 — conversion core ✅ SHIPPED

1. Nav: relabel + gold persistent "Request a demo" + scrollspy.
2. Hero rewrite (§4.1).
3. DayOne section (§4.2) — the missing wedge.
4. Closing CTA (§4.9) + the mid-page CTA.
5. Demo modal → minimal form (§6).
6. Quick marketese kill: drop "living model of it" (§4.6 micro-edit).

→ build, push, review the new top-of-page + demo path.

## Phase 2 — depth & proof ✅ SHIPPED (except the worked example)

- How-it-shows **diagram** (§4.3) — planning → execution → review arc. ✅
- Four-dimensions reframe + failure-learning pull-quote (§4.4); GraphCard
  lives in this section. ✅
- Split **Why not just AI** into its own dark section; lean **Approach**
  (§4.5/4.6); mid-page CTA now sits at the end of Why-not-AI. ✅
- **Who it's for** partner/role framing block (§4.8). ✅
- **Worked example** (§4.7) — PENDING your Worx fixtures + product
  screenshots; build it from real material then.
- All new copy written de-AI'd (no em dashes). Aesthetics audit (§5) —
  light pass done; revisit alongside the worked example.

## Verification

- `npm run build` after each phase — must stay clean.
- `npm run dev` eyeball: the **10-second test** (hero states the day-one job + CTA above the
  fold), nav scrollspy, modal form submit, responsive card reflow, reduced-motion.
- Grep audits: one CTA label ("Request a demo"); no "living model"; Cormorant only in headings.

## Out of scope / dependencies

- Real form backend (mailto compose for now) and a "watch-now" walkthrough video — deferred (§6).
- Public **Philosophy** page + 5th nav item — deferred (§3).
- Real product screenshots — using an honest *illustrative* frame (§4.7/§5).

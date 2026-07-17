# AllianceOne — Brand Mark & Usage

## The mark

The A1: a slanted A (diagonal left leg, vertical right stem, low crossbar)
beside a notched-bar 1. It reads "A1" (AllianceOne) and "AI" at the same
time; the notch whispers the 1, the bar reads the I. Flat uniform strokes,
sharp corners, no curves. The construction is deliberately unlike
Anthropic's A (pointed apex, high slanted crossbar, flared strokes).

## The green

The identity has ONE green: **#86C43D**. It is identical on light and dark,
and it always carries the "1" while the A carries ink (`#0B0D12`) on light
and white on dark. The deep forest **#0E6B3E** exists for two purposes only:

1. Site text accents on white, where accessibility requires a darker green.
2. The far end of the brand gradient (below).

The deep green never appears in the flat mark.

## Treatments

- **Primary (T1): flat.** Nav, favicon, footer, anything functional, and
  everything below ~64px. This is the mark.
- **Expressive (T2/T3): the brand gradient.** A two-stop vertical fade,
  `#86C43D 0%` to `#0E6B3E 100%`, applied to the 1 only. For og-images, app
  tiles, deck covers, and large hero moments. Two stops only; never at small
  sizes.
- **Dark-surface field (T6):** a faint radial green glow (`#86C43D` at
  ~20% fading to 0) behind the flat mark on ink backgrounds. Atmosphere for
  covers and social cards; the mark itself stays flat.
- Rejected: fade-out strokes and stripe textures (they erode the mark and
  fail small-size reproduction).

## The quality bar (what the research says a good logo is)

Distilled from Paul Rand's logo test and Sagi Haviv's working principles,
plus current favicon/scalability guidance:

- **Simple, distinctive, memorable, adaptable, durable** (Rand's test).
- "A good logo is not about what one likes or dislikes, it's about what
  works" (Haviv). Appropriate for the business, not decorative.
- **Must survive**: one color, black-only, inverted, and **16px**. Flat
  colors at small sizes; gradients are expressive-only, max two stops.
- Timeless over trendy: the mark should not date with this year's styling.

The A1 passes: two glyphs, two colors, flat strokes, legible at 20px,
works one-color (all-ink or all-white), and the AI double-read is the
distinctive idea rather than a style effect.

## Files

- `public/favicon.svg` — flat mark on the ink tile.
- `public/brand/logo-mark.svg` — flat, light backgrounds.
- `public/brand/logo-mark-dark.svg` — flat, dark backgrounds.
- `public/brand/logo-mark-gradient-dark.svg` — gradient 1, dark surfaces.
- In-app: `LogoMark` / `Logo` components in `src/App.jsx`.

## Rules

- Minimum size 20px; below that use the flat mark only, never gradient.
- Clear space around the mark: at least the width of the 1's bar.
- Don't recolor (the 1 is #86C43D, period), stretch, rotate, outline, add
  shadows, or place on the old warm palette.
- The wordmark lockup is mark + "AllianceOne" in IBM Plex Sans 700; the
  "One" may use deep green on white for contrast, bright green on dark.

Sources: Paul Rand's seven-step logo test (brandsthatpunch.com), Sagi Haviv
on simplicity (teorise.com), favicon scalability guidance (unwrite.co,
playground.halfaccessible.com), gradient-logo practice (ironov.ai,
losangeleslogodesigns.com).

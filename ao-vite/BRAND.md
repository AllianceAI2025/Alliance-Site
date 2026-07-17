# AllianceOne — Brand Mark & Usage

## The mark

The A_ : an upright, truncated-apex A with a low crossbar, beside a thin
green underscore cursor. It is the terminal prompt: something is about to be
typed. Flat uniform strokes, sharp corners, no curves. On the web, the
underscore blinks twice on load like a real caret, then holds steady
(static under prefers-reduced-motion, and in all print/static uses).

Why it is not Deloitte's dot: theirs is a round period that ends the
wordmark ("Deloitte."), a finished sentence. Ours is a rectangular cursor
beside a monogram, an unfinished one. Structural rules that keep the
distance: the underscore is thin and wide (cursor proportions, never a
square or circle), it appears only in the standalone mark, and it never
trails the wordmark ("AllianceOne_" is forbidden).

Why it is not Anthropic's A: theirs has a pointed apex, high slanted
crossbar, and flared strokes; ours is truncated-flat, low-crossbar,
uniform-weight.

## The green

The identity has ONE green: **#86C43D**, the signature green. It is the only
green anywhere: the mark's cursor, the nav line, buttons, accents, bands.
There is no second green; the old deep forest is retired.

Because the signature green is light, two pairing laws keep it readable:

1. **Green fills carry ink text, never white.** Buttons and the close band
   are black-on-lime (about 9:1), the same pairing Deloitte uses.
2. **Green is never body text on white.** On light surfaces it appears as
   graphics (rules, borders, the nav line), short mono accents (numerals,
   stage labels), display-size emphasis words, and green-filled surfaces.
   Links on white are ink text with a green underline.

Large-surface gradients and glows fade the signature green toward ink or
transparent, never toward another green.

## Treatments

- **Primary: flat.** Everywhere, at every size. This is the mark.
- **Dark-surface field:** a faint radial green glow (`#86C43D` at ~20%
  fading to 0) behind the flat mark on ink backgrounds, for covers, social
  cards, and the og-image. The mark itself stays flat.
- **Motion:** the caret blink (twice on mount, `step-end`, then solid) is
  the mark's only animation. Never loop it continuously.
- Rejected after exploration: slanted construction (reads motorsport),
  gradient inside the underscore (illegible at that scale), fade-out and
  stripe textures (erode the mark), continuous blinking (annoying).

## The quality bar (what the research says a good logo is)

Distilled from Paul Rand's logo test and Sagi Haviv's working principles,
plus current favicon/scalability guidance:

- **Simple, distinctive, memorable, adaptable, durable** (Rand's test).
- "A good logo is not about what one likes or dislikes, it's about what
  works" (Haviv). Appropriate for the business, not decorative.
- **Must survive**: one color, black-only, inverted, and **16px**. Flat
  colors at small sizes; gradients are large-surface-only, max two stops.
- Timeless over trendy: the mark should not date with this year's styling.

The A_ passes: two glyphs, two colors, flat strokes, legible at 20px, works
one-color (all-ink or all-white), and its distinctive idea (the cursor:
expertise about to be applied) is a meaning, not a style effect.

## Files

- `public/favicon.svg` — flat mark on the ink tile (static).
- `public/brand/logo-mark.svg` — flat, light backgrounds.
- `public/brand/logo-mark-dark.svg` — flat, dark backgrounds.
- In-app: `LogoMark` / `Logo` components in `src/App.jsx` (blink lives
  only here).

## Rules

- Minimum size 20px.
- Clear space around the mark: at least the height of the A's crossbar.
- Don't recolor (the underscore is #86C43D, period), stretch, rotate,
  outline, add shadows, slant, or place on the old warm palette.
- The lockup is the mark on its ink tile (app-icon style, so the mark's A
  doesn't sit letter-to-letter against the wordmark's A) beside
  "AllianceOne" in IBM Plex Sans 700, single color: ink on light, white on
  dark. No green in the wordmark, ever; the cursor is the lockup's only
  green. Never append the underscore to the wordmark.

Sources: Paul Rand's seven-step logo test (brandsthatpunch.com), Sagi Haviv
on simplicity (teorise.com), favicon scalability guidance (unwrite.co,
playground.halfaccessible.com), gradient-logo practice (ironov.ai,
losangeleslogodesigns.com).

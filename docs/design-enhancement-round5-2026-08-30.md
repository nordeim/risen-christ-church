# Round-5 Design Enhancement Plan — "Light of the Portiuncula" (2026-08-30)

> Scope: visual appeal, aesthetics, UI/UX design, and animation for `st-mary-of-angels`
> (baseline `c4e950a`, v1.1.0, post round-4).
> Method: skills-driven (repo `skills/` per `skills/skills-catalog.md` @ `c774ed9` —
> `warm-editorial` DESIGN.md/SKILL.md design system, `avant-garde-design-v4` anti-generic
> philosophy, `frontend-design`/`super-frontend-design` `ux_audit.py`, `frontend-design`
> `accessibility_checker.py`) + live-DOM visual audit of the dev build (desktop 1440×900 +
> mobile 390×844 full-page screenshots of all 10 routes + drawer/dropdown states, captured
> to `docs/audit-shots-round5/`) + line-level source review of all 10 pages / 13 components
> / index.css / e2e contracts.
> Constraints honored: Tailwind v4 CSS-first `@theme` (no one-off hex — new utilities use
> existing `shrine-*` tokens), `cn()` merging, HashRouter, `viteSingleFile`, global
> `prefers-reduced-motion` contract, transform/opacity-only motion, no new dependencies,
> all commits on `main` (no new branches).

## Part 1 — Audit findings (evidence-based)

| ID | Finding | Evidence | Type |
|----|---------|----------|------|
| R5-1 | Grounds cards (Home) + Ministries section images sit static inside `.card-lift` frames — the card lifts but the photograph never moves; the tactile "image drift" affordance is missing from an otherwise complete hover system | `Home.tsx` L129–151, `Ministries.tsx` L51–74; visual audit `home-desktop.png`, `ministries-desktop.png` | Motion/tactile |
| R5-2 | History page: the story column dead-ends at ~40% of the page height while the 8-entry timeline (1957–2026) runs twice as long — large dead whitespace below "In 1970 the chapel became a parish…", and no reading anchor while scanning the timeline | `History.tsx` L17–38; `history-desktop.png` (left column empty below ~900px) | Layout/UX |
| R5-3 | Mass-time cards: all three carry the identical `Clock` icon; the Sunday card's 6-slot `<ul>` is a plain list with no visual anchors; and there is **no "today" cue** — the single most-asked parish question ("what time is Mass *today*?") requires visitors to self-locate | `Worship.tsx` L28–69; `worship-desktop.png` | UX/hierarchy |
| R5-4 | Give page ends abruptly after the options grid — no closing band (Home "The church exists to evangelise" and Serve CTAs both close dark); in-person facts (Reception hours, office phone) are buried inside a card | `Give.tsx` L40–68; `give-desktop.png` (grid → footer, no closure) | Composition |
| R5-5 | About: pillar numerals `01/02/03` are tiny caps text (editorial systems treat big ghost numerals as a hierarchy device); friar cards are text-only with no identity cue; PPC table rows have no hover affordance (round-1 E7 covered tables, this divide-list predates it) | `About.tsx` L43–53, L72–91, L102–111; `about-desktop.png` | Editorial hierarchy |
| R5-6 | Event cards (Home featured + NewsEvents): `CATEGORY · DATE` renders as one plain colored text line — the round-1 E4 "bordered gold category chip" language never landed in this port (the smoke test only asserts the text color), so event hierarchy remains weaker than grounds cards | `Home.tsx` L168–180, `NewsEvents.tsx` L26–38, `smoke.spec.ts` L110–115; `news-events-desktop.png` | Hierarchy |
| R5-7 | Timeline: year labels are small-caps eyebrows while titles take the display voice; the rail is a hard gold `border-l` with no fade at its extremes — the rail reads as cropped rather than drawn | `Timeline.tsx` L6–19; `history-desktop.png` | Editorial polish |
| R5-8 | Button icons (e.g. `ArrowRight`) are static on hover — no directional nudge — and the `icon` prop is rendered bare (decorative icons are not `aria-hidden` at the Button layer) | `Button.tsx` L40–53; `Home.tsx` L96–98 | Micro-interaction/a11y |
| R5-9 | Home dark CTA band is flat `bg-adobe-texture` only — no light bloom behind the content; misses the "house of light" motif the WOHA building (and the parish identity) is known for | `Home.tsx` L185–208; `home-desktop.png` | Atmosphere |
| R5-10 | NotFound is a plain dark section — no Emblem presence and no entrance staging, the only page with neither; a dead-end page lacks the brand warmth used everywhere else | `NotFound.tsx` L4–27; `notfound-desktop.png` | Delight |

Skills guidance applied (from `skills/design/design-systems/style-skills/warm-editorial/DESIGN.md`
@ `c774ed9`, the system this site's `shrine-*` palette implements): "Lead with typography and
whitespace"; "Use serif for numbers when they matter"; restraint — one accent moment per
screen; hover affordances consistent; `SKILL.md`: WCAG 2.2 AA, explicit interaction states,
reduced-motion support, semantic tokens over raw values. `avant-garde-design-v4`
(`version.json`): Anti-Generic — refine the existing editorial identity, don't reset it
(no bento redesigns, no generic SaaS patterns).

Non-goals (rejected, same rationale as rounds 1–2): dark mode, router-level page
transitions beyond the existing keyed `page-in`, carousels/marquees, new animation deps
(framer-motion — CSS is sufficient and keeps the single-file bundle lean), redesigned
information architecture, new content sections beyond the Give closing band (which uses
only canonical `site.ts` data).

## Part 2 — Remediation plan (P-1 … P-10)

Design language: keep the maroon/cream/gold liturgical palette and the Fraunces display
voice. All new motion is transform/opacity-only inside the existing global
`prefers-reduced-motion` block; all new colors are existing `shrine-*` tokens expressed in
named `index.css` utilities (same pattern as `bg-adobe-texture`).

### P-1. Image drift system (R5-1)
`src/index.css`: new utility `.img-zoom` — `transition: transform 700ms
cubic-bezier(0.22,1,0.36,1)` + `.group:hover .img-zoom { transform: scale(1.045) }`.
Apply `group` (already present on grounds card links) + `img-zoom` to Home grounds card
images; wrap Ministries images in a `group` container + `img-zoom`. The existing
`.card-lift` lift composes with it (frame lifts, photo drifts).

### P-2. History sticky story column (R5-2)
`src/pages/History.tsx`: story column gets `lg:sticky lg:top-28 lg:self-start` so it stays
anchored beside the timeline while it scrolls (grid item alignment fix, CSS-only); add a
`gold-rule-left` capstone line + "1957 → 2026 · twenty-twenty-six and counting" style
closing line under the story (content is lineage, not new facts). No change under `lg`.

### P-3. Mass-times "today" highlight + Sunday list affordances (R5-3)
New `src/utils/massDay.ts` — pure `massDayKey(date: Date): "weekdays" | "saturday" |
"sunday"` (getDay mapping: 0→sunday, 6→saturday, 1–5→weekdays). `Worship.tsx`: extract a
local `MassCard` — differentiated icons (`Clock` weekdays, `MoonStar` Saturday,
`Sun` Sunday — all `lucide-react`, aria-hidden), the matching card gets
`data-today="true"`, a gold top rule (`border-t-2 border-t-shrine-gold-500`), and a
"Today" chip (`bg-shrine-gold-500 text-shrine-maroon-900`); exactly one card highlights on
any given day. Sunday list: each `<li>` becomes a flex row with a gold dot marker
(`h-1.5 w-1.5 rounded-full bg-shrine-gold-500`) + subtle hover tint
(`transition-colors hover:bg-shrine-maroon-50/60`). jsdom-safe (no timers; the render test
asserts consistency with `massDayKey(new Date())` rather than a frozen date).

### P-4. Give closing band (R5-4)
`src/pages/Give.tsx`: closing dark band mirroring the Home CTA band —
`bg-shrine-maroon-950` + `bg-adobe-texture` + `bg-gold-bloom` (P-9), `SectionHeading light`
with h2 "Every gift keeps the hill a house of prayer" carrying `text-shrine-cream`
(cta-bands contract pattern), description with Reception hours + office phone from
`site.hours.reception` / `site.contact.officePhone`, buttons: `Write to the parish`
(`mailto:{site.contact.connectEmail}`) + cross-link `Serve` (`/serve`, outline-light).
Extends `cta-bands.test.tsx` (+1).

### P-5. About identity: ghost numerals, monogram discs, row hover (R5-5)
`src/pages/About.tsx`: pillar numeral becomes a display-serif ghost —
`font-display text-5xl leading-none text-shrine-gold-300` (kept `aria-hidden`-free: it is
real text `01`, fine for SRs). Friar cards gain a monogram disc: 44px `rounded-full`
gold-ring circle with initials derived from the name (first letters of first + last word),
`aria-hidden` decorative. PPC `<li>` rows gain
`transition-colors hover:bg-shrine-maroon-50/60` + rounded padding band.

### P-6. Event chip system (R5-6)
New shared markup (inline in both pages, no new component file — pages render from data):
`<p class="flex items-center gap-3">` wrapping a chip
`<span class="inline-flex items-center rounded-full border border-shrine-gold-400/40
px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] {categoryTone}">` for
the category + a `<span class="font-display text-sm text-shrine-charcoal/70">` for the
date. Applied to Home featured events + NewsEvents cards. `e2e/smoke.spec.ts` chip test
updated to the new structure (chip span carries `rounded-full` + categoryTone color; date
rendered in display serif).

### P-7. Timeline gradient rail + display years (R5-7)
`src/components/Timeline.tsx`: replace `border-l` with an absolutely-positioned rail div
`data-testid="timeline-rail"` — `bg-gradient-to-b from-transparent via-shrine-gold-400/70
to-transparent` (the rail is drawn, fading at both extremes); year becomes
`font-display text-lg text-shrine-gold-600` (serif for numbers, per warm-editorial) above
the title. Dots + halo unchanged.

### P-8. Button icon nudge + icon a11y (R5-8)
`src/components/ui/Button.tsx`: base gains `group`; `icon` renders inside
`<span aria-hidden="true" class="inline-flex transition-transform duration-300
group-hover:translate-x-0.5">` — decorative icons are now hidden from AT at the component
layer and nudge forward on hover.

### P-9. Gold bloom atmosphere (R5-9)
`src/index.css`: new utility `.bg-gold-bloom` —
`background: radial-gradient(640px 320px at 18% 0%, rgba(226,191,114,0.10), transparent 70%)`
(`#e2bf72` = `--color-shrine-gold-300`, the documented token-rgba pattern used by
`bg-adobe-texture`). Applied to the Home CTA band and the new Give closing band.
Static decoration (no motion), reduced-motion-irrelevant.

### P-10. NotFound warmth (R5-10)
`src/pages/NotFound.tsx`: section gains `relative overflow-hidden`; a large ghosted tau
Emblem (`h-40 w-40 text-shrine-cream/5`, `aria-hidden` already on the component) anchors
the bottom-right; content stages in with `rise-in` + `rise-in-d1..d3` (same language as
PageHero).

## Part 3 — TDD mapping (RED first for every behavioral contract)

| Test file | New tests assert |
|---|---|
| `src/utils/massDay.test.ts` (NEW, 5) | Sun→`sunday`; Sat→`saturday`; Mon–Fri→`weekdays`; fixed dates (2026-08-30 is a Sunday); key is always one of the three |
| `src/pages/worship-mass.test.tsx` (NEW, 4) | exactly one `[data-today="true"]` card; its heading matches `massDayKey(new Date())`; today card carries a "Today" chip; every Sunday `<li>` carries the gold-dot marker class |
| `src/pages/cta-bands.test.tsx` (+1) | Give closing band h2 "Every gift keeps the hill a house of prayer" carries `text-shrine-cream` |
| `src/pages/about-visuals.test.tsx` (NEW, 3) | pillar numeral `p` has `font-display` + `text-5xl`; each friar card has an `aria-hidden` monogram disc with initials text; every PPC `<li>` has the hover-tint class |
| `src/pages/event-chips.test.tsx` (NEW, 3) | Home event card renders a `rounded-full` chip span with the category text; NewsEvents same; the date renders outside the chip in `font-display` |
| `src/components/Timeline.test.tsx` (NEW, 3) | `[data-testid="timeline-rail"]` exists with a gradient background-image class; year `p` has `font-display`; 8 `dot-pulse` dots present |
| `src/components/ui/Button.test.tsx` (+2) | rendered `icon` sits inside an `aria-hidden="true"` wrapper; root element carries `group` |
| `src/pages/NotFound.test.tsx` (NEW, 2) | a ghost tau emblem `svg` renders inside the 404 section; the h1 sits inside a `rise-in` staged container |
| `src/pages/History.test.tsx` (NEW, 2) | story block carries `lg:sticky` + `lg:self-start` + `lg:top-28`; the capstone rule + closing lineage line render |

Unit delta: **17 → 24 files; 109 → 134 tests**. E2E: `e2e/enhancements-round5.spec.ts`
(NEW, 6): (1) `/worship` today chip matches the run date via `massDayKey` re-computed in
the test; (2) Give band h2 computed color is `rgb(250, 246, 236)` on maroon-950; (3)
History story block `position: sticky` at 1440×900; (4) grounds card image hover settles
at `matrix(1.045, …)` (poll, transform-only); (5) timeline rail computed background-image
is a gradient; (6) `/nope-404` renders the ghost emblem svg. Plus
`e2e/smoke.spec.ts` chip test updated to the P-6 structure. E2E delta: **36 → 42 tests**.

## Part 4 — Plan ↔ codebase validation

| Claim | Verified against |
|---|---|
| `.card-lift` + `.img-zoom` compose (transition properties don't collide — lift is on the frame, zoom on the img) | `index.css` L319–329 (card-lift = transform/box-shadow/border-color on the `<a>`), P-1 targets the inner `<img>` only |
| Ministries images can take a `group` wrapper without breaking jump-nav/fallback E2E | `ministries.spec.ts` queries `#id` sections + `img` elements; wrapper div is transparent to those selectors; SafeImage fallback contract untouched |
| `massDayKey` placement in `src/utils/` matches conventions (pure helpers live there — `cn.ts`) | `src/utils/` + AGENTS.md utils listing; no circular imports (Worship imports utils freely) |
| "Today" highlight cannot flake E2E across midnight: test recomputes `massDayKey(new Date())` and asserts the matching card — same-day invariant | P-3 TDD mapping; Playwright `new Date()` runs in the same process clock as the app |
| lucide-react 1.34.0 exports `MoonStar` + `Sun` | package pin 1.34.0; icons already used elsewhere (`Clock`, `MapPin`, `Sun`-family icons in Footer/SocialIcons usage patterns) — verified at build gate |
| Give band reuses the Home band pattern so cta-bands contract extends cleanly | `Home.tsx` L185–208 (band + `SectionHeading light` + explicit cream h2 per cta-bands.test.tsx contract) |
| Chip classes are `cn()`-safe (no tailwind-merge conflicts with categoryTone) | `cn()` dedup; categoryTone colors are text-color-only, chip border/padding classes disjoint |
| Timeline rail swap keeps dot geometry (dots are absolutely positioned at `-left-[41px]` against the `pl-8` padding — unchanged) | `Timeline.tsx` L8–9; rail div is `absolute left-0` inside the same `relative` `<ol>` |
| Button `group` class doesn't collide with any consumer className | grep of `Button` usages (`Home`, `Serve`, `Worship`, `NotFound`, `NewsEvents`) — none pass a `group` className |
| NotFound Emblem import introduces no cycle (`Emblem` is leaf, used by Header/Footer) | `Emblem.tsx` imports only `cn` |
| History sticky needs the grid item to be the direct child — story div is already the direct grid child | `History.tsx` L18–35 (`Container` grid → two children) |
| Reduced-motion: no new keyframes (P-1 transition, P-8 transition, others static decoration) → global block already neutralizes transitions | `index.css` L89–101 (`transition-duration: 0.01ms !important` under reduce) |
| No new dependencies; all icons from `lucide-react`; all colors existing tokens | package.json pinned deps; palette in `@theme` |
| Test-count claims will be re-verified at the five-gate and docs aligned to the real numbers | gate protocol (AGENTS.md Commands) |

**Validation verdict: the plan is aligned with the codebase, the repo conventions
(AGENTS.md Quirks/Don't), the prior rounds' contracts, and the skills guidance.
Execution proceeds TDD: RED → GREEN → five-gate → docs re-sync → preview deploy →
atomic commits on `main` → push via the SSH wrapper.**

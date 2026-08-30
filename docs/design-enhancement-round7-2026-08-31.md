# Round-7 Design Enhancement Plan — "Honest Light" (2026-08-31)

> Scope: visual appeal, aesthetics, UI/UX design, and animation for the **risen-christ**
> site (baseline `2f65c11`, v1.3.0, post round-6).
> Method: skills-driven per `skills/skills-catalog.md` — `frontend-design` (SKILL +
> `ux-psychology.md` REQUIRED + `animation-guide.md`), `aesthetic` (BEAUTIFUL/RIGHT/
> SATISFYING/PEAK), `ui-ux-pro-max` (improve-existing-UI workflow), `tailwind-patterns`
> (v4 CSS-first constraints), `code-quality-standards` (Aesthetic/UX rigor axis),
> `webapp-testing-journey` (E2E methodology) — plus a live-DOM visual audit of the
> deployed build at `https://risen-christ.jesspete.shop/` (desktop 1440×900 + mobile
> 390×844; screenshots in `docs/audit-shots-round7/`).
> Constraints honored: Tailwind v4 CSS-first `@theme` (no one-off hex — new utilities use
> existing `shrine-*` tokens), `cn()` merging, HashRouter, `viteSingleFile`, global
> `prefers-reduced-motion` contract, transform/opacity-only motion, no new dependencies,
> no new content facts (everything renders from canonical `site.ts`/`content.ts`),
> all commits on `main` (no new branches).

## Part 1 — Audit findings (evidence-based, live site 2026-08-31)

| ID | Finding | Evidence | Type |
|----|---------|----------|------|
| R7-1 | **Reveal fragility**: `.reveal { opacity: 0 }` is the default state and `Reveal` relies on a single IntersectionObserver with no print override, no constructor guard, and no early-entry margin. Below-fold content is invisible in print (Ctrl+P), full-page captures, and any IO-failure context; threshold 0.15 with no `rootMargin` also makes entries pop in late on fast scrolls. Live full-page captures show: History timeline blank below entry 2, About priests + PPC blank, Give grid row 2 blank, Serve roles 03–04 blank, NewsEvents cards 5–6 blank, Ministries Family-Life/Youth images blank. Live scroll check: `8/8` `.reveal-visible` after real scrolling — works for users; severity is robustness/polish, not breakage. | `src/index.css` L196–208, `src/components/ui/Reveal.tsx`; `docs/audit-shots-round7/live-{history,about,give,serve,news,ministries}-desktop.png`; live eval `{revealed: 8, total: 8}` | Robustness/motion |
| R7-2 | Worship "Confession & adoration": the left copy column (Reconciliation + Adoration Room) ends at ~40% height while the six devotion cards run twice as long — large dead whitespace under the left column at `lg`. | `Worship.tsx` L133–142; `live-worship-desktop.png` | Layout/UX |
| R7-3 | **Closure gaps**: News & Events ends abruptly (grid → footer, no closing band — Home and Give both close dark); FAQ dead-ends after the accordion with no "still have questions?" loop back to the office. | `NewsEvents.tsx` L20–34, `FAQ.tsx` L13–18; `live-news-desktop.png`, `live-faq-desktop.png` | Composition |
| R7-4 | Give: PayNow — the primary giving channel — renders identical to the other seven cards (no Von Restorff emphasis); the UEN is buried in the description prose. | `Give.tsx` L44–58; `live-give-desktop.png`; `frontend-design/ux-psychology.md` §Von Restorff | Hierarchy |
| R7-5 | Ministries sticky jump-nav marks `aria-current` only from the clicked hash (`useLocation().hash`) — there is no scrollspy, so the pills never track reading position while scrolling the six sections. | `Ministries.tsx` L9–10, L30–33; `live-ministries-desktop.png` | UX/interaction |
| R7-6 | About: PPC divide-list rows have no hover affordance (round-5 P-5 intent never landed in this port); priest email/tel links are plain colored text with no hover cue. | `About.tsx` L102–111, L78–91; `live-about-desktop.png` | Micro-interaction |
| R7-7 | Desktop nav active state is gold text only — no hairline anchor under the active (or hovered) item, so the header's wayfinding is weaker than the footer's `link-underline` language. | `Header.tsx` L130–166; `live-home-desktop.png` | Wayfinding polish |
| R7-8 | **Hover-affordance honesty**: `card-lift` (translateY + shadow = "this is interactive" per `frontend-design/animation-guide.md` §7) is applied to non-interactive info articles — Worship devotions, Give options, Serve roles, About pillars, priest cards, NewsEvents cards, Home featured events. Hovering lifts cards that go nowhere. | `Worship.tsx` L147, `Give.tsx` L50, `Serve.tsx` L26, `About.tsx` L41/L61, `NewsEvents.tsx` L22, `Home.tsx` L164; animation-guide §7 "Match effect to action" | Motion honesty |
| R7-9 | PageHero photos read near-black: image `opacity-35` under a `/50 → /70 → solid` gradient stack. The stained-glass imagery (Give, FAQ heroes) loses its richness and every interior page opens on the same murky note. | `PageHero.tsx` L24–28; `live-give-desktop.png`, `live-faq-desktop.png` | Atmosphere |

Skills guidance applied: `animation-guide.md` §7 hover table (card=lift only when
clickable; info=tint), §9 (transform/opacity only; reduced-motion respected — already
global); `ux-psychology.md` Von Restorff (R7-4), serial-position (closure bands R7-3);
`aesthetic` SATISFYING (150–300ms micro-interactions) and PEAK (restraint — "too much of
anything isn't good"); `ui-ux-pro-max` improve-existing-UI (concrete component specs);
`avant-garde-design-v4` anti-generic via **refining** the established editorial identity,
not resetting it.

Non-goals (rejected, same rationale as rounds 1–2/5): dark mode, router-level transitions
beyond the existing keyed `page-in`, carousels/marquees, framer-motion or any new dep,
redesigned information architecture, new content sections beyond closure bands that render
only canonical data, custom Google-Maps styling (requires API key).

## Part 2 — Remediation plan (P-1 … P-9)

Design language: keep the maroon/cream/gold liturgical palette and the Fraunces display
voice. All new motion is transform/opacity/background-color-only inside the existing
global `prefers-reduced-motion` block; all new colors are existing `shrine-*` tokens.

### P-1. Reveal resilience kit (R7-1)
`src/index.css`: add a print override inside `@layer utilities` —
`@media print { .reveal { opacity: 1 !important; transform: none !important; } }`.
`src/components/ui/Reveal.tsx`: wrap the `IntersectionObserver` construction in
`try/catch` — on failure, add `reveal-visible` immediately (progressive enhancement);
add `rootMargin: "0px 0px 8% 0px"` to the observer options so entries begin revealing
just before they enter the viewport (kills fast-scroll pop-in); keep threshold 0.15.
No behavioral change for normal scrolling users; print/capture contexts and IO-less
environments now always get content.

### P-2. Worship sticky mercy column (R7-2)
`src/pages/Worship.tsx`: confession grid `gap-10 lg:grid-cols-2` gains `lg:items-start`;
the left copy `<div>` gains `lg:sticky lg:top-28 lg:self-start` (same pattern as the
History story column). No change under `lg`.

### P-3. Closure bands — NewsEvents + FAQ (R7-3)
`src/pages/NewsEvents.tsx`: after the grid, a closing dark band mirroring the Give band —
`bg-shrine-maroon-950` + `bg-gold-bloom` + `bg-grain`, `SectionHeading light` with an
explicit `text-shrine-cream` h2 ("The bulletin keeps the household in one conversation"),
description from `site.mass.secondCollection` context line ("Second collections are
announced in the weekly bulletin."), and a `Button href={site.bulletin}` (outline-light,
"Open the bulletin") — extends the `cta-bands` contract.
`src/pages/FAQ.tsx`: slim closing band on parchment — `SectionHeading` h2 "Still have
questions?" + description "The parish office is glad to help." + two `link-underline`
contact links (office phone `tel:` + secretariat email `mailto:` from `site.contact`).
Both bands render only canonical `site.ts` facts.

### P-4. PayNow featured card (R7-4)
`src/pages/Give.tsx`: `index === 0` card gains the established featured language —
`data-featured="true"`, `border-t-2 border-t-shrine-gold-500` (same treatment as the
"Today" Mass card) and `bg-shrine-gold-100/40` tint so the primary channel reads first
without new copy or claims.

### P-5. Ministries scrollspy (R7-5)
New `src/hooks/useScrollSpy.ts` — `useScrollSpy(ids: string[]): string` returns the id of
the section currently crossing the viewport's middle band via a single
IntersectionObserver with `rootMargin: "-45% 0px -50% 0px"` (top/bottom insets isolate
the center); falls back to the first id when nothing intersects; disconnects on unmount;
jsdom-safe (test drives the mocked IO callback directly).
`src/pages/Ministries.tsx`: `const active = useScrollSpy(ministries.map(m => m.id))`;
pills set `aria-current` from `active === ministry.id` — the hash remains the click
source of truth (HashRouter contract unchanged); the spy merely tracks reading position.

### P-6. About list/link affordances (R7-6)
`src/pages/About.tsx`: PPC `<li>` rows gain the hover band —
`transition-colors hover:bg-shrine-maroon-50/60 rounded-sm px-2 -mx-2`; priest
email/tel links gain `link-underline` (matches footer link language).

### P-7. Desktop nav hairline (R7-7)
`src/components/Header.tsx`: desktop nav items (links and dropdown triggers) gain
`after:` hairline utilities —
`after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left
after:bg-shrine-gold-300 after:transition-transform after:duration-300
hover:after:scale-x-100 focus-visible:after:scale-x-100` plus `relative`, and the
active item adds `after:scale-x-100` so the current route carries a permanent gold
hairline. Transform-only (scaleX), reduced-motion-neutral, matches the footer's
`link-underline` grammar.

### P-8. Card-affordance honesty — `card-tint` (R7-8)
`src/index.css`: new utility `.card-tint` —
`transition: background-color 300ms cubic-bezier(0.22,1,0.36,1), border-color 300ms
cubic-bezier(0.22,1,0.36,1);` + `:hover { border-color: rgba(209,169,85,0.55)
(gold-400/55); background-color: rgba(226,191,114,0.08) (gold-300/8) }` — a warm tint
that reads on both cream and parchment card bases. Token-derived (documented
token-rgba pattern of `bg-adobe-texture`/`bg-gold-bloom`), no motion.
Swap `card-lift` → `card-tint` on **info-only** articles: About pillars + priest cards,
Worship devotion cards, Give option cards, Serve role cards, NewsEvents event cards.
`card-lift` (lift = clickable) **remains** on genuinely interactive surfaces: Home
grounds cards (links), Give/NewsEvents external `link-underline` CTAs.
`src/pages/Home.tsx`: featured event articles become honest interactive cards — wrapped
in `<Link to="/news-events">` keeping `card-lift` (clicking a featured event now goes to
the events page, matching the existing "All events" affordance).

### P-9. PageHero atmosphere (R7-9)
`src/components/PageHero.tsx`: image `opacity-35` → `opacity-45`; right gradient
`from-shrine-maroon-950/60` → `/45`; bottom gradient `via-shrine-maroon-950/70` →
`/65`. Stained glass and interior photography now read at page-open; contrast of the
cream display type is unaffected (text sits on the darkened left/bottom fields —
verified below in Part 4 and by E2E color assertions).

## Part 3 — TDD mapping (RED first for every behavioral contract)

| Test file | New tests assert |
|---|---|
| `src/components/ui/Reveal.test.tsx` (NEW, 2) | (1) when `IntersectionObserver` constructor throws, children still end `reveal-visible`; (2) the observer is constructed with `rootMargin: "0px 0px 8% 0px"` |
| `src/pages/worship-mass.test.tsx` (+1) | the confession section's copy column carries `lg:sticky lg:top-28 lg:self-start` and the grid carries `lg:items-start` |
| `src/pages/cta-bands.test.tsx` (+2) | NewsEvents band h2 "The bulletin keeps the household in one conversation" carries `text-shrine-cream`; FAQ closing h2 "Still have questions?" renders with office phone + secretariat email visible |
| `src/pages/give-featured.test.tsx` (NEW, 2) | exactly one giving card carries `data-featured="true"` and it is the PayNow card; it carries the gold top-rule + tint classes; all option cards carry `card-tint` and none carries `card-lift` |
| `src/hooks/useScrollSpy.test.ts` (NEW, 4) | returns the fallback (first) id when nothing intersects; adopts the id reported by the IO callback; unobserves/disconnects on unmount; handles ids with no matching section without crashing |
| `src/pages/about-visuals.test.tsx` (+1) | every PPC `<li>` carries the hover-tint class `hover:bg-shrine-maroon-50/60` |
| `src/components/Header.test.tsx` (+1) | the active desktop nav leaf link carries `after:scale-x-100` (permanent hairline) while inactive links do not |
| `src/pages/card-affordances.test.tsx` (NEW, 6) | devotion/give-option/serve-role/news-event/about-pillar articles carry `card-tint` and NOT `card-lift`; the Home featured event card is a `Link` to `/news-events` that still carries `card-lift` |

Unit delta: **28 → 32 files; 156 → 175 tests** (19 new RED tests: Reveal 2, worship +1, cta-bands +2, give-featured 2, useScrollSpy 4, about-visuals +1, Header +1, card-affordances 6).
E2E: `e2e/enhancements-round7.spec.ts` (NEW, 8):
1. `/history` under `page.emulateMedia({ media: "print" })`: a below-fold timeline entry
   computes `opacity: 1` (print override).
2. `/worship` at 1440×900: mercy copy column computes `position: sticky`.
3. `/news-events`: band h2 computed color is `rgb(250, 246, 236)` on maroon-950.
4. `/give`: PayNow card has `data-featured="true"` and computed top border-color
   `rgb(195, 150, 63)` (gold-500).
5. `/ministries` at 1440×900: scrolling to `#faith-formation` moves `aria-current="true"`
   to the Faith Formation pill (scrollspy live).
6. `/history` at 1440×900: the About dropdown trigger carries the `after:scale-x-100`
   active-hairline class.
7. `/`: featured event card is an anchor with href ending `/news-events`.
8. `/faq`: closing band shows the office phone link and the secretariat email link.
E2E delta: **40 → 48 tests**.

## Part 4 — Plan ↔ codebase validation

| Claim | Verified against |
|---|---|
| Print override is safe with the global reduced-motion block and `rise-in` fill-mode (elements are visible after animation) | `index.css` L89–101 (reduced-motion neutralizes animations), L221–223 (`rise-in ... both` ends at opacity 1); print override only needs to handle `.reveal`, the only permanently-hidden-until-JS utility |
| `Reveal` mock contract: `src/test/setup.ts` MockIntersectionObserver fires `isIntersecting: true` synchronously — new `rootMargin` option must be read off the options arg, not the instance | setup.ts L4–22 (mock ignores options today; the test will construct Reveal with a spy constructor capturing the options) |
| Worship sticky column mirrors History's proven pattern (direct grid child + `items-start`) | `History.tsx` L14–16 (`grid items-start` + `lg:sticky lg:top-28 lg:self-start`); Worship grid currently lacks `items-start` — added in P-2 |
| NewsEvents band reuses the Give band composition so `cta-bands.test.tsx` extends cleanly | `Give.tsx` L71–95 (band + bloom + grain + explicit cream h2 per contract); `cta-bands.test.tsx` asserts h2 class only — new band adds one more section to the same page-level query pattern |
| `givingOptions[0]` is PayNow and index-based featured styling cannot mis-order | `content.ts` L375–383 (PayNow first); grid order is the array order |
| `useScrollSpy` jsdom testability: hook observes `document.getElementById(id)` elements; test renders a probe component and drives `callback([{isIntersecting, target}], observer)` from a captured constructor | setup.ts mock pattern; hook stores nothing module-global; unmount cleanup testable via `disconnect` spy |
| Ministries pill swap (hash → spy) keeps E2E jump-nav contract: clicking a pill sets the hash AND scrolls, and the spy adopts the crossed section — `aria-current` transitions are covered by round-7 E2E test 5 | `ministries.spec.ts` queries `#id` sections and `img` elements (untouched); `enhancements-round5` does not touch ministries pills |
| Header hairline classes are `cn()`-safe (no tailwind-merge collisions — no conflicting `after:` utilities anywhere in Header) | grep of `after:` in `src/` — only P-7 introduces them; `tw-merge` treats unknown variants as disjoint |
| Swapping `card-lift` → `card-tint` on info articles breaks no contract: the only e2e `card-lift` selector is `a.card-lift` (Home grounds links — unchanged) | `rg "card-lift" e2e/` → single hit `enhancements-round5.spec.ts` L53 (`a.card-lift` = grounds link) |
| `.card-tint` colors read on both card bases: gold-300/8% over cream `#faf6ec` and parchment `#f2e9d6` both warm slightly; border gold-400/55 is visible on `shrine-stone` borders | token values `@theme` L4–6, L21; rgba-on-token pattern from `bg-gold-bloom` (L115–121) |
| Home featured-event Link wrap is transparent to smoke assertions (text/category/date queries) and keeps `h-full` grid stretch | `smoke.spec.ts` queries `article`/text roles — `Link` renders an `<a>` around the same article; `e2e/smoke.spec.ts` L100–106 hero/section queries unaffected |
| PageHero opacity change cannot regress contrast: h1/eyebrow sit over the left-biased `from-maroon-950/60→` gradient + bottom `to-maroon-950` solid; E2E already asserts cream hero text visibility on every route via smoke | `PageHero.tsx` L27–28 gradients retained (only the right-edge stop softened); `smoke.spec.ts` hero assertions on all routes |
| lucide-react / no new deps: P-1…P-9 introduce zero imports beyond existing modules | package.json pinned deps unchanged |
| Test-count claims re-verified at the five-gate; docs aligned to real numbers | AGENTS.md Commands gate protocol |

**Validation verdict: the plan is aligned with the codebase, the repo conventions
(AGENTS.md Quirks/Don't), the prior rounds' contracts, and the skills guidance.
Execution proceeds TDD: RED → GREEN → five-gate → E2E audit → docs re-sync →
preview deploy → atomic commits on `main` → push via the SSH wrapper.**

## Part 5 — Execution results (2026-08-31, TDD ledger)

**RED:** 15 failing tests across 8 files confirmed against the untouched tree
(all 156 pre-existing tests stayed green). One contract evolved mid-round per the
guard's own design: `Ministries.test.tsx` "no aria-current when no hash" →
"scrollspy marks exactly one pill when no hash is set" (the scrollspy legitimately
tracks reading position; jsdom's IO mock reports all sections intersecting, last wins).

**GREEN:** all P-1…P-9 implemented exactly as planned, plus two findings caught by the
E2E/visual verification loop that unit contracts missed:
- P-7 hairlines rendered on ALL nav items — the default `after:scale-x-0` was missing
  (only `hover:`/active grew them). Caught by screenshot inspection; fixed and the E2E
  was upgraded to assert the computed `::after` scale (active `1`, inactive `0`) so the
  class-presence gap can never recur. Tailwind v4 note: `scale-x-*` compiles to the
  CSS `scale` property — computed `transform` stays `none`.
- `useScrollSpy` was initially wired as `current || useScrollSpy(...)` (conditional
  hook call — rules-of-hooks violation, lint would fail). Rewired to always call the
  hook: `const spyId = useScrollSpy(...); const activeId = current || spyId;`
- Test-side corrections during GREEN: spy test moved to `.tsx` (JSX), IO-driven state
  wrapped in `act()`, probe renders only sections that exist, constructor-mock via
  direct `globalThis.IntersectionObserver` assignment (vitest `mockImplementation`
  typing rejects constructor spies).

**Five-gate (final, exit codes):**

```
pnpm lint       → eslint . --max-warnings 0            — EXIT 0
pnpm typecheck  → tsc --noEmit (strict)                — EXIT 0
pnpm test       → vitest run — 32 files / 175 passed   — EXIT 0  (was 28/156)
pnpm test:e2e   → playwright chromium — 48 passed      — EXIT 0  (was 40)
pnpm build      → dist/index.html 395.59kB gzip 114.34kB — EXIT 0 (was 388.44kB)
```

**Live visual verification (dev build, agent-browser 1440×900):** scrollspy pill moved
to Faith Formation on scroll; FAQ office band + NewsEvents bulletin band render with
cream/maroon contracts; PayNow featured gold rule visible; nav hairline only under the
active item; Worship sticky column verified by E2E (computed `position: sticky`,
`top: 112px`); print-emulation E2E proves below-fold timeline content at `opacity: 1`.
Before/after screenshots: `docs/audit-shots-round7/` (live-* = baseline, fixed-* = remediated).

**Docs re-sync:** README/AGENTS/CLAUDE/SKILL counts (32 files / 175 tests + 48 E2E,
395.59kB), inventories (32-file unit ledger, 7-spec E2E ledger, 27 utilities incl.
`card-tint`, `useScrollSpy` hook), version 1.3.0 → 1.4.0, round-7 rows in audit
histories and the AGENTS/README doc maps; `src/docs-contract.test.ts` guard updated to
pin the new verified budgets (48 E2E, 32/175, rejects 25/142 as stale).

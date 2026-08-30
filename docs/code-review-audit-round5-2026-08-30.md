# Code Review & Security Audit — Round 5 "Light of the Portiuncula" (2026-08-30)

> **Scope:** `c4e950a..e47930b` — 8 commits, 30 files changed (+970 / -156), the "Light of the Portiuncula" design enhancement on top of the post-round-4 baseline (`v1.1.0` → `v1.2.0`). No new dependencies, no branch — all on `main`.
> **Method:** Line-level review of every changed `src/` + `e2e/` file, 5-gate re-run (`lint / typecheck / test / test:e2e / build`), banned-pattern scan (`rg`), token/hex scan, CSP/headers review, `docs ↔ code` drift check, Contract ↔ TDD traceability, and accessibility sweep. Mirrors the tiered format of `docs/code-review-audit-round3-2026-08-30.md`.
> **Verdict: No critical (C) or high (H) findings. 1 medium (M), 4 low (L), 4 info (I). The round-5 code is shippable as-is; the M/L nits are recorded below and the sole docs-stale L is fixed in this commit.**

---

## 1 — Gate Snapshot (re-run in this audit, 2026-08-30)

| Gate | Command | Result | Evidence |
|------|---------|--------|----------|
| Lint | `pnpm lint --max-warnings 0` | **PASS** — exit 0, no warnings | flat config `eslint 9.39.5` + `typescript-eslint 8.28.0` + `react-hooks 5.2.0` + `react-refresh 0.4.19`; `e47930b` fixed the only lint failure (consistent-type-imports on `Page`) |
| Typecheck | `pnpm typecheck` | **PASS** — `tsc --noEmit` silent | strict `noUnusedLocals/Params` satisfied; `MassDayKey` discriminated union, `monogram()` typed, `IconSlot` typed `ReactNode` |
| Unit | `pnpm test` | **24 / 134 PASS** | `cn 5 + nav 7 + content 10 + site 7 + massDay 5 + Button 11 + SkipLink 3 + Accordion 6 + SafeImage 6 + Header 16 + BackToTop 7 + Ministries 3 + cta-bands 4 + worship-mass 4 + about-visuals 3 + event-chips 3 + Timeline 3 + NotFound 2 + History 2 + Layout 2 + useScrollProgress 4 + ScrollProgress 2 + head 13 + security-headers 6` — green in `~12.9s` |
| E2E | `pnpm test:e2e` | **42 PASS** | 6 specs `smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 9 + enhancements-round5 6` (chromium, 53.2 s) — includes the new 6 round-5 journeys |
| Build | `pnpm build` | **PASS** — `dist/index.html 387.84 kB` (gzip 113.68 kB) | `vite 7.3.6 + viteSingleFile 2.3.3 inlines index-*.js + style-*.css`; `dist/images/8` + `dist/_headers` present; delta `+6.43 kB` vs `381.41 kB` (round-4) — within budget for 10 polish items |

No gate regressed. The `387.84 kB` claim in `README.md / AGENTS.md / CLAUDE.md / st-mary-of-angels_SKILL.md` matches `ls -lh dist/index.html` byte-for-byte.

---

## 2 — Tiered Findings

| ID | Severity | Title | File:Line | Evidence | Disposition |
|----|----------|-------|-----------|----------|-------------|
| **R5-M1** | **Medium** | `EventMeta` + `categoryTone` duplicated inline in `Home.tsx` and `NewsEvents.tsx` | `Home.tsx:16-32`, `NewsEvents.tsx:6-22` | The plan (`P-6`) intentionally keeps the chip markup inline — "no new component file — pages render from data". Two identical `Record` maps + two identical `EventMeta` functions (32 lines duplicated). Drift risk: a future category or color change must be applied in two places. | **Accepted per plan, recorded.** The duplication is 2-way, 16 lines, and covered by `event-chips.test.tsx` which mounts both pages. Under the project's "ponytail" / YAGNI rule (avoid one-implementation abstraction), extraction to `src/components/EventMeta.tsx` is deliberately deferred until a third consumer appears. Filed as `M` (not `C/H`) because the test contract fails the build if the two pages diverge. **No change required now; revisit if a third event surface appears.** |
| **R5-L1** | Low | `README.md` Troubleshooting row still says "Should list 17 files" | `README.md:277` | Row reads: `Should list 17 files — src/test/setup.ts + src/**/*.test.* must exist…` — stale since round-5 bumped the suite to `24 files / 134 tests`. The twin table in `st-mary-of-angels_SKILL.md:590` was already corrected. | **Fixed in this audit** — updated to `24 files / 134` (see §7 Diff). |
| **R5-L2** | Low | `monogram()` has no direct unit test; integration test covers happy path only | `About.tsx:24-32` | `about-visuals.test.tsx` asserts `EC/JM/JL/RT` via DOM, but the helper's edge behaviour (single-word name, hyphenated name, bare `OFM`, locale stripping `[^A-Za-z]`) is unexercised. The strip regex `word.replace(/[^A-Za-z]/g, "")` would map `"St Mary"` inside a future `Priest.name` to `"SM"` — not currently hit but surprising. | **Low.** Helper is leaf, deterministic, and `noUnusedLocals` + typecheck guard it. Adding a 4-case `monogram.test.ts` would close the gap; deferred — the DOM contract already blocks rendering regressions. Noted for the next touch on `About.tsx`. |
| **R5-L3** | Low | `Worship.tsx:25` typed `Record<MassDayKey, typeof Clock>` is coincidentally correct but fragile | `Worship.tsx:9-14` | `massDayIcons` is typed as `typeof Clock` (all three icons share the `LucideIcon` shape). `MoonStar` and `Sun` are not subclasses of `Clock`, but `lucide-react` reuses the same `ForwardRefExoticComponent<LucideProps>` — so the type collapses correctly today. A future icon from a different family (non-lucide) would not match `typeof Clock`. | **Low.** Canonical type is `LucideIcon` (already used in `Give.tsx:18`). Changing to `Record<MassDayKey, LucideIcon>` would be semver-neutral and more self-documenting. Left as `L` — the current pin `1.34.0` exports `MoonStar`/`Sun` as `LucideIcon`, so no runtime or type error. |
| **R5-L4** | Low | `History.tsx` capstone uses `gold-rule-left` inside a `lg:sticky` ancestor | `History.tsx:38-41` | The gold rule animates `gold-rule-draw 0.9s` on mount. Inside a sticky container, the rule's animation can re-trigger on scroll reflow in some Chromium viewport-resize paths (sticky repaints don't re-mount, but `page-in` re-mounts on pathname change do). Visual-only, not functional. | **Low.** The global `prefers-reduced-motion` block kills the animation for motion-sensitive users; the polish is decorative. No fix — the rule is a 1 px divider, not a layout shifter. |
| **R5-I1** | Info | `Button` `group` class is inert until an `icon` is present — desirable | `Button.tsx:44` | Base `group` enables `group-hover:translate-x-0.5` on `IconSlot`. Buttons without an icon carry the harmless `group` class; `tailwind-merge` dedup is not triggered (no `group-*` conflict among any current consumer `className` — verified via `rg "group" src/`). | **Info.** No action. The `group` is unconditional by design (simpler than conditional `cn()`). The `R5-7` validation in `docs/design-enhancement-round5-2026-08-30.md` already checked this. |
| **R5-I2** | Info | `massDayKey(new Date())` is impure inside `MassCard` — acceptable for a static SPA | `Worship.tsx:30` | Each card calls `massDayKey(new Date())` on render (3 × per paint). The function is pure (`getDay` switch) and the "same-day invariant" is tested via `massDayKey(new Date())` re-computed in the same tick in `worship-mass.test.tsx:32` and `enhancements-round5.spec.ts:23`. No `setInterval`/timer, so no hydration mismatch across midnight until a hard reload. | **Info.** For a CMS/SSR future the value would be lifted to a prop or `useMemo` at the route boundary; for this static HTML artifact the current form is idiomatic and the E2E guards midnight flake by recomputing on the same clock. |
| **R5-I3** | Info | `img-zoom` transition is not listed in `prefers-reduced-motion` kill-list | `index.css:401-418` | The reduce block kills `transition-duration` globally to `0.01ms !important`, so `.img-zoom { transition-duration: 700ms }` collapses to instant — correct. The comment on `P-1` notes this; verified by scanning `index.css:89-101`. | **Info.** No change — the global block already covers transitions (animations are killed separately). |
| **R5-I4** | Info | `monogram()` disc uses `text-shrine-maroon-700` on `maroon-50` — contrast 7.2:1 | `About.tsx:92` | The disc is decorative (`aria-hidden="true"`), but the text contrast is AAA incidentally — `700 #55191a` on `50 #fbf0ee` (gold `400/50` ring). Verified via palette in `@theme`. | **Info.** No action — decorative discs are not AT content, but the contrast is correct if they ever lose `aria-hidden`. |

**Count:** `C 0 / H 0 / M 1 / L 4 / I 4` — **no blocking finding.**

---

## 3 — Behavioral Contract Verification (P-1 … P-10 ↔ tests)

| Plan Item | Code Anchor | Unit Contract | E2E Contract | Verdict |
|-----------|-------------|---------------|--------------|---------|
| **P-1 img-zoom** | `index.css:342-350` + `Home.tsx:160` + `Ministries.tsx:69-74` | — (visual) | `enhancements-round5:57` poll `matrix(1.04…)` after `.card-lift` hover, 5 s timeout, transform-only | **PASS** — 3.1 s, class `img-zoom` asserted, drift `1.045` |
| **P-2 sticky story** | `History.tsx:17` `lg:sticky lg:top-28 lg:self-start` + `data-testid` + capstone `gold-rule-left w-28` | `History.test.tsx:2` sticky classes + `1957 → 2026` text | `enhancements-round5:44` `position:sticky` + `top:112px` at `1440×900` | **PASS** |
| **P-3 massDayKey** | `utils/massDay.ts` pure switch + `Worship.tsx:30` `MassCard` | `massDay.test.ts` 5 (Sun/Sat/weekdays/sweep/canonical) + `worship-mass.test.tsx` 4 (one today, heading matches key, chip inside card, Sunday gold-dots) | `enhancements-round5:16` recomputes `getDay()` on same clock, asserts `data-card-day` | **PASS** — no midnight flake |
| **P-4 Give band** | `Give.tsx:68-86` dark `maroon-950 + adobe-texture + gold-bloom` + `SectionHeading light` cream h2 | `cta-bands.test.tsx` cream `text-shrine-cream` + Reception/mailto assertions | `enhancements-round5:29` computed `rgb(250,246,236)` on maroon-950 + link visible | **PASS** |
| **P-5 About discs** | `About.tsx:22-32` monogram fn + `font-display text-5xl gold-300` + `h-11 rounded-full gold-400/50` | `about-visuals.test.tsx` ghost `text-5xl`, discs `aria-hidden` `EC/JM/JL/RT`, PPC `hover:bg-maroon-50/60` | — | **PASS** |
| **P-6 event chips** | `Home.tsx:23-32` + `NewsEvents.tsx:15-22` `EventMeta` chip `rounded-full border gold-400/40` + `font-display` date | `event-chips.test.tsx` 3 — both pages `rounded-full`, `text-maroon-500` on Parish, date outside chip `font-display` | `smoke.spec.ts:156` updated to `rounded-full` + `text-shrine-*` + sibling `font-display` date | **PASS** |
| **P-7 Timeline rail** | `Timeline.tsx:8-12` `[data-testid=timeline-rail] gradient via gold-400/70` + `font-display gold-600` years | `Timeline.test.tsx` 3 — gradient rail, display-serif years, 8 `dot-pulse` halos, no `border-l` | `enhancements-round5:73` computed `linear-gradient` backgroundImage | **PASS** |
| **P-8 Button nudge** | `Button.tsx:44 group` + `IconSlot aria-hidden translate-x-0.5` | `Button.test.tsx:11` chip wrappers `aria-hidden`, `group`, press feedback | — | **PASS** |
| **P-9 gold bloom** | `index.css:115-123` `radial-gradient(640px 320px at 18% 0%, rgba(226,191,114,0.10)…)` | — (static decor) | visual (band presence via `bg-gold-bloom` in Give+Home) | **PASS** |
| **P-10 NotFound** | `NotFound.tsx:7-9` `absolute -right-6 Emblem text-cream/5` + `rise-in d1..d3` | `NotFound.test.tsx` ghost `svg aria-hidden`, `h1 rise-in rise-in-d1` | `enhancements-round5:82` `main section svg aria-hidden` | **PASS** |

All `docs/design-enhancement-round5-2026-08-30.md Part 4` plan↔codebase claims remain true (see also the `rg` checks in §5).

---

## 4 — Security Review

| Area | Checked | Result |
|------|---------|--------|
| **CSP** | `index.html:7` meta `default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org; frame-src https://www.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'` | **PASS** — `unsafe-inline` is required by `viteSingleFile` (JS+CSS inlined into `dist/index.html`); `object-src 'none'` + `base-uri 'self'` are the hardening from round-3 (audit `head.test.ts:13` covers them); beacon allow `static.cloudflareinsights.com` is Cloudflare-Pages-specific and scoped to `script-src` only. No `eval`/`wasm-unsafe-eval`. |
| **Response headers** | `public/_headers → dist/_headers` (5 directives) | **PASS** — `HSTS 1yr includeSubDomains`, `X-Content-Type-Options nosniff`, `X-Frame-Options DENY`, `Referrer-Policy strict-origin-when-cross-origin`, `Permissions-Policy camera/mic/geolocation=()` — guarded by `security-headers.test.ts` (6); `dist/_headers` present at `533 B`. |
| **Referrer meta** | `index.html:8` `strict-origin-when-cross-origin` | **PASS** — drifts vs `_headers` are caught by `head.test.ts`. |
| **OG / JSON-LD drift** | `site.ts` canonical `origin https://www.stmary.sg`, `ogImage`, `sameAs` 5 socials | **PASS** — `head.test.ts:13` asserts `og:url/site_name/image/twitter:card/theme-color/favicon.svg/JSON-LD name+address+phone` match `site.ts`; no drift introduced by round-5. |
| **User data / trust boundary** | No new inputs, no URL-param parsing, no `innerHTML`/`dangerouslySetInnerHTML`, no storage, no fetch | **PASS** — round-5 adds no sink. `monogram()` strips non-alpha; `massDayKey()` takes only `Date`. |
| **Images** | `images.*` 11 keys all local (`/images/*.jpg`), `naveCdn/courtyardCdn` aliases local, legacy CDN allowlist retained, unused | **PASS** — no new off-origin image fetch; `SafeImage` `dataset.fallback` guard + `alt` preserved. |
| **Accessibility / focus** | `Button IconSlot aria-hidden`, About discs `aria-hidden`, Sunday dots `aria-hidden`, Timeline rail `aria-hidden`, NotFound `Emblem` is `aria-hidden` at leaf (`Emblem.tsx:10`), History sticky does not clip focus, reduced-motion kills transitions, modal drawer unchanged | **PASS** — resurfaces round-4 L-5 `role=dialog / aria-modal / focus-trap / restore` is not regressed by round-5 (drawer is on `Header.tsx:226-227`, untouched). |
| **Supply chain** | No `package.json` dependency change except the doc-only `version 1.1.0→1.2.0` pin | **PASS** — `pnpm-lock.yaml` frozen in CI; `allowScripts` still `esbuild 0.27.7/0.25.12` only. |

**Security disposition: no new finding.** Round-3 hardening (`object-src 'none'`, `base-uri 'self'`, `_headers`, `Referrer-Policy`, BackToTop focus-release) stands.

---

## 5 — Architecture & Convention Checks

| Check | Result |
|-------|--------|
| `HashRouter` intact (no `BrowserRouter` / `createBrowserRouter`) | `rg BrowserRouter src/` → 0 |
| `viteSingleFile()` inlines JS+CSS, `public/images/` copied, no assumed chunk split | `dist/index.html 387.84 kB`, `dist/images/8`, build log `Inlining: index-*.js / style-*.css` |
| Alias `@ → src` in sync | `vite.config.ts: alias @ → resolve(__dirname,"src")` ↔ `tsconfig.json: paths @/* → src/* + baseUrl "."` — verified |
| Tailwind v4 has no `tailwind.config.js`; tokens only in `src/index.css @theme` | `@theme` still 24 colors + 2 shadows; round-5 used only `shrine-*` + token-rgba `#e2bf72 → rgba(226,191,114,0.10)` (documented pattern) |
| TS strict `noUnusedLocals/Params` | `pnpm typecheck` clean — no suppression comment needed |
| `cn()` discipline | No one-off hex `bg-[#`, no raw `className` concat; only templated `categoryTone` (text-color only, disjoint from `border/padding` classes, `cn` safe) |
| `skills/` / `src.orig/` ignored | `eslint.config.js ignores [dist,node_modules,coverage,playwright-report,test-results,skills,src.orig]` + `vite.config.ts server.watch.ignored` — unchanged |
| `Layout` double-hash `resolveAnchor` + `setTimeout 80ms` + fallback `scrollTo` | untouched (`Layout.tsx` diff empty) — hash anchors `#mass/#confession/#visit` + 6 ministry ids still navigate |
| `SafeImage` fallback guard | untouched — `data-fallback` once-swap pattern preserved |
| `Header` modal drawer L-5 | untouched — `role=dialog + aria-modal + handleDrawerKeyDown Tab/Shift+Tab + drawerWasOpenRef + pointerdown outside` still green (`Header.test.tsx:16`, `enhancements.spec.ts:132`) |
| No SSR / API / CMS | not introduced |
| No St Joseph / Rother reintroduction | `rg "Rother Shrine\|700 SE\|Palladian\|Mauduit" src/` → 0 (outside comments/docs) |

---

## 6 — Test Quality Notes

- **massDay coverage is strong:** 5 tests cover Sun/Sat/weekdays + a 30-day sweep (4 Sun / 4 Sat / 22 weekdays for Sept 2026) + canonical-key guard — the sweep would catch a locale-dependent `getDay()` misunderstanding.
- **worship-mass contract is correctly jsdom-safe:** asserts `massDayKey(new Date())` on the same clock as the component (no frozen date), plus a `Today → chip → lives-inside today-card` nesting invariant. Good precedent for future date-sensitive UI.
- **event-chips guards both surfaces:** `Home` + `NewsEvents` — a single-file drift would fail.
- **about-visuals uses the exact initials:** `EC/JM/JL/RT` — an `OFM`-stripping regression would be caught.
- **E2E round-5 is deterministic:** wrist-watched failure modes from round-4 (scroll-rail race, midnight flake) are explicitly avoided — `waitForTimeout 300` after `gotoHash`, `expect.poll` for `transform`, `getDay()` re-computed in-test.

---

## 7 — Docs ↔ Code Drift Ledger

| Doc | Claim checked | Result |
|-----|---------------|--------|
| `AGENTS.md` | `24 files / 134 tests` + `42 E2E` + utilities `26` + `massDay` quirks + Portiuncula package | **In sync** |
| `CLAUDE.md` | tests breakdown `24/134` + `6 specs / 42`, gates `lint/typecheck/test/test:e2e/build green`, env/setup/build tables, validation § numbering | **In sync** |
| `README.md` | version `1.2.0`, architecture table `24/134 + 42`, structure `index.css 26 utilities`, troubleshooting + pre-push gate | **Drift found → fixed:** `README:277` "Should list 17 files" → **"24 files"** (this commit). All other rows already `24/134 + 42 + 387.84 kB`. |
| `st-mary-of-angels_SKILL.md` | header `24/134 + 42`, §2 test table, §3.1 gates, §5.2 inventory, §11 pre-ship | **In sync** — `§` counts + `head`/`security-headers` + `massDay` tallies matched |
| `docs/design-enhancement-round5-2026-08-30.md` | plan↔codebase table (14 claims), P-1…P-10 spec, TDD map (9 files), validation verdict | **In sync** — code anchors match (§3 above) |

Diff for the fix:

```diff
- | `pnpm test` finds 0 tests | Should list 17 files — `src/test/setup.ts` + `src/**/*.test.*` must exist. … |
+ | `pnpm test` finds 0 tests | Should list 24 files — `src/test/setup.ts` + `src/**/*.test.*` must exist. … |
```

No other doc drift.

---

## 8 — Verification Ledger (must all be green to ship)

| # | Check | Status |
|---|-------|--------|
| 1 | `pnpm lint --max-warnings 0` | **PASS** |
| 2 | `pnpm typecheck` | **PASS** |
| 3 | `pnpm test` — 24 files / 134 tests | **PASS** |
| 4 | `pnpm test:e2e` — 42 tests (chromium) | **PASS** |
| 5 | `pnpm build` → `dist/index.html 387.84 kB` + `dist/images/8` + `dist/_headers` | **PASS** |
| 6 | No `as any` in `src/` | **PASS** |
| 7 | No arbitrary hex `bg-[#…]` / no `Inter` / no `BrowserRouter` | **PASS** |
| 8 | CSP `object-src 'none'` + `base-uri 'self'` + beacon `static.cloudflareinsights.com` present | **PASS** |
| 9 | `_headers` carries HSTS/XCTO/XFO/Referrer/Permissions-Policy | **PASS** |
| 10 | Docs  `24/134 + 42 + 387.84 kB + 26 utils + v1.2.0` aligned across AGENTS/CLAUDE/README/SKILL | **PASS** (README L fixed) |

---

## 9 — Remediation Required?

**No separate remediation plan is required for this round.** `C=H=0`; the single `M1` is an accepted DRY trade-off with a passing bilateral test contract, and the `L1` docs drift is fixed in this audit commit. The next touch on either event surface should extract `EventMeta` / `categoryTone` to `src/components/EventMeta.tsx` (and add the 4-line `monogram` unit suite) — but neither blocks shipment.

---

## 10 — Sign-off

| Field | Value |
|-------|-------|
| Audit date | 2026-08-30 |
| Baseline | `c4e950a` (post round-4) |
| Head audited | `e47930b` |
| Bundle | `dist/index.html 387.84 kB` (`gzip 113.68 kB`) — `viteSingleFile` inlined |
| Lint / Typecheck | `0 / 0` |
| Tests | `24 files / 134 passed` + `42 E2E passed` |
| Security | No new finding; round-3 hardening stands |
| Docs | Four-doc re-sync holds (1 low drift fixed) |
| Disposition | **APPROVED — shippable** |

For lineage, appeals, and round-4 L-5 closure, see `docs/design-enhancement-round5-2026-08-30.md` (the plan, P-1…P-10, 14-claim validation) and `docs/remediation-round4-2026-08-30.md` (the prior modal-drawer audit).


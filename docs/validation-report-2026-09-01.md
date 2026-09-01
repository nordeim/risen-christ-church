# Validation Report — 2026-09-01 (post round-12)

> **Scope:** 8-phase alignment audit of `risen-christ-church` against the four agent docs (`AGENTS.md`, `CLAUDE.md`, `README.md`, `risen-christ_SKILL.md` v3.0.0 §0) — counts, routes, design tokens, data layer, a11y/SEO, and pre-ship gates. Executed 2026-09-01, codebase `v1.4.4`, SKILL `v3.0.0`.

**Verdict: PASS — all volatile facts align, gates green, zero hidden drift after two remediated guard failures.** The repo is shippable as-documented.

---

## 0 — Volatile Facts (§0) vs Executable Truth

| Fact (§0, 2026-08-31 round-12) | Expected | Observed (2026-09-01) | Verdict |
|---|---|---|---|
| `package.json` version | `1.4.4` | `1.4.4` (`rg version`) | ✅ |
| This SKILL doc version | `3.0.0` | `3.0.0` frontmatter | ✅ |
| `src/` inventory | `77 = 41 source + 35 tests + 1 setup` | `find src -type f \| wc -l → 77`; 41 non-test non-setup, 35 `*.test.*`, 1 `setup.ts` | ✅ |
| `public/images/` | 8 + `favicon.svg` | `ls public/images → 8`; `ls public/favicon.svg → ok`; `dist/images → 8` | ✅ |
| Build artifact | `dist/index.html 397.52 kB` + `_headers` + `favicon.svg` + `images/8` | `pnpm build → 397.52 kB gzip 114.89 kB`; `ls -lh dist → 389K index.html + 249 _headers + 160 favicon.svg` | ✅ |
| Unit tests | `35 files / 202 tests` | `pnpm test → 35 passed / 202 passed` (post-fix) | ✅ |
| E2E | `51 tests, 8 specs` (dev + built) | `pnpm test:e2e → 51 passed`; `pnpm test:e2e:built → 51 passed` | ✅ |
| Design tokens | `25 colors + 2 shadows (27 @theme)` | `src/index.css --color-shrine-* 25 + --shadow-shrine 2 = 27 entries` (verified hex list — terracotta-600 #8f4c30 present) | ✅ |
| Utilities/keyframes | `27 + 8` + scrollbar + print override | `rg "@keyframes" → 8`; `rg "^\s*\." → 27 named utilities incl. rise-in-d1..d4 + drawer-item-in/page-in — count matches §4.3 register` | ✅ |
| Hooks | 3 (`useScrolled`, `useScrollProgress`, `useScrollSpy`) | `ls src/hooks → 3` + 3 `*.ts` + tests for 2 | ✅ |
| Utils | 4 (`cn`, `massDay`, `monogram`, `deepLinks`) | `ls src/utils → 4` + 4 tests + site.ts | ✅ |
| Routes | 17 `Route` (16 + `*`), 7 aliases in 5 groups, 9 anchors (3 worship + 6 ministries, sixth `#language-communities`) | `rg "<Route" App.tsx → 17 entries`; `knownRoutePaths 15 incl. /faq` + 4 worship aliases + ministry/news/serve/give aliases verified; `Worship.tsx id="mass/confession/visit"` + `Ministries.tsx 6 ids ending language-communities` | ✅ |
| CSP `img-src` | `'self' data: blob:` only | `index.html CSP → img-src 'self' data: blob:`; no wikimedia/pexels hosts | ✅ |
| `src.orig/` | PRUNED round-12 | `git ls-files \| rg src.orig → only docs/validation-src-vs-src.orig.md`; `ls src.orig → No such file`; `.gitignore: src.orig/` + `repo-hygiene.test.ts` guard | ✅ |
| `skills/` | vendored, re-added `0be0fe8`, tooling-excluded | `git ls-files \| rg skills → 2360`; `eslint ignores + tsconfig exclude + vite watch.ignored → all exclude skills` | ✅ |
| Secrets | `docs/ssh-key.txt` untracked, history contains `0be0fe8`, rotation outstanding | `git ls-files -- docs/ssh-key.txt → empty`; `git check-ignore → .gitignore: docs/ssh-key.txt`; `git log --all -- docs/ssh-key.txt → 0be0fe8 + 6d87934 untrack`; `ls docs/ssh-key.txt → 3369 B` untracked working-tree file (owner must rotate) | ✅ |
| Data arrays | `lifeTimeline 8 (1969–2026) · grounds 3 · ministries 6 · faqs 6 · upcomingEvents 6 (2 href) · givingOptions 8 · priests 3 (phone+email) · ppcMembers 7 · serveRoles 4 · devotions 6 · images 11 · nav 6/10 · site hours 7 / mass 9` | `rg "export const" content.ts → 10 exports + images; priests[3] Brian/Arun/Dexter each email+phone; ppc 7; lifeTimeline 1969–2026 8; grounds 3; ministries 6; faqs 6; events 6 (Parish|Devotion|Formation|Archdiocese, 2 href); giving 8 (flame/church/sprout/hand-heart/book/heart/landmark/globe); serveRoles 4 title+summary; devotions 6 title+when+where; images 11 all local` | ✅ |
| Parish constants | 91 Toa Payoh Central S319193 · UEN T08CC4042G · Easter Sunday · NS19 Exit A · buses 88/157/163 B52261 · office 6253 2166 etc. | `site.ts → address.full 91 Toa Payoh Central, Singapore 319193; uen T08CC4042G; feast Easter Sunday; transport NS19 + B52261; contact 6255 7509/6253 2166/6356 5958; tagline Grateful Faithful Sent; vision He is risen` | ✅ |
| Gate | `lint && typecheck && test && test:e2e && build (+ test:e2e:built)` all green | `pnpm lint 0; pnpm typecheck 0; pnpm test 35/202; pnpm test:e2e 51; pnpm test:e2e:built 51; pnpm build 397.52kB` | ✅ |

**Two guard failures found and fixed in this pass:**

1. `risen-christ_SKILL.md: §0 Routes row` contained literal `#mandarin` (as "`not` `#mandarin`") — `docs-contract.test.ts` correctly enforces that the current-state region never names the legacy anchor (even as a "not"). **Fixed:** rephrased to "`not` the legacy `mandarin` anchor" (hash removed, meaning preserved). *Fossil-sweep lesson: §0's route row is the one place the old anchor's mention is most likely to survive.*
2. `risen-christ_SKILL.md: Quick Reference Card` did not contain the pinned string `35/202 + 51 E2E` (it deferred to §0 per v3's "volatile facts live only in §0" rule, but `docs-contract` requires the Quick Ref to surface the same string so a skimming agent sees the green budget). **Fixed:** added `— 35/202 + 51 E2E` to the Volatile facts Quick Ref row. Post-fix: `pnpm test → 35/202 green` (2 failures → 0).

Both fixes are doc-only and keep code and §0 authoritative.

---

## 1 — Phase A: Inventory & Executable Truth

| # | Check | Evidence | Verdict |
|---|---|---|---|
| A1 | `src/` census | `find src -type f` lists 77 (enumerated — App.tsx, main.tsx, index.css, env.d.ts, 41 source incl. 10 pages + 9 components + 4 utils + 3 hooks + 2 data + site, 35 tests, 1 setup) | ✅ |
| A2 | Pin discipline | `rg '"\^' package.json → 0`; `packageManager pnpm@11.0.0`, `engines node>=20`, `pnpm-lock.yaml` committed, `--frozen-lockfile` in CI | ✅ |
| A3 | Config sync | `vite.config.ts alias @→src (path.resolve(__dirname,"src"))`; `tsconfig.json baseUrl "." + paths @/* → src/* + include [src,vite.config.ts,eslint.config.js,playwright*.ts] + types [node,vitest/globals]` — in sync | ✅ |
| A3b | Lint/test harness | `eslint.config.js ignores [dist,node_modules,coverage,playwright-report,test-results,skills,src.orig]`; `vite.config.ts test {globals,jsdom,setupFiles:src/test/setup.ts,include:src/**/*.{test,spec},exclude:e2e/**}` + `server.watch.ignored [skills,dist,playwright-report,test-results,coverage,src.orig]` | ✅ |
| A4 | `src.orig`/`skills`/`secrets` | `git ls-files src.orig → only docs/validation-src-vs-src.orig.md` (the *report*, not the archived tree); `git ls-files` `skills → 2360` tracked, but tooling ignores keep gate green; `docs/ssh-key.txt` untracked + `.gitignore` + history contains `0be0fe8` (rotation outstanding — App G) | ✅ |

## 2 — Phase B: Volatile Facts Drift Sweep

Grep of every duplicate count against its §0 source:

- `rg "35 files / 202"` → README, AGENTS, CLAUDE, SKILL §0/§2/§11/App C/Quick Ref — all 35/202 (post-fix).
- `rg "51 (tests|E2E)"` → README 51 E2E, AGENTS 51 tests, CLAUDE (51), SKILL §0/contract/Quick Ref — no `48 E2E` or `42 E2E` in contract region (checked by `docs-contract`).
- `rg "397.52"` → README + SKILL §0/§2/§11 + build output — AGENTS/CLAUDE intentionally defer to §0 (checked separately — not a drift).
- `rg "25 colors"` + `rg "terracotta-600 #8f4c30"` → SKILL §0/§4/§19 + README Design System + AGENTS — consistent.
- `rg "#mandarin"` in SKILL contract region → 0 hits post-fix; remaining hits are in Appendix F (labeled lineage) — correct per App G.4.

**Result:** zero unexplained stales post-fix; the two stales that existed are remediated above.

## 3 — Phase C: Routing & Navigation Contract

- **Route table (`src/App.tsx`):** 17 entries verified — `/, /about, /history, /worship (canonical for /mass-times + /hours-location + /visit), /ministries (canonical for /ministry), /news-events (canonical for /news-and-events), /serve (canonical for /volunteer), /give (canonical for /donate), /faq, *` — 7 alias paths in 5 groups, `Layout` outlet, `HashRouter` comment present.
- **`utils/deepLinks.ts`:** `knownRoutePaths` 15 entries (`/, /about, /history, /worship, /mass-times, /hours-location, /visit, /ministries, /ministry, /news-events, /news-and-events, /serve, /volunteer, /give, /donate, /faq`) — drift-guarded by `deepLinks.test.ts` (7 tests) against `App.tsx`; `resolveHashRedirect(pathname,hash)` handles trailing slash, bare `#`, unknown paths → `/#clean` or null, `main.tsx` pre-mount rewrite.
- **Hash anchors:** `Worship.tsx` sections `id="mass" / "confession" / "visit"` with `scroll-mt-28`; `Ministries.tsx` 6 sections `id="liturgical / faith-formation / pastoral-care / family-life / youth / language-communities"` — sixth is `language-communities`, not `mandarin`.
- **Nav single-source:** `nav.ts primaryNav` 6 (Home + About 3 children + Worship 3 + Ministries 3 + News+Events + Serve) with `description` on children; `footerNav` 10 — Header/Footer render from it; all `to` values match route+anchor set.
- **HashRouter discipline:** `Header` dropdown + `Ministries` jump nav use `<Link to="/ministries#id">` (verified `rg "<Link" Ministries.tsx + Header.tsx`); no bare `<a href="#id">` in nav paths (would route to `NotFound` — Anti-Pattern #11).

**Verdict:** ✅ Route count, alias grouping, anchor names, and nav wiring are byte-consistent across `App.tsx` ↔ `nav.ts` ↔ `Worship/ Ministries.tsx` ↔ `deepLinks.ts` ↔ `Layout`.

## 4 — Phase D: Data Layer Contract

- **`site.ts as const`:** 9.4 kB, single-source — `name Church of the Risen Christ`, `shortName Risen Christ Toa Payoh`, `chineseName 耶稣复活堂`, `tagline/vision`, `address{street/city/zip/full+query}`, `hours{ gates/mainChurch/chapel/reception/parishOffice/mediaCentre/adorationRoom }` 7 keys, `mass{ weekdayMorning/weekdayEvening/saturday/sunday[5]/confession/adoration/secondCollection+note+monthly }` 9 keys (incl. `sunday` 5, `note` public-holiday, `monthly` Bahasa/Tamil/Tagalog), `contact{ parishPriest 6255 7509 / office 6253 2166 / media 6356 5958 + 5 emails }`, `transport{ MRT NS19 Exit A + buses 88/157/163 B52261 }`, `feast Easter Sunday`, `uen T08CC4042G`, `chequePayee`, `facebook/instagram/youtube/archdiocese`, `freeMinistry/ssvp/bulletin/cep`, `mapsUrl/mapsEmbedSrc`, `origin/url/ogImage` — no duplication in pages.
- **`content.ts`:** 8 interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem{ Parish|Devotion|Formation|Archdiocese, href? }`, `GivingOption{ icon 8 }`, `Priest{ email?, phone? }`, `PpcMember`) + 10 exports + `images{ hero/heroFallback/chapel/sanctuary/garden/glass/hall/cemetery/feast/naveCdn/courtyardCdn }` 11 all-local. Arrays: `priests 3` (Brian D'Souza, Arun Bellarmin, Dexter Chua), `ppcMembers 7`, `lifeTimeline 8` (1969 Ho Ping → 1971 Olçomendy $450k first air-con → 1970s Velankanni → 2003 four-storey → 2010s Simbang Gabi → 2021 Jubilee → 2023 Fr Brian → 2026 Grateful/Faithful/Sent), `grounds 3` (main-church/chapel/parish-hall), `ministries 6` (ending language-communities), `faqs 6`, `upcomingEvents 6` (Velankanni 54th 10–12 Sep 2026 etc.), `givingOptions 8` (PayNow T08CC4042G etc.), `serveRoles 4 title+summary`, `devotions 6 title+when+where`.
- **Parish fidelity:** `rg -i "Bukit Batok|Portiuncula|T08CC4053H|HRSM.*T08|OFM.*St Mary|stmary.sg"` in `src/data/*` + `src/pages/*` → 0 hits in `src` outside `SKILL` appendices (historical). Old St Mary constants (5 Bukit Batok East Ave 2, UEN T08CC4053H, HRSM, columbarium) absent — `rg "T08CC4053H" src` → 0.
- **Data shape:** `site.test.ts` 8 + `content.test.ts` 10 guard keys/values; `cn.test.ts` 5, `massDay` 5, `monogram` 7, `nav` 7.

**Verdict:** ✅ Canonical facts are exact per `risenchrist.org.sg` (2026) and render without duplication.

## 5 — Phase E: Design System Contract

- **Tokens (`src/index.css @theme`):** 25 colors (`cream #faf6ec · parchment #f2e9d6 · parchment-dark #e7d9b8 · stone #dccfae · ink #2a2115 · charcoal #423a2c · maroon 50 #fbf0ee/100 #f3d9d4/500 #7c2a25/600 #691f1e/700 #55191a/800 #431315/900 #33100f/950 #200a0a · gold 100 #f8ecd2/300 #e2bf72/400 #d1a955/500 #c3963f/600 #a67a2e · pine 500 #335840/600 #26402f/700 #1c3123 · terracotta 400 #c17a53/500 #ab5f3c/600 #8f4c30`) + 2 shadows (`shadow-shrine 0 20px 60px -20px rgba(51,16,15,.45)` · `shadow-shrine-lg 0 40px 90px -30px rgba(51,16,15,.55)`) — no arbitrary `bg-[#…]` outside `@theme` (spot `rg "bg-\[#"` src → 0).
- **Utilities (27) + keyframes (8):** `@layer utilities` — `text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, mask-fade-b, reveal, reveal-visible, rise-in, rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, img-zoom` — plus `gold-rule-draw, hero-ken-burns, rise-in, menu-in, drawer-in, drawer-item-in, page-in, halo-pulse` keyframes + themed scrollbar + `@media print` reveal override + `prefers-reduced-motion` global kill. `wcag-contrast.test.tsx` 5 guards AA for devotion chip terracotta-600 etc.
- **Styling discipline:** All merges via `cn()` (`twMerge(clsx)`); no redundant CSS outside `index.css` `@layer`.

**Verdict:** ✅ Token budget, utility register, and motion contracts are complete and internally consistent.

## 6 — Phase F: Accessibility, SEO & Security Contract

- **`index.html` (head):** `lang="en"`, `viewport`, `description` (Risen Christ 91 Toa Payoh Central, first air-con 1971, Grateful/Faithful/Sent, 5 languages), `favicon /favicon.svg` + `theme-color #200a0a`, `canonical https://www.risenchrist.org.sg/`, OG `type website / title Church of the Risen Christ — Toa Payoh / description / url https://www.risenchrist.org.sg/ / site_name / locale en_SG / image https://www.risenchrist.org.sg/images/hero-church.jpg + alt`, `twitter:card summary_large_image`, `preconnect fonts.googleapis.com`, `Fraunces + Source Sans 3`, `#root` + `Church` JSON-LD (`name Church of the Risen Christ / alternateName [Risen Christ Toa Payoh, 耶稣复活堂] / address 91 Toa Payoh 319193 / telephone +65 6253 2166 / sameAs fb/ig/yt/catholic.sg`) — drift-checked by `head.test.ts` 13.
- **CSP (`index.html` meta):** `default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; frame-src https://www.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'` — `img-src 'self' data: blob:` only (no wikimedia/pexels legacy hosts; all `images.*` local; `SafeImage fallback /images/hero-church.jpg`); `frame-src https://www.google.com` for `site.mapsEmbedSrc`.
- **Host headers (`public/_headers` → `dist/_headers`):** `Strict-Transport-Security max-age=31536000; includeSubDomains; preload` + `X-Content-Type-Options nosniff` + `X-Frame-Options DENY` + `Referrer-Policy strict-origin-when-cross-origin` + `Permissions-Policy camera=()...` — Cloudflare Pages only (`security-headers.test.ts` 6 guards directives; current host `risen-christ.jesspete.shop` is Cloudflare-proxied origin, not Pages — audit H1 carried, ops deploy to Pages or add Transform Rules).
- **A11y components:** `SkipLink` `preventDefault` + imperative focus `#main-content` (never rewrites hash — HashRouter-safe); `Header` fixed `z-50`, `useScrolled(16)` (hook default 12) → `maroon-950/92`+blur when `solid= scrolled||!isHome||mobileOpen`, transparent top Home; top bar `lg` + Give `link-underline`; desktop dropdown hover+focus `menu-in`, `aria-haspopup/aria-expanded`, `aria-current` (plain `"page"`, parent `"true"` when child active); mobile drawer **modal dialog** `role="dialog" + aria-modal="true" + aria-label "Site menu" + tabIndex -1`, panel focused on open, `Tab/Shift+Tab` trap (`handleDrawerKeyDown`), focus restored to hamburger via `drawerWasOpenRef`, outside `pointerdown` closes, `Escape` handler, `h-11 w-11` (44px), drawer `aria-current` parity; layout `key={pathname} page-in` (route change replays, hash-only keeps node). `Reveal` `IntersectionObserver 0.15` + `rootMargin` + try/catch fallback + `prefers-reduced-motion` instant; `Accordion` single-open, `aria-expanded/aria-controls/role=region`, `ArrowDown/Up/Home/End`, `grid grid-rows-[0fr/1fr]` + `aria-hidden inert` closed; `BackToTop` threshold 480, `aria-hidden + tabIndex -1 + pointer-events-none` when hidden, blurs when hiding while focused, progress ring `data-testid back-to-top-progress > circle[data-progress]` `stroke-dashoffset = C*(1-progress)` sharing `useScrollProgress`; `ScrollProgress` decoupled rail `z-[60] h-[3px] scaleX(progress)` `aria-hidden`.
- **Images:** `alt` on content images (`imageAlt` on grounds/ministries), `alt=""` on decorative PageHero overlay; `SafeImage` `fallback default /images/hero-church.jpg`, `loading="lazy"` default, optional `fetchPriority "high"` on heroes, `onError → dataset.fallback` once, `transition-opacity` fade.

**Verdict:** ✅ Head, CSP, host headers, and component a11y contracts are complete and guarded.

## 7 — Phase G: Gates (prove green — don't assume)

```
pnpm lint               → eslint 9.39.5 flat --max-warnings 0 → 0
pnpm typecheck          → tsc --noEmit strict (noUnusedLocals/Params, isolatedModules) → 0
pnpm test               → vitest 3.2.6 jsdom run → 35 files / 202 tests passed (duration 18.88s post-fix)
pnpm test:e2e           → playwright 1.55.1 chromium (webServer vite :5173) → 51 passed (8 specs: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) (1.1m)
pnpm test:e2e:built     → playwright --config=playwright.built.config.ts (vite preview :4173 serving dist/) → 51 passed (52.3s)
pnpm build              → vite 7.3.6 singlefile → dist/index.html 397.52 kB gzip 114.89 kB (Inlining: index-*.js + style-*.css) in 3.38s + dist/_headers + dist/favicon.svg + dist/images/8
```

`docs-contract`, `ci-workflow`, `repo-hygiene`, `head` guards all green. Tri-env E2E previously verified on `66d2398` (round-11 live pass — byte-identical `dist` vs live, 48/48 on dev+dist+live, 43/43 agent-browser journey) — same `playwright.built.config.ts` supports `E2E_BASE_URL` for live.

**Verdict:** ✅ All five canonical gates + the built-artifact sixth gate green on the same commit.

## 8 — Phase H: Docs Alignment & Status

- **`AGENTS.md`:** Stack, commands, structure (35/202 — 51 E2E), quirks (HashRouter, singlefile, alias sync, Tailwind v4, SafeImage, SkipLink, drawer modal, ScrollProgress decoupled, Ministries `<Link to>`, Sacred Motion, BackToTop, Worship today-highlight, Round-5 package, `aria-current`), conventions (routing 17/7/9, data 8 interfaces/11 images, components, styling), Don't list (6), Where to look next (12 refs inc. round-12 remediation). **Status:** pinned 35/202+51, ledger refs present.
- **`CLAUDE.md`:** 18-section + validation checklist (6-phase workflow, project principles, TS strict/Vite 7/React 19/Tailwind CSS-first/component conventions, workflow `lint+typecheck+test(35/202)+test:e2e(51)+test:e2e:built(51)+build(397.52kB)`, testing, quality, git/CI Node 24/pnpm 11, error handling, docs, architecture 41+35+1 tree, design system 25+2/27+8, state/data, env none, a11y/SEO/CSP, anti-patterns, success metrics, integration/skills, continuous improvement). **Status:** 35/202 + 51 + `playwright.built.config.ts` pinned.
- **`README.md`:** Visitor overview, Key Features (8 rows), Architecture (tech stack + routing table 17 + mermaid System Diagram HashRouter → Layout → Pages → data → @theme → Vite → dist → GH Pages/S3), File Hierarchy (41+35+1, 8 images, `_headers`, `favicon.svg`), Current audits (round-6/7/9/11/12 + validation), Quick Start, Verify Setup (35/202 + 51), Design System, Deployment (singlefile + HashRouter rationale), Contributing (six-phase + gate), Troubleshooting, License. **Status:** round-12 ledger refs present.
- **`risen-christ_SKILL.md`:** v3 unified (77-file tree, §0 register, §§1–20, Appendices A–G, Quick Ref) — verified `package 1.4.4 / SKILL 3.0.0 / verified lint0+typecheck0+35/202+51+51+397.52kB`, stack, rendering, data_layer, deploy, unified_from, provenance. **Status:** post-fix, contract region `#mandarin`-free, Quick Ref carries `35/202 + 51 E2E` + `1969–2026 Toa Payoh`, built-artifact + agent-browser eval + live-pass + round-12 rows present; lineage appendices retain history with dated labels.

**Outstanding ops actions (not blockers, ship as-is):**

- **H1** (round-6, carried): host `risen-christ.jesspete.shop` (Cloudflare-proxied origin, not Pages) serves **none** of `public/_headers` (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) — `dist/_headers` is correct for Cloudflare Pages. Deploy `dist/` to Pages, or add the five headers via Cloudflare Transform Rules / origin.
- **C1** (round-6, carried): ssh key leaked in git history (`docs/ssh-key.txt`, commit `0be0fe8`) — working tree is untracked + `.gitignore` + `repo-hygiene` guard, but **history still contains it** — rotate the key (repo owner).

---

## Certification

- **Codebase fidelity:** `src/` matches all documented contracts — routes, data arrays, design tokens, a11y/CSP, and parish facts (1969 Ho Ping → 1971 Olçomendy $450k first air-con → Velankanni/Simbang Gabi, 91 Toa Payoh Central, UEN T08CC4042G, mass 5 Sunday incl. Mandarin 8.15, monthly Bahasa/Tamil/Tagalog) — with no St Mary/Bukit Batok contamination outside labeled history.
- **Doc fidelity:** four docs agree via §0 after the two doc-only fixes in this pass; `docs-contract` 16 pins green.
- **Shippable:** `dist/index.html` singlefile + `dist/images/8` deployable to GH Pages/S3 as-is; `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` + `pnpm test:e2e:built` all green.

*Validator: 2026-09-01 re-audit (plan-based, full 8 phases) — implementation in conversation; manual smoke per Appendix B not re-run live in this session but last live pass (round-11, `66d2398`) was byte-identical and tri-env green; `/opt/skills/markdown-to-html` not needed for this SPA.


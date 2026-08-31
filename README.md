# Church of the Risen Christ

![version 1.4.4](https://img.shields.io/badge/version-1.4.4-33100f)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for Church of the Risen Christ, Toa Payoh** — the first Catholic church in the new town, blessed 3 July 1971 by Archbishop Michel Olçomendy — Singapore's first fully air-conditioned church. At 91 Toa Payoh Central, named for the Resurrection: *He is risen.* Ported from [www.risenchrist.org.sg](https://www.risenchrist.org.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `shrine-*` token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. The new town still gathers a household — Ho Ping Centre in 1969, a $450k nave in 1971, many tongues by the 1970s, a four-storey wing in 2003.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| ☀️ | **Home — He is risen.** | Hero with `hero-ken-burns` + `site.feast`/`site.address` facts (Easter, Toa Payoh NS19, 1971, 6.30 a.m.–5.30 p.m.), welcome (`site.tagline` Grateful, Faithful, and Sent. + `site.vision` He is risen. + Ho Ping 1969 → $450k → first air-con narrative), 3-place grounds preview (`grounds` → Main Church / Adoration Room / Parish Hall & Media Centre), and 4 featured events from `upcomingEvents`. |
| ⛪ | **About — the household** | Parish vision Grateful/Faithful/Sent (3 ghost-numeral pillars), priests (`priests` — 3 with phone+email: Brian D'Souza, Arun Bellarmin, Dexter Chua), and household (`ppcMembers` — 7: 3 priests + Secretariat Peter Quek / Admin Audrey Rozario / Youth Calvin Swee / Pastoral Cheryl-Anne Goh). |
| 📜 | **History — 1969–2026** | 8-entry `lifeTimeline` via `Timeline` — Ho Ping Centre 1969 → first air-con 1971 → many tongues Velankanni 1970s → four-storey 2003 → Filipino/Indonesian/Myanmar + Simbang Gabi 2010s → Golden Jubilee 2021 → Fr Brian 2023 → Grateful/Faithful/Sent 2026. |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekdays 6.30a/6p, Sat 6.30a+5.30p anticipated, 5 Sunday Masses incl. Mandarin 8.15 + note public holidays + monthly Bahasa/Tamil/Tagalog — the card matching today via `massDayKey` carries a gold top rule + "Today" chip), `#confession` (approach priest/office, Adoration Room daily 7–22…, + 6 `devotions`: Adoration daily / Intercessory 2nd&4th Thu 20.00 / Velankanni Sep / Simbang Gabi / Bahasa 1st Fri / Tamil&Tagalog 2nd&4th Sun), `#visit` (address, Reception Mon–Fri 9–16 / Sat 9–12 / Sun 8–13, MRT Toa Payoh NS19 + buses 88/157/163 B52261, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `shrine-cream`/`shrine-parchment` sections from `ministries` (6 ids): Liturgical, Faith Formation (RCIA/F.R.E.E.), Pastoral Care (SSVP), Family Life (CEP), Youth, Language Communities (Mandarin 8.15, Tamil 2nd Sun 19.00, Tagalog 4th Sun 15.00, Bahasa 1st Fri 20.00). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): 54th Velankanni 10–12 Sep 2026, CEP 16 Aug–11 Oct, F.R.E.E. Acts 30 Jun–10 Nov, Sunday Reflections, RCIA, Intercessory Prayer — categories `Parish`/`Devotion`/`Formation`/`Archdiocese`. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical ministers / Catechists & facilitators / Pastoral care / Hospitality & media) with `crc.pastoral@catholic.org.sg`. No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark band (Reception facts from `site.ts`). 8 `givingOptions` (PayNow UEN `T08CC4042G`, weekend collections, cheque to `Church of the Risen Christ`, cash at office, etc. — no HRSM). Alias `/donate`. **FAQ** — 6 questions (Mass times, confession approach priest, how to get there, parking HDB 66/70/73, baptism/marriage/Mass intention, Adoration Room) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

## Architecture

### Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| UI | React | `19.2.8` | Functional components + hooks only |
| Routing | React Router | `7.18.2` | `HashRouter` — 17 `Route` entries (16 content paths + `*` → `NotFound`), 5 alias groups / 7 alias paths, hash anchors `#mass`/`#confession`/`#visit` + 6 ministry ids (`HashRouter` + `Layout` outlet) |
| Build | Vite | `7.3.6` | HMR dev, single-file prod build (+ `@vitejs/plugin-react 5.2.0`) |
| Styling | Tailwind CSS + `@tailwindcss/vite` | `4.3.3` / `4.1.17` | CSS-first `@theme` tokens in `src/index.css` |
| Language | TypeScript | `5.9.3` | `strict` + `noUnusedLocals/Params`, `bundler` mode, `@` alias |
| Icons | lucide-react | `1.34.0` | Header/footer + page iconography |
| Utils | clsx + tailwind-merge | `2.1.1` / `3.6.0` | `cn()` class merging — always merge via `cn()` |
| Bundling | vite-plugin-singlefile | `2.3.3` | Inlines JS+CSS into `dist/index.html` (`public/images/` copied to `dist/images/`) |
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **35 files / 202 tests** (`ci-workflow` 4 + `repo-hygiene` 3 + `docs-contract` 16 + `cn` 5 + `nav` 7 + `content` 10 + `site` 8 + `massDay` 5 + `monogram` 7 + `deepLinks` 7 + `Button` 11 + `SkipLink` 3 + `Accordion` 6 + `SafeImage` 6 + `Header` 17 + `BackToTop` 7 + `Reveal` 2 + `wcag-contrast` 5 + `Ministries` 3 + `cta-bands` 6 + `worship-mass` 6 + `about-visuals` 4 + `event-chips` 3 + `give-featured` 2 + `give-uen` 3 + `card-affordances` 6 + `Timeline` 3 + `NotFound` 2 + `History` 2 + `Layout` 2 + `useScrollProgress` 4 + `useScrollSpy` 6 + `ScrollProgress` 2 + `head` 13 + `security-headers` 6) via `src/test/setup.ts` |
| E2E | Playwright | `1.55.1` | `chromium`, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **8 specs — 51 tests** (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) — Risen Christ (91 Toa Payoh Central, He is risen); built-artifact pass: `pnpm test:e2e:built` (`playwright.built.config.ts` — `vite preview :4173`, `E2E_BASE_URL` → live host) |
| Linting | ESLint flat + typescript-eslint + react-hooks | `9.39.5` / `8.28.0` / `5.2.0` | `eslint . --max-warnings 0`, `eslint.config.js` (ignores `dist`, `skills`, `src.orig`) |
| Fonts | Google Fonts | — | `Fraunces` (display) + `Source Sans 3` (body) via `index.html` |

Versions pinned exact in `package.json` and match `pnpm-lock.yaml` (`--frozen-lockfile` in CI).

**Routing table — `src/App.tsx` (authoritative):**

| Path | Component | Alias / Canonical |
|---|---|---|
| `/` | `Home` | canonical |
| `/about` | `About` | canonical |
| `/history` | `History` | canonical |
| `/worship` | `Worship` | canonical for `/mass-times`, `/hours-location`, `/visit` |
| `/mass-times` | `Worship` | alias → `/worship` |
| `/hours-location` | `Worship` | alias → `/worship` |
| `/visit` | `Worship` | alias → `/worship` |
| `/ministries` | `Ministries` | canonical for `/ministry` |
| `/ministry` | `Ministries` | alias → `/ministries` |
| `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
| `/news-and-events` | `NewsEvents` | alias → `/news-events` |
| `/serve` | `Serve` | canonical for `/volunteer` |
| `/volunteer` | `Serve` | alias → `/serve` |
| `/give` | `Give` | canonical for `/donate` |
| `/donate` | `Give` | alias → `/give` |
| `/faq` | `FAQ` | canonical |
| `*` | `NotFound` | catch-all |

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#language-communities` (Ministries jump nav — `ministries.map → /ministries#<id>`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 3 socials + Free/SSVP/CEP/bulletin + site.ts]
  P --> D[src/data — nav.ts + content.ts (1969–2026 first air-con) + site.ts (91 Toa Payoh Central)]
  H & F & P --> S[Tailwind @theme — src/index.css — shrine-* 25 colors + 2 shadows]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 risen-christ-church/
├── 📄 index.html            # lang, viewport, meta description (Risen Christ 91 Toa Payoh Central), CSP `img-src 'self' data: blob:` only, Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 playwright.built.config.ts  # Playwright vs the built artifact — vite preview :4173 (or E2E_BASE_URL → live host); catches singlefile dev/build divergence (round-9 E2E-L1)
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts, include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:e2e:built / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   ├── 📂 images/           # 8 files: hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local — CDN keys hero/naveCdn/courtyardCdn point to local fallbacks
│   ├── 📄 _headers          # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers — honored only on Cloudflare Pages deploys
│   └── 📄 favicon.svg        # inline SVG favicon → dist/favicon.svg (referenced by index.html `<link rel="icon">`)
├── 📂 src/
│   ├── 📄 App.tsx           # HashRouter + 17 Route entries (16 content paths + * → NotFound; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot
│   ├── 📄 index.css         # @theme shrine-* tokens (24 colors + 2 shadows) + @layer base/utilities (27 utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link + 8 keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed maroon-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (round-4: dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 3 socials (Facebook/Instagram/YouTube) + Free/SSVP/CEP/bulletin/Archdiocese + site.ts address
│   │   ├── 📄 PageHero.tsx  # maroon hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem (crook + wheat)
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # hand-drawn brand glyphs (3 icons)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1969–2026)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   └── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 8 interfaces + images 11 (all local) + priests 3 + ppcMembers 7 + lifeTimeline 8 (1969–2026) + grounds 3 (main-church/chapel/parish-hall) + ministries 6 + faqs 6 + upcomingEvents 6 (Parish/Devotion/Formation/Archdiocese) + givingOptions 8 + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name/shortName/chineseName (耶稣复活堂)/tagline/vision, address 91 Toa Payoh Central 319193, hours (gates/mainChurch/chapel/reception/parishOffice/mediaCentre/adorationRoom), mass (weekdayMorning/weekdayEvening/saturday/sunday×5/confession/adoration/secondCollection + note + monthly), contact (parishPriest/office/media + email/admin/connect/youth/dpo), transport (Toa Payoh NS19 + buses 88/157/163), feast Easter, UEN T08CC4042G, chequePayee, socials, freeMinistry/ssvp/bulletin/cep, mapsUrl/mapsEmbedSrc
│   ├── 📂 utils/
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   ├── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight
│   │   └── 📄 deepLinks.ts  # knownRoutePaths + resolveHashRedirect — path-style deep links rewrite to hash routes pre-mount (round-12, audit F-3) + drift guard
│   └── 📂 **/*.test.{ts,tsx} # 35 files / 202 tests — ported with Risen Christ fixtures (2026-08-31) + round-12 additions + src/test/setup.ts
├── 📂 e2e/                  # 8 specs — 51 tests: smoke.spec.ts (11) + navigation.spec.ts (8) + ministries.spec.ts (4) + give-faq.spec.ts (4) + enhancements.spec.ts (7) + enhancements-round5.spec.ts (6) + enhancements-round7.spec.ts (8) + deep-links.spec.ts (3) — Risen Christ (91 Toa Payoh Central)
│   ├── 📄 smoke.spec.ts     # hero + rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + event chips + back-to-top
│   ├── 📄 navigation.spec.ts# desktop Worship/Ministries dropdown + keyboard + SkipLink + footer 10 links + Give + aria-current
│   ├── 📄 ministries.spec.ts# 6 sections + jump nav + imageAlt
│   ├── 📄 give-faq.spec.ts  # Give 8 options + FAQ accordion + Worship Find Us + maps
│   ├── 📄 enhancements.spec.ts + enhancements-round5.spec.ts # motion/chip/ring/sticky contracts
│   └── 📄 helpers.ts        # gotoHash + expectHash helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11) — guarded by src/ci-workflow.test.ts
├── 📂 docs/
│   ├── 📄 prompts.md        # Intent lineage
│   ├── 📄 validation-src-vs-src.orig-2026-08-30.md # Historical validation (St Mary 10/10 contracts adopted — retained for lineage)
│   ├── 📄 ui-ux-remediation-plan-2026-08-28.md # UI/UX audit + Sacred Motion enhancements (historical — St Mary)
│   ├── 📄 code-review-audit-2026-08-28.md  # Round-2 tiered review (St Mary)
│   ├── 📄 code-review-audit-round3-2026-08-30.md # Round-3 tiered review (St Mary)
│   ├── 📄 remediation-plan-round3-2026-08-30.md # Round-3 TDD remediation plan (St Mary)
│   └── 📄 remediation-round4-2026-08-30.md # Round-4 L-5 closure (mobile drawer → modal dialog — still applies)
│   ├── 📄 UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md # Comparative UI/UX audit of the two parish sites (2026-08-31, markdown reference)
│   ├── 📄 remediation-plan-round12-2026-08-31.md # Round-12 plan — audit findings F-1/F-2/F-3/F-4/F-9 closed TDD-style
│   └── 📄 remediation-round12-2026-08-31.md # Round-12 closure — measured evidence + gate results
├── 📄 src.orig note         # (pruned round-12, audit F-9) The archived St Mary of the Angels port (Rother → St Joseph → St Mary lineage) had remained git-tracked despite `.gitignore` since round 3 — 64 files found and removed 2026-08-31 (`git rm -r --cached` + tree removal); `src/repo-hygiene.test.ts` guard now fails if it re-enters; lineage history lives in `docs/` + git history
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audits — port + 2026-08-28 review + 2026-08-30 `src` vs `src.orig` validation (historical — St Mary) + **2026-08-31 Risen Christ port: lint 0 + typecheck 0 + 35/202 + 51 E2E + 397.52kB green (re-verified post round-12)** + **round-6 tiered review & security audit** (`docs/code-review-audit-round6-2026-08-31.md` — live-site E2E byte-identical to `dist/`, zero console errors; findings + remediation in `docs/remediation-plan-round6-2026-08-31.md`) + **round-7 design enhancement "Honest Light"** (`docs/design-enhancement-round7-2026-08-31.md` — skills-driven visual/UI/UX round: reveal resilience + print override, Worship sticky mercy column, News/FAQ closure bands, Give featured PayNow card, Ministries scrollspy, About list/link affordances, desktop nav gold hairline, `card-tint` info-card honesty, PageHero atmosphere; screenshots in `docs/audit-shots-round7/`) + **round-7 tiered audit** (`docs/code-review-audit-round7-2026-08-31.md` — six-phase audit of the round-7 commits, zero new C/H/M, live == dist md5; TDD remediation in `docs/remediation-plan-round7-2026-08-31.md` — scrollspy document-order tie-break + E2E sleep removal + docs re-pin) + **round-9 built-artifact E2E contract** (`docs/remediation-plan-round9-2026-08-31.md` — first-ever built-artifact E2E run (live host) exposed E2E-L1: dev-form favicon assertion vs singlefile-rewritten `./favicon.svg`; env-agnostic assertion + resolution check + tracked `playwright.built.config.ts` (`pnpm test:e2e:built`); 48/48 on dev + dist + live) + **round-11 live E2E pass** (`docs/e2e-live-pass-round11-2026-08-31.md` — deployed `66d2398` validated: live ≡ dist byte-identical, 48/48 E2E on dev + dist + live, agent-browser journey 43/43, zero console/page errors; E2E-J1 `agent-browser eval` backslash lesson pinned as SKILL pitfall #15) + **round-12 comparative-audit remediation** (`docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md` + `docs/remediation-plan-round12-2026-08-31.md` + `docs/remediation-round12-2026-08-31.md` — the comparative UI/UX audit of the two parish sites, Risen Christ findings closed TDD-style: F-1 Devotion chip retone to `terracotta-600` `#8f4c30` (3.92→5.36:1 AA on parchment), F-2 Worship mass-card footnote `/70`→`/85` (4.16→6.19:1) + event-date tone lock, F-3 path-style deep-link rewrite (`src/utils/deepLinks.ts` + `main.tsx` pre-mount, soft-404 reproduced first; drift guard vs `App.tsx`), F-4 Give section retitled "Ways to give" + copyable UEN row inside the featured PayNow card, F-9 git-tracked `src.orig/` pruned (64 files — `.gitignore` never untracks; `repo-hygiene` guard added)) — 17 route entries / 16 content paths / 5 alias groups (7 paths) / 10 pages; 35 files / 202 tests + 51 E2E green via `src/test/setup.ts` + `e2e/`; singlefile `dist/index.html 397.52kB` + `dist/_headers` + `dist/favicon.svg` + `dist/images/8` (pinned exact, pnpm 11).

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> risen-christ-church && cd risen-christ-church

# 2 — Install (deterministic)
pnpm install --frozen-lockfile
# npm is not a drop-in for these exact pins: typescript-eslint 8.28.0's peer
# range predates TypeScript 5.9, so use `npm ci --legacy-peer-deps` if you
# must use npm (pnpm is the supported path).

# 3 — Run (HMR)
pnpm dev
# → Local: http://localhost:5173

# 4 — Production build (single file + public assets)
pnpm build
# → dist/index.html  JS+CSS inlined; dist/images/ copied from public/

# Preview prod build
pnpm preview
# → http://localhost:4173
```

### Verify Setup

```bash
pnpm lint               # eslint flat — expect no output (clean)
pnpm typecheck         # tsc --noEmit — expect no output (clean)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file, no separate assets chunk
ls -lh dist/images/     # expect: 8 images (hero-church + chapel-interior + sanctuary + rosary-garden + stained-glass + parish-hall + cemetery + feast)
pnpm test               # expect: 35 test files / 202 tests passed
pnpm test:e2e           # expect: 51 passed (chromium)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | 35 files / 202 tests passed (jsdom) via `src/test/setup.ts` |
| `pnpm test:e2e` | 51 passed — smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3 (Risen Christ copy) |
| `pnpm build` | `dist/index.html` exists + `dist/images/` (8 files) |
| `pnpm preview` | Prod preview on `:4173`, alias routes (`/mass-times`, `/ministry`, `/donate`, `/volunteer`…) + hash anchors (`#/worship#mass`, `#/ministries#liturgical`) navigate |

## Design System

Tokens live in `src/index.css` `@theme`. Extend there — never use arbitrary `bg-[#...]`.

| Token | Hex | Usage |
|---|---|---|
| `shrine-cream` | `#faf6ec` | Page background |
| `shrine-parchment` | `#f2e9d6` | Section bands, card fills |
| `shrine-parchment-dark` | `#e7d9b8` | Dark parchment variant |
| `shrine-stone` | `#dccfae` | Borders, dividers |
| `shrine-ink` | `#2a2115` | Primary text |
| `shrine-charcoal` | `#423a2c` | Secondary text |
| `shrine-maroon-50` | `#fbf0ee` | Ghost hover bg |
| `shrine-maroon-500` | `#7c2a25` | Eyebrow, links |
| `shrine-maroon-600` | `#691f1e` | Header icon, secondary button |
| `shrine-maroon-700` | `#55191a` | Display heading |
| `shrine-maroon-800` | `#431315` | Mid-dark maroon |
| `shrine-maroon-900` | `#33100f` | Hero + footer background |
| `shrine-maroon-950` | `#200a0a` | Deepest maroon (header top strip) |
| `shrine-gold-300` | `#e2bf72` | Eyebrow on dark, header accent |
| `shrine-gold-400` | `#d1a955` | Gold mid |
| `shrine-gold-500` | `#c3963f` | Primary button |
| `shrine-gold-600` | `#a67a2e` | Gold hover |
| `shrine-pine-500` | `#335840` | Pine accent |
| `shrine-pine-600` | `#26402f` | Accent / weave |
| `shrine-terracotta-500` | `#ab5f3c` | Devotion chip border (decorative) |
| `shrine-terracotta-600` | `#8f4c30` | Devotion chip text — AA 5.36:1 on parchment (round-12, audit F-1) |
| `shadow-shrine` | `0 20px 60px -20px rgba(51,16,15,.45)` | Hero, cards, emblem |
| `shadow-shrine-lg` | `0 40px 90px -30px rgba(51,16,15,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities: `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left`, `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `hero-ken-burns` (20s Ken Burns), plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`.

## Deployment

Primary artifact `dist/index.html` (+ `dist/images/` — 8 files, + `dist/_headers`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (`img-src 'self' data: blob:` only, `object-src 'none'`, `base-uri 'self'`, Google Fonts, `frame-src` Google Maps) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — **on Cloudflare Pages only**. ⚠️ Verified 2026-08-31 (round-6 audit H1): the current host `risen-christ.jesspete.shop` (Cloudflare-proxied origin, not Pages) serves **none** of these headers. Ops remediation: deploy `dist/` to Cloudflare Pages, or add the five headers via Cloudflare Transform Rules / origin config.

CSP (current `index.html`): `img-src 'self' data: blob:` + `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com` + `object-src 'none'` + `base-uri 'self'` + `frame-src https://www.google.com` + `style-src https://fonts.googleapis.com`; `<meta name="referrer" content="strict-origin-when-cross-origin">`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `shrine-*` tokens only.
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — all five green (verified 2026-08-31: 35 files / 202 unit + 51 E2E; CI mirrors this in `.github/workflows/ci.yml` Node 24/pnpm 11). Sixth built-artifact check (outside the canonical gate): `pnpm test:e2e:built` — 51/51 vs `vite preview`/live (round-9 E2E-L1).

> `skills/` is vendored reference content — pruned in round 3 (2026-08-30) and re-added in full in `0be0fe8` (2026-08-31, catalog + per-skill `SKILL.md` files present again); lint/build tooling ignores it regardless — do not import from or lint it. `src.orig/` was the **archived St Mary of the Angels port** (Rother → St Joseph → St Mary lineage) — discovered still tracked (64 files) by the round-12 comparative-audit remediation (F-9: `.gitignore` listed it but ignore rules do not untrack) and pruned 2026-08-31; the `repo-hygiene` guard prevents re-entry. See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local. |
| `pnpm test` finds 0 tests | Not expected since the 2026-08-31 port — verify `vite.config.ts` `test.include` covers `src/**/*.{test,spec}.{ts,tsx}` and `src/test/setup.ts` exists. |
| `pnpm test:e2e` | 51 passed (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3); run `pnpm test:e2e:ui` to inspect |

## License

Private — all rights reserved. © Church of the Risen Christ, Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`risen-christ_SKILL.md`](risen-christ_SKILL.md) (canonical) · [`st-mary-of-angels_SKILL.md`](st-mary-of-angels_SKILL.md) (redirect stub → risen-christ) · [`rothershrine-v2_SKILL.md`](rothershrine-v2_SKILL.md) (lineage stub) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Live: [www.risenchrist.org.sg](https://www.risenchrist.org.sg/) (canonical parish site)

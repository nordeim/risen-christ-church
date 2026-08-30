# Church of St Mary of the Angels

![version 1.2.0](https://img.shields.io/badge/version-1.2.0-33100f)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for Church of St Mary of the Angels, Bukit Batok** — Franciscan parish since 1970, named for the Portiuncula in Assisi, under the care of the OFM Custody of St Anthony. Feast of Our Lady of the Angels · Portiuncula, 2 August, at 5 Bukit Batok East Ave 2. Ported from [www.stmary.sg](https://www.stmary.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `shrine-*` token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. The hill in Bukit Batok still gathers a household of prayer, formation, and mission — Mandarin at dawn, English through the day, Tamil at Saturday dusk.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| 🏔️ | **Home — According to Thy Word.** | Hero with `hero-ken-burns` + `site.feast`/`site.address` facts (Sunday 7.15 a.m.–7 p.m., Bukit Batok MRT, Portiuncula 2 Aug, Friars OFM), welcome (`site.tagline` + `site.vision`), 3-place grounds preview (`grounds` → Main Church / Adoration Chapel / Garden of Peace & Piazza), and 4 featured events from `upcomingEvents`. |
| ⛪ | **About — the household** | Parish vision Pray·Form·Go (3 ghost-numeral pillars: Prayer / Formation / Mission), friars (`priests` — 4 OFM, monogram-disc cards: Esmond Chua, Julian Mariaratnam, Justin Lim, Robin Toha with emails), and household (`ppcMembers` — 6: 4 friars ex-officio + vision · Custody). |
| 📜 | **History — 1957–2026** | 8-entry `lifeTimeline` via `Timeline` — sociological institute (1957) → hilltop chapel Olçomendy (1958) → Portiuncula parish (1970) → west grows (1985–2003) → WOHA consecration (2004, SIA award) → Design of the Year (2006) → Jubilee monstrance (2025) → Pray·Form·Go (2026, Friar Esmond). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: Main Church weekdays 7/12.15/18.30, Sat 16.00/18.00 + 19.45 Tamil, 6 Sunday Masses incl. Mandarin 7.15 + note — the card matching today via `massDayKey` carries a gold top rule + "Today" chip, Sunday slots render as a gold-dot hover list), `#confession` (weekend Reconciliation 30 min before English Masses 7 slots, Adoration daily 7–21.30, + 6 `devotions`: St Anthony Tue 18.30 / Adoration daily / Reconciliation wknd / Lauds / Deaf Community Sun 16.00 / Portiuncula 2 Aug), `#visit` (address, Reception, MRT Beauty World/Bukit Batok + buses Ave 2/3/4/6, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `shrine-cream`/`shrine-parchment` sections from `ministries` (6 ids): Liturgical (servers/choirs/hospitality), Faith Formation (CGS), Pastoral Care (Poor & Needy UEN HRSM/emergency), Family Life (baptism/marriage), Youth (WYD 2027), Language Communities (Mandarin 7.15, Tamil 19.45, Sinhala, Malayalam, Indonesian). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): First Holy Communion 29 Aug 2026, CGS info, WYD 2027 briefing, Beatitudes retreat, St Francis art exhibition, Franciscan Jubilee Year — categories `Parish`/`Devotion`/`Formation`/`Archdiocese`. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical ministers / Catechists & facilitators / Pastoral care / Hospitality & grounds) with `connect.stmary@catholic.org.sg`. No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — closes with a dark "house of prayer" band (Reception facts from `site.ts`). 8 `givingOptions` (PayNow UEN `T08CC4053H`, Poor & Needy `T08CC4053HRSM`, weekend Tap & Give, Church Maintenance Fund, cheque to `Church of St Mary of the Angels`, cash at Reception, General Church Offering, Mass offerings). Alias `/donate`. **FAQ** — 6 questions (Mass times, confession wknd, how to get there, parking B1/B2, baptism/marriage/Mass intention, columbarium/funeral) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

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
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **25 files / 141 tests** (`cn` 5 + `nav` 7 + `content` 10 + `site` 7 + `massDay` 5 + `monogram` 7 + `Button` 11 + `SkipLink` 3 + `Accordion` 6 + `SafeImage` 6 + `Header` 16 + `BackToTop` 7 + `Ministries` 3 + `cta-bands` 4 + `worship-mass` 4 + `about-visuals` 3 + `event-chips` 3 + `Timeline` 3 + `NotFound` 2 + `History` 2 + `Layout` 2 + `useScrollProgress` 4 + `ScrollProgress` 2 + `head` 13 + `security-headers` 6) via `src/test/setup.ts` |
| E2E | Playwright | `1.55.1` | `chromium`, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **42 tests** (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 9 + enhancements-round5 6) |
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

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#mandarin` (Ministries jump nav — `ministries.map → /ministries#<id>`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms + page-in keyed container]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile modal drawer + Escape]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + 4 socials + site.ts]
  P --> D[src/data — nav.ts + content.ts (priests 4 OFM/ppc 6/1957-2026/WOHA) + site.ts (5 Bukit Batok East Ave 2)]
  H & F & P --> S[Tailwind @theme — src/index.css — shrine-* 24 colors + 2 shadows]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 st-mary-of-angels/
├── 📄 index.html            # lang, viewport, meta description (St Mary 5 Bukit Batok East Ave 2), CSP (legacy allowlist retained, unused — all images local), Google Fonts (Fraunces + Source Sans 3), #root + Church JSON-LD
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src + test {globals, jsdom, setupFiles: src/test/setup.ts, include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**]
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts] + types [node, vitest/globals] + paths @/*
├── 📄 package.json          # scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   └── 📂 images/           # 8 files: hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all local — CDN keys hero/naveCdn/courtyardCdn point to local fallbacks. Sibling `public/_headers` ships Cloudflare Pages security headers (round-3 M-2)
├── 📂 src/
│   ├── 📄 App.tsx           # HashRouter + 17 Route entries (16 content paths + * → NotFound; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot
│   ├── 📄 index.css         # @theme shrine-* tokens (24 colors + 2 shadows) + @layer base/utilities (26 utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, link-underline, skip-link + 8 keyframes)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + ScrollProgress + SkipLink + keyed page-in container
│   │   ├── 📄 Header.tsx    # fixed maroon-950 bar, useScrolled(16), hover/focus-open dropdown (primaryNav; trigger has no click-toggle — keyboard via onFocusCapture), mobile modal drawer (round-4: dialog + aria-modal + focus trap + focus restore; closes on in-drawer link, Escape, outside tap), includes top bar Give link
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + 4 socials (Facebook/Instagram/YouTube/Telegram) + site.ts address
│   │   ├── 📄 PageHero.tsx  # maroon hero primitive (bg-grain + gradients + rise-in)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem (crook + wheat)
│   │   ├── 📄 SafeImage.tsx # local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard, optional fetchPriority)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # hand-drawn brand glyphs (4 icons)
│   │   ├── 📄 Timeline.tsx  # gradient rail + display-serif years + Reveal — renders lifeTimeline (1957–2026)
│   │   ├── 📄 BackToTop.tsx # threshold 480 + SVG progress ring (stroke-dashoffset via useScrollProgress) + reduced-motion
│   │   ├── 📄 ScrollProgress.tsx # fixed gold rail (scaleX progress, aria-hidden, z-[60])
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open, inert), Reveal
│   ├── 📂 hooks/
│   │   ├── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   │   └── 📄 useScrollProgress.ts # 0..1 progress, rAF-throttled, unscrollable guard
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 8 interfaces + images 11 (all local) + priests 4 OFM + ppcMembers 6 + lifeTimeline 8 (1957–2026) + grounds 3 (main-church/chapel/rosary-garden) + ministries 6 + faqs 6 + upcomingEvents 6 (Parish/Devotion/Formation/Archdiocese) + givingOptions 8 + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name/shortName/chineseName ("天神之后圣母堂")/tagline/vision, address 5 Bukit Batok East Ave 2 659918, hours (gates/mainChurch/chapel/reception/parishOffice/columbarium/adorationRoom), mass (weekdayMorning/weekdayEvening/saturday/sunday×6/confession/adoration/secondCollection + note), contact (parishPriest/office/emergency/columbarium + email), transport (Bukit Batok NS2 + Beauty World DT5 + buses Ave 2/3/4/6), feast 2 Aug, UEN T08CC4053H/4053HRSM, chequePayee, socials, mapsUrl/mapsEmbedSrc (Google Maps iframe)
│   ├── 📂 utils/
│   │   ├── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   │   └── 📄 massDay.ts    # massDayKey(date) — single source for the Worship today-highlight
│   ├── 📂 test/
│   │   └── 📄 setup.ts      # vitest jsdom setup (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView stubs + matchMedia stub)
│   └── 📂 **/*.test.{ts,tsx} # 25 files / 141 tests: utils/cn (5), data/nav (7), data/content (10), data/site (7), utils/massDay (5), utils/monogram (7), ui/Button (11), SkipLink (3), ui/Accordion (6), SafeImage (6), Header (16), BackToTop (7), pages/Ministries (3), pages/cta-bands (4), pages/worship-mass (4), pages/about-visuals (3), pages/event-chips (3), components/Timeline (3), pages/NotFound (2), pages/History (2), Layout (2), hooks/useScrollProgress (4), ScrollProgress (2), head (13), security-headers (6)
├── 📂 e2e/                  # 42 tests (Playwright chromium)
│   ├── 📄 smoke.spec.ts     # 11 smoke (hero + rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + drawer same-route close regression + event chips + back-to-top)
│   ├── 📄 navigation.spec.ts# 8 desktop Worship/Ministries dropdown + keyboard + SkipLink + footer 10 links + Give + aria-current nav states
│   ├── 📄 ministries.spec.ts# 4 sections (6 ids) + imageAlt + fallback + jump nav (aria-current pills) + Home grounds → Worship anchors
│   ├── 📄 give-faq.spec.ts  # 4 Give 8 options + FAQ accordion (animated panel visibility) + Worship Find Us + maps + Footer Give
│   └── 📄 helpers.ts        # gotoHash + expectHash helpers
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e (chromium) → build (Node 24, pnpm 11)
├── 📂 docs/
│   ├── 📄 prompts.md        # Intent lineage
│   ├── 📄 validation-src-vs-src.orig-2026-08-30.md # Validation: `src` adopted 10/10 contracts from `src.orig` and improved 7 (no regression, 16/92 +35 E2E green — historical)
│   ├── 📄 ui-ux-remediation-plan-2026-08-28.md # UI/UX audit + Sacred Motion enhancements
│   ├── 📄 code-review-audit-2026-08-28.md  # Round-2 tiered review + security audit
│   ├── 📄 code-review-audit-round3-2026-08-30.md # Round-3 tiered review + security audit (C1/H3/M4/L6/I4 + verification ledger)
│   ├── 📄 remediation-plan-round3-2026-08-30.md # Round-3 TDD remediation plan (cycles + non-goals + success criteria)
│   └── 📄 remediation-round4-2026-08-30.md # Round-4 L-5 closure (mobile drawer → modal dialog w/ focus trap; scroll-rail E2E race made deterministic)
├── 📄 src.orig note         # Archived previous port — St Joseph BT (Rother → St Joseph → St Mary lineage); retained locally, untracked since round-3 (2026-08-30: git rm -r --cached + .gitignore, NOT committed); not linted/built; ignore entries are active guards
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audits — port + 2026-08-28 review + 2026-08-30 `src` vs `src.orig` validation + **2026-08-30 round-3 tiered review & security audit** (`docs/code-review-audit-round3-2026-08-30.md` — CSP/headers hardening, BackToTop focus release, SSH-key/lockfile/src.orig untracking, docs alignment) + **2026-08-30 round-4 L-5 closure** (`docs/remediation-round4-2026-08-30.md` — mobile drawer as modal dialog with focus trap/focus restore/outside-tap close; scroll-rail E2E race root-caused deterministic) + **2026-08-30 round-5 "Light of the Portiuncula" design enhancement** (`docs/design-enhancement-round5-2026-08-30.md` — Worship "today" Mass highlight via `massDayKey`, event category chips, Give closing band, sticky History story column, timeline gradient rail, `.img-zoom` image drift, Button icon nudge, About monogram discs, NotFound emblem warmth) + **2026-08-30 round-5 audit + remediation** (`docs/code-review-audit-round5-2026-08-30.md` / extract `EventMeta`+`monogram`, `LucideIcon` typing — R5-M1/L2/L3): 17 route entries / 16 content paths / 5 alias groups (7 paths) / 10 pages; 25 unit files / 141 tests + 42 E2E green; singlefile `dist/index.html 387.43 kB` + `dist/_headers` + `dist/images/8` (pinned exact, pnpm 11).

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> st-mary-of-angels && cd st-mary-of-angels

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
pnpm test               # vitest jsdom — expect 25 files / 141 passed (cn 5 + nav 7 + content 10 + site 7 + massDay 5 + monogram 7 + Button 11 + SkipLink 3 + Accordion 6 + SafeImage 6 + Header 16 + BackToTop 7 + Ministries 3 + cta-bands 4 + worship-mass 4 + about-visuals 3 + event-chips 3 + Timeline 3 + NotFound 2 + History 2 + Layout 2 + useScrollProgress 4 + ScrollProgress 2 + head 13 + security-headers 6)
pnpm test:e2e           # Playwright chromium — expect 36 passed (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 9)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file, no separate assets chunk
ls -lh dist/images/     # expect: 8 images (hero-church + chapel-interior + sanctuary + rosary-garden + stained-glass + parish-hall + cemetery + feast)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | `24 test files — 134 passed` (cn + nav + content + site + Button + SkipLink + Accordion + SafeImage + Header + BackToTop + Ministries + cta-bands + Layout + useScrollProgress + ScrollProgress + head + security-headers) |
| `pnpm test:e2e` | `36 passed` (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 9, chromium) |
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
| `shrine-terracotta-500` | `#ab5f3c` | Community badge |
| `shadow-shrine` | `0 20px 60px -20px rgba(51,16,15,.45)` | Hero, cards, emblem |
| `shadow-shrine-lg` | `0 40px 90px -30px rgba(51,16,15,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities: `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left`, `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `hero-ken-burns` (20s Ken Burns), plus the "Sacred Motion" set: `rise-in` (+ `rise-in-d1..d4` stagger delays) for hero/PageHero entrances, `menu-in` / `drawer-in` / `drawer-item-in` / `page-in` for dropdown/drawer/route entrances, `card-lift` (hover lift + shadow + gold border) for every interactive card, `link-underline` (gold underline draws in on hover/focus), `dot-pulse` (timeline halo). All are transform/opacity-only and gated by the global `prefers-reduced-motion` block in `src/index.css`.

## Deployment

Primary artifact `dist/index.html` (+ `dist/images/` — 8 files, + `dist/_headers`) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (inline JS/CSS from the singlefile build, Google Fonts, Cloudflare Pages beacon allowance in `script-src`, `object-src 'none'`, `base-uri 'self'`, legacy Wikimedia+Pexels imagery allowlist retained, unused — all `images.*` now local, Google Maps iframe) + a `Referrer-Policy` meta. `public/_headers` adds the host-level headers a static file cannot set (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) on Cloudflare Pages — on other hosts, set HSTS/X-Content-Type-Options at the CDN/host layer.

CSP (current `index.html`): `img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org` (legacy allowlist retained, unused) + `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com` (beacon allowance for the Cloudflare Pages deploy) + `object-src 'none'` + `base-uri 'self'` + `frame-src https://www.google.com` + `style-src https://fonts.googleapis.com`; `<meta name="referrer" content="strict-origin-when-cross-origin">`.

Preview deployment: this repo is also exercised live at `https://st-mary-of-angels.jesspete.shop/` (Cloudflare Pages — verified byte-identical to the local build in the round-3 audit); canonical `og:url`/JSON-LD intentionally remain `https://www.stmary.sg/`.

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
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — all five green (25 unit files / 141 tests + 42 E2E + singlefile build) — CI mirrors this in `.github/workflows/ci.yml` (Node 24, pnpm 11).

> `skills/` is committed-but-pruned vendored reference content — round 3 (2026-08-30) removed the agent-skills index (`skills/skills-catalog.md`) and all per-skill `SKILL.md` files from tracking (full historical tree retrievable at `c774ed9`); lint/build tooling ignores what remains. `src.orig/` is the **archived St Joseph BT port** (Rother → St Joseph → St Mary lineage), retained locally and untracked since round 3 (`.gitignore` active); its ignore entries are active guards. `package-lock.json` and `docs/ssh-key.txt` are also untracked (stale-lockfile drift + secret hygiene — see round-3 audit). See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; current `images.*` are all local but legacy CSP allowlist `upload.wikimedia.org` / `images.pexels.com` is retained, unused. |
| `pnpm test` finds 0 tests | Should list 24 files — `src/test/setup.ts` + `src/**/*.test.*` must exist. Re-add `vite.config.ts` `test` block and `tsconfig.json` `types [vitest/globals]`. |
| `pnpm test:e2e` fails | Check `playwright.config.ts` `baseURL` / `webServer` and stale assertions — specs target `/worship#mass`, `/ministries#liturgical`, `/history`, `5 Bukit Batok East Ave 2`. Run `pnpm test:e2e:ui` to inspect. |

## License

Private — all rights reserved. © Church of St Mary of the Angels, Archdiocese of Singapore. Franciscan parish (OFM Custody of St Anthony). No `LICENSE` file is published.

---

**Docs:** [`st-mary-of-angels_SKILL.md`](st-mary-of-angels_SKILL.md) (canonical) · [`rothershrine-v2_SKILL.md`](rothershrine-v2_SKILL.md) (redirect stub) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · Round-3 audit: [`docs/code-review-audit-round3-2026-08-30.md`](docs/code-review-audit-round3-2026-08-30.md) · **Live:** [www.stmary.sg](https://www.stmary.sg/) (canonical parish site) · preview: [st-mary-of-angels.jesspete.shop](https://st-mary-of-angels.jesspete.shop/)


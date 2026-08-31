---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Church of the Risen Christ — `risen-christ-church`

Port of **https://www.risenchrist.org.sg/** — **Church of the Risen Christ, Toa Payoh, Singapore** — first Catholic church in the new town, blessed 3 July 1971 by Archbishop Michel Olçomendy — Singapore's first fully air-conditioned church (Fr Pierre Abrial, $450k). From Ho Ping Centre Block 82 Lorong 4 in 1969 → tender at Toa Payoh Central / Lorong 4 → consecration 3 July 1971 → many tongues + Velankanni 1970s → four-storey addition 2003 → Filipino/Indonesian/Myanmar household + Simbang Gabi 2010s → Golden Jubilee 2021 → Fr Brian D'Souza 2023 → Grateful, Faithful, and Sent 2026 (54th Velankanni + CEP + F.R.E.E. Acts). Feast of the Risen Christ — Easter Sunday. Static parish site — reverent, editorial, welcoming. No backend, no DB, no SSR.

**Stack:** React 19.2.8 + Vite 7.3.6 + Tailwind CSS 4.3.3 (`@tailwindcss/vite 4.1.17`) + TypeScript 5.9.3 (strict) + React Router 7.18.2 (HashRouter) + `vite-plugin-singlefile 2.3.3` (primary `dist/index.html` + `dist/images/` for GH Pages / S3) + `tailwind-merge 3.6.0` + `clsx 2.1.1` + `lucide-react 1.34.0` + `eslint 9.39.5` flat (`typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0`) + `vitest 3.2.6` (`jsdom 26.1.0`) + `@testing-library/react 16.2.0` + `@testing-library/jest-dom 6.6.3` + `playwright 1.55.1` (chromium) · pnpm 11.0.0 (`packageManager` + `engines node>=20`, `--frozen-lockfile` in CI) · Alias `@` → `src/` · all deps pinned exact — no `^` in `package.json`

> `README.md` is the visitor-facing overview; this file is the authoritative agent onboarding doc. Keep both in sync with `package.json`, `vite.config.ts`, and `tsconfig.json`.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Apply to every non-trivial task. Do not skip VALIDATE.

1. **ANALYZE** — Mine requirements in depth. Surface ambiguities, implicit needs, and trade-offs. Explore 2–3 approaches; assess feasibility and long-term cost.
2. **PLAN** — Produce a sequenced plan with phases, checklists, success criteria, and effort estimate. Present it.
3. **VALIDATE** — Obtain explicit user approval before coding. Address concerns.
4. **IMPLEMENT** — Build modular, tested, documented increments. Use library-first selection. Follow TDD Red→Green→Refactor (one commit per cycle).
5. **VERIFY** — Run typecheck / build / tests. Review against best-practice, security, performance, and WCAG AAA criteria. Cover edge cases.
6. **DELIVER** — Hand off complete solution with usage instructions, runbook, and follow-up recommendations.

### Project-Specific Principles

- **Reverent, not austere** — warm parchment/maroon/gold palette, editorial typography (Fraunces / Source Sans 3), ample whitespace. Every page is a welcome from Toa Payoh Central — English from dawn to evening, Mandarin at 8.15 a.m., Tamil/Tagalog/Bahasa by the month — not a brochure.
- **Parish fidelity** — Singapore content is canonical. Keep dates, place names, and liturgical facts exact: 1969 Ho Ping Centre Block 82 Lorong 4 + tender at Toa Payoh Central, 1971 Olçomendy blessing 3 July first air-con $450k (Fr Pierre Abrial), 1970s English/Mandarin/Tamil + Velankanni + childcare/tuition, 2003 four-storey classrooms/youth/auditorium, 2010s Filipino/Indonesian/Myanmar + Simbang Gabi + Bahasa 1st Fri 20.00 / Tamil 2nd Sun 19.00 / Tagalog 4th Sun 15.00 / Mandarin Sun 8.15, 2021 Golden Jubilee, 2023 Fr Brian D'Souza, 2026 Grateful/Faithful/Sent (Velankanni 54th + CEP + F.R.E.E. Acts), 91 Toa Payoh Central Singapore 319193, Toa Payoh NS19 Exit A + buses 88/157/163 B52261, The Risen Christ — Easter Sunday, UEN T08CC4042G. Do not reintroduce St Mary of the Angels / Bukit Batok / 5 Bukit Batok East Ave 2 / Portiuncula / OFM Custody / WOHA / Garden of Peace narratives — those belonged to the archived St Mary port (`src.orig/`, pruned round-12; lineage history in git history + Appendix lineage docs).
- **Single-file deployability** — Must remain a standalone artifact (`index.html` + `dist/images/`) shippable to GitHub Pages or S3. No SSR, no server.
- **Accessibility is doctrinal** — WCAG AAA intent: keyboard-navigable header, color contrast over texture, meaningful alt text, `SkipLink` hash discipline under `HashRouter`, reduced-motion respect.
- **Static-first data** — Parish content lives in `src/data/content.ts` and canonical facts in `src/data/site.ts` with nav in `src/data/nav.ts`; no CMS or API until explicitly requested. Pages render from data — do not inline copy that belongs in `data/`.

## Implementation Standards

### General Coding Practices

- **Early returns** over deeply nested conditionals.
- **Composition over inheritance.** Small, focused components.
- **Self-documenting code.** Intentional names; comments explain _why_, not _what_.
- **TDD where logic exists.** Write a failing test before fixing a bug or adding a pure function.
- **No `any`.** Prefer `unknown` + narrowing. Lean on inference; add explicit return types only at public boundaries.
- **Prefer `interface` for shapes, `type` for unions/intersections.**
- **Library discipline:** Use existing primitives (Radix/shadcn if adopted); do not rebuild `Dialog`/`Dropdown` from scratch.
- **Handle all UI states:** `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.

### Language & Framework Guidelines

#### TypeScript Strict (`tsconfig.json`)

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`, `isolatedModules: true`, `noEmit: true`, `skipLibCheck: true`.
- `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `target: ES2020`, `lib: [ES2020, DOM, DOM.Iterable]`.
- Path alias: `@/*` → `src/*` (`baseUrl: "."` + `paths: { "@/*": ["src/*"] }` mirrored in `vite.config.ts` via `path.resolve(__dirname, "src")`). Always import via `@/` for cross-directory imports. Keep both files in sync.
- `types: ["node", "vitest/globals"]` — required for `describe/it/expect` globals in `src/**/*.test.*` (when tests are ported).
- Include is `["src", "vite.config.ts", "eslint.config.js", "playwright.config.ts", "playwright.built.config.ts"]` (so `eslint.config.js` + `playwright.config.ts` + `playwright.built.config.ts` are type-checked). Add future config files to `include` only if they should be type-checked.
- Unused locals/params will fail the type gate — clean before commit.

#### Vite 7 Specific

- Plugins: `@vitejs/plugin-react 5.2.0` + `@tailwindcss/vite 4.1.17` + `vite-plugin-singlefile 2.3.3`. Order matters — keep as configured.
- HMR enabled by default; do not add a separate dev server abstraction.
- **Env vars:** `VITE_*` prefix for client-exposed vars. Access via `import.meta.env.VITE_*`.
- Import alias configured in `vite.config.ts` via `path.resolve(__dirname, "src")`. Keep `tsconfig.json` `paths` + `baseUrl` in sync.
- Build is single-file: `viteSingleFile()` inlines JS+CSS (not `publicDir`). Avoid dynamic `import()` that assumes code-splitting unless you remove the plugin intentionally. `public/images/` is copied verbatim to `dist/images/` — upload both `dist/index.html` + `dist/images/` on deploy.
- `test` in `vite.config.ts` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` — keeps `e2e/**` out of unit runs. **Note:** `src/test/setup.ts` exists (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView stubs + matchMedia stub, with Risen Christ fixtures) — `pnpm test` runs the 35 files / 202 unit suite.
- `server.watch.ignored: ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"]` — prevents `ENOSPC` from the vendored `skills/` tree (large `.venv`); the `src.orig/` entry is an inert guard since round-12 pruned the directory (audit F-9).

#### React 19 + React Router 7

- Functional components only; hooks for all state/effects. No class components.
- **Routing:** `HashRouter` is intentional at `src/App.tsx` with `Layout` outlet — static hosts (GH Pages / S3) have no SPA fallback; deep links are `/#/worship`, `/#/ministries#liturgical`, etc. Do not switch to `BrowserRouter` without adding a `404.html` redirect. Keep routing declarative in `App.tsx`; do not scatter `createBrowserRouter` elsewhere.
- **Route table (authoritative — 17 entries: 16 content paths + `*` NotFound, 5 alias groups / 7 alias paths, 10 page components):**

  | path | component | role |
  |------|-----------|------|
  | `/` | `Home` | canonical |
  | `/about` | `About` | canonical |
  | `/history` | `History` | canonical |
  | `/worship` | `Worship` | canonical for `/mass-times` + `/hours-location` + `/visit` |
  | `/mass-times` | `Worship` | `aliasOf: /worship` |
  | `/hours-location` | `Worship` | `aliasOf: /worship` |
  | `/visit` | `Worship` | `aliasOf: /worship` |
  | `/ministries` | `Ministries` | canonical for `/ministry` |
  | `/ministry` | `Ministries` | `aliasOf: /ministries` |
  | `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
  | `/news-and-events` | `NewsEvents` | `aliasOf: /news-events` |
  | `/serve` | `Serve` | canonical for `/volunteer` |
  | `/volunteer` | `Serve` | `aliasOf: /serve` |
  | `/give` | `Give` | canonical for `/donate` |
  | `/donate` | `Give` | `aliasOf: /give` |
  | `/faq` | `FAQ` | canonical |
  | `*` | `NotFound` | catch-all — "This path does not lead to the church." |

  Preserve alias routes — bookmarks and printed material depend on them. When adding a canonical path, keep `aliasOf` → canonical pairs in `App.tsx` and update `src/data/nav.ts` accordingly.

- **Hash anchors (Layout double-hash aware):**

  | route | ids | nav |
  |-------|-----|-----|
  | `/worship` | `mass`, `confession`, `visit` | `primaryNav` Worship dropdown + `footerNav` + page sections (`scroll-mt-28`) |
  | `/ministries` | `liturgical`, `faith-formation`, `pastoral-care`, `family-life`, `youth`, `language-communities` | `Ministries` jump nav (`<Link to="/ministries#id">` → 6 pill links, `aria-label="Jump to ministry"`) |
  | `/serve` | _none_ | `serveRoles`/`devotions` rendered without section ids |

  `Worship` anchors and `Ministries` ids both scroll with `Layout`'s `useEffect` (`setTimeout 80ms` + `scrollIntoView`).

- **Layout behavior:** `Layout.tsx` handles double-hash scroll (`window.location.hash` split on `#` + strip `/`) + `80ms` timeout + fallback `window.scrollTo({ top: 0 })`. `Header` + `Ministries` jump nav must use `<Link to="/path#id">`, never plain `<a href="#id">` (which would replace the hash and route to `NotFound` under `HashRouter`). Layout also wraps outlet in a keyed `page-in` container (`data-testid="page-container"` + `data-route`) so route changes replay entrance while hash-only updates keep the node.

- **Navigation single source:** `primaryNav: NavItem[]` (6 — `Home`, `About` with 3 children + `description`, `Worship` with 3 children + `description`, `Ministries` with 3 children + `description` — descriptions are Risen Christ wording: "Priests, household, and a people of the Resurrection" / "From Ho Ping Centre in 1969 to the church of 1971" / "Weekday, weekend, and language Masses" etc., `News & Events`, `Serve`) and `footerNav: NavLink[]` (10) in `src/data/nav.ts`. Update nav there; `Header`/`Footer` render from it.

- Colocation: `components/` for layout primitives, `pages/` for route components, `data/` for typed content, `utils/` for pure helpers (`cn`), `hooks/` for `useScrolled` + `useScrollProgress` + `useScrollSpy` (round-7).
- Custom hooks → `src/hooks/` when extracted (currently `useScrolled` threshold 12 default / `Header` passes 16 + `useScrollProgress` rAF-throttled 0..1 + `useScrollSpy` viewport-middle-band IntersectionObserver for the Ministries jump nav, round-7).
- Server state (future): TanStack Query; global client state: Zustand. Neither is installed yet — add only when traversal proves need.
- Handle all UI states where data is async or conditional: `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.
- Use library primitives when available (no UI library locked in yet; `shadcn/ui` with Radix is the intended direction per project instructions).

#### Tailwind CSS v4 — CSS-First `@theme`

- Tokens live in `src/index.css` `@theme` block. Extend there; do not introduce arbitrary `bg-[#...]` values.
- Palette: `shrine-cream / parchment(+dark) / stone / ink / charcoal / maroon-{50,100,500,600,700,800,900,950} / gold-{100,300,400,500,600} / pine-{500,600,700} / terracotta-{400,500,600}` plus `shadow-shrine/shrine-lg` (25 colors + 2 shadows). Use semantic names (`shrine-maroon-600`) not hex. `terracotta-600` (#8f4c30) is the AA text-bearing step (round-12, audit F-1) — chip labels and other 10–14 px text on parchment must compute ≥ 4.5:1 (contract: `src/components/wcag-contrast.test.tsx`).
- Display = `Fraunces`, body = `Source Sans 3`; heading styles set on `h1–h4, .font-display`. Google Fonts loaded in `index.html` — add weights only with purpose. CSP in `index.html` whitelists `fonts.googleapis.com`/`fonts.gstatic.com` + `google.com` for the maps iframe (no `upload.wikimedia.org`/`images.pexels.com` — removed for Risen Christ, all `images.*` are local).
- Utilities (27): `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `divider-weave-thin`, `gold-rule`/`gold-rule-left`, `hero-ken-burns`, `mask-fade-b`, `reveal`+`reveal-visible`, `rise-in`+`rise-in-d1..d4`, `menu-in`, `drawer-in`, `drawer-item-in`, `page-in`, `dot-pulse`, `card-lift`, `card-tint` (round-7 info-card hover tint — lift stays on interactive cards), `link-underline`, `skip-link` + 8 keyframes `gold-rule-draw`/`hero-ken-burns`/`rise-in`/`menu-in`/`drawer-in`/`drawer-item-in`/`page-in`/`halo-pulse` + themed scrollbar (maroon thumb on parchment track, webkit + `scrollbar-color`). Document new utilities alongside them.
- Mobile-first, responsive (`sm:` / `lg:`), and dark-mode tolerant even though the parish theme is light-first.

#### Component Conventions

- `Button` (`components/ui/Button.tsx`): discriminated `to`/`href`/native `button` + `icon`; variants `primary|secondary|ghost|outline-light` via `variantClasses` record and `cn()` merge + `active` press feedback (`active:translate-y-0 active:scale-[0.98]`). Use `to` for internal navigation, `href` for external. Keep variant styles centralized there.
- `Container` (`components/ui/Container.tsx`): `max-w-7xl mx-auto px-5 sm:px-8`. All sections should wrap in `Container`.
- `SectionHeading` (`components/ui/SectionHeading.tsx`): `eyebrow? / title / description` with `align` and `light` props + `gold-rule` line.
- `PageHero` (`components/PageHero.tsx`): `maroon-950` hero with low-opacity image (`alt=""`), dual gradient overlays + `bg-grain` + `rise-in` staged content; accepts `compact?` + `children` slot. Used by most pages; above-the-fold heroes use `fetchPriority="high"`.
- `Header` (`components/Header.tsx`): fixed + `useScrolled(16)` (hook default 12 — intentional mismatch to delay transparent→solid on Home) → `maroon-950/92` translucent + blur; transparent at the top of Home. Solid when `scrolled || !isHome || mobileOpen`. Top bar (`lg` only) shows `site.address.street · site.feast.name · site.feast.date` + `Give` link-underline. Desktop dropdown opens on hover + focus (`openDesktopMenu`, `menu-in` entrance; the trigger button has no click-toggle — keyboard/touch users get it through `onFocusCapture`, so document it as hover/focus-open, closes on child-link click via `onClickCapture`), mobile drawer (`drawer-in` entrance + `drawer-item-in` 40ms stagger) is a **modal dialog** (round-4 L-5: `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"` + `tabIndex={-1}` panel focused on open, `Tab`/`Shift+Tab` focus-trap via `handleDrawerKeyDown`, focus restored to the hamburger on every close path via `drawerWasOpenRef`, outside `pointerdown` closes), whose drawer closes on any in-drawer link activation (`onClickCapture` on drawer `<nav>` — a link to the current route never changes `pathname`, so the pathname effect alone cannot close it), and `Escape` handler to close menus/drawer. Parent links carry `aria-current="page"`/`"true"` when a child route is active (e.g. `/history` → About parent current); hamburger is `h-11 w-11` (44px). `ScrollProgress` is **not** inside Header — it is decoupled and rendered by `Layout` as a fixed `h-[3px]` rail at `z-[60]`.
- `ScrollProgress` (`components/ScrollProgress.tsx`): fixed `h-[3px]` rail at `z-[60]` (`data-testid="scroll-progress"`, `aria-hidden`, `scaleX(progress)` transform-only, gradient `shrine-gold-500→300→500`). Rendered by `Layout`, not by `Header`.
- `Footer` (`components/Footer.tsx`): 4-col (`Explore` + `Get involved` from `footerNav` split + parish/visit/contact blocks), `divider-weave-thin`, and consumes `site.ts` + `nav.ts`. Copy is Risen Christ-specific (first air-con 1971, Toa Payoh new town, Velankanni, Simbang Gabi, Tagalog/Bahasa). 3 social icons loop (Facebook/Instagram/YouTube) + `free.risenchrist.org.sg` + `ssvp.risenchrist.org.sg` + `cep-sg.org` + `bulletin` FlipHTML5 + Archdiocese links from `site.ts`; address `91 Toa Payoh Central`; Reception hours Mon–Fri 9–16 / Sat 9–12 / Sun 8–13; phone `6253 2166` / media `6356 5958`; copyright. Tagline line: "A parish since 1971, named for the Resurrection — grateful, faithful, and sent."
- `SafeImage` (`components/SafeImage.tsx`): wraps `<img>` with `fallback` default `/images/hero-church.jpg`, `loading="lazy"` default plus `useState` for `current`/`loaded`, optional `fetchPriority` (`"high"` on above-the-fold heroes — Home hero + PageHero), `onError` → `dataset.fallback="1"` guard (swap `src` once), and `transition-opacity` fade-in. All current `images.*` are local (`hero`/`heroFallback`/`chapel`/`sanctuary`/…); CDN keys `naveCdn`/`courtyardCdn` now point to local fallbacks. Use `SafeImage` for any future external image; don't use bare `<img>` for CDN sources.
- `SkipLink` (`components/SkipLink.tsx`): `href="#main-content"` but `preventDefault`s and imperatively focuses `#main-content` (`<main>` in `Layout`) — a native jump would rewrite the hash and route to `NotFound` under `HashRouter`. Preserve this pattern.
- `Reveal` (`components/ui/Reveal.tsx`): `delay`/`as` + `IntersectionObserver` (`0.15` threshold), `reveal` → `reveal-visible` with `prefers-reduced-motion` fallback.
- `Accordion` (`components/ui/Accordion.tsx`): single-open, `aria-expanded`/`aria-controls`, keyboard `ArrowDown`/`ArrowUp`/`Home`/`End`, animated `grid-template-rows 0fr→1fr` collapse. Closed panels carry `aria-hidden="true"` + `inert` (open: `aria-hidden` undefined + `inert` undefined/false) so screen readers/keyboard skip them; `aria-expanded` on the button is the single source of truth. Testing Library note: `aria-hidden`/`hidden` elements need `{ hidden: true }` queries.
- `BackToTop` (`components/BackToTop.tsx`, mounted in `Layout` before `<Footer>`): appears when `window.scrollY > 480`, hides below (`aria-hidden` + `tabIndex -1` + `pointer-events-none` when hidden — a11y-tree queries need `data-testid="back-to-top"`; it also **blurs itself when hiding while focused** so focus never rests inside an `aria-hidden` subtree — round-3 L-4), click → `window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth' })`. Never touches the hash (HashRouter-safe). Carries a progress ring (`data-testid="back-to-top-progress"` + inner `circle[data-progress]`) whose `stroke-dashoffset` fills with `useScrollProgress` (shared source with `ScrollProgress` rail). `src/test/setup.ts` stubs `window.matchMedia` when tests are ported.
- `cn` (`utils/cn.ts`): `twMerge(clsx(...))` — always merge classes through `cn()`.

## Development Workflow

### Environment Setup

```bash
# Node 20+ required (Vite 7.3.6). pnpm is the supported package manager.
pnpm install --frozen-lockfile  # deterministic (versions pinned exact in package.json)
# npm is not drop-in for these pins (typescript-eslint 8.28.0 peer predates TS 5.9):
# use `npm ci --legacy-peer-deps` if you must; pnpm is the supported path.
cp .env.example .env.local 2>/dev/null || true  # no env vars required yet
pnpm dev              # http://localhost:5173
```

No backend, no DB, no `.env` contract yet. If env vars are added, document them in "Environment Variables" below. `skills/` is committed-but-pruned vendored reference content (round 3 removed `skills-catalog.md` + all `SKILL.md` files; full tree retrievable at `c774ed9`) — not project source; `eslint.config.js` ignores it and `tsconfig` excludes it. Do not import from it.

### Build Commands

| Command | Purpose | Verified | Notes |
|---------|---------|----------|-------|
| `pnpm dev` / `npm run dev` | Vite dev server with HMR (default http://localhost:5173) | ✅ in `package.json` |  |
| `pnpm build` / `npm run build` | Production single-file build (`vite build` + `viteSingleFile`) → `dist/index.html` + `dist/images/` | ✅ | `viteSingleFile` inlines JS+CSS only; `publicDir` is copied verbatim — upload both `dist/index.html` + `dist/images/` |
| `pnpm preview` / `npm run preview` | Preview `dist` build locally | ✅ | |
| `pnpm typecheck` / `npm run typecheck` | Type gate `tsc --noEmit` | ✅ | **Run before every push.** Strict flags will fail on unused locals/params. |
| `pnpm lint` / `npm run lint` | ESLint flat `eslint . --max-warnings 0` (`eslint.config.js`) | ✅ | Ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig` |
| `pnpm lint:fix` / `npm run lint:fix` | ESLint auto-fix (`eslint . --fix`) | ✅ | |
| `pnpm test` / `npm run test` | Vitest `jsdom` — `vitest run` | ✅ | **35 files / 202 tests** (`ci-workflow` 4 + `repo-hygiene` 3 + `docs-contract` 16 + `cn` 5 + `nav` 7 + `content` 10 + `site` 8 + `massDay` 5 + `monogram` 7 + `deepLinks` 7 + `Button` 11 + `SkipLink` 3 + `Accordion` 6 + `SafeImage` 6 + `Header` 17 + `BackToTop` 7 + `Reveal` 2 + `wcag-contrast` 5 + `Ministries` 3 + `cta-bands` 6 + `worship-mass` 6 + `about-visuals` 4 + `event-chips` 3 + `give-featured` 2 + `give-uen` 3 + `card-affordances` 6 + `Timeline` 3 + `NotFound` 2 + `History` 2 + `Layout` 2 + `useScrollProgress` 4 + `useScrollSpy` 6 + `ScrollProgress` 2 + `head` 13 + `security-headers` 6) via `src/test/setup.ts` |
| `pnpm test:watch` | Vitest watch mode (`vitest`) | ✅ | Watches 28 files |
| `pnpm test:coverage` | Vitest with coverage (`vitest run --coverage`) | ✅ | Coverage via `@vitest/coverage-v8` |
| `pnpm test:e2e` / `npm run test:e2e` | Playwright `chromium` — `playwright test` (8 specs — 51 tests: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) | ✅ | Risen Christ copy (91 Toa Payoh Central, He is risen, Velankanni, Toa Payoh NS19) |
| `pnpm test:e2e:built` | Playwright vs the **built artifact** — `playwright test --config=playwright.built.config.ts` (`vite preview :4173` serving `dist/`; set `E2E_BASE_URL` to target the live host instead — webServer is skipped) | ✅ | Catches dev/build divergence the dev-server pass cannot see (round-9 E2E-L1: singlefile rewrites `/favicon.svg` → `./favicon.svg`); same 51 tests green on dev + dist + live |
| `pnpm test:e2e:ui` | Playwright UI mode (`playwright test --ui`) | ✅ | |
| `pnpm test:e2e:report` | Open last Playwright HTML report (`playwright show-report`) | ✅ | |
| `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | **Pre-push gate — all five must be green** | ✅ | Mirrored in CI (`.github/workflows/ci.yml`): lint → typecheck → test → test:e2e → build + artifacts |

> Before documenting a command as available, verify it in `package.json` scripts. The five-command gate is fully active (unit 35 files / 202 tests + 51 E2E green since the 2026-08-31 port; round-12 re-pin).

### Adding Tooling

Tooling is already wired (`eslint 9.39.5` flat + `vitest 3.2.6` + `@testing-library/react 16.2.0` + `playwright 1.55.1`). When adding new tooling, verify `package.json` scripts and update this table. Previous bootstrap (for reference):

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test && npx playwright install chromium
```

## Testing Strategy

Current status: **wired — 35 files / 202 tests + 51 E2E green (2026-08-31, round-12).** `vitest 3.2.6` (jsdom) + `@testing-library/react 16.2.0` + `jsdom 26.1.0` + `src/test/setup.ts` (jest-dom + IntersectionObserver + scrollTo/scrollIntoView + matchMedia) + `playwright 1.55.1` (chromium, 8 specs: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3). Run `pnpm test` (unit), `pnpm test:watch` (watch), `pnpm test:coverage` (coverage), `pnpm test:e2e` (E2E, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort` with `reuseExistingServer: !CI`), `pnpm test:e2e:built` (built-artifact pass via `playwright.built.config.ts` — `vite preview :4173` serving `dist/`; `E2E_BASE_URL` retargets to the live host and skips the webServer), `pnpm test:e2e:ui` (UI mode), `pnpm test:e2e:report` (HTML report). `vitest` config lives in `vite.config.ts` `test` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` + `server.watch.ignored` for `skills`/`dist`/`coverage`/`src.orig` (the src.orig entry is an inert guard — the archived St Mary port was pruned in round-12, audit F-9).

Coverage — **historical (St Mary, `src.orig` — 25 files / 141):** `utils/cn` (5), `data/nav` (7), `data/content` (10: lifeTimeline 8 1957–2026, grounds 3, ministries 6, faqs 6, upcomingEvents 6, givingOptions 8, priests 4 OFM, ppcMembers 6, images 11, etc.), `data/site` (7), `utils/massDay` (5), `utils/monogram` (7), `ui/Button` (11), `SkipLink` (3), `ui/Accordion` (6), `SafeImage` (6), `Header` (16), `BackToTop` (7), `pages/Ministries` (3), `pages/cta-bands` (4), `pages/worship-mass` (4), `pages/about-visuals` (3), `pages/event-chips` (3), `components/Timeline` (3), `pages/NotFound` (2), `pages/History` (2), `Layout` (2), `hooks/useScrollProgress` (4), `ScrollProgress` (2), `head` (13), `security-headers` (6) via `src/test/setup.ts`. **Porting checklist for Risen Christ:** update `lifeTimeline` 1969–2026 assertions, `priests` 3 (not 4 OFM), `ppcMembers` 7, `grounds` parish-hall (not rosary-garden), `faqs`/`events` Risen Christ copy, `site` 91 Toa Payoh Central + UEN T08CC4042G + `mediaCentre` + `monthly` + `free/ssvp/bulletin/cep`, `transport` NS19 + 88/157/163, `hours` 6 keys (no `columbarium`), `mass` 6.30a/6p + Sat 5.30 + Sun 5 + `monthly`, `e2e` smoke/navigation/ministries/give-faq hashes for `/worship#mass` etc. with new copy.

**E2E (St Mary historical — 6 specs / 42):** smoke 11, navigation 8, ministries 4, give-faq 4, enhancements 9, enhancements-round5 6. Risen Christ port must re-assert `91 Toa Payoh Central`, `He is risen`, `Grateful, Faithful, and Sent`, `Velankanni 10–12 Sep`, `F.R.E.E.`, `CEP`, `Adoration Room Mon 12–22 …` etc., not `5 Bukit Batok East Ave 2` / `Portiuncula`.

Conventions: `*.test.tsx` adjacent to source, `__mocks__` only when isolating `react-router-dom`, and `src/data/content.ts` factories for fixtures. `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### When to Add More Tests (beyond the rewrite)

- Port `src.orig` pure-helper tests first (`cn`, `massDay`, `monogram`, `nav`, `content`, `site`) with Risen Christ fixtures — highest value, lowest churn.
- Routing contract — `App.tsx` alias routes + hash anchors integration — covered by `e2e/smoke.spec.ts` + `e2e/navigation.spec.ts` for Risen Christ paths (ported 2026-08-31).
- Critical journeys — expand `e2e/` beyond smoke: devotion flows, map embed (`91 Toa Payoh Central`), Adoration Room hours, Media Centre, language Masses, SSVP/CEP/F.R.E.E. links.
- Visual / a11y — add `axe` scan + `playwright` trace/video (already `on-first-retry`).

## Code Quality Standards

### Linting & Formatting (wired)

`eslint 9.39.5` flat config (`eslint.config.js`) — `typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0` (ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig`). Run `pnpm lint` (`eslint . --max-warnings 0`) and `pnpm lint:fix` (`eslint . --fix`) for auto-fix.

Gate for pre-ship (all five steps active):

```bash
pnpm lint               # eslint flat — no warnings
pnpm typecheck          # tsc --noEmit
pnpm test               # vitest run — 35 files / 202 tests
pnpm test:e2e           # playwright chromium — 51 tests
pnpm test:e2e:built     # playwright vs built artifact (vite preview :4173; E2E_BASE_URL → live) — 51 tests
pnpm build              # vite build — singlefile inlines correctly
```

### Type Safety

- No `any`; `as any` is a last resort with a `// ponytail:` ceiling comment.
- `unknown` + narrowing at trust boundaries (URL params, external JSON).
- Keep `tsconfig.json` strict flags on; do not relax to silence errors.
- Prefer `interface` for shapes, `type` for unions/intersections. `EventItem.category` is a string union (`Parish|Devotion|Formation|Archdiocese`); `GivingOption.icon` is a union of 8 icon names (`flame|church|sprout|heart|book|hand-heart|landmark|globe`); `Priest` has `email?: string` + `phone?: string` + `role` (not `phone` alone); `serveRoles` items have `title` + `summary` (not `description`).

### Styling Discipline

- Use existing `shrine-*` tokens before introducing new colors. Tokens 24+2 shadows are the budget — frame Toa Payoh 1971/Adoration/Media Centre imagery with them, don't add arbitrary `bg-[#...]`.
- No redundant CSS: extend `@theme` or add a named `@utility`; do not duplicate utilities across components.
- Keep bespoke CSS to `src/index.css` `@layer` blocks. Document new utilities (`text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `gold-rule`, `hero-ken-burns`, `rise-in`+`-d1..d4`, `menu-in`, `drawer-in`, `dot-pulse`, `card-lift`, `link-underline`, `reveal`, `skip-link`, `mask-fade-b`, `page-in`, etc.) alongside them.

## Git & Version Control

### Branching

- `main` is the deploy branch (single-file artifact).
- Feature branches: `feat/<slug>`, fixes: `fix/<slug>`, docs: `docs/<slug>`. Short-lived (1–3 days), rebase or squash-merge.
- Do not commit `node_modules/`, `.next/`, `dist/`. `skills/` **is committed but pruned** (round 3, 2026-08-30: the 873-file skeleton without `SKILL.md` contents or `skills-catalog.md`; full historical tree at `c774ed9`) — do not import or lint it; `eslint.config.js` ignores and `vite.config.ts` `server.watch.ignored` excludes it. **`src.orig/` is the archived St Mary of the Angels port** (Rother Shrine → St Joseph BT → St Mary of the Angels, retained locally, untracked since round 3 — `git rm -r --cached` + `.gitignore` active — NOT committed, NOT linted/built); its `eslint` + `vite.config.ts` `server.watch.ignored` entries are active guards — do not re-add it to lint/tsc scope or reintroduce its content. Never commit secrets: `docs/ssh-key.txt` was untracked in round 3 (C-1) for exactly this reason.

### Commit Standards

- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`.
- Atomic commits (one logical change). Subject ≤ 72 chars; body explains why.

### Push / Deploy

Gate before pushing `main` (mirrored in CI — `.github/workflows/ci.yml`):

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
git push origin main
```

**CI (`.github/workflows/ci.yml`)** — triggers on `push`/`pull_request` to `main`, `concurrency: group: ci-${{ github.ref }}, cancel-in-progress: true`, `runs-on: ubuntu-latest`, `timeout-minutes: 15`:
`actions/checkout@v4` → `pnpm/action-setup@v4` (`version: 11`) → `actions/setup-node@v4` (`node-version: 24`, `cache: pnpm`) → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `npx playwright install --with-deps chromium` → `pnpm test:e2e` → `pnpm build` → artifacts: `dist/` (always, `retention-days: 7`) + `playwright-report/` (on failure, `retention-days: 14`). Trigger contract guarded by `src/ci-workflow.test.ts`.

Primary artifact `dist/index.html` (+ `dist/images/` copied from `public/` — `viteSingleFile` inlines JS+CSS, not `publicDir`) deploys directly to GitHub Pages (via `gh-pages` branch or `dist` artifact — upload both) or S3 — `HashRouter` avoids 404s on static hosts (deep links `/#/worship`, `/#/ministries#liturgical` resolve without a `404.html` redirect).

## Error Handling & Debugging

- SPA has no server failures; handle: broken image fallbacks (`SafeImage` → `/images/hero-church.jpg` fallback default, `dataset.fallback` guard), unknown routes → `NotFound` (`pages/NotFound.tsx` — "This path does not lead to the church." + `Return home` / `Mass times`), and empty content states per page (every list has an empty state if data is async in future).
- `Layout` scroll logic should degrade gracefully when a `#hash` target is missing (current behavior: falls back to `window.scrollTo({ top: 0 })`). Preserve the `resolveAnchor` double-hash handling when extending layout concerns. Layout is `ScrollProgress` + `SkipLink` + `Header` + keyed `page-in` outlet + `Footer` + `BackToTop`.
- `SafeImage` fallback pattern: guards `onError` with `dataset.fallback="1"` so the swap to `/images/hero-church.jpg` (or explicit `fallback`) fires once. Current `images.*` are all local but keep `SafeImage` for any future external image — use it instead of bare `<img>` for CDN sources. E2E `route.abort` fallback exercise remains valid when ported.
- For future data fetching (CMS/API): wrap with error boundaries and show user-friendly messages; never leak raw errors.
- Debugging: Vite HMR overlay + React DevTools. For `HashRouter` issues, inspect `location.pathname` + `location.hash` in `Layout`'s `useEffect` (log `window.location.hash` and `resolveAnchor` output).

## Communication & Documentation

- Explain _why_ behind parish-specific choices (historical wording — 1969 Ho Ping Centre / $450k / first air-con / Olçomendy / Abrial / Velankanni / Simbang Gabi / four-storey; liturgical dates — Easter Sunday; pastoral tone — Toa Payoh new town, Mandarin 8.15 / Tamil 2nd Sun / Tagalog 4th Sun / Bahasa 1st Fri, SSVP / F.R.E.E. / CEP).
- Keep `docs/prompts.md` for lineage prompts; update when intent shifts. Lineage: Rother Shrine → St Joseph BT → St Mary of the Angels (`src.orig`) → Risen Christ (`src`).
- Document new routes, tokens, or images in this file and in `src/data/nav.ts` / `src/data/content.ts` / `src/data/site.ts` comments where applicable.
- Preserve dual-route aliases when renaming legacy paths (external links and printed bulletins exist — keep `/volunteer`→`/serve`, `/donate`→`/give`, `/hours-location`→`/worship`, etc. or add explicit redirects).

## Project-Specific Standards

### Architecture

```
src/ (41 source files + 35 test files + 1 setup — all ported and green)
  App.tsx                # HashRouter + route table: 17 Route entries (16 content paths + * NotFound), 5 alias groups / 7 alias paths + 9 hash anchors (Layout outlet)
  main.tsx               # StrictMode + createRoot + resolveHashRedirect pre-mount rewrite (round-12 F-3: known path-style routes land on their page)
  index.css              # Tailwind v4 @theme (25 colors + 2 shadows) + @layer base/utilities (27 utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link + 8 keyframes gold-rule-draw/hero-ken-burns/rise-in/menu-in/drawer-in/drawer-item-in/page-in/halo-pulse + themed scrollbar (maroon thumb on parchment track, webkit + scrollbar-color))
  components/
    Layout.tsx           # SkipLink + ScrollProgress (fixed rail z-[60] scaleX) + Header + Outlet in a keyed-by-pathname `page-in` wrapper (route changes remount + replay entrance; hash-only updates keep the same node so anchor scroll is undisturbed; data-testid page-container, data-route) + Footer + BackToTop + double-hash scroll/hash restoration (split on # + strip / + 80ms setTimeout + fallback window.scrollTo)
    Header.tsx           # fixed + useScrolled(16) (hook default 12) → maroon-950/92 translucent + blur; transparent at top of Home, solid = scrolled||!isHome||mobileOpen + top bar (lg: site.address.street·site.feast.name · site.feast.date + Give link-underline) + desktop hover (openDesktopMenu, menu-in entrance, closes on child-link click, aria-current parent/link states) + mobile modal drawer (round-4 L-5: role=dialog + aria-modal + Site menu label + tabIndex=-1 panel focused on open + handleDrawerKeyDown Tab/Shift+Tab trap + focus restore to hamburger via drawerWasOpenRef + outside pointerdown close; drawer-in entrance + drawer-item-in 40ms stagger) whose drawer closes on any in-drawer link activation (onClickCapture on drawer nav — same-route taps never change pathname) + drawer aria-current (leaf `page`, parent section `true` when a child route is active, both gold) + hash-aware + Escape handler + h-11 w-11 (44px) hamburger
    ScrollProgress.tsx   # decoupled hairline rail fixed at z-[60] h-[3px]; scaleX(progress) transform-only, aria-hidden, data-testid scroll-progress (Layout renders it, not Header)
    Footer.tsx           # 4-col (parish blurb Toa Payoh/Velankanni/Simbang Gabi + Explore/Get involved from footerNav + visit/contact) + divider-weave-thin + Risen Christ copy + 3-social loop (Facebook/Instagram/YouTube from site.ts) + `free.risenchrist` + `ssvp.risenchrist` + `cep-sg.org` + `bulletin` FlipHTML5 + Archdiocese + address 91 Toa Payoh Central + Reception hours + phone 6253 2166 / media 6356 5958 + copyright
    PageHero.tsx         # maroon-950 hero + SafeImage (opacity-35, fetchPriority="high") + dual gradients + bg-grain + rise-in staged eyebrow/title/description/children; props: eyebrow/title/description/image/fallback/compact? (compact tightens pt/pb)
    SafeImage.tsx        # <img> wrapper: fallback="/images/hero-church.jpg", loading="lazy" default, state for current/loaded, fade-in, onError→dataset.fallback guard (once), optional fetchPriority ("high" on above-the-fold heroes), transition-opacity
    SkipLink.tsx         # preventDefault + imperative focus on #main-content (never rewrites hash under HashRouter)
    BackToTop.tsx        # fixed bottom-right (44px target, maroon-900 + gold ring + SVG progress ring sharing useScrollProgress — gold stroke-dashoffset fills with reading depth): appears when scrollY > 480, data-testid back-to-top + data-testid back-to-top-progress + circle[data-progress] dashoffset, aria-hidden + tabIndex -1 + pointer-events-none when hidden (+ blurs itself when hiding while focused — round-3 L-4), click → window.scrollTo (behavior auto under prefers-reduced-motion via matchMedia; never touches the hash)
    Emblem.tsx / Timeline.tsx (left rail, now 1969–2026, dot-pulse halos) / SocialIcons.tsx (3: Facebook/Instagram/YouTube)
    ui/                  # Button (discriminated to/href/button + primary/secondary/ghost/outline-light + icon + active press feedback) / Container (max-w-7xl px-5 sm:px-8) / SectionHeading (eyebrow/title/description + align/light + gold-rule) / Accordion (single-open, aria-expanded, keyboard Arrow/Home/End, animated grid-rows 0fr→1fr collapse with aria-hidden inert closed panels) / Reveal (delay/as + IntersectionObserver 0.15 + prefers-reduced-motion)
  hooks/
    useScrolled.ts       # threshold 12 default; Header passes 16 — intentional mismatch (delayed transparent→solid on Home)
    useScrollProgress.ts # reading progress 0..1 (scrollY / (scrollHeight - innerHeight)), rAF-throttled, guarded against unscrollable docs (max <= 0 → 0), clamped — shared by ScrollProgress rail + BackToTop ring
  pages/ (10, named exports)
    Home.tsx             # hero (local) rise-in staged + quickFacts (site.mass/MRT/feast/confession from site) + welcome (site.tagline "Grateful, Faithful, and Sent." / vision "He is risen.", Ho Ping 1969 / $450k / first air-con narrative) + grounds preview (3: Main Church first air-con nave / Adoration Room daily Mon 12–22 … / Parish Hall & Media Centre 2003 wing + FlipHTML5) → /worship anchors + events (4 from upcomingEvents: Velankanni 10–12 Sep / CEP / F.R.E.E. Acts / Sunday Reflections)
    About.tsx            # pillars (Grateful/Faithful/Sent) + clergy (priests[3] with email+phone: Brian D'Souza, Arun Bellarmin, Dexter Chua) + household (ppcMembers[7] Secretariat Peter Quek / Admin Audrey Rozario / Youth Calvin Swee / Pastoral Cheryl-Anne Goh)
    History.tsx          # lifeTimeline (8, 1969–2026) via Timeline: 1969 Ho Ping Centre → 1971 Olçomendy first air-con → 1970s many tongues Velankanni → 2003 four-storey → 2010s Filipino/Indonesian/Myanmar Simbang Gabi → 2021 Golden Jubilee → 2023 Fr Brian → 2026 Grateful/Faithful/Sent
    Worship.tsx          # #mass (site.mass: weekdayMorning Mon–Fri 6.30a / weekdayEvening 6p / saturday 6.30a+5.30p anticipated / sunday[5] 7/8.15 Mandarin/9.45/11.30/5.30 + note public holidays + monthly Bahasa/Tamil/Tagalog) + #confession (confession approach priest/office + adoration daily + devotions[6]: Adoration daily / Intercessory 2nd&4th Thu 20.00 / Velankanni Sep / Simbang Gabi Dec / Bahasa 1st Fri / Tamil&Tagalog 2nd/4th Sun) + #visit (address 91 Toa Payoh Central 319193 / buses 88/157/163 B52261 + MRT Toa Payoh NS19 + mapsEmbedSrc iframe + mapsUrl)
    Ministries.tsx       # jump nav (<Link to="/ministries#id"> 6 pills: liturgical/faith-formation/pastoral-care/family-life/youth/language-communities) + ministries[6] alternating shrine-cream/parchment sections (last is Language Communities: Mandarin 8.15 / Tamil 2nd Sun 19.00 / Tagalog 4th Sun 15.00 / Bahasa 1st Fri 20.00)
    NewsEvents.tsx (compact PageHero) / Serve.tsx (serveRoles[4] summary: liturgical/catechists/pastoral/hospitality & media + no section ids) / Give.tsx (givingOptions[8]: PayNow T08CC4042G / collections / cheque Church of the Risen Christ / cash at office / Mass offerings — no HRSM) / FAQ.tsx (faqs[6]: Mass/confession/how to get there/parking HDB 66/70/73/baptism-marriage/Adoration Room via Accordion grid-rows + inert) / NotFound.tsx ("This path does not lead to the church." + Return home / Mass times)
  data/
    nav.ts               # primaryNav (6, 3 with children+description: About[3]/Worship[3]/Ministries[3] — Risen Christ wording) / footerNav (10) (single source; Header/Footer render from it)
    content.ts           # Typed data layer: 8 interfaces + 10 exports — priests[3] (Brian D'Souza, Arun Bellarmin, Dexter Chua — each email+phone) + ppcMembers[7] (Secretariat/Admin/Youth/Pastoral) + lifeTimeline[8] 1969–2026 (Toa Payoh new town, first air-con, Ho Ping) + grounds[3] (main-church/chapel/parish-hall → Main Church/Adoration Room/Parish Hall & Media Centre + image/imageFallback/imageAlt — all local) + ministries[6] (liturgical/faith-formation/pastoral-care/family-life/youth/language-communities + imageFallback) + faqs[6] (Mass/confession/how to get there/parking/baptism-marriage/Adoration Room) + upcomingEvents[6] (Velankanni 10–12 Sep 2026 / CEP 16 Aug–11 Oct / F.R.E.E. Acts 30 Jun–10 Nov / Sunday Reflections / RCIA / Intercessory Prayer — title+date+summary+category Parish|Devotion|Formation|Archdiocese + optional href) + givingOptions[8] (PayNow T08CC4042G / collections / cheque Church of the Risen Christ / cash / Mass offerings + icon union flame|church|sprout|heart|book|hand-heart|landmark|globe) + serveRoles[4] (title+summary) / devotions[6] (title+when+where: Adoration daily / Intercessory 2nd&4th Thu / Velankanni Sep / Simbang Gabi / Bahasa 1st Fri / Tamil&Tagalog 2nd+4th Sun) untyped consts + images {hero/heroFallback/chapel/sanctuary/garden/glass/hall/cemetery/feast local + naveCdn/courtyardCdn local aliases} (11 keys, all local, each grounds/ministry item carries imageFallback)
    site.ts              # canonical single source (as const): name Church of the Risen Christ / shortName Risen Christ Toa Payoh / chineseName 耶稣复活堂 / tagline Grateful, Faithful, and Sent. / vision He is risen. + address 91 Toa Payoh Central Singapore 319193 (street/city/zip/full+query getters) + hours (6: gates Open for Mass… / mainChurch Open for Mass… / chapel Adoration Room Mon 12–22… / reception Mon–Fri 9–16 Sat 9–12 Sun 8–13 / parishOffice same / mediaCentre Tue&Fri 12–16 Sat 12–19 Sun 8–13 +65 6356 5958 / adorationRoom same as chapel) + mass (weekdayMorning 6.30a / weekdayEvening 6p / saturday 6.30a+5.30p / sunday[5] 7/8.15 Mandarin/9.45/11.30/5.30 / confession approach priest / adoration daily / secondCollection bulletin + note public holidays + monthly Bahasa/Tamil/Tagalog) + contact (parishPriestPhone 6255 7509 / officePhone 6253 2166 / mediaPhone 6356 5958 / email crc.secretariat / admin crc.admin / connect crc.pastoral / youth crc.youth / dpo dpo.crc) + transport (MRT Toa Payoh NS19 Exit A + buses 88/157/163 B52261) + feast The Risen Christ — Easter Sunday + uen T08CC4042G / chequePayee Church of the Risen Christ / facebook/instagram/youtube/archdiocese / freeMinistry/ssvp/bulletin/cep / mapsUrl/mapsEmbedSrc (91 Toa Payoh Central) + origin https://www.risenchrist.org.sg / url / ogImage (canonical — drift-checked by head.test.ts when ported) — Footer + Worship + About consume it, don't duplicate
  utils/
    cn.ts                # twMerge(clsx) — always merge via cn()
  test/
    setup.ts             # vitest jsdom setup (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView stubs + matchMedia stub, Risen Christ fixtures)
  **/*.test.{ts,tsx}     # 35 files / 202 tests: ci-workflow (4), repo-hygiene (3), docs-contract (16), utils/cn (5), data/nav (7), data/content (10), data/site (8), utils/massDay (5), utils/monogram (7), utils/deepLinks (7), ui/Button (11), SkipLink (3), ui/Accordion (6), SafeImage (6), Header (17), BackToTop (7), ui/Reveal (2), components/wcag-contrast (5), pages/Ministries (3), pages/cta-bands (6), pages/worship-mass (6), pages/about-visuals (4), pages/event-chips (3), pages/give-featured (2), pages/give-uen (3), pages/card-affordances (6), components/Timeline (3), pages/NotFound (2), pages/History (2), Layout (2), hooks/useScrollProgress (4), hooks/useScrollSpy (6), ScrollProgress (2), head (13), security-headers (6)
public/
  images/ (8)            # hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all images local — CDN keys hero/naveCdn/courtyardCdn now point to local fallbacks (no legacy wikimedia/pexels allowlist)
  _headers               # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers; guarded by src/security-headers.test.ts when ported (round-3 M-2)
vite.config.ts           # alias @→src + test { globals, jsdom, setupFiles: src/test/setup.ts (missing), include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**] + viteSingleFile()
tsconfig.json            # strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts, playwright.built.config.ts] + types [node, vitest/globals] + paths @/*
eslint.config.js         # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh); ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
playwright.config.ts     # Playwright 1.55.1 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s; CSP is a meta tag in index.html, not a config header)
playwright.built.config.ts # Playwright vs the built artifact — extends the base config; vite preview :4173 (or E2E_BASE_URL → live host, webServer skipped); catches singlefile dev/build divergence (round-9 E2E-L1)
index.html               # Google Fonts Fraunces + Source Sans 3; CSP `img-src 'self' data: blob:` only + `object-src 'none'` + `base-uri 'self'` + `frame-src https://www.google.com`; favicon.svg + theme-color maroon-950 + full OG (url https://www.risenchrist.org.sg/ / site_name Church of the Risen Christ / locale en_SG / image hero-church + alt) + twitter summary_large_image + Church JSON-LD (name/alternateName [Risen Christ Toa Payoh/耶稣复活堂]/address 91 Toa Payoh/319193/hours/sameAs + telephone 6253 2166 — drift-checked against site.ts by src/head.test.ts when ported); base description first air-con 1971 + viewport; #root + /src/main.tsx
e2e/ (7 specs — 48 tests green) # smoke + navigation + ministries + give-faq + enhancements + enhancements-round5 + enhancements-round7 + helpers.ts — Risen Christ assertions (91 Toa Payoh, first air-con, Velankanni, He is risen)
.github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e → build + artifacts (Node 24, pnpm 11, pnpm-lock committed, --frozen-lockfile)

### File Organization & Naming

- Components: `PascalCase.tsx` (e.g., `PageHero.tsx`, `SafeImage.tsx`); hooks: `useThing.ts` (`hooks/useScrolled.ts` threshold `12` default, `16` in `Header` — intentional delay; `hooks/useScrollProgress.ts` rAF).
- Data/utils: `camelCase.ts` (`content.ts`, `site.ts`, `nav.ts`, `cn.ts`).
- Pages: `PascalCase.tsx` matching route intent (`About.tsx`, `History.tsx`, `Worship.tsx`, `Ministries.tsx`, `NewsEvents.tsx`, `Serve.tsx`, `Give.tsx`, `FAQ.tsx`, `NotFound.tsx`) — 10 pages, all named exports (`Home`, `About`, `History`, `Worship`, `Ministries`, `NewsEvents`, `Serve`, `Give`, `FAQ`, `NotFound`).
- Assets: `public/images/<slug>.jpg` (8 files) — reference as `/images/<slug>.jpg` (absolute from root, Vite `publicDir` → `dist/images/` — upload alongside `dist/index.html`; singlefile inlines JS+CSS, not `public/`). Local keys: `hero`/`heroFallback`/`chapel`/`sanctuary`/`garden`/`glass`/`hall`/`cemetery`/`feast`; `naveCdn`/`courtyardCdn` now alias local `sanctuary`/`garden`.
- Tests: `*.test.{ts,tsx}` adjacent to source — **35 files / 202 tests in `src`** (ported 2026-08-31 with Risen Christ fixtures): `src/ci-workflow.test.ts` (4), `src/repo-hygiene.test.ts` (3), `src/docs-contract.test.ts` (16), `src/utils/cn.test.ts` (5), `src/data/nav.test.ts` (7), `src/data/content.test.ts` (10), `src/data/site.test.ts` (8), `src/utils/massDay.test.ts` (5), `src/utils/monogram.test.ts` (7), `src/utils/deepLinks.test.ts` (7), `src/components/ui/Button.test.tsx` (11), `src/components/SkipLink.test.tsx` (3), `src/components/ui/Accordion.test.tsx` (6), `src/components/SafeImage.test.tsx` (6), `src/components/Header.test.tsx` (17), `src/components/ui/Reveal.test.tsx` (2), `src/components/wcag-contrast.test.tsx` (5), `src/components/BackToTop.test.tsx` (7), `src/components/Layout.test.tsx` (2), `src/components/ScrollProgress.test.tsx` (2), `src/components/Timeline.test.tsx` (3), `src/hooks/useScrollProgress.test.ts` (4), `src/hooks/useScrollSpy.test.tsx` (6), `src/pages/Ministries.test.tsx` (3), `src/pages/cta-bands.test.tsx` (6), `src/pages/worship-mass.test.tsx` (6), `src/pages/about-visuals.test.tsx` (4), `src/pages/event-chips.test.tsx` (3), `src/pages/give-featured.test.tsx` (2), `src/pages/give-uen.test.tsx` (3), `src/pages/card-affordances.test.tsx` (6), `src/pages/NotFound.test.tsx` (2), `src/pages/History.test.tsx` (2), `src/head.test.ts` (13), `src/security-headers.test.ts` (6) + `src/test/setup.ts` (Risen Christ fixtures: priests 3 + ppc 7 + 91 Toa Payoh Central + UEN 4042G + Easter). `vite.config.ts` `test.exclude` keeps `e2e/**` out; `e2e/*.spec.ts` 51 tests are Playwright only.

### Design System

- Tokens: see `src/index.css` `@theme`. Additions require design rationale in PR description. Tokens 25 colors + 2 shadows: `shrine-cream/parchment/parchment-dark/stone/ink/charcoal`, `maroon-50..950` (8), `gold-100..600` (5), `pine-500..700` (3), `terracotta-400/500/600` (3) + `shadow-shrine/shrine-lg`. `terracotta-600` (#8f4c30) added round-12 (audit F-1) as the AA text step for the Devotion chip (5.36:1 on parchment; `terracotta-500` computes 3.92:1 — never use it for text on light surfaces). Only the imagery/content they frame is Toa Payoh 1971 (first air-con nave, Adoration Room, parish hall & media centre) — keep tokens stable.
- Typography scale: `Fraunces` for display/quote, `Source Sans 3` for body. Use `font-display` class for intentional display turns. `index.html` loads both with `preconnect`.
- Elevation: `shadow-shrine` (`0 20px 60px -20px rgba(51,16,15,.45)`) and `shadow-shrine-lg` (`0 40px 90px -30px rgba(51,16,15,.55)`). Use sparingly (hero, cards, emblem).
- Utilities (24 + keyframes): `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`/`divider-weave-thin`, `gold-rule`/`gold-rule-left` (+ `gold-rule-draw`), `hero-ken-burns` (+ `hero-ken-burns`), `rise-in`+`-d1..d4` (+ `rise-in`), `menu-in` (+ `menu-in`), `drawer-in` (+ `drawer-in`), `drawer-item-in` (+ `drawer-item-in`), `page-in` (+ `page-in`), `dot-pulse` (+ `halo-pulse`), `card-lift`, `link-underline`, `reveal`/`reveal-visible`, `skip-link`, `mask-fade-b` + themed scrollbar. `prefers-reduced-motion: reduce` disables `reveal` + `hero-ken-burns` + all entrance animations + smooth scroll via `@layer base`/`@layer utilities` overrides.
- Do not introduce purple gradients, `Inter` defaults, or generic card-grid templates — anti-generic enforcement (see Avant-Garde stance below).
- Reference skill: `avant-garde-design-v4` for direction when adding new sections; extract from www.risenchrist.org.sg only via `agent-browser` workflows when explicitly requested.

### State & Data Layer

- No API or DB. Content arrays in `src/data/content.ts` (plus `site.ts` canonical facts, `nav.ts` nav) are the data layer. Validate shape with TypeScript interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest` with `email?: string` + `phone?: string`, `PpcMember`) and the `images` const; add Zod schemas only if external data arrives.
- `EventItem` shape is `{ title, date, summary, category: Parish|Devotion|Formation|Archdiocese, href?: string }` — currently `href` is optional and 2 of the 6 upcoming events carry it (`cep-sg.org`, `free.risenchrist.org.sg`). Do not reintroduce `location`.
- `GivingOption` icons are Risen Christ-specific: 8 options `flame` (General Church Offering), `church` (Weekend collections), `sprout` (Mass offerings), `hand-heart` (SSVP), `book` (Cheque), `heart` (Cash at office), `landmark` (Church Maintenance), `globe` (PayNow T08CC4042G).
- `serveRoles` shape is `{ title, summary }` (`summary` not `description`); `devotions` shape is `{ title, when, where }` (6: Adoration daily / Intercessory 2nd&4th Thu / Velankanni Sep / Simbang Gabi Dec / Bahasa 1st Fri / Tamil&Tagalog 2nd+4th Sun).
- For future CMS integration (e.g., Sanity), isolate fetch + Portable Text rendering behind a `lib/cms` boundary and keep `content.ts` as the local fallback.

### Environment Variables

| Variable | Purpose | Example | Status |
|----------|---------|---------|--------|
| `VITE_*` | Client-exposed Vite vars (prefix required for `import.meta.env` exposure) | `VITE_MAPS_KEY=...` | None required yet — no `.env` contract; `site.ts` hard-codes `mapsUrl`/`mapsEmbedSrc` with Google `?api=1&query=` + `&output=embed` (91 Toa Payoh Central) |
| _none_ | _No backend, no DB, no SSR_ | — | — |

When adding vars, document them here and in `.env.example`, and guard with `import.meta.env` typing in `src/env.d.ts`. `VITE_*` is the only prefix Vite exposes to the client. Never duplicate `site.ts` address/hours/mass across pages when a var is added — keep `site.ts` canonical.

### Accessibility & SEO

- `index.html` ships `lang="en"`, `viewport`, CSP, Referrer-Policy meta, `description` ("Church of the Risen Christ, Toa Payoh — the first Catholic church in the new town, blessed in 1971…"), preconnected Google Fonts (Fraunces + Source Sans 3), and Open Graph (`og:title`/`og:description` = Church of the Risen Christ + www.risenchrist.org.sg). CSP allowlist: `default-src 'self'`, `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com` (beacon for Cloudflare Pages), `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src https://fonts.gstatic.com data:`, `img-src 'self' data: blob:` (all `images.*` local — no wikimedia/pexels), `frame-src https://www.google.com` (maps embed), `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`. `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- CSP maps embed: `frame-src https://www.google.com` for `site.mapsEmbedSrc` (`https://www.google.com/maps?q=91+Toa+Payoh+Central,+Singapore+319193&output=embed`); host-level headers that a meta tag cannot express (HSTS, `X-Content-Type-Options`, `X-Frame-Options`) ship via `public/_headers` (Cloudflare Pages; `src/security-headers.test.ts` guards the directives when ported).
- Header mobile toggle uses `aria-label` + `aria-expanded`; dropdowns expose `aria-expanded` + `description` on children via `primaryNav`. Mobile drawer is a **modal dialog** (round-4 L-5): `role="dialog"` + `aria-modal="true"`, initial focus on the panel, `Tab`/`Shift+Tab` focus trap, focus restored to the hamburger on close, outside `pointerdown` closes; body scroll locked via `document.body.style.overflow` + `Escape` handler. Hamburger `h-11 w-11` (44px). `aria-current` contract: Header plain links `aria-current="page"` when `pathname === to`; dropdown parent buttons `aria-current="true"` when any child route matches; dropdown children `aria-current="page"` on exact `pathname+hash`; Ministries pills `aria-current="true"` on hash match; mobile drawer parents `aria-current="page"` when child active.
- Images: `alt` for content (`chapel`, `sanctuary`, `garden`, etc. all have `imageAlt`; `grounds`/`ministries` cards preserve `imageAlt`), `alt=""` for decorative hero overlays where `PageHero` does. All `images.*` now local but still carry `imageAlt`.
- Skip link: `SkipLink.tsx` `preventDefault`s and focuses `#main-content` with `tabindex="-1"` + `scrollIntoView` — it never rewrites the hash (route loss under `HashRouter`). Covered by tests when ported and `e2e/navigation.spec.ts` after port.
- `Accordion` provides `aria-expanded`/`aria-controls`/`role="region"` + keyboard `ArrowDown`/`ArrowUp`/`Home`/`End` navigation + `aria-hidden`/`inert` toggling (closed `aria-hidden="true"` + `inert`, open `aria-hidden` undefined).
- Keep color contrast ≥ 4.5:1 for body text (`shrine-ink` on `shrine-cream` meets it; verify new pairings — `shrine-cream/75` on `maroon-950` and `shrine-charcoal/80` on `cream` are the critical checks).
- `prefers-reduced-motion: reduce` disables `reveal`, `hero-ken-burns`, `rise-in`, `menu-in`, `drawer-in`, `page-in`, `dot-pulse` + smooth scroll via `@layer base`/`@layer utilities` overrides.
- SEO: `index.html` OG `og:url` = `https://www.risenchrist.org.sg/` + `og:image` = `https://www.risenchrist.org.sg/images/hero-church.jpg` + `og:image:alt`; Church JSON-LD `name` Church of the Risen Christ / `alternateName` [Risen Christ Toa Payoh, 耶稣复活堂] / `address` 91 Toa Payoh 319193 / `telephone` +65 6253 2166 / `sameAs` facebook/instagram/youtube/catholic.sg — drift-checked by `src/head.test.ts` against `site.ts` + `site.ogImage`/`site.url` when ported.

## Anti-Patterns to Avoid

- **Copy-paste from templates as truth** — verify every command in `package.json` before documenting it.
- **Extending `@theme` with one-off hex values** — add a named `shrine-*` token or reuse an existing one. Tokens 24+2 shadows are the budget.
- **Prop-drilling nav arrays** — consume `primaryNav` / `footerNav` directly from `data/nav.ts`; Header/Footer already do.
- **Converting `HashRouter` to `BrowserRouter` without a static-host fallback** — breaks deep-links on GitHub Pages/S3 unless you add a `404.html` redirect (e.g., `https://github.com/rafgraph/spa-github-pages`). Hash links must stay `/#/worship`, `/#/ministries#liturgical`.
- **Breaking alias routes** — external parish/school/programme links + printed bulletins depend on legacy paths (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; `/news-and-events` → `/news-events`; `/volunteer` → `/serve`; `/donate` → `/give`); keep aliases or add explicit redirects. The 7 aliases exist for this reason.
- **Alias desync** — changing `App.tsx` routes without updating `src/data/nav.ts` nav children/dropdown `Link to=` targets, or vice versa. Keep `to: "/worship#mass"` etc. in sync with `Worship` section `id`s and `Ministries` `id`s.
- **Using `<a href="#id">` instead of `<Link to="/path#id">`** — plain `#id` replaces the hash and routes to `NotFound` under `HashRouter`; `Ministries` jump nav and `Header` dropdowns must preserve the route.
- **Importing Google Fonts imperatively in components** — fonts belong in `index.html` + `@theme`; do not add runtime font loaders. CSP already whitelists `fonts.googleapis.com`/`fonts.gstatic.com`.
- **Bypassing `cn()` for conditional classes** — always merge via `cn()` so `tailwind-merge` deduplicates correctly (e.g., `variantClasses` in `Button`).
- **Adding a UI library without adopting its primitives** — if `shadcn/ui` (Radix) is introduced, use its primitives; do not rebuild Dialog/Dropdown from scratch.
- **Over-hydrating or adding SSR** — this is a static SPA; do not introduce server rendering or API routes without a deliberate architecture decision (`CLAUDE.md` isolates future CMS behind `lib/cms`).
- **Reintroducing St Mary / Bukit Batok-era content or reassigning `site.ts` facts** — hours (6 keys), mass (weekdayMorning/weekdayEvening/saturday/sunday[5]/confession/adoration/secondCollection + note + monthly), address 91 Toa Payoh Central 319193, and `images` are the single source — don't duplicate them across pages or swap in 5 Bukit Batok East Ave 2 / Portiuncula / OFM / WOHA / Garden of Peace / 天神之后圣母堂 / Towards a Prayerful & Missionary Parish / UEN T08CC4053H / HRSM / columbarium / telegram imagery. `site.ts` is canonical; pages render from it. UEN is T08CC4042G, not T08CC4053H.
- **Bare `<img>` for CDN sources** — any future external CDN image must go through `SafeImage` with `fallback` to `/images/hero-church.jpg`; don't use bare `<img>` for CDN sources even though current images are local.
- **Ignoring `noUnusedLocals`/`noUnusedParameters`** — `tsc --noEmit` will fail on dead code; clean before commit.
- **Forgetting `ScrollProgress` is decoupled** — it lives in `Layout` at `z-[60]` (not inside `Header`). Don't re-nest it.

## Success Metrics

You are done when:

- All five gates are green: `pnpm lint` + `pnpm typecheck` + `pnpm test` (35 files / 202) + `pnpm test:e2e` (51) + `pnpm build` — the full gate `lint && typecheck && test && test:e2e && build` must pass.
- All 10 pages + 7 alias paths in 5 groups (`/worship`↔`/mass-times`↔`/hours-location`↔`/visit`; `/ministries`↔`/ministry`; `/news-events`↔`/news-and-events`; `/serve`↔`/volunteer`; `/give`↔`/donate`) + 9 hash anchors (`#mass`/`#confession`/`#visit` on `/worship` + `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#language-communities` on `/ministries`; plus `/serve` has no anchors) navigate correctly, including direct hash URLs on static hosts (HashRouter, no 404.html needed, `Layout`'s double-hash `resolveAnchor` survives `/#/ministries#liturgical`).
- Header is fixed, `useScrolled(16)` translucency works (transparent at top of Home → `maroon-950/92` blur on scroll; `solid = scrolled||!isHome||mobileOpen`), top bar (`lg`) shows `91 Toa Payoh Central · The Risen Christ — Easter Sunday` + `Give →/give`, mobile drawer closes on any in-drawer link via `onClickCapture` (+ `Escape`) and opens as a modal dialog with trapped focus (round-4 L-5: dialog/aria-modal/initial-focus/focus-restore/outside-tap), desktop Worship/Ministries dropdowns show children + `description` with `aria-current` parent/child states, hamburger `h-11 w-11` (44px), and keyboard + `SkipLink` (`#main-content`, hash-preserving, `tabindex="-1"`) covers all nav items. `ScrollProgress` decoupled rail at `z-[60]` tracks `useScrollProgress`.
- Content renders from `src/data/*` without inline duplication: `content.ts` 8 interfaces (1969–2026 timeline 8, `grounds` 3 Main Church/Adoration Room/Parish Hall & Media Centre, `ministries` 6 with Language Communities jump nav, `faqs` 6, `upcomingEvents` 6 Parish/Devotion/Formation/Archdiocese with 2 hrefs, `givingOptions` 8, `priests` 3 with phone, `ppcMembers` 7, `serveRoles` 4 `summary`, `devotions` 6, `images` 11 all local) + `site.ts` hours 6 keys + mass 7 keys + address/CSP/phones/transport NS19+88/157/163/feast Easter/UEN T08CC4042G + nav `primaryNav` 6 / `footerNav` 10; new tokens live in `src/index.css` `@theme` (25 colors + 2 shadows).
- `SafeImage` fallback verified (guard via `dataset.fallback` to `/images/hero-church.jpg`), no `any`, no unused locals/params, no missing `imageAlt`/`alt` on content images, every `PageHero` supplies `image`+`fallback`, `NotFound` reads "This path does not lead to the church" + offers `Return home` → `/` and `Mass times` → `/worship`, CI artifacts green. `BackToTop` threshold 480 + SVG ring `data-progress` + `ScrollProgress` rail both track `useScrollProgress`.

## System Integration

### Available Tools (in this workspace)

- `read` / `write` / `edit` / `bash` / `fd` / `rg` / `agent_browser` (prefer native `agent_browser` tool — do not run direct `agent-browser` bash unless debugging) / `subagent_spawn` / `workflow` — standard Pi harness.
- `skills` is committed-but-pruned vendored reference content (round 3: catalog + SKILL.md contents removed from tracking; historical tree at `c774ed9`) — not project source. Do not import from or lint it; `eslint.config.js` `ignores` + `tsconfig` excludes it. Vendored size can trigger `ENOSPC` — see Vite `server.watch.ignored` note.

### Related Skills

- `framework-templates` — companion to `claude-md` for framework sections (Vite+React used here).
- `avant-garde-design-v4` / `super-frontend-design` / `claude-design` — when refining parish aesthetics (warm editorial, first air-con nave, Adoration Room, parish hall — not WOHA/Garden of Peace).
- `webapp-testing-journey` / `agent-browser` / `playwright-cli` — when exercising journeys or visual QA (use `agent_browser` native tool for `HashRouter` hash-aware navigation).
- `verification-and-review-protocol` — before claiming work done.
- `lint-and-validate` / `clean-code` / `testing-patterns` / `tdd-workflow` — quality gates (Red→Green→Refactor for the test rewrite).

## Continuous Improvement

- When a command is added to `package.json` scripts, update the Build Commands table and note if it is hollow/stale.
- When a token or utility is added to `src/index.css`, document its intent in this file and in a code comment (`@theme` or `@layer`). Current utilities count is 27 + 8 keyframes + themed scrollbar.
- When a route alias or hash anchor is added or removed, update `App.tsx`, `src/data/nav.ts` nav children, the Routing Contract table, and the Architecture hash-anchor rows together.
- When a new `GivingOption` icon or `EventItem` category is added, update the `GivingOption.icon` / `EventItem.category` union and this file's Data section.
- Re-audit this file after any framework bump (React 19, Vite 7, Tailwind 4) or after restoring tests/lint/CMS — verify counts via `fd` and grep `src/App.tsx` for `Route` entries.
- When a validation report is added (`docs/validation-*.md`), link it from `README.md` File Hierarchy + `AGENTS.md` Where to look next + this checklist, and bump `Current audits` in `README.md`.
- Keep `README.md` + `AGENTS.md` + this file + `risen-christ_SKILL.md` in sync on version, routing, and data shape after every port/validation change.

---

### Validation Checklist (for maintainers)

| # | Section | Required | Present |
|---|---------|----------|---------|
| 1 | Core Identity & Purpose (Risen Christ, 91 Toa Payoh Central 319193, blessed 1971 first air-con Olçomendy/Abrial, Grateful/Faithful/Sent, Easter) | Yes | ✅ |
| 2 | Foundational Principles (Six-Phase) | Yes | ✅ |
| 3 | Implementation Standards (General + TS Strict + Vite 7 + React 19 + Tailwind v4 CSS-first + Components incl. ScrollProgress decoupled + BackToTop ring + Accordion inert) | Yes | ✅ |
| 4 | Development Workflow (Env Setup + Build Commands — five-command gate active) | Yes | ✅ |
| 5 | Testing Strategy (wired — 35 files / 202 unit + 51 E2E green; round-12 re-pin 2026-08-31) | Yes | ✅ |
| 6 | Code Quality Standards (Lint + Type Safety + Styling incl. Priest email+phone / serveRoles summary) | Yes | ✅ |
| 7 | Git & Version Control (branching + Conventional Commits + CI Node 24/pnpm 11 + HashRouter deploy + src.orig St Mary reference pruned round-12) | Yes | ✅ |
| 8 | Error Handling & Debugging (SafeImage fallback default / NotFound "does not lead to the church" / Layout ScrollProgress+keyed page-in) | Yes | ✅ |
| 9 | Communication & Documentation (parish-specific why — Ho Ping/$450k/Velankanni/Simbang Gabi/CEP/F.R.E.E., lineage Rother→St Joseph BT→St Mary→Risen Christ) | Yes | ✅ |
| 10 | Project-Specific Standards (Architecture 41 source + 35 test + 1 setup tree + Data ownership 8 interfaces/11 images all local + Routing 17/7/9 + File Org) | Yes | ✅ |
| 11 | Success Metrics (10 pages + 7 aliases + 9 anchors + Risen Christ content from data/* + tokens 25+2 + Header solid logic + 3 socials + Free/SSVP/CEP) | — | ✅ |
| 12 | System Integration (tools + skills vendored note) | — | ✅ |
| 13 | Anti-Patterns to Avoid (12 incl. ScrollProgress decoupled + UEN 4042G + St Mary reintroduction) | — | ✅ |
| 14 | Continuous Improvement (re-audit after bumps/tests/CMS, 27 utilities) | — | ✅ |
| 15 | Validation Report `docs/validation-src-vs-src.orig-2026-08-30.md` (historical — St Mary 10/10 contracts adopted) | — | ✅ (historical) |
| 16 | Round-3 audit + remediation `docs/code-review-audit-round3-2026-08-30.md` + `docs/remediation-plan-round3-2026-08-30.md` (historical — St Mary) | — | ✅ (historical) |
| 17 | Round-4 remediation `docs/remediation-round4-2026-08-30.md` (historical — drawer modal, still applies) | — | ✅ |
| 18 | Round-5 design enhancement `docs/design-enhancement-round5-2026-08-30.md` (historical — St Mary "Light of the Portiuncula"; motion system retained) | — | ✅ (historical) |

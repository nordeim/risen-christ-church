---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Church of St Mary of the Angels — `st-mary-of-angels`

Port of **https://www.stmary.sg/** — **Church of St Mary of the Angels, Bukit Batok, Singapore** — Franciscan parish (5 Bukit Batok East Ave 2, Singapore 659918). Custody of St Anthony (OFM) — named for the Portiuncula in Assisi (St Francis' favourite chapel). From friars sent to a sociological institute in 1957 → hilltop chapel blessed by Abp Michel Olçomendy 1958 → parish erected 1970 → west grows 1985–2003 → WOHA church consecrated 2004 → President's Design Award Design of the Year 2006 → Jubilee monstrance 2025 → Pray · Form · Go under Friar Esmond Chua 2026. Feast of Our Lady of the Angels · Portiuncula, 2 August. Static parish site — reverent, editorial, welcoming. No backend, no DB, no SSR.

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

- **Reverent, not austere** — warm parchment/maroon/gold palette, editorial typography (Fraunces / Source Sans 3), ample whitespace. Every page is a welcome from the hill in Bukit Batok — Mandarin at dawn, English through the day, Tamil at Saturday dusk — not a brochure.
- **Parish fidelity** — Singapore content is canonical. Keep dates, place names, and liturgical facts exact: 1957 friars arrive, 1958 Olçomendy chapel, 1970 Portiuncula parish, 1985–2003 west grows, 2004 WOHA consecrated, 2006 Design of the Year, 2025 Jubilee monstrance, 2026 Pray · Form · Go under Friar Esmond Chua, 5 Bukit Batok East Ave 2 Singapore 659918, Bukit Batok NS2 / Beauty World DT5, Our Lady of the Angels · Portiuncula 2 August, OFM Custody of St Anthony, WOHA house of light, Garden of Peace & Piazza. Do not reintroduce St Joseph (Bukit Timah) / 620 Upper Bukit Timah / 678116 / 1845 Mauduit / Palladian / Kranji attap / Rosary Garden / cemetery narratives — those belong to `src.orig/` (see lineage below).
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
- `types: ["node", "vitest/globals"]` — required for `describe/it/expect` globals in `src/**/*.test.*`.
- Include is `["src", "vite.config.ts", "eslint.config.js", "playwright.config.ts"]` (so `eslint.config.js` + `playwright.config.ts` are type-checked). Add future config files to `include` only if they should be type-checked.
- Unused locals/params will fail the type gate — clean before commit.

#### Vite 7 Specific

- Plugins: `@vitejs/plugin-react 5.2.0` + `@tailwindcss/vite 4.1.17` + `vite-plugin-singlefile 2.3.3`. Order matters — keep as configured.
- HMR enabled by default; do not add a separate dev server abstraction.
- **Env vars:** `VITE_*` prefix for client-exposed vars. Access via `import.meta.env.VITE_*`.
- Import alias configured in `vite.config.ts` via `path.resolve(__dirname, "src")`. Keep `tsconfig.json` `paths` + `baseUrl` in sync.
- Build is single-file: `viteSingleFile()` inlines JS+CSS (not `publicDir`). Avoid dynamic `import()` that assumes code-splitting unless you remove the plugin intentionally. `public/images/` is copied verbatim to `dist/images/` — upload both `dist/index.html` + `dist/images/` on deploy.
- `test` in `vite.config.ts` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` — keeps `e2e/**` out of unit runs; `src/test/setup.ts` provides `jest-dom` + `IntersectionObserver` mock + `scrollTo`/`scrollIntoView` stubs + `matchMedia` stub.
- `server.watch.ignored: ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"]` — prevents `ENOSPC` from the vendored `skills/` tree (large `.venv`) and archived `src.orig/` (St Joseph BT port).

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
  | `/ministries` | `liturgical`, `faith-formation`, `pastoral-care`, `family-life`, `youth`, `mandarin` | `Ministries` jump nav (`<Link to="/ministries#id">` → 6 pill links, `aria-label="Jump to ministry"`) |
  | `/serve` | _none_ | `serveRoles`/`devotions` rendered without section ids |

  `Worship` anchors and `Ministries` ids both scroll with `Layout`'s `useEffect` (`setTimeout 80ms` + `scrollIntoView`).

- **Layout behavior:** `Layout.tsx` handles double-hash scroll (`window.location.hash` split on `#` + strip `/`) + `80ms` timeout + fallback `window.scrollTo({ top: 0 })`. `Header` + `Ministries` jump nav must use `<Link to="/path#id">`, never plain `<a href="#id">` (which would replace the hash and route to `NotFound` under `HashRouter`). Layout also wraps outlet in a keyed `page-in` container (`data-testid="page-container"` + `data-route`) so route changes replay entrance while hash-only updates keep the node.

- **Navigation single source:** `primaryNav: NavItem[]` (6 — `Home`, `About` with 3 children + `description`, `Worship` with 3 children + `description`, `Ministries` with 3 children + `description` — descriptions are Franciscan/WOHA wording: "Vision, friars, and a Franciscan household" / "From a hilltop chapel in 1958 to the WOHA church of 2004" / "Weekday, weekend, and language Masses" etc., `News & Events`, `Serve`) and `footerNav: NavLink[]` (10) in `src/data/nav.ts`. Update nav there; `Header`/`Footer` render from it.

- Colocation: `components/` for layout primitives, `pages/` for route components, `data/` for typed content, `utils/` for pure helpers (`cn`), `hooks/` for `useScrolled` + `useScrollProgress`.
- Custom hooks → `src/hooks/` when extracted (currently `useScrolled` threshold 12 default / `Header` passes 16 + `useScrollProgress` rAF-throttled 0..1).
- Server state (future): TanStack Query; global client state: Zustand. Neither is installed yet — add only when traversal proves need.
- Handle all UI states where data is async or conditional: `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.
- Use library primitives when available (no UI library locked in yet; `shadcn/ui` with Radix is the intended direction per project instructions).

#### Tailwind CSS v4 — CSS-First `@theme`

- Tokens live in `src/index.css` `@theme` block. Extend there; do not introduce arbitrary `bg-[#...]` values.
- Palette: `shrine-cream / parchment(+dark) / stone / ink / charcoal / maroon-{50,100,500,600,700,800,900,950} / gold-{100,300,400,500,600} / pine-{500,600,700} / terracotta-{400,500}` plus `shadow-shrine/shrine-lg` (24 colors + 2 shadows). Use semantic names (`shrine-maroon-600`) not hex.
- Display = `Fraunces`, body = `Source Sans 3`; heading styles set on `h1–h4, .font-display`. Google Fonts loaded in `index.html` — add weights only with purpose. CSP in `index.html` whitelists `fonts.googleapis.com`/`fonts.gstatic.com`, `upload.wikimedia.org`/`images.pexels.com` (legacy allowlist) + `google.com` for the maps iframe.
- Utilities (24): `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `divider-weave-thin`, `gold-rule`/`gold-rule-left`, `hero-ken-burns`, `mask-fade-b`, `reveal`+`reveal-visible`, `rise-in`+`rise-in-d1..d4`, `menu-in`, `drawer-in`, `drawer-item-in`, `page-in`, `dot-pulse`, `card-lift`, `link-underline`, `skip-link` + 8 keyframes `gold-rule-draw`/`hero-ken-burns`/`rise-in`/`menu-in`/`drawer-in`/`drawer-item-in`/`page-in`/`halo-pulse` + themed scrollbar (maroon thumb on parchment track, webkit + `scrollbar-color`). Document new utilities alongside them.
- Mobile-first, responsive (`sm:` / `lg:`), and dark-mode tolerant even though the parish theme is light-first.

#### Component Conventions

- `Button` (`components/ui/Button.tsx`): discriminated `to`/`href`/native `button` + `icon`; variants `primary|secondary|ghost|outline-light` via `variantClasses` record and `cn()` merge + `active` press feedback (`active:translate-y-0 active:scale-[0.98]`). Use `to` for internal navigation, `href` for external. Keep variant styles centralized there.
- `Container` (`components/ui/Container.tsx`): `max-w-7xl mx-auto px-5 sm:px-8`. All sections should wrap in `Container`.
- `SectionHeading` (`components/ui/SectionHeading.tsx`): `eyebrow? / title / description` with `align` and `light` props + `gold-rule` line.
- `PageHero` (`components/PageHero.tsx`): `maroon-950` hero with low-opacity image (`alt=""`), dual gradient overlays + `bg-grain` + `rise-in` staged content; accepts `compact?` + `children` slot. Used by most pages; above-the-fold heroes use `fetchPriority="high"`.
- `Header` (`components/Header.tsx`): fixed + `useScrolled(16)` (hook default 12 — intentional mismatch to delay transparent→solid on Home) → `maroon-950/92` translucent + blur; transparent at the top of Home. Solid when `scrolled || !isHome || mobileOpen`. Top bar (`lg` only) shows `site.address.street · site.feast.name · site.feast.date` + `Give` link-underline. Desktop dropdown opens on hover + focus (`openDesktopMenu`, `menu-in` entrance; the trigger button has no click-toggle — keyboard/touch users get it through `onFocusCapture`, so document it as hover/focus-open, closes on child-link click via `onClickCapture`), mobile drawer (`drawer-in` entrance + `drawer-item-in` 40ms stagger) is a **modal dialog** (round-4 L-5: `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"` + `tabIndex={-1}` panel focused on open, `Tab`/`Shift+Tab` focus-trap via `handleDrawerKeyDown`, focus restored to the hamburger on every close path via `drawerWasOpenRef`, outside `pointerdown` closes), whose drawer closes on any in-drawer link activation (`onClickCapture` on drawer `<nav>` — a link to the current route never changes `pathname`, so the pathname effect alone cannot close it), and `Escape` handler to close menus/drawer. Parent links carry `aria-current="page"`/`"true"` when a child route is active (e.g. `/history` → About parent current); hamburger is `h-11 w-11` (44px). `ScrollProgress` is **not** inside Header — it is decoupled and rendered by `Layout` as a fixed `h-[3px]` rail at `z-[60]`.
- `ScrollProgress` (`components/ScrollProgress.tsx`): fixed `h-[3px]` rail at `z-[60]` (`data-testid="scroll-progress"`, `aria-hidden`, `scaleX(progress)` transform-only, gradient `shrine-gold-500→300→500`). Rendered by `Layout`, not by `Header`.
- `Footer` (`components/Footer.tsx`): 4-col (`Explore` + `Get involved` from `footerNav` split + parish/visit/contact blocks), `divider-weave-thin`, and consumes `site.ts` + `nav.ts`. Copy is Franciscan/WOHA-specific (Portiuncula, Garden of Peace, Tamil at Saturday dusk, Mandarin at dawn). 4 social icons loop (Facebook/Instagram/YouTube/Telegram) + WhatsApp channel + Archdiocese + franciscans.sg links from `site.ts`; address `5 Bukit Batok East Ave 2`; Reception hours; phone `6567 3866`; copyright Franciscan. Tagline line: "A Franciscan parish since 1970, named for the Portiuncula — Mandarin at dawn…".
- `SafeImage` (`components/SafeImage.tsx`): wraps `<img>` with `fallback` default `/images/hero-church.jpg`, `loading="lazy"` default plus `useState` for `current`/`loaded`, optional `fetchPriority` (`"high"` on above-the-fold heroes — Home hero + PageHero), `onError` → `dataset.fallback="1"` guard (swap `src` once), and `transition-opacity` fade-in. All current `images.*` are local (`hero`/`heroFallback`/`chapel`/`sanctuary`/…); CDN keys `naveCdn`/`courtyardCdn` now point to local fallbacks. External CDN allowlist in CSP (`upload.wikimedia.org` + `images.pexels.com`) is legacy. Use `SafeImage` for any future external image; don't use bare `<img>` for CDN sources.
- `SkipLink` (`components/SkipLink.tsx`): `href="#main-content"` but `preventDefault`s and imperatively focuses `#main-content` (`<main>` in `Layout`) — a native jump would rewrite the hash and route to `NotFound` under `HashRouter`. Preserve this pattern.
- `Reveal` (`components/ui/Reveal.tsx`): `delay`/`as` + `IntersectionObserver` (`0.15` threshold), `reveal` → `reveal-visible` with `prefers-reduced-motion` fallback.
- `Accordion` (`components/ui/Accordion.tsx`): single-open, `aria-expanded`/`aria-controls`, keyboard `ArrowDown`/`ArrowUp`/`Home`/`End`, animated `grid-template-rows 0fr→1fr` collapse. Closed panels carry `aria-hidden="true"` + `inert` (open: `aria-hidden` undefined + `inert` undefined/false) so screen readers/keyboard skip them; `aria-expanded` on the button is the single source of truth. Testing Library note: `aria-hidden`/`hidden` elements need `{ hidden: true }` queries.
- `BackToTop` (`components/BackToTop.tsx`, mounted in `Layout` before `<Footer>`): appears when `window.scrollY > 480`, hides below (`aria-hidden` + `tabIndex -1` + `pointer-events-none` when hidden — a11y-tree queries need `data-testid="back-to-top"`; it also **blurs itself when hiding while focused** so focus never rests inside an `aria-hidden` subtree — round-3 L-4), click → `window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth' })`. Never touches the hash (HashRouter-safe). Carries a progress ring (`data-testid="back-to-top-progress"` + inner `circle[data-progress]`) whose `stroke-dashoffset` fills with `useScrollProgress` (shared source with `ScrollProgress` rail). `src/test/setup.ts` stubs `window.matchMedia`.
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
| `pnpm test` / `npm run test` | Vitest `jsdom` — `vitest run` | ✅ | **25 files / 141 tests** — `utils/cn` 5 + `data/nav` 7 + `data/content` 10 + `data/site` 7 + `utils/massDay` 5 + `utils/monogram` 7 + `ui/Button` 11 + `SkipLink` 3 + `ui/Accordion` 6 + `SafeImage` 6 + `Header` 16 + `BackToTop` 7 + `pages/Ministries` 3 + `pages/cta-bands` 4 + `pages/worship-mass` 4 + `pages/about-visuals` 3 + `pages/event-chips` 3 + `components/Timeline` 3 + `pages/NotFound` 2 + `pages/History` 2 + `Layout` 2 + `hooks/useScrollProgress` 4 + `ScrollProgress` 2 + `head` 13 + `security-headers` 6 via `src/test/setup.ts` |
| `pnpm test:watch` | Vitest watch mode (`vitest`) | ✅ | Watches 25 files |
| `pnpm test:coverage` | Vitest with coverage (`vitest run --coverage`) | ✅ | Coverage via `@vitest/coverage-v8` |
| `pnpm test:e2e` / `npm run test:e2e` | Playwright `chromium` — `playwright test` (42 tests: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 9 + enhancements-round5 6 in `e2e/`) | ✅ | Green — Bukit Batok routes (`/worship`/`/ministries`/`/serve`/`/give` + `#mass`/`#liturgical` etc.) + drawer same-route close regression + rise-in entrance + event chips + back-to-top + aria-current nav + Round-2 audit (CTA-band cream headings, head completeness, page-in transitions, scroll-progress rail + ring, drawer aria-current) + Round-4 (modal drawer dialog/aria-modal/trapped focus) + Round-5 (today Mass card, event chips, Give closing band, sticky History story, gradient timeline rail, image drift, 404 emblem) |
| `pnpm test:e2e:ui` | Playwright UI mode (`playwright test --ui`) | ✅ | |
| `pnpm test:e2e:report` | Open last Playwright HTML report (`playwright show-report`) | ✅ | |
| `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | **Pre-push gate — all five must be green** | ✅ | Mirrored in CI (`.github/workflows/ci.yml`): lint → typecheck → test → test:e2e → build + artifacts |

> Before documenting a command as available, verify it in `package.json` scripts. Gate is `lint && typecheck && test && test:e2e && build` — CI mirrors it.

### Adding Tooling

Tooling is already wired (`eslint 9.39.5` flat + `vitest 3.2.6` + `@testing-library/react 16.2.0` + `playwright 1.55.1`). When adding new tooling, verify `package.json` scripts and update this table. Previous bootstrap (for reference):

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test && npx playwright install chromium
```

## Testing Strategy

Current status: **wired — 25 unit files / 141 tests + 42 E2E, all green.** `vitest 3.2.6` (jsdom) + `@testing-library/react 16.2.0` + `jsdom 26.1.0` + `src/test/setup.ts` (`@testing-library/jest-dom/vitest` + `IntersectionObserver` mock + `window.scrollTo` stub + `matchMedia` stub) + `playwright 1.55.1` (chromium, `playwright.config.ts` + `e2e/` 6 specs, `expect.timeout` 15s). Run `pnpm test` (unit), `pnpm test:watch` (watch), `pnpm test:coverage` (coverage), `pnpm test:e2e` (E2E, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort` with `reuseExistingServer: !CI`), `pnpm test:e2e:ui` (UI mode), `pnpm test:e2e:report` (HTML report). `vitest` config lives in `vite.config.ts` `test` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` + `server.watch.ignored` for `skills`/`dist`/`coverage`/`src.orig` (archived St Joseph BT port).

Coverage — **unit (25 files / 141):** `utils/cn` (5), `data/nav` (7), `data/content` (10: lifeTimeline 8 1957–2026, grounds 3, ministries 6 Language Communities, faqs 6, upcomingEvents 6 no-href, givingOptions 8, priests 4 OFM email, ppcMembers 6, images 11 all local, etc.), `data/site` (7 — +origin/url/ogImage + hours 7 keys + mass), `utils/massDay` (5 — Sun/Sat/Mon–Fri mapping + September-2026 sweep + canonical keys), `utils/monogram` (7 — Friar/OFM honorific stripping, hyphenated, single-name duplication, empty/honorific-only, case/punctuation tolerance), `ui/Button` (11 — 8 variant/render + active press feedback + round-5 aria-hidden icon slot + `group` root class), `SkipLink` (3), `ui/Accordion` (6 — single-open + arrow/Home/End focus + inert/aria-hidden animated grid-rows collapse), `SafeImage` (6), `Header` (16 — drawer close on same-route/different-route link activation via `onClickCapture`, Escape handler, `useScrolled(16)` solid includes `mobileOpen`, aria-expanded, aria-current link + parent, 44px hamburger `h-11 w-11` + scroll-progress decoupled rail + **round-4 modal drawer: dialog semantics + `aria-modal` + initial focus on the panel + `Tab`/`Shift+Tab` focus trap + focus restore on Escape/link close**), `BackToTop` (7 — hidden/visible/hide-on-top/click smooth/reduced-motion auto + progress-ring `data-progress` dashoffset + threshold 480 hash-safe + **focus release on hide** — round-3 L-4), `pages/Ministries` (3 — 6 pills, hash-matched aria-current, no hash no current), `pages/cta-bands` (4 — Home/Serve/Give dark-band h2 explicit cream + round-5 Give closing band h2 cream + Reception facts + mailto), `pages/worship-mass` (4 — exactly one `data-today` card, matches `massDayKey(new Date())`, "Today" chip inside it, Sunday gold-dot list), `pages/about-visuals` (3 — ghost display numerals, `aria-hidden` monogram discs EC/JM/JL/RT, PPC row hover tint), `pages/event-chips` (3 — `rounded-full` gold-border chip with category + `font-display` date beside it, Home + NewsEvents via shared `EventMeta`), `pages/NotFound` (2 — ghost tau emblem `svg` + `rise-in` staged h1), `pages/History` (2 — `lg:sticky lg:self-start lg:top-28` story block + 1957→2026 capstone), `components/Timeline` (3 — `[data-testid="timeline-rail"]` gradient rail, no `border-l`, display-serif gold years, 8 dot-pulse halos), `Layout` (2 — keyed `page-in` container `data-testid page-container` `data-route`, re-key on pathname change, ScrollProgress child), `hooks/useScrollProgress` (4 — unscrollable guard, top 0, midpoint 0.5, clamp 1), `ScrollProgress` (2 — `data-testid scroll-progress` aria-hidden scaleX(0) decoupled, advances with depth), `head` (13 — favicon, theme-color, OG url/site_name/locale, og:image, twitter:card, JSON-LD drift-proof vs `site.ts`, + origin/ogImage drift + JSON-LD url + **round-3 CSP hardening: `object-src 'none'`, `base-uri 'self'`, Cloudflare beacon allowance in script-src, Referrer-Policy meta**), `security-headers` (6 — `public/_headers` exists and carries HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy — round-3 M-2).

**E2E (5 files / 36, chromium):** `e2e/smoke.spec.ts` (11 — hero + staged rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + drawer same-route close regression + event category chips + back-to-top scroll journey), `e2e/navigation.spec.ts` (8 — Worship/Ministries hover dropdowns + keyboard + SkipLink hash-preserving + footer 10 links + NotFound + Give + aria-current page link + aria-current dropdown parent), `e2e/ministries.spec.ts` (4 — 6 sections + imageAlt/details, CDN fallback `route.abort`, jump nav `Link` preserves HashRouter + aria-current pills, Home grounds → Worship anchors), `e2e/give-faq.spec.ts` (4 — Give 8 SG options + alias `/donate` + FAQ accordion with animated panel visibility + Worship Find Us + maps), `e2e/enhancements.spec.ts` (9 — Round-2 audit: dark CTA-band h2 cream on Home/Serve/Give, head completeness (favicon/theme-color/OG/twitter/JSON-LD), favicon.svg serves 200, page-in replays on route change, hash-only nav keeps same keyed node, scroll-progress rail fills (deterministic mid-depth landing — round 4), BackToTop ring dashoffset tracks depth, mobile drawer aria-current + gold, + round-4 modal drawer: dialog + `aria-modal` + initial focus + Tab/Shift+Tab trap + Escape focus restore).

Conventions: `*.test.tsx` adjacent to source, `__mocks__` only when isolating `react-router-dom`, and `src/data/content.ts` factories for fixtures. `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### When to Add More Tests (beyond the rewrite)

- Additional pure helpers (`src/utils/*`, selectors, content transforms) — unit tests.
- Routing contract — `App.tsx` alias routes + hash anchors integration (MemoryRouter) — now covered by `e2e/smoke.spec.ts` for critical paths after rewrite.
- Critical journeys — expand `e2e/` beyond smoke: devotion flows, map embed, Garden of Peace/Piazza copy, feast page, language Masses.
- Visual / a11y — add `axe` scan + `playwright` trace/video (already `on-first-retry`).

## Code Quality Standards

### Linting & Formatting (wired)

`eslint 9.39.5` flat config (`eslint.config.js`) — `typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0` (ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig`). Run `pnpm lint` (`eslint . --max-warnings 0`) and `pnpm lint:fix` (`eslint . --fix`) for auto-fix.

Gate for pre-ship (5-step):

```bash
pnpm lint               # eslint flat — no warnings
pnpm typecheck          # tsc --noEmit
pnpm test               # vitest jsdom — 25 files / 141 tests
pnpm test:e2e           # playwright chromium — 42 tests (6 specs)
pnpm build              # vite build — singlefile inlines correctly
```

### Type Safety

- No `any`; `as any` is a last resort with a `// ponytail:` ceiling comment.
- `unknown` + narrowing at trust boundaries (URL params, external JSON).
- Keep `tsconfig.json` strict flags on; do not relax to silence errors.
- Prefer `interface` for shapes, `type` for unions/intersections. `EventItem.category` is a string union (`Parish|Devotion|Formation|Archdiocese`); `GivingOption.icon` is a union of 8 icon names (`flame|church|sprout|heart|book|hand-heart|landmark|globe`); `Priest.email?: string` (not `phone`); `serveRoles` items have `title` + `summary` (not `description`).

### Styling Discipline

- Use existing `shrine-*` tokens before introducing new colors. Tokens 24+2 shadows are the budget — frame Bukit Batok WOHA/Garden/Portiuncula imagery with them, don't add arbitrary `bg-[#...]`.
- No redundant CSS: extend `@theme` or add a named `@utility`; do not duplicate utilities across components.
- Keep bespoke CSS to `src/index.css` `@layer` blocks. Document new utilities (`text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `gold-rule`, `hero-ken-burns`, `rise-in`+`-d1..d4`, `menu-in`, `drawer-in`, `dot-pulse`, `card-lift`, `link-underline`, `reveal`, `skip-link`, `mask-fade-b`, `page-in`, etc.) alongside them.

## Git & Version Control

### Branching

- `main` is the deploy branch (single-file artifact).
- Feature branches: `feat/<slug>`, fixes: `fix/<slug>`, docs: `docs/<slug>`. Short-lived (1–3 days), rebase or squash-merge.
- Do not commit `node_modules/`, `.next/`, `dist/`. `skills/` **is committed but pruned** (round 3, 2026-08-30: the 873-file skeleton without `SKILL.md` contents or `skills-catalog.md`; full historical tree at `c774ed9`) — do not import or lint it; `eslint.config.js` ignores and `vite.config.ts` `server.watch.ignored` excludes it. **`src.orig/` is the archived St Joseph BT port** (Rother Shrine → St Joseph BT → St Mary of the Angels, 35 src + 16 tests + 1 setup retained locally, untracked since round 3 — `git rm -r --cached` + `.gitignore` active — NOT committed, NOT linted/built); its `eslint` + `vite.config.ts` `server.watch.ignored` entries are active guards — do not re-add it to lint/tsc scope or reintroduce its content. Never commit secrets: `docs/ssh-key.txt` was untracked in round 3 (C-1) for exactly this reason.

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
`actions/checkout@v4` → `pnpm/action-setup@v4` (`version: 11`) → `actions/setup-node@v4` (`node-version: 24`, `cache: pnpm`) → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `npx playwright install --with-deps chromium` → `pnpm test:e2e` → `pnpm build` → artifacts: `playwright-report/` (on failure, `retention-days: 14`) + `dist/` (always, `retention-days: 7`).

Primary artifact `dist/index.html` (+ `dist/images/` copied from `public/` — `viteSingleFile` inlines JS+CSS, not `publicDir`) deploys directly to GitHub Pages (via `gh-pages` branch or `dist` artifact — upload both) or S3 — `HashRouter` avoids 404s on static hosts (deep links `/#/worship`, `/#/ministries#liturgical` resolve without a `404.html` redirect).

## Error Handling & Debugging

- SPA has no server failures; handle: broken image fallbacks (`SafeImage` → `/images/hero-church.jpg` fallback default, `dataset.fallback` guard), unknown routes → `NotFound` (`pages/NotFound.tsx` — "This path does not lead to the church." + `Return home` / `Mass times`), and empty content states per page (every list has an empty state if data is async in future).
- `Layout` scroll logic should degrade gracefully when a `#hash` target is missing (current behavior: falls back to `window.scrollTo({ top: 0 })`). Preserve the `resolveAnchor` double-hash handling when extending layout concerns. Layout is `ScrollProgress` + `SkipLink` + `Header` + keyed `page-in` outlet + `Footer` + `BackToTop`.
- `SafeImage` fallback pattern: guards `onError` with `dataset.fallback="1"` so the swap to `/images/hero-church.jpg` (or explicit `fallback`) fires once. Current `images.*` are all local but keep `SafeImage` for any future external image — use it instead of bare `<img>` for CDN sources; legacy CSP allowlist `upload.wikimedia.org` + `images.pexels.com` retained, unused. E2E `route.abort` fallback exercise remains valid.
- For future data fetching (CMS/API): wrap with error boundaries and show user-friendly messages; never leak raw errors.
- Debugging: Vite HMR overlay + React DevTools. For `HashRouter` issues, inspect `location.pathname` + `location.hash` in `Layout`'s `useEffect` (log `window.location.hash` and `resolveAnchor` output).

## Communication & Documentation

- Explain _why_ behind parish-specific choices (historical wording — 1957 friars / Olçomendy / 1970 Portiuncula / 2004 WOHA house of light / Jubilee monstrance / Garden of Peace & Piazza Mary west facing Corpus / St Francis & Clare + Anthony fishes + Gubbio; liturgical dates — 2 August Portiuncula; pastoral tone — Mandarin at dawn/Tamil at Saturday dusk, OFM, facebook/instagram/youtube/telegram/whatsapp).
- Keep `docs/prompts.md` for lineage prompts; update when intent shifts. Lineage: Rother Shrine → St Joseph BT (`src.orig/`) → St Mary of the Angels (`src`).
- Document new routes, tokens, or images in this file and in `src/data/nav.ts` / `src/data/content.ts` / `src/data/site.ts` comments where applicable.
- Preserve dual-route aliases when renaming legacy paths (external links and printed bulletins exist — keep `/volunteer`→`/serve`, `/donate`→`/give`, `/hours-location`→`/worship`, etc. or add explicit redirects).

## Project-Specific Standards

### Architecture

```
src/ (64 files — 38 source + 25 tests + 1 setup)
  App.tsx                # HashRouter + route table: 17 Route entries (16 content paths + * NotFound), 5 alias groups / 7 alias paths + 9 hash anchors (Layout outlet)
  main.tsx               # StrictMode + createRoot
  index.css              # Tailwind v4 @theme (24 colors + 2 shadows) + @layer base/utilities (26 utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, img-zoom, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, link-underline, skip-link + 8 keyframes gold-rule-draw/hero-ken-burns/rise-in/menu-in/drawer-in/drawer-item-in/page-in/halo-pulse + themed scrollbar (maroon thumb on parchment track, webkit + scrollbar-color))
  components/
    Layout.tsx           # SkipLink + ScrollProgress (fixed rail z-[60] scaleX) + Header + Outlet in a keyed-by-pathname `page-in` wrapper (route changes remount + replay entrance; hash-only updates keep the same node so anchor scroll is undisturbed; data-testid page-container, data-route) + Footer + BackToTop + double-hash scroll/hash restoration (split on # + strip / + 80ms setTimeout + fallback window.scrollTo)
    Header.tsx           # fixed + useScrolled(16) (hook default 12) → maroon-950/92 translucent + blur; transparent at top of Home, solid = scrolled||!isHome||mobileOpen + top bar (lg: site.address.street·site.feast.name · site.feast.date + Give link-underline) + desktop hover (openDesktopMenu, menu-in entrance, closes on child-link click, aria-current parent/link states) + mobile modal drawer (round-4 L-5: role=dialog + aria-modal + Site menu label + tabIndex=-1 panel focused on open + handleDrawerKeyDown Tab/Shift+Tab trap + focus restore to hamburger via drawerWasOpenRef + outside pointerdown close; drawer-in entrance + drawer-item-in 40ms stagger) whose drawer closes on any in-drawer link activation (onClickCapture on drawer nav — same-route taps never change pathname) + drawer aria-current (leaf `page`, parent section `true` when a child route is active, both gold) + hash-aware + Escape handler + h-11 w-11 (44px) hamburger
    ScrollProgress.tsx   # decoupled hairline rail fixed at z-[60] h-[3px]; scaleX(progress) transform-only, aria-hidden, data-testid scroll-progress (Layout renders it, not Header)
    Footer.tsx           # 4-col (parish blurb Franciscan/WOHA/Tamil + Explore/Get involved from footerNav + visit/contact) + divider-weave-thin + Franciscan copy + 4-social loop (Facebook/Instagram/YouTube/Telegram from site.ts) + address 5 Bukit Batok East Ave 2 + Reception hours + phone 6567 3866 + copyright Franciscan
    PageHero.tsx         # maroon-950 hero + SafeImage (opacity-35, fetchPriority="high") + dual gradients + bg-grain + rise-in staged eyebrow/title/description/children; props: eyebrow/title/description/image/fallback/compact? (compact tightens pt/pb)
    SafeImage.tsx        # <img> wrapper: fallback="/images/hero-church.jpg", loading="lazy" default, state for current/loaded, fade-in, onError→dataset.fallback guard (once), optional fetchPriority ("high" on above-the-fold heroes), transition-opacity
    SkipLink.tsx         # preventDefault + imperative focus on #main-content (never rewrites hash under HashRouter)
    BackToTop.tsx        # fixed bottom-right (44px target, maroon-900 + gold ring + SVG progress ring sharing useScrollProgress — gold stroke-dashoffset fills with reading depth): appears when scrollY > 480, data-testid back-to-top + data-testid back-to-top-progress + circle[data-progress] dashoffset, aria-hidden + tabIndex -1 + pointer-events-none when hidden (+ blurs itself when hiding while focused — round-3 L-4), click → window.scrollTo (behavior auto under prefers-reduced-motion via matchMedia; never touches the hash)
    Emblem.tsx / Timeline.tsx (left rail, now 1957–2026, dot-pulse halos) / SocialIcons.tsx (4: Facebook/Instagram/YouTube/Telegram)
    ui/                  # Button (discriminated to/href/button + primary/secondary/ghost/outline-light + icon + active press feedback) / Container (max-w-7xl px-5 sm:px-8) / SectionHeading (eyebrow/title/description + align/light + gold-rule) / Accordion (single-open, aria-expanded, keyboard Arrow/Home/End, animated grid-rows 0fr→1fr collapse with aria-hidden inert closed panels) / Reveal (delay/as + IntersectionObserver 0.15 + prefers-reduced-motion)
  hooks/
    useScrolled.ts       # threshold 12 default; Header passes 16 — intentional mismatch (delayed transparent→solid on Home)
    useScrollProgress.ts # reading progress 0..1 (scrollY / (scrollHeight - innerHeight)), rAF-throttled, guarded against unscrollable docs (max <= 0 → 0), clamped — shared by ScrollProgress rail + BackToTop ring
  pages/ (10, named exports)
    Home.tsx             # hero (local) rise-in staged + quickFacts (site.mass/MRT/feast/confession from site) + welcome (site.tagline "Towards a Prayerful & Missionary Parish." / vision "According to Thy Word.", 1957/1958/Portiuncula/WOHA narrative) + grounds preview (3: Main Church east-west Corpus / Adoration Chapel Jubilee monstrance daily 7–21.30 / Garden of Peace & Piazza Mary west + Francis/Clare + Anthony fishes + Gubbio) → /worship anchors + events (4 from upcomingEvents: First Holy Communion / CGS / WYD 2027 / Beatitudes)
    About.tsx            # pillars (Prayer/Formation/Mission) + clergy (priests[4] OFM with email) + PPC table (ppcMembers[6] ex-officio friars + vision Custody)
    History.tsx          # lifeTimeline (8, 1957–2026) via Timeline: 1957 friars arrive → 1958 Olçomendy chapel → 1970 Portiuncula parish → 1985–2003 west grows → 2004 WOHA consecrated → 2006 Design of Year → 2025 Jubilee monstrance → 2026 Pray·Form·Go
    Worship.tsx          # #mass (site.mass: weekdayMorning Mon–Fri 7/12.15 / weekdayEvening 18.30 / saturday 16/18 + Tamil 19.45 / sunday[6] 7.15 Mandarin + 9/11/13/17/19 English + note Main Church L1 English) + #confession (confession wknd 30 min before 7 slots + adoration daily 7–21.30 + devotions[6]: St Anthony Tue 18.30 / Adoration daily / Reconciliation wknd / Lauds / Deaf Community Sun 16.00 / Portiuncula 2 Aug) + #visit (address 5 Bukit Batok East Ave 2 659918 / buses Ave2/3/4/6 + MRT Bukit Batok NS2 · Beauty World DT5 + mapsEmbedSrc iframe + mapsUrl)
    Ministries.tsx       # jump nav (<Link to="/ministries#id"> 6 pills: liturgical/faith-formation/pastoral-care/family-life/youth/mandarin) + ministries[6] alternating shrine-cream/parchment sections (last is Language Communities: Mandarin 7.15 Tamil 19.45 Sinhala Malayalam Indonesian)
    NewsEvents.tsx (compact PageHero) / Serve.tsx (serveRoles[4] summary: liturgical/catechists/pastoral/hospitality + no section ids) / Give.tsx (givingOptions[8]: PayNow 4053H / Poor & Needy HRSM / Tap&Give / Church Maintenance Fund / cheque Church of St Mary of the Angels / cash Reception / General Church Offering / Mass offerings) / FAQ.tsx (faqs[6]: Mass/confession/how to get there/parking/baptism-marriage/columbarium funeral via Accordion grid-rows + inert) / NotFound.tsx ("This path does not lead to the church." + Return home / Mass times)
  data/
    nav.ts               # primaryNav (6, 3 with children+description: About[3]/Worship[3]/Ministries[3] — Franciscan/WOHA wording) / footerNav (10) (single source; Header/Footer render from it)
    content.ts           # Typed data layer: 8 interfaces + 10 exports — priests[4] (Esmond Chua, Julian Mariaratnam, Justin Lim, Robin Toha — OFM, email?: string, not phone) + ppcMembers[6] (4 friars ex-officio + vision Prayer·Formation·Mission + Custody St Anthony) + lifeTimeline[8] 1957–2026 (Franciscan Bukit Batok, WOHA 2004, Jubilee monstrance) + grounds[3] (main-church/chapel/rosary-garden → Main Church/Adoration Chapel/Garden of Peace & Piazza + image/imageFallback/imageAlt — all local) + ministries[6] (liturgical/faith-formation/pastoral-care/family-life/youth/mandarin Language Communities + imageFallback) + faqs[6] (Mass/confession/how to get there/parking/baptism-marriage/columbarium funeral) + upcomingEvents[6] (First Holy Communion 29 Aug 2026 / CGS info / WYD 2027 / Beatitudes retreat / art exhibition / Jubilee Year — title+date+summary+category Parish|Devotion|Formation|Archdiocese + optional href currently none) + givingOptions[8] (PayNow T08CC4053H / Poor & Needy HRSM / Tap & Give / Church Maintenance / cheque Church of St Mary of the Angels / cash at Reception / General Church Offering / Mass offerings + icon union flame|church|sprout|heart|book|hand-heart|landmark|globe) + serveRoles[4] (title+summary) / devotions[6] (title+when+where: St Anthony Tue 18.30 / Adoration daily / Reconciliation wknd / Lauds / Deaf Community Sun 16.00 / Portiuncula 2 Aug) untyped consts + images {hero/heroFallback/chapel/sanctuary/garden/glass/hall/cemetery/feast local + naveCdn/courtyardCdn local aliases} (11 keys, all local, each grounds/ministry item carries imageFallback)
    site.ts              # canonical single source (as const): name Church of St Mary of the Angels / shortName St Mary's Bukit Batok / chineseName 天神之后圣母堂 / tagline Towards a Prayerful & Missionary Parish. / vision According to Thy Word. + address 5 Bukit Batok East Ave 2 Singapore 659918 (street/city/zip/full+query getters) + hours (7: gates Daily 7–21.30 / mainChurch Open for Mass / chapel Adoration Chapel daily 7–21.30 / reception Mon–Sat 9–18 lunch 13–14 Sun 9–13 closed public holidays / parishOffice Mon–Fri 9–18 / columbarium daily 7.30–21.30 / adorationRoom daily 7–21.30) + mass (weekdayMorning Mon–Fri 7.00 with Morning Prayer + 12.15 Main Church / weekdayEvening Mon–Fri 18.30 Main Church / saturday 16.00/18.00 + 19.45 Tamil / sunday[6] 7.15 Mandarin + 9/11/13/17/19 English / confession wknd 30 min before 7 slots Sat 15.30/17.30 Sun 8.30/10.30/12.30/16.30/18.30 / adoration daily 7–21.30 / secondCollection CMOF + note All Masses Main Church L1 English unless indicated) + contact (parishPriestPhone +65 6567 3866 = officePhone, emergency +65 9682 7875, columbariumPhone +65 6560 6361 / afterHours +65 9774 7053, email parish.stmary@catholic.org.sg / connect.stmary@catholic.org.sg) + transport (MRT Bukit Batok NS2 · Beauty World DT5, buses Ave 6:61,66,157,174,178,852,871 Ave 2:970,985 Ave 3:61,77,106,157,174,178,506,852,963,990 Ave 4:173,177,963) + feast Our Lady of the Angels · Portiuncula 2 August + uen T08CC4053H / uenPoorNeedy T08CC4053HRSM / chequePayee Church of St Mary of the Angels / facebook/instagram/youtube/telegram/whatsapp/archdiocese/franciscans.franciscans.sg / mapsUrl/mapsEmbedSrc (5 Bukit Batok East Ave 2) + origin https://www.stmary.sg / url / ogImage (canonical — drift-checked by head.test.ts) — Footer + Worship + About consume it, don't duplicate
  utils/
    cn.ts                # twMerge(clsx) — always merge via cn()
  test/
    setup.ts             # vitest jsdom setup (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView stubs + matchMedia stub)
  **/*.test.{ts,tsx}     # 25 files / 141 tests: utils/cn (5), data/nav (7), data/content (10), data/site (7), utils/massDay (5), utils/monogram (7), ui/Button (11), SkipLink (3), ui/Accordion (6), SafeImage (6), Header (16), BackToTop (7), pages/Ministries (3), pages/cta-bands (4), pages/worship-mass (4), pages/about-visuals (3), pages/event-chips (3), components/Timeline (3), pages/NotFound (2), pages/History (2), Layout (2), hooks/useScrollProgress (4), ScrollProgress (2), head (13), security-headers (6)
public/
  images/ (8)            # hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); all images local — CDN keys hero/naveCdn/courtyardCdn now point to local fallbacks (CSP legacy allowlist: upload.wikimedia.org, images.pexels.com)
  _headers               # Cloudflare Pages security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) → dist/_headers; guarded by src/security-headers.test.ts (round-3 M-2)
vite.config.ts           # alias @→src + test { globals, jsdom, setupFiles: src/test/setup.ts, include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**] + viteSingleFile()
tsconfig.json            # strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts] + types [node, vitest/globals] + paths @/*
eslint.config.js         # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh); ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
playwright.config.ts     # Playwright 1.55.1 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s; CSP is a meta tag in index.html, not a config header)
index.html               # Google Fonts Fraunces + Source Sans 3; CSP allows images from Wikimedia+Pexels (legacy) and frames from google.com; favicon.svg + theme-color maroon-950 + full OG (url https://www.stmary.sg/ / site_name Church of St Mary of the Angels / locale en_SG / image hero-church + alt) + twitter summary_large_image + Church JSON-LD (name/alternateName [St Mary's Bukit Batok/天神之后圣母堂]/address 5 Bukit Batok/659918/hours/sameAs + telephone 6567 3866 — drift-checked against site.ts by src/head.test.ts); base description Franciscan 1970 + viewport; #root + /src/main.tsx
e2e/ (6 specs / 42 tests) # smoke (11) + navigation (8) + ministries (4) + give-faq (4) + enhancements (9) + enhancements-round5 (6) + helpers.ts
.github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e (chromium) → build + artifacts (Node 24, pnpm 11, pnpm-lock committed, --frozen-lockfile)
src.orig/                # Archived previous port — St Joseph's Church (Bukit Timah) — retained locally as src.orig/ (35 src + 16 tests + 1 setup), untracked since round 3 (gitignored, NOT committed); NOT linted/built; eslint + vite-watch ignore entries are active guards; lineage: Rother Shrine → St Joseph BT (src.orig) → St Mary of the Angels (src)
```

- **SafeImage fallback pattern:** `SafeImage.tsx` guards `onError` with `dataset.fallback="1"` so the swap to local `/images/hero-church.jpg` (or explicit `fallback`) fires once, with `opacity` fade-in via `loaded` state. Use `SafeImage` for every external image; never bare `<img>` for CDN sources. All current `images.*` are local so fallback is local→local, but keep the guard for any future external image. Legacy CDN allowlist remains `upload.wikimedia.org` + `images.pexels.com` (retained, unused).

- **Data ownership:** Content arrays in `content.ts` (`Priest` with `email?: string`, `PpcMember`, `TimelineEntry` 1957–2026 Franciscan Bukit Batok, `GroundsPlace` 3 → Main Church/Adoration Chapel/Garden of Peace & Piazza, `Ministry` 6 ending in Language Communities, `FaqItem` 6, `EventItem` 6 + optional `href` (currently none) + `category` union `Parish|Devotion|Formation|Archdiocese`, `GivingOption` 8 with `icon` union, plus `serveRoles` 4 (`title`+`summary`)/`devotions` 6 (`title`+`when`+`where`)/`images` 11 all local) + `site.ts` Franciscan facts + `nav.ts` nav are the single source. Pages render from these arrays — do not inline copy that belongs in `data/`. Historical narrative lives in `lifeTimeline[8]` (1957 friars arrive → 1958 Olçomendy chapel → 1970 Portiuncula parish → 1985–2003 west grows → 2004 WOHA consecrated → 2006 Design of Year → 2025 Jubilee monstrance → 2026 Pray·Form·Go) and `grounds[3]` (Main Church east-west Corpus + Adoration Chapel daily 7–21.30 + Garden of Peace & Piazza Mary west / Francis & Clare / Anthony fishes / Gubbio).
- **Routing model:** Client-side only; no loaders or server components. Alias groups (5 → 7 paths) are intentional: `/worship` canonical for `/mass-times`+`/hours-location`+`/visit`, `/ministries` canonical for `/ministry`, `/news-events` canonical for `/news-and-events`, `/serve` canonical for `/volunteer`, `/give` canonical for `/donate`. Nav is driven by `src/data/nav.ts` — Header dropdowns + `Ministries` jump nav + Footer all render from it. Current anchor targets are `#mass`/`#confession`/`#visit` on `/worship` and `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` on `/ministries`; keep `Layout`'s `resolveAnchor` aware when adding more.
- **No global store yet.** Lift state only when cross-page need proves itself. Current state is `useState` for `Header` menus/drawer + `Accordion` single-open + `Reveal` visibility + `useScrollProgress` rAF.

### File Organization & Naming

- Components: `PascalCase.tsx` (e.g., `PageHero.tsx`, `SafeImage.tsx`); hooks: `useThing.ts` (`hooks/useScrolled.ts` threshold `12` default, `16` in `Header` — intentional delay; `hooks/useScrollProgress.ts` rAF).
- Data/utils: `camelCase.ts` (`content.ts`, `site.ts`, `nav.ts`, `cn.ts`).
- Pages: `PascalCase.tsx` matching route intent (`About.tsx`, `History.tsx`, `Worship.tsx`, `Ministries.tsx`, `NewsEvents.tsx`, `Serve.tsx`, `Give.tsx`, `FAQ.tsx`, `NotFound.tsx`) — 10 pages, all named exports (`Home`, `About`, `History`, `Worship`, `Ministries`, `NewsEvents`, `Serve`, `Give`, `FAQ`, `NotFound`).
- Assets: `public/images/<slug>.jpg` (8 files) — reference as `/images/<slug>.jpg` (absolute from root, Vite `publicDir` → `dist/images/` — upload alongside `dist/index.html`; singlefile inlines JS+CSS, not `public/`). Local keys: `hero`/`heroFallback`/`chapel`/`sanctuary`/`garden`/`glass`/`hall`/`cemetery`/`feast`; `naveCdn`/`courtyardCdn` now alias local `sanctuary`/`garden`.
- Tests: `*.test.{ts,tsx}` adjacent to source — **25 files / 141 tests**: `src/utils/cn.test.ts` (5), `src/data/nav.test.ts` (7), `src/data/content.test.ts` (10), `src/data/site.test.ts` (7), `src/utils/massDay.test.ts` (5), `src/utils/monogram.test.ts` (7), `src/components/ui/Button.test.tsx` (11), `src/components/SkipLink.test.tsx` (3), `src/components/ui/Accordion.test.tsx` (6), `src/components/SafeImage.test.tsx` (6), `src/components/Header.test.tsx` (16), `src/components/BackToTop.test.tsx` (7), `src/components/Layout.test.tsx` (2), `src/components/ScrollProgress.test.tsx` (2), `src/hooks/useScrollProgress.test.ts` (4), `src/pages/Ministries.test.tsx` (3), `src/pages/cta-bands.test.tsx` (4), `src/pages/worship-mass.test.tsx` (4), `src/pages/about-visuals.test.tsx` (3), `src/pages/event-chips.test.tsx` (3), `src/pages/NotFound.test.tsx` (2), `src/pages/History.test.tsx` (2), `src/components/Timeline.test.tsx` (3), `src/head.test.ts` (13), `src/security-headers.test.ts` (6) + `src/test/setup.ts` (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView + matchMedia stubs). `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### Design System

- Tokens: see `src/index.css` `@theme`. Additions require design rationale in PR description. Tokens 24 colors + 2 shadows: `shrine-cream/parchment/parchment-dark/stone/ink/charcoal`, `maroon-50..950` (8), `gold-100..600` (5), `pine-500..700` (3), `terracotta-400/500` (2) + `shadow-shrine/shrine-lg`. Only the imagery/content they frame is Bukit Batok Franciscan (WOHA 2004 house of light, Garden of Peace, Portiuncula, OFM — not Palladian 1853 / Kranji / Mauduit) — keep tokens stable.
- Typography scale: `Fraunces` for display/quote, `Source Sans 3` for body. Use `font-display` class for intentional display turns. `index.html` loads both with `preconnect`.
- Elevation: `shadow-shrine` (`0 20px 60px -20px rgba(51,16,15,.45)`) and `shadow-shrine-lg` (`0 40px 90px -30px rgba(51,16,15,.55)`). Use sparingly (hero, cards, emblem).
- Utilities (24 + keyframes): `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`/`divider-weave-thin`, `gold-rule`/`gold-rule-left` (+ `gold-rule-draw`), `hero-ken-burns` (+ `hero-ken-burns`), `rise-in`+`-d1..d4` (+ `rise-in`), `menu-in` (+ `menu-in`), `drawer-in` (+ `drawer-in`), `drawer-item-in` (+ `drawer-item-in`), `page-in` (+ `page-in`), `dot-pulse` (+ `halo-pulse`), `card-lift`, `link-underline`, `reveal`/`reveal-visible`, `skip-link`, `mask-fade-b` + themed scrollbar. `prefers-reduced-motion: reduce` disables `reveal` + `hero-ken-burns` + all entrance animations + smooth scroll via `@layer base`/`@layer utilities` overrides.
- Do not introduce purple gradients, `Inter` defaults, or generic card-grid templates — anti-generic enforcement (see Avant-Garde stance below).
- Reference skill: `avant-garde-design-v4` for direction when adding new sections; extract from www.stmary.sg only via `agent-browser` workflows when explicitly requested.

### State & Data Layer

- No API or DB. Content arrays in `src/data/content.ts` (plus `site.ts` canonical facts, `nav.ts` nav) are the data layer. Validate shape with TypeScript interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest` with `email?: string`, `PpcMember`) and the `images` const; add Zod schemas only if external data arrives.
- `EventItem` shape is `{ title, date, summary, category: Parish|Devotion|Formation|Archdiocese, href?: string }` — currently `href` is optional and none of the 6 upcoming events carry it. Do not reintroduce `location`.
- `GivingOption` icons are Singapore/St Mary-specific: `flame` (General Church Offering), `church` (Tap & Give), `sprout` (Mass offerings), `heart` (cash at Reception), `book` (cheque), `hand-heart` (Poor & Needy HRSM), `landmark` (Church Maintenance Fund), `globe` (PayNow T08CC4053H) — 8 options covering UEN/collection/cheque/cash/offerings.
- `serveRoles` shape is `{ title, summary }` (`summary` not `description`); `devotions` shape is `{ title, when, where }` (6: St Anthony Tue 18.30 / Adoration daily / Reconciliation wknd / Lauds / Deaf Community Sun 16.00 / Portiuncula 2 Aug).
- For future CMS integration (e.g., Sanity), isolate fetch + Portable Text rendering behind a `lib/cms` boundary and keep `content.ts` as the local fallback.

### Environment Variables

| Variable | Purpose | Example | Status |
|----------|---------|---------|--------|
| `VITE_*` | Client-exposed Vite vars (prefix required for `import.meta.env` exposure) | `VITE_MAPS_KEY=...` | None required yet — no `.env` contract; `site.ts` hard-codes `mapsUrl`/`mapsEmbedSrc` with Google `?api=1&query=` + `&output=embed` (5 Bukit Batok East Ave 2) |
| _none_ | _No backend, no DB, no SSR_ | — | — |

When adding vars, document them here and in `.env.example`, and guard with `import.meta.env` typing in `src/env.d.ts`. `VITE_*` is the only prefix Vite exposes to the client. Never duplicate `site.ts` address/hours/mass across pages when a var is added — keep `site.ts` canonical.

### Accessibility & SEO

- `index.html` ships `lang="en"`, `viewport`, CSP, Referrer-Policy meta, `description` ("A Franciscan parish in Bukit Batok since 1970…"), preconnected Google Fonts (Fraunces + Source Sans 3), and Open Graph (`og:title`/`og:description` = Church of St Mary of the Angels + www.stmary.sg). CSP allowlist: `default-src 'self'`, `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com` (beacon allowance for the Cloudflare Pages deploy — round-3 H-2), `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src https://fonts.gstatic.com data:`, `img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org` (legacy retained, unused — all `images.*` now local), `frame-src https://www.google.com` (maps embed), `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'` (round-3 hardening M-2). `<meta name="referrer" content="strict-origin-when-cross-origin">` pins referrer behavior the host header does not provide.
- CSP maps embed: `frame-src https://www.google.com` for `site.mapsEmbedSrc` (`https://www.google.com/maps?q=5+Bukit+Batok+East+Ave+2,+Singapore+659918&output=embed`); images legacy allowlist for future external images. Host-level headers that a meta tag cannot express (HSTS, `X-Content-Type-Options`, `X-Frame-Options`) ship via `public/_headers` (Cloudflare Pages; `src/security-headers.test.ts` guards the directives).
- Header mobile toggle uses `aria-label` + `aria-expanded`; dropdowns expose `aria-expanded` + `description` on children via `primaryNav`. Mobile drawer is a **modal dialog** (round-4 L-5): `role="dialog"` + `aria-modal="true"`, initial focus on the panel, `Tab`/`Shift+Tab` focus trap, focus restored to the hamburger on close, outside `pointerdown` closes; body scroll locked via `document.body.style.overflow` + `Escape` handler. Hamburger `h-11 w-11` (44px). `aria-current` contract: Header plain links `aria-current="page"` when `pathname === to`; dropdown parent buttons `aria-current="true"` when any child route matches; dropdown children `aria-current="page"` on exact `pathname+hash`; Ministries pills `aria-current="true"` on hash match; mobile drawer parents `aria-current="page"` when child active.
- Images: `alt` for content (`chapel`, `sanctuary`, `garden`, etc. all have `imageAlt`; `grounds`/`ministries` cards preserve `imageAlt`), `alt=""` for decorative hero overlays where `PageHero` does. All `images.*` now local but still carry `imageAlt`.
- Skip link: `SkipLink.tsx` `preventDefault`s and focuses `#main-content` with `tabindex="-1"` + `scrollIntoView` — it never rewrites the hash (route loss under `HashRouter`). Covered by `src/components/SkipLink.test.tsx` (3 tests) and `e2e/navigation.spec.ts`.
- `Accordion` provides `aria-expanded`/`aria-controls`/`role="region"` + keyboard `ArrowDown`/`ArrowUp`/`Home`/`End` navigation + `aria-hidden`/`inert` toggling (closed `aria-hidden="true"` + `inert`, open `aria-hidden` undefined).
- Keep color contrast ≥ 4.5:1 for body text (`shrine-ink` on `shrine-cream` meets it; verify new pairings — `shrine-cream/75` on `maroon-950` and `shrine-charcoal/80` on `cream` are the critical checks).
- `prefers-reduced-motion: reduce` disables `reveal`, `hero-ken-burns`, `rise-in`, `menu-in`, `drawer-in`, `page-in`, `dot-pulse` + smooth scroll via `@layer base`/`@layer utilities` overrides.
- SEO: `index.html` OG `og:url` = `https://www.stmary.sg/` + `og:image` = `https://www.stmary.sg/images/hero-church.jpg` + `og:image:alt`; Church JSON-LD `name` Church of St Mary of the Angels / `alternateName` [St Mary's Bukit Batok, 天神之后圣母堂] / `address` 5 Bukit Batok East Ave 2 659918 / `telephone` +65 6567 3866 / `sameAs` facebook/instagram/youtube/telegram/catholic.sg — drift-checked by `src/head.test.ts` against `site.ts` + `site.ogImage`/`site.url`.

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
- **Reintroducing St Joseph / Rother-era content or reassigning `site.ts` facts** — hours (7 keys), mass (weekdayMorning/weekdayEvening/saturday/sunday[6]/confession/adoration/secondCollection + note), address 5 Bukit Batok East Ave 2 659918, and `images` are the single source — don't duplicate them across pages or swap in 620 Upper Bukit Timah / 678116 / 1845 Mauduit / Palladian / Kranji / Cashew / Rosary Garden / cemetery / 1 May imagery. `site.ts` is canonical; pages render from it. UEN is T08CC4053H (+ HRSM), not T08CC4043C.
- **Bare `<img>` for CDN sources** — any future external CDN image must go through `SafeImage` with `fallback` to `/images/hero-church.jpg`; don't use bare `<img>` for CDN sources even though current images are local.
- **Ignoring `noUnusedLocals`/`noUnusedParameters`** — `tsc --noEmit` will fail on dead code; clean before commit.
- **Forgetting `ScrollProgress` is decoupled** — it lives in `Layout` at `z-[60]` (not inside `Header`). Don't re-nest it.

## Success Metrics

You are done when:

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (25 files / 141 tests), `pnpm test:e2e` (42 tests, chromium), and `pnpm build` are all green (183 total — 25 unit files + 6 E2E specs via `lint && typecheck && test && test:e2e && build`).
- All 10 pages + 7 alias paths in 5 groups (`/worship`↔`/mass-times`↔`/hours-location`↔`/visit`; `/ministries`↔`/ministry`; `/news-events`↔`/news-and-events`; `/serve`↔`/volunteer`; `/give`↔`/donate`) + 9 hash anchors (`#mass`/`#confession`/`#visit` on `/worship` + `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` on `/ministries`; plus `/serve` has no anchors) navigate correctly, including direct hash URLs on static hosts (HashRouter, no 404.html needed, `Layout`'s double-hash `resolveAnchor` survives `/#/ministries#liturgical`).
- Header is fixed, `useScrolled(16)` translucency works (transparent at top of Home → `maroon-950/92` blur on scroll; `solid = scrolled||!isHome||mobileOpen`), top bar (`lg`) shows `5 Bukit Batok East Ave 2 · Our Lady of the Angels · Portiuncula · 2 August` + `Give →/give`, mobile drawer closes on any in-drawer link via `onClickCapture` (+ `Escape`) and opens as a modal dialog with trapped focus (round-4 L-5: dialog/aria-modal/initial-focus/focus-restore/outside-tap), desktop Worship/Ministries dropdowns show children + `description` with `aria-current` parent/child states, hamburger `h-11 w-11` (44px), and keyboard + `SkipLink` (`#main-content`, hash-preserving, `tabindex="-1"`) covers all nav items. `ScrollProgress` decoupled rail at `z-[60]` tracks `useScrollProgress`.
- Content renders from `src/data/*` without inline duplication: `content.ts` 8 interfaces (1957–2026 timeline 8, `grounds` 3 Main Church/Adoration Chapel/Garden of Peace & Piazza, `ministries` 6 with Language Communities jump nav, `faqs` 6, `upcomingEvents` 6 Parish/Devotion/Formation/Archdiocese no `href`, `givingOptions` 8, `priests` 4 OFM email, `ppcMembers` 6, `serveRoles` 4 `summary`, `devotions` 6, `images` 11 all local) + `site.ts` hours 7 keys + mass 7 keys + address/CSP/phones/transport/feast/UEN T08CC4053H/HRSM + nav `primaryNav` 6 / `footerNav` 10; new tokens live in `src/index.css` `@theme` (24 colors + 2 shadows).
- `SafeImage` fallback verified (guard via `dataset.fallback` to `/images/hero-church.jpg`), no `any`, no unused locals/params, no missing `imageAlt`/`alt` on content images, every `PageHero` supplies `image`+`fallback`, `NotFound` reads "This path does not lead to the church" + offers `Return home` → `/` and `Mass times` → `/worship`, CI artifacts green. `BackToTop` threshold 480 + SVG ring `data-progress` + `ScrollProgress` rail both track `useScrollProgress`.

## System Integration

### Available Tools (in this workspace)

- `read` / `write` / `edit` / `bash` / `fd` / `rg` / `agent_browser` (prefer native `agent_browser` tool — do not run direct `agent-browser` bash unless debugging) / `subagent_spawn` / `workflow` — standard Pi harness.
- `skills` is committed-but-pruned vendored reference content (round 3: catalog + SKILL.md contents removed from tracking; historical tree at `c774ed9`) — not project source. Do not import from or lint it; `eslint.config.js` `ignores` + `tsconfig` excludes it. Vendored size can trigger `ENOSPC` — see Vite `server.watch.ignored` note.

### Related Skills

- `framework-templates` — companion to `claude-md` for framework sections (Vite+React used here).
- `avant-garde-design-v4` / `super-frontend-design` / `claude-design` — when refining parish aesthetics (warm editorial, WOHA house of light, Garden of Peace & Piazza, Portiuncula — not Palladian/Rosary Garden).
- `webapp-testing-journey` / `agent-browser` / `playwright-cli` — when exercising journeys or visual QA (use `agent_browser` native tool for `HashRouter` hash-aware navigation).
- `verification-and-review-protocol` — before claiming work done.
- `lint-and-validate` / `clean-code` / `testing-patterns` / `tdd-workflow` — quality gates (Red→Green→Refactor for the test rewrite).

## Continuous Improvement

- When a command is added to `package.json` scripts, update the Build Commands table and note if it is hollow/stale.
- When a token or utility is added to `src/index.css`, document its intent in this file and in a code comment (`@theme` or `@layer`). Current utilities count is 24 + 8 keyframes + themed scrollbar.
- When a route alias or hash anchor is added or removed, update `App.tsx`, `src/data/nav.ts` nav children, the Routing Contract table, and the Architecture hash-anchor rows together.
- When a new `GivingOption` icon or `EventItem` category is added, update the `GivingOption.icon` / `EventItem.category` union and this file's Data section.
- Re-audit this file after any framework bump (React 19, Vite 7, Tailwind 4) or after restoring tests/lint/CMS — verify counts via `fd` and grep `src/App.tsx` for `Route` entries.
- When a validation report is added (`docs/validation-*.md`), link it from `README.md` File Hierarchy + `AGENTS.md` Where to look next + this checklist, and bump `Current audits` in `README.md`.
- Keep `README.md` + `AGENTS.md` + this file + `st-mary-of-angels_SKILL.md` in sync on version, routing, and data shape after every port/validation change.

---

### Validation Checklist (for maintainers)

| # | Section | Required | Present |
|---|---------|----------|---------|
| 1 | Core Identity & Purpose (St Mary of the Angels, 5 Bukit Batok East Ave 2 659918, Franciscan 1970 Portiuncula OFM, WOHA 2004) | Yes | ✅ |
| 2 | Foundational Principles (Six-Phase) | Yes | ✅ |
| 3 | Implementation Standards (General + TS Strict + Vite 7 + React 19 + Tailwind v4 CSS-first + Components incl. ScrollProgress decoupled + BackToTop ring + Accordion inert) | Yes | ✅ |
| 4 | Development Workflow (Env Setup + Build Commands) | Yes | ✅ |
| 5 | Testing Strategy (wired — 25 unit files / 141 tests + 42 E2E, St Mary data) | Yes | ✅ |
| 6 | Code Quality Standards (Lint + Type Safety + Styling incl. Priest email / serveRoles summary) | Yes | ✅ |
| 7 | Git & Version Control (branching + Conventional Commits + CI Node 24/pnpm 11 + HashRouter deploy + src.orig archived) | Yes | ✅ |
| 8 | Error Handling & Debugging (SafeImage fallback default / NotFound "does not lead to the church" / Layout ScrollProgress+keyed page-in) | Yes | ✅ |
| 9 | Communication & Documentation (parish-specific why — WOHA/Garden/Portiuncula/2 Aug/Mandarin & Tamil, lineage Rother→St Joseph BT→St Mary) | Yes | ✅ |
| 10 | Project-Specific Standards (Architecture 52-file tree + Data ownership 8 interfaces/11 images all local + Routing 17/7/9 + File Org) | Yes | ✅ |
| 11 | Success Metrics (10 pages + 7 aliases + 9 anchors + St Mary content from data/* + tokens 24+2 + Header solid logic + 4 socials) | — | ✅ |
| 12 | System Integration (tools + skills vendored note) | — | ✅ |
| 13 | Anti-Patterns to Avoid (12 incl. ScrollProgress decoupled + UEN 4053H + St Joseph reintroduction) | — | ✅ |
| 14 | Continuous Improvement (re-audit after bumps/tests/CMS, 26 utilities) | — | ✅ |
| 15 | Validation Report `docs/validation-src-vs-src.orig-2026-08-30.md` (10/10 contracts adopted, 7 improved — no regression, `lint 0 + typecheck 0 + 16/92 + 35 E2E + 380 kB` green) | — | ✅ |
| 16 | Round-3 audit + remediation `docs/code-review-audit-round3-2026-08-30.md` + `docs/remediation-plan-round3-2026-08-30.md` (CSP/headers hardening, BackToTop focus release, key/lockfile/src.orig untracking, docs alignment — 17/104 + 35 E2E green) | — | ✅ |
| 18 | Round-5 design enhancement `docs/design-enhancement-round5-2026-08-30.md` ("Light of the Portiuncula": Mass-times today highlight via `utils/massDay`, event category chips, Give closing band, sticky History story, gradient timeline rail, `.img-zoom` drift, `.bg-gold-bloom`, Button icon nudge + aria-hidden icons, About monogram discs, NotFound emblem + rise-in — 24/134 + 42 E2E + 387.84 kB green) | — | ✅ |
| 17 | Round-4 remediation `docs/remediation-round4-2026-08-30.md` (L-5 closure: mobile drawer → modal dialog with focus trap + focus restore + outside-tap close; scroll-rail E2E race root-caused deterministic — 17/109 + 36 E2E + 381.41 kB green) | — | ✅ |


# Validation Report — Codebase vs `risen-christ_SKILL.md` v3.0.0

**Date:** 2026-09-02
**Canonical instance:** Church of the Risen Christ, Toa Payoh — `risen-christ-church` `package.json` 1.4.4
**Skill doc:** `risen-christ_SKILL.md` v3.0.0 (unified 2026-09-01, Volatile Facts Register §0 is single source)
**Auditor:** Claw Code (Frontend Architect) — read-only audit, evidence-linked, no code assumed green
**Method:** 7-phase sweep per `Appendix G.4 Fossil-Sweep Protocol` + pre-ship gate re-run; every row is `✅ PASS` / `⚠️ DRIFT` / `❌ FAIL` with file:line or command output

---

## Summary

| Gate | Result | Note |
|------|--------|------|
| `pnpm lint` | ✅ 0 warnings | eslint 9.39.5 flat |
| `pnpm typecheck` | ✅ 0 errors | `strict` + `noUnusedLocals/Params` |
| `pnpm test` | ✅ 35 files / 202 tests | sum verified per §0 breakdown, 18.6s |
| `pnpm test:e2e` | ✅ 51 tests (8 specs) | chromium, 1.1m, all Toa Payoh routes/anchors |
| `pnpm build` | ✅ `dist/index.html` 397.57 kB (gzip 114.90 kB) + `dist/_headers` + `dist/favicon.svg` + `dist/images/8` | §0 claims 397.52 kB → delta +0.05 kB within rebuild variance |
| Overall vs §0 | **✅ PASS with 4 low DRIFTs** | No C/H/M findings; 4 L-grade drifts (all fixable in one commit) |

**Outstanding ops action (not fixable by doc):** `docs/ssh-key.txt` rotation (C-1) — history still contains the key; `repo-hygiene` guard correctly blocks re-track.

---

## Phase A — Volatile Facts Register (§0) — Ground Truth

| # | Fact (§0) | Expected | Observed | Verdict | Evidence |
|---|-----------|----------|----------|---------|----------|
| A1 | Unit tests | 35 files / 202 tests | 35 / 202 | ✅ | `pnpm test` → `Test Files 35 passed / Tests 202 passed` (Section breakdown: Header 17, Accordion 6, Button 11, BackToTop 7, Reveal 2, wcag-contrast 5, Ministries 3, cta-bands 6, worship-mass 6, about-visuals 4, event-chips 3, give-featured 2, give-uen 3, card-affordances 6, Timeline 3, NotFound 2, History 2, Layout 2, useScrollProgress 4, useScrollSpy 6, ScrollProgress 2, docs-contract 16, ci-workflow 4, repo-hygiene 3, etc. — sum 202) |
| A2 | E2E | 51 tests, 8 specs | 51 / 8 | ✅ | `pnpm test:e2e --list` → `Total: 51 tests in 8 files`; `pnpm test:e2e` → `51 passed` |
| A3 | `src/` inventory | 77 = 41 source + 35 tests + 1 setup | 77 | ✅ | `find src -type f \| wc -l` → 77; listing 41 source + 35 test + `setup.ts` |
| A4 | `public/images/` | 8 files + `favicon.svg` | 8 + favicon | ✅ | `ls public/images` → hero-church, chapel-interior, sanctuary, rosary-garden, stained-glass, parish-hall, cemetery, feast; `public/_headers` + `favicon.svg` present |
| A5 | Build artifact | `dist/index.html` 397.52 kB + `_headers` + `favicon.svg` + `images/8` | 397.57 kB + all 4 | ⚠️ DRIFT (L) | `pnpm build` → `dist/index.html 397.57 kB │ gzip: 114.90 kB`; `ls -lh dist/` → index.html 389K, _headers, favicon.svg, images/4.0K (8 files). Delta +50 B — content-hash variance, not a contract break |
| A6 | Design tokens | 25 colors + 2 shadows (27 @theme entries) | 25 + 2 | ✅ | `rg "^\s*--color-shrine" src/index.css \| wc -l` → 25; `rg "^\s*--shadow" \| wc -l` → 2 |
| A7 | Utilities / keyframes | 27 utilities + 8 keyframes | 27 + 8 | ✅ | `grep` utility block `.text-balance` through `.skip-link` + 4 `rise-in-d*` = 27; `grep "@keyframes"` → gold-rule-draw, hero-ken-burns, rise-in, menu-in, drawer-in, page-in, drawer-item-in, halo-pulse (8) |
| A8 | Hooks / Utils / Routes | 3 hooks, 4 utils, 17 Routes, 7 aliases / 5 groups, 9 anchors | 3 / 4 / 17 / 7/5 / 9 | ✅ | `ls src/hooks` → useScrolled, useScrollProgress, useScrollSpy (3); `ls src/utils` → cn, massDay, monogram, deepLinks (4); `rg "Route" src/App.tsx` → 17 entries (16 + `*`); aliases 7 in 5 groups verified; anchors `#mass/#confession/#visit` + 6 ministries |
| A9 | Data arrays | lifeTimeline 8, grounds 3, ministries 6, faqs 6, events 6, giving 8, priests 3, ppc 7, serveRoles 4, devotions 6, images 11, nav 6/10, hours 7, mass 9 | All match | ✅ | `rg "year: \""` → 8; `rg "id: \"main-church\""` → 3 grounds; `rg "id: \"liturgical\""` → 6 ministries; `grep "images:"` 11 keys local; `site.ts` hours 7 keys (mediaCentre not columbarium), mass 9 keys (sunday 5 + monthly + note) |

---

## Phase B — Config & Toolchain Contract (§2 + §3)

| # | Check | Expected | Observed | Verdict |
|---|-------|----------|----------|---------|
| B1 | Deps pinned exact | no `^` in `package.json`, `pnpm@11.0.0`, `engines node>=20` | no `^` found, packageManager `pnpm@11.0.0`, engines `>=20`, `pnpm-lock.yaml` committed | ✅ |
| B2 | Alias sync | `vite.config.ts` `@→src` ↔ `tsconfig.json` `paths @/* → src/*` + `baseUrl "."` | both `path.resolve(__dirname,"src")` and `paths: {"@/*":["src/*"]}` + `baseUrl "."` | ✅ |
| B3 | `vite.config.ts` test + watch | `test { globals, jsdom, setupFiles src/test/setup.ts, include src/**/*.{test,spec}.{ts,tsx}, exclude e2e/** }` + 6 watch.ignored | present exactly | ✅ |
| B4 | `tsconfig.json` strict | `strict`, `noUnusedLocals/Params`, `noFallthroughCasesInSwitch`, `isolatedModules`, `noEmit`, `include` 5 entries, `types [node, vitest/globals]` | all true, include `["src","vite.config.ts","eslint.config.js","playwright.config.ts","playwright.built.config.ts"]` | ✅ |
| B5 | `eslint.config.js` | flat, ignores 7 paths (dist/node_modules/coverage/playwright-report/test-results/skills/src.orig) | present exactly | ✅ |
| B6 | Playwright | `playwright.config.ts` chromium, `expect.timeout 15s`, `webServer pnpm exec vite :5173`; `playwright.built.config.ts` extends base, `E2E_BASE_URL` fallback, `vite preview :4173` | present exactly | ✅ |
| B7 | `index.html` CSP/head | `img-src 'self' data: blob:` only, `frame-src https://www.google.com`, `script-src 'self' 'unsafe-inline' + static.cloudflareinsights.com`, OG `og:url/site_name/locale/image` + `twitter:card` + Church JSON-LD ( drift-checked by `head.test.ts` 13 tests) | CSP meta `default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; frame-src https://www.google.com` — no wikimedia/pexels legacy hosts | ✅ |
| B8 | `.gitignore` vs `git ls-files` | `src.orig/` + `docs/ssh-key.txt` + top-level `package-lock.json` untracked; `skills/` tracked but ignored by tooling | `git ls-files \| rg "src\.orig|ssh-key"` → empty (GOOD); only `skills/kimi-pdf/scripts/package-lock.json` tracked inside vendored tree (acceptable) | ✅ |

---

## Phase C — Design System (§4 + §19 + §18)

| # | Check | Verdict | Detail |
|---|-------|---------|--------|
| C1 | `@theme` tokens byte equality (§4.1 vs §19) | ✅ | 25 colors exact (incl. `terracotta-600 #8f4c30` 5.36:1 AA) + 2 shadows; grep shrine- count matches; no `amber-*/slate-*/zinc-*` in src |
| C2 | 27 utilities + 8 keyframes | ✅ | Utilities: text-balance, bg-adobe-texture, bg-gold-bloom, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, mask-fade-b, reveal, reveal-visible, rise-in + d1..d4, menu-in, drawer-in, drawer-item-in, page-in, dot-pulse, card-lift, card-tint, link-underline, skip-link, img-zoom (27). Keyframes 8 listed in C. `prefers-reduced-motion` kills all 8 + reveal; `@media print` reveals |
| C3 | Typography | ✅ | `Fraunces` + `Source Sans 3` preconnect in `index.html`, `@theme --font-display/--font-sans/--font-body`, no JS loader |
| C4 | Shadows/radii | ✅ | `shadow-shrine`/`shadow-shrine-lg`, `rounded-sm`/`rounded-full` only |
| C5 | Z-index map (§18) | ⚠️ DRIFT (L) | SkipLink `z-[100]` ✅, ScrollProgress `z-[60]` ✅, Header `z-50` ✅, **Ministries jump nav `z-20` in code vs `z-40` in SKILL** — functional (still below header) but doc/code mismatch |

---

## Phase D — Architecture & Routing (§5 + §6 + §7)

| # | Check | Verdict | Detail |
|---|-------|---------|--------|
| D1 | Directory tree (§5.2) | ✅ | 77 files present; every hook/util the harness references appears; tree now includes `useScrollSpy.ts`, `monogram.ts`, `deepLinks.ts` (v3 G.25 fix verified) |
| D2 | Route table (§5.4) + deepLinks | ✅ | `src/App.tsx` 17 entries (16 + `*`), 7 aliases / 5 groups (worship 3, ministries 1, news-events 1, serve 1, give 1); `knownRoutePaths` 16 entries drift-guarded by `deepLinks.test.ts` 7 tests; `main.tsx` calls `resolveHashRedirect` pre-mount |
| D3 | Hash anchors | ✅ | `/worship` → `#mass/#confession/#visit` (each `scroll-mt-28`); `/ministries` → 6 ids ending `#language-communities` (not `#mandarin`); jump nav + Worship nav use `<Link to="/path#id">` not plain `<a>` |
| D4 | Component contracts (§5.5) | ✅ | Button discriminated +4 variants + `active:translate-y-0` ✅; Container max-w ✅; SectionHeading line ✅; PageHero `compact/bg-grain/rise-in` ✅; SafeImage `fallback + dataset.fallback + fetchPriority` ✅; Header `useScrolled(16)` + modal drawer `role=dialog + aria-modal + handleDrawerKeyDown + drawerWasOpenRef + pointerdown + Escape` ✅; Reveal IO 0.15 + fallback ✅; Accordion `grid-rows + inert` ✅; Layout `resolveAnchor` double-hash + 80ms `setTimeout` with cleanup + keyed `page-in` ✅; ScrollProgress decoupled `h-[3px] scaleX` ✅ |
| D5 | Hooks (§6) | ✅ | `useScrolled` default 12, Header 16 intentional mismatch; `useScrollProgress` rAF shared; `useScrollSpy` document-order tie-break |
| D6 | Data (§7) | ✅ | 8 interfaces + 10 exports + images 11 local; lifeTimeline 8 (1969–2026 Toa Payoh) Ho Ping→first air-con $450k → Velankanni → 2003 wing → Simbang Gabi → Jubilee → Fr Brian → Grateful/Faithful/Sent; priests 3 phone+email, ppc 7, grounds 3, faqs 6, events 6 (2 href), giving 8 (UEN T08CC4042G), serveRoles 4, devotions 6, hours 7, mass 9 |

---

## Phase E — Accessibility & Motion (§8)

| # | Check | Verdict | Detail |
|---|-------|---------|--------|
| E1 | Contrast (WCAG AAA intent) | ✅ | `wcag-contrast.test.tsx` 5 tests compute from token layer; `terracotta-600/parchment` 5.36:1 AA (round-12 F-1) |
| E2 | Focus & nav | ✅ | `SkipLink` preventDefault+focus (HashRouter-safe), Header `aria-current="page"/"true"` states, drawer modal trap+restore, 44px targets, `aria-label="Jump to ministry"` |
| E3 | Landmarks/images | ✅ | `header/main/footer`, `h1→h2`, `PageHero alt=""`, required `imageAlt` on grounds/ministry |
| E4 | Motion | ✅ | transform/opacity only, `prefers-reduced-motion` global 0.01ms + dot-pulse opacity 0, `@media print` reveal, BackToTop 480 + ring hash-safe |

---

## Phase F — Anti-Patterns & Pre-Ship (§9 + §11 + App B)

| # | Check | Verdict | Detail |
|---|-------|---------|--------|
| F1 | 15 anti-patterns | ✅ | No `bg-[#`, no `tailwind.config`, no `BrowserRouter`, no plain `<a href="#id">` on ministries, no stale fallback, no dev-only favicon assertion (`test:e2e:built` guards) |
| F2 | App B smoke script (18 steps, Toa Payoh) | ✅ | Smoke spec covers: hero QuickFacts + grounds 3, events 4, all 7 aliases, 9 hash anchors, NotFound, refresh hash persistence, path-style deep links `/worship /news-events /donate` not soft-404 |
| F3 | Built-artifact E2E (ADR-8) | ⏳ PENDING | `pnpm test:e2e:built` not yet run in this audit — to be verified before ship (dev-only asset-path guard) |

---

## Phase G — Lineage & Fossil Sweep (App G.4)

| # | Protocol step | Result |
|---|---------------|--------|
| G1 | Register first (§0) | §0 is single source — other sections reference it, not restate |
| G2 | Sweep old value | `rg -n "<old>"` across doc+README+AGENTS+CLAUDE found no unexplained stale numbers; §0 35/202+51 consistent |
| G3 | Previous-parish grep | `rg -n "620 Upper\|5 Bukit Batok\|T08CC4053H\|T08CC4043C\|Bukit Batok\|Bukit Timah\|Portiuncula\|NS2\|DT5\|Cashew\|#mandarin\|St Mary\|St Joseph"` → hits only in **allowed locations**: `AGENTS.md`/`CLAUDE.md` lineage docs, `risen-christ_SKILL.md` Appendices D/E/F/G (labeled `as of <date>`), `e2e/enhancements-round5` comment referencing round-5 name, `docs-contract.test.ts` stale-list guard, `src.orig` pruned notice |
| G4 | Sum every count | Utility 27, keyframe 8, color 25+2, route 17, alias 7/5, anchor 9, test 35/202+51 — all recomputed, none copied |
| G5 | Reconcile samples↔tree | §4.3 rows ↔ §0 counts ↔ §5.2 tree ↔ §18 layers — one mismatch found: `z-40` vs `z-20` (C5) |
| G6 | Tracking audit | `git ls-files \| rg "src\.orig|ssh-key|package-lock"` → no `src.orig`, no `ssh-key`, no top-level `package-lock.json` (only vendored `skills/*/package-lock.json`) |
| G7 | Appendix B rewrite | ✅ Rewritten for Risen Christ (18 steps + built pass) — no longer St Mary fossil (v3 G.11 fix verified) |
| G8 | `docs-contract` gate | ✅ `src/docs-contract.test.ts` 16 tests green — pins 51 E2E, built-artifact, agent-browser eval, and no-current St Mary facts |

**Raw previous-parish hits outside Appendices (investigated):**

| File:Line | Hit | Disposition |
|-----------|-----|-------------|
| `src/components/ui/Accordion.test.tsx:9` | `A3 620 Upper Bukit Timah Road.` | ⚠️ **DRIFT (L)** — parish address from St Joseph BT (`src.orig`) used as test fixture inside `src/` (outside history appendix). Violates parish fidelity — fixture should be neutral or Risen Christ. Fix: `91 Toa Payoh Central` |
| `src/components/wcag-contrast.test.tsx:9` | `St Mary of the Angels vs Risen Christ` in comment | ✅ ALLOWED — lineage reference in audit comment |
| `AGENTS.md:48` etc. | `5 Bukit Batok…` in `src.orig` pruned notice | ✅ ALLOWED — lineage appendix/history reference |
| `CLAUDE.md:190,239,385` | St Mary historical block | ✅ ALLOWED |
| `risen-christ_SKILL.bak` (untracked, 129 KB) | Full previous SKILL with St Mary tokens | ⚠️ **DRIFT (L)** — untracked backup file on disk, not in git, but clutters repo and would be caught by `rg` |

---

## Drift Register — Actionable Findings

All findings are **Low (L)** — no C/H/M. Ordered by fix priority (smallest diff first):

| # | ID | Severity | File | Fix | Effort |
|---|----|----------|------|-----|--------|
| 1 | **FOSSIL-1** | L | `risen-christ_SKILL.bak` (untracked) | Delete the untracked backup file left from unification. It restates the entire old SKILL and pollutes `rg` results. | 1 line `rm` |
| 2 | **TEST-FIXTURE-1** | L | `src/components/ui/Accordion.test.tsx:9` | `A3 620 Upper Bukit Timah Road.` → `A3 91 Toa Payoh Central, Singapore 319193.` (or generic `A3 The parish address.`). Neutralizes the only `src/` fossil outside Appendices. | 1 line |
| 3 | **Z-INDEX-1** | L | `src/pages/Ministries.tsx:29` | `z-20` → `z-40` to match SKILL §18 (Ministries jump nav sticky under header `z-50` + rail `z-[60]`). Functional at `z-20` but doc/code drift; `z-40` is the intended layer between rail and header. Alternative: update SKILL to `z-20` — either way, align. Recommendation: align code to `z-40`. | 1 token |
| 4 | **BUILD-SIZE-1** | L (info) | `risen-christ_SKILL.md` §0 + related rows | `397.52 kB` → `397.57 kB` (or annotate as `~397.5 kB`). Build repro'd `397.57 kB │ gzip 114.90 kB`. Variance +50 B is normal; pinning exact bytes creates false failures. Recommendation: update to `397.57 kB` now and add `±` tolerance note, or keep and note in ledger. | 1 string |

**Non-fix (ops):** `C-1 SSH key rotation` — `docs/ssh-key.txt` remains in git history; `repo-hygiene` correctly guards the index. Requires repo owner `git filter-repo` + credential revocation — not fixable by docs.

**Not a drift (confirmed):**

- `givingOptions` `rg "icon:"` → 9 (8 items + 1 interface `icon:` field) — correct, not 9 items
- `skills/*/package-lock.json` tracked — vendored reference content, not top-level `package-lock.json` untracked violation
- `AGENTS.md` "35 files / 202 tests — 41 source + 35 tests + 1 setup" — 35 is test-file count, not src-file count; correctly matches §0 when read as `77 = 41+35+1`

---

## Recommendations — Best Path Forward (Meticulous, Minimal Diff)

1. **Execute the 4-line remediation now** (this audit's `FOSSIL-1` + `TEST-FIXTURE-1` + `Z-INDEX-1` + optional `BUILD-SIZE-1`) as one atomic `fix:` commit with `pnpm lint && typecheck && test && test:e2e && build` re-verification and a `test:e2e:built` pass against `dist/` before push. Estimated wall time 6 minutes.
2. **Adopt the fossil-sweep as a pre-commit hook** — the 8-step App G.4 checklist is already in the SKILL; encode it as `rg` commands in `docs/validation-*.md` so future ports cannot copy-forward appendices without sweeping.
3. **Do not re-pin the SKILL version for these Ls** — they are drift corrections, not feature hops; keep `package.json` 1.4.4 + SKILL 3.0.0, note the ledger in `Appendix G` only if desired.
4. **Schedule the ops item** — rotate the leaked SSH key and optionally run `git filter-repo` — separate from code validation.

---

## Evidence Ledger — Commands Run

```
find src -type f | wc -l                      → 77
pnpm test                                      → 35 passed / 202 passed
pnpm test:e2e --list                           → Total: 51 tests in 8 files
pnpm test:e2e                                  → 51 passed (1.1m)
pnpm lint                                      → eslint 0
pnpm typecheck                                 → tsc 0
pnpm build                                     → dist/index.html 397.57 kB │ gzip: 114.90 kB; viteSingleFile inlining 2 chunks
rg "^\s*--color-shrine" src/index.css | wc -l → 25
rg "^\s*--shadow" src/index.css | wc -l       → 2
grep "@keyframes" src/index.css               → 8 keyframes
rg "Route" src/App.tsx                         → 17 entries (16 + *)
cat src/utils/deepLinks.ts                     → knownRoutePaths 16, resolveHashRedirect pre-mount
cat src/main.tsx                               → resolveHashRedirect + location.replace
rg "z-20|z-40" src/pages/Ministries.tsx      → sticky z-20 (mismatch vs skill z-40)
git ls-files | rg "src\.orig|ssh-key"         → (empty) GOOD
rg "620 Upper|T08CC4053H|Bukit Batok|#mandarin" --glob '!risen-christ_SKILL.md' → only bac + allowed history + one test fixture
```

---

## Appendix — Triage for Next Auditor

- Re-run `pnpm test:e2e:built` (built artifact) and `E2E_BASE_URL=<live> pnpm test:e2e:built` before every ship — the dev/built divergence guard (ADR-8) is the most valuable check the SKILL added.
- Any change to `src/App.tsx` route table must update `src/utils/deepLinks.ts` `knownRoutePaths` + `src/data/nav.ts` + `SKILL.md` §0 + `§5.4` + Quick Ref in one commit (ADR-5 style).
- Any token addition in `src/index.css` must add a §19 row + `wcag-contrast` ratio pin + ` §0` color count bump.


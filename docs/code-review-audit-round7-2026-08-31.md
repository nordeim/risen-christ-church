# Code Review & Audit Ledger — Round 7 "Honest Light" (commits `2f65c11..30a9b98`)

**Date:** 2026-08-31 · **Scope:** the three round-7 commits `dab63f6` (feat P-1..P-9), `88b92f2` (test e2e), `30a9b98` (docs sync v1.4.0) — 30 files, +975/−115 · **Method:** repo skills `code-quality-standards` (Six-Axis) + `code-review` (Standards/Spec axes, fixed point `2f65c11`, spec = `docs/design-enhancement-round7-2026-08-31.md`) + `e2e-testing-lessons` + `webapp-testing-journey` · **Plan audited against:** uploaded `audit_plan_for_recent_commits.md` (six-phase plan)

---

## 0. Plan Review (validation of the audit plan itself)

The uploaded plan's factual claims were verified against the repo before execution:

| Plan claim | Verified | Result |
|---|---|---|
| 3 commits, 30 files, +975/−115 | `git diff --stat 2f65c11..30a9b98` | ✅ exact |
| P-1..P-9 file list (13 src files) | `git diff --name-status` | ✅ exact |
| "7 new test files / 19 new unit tests" | git status of test files | ⚠️ 19 tests ✅ correct; files = **4 new (A) + 4 modified (M)**, not 7 new → I-1 |
| E2E spec = 8 journeys | `rg -c '^\s*test\('` | ✅ exact |
| Spec distribution 11+8+4+4+7+6+8 = 48 | counted per spec file | ✅ exact |
| v1.4.0, pnpm@11.0.0, node>=20, exact pins | package.json | ✅ exact |
| Risk note on `ids.join("\|")` ("still fires per render" for inline literals) | hook analysis | ⚠️ inverted — the join trick makes inline literals safe → I-3 |

**Verdict: plan VALID with two documentation-level corrections (I-1, I-3); no phase restructuring required.**

---

## 1. Verification Ledger

| # | Claim | Method | Result |
|---|---|---|---|
| V1 | `pnpm lint --max-warnings 0` exit 0 | executed | ✅ 0 warnings |
| V2 | `pnpm typecheck` exit 0 (strict, noUnused*) | executed | ✅ clean |
| V3 | unit suite = 32 files / 175 tests | executed | ✅ 32 passed (32) / 175 passed (175) |
| V4 | build = 395.59 kB (gzip 114.34 kB), single-file inlined, dist/images 8 + `_headers` + favicon.svg | executed | ✅ exact match to docs |
| V5 | E2E = 48 passed (7 specs) | `pnpm test:e2e` | ✅ 48 passed (1.3m) |
| V6 | live site == round-7 dist | md5(dist/index.html) vs md5(curl live) | ✅ both `2a99b90f92beb9f4f5205b4f46bac862` (host auto-deploys from GitHub) |
| V7 | App.tsx 17 routes; alias groups/hash anchors untouched | route count + `git diff` on App/Layout/data | ✅ untouched in range |
| V8 | `docs/ssh-key.txt` untracked; no secret material in range | `git ls-files` + diff grep | ✅ 0 tracked; only doc-prose mentions |
| V9 | no XSS sinks in changed files | grep `dangerouslySetInnerHTML\|innerHTML` | ✅ none |
| V10 | external `href` rel handling (site.bulletin → fliphtml5) | Button.tsx + live DOM | ✅ `target="_blank" rel="noopener noreferrer"` |
| V11 | reduced-motion kill-switch covers new motion | index.css `@layer base` | ✅ global `*,*::before,*::after` 0.01ms |
| V12 | print block inside `@layer utilities`; doesn't fight `.reveal-visible` | index.css L207 | ✅ both resolve opacity 1 / transform none |
| V13 | `card-tint` rgba values are token hexes | gold-300 `#e2bf72` = rgba(226,191,114), gold-400 `#d1a955` = rgba(209,169,85) | ✅ matches `bg-gold-bloom` pattern |
| V14 | `givingOptions[0]` === PayNow | `src/data/content.ts` | ✅ first entry |
| V15 | PayNow featured computed style | live DOM eval | ✅ border-top 2px rgb(195,150,63), gold-100/40 tint |
| V16 | scrollspy live behavior | live DOM eval after `scrollIntoView` | ✅ aria-current → "Faith Formation", 6 pills |
| V17 | Worship sticky | live DOM eval | ✅ position sticky, top 112px |
| V18 | NewsEvents band h2 cream | live DOM eval | ✅ rgb(250,246,236) on maroon-950 |
| V19 | Home featured events → real links | live DOM eval | ✅ href `#/news-events` |
| V20 | PageHero opacity 0.45 + contrast | live eval + screenshot | ✅ title/sub fully legible (`docs/audit-shots-round8/live-hero-contrast.png`) |
| V21 | mobile 390×844 sanity | agent-browser viewport | ✅ pill nav visible, no horizontal scroll (`live-mobile-ministries.png`) |
| V22 | zero console/page errors on live | agent-browser console/errors | ✅ clean |
| V23 | docs counts synced (32/175 + 48, v1.4.0) | grep four docs + docs-contract guard | ✅ synced **at commit time** — remediation re-pin later surfaced M-1..M-3 (below), all fixed same round |
| V24 | src file census | `find src -type f` | ✅ 73 = 40 source + 32 test + 1 setup (docs corrected in R-3) |

## 2. Findings (tiered C/H/M/L/I)

**No new Critical or High findings, and no Medium findings in the round-7 code** — the implementation is faithful to its spec and preserves every executable contract probed (HashRouter double-hash logic, viteSingleFile, @theme token discipline, cn() merging, reduced-motion, aria-current semantics, focus/dialog contracts untouched). Three **docs-contract drift** findings (M-1..M-3, Medium) surfaced during the remediation re-pin pass — none touch shipped code; all were fixed in the same round and guard coverage was extended so they cannot recur silently.

| ID | Sev | Location | Finding | Evidence |
|---|---|---|---|---|
| L-1 | Low | `e2e/enhancements-round7.spec.ts:70,121` | Redundant hard sleeps: `waitForTimeout(400)` before scrollspy assertions and `waitForTimeout(300)` in `gotoMain` — Playwright `expect` already auto-polls (5 s), so the sleeps are dead weight and a flake-per-e2e-testing-lessons. Assertions passed 48/48 this run; risk is latent, not active. | spec lines |
| L-2 | Low | `src/hooks/useScrollSpy.ts` callback | Tie-break when ≥2 sections intersect the thin (5%) band simultaneously is IO **delivery order**, not document order — on fast programmatic scrolls the reported active pill can momentarily be the section that arrived last in the entries array rather than the deepest section in reading order. Practical impact negligible (band height ≈ 45 px at 900 vh); E2E covers the single-section case. | hook callback |
| M-1 | Medium (docs) | `CLAUDE.md` five-gate claim | Gate claim read `pnpm test:e2e (40)` — stale by 8 since round 7 landed (actual 48). Root cause: `src/docs-contract.test.ts` did not load CLAUDE.md, so the drift had no guard. Fixed in R-3 + guard extended to CLAUDE.md (rejects `(40)`, pins `(48)`). | CLAUDE.md success-metrics section |
| M-2 | Medium (docs) | `risen-christ_SKILL.md` §3/§11 + `AGENTS.md` structure fence | Per-file unit breakdowns stale and incomplete: SKILL §3/§11 breakdowns carried pre-round-7 counts (Header 16, cta-bands 4, worship-mass 4, about-visuals 3) and omitted 7 test files (sum ≈ 152 ≠ 175) while the canonical §2.1 row was correct; src census rows said "61 (36+24+1)" (SKILL) / "38 source + 25 tests + 1 setup" (AGENTS) vs real `find src -type f` = **73 (40 source + 32 tests + 1 setup)**. Fixed in R-3 to the verified 32 files / 179 census. | census recount (V24) |
| M-3 | Medium (docs) | `risen-christ_SKILL.md` §3.2 e2e row + Quick-Ref Hooks row | e2e/ breakdown listed 6 specs summing 40 while the row header claimed 48 (round-7 spec omitted); Quick-Ref "Hooks" row listed only `useScrolled` — omitting `useScrollProgress` and `useScrollSpy` (round-7's own hook). Fixed in R-3. | §3.2 / Quick-Ref |
| I-1 | Info | audit plan doc | Plan says "7 new test files"; git shows 4 new + 4 modified (its "19 new unit tests" figure is correct). | §0 |
| I-2 | Info | `src/hooks/useScrollSpy.ts` JSDoc | Comment claims "symmetric top/bottom insets"; actual `rootMargin: "-45% 0px -50% 0px"` is asymmetric — the band spans 45–50% of viewport height (just above geometric center). Behavior is intended; wording is not. | hook JSDoc |
| I-3 | Info | audit plan doc | Plan risk #1 states the `ids.join("\|")` dep "still fires per render" for inline literals — inverted: joining yields a **stable string**, which is precisely what makes inline `["a","b"]` literals safe. The suppression is more robust than the plan feared. | §0 |

**Carried (ops-owned, not re-introduced by round 7; flagged again per plan Phase 4):**

| ID | Sev | Item |
|---|---|---|
| H1' | High (ops) | Live host `risen-christ.jesspete.shop` still serves **none** of the five security headers (HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy) — round-6 H1 recurrence. `public/_headers` ships to `dist/` correctly; the Cloudflare-proxied host ignores it. Fix is host-side (Pages deploy or Transform Rules). |
| C1' | Critical (ops) | `docs/ssh-key.txt` remains in git history (`0be0fe8`) and must be rotated/revoked by the repo owner (round-6 C1). Untracking (6d87934) was correct and holds (V8). |

## 3. Six-Axis Scores (changed code, per code-quality-standards)

| Axis | Score | Notes |
|---|---|---|
| Correctness | 9/10 | L-2 tie-break nuance; everything else verified by 175 unit + 48 E2E + live DOM |
| Readability | 9/10 | intent comments honest; I-2 wording nit |
| Architecture | 10/10 | hook extraction follows hooks/ pattern; zero new deps; utility follows token discipline |
| Security | 10/10 | V8–V10 all clean; no new attack surface |
| Performance | 10/10 | single IO, transform/opacity/bg-only motion, +7.15 kB for 9 features, no chunk split |
| Aesthetic/UX rigor | 10/10 | affordance honesty (card-tint vs card-lift), closure bands, featured hierarchy — anti-generic, restrained |

**Overall: APPROVE.** Remediation of L-1/L-2/I-2 is low-risk polish, tracked in `docs/remediation-plan-round7-2026-08-31.md`.

## 4. Evidence

- Screenshots: `docs/audit-shots-round8/` (live give-featured, hero contrast, worship, mobile ministries)
- Round-7 baseline/remediated shots: `docs/audit-shots-round7/` (untracked, local-only)
- This ledger intentionally records **no code changes**; remediation is a separate TDD commit series.

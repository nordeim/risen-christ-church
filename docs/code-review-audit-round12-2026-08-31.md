# Code Review & Audit Ledger — Round 12 (commits `4db7768..74c408c`)

**Date:** 2026-08-31 · **Scope:** 5 commits on `main` — `7d23fe4` (a11y F-1/F-2) · `bdcb932` (router F-3) · `0616105` (give F-4) · `9e8c7c1` (repo F-9) · `74c408c` (docs re-pin v1.4.4) — 87 files, +1092/−5022 (64 of which are `src.orig` deletions) · **Method:** `code-quality-standards` (Six-Axis) + `verification-and-review-protocol` (Iron Law) + `e2e-testing-lessons` · **Spec audited against:** `docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md` §7 + `docs/remediation-plan-round12-2026-08-31.md` + `docs/remediation-round12-2026-08-31.md` · **Plan audited:** `audit_plan_for_recent_commits` (six-phase plan, 2026-08-31)

> **Lineage:** Second hop of the comparative audit remediation. St Mary hop closed F-1/F-2/F-3/F-5 there; this hop ports the Risen Christ findings (F-1/F-2/F-3/F-4/F-9) as they exist in the **current** codebase (diverged from audit snapshot by rounds 5–11) with fresh WCAG math on the current token layer.

---

## 0. Plan Review (validation of the six-phase plan itself)

The uploaded plan's factual claims were verified before execution:

| Plan claim | Verified | Result |
|---|---|---|
| 5 commits, 87 files, +1092/−5022, 64 `src.orig` deletions | `git diff --stat 4db7768..74c408c` | ✅ exact |
| File lists per commit (EventMeta/index.css/Worship/deepLinks/main/Give/content/cta-bands/repo-hygiene/docs) | `git diff --name-status` per SHA | ✅ exact |
| Gate before 32/184 + 48 E2E + 395.66 kB | `remediation-plan-round12.md` Gate before + `git show` | ✅ exact (fresh clone @4db7768) |
| F-1 terracotta-500 3.92:1 FAIL, terracotta-600 5.36:1 PASS | independent luminance calc (see V13) | ✅ exact (3.9249 → 5.3637) |
| F-2 footnote charcoal/70 4.16:1 FAIL, /85 6.19:1 PASS | independent alpha-blend calc (see V14) | ✅ exact (4.1204 → 6.1893 on parchment) |
| F-3 16 known paths (9 canonical + 7 alias) | `src/App.tsx` route count + `knownRoutePaths` | ✅ exact |
| F-4 `title={`UEN ${site.uen}`}` at `Give.tsx:48` | `git show 4db7768:src/pages/Give.tsx` | ✅ exact |
| F-9 64 tracked `src.orig` files, `.gitignore` listed but not untracking | `git ls-files \| grep src.orig \| wc -l` at 4db7768 | ✅ 64 exact |
| "No new branches; all to `main`" | `git log --oneline 4db7768..74c408c` | ✅ all on `main` |

**Verdict: plan VALID — zero corrections required; no phase restructuring.**

---

## 1. Verification Ledger

| # | Claim | Method | Result |
|---|---|---|---|
| V1 | `pnpm lint --max-warnings 0` exit 0 | executed at 74c408c | ✅ 0 warnings |
| V2 | `pnpm typecheck` exit 0 (strict, noUnused*) | executed | ✅ clean |
| V3 | unit suite 35 files / 202 tests | executed | ✅ 35 passed / 202 passed (17.4s) |
| V4 | build single-file inlined, `dist/index.html` 397.52 kB (gzip 114.89 kB), `dist/images/8` + `_headers` + `favicon.svg` | executed | ✅ 397.52 kB (was 395.66 kB pre-round, delta +1.86 kB for copy row + shim + token) |
| V5 | E2E 51 passed (8 specs: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8 + deep-links 3) | `pnpm test:e2e` | ✅ 51 passed (58.2s) |
| V6 | `package.json` 1.4.4, exact pins, `pnpm@11.0.0`, `node>=20` | `package.json` read | ✅ `1.4.4`, no `^` |
| V7 | `src/App.tsx` 17 routes (16 paths + `*`), 5 alias groups / 7 alias paths, hash anchors untouched | route count + `git diff` on App/Layout | ✅ untouched in range (only `main.tsx` wiring added) |
| V8 | no `src.orig` tracked; `git ls-files` clean | `git ls-files \| grep src.orig` | ✅ 0 tracked (was 64) |
| V9 | `public/_headers` ships to `dist/_headers` | `pnpm build` + `ls dist/_headers` | ✅ present |
| V10 | no XSS sinks in changed files | `rg 'dangerouslySetInnerHTML\|innerHTML'` in diff | ✅ none |
| V11 | no `any`, no `as any` in changed files | `rg '\bany\b'` in diff | ✅ none |
| V12 | `EventMeta.tsx` Devotion now `text-shrine-terracotta-600` (5.36:1), border decorative unchanged | `src/components/EventMeta.tsx` read + calc | ✅ 5.3637:1 ≥ 4.5 |
| V13 | all 4 chip tones ≥ 4.5:1 on parchment `#f2e9d6` | independent contrast calc (WCAG relative luminance) | ✅ Parish maroon-700 11.2983, Devotion terracotta-600 5.3637, Formation pine-600 9.3720, Archdiocese maroon-600 9.5858 |
| V14 | Worship footnote `/85` = 6.1893:1 (was `/70` = 4.1204:1), `/75` 4.7018, `/80` 5.3891 | alpha-blend calc charcoal `#423a2c` over parchment | ✅ 6.1893 ≥ 4.5; `/75`/`/80` correctly left untouched |
| V15 | `knownRoutePaths` 16 entries, unique, sorted-equals `App.tsx` `path="…"` literals (excluding `*`) | `deepLinks.test.ts` drift guard + manual count | ✅ 16/16, no stale entries |
| V16 | `resolveHashRedirect` truth table (known, alias, trailing slash, root, hash-present, unknown, case-mismatch, file) | unit 7 tests + manual probe | ✅ 7/7 green |
| V17 | deep-links E2E: `/worship→/#/worship`, `/news-events→/#/news-events`, `/donate→/#/donate` land on correct h1 | `e2e/deep-links.spec.ts` 3 journeys + `pnpm test:e2e` | ✅ 3/3 green |
| V18 | Give section `h2` = "Ways to give" (contains `text-shrine-maroon-700` on cream), no heading contains "UEN", UEN exactly once inside `[data-featured="true"]` with Copy button | `src/pages/Give.tsx` + `give-uen.test.tsx` 3/3 + `cta-bands.test.tsx` | ✅ 3/3 green; cream-on-maroon band `h2` untouched |
| V19 | Copy button: clipboard-first → `writeText`, fallback `execCommand`, honest no-op on failure, `aria-label` toggles "Copy UEN …" → "Copied" | `Give.tsx` read + `give-uen.test.tsx` mock | ✅ verified (see §3 L-4 note on `execCommand` deprecation) |
| V20 | docs re-pin 32/184+48 → 35/202+51, 24→25 colors, v1.4.3→1.4.4, `docs-contract` 15→16 pins, 4 docs synced | `src/docs-contract.test.ts` 16 pins + manual grep of AGENTS/README/CLAUDE/SKILL | ✅ all green (35/202 + 51 E2E) |
| V21 | `docs-contract` guards: SKILL contract, README, AGENTS, CLAUDE all pass | executed as part of V3 | ✅ 16/16 |
| V22 | `repo-hygiene` guard: no `src.orig/` path tracked | `src/repo-hygiene.test.ts` 3/3 | ✅ 3/3 |
| V23 | `wcag-contrast` contract: 4 chip tones + 1 date lock | `src/components/wcag-contrast.test.tsx` 5/5 | ✅ 5/5 |
| V24 | `cta-bands` Give heading explicit-color contract preserved | `src/pages/cta-bands.test.tsx` 6/6 | ✅ 6/6 (locator updated to "Ways to give", assertion unchanged) |
| V25 | `worship-mass` footnote contrast contract | `src/pages/worship-mass.test.tsx` 6/6 (was 5, +1) | ✅ 6/6 |
| V26 | reduced-motion global kill-switch still covers all motion | `src/index.css` `@layer base` | ✅ `*,*::before,*::after` 0.01ms |
| V27 | `card-tint` vs `card-lift` invariant (PayNow stays `card-tint`, no lift) | `Give.tsx` + `give-featured.test.tsx` + `card-affordances.test.tsx` | ✅ 2+6 green |

---

## 2. Findings (tiered C / H / M / L / I)

**No new Critical, High, or Medium findings in shipped code.** The five commits are faithful to the audit's remedies, preserve every executable contract, and add drift-resistant guards where the audit said "keep in lockstep." Two **Medium (docs)** drifts from prior rounds were NOT re-introduced; the docs-contract now pins them (V20). Remaining findings are Low polish + Info notes.

| ID | Sev | Location | Finding | Evidence |
|---|---|---|---|---|
| L-1 | Low | `src/utils/deepLinks.ts:17` · `knownRoutePaths` includes `"/"` | `"/"` is listed as a known path but `resolveHashRedirect` returns `null` for `"/"` (and `""`). This is **correct behavior** (root needs no redirect) but the list entry is dead — it can never fire. No user impact; risk is future-reader confusion ("why is `/` there if it never redirects?"). The drift guard (`deepLinks.test.ts`) enforces that `knownRoutePaths` equals the App.tsx literals, so `/` must stay if App.tsx declares `path="/"` — but a comment should explain the intentional no-op. | `knownRoutePaths[0] === "/"` + `clean === "/" → return null` |
| L-2 | Low | `src/pages/Give.tsx:31–55` · `CopyUenButton` | `execCommand("copy")` fallback is **deprecated** (MDN deprecated, still works in Chromium/Firefox). Correctly scoped as fallback-only after `navigator.clipboard.writeText` check, so no active risk; but the deprecation should be called out in a `// deprecated fallback` comment so a future lint rule that forbids `execCommand` does not cause a panicked removal without replacement (the spec already says "honest no-op on failure"). | `document.execCommand("copy")` |
| L-3 | Low | `src/pages/Give.tsx:52` · `CopyUenButton` accessible name | After success the button's name changes from `"Copy UEN T08CC4042G"` to `"Copied"` (via `aria-label={copied ? "Copied" : …}`). This is the intended confirmation UX and passes `give-uen.test.tsx`, but the name change is a 1-word announcement — a `aria-live="polite"` region or `role="status"` would be the more robust SR pattern for transient confirmations (current approach relies on focus staying on the button to hear the rename). No WCAG failure; polish. | `aria-label` ternary |
| L-4 | Low | `src/main.tsx:14–19` · pre-mount redirect | `window.location.replace(hashRedirect)` fires synchronously before `createRoot`, then `createRoot(...).render(<App/>)` still executes. This is the **documented** "render still proceeds so the module never dead-ends" pattern from the remediation plan — correct, but it means a path-style hit briefly parses + mounts the React tree before the `replace` navigation commits. Cost is a few ms of wasted work on the redirect path; no correctness impact (HashRouter takes over after reload). Not fixable without a build-time redirect (host `_headers`/`_redirects`) which the audit left as a host-owned deferred. | `main.tsx` L14–19 |
| I-1 | Info | `src/components/wcag-contrast.test.tsx:54` comment | Comment says `/* "border-shrine-terracotta-500/70 text-shrine-terracotta-500" -> "terracotta-500" */` but the actual Devotion tone is now `text-shrine-terracotta-600`. The comment is a pre-round-12 example string, not the current value — harmless, but a reader matching comment to code will notice the mismatch. | `wcag-contrast.test.tsx:54` |
| I-2 | Info | `src/index.css:32–35` · terracotta-600 comment | Token comment correctly cites the WCAG math (3.92 → 5.36:1) and points to the contract test. No drift. Noted for completeness. | `index.css:32` |
| I-3 | Info | `docs/` lineage note | `skills/` remains `.gitignore`-listed yet tracked (same untrack-vs-ignore lesson as `src.orig` F-9). The remediation plan correctly scoped this **out of the audit** and left it for the repo owner — no finding here, but re-flagged so a future auditor does not re-discover it as "new." | `remediation-plan-round12.md` Out-of-scope observation |

**Carried (ops-owned, not introduced by these 5 commits; re-flagged per plan Phase 4):**

| ID | Sev | Item | Status |
|---|---|---|---|
| H1' | High (ops) | Live host `risen-christ.jesspete.shop` still serves **none** of the five security headers (HSTS / XCTO / XFO / Referrer-Policy / Permissions-Policy) — round-6 H1 recurrence. `public/_headers` ships to `dist/_headers` correctly (V9); the Cloudflare-proxied origin (not Pages) ignores it. Fix is host-side: deploy `dist/` to Cloudflare Pages, or add the five headers via Transform Rules / origin config. | **Unchanged — repo-owner action** |
| C1' | Critical (ops) | `docs/ssh-key.txt` remains in git history (`0be0fe8`) and must be rotated/revoked — round-6 C1. Untracking at `6d87934` holds (V8 shows 0 tracked); history entry is not purged. | **Unchanged — repo-owner action** |

No additional C/H/M code findings. The remediation's own "Invariants verified post-round" checklist (HashRouter comment intact, `card-tint` untouched, no fabricated facts, no test deleted) is confirmed (V7, V27, site `T08CC4042G` single-source).

---

## 3. Per-File Six-Axis Review (changed source in the 5 commits)

### 3.1 `src/index.css` — new `terracotta-600` step (F-1)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `#8f4c30` computes 5.3637:1 on parchment (V13); matches audit's own example and SMA round-7 adoption. |
| Readability | ✅ Comment cites WCAG 2.2 AA 1.4.3, pre/post ratios, and contract path. |
| Architecture | ✅ Additive scale step; no existing token mutated — "tokens frozen" invariant (round-6) treats extensions as allowed (per SMA precedent). Count 24→25 correctly re-pinned in docs. |
| Security | — (no surface) |
| Performance | — (one CSS variable, no runtime cost) |
| Aesthetic | ✅ Darker terracotta retains the warm parish palette; border tint stays decorative as audit instructed. |

**No finding.**

### 3.2 `src/components/EventMeta.tsx` — Devotion tone + exported `categoryTone` (F-1, F-2 lock)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `Devotion: border-terracotta-500/70 text-terracotta-600` — text step darkened, border decorative untouched, exactly the audit's "one-line change in a shared file." |
| Readability | ✅ Inline comment names F-1, cites ratios, points to contract. `export const categoryTone` with `eslint-disable react-refresh/only-export-components` — correct, matches SMA port pattern. |
| Architecture | ✅ Export makes the tone map behaviorally testable (V23 iterates it); no prop drilling. |
| Security | — |
| Performance | — |
| Aesthetic | ✅ 0.65rem bold uppercase chip now AA on parchment for all 4 categories (V13). Date `<time>` stays `text-shrine-maroon-700` (11.2983:1) — locked by V23, not retoned. |

**No finding.**

### 3.3 `src/components/wcag-contrast.test.tsx` — chip + date contrast contract (F-1, F-2)

| Axis | Verdict |
|---|---|
| Correctness | ✅ Parses `@theme` tokens → hex map → WCAG luminance → contrast vs `#f2e9d6`; asserts ≥ 4.5 for all 4 chip tones + the rendered `<time>` element's token. Red state (Devotion 3.9249) reproduced before fix (see remediation doc). |
| Readability | ✅ JSDoc explains WCAG 1.4.3, normal vs large text at 0.65rem, behavioral iteration. Minor I-1 comment mismatch (example string shows `500`, actual is `600`) — Info only. |
| Architecture | ✅ Reads the single source (`src/index.css`); retone or token value change re-verifies automatically — no hardcoded expected hex in the assertion. |
| Security | — |
| Performance | — (file I/O `readFileSync` in test, not shipped) |
| Testing | ✅ 5 tests (4 chip tones + 1 date lock); `process.cwd()` cwd choice is correct for vitest `jsdom` transform (comment explains `import.meta.url` non-file scheme). |

**I-1 only.**

### 3.4 `src/pages/Worship.tsx` — footnote `/70` → `/85` (F-2 pattern sweep)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `/70` blended `#776f5f` = 4.1204:1 FAIL → `/85` blended `#5c5446` = 6.1893:1 PASS (V14). `/75` (4.7018) and `/80` (5.3891) correctly left untouched. |
| Readability | ✅ Comment names F-2 pattern sweep, cites both ratios. |
| Architecture | ✅ One-class fix; no token added, no layout change. |
| Aesthetic | ✅ `text-xs` footnote on parchment card now comfortably AA; visual delta is subtle (darker charcoal), not a palette break. |

**No finding.** The footnote lives on `bg-shrine-parchment` (inside `MassCard`), so the parchment blend calc is the correct surface — verified.

### 3.5 `src/utils/deepLinks.ts` — `knownRoutePaths` + `resolveHashRedirect` (F-3)

| Axis | Verdict |
|---|---|
| Correctness | ✅ 16 entries (9 canonical + 7 alias, `*` excluded) exactly match `App.tsx` `path="…"` literals (V15). Normalizes trailing slash, returns `null` for root/hash-present/unknown/case-mismatch/file paths (V16 7/7). `/#${clean}` is the correct HashRouter target. |
| Readability | ✅ JSDoc explains the single-file tradeoff, the soft-404 reproduction, and the "rewrites known path routes" scope (not an open redirect). |
| Architecture | ✅ HashRouter retained (audit option b); drift guard in `deepLinks.test.ts` prevents silent divergence. `"/"` entry is the only quirk — L-1 (dead entry, correct behavior, no user impact). |
| Security | ✅ Whitelist-only redirect — `!knownRoutePaths.includes(clean) → null` means no open redirect; `pathname` is attacker-controlled but never reflected verbatim without whitelist check. No `innerHTML`, no URL parsing of query/hash. |
| Performance | ✅ Synchronous string compare, no I/O, no allocation beyond `slice`. |
| Testing | ✅ 7 unit tests + 3 E2E journeys (V16–V17). |

**L-1 only.**

### 3.6 `src/main.tsx` — pre-mount `location.replace` wiring (F-3)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `resolveHashRedirect(window.location.pathname, window.location.hash)` before `createRoot`; `if (hashRedirect) window.location.replace(hashRedirect)` then `render` still proceeds — the "module never dead-ends while `replace` reloads" contract from the plan. |
| Readability | ✅ JSDoc names F-3, cites soft-404 reproduction, explains `replace` vs `assign`. |
| Architecture | ✅ Minimal, no router change, no new dependency. Preserves HashRouter's zero-rewrite guarantee for static hosts. |
| Security | ✅ No hash/query forwarding (scope is path → hash equivalent only); no reflection of user input beyond whitelist. |
| Performance | ✅ One `replace` on the redirect path; no extra listener or effect. L-4 notes the brief wasted mount on redirect path — acknowledged tradeoff, not fixable without host rewrites. |

**L-4 only (acknowledged tradeoff).**

### 3.7 `src/utils/deepLinks.test.ts` + `e2e/deep-links.spec.ts` — F-3 contracts

| Axis | Verdict |
|---|---|
| Correctness | ✅ 7 unit: known, alias, trailing slash, root/empty, hash-present (`#` bare treated as no route), unknown/case/file. Drift guard parses `App.tsx` path literals and asserts sorted-equals. 3 E2E: `/worship` → `#/worship` h1 "mass, mercy", `/news-events` → "life of the parish", `/donate` alias → Give h1. All green (V16–V17). |
| Readability | ✅ Comments cite F-3 soft-404 reproduction date (2026-08-31). |
| Architecture | ✅ Drift guard is the key durability move — adding a route without extending `knownRoutePaths` fails the test. |

**No finding.**

### 3.8 `src/pages/Give.tsx` — section retitle + copyable UEN row (F-4)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `SectionHeading` `title="Ways to give"` (was `` `UEN ${site.uen}` `` in Fraunces 3xl–4xl) — page outline now announces human language; `site.uen` appears exactly once, inside `[data-featured="true"]` PayNow card (V18). PayNow description reworded so the UEN string is not duplicated. |
| Readability | ✅ `CopyUenButton` JSDoc explains the compliance-string-as-heading problem, clipboard-first strategy, and honest no-op on failure. |
| Architecture | ✅ `useState` for `copied`, `aria-label` toggles, button is `shrink-0` in a flex row with `border-shrine-stone` utility — no new token, no card-lift change (`card-tint` invariant V27 holds). |
| Security | ✅ `navigator.clipboard.writeText` inside `try/catch`; legacy `execCommand` fallback appends a hidden `textarea` then `select()` + `execCommand("copy")` then `removeChild` — correctly cleaned up. No `innerHTML`. |
| Performance | — |
| A11y | ✅ Button has accessible name in both states; row uses `font-display` for the value (consistent with other value displays). L-3 notes the `"Copied"` rename vs `aria-live` — polish, not failure. |
| Polish | L-2 (`execCommand` deprecated fallback — fallback-only, safe) + L-3 (name-change confirmation) — both Low, no WCAG failure. |

**L-2, L-3 only.**

### 3.9 `src/data/content.ts` — PayNow description reword (F-4)

| Axis | Verdict |
|---|---|
| Correctness | ✅ `"Scan or transfer by UEN — Church of the Risen Christ."` — no longer repeats the UEN literal, so the page renders it exactly once (V18). `content.test.ts` pins only count/shape, so unaffected. |
| Readability | ✅ Comment cites F-4 and points to `Give.tsx` detail row. |

**No finding.**

### 3.10 `src/repo-hygiene.test.ts` — F-9 guard (64 → 0)

| Axis | Verdict |
|---|---|
| Correctness | ✅ Extends the existing C1 guard (round-6) with `f.startsWith("src.orig/")` check via `git ls-files`. Red: 64 tracked; green: 0. |
| Readability | ✅ Comment re-states the `.gitignore` does-not-untrack lesson (same as C1). |

**No finding.** Hygiene is now symmetric: `skills/` still has the same discrepancy but is explicitly scoped out in the plan (no audit finding, repo-owner discretion) — correctly not added.

### 3.11 Doc re-pin `74c408c` — `AGENTS.md` / `CLAUDE.md` / `README.md` / `risen-christ_SKILL.md` / `src/docs-contract.test.ts`

| Axis | Verdict |
|---|---|
| Correctness | ✅ 32/184+48 → 35/202+51, 24→25 colors, v1.4.3→1.4.4, terracotta-600 row added, audit + remediation-plan + remediation-round docs listed, `src.orig` note updated to "pruned round-12", `src/utils/deepLinks.ts` added to structure fences. Deltas: unit +3 files / +18 tests (5 wcag + 1 footnote + 7 deepLinks + 3 give-uen + 1 hygiene + 1 docs-contract), E2E +1 spec / +3 journeys, bundle +1.86 kB. |
| Readability | ✅ `remediation-round12` closure records red/green evidence verbatim; `docs-contract` comments carry round-12 ledger anchor pin. |
| Guard | ✅ `docs-contract.test.ts` 16 pins (was 15) — all green (V21). |

**No finding.**

---

## 4. Six-Axis Scores (changed code in `4db7768..74c408c`)

| Axis | Score | Notes |
|---|---|---|
| Correctness | 10/10 | Every F-1/F-2/F-3/F-4/F-9 fix reproduces the audit's remedy on the current token layer; red→green pairs observed and recorded; no existing contract broken (V1–V27 all green). |
| Readability | 9/10 | Intent comments honest and cross-referenced; one stale example string (I-1) and one missing clarifying comment (L-1) — both Info/Low. |
| Architecture | 10/10 | Additive changes only (one token step, one util, one button, one guard); HashRouter + route table + `card-tint` + token discipline preserved; drift guard is the strongest durability move in this round. |
| Security | 10/10 | Whitelist-only redirect, no open redirect, no XSS sinks, no `any`, no secrets; clipboard `try/catch` + fallback cleanup correct. Carried H1'/C1' are host/history-owned, not re-introduced. |
| Performance | 10/10 | +1.86 kB for 5 findings; transform/opacity-only motion untouched; no new chunk, no listener leak, no I/O. |
| Aesthetic / UX rigor | 10/10 | 3.92→5.36:1 and 4.12→6.19:1 with no palette break; heading outline now human; copyable UEN where it is needed; `terracotta-600` is the right scale step (not a one-off hex). |

**Overall: APPROVE — no follow-up code required.** The four Low findings (L-1..L-4) are polish/clarity notes; the single carried High and Critical are ops-owned and unchanged.

---

## 5. Evidence

- Gates: `pnpm lint` 0 · `pnpm typecheck` 0 · `pnpm test` 35/202 · `pnpm build` 397.52 kB (gzip 114.89 kB) · `pnpm test:e2e` 51/51 (this audit re-ran all five; see V1–V5).
- WCAG math (independent, see V13–V14): terracotta-500 `#ab5f3c` 3.9249:1 → terracotta-600 `#8f4c30` 5.3637:1; charcoal/70 `#776f5f` 4.1204:1 → charcoal/85 `#5c5446` 6.1893:1 (charcoal `#423a2c` blended over parchment `#f2e9d6`); all other tones ≥ 9.3:1.
- Git: `git log --oneline 4db7768..74c408c` = 5 commits; `git diff --stat` + per-SHA diffs inspected in full.
- This ledger records **no code changes** — it is a review artifact. If L-1..L-4 are taken up, they are one-line comment/lint-scope edits with no test or behavioral impact.

---

## 6. What Was Not Re-Audited

- **F-5 (SMA News journey) — N/A** in this repo; correctly left untouched.
- **F-6 (imagery artifacts) / F-7 (scroll-reveal reader-mode blanks) / F-8 (2.7 MB images)** — informational, deferred per audit; no change, no finding.
- Prior rounds' contracts (drawer modal, `Layout` double-hash, `SafeImage` fallback, `Timeline` rail, `ScrollProgress`/`BackToTop` ring, `useScrollSpy` tie-break) — not in this diff, not re-probed beyond V7/V26/V27 spot checks; all remain green via unit + E2E.

---

*Audit executed as a single autonomous pass on `74c408c` (HEAD at time of writing). Re-run `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` to re-verify the gate snapshot above.*


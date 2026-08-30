# E2E Live Pass — Round-11: Validation of `66d2398` + Remediation Plan (E2E-J1)

**Date:** 2026-08-31 · **Scope:** fresh E2E pass against `https://risen-christ.jesspete.shop/` serving commit `66d2398` (round-10, v1.4.2), then remediation of any identified issues via TDD, docs sync, commit + push to `main`.

---

## 1. Pass results (validation phase, all verified on 2026-08-31)

| Check | Result | Evidence |
|---|---|---|
| Deployment identity | ✅ VERIFIED | live HTML md5 `6ee34e4a7cf17ceffaab17d8ed7e0528` (395,663 B) ≡ local `dist/index.html` built at `66d2398` — byte-identical; equals the round-8 build md5 (round-10 touched no `src/` files) |
| `pnpm lint` | ✅ 0 | `eslint . --max-warnings 0` |
| `pnpm typecheck` | ✅ 0 | `tsc --noEmit` |
| `pnpm test` (unit) | ✅ 32 files / 181 tests | vitest jsdom — matches the v1.4.2 pin exactly |
| E2E vs **dev** | ✅ 48/48 (1.3m) | `pnpm test:e2e` |
| E2E vs **built dist** | ✅ 48/48 (1.1m) | `pnpm test:e2e:built` (`vite preview :4173`) |
| E2E vs **LIVE** | ✅ 48/48 (1.3m) | `E2E_BASE_URL=https://risen-christ.jesspete.shop pnpm test:e2e:built` — includes the round-10 env-agnostic favicon assertion passing against the deployed artifact |
| agent-browser journey | ✅ 43/43, 0 FAIL | `scripts/e2e_live_pass_round11.sh` (local-only): home render + JSON-LD; favicon contract; 16-route crawl 0 broken images; NotFound; 6/6 anchors; FAQ single-open + office phone; PayNow featured `rgb(195,150,63)` 2px + UEN `T08CC4042G` + no HRSM; scrollspy → Faith Formation; Worship sticky 112px + Maps iframe; nav hairline active/inactive; mobile 390px no h-scroll + dialog/focus-trap/Escape; ZERO console/page errors |
| favicon on live | ✅ | `href="./favicon.svg"` (production form) → HTTP 200 `image/svg+xml` |
| Security headers | ⚠️ 0/5 | HSTS / XCTO / XFO / Referrer-Policy / Permissions-Policy all absent — **H1′ unchanged** (host-level) |

**Verdict: GREEN.** Zero product defects found. One new low-severity tooling finding (E2E-J1) + two standing ops items (H1′, C1′).

## 2. Findings

### E2E-J1 — agent-browser eval mangles backslash-escaped regex literals (Low, journey tooling — NOT a site defect)

- **Symptom:** the new journey Phase 1.5 (favicon contract) returned an *empty* result and failed, while Playwright's equivalent assertion passed 48/48 against the same deployment minutes earlier.
- **Root cause (verified interactively):** `agent-browser` v0.35.0 strips backslashes from the eval'd JS. A regex literal containing `\/` (`/^(?:\.\/|\/)favicon\.svg$/`) arrives at the page as `/^(?:\./` → `SyntaxError: Unterminated group`; the harness pipes stderr to `/dev/null`, so only an empty string remains → false FAIL.
- **Disproof of site impact:** same-origin `fetch('/favicon.svg')` in-page returns `HTTP:200`; the link `href` is exactly `./favicon.svg`; Playwright (no string mangling) asserts the same contract green.
- **Fix applied (in the local-only journey script, per repo convention):** backslash-free contract check — plain string comparisons `h === './favicon.svg' || h === '/favicon.svg'` + `fetch(l.href)` resolution. Re-run: **43/43 PASS**.
- **Repo-level gap:** the lesson lives only in a local script — future agents writing `agent-browser eval` checks will re-trip on it. → R-1 captures it as a SKILL pitfall with a guard pin.

### H1′ — live host serves 0/5 security headers (High, ops — unchanged, not repo-fixable)

`public/_headers` ships to `dist/` but the host ignores it (Cloudflare-proxied, not Pages). Owner action: Cloudflare Pages deploy or Transform Rules. Carried open since round-5/6.

### C1′ — leaked SSH key in git history (Critical, ops — unchanged)

`docs/ssh-key.txt` was untracked in `3404a31`-lineage but remains in history at `0be0fe8`. Owner action: rotate/revoke. Carried open since round-6.

## 3. Skills applied (per `skills/skills-catalog.md`)

| Skill | Use in this round |
|---|---|
| `webapp-testing-journey` | Live journey phases (URL journeys, console/error audit, focus-trap, viewport matrix) |
| `webapp-testing` | Deep-audit framing of the pass; test assumptions, not claims |
| `e2e-testing-lessons` | Regression suite = Playwright (tri-env), quick journeys = agent-browser; tool-selection matrix |
| `diagnosing-bugs` | E2E-J1 tight red loop: interactive repro → root cause → minimal fix → disproof of site impact |
| `tdd-workflow` + `test-driven-development` | Guard-first docs remediation (RED → GREEN below) |
| `code-quality-standards` | Six-Axis pass over the changed test file and docs rows |
| `code-review` | Standards/Spec fixed-point review vs `66d2398` before commit |

## 4. Remediation items

### R-1 — Capture the E2E-J1 lesson as SKILL pitfall #15 + guard pin
`risen-christ_SKILL.md` §14 pitfalls table: append row 15 — *agent-browser eval backslash mangling* (avoid backslash-escaped regex literals in `agent-browser eval`; use string comparisons or `new RegExp` from string sources; un-hide stderr while debugging). `src/docs-contract.test.ts` gains a test pinning the row's presence.

### R-2 — Round-11 pass ledger rows + guard pin
New rows referencing `docs/e2e-live-pass-round11-2026-08-31.md` in: `AGENTS.md` doc map (after the round-9 row), `README.md` audits paragraph, `risen-christ_SKILL.md` Appendix doc-map table. Guard gains a test pinning the doc reference in all three.

### R-3 — Version bump v1.4.2 → v1.4.3
`package.json` `version`, `README.md` badge, `risen-christ_SKILL.md` front-matter + §2 pin. Docs-only round; no code or dependency change.

### R-4 — Re-pin unit budget 32/181 → 32/184 and docs-contract 12 → 15
The three new guard tests raise docs-contract 12 → 15 and the unit budget 181 → 184. Re-pin **current-state** claims only, across: guard file (5), `CLAUDE.md` (9 lines), `README.md` (6), `AGENTS.md` (6), `risen-christ_SKILL.md` (11). **Preserved as history:** guard header comment's round-9 re-pin record (`32/179 → 32/181`), AGENTS round-9 row's action record (`re-pin 32/181, v1.4.2`), SKILL historical appendices. *(Draft originally said 183/14 with +2 tests — corrected during RED, see §6.)*

## 5. Pre-execution validation against the codebase (verified before editing)

| Claim | Verified |
|---|---|
| `src/docs-contract.test.ts` = 12 tests (SKILL 5 + README 2 + AGENTS 2 + CLAUDE 3) | ✅ read file |
| SKILL pitfalls table §14, row 14 at line 584; row 15 slot after it | ✅ `sed -n '576,584p'` |
| AGENTS.md doc-map round-9 row at line 115 (current marker) | ✅ grep |
| README audits paragraph line 158; version badge line 3 | ✅ grep |
| SKILL front-matter `version: 1.4.2` line 4; §2 pin line 106; Appendix doc-map line 1424 | ✅ grep |
| Version pins: `package.json:4`, `README.md:3`, SKILL 4 + 106 | ✅ grep |
| Current-state `181` pins classified (all listed above); historical records excluded | ✅ per-line inspection incl. CLAUDE:65, AGENTS:112, AGENTS:115, SKILL:595 |
| `docs-contract (12)` count pins: CLAUDE 165/313/332, README 43, AGENTS 22, SKILL 114/131/304/632 | ✅ grep |
| E2E-J1 repro: eval `'/^(?:\\.\\/|\\/)favicon\\.svg$/'` → `SyntaxError: Unterminated group`; string-comparison form passes | ✅ interactive |
| E2E stays 48 (no spec changes); build stays 395.66kB (no `src/` changes) | ✅ this pass |

## 6. TDD execution plan

1. **RED** — `src/docs-contract.test.ts`: (a) +3 new tests (SKILL pitfall-#15 + ledger-row pin; README ledger-row pin; AGENTS ledger-row pin — one per idiomatic describe); (b) re-pin the 3 existing budget assertions 181 → 184. Run `pnpm test` → expect exactly 6 failures against the not-yet-updated docs.
2. **GREEN** — apply R-1..R-4 doc edits. Run `pnpm test` → 32 files / 184 green.
3. **Close** — five gates (`lint`, `typecheck`, `test`, `test:e2e`, `build`) + sixth built-artifact check (`test:e2e:built`); docs-contract guard 15 tests green.
4. Commit (docs + guard, main only) → push via `ssh_git_wrapper_v3.py` + `docs/ssh-key.txt`.

> **Correction vs draft:** the draft planned +2 guard tests (docs-contract 12 → 14, budget 183). During RED the ledger-row pin was split per-document describe (SKILL / README / AGENTS), yielding **+3 tests (12 → 15, budget 184)**; the draft's "+2 / 14 / 183" was never valid against the executed tree. §7 records the executed numbers.

## 7. Execution ledger (executed 2026-08-31)

| Step | Result |
|---|---|
| RED | `src/docs-contract.test.ts` → 15 tests; run against un-remediated docs: **exactly 6 failures** (SKILL pitfall+ledger, SKILL QuickRef 184, README ledger, AGENTS 184, AGENTS ledger, CLAUDE 184); other 178 pass |
| GREEN | scripted docs sync (`scripts/round11_docs_sync.py`, 48 asserted replacements + AGENTS:112 tail pin): R-1 pitfall #15 (SKILL:585, carries the ledger reference inside the guard-visible contract region); R-2 rows (AGENTS doc-map, README audits paragraph, SKILL Quick-Ref doc-map table); R-3 v1.4.3 (package.json, README badge, SKILL front-matter + §2); R-4 re-pins 181 → 184 + docs-contract 12 → 15 across CLAUDE (9 lines), README (6), AGENTS (7 incl. tail), SKILL (11), guard assertions |
| Residual audit | `181` remains only in intentional historical records: guard header (round-9 record + round-11 FROM value), AGENTS:115 (round-9 action record). `docs-contract (12)` zero residual; `1.4.2` zero residual in agent-facing docs |
| Five gates on final tree | lint **0** · typecheck **0** · unit **32 files / 184** · E2E **48** · build **395.66 kB** |
| Sixth + tri-env | built dist **48/48**; **LIVE 48/48** (`E2E_BASE_URL`) — dev/dist/live all green post-remediation |
| Guard | docs-contract **15/15** green (was 12) |

**Out of scope (ops, carried):** H1′ live host security headers (0/5 — Cloudflare Pages/Transform Rules); C1′ SSH key rotation (history `0be0fe8`).

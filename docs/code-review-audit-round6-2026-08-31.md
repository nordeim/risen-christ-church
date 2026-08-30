# Code Review & Security Audit — Round 6 (Risen Christ)

**Date:** 2026-08-31 · **Scope:** full repo @ `9d4c62f` (main) · **Mode:** C (audit + report; remediation planned separately in `docs/remediation-plan-round6-2026-08-31.md`)
**Method:** tiered review per `skills/code-review-checklist` (12-category scan) + `skills/vulnerability-scanner` (OWASP 2025) + `skills/verification-and-review-protocol` (Iron Law). Evidence-backed; confidence tagged per finding.

---

## Summary

| Severity | Count | Findings |
|---|---|---|
| **Critical** | 1 | C1 SSH private key tracked & published |
| **High** | 1 | H1 Live host serves none of the documented security headers |
| **Medium** | 3 | M1 README stale test/E2E/CI claims · M2 CLAUDE.md internal contradictions · M3 risen-christ_SKILL.md carries St Mary-era contracts |
| **Low** | 4 | L1 stale playwright.config comment · L2 stale e2e/helpers example · L3 favicon.svg undocumented · L4 stale "skills pruned" claims |
| **Informational** | 3 | I1 CSP `script-src 'unsafe-inline'` (singlefile tradeoff) · I2 repo carries large historical artifacts · I3 Header dropdown trigger has no click-toggle (documented intentional) |
| Retracted | 1 | C2 "CI trigger YAML corrupted" — **false positive, retracted** (see below) |

**What is verified healthy (evidence in ledger below):** all five gates green (lint 0 / typecheck 0 / unit 25 files·142 tests / E2E 40 / build 388.44 kB); live site **byte-identical** to `dist/index.html` (md5 `f0568e67ea183dc9888da90d6cbb93b2`); every documented journey passes on the live site with **zero console/page errors**; data-layer counts exact (priests 3, ppc 7, timeline 8, grounds 3, ministries 6, faqs 6, events 6, giving 8, serveRoles 4, devotions 6, images 11); routes exact (17 entries / 7 aliases / 9 hash anchors); `pnpm audit` clean; no XSS sinks, no `any`, no stray console/TODOs; all `target="_blank"` links carry `rel="noopener noreferrer"`.

---

## Findings

### C1 — Private SSH key tracked and published in the public repo

- **Location:** `docs/ssh-key.txt` (git-tracked; introduced in commit `0be0fe8` "add skills", 2026-08-31)
- **Description:** The file contains an unencrypted OpenSSH RSA private key (`-----BEGIN OPENSSH PRIVATE KEY-----`, cipher `none`). `.gitignore` lists `docs/ssh-key.txt`, but gitignore has no effect on already-tracked files — the key is in the index and in the public history of `https://github.com/nordeim/risen-christ-church.git`.
- **Evidence:** `git ls-files docs/` lists `docs/ssh-key.txt`; `git check-ignore -v docs/ssh-key.txt` returns nothing (tracked files bypass ignore rules); `git show 0be0fe8 --stat -- docs/ssh-key.txt` shows the commit adding it.
- **Impact:** Anyone who clones the public repo can authenticate to GitHub as the key owner and push to repositories the key grants access to. Full account/repo takeover via git remotes.
- **Severity:** Critical
- **Recommended fix:** (a) `git rm --cached docs/ssh-key.txt` so the local copy required by the push workflow stays on disk but leaves tracking (the `.gitignore` entry then becomes effective); (b) **rotate/revoke the key on GitHub** — removing it from HEAD does not remove it from history, so rotation is the only real remediation (repo owner action, cannot be done in-repo); (c) add a regression test asserting the file is not tracked (`src/repo-hygiene.test.ts`).
- **Confidence:** Verified

### C2 — ~~CI workflow never triggers (corrupted YAML)~~ — RETRACTED

- **Status:** False positive. **Retracted** during verification.
- **What happened:** The initial inspection displayed both triggers as `branches: ain]` and the draft audit reported the workflow as dead. Byte-level verification (`python3` ordinal dump: `0x5b 0x6d 0x61 0x69 0x6e 0x5d` = `[main]` on both triggers) proved the file on disk is valid — the apparent corruption was an artifact of the reviewing agent's output channel, which drops the two-character sequence after a bracket in displayed text. The lesson is recorded in the ledger: tool output inconsistent with the code must be re-verified against the bytes before it becomes a finding.
- **Corrective action taken anyway:** a guard test (`src/ci-workflow.test.ts`) now pins the trigger contract (push + pull_request → `branches: [main]` flow sequence) and the five gate steps, so a *real* trigger corruption cannot land silently.
- **Severity:** n/a (retracted) · **Confidence:** Verified (byte-level, both triggers)

### H1 — Live site serves none of the host-level security headers

- **Location:** deployment host of `https://risen-christ.jesspete.shop/` (Cloudflare-proxied origin, **not** Cloudflare Pages) vs `public/_headers`
- **Description:** `curl -I https://risen-christ.jesspete.shop/` returns no `Strict-Transport-Security`, no `X-Content-Type-Options`, no `X-Frame-Options`, no `Permissions-Policy`. The repo ships `public/_headers` with all five directives and `src/security-headers.test.ts` guards its content — but `_headers` is a **Cloudflare Pages** feature; the current host ignores it. This is a recurrence of round-3 M-2/L-1 (`docs/code-review-audit-round3-2026-08-30.md`): the file was added and tested, but the hosting gap was never closed. The document-level mitigations (CSP meta, `Referrer-Policy` meta) **are** active.
- **Evidence:** response headers on 2026-08-31: `cache-control: no-cache, vary: Origin, cf-cache-status: DYNAMIC, server: cloudflare` — no security headers; `public/_headers` lists all five.
- **Impact:** Clickjacking (no `X-Frame-Options`), MIME-sniffing (no `nosniff`), SSL-strip (no HSTS), unrestricted powerful APIs — on the only URL users actually visit.
- **Severity:** High
- **Recommended fix (operational, outside repo):** either deploy `dist/` to Cloudflare Pages (where `_headers` is honored), or add the five headers via Cloudflare Transform Rules / origin config for `risen-christ.jesspete.shop`. In-repo: document the gap in `README.md` Deployment + audit trail so the next deploy doesn't assume the headers are active.
- **Confidence:** Verified (live curl 2026-08-31)

### M1 — README.md contradicts verified project state (test/E2E/CI status)

- **Location:** `README.md` — File Hierarchy (`**/*.test.{ts,tsx} … (0 files — not yet ported)`; `vite.config.ts … setupFiles: src/test/setup.ts (missing)`; `e2e/ … STALE` markers on smoke/navigation/ministries/give-faq), Verify Setup (`# tests not yet ported — pnpm test → "No test files found"`), Check table (`pnpm test | No test files found…`; `pnpm test:e2e | Stale — still asserts St Mary copy`), Contributing (`tests excluded until ported… St Mary suite was 25/141 + 42 E2E`), Troubleshooting (`pnpm test finds 0 tests | Expected`).
- **Description:** The port is complete and verified — `pnpm test` = **25 files / 142 tests passing**, `pnpm test:e2e` = **40 tests passing** with Risen Christ copy, `src/test/setup.ts` exists, CI runs all five gates. README says the opposite in six places (it also contains the *correct* counts in the Tech Stack table — the file disagrees with itself).
- **Impact:** Agents and maintainers using README as contract will misjudge the project as half-ported, skip gates, or "re-port" already-ported tests. This doc is the project's visitor-facing source of truth.
- **Severity:** Medium
- **Recommended fix:** rewrite the stale sections to the verified state; keep exactly one set of counts (25 files/142 unit, 6 specs/40 E2E, 388.44 kB build, 17 routes).
- **Confidence:** Verified (all gates executed 2026-08-31)

### M2 — CLAUDE.md internal contradictions (same class as M1)

- **Location:** `CLAUDE.md` — Vite 7 section note ("`src/test/setup.ts` is currently **missing** … `pnpm test` exits 1"), Build Commands footnote ("Gate is currently `lint && typecheck && build`" while the table row documents the five-command gate and says "**all three** must be green"), Push/Deploy ("# after port" comment below an already-full gate), CI paragraph ("`test`/`test:e2e` steps are commented out until Risen Christ data port" — they are active), Architecture tree ("src/ (38 source files — tests not yet ported)", "`test/setup.ts # (missing — not yet ported)`", "`e2e/ (6 specs — stale)`"), Success Metrics ("after port `pnpm test` 25/141 + `pnpm test:e2e` 42").
- **Impact:** The file declares itself "the authoritative agent onboarding doc" — contradictory contracts make agents distrust or cherry-pick it.
- **Severity:** Medium
- **Recommended fix:** reconcile every section to the verified state (25/142 + 40 E2E + five-gate + CI active); update the Validation Checklist rows 4/5 accordingly.
- **Confidence:** Verified

### M3 — risen-christ_SKILL.md carries St Mary-of-the-Angels contracts as current

- **Location:** `risen-christ_SKILL.md` — §1 identity table (name/address/feast/hours/transport/contacts = St Mary, UEN T08CC4053H/HRSM, emergency 9682 7875, columbarium), §2 ledger ("42 tests … enhancements 9"), §5.4/§8/§10 anchor `#mandarin` (actual: `#language-communities`), §7 data reference (ministries "Mandarin 7.15, Tamil 19.45, Sinhala, Malayalam, Indonesian"; faqs with B1/B2 parking + columbarium; events "First Holy Communion 29 Aug 2026, WYD 2027 briefing, Walking with St Francis, Jubilee 2026"; givingOptions "Tap & Give…PayNow T08CC4053H"; devotions "St Anthony Tue 18.30… Portiuncula 2 Aug"; lifeTimeline "1957–2026 Franciscan"), §11 pre-ship ("test 24/134 + test:e2e 42"), front-matter `stack` line ("42 E2E green"). ~66 lines match St Mary/Bukit Batok facts.
- **Description:** The file's front-matter and header claim Risen Christ + 25/142 + 40 E2E, but large sections of the body still describe the previous port (parish identity, data shapes, anchors, counts). The file bills itself as "the single-source-of-truth … every version, hex, and path is verified … if it drifts, fix this file first."
- **Impact:** Highest-severity doc drift: any future agent following §1/§7/§11 will use wrong parish facts, wrong anchors (`#mandarin` 404s into a scroll miss), wrong test budgets.
- **Severity:** Medium (doc) — would be High if the file were executed as-is by an agent building a new port
- **Recommended fix:** rewrite stale sections to Risen Christ contracts (this audit's verified counts and `src/data/*` contents); fix front-matter to a single consistent "40 E2E / 25 files / 142 tests".
- **Confidence:** Verified (grep + cross-check against `src/data/*`, `App.tsx`, `Ministries.tsx`)

### L1 — playwright.config.ts identity comment stale

- **Location:** `playwright.config.ts` line 4 — "Playwright E2E for st-mary-of-angels — HashRouter SPA."
- **Impact:** Minor misdirection; config content is correct and verified.
- **Severity:** Low · **Fix:** retitle to risen-christ-church. · **Confidence:** Verified

### L2 — e2e/helpers.ts doc-comment example uses a St Mary path

- **Location:** `e2e/helpers.ts` line 5 — `Example: gotoHash(page, "/what-to-see#pilgrim-center")`. Neither `/what-to-see` nor `#pilgrim-center` exists in this SPA.
- **Impact:** Copy-pasteable example routes to NotFound; misleads new specs.
- **Severity:** Low · **Fix:** change to a real Risen Christ path (`/worship#mass`). · **Confidence:** Verified

### L3 — favicon.svg ships but is undocumented

- **Location:** `public/favicon.svg` (→ `dist/favicon.svg`, referenced by `index.html` `<link rel="icon" href="/favicon.svg">`). AGENTS/CLAUDE/README describe `public/` as "8 images + `_headers`" and AGENTS' dist ledger omits `favicon.svg`.
- **Severity:** Low · **Fix:** add favicon.svg to the public/ and dist inventories in all three docs. · **Confidence:** Verified

### L4 — "skills/ is committed-but-pruned" claims are now false

- **Location:** AGENTS.md (Quirks, line 62), CLAUDE.md (Git section, Development Workflow), README.md (Contributing callout) — all state the catalog and SKILL.md contents were removed in round 3 at `31e7bd6`/`c774ed9`.
- **Description:** Commit `0be0fe8` "add skills" (2026-08-31) re-added the full vendored tree including `skills/skills-catalog.md` (86 KB) and per-skill `SKILL.md` files. The ignore/config guards (eslint ignores, tsconfig excludes, vite watch ignores) remain correct and active.
- **Severity:** Low · **Fix:** update the three docs to "vendored reference content, catalog present, not project source — do not import/lint". · **Confidence:** Verified

### I1 — CSP `script-src 'unsafe-inline'`

- The single-file build inlines the JS bundle, so `'unsafe-inline'` is currently required; nonce/hash hardening would require a build-time CSP generator. Accepted tradeoff, documented in index.html + head tests. **Informational.**

### I2 — Repo carries large historical artifacts

- `docs/st-mary-of-angels-grok4.6.zip` (300 KB binary), multi-round audit docs, `docs/audit-shots-round5/` (ignored). Deliberate lineage-keeping; no action required. **Informational.**

### I3 — Header dropdown triggers have no click-toggle

- Desktop dropdowns are hover/focus-open by design (documented in CLAUDE.md/AGENTS.md; touch users get the mobile drawer). Live-verified working. **Informational.**

---

## Verification Ledger

| # | Claim | Method | Result |
|---|---|---|---|
| 1 | Stack versions match docs | `package.json` vs AGENTS/CLAUDE/README/SKILL | Match (Verified) |
| 2 | Lint gate | `pnpm lint` | Exit 0, `--max-warnings 0` (Verified) |
| 3 | Type gate | `pnpm typecheck` | Exit 0 (Verified) |
| 4 | Unit suite | `pnpm test` | 25 files / 142 tests pass (Verified) |
| 5 | E2E suite | `pnpm test:e2e` (chromium) | 40 pass — smoke 11, nav 8, ministries 4, give-faq 4, enhancements 7, round5 6 (Verified) |
| 6 | Build | `pnpm build` | `dist/index.html` 388.44 kB + `_headers` + `favicon.svg` + `images/8` (Verified) |
| 7 | Live == build | md5 of `https://risen-christ.jesspete.shop/` vs `dist/index.html` | Identical `f0568e67…` (Verified) |
| 8 | Live journeys (9 hash anchors, 7 aliases, NotFound, accordion, Give, drawer modal+focus, dropdowns, images, maps iframe, console) | agent-browser against live site | All pass, zero errors (Verified) |
| 9 | Host security headers | `curl -I` live | None present (Verified) — H1 |
| 10 | Dependency health | `pnpm audit` + pinned-exact check | No known vulnerabilities (Verified) |
| 11 | Secrets in source | grep scan `src/`, `git ls-files` scan | `src/` clean; `docs/ssh-key.txt` tracked (Verified) — C1 |
| 12 | CI trigger validity | Byte-level dump of `.github/workflows/ci.yml` branch values (`0x5b 0x6d…` = `[main]` ×2) | Valid on both triggers (Verified) — draft C2 retracted; guard test `src/ci-workflow.test.ts` added |
| 13 | Route/data contracts | `App.tsx` (17 routes), `src/data/*` item counts, `nav.ts` (6/10), tokens (24+2) | All match docs (Verified) |
| 14 | Doc drift inventory | grep AGENTS/CLAUDE/README/SKILL vs executed reality | M1–M3, L1–L4 as listed (Verified) |

Findings that could not be verified in this environment: none. Every finding above is backed by direct execution or byte-level inspection; the one draft finding that failed byte-level verification (C2) was retracted rather than reported.

---

## Positive Assurance (clean bill where nothing was found)

No SQL/command/injection surface (no backend, no forms, no `dangerouslySetInnerHTML`, no `eval`); no user-input reflection paths; external links are `https://` + `rel="noopener noreferrer"`; Google Maps iframe is origin-pinned by CSP `frame-src`; fonts pinned to Google; images all local (`img-src 'self' data: blob:`); no telemetry beyond the documented Cloudflare beacon; strict TypeScript with zero `any`; no dead code; a11y contracts (modal drawer, focus trap/restore, `aria-current` matrix, inert accordion panels, reduced-motion gating, skip-link hash discipline) verified live. The SPA codebase itself is in shippable condition; the two Criticals are repository/deployment-integrity issues, not application vulnerabilities.

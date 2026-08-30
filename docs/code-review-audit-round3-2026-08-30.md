# Code Review & Security Audit — Round 3 (2026-08-30)

**Scope:** full repo at `8603948` — `src/` (35 source files), `index.html`, configs, `e2e/`, docs contract (AGENTS/CLAUDE/README/SKILL), live deploy `https://st-mary-of-angels.jesspete.shop/`, dependency tree.
**Method:** tiered — (T1) automated gates + dependency audit + secret scan; (T2) manual file-by-file review of security/correctness/a11y-relevant paths; (T3) live-browser E2E (Playwright chromium) against the deployed site. Skills used (repo `skills/`, per `skills/skills-catalog.md` @ `c774ed9`): `code-review-checklist` (12-category scan), `code-quality-standards` (Six-Axis), `security-and-hardening` (OWASP + secrets), `verification-and-review-protocol` (Iron Law), `tdd-workflow` (remediation), `webapp-testing`.
**Verification ledger:** lint `0 warnings` · `tsc --noEmit` clean · vitest **16 files / 92 tests** pass · Playwright **35/35** pass · `vite build` OK (`dist/index.html 380.29 kB` + `dist/images/` 8) · `pnpm audit` clean · live root 200, byte-identical to local build (modulo asset hash) · all 16 content routes + 7 aliases + 9 anchors + 404 verified live · all images load · mobile drawer + Escape + SkipLink verified live.

**Counts:** Critical **1** · High **3** · Medium **4** · Low **6** · Informational **4**.

---

## Critical

### C-1 — Unencrypted SSH private key committed to the public repo
- **Location:** `docs/ssh-key.txt` (tracked; `git ls-files` confirms).
- **Evidence:** OpenSSH private key header (`-----BEGIN OPENSSH PRIVATE KEY-----`), unencrypted (no cipher/KDF), key material redacted from this report by policy. Repo is publicly cloneable (this audit cloned it anonymously).
- **Impact:** anyone with read access holds push credentials for `main`. Already public → treat as compromised regardless of future removal.
- **Severity:** Critical (security, secret handling). **Confidence:** Verified.
- **Recommended fix:** (a) untrack the file + `.gitignore` entry (done in this round); (b) **owner action:** rotate/revoke the key pair and, if the workflow requires committed keys, use a fine-grained deploy key scoped to this repo only. History rewrite (`git filter-repo`) is optional post-rotation.

## High

### H-1 — Stale committed `package-lock.json` contradicts exact pins (supply-chain drift)
- **Location:** `package-lock.json` (last touched `31e7bd6`).
- **Evidence:** lockfile resolves `vite 7.3.2`, `esbuild 0.27.7`; `package.json` + `pnpm-lock.yaml` pin `vite 7.3.6`. `npm audit --package-lock-only`: vite 7.0.0–7.3.3 — GHSA-fx2h-pf6j-xcff (**High**, `server.fs.deny` bypass, Windows dev server) + GHSA-v6wh-96g9-6wx3 (launch-editor NTLMv2 hash disclosure, Windows); esbuild 0.27.3–0.28.0 — GHSA-g7r4-m6w7-qqqr (Low). `pnpm audit` (the supported path): **0 vulnerabilities**. Advisories are Windows dev-server-only — not reachable in the shipped static artifact.
- **Impact:** `npm ci` installs the drifted, vulnerable toolchain; two lockfiles is a standing drift vector for an exact-pinned repo.
- **Severity:** High (data integrity / supply chain; exploitability limited). **Confidence:** Verified.
- **Recommended fix:** remove `package-lock.json` from the repo (docs already declare pnpm the supported manager; `npm ci` is documented as non-drop-in). Document npm guidance in all four docs.

### H-2 — Live deploy: site CSP blocks the host-injected analytics beacon
- **Location:** `index.html` CSP meta (`script-src 'self' 'unsafe-inline'`) as deployed to Cloudflare Pages.
- **Evidence:** live console error + `requestfailed (csp)` for `https://static.cloudflareinsights.com/beacon.min.js/...` on every page load (captured 2026-08-30).
- **Impact:** Cloudflare Pages Web Analytics never loads (host-side metrics silently dead); console noise on every visit.
- **Severity:** High for the deployment target's observability; not a code-correctness defect. **Confidence:** Verified.
- **Recommended fix:** add `https://static.cloudflareinsights.com` to `script-src` (benign allowance on other hosts; restores host analytics). Executed in this round with a drift-guard test.

### H-3 — Docs reference a `skills/` tree that no longer matches the repo
- **Location:** AGENTS.md L63 · CLAUDE.md L153, L409 · README.md L259 · SKILL.md L718 (and related mentions).
- **Evidence:** docs describe `skills/` as "vendored, git-tracked reference content (index: `skills/skills-catalog.md`)". HEAD tracks a **pruned** 873-file tree with **no** `skills-catalog.md` and **no** `SKILL.md` content files (1444 paths deleted at `31e7bd6`; full tree exists at `c774ed9`).
- **Impact:** agents following the docs cannot find the catalog/index; claims about vendored content are unverifiable.
- **Severity:** High (documentation contract broken for the primary agent audience). **Confidence:** Verified.
- **Recommended fix:** update all four docs to describe the actual pruned state and point to `c774ed9` in git history for the full tree + catalog. Do not restore 1.4k vendored files.

## Medium

### M-1 — `src.orig/` is tracked (52 files) although docs and `.gitignore` assert "not committed"
- **Location:** git index vs AGENTS.md L52/L107, CLAUDE.md L237/L321, README.md L147/L259, SKILL.md L107/L154.
- **Evidence:** `git ls-files | grep -c ^src.orig/` → 52; `.gitignore` lists `src.orig/` (ineffective for tracked files).
- **Impact:** archived previous-port source (St Joseph BT, including its tests) ships in the public repo contrary to the documented archive contract; dead weight and a content-reintroduction hazard the docs explicitly warn against.
- **Confidence:** Verified. **Fix:** `git rm -r --cached src.orig/` (local copy retained; tooling ignores stay active — they remain correct).

### M-2 — CSP / response-header hardening gaps
- **Location:** `index.html` L6–9 (CSP meta); host response headers.
- **Evidence:** CSP lacks `object-src` and `base-uri`; no Referrer-Policy anywhere (host sends none — verified live: no `referrer-policy`, `x-content-type-options`, `x-frame-options`, `strict-transport-security` headers); `frame-ancestors`/HSTS cannot be expressed in a meta tag.
- **Impact:** weakened baseline against object/base-tag injection; no clickjacking defense header; referrer leakage default; no TLS downgrade protection.
- **Confidence:** Verified. **Fix:** extend CSP meta (`object-src 'none'; base-uri 'self'`), add `<meta name="referrer" content="strict-origin-when-cross-origin">`, ship `public/_headers` for Cloudflare Pages (HSTS `max-age=31536000`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal allow-none). Drift-guarded by tests.

### M-3 — Docs overstate Header dropdown interaction ("hover + click")
- **Location:** README.md L111 · CLAUDE.md L130 · SKILL.md L272 vs `src/components/Header.tsx` L94–105.
- **Evidence:** the dropdown trigger `<button>` has no `onClick`; it opens via `onMouseEnter` + `onFocusCapture` (keyboard/touch work through focus). E2E exercises `hover()` only.
- **Impact:** minor — agents/QA expecting a click-toggle behavior will file phantom bugs; docs accuracy.
- **Confidence:** Verified. **Fix:** docs → "hover/focus-open". (Adding a click toggle rejected: focus path already covers keyboard + touch; behavior change unneeded.)

### M-4 — "6 slots" confession claim contradicts the 7 enumerated slots
- **Location:** AGENTS.md L86 · CLAUDE.md L300/L306 · README.md L23 · SKILL.md L448/L458/L485/L1314 vs `src/data/site.ts` L45–46.
- **Evidence:** `site.mass.confession` enumerates Sat 3.30 p.m. + 5.30 p.m. and Sun 8.30/10.30/12.30/16.30/18.30 = **7** slots (CLAUDE.md's own enumeration lists 7 while saying "6").
- **Impact:** doc-internal inconsistency on a liturgical fact.
- **Confidence:** Verified. **Fix:** docs → "7 slots".

## Low

- **L-1 — Host security headers absent** (HSTS/XCTO/XFO/Referrer-Policy): matches the docs' documented static-host limitation; remediated via M-2 `_headers` for the Cloudflare Pages target. Verified live.
- **L-2 — `package-lock.json` committed but undocumented** (docs mention only `pnpm-lock.yaml`): resolved by H-1's removal.
- **L-3 — Build-size claim drift:** docs say `380.19 kB`; measured `380.29 kB`. Docs will be re-synced to the post-remediation measurement.
- **L-4 — `BackToTop` focus edge:** after the click-scroll, the button hides (`aria-hidden="true"`, `tabIndex -1`) while retaining focus — focus must not rest inside an `aria-hidden` subtree. Reasoned (observed code path); fixed in this round with a regression test.
- **L-5 — Mobile drawer is a non-modal disclosure:** no focus trap (body scroll locked, Escape closes, drawer closes on any link activation). Acceptable pattern; noted for future WCAG AAA work.
- **L-6 — Live preview deploy undocumented:** the deployed preview host (`st-mary-of-angels.jesspete.shop`) appears nowhere in docs; `og:url`/JSON-LD canonical remain `www.stmary.sg` (documented port intent). Docs now note the preview target.

## Informational

- **Deploy parity:** deployed root HTML is byte-identical to the local `dist/index.html` (modulo content hash) — Verified live.
- **Contract scan:** all 23 structural claims verified matching (17 routes = 16 content + `*`; data counts priests 4 / ppc 6 / timeline 8 / grounds 3 / ministries 6 / faqs 6 / events 6 / giving 8 / serve 4 / devotions 6; images 11 keys + 8 files; nav 6/10; tokens 24 + 2 shadows; UEN/phones/address).
- **CSP `script-src 'unsafe-inline'`** remains required by `viteSingleFile` inlining — accepted, documented tradeoff for a static single-file artifact.
- **Clean scans:** no `dangerouslySetInnerHTML`/`eval`/`document.write`; no storage-based auth; no `any`; no console leftovers; external anchors carry `rel="noopener noreferrer"`; maps `iframe` titled + lazy + `referrerPolicy`; JSON-LD drift-checked against `site.ts` by `head.test.ts`; list keys stable; CI matrix (Node 24 / pnpm 11) matches docs.

## Verification Ledger (Iron Law)

| Claim | How verified | Result |
|---|---|---|
| lint/typecheck/unit/E2E/build green | ran `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | all pass (16/92 + 35) |
| Data/doc contracts | `scripts/verify_contracts.mjs` (node) vs `src/data/*` | 23/23 match |
| Lockfile drift | `npm audit --package-lock-only` + lockfile version inspection | vite 7.3.2 vs 7.3.6 confirmed |
| Live routing/anchors/a11y | Playwright chromium against live URL (`scripts/live_e2e.mjs`) | 16 routes + 9 anchors + 404 + drawer + SkipLink pass |
| Live CSP beacon block | console listener + `requestfailed` | 2 CSP failures captured |
| Security headers | response-header capture | 4 headers absent (documented limitation) |
| Key/lockfile/src.orig tracking | `git ls-files` | 1 key file, 1 lockfile, 52 src.orig files tracked |
| Live/build parity | raw HTML fetch vs local `dist/index.html` | identical modulo hash |

# Remediation Plan — Round 3 (2026-08-30)

Fixes every finding in [`code-review-audit-round3-2026-08-30.md`](code-review-audit-round3-2026-08-30.md).
Method: TDD (`tdd-workflow` skill — RED → GREEN → REFACTOR, one commit per logical cycle) with the
Iron Law verification gate (`verification-and-review-protocol`) before any completion claim.

## Pre-flight validation (done before writing code)

| Plan item | Re-validated against code | Confirmed |
|---|---|---|
| C-1 key untrack | `git ls-files docs/ssh-key.txt` → tracked; local file must stay for this round's push | ✅ |
| H-1 lockfile removal | lockfile pins vite 7.3.2 ≠ package.json 7.3.6; pnpm-lock resolves 7.3.6; docs name pnpm supported | ✅ |
| H-2/M-2 CSP edits | CSP meta at `index.html` L6–9 matches expected old string; `head.test.ts` reads `index.html` (extension point exists) | ✅ |
| M-2 `_headers` | `public/` is Vite `publicDir` → file ships to `dist/` unchanged; CF Pages serves `public/_headers` | ✅ |
| M-1 src.orig untrack | `git ls-files \|^src.orig/ \| wc -l` → 52; `.gitignore` already has `src.orig/` (re-ignore is no-op) | ✅ |
| L-4 BackToTop blur | hide path sets `aria-hidden` while focus may be on button (`BackToTop.tsx` L39–40, L20–25) | ✅ |
| Doc edits | exact drifted strings located by line in all four docs (see audit H-3/M-3/M-4/L-3/L-6) | ✅ |
| Test-count ripple | "16 files / 92 tests" appears in AGENTS/CLAUDE/README/SKILL → replace-all per file after adding tests | ✅ |

## Cycles (ordered; each ends in its own commit)

| # | Cycle | RED (failing test first) | GREEN (minimal change) | Verify |
|---|---|---|---|---|
| 1 | **CSP + headers hardening** (H-2, M-2) | extend `src/head.test.ts`: CSP includes `object-src 'none'`, `base-uri 'self'`, `static.cloudflareinsights.com` in script-src, referrer meta present; new `src/security-headers.test.ts`: `public/_headers` exists + carries HSTS/XCTO/XFO/Referrer-Policy/Permissions-Policy | edit `index.html` CSP meta + referrer meta; add `public/_headers` | `pnpm test` green; `pnpm build` ships `_headers` to `dist/` |
| 2 | **BackToTop focus fix** (L-4) | extend `src/components/BackToTop.test.tsx`: focused button that scrolls to top must not remain focused once hidden | blur the button when it becomes hidden and holds focus | `pnpm test` green |
| 3 | **Repo hygiene** (C-1, H-1, M-1) | — (git-level; verified by command output, not unit tests) | `git rm --cached docs/ssh-key.txt`; `git rm --cached package-lock.json`; `git rm -r --cached src.orig/`; add `docs/ssh-key.txt` + `package-lock.json` to `.gitignore` | `git ls-files` shows none of the three; local files still present; `pnpm audit` still clean |
| 4 | **Docs alignment** (H-3, M-3, M-4, L-2, L-3, L-6 + new counts) | — (docs-only) | update AGENTS.md / CLAUDE.md / README.md / SKILL.md: skills pruned-tree truth, src.orig tracked→untracked wording flip, hover/focus wording, 7 slots, npm/lockfile guidance, final build size + new test counts, preview deploy note, link round-3 audit + remediation docs | grep sweeps show zero stale claims |
| 5 | **Full gate + push** | — | run the five-gate pre-push command; commit history tidy; push via SSH wrapper (`skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` + `docs/ssh-key.txt`) | fresh terminal evidence of 5/5 green + pushed SHA |

## Explicit non-goals (deferred, with reasons)

- **Key rotation / history rewrite** — owner action; cannot be done agent-side. Documented in C-1.
- **Focus trap for mobile drawer** (L-5) — pattern change, not a defect; queued for future WCAG AAA pass.
- **Desktop dropdown click-toggle** (M-3) — rejected: focus path already covers keyboard/touch; docs corrected instead.
- **Restoring `skills/skills-catalog.md`** (H-3) — rejected: docs updated to the pruned-tree truth; full catalog remains at `c774ed9`.

## Success criteria

1. All five gates green on the remediated tree (new counts documented).
2. `git ls-files` contains no `docs/ssh-key.txt`, no `package-lock.json`, no `src.orig/`.
3. Deployed-artifact source ships hardened CSP + `_headers` (verified in `dist/`).
4. Zero stale doc claims in the four docs (grep-verified against the drift list).
5. Pushed to `main` via the SSH wrapper with a clean, atomic commit history.

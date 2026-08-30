# Remediation Plan — Round 6 (Risen Christ)

**Date:** 2026-08-31 · **Source audit:** `docs/code-review-audit-round6-2026-08-31.md` (C1/H1/M1–M3/L1–L4; draft C2 retracted on byte-level verification — the ci.yml triggers are valid, and the guard test stays as a regression pin)
**Method:** TDD (`skills/test-driven-development` / `skills/tdd-workflow` — RED → GREEN → REFACTOR, one commit per cycle) + documentation sync per `CLAUDE.md` Continuous Improvement contract. Guard tests follow the existing file-content contract pattern of `src/security-headers.test.ts` / `src/head.test.ts`.

**Validation gate for every phase:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — all five green.

---

## Phase 0 — Preconditions (done during audit)

- [x] All five gates executed and green on `9d4c62f` (25/142 + 40 E2E + 388.44 kB).
- [x] Live-site byte-identity confirmed (md5 `f0568e67…`).
- [x] Findings reproduced individually (curl headers, `git ls-files`, YAML inspection).

## Phase 1 — Guard tests first (RED)

Write the three contract tests and run them **before** any fix; each must fail against the current tree.

| Test file | Asserts (contracts from the audit) | Finding guarded | Expected RED |
|---|---|---|---|
| `src/ci-workflow.test.ts` | `.github/workflows/ci.yml` triggers on `branches: [main]` for push **and** pull_request (flow-sequence syntax); workflow runs lint, typecheck, test, e2e, build steps | C2 (retracted — test retained as regression pin) | trigger tests GREEN on arrival (file valid); guards future corruption |
| `src/repo-hygiene.test.ts` | `git ls-files` output contains no `docs/ssh-key.txt` and no key-like artifacts (`*.pem`, id_rsa-style names) | C1 | fails — key is tracked |
| `src/docs-contract.test.ts` | `risen-christ_SKILL.md` no longer advertises `#mandarin` as a ministries anchor and contains `#language-communities`; README no longer carries "tests not yet ported" / "No test files found" expected-state claims; AGENTS.md states the 40-test E2E budget | M1/M3 | fails — stale claims present |

## Phase 2 — Critical fixes (GREEN)

| Step | Finding | Change | Commit |
|---|---|---|---|
| 2.1 | C2 (retracted) | **No ci.yml change** — byte-level verification proved both triggers valid. The `src/ci-workflow.test.ts` guard is committed as a regression pin for the trigger + five-step gate contract | (folded into the guard-test commit) |
| 2.2 | C1 | `git rm --cached docs/ssh-key.txt` (local file retained — it is the push credential for this workflow); `.gitignore` entry already present becomes effective; commit the untracking. **Key rotation on GitHub remains a repo-owner action — history still contains the key.** | `fix(security): untrack ssh key…` |

## Phase 3 — Low-severity code hygiene (GREEN)

| Step | Finding | Change |
|---|---|---|
| 3.1 | L1 | `playwright.config.ts` comment: "st-mary-of-angels" → risen-christ-church |
| 3.2 | L2 | `e2e/helpers.ts` example → `gotoHash(page, "/worship#mass")` |

## Phase 4 — Documentation sync (M1/M2/M3/L3/L4)

One-pass rewrite of the drifted sections; every replaced claim re-verified against executed reality (the audit ledger):

| File | Sections rewritten |
|---|---|
| `README.md` | File Hierarchy (tests ported 25/142, setup.ts exists, e2e specs de-STALEd, ci.yml active), Verify Setup + Check table (`pnpm test` → 25/142 pass, `pnpm test:e2e` → 40 pass), Contributing gate wording (five gates green), Troubleshooting (`pnpm test` row), Deployment (add live-host header gap note: `_headers` honored only on Cloudflare Pages — current host serves none; ops remediation listed), skills/ callout (catalog re-added, vendored, not linted), dist inventory (+ `favicon.svg`) |
| `CLAUDE.md` | Vite 7 note (setup.ts exists — remove "missing" paragraph), Build Commands (drop "gate is currently 3-step" footnote; fix "all three"), Testing Strategy header (wired 25/142 + 40), Architecture tree (38+25+1 counts, setup.ts present, e2e not stale), CI paragraph (all five steps active — already accurate in file), Success Metrics (25/142 + 40), Validation Checklist rows 4/5 |
| `AGENTS.md` | public/ inventory (+ `favicon.svg`), skills/ Quirk (re-added catalog; vendored; ignore guards active), Where-to-look-next (add round-6 audit + remediation plan links) |
| `risen-christ_SKILL.md` | Front-matter (`40 E2E`, consistent `25 files / 142 tests`), §1 identity table (Risen Christ facts: name/address/feast/hours 6 keys/transport/contacts/UEN T08CC4042G), §2 ledger counts, §5.4 anchors (`#language-communities`), §7 data reference (ministries 6 Risen Christ wording, faqs 6, events 6 incl. 54th Velankanni/CEP/F.R.E.E., giving 8 Risen Christ, devotions 6, timeline 1969–2026), §11 pre-ship counts, §10 debugging anchors |

## Phase 5 — Verification & close-out

1. Full gate re-run (all five) — must be green.
2. Grep-based doc cross-check: no `#mandarin`/`25/141`/`42 E2E`/`24/134`/"tests not yet ported"/"No test files found" remains in the four docs (except historical docs/ reports, which are archival and out of scope).
3. `git status` clean except intended changes; `docs/ssh-key.txt` still on disk locally, untracked.
4. Commit sequence (Conventional Commits, atomic):
   - `test(repo): add ci-workflow, repo-hygiene, docs-contract guards (round 6)` — Phase 1 (ci-workflow guard GREEN on arrival — trigger contract already valid; repo-hygiene + docs-contract RED as planned)
   - `fix(security): untrack ssh key from repo`
   - `chore(e2e): refresh stale comments (playwright config, helpers)`
   - `docs: sync AGENTS/CLAUDE/README/SKILL with verified round-6 state`
   - `docs: add round-6 audit + remediation plan`
5. Push via `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` with `docs/ssh-key.txt`, `GIT_SSH_COMMAND` wrapper, `main` only, no new branches.

## Out-of-scope / owner actions (not executable from this repo)

| Item | Why | Owner action |
|---|---|---|
| SSH key rotation | Key remains in git history (`0be0fe8`); untracking fixes the index, not the past | Revoke/deploy-key-rotate on GitHub, generate new key |
| Host security headers (H1) | `_headers` is Cloudflare-Pages-only; current host is proxied origin | Move `dist/` to Cloudflare Pages, or add the five headers via Cloudflare Transform Rules / origin config |
| History rewrite to purge the key | Risky, user mandated commits to `main` only | If desired, owner-run `git filter-repo` after rotation (then force-push) |

## Risk & rollback

- All fixes are one-line file edits or untrack operations; no runtime code paths touched (guard tests only read repo files). Rollback = `git revert <sha>`.
- The `docs-contract` guard intentionally pins the verified counts (25/142, 40 E2E, `#language-communities`) — future legitimate changes (e.g., a 7th ministry) must update these tests alongside the docs, which is the desired friction.

# Remediation Plan — Validation Drifts vs `risen-christ_SKILL.md` v3.0.0

**Date:** 2026-09-02 (post-validation)
**Source report:** `docs/validation-report-against-skill-2026-09-02.md`
**Skill:** `risen-christ_SKILL.md` v3.0.0 (§0 is single source) · `package.json` 1.4.4
**Branch:** `main` — static SPA 77 files / 35 test-files / 202 unit + 51 E2E (dev+built) — all gates green
**Mode:** Read-only re-validation first, then surgical apply — no feature work, no version bump

> This plan re-validates every recommended fix **against the live working tree** before touching it, then applies them in minimal diffs with `TDD → gate → built-artifact` verification per the 6-phase workflow.

---

## 0. Re-Validation Against Live Tree (2026-09-02 11:53)

Run on the **current working tree** (with prior ad-hoc fixes still uncommitted):

| ID | Fix from report | Re-validated live? | Evidence |
|----|-----------------|-------------------|----------|
| **FOSSIL-1** | Delete `risen-christ_SKILL.bak` (untracked 129 KB backup of pre-unified skill) | **Already deleted** in working tree — `ls` → `No such file or directory`; `git status` shows `D risen-christ_SKILL.bak` (untracked deletion pending). Clean-tree `rg "620 Upper\|Bukit Batok"` no longer hits this file. | `git status --short` → `D risen-christ_SKILL.bak` |
| **TEST-FIXTURE-1** | `src/components/ui/Accordion.test.tsx:9` `620 Upper Bukit Timah Road.` → `91 Toa Payoh Central, Singapore 319193.` | **Already patched** in working tree but **uncommitted** (`M src/components/ui/Accordion.test.tsx`). Clean-tree would revert to the St Joseph fossil; docs-contract guards *skillContract* only, not `src/` fixtures, so this is the sole `src/` fossil outside history appendices. | `git diff src/components/ui/Accordion.test.tsx` → `- A3 620…` `+ A3 91 Toa…`; `rg -n "620 Upper" src/` → 0 after patch (1 before) |
| **Z-INDEX-1** | `src/pages/Ministries.tsx:29` `z-20` → `z-40` (align with §18: rail `z-[60]` > header `z-50` > jump nav `z-40` > base) | **Already patched** in working tree but **uncommitted** (`M src/pages/Ministries.tsx`). Functional at `z-20` (still below header) but doc/code drift; fix restores the intended layer just below header/rail. | `git diff src/pages/Ministries.tsx` → `z-20 → z-40`; `rg -n "z-20|z-40" src/pages/Ministries.tsx` → `z-40` after patch |
| **BUILD-SIZE-1** | `risen-christ_SKILL.md` `397.52 kB` → `397.57 kB` (4 hits: frontmatter `verified:`, §0, §3.2, §11/Quick Ref) | **Still pending** — skill still pins `397.52 kB` at 4 sites; `dist/index.html` is `397573 B (397.57 kB, gzip 114.90 kB)` on fresh `pnpm build`. Delta +50 B is rebuild hash variance, not a failure. | `wc -c dist/index.html` → 397573; `rg -n "397\." risen-christ_SKILL.md` → 4× `397.52` |

**Implication for this plan:** The 2 code patches and the bak deletion are proven correct and already evidence-linked, but they sit as **uncommitted working-tree mutations** — not yet verified via committed gates. This plan will **stash, prove the clean tree carries the drifts, then re-apply each fix as an auditable commit** rather than committing the ad-hoc diff blindly.

**Non-fixes (confirmed not drifts, re-validated):**

- `skills/*/package-lock.json` tracked inside vendored `skills/` — not a top-level `package-lock.json` violation (`.gitignore` `package-lock.json` is top-level only).
- `givingOptions` `icon:` count 9 = 8 items + 1 interface field — not 9 items.
- `AGENTS.md` “35 files / 202 tests — 41 source + 35 tests + 1 setup” — 35 is test-file count; `77 = 41+35+1` is correct.

**Ops item out of scope (re-validated, not fixable here):** `C-1 docs/ssh-key.txt` rotation — `git ls-files | rg "ssh-key"` → empty (GOOD), history still contains it, `repo-hygiene` 3 tests green. Requires owner `git filter-repo` — tracked separately.

---

## 1. Goals & Non-Goals

**Goals:**

- Land the 3 confirmed L drifts as **traceable, minimal commits** with gate evidence, closing the validation report with zero `src/` fossils outside history appendices and zero doc/code z-index mismatch.
- Optionally land `BUILD-SIZE-1` as a docs-only correction in the same series (owner decides — see §2 Option).
- Leave the tree at `lint 0 + typecheck 0 + 35/202 + 51 + 51-built + 397.57 kB` with `git ls-files` hygiene green.

**Non-goals:**

- No feature, token, route, data, or version bump (`package.json` stays 1.4.4, SKILL stays 3.0.0 — these are L corrections, not hops).
- No `src.orig`/`skills` re-introduction, no `HashRouter`→`BrowserRouter`, no token addition.
- No history rewrite for `C-1`.

---

## 2. Options Requiring Your Call

| Option | What it does | Effort | Risk | Recommendation |
|--------|-------------|--------|------|----------------|
| **A — Apply L1+L2+L3 only (3 fixes), tolerate BUILD-SIZE variance** | Commits: (1) delete bak (untracked, but record), (2) accordion fixture, (3) z-40. Skill `397.52` stays with a ledger note “± rebuild variance”. | 6 min, 2–3 commits | Negligible | **Recommended default** — avoids pinning exact bytes that churn every build |
| **B — Apply all 4 (A + BUILD-SIZE)** | Adds commit (4) updating all 4 `397.52` hits to `397.57` (frontmatter, §0, §3.2 table, §11/Quick Ref) + gzip note. | +2 min, +1 commit | Low, but next build may shift again → re-drift | Choose if you want the bytes exact again even though they’ll drift |

**Decision needed before Phase 4.** Default proceeds with **Option A** unless you select B in validation.

---

## 3. Plan — Phased Execution

### Phase 1: ANALYZE — already complete (this doc §0)

- Re-validation commands (evidence ledger in report): `find src | wc -l`, `pnpm test`, `pnpm test:e2e --list`, `rg --color shrine-`, `grep "@keyframes"`, `rg "Route" src/App.tsx`, `cat src/utils/deepLinks.ts`, `wc -c dist/index.html`, `rg "397\."`, `git ls-files | rg "src\.orig|ssh-key"`, `rg "620 Upper|Bukit Batok|#mandarin"`.

### Phase 2: PLAN — this document

- Present fix matrix (below), commit strategy, verify/rollback, effort estimate. Obtain explicit go-ahead (Phase 3).

### Phase 3: VALIDATE — gate before code

- **You confirm:** Option A or B, and commit granularity (see §4).
- **Pre-flight check (read-only, no edits):**

  ```bash
  git status --short                 # expect M Accordion, M Ministries, D bak, ?? two validation docs
  git stash push -m "validation-pending" --keep-index
  rg -n "620 Upper" src/             # expect 1 hit (proves drift exists on clean tree)
  rg -n "z-20" src/pages/Ministries.tsx  # expect 1 hit
  ls risen-christ_SKILL.bak 2>&1      # expect missing after stash? (bak is untracked, stash --keep-index leaves untracked)
  pnpm test 2>&1 | grep -E "Test Files|Tests "  # expect 35/202 even on clean tree (fixture drift is a11y/fidelity, not a test break)
  git stash pop
  ```

### Phase 4: IMPLEMENT — surgical, one fix per commit (TDD where logic, doc where docs)

**Commit discipline (ponytail: surgical, minimal diff):**

- Each `edits[].oldText` is a unique 1-line match against the original file — no reformat, no adjacent cleanup.
- Commit message: `fix:` Conventional Commits, subject ≤72 chars, body cites report ID + SKILL §.

| Step | Fix | File | Old → New (exact) | Why (SKILL §) | Test Guard | Commit |
|------|-----|------|-------------------|---------------|------------|--------|
| 4.1 | **FOSSIL-1** — remove backup | `risen-christ_SKILL.bak` (untracked) | `rm risen-christ_SKILL.bak` (already deleted; `git status` shows `D` but file is untracked so `git clean -fd` or `rm` completes) | App G fossil-sweep: untracked backup pollutes `rg` and copy-forward risk | `rg "620 Upper" .` no longer hits outside history; `git status` clean | `fix: remove untracked skill backup (validation FOSSIL-1)` |
| 4.2 | **TEST-FIXTURE-1** — parish fidelity | `src/components/ui/Accordion.test.tsx:9` | `A3 620 Upper Bukit Timah Road.` → `A3 91 Toa Payoh Central, Singapore 319193.` | §1 parish fidelity + §13 “Don’t reintroduce Bukit Batok” — only `src/` fossil outside appendices | `src/components/ui/Accordion.test.tsx` 6 tests green; `rg -n "620 Upper" src/` → 0 | `fix: accordion fixture to Risen Christ address (validation TEST-FIXTURE-1)` |
| 4.3 | **Z-INDEX-1** — layer contract | `src/pages/Ministries.tsx:29` | `z-20` → `z-40` | §18 Z-Index Layer Map: rail `z-[60]` > header `z-50` > jump nav `z-40` > base | `pnpm test:e2e -g "Ministries.*jump"` still green (sticky nav still below header); visual spot-check Ministries jump nav overlays correctly | `fix: ministries jump nav z-20 → z-40 to match skill §18 (validation Z-INDEX-1)` |
| 4.4 | **BUILD-SIZE-1** (Option B only) | `risen-christ_SKILL.md` (4 hits) | `397.52 kB` → `397.57 kB` at frontmatter `verified:`, §0 `Build artifact`, §3.2 E2E row, §11 `Build` row + `pre-push gate` comment | §0 Volatile Facts Register + §11 §0 is single source | `rg -n "397\."` → `397.57`; `docs-contract` 16 tests still green | `docs: pin build artifact to 397.57 kB (validation BUILD-SIZE-1)` |

**Ordering rationale:** FOSSIL-1 first (deletes file, zero code risk), then test fixture (isolated, 1-line), then z-index (1-token visual layer), then docs (4-string, no code). No inter-step dependency — re-orderable, but this order minimizes risk.

**Uncommitted working-tree note:** Steps 4.1–4.3 already exist as working-tree mutations from the prior audit. This plan **discards the ad-hoc diff and re-applies each via its own commit** after the Phase 3 stash proof, so `git log` shows the TDD chain rather than a single mixed working-tree commit.

### Phase 5: VERIFY — every step must be green before next step

| Gate | Command | Must be | When |
|------|---------|---------|------|
| Lint | `pnpm lint` | `eslint 0` | after each 4.x commit |
| Types | `pnpm typecheck` | `tsc 0` | after each 4.x commit |
| Unit | `pnpm test` | `35 files / 202 passed` | after each 4.x commit |
| E2E (dev) | `pnpm test:e2e` | `51 passed` | after 4.3 (z-index touches layout) + final |
| Built | `pnpm build` | `dist/index.html` + `_headers` + `favicon.svg` + `images/8`; note `wc -c` | final |
| Built E2E | `pnpm test:e2e:built` | `51 passed` vs `dist/` | final (before push) — ADR-8 dev/built divergence guard |
| Sweep | `rg -n "620 Upper|T08CC4053H|Bukit Batok|#mandarin" --glob '!risen-christ_SKILL.md'` outside history + `git ls-files \| rg "src\.orig|ssh-key"` | 0 outside allowed history; empty | final |
| Docs | `src/docs-contract.test.ts` | 16 passed | final |

**Phase 5 exit criterion:** All rows in the re-validation table (§0) flip to ✅ (including C5 `z-40` and G3 `src/` fossil 0). Report’s `F3 Built E2E` moves from ⏳ to ✅.

### Phase 6: DELIVER — handoff

- `git log --oneline` shows 2–4 `fix:` commits (per chosen option).
- `docs/validation-report-against-skill-2026-09-02.md` is the ledger; this plan (`docs/remediation-plan-validation-2026-09-02.md`) is the execution record.
- No `package.json` bump, no SKILL version bump — note in `Appendix G` only if desired.
- Explicit handoff: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm test:e2e:built && pnpm build` — all green — ready for `git push`.

---

## 4. Commit Granularity Decision

| Granularity | Commits | Pro | Con |
|-------------|---------|-----|-----|
| **Atomic (1 commit)** | `fix: validation drifts (FOSSIL-1 + TEST-FIXTURE-1 + Z-INDEX-1)` | Minimal history, one gate run | Less bisectable |
| **Per-fix (3 commits, +1 if B)** | 3 or 4 commits as listed in §3 Phase 4 | Traceable per ID, revertible individually, matches prior L-series pattern (`fix:` per finding) | More gate runs |

**Recommendation:** **Per-fix (3 commits)** — these Ls are at different layers (filesystem / test fixture / layout layer) and prior rounds used per-finding commits (e.g., round-12 F-1..F-9). Default below assumes per-fix.

---

## 5. Risks & Rollback

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Fixture string change breaks Accordion test expectation | Negligible — fixture is data, not assertion | Test would fail 1/6 | Roll back 4.2: `git revert <sha>`; test is `render(<Accordion items={items} />)` with no string assertion |
| `z-40` causes nav to overlay an unintended layer | Low — `z-40` sits between rail `60` and base, below header `50` per §18 | Visual regression on Ministries sticky nav | Manual spot-check `pnpm dev` → `/ministries` scroll; revert 4.3 |
| Build-size doc pin drifts again next build | Medium — any content change shifts bytes | False drift on next audit | Prefer Option A (tolerate ± variance + ledger note) |
| Over-sweep deletes a needed backup | None — bak is untracked and `rg` proves no consumer | — | `git clean -n` preview before `rm` |

**Rollback:** `git revert` per commit (per-fix) or `git reset --hard HEAD~N` (atomic). Working tree can be restored from `git stash` if Phase 3 stash is still present.

---

## 6. Effort & Timeline

| Phase | Wall time | Notes |
|-------|-----------|-------|
| 3 VALIDATE (stash proof) | 2 min | read-only |
| 4.1 FOSSIL-1 | 30 sec | `rm` + `git status` |
| 4.2 TEST-FIXTURE-1 | 1 min | 1-line edit + `pnpm test` |
| 4.3 Z-INDEX-1 | 1 min | 1-token edit + `pnpm lint && typecheck && test && test:e2e` spot |
| 4.4 BUILD-SIZE-1 (if B) | 1.5 min | 4-string edit + `rg` sweep |
| 5 VERIFY (full gate) | 5–7 min | `test:e2e` 1.1m + `test:e2e:built` 1m dominate |
| **Total Option A** | **~10 min** | |
| **Total Option B** | **~12 min** | |

---

## 7. Success Criteria (Definition of Done)

- [ ] `git status` clean except untracked validation docs (no `M`/`D` left).
- [ ] `rg -n "620 Upper" src/` → 0; `src/` contains no St Mary/Bukit Timah fixtures.
- [ ] `rg -n "z-40" src/pages/Ministries.tsx` → 1; `z-20` gone.
- [ ] `ls risen-christ_SKILL.bak` → `No such file`.
- [ ] `pnpm lint 0 + typecheck 0 + test 35/202 + test:e2e 51 + test:e2e:built 51 + build 397.57 kB` all green, recorded in commit bodies.
- [ ] `docs/docs-contract` + `repo-hygiene` + `ci-workflow` + `security-headers` + `wcag-contrast` all green.
- [ ] If Option B: `rg -n "397\.52" risen-christ_SKILL.md` → 0; `rg -n "397\.57"` → 4.

---

## 8. Explicit Ask — Awaiting Your Go

**Do you approve proceeding with:**

1. **Option A** (3 fixes, tolerate build-size variance) or **Option B** (4 fixes including docs pin)?
2. **Granularity:** per-fix commits (3) or atomic (1)?

Reply with your choice (e.g., “Option A, per-fix”) and I will execute Phase 3→6 verbatim, reporting each gate result before next step.


# Remediation Plan — Round-7 Audit Findings (`code-review-audit-round7-2026-08-31.md`)

**Date:** 2026-08-31 · **Inputs:** round-7 audit ledger findings L-1, L-2, I-2 (code) + I-1, I-3 (plan-doc corrections, ledger-recorded) · **Method:** TDD (RED guard tests first, then GREEN), five-gate close · **Branch:** main only

## R-0. Scope & Non-Goals

The audit found **no Critical/High/Medium defects** in the round-7 code. This remediation is therefore *polish-grade hardening* only. Non-goals: host security headers (H1' is Cloudflare-config, not code), key rotation (C1' is owner ops), any visual/design change (P-1..P-9 are approved as-is), dependency changes (none), new branches (none — main only).

## R-1. `useScrollSpy` document-order tie-break + truthful JSDoc (fixes L-2, I-2)

**Finding recap:** when ≥2 sections intersect the 5% middle band in one IO callback, the hook's for-loop keeps the *last entry delivered*, which is IO delivery order — not necessarily the deepest section in reading order. JSDoc also misdescribes the insets as "symmetric".

**Change:** in the IO callback, collect intersecting entries into a set; after processing the batch, resolve the active id as the **last intersecting id in `ids` order** (document order — the standard scrollspy "current section" semantic, direction-independent). Update JSDoc: describe the band as 45%→50% of viewport height (asymmetric, just above center) and add caller guidance (inline id literals are safe because the effect dep is the joined string).

**ToDo:**
- [x] R-1.1 RED: `useScrollSpy.test.tsx` — new test "resolves ties by document order when several sections intersect in one callback": fire the mocked-IO callback with entries delivered out of document order (e.g. `[third, first]` intersecting), assert active = the later id in `ids` order (currently FAILS — for-loop keeps `third`).
- [x] R-1.2 GREEN: rework callback to set-based resolution (`ids`-ordered scan of an intersecting map).
- [x] R-1.3 GREEN: correct JSDoc (asymmetric 45–50% band; caller guidance: module-constant arrays or inline literals both safe — dep is the joined string).

**Verification:** new unit test RED→GREEN; existing 4 hook tests stay green (no behavior change for single-section case).

## R-2. E2E sleep removal — rely on web-first assertions (fixes L-1)

**Finding recap:** `waitForTimeout(400)` in the scrollspy test and `waitForTimeout(300)` in `gotoMain` are hard sleeps; `expect` already auto-polls.

**Change (surgical):** remove the 400 ms sleep in the scrollspy test (its `toHaveCount(1)`/`toHaveText` assertions poll for 5 s). **Keep** the `gotoHash` helper's settle sleep this round: seven spec files share it and five gates run unattended — a broad timing change is out of scope for a polish round (recorded as deferred, not rejected).

**ToDo:**
- [x] R-2.1 Remove `waitForTimeout(400)` from the scrollspy E2E test.
- [x] R-2.2 Run the round-7 spec 3× consecutively (flake check) + full 48-test suite once.

**Verification:** 48/48 green; scrollspy test latency drops ≥0.4 s.

## R-3. Docs re-pin + audit row (docs alignment)

**ToDo:**
- [x] R-3.1 Re-measure gates; unit count changes 175 → 179 (R-1.1/R-1.2 add 2 hook tests + R-3.6 adds 2 guard tests); re-pin `32 files / 175` → `32 files / 179` in the four contract docs + `src/docs-contract.test.ts` guards (established protocol — guard rejects stale counts).
- [x] R-3.2 Update build-size prose (`395.59 kB` → measured `395.66 kB`, gzip `114.39 kB`) wherever pinned (AGENTS/README/SKILL).
- [x] R-3.3 Add round-7 audit + remediation rows to AGENTS.md doc map, README documentation index, SKILL.md Quick-Ref audit row (mirrors round-6 bookkeeping).
- [x] R-3.4 Record I-1/I-3 plan-doc corrections pointer in the ledger (already done) — no code change.
- [x] R-3.5 Version bump `1.4.0` → `1.4.1` (package.json + SKILL front-matter/§2 note + README badge).
- [x] R-3.6 **M-1 fix:** CLAUDE.md five-gate claim `(40)` → `(48)`; extend `src/docs-contract.test.ts` to load CLAUDE.md and pin `32 files / 179` + `(48)` while rejecting `test:e2e` (40) — closes the guard-coverage gap that let the drift through.
- [x] R-3.7 **M-2 fix:** rewrite the two stale SKILL unit breakdowns (§3 / §11) to the canonical 32-file ledger; correct the src census rows to the recounted **73 = 40 source + 32 tests + 1 setup** (SKILL §4 + AGENTS structure fence).
- [x] R-3.8 **M-3 fix:** SKILL §3.2 e2e row — add the omitted `enhancements-round7.spec.ts (8)` (sum must equal 48); Quick-Ref Hooks row — list `useScrolled` + `useScrollProgress` + `useScrollSpy`.

## R-4. Execution order & gates

1. R-1.1 (RED) → confirm failing
2. R-1.2 + R-1.3 (GREEN) → unit suite green
3. R-2.1 → E2E 3× + full suite green
4. R-3 docs sync → docs-contract guard green
5. Full five-gate close: `lint && typecheck && test && test:e2e && build`
6. Atomic commits (feat/test/docs) → main only → push via `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` with `docs/ssh-key.txt`

**Rollback:** each step is an independent commit; `git revert <sha>` restores prior state with no migrations involved.

**Residual risk after remediation:** L-2 tie-break change alters only multi-intersect resolution (covered by new test); E2E timing relies on standard auto-polling; docs re-pin is mechanical.

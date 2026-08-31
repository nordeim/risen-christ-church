# Remediation — Round 12 — 2026-08-31 (closure)

Closes the Risen Christ findings of **"UI/UX Design Audit — St Mary of the
Angels vs Risen Christ"** (2026-08-31; markdown at
`docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md`). Plan:
`docs/remediation-plan-round12-2026-08-31.md`. Method: TDD — every fix landed
as an observed red first, then green. No new branches; all commits on `main`.

## Gate after (measured 2026-08-31, post round-12)

```
pnpm lint          0 (eslint . --max-warnings 0)
pnpm typecheck     0 (tsc --noEmit)
pnpm test          35 files / 202 tests — all green
pnpm build         dist/index.html 397.52 kB (gzip 114.89 kB)  [was 395.66 / 114.39]
pnpm test:e2e      51 / 51 (chromium)
```

Delta vs the pre-round gate (32 files / 184): +3 spec files
(`wcag-contrast.test.tsx`, `deepLinks.test.ts`, `give-uen.test.tsx`) and +18
assertions (+5 contrast contract, +1 worship footnote, +7 deepLinks, +3
give-uen, +1 repo-hygiene F-9 guard, +1 docs-contract round-12 ledger pin).
E2E 48 → 51 via `e2e/deep-links.spec.ts` (3 journeys). `package.json` 1.4.3 →
1.4.4.

## Findings disposition (final)

| # | Severity | Verdict | Fix landed | Evidence |
|---|---|---|---|---|
| F-1 | **Medium** | **CLOSED** | `--color-shrine-terracotta-600: #8f4c30` added (no existing token mutated); Devotion chip text `terracotta-500 → terracotta-600`; borders untouched (decorative). | Red: `Devotion: terracotta-500 #ab5f3c on parchment is 3.9249…:1` (assertion message). Green: contract computes all four tones ≥ 4.5:1 — Devotion now 5.36:1 (Parish 11.30, Archdiocese 9.59, Formation 9.37). |
| F-2 | Low | **CLOSED (transformed form + pattern sweep)** | Event date is `maroon-700` here (opaque) — locked by contract (11.30:1). The surviving same-pattern defect (Worship mass-card footnote `text-xs text-shrine-charcoal/70` on parchment, 4.16:1) raised to `/85` (6.19:1). `/75` and `/80` usages pass (4.71–5.39:1) — deliberately untouched. | Red: `expected 'mt-4 text-xs text-shrine-charcoal/70' to contain 'text-shrine-charcoal/85'`. Green: all 3 mass-card footnotes carry `/85`; date-tone contract ≥ 4.5:1. |
| F-3 | Low | **CLOSED** | HashRouter retained (documented zero-rewrite tradeoff). `src/utils/deepLinks.ts` (16 known paths = 9 canonical + 7 aliases, drift-guarded against `App.tsx` `path="…"` literals) wired in `src/main.tsx` before mount via `location.replace`. Unknown paths keep existing behavior (the audit's own scope). | Reproduced first: `http://localhost:5173/worship` rendered the Home h1 ("He is risen.") at the path URL. Red: unit import failure + e2e `/worship`, `/news-events`, `/donate` all stayed path-style. Green: unit 7/7; live probe `→ /#/worship` with the Worship h1; e2e 3/3 land on their pages. |
| F-4 | Low | **CLOSED** | Section retitled **"Ways to give"** (eyebrow "How to give" unchanged); UEN demoted to a copyable detail row inside the featured PayNow card — display-serif value + Copy button (`aria-label="Copy UEN T08CC4042G"`), clipboard API first with `execCommand` fallback and an honest no-op on failure; PayNow description reworded so the UEN renders exactly once. | Red: 3/3 `give-uen.test.tsx` failed (heading carried the UEN; no copy row). Green: no heading contains "UEN"; h2 = "Ways to give"; UEN exactly once inside `[data-featured="true"]`; Copy writes `site.uen` and confirms "Copied". |
| F-5 | Low | N/A (as planned) | No action — this repository is the audit's exemplar for the strong News journey. | — |
| F-6/F-7/F-8 | Informational | DEFERRED / NO ACTION (as audit) | Unchanged documented tradeoffs. | — |
| F-9 | Informational | **CLOSED** | `git rm -r --cached src.orig` (64 files) + tree removal; `.gitignore` entry (already present) now effective; `src/repo-hygiene.test.ts` guard added — fails if any `src.orig` path re-enters the index. | Red: guard listed all 64 tracked paths (`'src.orig/App.tsx', …(63)`). Green: `no reference copies are tracked` passes. |

## Side effects and deliberate deviations

- **`cta-bands.test.tsx` locator updated, assertion preserved** — the "Give
  heading on cream is maroon" test located the h2 by the UEN string (the
  heading text when it was written). The F-4 fix legitimately changes that
  text, so the locator now targets "Ways to give"; the explicit-color
  contract (`text-shrine-maroon-700` on cream) is unchanged and still
  enforced. No test was deleted, skipped, or weakened.
- **Token count 24 → 25 colors** — `terracotta-600` extends the scale; no
  existing token value mutated (the round-6 "tokens frozen" invariant treats
  new scale steps as extensions, per the SMA round-7 precedent).
- **`categoryTone` exported from `EventMeta.tsx`** (with the
  `react-refresh/only-export-components` eslint allowance, matching the SMA
  port) so the contrast contract can iterate the map behaviorally.
- **Docs re-pinned in lockstep** — README / AGENTS / CLAUDE /
  `risen-christ_SKILL.md` and `src/docs-contract.test.ts` moved together
  (32/184 + 48 E2E → 35/202 + 51 E2E; docs-contract 15 → 16 pins). The audit
  markdown is copied into `docs/` for in-repo reference.

## Invariants verified post-round

- HashRouter rationale comment intact; no route table change (16 concrete
  paths; drift guard enforces sync).
- `card-tint` affordance contracts untouched (`give-featured.test.tsx`,
  `card-affordances.test.tsx` green); the UEN row is an in-card utility, not
  card navigation.
- No fabricated parish facts — no new external URLs; the UEN string is the
  parish's own registered identifier already shipped in `site.ts`.
- Deploy key never entered the repo tree (kept outside the worktree, mode
  600).
- All five gates + e2e green at the final commit; every fix has an observed
  red→green pair.

## Deferred (unchanged)

- F-6 (synthetic imagery) / F-8 (responsive image variants) — need real
  parish photography.
- F-7 (scroll-reveal reader-mode blanks) — no action per audit; fallbacks
  shipped.
- Out-of-scope observation: `skills/` is also `.gitignore`-listed yet tracked
  (same untrack-vs-ignore discrepancy, no site weight) — left for the repo
  owner; no audit finding.
- Round-6 carried items: H1 (host security headers) and C1 (rotate the
  round-3 leaked key) remain repo-owner actions.

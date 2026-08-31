# Remediation Plan — Round 12 — 2026-08-31

Closes the Risen Christ findings of the comparative UI/UX design audit
**"UI/UX Design Audit — St Mary of the Angels vs Risen Christ"** (14-page PDF,
2026-08-31; markdown reference copied to
`docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md`).
Parish: **Church of the Risen Christ** (Toa Payoh).

This is the second hop of the audit remediation. The first hop (St Mary of the
Angels, round 7) closed F-1/F-2/F-3/F-5 in that repository and explicitly
scoped F-4 and F-9 here. This round ports the shared fixes to the Risen Christ
codebase **as it exists today** — which has diverged from the audit snapshot
(rounds 5–11 shipped here in between) — so every finding was re-verified
against the current code before planning, with fresh WCAG math on the current
token layer.

Method: **TDD** — every fix lands as a failing test first (red), then the fix
(green), then the full gate. No new branches; all commits go to `main`.
Skills consulted: `skills/skills-catalog.md` §5 (tdd, tdd-workflow,
test-driven-development, verification-and-review-protocol) and
`skills/how-to-git-push-using-ssh-wrapper` (push transport).

## Gate before (measured 2026-08-31, fresh clone @ 4db7768)

```
pnpm lint          0 (eslint . --max-warnings 0)
pnpm typecheck     0 (tsc --noEmit)
pnpm test          32 files / 184 tests — all green
pnpm build         dist/index.html 395.66 kB (gzip 114.39 kB)
pnpm test:e2e      48 / 48 (chromium)
```

Defect reproduced before fixing (F-3): opening `http://localhost:5173/worship`
directly renders the Home hero ("He is risen.") while the address bar shows
`/worship` — the soft-404 the audit recorded on the deployed site.

## Findings disposition

| # | Severity | Finding (audit §7) | Verdict against current code | Fix |
|---|---|---|---|---|
| F-1 | **Medium** | Event-category chip text below AA contrast (`EventMeta.tsx` `categoryTone`) | **CONFIRMED — OPEN, in a new form.** RC's round-7 "Honest Light" retone moved Devotion onto `terracotta-500` (the audit had flagged it on Archdiocese). Exact math on today's tokens: terracotta-500 `#ab5f3c` on parchment = **3.92:1 — FAIL**; Parish maroon-700 11.30:1, Archdiocese maroon-600 9.59:1, Formation pine-600 9.37:1 — pass. | Add `--color-shrine-terracotta-600: #8f4c30` (new scale step, no existing token mutated); retone **Devotion → `text-shrine-terracotta-600`** (**5.36:1**); borders unchanged (decorative). Contract test computes ratios from the token layer for all four tones. |
| F-2 | Low | Event date at marginal contrast (`charcoal/70`) | **TRANSFORMED + PATTERN SWEEP.** The RC date span is now `text-shrine-maroon-700` (opaque) = **11.30:1 — passes**; it gets a lock test, not a fix. The *same defect pattern* survives elsewhere: the Worship mass-card footnote (`Worship.tsx:54`, `text-xs text-shrine-charcoal/70` on a parchment card) blends to **4.16:1 — FAIL**. The `/75` and `/80` charcoal usages all pass (4.71–5.39:1) — left untouched (no inflated findings). | Footnote → `text-shrine-charcoal/85` (**6.19:1**), the same one-step remedy the audit and the SMA round-7 fix applied to this exact pattern. Contract test also locks the date tone. |
| F-3 | Low | Path-style deep links (`/worship`) silently render Home | **CONFIRMED — reproduced locally 2026-08-31** (see Gate before). HashRouter rationale comment unchanged; 16 concrete routes (9 canonical + 7 aliases) — identical list to the SMA port. | Keep HashRouter (single-file deployment remains a documented tradeoff; `_headers` serves headers, not rewrites). Add `src/utils/deepLinks.ts` — `knownRoutePaths` + `resolveHashRedirect()` — wired in `src/main.tsx` before mount. Unit tests + drift guard against `App.tsx` + `e2e/deep-links.spec.ts`. |
| F-4 | Low | RC Give page sets "UEN T08CC4042G" as the section display heading | **CONFIRMED — OPEN** (`Give.tsx:48`, `title={`UEN ${site.uen}`}` in Fraunces 3xl–4xl). | Retitle the section **"Ways to give"** (eyebrow "How to give" stays); demote the UEN into a **copyable detail row inside the featured PayNow card** (mono-spaced value + Copy button, clipboard API with graceful fallback, "Copied" feedback). PayNow card description reworded so the UEN string appears exactly once on the page, in the functional place. |
| F-5 | Low | SMA News & Events journey ends early | **N/A — this repository is the audit's exemplar** for the strong pattern (hero bulletin CTA, navigable cards, closing band). No action. |
| F-6 / F-7 / F-8 | Informational | Imagery artifacts / scroll-reveal reader-mode blanks / 2.7 MB images | **DEFERRED / NO ACTION (as audit).** Unchanged tradeoffs, already documented. |
| F-9 | Informational | Leftover `src.orig/` reference copy ships in the repository | **CONFIRMED — OPEN: 64 files tracked.** `.gitignore` already lists `src.orig/` but ignore rules do not untrack (the exact lesson of round-6's `docs/ssh-key.txt` leak, C1). | `git rm -r --cached src.orig` + delete the directory from the worktree. Extend `src/repo-hygiene.test.ts` with a guard: no `src.orig/` path may be tracked. |

Out-of-scope observation (noted, not actioned): `skills/` is also listed in
`.gitignore` yet remains tracked — the same untrack-vs-ignore discrepancy, but
it is not an audit finding and carries no site weight; left for the repo owner.

## Fix detail and evidence

### F-1 + F-2 — chip tone, date lock, footnote contrast

Measured with this repo's own token values (relative luminance, WCAG 2.x;
parchment surface `#f2e9d6`):

| Element | Current | Current ratio | New | New ratio |
|---|---|---|---|---|
| Devotion chip text | terracotta-500 `#ab5f3c` | 3.92:1 ❌ | **terracotta-600 `#8f4c30`** (new token) | **5.36:1 ✅** |
| Parish chip text | maroon-700 `#55191a` | 11.30:1 ✅ | unchanged | — |
| Archdiocese chip text | maroon-600 `#691f1e` | 9.59:1 ✅ | unchanged | — |
| Formation chip text | pine-600 `#26402f` | 9.37:1 ✅ | unchanged | — |
| Chip borders | per-category tints | decorative (non-text) | unchanged, per audit "keeping the border tint as is" | — |
| Event date (`<time>`) | maroon-700 `#55191a` | 11.30:1 ✅ | unchanged; **lock test** so a future retone re-verifies automatically | — |
| Worship mass-card footnote | charcoal/70 → `#776e5f` | 4.16:1 ❌ | **charcoal/85 → `#5c5446`** | **6.19:1 ✅** |
| charcoal/75 usages (Worship, FAQ, About, Header) | on parchment / cream | 4.71–5.04:1 ✅ | unchanged (documented so future audits need not re-derive) | — |

The chip label is 0.65rem (≈10.4 px) bold uppercase — normal text, not large
text — so WCAG 2.2 AA 1.4.3 requires 4.5:1. Terracotta-600 `#8f4c30` matches
the audit's own example value and the SMA round-7 adoption (5.36:1 there on the
identical parchment surface).

Note on divergence from the audit's example: the audit's F-1 named gold-600 on
Devotion and terracotta-500 on Archdiocese (the snapshot it reviewed). RC's
round-7 retone already fixed the gold-600 half; today exactly **one** chip tone
fails (terracotta-500 on Devotion). The remediation is the audit's own remedy,
applied to the tone that now carries the defect.

Tests (new `src/components/wcag-contrast.test.tsx`):

1. Parse `src/index.css` `@theme` tokens → hex map.
2. For every entry of `categoryTone` (exported from `EventMeta.tsx`), resolve
   the `text-shrine-*` class → token → hex, compute contrast vs parchment,
   assert ≥ 4.5 (4 tests).
3. Render `EventMeta`, read the `<time>` date element's `text-shrine-*` tone,
   assert its token computes ≥ 4.5 on parchment (1 test) — locks the F-2 form
   RC actually exhibits.

Red state before the fix: Devotion's terracotta-500 computes 3.92 → assertion
fails. All other tones pass from the start (they are lock assertions, not
fixes).

Separately, extend `src/pages/worship-mass.test.tsx` with one test: the
mass-card footnote paragraph carries `text-shrine-charcoal/85` (and not
`/70`). Red before, green after the one-class fix.

### F-3 — path-style deep links

Same fix shape the SMA port shipped (audit's option (b) — "keep HashRouter and
add a small script that rewrites known path routes to their hash equivalents on
load"):

- New `src/utils/deepLinks.ts`: `knownRoutePaths` — every concrete path from
  `src/App.tsx` (16: 9 canonical + 7 aliases, wildcard excluded) — and
  `resolveHashRedirect(pathname, hash)` returning `"/#" + path` only for known
  path-style URLs (trailing slash normalized; root, hash-present, unknown,
  case-mismatched, and file paths return `null`).
- `src/main.tsx` calls it before `createRoot` and `location.replace()`s the
  target; render still proceeds so the module never dead-ends.
- Tests: `src/utils/deepLinks.test.ts` (7 tests) including the drift guard
  that parses `path="…"` literals out of `src/App.tsx` so the two tables
  cannot silently diverge. New `e2e/deep-links.spec.ts` (3 tests): `/worship`
  lands on the Worship h1 ("Mass, mercy, and a place to kneel"),
  `/news-events` lands on "The life of the parish", the `/donate` alias lands
  on Give. Red before the fix (reproduced above), green after.

### F-4 — UEN out of the heading, into a copyable row

`src/pages/Give.tsx`:

- `SectionHeading` becomes `eyebrow="How to give" title="Ways to give"` — the
  section outline now announces a human title, not a registration string
  (screen-reader headings outline fixed).
- Inside the featured PayNow card (`data-featured="true"`), a detail row is
  appended under the description: the UEN value (`site.uen`, display serif) and
  a compact **Copy** button (`aria-label="Copy UEN T08CC4042G"`). Click copies
  via `navigator.clipboard.writeText` inside try/catch; success flips the label
  to "Copied". No clipboard API → legacy `execCommand` fallback → honest
  no-op on failure (label stays "Copy").
- `src/data/content.ts` PayNow description reworded to
  "Scan or transfer by UEN — Church of the Risen Christ." so the UEN string
  renders exactly once, where it is functionally needed. (`content.test.ts`
  pins only count/shape — unaffected; `site.test.ts` UEN pin — unaffected.)

Tests (new `src/pages/give-uen.test.tsx`, 3 tests):

1. No heading on the Give page contains "UEN"; the "how to give" section's
   `<h2>` is "Ways to give".
2. `site.uen` appears exactly once in the page, inside the featured PayNow
   card, and the row exposes a button with the "Copy UEN" accessible name.
3. Clicking Copy writes `site.uen` to the clipboard (mocked) and shows
   "Copied".

### F-9 — prune `src.orig/`

- `git rm -r --cached src.orig` (64 files untracked) and remove the directory
  from the worktree. `.gitignore` already covers it — no ignore edit needed.
- `src/repo-hygiene.test.ts` + 1 test: `trackedFiles()` contains no
  `src.orig/` path. **Red first** (64 tracked today), green after the removal.

## TDD runbook (each step red → green)

1. **R12-F1/F2**: write `src/components/wcag-contrast.test.tsx` + the worship
   footnote assertion → run (red: Devotion 3.92:1; footnote `/70` assertion) →
   add `terracotta-600` token, retone Devotion, fix footnote `/85` → run
   (green) → full gate.
2. **R12-F3**: write `deepLinks.test.ts` + `e2e/deep-links.spec.ts` → run
   (red: module missing; e2e lands Home) → implement `deepLinks.ts` + `main.tsx`
   wiring → run (green) → full gate + e2e.
3. **R12-F4**: write `give-uen.test.tsx` → run (red: heading is the UEN, no
   copy row) → retitle `Give.tsx`, add copy row, reword PayNow description →
   run (green) → full gate.
4. **R12-F9**: extend `repo-hygiene.test.ts` → run (red: 64 tracked) →
   `git rm -r --cached src.orig` + delete directory → run (green) → full gate.

## Planned commits (all to `main`, no new branch)

1. `fix(a11y): AA-compliant chip tone and mass-card footnote contrast (audit F-1, F-2)`
   — `src/index.css`, `src/components/EventMeta.tsx`,
   `src/components/wcag-contrast.test.tsx`, `src/pages/Worship.tsx`,
   `src/pages/worship-mass.test.tsx`.
2. `fix(router): redirect path-style deep links to hash routes (audit F-3)`
   — `src/utils/deepLinks.ts`, `src/utils/deepLinks.test.ts`, `src/main.tsx`,
   `e2e/deep-links.spec.ts`.
3. `fix(give): retitle UEN section and add copyable UEN row (audit F-4)`
   — `src/pages/Give.tsx`, `src/data/content.ts`, `src/pages/give-uen.test.tsx`.
4. `chore(repo): prune tracked src.orig reference copy (audit F-9)`
   — untracked/deleted `src.orig/**` (64 files), `src/repo-hygiene.test.ts`.
5. `docs: round-12 remediation records, audit reference, contract re-pin`
   — `docs/remediation-plan-round12-2026-08-31.md`,
   `docs/remediation-round12-2026-08-31.md` (closure, measured numbers),
   `docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md`,
   `README.md`, `AGENTS.md`, `CLAUDE.md`, `risen-christ_SKILL.md`,
   `src/docs-contract.test.ts` (budget re-pin in lockstep with the docs, per
   the repo's own docs-last convention from rounds 9 and 11).

Note on the docs gate: `src/docs-contract.test.ts` reads the four docs'
*strings*, not the live test counts — the pins stay valid until the docs and
the contract move together in commit 5, so no in-round red transient occurs
(docs-last, per the repo's rounds 9/11 convention).

## Gate after (target)

```
pnpm lint          0
pnpm typecheck     0
pnpm test          32 + 3 new spec files, 184 + 17 new tests — all green
                    (5 wcag-contrast + 1 worship footnote + 7 deepLinks +
                     3 give-uen + 1 repo-hygiene; exact totals recorded in
                     docs/remediation-round12-2026-08-31.md)
pnpm build         dist/index.html single-file, size delta ≈ +1–2 kB (copy row + shim)
pnpm test:e2e      48 + 3 deep-links specs — all green
```

## Invariants preserved

- `HashRouter` retained — the documented zero-rewrite tradeoff stands; the F-3
  fix is additive and only redirects *known* path-style routes.
- No existing `shrine-*` token mutated — one new scale step added
  (`terracotta-600`); all existing usages render identically.
- Card affordance contracts intact — PayNow stays `card-tint` (no lift); the
  copy row is an in-card utility, not a card-level navigation.
- No fabricated parish facts — the UEN is the parish's own registered string,
  already shipped in `site.ts`; no new external URLs introduced.
- No test deleted, skipped, or weakened; assertion suites only grow.
- Docs move in lockstep with `docs-contract.test.ts` pins (commit 5).
- The SSH deploy key never enters the repo tree (kept at
  `/home/z/my-project/audit/deploy-key`, mode 600, outside the worktree).

## Where to look next

- `src/components/EventMeta.tsx` — Devotion tone + exported `categoryTone`
- `src/pages/Worship.tsx:54` — footnote contrast step
- `src/utils/deepLinks.ts` — route table + redirect resolution
- `src/pages/Give.tsx` — section title + copyable UEN row
- `src/repo-hygiene.test.ts` — F-9 guard
- `docs/UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.md` — the source audit

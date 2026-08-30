# Remediation Round 4 (2026-08-30) — L-5 closure

Closes the only agent-actionable item left open by round 3: **L-5 — mobile drawer focus trap**
(deferred in [`remediation-plan-round3-2026-08-30.md`](remediation-plan-round3-2026-08-30.md) as a
"future WCAG pass"). Method: TDD (`tdd-workflow` — RED → GREEN) with the full five-gate
verification (`verification-and-review-protocol` Iron Law) before any completion claim.

## Scope

The mobile drawer graduates from a non-modal disclosure to a **modal dialog**:

- `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"` on the drawer panel
  (the `<nav aria-label="Mobile">` landmark stays inside it for structure-aware AT).
- **Initial focus** — the panel (`tabIndex={-1}`) is focused on open; screen readers announce
  the dialog label and keyboard users start at the top of the menu.
- **Focus trap** — `Tab` from the last drawer link wraps to the first; `Shift+Tab` from the
  first wraps to the last; `Tab`/`Shift+Tab` while the panel itself holds focus wraps too.
- **Focus restore** — every close path (hamburger toggle, `Escape`, in-drawer link activation,
  route change, outside tap) returns focus to the hamburger toggle.
- **Outside-tap close** — a `pointerdown` outside the drawer (and not on the toggle) closes it,
  so pointer focus cannot slip behind the `aria-modal` surface.

Explicitly out of scope (unchanged): desktop dropdown stays hover/focus-open (round-3 M-3
decision); no background `inert`/scrim — `aria-modal` + the keyboard trap cover SR modality and
keyboard containment, and a scrim would be a visual design change (documented tradeoff).

## TDD cycle evidence

| Phase | Artifact | Result |
|---|---|---|
| RED | `src/components/Header.test.tsx` +5 tests: modal semantics + initial focus, Tab wrap, Shift+Tab wrap, Escape focus restore, link-close focus restore | 5 failed / 11 passed (16) |
| RED | `e2e/enhancements.spec.ts` +1 test: dialog role + `aria-modal` + `toBeFocused` panel + trap wrap + Escape restore | failed pre-implementation |
| GREEN | `src/components/Header.tsx`: `toggleRef`/`drawerRef`/`drawerWasOpenRef` + focus-management effect + `handleDrawerKeyDown` trap + dialog attrs on the panel | 17 files / **109** unit tests green |
| Regression | full E2E re-run | **36/36** green |

## Bonus hardening (root-caused, not a workaround)

`e2e/enhancements.spec.ts` "scroll progress rail fills with page depth" was latently racy:
`index.css` sets `scroll-behavior: smooth`, so scrolling to the absolute bottom **rests at
`matrix(1, …)`** — a value the `^matrix\(0\.[1-9]` assertion can never match. The test only
passed when a poll sample caught the smooth-scroll animation mid-flight; under load it failed
(reproduced 2/3 full-suite runs at 35→36 tests; round 3 had logged the same flake). Fix: scroll
to a stable **mid-depth landing (50%)** so the resting transform `matrix(0.5, …)` deterministically
matches the same regex. Assertion semantics ("rail fills with page depth") unchanged.

## Five-gate evidence (fresh, post-fix)

| Gate | Command | Result |
|---|---|---|
| Lint | `pnpm lint` (`--max-warnings 0`) | 0 warnings |
| Types | `pnpm typecheck` (`tsc --noEmit`) | clean |
| Unit | `pnpm test` | **17 files / 109 tests** pass (was 17/104; Header 11 → 16) |
| E2E | `pnpm test:e2e` | **36/36** pass (was 35; enhancements 8 → 9) |
| Build | `pnpm build` | `dist/index.html` **381.41 kB** + `dist/_headers` + `dist/images/8` |

Hygiene held: `git ls-files` shows no `docs/ssh-key.txt`, no `package-lock.json`, no `src.orig/`.

## Docs re-synced

`AGENTS.md` · `CLAUDE.md` · `README.md` · `st-mary-of-angels_SKILL.md` — new test counts
(109 unit / 36 E2E), Header build size 381.41 kB, modal-drawer contract in the a11y/architecture
sections, round-4 rows/links in audit ledgers.

## Still open (owner action)

- **Rotate/revoke the SSH deploy key** — `docs/ssh-key.txt` lived in public git history; untracking
  (round 3, C-1) does not revoke it. This remains the single open Critical-adjacent action and can
  only be done by the repo owner.

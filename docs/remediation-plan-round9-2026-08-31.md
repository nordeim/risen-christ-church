# Remediation Plan — Round-9: Built-Artifact E2E Contract (E2E-L1)

**Date:** 2026-08-31 · **Source:** fresh E2E pass vs live `https://risen-christ.jesspete.shop/` @ `8e4f811` (round-9, 2026-08-31) · **Status:** executed TDD-style this round · **Version target:** 1.4.2

---

## 1. Finding under remediation

**E2E-L1 (Low, test-suite — zero product defects):** `e2e/enhancements.spec.ts:25-28` asserts the dev-server favicon form exactly:

```ts
await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
  "href",
  "/favicon.svg",
);
```

**Root-cause chain (each link verified against the codebase):**

| # | Link in the chain | Evidence |
|---|---|---|
| 1 | `index.html:16` ships `href="/favicon.svg"` (root-relative) | source head |
| 2 | `vite.config.ts:13` loads `viteSingleFile()`; the plugin forces `base: "./"` at build time | `plugins: [react(), tailwindcss(), viteSingleFile()]` |
| 3 | `dist/index.html` therefore ships `href="./favicon.svg"` (relative) | dist head dump |
| 4 | The suite's `webServer` always ran `pnpm dev` (`playwright.config.ts:27-32`), so the suite never saw the built form — the coupling was latent | config + gate history (all prior 48/48 runs were dev-server runs) |
| 5 | Round-9 was the **first-ever run against the built artifact** (live host): 47/48, only this test failed; live favicon itself returns **HTTP 200, `image/svg+xml`** — the site is correct, the assertion is dev-coupled | round-9 live pass + `curl -I /favicon.svg` |

**Class risk:** any spec asserting an exact root-relative `href`/`src` that the singlefile pipeline rewrites will pass on dev and fail on the built/live artifact. Full-suite audit found exactly **one** other exact-path assertion — `e2e/navigation.spec.ts:37` `href "#main-content"` — an in-page fragment the build never rewrites. **E2E-L1 is the sole member of the class.**

## 2. Skills applied (per `skills/skills-catalog.md`)

| Skill | Role in this round |
|---|---|
| `tdd-workflow` / `test-driven-development` | RED→GREEN discipline: reproduce the failure against the built artifact *before* touching the assertion; minimal fix; both-environment proof |
| `e2e-testing-lessons` | Tool-selection rule "Playwright for regression suites"; environment-coupling lessons shaped the both-artifacts verification |
| `webapp-testing` | "Discover and test everything — leave no route untested"; deep-audit framing for the built-artifact pass |
| `code-quality-standards` | Six-Axis review of the changed test + config before commit |
| `code-review` | Standards/Spec fixed-point check: change matches the round-9 finding spec exactly, no scope creep |

## 3. Remediation items

### R-1 — Env-agnostic favicon contract (`e2e/enhancements.spec.ts:23-28`)
Accept **both** path forms with a regex and additionally assert the reference **resolves** (mirrors the sibling test `"favicon.svg resolves from public/"`, lines 61-65, which is already environment-safe):

```ts
const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
await expect(icon).toHaveAttribute("href", /^(?:\.\/|\/)favicon\.svg$/);
const iconResponse = await page.request.get((await icon.getAttribute("href"))!);
expect(iconResponse.status()).toBe(200);
```

Test **count is unchanged** (strengthened in place) — every "48 E2E" pin stays valid.

### R-2 — Built-artifact E2E capability (new tracked `playwright.built.config.ts`)
The failure class exists because the suite had no way to run against the built artifact. Add:

- `playwright.built.config.ts` — extends `playwright.config.ts`; `baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:4173"`; `webServer: vite preview --port 4173` (skipped when `E2E_BASE_URL` is set, enabling live-host runs: `E2E_BASE_URL=https://risen-christ.jesspete.shop pnpm test:e2e:built`).
- `package.json`: `"test:e2e:built": "playwright test --config=playwright.built.config.ts"` + version `1.4.2`.
- `tsconfig.json` `include` += `"playwright.built.config.ts"` (repo pitfall §13 #7: files outside `src/` must join `include` or they escape the type gate).
- The untracked round-9 helper `playwright.live.config.ts` is **deleted** (superseded).

### R-3 — Guard coverage + re-pin (`src/docs-contract.test.ts`)
Follow the round-7/8 re-pin pattern: +2 assertions pinning the new built-config rows in `CLAUDE.md` and the SKILL; unit budget moves `32/179 → 32/181` (`docs-contract` 10 → 12) and is re-pinned in the guard's own expected strings, CLAUDE, README, AGENTS, and the SKILL (front-matter, §gate, Quick Ref).

### R-4 — Docs sync (v1.4.2)
`CLAUDE.md` (scripts table row, E2E section, quick commands, tsconfig rows ×2, repo map row), `README.md` (version badge, stack table row 44 note, repo map rows, audits paragraph, pre-push gate note), `risen-christ_SKILL.md` (front-matter version/verified, §config row, §pitfalls new row, Quick Ref), `AGENTS.md` (Don't gates line, doc-map rows for round-9). No "48 E2E" or "395.66kB" pin changes (both remain true).

## 4. Pre-execution validation against the codebase

| Claim | Verified by |
|---|---|
| Failing assertion at `e2e/enhancements.spec.ts:25-28`, exact string `/favicon.svg` | file read |
| Sibling env-safe test at lines 61-65 uses `page.request.get("/favicon.svg")` | file read |
| `index.html:16` root-relative icon; dist rewritten to `./favicon.svg`; `og:image` (absolute `https://www.risenchrist.org.sg/...`) untouched by build | greps of source + dist head |
| `viteSingleFile()` at `vite.config.ts:13` | file read |
| Only other exact-path e2e assertion is `#main-content` (build-safe) | `grep -rnE 'toHaveAttribute\("(href\|src)"'` across `e2e/` |
| Guard variables `claude`/`skillContract`/`skillQuickRef`/`agents` + pins at lines 35-41, 59, 82-88, 92-99 | `src/docs-contract.test.ts` read |
| Re-pin surfaces: SKILL L7/L656/L1417, AGENTS L99/L112, README L157/L262, CLAUDE L165/L187/L214 (+ breakdown `docs-contract 10` → `12`) | greps |
| `tsconfig include` rows in CLAUDE L55/L316, README L100, SKILL L148 | greps |
| `playwright.config.ts` default-export is importable for config extension (proven by round-9's untracked live override, 47/48) | round-9 execution |
| Live favicon `HTTP 200 image/svg+xml`; round-9 live pass 47/48 with only E2E-L1 failing | round-9 worklog + curl |
| Unit budget after guard +2: 179 + 2 = 181; E2E stays 48; build stays 395.66kB (config/spec changes are build-neutral) | arithmetic + post-gate verification below |

## 5. TDD execution plan

1. **RED** — add R-2 infrastructure (config + include + script), run the suite against `vite preview` (dist): expect **47 pass / 1 fail** with the failure being exactly the favicon form assertion — reproducing E2E-L1 deterministically on local soil.
2. **GREEN** — apply R-1; re-run built artifact: expect **48/48**; re-run dev server: expect **48/48** (no regression); run `E2E_BASE_URL=<live> pnpm test:e2e:built`: expect **48/48 vs the live host** (full circle).
3. **Guards + re-pin (R-3/R-4)** — extend docs-contract, sync docs, bump version; full five-gate: lint 0 / typecheck 0 / unit 32 files · **181** / E2E **48** / build **395.66kB**.
4. **Sixth check (outside the canonical five)** — `pnpm test:e2e:built` green vs preview; documented as the built-artifact verification, not a gate redefinition.

## 6. Execution ledger

| Step | Result |
|---|---|
| RED vs `vite preview` (pre-fix) | 47 pass / **1 fail** — `head ships favicon…` received `./favicon.svg`, expected `/favicon.svg` (E2E-L1 reproduced locally) |
| GREEN built artifact (post-fix) | **48/48** |
| GREEN dev server | **48/48** |
| GREEN live host (`E2E_BASE_URL`) | **48/48** |
| Five gates | lint 0 · typecheck 0 · unit **32 files / 181 tests** · E2E **48** · build **395.66kB** |
| Built-artifact sixth check | **48/48** vs `vite preview` |
| Commits | 2 atomic to `main` (test-infra; docs+guards) |
| Push | `8e4f811..HEAD main -> main` via `ssh_git_wrapper_v3.py` + `docs/ssh-key.txt`; single remote head, no new branches |

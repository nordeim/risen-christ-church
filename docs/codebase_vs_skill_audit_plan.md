Meticulous Validation Plan — Codebase vs risen-christ_SKILL.md v3.0.0 
 
Executive Summary: Validate the risen-christ-church repo (canonical instance, package.json 1.4.4) against the unified SKILL v3 (2026-09-01) which introduced §0 Volatile Facts Register as single-source-of-truth 
and ADR-7 fossil-sweep protocol. Prior ports shipped 5-8 restatements per fact → fossils survived in appendices. This plan makes every SKILL claim decidable with an automated or manual check, pinned to §0, 
then sweeps fossils per App G.4 before any remediation. 
 
│ Approach: No code until you confirm this plan (Phase 3 gate). Validation is read-only audit first; remediation only after you approve findings ledger. 
 
---
 
1. ANALYZE — What Must Be Validated 
 
Scope = all 20 sections + Appendices + §0 register. The SKILL is not aspirational — it claims lint 0 + typecheck 0 + 35/202 + 51 E2E (dev+built) + 397.52kB green on 2026-08-31 round-12. Every other section 
defers to §0. 
 
3 prior failure modes to guard (L13-L15): 
1. Secret in history remains live (docs/ssh-key.txt C-1) → rotation outstanding 
2. .gitignore does not untrack (src.orig/ F-9) → git ls-files vs .gitignore 
3. Every restatement is a future fossil → §0 reference enforcement 
 
Trade-offs surfaced: 
- Static SPA means no SSR/API to validate — but HashRouter + viteSingleFile invariants are load-bearing 
- Design tokens are unchanged except terracotta-600 — verify byte-for-byte, don't assume 
- All images now local but SafeImage guard must remain for future externals 
 
---
 
2. PLAN — 7-Phase Validation Roadmap 
 
### Phase A: Volatile Facts Register Ground Truth (The Lock) 
 
Maps to §0 + Quick Ref — nothing else is authoritative. 
 
┌────┬─────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────┐ 
│ #  │ Check               │ Method                                                                                                            │ Success Criterion                                              │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A1 │ Unit tests count    │ rg -c "describe|it(" src + pnpm test --reporter=verbose sum per §0:                                               │ 35 files / 202 pass, sum matches §0                            │ 
│    │                     │ 4+3+16+5+7+10+8+5+7+7+11+3+6+6+17+7+2+5+3+6+6+4+3+2+3+6+3+2+2+2+4+6+2+13+6 = 202 across 35 files                  │                                                                │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A2 │ E2E count           │ ls e2e/*.spec.ts + pnpm test:e2e --list                                                                           │ 8 specs, 51 tests (11+8+4+4+7+6+8+3). test:e2e:built same 51   │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A3 │ src/ inventory      │ find src -type f | wc -l + breakdown                                                                              │ 77 = 41 source + 35 tests + 1 setup                            │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A4 │ public/images/      │ ls public/images                                                                                                  │ 8 files + favicon.svg                                          │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A5 │ Build artifact      │ pnpm build && ls -lh dist && wc -c dist/index.html                                                                │ dist/index.html ~397.52kB + _headers + favicon.svg + images/8  │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A6 │ Design tokens       │ grep -c "shrine-" src/index.css                                                                                   │ 25 colors + 2 shadows (27 @theme entries)                      │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A7 │ Utilities/keyframes │ grep -c "\.text-balance|\.bg-" src/index.css + keyframe grep                                                      │ 27 utilities + 8 keyframes                                     │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A8 │ Hooks/utils/routes  │ ls src/hooks src/utils + grep -c Route src/App.tsx                                                                │ 3 hooks, 4 utils, 17 Routes, 7 aliases/5 groups, 9 anchors     │ 
├────┼─────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤ 
│ A9 │ Data arrays         │ node -e "import('./src/data/content.ts')" counts                                                                  │ lifeTimeline 8, grounds 3, ministries 6, faqs 6, events 6,     │ 
│    │                     │                                                                                                                   │ giving 8, priests 3, ppc 7 etc.                                │ 
└────┴─────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────┘ 
 
Gate: Any §0 value drift → doc fix required, not code tolerance. 
 
### Phase B: Config & Toolchain Contract (Frozen Lock Verification) 
 
Maps to §2 + §3 + vite.config.ts/tsconfig.json/eslint.config.js/playwright.*.ts + .github/workflows/ci.yml + 技能 vendored policy 
 
- B1: Pin check — rg "\^" package.json = 0, pnpm@11.0.0, engines node>=20, pnpm-lock.yaml exists, package-lock.json absent 
- B2: Alias sync — vite.config.ts @ path vs tsconfig.json paths/baseUrl diff must be empty 
- B3: vite.config.ts test block — globals, jsdom, setupFiles: src/test/setup.ts, include/exclude e2e/** present; server.watch.ignored has 6 entries (skills/dist/report/test-results/coverage/src.orig) 
- B4: tsconfig.json strict — 4 flags true, include has 5 entries, types [node, vitest/globals] 
- B5: eslint.config.js ignores — 7 paths (dist/node_modules/coverage/playwright-report/test-results/skills/src.orig) 
- B6: playwright.config.ts vs playwright.built.config.ts — chromium, expect.timeout 15s, built extends base with E2E_BASE_URL fallback 
- B7: index.html CSP — img-src 'self' data: blob: only, frame-src https://www.google.com, allows static.cloudflareinsights.com, OG/json-ld drift vs src/data/site.ts (head.test.ts guard) 
- B8: .gitignore vs git ls-files — src.orig/ and docs/ssh-key.txt must be untracked; skills/ tracked but eslint/tsconfig/vite ignore it 
 
### Phase C: Design System Byte Equality 
 
Maps to §4 + §19 + §18 
 
- C1: @theme block diff against §4.1 verbatim (25 colors incl. terracotta-600 #8f4c30, 2 shadows) — grep shrine- count + hex match 
- C2: 27 utility register (§4.3 rows 1-27) each exists in src/index.css; 8 keyframes exist; prefers-reduced-motion kills all 8 + .reveal; @media print reveals 
- C3: Typography — Fraunces + Source Sans 3 in index.html preconnect, @theme font vars, no JS loader 
- C4: Shadows/radii — only shadow-shrine/shadow-shrine-lg, rounded-sm/rounded-full; forbidden amber-*/slate-*/zinc-* grep = 0 in src 
- C5: Z-index map (§18) — z-[100] SkipLink, z-[60] ScrollProgress, z-50 Header, z-40 Ministries pills — code search matches 
 
### Phase D: Architecture & Routing Integrity 
 
Maps to §5 + §6 + §7 
 
- D1: Directory tree (§5.2) — every file the harness references appears; missing useScrollSpy.ts/monogram.ts/deepLinks.ts would fail D1 (v3 G.25 fix verification) 
- D2: Route table (§5.4) — src/App.tsx has 17 entries (16 + *); alias groups 5/7 verified; utils/deepLinks.ts knownRoutePaths drift-guarded (7 tests); main.tsx calls resolveHashRedirect pre-mount 
- D3: Hash anchors — /worship has mass/confession/visit with scroll-mt-28; /ministries has 6 ids ending language-communities not mandarin; jump nav uses <Link to="/ministries#id"> not <a href="#id"> 
- D4: Component contracts (§5.5) — Button discriminated union + 4 variants + active:translate-y-0; Container max-w; SectionHeading eyebrow line; PageHero compact/grain; SafeImage fallback+fetchPriority+dataset 
  guard; Header useScrolled(16) + modal dialog role=dialog+trap+restore; Reveal IO 0.15 + fallback; Accordion grid-rows+inert; Layout double-hash resolveAnchor + 80ms cleanup 
- D5: Hooks (§6) — 3 hooks exist, threshold mismatch 12 vs 16 intentional, useScrollProgress shared, useScrollSpy document-order tie-break 
- D6: Data (§7) — interfaces 8/8, images 11 local, priests 3 phone+email, ppc 7, lifeTimeline 1969-2026 8 entries verbatim, hours 7 keys (mediaCentre not columbarium), mass 9 keys 
 
### Phase E: Accessibility & Motion 
 
Maps to §8 + §4.3 Sacred Motion + WCAG 
 
- E1: Contrast — shrine-ink/cream ~13:1, terracotta-600/parchment 5.36:1 via wcag-contrast.test.tsx computes from token layer; no chip text below 4.5:1 
- E2: Focus — SkipLink preventDefault+focus (HashRouter-safe), Header aria-expanded/aria-current states (page vs true vs pill), drawer modal Tab trap + Escape restore + outside-pointerdown close, 44px targets  
- E3: Landmarks/images — header/main/footer, h1→h2 hierarchy, alt="" decorative hero, required imageAlt on grounds/ministry 
- E4: Motion — transform/opacity only, prefers-reduced-motion global 0.01ms override + .dot-pulse::after opacity:0, print override reveals, BackToTop threshold 480 + ring + never touches hash 
 
### Phase F: Anti-Pattern & Pre-Ship Gate 
 
Maps to §9 + §11 + §13 + App B smoke script

- F1: 15 anti-patterns — each has negative grep (e.g., bg-[#, tailwind.config, BrowserRouter, src.orig import, /favicon.svg exact) 
- F2: Live smoke — 19 steps App B (Toa Payoh routes): /about priests 3, /history 8, /worship#mass today-card, /ministries#language-communities, aliases /mass-times→Worship etc., path-style /donate→Give, 
  /*/NotFound, hash refresh stays 
- F3: Gate run — pnpm lint && typecheck && test && test:e2e && test:e2e:built && build must be 5x green (6 with built) 
 
### Phase G: Lineage & Fossil Sweep (App G.4 Protocol — Mandatory) 
 
Maps to §12-13, App D-F, G.4 
 
- G1: Register first — list every §0 fact that changed since last port 
- G2: Sweep old value — rg -n "<old>" across doc+README+AGENTS+CLAUDE 
- G3: Previous-parish grep — rg -n "620 Upper|T08CC4053H|Bukit Batok|Bukit Timah|Portiuncula|NS2|DT5|#mandarin|St Mary|St Joseph" → only allowed in labeled as of <date> appendices 
- G4: Sum every count you state — recompute, never copy 
- G5: Reconcile samples with tree — §4.3 rows ↔ §0 counts ↔ §5.2 tree ↔ §18 layers 
- G6: Tracking audit — git ls-files | rg "src.orig|ssh-key|package-lock" vs .gitignore 
- G7: Appendix B rewrite — must be Risen Christ 18-step, not St Mary fossil 
- G8: docs-contract gate — 16 tests green 
 
---
 
3. VALIDATE Gate (Your Approval Required) 
 
Deliverable of this plan: docs/validation-plan-against-skill-2026-09-02.md (this plan) + subsequent docs/validation-report-against-skill-2026-09-02.md with ledger: ✅ pass / ⚠️ drift / ❌ fail per check above, 
with file:line citations. 
 
Effort: ~1 session (read-only audit 45 min, automated sweeps 15 min, manual smoke 20 min, report 20 min). No remediation in audit pass. 
 
Success criteria for validation itself: 
- Every row A1-G8 has an evidence link (command output or file:line) 
- Zero unilateral doc edits during audit — findings queued for explicit remediation approval 
- Counts recomputed from source, not copied


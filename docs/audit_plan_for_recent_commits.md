Meticulous Code Review & Audit Plan — Recent Commits 2f65c11 → 30a9b98 (Round-7 “Honest Light”) 
 
Executive Summary: You pulled 3 commits (75 objects, 44 deltas) landing 975+/115- across 30 files: dab63f6 feat(round-7) + 88b92f2 test(e2e) + 30a9b98 docs(round-7) — collectively “Honest Light” P-1..P-9, 
bumping v1.3.0 → 1.4.0, 28/156+40 → 32/175+48, 388.44kB → 395.59kB. This plan audits those changes against the executable contracts in AGENTS.md/CLAUDE.md/README.md/risen-christ_SKILL.md:§§1-20+Appendices — 
HashRouter, viteSingleFile, @theme token discipline, cn() merging, prefers-reduced-motion, and all 6 prior audit rounds — then validates the five-gate and live E2E byte-identical to dist/. 
 
I have deep-read the four contract docs + docs/design-enhancement-round7-2026-08-31.md + the full diff (Header/PageHero/Reveal/useScrollSpy/index.css/About/FAQ/Give/Home/Ministries/NewsEvents/Serve/Worship + 7 
new test files + E2E). Below is the PLAN awaiting your VALIDATE before any code or pnpm build is run. 
 
---
 
### 1. ANALYZE — What changed (and what must not have broken) 
 
Baseline: 2f65c11 (post-round-6, v1.3.0, lint0+typecheck0+28/156+40+388.44kB green). Target: 30a9b98. 
 
Commit unpack: 
- P-1 Reveal resilience: src/components/ui/Reveal.tsx try/catch + rootMargin "0px 0px 8% 0px" + src/index.css @media print { .reveal {opacity:1;transform:none}} 
- P-2 Worship sticky: Worship.tsx lg:items-start + lg:sticky lg:top-28 lg:self-start on mercy column (mirrors History.tsx story pattern) 
- P-3 Closure bands: NewsEvents.tsx maroon-950+bg-gold-bloom+bg-grain bulletin band (explicit text-shrine-cream h2 + site.bulletin + site.mass.secondCollection) + FAQ.tsx parchment band 
  (site.contact.officePhone/site.contact.email + site.hours.reception) 
- P-4 PayNow featured: Give.tsx data-featured + border-t-2 border-t-shrine-gold-500 + bg-shrine-gold-100/40 on index===0 (verified givingOptions[0]===PayNow) 
- P-5 Scrollspy: NEW src/hooks/useScrollSpy.ts (-45% 0px -50% 0px, threshold:0, middle-band, fallback ids[0], ids.join("|") dep, eslint-disable ) + Ministries.tsx activeId = current || spyId (always-call, not  
  conditional) 
- P-6 About affordances: About.tsx PPC -mx-2 px-2 hover:bg-shrine-maroon-50/60 transition-colors + priest link-underline 
- P-7 Nav hairline: Header.tsx relative after:* after:scale-x-0 → hover:after:scale-x-100 / active after:scale-x-100 on all desktop items (Tailwind v4 scale property note) 
- P-8 card-tint honesty: NEW .card-tint (background-color+border-color 300ms cubic-bezier(0.22,1,0.36,1), gold-400/55 + gold-300/8) — swaps card-lift→card-tint on 6 info surfaces + Home.tsx featured events 
  wrapped in <Link to="/news-events" class="card-lift"> 
- P-9 PageHero atmosphere: opacity-35→45, via-70→65, from-60→45 
 
Tests/E2E: 7 new files / 19 new unit tests (Reveal.test.tsx 2 + useScrollSpy.test.tsx 4 + give-featured 2 + card-affordances 6 + Header +1 + about-visuals +1 + worship-mass +1 + cta-bands +2) + 
Ministries.test.tsx contract evolution (no-hash → exactly-one-pill) + e2e/enhancements-round7.spec.ts 8 (print, sticky top:112px, cream rgb(250,246,236), PayNow rgb(195,150,63) 2px, scrollspy, ::after scale,   
href #/news-events, FAQ loop-back). 
 
Docs sync: README/AGENTS/CLAUDE/SKILL package.json v1.4.0 + docs-contract.test.ts 48E2E+32/175 guards + 27 utilities incl. card-tint + useScrollSpy hook + SKILL §6 deep dive + audit ledger. 
 
Key invariants to preserve (AGENTS.md Quirks/Don't): HashRouter /#/worship#mass double-hash Layout.tsx 80ms logic untouched; viteSingleFile no chunk split; @ alias sync; no bg-[#...]; strict noUnused* clean;   
Header modal dialog role=dialog aria-modal focus-trap/restore + Escape + outside pointerdown; ScrollProgress decoupled z-[60]; Ministries <Link to="/ministries#id"> never <a href>; aria-current contracts (page 
 vs true); SafeImage fallback; SkipLink never rewrites hash; transform/opacity-only motion. 
 
Risks flagged for audit: useScrollSpy ids.join("|") exhaustive-deps suppression (stale if caller recreates array per render — but caller is module-constant ministries.map); Reveal print override specificity vs 
reveal-visible; card-tint rgba-on-token contrast on both cream/parchment; PageHero opacity vs cream text contrast; Ministries current || spyId race (clicked hash wins until IO fires — intended); Header after:  
+ tw-merge disjointness; E2E ::after scale serialization ("1" vs "0 1"). 
 
---
 
### 2. PLAN — Six-Phase Audit Execution 
 
#### Phase 1: Static Gates (no visual) — VERIFY the claim 32/175+48+395.59kB 
 
- [ ] pnpm lint --max-warnings 0 — flat config ignores (skills/src.orig) still applied; catch useScrollSpy rules-of-hooks fix + Header after: no tw-merge collision 
- [ ] pnpm typecheck --noEmit — strict noUnusedLocals/Params on new Reveal.tsx io + useScrollSpy.ts ids + Give.tsx cn 
- [ ] pnpm test run — 32 files / 175 must be green; inspect new RED→GREEN contracts (Reveal try/catch, rootMargin, useScrollSpy 4, give-featured 2, card-affordances 6, Header hairline, about-visuals hover,
      worship-mass sticky, cta-bands 2) 
- [ ] pnpm build — dist/index.html single-file JS+CSS inlined, dist/images/8 copied, size 395.59kB (gzip 114.34kB) matches docs 
- [ ] Parse package.json exact pins + packageManager pnpm@11.0.0 + engines node>=20 
 
Success: all 4 exit 0 with counts matching src/docs-contract.test.ts guards (rejects 25/142+40). 
 
#### Phase 2: Diff-Level Code Review — Tiered Findings (C/H/M/L/I) 
 
Run per-file against code-quality-standards Six-Axis + risen-christ_SKILL.md §§ 4-10: 
 
┌───────────────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ File(s)                                                       │ Axes & Checks                                                                                                                                 │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Reveal.tsx + index.css print + Reveal.test.tsx                │ Correctness: try/catch never swallows reduced path; io?.disconnect cleanup; print !important doesn't fight reveal-visible; A11y:              │ 
│                                                               │ reduced-motion still wins; Test: constructor-mock via globalThis.IO not vi.spyOn                                                              │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ useScrollSpy.ts + useScrollSpy.test.tsx + Ministries.tsx      │ Correctness: middle-band -45%/-50% math, fallback ids[0], getElementById filter missing ids, disconnect on unmount, `ids.join("               │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Header.tsx + Header.test.tsx                                  │ Correctness: relative + after:scale-x-0 default (fixed missing finding), hover:focus-visible:after:scale-x-100, isParentCurrent               │ 
│                                                               │ after:scale-x-100; Styling: no arbitrary hex, cn() merge, Tailwind v4 scale vs transform; A11y: active aria-current retained                  │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Give.tsx + give-featured.test.tsx                             │ Hierarchy: index===0 PayNow data-featured + gold top rule + tint; Affordance: card-tint not card-lift on all 8                                │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ About.tsx + about-visuals.test.tsx                            │ PPC hover:bg-shrine-maroon-50/60 transition-colors + link-underline on email/tel block w-fit                                                  │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Worship.tsx + worship-mass.test.tsx                           │ lg:items-start + lg:sticky lg:top-28 lg:self-start — direct grid child check; card-tint on 6 devotions                                        │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Home.tsx + card-affordances.test.tsx                          │ Featured events <Link to="/news-events"> keeps h-full grid stretch, card-lift honesty; Routing: uses to not href (HashRouter safe)            │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ NewsEvents.tsx + FAQ.tsx + cta-bands.test.tsx                 │ Closure bands render only canonical site.ts (site.bulletin, site.mass.secondCollection, site.contact.*, site.hours.reception); explicit       │ 
│                                                               │ text-shrine-cream h2 on maroon-950                                                                                                            │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Serve.tsx                                                     │ card-tint on 4 roles                                                                                                                          │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ PageHero.tsx                                                  │ opacity-45 + /65 + /45 — contrast of text-shrine-cream over left/bottom dark fields                                                           │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ index.css                                                     │ @theme tokens untouched (24+2), new card-tint token-rgba pattern matches bg-gold-bloom, reveal print block inside @layer utilities            │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ e2e/enhancements-round7.spec.ts                               │ 8 journeys map 1:1 to P-1..P-9; gotoHash + waitForTimeout 300 stability; emulateMedia print opacity 1; sticky top 112px; rgb assertions;      │ 
│                                                               │ scrollspy waitForTimeout 400 flake risk; ::after scale via getComputedStyle(el,"::after").scale                                               │ 
├───────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ AGENTS.md/CLAUDE.md/README.md/risen-christ_SKILL.md/src/docs- │ Guard re-pinning (48+32/175, reject 25/142+40/42), version 1.4.0, 27 utilities, 3 hooks incl. useScrollSpy, 7 specs, no ^ drift, lineage      │ 
│ contract.test.ts/package.json                                 │ appendices preserved verbatim                                                                                                                 │ 
└───────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
Output: Tiered report C1/H/M/L/I with evidence lines + verification ledger (mirroring docs/code-review-audit-round6-2026-08-31.md format). 
 
#### Phase 3: Architectural & Cross-Cutting Review

- [ ] Routing contract: App.tsx 17 entries untouched; alias groups still 5/7; hash anchors 9 intact 
- [ ] Layout.tsx hash scroll still double-hash aware (split # + strip / + 80ms + scrollTo fallback) — new Ministries scrollspy doesn't regress it 
- [ ] Data layer: priests[3]/ppc[7]/lifeTimeline[8 1969-2026]/grounds[3]/ministries[6]/faqs[6]/events[6]/giving[8]/serve[4]/devotions[6]/images 11 local unchanged — no new facts invented 
- [ ] skills/ + src.orig/ still ignored (eslint + server.watch.ignored + tsconfig + .gitignore docs/ssh-key.txt) 
- [ ] No new deps, no SSR/CMS/API, cn() everywhere, shrine-* only 
 
#### Phase 4: Security, Privacy & Hardening 
 
- [ ] index.html CSP unchanged (img-src 'self' data: blob:, object-src 'none', frame-src google.com) — opacity-45 change needs no new allowlist (all images.* still local) 
- [ ] _headers (Cloudflare Pages HSTS/XCTO/XFO) still copied to dist/_headers — live host risen-christ.jesspete.shop warning (round-6 H1) remains ops-owned, flagged not re-introduced 
- [ ] docs/ssh-key.txt still untracked (round-6 C1): no secret re-tracked in these 3 commits (grep ssh-key in diff = only docs) 
- [ ] No dangerouslySetInnerHTML, no raw innerHTML, no new href that could XSS (all site.bulletin/site.ssvp external go via <a href> with Button href — check rel handling) 
 
#### Phase 5: Performance, Motion & A11y 
 
- [ ] Motion is transform/opacity/background-color only; global @media (prefers-reduced-motion: reduce) 0.01ms kill still wraps reveal+card-tint (print override is !important but inside @media print, not 
      motion) 
- [ ] BackToTop (480) + ScrollProgress (useScrollProgress rAF) untouched — no new scroll listener beyond useScrollSpy single IO (no scroll event) 
- [ ] wcag AAA intent: gold scale-x hairline is decorative, text contrast shrine-ink/cream unchanged; PageHero cream on maroon 450 still passes (E2E smoke asserts hero visibility) 
- [ ] SkipLink hash discipline preserved (no new plain href="#id" — Home events use <Link to="/news-events"> not #) 
- [ ] Build budget: +7.15kB for 9 features is proportional (no chunk split, viteSingleFile inlined — check Inlining: log) 
 
#### Phase 6: E2E & Visual Verification 
 
- [ ] pnpm test:e2e 48 green (7 specs: smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 7 + enhancements-round5 6 + enhancements-round7 8) — with npx playwright install --with-deps chromium   
      if needed 
- [ ] Live-DOM spot checks (agent-browser 1440×900 + 390×844): print-media History below-fold opacity:1; Worship sticky position:sticky top:112px; NewsEvents rgb(250,246,236) + Give rgb(195,150,63) 2px; 
      Ministries scrollspy pill moves to Faith Formation on scroll; nav ::after scale active 1 vs inactive 0; FAQ tel:+65 + mailto:crc.secretariat visible; Home featured href #/news-events 
 
#### Deliverable 
 
Single audit doc docs/code-review-audit-round7-2026-0X-XX.md (tiered C/H/M/L/I + 6-axis scores + verification ledger + before/after evidence) + optional docs/remediation-plan-round7-*.md if any H+ found. No 
code changes in audit commits — only ledger/docs if needed. Five-gate re-run post-ledger is the close. 
 
---
 
### 3. Effort & Timeline 
 
~4–6h single-agent (static gates 30m, diff review 2h, cross-cutting+security+a11y 1h, E2E+visual 1h, ledger write 1h). No new branches (all commits on main per constraints); push via SSH wrapper only after you 
approve. 
 
### 4. Concerns & Trade-offs Surfaced Now 
 
- useScrollSpy suppression is intentional but brittle — if a future caller passes an inline ["a","b"] literal, the join("|") trick still fires per render; guard it with useMemo guidance in the audit note 
  rather than changing code now. 
- Ministries now has two sources of aria-current (hash click vs IO). The current || spyId precedence is correct for HashRouter bookmarks, but rapid scroll after clicking can flicker — flagged as L not H 
  (existing E2E covers it). 
- card-tint rgba(226,191,114,0.08) is subtle by design (“Honest Light” restraint). On low-contrast displays it may read as no-op — audit will screenshot both cream + parchment bases.
Next step: I will not run lint/typecheck/test/build or write the ledger until you validate this plan.


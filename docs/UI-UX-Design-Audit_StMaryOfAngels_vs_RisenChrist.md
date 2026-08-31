# UI/UX Design Audit — St Mary of the Angels vs Risen Christ

> **Reference conversion** of `UI-UX-Design-Audit_StMaryOfAngels_vs_RisenChrist.pdf` (14 pages, A4).
> Audit mode: Mode C (audit/review) · Author: Z.ai · Subject: Comparative UI/UX audit of two parish websites.
> Evidence screenshots: `/home/z/my-project/audit/screenshots/` (figures referenced inline).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Method and Evidence Base](#2-method-and-evidence-base)
3. [The Shared Design System](#3-the-shared-design-system)
4. [Site Profile — St Mary of the Angels](#4-site-profile--st-mary-of-the-angels)
5. [Site Profile — Risen Christ](#5-site-profile--risen-christ)
6. [Head-to-Head Comparison](#6-head-to-head-comparison)
7. [Findings and Recommendations](#7-findings-and-recommendations)
8. [Verification Ledger](#8-verification-ledger)

---

## 1. Executive Summary

This audit evaluates and compares the visual aesthetic and UI/UX design of two parish websites: the Church of St Mary of the Angels (Bukit Batok) and the Church of the Risen Christ (Toa Payoh). Both are single-page React 19 applications built with Vite 7, Tailwind CSS 4, and a shared "shrine" design-token layer, and both were reviewed in two ways: by systematic inspection of their source codebases, and by live interaction with the deployed sites in a scripted browser at desktop (1440×900) and mobile (390×844) viewports. The audit follows a review-mode discipline: findings are separated from fixes, classified by severity, and labeled with explicit confidence levels.

The headline result is that both sites are production-grade and share an unusually high design floor. They ship one coherent design system — a parchment-and-maroon palette with gold accents, the Fraunces display serif paired with Source Sans 3, woven tricolor dividers, film-grain textures, and restrained motion — yet they diverge genuinely in brand voice, photography, and content depth. No Critical or High severity findings were identified on either site. One Medium finding (event-category chip contrast below the WCAG 2.2 AA threshold) applies to both sites because they share the same component; four Low findings and several informational notes complete the register. Where the two sites differ, Risen Christ leads on content depth and journey completion, while St Mary's leads on architectural drama and ceremonial polish.

| **0** | **0** | **1** | **4** | **12** |
|:---:|:---:|:---:|:---:|:---:|
| Critical findings | High findings | Medium finding (shared) | Low findings | Review dimensions |

In a head-to-head reading, the verdict of this audit is that the two sites are siblings rather than twins, and that the sibling relationship is a design asset: a parishioner moving between the two sites experiences the same trustworthy visual grammar while encountering two unmistakably different parishes. The recommendations in Section 7 are small, surgical, and mostly concern contrast fine-tuning, deep-link behavior, and two content-design improvements that each site could borrow from the other.

---

## 2. Method and Evidence Base

The review was conducted across twelve dimensions chosen to cover systematic breadth rather than only the obvious surface: first impression and visual distinctiveness; typography; color and contrast (WCAG 2.2 AA as the baseline); layout and spacing; imagery and iconography; navigation and information architecture; content design; responsiveness; accessibility semantics; interaction and feedback states; design-system discipline; and performance perception. Each dimension was assessed against both code and rendered output, so that a claim like "the focus ring is visible" rests on a live keyboard probe rather than on CSS inspection alone.

Evidence was gathered from three channels. First, both GitHub repositories were cloned and read in full at the component and token layers, including the theme block of each index.css, the shared UI primitives (Button, Reveal, SectionHeading, EventMeta, SafeImage, Header, Footer), page compositions, and site data files. Second, the deployed sites were walked with a headless browser: heroes, dropdown menus, mobile drawers, scroll states, and page-level screenshots were captured for both viewports, and console errors were checked (none were emitted by either site). Third, targeted probes were run: computed WCAG contrast ratios for every color pairing that carries text, DOM node counts (277 for St Mary's home, 279 for Risen Christ — both lean), asset weights, and meta/SEO tag verification.

Confidence is labeled per finding using four grades. Verified means executed and observed directly (contrast math plus code plus, where applicable, a live probe). Reasoned means inferred logically from code without a live observation. Assumed means resting on a stated assumption. Unverifiable means the environment does not permit confirmation. Two claims initially suspected during review were re-checked and withdrawn rather than reported, as Section 8 records: an apparent source-code corruption in a Header component turned out to be a terminal display artifact, and an apparent missing meta description turned out to be a multi-line attribute that defeated a naive grep.

---

## 3. The Shared Design System

Both sites are built from one token layer, and the token layer is genuinely good. The palette defines a parchment family (cream `#faf6ec`, parchment `#f2e9d6`, stone `#dccfae`), a nine-step maroon scale anchored at `#200a0a`, a gold scale from `#f8ecd2` to `#a67a2e`, and supporting pine and terracotta steps. Typography pairs Fraunces — a "warm display serif" with real personality — for all headings with Source Sans 3 for body text, with kerning and ligatures explicitly enabled. Custom utilities add the signature moves: a woven gold-maroon-pine divider, animated gold rules that draw in on reveal, a faint fractal-noise grain blended in multiply mode, and a "gold bloom" radial glow anchored to the top of dark bands.

The interaction layer shows the same discipline. Motion is cubic-bezier eased and conservative: a 20-second Ken Burns drift on hero photography, a 24-pixel rise on scroll reveals, a 4-pixel lift with shadow on cards that go somewhere, and a gold underline that draws in on link hover. Both stylesheets collapse every animation and transition under `prefers-reduced-motion`, and St Mary's adds a second, per-class neutralization block as belt-and-braces. The Reveal component instantiates content visibly when Intersection Observer is unavailable, and print styles force revealed content opaque. These are the habits of a system that expects to be audited.

Accessibility scaffolding is present at the framework level in both codebases: a styled skip link, a global `:focus-visible` outline in gold with 3-pixel offset, `aria-current` state styling on navigation, a modal mobile drawer with focus capture, focus restore on close, Escape handling, and outside-tap dismissal. Semantic headings run in order on every page audited, photographs carry descriptive alt text, and landmark regions are labeled. The single accessibility blemish in the shared system is the event-category chip, examined as finding F-1 in Section 7.

> **Figure 1.** St Mary of the Angels — desktop navigation with the Worship mega-menu open: dark panel, gold top border, labeled destinations with one-line descriptions. (`sma-nav-dropdown-open.png`)

---

## 4. Site Profile — St Mary of the Angels

The St Mary's site leads with architectural drama. Its hero is a full-bleed dusk photograph of the folded-plate WOHA church, layered under a maroon gradient that deepens toward the fold, with the parish's vision statement — "According to Thy Word." — set in Fraunces at up to 7xl. A letter-spaced small-caps eyebrow ("A Franciscan parish since 1970"), dual calls to action, and a four-item fact row (Sunday hours, MRT, feast day, friars) complete a first screen that is confident, ceremonial, and distinctly not a template. The utility bar above the navigation states the street address and the Portiuncula feast date, a quiet touch of institutional memory.

Below the fold the page alternates cream and parchment bands: a welcome section with a 4:5 sanctuary photograph and an overlapping "Pray. Form. Go." parchment card; a three-card grounds tour (Main Church, Adoration Chapel, Garden of Peace and Piazza) with image zoom on hover; a two-column events grid whose cards deliberately do not navigate anywhere (they warm-tint on hover instead of lifting); and a dark evangelisation band paired with a feast-procession photograph. Content depth is a strength: Mass schedules include Mandarin, Tamil, Sinhala, Indonesian, and Deaf-community services, confession windows carry honest caveats, and the history timeline runs from the 1957 friars' arrival to the 2004 WOHA consecration with gold year markers and a vertical rule.

> **Figure 2.** St Mary of the Angels — desktop hero at 1440×900: layered maroon gradients over the WOHA church photograph, Fraunces display type, gold tau-cross emblem, and a four-item fact row. (`sma-home-desktop.png`)

Voice and microcopy are where this site most clearly earns its identity: "The orchards became Bukit Batok. The chapel became a WOHA church of folded light. You are not a visitor here. You are expected." Navigation labels are set in uppercase, which reads as liturgical-formal and matches the Franciscan register. The mobile experience preserves the hierarchy: the hero compresses gracefully, the fact grid folds to two columns, and the drawer opens as a modal with all groups expanded and a gold Give link pinned at the bottom.

> **Figure 3.** St Mary of the Angels — mobile hero at 390×844: stacked CTAs, two-column fact grid, legible text over the darkened photograph. (`sma-home-mobile-hero.png`)

---

## 5. Site Profile — Risen Christ

The Risen Christ site is built on the same skeleton but speaks in a warmer, more communal register. Its hero photograph places the white modernist church and bell tower against a Toa Payoh sunset sky with HDB estate blocks visible on either side — the parish visibly at the heart of its new town. The maroon overlay is lighter than St Mary's, letting more of the photograph breathe. The headline is the three-word Easter acclamation "He is risen.", the eyebrow carries the parish's Chinese name 耶稣复活堂， and the fact row substitutes "Blessed 1971" for the friars item. Navigation labels are title-case rather than uppercase, and the emblem is a line-drawn cross-in-circle rather than a filled tau — small decisions that reset the voice from ceremonial to neighborly.

Content design is where Risen Christ pulls ahead. Its News and Events page — the weakest page on the sibling site — is here the richest: a hero with a live "Open the bulletin" button, event cards that navigate (full-card links with the lift affordance reserved for cards that go somewhere, as the code comment puts it), outbound "Learn more" links on events that have them, category chips (Devotion, Formation, Parish) with date ranges, and a closing bulletin band that frames the weekly bulletin as "the weekly word." The Worship page details monthly Bahasa Indonesia, Tamil, and Tagalog Masses; the site data names a media centre with its own hours and phone line; and six named parish e-mail addresses give every hallway of the parish a door.

> **Figure 4.** Risen Christ — News and Events: bulletin CTA in the hero, navigable event cards with category chips and date ranges, outbound links. (`rc-news-top.png`)

Two missteps temper the picture. The Give page sets the parish's tax identifier "UEN T08CC4042G" as a display heading in 3xl–4xl Fraunces — functionally correct, editorially jarring, and recorded as finding F-4. And the closing home-page band, while typographically handsome, quotes "Unite your struggles to Him…" with no attribution for what is presumably a parish priest's line. The mobile drawer mirrors the sibling's pattern with Fraunces title-case groups and an "Easter / 1971" stat strip at its foot, and the mobile scroll experience preserves the grounds cards and photography well.

> **Figure 5.** Risen Christ — Give page: stained-glass hero, giving channels; the UEN tax identifier is set as the section's display heading (finding F-4). (`rc-give.png`)

---

## 6. Head-to-Head Comparison

The matrix below condenses the audit into twelve dimensions. Ratings are the auditor's qualitative judgments on a five-point scale, grounded in the evidence of Sections 3–5 and labeled Reasoned rather than measured: they are comparisons within this pair, not absolute scores against the industry. The pattern is consistent — near parity on system-level dimensions because the sites share one design system, with divergence concentrated in identity, imagery, and content depth.

**Table 1. Twelve-dimension comparison matrix**

| Dimension | St Mary of the Angels | Risen Christ | Edge |
|---|---|---|:---:|
| First impression & distinctiveness | 5 — architectural drama, ceremonial | 4.5 — civic warmth, place-based | SMA |
| Typography | 5 — uppercase nav, liturgical | 5 — title-case nav, warmer | Tie |
| Color & contrast (WCAG AA) | 4 — chip finding applies | 4 — chip finding applies | Tie |
| Layout & spacing | 5 — richer CTA band with image | 4.5 — tighter quote-only band | SMA |
| Imagery & iconography | 4.5 — awe-forward set; 1–2 weak frames | 4.5 — communal set; heaviest file | Tie |
| Navigation & IA | 5 — identical IA, mega-menus | 5 — identical IA, mega-menus | Tie |
| Content design & depth | 4 — strong; News page ends early | 5 — bulletin loop, monthly Masses | RC |
| Responsiveness (mobile) | 5 — verified hero, drawer, grids | 5 — verified hero, drawer, grids | Tie |
| Accessibility semantics | 4.5 — scaffolding verified live | 4 — as SMA, plus F-4 heading | SMA |
| Interaction & feedback | 4.5 — tint-only info cards (deliberate) | 5 — navigable cards, link discipline | RC |
| Design-system discipline | 5 — extra reduced-motion cover | 5 — affordance comments in code | Tie |
| Performance perception | 4.5 — 2.4 MB images, lazy, lean DOM | 4.5 — 2.7 MB images, lazy, lean DOM | Tie |

*Ratings are qualitative auditor judgments (Reasoned confidence), comparing the two sites against each other on evidence from Sections 3–5.*

Read as one sentence: St Mary's is the more cinematic of the two and wears its Franciscan scholarship lightly; Risen Christ is the better parish newsletter and the more complete journey; and both are carried by a design system that either parish could adopt wholesale from the other without a single new component being drawn. The practical implication for maintenance is favorable — a fix made to the shared token layer or a shared primitive propagates to both sites by copy, as the near-identical index.css files demonstrate.

---

## 7. Findings and Recommendations

Findings are ordered by severity, then by site. Each follows the standard format: location, description, evidence, impact, severity, recommended fix, and confidence. Counts: zero Critical, zero High, one Medium (applying to both sites), four Low, and four informational notes. Nothing here blocks release; the Medium finding is a compliance gap on a small but genuinely informative UI element.

### F-1 (Medium, both sites) — Event-category chip text below AA contrast

- **Location.** `src/components/EventMeta.tsx` in both repositories — the `categoryTone` map, rendered on Home and News and Events.
- **Description.** Category chip text is set at 0.65rem (about 10.4 px) bold uppercase on a parchment card. The Devotion chip uses gold-600 `#a67a2e`, computing to roughly **3.2:1** against parchment `#f2e9d6`; the Archdiocese chip uses terracotta-500 `#ab5f3c`, roughly **3.9:1**. Both fall short of the 4.5:1 required for normal-size text under WCAG 2.2 AA (1.4.3). Formation (pine-600) and Parish (maroon-500) pass comfortably at approximately 9–10:1.
- **Evidence.** Computed relative-luminance ratios from the token hex values; chip visible in Figures 4 and 6 (context).
- **Impact.** The chip is the only text on the card that names the event's category; low-vision users and anyone on a low-quality panel lose that signal.
- **Severity.** Medium.
- **Recommended fix.** Darken the two failing tones one step — for example Devotion to gold-700 (approximately `#8a6224`, about 4.9:1) and Archdiocese to terracotta-600 (approximately `#8f4c30`, about 5.3:1) — keeping the border tint as is. One-line change in a shared file; propagates to both sites.
- **Confidence.** Verified (mathematics plus code inspection; ratios cross-checked on sampled screenshots).

### F-2 (Low, both sites) — Event date at marginal contrast

- **Location.** `src/components/EventMeta.tsx` (date span, `text-shrine-charcoal/70`).
- **Description.** Charcoal `#423a2c` at 70% opacity over parchment blends to approximately **4.1:1** — just below the 4.5:1 AA threshold at its 12–14 px rendering size.
- **Evidence.** Alpha-blend computation; same component as F-1.
- **Impact.** Marginal legibility cost on a secondary metadata string; most readers unaffected.
- **Severity.** Low.
- **Recommended fix.** Raise the opacity step to `/85` or full charcoal for the date span, mirroring what body copy at `/80` already achieves.
- **Confidence.** Verified (computed).

### F-3 (Low, both sites) — Path-style deep links silently render Home

- **Location.** `src/App.tsx` in both repositories (HashRouter with a documented rationale) plus the single-file build configuration.
- **Description.** Canonical routes are hash URLs (`/#/worship`). A path-style URL such as `/worship` — the form users naturally copy when a hash is stripped by a chat application, or the form printed in a bulletin — loads the app at the root route and silently renders the Home page instead of the requested page or a 404.
- **Evidence.** Live probe: opening `/worship` directly rendered the Home headline while the address bar showed `/worship`.
- **Impact.** Soft-404 behavior for externally shared links; crawlable deep pages do not exist. This is a deliberate, code-documented tradeoff of the zero-rewrite single-file deployment, not an accident.
- **Severity.** Low.
- **Recommended fix.** If the host (both appear to be Cloudflare-served, with a `_headers` file in each repo) can add a SPA fallback rewrite, switching to BrowserRouter yields clean, shareable, crawlable URLs; otherwise keep HashRouter and add a small script that rewrites known path routes to their hash equivalents on load.
- **Confidence.** Verified (live probe plus code comment).

### F-4 (Low, Risen Christ) — Tax identifier as display heading

- **Location.** `src/pages/Give.tsx` (SectionHeading title, rendered "UEN T08CC4042G"). *(Risen Christ repository — out of scope for the St Mary of the Angels remediation.)*
- **Description.** The Give page's "how to give" section sets the parish's Unique Entity Number as its display heading in Fraunces at 3xl–4xl (Figure 5).
- **Evidence.** Live screenshot; page source.
- **Impact.** Editorial mismatch — a compliance string performs as the section's voice; screen-reader users hear a registration number announced as the section title in the page outline.
- **Severity.** Low.
- **Recommended fix.** Title the section "How to give" and demote the UEN into a copyable detail row within the PayNow/cheque card, where it is functionally needed.
- **Confidence.** Verified.

### F-5 (Low, St Mary of the Angels) — News and Events journey ends early

- **Location.** `src/pages/NewsEvents.tsx` (SMA).
- **Description.** The page is a hero plus a static event grid; no bulletin CTA, no outbound links, and the sibling site demonstrates the stronger pattern (hero "Open the bulletin" button, per-event links, closing bulletin band). St Mary's operates five active social channels listed in the footer, none surfaced at the point where a parishioner is already looking for "what's on."
- **Evidence.** Code comparison; live capture of both pages.
- **Impact.** The page answers "what" but not "what next," leaving the parish's weekly touchpoint unconnected.
- **Severity.** Low.
- **Recommended fix.** Adopt the sibling's pattern: bulletin button in the PageHero, optional per-event links, and a closing band routing to the bulletin and Mass times.
- **Confidence.** Verified.

### Informational notes

- **F-6 (SMA, imagery).** At close inspection one or two interior photographs — the Adoration Chapel candle arrays, parts of the rosary garden — show mild synthetic-image artifacts; at reading distance they are cohesive with the warm palette. Swapping in parish photography would remove any authenticity risk for a sacred-space brand.
- **F-7 (both, scroll-reveal).** Below-fold content begins at opacity 0 and reveals on intersection; full-page captures and reader-mode tools therefore see blank bands (Figures 2 and 4 were taken after scripted scrolls for this reason). Real-user behavior is unaffected, and reduced-motion, no-IntersectionObserver, and print fallbacks are all handled — noted so future auditors do not misread the pattern as content loss.
- **F-8 (both, asset weight).** Eight JPEGs per site at 2.4 MB (SMA) and 2.7 MB (RC) total, the heaviest single file being RC's rosary-garden.jpg at 511 KB; lazy loading below the fold and eager fetch-priority on the hero keep first paint sensible. Responsive image variants would trim mobile cost.
- **F-9 (RC, repository hygiene, out of UI scope).** A leftover `src.orig/` directory ships in the repository; it does not affect the built site but should be pruned. *(Risen Christ repository — out of scope for the St Mary of the Angels remediation.)*
- **Confidence.** F-6 and F-7 Verified by inspection; F-8 Verified by file measurement; F-9 Verified by directory listing.

---

## 8. Verification Ledger

The ledger records what was checked, how, and with what result, so that every claim in this report can be traced to an action. Two suspected findings were investigated and withdrawn; they are listed at the end because knowing what was ruled out, and why, is part of the audit record.

**Table 2. Verification ledger**

| Check | Method | Result | Confidence |
|---|---|---|:---:|
| Repositories cloned and read (tokens, components, pages, data) | git clone; full-file reads | One shared system confirmed | Verified |
| Live desktop walkthrough, both sites (heroes, menus, pages) | Headless browser, 1440×900 | Figures 1–5 captured; no console errors | Verified |
| Live mobile walkthrough, both sites (hero, drawer, scroll) | Headless browser, 390×844 | Figures 3, 6; drawers functional | Verified |
| Keyboard focus visibility (skip link, focus ring) | Tab probes + CSS inspection | Gold ring observed on live focus | Verified |
| WCAG contrast ratios for text-bearing pairings | Relative-luminance computation | F-1, F-2 below AA; others pass | Verified |
| HashRouter deep-link behavior | Direct `/worship` navigation probe | Home rendered; soft-404 confirmed | Verified |
| DOM weight and asset weight | performance API + du of images | 277/279 nodes; 2.4/2.7 MB images | Verified |
| Meta description / OG tags presence | index.html inspection (re-checked) | Present on both sites | Verified |
| Header source integrity (suspected corruption) | Hex dump of the flagged line | File intact; display artifact | Verified |
| Transfer-size waterfalls on production CDN | performance entries | Cross-origin sizes zeroed; not measurable here | Unverifiable |

*Every load-bearing claim in this report traces to a row above; the two withdrawn suspicions are recorded in the closing paragraph of Section 2.*

> **Figure 6.** Risen Christ — mobile navigation drawer at 390×844: Fraunces title-case groups, modal focus management, parish stat strip at the foot. (`rc-mobile-drawer.png`)

**Handoff note.** Nothing remains broken. If the recommendations are taken up, the natural commit grouping is: one commit darkening the two chip tones and the date opacity (F-1, F-2, shared file); one commit per site for the router change or hash-rewrite shim (F-3); one commit retitling the Give section on Risen Christ (F-4); and one commit enriching St Mary's News and Events (F-5). Deferred debt, consciously accepted by the design as documented tradeoffs: hash-based routing until a host rewrite is available, and synthetic parish photography until real assets are supplied.

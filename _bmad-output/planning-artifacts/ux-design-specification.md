---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/project-context.md'
workflowType: 'ux-design'
project_name: 'FlavorLab™'
user_name: 'Pentalisman'
date: '2026-03-28'
---

# UX Design Specification — FlavorLab™

**Author:** Pentalisman
**Date:** 2026-03-28

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

---

## Executive Summary

### Project Vision

FlavorLab™ is a science-based ingredient pairing web application that translates molecular chemistry into everyday cooking guidance. The product's dual trust signal — a Science Score derived from compound affinity data and a Hive Score from community ratings — distinguishes it from both static flavor reference tools and AI assistants that produce unverifiable pairings.

**Core reframe (First Principles):** FlavorLab is not a food app. It is a **confidence-delivery mechanism** for culinary experimentation. Every element on screen — science cards, scores, community ratings, email gates, failure cards — is infrastructure for a single user decision: *"Will this taste good together?"* The UX is only successful if the user leaves with either a decision (I'll try this) or a useful question (I need to try this to find out).

The UX goal is to deliver the "aha moment" — a user searches, reads the science, tries the pairing, and submits their first rating — in a single session, on mobile, with zero friction to entry.

### Target Users

**Primary — Home Cook (Maya):** Mobile-first, cooking daily, wants fast answers with enough science to feel confident. Not a scientist — needs plain English as the headline, with compound names available as expandable depth underneath. Her entry point is "what goes with [ingredient I already have]?". She rates when she feels the product has earned it — at emotional peak, after a pairing she loved, not before she's seen value.

**Secondary — Professional Chef (Marco):** Desktop-first, batch queries, wants exportable reports and menu-level harmony analysis. Tolerates and expects more complexity. Pro tier target. Evaluates FlavorLab on data depth, not simplicity.

**Tertiary — Food Business:** API consumer. Not a UX persona — they interact through code. Enterprise tier.

### Key Design Challenges

**1. Trust bridge — plain English first, science as proof:**
Molecular science must feel credible without being intimidating. The dual-layer explanation (compound + plain English) must be visually inverted from the technical spec: **plain-English "why it works" is the headline; compound names are expandable depth below.** Leading with "linalool and caryophyllene" loses Maya in the first second. The science is the proof that the plain English is true — not the other way around.

**2. Email gate as earned celebration, not toll:**
The OTP flow before rating must feel like a fair value exchange at the right moment. Two rules:
- The email ask must appear **before** star selection, not after — a gate that appears after the commitment reads as bait-and-switch, not exchange
- Copy framing must be social proof + celebration: *"Join 2,400 people who rated this pairing"* lands differently than *"Enter your email to submit"*
- localStorage persistence (one-time ask) is critical to the repeat-visit experience

**3. Confidence tier as visible promise management:**
Users distrust things that look confident but might be wrong. Showing `RECIPE_CO_OCCURRENCE` data with the same visual weight as `GC_MS_EXPERIMENTAL` data is a trust violation. The confidence tier must be present and visually hierarchical in the science card — not buried. This is the mechanism by which FlavorLab manages its credibility promises.

**4. Science depth on mobile — progressive disclosure:**
Compound Venn diagrams, confidence tiers, cuisine context flags, and score breakdowns must survive a 390px screen without losing meaning. The Venn → compact compound list fallback requires an **explicit design specification**, not just a CSS breakpoint. The transition rule must define what information is preserved and what is deferred to tap-to-expand.

**5. Contested pairing tension — surface it, don't hide it:**
When Science Score and Hive Score diverge significantly, this is product content, not a UI inconsistency. The design must make this tension visible and interesting. The "Confidence Ring" visualization (see Design Opportunities) addresses this directly.

**6. Empty states need as much design as full states:**
A Hive Score of "Be the first to rate!" next to a pairing with 847 ratings makes the product feel half-finished. Empty Hive Score states must be designed to feel exciting (first-mover invitation) rather than incomplete (data not yet available).

### Design Opportunities

**1. The Confidence Ring — novel dual-score visualization:**
Replace two separate score numbers with a single ring: outer arc = Science Score, inner fill = Hive Score. Full ring = science and community agree. Wide gap = contested pairing. Full inner, partial outer = discovered pairing (community loves it more than chemistry predicts). The gap between scores becomes a visual design feature — and an instantly legible invitation to explore why. This pattern is genuinely novel; no competitor visualizes the relationship between scores. Consider as a design patent candidate.

**2. Contested pairings as editorial moments:**
Science/community score divergence is unique product content. A UI pattern that makes this tension visible — and frames it as discovery rather than inconsistency — creates sharing moments and return visits no competitor can replicate. The most-contested pairing of the week is more interesting as a First Pairing Magic hook than any editorial pick.

**3. The failure card as brand differentiator:**
"Why It Fails" celebrates incompatibility as flavor education. Framed correctly — *"Here's why this doesn't work — and what it teaches you about flavor"* — it's the most memorable screen in the product and the clearest expression of FlavorLab's brand promise: we tell you the truth, with the science to back it up.

**4. Progressive trust → progressive commitment funnel:**
Anonymous browse → email-verified rater → saved preferences → Pro account. Each step has a natural value exchange. The UX can guide this funnel through ambient cues (not interstitials): the dietary filter context layer persists on search, the rating history nudges toward saved preferences, the export button nudges toward Pro.

**5. Science card as share card:**
The science card content — compound names, aroma families, why-it-works text — is natively shareable. "I just learned that garlic and chocolate both contain allyl disulfide" is a tweet. Build a share action that auto-formats the key insight as a social card. Viral growth mechanism embedded in the product's core feature.

**6. Rating widget: pre-try intent + post-try experience split:**
A user who rates a pairing immediately after viewing it (pre-try) and a user who rates after cooking it (post-try) are submitting meaningfully different signals. Capturing both — intent before, experience after — produces the delta that makes the Hive Score genuinely interesting: pairings people expect to love but don't, and pairings people are skeptical of but discover they love.

**7. Dietary filter as ambient context layer:**
The dietary filter should live as a persistent context tag beneath the search input ("Showing Vegan results ×"), not as a modal panel invoked separately. One tap removes it. The filter is not a separate step — it is a standing context that shapes every search until dismissed. Less friction, more ambient intelligence.

**8. Aroma families as the accessible layer:**
Instead of leading with "linalool and caryophyllene," lead with their aroma family: "floral/herbal terpenes." The compound name is available on tap-to-expand. This preserves full scientific accuracy while removing the intimidation floor for Maya — she understands "herbal + floral" even if she can't place "caryophyllene."

**9. Follow-up email as re-engagement hook:**
The 7-day follow-up email should not be a generic "How was your experience?" survey. It should be pairing-specific: *"You rated garlic + chocolate 2 stars. 847 other people disagreed — here's why."* This is product content delivered to the inbox — a re-engagement mechanism, not a feedback form.

---

### A+P Session — Key Decisions Incorporated

| Decision | Rationale |
|---|---|
| Plain-English first, compound names expandable | Maya closes the app if chemistry leads; the science is proof, not headline |
| Email modal before star selection | Post-commitment ask reads as dark pattern; pre-selection reads as gate |
| Confidence tier visible + visually hierarchical | Trust requires honest representation of certainty |
| Venn → list: explicit design spec | Breakpoint without spec = broken on real devices |
| Confidence Ring replaces dual score numbers | Novel, legible, makes score gap a feature |
| First Pairing Magic = most-contested pairing | Better product identity expression than editorial pick |
| Dietary filter as ambient layer | Less modal friction, more ambient intelligence |
| Rating split: intent + experience | Higher data quality; the delta is the Hive Score's moat |
| Science card includes share action | Viral growth embedded in core feature |
| Follow-up email = re-engagement hook | Pairing-specific content, not generic survey |

---

## Core User Experience

### Defining Experience

The single most important user action in FlavorLab is the **ingredient search and result evaluation** — typing one ingredient and receiving a ranked list of compatible pairings with enough science and community signal to make a decision in under 30 seconds.

This is not a discovery app. It is a decision-support app. The core loop is:

1. **Search** — type an ingredient you have (or want to use)
2. **Scan** — read the ranked results; confidence tier drives ranking order (`GC_MS_EXPERIMENTAL` results rank above `RECIPE_CO_OCCURRENCE` at equal science scores — confidence tier is a ranking signal, not just a display badge)
3. **Dive** — open the science card for a pairing that looks promising
4. **Decide** — leave with a yes (I'll try this), a no (I understand why not), or a useful question (I need to cook this to find out)
5. **Rate** — if the decision leads to a kitchen experiment, come back and rate; email gate appears here as earned celebration

Every screen element exists to accelerate this loop. Anything that does not serve the loop is removed.

**First Pairing Magic:** New users who have never searched see a curated example pairing as a zero-state — not a blank prompt. The selected pairing is the most-contested pairing of the week (large gap between Science Score and Hive Score), which immediately demonstrates the dual-signal product identity. First Pairing Magic is dismissed on first search; the localStorage flag that tracks this dismissal is the same flag that controls search autofocus (see Platform Strategy).

### Platform Strategy

**Primary:** Mobile web (390px reference device, 360px explicit hard breakpoint). Maya is cooking in her kitchen, phone in hand, often mid-task. The experience must function with one thumb, in poor lighting, at arm's length.

**Secondary:** Desktop web. Marco is running batch research from his workstation. The same responsive layout serves desktop — no separate desktop product at MVP.

**No native app at MVP.** Web-first preserves a single codebase and avoids app store friction for the email-OTP verification flow.

**Touch-first interaction model:** All primary interactions (search, browse, open science card, rate) are single-tap or swipe. Hover states are secondary affordances — the primary state must always be visible without hover.

**Autofocus policy:** Search input autofocus is **suppressed on the first visit** (First Pairing Magic is active; keyboard pop would collapse it). Autofocus is **active on all return visits**. The controlling condition is the same localStorage flag (`flavorlab.firstVisitComplete`) that tracks First Pairing Magic dismissal — no separate flag.

**At 360px (explicit breakpoint, not just CSS):**
- Compound Venn diagram is replaced by a compact compound list (max 4 compounds, expandable)
- Science card aroma families are the visible layer; compound names are behind tap-to-expand
- Confidence tier badge is icon-only (no label text); label appears on tap
- Confidence Ring SVG scales to 64px minimum; below this size the ring is replaced by two stacked score numbers

**Offline:** No offline functionality at MVP. The data is too dynamic (Hive Score) to cache meaningfully. A cached-result state for the last-viewed pairing is a Post-MVP consideration.

**Cache warm-up and degraded mode:** The landing page pre-fetches the top 20 search results for the most common 50 ingredient queries on first load (background request after FCP). If the API is unreachable, the UI shows a degraded-mode banner ("Science data temporarily unavailable — showing community scores only") rather than a broken state.

### Effortless Interactions

**1. Search with zero setup:** No account, no preferences, no onboarding flow before the first search. Type and get results. The dietary filter is available as an ambient context layer (persistent tag below the search input) — one tap to activate, one tap to remove.

**2. Science card expand:** The transition from result row to science card should feel like lifting a curtain, not loading a new page. Target: under 150ms perceived latency (use skeleton loading state if needed). The expand trigger copy is **"See the chemistry →"** (not "Show compounds ↓") — it promises a revelation, not a list.

**3. Rating with email gate as earned moment:** The rating widget appears after the user has read the science card (not on the result row). The email gate appears **before star selection**, framed as social proof: *"Join [N] people who rated this pairing."* Once verified, the email is stored in localStorage — the gate never appears again in the same browser. Stars, submit. Two taps post-verification.

**4. localStorage-cleared state:** Any feature that depends on localStorage (First Pairing Magic suppression, email verification, dietary filter preference, Confidence Ring legend dismissal) must have a designed empty state for private/incognito browsing and for cleared storage. These states must not feel like errors — they must feel like fresh starts.

**5. Plain-English copy at scale:** The plain-English "why it works" explanation is the headline of every science card. **On mobile, this must fit in one sentence without truncation** — no "Read more" on the headline copy. For the top 500 highest-traffic pairings, this copy is hand-curated. For all other pairings, an aroma family template generates it automatically: *"Both share [aroma family] aromatic compounds — expect a [effect] quality when combined."*

### Critical Success Moments

**1. The first result that surprises:** A user searches "strawberry" and sees "black pepper" ranked #3, with a Science Score of 84. She wouldn't have guessed that. She taps the card. The science card explains: shared methyl hexanoate creates a fruity-spicy bridge. She closes it thinking: *"I have to try this."* This is the aha moment. It happens in under 30 seconds from search.

**2. The first rating after a kitchen experiment:** A user who tried a pairing comes back to rate it. The email gate appears. She enters her email — the copy says *"Join 847 people who rated strawberry + black pepper."* She's not registering for an account. She's joining a community of people who also tried this. She submits 5 stars. The product has now created a loyalty loop.

**3. The contested pairing discovery moment:** The Confidence Ring shows a large gap — the Science Score is 72 but the Hive Score is 31. The product explains: *"Chemistry says compatible. Cooks consistently disagree — possibly a texture issue chemistry can't capture."* The user thinks: *"This app is honest. It knows what it doesn't know."* Trust is established. This message is generated by the template-based contested pairing explanation system (triggered at `|science_score - hive_score| ≥ 30 AND hive_vote_count ≥ 20`; direction × `confidenceTier` × `cuisineContext` determines which template fires).

**4. The Confidence Ring legend — once, not forever:** The first time a user encounters a contested pairing (Confidence Ring with a visible gap), an inline legend explains the visualization: outer arc = science, inner fill = community. One tap dismisses it. It never appears again in that browser. The learnability moment is timed to when it matters.

**5. The failure card:** A search for two highly incompatible ingredients returns a "Why It Fails" card before the (empty or sparse) results list. This is not a dead end — it's the product's most honest moment. Framed as flavor education (*"Here's why these clash — and what it teaches you about flavor"*), it becomes the most memorable screen in the product.

**Make-or-break flows:**
- Search → result in < 2 seconds (p95 latency under load)
- Science card expand → content visible before 150ms
- Email OTP → delivered within 60 seconds (Resend reliability)
- Rating submission → confirmation within 500ms
- First Pairing Magic → loads as part of initial page render, not a secondary request

**30-second session optimization:** A returning user who has already rated several pairings and comes back without a specific ingredient in mind should find value within 30 seconds: the most-contested pairing of the week, their recent ratings with community comparison, or a suggested pairing based on their filter history. These are re-acquisition hooks, not features for the first visit.

### Experience Principles

**1. Decision before detail.** The user's primary job is to decide whether to try a pairing. Plain-English confidence comes first; compound chemistry is available on demand. Never lead with what the user doesn't need yet.

**2. Earn the ask, then ask once.** The email gate is a fair exchange — but only at the moment of peak engagement (post-science card, post-decision). Once earned, never ask again in the same browser. Every permission ask must have an obvious value exchange visible before the ask.

**3. Confidence tiers are promises, not decorations.** `GC_MS_EXPERIMENTAL` data makes a stronger promise than `RECIPE_CO_OCCURRENCE` data. The confidence tier must be visually present, visually hierarchical, and must influence result ranking. Showing weak data with the same weight as strong data is a trust violation.

**4. Progressive reveal, not progressive friction.** Science depth is available — but it must be reached by going deeper, never by clearing a gate. The only gate in the product is the email-OTP for rating. Everything else is tap-to-expand. *(Pro-tier exception: features above the free tier may show a "what you'd get" preview before a "Upgrade to Pro" prompt — teasing before commitment, not gating without preview.)*

**5. Surface tension, don't hide it.** When Science Score and Hive Score diverge, this is product content. The design makes this tension visible (Confidence Ring gap) and explains it (contested pairing template). Users who understand why scores disagree trust the product more than users who only see agreement.

**6. The mobile experience is the product.** Desktop is additive. Every design decision is made mobile-first; desktop inherits. The 360px breakpoint is a hard constraint, not a best-effort target.

---

### A+P Session — Core Experience Additions

| Addition | Source | Rationale |
|---|---|---|
| Expand trigger: "See the chemistry →" not "Show compounds ↓" | User Persona Focus Group | Promises revelation; matches Maya's emotional register |
| Principle 4: Pro-tier tease-before-commitment exception | Pre-mortem Analysis | Prevents gating without context feeling like a dark pattern |
| Cache warm-up + degraded-mode banner | Pre-mortem Analysis | API outage must not produce a broken, blank state |
| 360px as explicit hard breakpoint (not CSS-only) | Cross-Functional War Room | Breakpoint without spec = broken on real devices per Design Challenge #4 |
| localStorage-cleared state design for all dependent features | Cross-Functional War Room | Private browsing and cleared storage are real, frequent conditions |
| First Pairing Magic requires real visual production investment | Cross-Functional War Room | A low-quality zero state is worse than no zero state |
| Autofocus: suppressed first visit, active on returns (same localStorage flag) | Cross-Functional War Room | Keyboard collapse destroys First Pairing Magic; returns users want speed |
| Plain-English headline: one sentence max on mobile, no truncation | User Persona Focus Group | "Read more" on the headline copy breaks the trust-first hierarchy |
| `confidence_tier` as ranking signal, not display-only | Reverse Engineering | GC_MS results rank above RECIPE_CO_OCCURRENCE at equal science scores |
| Curated copy for top 500 pairings; aroma templates for rest | Reverse Engineering | Cannot hand-write 35,440 pairings; template covers 95% of cases adequately |
| Confidence Ring legend: once, on first contested pairing, dismissed to localStorage | Reverse Engineering | Novel visualization needs a learning moment timed to when it matters |
| Cook's View / Science View toggle | What If Scenarios | Future direction: simplify the card further for cooks who want less science |
| 30-second session optimization for re-acquisition | What If Scenarios | Return users without a specific ingredient need value within 30 seconds |

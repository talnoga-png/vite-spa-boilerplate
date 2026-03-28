---
stepsCompleted: [1, 2, 3]
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

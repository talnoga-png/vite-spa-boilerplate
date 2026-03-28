---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
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

---

## Desired Emotional Response

### Primary Emotional Goals

FlavorLab's primary emotional goal is **confident curiosity** — the feeling of knowing enough science to trust a pairing, combined with a genuine desire to go test it in the kitchen. This is a rarer and more valuable emotional state than either pure excitement (which doesn't survive the commute home) or mere efficiency (which doesn't create loyalty).

The three primary emotions the product must deliver, in order of priority:

**1. Intellectual confidence** — *"I understand why this works."*
Not "I trust an algorithm." Not "the app said so." Confidence that comes from understanding: the user read the plain-English explanation, saw the science behind it, and now has a mental model she can apply to other pairings. This is what distinguishes FlavorLab from a recommendation engine — it teaches, not just suggests.

**2. Delight at the unexpected** — *"I never would have guessed that."*
The first result that surprises — strawberry + black pepper, chocolate + blue cheese, lavender + lamb — creates a shareable emotional moment. This is the emotion that drives word-of-mouth. The product earns it through the quality of its pairing selections and the surprise value of the Science Score relative to expectation.

**3. Trust through honesty** — *"This product tells me the truth."*
When the product says "chemistry says compatible, but cooks consistently disagree," users feel something rarer than delight: they feel respected. The contested pairing system and the failure card are the product's most trust-building moments precisely because they don't oversell. A product that admits its own uncertainty is one users return to.

### Emotional Journey Mapping

**On first arrival (First Pairing Magic active):**
Emotion target: *curiosity, not overwhelm*
The user sees one pairing — the most-contested pairing of the week — as a zero-state. No choices, no grid of options. One question: "Does science and community agree on this pairing? Tap to find out." The Confidence Ring is the entire UI at this moment. Overwhelm is impossible when there's only one thing to look at.

**During search and scanning results:**
Emotion target: *anticipation and recognition*
The search response feels instant (< 2s p95). The ranked results list is scannable: ingredient name, confidence tier badge, Science Score, Hive Score. The user recognizes familiar ingredients and feels anticipation at the unfamiliar pairings she wouldn't have considered. The confidence tier hierarchy in the ranking order subliminally communicates: "the results at the top are the most reliable."

**Opening a science card:**
Emotion target: *intellectual delight*
The expand animation is the moment of reveal — the card lifts open to show the plain-English explanation first, then the compound layer underneath. The emotion is the same as turning over a card in a magic trick: "Oh — *that's* why." The "See the chemistry →" trigger copy sets up this reveal; "Show compounds ↓" would set up a list, not a revelation.

**Encountering a contested pairing:**
Emotion target: *intrigue, not confusion*
The Confidence Ring gap is visible. The template explanation surfaces. The emotion we want is the feeling of a good puzzle: "The science says yes, but the cooks say no — why?" Not: "This data is inconsistent." The design must work to make the gap feel like a discovery invitation rather than a product bug. The copy and the Confidence Ring visualization do this together.

**At the email gate (before rating):**
Emotion target: *fair exchange, not friction*
The user has just read a science card and decided she wants to rate a pairing she loved. The email modal appears before stars. The copy reads: *"Join [N] people who rated this pairing."* The emotion is: "I'm becoming part of something." Not "I'm being asked to create an account before I can do what I came to do." The distinction is entirely in the framing — the mechanism is identical.

**After submitting a rating:**
Emotion target: *contribution and belonging*
Post-submission, the UI shows how the user's rating affected the Hive Score (or that it will affect it after moderation). The message: *"You're now part of the science."* Not a generic confirmation toast. The user should feel that her experience in the kitchen added a data point to a shared body of knowledge. That is a fundamentally different emotional register than "Rating submitted."

**On return visit:**
Emotion target: *recognition and momentum*
The search autofocus is active. The dietary filter is still set (if she set one). There's no onboarding again. The product remembers. The 7-day follow-up email (if she rated a pairing) brings her back with specific, personal content: *"You rated this 4 stars. Here's what 200 other people thought."* The emotion is the feeling of returning to a conversation already in progress.

**When something goes wrong (error states):**
Emotion target: *calm confidence, not anxiety*
API degraded: "Showing community scores only right now" — matter-of-fact, not alarming. Search returns no results: "We don't have compound data for [ingredient] yet — try [related ingredient]" — honest, redirective, never a dead end. OTP not received: a clear resend path within 60 seconds. Errors must feel like product transparency, not product failure.

### Micro-Emotions

| Micro-emotion pair | Target state | Design mechanism |
|---|---|---|
| Trust vs. Skepticism | Trust | Confidence tier visible, hierarchical, influences ranking |
| Curiosity vs. Overwhelm | Curiosity | Progressive disclosure; one thing at a time |
| Accomplishment vs. Frustration | Accomplishment | Failure card = education, not dead end; contested pairings = intrigue |
| Belonging vs. Isolation | Belonging | Email gate copy as community joining; rating contribution framing |
| Delight vs. Satisfaction | Delight | First surprising result; unexpected pairings ranked prominently |
| Confidence vs. Uncertainty | Confidence | Plain-English headline before compound names; Science Score with tier |
| Intrigue vs. Confusion | Intrigue | Contested pairing template explains the gap; Confidence Ring makes it visual |

The emotion to actively avoid is **anxiety** — the feeling that you might be missing something, that the data might be wrong without knowing how wrong, or that you might be locked out of a feature without understanding the terms. Every design decision that reduces anxiety (honest confidence tiers, transparent email gate, graceful error states) is also a trust investment.

### Design Implications

**Confidence → Hierarchy and progressiveness**
If we want users to feel confident, information hierarchy must match information reliability. The most reliable data (high-confidence tier, high community vote count) appears first and largest. Lower-confidence data is present but visually subordinate. The user never has to wonder "how much should I trust this?" — the visual hierarchy answers for her.

**Delight at the unexpected → Curation of the result set**
Delight requires surprise, and surprise requires that the product shows the user something she wouldn't have found herself. This means the pairing engine must prioritize unexpected-but-valid results over expected ones for high-confidence data. A strawberry + strawberry "pairing" at the top of the strawberry search is not delight — it's a broken search engine.

**Trust through honesty → Contested pairings and failure cards as features**
The failure card and the contested pairing explanation are not edge cases — they are core brand moments. Both must receive the same design polish as the success state. A low-effort error state communicates that the product didn't anticipate this situation; a high-effort "Why It Fails" card communicates that the product designed for it.

**Belonging → Rating widget language**
The rating widget's copy at every stage (gate, confirmation, post-submission) must use community language: "Join [N] people," "You're now part of the science," "See how you compare." Never transactional language ("submit," "confirm," "save"). The user is contributing to a shared body of knowledge, not completing a form.

**Intrigue (not confusion) → Confidence Ring legend timing**
The Confidence Ring gap is only intriguing if the user understands what the gap represents. Showing a gap without explanation produces confusion. Showing the legend on every card produces noise. The solution: show the legend exactly once, on the first contested pairing the user encounters, then trust that she remembers. The timing is the design decision.

### Emotional Design Principles

**1. Teach, don't just recommend.** Every result that generates confidence should also generate understanding. A user who leaves knowing *why* a pairing works is more likely to return than a user who just got a good answer.

**2. Honesty is the most differentiating emotion.** No competitor admits uncertainty. FlavorLab's most distinctive emotional moments are the contested pairing system and the failure card — both of which require the product to acknowledge its own limits. Design these moments with pride, not apology.

**3. Surprise earns trust; expected outputs are forgettable.** The pairings that generate emotional delight are the unexpected ones with high science scores. Surface these prominently. A pairing the user already knew about generates no emotional response worth designing for.

**4. Belonging, not registration.** Every interaction that creates community belonging (rating, seeing community scores, receiving pairing-specific follow-up email) must be framed in community language, not account language. The user is joining a community of cooks, not creating a profile on a service.

**5. Error states are brand moments.** How the product behaves when things go wrong reveals its character more than how it behaves when things go right. Degraded mode, no-results states, OTP failures — all of these must feel like honest product transparency, not silent failures.

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**1. Vivino (wine discovery)**
The closest direct analog to FlavorLab. Vivino solves the same problem in wine that FlavorLab solves in cooking: a user holds an ingredient (bottle) and wants to know if it's worth choosing. Key UX lessons:
- *Community + expert score duality* — Vivino's critic score vs. community rating is structurally identical to Science Score + Hive Score. Users understand that two independent signals are more useful than one blended number.
- *Scan as zero-friction entry* — pointing your camera at a label is the wine equivalent of typing an ingredient: immediate, contextual, no setup. FlavorLab's search input must feel equally low-effort.
- *Vintage context flags* — Vivino shows region and vintage as context tags on every result, analogous to FlavorLab's cuisine context flags. Users learn to read these quickly without needing to understand their full significance.
- *What Vivino gets wrong for FlavorLab:* Vivino surfaces community scores prominently but buries the "why." FlavorLab inverts this: the "why" (plain-English science) is the headline, scores are confirmation.

**2. Rotten Tomatoes (dual-signal trust)**
The Tomatometer + Audience Score is the most recognizable dual-trust-signal UI in consumer software. Every user immediately understands: "critics think X, audiences think Y." The gap between the two scores is interesting, not confusing. This directly validates the Confidence Ring concept. Key lessons:
- *The gap is the content* — Rotten Tomatoes' most shareable moments are the widely-contested films where Tomatometer and Audience Score diverge by 50+ points. The product turns disagreement into editorial. FlavorLab's contested pairing system should achieve the same.
- *Certified Fresh as confidence tier* — the green/red/certified-fresh visual hierarchy is instantly learnable and carries confidence weight. FlavorLab's confidence tier badges need the same immediacy.
- *What Rotten Tomatoes gets wrong:* The dual scores are displayed as two separate numbers with no visualization of their relationship. The Confidence Ring improves on this by making the relationship — specifically the gap — visible at a glance.

**3. iNaturalist (citizen science + expert data)**
iNaturalist maps community-submitted wildlife observations against expert taxonomic data — a direct analog to Hive Score vs. Science Score. Key lessons:
- *Community data improves over time, and that improvement is visible* — iNaturalist shows observation counts; the database gets better as more people contribute. This is the same dynamic FlavorLab's Hive Score needs to embody: voting is contribution, not just opinion.
- *Research grade as confidence tier* — observations that meet scientific criteria are labeled "Research Grade." This gives community contributors a clear signal of what quality looks like. Applicable to FlavorLab's confidence tier display logic.
- *"Be the first to observe this species in your area"* — iNaturalist turns data sparsity into an invitation. FlavorLab's empty Hive Score states should do the same: "Be the first to rate this pairing" is not a failure state, it's a first-mover invitation.

**4. Wolfram Alpha (trusted authority that shows its work)**
Wolfram Alpha is trusted precisely because it shows exactly how it computed its answer — sources, steps, confidence bounds. Users who don't understand the computation still trust it because the transparency is visible. Key lessons:
- *Showing your work is a trust signal even when the viewer doesn't check the work* — the fact that compound names are expandable (even if Maya never taps them) communicates scientific seriousness. The transparency is the trust signal.
- *Units and sources on every answer* — Wolfram never gives an answer without its unit and source. FlavorLab's confidence tier and cuisine context are its equivalents: context that makes every score interpretable, not just a number.

**5. Duolingo (progressive commitment + earned celebration)**
Duolingo turned language learning — a high-friction, long-term commitment — into a series of small, immediately rewarding interactions. Key lessons:
- *The streak as re-engagement mechanic* — Duolingo's streak is effective because it makes return visits feel earned, not prompted. FlavorLab's pairing-specific 7-day follow-up email achieves a similar re-engagement through personalized content rather than a streak counter.
- *Celebration at the moment of completion* — Duolingo's confetti on lesson completion is timed to the exact moment of accomplishment, not 30 seconds later. FlavorLab's post-rating "You're now part of the science" moment needs the same timing precision.
- *What Duolingo gets wrong for FlavorLab:* Duolingo's gamification works for daily habit formation. FlavorLab's use case is episodic (cook-triggered), not daily-habit. Don't import streak mechanics that don't fit the use pattern.

### Transferable UX Patterns

**Navigation patterns:**
- *Single-focus zero state (Vivino scan, Instagram camera)* — present one clear action when the user has no context yet. First Pairing Magic applies this: one pairing, one question, one decision.
- *Persistent ambient filter (Airbnb, Booking.com)* — filters that stay active across searches without requiring re-entry. Direct model for the dietary filter context tag below the search input.
- *Breadcrumb-free deep drill (Apple Settings, Notion)* — back chevron only, no breadcrumb trail. Science card expand/collapse follows this model: the result row is always reachable with one tap back.

**Interaction patterns:**
- *Card reveal / lift animation (Google Now, Apple Wallet)* — a card that expands in-place (not navigates to a new page) feels like revealing what was already there, not loading something new. Science card expand should use this metaphor.
- *Dual-score divergence as editorial content (Rotten Tomatoes)* — the contested state is a feature, not an edge case. The gap between Science Score and Hive Score generates product content that no competitor can replicate.
- *Pre-action framing before commitment (Medium, Substack paywall)* — showing the user what they're joining before asking for a commitment. Applied to: email gate copy ("Join [N] people") appears before star selection, not after.
- *Community-language contribution framing (Wikipedia "edit this page," iNaturalist "add observation")* — users contribute to a shared resource, not "submit data." Rating language follows this model throughout.

**Visual patterns:**
- *Confidence tier as visual hierarchy, not metadata (Rotten Tomatoes Certified Fresh, iNaturalist Research Grade)* — the tier is legible at a glance, not buried in a tooltip. Color + icon together, not text label alone on mobile.
- *Score ring as relationship visualization (Apple Watch activity rings, Fitbit)* — rings that show the relationship between two values are more immediately legible than two separate numbers. Validates the Confidence Ring concept.
- *Aroma/flavor family as accessible label layer (Vivino flavor wheel)* — Vivino's flavor wheel maps wine characteristics to plain-English categories ("fruity," "oaky") before introducing varietal-specific language. FlavorLab's aroma families do the same for compound chemistry.

### Anti-Patterns to Avoid

**1. Interstitial gates before value delivery (Yummly, most recipe apps)**
Yummly asks for dietary preferences, cooking skill level, and household size before showing a single recipe. The user has delivered nothing and is being asked to invest before receiving any proof of value. FlavorLab's principle: one search → immediate results → email gate only at rating, never before value is received.

**2. Blended scores that hide disagreement**
A single "92/100" that averages science data with community ratings hides the most interesting information. When science and community disagree, that disagreement is the product's most valuable editorial content. Never blend scores.

**3. Science-forward copy that loses non-scientists (too many food apps, Yummly's nutrient labels)**
Leading with compound names, chemical formulas, or technical jargon loses Maya in the first sentence. Any copy that requires chemistry knowledge before the value is accessible is a trust violation. The science is proof, not headline.

**4. Empty states that feel like errors**
"No results found." "No ratings yet." "Data unavailable." These copy patterns communicate product failure. Every empty state in FlavorLab must be designed to feel like an invitation: "Be the first to rate," "Try [similar ingredient] instead," "Showing community scores only right now."

**5. Notification requests before engagement (most apps)**
Asking for push notification permission before the user has experienced any value is the app equivalent of a waiter asking for a tip before taking the order. Any permission request in FlavorLab (email, notifications) comes after demonstrated value.

**6. Infinite scroll without entry points**
Infinite scroll creates a sense of abundance but no sense of progress. A ranked list with clear confidence-tier grouping (GC_MS_EXPERIMENTAL at the top, RECIPE_CO_OCCURRENCE below a visual divider) gives users an anchor to navigate from, not a stream to scroll through endlessly.

**7. Generic confirmation toasts**
"Saved." "Submitted." "Done." These confirm that a transaction completed, not that a meaningful thing happened. Post-rating: "You're now part of the science" is a confirmation that carries the brand promise. Never use a generic toast where a brand moment is possible.

### Design Inspiration Strategy

**Adopt directly:**
- *Dual-score divergence as editorial content* (Rotten Tomatoes) — the Confidence Ring gap is the product's most interesting UI state; design it with the same editorial weight as a "Most Contested" editorial section
- *Persistent ambient filter* (Airbnb) — dietary filter as a context tag below search input, always visible, one-tap removal
- *Card reveal in-place* (Apple Wallet, Google Now) — science card expands in-place, not navigates; the result row is the card's collapsed state
- *Community contribution language throughout* (iNaturalist, Wikipedia) — rating = contributing to science, not submitting data

**Adapt for FlavorLab:**
- *Confidence tier visual hierarchy* (Rotten Tomatoes Certified Fresh → FlavorLab tier badges) — adapt the icon+color pattern but design it to communicate "data quality" rather than "critical approval"
- *Score ring visualization* (Apple Watch rings → Confidence Ring) — adapt the ring metaphor to show the relationship between two scores, not progress toward a single goal; the gap is a feature, not a deficit
- *Progressive commitment funnel* (Duolingo streaks → FlavorLab rating → email → Pro) — adapt the concept of earning commitment through value, but replace streak mechanics (wrong use pattern) with pairing-specific re-engagement email

**Avoid entirely:**
- Pre-value gates (Yummly-style onboarding) — zero friction to first result, no exceptions
- Blended scores — Science Score and Hive Score remain separate, always
- Technical-first copy — compound names are always expandable depth, never the headline
- Generic empty states and confirmation toasts — every empty state is an invitation, every confirmation carries brand language

---

## Design System Foundation

### Design System Choice

**Custom design system built on the existing CSS token foundation.**

FlavorLab's current codebase already has the correct starting point: CSS custom properties in `:root`, CSS Grid layouts, and semantic design tokens (`--primary`, `--accent`, `--dark`, `--bg-alt`, `--font-serif`, `--font-sans`). The design system extends this foundation rather than replacing it with a third-party library.

No component library (Material UI, Chakra UI, Ant Design) applies here. FlavorLab is a vanilla JS SPA — React/Vue component libraries are out of scope by architecture. More importantly, the product's most critical UI element — the Confidence Ring — is a bespoke SVG visualization that no library provides. The science card expand animation, the confidence tier badge hierarchy, and the contested pairing tension display all require custom implementation. A third-party system would add constraint and bundle weight without providing the components that actually matter.

**Selected approach:** Bespoke component library built on CSS custom properties, with ARIA patterns drawn from WAI-ARIA Authoring Practices Guide (not from a library, but as a reference spec for accessible interaction patterns).

### Rationale for Selection

**1. The most important UI elements are all custom by necessity.**
The Confidence Ring (novel SVG), the science card expand (bespoke animation), the dietary filter ambient tag, the contested pairing explanation card — none of these exist in any component library. The design system must be built from first principles regardless. Using a third-party system as a base would mean overriding or ignoring most of it.

**2. The existing token system is already sound.**
The `:root` variables define a coherent color palette, typographic scale, and spacing system. The custom design system extends these tokens rather than introducing a parallel token vocabulary. One token system, one source of truth.

**3. Brand differentiation requires full visual control.**
FlavorLab's visual identity — dark forest green (`--primary: #1B4332`), terracotta accent (`--accent: #C8663B`), Playfair Display serif for headings, warm off-white (`--bg-alt: #F2F2EC`) — is precise and intentional. A generic design system's default palette and typography would need to be fully overridden. The overhead is greater than building clean.

**4. Mobile-first performance.**
Vanilla CSS custom properties + CSS Grid has essentially zero bundle overhead. Third-party design systems (even tree-shaken) add JavaScript and CSS payload that impacts FCP on Maya's mobile connection. The performance budget is better spent on the pairing API response than on component library initialization.

### Implementation Approach

**Token layer (existing tokens + additions needed):**

```css
:root {
  /* Color tokens — existing */
  --primary: #1B4332;       /* Dark forest green */
  --accent: #C8663B;        /* Terracotta orange */
  --dark: #0D1A12;          /* Near-black */
  --bg-alt: #F2F2EC;        /* Warm off-white */

  /* Color tokens — new additions */
  --confidence-experimental: #2D6A4F;   /* GC_MS_EXPERIMENTAL tier */
  --confidence-predicted: #74C69D;      /* PREDICTED tier */
  --confidence-occurrence: #B7E4C7;     /* RECIPE_CO_OCCURRENCE tier */
  --science-score-ring: #1B4332;        /* Outer arc of Confidence Ring */
  --hive-score-ring: #C8663B;           /* Inner fill of Confidence Ring */
  --contested-gap: #E9C46A;             /* Contested pairing highlight */
  --error-bg: #FFF3F0;                  /* Degraded mode banner */

  /* Typography tokens — new additions */
  --text-science-label: 0.7rem;         /* Compound name labels */
  --text-confidence-badge: 0.65rem;     /* Confidence tier badge text */

  /* Spacing scale — to be formalized */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 48px;

  /* Motion tokens */
  --duration-reveal: 150ms;             /* Science card expand */
  --duration-fade: 200ms;               /* Toast, overlay transitions */
  --easing-reveal: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Component inventory:**

| Component | Type | Notes |
|---|---|---|
| Search input + dietary tag | Custom | Ambient filter tag below input |
| Result row | Custom | Ingredient pair + confidence badge + scores |
| Science card | Custom | Expand/collapse in-place; plain-English headline, compound expandable |
| Confidence Ring | Custom SVG | Outer arc = Science Score, inner fill = Hive Score |
| Confidence tier badge | Custom | Icon + color; label on tap at 360px |
| Rating widget | Custom | Email gate → star selection → submission |
| Email OTP modal | Custom | Pre-star; social proof copy |
| Contested pairing card | Custom | Template text + gap explanation |
| Failure card | Custom | "Why It Fails" — same visual polish as success |
| Dietary filter tag | Custom | Persistent context below search; one-tap dismiss |
| Empty state (Hive Score) | Custom | First-mover invitation copy |
| Degraded mode banner | Custom | "Showing community scores only" |
| First Pairing Magic | Custom | Full-bleed zero-state; one pairing + Confidence Ring |
| Toast / confirmation | Custom | Brand copy ("You're now part of the science") |

**Accessibility baseline (WAI-ARIA reference):**
- Search input: `role="search"`, `aria-label`
- Result list: `role="list"` + `role="listitem"`
- Science card expand: `aria-expanded`, `aria-controls`
- Modal (email gate): `role="dialog"`, focus trap, `aria-modal="true"`
- Star rating: `role="radiogroup"` + `role="radio"` per star
- Confidence Ring SVG: `aria-label` with text equivalent ("Science Score 84, Hive Score 31")

### Customization Strategy

**Phase 1 (MVP) — formalize what exists, add what's missing:**
1. Document all existing CSS variables as the official token set
2. Add new tokens for confidence tiers, ring colors, contested pairing state
3. Add spacing scale tokens (currently implicit in the stylesheet)
4. Add motion tokens for reveal animations
5. Build the Confidence Ring as a reusable SVG component with JS props (science score, hive score → arc lengths)
6. Build the science card expand pattern as a reusable JS behavior

**Phase 2 (Post-MVP) — component library extraction:**
As the product grows (Pro tier, Chef's Notebook, menu analysis), extract the component patterns into a documented component library with component states, do/don't guidance, and accessibility notes.

**What to never adopt:**
- Runtime CSS-in-JS — no React in the stack; adds overhead with no benefit
- Tailwind utility classes — conflicts with the semantic custom-property approach; two styling systems = maintenance burden
- Third-party icon libraries — SVG icons inline, optimized per component; no icon font overhead

---

## Defining Interaction

### Defining Experience

**FlavorLab's defining experience: "Type an ingredient. Discover what it pairs with — and understand exactly why."**

The core interaction that, if perfected, makes everything else follow:

> *A user types "strawberry." In under two seconds, she sees a ranked list of compatible ingredients — black pepper at #3, with a Science Score of 84. She wouldn't have predicted that. She taps the row. The card lifts open. The headline reads: "A fruity-spicy bridge — shared methyl hexanoate creates intensity without competition." Below it, expandable: the compound names. She closes it thinking: "I have to try this." That is FlavorLab working.*

The defining experience is the **search → ranked result → science card reveal** sequence. Everything else in the product — the Confidence Ring, the email gate, the rating widget, the failure card — is infrastructure for this moment or its consequences.

### User Mental Model

**How users currently solve the pairing problem:**
- Google search: "what goes with strawberry" → recipe blogs, generic flavor guides, AI chatbots
- Cookbooks and flavor bibles (Niki Segnit's "The Flavor Thesaurus") — slow, requires physical access, no community signal
- Asking a chef or food-savvy friend — high quality but unavailable on demand
- Intuition and trial-and-error — the dominant approach, the one FlavorLab replaces

**What mental model users bring:**
Maya arrives with the "ingredient I have" mental model, not the "cuisine + flavor profile" mental model. She is asking "what do I put with this strawberry?" — not "what flavor families pair with the terpene profile of strawberry?" The product must meet her at her level. She expects search to work like Google: instant, forgiving of partial input, ranked by relevance. She does not expect to understand the scoring system before she can use the product — the visual hierarchy (confidence tier, Science Score, Hive Score) must be immediately legible without prior knowledge.

**What users love about existing approaches:**
- Flavor bibles: depth, authority, serendipitous discovery
- AI assistants: conversational, natural language, always available
- Community forums: real cook experience, emotional validation

**What users hate about existing approaches:**
- Flavor bibles: slow, no community signal, no confidence level on suggestions
- AI assistants: no verifiable source, can confidently suggest wrong pairings
- Community forums: no science backing, hard to distinguish quality opinions from noise

**FlavorLab's position:** takes what users love from each source and eliminates what they hate. The dual-score system is the product's answer to both the AI's verifiability problem and the community forum's noise problem.

### Success Criteria

**The search experience is successful when:**
- Results appear within 2 seconds (p95 under load)
- The top result is genuinely surprising but scientifically valid — not the obvious pairing
- Confidence tier differences are visible in the ranking without requiring explanation
- The dietary filter context tag reflects the user's standing preference without re-entry

**The science card is successful when:**
- It expands in under 150ms (perceived — skeleton if needed)
- The plain-English explanation fits in one sentence at 360px without truncation
- The user understands the pairing rationale without tapping into compound-level detail
- The Confidence Ring is legible at first glance (no legend needed for scores; legend appears only on first contested pairing)

**The overall session is successful when:**
- The user leaves with a decision (yes/no/try it) within 30 seconds of their first search
- At least one result produced a "I wouldn't have thought of that" reaction
- Return visit rate ≥ 40% within 7 days

**The email gate is successful when:**
- Conversion rate ≥ 25% (users who see the gate and complete it)
- Zero "Why do I need to give my email just to rate?" friction signals in user feedback
- localStorage persistence means the gate is never seen twice in the same browser

### Novel vs. Established Patterns

**Established patterns — adopt directly:**

| Pattern | Where used | Why established works |
|---|---|---|
| Instant search with ranked results | Primary search | Users expect Google-level immediacy; don't reinvent |
| Card expand in-place | Science card reveal | Mobile standard; no learning curve |
| Star rating widget | Hive Score submission | Universal; no cognitive overhead |
| Modal with focus trap | Email OTP gate | Standard accessibility pattern for blocking interactions |
| Persistent filter tag | Dietary ambient layer | Familiar from Airbnb, Booking.com; no explanation needed |

**Novel patterns — require design investment:**

| Pattern | What makes it novel | Teaching mechanism |
|---|---|---|
| Confidence Ring | No competitor visualizes score relationship as a ring gap | Inline legend on first contested pairing; dismissed once to localStorage |
| Dual-score divergence as content | Gap between scores is surfaced, named, explained — not hidden | Contested pairing template copy + Confidence Ring visual |
| Confidence tier as ranking signal | Most apps rank by relevance; FlavorLab ranks by data quality | Visible tier badges on ranked results create implicit understanding |
| Failure card as brand moment | Incompatibility presented as education, not dead end | Same design polish as success state + educational headline copy |
| Email gate as community entry | Pre-commitment framing before star selection | "Join [N] people" copy + timing (after science card, before stars) |

### Experience Mechanics

**The search → result → science card flow:**

**1. Initiation:**
- *First visit:* First Pairing Magic fills the screen. Search input visible but not autofocused (keyboard suppressed). User either taps the featured pairing or types into the search input.
- *Return visits:* Search input autofocused. Dietary filter tag set (if previously set). User types immediately.
- Any keystroke dismisses First Pairing Magic and surfaces the result list.

**2. Search interaction:**
- Debounced (300ms), min 2 characters to fire. No search button — results update live.
- Results ranked: `GC_MS_EXPERIMENTAL` tier ranks above `RECIPE_CO_OCCURRENCE` at equal science scores.
- Result row anatomy: `[Ingredient name] [Confidence tier badge] [Science Score] [Hive Score ring]`
- Dietary filter tag persists below the input: "Showing Vegan results ×"

**3. Science card expand:**
- Tapped row lifts open in-place (150ms, `--easing-reveal`). No page navigation.
- Card anatomy (top to bottom):
  - Confidence Ring (SVG, 80px mobile) — outer arc = Science Score, inner fill = Hive Score
  - Plain-English headline (one sentence, serif, never truncated at 360px)
  - Aroma family labels ("floral / herbal terpenes") — visible without tapping
  - "See the chemistry →" — reveals compound names on tap
  - Cuisine context flag (if applicable)
  - Confidence tier pill — "Experimentally confirmed (GC-MS)"
  - Rating widget

**4. Compound depth (optional):**
- "See the chemistry →" tap reveals compound names, aroma descriptors, shared compound count.
- At 360px: Venn diagram replaced by compact compound list (max 4, expandable).

**5. Contested pairing (conditional):**
- Triggers: `|science_score - hive_score| ≥ 30 AND hive_vote_count ≥ 20`
- Confidence Ring shows a visible gap.
- First contested pairing this browser: inline legend appears (one tap dismisses permanently).
- Contested pairing explanation card appears below science card.

**6. Rating flow:**
- "Rate this pairing" below the science card (not on result row).
- Not email-verified: email modal fires before stars. Social proof copy + email input + OTP.
- OTP verified: modal dismisses, email to localStorage. Stars appear: 1–5 + intent/experience toggle.

**7. Rating completion:**
- Submit: optimistic UI updates Hive Score. Hive ring animates.
- Confirmation: "You're now part of the science." (brand copy, not toast).
- 7-day follow-up email queued (one per email address, ever).

**8. Failure card (conditional):**
- Triggers: Science Score < 30 OR explicit incompatibility flag.
- Failure card at top of results: "Why [A] + [B] Don't Work" — plain-English explanation + flavor education angle.
- Same visual polish as success science card.

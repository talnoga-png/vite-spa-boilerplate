---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-complete']
status: complete
inputDocuments:
  - '_bmad-output/brainstorming/brainstorming-session-2026-03-24.md'
  - '_bmad-output/planning-artifacts/flavorGraph-research.md'
  - '_bmad-output/project-context.md'
  - 'index.html'
  - 'src/main.js'
  - 'src/style.css'
workflowType: 'prd'
documentCounts:
  briefCount: 0
  researchCount: 1
  brainstormingCount: 1
  projectDocsCount: 3
classification:
  projectType: 'Full-stack Consumer SaaS Web Application with B2B API layer'
  domain: 'Food Technology / Culinary Science'
  complexity: 'Medium-High'
  projectContext: 'brownfield'
---

# Product Requirements Document — FlavorLab™

**Author:** Pentalisman
**Date:** 2026-03-25

---

## Executive Summary

FlavorLab™ is a science-based ingredient pairing web application that solves the daily creativity gap most home cooks experience. Users input ingredients they have on hand and receive ranked pairing suggestions backed by molecular chemistry data — with plain-English explanations of *why* each combination works or fails. The product's dual trust signal — a Science Score derived from 147,000 compound-based pairings (FlavorGraph dataset) and a Hive Score from community ratings — distinguishes it from both static flavor tools and generic AI assistants that hallucinate pairings with no scientific basis.

The product serves three personas under a freemium model: **Home Cooks** (free forever, full science access), **Professional Chefs** (Pro tier — menu analysis, Chef's Notebook, exportable reports), and **Food Businesses** (API/Enterprise tier — bulk R&D queries, trend intelligence, raw compound data). All tiers receive the same science depth; higher tiers unlock professional tooling and data access.

FlavorLab's long-term value compounds over time: every user interaction feeds the community data flywheel, making pairings more trustworthy; every session teaches users a flavor principle, deepening engagement and reducing churn. The goal is not a tool users consult — it's a platform that gradually turns home cooks into confident, principle-driven cooks who understand flavor at a molecular level.

### What Makes This Special

Three compounding moats differentiate FlavorLab from any LLM-based competitor:

1. **Verified molecular data** — Pairings are derived from FlavorGraph's 147,000 compound-similarity edges across 8,000 ingredients, not AI inference. Every suggestion is traceable to real chemistry.
2. **Dual scoring (Science + Hive)** — No existing tool combines molecular science with live community validation. The gap between what chemistry predicts and what humans confirm is itself valuable signal.
3. **Progressive education** — FlavorLab is the only pairing tool designed to make itself less necessary over time. Users who understand flavor principles become ambassadors, contributors, and long-term paying customers.

**One-line product truth:** *FlavorLab turns your random ingredients into inspired meals — and quietly teaches you to think like a chef.*

## Project Classification

- **Project Type:** Full-stack Consumer SaaS Web Application with B2B API layer
- **Domain:** Food Technology / Culinary Science
- **Complexity:** Medium-High — novel data pipeline (FlavorGraph ETL → MongoDB), three user tiers, community scoring system, brownfield frontend expansion
- **Project Context:** Brownfield — existing vanilla JS SPA (FlavorLab™ marketing/landing page) being expanded into a full product with backend, database, API, and feature-rich frontend

---

## Success Criteria

### User Success
A home cook has succeeded when they return to FlavorLab at least **once per month** — realistic given that people cook daily but experiment with new combinations periodically. The primary retention signal is habitual return, not one-time usage.

**The "aha" moment:** A user searches for an ingredient they have, receives a pairing result with a Science Score + Hive Score + "why it works" explanation, tries it, and submits their first community rating. This completes the core value loop and is the target first-session outcome.

**User success metrics:**
- **Monthly Active Return Rate:** ≥ 30% of email-verified users return at least once per month
- **First Pairing Completion Rate:** ≥ 70% of new visitors complete a full pairing search in their first session
- **Email Capture Rate:** ≥ 25% of users who view a pairing result provide their email to submit a rating
- **Community Participation Rate:** ≥ 15% of email-verified users submit at least one pairing rating per month
- **Session-to-Rating Conversion:** ≥ 20% of pairing searches result in a community rating

### Business Success

**3-Month Milestones (Data Flywheel Phase):**
- Weekly Active Users growing ≥ 10% week-over-week
- Community ratings database reaches ≥ 5,000 ratings across ≥ 500 unique pairings
- First organic referrals appearing
- Week-over-week user growth rate ≥ 10%

**12-Month Milestones (Monetisation Validation Phase):**
- **Pro subscribers:** ≥ 50 paying Pro accounts
- **API customers:** ≥ 50 paying API/Enterprise accounts
- **Referral rate:** ≥ 20% of new users arriving via referral
- **Sharing rate:** ≥ 8% of pairing results actively shared
- **W-o-W growth:** ≥ 10% through Month 6, tapering to ≥ 5% by Month 12

### Technical Success
- Pairing search response time ≤ 300ms (p95)
- MongoDB fully seeded: ≥ 8,000 ingredients, ≥ 147,000 pairings
- API uptime ≥ 99.5% monthly
- Zero hallucinated pairings — every result traceable to a real FlavorGraph edge
- Dietary/allergen filter accuracy: zero false negatives

### Measurable Outcomes

| Metric | 3-Month Target | 12-Month Target |
|---|---|---|
| Weekly Active Users | Growing ≥10% WoW | Established base |
| Community Ratings | ≥ 5,000 | ≥ 50,000 |
| Monthly Return Rate | ≥ 20% | ≥ 30% |
| Pro Subscribers | First paying customer | ≥ 50 |
| API Customers | First paying customer | ≥ 50 |
| Referral Rate | ≥ 10% | ≥ 20% |
| Sharing Rate | ≥ 5% | ≥ 8% |

---

## Product Scope

### MVP — Minimum Viable Product
- FlavorGraph ETL pipeline (MongoDB seed — prerequisite for all features)
- Ingredient Oracle — search 1+ ingredients, receive ranked pairing results
- Science Score — compound-based match percentage
- Dual-Layer Explanation — scientific name + plain-English why it works/fails
- Hive Score — community rating system
- Dietary & Allergen Filter — localStorage, no signup required
- Smart Autocomplete Tiles — ingredient suggestions on type
- Compound Venn Visual — shared compound diagram
- First Pairing Magic — single result for first-time visitors
- Why It Fails — science of incompatibility
- Zero Friction Entry — no signup for core features
- Freemium model — free tier functional, Pro/API scaffolded

### Growth Features (Post-MVP)
Fridge Mode, Substitute Mode, Trending This Week, Frontier Feed + Pioneer Badge, History Layer (cultural stories), Beverage coverage, Chef's Notebook (Pro), Embeddable Widget, Flavor Science Blog, Mini-Course, Menu Harmony Analysis (Pro)

### Vision (Future Roadmap)
Public Developer API, Culinary School licensing, Personal Flavor Profile, User-submitted pairings, Dish Lens (camera scanner), Cross-device sync, Pairing Memory

---

## Competitive Analysis

### Market Context

The recipe app market is valued at $1.25B in 2024, growing at 13.2% CAGR to $2.32B by 2029. The AI in Food & Beverage market is larger and faster: $8.45–11.75B in 2024, projected to reach $50.6B by 2030 at ~29–39% CAGR. The molecular gastronomy equipment segment is growing at 9.5% CAGR — almost entirely professional today, with home cooks significantly underserved. 36% of global consumers already express interest in using AI assistants for food creation. The market exists and is growing; the science-forward consumer tier within it is essentially unoccupied.

Two recent signals reinforce FlavorLab's timing:
- **Yummly shut down December 20, 2024.** Whirlpool acquired it for $100M in 2017, pivoted to generative AI, laid off the entire team in April 2024, and shut the product permanently. 2+ million users (many paying $2.99–4.99/month) were left without their primary AI cooking assistant. This is an addressable displaced audience.
- **Food52 filed for Chapter 11 bankruptcy December 29, 2025.** Revenue fell from $160M to $74.7M as its content-to-commerce model collapsed. The lesson: community content platforms in food need product/SaaS revenue, not just ad/media revenue. FlavorLab's freemium + Pro + API model is structurally different.

---

### Direct Competitors — Flavor Pairing & Molecular Tools

#### Foodpairing (foodpairing.com)
**The closest direct competitor — and the widest opportunity.**

Founded 2009 in Belgium; early collaborator with Heston Blumenthal. Now a "Flavor Intelligence Company" oriented almost entirely toward CPG enterprises. Their database profiles 2,000+ ingredients across 8,000 aroma molecules. They have Foodpairing Trees (visual compatibility maps), Consumer Flavor Intelligence (ML for product success prediction), and a chef-facing Inspire module. Enterprise customers span 125 countries.

| Dimension | Foodpairing | FlavorLab |
|---|---|---|
| Science data | Yes (molecular) | Yes (FlavorGraph, 147K pairings) |
| Consumer UX | Minimal — enterprise-first | Full — consumer-first |
| Community scoring | None | Hive Score |
| Pricing | Opaque / enterprise-quoted | Free / Pro / Enterprise transparent |
| API | Enterprise only, not self-serve | Self-serve Enterprise tier |
| Plain-English explanations | No | Yes (dual-layer) |
| Home cook audience | Abandoned | Primary free tier |

**The gap Foodpairing leaves:** The entire home cook and prosumer market. Their enterprise pivot has effectively abandoned consumer access. A free user visiting foodpairing.com gets ~100 pairing trees with no plain-English explanation, no community data, and no pricing path that makes sense for non-enterprise users. This is FlavorLab's clearest opening.

---

#### FlavorDB2 (IIIT Delhi)
Academic database of 25,595 flavor molecules linked to 936 natural ingredients. Rigorous science, raw interface, no consumer UX, no community layer, no commercial support. It is the scientific reference layer — not a consumer product. Zero competitive overlap with FlavorLab's addressable market.

---

#### TasteMatch (tastematch.app)
Mobile app with 50,000+ curated flavor pairings and a combinator feature (input multiple ingredients, see shared pairings). Clean consumer UX, $1.99/month, ad-free. The combinator feature is a direct analog to FlavorLab's multi-ingredient search.

**Critical weakness:** Pairings are drawn from culinary reference books (similar to The Flavor Bible), not molecular chemistry. No Science Score, no molecular compound data, no community Hive Score. 14 user ratings on the App Store — extremely small user base. No API.

**Signal:** TasteMatch proves consumer willingness to pay $1.99/month for a flavor pairing tool. FlavorLab differentiates with verifiable molecular science, dual scoring, and an enterprise API tier.

---

#### Flavonomics (flavonomics.com)
UK-based, 4,250+ ingredients analysed across 150 flavor dimensions. Uses genuine molecular and sensory science, not LLM pattern matching. Targets restaurants, food brands, and R&D labs. Modern, clean interface.

**Weakness:** No free tier, no community scoring, no API, no consumer UX, smaller ingredient database than FlavorGraph (4,250 vs. ~8,000+). Opaque pricing keeps it inaccessible. Limited brand awareness outside food professional circles.

---

#### Flavorfox, The Flavor Network / flavorpair.me
Both are recipe co-occurrence tools (not molecular science). Flavorfox has occasion/theme-based search but had website connectivity issues during research. The Flavor Network is a free indie project based on The Flavor Bible dataset — good for visual exploration, no commercial backing, no community layer, no API.

**No meaningful competitive threat.** Both lack the scientific foundation that is FlavorLab's primary differentiator.

---

### Indirect Competitors — Recipe & AI Cooking Tools

#### General AI Assistants (ChatGPT, Gemini) — Most Important Indirect Competitor

The most significant indirect competitor is not a food product — it's people asking "what goes with X?" in ChatGPT or Gemini. Both are free (premium at ~$20/month), conversational, and increasingly capable.

**The critical weakness:** LLMs hallucinate scientific claims. When ChatGPT says "truffle and chocolate share aromatic compounds" it is pattern-matching from text, not running a compound similarity calculation. It cannot show a Science Score, it cannot cite a FlavorGraph edge, and it cannot show a community-validated Hive Score. As LLM skepticism grows — particularly around factual claims — FlavorLab's verifiable, traceable science becomes a stronger differentiator.

**The positioning:** *"ChatGPT guesses. FlavorLab proves it."*

---

#### Supercook (supercook.com)
11M+ recipes from 18,000 websites in 20 languages. Input pantry ingredients, get ranked recipe matches. Truly free (ad-supported). Answers "what can I cook?" not "what pairs well and why?" — adjacent but not overlapping. No molecular science, no community pairing scores, no API. Strong SEO presence in "what to cook with X" search queries — FlavorLab and Supercook will compete for discovery searches.

---

#### ChefGPT
AI recipe generator with a "PairPerfect" module for food and drink pairing. Free (10 recipes/month) / $2.99/month Pro. PairPerfect is a direct feature analog — but built on LLM inference, not molecular data. No Science Score, no community validation. Very affordable price point signals where the consumer market is pricing this category.

---

#### BigOven / Spoonacular API
Both serve the developer/API market for food data:
- **BigOven**: 1M+ recipes, public API from $99/month commercial. No flavor science.
- **Spoonacular**: 365,000 recipes, allergen detection, unit conversion, ingredient substitution. Free tier through $149/month. Most popular food API in the space.

Neither offers molecular compound pairing data. FlavorLab's Enterprise API fills a gap both have explicitly left open.

---

#### Samsung Food (formerly Whisk)
Social media recipe capture (from TikTok, Instagram), meal planning, grocery lists. Strong UI, Samsung ecosystem integration. Not a pairing tool — recipe saving and discovery only. No flavor science. No competitive overlap with FlavorLab's core value proposition.

---

### Professional Chef & Food R&D Tools

#### Meez (getmeez.com)
Culinary operating system for professional kitchens — recipe management, food costing, scaling, nutritional analysis, allergen tagging, multilingual staff training. Achieves 3–5% COGS reduction for clients. No flavor pairing, no molecular science. **Potentially complementary** to FlavorLab's Pro tier — Meez handles kitchen operations; FlavorLab handles flavor discovery. Not head-to-head competition.

#### Tastewise
AI consumer intelligence for CPG brands — trend forecasting from social signals, restaurant menus, and reviews. Enterprise-only, demo-gated, not a pairing tool. Serves the same enterprise food business persona as FlavorLab's API tier but for trend intelligence, not pairing formulation. **Potentially complementary** at the enterprise level.

---

### Community Platforms

#### Allrecipes (118M monthly visitors)
Largest food community on the internet. Star ratings and written reviews on recipes — not ingredient pairings. Proves that community trust signals (ratings + reviews) drive massive engagement in the food space. FlavorLab's Hive Score applies this proven community dynamic specifically to the ingredient pairing layer.

---

### Competitive Landscape Matrix

| Competitor | Science Data | Community Score | Consumer UX | API | Free Tier | Home Cook Focus |
|---|---|---|---|---|---|---|
| **FlavorLab** | Yes — molecular (147K pairs) | Yes — Hive Score | Yes | Yes — Enterprise | Yes | Yes — primary |
| Foodpairing | Yes — molecular (8K molecules) | No | Minimal | Enterprise only | ~100 trees only | No — abandoned |
| FlavorDB2 | Yes — molecular (25K molecules) | No | Academic | No | Yes (research) | No |
| TasteMatch | Reference-based | Limited | Yes (mobile) | No | No | Yes |
| Flavonomics | Yes — molecular/sensory | No | Limited | No | No | No |
| The Flavor Network | Reference-based | No | Yes (web) | No | Yes (indie) | Yes |
| Supercook | No | No | Yes | No | Yes | Yes |
| ChefGPT | No (LLM) | No | Yes | No | Yes (limited) | Yes |
| ChatGPT / Gemini | No (LLM) | No | Yes | Yes (general) | Yes | Incidental |
| BigOven | No | Recipe ratings | Yes | Yes ($99+/mo) | Yes | Yes |
| Spoonacular | No | No | Developer | Yes ($0–$149/mo) | Yes | Developer |
| Meez | No | No | Professional | No | No | No |
| Tastewise | Trend signals | No | Enterprise | Enterprise | No | No |
| Allrecipes | No | Recipe ratings | Yes | No | Yes | Yes |

---

### Six Strategic Gaps FlavorLab Occupies

**Gap 1 — Science for consumers:** Every molecular science tool is enterprise-only or academic. Every consumer tool lacks real molecular data. FlavorLab is the first to bridge this.

**Gap 2 — Dual scoring:** No competitor combines a molecular Science Score with a community Hive Score. This architecture is unique.

**Gap 3 — Yummly's displaced audience:** 2M+ users lost their primary AI cooking tool in December 2024. FlavorLab's Pro tier at a comparable price point ($2.99–4.99/month) is a natural landing point.

**Gap 4 — Plain-English science communication:** Every scientific tool assumes scientific literacy. FlavorLab's dual-layer explanation (compound name + plain English) makes molecular science accessible without dumbing it down.

**Gap 5 — Developer API for molecular pairing data:** Spoonacular dominates the recipe API market. BigOven competes. Neither offers molecular compound pairing data. FlavorLab's Enterprise/API tier is differentiated in a way no existing food API offers.

**Gap 6 — LLM credibility gap:** As LLM hallucinations become more widely understood, verifiable science-backed answers become more valuable. FlavorLab's Science Score is traceable to a real peer-reviewed dataset — a structural trust advantage that no LLM can replicate by design.

---

## Domain Requirements

### DR-01: Data Integrity — Science Edges Only for Science Score

FlavorGraph contains 147,179 total edges, but only **35,440 (24%) are ingredient-to-compound chemical edges** — the ones traceable to GC-MS experiments in peer-reviewed literature. The remaining 111,355 edges are ingredient-to-ingredient co-occurrence scores derived from statistical recipe mining (NPMI from 1 million recipes). These two data types must never be conflated.

**The Science Score is built exclusively on chemical compound edges.** Recipe co-occurrence data may be used as a secondary signal in the scoring formula (labelled as a separate signal, not as molecular science) but must never be presented as molecular evidence to the user.

Every compound displayed in a science card must trace to a `node_type = "compound"` chemical edge from a source with experimental provenance (GC-MS, literature curation from peer-reviewed research). No LLM-generated compound names, no inferred compound associations.

**Data provenance tiers — every compound-ingredient association in the database must carry one of four confidence labels:**
1. **GC-MS Experimental** — directly measured by gas chromatography-mass spectrometry with published paper citation (highest confidence)
2. **Literature Curated** — compiled from peer-reviewed experimental papers by a scientific database (FooDB, FlavorDB2); traceable to primary research
3. **ML Predicted** — generated by a trained model (e.g. FlavorMiner) from molecular structure; no experimental confirmation (labelled as predicted)
4. **Recipe Co-occurrence** — statistical signal from recipe datasets; no molecular basis (never displayed as science, only used as a scoring signal)

**Implication:** The ETL pipeline must preserve and store provenance tier per compound-ingredient link. The API must return confidence tier alongside compound data. The UI must display it — users deserve to know whether a compound association was measured in a lab or predicted by a model.

---

### DR-02: Allergen Filter — Ingredient Level Only, Never Compound Level

Dietary and allergen filters operate on ingredient classification (from `dict_ingr2cate` taxonomy + FlavorGraph hub labels), not on shared compound chemistry. Filtering by compound origin would produce incorrect false negatives and must not be implemented.

**Implication:** The filter accuracy guarantee ("zero false negatives" in Success Criteria) applies only to ingredient-level classification. The UI must include a disclaimer: *"Compound data reflects chemical similarity, not allergen presence in the final dish."*

---

### DR-03: Hive Score — Eventual Consistency, Not Real-Time

The Hive Score for any pairing is an aggregated community rating, recalculated periodically (not on every vote). During moderation holds, the Hive Score is frozen at its pre-event value. The displayed score must always include a `last_updated` timestamp visible to API consumers.

**Implication:** Internal recalculation frequency: minimum daily, recommended hourly for hub ingredient pairings.

---

### DR-04: Hub vs Non-Hub Node Distinction

The Ingredient Oracle search must only return hub ingredient nodes as primary results. Compound nodes are never user-searchable but are displayed in science cards as shared compounds.

**Implication:** The autocomplete index is built from hub ingredients only (~616). The full ~8,000 node set is indexed only for science card rendering.

---

### DR-05: Dietary Taxonomy — Custom Mapping Layer Required

The FlavorGraph category taxonomy does not map 1:1 to consumer dietary labels (Vegan, Vegetarian, Gluten-Free, Nut-Free, etc.). A custom dietary mapping layer must be built on top of the taxonomy.

**Implication:** This mapping is a product decision, not a dataset feature, and must be explicitly maintained and versioned (e.g. "Is honey vegan?" must be a deliberate, documented choice).

---

### DR-06: Score Normalisation — FlavorGraph Scores Are Not Percentages

FlavorGraph edge scores are floating-point similarity weights (0.0–1.0) derived from chemical fingerprint overlap and recipe co-occurrence. They are not directly interpretable as culinary compatibility percentages.

**Implication:** The Science Score must be presented as a relative indicator alongside qualitative labels ("highly compatible" / "moderate match" / "low compatibility") to prevent literal misinterpretation.

---

### DR-07: LocalStorage Scope and Limitations

Free-tier preferences (dietary filters, recently viewed, First Pairing Magic flag) are stored in browser localStorage — device-scoped, cleared by privacy modes, not available in incognito.

**Implication:** Every localStorage-dependent feature must function correctly on a clean state. Cross-device sync is explicitly post-MVP and the primary free-to-Pro upsell hook.

---

### DR-08: Legal — FlavorGraph Apache 2.0 Compliance

The FlavorGraph repository is licensed under **Apache License 2.0** — commercial use is permitted without consent from the authors. This is confirmed. The licence is permissive and business-friendly.

**What Apache 2.0 requires (mandatory obligations):**
1. Preserve all copyright notices from the original repository
2. Include the Apache 2.0 licence text in the product
3. Document any modifications made to the original code
4. Do not imply endorsement by the original authors

**In-app implementation:** A `/legal/open-source-notices` page (linked from the footer) must include: project name (FlavorGraph), repository owner, licence (Apache 2.0), copyright attribution, a statement of modifications, and a link to the full Apache 2.0 licence text.

**Suggested notice text:**
> *This product includes software derived from FlavorGraph (https://github.com/lamypark/FlavorGraph), licensed under the Apache License, Version 2.0. Copyright © the original authors. We have modified and extended the original work. A copy of the Apache License 2.0 is available on our Open Source Notices page.*

**Remaining risk — data provenance (not the code licence):** Apache 2.0 covers the FlavorGraph code. It does not automatically cover the underlying datasets used to train it (recipe corpus, compound databases, downloadable training artifacts hosted externally on Google Drive). These external assets require separate provenance and licence review before production use. This is the actual outstanding legal task.

**Implication:** Code and ETL development can proceed immediately. The outstanding action is a data provenance audit of the non-code assets (training data, downloadable artifacts) before public launch.

---

### DR-09: API Contract Stability

Any change to the pairing response schema, score calculation method, or ingredient taxonomy that would break existing integrations is a breaking change requiring a major version bump and a minimum 60-day deprecation notice period.

**Implication:** The API must be versioned from day one (`/v1/pairings`). The API response schema is the contract; the MongoDB schema is an implementation detail.

---

### DR-10: Moderation — Quarantine, Not Delete

Community ratings held in "pending" state during moderation are not deleted — they are quarantined with a `status` field (active / pending / rejected) and full audit trail. Hive Score calculations filter on `status = active` only.

**Implication:** Releasing cleared ratings retroactively must not corrupt Hive Score history. The ratings data model must support status transitions with timestamps.

---

### DR-10b: Science Score — Multi-Signal Scoring Formula

The Science Score displayed to users must not be a direct pass-through of raw FlavorGraph edge weights. The raw scores are a single chemical-similarity signal and insufficient alone for a trustworthy product. The scoring formula must combine multiple evidence layers:

```
science_score =
  0.35 × compound_affinity_score     (shared compound overlap from FlavorGraph)
  + 0.25 × graph_similarity_score    (embedding similarity from graph structure)
  + 0.20 × category_affinity_score   (ingredient family / cuisine compatibility)
  + 0.15 × popularity_score          (how often this pair appears in curated sources)
  + 0.05 × editorial_boost           (manual overrides by data team)
  − penalties                        (allergen conflicts, dietary violations, low confidence, culturally inappropriate)
```

Each signal is stored separately in the `pairing_edges` record so the formula weights can be adjusted without re-ETL. Score version is tracked — a formula change invalidates the Redis cache (versioned cache keys).

**Implication:** The ETL pipeline must compute and store all five signals per pairing edge, not just the raw FlavorGraph score. The API must return both the composite `science_score` and the individual signal breakdown for Pro/API tier transparency.

---

### DR-11: Ingredient Coverage Gap — Multi-Source Data Strategy

FlavorGraph provides ~616 hub ingredients (searchable) and ~8,000 total nodes. This coverage is heavily weighted toward Western, commercially common ingredients — the underlying Recipe1M corpus from which it was derived is predominantly English-language Western cooking. Regional and heritage ingredients (sumac, yuzu, berbere, moringa, tamarind, etc.) are absent or have severely limited compound data. Critically, adding an ingredient without its compound profile produces a dead node — it appears in search but cannot participate in the Science Score.

**Confirmed data source stack (by phase):**

**MVP — commercially clean today:**
| Source | What It Adds | Licence | Notes |
|---|---|---|---|
| FlavorGraph chemical edges | 35,440 compound-ingredient links across ~616 hub ingredients | Apache 2.0 | Use chemical edges only; exclude recipe co-occurrence edges from Science Score |
| Flavornet (Cornell) | 738 GCO-confirmed aroma-active compounds across ~200 foods | Open (Cornell) | Use as aroma-activity filter — confirms which compounds are perceptually relevant above threshold |
| ChemTastesDB | 2,944 taste molecules (bitter, sweet, sour, umami, salty) | Open/downloadable | Adds non-volatile taste dimension missing from aroma-focused databases |
| PubChem (API) | Molecular properties, structural similarity, 3D structures for all compounds | Public domain (NIH) | Enrichment layer — molecular weight, logP, SMILES, Tanimoto similarity |
| FEMA GRAS library | Regulatory status for 3,012+ flavour compounds | Public | Regulatory metadata layer |
| FlavorMiner | ML-predicted flavor profiles for ingredients with no experimental data | CC BY 4.0 | Gap-filling only; labelled as "predicted" confidence tier |

**Growth (requires licence negotiation — pursue in parallel with development):**
| Source | What It Adds | Licence | Action |
|---|---|---|---|
| FooDB (Wishart Lab, Univ. of Alberta) | ~1,000 foods × 70,926 chemical compounds — most comprehensive food chemistry database available | CC BY-NC 4.0 | Contact shhan@ualberta.ca for commercial licence |
| FlavorDB2 (IIIT Delhi) | 936 natural ingredients × 25,595 flavor molecules — best curated flavour-specific dataset | CC BY-NC-SA 3.0 | Contact bagler+FlavorDB@iiitd.ac.in for commercial licence |
| VCF Database (BeWiDo BV) | 13,200+ volatile compounds across 2,015 foods — gold standard experimental validation | Subscription | Subscribe for validation layer and concentration/threshold data |

**Non-Western ingredient coverage (Phase 2+):**
| Source | Coverage Gap Addressed | Notes |
|---|---|---|
| IMPPAT 2.0 | Indian/South Asian spices and medicinal plants (4,010 plants, 17,967 phytochemicals) | Open |
| LANaPDB | Latin American ingredients (13,578 compounds) | Open |
| TCM@Taiwan | Chinese traditional ingredients (58,000 compounds) | Review licence |
| Regional food science literature (PubMed) | Targeted per cuisine gap | Requires NLP extraction pipeline |

**Scientific honesty obligation:** No comprehensive flavor-specific database exists for Sub-Saharan African, Southeast Asian, or Middle Eastern ingredients. These gaps must be transparent to users — ingredients from these regions will either have limited Science Score data, ML-predicted confidence tier, or "compound data pending" status. This gap is a research opportunity, not something to paper over.

**Implication:** ETL pipeline must be designed for multi-source ingestion from day one. Every ingredient document must carry `data_source`, `compound_confidence_tier`, and `coverage_completeness` fields. These surface in the UI as ingredient data quality indicators.

---

### DR-11b: Scientific Honesty — Food Pairing Hypothesis Framing

The food pairing hypothesis (ingredients sharing volatile aroma compounds pair well culinarily) is scientifically validated for Western cuisines but contradicted for East Asian cuisines, and has not been robustly tested for most of the world's culinary traditions. Additional limitations: the original research used compound *presence* data, not *concentration-weighted* data; it does not account for non-volatile taste compounds, cooking transformation effects, or compound interactions.

**The correct claim FlavorLab makes:**
*"These ingredients share key aroma compounds documented in peer-reviewed food science research, with high compatibility in Western culinary traditions. Results reflect molecular compound similarity; cultural context, cooking method, and personal taste also matter."*

**What FlavorLab must never claim:**
- "Science proves these pair well" (unqualified)
- "Molecular data predicts this will taste good" (conflates chemistry with palatability)
- "This pairing works in all culinary traditions" (not supported for non-Western contexts)

**Practical implications:**
- Every Science Score must include a brief framing statement, not just a number
- East Asian and non-Western ingredient pairings should carry a caveat noting that the food pairing hypothesis was not validated for these culinary traditions — the compound data is real, but cultural compatibility context differs
- The dual scoring system (Science Score + Hive Score) is partly designed to surface exactly this gap — when community ratings diverge from molecular scores, the product should explain *why*, including cultural context

**Implication:** UI copy, science card text, and all marketing materials must be reviewed against this framing standard. The architecture must support per-pairing context flags (cuisine context, confidence level, limitation notes) alongside the numeric score.

---

### DR-12: Infrastructure Stack — Required Layers

Based on the production architecture requirements, the backend stack must include the following layers. These are not optional enhancements — they are structural requirements for the product to be reliable, scalable, and legally defensible.

**Layer 1 — Source-of-truth database:**
PostgreSQL as the primary relational database. Stores canonical ingredients, aliases, compounds, ingredient–compound links, pairing edges (with all score signals), constraints/rules, provenance records, and evaluation data. MongoDB may be retained for the consumer-facing read layer (fast document lookups for the free tier API), but Postgres is the authoritative record.

**Layer 2 — Vector layer (embeddings):**
pgvector (Postgres extension) for v1. Stores ingredient semantic embeddings and graph embeddings alongside relational data. Abstraction layer required so this can be migrated to Qdrant in v2 if vector retrieval becomes a bottleneck, without changing business logic.

**Layer 3 — Cache layer:**
Redis for hot pairing queries, ingredient detail lookups, precomputed explanation payloads, and Science Score results. Cache keys must be versioned (e.g. `pairings:ingredient:123:v5`) so formula or data changes automatically invalidate stale results.

**Layer 4 — Async processing:**
A job queue (Celery or equivalent) for all non-realtime operations: ETL ingestion, ingredient normalisation, alias resolution, compound linking, embedding generation, pairing score recomputation, cache warming, and scheduled re-indexing. Nothing in this list should block a web request.

**Layer 5 — API layer:**
Versioned REST API (`/v1/`) separating public consumer endpoints from internal admin/data-science endpoints. Public endpoints are read-only and cached. Admin endpoints (rebuild embeddings, recompute scores, invalidate cache) are internal-only.

**Implication:** The architecture workflow must produce explicit decisions on each layer: DB engine choice per entity type, embedding model selection, Redis TTL strategy per entity type, Celery queue topology, and API versioning scheme. These decisions directly affect UX capabilities (what data is available, how fresh it is, what explanations can be generated).

---

## User Journeys

### Journey 1 — Maya, Home Cook: Success Path

Maya opens FlavorLab on her phone after staring at leftover salmon, a lemon, and some dill in her fridge. She types "salmon" into the Ingredient Oracle. Autocomplete tiles appear before she finishes — she taps "salmon" to confirm. The top result: **salmon + dill** (Science Score 91%, Hive Score 88%). She taps the result and reads the science card: *"Both share linalool and caryophyllene — terpene compounds responsible for herbal, slightly floral aromas. They reinforce each other rather than compete."* She also reads the plain-English layer: *"Dill's grassy brightness cuts through salmon's richness without masking it."* She cooks the pairing, returns to the app, and submits a 5-star Hive rating. First value loop complete.

**Edge Case EC-1A — Ingredient Not Recognised:** Maya types "purple sprouting broccoli" — no exact match. The system fuzzy-matches to "broccoli" and shows a disambiguation card: *"Did you mean: broccoli / broccolini / broccoli rabe?"* She selects one. If no fuzzy match exists, the system shows: *"We don't have this exact ingredient yet — here are the closest matches"* + a one-tap "Request this ingredient" button that logs the term to a backlog.

**Edge Case EC-1B — Extremely Low Science Score:** Maya inputs "coffee + fish." Science Score: 11%. The system surfaces the *Why It Fails* card rather than hiding the result. Explanation: *"Coffee's bitter phenols (chlorogenic acid) clash with fish's trimethylamine compounds, amplifying fishiness."* Hive Score: 3%. The negative result is framed as discovery, not error — Maya learns something.

**Edge Case EC-1C — Single Ingredient, No Strong Pairings:** Maya searches "durian." FlavorGraph has limited hub connections. The system shows top 5 pairings labelled *"Limited data — fewer than 10 known pairings."* A nudge appears: *"Add another ingredient to narrow suggestions."* No false confidence displayed.

**Edge Case EC-1D — Multi-Ingredient Conflict:** Maya inputs "lemon + cream + red wine." The system detects a three-way compound conflict (acid + tannins destabilise dairy) and shows a warning card: *"Combining these three may destabilise your sauce — lemon's acidity and red wine's tannins can curdle cream."* Individual pairings are still ranked and shown below the warning.

---

### Journey 2 — Maya, Home Cook: Dietary & Allergen Edge Cases

Maya is vegan with a nut allergy. She sets both filters in the preferences panel — stored in localStorage, no account required. She searches "chocolate."

**EC-2A — Filter Produces Zero Results:** All top chocolate pairings involve dairy or almonds. Rather than a blank screen, the system shows: *"No pairings match all your current filters. Showing best pairings if [Nut-Free] is relaxed → [4 results]."* A one-tap temporary override is offered. Her filter state is preserved; the override is session-only.

**EC-2B — Filter State Lost Across Devices:** Maya set Gluten-Free on desktop. On mobile, localStorage is device-scoped — her filter is gone. On her first result page without filters, a one-time nudge appears: *"Set your dietary preferences once and we'll remember them on this device."* The system never silently serves allergen-containing results without disclosure.

**EC-2C — Ingredient Is Itself the Allergen:** Maya (nut allergy active) types "almond." The system does not block the search — she chose it. It flags the ingredient with an allergen badge and appends: *"Note: almond is flagged as a tree nut in your filters."* No paternalism; just transparency.

**EC-2D — Allergen in Shared Compound:** A pairing's shared compound is chemically derived from a nut source (e.g. benzaldehyde). The filter operates at ingredient level only — not compound origin — to prevent incorrect false negatives. A disclaimer in the science card reads: *"Compound data reflects chemical similarity, not allergen presence in the final dish."*

---

### Journey 3 — Marco, Professional Chef: Pro Tier

Marco runs a 40-seat restaurant. He upgrades to Pro tier for Menu Harmony Analysis. He uploads the current tasting menu as a PDF. The parser extracts key ingredients per dish and cross-references the full menu for compound conflicts and complementary arcs across courses.

**EC-3A — Ingredient Not in DB:** The parser extracts "Wagyu A5 striploin" — no exact FlavorGraph node. The system maps it to "beef" and flags: *"Wagyu A5 → matched to 'beef' (closest available). Compound profile may differ for highly marbled cuts."* Report is generated with transparent caveats.

**EC-3B — Export Failure:** Marco generates a 48-pairing PDF report. The export times out. The UI shows: *"Export is taking longer than usual — we'll email it to you when ready."* (Pro accounts have email on file.) No silent failure.

**EC-3C — Frontier Feed Exhausted:** Marco has rated every pairing in the Frontier Feed. The system shows: *"You've explored all current frontier pairings. New pairs added weekly — check back Friday."* + an option to re-sort by "most controversial" (high Science Score / low Hive Score divergence). No dead screen.

Marco saves notable pairings to his Chef's Notebook, annotates them with course context, and exports a formatted PDF to share with his sous chef before service.

---

### Journey 4 — Lena, Food Business: API / Enterprise Tier

Lena leads R&D at a condiment brand. Her team queries the FlavorLab API in bulk to stress-test a new sauce concept against 200 base ingredients.

**EC-4A — Rate Limit Hit Mid-Batch:** Her pipeline sends 1,200 requests/hour against an Enterprise limit of 1,000/hour. The API returns `429 Too Many Requests` with `Retry-After` header and a machine-parseable JSON body: `{"error": "rate_limit_exceeded", "limit": 1000, "reset_at": "..."}`. Her dashboard shows a real-time usage graph with a red line at the limit. No silent drops.

**EC-4B — Ingredient Not Found:** Lena queries `/pairings?ingredient=cricket_flour`. No FlavorGraph node exists. The API returns `404` with `{"error": "ingredient_not_found", "suggestions": ["cricket", "insect_protein"]}`. Machine-parseable with human-readable alternatives.

**EC-4C — Stale Hive Score Data:** Lena's system caches Hive Scores for 30 days. The API response includes `hive_score_updated_at` timestamp. Her integration detects cache staleness. API documentation states Hive Scores are eventually consistent and may change daily.

**EC-4D — Embeddable Widget CSP Conflict:** Lena's e-commerce site has a strict Content Security Policy. Documentation includes: *"Ensure `cdn.flavorlab.io` is in your CSP `script-src` and `frame-src` directives."* If blocked, the widget degrades gracefully — shows a static CTA linking to FlavorLab rather than a JS error.

---

### Journey 5 — Community Rating System: Integrity & Trust

**EC-5A — Coordinated Upvote Spam:** A pairing receives 200 5-star ratings within 2 hours from accounts aged < 7 days. The moderation system flags the velocity spike. Auto-action: ratings held in "pending" state, not counted in Hive Score. Displayed Hive Score is frozen at pre-spike value. Moderator receives an alert in the admin dashboard.

**EC-5B — Single User Rating Loop:** A user submits 50 ratings in one session. Rate limit: max 20 ratings per session with a soft cooldown prompt: *"You've rated 20 pairings today — take a break and cook something!"* Friction-adding but not punitive.

**EC-5C — Contested Rating (Science vs Community Divergence):** "Strawberry + balsamic" has Science Score 87% but Hive Score 42%. This is surfaced as a *Contested Pairing* badge. The explanation reads: *"Science says yes, cooks are split. This pairing requires technique — try it in a reduction, not raw."* The divergence is product content, not a bug.

**EC-5D — Rating Without Trying:** A user rates a pairing immediately after viewing it. The rating form includes a soft friction step: *"Have you tried this pairing?"* (Yes / No / Planning to). Ratings marked "Planning to" are recorded but weighted lower in the Hive Score algorithm and shown as *Untested Opinions* in a secondary score layer.

---

### Journey 6 — First-Time Visitor: Onboarding

**EC-6A — User Doesn't Know What to Search:** New visitor sees the search field, types nothing. After 4 seconds idle, the field animates ghost suggestions: *"Try: garlic, lemon, salmon..."* rotating every 3 seconds. Secondary CTA: *"Not sure where to start? Try First Pairing Magic →"* — auto-loads a curated pairing requiring no input.

**EC-6B — User Searches a Dish, Not an Ingredient:** User types "pasta carbonara." No matching ingredient node. System responds: *"'pasta carbonara' is a dish — try its key ingredients:"* with tap-to-add tiles for guanciale, egg, pecorino, black pepper. User is redirected to the correct interaction pattern without an error message.

**EC-6C — User Overwhelmed by Results:** First-time user searches "chicken" and receives 47 ranked pairings. Default view shows top 5 with a *"Show more"* expand. The top pairing is visually dominant. A one-time tooltip on first visit: *"The Science Score shows molecular compatibility. The Hive Score shows what other cooks love."* Dismissed on first interaction, never shown again.

**EC-6D — Mobile Compound Venn (Small Screen):** On viewports < 390px, the SVG Compound Venn diagram is replaced with a compact compound list card: *"Shared compounds: limonene, linalool, citral"* with tap-to-expand. No horizontal scroll; no layout break.

---

## Innovation & Differentiators

### Differentiator 1: Verified Molecular Trust (vs. AI Guesswork)

Every major AI assistant can suggest flavor pairings. None of them can prove it. When ChatGPT says "truffle pairs with chocolate," it's pattern-matching from text — it has no access to the molecular mechanism. FlavorLab's pairings are traceable to real compound-similarity edges in peer-reviewed data. The product's core promise — *"we can show you the chemistry"* — is structurally impossible for a generative AI to replicate without the same underlying dataset.

**Why it's defensible:** A competitor would need to license or replicate the same academic dataset pipeline, build the same ETL, and design the same science card UX. The data itself is open, but the combination of data + UX + community layer is the moat.

### Differentiator 2: The Dual Score — Science Meets Community

No existing flavor tool combines molecular science with live community validation in a single view. The gap between the Science Score and the Hive Score is itself product content — it surfaces *contested pairings* (chemistry says yes, cooks say no) and *discovered pairings* (low science score, high community love). This tension is unique to FlavorLab and generates editorial content, sharing moments, and ongoing user curiosity that static tools can never produce.

**Why it's defensible:** The Hive Score data is proprietary. It accumulates with every user interaction. A new competitor starting from zero has no Hive Score history — their science scores may match ours, but their community validation layer is empty. The flywheel only accelerates over time.

### Differentiator 3: Progressive Education — The Product That Makes Itself Less Necessary

FlavorLab is designed to teach users flavor principles, not just dispense answers. Every science card is a micro-lesson. Every contested pairing is a discussion prompt. The long-term user doesn't return because they need the app — they return because the app has made them a more curious, principled cook, and the Hive community is where they test their evolving intuitions.

**Why it's defensible:** Education-led retention is structurally different from feature-led retention. Features can be copied; the identity shift of becoming a better cook cannot.

### Differentiator 4: The Data Flywheel

Each rating improves Hive Score accuracy. Increased accuracy drives more searches. More searches drive more ratings. The product gets more valuable as it grows — and the value is concentrated in a dataset (community ratings + usage patterns) that is uniquely FlavorLab's. Phase 2: divergences between Science Score and Hive Score become a training signal. Ingredients that consistently outperform their FlavorGraph score in community ratings indicate missing compound data — the community crowd-sources improvements to the science layer. This feedback loop does not exist anywhere else.

### Differentiator 5: Zero-Friction Science

Every science-based food tool is either (a) built for professionals and inaccessible to home cooks, or (b) simplified to the point of losing scientific credibility. FlavorLab occupies the gap: full molecular data, plain-English explanations, no account required, results in under 3 seconds. The dual-layer explanation — scientific compound name + plain-English why-it-works — is the design solution to this tension.

### Differentiator 6: Multi-Source Ingredient Expansion (Global Coverage Moat)

FlavorLab's phased data strategy — FlavorGraph → FooDB → community-assisted profiling → proprietary compound data — means the ingredient database grows continuously. A competitor launching with only FlavorGraph data is at parity on day one. By Year 2, FlavorLab's coverage of global and regional ingredients creates a gap that is increasingly expensive to close.

---

## Project Type & Architecture Classification

- **Project Type:** Full-Stack Consumer SaaS Web Application with B2B API Layer
- **Frontend:** Brownfield vanilla JS SPA (Vite), expanding into full product UI
- **Backend:** New Node.js API server (Express or Fastify)
- **Database:** MongoDB — ingredient/pairing data + community ratings
- **Auth:** Optional for free tier; required for Pro/API tiers
- **Deployment:** Web (primary), mobile-responsive (required), native app (post-MVP)
- **API surface:** Internal (frontend ↔ backend) + External (B2B Enterprise tier)
- **Data pipeline:** One-time ETL (FlavorGraph CSVs → MongoDB) + ongoing multi-source ingestion

---

## Scoping Decisions

### In Scope for MVP

| Feature | Rationale |
|---|---|
| FlavorGraph ETL pipeline | Prerequisite — nothing works without it |
| Ingredient Oracle (1–5 ingredient search) | Core value loop |
| Science Score | Primary trust differentiator |
| Hive Score + community rating | Flywheel seed — must launch with it, even with 0 ratings |
| Dual-layer explanation (compound + plain English) | Non-negotiable UX differentiator |
| Why It Fails card | Negative results are product value |
| Dietary & Allergen Filter (localStorage) | Accessibility and safety requirement |
| Smart Autocomplete Tiles | Reduces friction; drives discovery |
| Compound Venn Visual (desktop) / compound list (mobile) | Science credibility signal |
| First Pairing Magic (zero-input entry) | Handles onboarding confusion; reduces drop-off |
| Contested Pairing badge (Science vs Hive divergence) | Unique content; drives engagement |
| Ingredient not recognised / fuzzy match + "Request ingredient" | No dead ends |
| Mobile-responsive layout | Required from day one |
| Free tier fully functional (no signup) | Zero-friction entry — core to growth strategy |
| Ingredient coverage count displayed ("616 scientifically mapped ingredients") | Transparency builds trust |
| Pro tier scaffolded (paywall visible, not yet active) | Sets monetisation expectation without blocking launch |

### Explicitly Deferred (Post-MVP)

| Feature | Reason |
|---|---|
| Fridge Mode (multi-ingredient what-can-I-make) | Requires multi-ingredient intersection logic; not blocking |
| Substitute Mode | Valuable but not core to first value loop |
| Trending This Week / Frontier Feed | Needs minimum community data volume to be meaningful |
| Chef's Notebook + PDF Export | Pro tier feature; needs auth layer first |
| Menu Harmony Analysis | Pro tier; complex parsing pipeline |
| Embeddable Widget | Enterprise tier; needs API stability first |
| FooDB integration (DR-11 Phase 2) | Extend coverage after MVP proves demand |
| Community-assisted ingredient submission | Needs moderation infrastructure at scale |
| Cross-device sync | Explicit Pro upsell; must not be free |
| Personal Flavor Profile | Requires session history; post-auth |
| Flavor Science Blog / Mini-Course | Content investment; post-traction |
| Public Developer API | After internal API is stable |
| Dish Lens (camera scanner) | Vision item; significant CV work |

---

## Functional Requirements

### FR-01: Ingredient Oracle — Search & Pairing Engine
- User can input 1 to 5 ingredients in a single search
- Search field provides autocomplete suggestions from hub ingredient index as user types (minimum 2 characters to trigger); returns up to 8 matches
- Fuzzy match on ingredient name; disambiguation card presented for close matches; "Request this ingredient" button logged if no match found
- Results ranked by Science Score descending by default
- Each result card displays: pairing ingredient name, Science Score (%), Hive Score (%), top 3 shared compounds, one-line plain-English summary
- Expanding a result card reveals: full compound list, dual-layer explanation, Why It Fails content (if Science Score < 40%), Contested Pairing badge (if Science/Hive divergence > 30 points)
- Multi-ingredient search returns pairings compatible with the combination of inputs
- Search response time ≤ 300ms at p95; autocomplete ≤ 100ms at p95

### FR-02: Science Score
- Displayed as 0–100% derived from FlavorGraph edge weight, normalised
- Qualitative label alongside: ≥ 75% = "Highly Compatible", 40–74% = "Moderate Match", < 40% = "Low Compatibility"
- Top 2–3 shared compound names (scientific + common name) always shown
- Source label always displayed: "Based on molecular compound similarity"

### FR-03: Hive Score
- Displayed as 0–100% derived from community ratings
- Vote count shown: "Based on 142 community ratings"
- If vote count < 10: "New pairing — not yet rated" + prompt to be first to rate
- `last_updated` timestamp accessible to API consumers; shown in UI as "Updated today / X days ago"
- Ratings under moderation hold display frozen score with subtle "Under review" indicator

### FR-04: Community Rating System
- Any visitor (no account required for free tier) can submit a 1–5 star rating on any pairing they have viewed
- Rating form: star selector + "Have you tried this pairing?" friction step (Yes / No / Planning to)
- "Planning to" ratings recorded but weighted lower in Hive Score; shown as *Untested Opinions* layer
- Max 20 ratings per session; soft cooldown prompt at limit
- Velocity spike detection: > 50 ratings on a single pairing within 2 hours triggers automatic pending hold
- Ratings quarantined (not deleted) during moderation review

### FR-05: Dietary & Allergen Filter
- Filters: Vegan, Vegetarian, Gluten-Free, Nut-Free, Dairy-Free, Shellfish-Free
- Stored in localStorage; active on every search without re-entry
- Zero results state: show best results with one filter relaxed + one-tap session-only override
- Operates at ingredient classification level only; allergen disclaimer present on all filtered views
- First-visit nudge to set preferences (one-time, dismissed on interaction)

### FR-06: First Pairing Magic
- Displayed to first-time visitors (detected via localStorage flag) before any search is performed
- Shows a single curated high-interest pairing (editorial selection, rotated periodically)
- Interactive demo of Science Score + Hive Score + explanation format
- Dismissible; localStorage flag set on dismiss — never shown again

### FR-07: Compound Venn Visual
- Displayed on desktop (≥ 390px) within expanded result cards
- SVG diagram: two overlapping circles, each ingredient's top compounds, shared compounds in intersection
- Mobile (< 390px): compact compound list card with tap-to-expand
- No horizontal scroll; no layout break at any supported viewport

### FR-08: Why It Fails Card
- Displayed when Science Score < 40%
- Explains the specific compound conflict driving incompatibility
- Framed as discovery: "Here's why this doesn't work — and what to try instead"
- Suggests 1–2 substitute ingredients that pair well with each input

### FR-09: Ingredient Coverage Transparency
- Every search results page displays: "Powered by [N] scientifically mapped ingredients"
- Non-FlavorGraph ingredients display a `data_source` badge
- Partial compound profile ingredients display "Limited compound data" indicator
- "Request this ingredient" submissions acknowledged: "We've logged your request"

### FR-10: Pro Tier — Menu Harmony Analysis *(Post-MVP)*
- Pro user uploads menu (PDF or plain text); parser extracts ingredients; unmapped ingredients flagged with nearest hub match
- Cross-references all extracted ingredients for compound conflicts and complementary arcs
- Generates visual harmony map + written report; exportable as PDF; email delivery on export failure

### FR-11: B2B API *(Post-MVP)*
- Versioned from launch: `/v1/pairings`, `/v1/ingredients`, `/v1/compounds`
- Rate limiting with machine-parseable `429` responses including `Retry-After` and `reset_at`
- `404` responses for unknown ingredients include `suggestions` array
- All responses include `hive_score_updated_at` timestamp
- Breaking changes: major version bump + 60-day deprecation notice

---

## Non-Functional Requirements

### NFR-01: Performance
- Pairing search response time ≤ 300ms at p95
- Autocomplete ≤ 100ms at p95
- Page initial load ≤ 2s on 4G mobile (Lighthouse Performance ≥ 85)
- ETL pipeline completes full FlavorGraph seed in ≤ 30 minutes

### NFR-02: Availability
- API uptime ≥ 99.5% monthly
- Planned maintenance communicated ≥ 24 hours in advance
- Graceful degradation: if MongoDB is unavailable, frontend shows "service temporarily unavailable" — no silent empty results

### NFR-03: Scalability
- MongoDB schema supports ≥ 50,000 ingredient documents without index redesign
- Ratings collection designed for ≥ 10M documents
- API designed for horizontal scaling from day one (stateless request handling)

### NFR-04: Security
- All write operations require authentication (ratings, Pro features)
- Rate limiting on all public endpoints
- No PII stored for free-tier users (localStorage only; no server-side tracking without consent)
- OWASP Top 10 compliance required before public launch

### NFR-05: Accessibility
- WCAG 2.1 AA compliance for all UI components
- Full keyboard navigation
- `prefers-reduced-motion` respected on all animations
- Compound Venn always has a text alternative (mobile fallback satisfies this)
- Colour contrast ratios meet AA standards throughout

### NFR-06: Data Integrity
- Zero hallucinated pairings (DR-01 enforced at API layer, not just ETL)
- MongoDB ingredient documents include `data_source` and `etl_version` fields
- Ratings audit trail: all status transitions logged with timestamp and moderator ID

### NFR-07: Legal & Compliance
- FlavorGraph dataset licence review completed before production deployment (DR-08)
- GDPR-compliant data handling for Pro tier accounts and email addresses
- Cookie/localStorage consent notice for EU users
- Allergen disclaimer present on all filtered result views

---

## Document Status

**Status:** Complete — ready for UX Design and Architecture workflows
**Steps completed:** step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-complete
**Last updated:** 2026-03-27
**Next workflow:** bmad-bmm-create-ux-design

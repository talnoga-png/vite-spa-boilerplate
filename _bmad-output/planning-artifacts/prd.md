---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys']
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
- **Monthly Active Return Rate:** ≥ 30% of registered users return at least once per month
- **First Pairing Completion Rate:** ≥ 70% of new visitors complete a full pairing search in their first session
- **Community Participation Rate:** ≥ 15% of returning users submit at least one pairing rating per month
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

## Domain Requirements

### DR-01: Data Integrity — No Hallucinated Pairings

Every pairing surfaced to any user (free, Pro, or API) must trace directly to a real edge in the FlavorGraph dataset (`edges_191120.csv`). The system must never synthesise or infer a pairing from metadata alone. If a query produces no direct FlavorGraph edge, the system surfaces the closest available match with an explicit confidence caveat — it does not generate a plausible-sounding but unverified result.

**Implication:** The ETL pipeline is the trust anchor. Any re-seed, update, or schema migration must maintain edge traceability. Compound names displayed in science cards must come from the `node_type = "compound"` nodes in the same dataset, not from external LLM output.

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

### DR-08: Legal — FlavorGraph Dataset Licensing

The FlavorGraph dataset has no explicit open-source licence in the public repository. Commercial use has not been formally cleared.

**Implication:** Legal review is a **blocking pre-condition** for public launch. ETL and development work can proceed, but production deployment to users is blocked until licence status is confirmed or an alternative dataset is identified.

---

### DR-09: API Contract Stability

Any change to the pairing response schema, score calculation method, or ingredient taxonomy that would break existing integrations is a breaking change requiring a major version bump and a minimum 60-day deprecation notice period.

**Implication:** The API must be versioned from day one (`/v1/pairings`). The API response schema is the contract; the MongoDB schema is an implementation detail.

---

### DR-10: Moderation — Quarantine, Not Delete

Community ratings held in "pending" state during moderation are not deleted — they are quarantined with a `status` field (active / pending / rejected) and full audit trail. Hive Score calculations filter on `status = active` only.

**Implication:** Releasing cleared ratings retroactively must not corrupt Hive Score history. The ratings data model must support status transitions with timestamps.

---

### DR-11: Ingredient Coverage Gap — Multi-Source Data Strategy

FlavorGraph provides ~616 hub ingredients (searchable) and ~8,000 total nodes. This coverage is heavily weighted toward Western, commercially common ingredients. Regional and heritage ingredients (e.g. sumac, yuzu, berbere, moringa, tamarind) are absent or incomplete. Critically, adding an ingredient without its compound profile produces a dead node — it appears in search but cannot generate a Science Score pairing. Compound data and ingredient coverage must be solved together.

**Viable supplementary sources:**
- **FooDB** (Wishart Lab, University of Alberta) — ~1,000 foods mapped to 70,000+ chemical records; open academic dataset. Best near-term supplement to FlavorGraph.
- **USDA FoodData Central** — broad ingredient coverage; primarily nutritional, limited flavor-compound focus.
- **FlavorDB (IIT Delhi)** — ~1,000 ingredients mapped to flavor molecules; independently built from FlavorGraph. Licensing requires review.
- **PubChem** — definitive compound profiles for any molecule; requires cross-referencing to map ingredients → compounds.
- **Scientific literature (PubMed)** — primary source for novel ingredient compound profiles; requires NLP extraction pipeline.

**Phased coverage strategy:**

| Phase | Action | Target |
|---|---|---|
| MVP | Ship with FlavorGraph's 616 hub ingredients. Surface ingredient count transparently ("616 scientifically mapped ingredients") — specificity builds trust. | 616 searchable ingredients |
| Growth | Integrate FooDB via extended ETL. Prioritise high-value gaps: Asian, African, South American, fermented food ingredients. | ~1,000+ ingredients |
| Vision | Community-assisted ingredient submission pipeline. Users request ingredients; automated pipeline (PubMed + PubChem) populates compound profiles. New ingredients enter "pending" state — searchable with "compound data coming soon" flag — then graduate to full Science Score participation once profiled. | Ongoing expansion |
| Long-term moat | Proprietary compound profiling of novel/rare ingredients unavailable in any public dataset. Becomes a defensible data asset. | Competitive differentiation |

**Implication:** The ETL pipeline architecture must be designed for multi-source ingestion from day one, not just FlavorGraph CSVs. The MongoDB ingredient schema must include a `data_source` field (e.g. `"flavorGraph"`, `"foodb"`, `"pending"`) and a `coverage_confidence` indicator displayed in the UI when data is partial.

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


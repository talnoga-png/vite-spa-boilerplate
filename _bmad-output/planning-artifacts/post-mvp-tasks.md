---
created: '2026-03-28'
project: 'FlavorLab™'
purpose: 'Open tasks required before or during post-MVP growth phase. Not blocking MVP launch but must be resolved before specific growth features can ship.'
---

# Post-MVP Open Tasks — FlavorLab™

_Tracked here so nothing falls through the cracks. Each item has a trigger (when it becomes blocking), owner category, and effort estimate._

---

## 1. Data Licensing Negotiations

### 1A — FooDB Commercial Licence
**What:** University of Alberta's FooDB is licensed CC BY-NC 4.0. Commercial use requires explicit written permission.
**Why it matters:** FooDB covers ~1,000 foods × 70,926 chemical compounds — the most comprehensive food chemistry dataset available. Unlocks Phase 2 ingredient coverage expansion (Asian, African, South American ingredients).
**Contact:** shhan@ualberta.ca (Wishart Research Group, University of Alberta)
**Blocking:** Phase 2 ETL / ingredient expansion sprint
**Action:** Draft a licensing inquiry email explaining FlavorLab's academic-adjacent mission and requesting either a commercial licence or a research licence covering the development + launch phase. Offer attribution and co-promotion.
**Effort:** 1–2 week negotiation

---

### 1B — FlavorDB2 Commercial Licence
**What:** IIIT Delhi's FlavorDB2 is licensed CC BY-NC-SA 3.0. Non-commercial and ShareAlike — requires negotiation for any commercial use.
**Why it matters:** 936 natural ingredients × 25,595 flavor molecules — the best curated flavor-specific ingredient-compound dataset. Directly fills gaps in FlavorGraph's chemical layer.
**Contact:** bagler+FlavorDB@iiitd.ac.in (Ganesh Bagler's lab, IIIT Delhi)
**Blocking:** Phase 2 compound enrichment sprint
**Action:** Same approach as FooDB — explain the product mission, offer attribution in the app and in all marketing materials, propose a commercial licensing arrangement. Academic institutions often respond well to mission-aligned startups.
**Effort:** 1–4 week negotiation

---

### 1C — VCF Database Subscription
**What:** Volatile Compounds in Food (VCF) database by BeWiDo BV. Subscription-based access to 13,200+ volatile compounds across 2,015 food products — dual-technique experimentally confirmed data, the gold standard for aroma compound validation.
**Why it matters:** Use as a validation layer to cross-check and enrich compound associations from FlavorGraph/FooDB. Provides concentration and aroma threshold data missing from other sources.
**Contact:** BeWiDo BV via vcf-online.nl
**Blocking:** Science Score validation sprint (want to validate compound associations before scaling)
**Action:** Request pricing and terms. Evaluate whether web interface access or bulk data download is available. May be sufficient as a research/validation tool even without bulk access.
**Effort:** 1 week to evaluate + procurement

---

### 1D — FlavorGraph Underlying Data Provenance Audit
**What:** FlavorGraph (Apache 2.0) is built on top of Recipe1M (recipe co-occurrence) and FlavorDB (compound data). The Apache licence covers the FlavorGraph *code and derived dataset*, but the underlying data sources have their own licences that need to be verified.
**Why it matters:** We are commercially deploying using data derived from FlavorDB (CC BY-NC-SA). FlavorGraph published its derived dataset under Apache 2.0 — this re-publication may or may not be legally clean depending on how FlavorDB's ShareAlike clause applies to derived datasets. Legal review needed before public launch.
**Contact:** Legal counsel with open-source licence expertise
**Blocking:** Public launch (hard block)
**Action:** Engage a lawyer familiar with Creative Commons licensing to review whether FlavorGraph's Apache 2.0 re-publication of FlavorDB-derived data is legally defensible for commercial use. This is the one item that could require a strategy change (e.g. rebuilding compound associations from scratch using only clean sources).
**Effort:** 2–4 week legal review

---

## 2. Legal & Compliance

### 2A — Open Source Notices Page
**What:** Apache 2.0 requires attribution. A `/legal/open-source-notices` page must be live before public launch.
**Content required:**
- FlavorGraph attribution (repo URL, copyright, Apache 2.0 licence link, statement of modifications)
- Any other open-source libraries used in the stack
- Data sources disclaimer (what data powers the Science Score, confidence tiers)
**Blocking:** Public launch
**Action:** Build the page as part of the launch sprint. Template text is in DR-08 of the PRD.
**Effort:** 1 day (copy already drafted in PRD)

---

### 2B — GDPR Compliance for Pro Tier
**What:** When Pro tier launches (accounts, email addresses, session data), GDPR compliance is required for EU users.
**Required:**
- Privacy policy covering data collection, retention, deletion rights
- Cookie consent for EU users (applies to free tier too — localStorage and any analytics)
- Data processing agreement template for Enterprise/API customers
- Right-to-be-forgotten implementation in user data model
**Blocking:** Pro tier launch
**Action:** Draft privacy policy and cookie consent before Pro tier ships. Engage legal counsel for DPA template.
**Effort:** 1–2 weeks

---

### 2C — Allergen Disclaimer Legal Review
**What:** FlavorLab displays dietary and allergen filter results. In some jurisdictions, providing allergen information creates implied liability. Legal review needed on disclaimer language.
**Blocking:** Public launch (risk mitigation, not hard block)
**Action:** Have counsel review the allergen disclaimer copy: *"Compound data reflects chemical similarity, not allergen presence in the final dish."* Ensure it adequately limits liability.
**Effort:** 1–2 days of legal review

---

## 3. Non-Western Ingredient Data Coverage

### 3A — Indian/South Asian Ingredients (IMPPAT 2.0)
**What:** IMPPAT 2.0 covers 4,010 Indian medicinal plants with 17,967 phytochemicals. Many are flavor-active. Licence appears open.
**Action:** Download dataset, map phytochemicals to flavor compounds via PubChem cross-reference, ETL into ingredient database with appropriate confidence tier labelling.
**Blocking:** Phase 2 coverage expansion
**Effort:** 1 sprint (ETL + mapping work)

---

### 3B — Latin American Ingredients (LANaPDB)
**What:** LANaPDB covers 13,578 compounds from 7 Latin American countries. Open access.
**Action:** Same approach as IMPPAT — cross-reference with PubChem, map to flavor-active compounds, ETL.
**Blocking:** Phase 2 coverage expansion
**Effort:** 1 sprint

---

### 3C — Chinese Traditional Ingredients (TCM@Taiwan)
**What:** 58,000 compounds from Chinese traditional medicine. Licence requires review.
**Action:** Review licence terms, then ETL flavor-relevant compounds.
**Blocking:** Phase 2 coverage expansion
**Effort:** Licence review (1 week) + 1 sprint

---

### 3D — Sub-Saharan African, Southeast Asian, Middle Eastern Ingredients
**What:** No comprehensive database exists for these regions. Gap is confirmed and documented.
**Options:**
1. Mine regional food science journals (Food Chemistry, Journal of Food Science) for GC-MS papers on specific ingredients — manual or NLP-assisted
2. Partner with regional food science institutions or universities for data sharing
3. Commission targeted GC-MS analyses for highest-demand missing ingredients (expensive but creates proprietary data moat)
**Blocking:** Phase 3 global coverage milestone
**Effort:** Ongoing; strategy decision needed before sprint planning

---

## 4. Product Features (Post-MVP)

### 4A — Cross-Device Sync (Pro Tier Upsell)
**What:** Free tier uses localStorage (device-scoped). Cross-device sync requires user accounts and server-side preference storage.
**Blocking:** Pro tier account system
**Effort:** 1 sprint (requires auth layer)

---

### 4B — Fridge Mode
**What:** Multi-ingredient "what can I make with these?" feature. Requires intersection logic across multiple ingredient compound sets.
**Blocking:** Core ingredient/pairing search validated and stable
**Effort:** 1 sprint

---

### 4C — Trending This Week / Frontier Feed
**What:** Requires minimum community data volume (≥1,000 ratings across ≥200 pairings) to be meaningful. Launching before this volume exists produces an empty or misleading feed.
**Trigger:** Community ratings milestone
**Effort:** 1 sprint

---

### 4D — Chef's Notebook + PDF Export (Pro)
**What:** Requires authenticated Pro accounts and a PDF generation service.
**Blocking:** Pro tier auth layer
**Effort:** 1 sprint

---

### 4E — Menu Harmony Analysis (Pro)
**What:** PDF/text parsing pipeline + cross-menu ingredient conflict analysis.
**Blocking:** Pro tier + Chef's Notebook stable
**Effort:** 2 sprints

---

### 4F — Embeddable Widget (Enterprise)
**What:** CDN-hosted JS snippet for third-party sites. Requires API stability and CSP documentation.
**Blocking:** B2B API v1 stable
**Effort:** 1 sprint

---

### 4G — Flavor Science Blog / Mini-Course
**What:** Content investment. Requires editorial resources.
**Blocking:** Post-traction (need user base to justify content spend)
**Effort:** Ongoing editorial programme

---

## 5. Infrastructure & Ops

### 5A — Qdrant Migration (Vector DB)
**What:** If pgvector search becomes a latency bottleneck at scale, migrate embeddings to Qdrant for vector-native filtering and higher-concurrency retrieval.
**Trigger:** p95 search latency > 300ms under load, or vector search becomes central product feature
**Effort:** 1 sprint (abstraction layer in DR-12 makes this a swap, not a rebuild)

---

### 5B — Monitoring & Observability Stack
**What:** Error tracking (Sentry or equivalent), APM (Datadog/New Relic), structured logging, alerting on p95 latency and error rate.
**Blocking:** Production launch (not day-1 MVP but required before marketing push)
**Effort:** 1 sprint

---

### 5C — Admin Dashboard
**What:** Moderation queue (Hive Score pending ratings), ETL re-seed controls, cache invalidation controls, ingredient submission review, API usage dashboard for Enterprise customers.
**Blocking:** Community ratings at scale + Pro/API tier launch
**Effort:** 2 sprints

---

## Priority Order (Recommended)

| Priority | Task | When |
|---|---|---|
| 1 | **1D** — FlavorGraph data provenance legal review | Before public launch (hard block) |
| 2 | **2A** — Open Source Notices page | Before public launch |
| 3 | **2C** — Allergen disclaimer legal review | Before public launch |
| 4 | **1A** — FooDB licence negotiation | Start now, during MVP build |
| 5 | **1B** — FlavorDB2 licence negotiation | Start now, during MVP build |
| 6 | **1C** — VCF subscription | Before Phase 2 data validation |
| 7 | **2B** — GDPR compliance | Before Pro tier launch |
| 8 | **5B** — Monitoring stack | Before marketing push |
| 9 | **3A/3B/3C** — Non-Western ingredient ETL | Phase 2 coverage sprint |
| 10 | **4A–4G** — Post-MVP features | Per roadmap |

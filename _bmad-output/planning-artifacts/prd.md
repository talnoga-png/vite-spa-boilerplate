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

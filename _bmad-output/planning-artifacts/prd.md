---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success']
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

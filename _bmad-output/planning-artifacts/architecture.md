---
stepsCompleted: ['step-01-init', 'step-02-context']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/flavorGraph-research.md'
  - '_bmad-output/project-context.md'
  - 'index.html'
  - 'src/main.js'
  - 'src/style.css'
workflowType: 'architecture'
project_name: 'FlavorLab™'
user_name: 'Pentalisman'
date: '2026-03-28'
---

# Architecture Decision Document — FlavorLab™

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements — 11 FRs across 4 capability domains:**

| Domain | FRs | Architectural Weight |
|---|---|---|
| Search & Pairing Engine | FR-01, FR-02, FR-08, FR-09 | High — ≤300ms p95, multi-signal scoring, fuzzy match, provenance tracking |
| Community & Scoring | FR-03, FR-04 | High — eventually consistent, velocity spike detection, quarantine model, moderation |
| Personalisation & UX | FR-05, FR-06, FR-07 | Medium — localStorage-based, mobile responsive, no auth required |
| Pro / API tier | FR-10, FR-11 | Medium now, High post-MVP — versioned API, rate limiting, PDF generation |

**Non-Functional Requirements:**
- Search ≤300ms p95 — requires pre-computed pairings, Redis cache, no runtime graph traversal
- Autocomplete ≤100ms p95 — separate minimal in-memory index
- Page load ≤2s on 4G mobile — Vite build optimisation, lazy-loaded science card content
- API uptime ≥99.5% — graceful degradation when DB unavailable
- Scale: 50,000+ ingredient documents, 10M+ rating records without index redesign
- Security: OWASP Top 10, rate limiting all public endpoints
- Accessibility: WCAG 2.1 AA, `prefers-reduced-motion` on all animations
- Legal: zero hallucinated pairings, data provenance per compound association (DR-01)

### Technical Constraints & Dependencies

**Frontend:**
- Marketing page (`flavorlab.io`) stays vanilla JS / Vite as-is — no changes
- Product app (`flavorlab.io/app`) is a new separate build using a framework (TBD in Step 3)
- Both served from the same domain for SEO authority consolidation

**Data pipeline:**
- Only FlavorGraph's 35,440 chemical edges qualify for Science Score — recipe co-occurrence edges (111,355) explicitly excluded from Science Score signal
- Every compound-ingredient link carries a confidence tier enforced as a Postgres ENUM constraint: `GC_MS_EXPERIMENTAL` | `LITERATURE_CURATED` | `ML_PREDICTED` | `RECIPE_CO_OCCURRENCE`
- Multi-source ETL: FlavorGraph CSVs + Flavornet + ChemTastesDB + PubChem API enrichment
- ETL must be idempotent — stable pairing edge IDs survive re-seeds

**Scoring:**
- 5 signals stored separately per pairing edge (compound_affinity, graph_similarity, category_affinity, popularity, editorial_boost)
- Formula weights adjustable without re-ETL; score version tracked for cache invalidation

### Confirmed Architectural Decisions (from context analysis)

| # | Decision | Choice |
|---|---|---|
| 1 | Frontend | Marketing stays vanilla JS; product app is new framework-based build |
| 2 | Domain | Same domain — `flavorlab.io` (marketing) + `flavorlab.io/app` (product) |
| 3 | Free tier identity | Anonymous session token — secure HTTP-only cookie, Redis-backed, 30-day TTL |
| 4 | Auth provider | Better Auth — open source, self-hosted, runs on existing Postgres, zero cost |
| 5 | Autocomplete | In-memory prefix index (MVP); abstracted interface for Typesense swap at Growth |
| 6 | Embeddings | FlavorGraph pre-existing Node2Vec (MVP, Apache 2.0); sentence-transformers Phase 2 |
| 7 | Primary DB | Postgres + pgvector + Redis — single DB engine, no MongoDB |
| 8 | Hive Score recalc | Debounced event-driven (≤5 min) + nightly full batch — async, no request latency impact |
| 9 | API surfaces | Two surfaces: `/api/v1/` internal + `/public/v1/` external enterprise; shared service layer |
| 10 | Pairing edge ID | Composite stable key: alphabetically sorted canonical names (`garlic:rosemary`) |

### Cross-Cutting Concerns

1. **Science integrity gate** — DB-level constraint prevents recipe co-occurrence data from appearing in Science Score
2. **Provenance chain** — UI → API → DB → source dataset traceable via `confidence_tier` + `source_citation` fields
3. **Versioned scoring** — Score version field on pairing edges; formula change triggers Redis cache invalidation via versioned keys
4. **Geographic context flags** — Pairings carry cuisine context and food pairing hypothesis applicability (Western validated / East Asian negative correlation / Not validated)
5. **Graceful degradation** — Structured error states when Postgres or Redis unavailable; no silent empty results
6. **ETL idempotency** — `etl_version` + `etl_run_id` per record; upsert semantics throughout
7. **Rating integrity** — Anonymous session token + device fingerprint + per-pairing daily limit + new-account weight decay
8. **Two API surfaces** — Internal presentation API and external enterprise API share service layer but differ in response serialisation and auth

### Scale & Complexity Assessment

- **Complexity level:** High
- **Primary domain:** Full-stack SaaS with data pipeline core — ETL and scoring engine are as important as the API
- **Estimated architectural components:** 9 — ETL pipeline, Ingredient Ontology Service, Postgres data layer, pgvector embedding layer, Redis cache layer, scoring engine, community ratings service, internal REST API, external enterprise REST API
- **Highest risk component:** Multi-source ETL with confidence tier tracking — Ingredient Ontology Service (canonical name normalisation across FlavorGraph/FooDB/PubChem naming conventions) is the most complex and most consequential pre-work

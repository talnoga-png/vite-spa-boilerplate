---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns']
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

---

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack SaaS** with clean frontend/backend separation. The backend complexity (multi-signal scoring engine, ETL pipeline, two versioned API surfaces, community ratings, background jobs) justifies an enterprise-grade backend framework. The frontend is a pure SPA — no SSR required, all data is API-fetched.

### Starter Options Considered

| Option | TypeScript DX | BE Complexity Fit | FE Fit | Ops | Scale | Team Fit | **Score** |
|---|---|---|---|---|---|---|---|
| **pnpm workspaces + Vite + NestJS** ✅ | 5 | 5 | 4 | 4 | 4 | 4 | **4.45** |
| Turborepo + Vite + NestJS | 5 | 5 | 4 | 3 | 4 | 3 | 4.10 |
| Next.js full-stack | 4 | 2 | 5 | 5 | 3 | 4 | 3.50 |
| Vite + Express/Fastify | 3 | 3 | 4 | 5 | 3 | 5 | 3.55 |
| SvelteKit + NestJS | 4 | 5 | 3 | 3 | 4 | 2 | 3.65 |
| Vite + Hono | 4 | 2 | 4 | 5 | 3 | 4 | 3.45 |

**Why not Next.js full-stack:** Next.js API routes run as stateless serverless functions — fundamentally incompatible with BullMQ workers (persistent process), nightly batch scoring recalculations, and Redis connection pooling. Adding a separate worker service alongside Next.js produces three deployment units instead of two, with a useless BFF middleman layer.

**Why not Turborepo:** Windows 11 development environment introduces path-handling risk. pnpm workspaces with file-reference packages provides the same shared types benefit (`"@flavorlab/types": "file:../../packages/shared-types"`) with zero orchestration overhead. Turborepo build caching can be added later when CI/CD is established.

**Why Drizzle over TypeORM:** Drizzle schema definitions ARE TypeScript types — no decorator magic, no `@Entity()`, no class inheritance. `typeof ingredients.$inferSelect` produces the correct type automatically and is importable into the shared-types package. TypeORM entities require a live DB connection to instantiate properly, making unit tests slower and more complex. Critical for the scoring engine test pyramid.

### Selected Starter: pnpm workspaces + Vite React + NestJS + Drizzle ORM

**Rationale:**
- Vite + React — consistent with marketing page toolchain; SPA is correct for product app (no SSR needed); TypeScript template ready
- NestJS — module system, DI container, Guards, Pipes, versioned routing, BullMQ integration; all map directly to FlavorLab™'s service architecture
- Drizzle ORM — schema IS the TypeScript type; superior inference; pgvector column support; healthier test pyramid
- pnpm workspaces — shared `@flavorlab/types` package enforces API contract between frontend and backend; Windows-safe; zero additional tooling

**Initialization Commands:**

```bash
# Step 1: Bootstrap pnpm workspace monorepo
mkdir flavorlab && cd flavorlab
pnpm init
echo "packages:\n  - 'apps/*'\n  - 'packages/*'" > pnpm-workspace.yaml

# Step 2: Product app frontend
npm create vite@latest apps/web -- --template react-ts

# Step 3: Backend API
npx @nestjs/cli@latest new apps/api --package-manager pnpm

# Step 4: Shared types package
mkdir -p packages/shared-types && cd packages/shared-types && pnpm init

# Step 5: Add Drizzle ORM to API
cd ../../apps/api
pnpm add drizzle-orm pg && pnpm add -D drizzle-kit @types/pg
```

**Resulting workspace structure:**

```
flavorlab/
├── apps/
│   ├── web/                    # Vite + React + TS → flavorlab.io/app
│   └── api/                    # NestJS + TS → REST API server
├── packages/
│   ├── shared-types/           # TS interfaces: Ingredient, Pairing, ScienceCard, HiveScore
│   └── shared-config/          # ESLint + TypeScript base configs
├── pnpm-workspace.yaml
└── package.json
```

**NestJS backend module structure:**

```
apps/api/src/
├── modules/
│   ├── ingredients/            # Search, autocomplete, ingredient lookup
│   ├── pairings/               # Pairing engine, Science Score retrieval
│   ├── ratings/                # Community Hive Score, BullMQ jobs
│   ├── users/                  # Better Auth session management
│   └── etl/                    # ETL orchestration + status endpoints
├── api/                        # Internal /api/v1/ controllers
├── public/                     # Enterprise /public/v1/ controllers
├── database/                   # Drizzle schema, migrations, client
├── cache/                      # Redis service (ioredis)
└── scoring/                    # Pure TS scoring engine (zero framework deps)
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- TypeScript 5.x throughout — strict mode, shared `tsconfig` base in `packages/shared-config`
- Node.js runtime (NestJS API), browser target (Vite SPA)

**Styling Solution:**
- No opinion from starter — product app will use CSS Modules or Tailwind (TBD in UX Design phase)
- Marketing page retains its existing flat CSS — no change

**Build Tooling:**
- Frontend: Vite 5.x — HMR, ESM, optimised production bundles
- Backend: NestJS CLI / tsc — watch mode for development
- Monorepo: pnpm workspaces — no build cache tooling at MVP; add Turborepo post-launch

**Testing Framework:**
- NestJS: Jest (included by default)
- Frontend: Vitest (same config as Vite, add as dev dependency)
- E2E: Playwright (add post-Sprint 1)
- Test pyramid: Unit (Vitest, pure functions) → Integration (NestJS test module + test Postgres container) → E2E (Playwright)

**Development Experience:**
- `pnpm dev` — starts both Vite dev server (port 5174) and NestJS watch mode (port 3000) in parallel
- Hot reload on frontend; NestJS `--watch` flag on backend
- Shared types auto-resolved via workspace path references
- `@nestjs/cli` scaffold commands for new modules

### Implementation Principles (from A+P analysis)

1. **Scoring engine isolation** — The scoring algorithm (`compound_affinity × 0.35 + graph_similarity × 0.25 + ...`) lives in `apps/api/src/scoring/` as a pure TypeScript function. Zero NestJS decorators, zero Drizzle imports. Input: signal values. Output: weighted score. Independently unit-testable, independently replaceable.

2. **`confidence_tier` ENUM in schema from Sprint 1** — Drizzle schema includes `pgEnum('confidence_tier', ['GC_MS_EXPERIMENTAL', 'LITERATURE_CURATED', 'ML_PREDICTED', 'RECIPE_CO_OCCURRENCE'])` from day one. Not a Sprint 3 refinement — it's the data integrity differentiator and science honesty guarantee.

3. **Skeleton states as UI convention** — Product app uses skeleton loading states (not spinners, not blank screens) for all async data fetches. Established as a project-wide convention in Sprint 1, applied to every data-dependent component.

4. **Deployment catch-all routing** — Vite SPA requires server-side catch-all (`/*` → `index.html`) to support direct URL access (e.g. `/app/ingredient/garlic`). Configured in Nginx/Caddy deployment config, not a code change.

**Note:** Project initialization using the commands above is the first implementation story in Epic 1, Story 1.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Drizzle migration strategy — versioned files, auto-run on startup
- Zod validation — at all API boundaries before DB touch
- Redis cache key design — versioned keys for score invalidation
- Authorization tier model — Guards + ApiKeyStrategy from Sprint 1
- Rate limiting — all public endpoints, Redis-backed

**Important Decisions (Shape Architecture):**
- TanStack Query + Zustand for frontend state
- TanStack Router for typed client-side routing
- shadcn/ui component library
- Tailwind CSS v4 for product app
- Cursor-based pagination
- Global ExceptionFilter for error response standard
- Structured logging via nestjs-pino

**Deferred Decisions (Post-MVP):**
- Real-time Hive Score updates (SSE/WebSocket) — 30s polling sufficient at MVP
- Turborepo build caching — add when CI/CD is established
- Full monitoring stack (Sentry/Datadog) — flagged in post-mvp-tasks.md as 5B
- Qdrant migration — only if pgvector latency exceeds 300ms p95 under load

---

### Data Architecture

#### Migrations
- **Tool:** `drizzle-kit generate` → versioned SQL migration files committed to git
- **Execution:** `drizzle-orm/node-postgres` `migrate()` runs automatically on app startup
- **Rationale:** Only production-safe approach; `push` mode is dev-only. Migration history is the source of truth for schema state.

#### Data Validation
- **Tool:** Zod throughout — API input, environment variables, shared type schemas
- **NestJS integration:** `nestjs-zod` adapter bridges Zod schemas into NestJS validation pipes
- **Rationale:** Consistent with Drizzle's no-decorator philosophy; works in both API and frontend (form validation); Zod schemas in `shared-types` are reusable across the monorepo

#### Redis Caching Strategy

| Cache key pattern | TTL | Invalidation trigger |
|---|---|---|
| `pairing:{id}:v{scoreVersion}` | 24h | Score formula version change |
| `ingredient:{canonicalName}:top50` | 6h | ETL re-seed |
| `autocomplete:prefix:{prefix}` | 1h | Ingredient ontology update |
| `session:{token}` | 30d | Explicit logout |
| `ratelimit:{ip}:{endpoint}` | 60s | Rolling window |

Score version embedded in cache key means formula changes auto-invalidate without a manual flush script.

#### DB Read Strategy
- **Approach:** Normalised `pairings` table with Postgres partial index on `(ingredient_a, ingredient_b, score DESC)`
- **Read path:** Redis cache hit → return; miss → Postgres query → Redis SET → return
- **Rationale:** Avoid pre-computed denormalisation — let Redis be the read cache layer. Normalised schema supports ETL re-seeds without orphaning data.

---

### Authentication & Security

#### Authorization Tier Model
```
Anonymous     → session token cookie only (Redis-backed, 30-day TTL)
Free          → Better Auth JWT + session
Pro           → Better Auth JWT + plan: 'pro' claim
Enterprise    → API key in Authorization header (hashed in Postgres)
```
- NestJS `@Roles()` decorator + `RolesGuard` checks JWT `plan` claim
- Enterprise `ApiKeyStrategy` via Passport — separate from JWT flow
- API keys stored as bcrypt hashes; plaintext shown only at creation

#### Rate Limiting
- **Tool:** `@nestjs/throttler` with `@nestjs-throttler-storage-redis`
- Anonymous: 60 req/min per IP
- Free registered: 120 req/min per user token
- Enterprise `/public/v1/`: 1,000 req/min per API key (configurable per customer record)

#### Security Headers & CORS
- `helmet` middleware — OWASP security headers (CSP, HSTS, X-Frame-Options, etc.)
- CORS whitelist: `flavorlab.io` and `flavorlab.io/app` origins only
- All inputs validated via Zod pipes before any DB query
- Drizzle uses parameterised queries by default — no raw string interpolation

---

### API & Communication Patterns

#### API Documentation
- **Tool:** `@nestjs/swagger` — generates OpenAPI 3.0 spec from controller annotations
- `/api/docs` serves Swagger UI (internal, dev/staging only)
- `openapi.json` exported and committed — used to generate enterprise API reference docs

#### Error Response Standard
```json
{
  "statusCode": 404,
  "error": "NOT_FOUND",
  "message": "Ingredient 'foobar' not found",
  "requestId": "req_abc123",
  "timestamp": "2026-03-28T12:00:00Z"
}
```
- Implemented as a global NestJS `ExceptionFilter` applied to both API surfaces
- `requestId` from request-scoped UUID — links API response to structured log entry

#### Pagination
- **Strategy:** Cursor-based (not offset) for all list endpoints
- **Shape:** `{ data: [...], nextCursor: "base64string", hasMore: boolean }`
- **Rationale:** Offset pagination breaks with concurrent inserts; cursor-based is stable at 10M+ rating records

#### Real-time Updates
- **MVP strategy:** Client polls every 30s for Hive Score updates
- **Rationale:** Scoring recalc is ≤5 min debounced — real-time adds infrastructure complexity for marginal UX gain at MVP
- **Post-MVP:** SSE or WebSocket if user research validates the need

---

### Frontend Architecture

#### State Management
- **Server state:** TanStack Query (`@tanstack/react-query`) — caching, background refetch, loading/error states, stale-while-revalidate. Covers ingredient data, pairings, science cards, Hive Scores.
- **Client state:** Zustand — dietary filters, saved pairings list, UI panel states. Persisted to localStorage via `zustand/middleware`.
- **No Redux.** No Context API for data (Context only for theme).

#### Routing
- **Tool:** TanStack Router (`@tanstack/react-router`)
- Fully TypeScript-typed routes — route params are typed, no `useParams()` returning `string | undefined`
- File-based routing: `/app/ingredient/:canonicalName`, `/app/pairing/:id`, `/app/search`
- Integrates natively with TanStack Query for route-level data loading

#### Component Library
- **Tool:** shadcn/ui (Radix UI primitives + Tailwind)
- Components are copied into the codebase (not an npm dependency) — no version lock-in, fully customisable
- Key components: science card, rating widget, autocomplete dropdown, dietary filter panel, skeleton loaders
- Design tokens from `--primary: #1B4332` and `--accent: #C8663B` mapped to Tailwind theme variables

#### CSS Approach
- **Tool:** Tailwind CSS v4 for product app
- Marketing page retains existing flat CSS — no change, no migration
- Tailwind v4 uses CSS-native cascade layers; no `tailwind.config.js` required
- Design tokens shared between marketing page and product app via CSS custom properties

#### Bundle Optimisation
- Science card content (compound explanations, citations) lazy-loaded via `React.lazy()` + `Suspense`
- Route-level code splitting via TanStack Router (automatic)
- Target: initial bundle < 150kB gzipped
- `prefers-reduced-motion` respected on all animations (WCAG 2.1 AA requirement)

---

### Infrastructure & Deployment

#### Hosting
- **Platform:** Railway — supports Node.js long-running processes, managed Postgres with pgvector extension, managed Redis, custom domains, GitHub auto-deploy
- **Services:** `web` (Vite static), `api` (NestJS), `worker` (ETL + BullMQ), `postgres`, `redis`
- **Rationale:** Zero cost at MVP tier; single platform; upgrade path is paid Railway plans

#### Local Development
- Docker Compose for data services only (Postgres + pgvector + Redis)
- NestJS and Vite run natively on Node — faster DX than full containerisation

```yaml
# docker-compose.yml
services:
  postgres:
    image: pgvector/pgvector:pg16
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: flavorlab_dev
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

#### CI/CD
- **Tool:** GitHub Actions — free tier, runs on push to `main`
- Pipeline: typecheck → lint → unit tests → integration tests → build → deploy to Railway
- One workflow file: `.github/workflows/ci.yml`

#### Environment Configuration
- `.env` files validated with Zod at app startup — missing required vars cause immediate crash with clear error
- Schema defined in `apps/api/src/config/env.schema.ts`, importable across packages

```typescript
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test'])
})
```

#### Reverse Proxy / Domain Routing
- **Tool:** Caddy (or Railway's built-in routing)
- `flavorlab.io/*` → static Vite build (marketing page)
- `flavorlab.io/app/*` → Vite SPA catch-all → `index.html`
- `flavorlab.io/api/*` → NestJS internal API (port 3000)
- `flavorlab.io/public/*` → NestJS enterprise API (port 3000, separate router prefix)

#### Logging
- **Tool:** `nestjs-pino` — structured JSON logs to stdout; Railway captures and indexes
- `requestId` propagated through request lifecycle for log correlation
- Full monitoring stack (Sentry + APM) deferred to post-launch sprint (post-mvp-tasks.md 5B)

---

### Decision Impact Analysis

**Implementation Sequence:**
1. Docker Compose data services + env schema validation (Sprint 0 — local dev foundation)
2. Drizzle schema + migrations (Sprint 1 — `confidence_tier` ENUM mandatory)
3. NestJS module scaffold + Zod pipes + ExceptionFilter (Sprint 1)
4. Better Auth + RolesGuard + rate limiting (Sprint 1 — before any endpoint goes live)
5. Ingredient search + autocomplete endpoints (Sprint 1 — core loop)
6. Vite React app + TanStack Router + TanStack Query (Sprint 1 — frontend core loop)
7. shadcn/ui skeleton states convention (Sprint 1 — established, not deferred)
8. Scoring engine pure function + BullMQ Hive Score jobs (Sprint 2)
9. Community ratings endpoints (Sprint 2)
10. `/public/v1/` enterprise API + ApiKeyStrategy (Sprint 3)
11. GitHub Actions CI/CD + Railway production deploy (Sprint 3)

**Cross-Component Dependencies:**
- Drizzle schema must exist before any NestJS service can query DB
- `confidence_tier` ENUM must be in schema before ETL pipeline imports data
- `@flavorlab/types` shared package must be initialised before frontend and backend can share type contracts
- Better Auth session table must exist before any authenticated endpoint is testable
- Redis must be running before rate limiting, caching, or BullMQ job queues work
- Scoring engine pure function must be complete before Hive Score BullMQ job can call it


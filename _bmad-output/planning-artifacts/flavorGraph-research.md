# FlavorGraph Dataset — Research Document

**Source:** https://github.com/lamypark/FlavorGraph
**Analyzed:** 2026-03-24
**Purpose:** Primary data source for FlavorLab™ ingredient pairing engine

---

## What FlavorGraph Is

A food pairing recommendation system built on graph embeddings. Models ~8,000 nodes (ingredients + flavor compounds) connected by ~147,000 edges (chemical similarity scores), trained on 1M+ recipes and 1,500 flavor molecules.

---

## Data Files & Structure

### nodes_191120.csv — Node Entity
| Field | Type | Notes |
|---|---|---|
| `node_id` | Integer | Non-contiguous sequential ID |
| `name` | String | Standardized with underscores (e.g. `albacore_tuna`) |
| `node_type` | Enum | `"ingredient"` or `"compound"` |
| `is_hub` | Enum | `"hub"` or `"no_hub"` — marks primary/core nodes |

**Scale:** ~8,000 total nodes

### edges_191120.csv — Edge Entity
| Field | Type | Notes |
|---|---|---|
| `id_1` | Integer | References node_id |
| `id_2` | Integer | References node_id |
| `score` | Float (0.0–1.0) | Chemical/co-occurrence similarity weight |
| `edge_type` | Enum | `"ingr-ingr"` or `"ingr-compound"` |

**Scale:** ~147,000 edges

### dict_ingr2cate CSV — Ingredient Taxonomy
- 616 hub ingredients mapped to 13+ food categories
- Categories: Seafood, Meat/Animal Product, Plant/Vegetable, Fruit, Nut/Seed, Spice, Cereal/Crop/Bean, Fungus, Flower, Dairy, Essential Oil/Fat, Bakery/Dessert/Snack, Sauce/Powder/Dressing, Beverage Alcoholic, Beverage, Dish/End Product

### Binary/Serialized Files (not in repo — downloaded separately)
| File | Size | Purpose |
|---|---|---|
| Pairing paths | 209 MB | Pre-generated metapath walk sequences |
| `node2fp_revised_1120.pickle` | 11 MB | Chemical fingerprints (molecular structure bitstrings) |
| Embeddings (output) | ~10 MB | 300-dim embedding vectors + t-SNE projections |

---

## How the Data Is Currently Used

- CSVs load into memory via `pandas.read_csv()` → NetworkX graph construction
- Graph traversal via `nx.neighbors()` filtered by node type and hub status
- Training: Skip-gram/Word2Vec over metapath walk sequences
- Output: Pickle-serialized 300-dim embedding vectors

**There is no existing API or database — purely a batch ML pipeline.**

---

## Database Strategy Decision

### Why NOT pure graph traversal at runtime:
- 147K edges between 8K nodes = relationship-first model
- MongoDB has no native graph traversal
- Recursive `$lookup` for multi-hop queries would be slow and complex

### Chosen Approach: MongoDB with Pre-computed Pairings
Pre-process the CSVs at import time and store each ingredient as a document:

```json
{
  "name": "garlic",
  "category": "Plant/Vegetable",
  "is_hub": true,
  "node_id": 42,
  "pairings": [
    { "name": "onion", "score": 0.92, "shared_compounds": ["allicin", "diallyl sulfide"] },
    { "name": "rosemary", "score": 0.88, "shared_compounds": ["linalool", "terpineol"] },
    { "name": "lemon", "score": 0.84, "shared_compounds": ["limonene", "citral"] }
  ],
  "top_compounds": ["allicin", "diallyl sulfide", "linalool"],
  "aroma_families": ["pungent", "sulfurous", "herbal"]
}
```

**Why this works:**
- Fast lookups by name (indexed)
- Pre-computed top-N pairings avoid runtime graph traversal
- Compound data embedded per ingredient for science cards
- Scales easily to 8K documents
- Supports all V1 features: search, Fridge Mode, Substitute Mode, Match Scoring

### Future Graph Features (V2+)
If multi-hop traversal is needed later (e.g. "ingredients 2 hops from garlic"), consider adding Neo4j or Apache AGE on top of PostgreSQL alongside MongoDB.

---

## Key Implications for FlavorLab™ PRD

1. **~8,000 ingredients** available in the database — enough for comprehensive coverage including beverages, spices, compounds
2. **Similarity scores (0–1)** directly map to the Match Degree Scoring feature
3. **147,000 pre-computed pairings** — no AI inference needed at runtime, pure data lookup
4. **13+ food categories** support the Dietary Filter and category-based browsing
5. **Chemical compound names** available to power the "Why It Works" science cards and Dual-Layer explanations
6. **Hub vs non-hub nodes** distinguish primary ingredients (user-facing) from flavor compounds (science layer)
7. **No licensing info found** — legal review recommended before commercial use of the dataset
8. **Import pipeline needed** — a one-time ETL script to transform CSVs → MongoDB documents

---

## Data Import Pipeline (Required Pre-Work)

Before any feature can work, a data import script must:
1. Read `nodes_191120.csv` + `edges_191120.csv` + category mapping CSV
2. For each hub ingredient node: collect all edges, sort by score descending, take top N pairings
3. For each pairing: look up shared compound nodes
4. Write as MongoDB document with embedded pairings array
5. Create indexes on `name`, `category`, `is_hub`

This is a prerequisite story for the entire product and must be Epic 1, Story 1.

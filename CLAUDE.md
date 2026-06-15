# CLAUDE.md — MFG Strategy Planning Map (v3)

Onboarding guide for any agent working on this repo. Read this first.
For the history of *why* things are the way they are, see **[MEMORY.md](MEMORY.md)**.

## What this is

An interactive strategy planning map for MFG. Four phases (**Discover → Create →
Activate → Analyze**), each with subphases and lanes (**Jobs to be done**, **Key
opportunities**, **Enablers**), plus two cross-cutting pages: a **Value Tree Map**
(phase → value dimension → opportunity → enablers + KPIs) and a roadmap **Timeline**.

## Architecture (one Cloud Run service)

FastAPI serves both the JSON API and the static frontend from a single container.

```
Excel workbook ──▶ loader.py ──▶ Pydantic schema ──▶ GET /api/strategy ──▶ web/boot.js ──▶ web/app.js
(source of truth)   (mapping)     (validation)        (FastAPI)            (fetch+globals)  (vanilla-JS render)
```

- **`server/`** — FastAPI app.
  - `app/main.py` — routes: `GET /api/strategy` (full payload), `GET /healthz`, and mounts `web/` at `/`.
  - `app/data/loader.py` — maps the Excel sheets into the API shape (cached; `?refresh=1` re-reads). Falls back to `fallback.json` if the Excel is missing/invalid.
  - `app/schema.py` — the Pydantic contract (`StrategyResponse` = `{strategy, valueTree, timeline}`). **This is the source of truth for the data shape.**
  - `app/excel/strategy.xlsx` — the bundled workbook (sheets: `JTBD`, `Overview MFG enablers `, `Value Framework`, `Value Trees`).
  - `app/data/fallback.json` — offline fallback payload; **generated** from the loader (see below).
  - `tests/` — pytest.
  - `scripts/` — `smoke_render.cjs` (headless frontend render check), `build_excel_mapping.py` (emits `excel-mapping.html`), `build_icons.cjs`.
- **`web/`** — vanilla-JS frontend.
  - `boot.js` fetches `/api/strategy`, exposes `window.strategyData` / `valueTreeData` / `timelineEnablers`, then loads `app.js`. If the API is unreachable it falls back to the bundled `data-fallback.js`.
  - `app.js` (render + nav), `styles.css`, `index.html`, `icons.js`, `data-fallback.js` (**generated**), `assets/`.
- **`demo/`** — `build-demo.cjs` (tracked) builds `strategy-map-demo.html`, a single self-contained file (no server) for sharing. The generated `.html` is git-ignored; rebuild it from `web/`.
- **`archived/`** — pre-v3 prototypes (v1 root files + v2 + the old v3 standalone). **Ignore it**; not part of the app, git-ignored.

## Commands

```bash
# Run locally (http://127.0.0.1:8000/)
cd server && uv sync && uv run uvicorn app.main:app --reload --port 8000

# Tests
cd server && uv run pytest

# Headless frontend smoke (catches render/JS crashes). 'excel' mode needs /tmp/excel_data.json:
node server/scripts/smoke_render.cjs fallback
cd server && uv run python -c "from app.data.loader import load_data; import json; open('/tmp/excel_data.json','w').write(json.dumps(load_data(refresh=True).model_dump(exclude_none=True)))" && cd .. && node server/scripts/smoke_render.cjs excel

# Rebuild the standalone shareable demo after ANY change under web/
node demo/build-demo.cjs   # writes demo/strategy-map-demo.html

# Deploy (build context is the repo root; copies server/ + web/)
gcloud run deploy strategy-map --source . --region europe-west1 --allow-unauthenticated
```

Live: https://strategy-map-454573262443.europe-west1.run.app (project `vmlmap-agentic-dev`).

## Data workflow & gotchas

- **The Excel is the source of truth.** To change content, edit/replace
  `server/app/excel/strategy.xlsx`, then regenerate the two derived files below. Don't
  hand-edit `fallback.json` or `data-fallback.js`.
- **Regenerate the derived data from the loader** (so the offline fallback + demo match the live API exactly):
  ```bash
  cd server
  # fallback.json (server offline fallback)
  uv run python -c "import json; from app.data.loader import load_data; p=load_data(refresh=True).model_dump(exclude_none=True); open('app/data/fallback.json','w',encoding='utf-8').write(json.dumps(p,ensure_ascii=False,indent=2)+'\n')"
  # web/data-fallback.js (browser fallback + demo source): emits const strategyData/valueTreeData/timelineEnablers
  ```
  (See MEMORY.md / the plan for the full `data-fallback.js` generator snippet.)
- After any `web/` change, **rebuild the demo** (`node demo/build-demo.cjs`).
- The **Timeline** is date-gated: the Excel carries no dates, so enablers show on the
  roadmap only after a user sets an expected-completion date in the UI (in-memory, resets on reload).
- `excel-mapping.html` (repo root, git-ignored) is a generated coverage map — rebuild with
  `cd server && uv run python scripts/build_excel_mapping.py`.
- Phase id quirk: the Excel says **"Analyze"** but the stable id is **`analyse`** (aliased in `loader._PHASE_ALIAS`).

## Conventions

- Backend: Python 3.12, FastAPI, Pydantic v2, `uv` for deps/run. Loader never crashes the
  app — a bad sheet falls back to `fallback.json`.
- Frontend: vanilla JS, no build step. Template-literal rendering; `esc()` all dynamic text.
  Match the existing comment density and idiom.
- Commit in small, focused steps. The Dockerfile copies only `server/` + `web/`, so root
  docs/configs add no deploy weight.

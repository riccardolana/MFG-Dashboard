# Strategy Planning Map — server

FastAPI backend that serves the strategy data API **and** the static `web/` frontend from a
single service (suits Cloud Run).

## Endpoints
- `GET /api/strategy` — full payload `{ strategy, valueTree, timeline }`. `?refresh=1` re-reads the source.
- `GET /healthz` — liveness probe.
- `GET /` — the `web/` frontend.

## Run locally
```bash
cd server
uv sync
uv run uvicorn app.main:app --reload --port 8000
# open http://127.0.0.1:8000/
```

## Data source
`app/data/loader.py` returns the validated payload (`app/schema.py`). Today it reads
`app/data/fallback.json` (the v3 data extracted verbatim). When `app/excel/strategy.xlsx`
is present, the loader will map its rows into the same schema (Phase C — not yet
implemented); the JSON remains the fallback if the Excel is missing or fails validation.

Override the Excel path with `STRATEGY_XLSX=/path/to/file.xlsx`.

## Deploy (held)
Build context is the **repo root** (`MFG/`) so `server/` and `web/` are both copied.
```bash
gcloud run deploy strategy-map --source . --region <region> --allow-unauthenticated
```
Target: a dedicated **MFG Dashboard** GCP project (to be created). Pending the Figma redesign.

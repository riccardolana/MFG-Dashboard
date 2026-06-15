# MFG Strategy Planning Map (v3)

Interactive strategy planning map for MFG: phases → subphases → lanes (Jobs to be done,
opportunities, enablers) with an expandable JTBD sidecard and a roadmap timeline.

Single Cloud Run service: a FastAPI backend serves both the strategy API and the static
frontend.

## Structure
- `server/` — FastAPI app (`app/main.py`). Serves `GET /api/strategy` (data from the Excel
  workbook with a JSON fallback) and the static `web/` frontend.
- `web/` — vanilla-JS frontend (`app.js`, `styles.css`, `index.html`, data + icon bundles).
- `Dockerfile` — single container; build context is the repo root.

## Run locally
```bash
cd server
uv sync
uv run uvicorn app.main:app --reload --port 8000
# open http://127.0.0.1:8000/
```

## Deploy (Cloud Run)
```bash
gcloud run deploy strategy-map --source . --region europe-west1 --allow-unauthenticated
```
Live: https://strategy-map-454573262443.europe-west1.run.app

## Demo (standalone, no server)

`demo/strategy-map-demo.html` is a single self-contained file built from `web/` via
`node demo/build-demo.cjs` (inlines CSS/JS and base64-encodes assets). Open it directly
in a browser to share without deploying. Rebuild it after any change under `web/`.
The generated `.html` is git-ignored; `demo/build-demo.cjs` is tracked.

On enabler cards (subphase lane, timeline, and modal) you can edit the **Expected
completion** date and the **Integration status** (Not started → In progress → Completed).
Status and date share one row and a single confirm: ✓ applies both, ✗ reverts. These edits
are **in-memory only** and reset on reload.

"""FastAPI entrypoint: serves the strategy API and the static frontend.

One service, one URL (suits Cloud Run):
  GET /api/strategy   -> full payload (strategy + valueTree + timeline)
  GET /healthz        -> liveness probe
  GET /               -> the web/ frontend (static)
"""

from __future__ import annotations

import os
from pathlib import Path

from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from .data.loader import load_data

# web/ lives at the repo root, sibling of server/. Overridable for Docker/local.
_WEB_DIR = Path(os.environ.get("WEB_DIR", Path(__file__).resolve().parents[2] / "web"))

app = FastAPI(title="Strategy Planning Map", version="3.0.0")


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "ok"}


@app.get("/api/strategy")
def get_strategy(refresh: bool = Query(default=False)) -> JSONResponse:
    data = load_data(refresh=refresh)
    return JSONResponse(content=data.model_dump(exclude_none=True))


# Mount the frontend last so /api/* and /healthz take precedence.
if _WEB_DIR.is_dir():
    app.mount("/", StaticFiles(directory=str(_WEB_DIR), html=True), name="web")

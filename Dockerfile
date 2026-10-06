# Single Cloud Run container: FastAPI serves the strategy API + the static web/ frontend.
# Build context MUST be the repo root (MFG/) so both server/ and web/ are available.
#   docker build -t strategy-map .
#   ./deploy.sh   (own SA, IAP — see _brain/references/cloud-run-deploy.md)
FROM python:3.13-slim

# Patch OS packages at build time so the image does not ship known-CVE libs.
RUN apt-get update && apt-get upgrade -y --no-install-recommends \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Dependencies (pinned in server/pyproject.toml).
COPY server/pyproject.toml ./server/pyproject.toml
RUN pip install --no-cache-dir \
    "fastapi>=0.115" "uvicorn[standard]>=0.30" "pydantic>=2.7" "openpyxl>=3.1"

# App code + frontend.
COPY server ./server
COPY web ./web

ENV WEB_DIR=/app/web \
    PORT=8080
EXPOSE 8080

WORKDIR /app/server
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]

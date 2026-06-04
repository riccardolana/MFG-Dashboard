# Single Cloud Run container: FastAPI serves the strategy API + the static web/ frontend.
# Build context MUST be the repo root (MFG/) so both server/ and web/ are available.
#   docker build -t strategy-map .
#   gcloud run deploy --source .
FROM python:3.12-slim

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

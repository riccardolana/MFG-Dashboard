#!/usr/bin/env bash
# Build + deploy strategy-map (FastAPI serving API + static web/) to Cloud Run,
# following the vmlmap-agentic-dev least-privilege standard (platform team, 2026-09):
#   - own runtime service account with ZERO roles (the app calls no Google API)
#   - --no-allow-unauthenticated (no public invoker)
#   - IAP in front of the service; only WPP Google accounts may pass
# Reference: ~/Projects/_brain/references/cloud-run-deploy.md
set -euo pipefail
cd "$(dirname "$0")"

PROJECT_ID=vmlmap-agentic-dev
REGION=europe-west1
SERVICE=strategy-map
SA_NAME=sa-$SERVICE
SA_EMAIL=$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com
# WPP's Cloud Identity domain — covers vml.com and es.wpp.com Google accounts.
IAP_DOMAINS=(wpp-id.wpp.cloud)

PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')
IAP_SA=service-$PROJECT_NUMBER@gcp-sa-iap.iam.gserviceaccount.com

warn() { printf '  ! %s\n' "$*" >&2; }

echo "▸ runtime service account ($SA_EMAIL, no roles)…"
if ! gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" >/dev/null 2>&1; then
  gcloud iam service-accounts create "$SA_NAME" \
    --display-name="Runtime SA for $SERVICE" --project="$PROJECT_ID"
fi

echo "▸ IAP prerequisites…"
gcloud services enable iap.googleapis.com --project="$PROJECT_ID" --quiet
gcloud beta services identity create --service=iap.googleapis.com --project="$PROJECT_ID" >/dev/null

echo "▸ deploying $SERVICE ($REGION) from source, behind IAP…"
gcloud beta run deploy "$SERVICE" \
  --source . \
  --region="$REGION" \
  --project="$PROJECT_ID" \
  --service-account="$SA_EMAIL" \
  --no-allow-unauthenticated \
  --iap \
  --ingress=all \
  --port=8080 \
  --max-instances=3 \
  --memory=512Mi \
  --quiet

echo "▸ letting the IAP service agent invoke the service…"
gcloud run services add-iam-policy-binding "$SERVICE" --region="$REGION" --project="$PROJECT_ID" \
  --member="serviceAccount:$IAP_SA" --role=roles/run.invoker --quiet >/dev/null \
  || warn "could not grant roles/run.invoker to $IAP_SA — ask the platform team"

echo "▸ granting IAP access to company domains…"
for D in "${IAP_DOMAINS[@]}"; do
  gcloud beta iap web add-iam-policy-binding \
    --member="domain:$D" --role=roles/iap.httpsResourceAccessor \
    --region="$REGION" --resource-type=cloud-run --service="$SERVICE" \
    --project="$PROJECT_ID" --condition=None --quiet >/dev/null \
    || warn "IAP accessor grant for domain:$D refused — ask the platform team"
done

echo "▸ posture check…"
gcloud run services describe "$SERVICE" --region="$REGION" --project="$PROJECT_ID" \
  --format='value(spec.template.spec.serviceAccountName,status.url)'
gcloud run services get-iam-policy "$SERVICE" --region="$REGION" --project="$PROJECT_ID" --format=yaml

echo "▸ done — sign in with a company Google account; IAP blocks everyone else."

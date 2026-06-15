# MEMORY.md — decision & working log

Append-only history of non-trivial changes and decisions, **newest first**. When you make
a meaningful change or decision, add a dated entry (2–5 lines: what changed + why). This is
the *why*; **[CLAUDE.md](CLAUDE.md)** is the *how* (architecture + commands).

Format: `## YYYY-MM-DD — short title` then a few lines.

---

## 2026-06-15 — Repo cleanup: removed v3/, relocated the demo

Deleted the confusingly-named `v3/` folder. Its only source file, the demo builder, moved
to a tracked top-level **`demo/build-demo.cjs`** (it was previously git-ignored inside
`v3/`, i.e. not in git at all). The generated `demo/strategy-map-demo.html` (the shareable
single-file build) is git-ignored — rebuild with `node demo/build-demo.cjs`. The legacy
pre-server standalone (`strategy-planning-map-v3.html`) moved to `archived/`; duplicate
Excel/logo copies in `v3/assets/` were dropped. `build_excel_mapping.py` now reads the
canonical `server/app/excel/strategy.xlsx` instead of the `v3/assets` copy.

**Why:** declutter the root and stop maintaining duplicate data; the deploy never used
`v3/` (Dockerfile copies only `server/` + `web/`), so the live app is unaffected.

## 2026-06-15 — Value Tree Map is now Excel-driven

The Value Tree page was a placeholder: it derived opportunities from JTBD data and showed
`"Enabler TBD"` + a hardcoded KPI string. The new workbook added two sheets — **Value
Framework** (dimension definitions + a "Shared opportunity?" flag) and **Value Trees** (the
authoritative Phase → value dimension → opportunity → enablers + KPIs hierarchy). Wired
end-to-end: typed `ValueTree` models in `schema.py`, `_load_value_tree()` in `loader.py`,
and a dimension-grouped render in `web/app.js` (+ styles). `valueTree` is now `{phases}`,
not the legacy unused `{themes}`.

**Why:** make the value tree reflect the real workshop output, grouped by value dimension
with concrete enablers and KPIs.

**Also:** regenerated `fallback.json` and `web/data-fallback.js` from the loader so the
offline fallback + standalone demo match the live API exactly (this grew the bundled
timeline from a 10-item sample to the full 84-enabler catalog). Verified: only `valueTree`
differs between the prior live deploy and the new payload — `strategy`/`timeline` are
identical, so the redeploy is a contained change.

## 2026-06-15 — Archived pre-v3 prototypes

Moved the original top-level v1 files (`index.html`, `app.js`, `data.js`, `styles.css`,
`strategy-planning-map-share.html`, `intro.md`, `Information architecture.pdf`, root
`assets/`) and the `v2/` folder into `archived/`. They were already git-ignored; this just
declutters the root. `.gitignore`/`.dockerignore` now point the legacy patterns at
`/archived/`. `excel-mapping.html` stayed at root (it's a v3 generated artifact, not legacy).

## 2026-06-05 — Enabler date/status editing

Added in-card editing of an enabler's **Expected completion** date and **Integration
status** (Not started → In progress → Completed), sharing one dirty-gated confirm (✓ applies
both, ✗ reverts). Shared `renderEnablerControls` across the subphase lane, timeline card, and
enabler modal. Edits are **in-memory only** and reset on reload. See
`docs/superpowers/specs/2026-06-05-enabler-card-date-status-design.md`.

## Project history — v1 → v2 → v3

- **v1** — original single-page prototype (top-level `index.html`/`app.js`/`data.js`/
  `styles.css`, now in `archived/`).
- **v2** — a self-contained HTML iteration (`archived/v2/`).
- **v3** (current) — split into a FastAPI backend (`server/`) serving a static vanilla-JS
  frontend (`web/`) as one Cloud Run service. The Excel workbook was wired as the source of
  truth (loader maps it into the schema), with `fallback.json` retained as the offline
  fallback. Standalone shareable demo is built into `demo/` via `demo/build-demo.cjs`.

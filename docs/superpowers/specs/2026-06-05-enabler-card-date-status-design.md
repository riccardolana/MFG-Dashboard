# Enabler card: date confirmation + integration status — Design

**Date:** 2026-06-05
**Status:** Approved design (pending spec review)

## Context

The MFG Strategy Planning Map shows **enabler cards** in three places: the subphase
"Enablers" lane (`renderEnablerGrid`, `web/app.js:402`), the **timeline** view
(`renderTimelineCard`, `web/app.js:693`), and the enabler **modal** (`web/app.js:~850`).

Each card already exposes an editable **"Expected completion"** date via
`<input type="date">`. Today that date **auto-saves** on the `change` event
(`web/app.js:1080`) and is held **in memory only** — a reload restores the Excel/fallback
data. Enablers currently have **no development/integration status**.

Two improvements requested:

1. **Date confirmation** — auto-saving on change is not UX-friendly; the user should
   explicitly confirm a date edit.
2. **Integration status dropdown** — a way to mark how far along each enabler's
   integration is, using standard stages.

Plus: commit the existing standalone **demo** (`v3/demo/`) and document it.

## Decisions (confirmed with user)

- **Persistence:** in-memory only, matching current date behavior. **No backend changes.**
- **Status stages:** `Not started → In progress → Completed`, default **`Not started`**.
- **Date confirm pattern:** **contextual / dirty** — a ✓ (confirm) and ✗ (cancel) appear
  **only when the date value changes**; ✓ applies, ✗ reverts. No clutter when untouched.
- **Demo:** rebuild via `build-demo.cjs` after changes, commit `v3/demo/`, add a short
  README note.

## Scope

Client-side only: **`web/app.js`** + **`web/styles.css`**, plus a README note and a demo
rebuild. No changes to `server/`, the data schema, or the Excel mapping.

## Data model (in-memory)

Stored on the in-memory `timelineEnablers` objects (same place `endDate` is mutated today):

- `endDate: string` — `"YYYY-MM-DD"` (existing).
- `status: "Not started" | "In progress" | "Completed"` — **new**; treated as
  `"Not started"` when absent. Written on dropdown change; never sent to the backend.

## Components

Two small render helpers (used by all three card sites — avoids triplicated markup):

- **`renderStatusSelect(enabler)`** → a `<select class="enabler-status-select is-<state>">`
  with the three options, current one selected, `data-enabler-field="status"`,
  `data-enabler-id`, and `onclick="event.stopPropagation()"` so it doesn't open the modal.
- **`renderDateEditor(enabler)`** → wrapper `.enabler-date-edit` containing the existing
  `<input type="date" class="enabler-date-input" data-original="<endDate>">` plus a
  `.enabler-date-confirm` group with ✓ (`data-action="confirm-date"`) and ✗
  (`data-action="cancel-date"`) buttons, all `data-enabler-id`.

These replace the inline date-input markup at the three sites
(`renderEnablerGrid`, `renderTimelineCard`, enabler modal).

### Status colour coding (CSS)

The `<select>` is tinted by its `is-*` class (control border/background/text + a leading
dot via `::before` or inline padding):

| status | class | colour |
|--------|-------|--------|
| Not started | `is-notstarted` | grey (`var(--muted)` / `var(--line)`) |
| In progress | `is-inprogress` | amber (`var(--yellow)`) |
| Completed | `is-completed` | green (`var(--green)`) |

## Behaviour & event flow

Refactor the single `change` listener at `web/app.js:1080` into clear, separate flows:

- **Status (immediate apply):** `change` on `.enabler-status-select` → write
  `enabler.status = value` → re-render current page (`renderTimelinePage` / `renderContent`;
  modal stays open if open). A discrete choice needs no confirmation.
- **Date (dirty → confirm):**
  - `input` on `.enabler-date-input` → compare `value` vs `data-original`; toggle
    `.is-dirty` on the closest `.enabler-date-edit`. **No save.**
  - Click `[data-action="confirm-date"]` → read the sibling input's value, write
    `enabler.endDate`, re-render (timeline card repositions to the new completion month).
  - Click `[data-action="cancel-date"]` → reset input to `data-original`, remove
    `.is-dirty`. No re-render needed.
  - Confirm/cancel clicks call `event.stopPropagation()` so the card's modal-open click
    doesn't fire. They hook into the existing `data-action` click delegation (used by
    `add-enabler`); verify that handler during implementation.

Re-rendering rebuilds the DOM, so dirty state resets naturally after a confirm.

## Demo + docs

- After implementing, run `node v3/demo/build-demo.cjs` to regenerate
  `v3/demo/strategy-map-demo.html` from the updated `web/`.
- Commit `v3/demo/build-demo.cjs` and `v3/demo/strategy-map-demo.html`.
- Add a short **README** note: what the standalone demo is (single self-contained file,
  no server) + that enabler cards support editing the expected completion date (with
  confirm) and the integration status (Not started / In progress / Completed), **in-memory
  only** (resets on reload).

## Out of scope (YAGNI)

- Backend persistence / write API / storage.
- Status in the Excel→schema mapping or `fallback.json`.
- Status confirmation button (dropdown applies immediately by design).
- Filtering/grouping the timeline by status.

## Verification

1. Run locally (`cd server && uv run uvicorn app.main:app --reload --port 8000`).
2. **Subphase lane, timeline, and modal** each show: a colour-coded status dropdown that
   updates immediately on change; a date field that reveals ✓/✗ **only after** the value
   changes; ✓ applies (timeline card moves to the new month), ✗ reverts.
3. Reload → date and status reset to source data (confirms in-memory behavior).
4. Rebuild demo, open `v3/demo/strategy-map-demo.html` directly in a browser (no server) →
   same behavior.

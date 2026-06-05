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
- **Confirm pattern:** **one shared, card-level confirm** (contextual / dirty). The status
  dropdown and date input sit on the **same card** and are **horizontally aligned on one
  row**. Editing *either* control marks the card dirty and reveals a single ✓ (confirm) /
  ✗ (cancel) pair — ✓ commits **both** the date and the status, ✗ reverts **both**. No
  buttons when nothing changed. Status therefore does **not** apply instantly; it waits for ✓.
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

One render helper for the whole editable row (used by all three card sites — avoids
triplicated markup and keeps the shared-confirm logic in one place):

- **`renderEnablerControls(enabler)`** → a `.enabler-controls` wrapper (`data-enabler-id`,
  `display:flex`, horizontally aligned) containing, on one row:
  1. a **status** `<select class="enabler-status-select is-<state>">` with the three
     options, current one selected, `data-enabler-field="status"`,
     `data-original="<status>"`;
  2. the **date** `<input type="date" class="enabler-date-input"
     data-enabler-field="endDate" data-original="<endDate>">`;
  3. a `.enabler-confirm` group with ✓ (`data-action="confirm-enabler"`) and ✗
     (`data-action="cancel-enabler"`) buttons, hidden unless the wrapper has `.is-dirty`.

  All interactive elements call `event.stopPropagation()` so editing doesn't open the modal.

This single helper replaces the inline date-input markup at the three sites
(`renderEnablerGrid`, `renderTimelineCard`, enabler modal). On the compact **timeline** card
the row may wrap (status above, date+confirm below) if width is tight — but aligned
horizontally wherever space allows.

### Status colour coding (CSS)

The `<select>` is tinted by its `is-*` class (control border/background/text + a leading
dot via `::before` or inline padding):

| status | class | colour |
|--------|-------|--------|
| Not started | `is-notstarted` | grey (`var(--muted)` / `var(--line)`) |
| In progress | `is-inprogress` | amber (`var(--yellow)`) |
| Completed | `is-completed` | green (`var(--green)`) |

## Behaviour & event flow

Replace the single auto-saving `change` listener at `web/app.js:1080` with a card-level
dirty/confirm flow keyed off `.enabler-controls`:

- **Mark dirty (no save):** an `input`/`change` on either `.enabler-status-select` or
  `.enabler-date-input` compares each control's `value` against its `data-original`; if
  *either* differs, add `.is-dirty` to the closest `.enabler-controls` (revealing ✓/✗),
  else remove it. Nothing is written yet.
- **Confirm** — click `[data-action="confirm-enabler"]` → within that `.enabler-controls`,
  read the status select and the date input, write `enabler.status` and `enabler.endDate`,
  then re-render the current view (`renderTimelinePage` / `renderContent`; re-render the
  modal body if open). The timeline card repositions to the new completion month.
- **Cancel** — click `[data-action="cancel-enabler"]` → reset both controls to their
  `data-original` values and remove `.is-dirty`. No write, no re-render needed.
- All confirm/cancel/control interactions call `event.stopPropagation()` so the card's
  modal-open click doesn't fire. Confirm/cancel hook into the existing `data-action` click
  delegation (used by `add-enabler`); verify that handler during implementation.

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
- Filtering/grouping the timeline by status.

## Verification

1. Run locally (`cd server && uv run uvicorn app.main:app --reload --port 8000`).
2. **Subphase lane, timeline, and modal** each show the status dropdown and date input
   **horizontally aligned on one row**. Editing *either* reveals a single ✓/✗; ✓ commits
   both (timeline card moves to the new month, status colour updates), ✗ reverts both. No
   buttons when untouched.
3. Reload → date and status reset to source data (confirms in-memory behavior).
4. Rebuild demo, open `v3/demo/strategy-map-demo.html` directly in a browser (no server) →
   same behavior.

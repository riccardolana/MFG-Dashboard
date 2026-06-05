# Enabler Card: Date Confirmation + Integration Status — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a per-enabler-card integration status dropdown and a shared, contextual confirm for editing the expected-completion date — status + date aligned on one row, one ✓/✗ committing both — across the subphase lane, timeline, and modal.

**Architecture:** Pure client-side, in-memory (mutates the in-memory `timelineEnablers` objects, no backend). One render helper `renderEnablerControls(enabler)` produces the aligned row at all three sites. Editing either control marks the card `.is-dirty` (revealing ✓/✗); ✓ writes `status` + `endDate` and re-renders, ✗ reverts. Spec: `docs/superpowers/specs/2026-06-05-enabler-card-date-status-design.md`.

**Tech Stack:** Vanilla JS (`web/app.js`), CSS (`web/styles.css`). **No JS unit-test harness exists** in this repo — the established verification is the DOM-stub smoke test (`server/scripts/smoke_render.cjs`, run via node) plus manual browser checks. We follow that pattern: each task ends with the smoke test + a manual check, then a commit.

**Status vocabulary (canonical, used everywhere):** `"Not started"` | `"In progress"` | `"Completed"`, default `"Not started"`. CSS state classes: `is-notstarted` | `is-inprogress` | `is-completed`.

**Action names (must not collide with existing `confirm-enabler`/`cancel-enabler` add-to-timeline flow):** `confirm-enabler-edit`, `cancel-enabler-edit`.

---

## File Structure

- **Modify `web/app.js`** — add helpers `ENABLER_STATUSES`, `statusClass`, `renderEnablerControls`; swap inline date markup at 3 sites; replace the auto-save `change` listener with dirty-marking; add confirm/cancel actions to the click delegation.
- **Modify `web/styles.css`** — `.enabler-controls` row, status-select colour states, dirty-gated confirm buttons.
- **Modify `README.md`** — short Demo note.
- **Regenerate `v3/demo/strategy-map-demo.html`** via `node v3/demo/build-demo.cjs` (no manual edits).

---

## Task 1: CSS for the aligned controls + status colours + dirty confirm

**Files:**
- Modify: `web/styles.css` (append after the existing enabler styles, near the `.enabler-lane-card` / `.tl-card` blocks)

- [ ] **Step 1: Add the styles**

Append this block to `web/styles.css`:

```css
/* ── Enabler card controls: status + date on one row, shared dirty confirm ── */
.enabler-controls {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.enabler-control {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}
.enabler-status-select,
.enabler-controls .enabler-date-input {
  padding: 5px 8px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-family: inherit;
  background: var(--surface-solid);
  cursor: pointer;
}
/* status colour states */
.enabler-status-select.is-notstarted { color: var(--muted); border-color: var(--line); }
.enabler-status-select.is-inprogress { color: #c08607; border-color: rgba(249,171,0,0.5); background: rgba(249,171,0,0.08); }
.enabler-status-select.is-completed  { color: #2e8b48; border-color: rgba(52,168,83,0.5); background: rgba(52,168,83,0.08); }
/* shared confirm — hidden until the card is dirty */
.enabler-confirm { display: none; gap: 4px; }
.enabler-controls.is-dirty .enabler-confirm { display: inline-flex; }
.enabler-confirm button {
  width: 28px; height: 28px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: var(--surface-solid);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
}
.enabler-confirm__ok { color: var(--green); border-color: rgba(52,168,83,0.5); }
.enabler-confirm__ok:hover { background: rgba(52,168,83,0.12); }
.enabler-confirm__cancel { color: var(--red); border-color: rgba(234,67,53,0.4); }
.enabler-confirm__cancel:hover { background: rgba(234,67,53,0.1); }
```

- [ ] **Step 2: Commit**

```bash
git add web/styles.css
git commit -m "feat(enabler): styles for status + date controls row with dirty confirm"
```

---

## Task 2: Add the render helper + status helpers

**Files:**
- Modify: `web/app.js` (add just above `function renderEnablerGrid(sub)`, currently line 402)

- [ ] **Step 1: Add the helpers**

Insert before `function renderEnablerGrid(sub) {`:

```js
const ENABLER_STATUSES = ["Not started", "In progress", "Completed"];

function statusClass(status) {
  const s = status || "Not started";
  if (s === "In progress") return "is-inprogress";
  if (s === "Completed") return "is-completed";
  return "is-notstarted";
}

// Status dropdown + expected-completion date on one aligned row, sharing a single
// dirty-gated confirm (✓ commits both, ✗ reverts both). Used by the subphase lane,
// the timeline card, and the enabler modal. The enabler id lives on .enabler-controls;
// inner controls stopPropagation so editing never opens the card's modal.
function renderEnablerControls(enabler) {
  const status = enabler.status || "Not started";
  const options = ENABLER_STATUSES.map(s =>
    `<option value="${s}"${s === status ? " selected" : ""}>${s}</option>`
  ).join("");
  return `
    <div class="enabler-controls" data-enabler-id="${enabler.id}">
      <label class="enabler-control">
        <span>Status</span>
        <select class="enabler-status-select ${statusClass(status)}" data-enabler-field="status" data-original="${status}" onclick="event.stopPropagation()">
          ${options}
        </select>
      </label>
      <label class="enabler-control">
        <span>Expected completion</span>
        <input type="date" class="enabler-date-input" data-enabler-field="endDate" data-original="${enabler.endDate}" value="${enabler.endDate}" onclick="event.stopPropagation()">
      </label>
      <div class="enabler-confirm">
        <button type="button" class="enabler-confirm__ok" data-action="confirm-enabler-edit" title="Confirm" onclick="event.stopPropagation()">✓</button>
        <button type="button" class="enabler-confirm__cancel" data-action="cancel-enabler-edit" title="Cancel" onclick="event.stopPropagation()">✗</button>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Run the smoke test (helper must not break render)**

Run: `node server/scripts/smoke_render.cjs fallback`
Expected: `OK: rendered 4 phases, 11 subphases without throwing`

(The helper isn't wired in yet, so output is unchanged — this just confirms no syntax error.)

- [ ] **Step 3: Commit**

```bash
git add web/app.js
git commit -m "feat(enabler): renderEnablerControls helper + status helpers"
```

---

## Task 3: Wire the helper into the three card sites

**Files:**
- Modify: `web/app.js` — `renderEnablerGrid` (~420-425), `renderTimelineCard` (~704-707), `openEnablerModal` (~859-867)

- [ ] **Step 1: Subphase lane card** — in `renderEnablerGrid`, replace the matched-card `.enabler-lane-card__dates` block:

Replace:
```js
          <div class="enabler-lane-card__dates">
            <label>
              <span>Expected completion</span>
              <input type="date" class="enabler-date-input" data-enabler-field="endDate" data-enabler-id="${matched.id}" value="${matched.endDate}" onclick="event.stopPropagation()">
            </label>
          </div>
```
With:
```js
          ${renderEnablerControls(matched)}
```

- [ ] **Step 2: Timeline card** — in `renderTimelineCard`, replace the `.tl-card__meta` block:

Replace:
```js
      <div class="tl-card__meta">
        <span class="tl-type-badge type-${enabler.type}">${esc(enabler.type)}</span>
        <input type="date" class="tl-date-input enabler-date-input" data-enabler-field="endDate" data-enabler-id="${enabler.id}" value="${enabler.endDate}" onclick="event.stopPropagation()">
      </div>
```
With:
```js
      <div class="tl-card__meta">
        <span class="tl-type-badge type-${enabler.type}">${esc(enabler.type)}</span>
      </div>
      ${renderEnablerControls(enabler)}
```

- [ ] **Step 3: Enabler modal** — in `openEnablerModal`, replace the Timeline panel-section:

Replace:
```js
      <div class="panel-section" style="border:1px solid var(--line);border-radius:var(--radius);padding:16px;">
        <div style="font-weight:700;margin-bottom:12px;">Timeline</div>
        <div style="display:flex;gap:16px;">
          <label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600;color:var(--muted);">
            Expected completion date
            <input type="date" class="enabler-date-input" data-enabler-field="endDate" data-enabler-id="${enabler.id}" value="${enabler.endDate}" style="padding:6px 10px;border:1px solid var(--line);border-radius:var(--radius-sm);font-size:13px;font-family:inherit;background:var(--surface-solid);">
          </label>
        </div>
      </div>
```
With:
```js
      <div class="panel-section" style="border:1px solid var(--line);border-radius:var(--radius);padding:16px;">
        <div style="font-weight:700;margin-bottom:12px;">Integration</div>
        ${renderEnablerControls(enabler)}
      </div>
```

- [ ] **Step 4: Run the smoke test**

Run: `node server/scripts/smoke_render.cjs fallback`
Expected: `OK: rendered 4 phases, 11 subphases without throwing`

- [ ] **Step 5: Commit**

```bash
git add web/app.js
git commit -m "feat(enabler): use renderEnablerControls in lane, timeline, modal"
```

---

## Task 4: Replace auto-save with dirty-marking + confirm/cancel actions

**Files:**
- Modify: `web/app.js` — the `change` listener at ~1080-1088, and the click delegation `if (actionBtn)` block (~961-1026)

- [ ] **Step 1: Replace the auto-save `change` listener** (currently at ~1080):

Replace:
```js
document.addEventListener("change", e => {
  const input = e.target.closest(".enabler-date-input");
  if (!input) return;
  const enabler = timelineEnablers.find(en => en.id === input.dataset.enablerId);
  if (!enabler) return;
  enabler[input.dataset.enablerField] = input.value;
  if (state.page === "timeline") renderTimelinePage();
  if (state.page === "phase") renderContent();
});
```
With:
```js
// Editing the status or the date marks the enabler card dirty (revealing ✓/✗);
// nothing is written until the user confirms. Both `input` and `change` are handled so
// the <select> and the date <input> are caught reliably across browsers.
function markEnablerDirty(e) {
  const ctrl = e.target.closest(".enabler-status-select, .enabler-date-input");
  if (!ctrl) return;
  const wrap = ctrl.closest(".enabler-controls");
  if (!wrap) return;
  const sel = wrap.querySelector(".enabler-status-select");
  if (sel) sel.className = "enabler-status-select " + statusClass(sel.value);
  const dirty = [...wrap.querySelectorAll("[data-original]")]
    .some(el => el.value !== el.dataset.original);
  wrap.classList.toggle("is-dirty", dirty);
}
document.addEventListener("input", markEnablerDirty);
document.addEventListener("change", markEnablerDirty);
```

- [ ] **Step 2: Add confirm/cancel handlers** in the click delegation, immediately after the existing `if (action === "cancel-enabler") { ... }` block (~1016) and before `if (action === "goto-phase")`:

```js
    if (action === "confirm-enabler-edit") {
      const wrap = actionBtn.closest(".enabler-controls");
      if (!wrap) return;
      const en = timelineEnablers.find(x => x.id === wrap.dataset.enablerId);
      if (!en) return;
      const sel = wrap.querySelector(".enabler-status-select");
      const dateInput = wrap.querySelector(".enabler-date-input");
      if (sel) en.status = sel.value;
      if (dateInput) en.endDate = dateInput.value;
      if (state.activeEnablerId === en.id) openEnablerModal(en.id);
      else if (state.page === "timeline") renderTimelinePage();
      else renderContent();
      return;
    }
    if (action === "cancel-enabler-edit") {
      const wrap = actionBtn.closest(".enabler-controls");
      if (!wrap) return;
      wrap.querySelectorAll("[data-original]").forEach(el => { el.value = el.dataset.original; });
      const sel = wrap.querySelector(".enabler-status-select");
      if (sel) sel.className = "enabler-status-select " + statusClass(sel.value);
      wrap.classList.remove("is-dirty");
      return;
    }
```

- [ ] **Step 3: Run the smoke test**

Run: `node server/scripts/smoke_render.cjs fallback`
Expected: `OK: rendered 4 phases, 11 subphases without throwing`

- [ ] **Step 4: Commit**

```bash
git add web/app.js
git commit -m "feat(enabler): dirty-marking + shared confirm/cancel for status & date"
```

---

## Task 5: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the app**

Run: `cd server && uv run uvicorn app.main:app --reload --port 8000`
Then open `http://localhost:8000`.

- [ ] **Step 2: Subphase lane** — open a phase (e.g. Discover) and the **Enablers** lane. Confirm each matched enabler card shows **Status** + **Expected completion** on one aligned row, no ✓/✗ initially. Change the status → select recolours (amber/green) and ✓/✗ appear. Change the date → ✓/✗ still shown. Click ✗ → both revert, buttons disappear. Change both again, click ✓ → values persist in the re-render; clicking the card body still opens the modal.

- [ ] **Step 3: Timeline** — go to **Timeline**. Each dated card shows the same aligned controls. Change the date + ✓ → the card repositions to the new completion month. Change status + ✓ → colour updates.

- [ ] **Step 4: Modal** — click an enabler card to open the modal; the **Integration** panel shows the same controls; editing + ✓ updates and the modal re-renders with new values.

- [ ] **Step 5: In-memory check** — reload the page → status and date reset to source data (expected; in-memory only).

- [ ] **Step 6:** If anything fails, fix in the relevant task's file and re-run the smoke test before continuing. No commit for this task.

---

## Task 6: Rebuild the standalone demo + README note

**Files:**
- Regenerate: `v3/demo/strategy-map-demo.html`
- Modify: `README.md`

- [ ] **Step 1: Rebuild the demo from the updated `web/`**

Run: `node v3/demo/build-demo.cjs`
Expected: `Wrote .../v3/demo/strategy-map-demo.html (… KB, … hero assets inlined)`

- [ ] **Step 2: Spot-check the demo** — open `v3/demo/strategy-map-demo.html` directly in a browser (no server). Verify the enabler controls (status + date + dirty ✓/✗) behave as in Task 5.

- [ ] **Step 3: Add a Demo note to `README.md`** — append:

```markdown
## Demo (standalone, no server)

`v3/demo/strategy-map-demo.html` is a single self-contained file built from `web/` via
`node v3/demo/build-demo.cjs` (inlines CSS/JS and base64-encodes assets). Open it directly
in a browser to share without deploying. Rebuild it after any change under `web/`.

On enabler cards (subphase lane, timeline, and modal) you can edit the **Expected
completion** date and the **Integration status** (Not started → In progress → Completed).
Status and date share one row and a single confirm: ✓ applies both, ✗ reverts. These edits
are **in-memory only** and reset on reload.
```

- [ ] **Step 4: Commit**

```bash
git add v3/demo/strategy-map-demo.html v3/demo/build-demo.cjs README.md
git commit -m "docs(demo): rebuild standalone demo + README note for enabler editing"
```

---

## Deployment (after approval)

Not automatic. Once verified, deploy as before:
`gcloud run deploy strategy-map --source . --region europe-west1 --allow-unauthenticated --quiet`

---

## Self-Review

- **Spec coverage:** status dropdown (Task 2/3), default Not started (`statusClass` + `|| "Not started"`), three sites aligned on one row (Task 1 CSS + Task 3), single shared dirty confirm committing both / reverting both (Task 4), in-memory (mutates `timelineEnablers`, no backend), demo rebuild + README (Task 6). ✔ all covered.
- **Placeholders:** none — every code step has full code.
- **Type/name consistency:** `ENABLER_STATUSES`, `statusClass`, `renderEnablerControls`, action names `confirm-enabler-edit`/`cancel-enabler-edit` (distinct from existing `confirm-enabler`/`cancel-enabler`), `openEnablerModal(id)`, `renderTimelinePage`/`renderContent`, `timelineEnablers`, `state.activeEnablerId` — all match the existing codebase and are used consistently across tasks.

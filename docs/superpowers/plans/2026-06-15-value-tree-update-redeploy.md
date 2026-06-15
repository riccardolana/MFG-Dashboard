# Value Tree Map Update + Cloud Run Redeploy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drive the Strategy Map's Value Tree page from the two new Excel sheets ("Value Trees" + "Value Framework") as a Phase → Dimension → Opportunity → {Enablers, KPIs} tree, refresh the bundled data + standalone demo, audit that all other pages still match the Excel, and redeploy the `strategy-map` Cloud Run service.

**Architecture:** Single Cloud Run service — FastAPI (`server/`) serves `GET /api/strategy` and the static `web/` frontend. Strategy data is loaded from an Excel workbook (`server/app/excel/strategy.xlsx`) and validated against Pydantic models (`server/app/schema.py`), with `server/app/data/fallback.json` as the offline fallback. The browser bootstraps via `web/boot.js` (fetch API → globals → `app.js`), falling back to the bundled `web/data-fallback.js`. A standalone single-file demo (`v3/demo/strategy-map-demo.html`) is rebuilt from `web/` via `node v3/demo/build-demo.cjs`.

**Tech Stack:** Python 3.12 / FastAPI / Pydantic v2 / openpyxl / uv (backend); vanilla JS + CSS (frontend); Node 22 (demo build + smoke test); `gcloud run deploy --source .` (deploy).

---

## Background: what actually changed (verified)

The new workbook `~/Downloads/Data from Miro.xlsx` (64 KB) was diffed cell-by-cell against the deployed `server/app/excel/strategy.xlsx` (59 KB):

- **`JTBD` sheet — 0 differing cells.** Phases / subphases / JTBD content is unchanged.
- **`Overview MFG enablers ` sheet — 0 differing cells.** The 84-item enabler catalog is unchanged.
- **NEW sheet `Value Framework` (A1:G29)** — per phase: 3 value dimensions (Effectiveness / Execution / Efficiency) with a one-sentence **definition** and a "Dimension used in phase?" flag; plus the phase's **Key opportunities**, a **"Shared opportunity?"** flag (Yes/blank), and **KPIs**.
- **NEW sheet `Value Trees` (A1:E19)** — the authoritative tree: `Phase | Value dimensions | Key opportunities | Enablers | KPIs`, where Phase and Value-dimension cells are set only on the first row of each group (forward-fill), Enablers are newline-separated refs (e.g. `#04.17 Goldfoil`, `#01.16 Strategy Weaver (Agent)`), and KPIs are `·`-separated.

So the only data delta is the value tree. The current `renderValueTreePage` in `web/app.js` is a **placeholder**: it ignores the API's `valueTree`, derives opportunities from JTBD data, and prints `"Enabler TBD"` + a hardcoded KPI string. This plan replaces it with a real, dimension-grouped tree driven by the new sheets, and (per the chosen "Full audit" scope) re-verifies every other page against the Excel.

### Target data contract (`valueTree`)

The loader, `fallback.json`, and `data-fallback.js` will all produce/carry this shape:

```json
{
  "phases": [
    {
      "id": "discover",
      "title": "Discover",
      "accent": "#4285f4",
      "dimensions": [
        {
          "name": "Effectiveness",
          "definition": "Sharpen strategic hypotheses and strengthen recommendation quality by proactively surfacing historical learnings against benchmarks.",
          "opportunities": [
            {
              "id": "vt-discover-effectiveness-1",
              "title": "Automated Historical Learnings Synthesis",
              "shared": false,
              "enablers": ["#04.17 Goldfoil"],
              "kpis": ["% campaigns with learnings at inception", "Repeat-mistake ↓%"]
            }
          ]
        }
      ]
    }
  ]
}
```

This replaces the legacy, unused `{ "themes": [...] }` shape currently in `fallback.json` and `data-fallback.js`.

---

## File Structure

| File | Responsibility | Change |
| --- | --- | --- |
| `server/app/excel/strategy.xlsx` | Bundled source workbook the API reads | **Replace** with the new file (also mirror to `v3/assets/Data from Miro.xlsx`) |
| `server/app/schema.py` | Pydantic contract for the API payload | **Modify** — add typed `ValueTree` models; type `StrategyResponse.valueTree` |
| `server/app/data/loader.py` | Excel → payload mapping | **Modify** — parse `Value Trees` + `Value Framework` into the `valueTree` contract |
| `server/app/data/fallback.json` | Offline fallback payload | **Modify** — regenerate from the loader (new `valueTree`; strategy/timeline re-confirmed) |
| `server/tests/test_value_tree.py` | Backend regression tests | **Create** |
| `server/pyproject.toml` | Deps | **Modify** — add `pytest` dev dependency |
| `web/app.js` | Frontend render/nav | **Modify** — rewrite the Value Tree render functions to consume `valueTreeData` |
| `web/styles.css` | Styles | **Modify** — dimension/opportunity card styles |
| `web/data-fallback.js` | Bundled browser fallback data | **Modify** — replace `valueTreeData` with the new shape |
| `v3/demo/strategy-map-demo.html` | Standalone single-file demo | **Regenerate** via `node v3/demo/build-demo.cjs` |
| `README.md` | Docs | **Modify** — note value tree is Excel-driven |

---

## Task 1: Refresh the bundled workbook

**Files:**
- Replace: `server/app/excel/strategy.xlsx`
- Replace: `v3/assets/Data from Miro.xlsx`

- [ ] **Step 1: Copy the new workbook into both bundled locations**

```bash
cd /Users/riccardo.lana/Projects/MFG
cp "/Users/riccardo.lana/Downloads/Data from Miro.xlsx" server/app/excel/strategy.xlsx
cp "/Users/riccardo.lana/Downloads/Data from Miro.xlsx" "v3/assets/Data from Miro.xlsx"
```

- [ ] **Step 2: Confirm the four sheets are present**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run python -c "import openpyxl; wb=openpyxl.load_workbook('app/excel/strategy.xlsx'); print(wb.sheetnames)"
```
Expected (exact): `['JTBD', 'Overview MFG enablers ', 'Value Framework', 'Value Trees']`

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add server/app/excel/strategy.xlsx "v3/assets/Data from Miro.xlsx"
git commit -m "chore(data): refresh bundled workbook with Value Framework + Value Trees sheets"
```

---

## Task 2: Add the `ValueTree` schema models

**Files:**
- Modify: `server/app/schema.py`
- Test: `server/tests/test_value_tree.py`
- Modify: `server/pyproject.toml`

- [ ] **Step 1: Add pytest as a dev dependency**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv add --dev pytest
```
Expected: `pyproject.toml` gains a `[dependency-groups]`/dev entry for `pytest` and `uv.lock` updates without error.

- [ ] **Step 2: Write the failing schema test**

Create `server/tests/test_value_tree.py`:

```python
from app.schema import StrategyResponse, ValueTree


def test_value_tree_model_validates_phase_dimension_opportunity():
    vt = ValueTree.model_validate(
        {
            "phases": [
                {
                    "id": "discover",
                    "title": "Discover",
                    "accent": "#4285f4",
                    "dimensions": [
                        {
                            "name": "Effectiveness",
                            "definition": "Sharpen strategic hypotheses.",
                            "opportunities": [
                                {
                                    "id": "vt-discover-effectiveness-1",
                                    "title": "Automated Historical Learnings Synthesis",
                                    "shared": False,
                                    "enablers": ["#04.17 Goldfoil"],
                                    "kpis": ["% campaigns with learnings at inception"],
                                }
                            ],
                        }
                    ],
                }
            ]
        }
    )
    assert vt.phases[0].id == "discover"
    assert vt.phases[0].dimensions[0].name == "Effectiveness"
    opp = vt.phases[0].dimensions[0].opportunities[0]
    assert opp.shared is False
    assert opp.enablers == ["#04.17 Goldfoil"]


def test_strategy_response_accepts_typed_value_tree():
    resp = StrategyResponse.model_validate(
        {"strategy": {"phases": []}, "valueTree": {"phases": []}, "timeline": []}
    )
    assert resp.valueTree.phases == []
```

- [ ] **Step 3: Run the test to verify it fails**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run pytest tests/test_value_tree.py -q
```
Expected: FAIL — `ImportError: cannot import name 'ValueTree' from 'app.schema'`.

- [ ] **Step 4: Add the models to `server/app/schema.py`**

Insert the following models immediately **before** the `class StrategyResponse(_Base):` definition (after `class Strategy(_Base):`):

```python
class VtOpportunity(_Base):
    id: str | None = None
    title: str
    shared: bool = False
    enablers: list[str] = Field(default_factory=list)
    kpis: list[str] = Field(default_factory=list)


class VtDimension(_Base):
    name: str
    definition: str | None = None
    opportunities: list[VtOpportunity] = Field(default_factory=list)


class VtPhase(_Base):
    id: str
    title: str
    accent: str | None = None
    dimensions: list[VtDimension] = Field(default_factory=list)


class ValueTree(_Base):
    phases: list[VtPhase] = Field(default_factory=list)
```

Then change the `valueTree` field on `StrategyResponse` from:

```python
    valueTree: dict = Field(default_factory=dict)
```
to:
```python
    valueTree: ValueTree = Field(default_factory=ValueTree)
```

- [ ] **Step 5: Run the test to verify it passes**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run pytest tests/test_value_tree.py -q
```
Expected: 2 passed.

- [ ] **Step 6: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add server/app/schema.py server/tests/test_value_tree.py server/pyproject.toml server/uv.lock
git commit -m "feat(schema): typed ValueTree (phase/dimension/opportunity) models + tests"
```

---

## Task 3: Parse the value tree in the loader

**Files:**
- Modify: `server/app/data/loader.py`
- Test: `server/tests/test_value_tree.py`

- [ ] **Step 1: Add the loader test (failing)**

Append to `server/tests/test_value_tree.py`:

```python
import os

from app.data.loader import load_data


def _opp(vt, pid, dim_name, title):
    phase = next(p for p in vt.phases if p.id == pid)
    dim = next(d for d in phase.dimensions if d.name.lower() == dim_name.lower())
    return next(o for o in dim.opportunities if o.title == title)


def test_loader_builds_value_tree_from_excel():
    os.environ.pop("STRATEGY_XLSX", None)  # use the bundled workbook
    data = load_data(refresh=True)
    vt = data.valueTree

    ids = [p.id for p in vt.phases]
    assert ids == ["discover", "create", "activate", "analyse"]

    # Discover / Effectiveness / Automated Historical Learnings Synthesis
    o = _opp(vt, "discover", "Effectiveness", "Automated Historical Learnings Synthesis")
    assert o.enablers == ["#04.17 Goldfoil"]
    assert o.kpis == ["% campaigns with learnings at inception", "Repeat-mistake ↓%"]
    assert o.shared is False

    # "Shared opportunity? = Yes" flows through from the Value Framework sheet
    assert _opp(vt, "discover", "Effectiveness", "Dynamic Product Insights Access").shared is True

    # Multi-enabler cell (newline-separated) is split + whitespace-normalised
    o2 = _opp(vt, "discover", "Efficiency", "Connected Research Infrastructure")
    assert o2.enablers == ["#01.01 Strategic Insights", "#01.07 Charm"]

    # Dimension definition comes from the Value Framework sheet, "Name:" prefix stripped
    discover = next(p for p in vt.phases if p.id == "discover")
    eff = next(d for d in discover.dimensions if d.name == "Effectiveness")
    assert eff.definition.startswith("Sharpen strategic hypotheses")

    # analyze → analyse alias; Execution comes before Effectiveness per the sheet order
    analyse = next(p for p in vt.phases if p.id == "analyse")
    assert [d.name for d in analyse.dimensions] == ["Execution", "Effectiveness"]
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run pytest tests/test_value_tree.py::test_loader_builds_value_tree_from_excel -q
```
Expected: FAIL — `valueTree` has no `phases` (loader still returns `{"themes": []}`), so the `next(...)` lookups raise `StopIteration`.

- [ ] **Step 3: Add the value-tree parsing helpers to `server/app/data/loader.py`**

Insert these helpers immediately **after** the existing `_enabler_type` function (before `_load_phase_meta`):

```python
def _vt_clean(cell) -> str:
    return "" if cell is None else str(cell).replace("\xa0", " ").strip()


def _vt_kpis(cell) -> list[str]:
    """KPIs live in one cell, '·'-separated."""
    return [p.strip() for p in _vt_clean(cell).split("·") if p.strip()]


def _vt_enablers(cell) -> list[str]:
    """One or more enabler refs, newline-separated; collapse internal whitespace."""
    out = []
    for raw in _vt_clean(cell).split("\n"):
        v = re.sub(r"\s+", " ", raw).strip()
        if v:
            out.append(v)
    return out


def _strip_dim_prefix(name: str, definition) -> str:
    """Definitions are authored as 'Effectiveness: ....' — drop the leading name echo."""
    d = _vt_clean(definition)
    prefix = f"{name}:".lower()
    if d.lower().startswith(prefix):
        d = d[len(prefix):].strip()
    return d


def _load_value_tree(wb, phase_meta) -> dict:
    """Build phase -> dimension -> opportunity from the 'Value Trees' (+ 'Value Framework') sheets.

    'Value Trees' is authoritative for the tree (Phase/dimension cells forward-fill, blank on
    continuation rows). 'Value Framework' supplies each dimension's definition and the per-
    opportunity 'shared' flag, matched by phase+dimension name and by opportunity title.
    """
    if "Value Trees" not in wb.sheetnames:
        return {"phases": []}
    tree_ws = wb["Value Trees"]
    fw_ws = wb["Value Framework"] if "Value Framework" in wb.sheetnames else None

    dim_def: dict[tuple, str] = {}   # (pid, dim_lower) -> definition
    shared_opp: set[str] = set()     # opportunity title (lower) flagged shared
    if fw_ws is not None:
        cur_pid = None
        for r in list(fw_ws.iter_rows(values_only=True))[1:]:
            phase = _vt_clean(r[0])
            if phase.lower() == "value framework legend":
                break  # legend rows follow the data block
            if phase:
                cur_pid = _PHASE_ALIAS.get(phase.lower(), _slug(phase))
            dim = _vt_clean(r[1])
            if cur_pid and dim:
                dim_def[(cur_pid, dim.lower())] = _strip_dim_prefix(dim, r[2])
            opp_title = _vt_clean(r[4])
            if opp_title and _vt_clean(r[5]).lower() == "yes":
                shared_opp.add(opp_title.lower())

    phases: list[dict] = []
    phase_idx: dict[str, dict] = {}
    cur_pid = cur_dim = None
    for r in list(tree_ws.iter_rows(values_only=True))[1:]:
        phase = _vt_clean(r[0])
        if phase:
            cur_pid = _PHASE_ALIAS.get(phase.lower(), _slug(phase))
        dim = _vt_clean(r[1])
        if dim:
            cur_dim = dim
        title = _vt_clean(r[2])
        if not (cur_pid and cur_dim and title):
            continue
        if cur_pid not in phase_idx:
            meta = phase_meta.get(cur_pid, {})
            p = {
                "id": cur_pid,
                "title": phase or cur_pid.title(),
                "accent": meta.get("accent", "#4285f4"),
                "dimensions": [],
            }
            phase_idx[cur_pid] = p
            phases.append(p)
        p = phase_idx[cur_pid]
        dim_obj = next((d for d in p["dimensions"] if d["name"].lower() == cur_dim.lower()), None)
        if dim_obj is None:
            dim_obj = {
                "name": cur_dim,
                "definition": dim_def.get((cur_pid, cur_dim.lower()), ""),
                "opportunities": [],
            }
            p["dimensions"].append(dim_obj)
        dim_obj["opportunities"].append({
            "id": f"vt-{cur_pid}-{_slug(cur_dim)}-{len(dim_obj['opportunities']) + 1}",
            "title": title,
            "shared": title.lower() in shared_opp,
            "enablers": _vt_enablers(r[3]),
            "kpis": _vt_kpis(r[4]),
        })
    return {"phases": phases}
```

- [ ] **Step 4: Wire the value tree into `_load_excel`**

In `server/app/data/loader.py`, find the `return StrategyResponse.model_validate(...)` at the end of `_load_excel` and change the `valueTree` value from `{"themes": []}` to `_load_value_tree(wb, phase_meta)`:

```python
    return StrategyResponse.model_validate(
        {
            "strategy": {"phases": phases},
            "valueTree": _load_value_tree(wb, phase_meta),
            "timeline": timeline,
        }
    )
```

- [ ] **Step 5: Run the loader test to verify it passes**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run pytest tests/test_value_tree.py -q
```
Expected: 3 passed.

- [ ] **Step 6: Eyeball the produced value tree**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run python -c "from app.data.loader import load_data; import json; print(json.dumps(load_data(refresh=True).valueTree.model_dump(), ensure_ascii=False, indent=1)[:1200])"
```
Expected: JSON with `phases[0].id == "discover"`, dimensions named `Effectiveness`/`Execution`/`Efficiency`, opportunities carrying real `enablers` and `kpis`.

- [ ] **Step 7: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add server/app/data/loader.py server/tests/test_value_tree.py
git commit -m "feat(loader): map Value Trees + Value Framework sheets into the valueTree contract"
```

---

## Task 4: Regenerate `fallback.json` from the loader (full-audit refresh)

The fallback must match what the Excel produces so the offline path is identical. This regenerates the whole payload (strategy + timeline re-confirmed, valueTree migrated to the new shape), then validates it.

**Files:**
- Modify: `server/app/data/fallback.json`

- [ ] **Step 1: Regenerate `fallback.json` from the current Excel-backed loader**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run python -c "from app.data.loader import load_data; import json; \
open('app/data/fallback.json','w',encoding='utf-8').write(json.dumps(load_data(refresh=True).model_dump(exclude_none=True), ensure_ascii=False, indent=2) + '\n')"
```
Expected: no output; the file is rewritten.

- [ ] **Step 2: Verify the fallback loads + has the new value tree**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
STRATEGY_XLSX=/nonexistent uv run python -c "from app.data.loader import load_data; d=load_data(refresh=True); \
print('phases', [p.id for p in d.strategy.phases]); \
print('vt phases', [p.id for p in d.valueTree.phases]); \
print('timeline', len(d.timeline)); \
print('themes_removed', 'themes' not in d.valueTree.model_dump())"
```
Expected: `phases ['discover', 'create', 'activate', 'analyse']`, `vt phases ['discover', 'create', 'activate', 'analyse']`, `timeline 84`, `themes_removed True`. (Pointing `STRATEGY_XLSX` at a nonexistent path forces the fallback branch, proving `fallback.json` alone validates against the typed schema.)

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add server/app/data/fallback.json
git commit -m "chore(data): regenerate fallback.json from Excel (new valueTree shape)"
```

---

## Task 5: Update the browser fallback bundle (`data-fallback.js`)

The standalone demo and the API-down path read `web/data-fallback.js`. Its `valueTreeData` must move from the legacy `{ themes: [...] }` to the new `{ phases: [...] }` shape. Generate the literal from the loader so it matches `fallback.json` exactly.

**Files:**
- Modify: `web/data-fallback.js`

- [ ] **Step 1: Print the exact `valueTreeData` literal to paste**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run python -c "from app.data.loader import load_data; import json; \
print('const valueTreeData = ' + json.dumps(load_data(refresh=True).valueTree.model_dump(), ensure_ascii=False, indent=2) + ';')"
```
This prints a complete `const valueTreeData = { "phases": [ ... ] };` block.

- [ ] **Step 2: Replace the legacy `valueTreeData` block in `web/data-fallback.js`**

In `web/data-fallback.js`, the value tree literal starts at the line `const valueTreeData = {` (currently `themes: [...]`) and ends at its matching `};` immediately before `const timelineEnablers = [`. Replace that entire block (the `const valueTreeData = { ... };`) with the block printed in Step 1. Leave `strategyData` and `timelineEnablers` untouched.

- [ ] **Step 3: Verify the file is valid JS and exposes the new shape**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
node -e "require('vm').runInNewContext(require('fs').readFileSync('web/data-fallback.js','utf8') + ';globalThis.__vt=valueTreeData;', {}); " 2>&1 | head
node -e "const vm=require('vm'); const ctx={}; vm.runInNewContext(require('fs').readFileSync('web/data-fallback.js','utf8'), ctx); console.log('vt phases:', ctx.valueTreeData.phases.map(p=>p.id).join(',')); console.log('strategy phases:', ctx.strategyData.phases.length, 'enablers:', ctx.timelineEnablers.length);"
```
Expected: no syntax error; `vt phases: discover,create,activate,analyse`; `strategy phases: 4 enablers: 84` (enabler count matches the catalog — confirms the strategy/timeline halves are intact).

- [ ] **Step 4: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add web/data-fallback.js
git commit -m "chore(web): migrate bundled valueTreeData to phase/dimension/opportunity shape"
```

---

## Task 6: Rewrite the Value Tree render (frontend)

Replace the placeholder value-tree functions with a dimension-grouped tree that consumes the `valueTreeData` global (set by `boot.js` from the API, or declared by `data-fallback.js` offline).

**Files:**
- Modify: `web/app.js` (the `// ── Value Tree Page ──` block, currently lines ~630–689)

- [ ] **Step 1: Replace the entire Value Tree Page block in `web/app.js`**

Find this block (starts at the comment `// ── Value Tree Page ──`, ends at the close of `renderOppLever`):

```javascript
// ── Value Tree Page ──
// Opportunities live per-subphase as { mfgFocus: [{title, description}] }; the value tree
// aggregates them per phase. Enablers/KPIs are placeholders (no theme split yet) per decision.
const VT_KPI_PLACEHOLDER = "Hypotheses/qtr · Acceptance % · Performance lift %";

function phaseOpportunities(phase) {
  const opps = [];
  (phase.subphases || []).forEach(sub => {
    const o = sub.lanes && sub.lanes.opportunities;
    if (o && Array.isArray(o.mfgFocus)) opps.push(...o.mfgFocus);
  });
  return opps;
}

function renderValueTreePage() {
  el.content.innerHTML = `
    <div class="vt-header">
      <h1>Value Tree – All Levers</h1>
      <p>Every opportunity mapped to all associated value levers.</p>
    </div>
    ${strategyData.phases.map(renderValuePhase).join("")}
  `;
}

function renderValuePhase(phase) {
  const opps = phaseOpportunities(phase);
  return `
    <div class="vt-phase" style="--phase-accent:${phase.accent}">
      <div class="vt-phase__header">
        <span class="vt-phase__dot"></span>
        <span class="vt-phase__title">${esc(phase.title)}</span>
        <span class="vt-phase__count">${opps.length}</span>
      </div>
      <div class="vt-grid">
        ${opps.length
          ? opps.map(renderOppLever).join("")
          : `<p class="vt-empty">No key opportunities captured for this phase yet.</p>`}
      </div>
    </div>
  `;
}

function renderOppLever(opp) {
  return `
    <div class="opp-card">
      <span class="opp-badge">Key Opportunity</span>
      <h3>${esc(opp.title)}</h3>
      <div class="opp-levers">
        <div class="opp-lever">
          <span class="opp-pill">Enablers</span>
          <span class="opp-lever__value">Enabler TBD</span>
        </div>
        <div class="opp-lever">
          <span class="opp-pill">KPIs</span>
          <span class="opp-lever__value">${VT_KPI_PLACEHOLDER}</span>
        </div>
      </div>
    </div>
  `;
}
```

Replace it **entirely** with:

```javascript
// ── Value Tree Page ──
// Driven by the API/fallback `valueTreeData` (Value Trees + Value Framework sheets):
// phase -> value dimension (with definition) -> opportunity {shared, enablers, kpis}.
function getValueTree() {
  const vt = (typeof valueTreeData !== "undefined" && valueTreeData) || {};
  return Array.isArray(vt.phases) ? vt.phases : [];
}

function vtPhaseOppCount(phase) {
  return (phase.dimensions || []).reduce(
    (n, d) => n + (d.opportunities ? d.opportunities.length : 0), 0);
}

function renderValueTreePage() {
  const phases = getValueTree();
  el.content.innerHTML = `
    <div class="vt-header">
      <h1>Value Tree Map</h1>
      <p>Each phase mapped through its value dimensions to the opportunities, enablers, and KPIs that create value.</p>
    </div>
    ${phases.length
      ? phases.map(renderVtPhase).join("")
      : `<p class="vt-empty">No value tree data available.</p>`}
  `;
}

function renderVtPhase(phase) {
  const dims = phase.dimensions || [];
  return `
    <section class="vt-phase" style="--phase-accent:${phase.accent || "var(--muted)"}">
      <div class="vt-phase__header">
        <span class="vt-phase__dot"></span>
        <span class="vt-phase__title">${esc(phase.title)}</span>
        <span class="vt-phase__count">${vtPhaseOppCount(phase)} opportunities</span>
      </div>
      ${dims.length
        ? dims.map(renderVtDimension).join("")
        : `<p class="vt-empty">No value dimensions captured for this phase yet.</p>`}
    </section>
  `;
}

function renderVtDimension(dim) {
  const opps = dim.opportunities || [];
  return `
    <div class="vt-dimension">
      <div class="vt-dimension__header">
        <span class="vt-dimension__name">${esc(dim.name)}</span>
        ${dim.definition ? `<span class="vt-dimension__def">${esc(dim.definition)}</span>` : ""}
      </div>
      <div class="vt-dimension__body">
        ${opps.length
          ? opps.map(renderVtOpp).join("")
          : `<p class="vt-empty">No opportunities captured.</p>`}
      </div>
    </div>
  `;
}

function renderVtOpp(opp) {
  const enablers = opp.enablers || [];
  const kpis = opp.kpis || [];
  return `
    <article class="opp-card">
      <div class="opp-card__head">
        <span class="opp-badge">Opportunity</span>
        ${opp.shared ? `<span class="opp-card__shared">Shared</span>` : ""}
      </div>
      <h3>${esc(opp.title)}</h3>
      <div class="opp-block">
        <span class="opp-pill">Enablers</span>
        <div class="opp-enablers">
          ${enablers.length
            ? enablers.map(e => `<span class="opp-enabler">${esc(e)}</span>`).join("")
            : `<span class="opp-lever__value">—</span>`}
        </div>
      </div>
      <div class="opp-block">
        <span class="opp-pill">KPIs</span>
        <ul class="opp-kpis">
          ${kpis.length
            ? kpis.map(k => `<li>${esc(k)}</li>`).join("")
            : `<li class="opp-lever__value">—</li>`}
        </ul>
      </div>
    </article>
  `;
}
```

- [ ] **Step 2: Headless smoke test — fallback data**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
node server/scripts/smoke_render.cjs fallback
```
Expected: `OK: rendered 4 phases, ... subphases without throwing` (no `SMOKE FAIL`). This exercises `setPage("value-tree")` against `web/data-fallback.js`.

- [ ] **Step 3: Headless smoke test — Excel-derived data**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run python -c "from app.data.loader import load_data; import json; \
open('/tmp/excel_data.json','w',encoding='utf-8').write(json.dumps(load_data(refresh=True).model_dump(exclude_none=True), ensure_ascii=False))"
cd /Users/riccardo.lana/Projects/MFG
node server/scripts/smoke_render.cjs excel
```
Expected: `OK: rendered 4 phases, ... subphases without throwing` (no `SMOKE FAIL`).

- [ ] **Step 4: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add web/app.js
git commit -m "feat(web): dimension-grouped Value Tree render from valueTreeData"
```

---

## Task 7: Value Tree styles

**Files:**
- Modify: `web/styles.css` (the `/* ── Value Tree Page ── */` section, ~lines 1728–1844)

- [ ] **Step 1: Replace the `.vt-grid` rule and add dimension/opportunity styles**

In `web/styles.css`, replace the `.vt-grid { ... }` rule (currently ~lines 1781–1785):

```css
.vt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
```

with the dimension wrapper + body grid (the existing responsive rule at the bottom of the file already targets `.vt-dimension__body`):

```css
.vt-dimension {
  margin: 0 0 18px 28px;
  padding-left: 16px;
  border-left: 2px solid color-mix(in srgb, var(--phase-accent, var(--muted)) 35%, transparent);
}

.vt-dimension__header {
  margin-bottom: 10px;
}

.vt-dimension__name {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--phase-accent, var(--ink));
}

.vt-dimension__def {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.45;
  max-width: 70ch;
}

.vt-dimension__body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
```

- [ ] **Step 2: Add opportunity-card additions after the existing `.opp-lever__value` rule**

Append after the `.opp-lever__value { ... }` rule (~line 1844, just before `/* ── Timeline Page ── */`):

```css
.opp-card__head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.opp-card__shared {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--phase-accent, var(--muted)) 14%, transparent);
  color: var(--phase-accent, var(--ink));
}

.opp-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}

.opp-enablers {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.opp-enabler {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: var(--radius-sm);
  background: var(--surface-solid);
  border: 1px solid var(--line);
  color: var(--ink);
}

.opp-kpis {
  margin: 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.opp-kpis li {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
}
```

Note: `.opp-badge` text now reads "Opportunity" (set by the JS). The existing `.opp-badge`, `.opp-pill`, `.vt-phase*` rules are reused as-is. The `.opp-levers`/`.opp-lever` rules are no longer referenced by the value tree — leave them only if used elsewhere; a quick check (`grep -rn "opp-lever\b" web/`) should show no remaining JS usage, in which case remove `.opp-levers` and `.opp-lever` (keep `.opp-lever__value`, still used as the "—" empty marker).

- [ ] **Step 3: Remove now-dead `.opp-levers` / `.opp-lever` rules if unused**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
grep -rnE "opp-levers|opp-lever[^_-]" web/app.js web/data-fallback.js || echo "no JS usage — safe to delete .opp-levers/.opp-lever from styles.css"
```
If the command prints "no JS usage", delete the `.opp-levers { ... }` and `.opp-lever { ... }` rules from `web/styles.css` (keep `.opp-lever__value`).

- [ ] **Step 4: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add web/styles.css
git commit -m "style(web): dimension tree + opportunity card styles for the value tree"
```

---

## Task 8: Rebuild the standalone demo

**Files:**
- Regenerate: `v3/demo/strategy-map-demo.html`

- [ ] **Step 1: Rebuild the single-file demo**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
node v3/demo/build-demo.cjs
```
Expected: `Wrote .../v3/demo/strategy-map-demo.html (NNN KB, N hero assets inlined)`.

- [ ] **Step 2: Confirm the demo carries the new value tree literal**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
grep -c 'valueTreeData = {' v3/demo/strategy-map-demo.html
grep -c 'vt-dimension__name' v3/demo/strategy-map-demo.html
grep -c 'Enabler TBD' v3/demo/strategy-map-demo.html
```
Expected: `1`, `1`, `0` (the demo now bundles the new data + render and no longer contains the old placeholder).

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardo.lana/Projects/MFG
git add v3/demo/strategy-map-demo.html
git commit -m "chore(demo): rebuild standalone demo with the new value tree"
```

---

## Task 9: Local verification + full audit (gate before deploy)

Run the real server and confirm: API shape, all pages render, and (audit) the live deployment's strategy/timeline match the new local payload so we know exactly what the deploy changes.

**Files:** none (verification only)

- [ ] **Step 1: Start the server**

Run (background):
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run uvicorn app.main:app --port 8000 &
sleep 2
```

- [ ] **Step 2: Verify the API health + payload shape**

Run:
```bash
curl -s http://127.0.0.1:8000/healthz
echo
curl -s "http://127.0.0.1:8000/api/strategy?refresh=1" | uv run python -c "import sys,json; d=json.load(sys.stdin); \
print('strategy phases:', [p['id'] for p in d['strategy']['phases']]); \
print('valueTree phases:', [p['id'] for p in d['valueTree']['phases']]); \
print('timeline:', len(d['timeline'])); \
print('sample opp:', d['valueTree']['phases'][0]['dimensions'][0]['opportunities'][0])"
```
Expected: `{"status":"ok"}`; strategy + valueTree phases both `['discover','create','activate','analyse']`; `timeline: 84`; a sample opportunity with real `enablers`/`kpis`.

- [ ] **Step 3: Browser verification of every page (preview tools)**

Using the preview tools against `http://127.0.0.1:8000/`:
1. `preview_start` (or reuse a running server) at `http://127.0.0.1:8000/`.
2. `preview_console_logs` — confirm **no errors** on load.
3. `preview_snapshot` — confirm the Overview, each of the 4 phases (open each via the sidebar), each subphase tab, and a JTBD modal all render (audit: content matches the Excel; unchanged from before).
4. Open **Value Tree Map** from the sidebar → `preview_snapshot`: confirm per-phase sections, dimension groups (Effectiveness/Execution/Efficiency) with definitions, opportunity cards with enabler chips, KPI lists, and "Shared" badges where applicable.
5. Open **Timeline** → `preview_snapshot`: confirm it still renders (enabler catalog unchanged).
6. `preview_screenshot` of the Value Tree Map page to share as proof.

- [ ] **Step 4: Audit — compare the live deployment to the new local payload**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
LIVE=https://strategy-map-454573262443.europe-west1.run.app
curl -s "$LIVE/api/strategy" > /tmp/live_strategy.json
curl -s "http://127.0.0.1:8000/api/strategy?refresh=1" > /tmp/local_strategy.json
uv run python - <<'PY'
import json
live = json.load(open("/tmp/live_strategy.json"))
local = json.load(open("/tmp/local_strategy.json"))
print("strategy identical:", live.get("strategy") == local.get("strategy"))
print("timeline identical:", live.get("timeline") == local.get("timeline"))
print("live valueTree keys:", list((live.get("valueTree") or {}).keys()))
print("local valueTree phases:", len((local.get("valueTree") or {}).get("phases", [])))
PY
```
Expected: `strategy identical: True`, `timeline identical: True` (confirms no drift — the only change the deploy introduces is the value tree), `live valueTree keys: ['themes']` (old/empty), `local valueTree phases: 4`.

- [ ] **Step 5: Stop the local server**

Run:
```bash
pkill -f "uvicorn app.main:app" 2>/dev/null; echo stopped
```

- [ ] **Step 6: Run the full backend test suite once more**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG/server
uv run pytest -q
```
Expected: all tests pass.

---

## Task 10: Deploy to Cloud Run + post-deploy verification

The Docker build context is the repo root; `server/` (incl. `app/excel/strategy.xlsx`) and `web/` are copied. Target the existing `strategy-map` service.

**Files:** none (deploy only)

- [ ] **Step 1: Confirm gcloud target**

Run:
```bash
gcloud config get-value account
gcloud config get-value project
```
Expected: `riccardo.lana@vml.com` / `vmlmap-agentic-dev`.

- [ ] **Step 2: Deploy**

Run (from the repo root so `--source .` picks up the Dockerfile + `server/` + `web/`):
```bash
cd /Users/riccardo.lana/Projects/MFG
gcloud run deploy strategy-map --source . --region europe-west1 --allow-unauthenticated
```
Expected: build + deploy succeed; the command prints `Service URL: https://strategy-map-454573262443.europe-west1.run.app`.

- [ ] **Step 3: Post-deploy smoke check (live)**

Run:
```bash
LIVE=https://strategy-map-454573262443.europe-west1.run.app
curl -s "$LIVE/healthz"; echo
curl -s "$LIVE/api/strategy" | python3 -c "import sys,json; d=json.load(sys.stdin); \
print('valueTree phases:', [p['id'] for p in d['valueTree']['phases']]); \
print('discover dims:', [x['name'] for x in d['valueTree']['phases'][0]['dimensions']]); \
print('strategy phases:', [p['id'] for p in d['strategy']['phases']])"
```
Expected: `{"status":"ok"}`; `valueTree phases: ['discover','create','activate','analyse']`; `discover dims: ['Effectiveness','Execution','Efficiency']`; `strategy phases: ['discover','create','activate','analyse']`.

- [ ] **Step 4: Browser verification of the live Value Tree Map**

With the preview tools (or a manual visit), open `https://strategy-map-454573262443.europe-west1.run.app/` → Value Tree Map → confirm the dimension-grouped tree with real enablers/KPIs renders and the console is clean. Capture a `preview_screenshot` as proof.

- [ ] **Step 5: Push the branch / open a PR (if working on a branch)**

Run:
```bash
cd /Users/riccardo.lana/Projects/MFG
git status
# If on a feature branch:
# git push -u origin <branch> && gh pr create --fill
```

---

## Self-Review (completed during planning)

- **Spec coverage:** Value tree content + look (Tasks 2,3,6,7), every page audited (Task 9 Step 3), live-vs-local drift check (Task 9 Step 4), Excel refresh (Task 1), fallback + demo kept in sync (Tasks 4,5,8), redeploy (Task 10). ✔
- **Scope finding surfaced:** JTBD/Overview sheets are byte-identical to production; documented in Background so "every page/subpage" expectations are reconciled with reality (only the value tree changes). ✔
- **Type consistency:** `valueTree` shape (`phases[].dimensions[].opportunities[]{id,title,shared,enablers,kpis}`) is identical across schema (`ValueTree`/`VtPhase`/`VtDimension`/`VtOpportunity`), loader output, `fallback.json`, `data-fallback.js`, and the frontend renderers (`renderVtPhase`/`renderVtDimension`/`renderVtOpp`). The global is `valueTreeData` everywhere (`boot.js` sets `window.valueTreeData`; `data-fallback.js` declares `const valueTreeData`; `app.js` reads bare `valueTreeData`). ✔
- **No placeholders:** every code/command step carries the real content; fallback data is generated from the loader rather than hand-authored. ✔
```

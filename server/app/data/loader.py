"""Data source for the strategy payload.

Source of truth is the Excel (`app/excel/strategy.xlsx`, "Data from Miro"). It is mapped
into the same shape the v3 frontend consumes:
  - strategy : phases -> subphases -> lanes {jtbd, opportunities, enablers}
  - valueTree: dropped (pending Figma) -> {themes: []}
  - timeline : the 84-item enabler catalog (sheet 2), as the objects the enabler lane
               matches against (no dates; the dated timeline view was dropped)

Phase-level metadata the Excel lacks (subtitle, accent, icon, signal, summary) comes from
`fallback.json`. If the Excel is missing or fails validation, the whole `fallback.json`
payload is served instead. Override the Excel path with `STRATEGY_XLSX`.

The validated payload is cached; pass `refresh=True` (wired to `?refresh=1`) to re-read.
"""

from __future__ import annotations

import json
import logging
import os
import re
from pathlib import Path

import openpyxl

from ..schema import StrategyResponse

logger = logging.getLogger("strategy.loader")

_DATA_DIR = Path(__file__).resolve().parent
_FALLBACK_JSON = _DATA_DIR / "fallback.json"
_EXCEL_PATH = Path(
    os.environ.get("STRATEGY_XLSX", _DATA_DIR.parent / "excel" / "strategy.xlsx")
)

_cache: StrategyResponse | None = None

# Excel phase name -> fallback.json phase id (for metadata lookup + stable ids).
_PHASE_ALIAS = {"analyze": "analyse"}


def _slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", str(text).strip().lower())
    return s.strip("-")


def _lines(cell) -> list[str]:
    """Split a multi-item cell into clean lines, dropping blanks and N/A."""
    if cell is None:
        return []
    out = []
    for raw in str(cell).replace("\xa0", " ").split("\n"):
        v = raw.strip()
        if v and v.lower() not in {"n/a", "n/a.", "na", "-", "tbd"}:
            out.append(v)
    return out


def _parse_opportunities(cell) -> dict:
    """Parse the 'Key opportunities' blob into {mfgFocus: [{title, description}]}.

    Format: a 'MFG focus area(s):' header, then items as 'Title — description'
    (em dash, often preceded by a non-breaking space). Continuation lines without a
    dash are appended to the previous item's description.
    """
    if not cell:
        return {"mfgFocus": []}
    text = str(cell).replace("\xa0", " ")
    items: list[dict] = []
    for raw in text.split("\n"):
        line = raw.strip()
        if not line or re.match(r"(?i)^mfg\s+focus\s+area", line):
            continue
        if "—" in line:  # em dash separates title from description
            title, _, desc = line.partition("—")
            items.append({"title": title.strip(), "description": desc.strip()})
        elif items:  # continuation of the previous description
            items[-1]["description"] = (items[-1]["description"] + " " + line).strip()
    return {"mfgFocus": items}


def _enabler_type(raw) -> str:
    t = (raw or "").lower()
    return "agent" if "agent" in t else "tool"


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


def _load_phase_meta() -> dict[str, dict]:
    fb = json.loads(_FALLBACK_JSON.read_text(encoding="utf-8"))
    meta = {}
    for p in fb["strategy"]["phases"]:
        meta[p["id"]] = {k: p.get(k) for k in ("id", "subtitle", "accent", "icon", "signal", "summary")}
    return meta


def _load_sample_jtbd() -> dict[str, dict]:
    """Map JTBD number -> {owner, effort, valueDriver, coreProblem} from the v3 sample.

    The Excel doesn't carry these yet; the v3 sample (currently only JTBD 1.1) provides them
    so the detail modal shows the value driver + chips per the design. Merged by number.
    """
    fb = json.loads(_FALLBACK_JSON.read_text(encoding="utf-8"))
    out: dict[str, dict] = {}
    for p in fb["strategy"]["phases"]:
        for sub in p["subphases"]:
            for j in sub["lanes"]["jtbd"]:
                s = j.get("sections") or {}
                extras = {k: v for k, v in {
                    "owner": j.get("owner"),
                    "effort": j.get("effort"),
                    "valueDriver": s.get("valueDriver"),
                    "coreProblem": s.get("coreProblem"),
                }.items() if v}
                if j.get("number") and extras:
                    out[j["number"]] = extras
    return out


def _load_excel() -> StrategyResponse:
    wb = openpyxl.load_workbook(_EXCEL_PATH, data_only=True)
    jtbd_ws = wb["JTBD"]
    enabler_ws = next(ws for ws in wb.worksheets if ws.title.strip().lower().startswith("overview"))
    phase_meta = _load_phase_meta()
    sample = _load_sample_jtbd()  # owner/effort/valueDriver by JTBD number (v3 sample)

    # ── Sheet 2: enabler catalog -> timeline objects + per-phase name index ──
    enabler_rows = list(enabler_ws.iter_rows(values_only=True))
    # Optional date columns: import them if the sheet ever gains start/end headers.
    header = [str(h).strip().lower() if h else "" for h in (enabler_rows[0] if enabler_rows else [])]
    start_col = next((i for i, h in enumerate(header) if "start" in h), None)
    end_col = next((i for i, h in enumerate(header) if "end" in h or "finish" in h), None)

    def _date(row, col):
        if col is None or col >= len(row) or row[col] in (None, ""):
            return ""
        v = row[col]
        return v.isoformat()[:10] if hasattr(v, "isoformat") else str(v).strip()

    timeline: list[dict] = []
    names_by_phase: dict[str, list[str]] = {}
    for i, r in enumerate(enabler_rows[1:], start=1):
        name = r[1]
        if not name:
            continue
        excel_phase = (r[4] or "").strip()
        pid = _PHASE_ALIAS.get(excel_phase.lower(), _slug(excel_phase))
        timeline.append({
            "id": f"en-{i}",
            "title": str(name).strip(),
            "description": (r[6] or "").strip(),
            "type": _enabler_type(r[2]),
            "owner": (r[3] or "").strip(),
            "span": (r[5] or "").strip(),
            "phaseId": pid,
            "subphaseId": "",
            "startDate": _date(r, start_col),
            "endDate": _date(r, end_col),
        })
        names_by_phase.setdefault(pid, []).append(str(name).strip())

    # ── Sheet 1: JTBD rows -> phases / subphases / jtbd ──
    rows = list(jtbd_ws.iter_rows(values_only=True))[2:]  # skip header + Now/Near/Future row
    phases: list[dict] = []
    phase_idx: dict[str, dict] = {}
    sub_idx: dict[tuple, dict] = {}
    cur_phase_name = cur_sub_title = None

    for r in rows:
        if r[0]:
            cur_phase_name = str(r[0]).strip()
        if r[1]:
            cur_sub_title = str(r[1]).strip()
        if not (r[4] or r[5]):
            continue  # not a JTBD row

        pid = _PHASE_ALIAS.get(cur_phase_name.lower(), _slug(cur_phase_name))
        if pid not in phase_idx:
            meta = phase_meta.get(pid, {})
            phase = {
                "id": pid,
                "title": cur_phase_name,
                "subtitle": meta.get("subtitle", ""),
                "accent": meta.get("accent", "#4285f4"),
                "icon": meta.get("icon", ""),
                "signal": meta.get("signal", ""),
                "summary": meta.get("summary", ""),
                "subphases": [],
            }
            phase_idx[pid] = phase
            phases.append(phase)

        sub_key = (pid, cur_sub_title)
        if sub_key not in sub_idx:
            sub = {
                "id": _slug(cur_sub_title),
                "title": cur_sub_title,
                "summary": (r[2] or "").strip() if r[1] else "",
                "milestone": (r[2] or "").strip() if r[1] else "",
                "lanes": {
                    "jtbd": [],
                    "opportunities": _parse_opportunities(r[3]) if r[3] else {"mfgFocus": []},
                    # enabledBy / valueCreation: not in the Excel yet — empty so the lanes
                    # render (count 0) per the design; wire when columns are added.
                    "enabledBy": [],
                    "enablers": names_by_phase.get(pid, []),
                    "valueCreation": [],
                },
            }
            sub_idx[sub_key] = sub
            phase_idx[pid]["subphases"].append(sub)

        number = str(r[4]).strip() if r[4] else ""
        extra = sample.get(number, {})  # owner/effort/valueDriver/coreProblem (v3 sample)
        sections = {
            "coreActivities": _lines(r[7]),
            "inputs": _lines(r[8]),
            "outputs": _lines(r[9]),
            "enablers": {
                "now": {"tools": _lines(r[10]), "agents": _lines(r[13])},
                "near": {"tools": _lines(r[11]), "agents": _lines(r[14])},
                "next": {"tools": _lines(r[12]), "agents": _lines(r[15])},
            },
        }
        if extra.get("valueDriver"):
            sections["valueDriver"] = extra["valueDriver"]
        if extra.get("coreProblem"):
            sections["coreProblem"] = extra["coreProblem"]
        sub_idx[sub_key]["lanes"]["jtbd"].append({
            "id": f"jtbd-{_slug(number)}" if number else f"jtbd-{_slug(r[5])}",
            "number": number,
            "title": str(r[5]).strip() if r[5] else "",
            "summary": (r[6] or "").strip(),
            "status": "Sample complete",
            "owner": extra.get("owner", ""),
            "effort": extra.get("effort", ""),
            "sections": sections,
        })

    return StrategyResponse.model_validate(
        {
            "strategy": {"phases": phases},
            "valueTree": _load_value_tree(wb, phase_meta),
            "timeline": timeline,
        }
    )


def _load_fallback() -> StrategyResponse:
    with _FALLBACK_JSON.open(encoding="utf-8") as fh:
        return StrategyResponse.model_validate(json.load(fh))


def load_data(refresh: bool = False) -> StrategyResponse:
    """Return the validated strategy payload, cached after first load."""
    global _cache
    if _cache is not None and not refresh:
        return _cache

    if _EXCEL_PATH.exists():
        try:
            _cache = _load_excel()
            logger.info("Loaded strategy data from Excel: %s", _EXCEL_PATH)
            return _cache
        except Exception:  # noqa: BLE001 - never let a bad sheet take the app down
            logger.exception("Excel load failed; falling back to bundled JSON.")

    _cache = _load_fallback()
    logger.info("Loaded strategy data from fallback JSON: %s", _FALLBACK_JSON)
    return _cache

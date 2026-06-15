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

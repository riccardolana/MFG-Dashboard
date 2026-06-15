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

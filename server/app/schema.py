"""Pydantic models mirroring the v3 `strategyData` contract.

The frontend (`web/app.js`) consumes three datasets that the API returns together:
- `strategy`  -> phases / subphases / lanes / JTBD  (the core, strictly modelled)
- `valueTree` -> themes / dimensions / opportunities (kept flexible)
- `timeline`  -> enabler timeline entries            (kept flexible)

The strategy contract is modelled strictly so any data source (the v3 fallback today,
the Excel loader in Phase C) is validated against the shape the UI expects. The value
tree and timeline are typed loosely on purpose — they are still evolving and are not yet
driven by the Excel.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class _Base(BaseModel):
    # Tolerate extra keys so the data can grow without breaking validation.
    model_config = ConfigDict(extra="allow")


class EnablerHorizon(_Base):
    tools: list[str] = Field(default_factory=list)
    agents: list[str] = Field(default_factory=list)


class JtbdEnablers(_Base):
    now: EnablerHorizon | None = None
    near: EnablerHorizon | None = None
    next: EnablerHorizon | None = None


class ValueDriver(_Base):
    theme: str | None = None
    quality: str | None = None
    statement: str | None = None


class JtbdSections(_Base):
    coreActivities: list[str] = Field(default_factory=list)
    inputs: list[str] = Field(default_factory=list)
    outputs: list[str] = Field(default_factory=list)
    enablers: JtbdEnablers | None = None
    valueDriver: ValueDriver | None = None
    coreProblem: str | None = None


class Jtbd(_Base):
    id: str
    number: str | None = None
    title: str
    summary: str | None = None
    status: str | None = None
    owner: str | None = None
    effort: str | None = None
    sections: JtbdSections | None = None


class Lanes(_Base):
    # `jtbd` is strictly modelled (it drives the detail panel). The other lane fields are
    # heterogeneous in v3 — e.g. `opportunities` is a list[str] in placeholder lanes but a
    # richer `{mfgFocus: [...], ...}` object in authored lanes — so they accept either shape.
    jtbd: list[Jtbd] = Field(default_factory=list)
    opportunities: list | dict | None = None
    enabledBy: list | dict | None = None
    enablers: list | dict | None = None
    valueCreation: list | dict | None = None


class Subphase(_Base):
    id: str
    title: str
    summary: str | None = None
    milestone: str | None = None
    lanes: Lanes


class Phase(_Base):
    id: str
    title: str
    subtitle: str | None = None
    accent: str | None = None
    summary: str | None = None
    signal: str | None = None
    subphases: list[Subphase] = Field(default_factory=list)


class Strategy(_Base):
    phases: list[Phase] = Field(default_factory=list)


class StrategyResponse(_Base):
    """Full payload returned by GET /api/strategy."""

    strategy: Strategy
    valueTree: dict = Field(default_factory=dict)
    timeline: list = Field(default_factory=list)

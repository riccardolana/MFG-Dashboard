// Headless smoke test: run web/app.js against given data with a minimal DOM stub,
// exercising render + navigation + modals to catch runtime crashes (undefined refs,
// bad shapes). Usage: node smoke_render.js <excel|fallback>
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const WEB = path.resolve(__dirname, "../../web");
const mode = process.argv[2] || "excel";

// ── Minimal DOM stub ──
function elem() {
  return {
    _html: "", style: { setProperty() {}, removeProperty() {} },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    dataset: {}, children: [], parentElement: null, value: "",
    setAttribute() {}, getAttribute() { return null; }, removeAttribute() {},
    addEventListener() {}, appendChild() {}, focus() {}, closest() { return null; },
    querySelector() { return null; }, querySelectorAll() { return []; },
    get innerHTML() { return this._html; }, set innerHTML(v) { this._html = String(v); },
  };
}
const byId = {};
const document = {
  getElementById(id) { return (byId[id] = byId[id] || elem()); },
  createElement() { return elem(); },
  addEventListener() {},
  body: { style: {} },
  documentElement: { style: { setProperty() {} } },
};

const sandbox = {
  document, window: {}, console,
  requestAnimationFrame() {}, Date, Math, JSON, Object, Array, String, Number, Set, Map,
};
sandbox.window = sandbox;

// ── Load data ──
let dataPrelude;
if (mode === "fallback") {
  dataPrelude = fs.readFileSync(path.join(WEB, "data-fallback.js"), "utf8");
} else {
  const d = JSON.parse(fs.readFileSync("/tmp/excel_data.json", "utf8"));
  dataPrelude =
    `var strategyData=${JSON.stringify(d.strategy)};` +
    `var valueTreeData=${JSON.stringify(d.valueTree)};` +
    `var valueFrameworkData=${JSON.stringify(d.valueFramework)};` +
    `var timelineEnablers=${JSON.stringify(d.timeline)};`;
}

const appCode = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// Exercise every nav path + open a modal for the first JTBD of each subphase.
const exercise = `
;(function(){
  setPage("overview-all");
  for (const p of strategyData.phases) {
    setPhase(p.id);
    for (const s of p.subphases) {
      setSubphase(s.id);
      if (s.lanes.jtbd[0]) openModal(s.lanes.jtbd[0].id);
    }
  }
  setPage("value-tree");  // Value Framework page (framework view, first phase)
  // exercise both visualizations across every phase tab
  const vfPhases = (typeof valueFrameworkData !== "undefined" && valueFrameworkData.phases.length)
    ? valueFrameworkData.phases : valueTreeData.phases;
  for (const view of ["framework", "tree"]) {
    state.vfView = view;
    for (const p of vfPhases) { state.vfPhaseId = p.id; renderValueFrameworkPage(); }
  }
  state.vfView = "framework";
  setPage("timeline");
  setPage("overview-all");
  runSearch("brief");
  console.log("OK: rendered " + strategyData.phases.length + " phases, " +
    strategyData.phases.reduce((n,p)=>n+p.subphases.length,0) + " subphases without throwing");
})();
`;

try {
  vm.runInNewContext(dataPrelude + "\n" + appCode + "\n" + exercise, sandbox, { filename: "app.js" });
} catch (e) {
  console.error("SMOKE FAIL (" + mode + "):", e && e.stack ? e.stack : e);
  process.exit(1);
}

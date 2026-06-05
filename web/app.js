// ── Lane config + helpers ──
// Kept here (not in the data file) so the app works when data arrives from the API.
// `icon` values are Google Material Symbols Rounded names (matching the Figma design).
function getEnablerMonth(dateStr) {
  return new Date(dateStr).getMonth() + 1;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

// `icon` keys map to inlined Figma SVGs in window.FIGMA_ICONS (web/icons.js).
const laneMeta = {
  jtbd: {
    label: "Jobs to be done",
    eyebrow: "Work moments",
    icon: "icon-jobs",
    description: "Expandable cards that describe the practical jobs each subphase needs to accomplish."
  },
  opportunities: {
    label: "Key opportunities",
    eyebrow: "Focus areas",
    icon: "icon-opportunities",
    description: "Themes from the workshops that can improve quality, speed, alignment, or reuse."
  },
  enabledBy: {
    label: "Enabled by",
    eyebrow: "Dependencies",
    icon: "icon-enabledby",
    description: "Rituals, artefacts, teams, and inputs that make the work easier to execute."
  },
  enablers: {
    label: "Enablers",
    eyebrow: "Tools & agents",
    icon: "icon-enablers",
    description: "Tools and agents that support the work in this phase."
  },
  valueCreation: {
    label: "Value creation",
    eyebrow: "Why it matters",
    icon: "icon-valuecreation",
    description: "The business or operating value created when the subphase works well."
  }
};

// Inline a Figma SVG icon by key (from window.FIGMA_ICONS), empty string if missing.
function icon(key) {
  return (window.FIGMA_ICONS && window.FIGMA_ICONS[key]) || "";
}

// Per-phase hero decorative art (actual cleaned-up Figma exports in web/assets/figma/).
// Each shape carries height (px) + right offset; shapes are vertically centered and
// clipped by the band. Listed back-to-front.
const HERO_ART = {
  discover: [
    { src: "hero-discover-1.svg", h: 300, right: "3%" },
    { src: "hero-discover-img.png", h: 250, right: "27%" },
    { src: "hero-discover-2.svg", h: 120, right: "50%" }
  ],
  create: [
    { src: "hero-create-3.svg", h: 320, right: "-4%" },
    { src: "hero-create-1.svg", h: 250, right: "24%" },
    { src: "hero-create-2.svg", h: 210, right: "46%" }
  ],
  activate: [
    { src: "hero-activate-1.svg", h: 320, right: "24%" },
    { src: "hero-activate-2.svg", h: 320, right: "-2%" },
    { src: "hero-activate-3.svg", h: 280, right: "47%" }
  ],
  analyse: [
    { src: "hero-analyse-2.png", h: 250, right: "-6%" },
    { src: "hero-analyse-3.svg", h: 280, right: "22%" },
    { src: "hero-analyse-1.svg", h: 210, right: "46%" }
  ]
};

const state = {
  page: "phase",
  phaseId: strategyData.phases[0].id,
  subphaseId: strategyData.phases[0].subphases[0].id,
  activeJtbdId: null,
  activeEnablerId: null,
  searchOpen: false,
  searchQuery: "",
  sidebarCollapsed: false
};

const el = {
  app: document.getElementById("app"),
  phaseNav: document.getElementById("phaseNav"),
  breadcrumbs: document.getElementById("breadcrumbs"),
  phaseBanner: document.getElementById("phaseBanner"),
  subphaseTabs: document.getElementById("subphaseTabs"),
  content: document.getElementById("content"),
  modal: document.getElementById("modal"),
  modalContent: document.getElementById("modalContent"),
  modalScrim: document.getElementById("modalScrim"),
  searchPalette: document.getElementById("searchPalette"),
  searchScrim: document.getElementById("searchScrim"),
  searchInput: document.getElementById("searchInput"),
  searchResults: document.getElementById("searchResults")
};

function getPhase(id) {
  return strategyData.phases.find(p => p.id === (id || state.phaseId));
}

function getSubphase(id) {
  const phase = getPhase();
  return phase.subphases.find(s => s.id === (id || state.subphaseId));
}

function getAllJtbd() {
  return strategyData.phases.flatMap(phase =>
    phase.subphases.flatMap(sub =>
      sub.lanes.jtbd.map(j => ({ ...j, phase, subphase: sub }))
    )
  );
}

function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function laneCount(sub, key) {
  const data = sub.lanes[key];
  if (Array.isArray(data)) return data.length;
  if (data && typeof data === "object" && (data.mfgFocus || data.shared)) {
    return (data.mfgFocus ? data.mfgFocus.length : 0) + (data.shared ? data.shared.length : 0);
  }
  return 0;
}

function isRichOpportunities(data) {
  return data && typeof data === "object" && !Array.isArray(data) && (data.mfgFocus || data.shared);
}

// ── Navigation ──
function setPage(page) {
  state.page = page;
  state.activeJtbdId = null;
  state.activeEnablerId = null;
  render();
}

function setPhase(phaseId) {
  state.page = "phase";
  state.phaseId = phaseId;
  state.subphaseId = getPhase(phaseId).subphases[0].id;
  state.activeJtbdId = null;
  state.activeEnablerId = null;
  render();
}

function setSubphase(subphaseId) {
  state.subphaseId = subphaseId;
  state.activeJtbdId = null;
  renderSubphaseTabs();
  renderContent();
}

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  el.app.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
}

// ── Render ──
function render() {
  renderPhaseNav();

  if (state.page === "overview-all") {
    renderPageBreadcrumbs("Overview");
    el.phaseBanner.innerHTML = "";
    el.phaseBanner.style.display = "none";
    el.subphaseTabs.innerHTML = "";
    el.subphaseTabs.style.display = "none";
    renderOverviewPage();
    return;
  }

  if (state.page === "value-tree") {
    renderPageBreadcrumbs("Value Tree Map");
    el.phaseBanner.innerHTML = "";
    el.phaseBanner.style.display = "none";
    el.subphaseTabs.innerHTML = "";
    el.subphaseTabs.style.display = "none";
    renderValueTreePage();
    return;
  }

  if (state.page === "timeline") {
    renderPageBreadcrumbs("Timeline");
    el.phaseBanner.innerHTML = "";
    el.phaseBanner.style.display = "none";
    el.subphaseTabs.innerHTML = "";
    el.subphaseTabs.style.display = "none";
    renderTimelinePage();
    return;
  }

  el.phaseBanner.style.display = "";
  el.subphaseTabs.style.display = "";
  renderBreadcrumbs();
  renderBanner();
  renderSubphaseTabs();
  renderContent();
  updatePhaseAccent();
}

function renderPageBreadcrumbs(pageName) {
  el.breadcrumbs.innerHTML = `
    <button type="button" data-action="home">Strategy Map</button>
    <span class="crumb-sep">/</span>
    <span class="crumb-current">${esc(pageName)}</span>
  `;
}

function updatePhaseAccent() {
  document.documentElement.style.setProperty("--phase-accent", getPhase().accent);
}

function renderPhaseNav() {
  const phase = getPhase();
  const isOverview = state.page === "overview-all";
  const isValueTree = state.page === "value-tree";
  const isTimeline = state.page === "timeline";
  const isPhase = state.page === "phase";

  const overviewBtn = `
    <button class="phase-btn ${isOverview ? "is-active" : ""}"
            type="button" data-page="overview-all"
            style="--accent:#C58BB1"
            title="Overview">
      <span class="phase-btn__icon" style="--accent:rgba(237,219,236,0.76)">
        ${icon("nav-overview")}
      </span>
      <span class="phase-btn__text">
        <strong>Overview</strong>
      </span>
    </button>
  `;

  const phaseBtns = strategyData.phases.map(p => `
    <button class="phase-btn ${isPhase && p.id === phase.id ? "is-active" : ""}"
            type="button" data-page="phase" data-phase="${p.id}"
            style="--accent:${p.accent}"
            title="${p.title}: ${p.subtitle}">
      <span class="phase-btn__icon" style="--accent:${p.accent}">${p.icon}</span>
      <span class="phase-btn__text">
        <strong>${p.title}</strong>
        <small>${p.subtitle}</small>
      </span>
    </button>
  `).join("");

  const separator = `<hr class="nav-separator">`;

  const valueTreeBtn = `
    <button class="phase-btn ${isValueTree ? "is-active" : ""}"
            type="button" data-page="value-tree"
            style="--accent:#6750A4"
            title="Value Tree Map">
      <span class="phase-btn__icon" style="--accent:#6750A4">
        ${icon("nav-valuetree")}
      </span>
      <span class="phase-btn__text">
        <strong>Value Tree Map</strong>
      </span>
    </button>
  `;

  const timelineBtn = `
    <button class="phase-btn ${isTimeline ? "is-active" : ""}"
            type="button" data-page="timeline"
            style="--accent:#49474D"
            title="Timeline">
      <span class="phase-btn__icon" style="--accent:#49474D">
        ${icon("nav-timeline")}
      </span>
      <span class="phase-btn__text">
        <strong>Timeline</strong>
      </span>
    </button>
  `;

  el.phaseNav.innerHTML = overviewBtn + phaseBtns + separator + valueTreeBtn + timelineBtn;
}

function renderBreadcrumbs() {
  const phase = getPhase();
  const sub = getSubphase();
  el.breadcrumbs.innerHTML = `
    <button type="button" data-page="phase" data-phase="${phase.id}">${phase.title}</button>
    <span class="crumb-sep">/</span>
    <span class="crumb-current">${esc(sub.title)}</span>
  `;
}

function renderBanner() {
  const phase = getPhase();
  el.phaseBanner.style.setProperty("--phase-accent", phase.accent);
  el.phaseBanner.className = "phase-banner banner--" + phase.id;
  const art = HERO_ART[phase.id] || [];
  el.phaseBanner.innerHTML = `
    <div class="phase-banner__art" aria-hidden="true">
      ${art.map(s => `<img src="assets/figma/${s.src}" alt="" style="height:${s.h}px;right:${s.right};">`).join("")}
    </div>
    <div class="phase-banner__title">${esc(phase.signal)}</div>
    <div class="phase-banner__summary">${esc(phase.summary)}</div>
  `;
}

function renderSubphaseTabs() {
  const phase = getPhase();
  el.subphaseTabs.innerHTML = phase.subphases.map((sub, i) => `
    <button class="subphase-tab ${sub.id === state.subphaseId ? "is-active" : ""}"
            type="button" data-subphase="${sub.id}">
      <span class="subphase-tab__num">${String(i + 1).padStart(2, "0")}</span>
      ${esc(sub.title)}
    </button>
  `).join("");
}

function renderContent() {
  const sub = getSubphase();
  updatePhaseAccent();
  const openLanes = new Set();
  el.content.querySelectorAll(".lane-section[open]").forEach(d => {
    const idx = Array.from(d.parentElement.children).indexOf(d);
    openLanes.add(idx);
  });
  const laneKeys = Object.keys(laneMeta);
  el.content.innerHTML = `
    <div class="content-header">
      <h2>${esc(sub.title)}</h2>
      <p>${esc(sub.milestone)}</p>
    </div>
    <div class="lane-stack">
      ${laneKeys.map((key, i) => renderLane(sub, key, openLanes.size ? openLanes.has(i) : i === 0)).join("")}
    </div>
  `;
}

function renderLane(sub, key, open) {
  const meta = laneMeta[key];
  const count = laneCount(sub, key);
  return `
    <details class="lane-section" ${open ? "open" : ""}>
      <summary class="lane-header">
        <span class="lane-header__left">
          <span class="lane-header__icon">${icon(meta.icon)}</span>
          <span>
            <span class="lane-header__eyebrow">${meta.eyebrow}</span>
            <span class="lane-header__title">${meta.label}</span>
          </span>
        </span>
        <span style="display:flex;align-items:center;gap:8px">
          <span class="lane-header__count">${count}</span>
          <svg class="lane-header__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </summary>
      <div class="lane-body">
        <p class="lane-description">${meta.description}</p>
        ${key === "jtbd" ? renderJtbdGrid(sub.lanes.jtbd) : key === "enablers" ? renderEnablerGrid(sub) : key === "opportunities" && isRichOpportunities(sub.lanes.opportunities) ? renderOpportunitySections(sub.lanes.opportunities) : renderInsightGrid(sub.lanes[key])}
      </div>
    </details>
  `;
}

function renderJtbdGrid(items) {
  return `<div class="jtbd-grid">${items.map(renderJtbdCard).join("")}</div>`;
}

function renderJtbdCard(j) {
  const complete = j.status === "Sample complete";
  return `
    <article class="jtbd-card ${complete ? "is-complete" : ""}">
      <div class="jtbd-card__top">
        <span class="jtbd-number">JTBD ${esc(j.number)}</span>
        <span class="jtbd-status ${complete ? "is-complete" : ""}">${esc(j.status)}</span>
      </div>
      <h3>${esc(j.title)}</h3>
      <p>${esc(j.summary)}</p>
      <button class="jtbd-open-btn" type="button" data-jtbd="${j.id}">
        ${complete ? "Open detail →" : "Preview →"}
      </button>
    </article>
  `;
}

function renderInsightGrid(items) {
  return `<div class="insight-grid">${items.map((item, i) => `
    <div class="insight-card">
      <span class="insight-num">${String(i + 1).padStart(2, "0")}</span>
      <p>${esc(item)}</p>
    </div>
  `).join("")}</div>`;
}

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

function renderEnablerGrid(sub) {
  const names = sub.lanes.enablers;
  const phase = getPhase();
  return `<div class="enabler-card-grid">${names.map((name, i) => {
    const matched = timelineEnablers.find(te =>
      te.title.toLowerCase() === name.toLowerCase() && te.subphaseId === sub.id
    ) || timelineEnablers.find(te =>
      te.title.toLowerCase() === name.toLowerCase()
    );

    if (matched) {
      return `
        <div class="enabler-lane-card" data-enabler="${matched.id}">
          <div class="enabler-lane-card__top">
            <span class="tl-type-badge type-${matched.type}">${esc(matched.type)}</span>
          </div>
          <div class="enabler-lane-card__title">${esc(matched.title)}</div>
          <div class="enabler-lane-card__desc">${esc(matched.description)}</div>
          ${renderEnablerControls(matched)}
        </div>
      `;
    }

    return `
      <div class="enabler-lane-card enabler-lane-card--unlinked">
        <div class="enabler-lane-card__top">
          <span class="insight-num">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <div class="enabler-lane-card__title">${esc(name)}</div>
        <div class="enabler-lane-card__desc" style="color:var(--muted);font-style:italic;">Not yet on the timeline</div>
        <button class="enabler-add-btn" type="button" data-action="add-enabler" data-enabler-name="${esc(name)}" data-enabler-phase="${phase.id}" data-enabler-subphase="${sub.id}">
          + Add to timeline
        </button>
      </div>
    `;
  }).join("")}</div>`;
}

function renderOpportunitySections(opps) {
  let html = "";
  if (opps.mfgFocus && opps.mfgFocus.length) {
    html += `
      <div class="opp-section">
        <div class="opp-section__label">MFG focus areas</div>
        <div class="opp-section__grid">
          ${opps.mfgFocus.map(o => renderOppCard(o)).join("")}
        </div>
      </div>
    `;
  }
  if (opps.shared && opps.shared.length) {
    html += `
      <div class="opp-section">
        <div class="opp-section__label">Shared opportunities to unlock together</div>
        <div class="opp-section__grid">
          ${opps.shared.map(o => renderOppCard(o)).join("")}
        </div>
      </div>
    `;
  }
  return html;
}

function renderOppCard(opp) {
  return `
    <div class="opp-lane-card">
      <div class="opp-lane-card__title">${esc(opp.title)}</div>
      <div class="opp-lane-card__desc">${esc(opp.description)}</div>
    </div>
  `;
}

// ── Overview Page ──
function renderOverviewPage() {
  el.content.innerHTML = `
    <div class="overview-header">
      <h1>Strategy Planning Overview</h1>
      <p>All four phases with their subphases, jobs to be done, and key opportunities at a glance.</p>
    </div>
    <div class="overview-grid">
      ${strategyData.phases.map(renderOverviewColumn).join("")}
    </div>
  `;
}

function renderOverviewColumn(phase) {
  return `
    <div class="phase-column phase-column--${phase.id}" style="--col-accent:${phase.accent}">
      <div class="phase-column__header" style="background:${phase.accent}">
        <strong>${esc(phase.title)}</strong>
        <small>${esc(phase.subtitle)}</small>
      </div>
      ${phase.subphases.map(sub => renderOverviewSubphase(phase, sub)).join("")}
    </div>
  `;
}

function renderOverviewSubphase(phase, sub) {
  const jtbds = sub.lanes.jtbd;
  const opps = sub.lanes.opportunities;
  return `
    <details class="subphase-block">
      <summary>
        ${esc(sub.title)}
        <svg class="subphase-block__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </summary>
      <div class="subphase-block__body">
        <p class="subphase-block__summary">${esc(sub.summary)}</p>
        <button class="subphase-block__goto" type="button" data-page="phase" data-phase="${phase.id}" data-subphase="${sub.id}">
          Open workspace →
        </button>
        ${jtbds.map(j => `
          <div class="overview-jtbd" data-jtbd="${j.id}">
            <div class="overview-jtbd__top">
              <span class="overview-jtbd__num">JTBD ${esc(j.number)}</span>
            </div>
            <h4>${esc(j.title)}</h4>
            <p>${esc(j.summary)}</p>
          </div>
        `).join("")}
        ${renderOverviewOpps(opps)}
      </div>
    </details>
  `;
}

function renderOverviewOpps(opps) {
  if (isRichOpportunities(opps)) {
    let html = '<div class="overview-opps">';
    html += '<div class="overview-opps__label">Key Opportunities</div>';
    if (opps.mfgFocus && opps.mfgFocus.length) {
      html += `
        <details class="overview-opps__section">
          <summary class="overview-opps__section-label">
            MFG focus areas <span class="overview-opps__count">${opps.mfgFocus.length}</span>
          </summary>
          <div class="overview-opps__section-body">
            ${opps.mfgFocus.map(o => `
              <div class="overview-opp-card">
                <div class="overview-opp-card__title">${esc(o.title)}</div>
                <div class="overview-opp-card__desc">${esc(o.description)}</div>
              </div>
            `).join("")}
          </div>
        </details>
      `;
    }
    if (opps.shared && opps.shared.length) {
      html += `
        <details class="overview-opps__section">
          <summary class="overview-opps__section-label">
            Shared opportunities <span class="overview-opps__count">${opps.shared.length}</span>
          </summary>
          <div class="overview-opps__section-body">
            ${opps.shared.map(o => `
              <div class="overview-opp-card">
                <div class="overview-opp-card__title">${esc(o.title)}</div>
                <div class="overview-opp-card__desc">${esc(o.description)}</div>
              </div>
            `).join("")}
          </div>
        </details>
      `;
    }
    html += '</div>';
    return html;
  }

  if (Array.isArray(opps) && opps.length) {
    return `
      <div class="overview-opps">
        <details class="overview-opps__section">
          <summary class="overview-opps__section-label">
            Key Opportunities <span class="overview-opps__count">${opps.length}</span>
          </summary>
          <div class="overview-opps__section-body">
            ${opps.map(opp => `
              <div class="overview-opp-card">
                <div class="overview-opp-card__title">${esc(typeof opp === "string" ? opp : opp.title)}</div>
              </div>
            `).join("")}
          </div>
        </details>
      </div>
    `;
  }

  return "";
}

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

// ── Timeline Page ──
function renderTimelinePage() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  el.content.innerHTML = `
    <div class="tl-header">
      <h1>Roadmap Timeline</h1>
      <p>Enablers and tools mapped across the planning year. Edit the expected completion date directly on the cards.</p>
    </div>
    <div class="tl-container">
      <div class="tl-months">
        <span></span>
        ${months.map(m => `<span>${m}</span>`).join("")}
      </div>
      ${strategyData.phases.map(phase => renderTimelineRow(phase, months)).join("")}
    </div>
  `;
}

function renderTimelineRow(phase, months) {
  // Date-gated: only enablers with both a start and end date appear on the roadmap.
  const enablers = timelineEnablers.filter(e => e.phaseId === phase.id && e.endDate);
  return `
    <div class="tl-row" style="--row-accent:${phase.accent}">
      <div class="tl-phase-label">
        <span class="tl-phase-dot" style="background:${phase.accent}"></span>
        ${esc(phase.title)}
      </div>
      <div class="tl-track">
        ${enablers.length ? enablers.map(e => renderTimelineCard(e, months)).join("") : `<div style="grid-column:1/-1;padding:8px;color:var(--muted);font-size:12px;font-style:italic;">No dated enablers yet — set an expected completion date on enabler cards to place them here.</div>`}
      </div>
    </div>
  `;
}

function renderTimelineCard(enabler, months) {
  // Uniform-size cards anchored to their expected completion month: every card spans
  // the same number of month-columns and its right edge lands on the completion month.
  const SPAN = 3;
  const comp = getEnablerMonth(enabler.endDate);
  const start = Math.max(1, comp - SPAN + 1);

  return `
    <div class="tl-card" style="grid-column:${start}/${comp + 1}" data-enabler="${enabler.id}">
      <div class="tl-card__title">${esc(enabler.title)}</div>
      <div class="tl-card__desc">${esc(enabler.description)}</div>
      <div class="tl-card__meta">
        <span class="tl-type-badge type-${enabler.type}">${esc(enabler.type)}</span>
      </div>
      ${renderEnablerControls(enabler)}
      <span class="tl-card__anchor" aria-hidden="true"></span>
    </div>
  `;
}

// ── Modal ──
// Per-phase sidecard colours (exact hexes from the Figma sidecard frames).
// Drives the --jtbd-* CSS vars on the modal; --phase-accent themes the rest.
const JTBD_THEME = {
  discover: { num: "#4d9bfd", chipBg: "rgba(66,133,244,.1)", chipBorder: "rgba(66,133,244,.25)", chipText: "#0d2155", vdTint: "rgba(236,243,254,.8)" },
  create:   { num: "#c62828", chipBg: "rgba(234,67,53,.2)",  chipBorder: "rgba(234,67,53,.2)",  chipText: "#720000", vdTint: "rgba(255,194,189,.2)" },
  activate: { num: "#005918", chipBg: "rgba(52,168,83,.2)",  chipBorder: "rgba(52,168,83,.2)",  chipText: "#005918", vdTint: "rgba(168,230,184,.2)" },
  analyse:  { num: "#e17600", chipBg: "rgba(249,171,0,.2)",  chipBorder: "rgba(249,171,0,.2)",  chipText: "#e17600", vdTint: "rgba(255,224,157,.2)" },
};

function openModal(jtbdId) {
  const item = getAllJtbd().find(j => j.id === jtbdId);
  if (!item) return;

  state.activeJtbdId = jtbdId;
  el.modal.setAttribute("aria-hidden", "false");
  el.modal.classList.add("is-open");
  el.modalScrim.classList.add("is-open");
  document.body.style.overflow = "hidden";

  const accent = item.phase.accent;
  document.documentElement.style.setProperty("--phase-accent", accent);

  // Apply the per-phase sidecard palette (falls back to discover).
  const theme = JTBD_THEME[item.phase.id] || JTBD_THEME.discover;
  el.modal.style.setProperty("--jtbd-number", theme.num);
  el.modal.style.setProperty("--jtbd-chip-bg", theme.chipBg);
  el.modal.style.setProperty("--jtbd-chip-border", theme.chipBorder);
  el.modal.style.setProperty("--jtbd-chip-text", theme.chipText);
  el.modal.style.setProperty("--jtbd-vd-tint", theme.vdTint);

  if (!item.sections) {
    el.modalContent.innerHTML = `
      <div class="modal-header">
        <button class="modal-close" type="button" data-action="close-modal" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="modal-kicker">${item.phase.title} / ${item.subphase.title}</div>
        <h2>JTBD <strong>${esc(item.number)}</strong> ${esc(item.title)}</h2>
        <p>${esc(item.summary)}</p>
      </div>
      <div class="modal-body">
        <div class="empty-state">This card is a placeholder. The final content can be added to the structured data file.</div>
        <button class="jtbd-open-btn" type="button" data-action="goto-phase" data-phase="${item.phase.id}" data-subphase="${item.subphase.id}" style="margin-top:8px;">
          Go to ${item.phase.title} →
        </button>
      </div>
    `;
    return;
  }

  const s = item.sections;
  el.modalContent.innerHTML = `
    <div class="modal-header">
      <button class="modal-close" type="button" data-action="close-modal" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-kicker">${item.phase.title} / ${item.subphase.title}</div>
      <h2>JTBD <strong>${esc(item.number)}</strong> ${esc(item.title)}</h2>
      <p>${esc(item.summary)}</p>
      ${(item.owner || item.effort || (s.valueDriver && s.valueDriver.theme)) ? `
      <div class="modal-chips">
        ${item.owner ? `<span class="modal-chip">${esc(item.owner)}</span>` : ""}
        ${item.effort ? `<span class="modal-chip">${esc(item.effort)}</span>` : ""}
        ${s.valueDriver && s.valueDriver.theme ? `<span class="modal-chip">${esc(s.valueDriver.theme)}</span>` : ""}
      </div>` : ""}
    </div>
    <div class="modal-body">
      ${(s.valueDriver && (s.valueDriver.theme || s.valueDriver.statement)) ? `
      <div class="value-driver">
        <div class="value-driver__texture" aria-hidden="true"></div>
        <div class="value-driver__label">Value driver</div>
        ${s.valueDriver.theme ? `<div class="value-driver__theme">${esc(s.valueDriver.theme)}</div>` : ""}
        ${s.valueDriver.statement ? `<p>${esc(s.valueDriver.statement)}</p>` : ""}
      </div>` : ""}
      ${panelList("Core activities", s.coreActivities, true)}
      ${panelList("Inputs", s.inputs)}
      ${panelList("Outputs", s.outputs)}

      <details class="panel-section" open>
        <summary>Enablers <svg class="panel-section__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
        <div class="enabler-timeline">
          ${Object.entries(s.enablers).map(([moment, content]) => `
            <div class="enabler-col">
              <div class="enabler-col__label">${esc(moment)}</div>
              <h4>Tools</h4>
              <p>${content.tools.length ? content.tools.map(esc).join("<br>") : "—"}</p>
              <h4>Agents</h4>
              <p>${content.agents.length ? content.agents.map(esc).join("<br>") : "—"}</p>
            </div>
          `).join("")}
        </div>
      </details>

      <button class="jtbd-open-btn" type="button" data-action="goto-phase" data-phase="${item.phase.id}" data-subphase="${item.subphase.id}" style="margin-top:8px;">
        Go to ${item.phase.title} →
      </button>
    </div>
  `;
}

function panelList(title, items, open = false) {
  return `
    <details class="panel-section" ${open ? "open" : ""}>
      <summary>${esc(title)} <svg class="panel-section__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
      <ul>${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </details>
  `;
}

function closeModal() {
  state.activeJtbdId = null;
  el.modal.setAttribute("aria-hidden", "true");
  el.modal.classList.remove("is-open");
  el.modalScrim.classList.remove("is-open");
  document.body.style.overflow = "";
  updatePhaseAccent();
}

// ── Enabler Modal ──
function openEnablerModal(enablerId) {
  const enabler = timelineEnablers.find(e => e.id === enablerId);
  if (!enabler) return;
  state.activeEnablerId = enablerId;
  const phase = getPhase(enabler.phaseId);

  el.modal.setAttribute("aria-hidden", "false");
  el.modal.classList.add("is-open");
  el.modalScrim.classList.add("is-open");
  document.body.style.overflow = "hidden";
  document.documentElement.style.setProperty("--phase-accent", phase.accent);

  el.modalContent.innerHTML = `
    <div class="modal-header">
      <button class="modal-close" type="button" data-action="close-enabler-modal" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-kicker">${phase.title} · Enabler</div>
      <h2>${esc(enabler.title)}</h2>
      <p>${esc(enabler.description)}</p>
      <div class="modal-chips">
        <span class="modal-chip">${esc(enabler.type)}</span>
        <span class="modal-chip">Due ${formatDate(enabler.endDate)}</span>
      </div>
    </div>
    <div class="modal-body">
      <div class="panel-section" style="border:1px solid var(--line);border-radius:var(--radius);padding:16px;">
        <div style="font-weight:700;margin-bottom:12px;">Integration</div>
        ${renderEnablerControls(enabler)}
      </div>
      <button class="jtbd-open-btn" type="button" data-action="goto-phase" data-phase="${enabler.phaseId}" data-subphase="${enabler.subphaseId}" style="margin-top:8px;">
        Go to ${phase.title} →
      </button>
    </div>
  `;
}

function closeEnablerModal() {
  state.activeEnablerId = null;
  el.modal.setAttribute("aria-hidden", "true");
  el.modal.classList.remove("is-open");
  el.modalScrim.classList.remove("is-open");
  document.body.style.overflow = "";
  updatePhaseAccent();
}

// ── Search ──
function openSearch() {
  state.searchOpen = true;
  el.searchPalette.classList.add("is-open");
  el.searchScrim.classList.add("is-open");
  el.searchInput.value = "";
  el.searchResults.innerHTML = "";
  requestAnimationFrame(() => el.searchInput.focus());
}

function closeSearch() {
  state.searchOpen = false;
  state.searchQuery = "";
  el.searchPalette.classList.remove("is-open");
  el.searchScrim.classList.remove("is-open");
}

function flattenContent(value) {
  if (Array.isArray(value)) return value.flatMap(flattenContent);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenContent);
  return [String(value)];
}

function runSearch(query) {
  state.searchQuery = query;
  const q = query.trim().toLowerCase();

  if (!q) {
    el.searchResults.innerHTML = "";
    return;
  }

  const results = getAllJtbd().filter(j => {
    const searchable = [
      j.number, j.title, j.summary,
      j.phase.title, j.subphase.title,
      ...Object.values(j.subphase.lanes).flatMap(flattenContent),
      ...(j.sections ? Object.values(j.sections).flatMap(flattenContent) : [])
    ].join(" ").toLowerCase();
    return searchable.includes(q);
  });

  if (!results.length) {
    el.searchResults.innerHTML = `<div class="search-empty">No matches. Try "brief", "planning", or "enablers".</div>`;
    return;
  }

  const grouped = {};
  results.forEach(r => {
    const key = `${r.phase.title} / ${r.subphase.title}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  el.searchResults.innerHTML = Object.entries(grouped).map(([group, items]) => `
    <div class="search-group-label">${esc(group)}</div>
    ${items.map(r => `
      <button class="search-result" type="button"
              data-search-phase="${r.phase.id}"
              data-search-subphase="${r.subphase.id}"
              data-search-jtbd="${r.id}">
        <strong>JTBD ${esc(r.number)} — ${esc(r.title)}</strong>
        <small>${esc(r.summary)}</small>
      </button>
    `).join("")}
  `).join("");
}

// ── Event Delegation ──
document.addEventListener("click", e => {
  const pageBtn = e.target.closest("[data-page]");
  const subphaseBtn = e.target.closest("[data-subphase]");
  const jtbdBtn = e.target.closest("[data-jtbd]");
  const enablerBtn = e.target.closest("[data-enabler]");
  const actionBtn = e.target.closest("[data-action]");
  const searchResult = e.target.closest("[data-search-jtbd]");

  if (actionBtn) {
    const action = actionBtn.dataset.action;
    if (action === "toggle-sidebar") toggleSidebar();
    if (action === "open-search") openSearch();
    if (action === "close-modal") closeModal();
    if (action === "close-enabler-modal") closeEnablerModal();
    if (action === "home") setPage("overview-all");
    if (action === "add-enabler") {
      const card = actionBtn.closest(".enabler-lane-card");
      if (!card) return;
      const today = new Date();
      const threeMonths = new Date(today);
      threeMonths.setMonth(threeMonths.getMonth() + 3);
      const toISO = d => d.toISOString().split("T")[0];
      const draftId = "draft-" + Date.now();
      card.classList.remove("enabler-lane-card--unlinked");
      card.classList.add("enabler-lane-card--draft");
      card.style.borderLeftColor = "var(--phase-accent)";
      card.innerHTML = `
        <div class="enabler-lane-card__top">
          <span class="tl-type-badge type-tool">tool</span>
          <span style="font-size:10px;font-weight:700;color:var(--green);margin-left:auto;">NEW</span>
        </div>
        <div class="enabler-lane-card__title">${esc(actionBtn.dataset.enablerName)}</div>
        <div class="enabler-lane-card__dates">
          <label><span>Expected completion</span><input type="date" id="${draftId}-end" value="${toISO(threeMonths)}" style="padding:4px 6px;border:1px solid var(--line);border-radius:var(--radius-sm);font-size:12px;font-family:inherit;background:var(--surface-solid);max-width:130px;"></label>
        </div>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="enabler-confirm-btn" type="button" data-action="confirm-enabler" data-draft-id="${draftId}" data-enabler-name="${esc(actionBtn.dataset.enablerName)}" data-enabler-phase="${actionBtn.dataset.enablerPhase}" data-enabler-subphase="${actionBtn.dataset.enablerSubphase}">Confirm</button>
          <button class="enabler-cancel-btn" type="button" data-action="cancel-enabler">Cancel</button>
        </div>
      `;
      return;
    }
    if (action === "confirm-enabler") {
      const draftId = actionBtn.dataset.draftId;
      const startInput = document.getElementById(draftId + "-start");
      const endInput = document.getElementById(draftId + "-end");
      const newId = "te-" + (timelineEnablers.length + 1) + "-" + Date.now();
      timelineEnablers.push({
        id: newId,
        title: actionBtn.dataset.enablerName,
        description: "",
        phaseId: actionBtn.dataset.enablerPhase,
        subphaseId: actionBtn.dataset.enablerSubphase,
        type: "tool",
        startDate: startInput ? startInput.value : new Date().toISOString().split("T")[0],
        endDate: endInput ? endInput.value : new Date().toISOString().split("T")[0]
      });
      renderContent();
      return;
    }
    if (action === "cancel-enabler") {
      renderContent();
      return;
    }
    if (action === "goto-phase") {
      if (state.activeEnablerId) closeEnablerModal();
      else closeModal();
      state.page = "phase";
      state.phaseId = actionBtn.dataset.phase;
      state.subphaseId = actionBtn.dataset.subphase;
      render();
    }
    return;
  }

  if (pageBtn) {
    const page = pageBtn.dataset.page;
    if (page === "phase" && pageBtn.dataset.phase) {
      if (pageBtn.dataset.subphase) {
        state.page = "phase";
        state.phaseId = pageBtn.dataset.phase;
        state.subphaseId = pageBtn.dataset.subphase;
        state.activeJtbdId = null;
        state.activeEnablerId = null;
        render();
      } else {
        setPhase(pageBtn.dataset.phase);
      }
    } else {
      setPage(page);
    }
    return;
  }

  if (subphaseBtn) {
    setSubphase(subphaseBtn.dataset.subphase);
    return;
  }

  if (jtbdBtn) {
    openModal(jtbdBtn.dataset.jtbd);
    return;
  }

  if (enablerBtn) {
    openEnablerModal(enablerBtn.dataset.enabler);
    return;
  }

  if (searchResult) {
    state.phaseId = searchResult.dataset.searchPhase;
    state.subphaseId = searchResult.dataset.searchSubphase;
    state.page = "phase";
    closeSearch();
    render();
    requestAnimationFrame(() => openModal(searchResult.dataset.searchJtbd));
    return;
  }
});

el.modalScrim.addEventListener("click", () => {
  if (state.activeEnablerId) closeEnablerModal();
  else closeModal();
});
el.searchScrim.addEventListener("click", closeSearch);
el.searchInput.addEventListener("input", e => runSearch(e.target.value));

document.addEventListener("change", e => {
  const input = e.target.closest(".enabler-date-input");
  if (!input) return;
  const enabler = timelineEnablers.find(en => en.id === input.dataset.enablerId);
  if (!enabler) return;
  enabler[input.dataset.enablerField] = input.value;
  if (state.page === "timeline") renderTimelinePage();
  if (state.page === "phase") renderContent();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (state.searchOpen) { closeSearch(); return; }
    if (state.activeEnablerId) { closeEnablerModal(); return; }
    if (state.activeJtbdId) { closeModal(); return; }
  }
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    if (state.searchOpen) closeSearch();
    else openSearch();
  }
});

// ── Init ──
render();

import {
  CONCERNS,
  CONSTRAINTS,
  LEVELS,
  SCENARIOS,
  addConstraint,
  analyzeConstraint,
  buildCrossLevelTrace,
  createEmptyProject,
  createProjectFromScenario,
  generateMarkdown,
  lintProject,
  lintTextForLevel,
  parseProjectJson,
  scoreProject,
  serializeProject,
  suggestNextLenses
} from "./framework.js";

const STORAGE_KEY = "designmodel:project:v1";

let project = loadProject();
let exportMode = "markdown";
let activeConstraintId = CONSTRAINTS[0].id;
let insightTimer = 0;

const refs = {
  scenarioList: document.querySelector("#scenarioList"),
  levelNav: document.querySelector("#levelNav"),
  workspace: document.querySelector("#workspace"),
  inspector: document.querySelector("#inspector"),
  projectName: document.querySelector("#projectName"),
  exportDialog: document.querySelector("#exportDialog"),
  exportText: document.querySelector("#exportText"),
  importDialog: document.querySelector("#importDialog"),
  importText: document.querySelector("#importText"),
  toast: document.querySelector("#toast")
};

renderAll();
bindEvents();

function bindEvents() {
  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    const levelTarget = event.target.closest("[data-level-target]");
    const scenarioTarget = event.target.closest("[data-scenario-id]");
    const lensTarget = event.target.closest("[data-focus-lens]");
    const exportModeTarget = event.target.closest("[data-export-mode]");
    const concernTarget = event.target.closest("[data-concern-id]");

    if (levelTarget) {
      project.activeLevelId = levelTarget.dataset.levelTarget;
      persist();
      renderAll();
      return;
    }

    if (scenarioTarget) {
      loadScenario(scenarioTarget.dataset.scenarioId);
      return;
    }

    if (lensTarget) {
      project.activeLevelId = lensTarget.dataset.focusLevel;
      persist();
      renderAll();
      const textarea = document.querySelector(
        `[data-level="${lensTarget.dataset.focusLevel}"][data-lens="${lensTarget.dataset.focusLens}"]`
      );
      textarea?.focus();
      return;
    }

    if (exportModeTarget) {
      exportMode = exportModeTarget.dataset.exportMode;
      renderExportDialog();
      return;
    }

    if (concernTarget) {
      project.selectedConcernId = concernTarget.dataset.concernId;
      persist();
      renderInspector();
      return;
    }

    if (!actionTarget) {
      return;
    }

    handleAction(actionTarget.dataset.action);
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("#projectName")) {
      project.name = event.target.value || "Untitled design";
      persist();
      scheduleInsightRender();
      return;
    }

    if (event.target.matches("textarea[data-level][data-lens]")) {
      const { level, lens } = event.target.dataset;
      project.answers[level][lens] = event.target.value;
      persist();
      updateLensFeedback(level, lens);
      scheduleInsightRender();
      return;
    }

    if (event.target.matches("#constraintSelect")) {
      activeConstraintId = event.target.value;
      renderConstraintPreview();
    }
  });
}

function handleAction(action) {
  switch (action) {
    case "new-blank":
      if (confirmReplace()) {
        project = createEmptyProject("Untitled design");
        persist();
        renderAll();
        showToast("Blank design created.");
      }
      break;
    case "open-export":
      renderExportDialog();
      refs.exportDialog.showModal();
      break;
    case "copy-export":
      copyExport();
      break;
    case "download-export":
      downloadExport();
      break;
    case "open-import":
      refs.importText.value = "";
      refs.importDialog.showModal();
      break;
    case "close-import":
      refs.importDialog.close();
      break;
    case "import-json":
      importJson();
      break;
    case "apply-constraint":
      project = addConstraint(project, activeConstraintId);
      project.activeLevelId = analyzeConstraint(activeConstraintId).firstLevel;
      persist();
      renderAll();
      showToast("Constraint injected.");
      break;
    default:
      break;
  }
}

function renderAll() {
  refs.projectName.value = project.name;
  renderScenarios();
  renderLevels();
  renderWorkspace();
  renderInspector();
}

function renderScenarios() {
  refs.scenarioList.innerHTML = SCENARIOS.map((scenario) => {
    const active = scenario.id === project.scenarioId ? " is-active" : "";
    return `
      <button type="button" class="scenario-button${active}" data-scenario-id="${escapeHtml(scenario.id)}">
        <strong>${escapeHtml(scenario.title)}</strong>
        <span>${escapeHtml(scenario.tagline)}</span>
      </button>
    `;
  }).join("");
}

function renderLevels() {
  const score = scoreProject(project);

  refs.levelNav.innerHTML = LEVELS.map((level) => {
    const levelScore = score.levelScores.find((item) => item.levelId === level.id);
    const active = level.id === project.activeLevelId ? " is-active" : "";
    return `
      <button type="button" class="level-button${active}" data-level-target="${level.id}">
        <span class="level-number" style="--level-color: ${level.color}">L${level.number}</span>
        <span class="level-copy">
          <strong>${escapeHtml(level.shortName)}</strong>
          <span>${levelScore.completed}/${levelScore.total} lenses</span>
        </span>
        <span class="mini-bar" aria-hidden="true">
          <span style="width: ${levelScore.ratio * 100}%"></span>
        </span>
      </button>
    `;
  }).join("");
}

function renderWorkspace() {
  const activeLevel = LEVELS.find((level) => level.id === project.activeLevelId) ?? LEVELS[0];

  refs.workspace.innerHTML = `
    <div class="level-header" style="--level-color: ${activeLevel.color}">
      <div>
        <span class="eyebrow">L${activeLevel.number} ${escapeHtml(activeLevel.shortName)}</span>
        <h1>${escapeHtml(activeLevel.title)}</h1>
        <p>${escapeHtml(activeLevel.centralQuestion)}</p>
      </div>
      <div class="boundary-box">
        <span>Boundary</span>
        <strong>${escapeHtml(activeLevel.boundary)}</strong>
      </div>
    </div>

    ${renderModelMap()}

    <div class="lens-grid">
      ${activeLevel.lenses.map((lens, index) => renderLensCard(activeLevel, lens, index)).join("")}
    </div>
  `;
}

function renderModelMap() {
  const score = scoreProject(project);
  const activeIndex = LEVELS.findIndex((level) => level.id === project.activeLevelId);
  const points = LEVELS.map((level, index) => {
    const x = 56 + index * 114;
    const y = 58 + Math.sin(index / 1.4) * 12;
    const levelScore = score.levelScores.find((item) => item.levelId === level.id);
    const radius = 19 + Math.round(levelScore.ratio * 9);
    return { level, x, y, radius, score: levelScore };
  });

  const lines = points
    .slice(0, -1)
    .map((point, index) => {
      const next = points[index + 1];
      return `<line x1="${point.x + point.radius}" y1="${point.y}" x2="${next.x - next.radius}" y2="${next.y}" />`;
    })
    .join("");

  const nodes = points
    .map((point, index) => {
      const active = index === activeIndex;
      return `
        <g class="${active ? "is-active" : ""}" role="listitem">
          <circle cx="${point.x}" cy="${point.y}" r="${point.radius}" fill="${point.level.color}" />
          <text x="${point.x}" y="${point.y + 5}" text-anchor="middle">L${point.level.number}</text>
          <text class="map-label" x="${point.x}" y="115" text-anchor="middle">${escapeHtml(point.level.shortName)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <section class="map-panel" aria-label="Abstraction map">
      <svg viewBox="0 0 680 140" role="img" aria-labelledby="mapTitle mapDesc">
        <title id="mapTitle">Six-level design map</title>
        <desc id="mapDesc">Level nodes grow as lenses are completed.</desc>
        <g class="map-lines">${lines}</g>
        <g class="map-nodes" role="list">${nodes}</g>
      </svg>
    </section>
  `;
}

function renderLensCard(level, lens, index) {
  const value = project.answers?.[level.id]?.[lens.id] ?? "";
  const filled = value.trim().length >= 12 ? " is-filled" : "";
  const findings = lintTextForLevel(level.id, value);

  return `
    <article class="lens-card${filled}" data-lens-card="${escapeHtml(lens.id)}">
      <div class="lens-top">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <label for="${level.id}-${lens.id}">${escapeHtml(lens.title)}</label>
      </div>
      <p>${escapeHtml(lens.question)}</p>
      <textarea
        id="${level.id}-${lens.id}"
        data-level="${level.id}"
        data-lens="${lens.id}"
        placeholder="${escapeHtml(lens.placeholder)}"
      >${escapeHtml(value)}</textarea>
      <div class="lens-feedback">
        ${renderFindings(findings)}
      </div>
    </article>
  `;
}

function renderInspector() {
  const score = scoreProject(project);
  const findings = lintProject(project);
  const trace = buildCrossLevelTrace(project, project.selectedConcernId);
  const suggestions = suggestNextLenses(project, 4);

  refs.inspector.innerHTML = `
    <section class="panel score-panel">
      <div class="score-ring" style="--score: ${score.overall}">
        <strong>${score.overall}</strong>
        <span>health</span>
      </div>
      <div class="score-copy">
        <h2>Design Health</h2>
        <p>${score.totalCompleted}/${score.totalLenses} lenses complete</p>
        <p>${score.totalFindings} boundary flags</p>
      </div>
    </section>

    <section class="panel" id="constraintPanel">
      <div class="panel-heading">
        <h2>Failure Loop</h2>
      </div>
      <select id="constraintSelect" aria-label="Constraint">
        ${CONSTRAINTS.map(
          (constraint) =>
            `<option value="${constraint.id}" ${constraint.id === activeConstraintId ? "selected" : ""}>${escapeHtml(constraint.title)}</option>`
        ).join("")}
      </select>
      <div id="constraintPreview"></div>
      <button type="button" class="primary full" data-action="apply-constraint">Inject Constraint</button>
      ${renderConstraintLog()}
    </section>

    <section class="panel">
      <div class="panel-heading">
        <h2>Trace</h2>
      </div>
      <div class="concern-tabs" role="tablist" aria-label="Trace concern">
        ${CONCERNS.map(
          (concern) =>
            `<button type="button" data-concern-id="${concern.id}" class="${concern.id === project.selectedConcernId ? "is-active" : ""}">${escapeHtml(concern.title)}</button>`
        ).join("")}
      </div>
      <div class="trace-list">
        ${trace.map(renderTraceItem).join("")}
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <h2>Boundary Flags</h2>
      </div>
      ${renderBoundaryFindings(findings)}
    </section>

    <section class="panel">
      <div class="panel-heading">
        <h2>Next Lenses</h2>
      </div>
      <div class="suggestion-list">
        ${suggestions.map(renderSuggestion).join("") || "<p class=\"empty-state\">All lenses have starter notes.</p>"}
      </div>
    </section>
  `;

  renderConstraintPreview();
}

function renderConstraintPreview() {
  const target = document.querySelector("#constraintPreview");
  if (!target) {
    return;
  }

  const impact = analyzeConstraint(activeConstraintId);
  target.innerHTML = `
    <div class="impact-card">
      <span>First affected</span>
      <strong>${escapeHtml(impact.firstLevelLabel)}</strong>
      <p>${escapeHtml(impact.prompt)}</p>
    </div>
    <div class="impact-levels">
      ${impact.affected
        .map(
          (item) => `
          <details>
            <summary>${escapeHtml(item.label)}</summary>
            <p>${escapeHtml(item.lenses.join(", "))}</p>
          </details>
        `
        )
        .join("")}
    </div>
  `;
}

function renderTraceItem(item) {
  return `
    <div class="trace-item">
      <span>${escapeHtml(item.label)}</span>
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        ${
          item.snippets.length
            ? item.snippets
                .map(
                  (snippet) =>
                    `<p><b>${escapeHtml(snippet.title)}:</b> ${escapeHtml(snippet.text)}</p>`
                )
                .join("")
            : `<p class="empty-state">${escapeHtml(item.emptyPrompt)}</p>`
        }
      </div>
    </div>
  `;
}

function renderBoundaryFindings(findings) {
  if (!findings.length) {
    return "<p class=\"empty-state\">No boundary leakage detected.</p>";
  }

  return `
    <div class="finding-list">
      ${findings
        .slice(0, 10)
        .map((finding) => {
          const level = LEVELS.find((item) => item.id === finding.levelId);
          return `
            <button type="button" data-focus-level="${finding.levelId}" data-focus-lens="${finding.lensId}" data-focus-lens-button="true" class="finding">
              <span>${escapeHtml(`L${level.number}`)}</span>
              <strong>${escapeHtml(finding.term)}</strong>
              <small>${escapeHtml(finding.lensTitle)}</small>
            </button>
          `;
        })
        .join("")}
      ${findings.length > 10 ? `<p class="empty-state">${findings.length - 10} more flags hidden.</p>` : ""}
    </div>
  `;
}

function renderSuggestion(suggestion) {
  const level = LEVELS.find((item) => item.id === suggestion.levelId);
  return `
    <button type="button" class="suggestion" data-focus-level="${suggestion.levelId}" data-focus-lens="${suggestion.lensId}">
      <span>L${level.number}</span>
      <strong>${escapeHtml(suggestion.title)}</strong>
      <small>${escapeHtml(suggestion.question)}</small>
    </button>
  `;
}

function renderFindings(findings) {
  if (!findings.length) {
    return "<span class=\"ok\">Within boundary</span>";
  }

  return findings
    .map((finding) => `<span class="flag">${escapeHtml(finding.term)}</span>`)
    .join("");
}

function renderConstraintLog() {
  if (!project.constraints?.length) {
    return "<p class=\"empty-state compact\">No constraints injected yet.</p>";
  }

  return `
    <ol class="constraint-log">
      ${project.constraints
        .slice(0, 5)
        .map((item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${formatDate(item.appliedAt)}</span></li>`)
        .join("")}
    </ol>
  `;
}

function renderExportDialog() {
  refs.exportText.value = exportMode === "markdown" ? generateMarkdown(project) : serializeProject(project);
  document.querySelectorAll("[data-export-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.exportMode === exportMode);
  });
}

function loadScenario(scenarioId) {
  if (!confirmReplace()) {
    return;
  }

  project = createProjectFromScenario(scenarioId);
  persist();
  renderAll();
  showToast("Scenario loaded.");
}

function confirmReplace() {
  return window.confirm("Replace the current local design?");
}

function persist() {
  project.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, serializeProject(project));
}

function loadProject() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return parseProjectJson(raw);
    } catch (error) {
      console.warn("Could not load saved design", error);
    }
  }

  return createProjectFromScenario("reservation");
}

function scheduleInsightRender() {
  window.clearTimeout(insightTimer);
  insightTimer = window.setTimeout(() => {
    renderLevels();
    renderInspector();
  }, 180);
}

function updateLensFeedback(levelId, lensId) {
  const card = document.querySelector(`[data-lens-card="${lensId}"]`);
  const textarea = document.querySelector(`[data-level="${levelId}"][data-lens="${lensId}"]`);
  if (!card || !textarea) {
    return;
  }

  card.classList.toggle("is-filled", textarea.value.trim().length >= 12);
  card.querySelector(".lens-feedback").innerHTML = renderFindings(
    lintTextForLevel(levelId, textarea.value)
  );
}

async function copyExport() {
  renderExportDialog();
  try {
    await navigator.clipboard.writeText(refs.exportText.value);
    showToast("Export copied.");
  } catch {
    refs.exportText.select();
    document.execCommand("copy");
    showToast("Export copied.");
  }
}

function downloadExport() {
  renderExportDialog();
  const extension = exportMode === "markdown" ? "md" : "json";
  const mime = exportMode === "markdown" ? "text/markdown" : "application/json";
  const blob = new Blob([refs.exportText.value], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slugify(project.name)}.${extension}`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importJson() {
  try {
    project = parseProjectJson(refs.importText.value);
    persist();
    refs.importDialog.close();
    renderAll();
    showToast("Design imported.");
  } catch (error) {
    showToast(error.message || "Import failed.");
  }
}

function showToast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("is-visible");
  window.setTimeout(() => refs.toast.classList.remove("is-visible"), 2200);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

function slugify(value) {
  return String(value || "designmodel")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64) || "designmodel";
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}

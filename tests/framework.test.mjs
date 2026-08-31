import test from "node:test";
import assert from "node:assert/strict";
import {
  LEVELS,
  SCENARIOS,
  addConstraint,
  analyzeConstraint,
  buildCrossLevelTrace,
  createEmptyProject,
  createProjectFromScenario,
  generateMarkdown,
  lintTextForLevel,
  parseProjectJson,
  scoreProject,
  serializeProject,
  suggestNextLenses
} from "../src/framework.js";

test("framework contains all six abstraction levels with synthesis lenses", () => {
  assert.equal(LEVELS.length, 6);
  for (const level of LEVELS) {
    assert.ok(level.lenses.length > 0);
    assert.ok(level.lenses.some((lens) => lens.id === "synthesis"));
  }
});

test("scenario templates seed useful project content", () => {
  for (const scenario of SCENARIOS) {
    const project = createProjectFromScenario(scenario.id);
    const score = scoreProject(project);
    assert.equal(project.name, scenario.title);
    assert.ok(score.totalCompleted >= 8, `${scenario.id} should fill starter lenses`);
  }
});

test("boundary linter flags lower-level leakage", () => {
  const findings = lintTextForLevel("l1", "Use Postgres, Redis, and a queue.");
  assert.ok(findings.some((finding) => finding.term === "postgres"));
  assert.ok(findings.some((finding) => finding.term === "queue"));
});

test("cross-level trace returns every level and populated snippets", () => {
  const project = createProjectFromScenario("reservation");
  const trace = buildCrossLevelTrace(project, "correctness");
  assert.equal(trace.length, 6);
  assert.ok(trace[0].snippets.length > 0);
});

test("constraint analysis maps affected lens titles", () => {
  const impact = analyzeConstraint("lost-ack");
  assert.equal(impact.firstLevelLabel, "L3 Distributed");
  assert.ok(impact.affected.some((item) => item.lenses.includes("Delivery Semantics Between Executors")));
});

test("constraint log is immutable and bounded", () => {
  const project = createEmptyProject();
  const updated = addConstraint(project, "traffic-spike");
  assert.equal(project.constraints.length, 0);
  assert.equal(updated.constraints.length, 1);
  assert.equal(updated.constraints[0].title, "Traffic jumps 5x in one hour");
});

test("project export and import preserve answers", () => {
  const project = createProjectFromScenario("analytics");
  const parsed = parseProjectJson(serializeProject(project));
  assert.equal(parsed.answers.l1.actions, project.answers.l1.actions);
  assert.equal(parsed.activeLevelId, "l1");
});

test("markdown export includes named levels and project health", () => {
  const project = createProjectFromScenario("file-processing");
  const markdown = generateMarkdown(project);
  assert.match(markdown, /^# File Processing Pipeline/);
  assert.match(markdown, /## L1 - External \/ System Requirements/);
  assert.match(markdown, /Design health:/);
});

test("next-lens suggestions focus on incomplete areas", () => {
  const project = createEmptyProject("Blank");
  const suggestions = suggestNextLenses(project, 3);
  assert.equal(suggestions.length, 3);
  assert.equal(suggestions[0].levelId, "l1");
});

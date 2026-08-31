import { cp, mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { LEVELS, SCENARIOS, scoreProject, createProjectFromScenario } from "../src/framework.js";

const root = process.cwd();
const dist = join(root, "dist");

await validateFramework();

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "index.html"), join(dist, "index.html"));
await cp(join(root, "src"), join(dist, "src"), { recursive: true });
await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });

const builtIndex = await stat(join(dist, "index.html"));
if (!builtIndex.isFile()) {
  throw new Error("Build failed: dist/index.html was not created.");
}

console.log("Build complete: dist/");

async function validateFramework() {
  if (LEVELS.length !== 6) {
    throw new Error(`Expected 6 levels, found ${LEVELS.length}.`);
  }

  for (const level of LEVELS) {
    const ids = new Set(level.lenses.map((lens) => lens.id));
    if (ids.size !== level.lenses.length) {
      throw new Error(`Duplicate lens IDs in ${level.id}.`);
    }
    if (!level.lenses.some((lens) => lens.id === "synthesis")) {
      throw new Error(`Missing synthesis lens in ${level.id}.`);
    }
  }

  for (const scenario of SCENARIOS) {
    const project = createProjectFromScenario(scenario.id);
    const score = scoreProject(project);
    if (score.totalCompleted === 0) {
      throw new Error(`Scenario ${scenario.id} does not seed any answers.`);
    }
  }
}

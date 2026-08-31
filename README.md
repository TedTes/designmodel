# designmodel

designmodel is a local-first system design playground based on the six-level abstraction model from the attached framework document. The document was used as product/specification input only; the application treats the user request as the active instruction.

## What It Does

- Walk a design horizontally through L1-L6 before descending into implementation detail.
- Seed a project from realistic scenarios: reservations, messaging, file processing, and analytics.
- Edit every lens in the framework with local persistence in the browser.
- Flag abstraction-boundary leaks, such as naming databases in L1/L2.
- Trace concerns like correctness, scale, latency, failure, and security across all levels.
- Inject constraints and failures to see which lenses should be revisited first.
- Export the model as Markdown or JSON, then import JSON later.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:4173`.

No npm packages are required for runtime or tests. The project uses browser-native JavaScript modules and Node's built-in test runner.

## Validate

```bash
npm run check
```

This runs the unit tests and builds a static copy into `dist/`.

## Project Structure

- `index.html` - static app entry point.
- `src/framework.js` - framework definitions, scenario seeds, linting, scoring, tracing, import/export logic.
- `src/app.js` - browser UI and local persistence.
- `src/styles.css` - responsive tool interface.
- `tests/framework.test.mjs` - model and export tests.
- `scripts/build.mjs` - dependency-free static build validator.

## Improvement Ideas Already Included

- Boundary linting to keep each level honest.
- Failure injection loop for iterative design refinement.
- Cross-level concern traces so one guarantee can be followed from external behavior to runtime mechanics.
- Scenario starters that make the playground useful immediately without requiring account setup.
- JSON portability for sharing and revisiting designs.

/**
 * Refuses a test run that would read the emitted JavaScript instead of the
 * source, and names the files that would have been read.
 *
 * 0009 §6 fixes that `bun test` runs the source and the browser runs the
 * output. That holds only until somebody builds the page: §5 makes every
 * import name the emitted file, so `./world.js` resolves to `world.ts` before
 * a build and to `world.js` after one. Nothing chooses which — the file system
 * does, and the only tell is one character per row in the coverage table. A
 * source file edited without a rebuild then leaves the suite exercising code
 * the source no longer has, which is a stale document in the one place this
 * project trusts a command.
 *
 * #190 decided (a): the run refuses. **A script and not a test**, because
 * 0018 §5 forbids a test under `tests/` from reading a path ending in `.js`,
 * and such a path is this check's whole subject.
 *
 * Nothing in this repository is committed as `.js` — 0009 R1, and
 * `.gitignore`'s four patterns — so every file found here is output, including
 * one orphaned by a source file that has since been deleted.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CONFIG = "tsconfig.json";

/**
 * Reads the directories to scan out of the compiler's own `include`.
 *
 * A second list of directory names here would be a second authority for a fact
 * `tsconfig.json` already holds, and 0018 §3 is why `tests` is in that one.
 *
 * @param include The `include` array as it stands in the configuration.
 * @returns The directory names to scan, in the order they are declared.
 */
function directoriesToScan(include) {
  if (!Array.isArray(include) || include.length === 0) {
    throw new Error(`${CONFIG}: "include" is missing or empty`);
  }
  for (const entry of include) {
    /*
     * A glob, or a name that is not a directory, would make this scan quietly
     * narrower than the compiler's program — and a check that silently covers
     * less than it claims is the shape of failure #190 exists about. So an
     * entry this cannot read stops the run instead of being skipped.
     */
    if (!/^[\w.-]+$/.test(entry) || !statSync(entry).isDirectory()) {
      throw new Error(
        `${CONFIG}: "include" entry ${JSON.stringify(entry)} is not a plain ` +
          "directory name, so this check cannot tell what it would scan",
      );
    }
  }
  return include;
}

/**
 * Collects every emitted file under one directory, at any depth.
 *
 * @param directory The directory to walk.
 * @returns Paths of the `.js` files found, relative to the repository root.
 */
function emittedUnder(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...emittedUnder(path));
    } else if (entry.name.endsWith(".js")) {
      found.push(path);
    }
  }
  return found;
}

const { include } = JSON.parse(readFileSync(CONFIG, "utf8"));
const emitted = directoriesToScan(include).flatMap(emittedUnder).sort();

if (emitted.length > 0) {
  console.error("check:test did not run.");
  console.error("");
  console.error(
    `${emitted.length} emitted file(s) sit beside the source, so the suite`,
  );
  console.error("would load these instead of the TypeScript:");
  console.error("");
  for (const path of emitted) {
    console.error(`  ${path}`);
  }
  console.error("");
  console.error("Delete them and run again. An import names the emitted file");
  console.error("(0009 §5), nothing here is committed as `.js` (0009 R1), and");
  console.error("a build is what looking at the page needs (0012 §5) — so");
  console.error("meeting this after a watch is the cost #190 chose.");
  process.exit(1);
}

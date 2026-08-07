/**
 * The Core names none of 0002 §3's fifteen, asserted by reading `core/` as
 * text. That is the command 0010 §4 names — the record states the list is a
 * list rather than a principle so that something can decide it — and
 * [#92](https://github.com/nanatsusaya/dot-panic/issues/92) is where it was
 * owed.
 *
 * It sits in `tests/` and not beside its subject because its own text has to
 * carry all fifteen: they are what it searches for, so under `core/` it would
 * find itself. 0018 §1 splits a test by what it reads, and §6 is why the
 * placement is the whole mechanism — no exclusion rule, no fixture directory,
 * nothing that can later be forgotten or mis-scoped.
 */

import { describe, expect, test } from "bun:test";

/**
 * The fifteen, in 0002 §3's order.
 *
 * Nothing is added here. A sixteenth name is a change to that record, and a
 * list that grew in a test file would be a second authority for what the Core
 * may not touch.
 */
const FORBIDDEN = [
  "window",
  "document",
  "navigator",
  "screen",
  "location",
  "requestAnimationFrame",
  "performance",
  "Date",
  "Math.random",
  "setTimeout",
  "setInterval",
  "fetch",
  "localStorage",
  "sessionStorage",
  "console",
] as const;

/*
 * A token and not a substring. `core/step.ts` says *the allocation it costs on
 * every frame*, and `allocation` carries one of the fifteen inside it — so a
 * plain substring match reddens on ordinary English, and the repair a session
 * would reach for is rewording correct prose.
 *
 * `Math.random` is the one two-part name and is matched whole, because
 * `random` alone is not on the list. The Core has a seeded generator by 0002
 * §4, so `core/random.ts`, `randomFromSeed` and the world's own field all
 * carry the word for the reason that record gives.
 */
const PATTERNS = FORBIDDEN.map((name) => ({
  name,
  pattern: new RegExp(`\\b${name.replaceAll(".", "\\.")}\\b`),
}));

// Resolved from this file rather than from the working directory, so what gets
// read does not depend on where `bun test` was started.
const CORE = `${import.meta.dir}/../core`;

/**
 * Read every TypeScript file under `core/` and collect what the fifteen match.
 *
 * @returns the files read, and one entry per match naming the file, the line
 *          and the name — the files so that a scan over nothing cannot pass
 *          for a clean Core
 */
async function scan(): Promise<{ files: string[]; found: string[] }> {
  const files = [...new Bun.Glob("**/*.ts").scanSync({ cwd: CORE })]
    .map((path) => path.replaceAll("\\", "/"))
    .sort();

  const found: string[] = [];

  for (const file of files) {
    const text = await Bun.file(`${CORE}/${file}`).text();

    for (const [index, line] of text.split("\n").entries()) {
      for (const { name, pattern } of PATTERNS) {
        if (pattern.test(line)) {
          found.push(`core/${file}:${index + 1} names \`${name}\``);
        }
      }
    }
  }

  return { files, found };
}

/*
 * What a text search cannot catch, written down because 0010 §4 asks for it
 * rather than left to be discovered by someone trusting a green run:
 *
 * - A name reached indirectly. A property read by a computed key, or an object
 *   handed in as an argument and used under another name, is not here to be
 *   found. 0010 §4 says so in its own words and this test does not improve on
 *   it.
 * - A different case. The fifteen are identifiers and JavaScript is
 *   case-sensitive, so this is too. Prose capitalizing one at the start of a
 *   sentence passes, and a variable spelled that way passes as well — it is
 *   not the global either.
 * - Anything outside `core/`. The Shell names several of the fifteen and is
 *   supposed to; 0002 §3 is a rule about one part, not about the repository.
 * - The emitted JavaScript. Only `.ts` is read, which is 0018 §5 — after a
 *   build `core/` holds a `.js` beside each source file, and a claim about a
 *   file that exists only sometimes is not a claim about this repository.
 *
 * What it does catch is the case that occurs: someone reaches for one of them
 * while writing Core code — in code or in a comment, since a comment naming a
 * forbidden API is the same reach made in prose first — and the run says so at
 * the moment of the reach.
 */
describe("the Core's purity", () => {
  test("no file under core/ names one of the fifteen", async () => {
    const { found } = await scan();

    expect(found).toEqual([]);
  });

  // A scan that reads nothing reports nothing, and would go on reporting
  // nothing if the directory moved. #92 could not be worked until `core/` held
  // something for the same reason.
  test("the scan reads the Core rather than nothing", async () => {
    const { files } = await scan();

    expect(files.length).toBeGreaterThan(0);
  });

  // Deleting an entry above would silence a name without failing anything
  // else here, which is the one way this test can be weakened by accident.
  test("the list is 0002 §3's fifteen", () => {
    expect(FORBIDDEN).toHaveLength(15);
  });
});

/**
 * Every exported symbol under 0002 §7's three parts carries a doc block, and
 * every exported function documents each of its parameters.
 *
 * CLAUDE.md's *What the code says about itself* is the convention and nothing
 * here restates it; what this file holds is the part a command can decide.
 * [#177](https://github.com/nanatsusaya/dot-panic/issues/177) wrote the
 * convention down with nothing behind it, and
 * [#178](https://github.com/nanatsusaya/dot-panic/issues/178) is where that was
 * owed. The shape follows `grimora`'s own conformance test, which is where the
 * convention came from — 0013 §7's habit of naming what was consulted, rather
 * than its rule, since that record is about the Core and this is a test.
 *
 * **Presence, never quality.** Whether a why is a why is review's, and a green
 * run here says a block is in place and nothing whatever about what it says.
 * That split is CLAUDE.md's own, and it names this file as the half a command
 * holds — the sentence there used to say no command decided any of it, and the
 * change that added this one is what made that stop being true.
 *
 * It is 0010 §2's third kind of claim, a fact about the text of the repository,
 * so no record has to permit it. It reads source and never the emitted tree
 * (0018 §5): after a build each of these directories holds a `.js` beside every
 * `.ts`, and a claim about a file that exists only sometimes is not a claim
 * about this repository.
 */

import { describe, expect, test } from "bun:test";

const ROOT = `${import.meta.dir}/..`;

/**
 * The directories read: 0002 §7's three parts.
 *
 * **`tests/` is left out for the reason 0018 §6 gives**, and not because the
 * convention stops at the source. This file's subject is a text pattern, so
 * reading the directory it lives in would have it find itself — the same
 * mechanism that puts the purity test in `tests/` rather than under `core/`,
 * arriving from the other side. Placement is the whole of it: no exclusion
 * rule, nothing to forget.
 */
const PARTS = ["core", "shell", "view"] as const;

/**
 * What a declaration keyword can introduce, in the order a line carries them.
 *
 * `interface`, `class` and `enum` are here although this project uses none of
 * them today. A scan that knew only the three forms in the tree would go quiet
 * the first time somebody wrote a fourth, which is the failure this whole file
 * exists to prevent one level down.
 */
const KEYWORDS = [
  "function",
  "const",
  "let",
  "var",
  "type",
  "interface",
  "class",
  "enum",
] as const;

/**
 * One exported declaration, as far as reading the text can tell.
 */
type Exported = {
  /** `core/world.ts:100` — so a failure names the file and the symbol (0010 §4). */
  readonly where: string;
  readonly name: string;
  /** Empty for anything this scan does not read as taking parameters. */
  readonly parameters: readonly string[];
  /** The JSDoc block immediately above, or empty when there is none. */
  readonly block: readonly string[];
};

/**
 * Which lines begin outside a block comment.
 *
 * A line starting with the word this scan looks for, written at column 0 inside
 * a `/* … *\/` block, would otherwise read as a declaration — and the repair a
 * session would reach for is rewording correct prose. That is the trap the
 * purity test records, met here from the other direction.
 *
 * @param text  the whole file
 * @returns one entry per line, true where that line starts in ordinary code
 */
function codeLines(text: string): boolean[] {
  const starts: boolean[] = [];
  let inComment = false;
  let index = 0;

  for (const line of text.split("\n")) {
    starts.push(!inComment);

    while (index < line.length) {
      if (!inComment && line.startsWith("/*", index)) {
        inComment = true;
        index += 2;
      } else if (inComment && line.startsWith("*/", index)) {
        inComment = false;
        index += 2;
      } else if (!inComment && line.startsWith("//", index)) {
        break;
      } else {
        index += 1;
      }
    }

    index = 0;
  }

  return starts;
}

/**
 * Read the JSDoc block that ends on the line above a declaration.
 *
 * @param lines  the file's lines
 * @param at     the line the declaration starts on
 * @returns the block's lines in order, or empty when the line above does not
 *          end one that opened with the JSDoc marker
 */
function blockAbove(lines: string[], at: number): string[] {
  const above = at === 0 ? "" : (lines[at - 1]?.trim() ?? "");

  /*
   * A one-line block comes back as one line rather than as nothing. Reporting
   * it as absent would name the wrong defect — and it would leave the one-line
   * assertion below unable to fail at all, which is the shape a green run
   * cannot be told from a working guard.
   */
  if (above.startsWith("/**") && above.endsWith("*/")) {
    return [above];
  }

  if (above !== "*/") {
    return [];
  }

  for (let start = at - 2; start >= 0; start -= 1) {
    const line = lines[start]?.trim() ?? "";

    if (line.startsWith("/**")) {
      return lines.slice(start, at);
    }

    if (!line.startsWith("*")) {
      return [];
    }
  }

  return [];
}

/**
 * Take the names of the parameters in the group that starts at the first
 * parenthesis at or after an offset.
 *
 * @param text  the file from the declaration onward
 * @returns one name per parameter, in order. A destructured parameter carries
 *          no name and is left out — see the limitations below
 */
function parameterNames(text: string): string[] {
  const opening = text.indexOf("(");

  if (opening === -1) {
    return [];
  }

  const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  const segments: string[] = [];
  let current = "";

  for (let at = opening; at < text.length; at += 1) {
    const character = text[at] ?? "";
    const closing = pairs[character];

    if (closing !== undefined) {
      stack.push(closing);

      if (stack.length === 1) {
        continue;
      }
    } else if (character === stack.at(-1)) {
      stack.pop();

      if (stack.length === 0) {
        segments.push(current);
        break;
      }
    } else if (character === "," && stack.length === 1) {
      segments.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  return segments
    .map((segment) =>
      /^\s*(?:readonly\s+)?(?:\.\.\.)?([A-Za-z_$][\w$]*)/.exec(segment),
    )
    .map((match) => match?.[1] ?? "")
    .filter((name) => name !== "");
}

/**
 * Every exported declaration under the three parts, and what it carries.
 *
 * @returns the files read, the declarations found, and every line that begins
 *          an export this scan could not name — the files so that a scan over
 *          nothing cannot pass for a documented tree
 */
async function scan(): Promise<{
  files: string[];
  exported: Exported[];
  unnamed: string[];
}> {
  const files: string[] = [];
  const exported: Exported[] = [];
  const unnamed: string[] = [];
  const declaration = new RegExp(
    `^export\\s+(?:declare\\s+)?(?:async\\s+)?(?:${KEYWORDS.join("|")})\\s+([A-Za-z_$][\\w$]*)`,
  );

  for (const part of PARTS) {
    const found = [
      ...new Bun.Glob("**/*.ts").scanSync({ cwd: `${ROOT}/${part}` }),
    ]
      .map((path) => path.replaceAll("\\", "/"))
      .sort();

    for (const file of found) {
      const path = `${part}/${file}`;
      const text = await Bun.file(`${ROOT}/${path}`).text();
      const lines = text.split("\n");
      const code = codeLines(text);

      files.push(path);

      for (const [index, line] of lines.entries()) {
        if (!(code[index] ?? false) || !/^export\b/.test(line)) {
          continue;
        }

        // A re-export names nothing new; the symbol is documented where it was
        // declared, and requiring a block here would ask for it twice.
        if (/^export\s+(?:type\s+)?[{*]/.test(line)) {
          continue;
        }

        const name = declaration.exec(line)?.[1];
        const where = `${path}:${index + 1}`;

        if (name === undefined) {
          unnamed.push(`${where} ${line.trim()}`);
          continue;
        }

        const rest = lines.slice(index).join("\n");
        const takesParameters =
          /^export\s+(?:declare\s+)?(?:async\s+)?function\b/.test(line) ||
          /=\s*(?:async\s*)?(?:\(|function\b)/.test(rest.split("\n")[0] ?? "");

        exported.push({
          where,
          name,
          parameters: takesParameters ? parameterNames(rest) : [],
          block: blockAbove(lines, index),
        });
      }
    }
  }

  return { files, exported, unnamed };
}

/*
 * What reading the text cannot decide, written down because 0010 §4 asks for it
 * rather than left for somebody trusting a green run to discover:
 *
 * - **Whether the block says anything.** An empty `/** *\/` spanning two lines
 *   passes. Presence is the claim, and CLAUDE.md leaves the rest to review.
 * - **A destructured parameter.** `({ count }: Options)` carries no name a
 *   `@param` could match, so it is left out rather than failed: the repair for
 *   a false alarm would be rewriting correct code to satisfy a documentation
 *   test. This project has none today; `createWorld` takes a named `options`.
 * - **A function reached some other way** — assigned inside an object, returned
 *   by a factory, exported after being declared elsewhere. Only a `function`
 *   declaration and a `const` holding an arrow or a function expression are
 *   read as taking parameters.
 * - **A string containing the comment markers.** The comment scan reads text
 *   and not tokens, so `"/*"` inside a string literal would shift what it
 *   thinks is code. Nothing in these three directories does that.
 *
 * What it does catch is the case that occurs: somebody adds an export and the
 * block does not arrive with it, or a parameter is added to a function whose
 * header is left as it was.
 */
describe("the documentation convention, as far as a command decides it", () => {
  test("every exported symbol carries a doc block", async () => {
    const { exported } = await scan();

    expect(
      exported
        .filter((symbol) => symbol.block.length === 0)
        .map((symbol) => `${symbol.where} ${symbol.name} has no doc block`),
    ).toEqual([]);
  });

  /*
   * CLAUDE.md asks for the multi-line form by name and rejects the one-line
   * `/** … *\/` for an exported symbol, so a scan that accepted it would pass
   * the exact shape the convention was written to exclude. A property of a type
   * may be one line, and none of those is read here: a property is indented and
   * this reads only what starts at column 0.
   */
  test("a doc block is the multi-line form", async () => {
    const { exported } = await scan();

    expect(
      exported
        .filter((symbol) => symbol.block.length === 1)
        .map((symbol) => `${symbol.where} ${symbol.name} has a one-line block`),
    ).toEqual([]);
  });

  test("every parameter of an exported function is documented", async () => {
    const { exported } = await scan();
    const missing: string[] = [];

    for (const symbol of exported) {
      const block = symbol.block.join("\n");

      for (const parameter of symbol.parameters) {
        const tag = new RegExp(
          `@param\\s+${parameter.replaceAll("$", "\\$")}(?=\\s|$)`,
          "m",
        );

        if (!tag.test(block)) {
          missing.push(
            `${symbol.where} ${symbol.name} has no @param ${parameter}`,
          );
        }
      }
    }

    expect(missing).toEqual([]);
  });

  // A scan that reads nothing reports nothing and goes on doing so if a
  // directory is renamed. Both halves are asserted because a tree of files with
  // no exports in it would satisfy the first alone.
  test("the scan reads the source rather than nothing", async () => {
    const { files, exported } = await scan();

    expect(files.length).toBeGreaterThan(0);
    expect(exported.length).toBeGreaterThan(0);
  });

  // An export shape this scan cannot name is one it would otherwise skip in
  // silence, which is indistinguishable from a documented one.
  test("no export goes unread", async () => {
    const { unnamed } = await scan();

    expect(unnamed).toEqual([]);
  });
});

/**
 * What the page claims about itself and a command can decide by reading it:
 * 0014 §9's first table entire, 0017 §3, and one row of 0011 §8.
 *
 * All three records name these as decidable by reading the source with no
 * browser, which is 0010 §2's third kind of claim, and until `tests/` existed
 * there was nowhere to put one — 0018 §1. The rest of each record's list is
 * measured or watched, and nothing here pretends otherwise.
 *
 * [#96](https://github.com/nanatsusaya/dot-panic/issues/96) is the change that
 * made three of the four true; the fourth was true from #95 and is asserted here
 * because that change edits the file it is about.
 * [#77](https://github.com/nanatsusaya/dot-panic/issues/77) adds the 0011 §8 row
 * on the decider's answer to PR #206's O1.
 */

import { describe, expect, test } from "bun:test";

const ROOT = `${import.meta.dir}/..`;

/**
 * Read one committed file of the page.
 *
 * @param path  relative to the repository root. Never a `.js` — 0018 §5 keeps a
 *              source-reading test away from the emitted output, whose presence
 *              depends on whether a build has run
 * @returns the file's text
 */
async function read(path: string): Promise<string> {
  return await Bun.file(`${ROOT}/${path}`).text();
}

/**
 * Every TypeScript file of the Shell, as text.
 *
 * @returns one string per file, in a stable order
 */
async function shellSources(): Promise<string[]> {
  const files = [...new Bun.Glob("**/*.ts").scanSync({ cwd: `${ROOT}/shell` })]
    .map((path) => path.replaceAll("\\", "/"))
    .sort();

  return await Promise.all(files.map((file) => read(`shell/${file}`)));
}

describe("the page's source-readable invariants", () => {
  /*
   * 0014 §9, first row. 0002 A1 gave the Shell exactly one call and said in
   * terms that what it licenses is one call rather than page chrome as a
   * category — *§2 names one call so that a later session counts rather than
   * argues* — and this is the counting.
   *
   * **Only the count is asserted.** The row's other half, *nothing else on the
   * page is opened, closed or toggled by script*, is not a thing a text search
   * decides, and review carries it exactly as before.
   *
   * It is a text search over source, so a comment writing `showModal()` with its
   * parentheses would redden this — the same trap 0002 §3's fifteen names set
   * for `core/`, arriving from the other direction. Write the bare name in prose.
   */
  test("the Shell contains exactly one showModal() call", async () => {
    const calls = (await shellSources()).flatMap(
      (source) => source.match(/showModal\s*\(/g) ?? [],
    );

    expect(calls).toHaveLength(1);
  });

  /*
   * 0014 §9, second row, and it is the one carrying a piece of an obligation.
   * 0004 §1 asks that the imprint be *leicht erkennbar*, §10 reads that as a
   * question about a person finding it, and 0014 §6 makes the label the whole of
   * the finding once the imprint sits behind a control.
   *
   * **That it names the imprint is asserted; what it says is watched** — 0014 §9
   * splits it exactly there, so this is deliberately the weaker of the two.
   */
  test("the control that opens the dialog names the imprint", async () => {
    const page = await read("index.html");
    const control = /<button[^>]*id="about"[^>]*>([\s\S]*?)<\/button>/.exec(
      page,
    );

    expect(control?.[1] ?? "").toContain("Impressum");
  });

  /*
   * 0014 §9, third row. §8 records no breakpoint and no container query as a
   * deliberate no rather than an omission — both are Baseline widely available,
   * so 0001 §3.4 permits either and this page uses neither.
   *
   * Only an at-rule's condition is read, never the whole file: `max-width` is a
   * property this stylesheet uses to bound the dialog's line length, and a
   * search over the text would find the word there and call it a breakpoint.
   */
  test("the stylesheet has no width breakpoint and no container query", async () => {
    const styles = await read("styles.css");
    const conditions = styles.match(/@media[^{]*/g) ?? [];

    expect(
      conditions.filter((condition) => condition.includes("width")),
    ).toEqual([]);
    expect(styles).not.toContain("@container");
  });

  /*
   * 0017 §3, which states its own checkable form: the document element carries
   * `lang="en"`, and every element carrying `lang="de"` contains nothing but the
   * word §2 fixes.
   *
   * The second half is what keeps §2's *it is the whole of the exception* true.
   * A second German word would have to arrive inside one of these elements or
   * in a third one, and either fails here.
   */
  /*
   * 0011 §8's third asserted row, arriving early and over a different object.
   * That table is about the **deployed** page, and #98 builds the workflow that
   * reads it there; until that lands the link is guarded by nothing at all,
   * while §8's own reason for asserting it is that §4's two sentences are the
   * kind of thing a page rewrite drops without anyone noticing.
   *
   * **This is not that claim twice.** One command reads committed source and the
   * other a built artifact, which is the difference 0010 A2 named as context
   * rather than kind — the same claim at the two places a command runs.
   *
   * Comments are stripped before anything is read. A URL inside one is not a
   * link a visitor can follow, and what the page offers the visitor is the whole
   * subject here. It is the `showModal` count's trap from the other side: there
   * a comment reddens a true check, here one would green a false one.
   *
   * **What it cannot decide is whether the sentences are true** — 0011 §8 says
   * so of this row itself, and that is a person reading them.
   */
  test("the page links GitHub's privacy statement", async () => {
    const markup = (await read("index.html")).replace(/<!--[\s\S]*?-->/g, "");
    const hrefs = [...markup.matchAll(/<a[^>]*href="([^"]*)"/g)].map(
      (anchor) => anchor[1] ?? "",
    );

    expect(
      hrefs.filter(
        (href) =>
          href.startsWith("https://docs.github.com/") &&
          href.includes("privacy"),
      ),
    ).toHaveLength(1);
  });

  test("lang is en on the document and de on nothing but the one word", async () => {
    const page = await read("index.html");
    const german = [
      ...page.matchAll(/<(\w+)[^>]*lang="de"[^>]*>([\s\S]*?)<\/\1>/g),
    ];

    expect(page).toContain('<html lang="en">');
    expect(german.length).toBeGreaterThan(0);

    for (const match of german) {
      expect(match[2]?.trim()).toBe("Impressum");
    }
  });
});

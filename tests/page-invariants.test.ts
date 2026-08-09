/**
 * What the page claims about itself and a command can decide by reading it:
 * 0014 §9's first table entire, 0017 §3, one row of 0011 §8, and 0007's input
 * model where it is a fact about the source rather than about a browser.
 *
 * All those records name these as decidable by reading the source with no
 * browser, which is 0010 §2's third kind of claim, and until `tests/` existed
 * there was nowhere to put one — 0018 §1. The rest of each record's list is
 * measured or watched, and nothing here pretends otherwise.
 *
 * [#96](https://github.com/nanatsusaya/dot-panic/issues/96) is the change that
 * made three of the four true; the fourth was true from #95 and is asserted here
 * because that change edits the file it is about.
 * [#77](https://github.com/nanatsusaya/dot-panic/issues/77) adds the 0011 §8 row
 * on the decider's answer to PR #206's O1.
 * [#105](https://github.com/nanatsusaya/dot-panic/issues/105) adds 0007 §1's one
 * code path, §7's refusal of the interaction media queries and §8's
 * `touch-action`.
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

  /*
   * 0007 §1: one code path, and it is Pointer Events. The four names that
   * section lists are what the page listens for, and **the assertion that
   * carries the decision is the second half** — that no mouse or touch event is
   * listened for beside them. Two paths is what §1 rejects, and two paths is
   * what a later change would add without noticing.
   */
  test("the Shell listens for pointer events and for no mouse or touch event", async () => {
    const listened = (await shellSources()).flatMap((source) =>
      [...source.matchAll(/addEventListener\(\s*"([^"]+)"/g)].map(
        (call) => call[1] ?? "",
      ),
    );

    for (const event of [
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointercancel",
    ]) {
      expect(listened).toContain(event);
    }

    expect(listened.filter((event) => /^(mouse|touch)/.test(event))).toEqual(
      [],
    );
  });

  /*
   * 0007 §3: the flock reacts to where the pointer is, not to how it moves.
   *
   * **This is narrower than that section and deliberately so.** What a text
   * search decides is that the Shell never reads the browser's own answer to
   * *how is it moving* — `movementX` and `movementY`, and the coalesced path
   * §1's *Alternatives considered* rejects on 0001 §3.4. A Shell computing a
   * velocity from two positions of its own would pass this and fail §3, and
   * review is what carries that, exactly as it carries 0014 §9's other half.
   */
  test("the Shell reads no pointer velocity and no coalesced path", async () => {
    for (const source of await shellSources()) {
      expect(source).not.toContain("movementX");
      expect(source).not.toContain("movementY");
      expect(source).not.toContain("getCoalescedEvents");
    }
  });

  /*
   * 0007 §7 records the interaction media queries as a **no** in the way 0005 §8
   * records one, so that a later change does not have to work out whether they
   * were considered. All four are Baseline widely available, so 0001 §3.4 would
   * permit any of them — which is what makes this a decision rather than a
   * limit, and worth a command.
   *
   * Only an at-rule's condition is read, for the same reason the breakpoint test
   * above reads only those: `pointer-events` is a CSS property this page may
   * legitimately use one day, and it differs from the feature name by three
   * characters — the trap §1's own table exists to record.
   */
  test("the stylesheet uses no interaction media query", async () => {
    const conditions = (await read("styles.css")).match(/@media[^{]*/g) ?? [];

    for (const condition of conditions) {
      for (const feature of ["hover", "any-hover", "pointer", "any-pointer"]) {
        expect(condition).not.toContain(feature);
      }
    }
  });

  /*
   * 0007 §8, and it is the one row here whose absence breaks the toy outright
   * rather than degrading it: without it a finger dragged across the canvas
   * scrolls the page, the browser takes the gesture, and `pointercancel` arrives
   * mid-stroke.
   *
   * It applies to the drawing surface and to nothing else, which that section
   * says in terms — so the rule is read rather than the file, and a
   * `touch-action` somewhere else would not satisfy this.
   */
  test("the drawing surface sets touch-action to none", async () => {
    const rule = /#flock\s*\{([^}]*)\}/.exec(await read("styles.css"));

    expect(rule?.[1] ?? "").toMatch(/touch-action:\s*none/);
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

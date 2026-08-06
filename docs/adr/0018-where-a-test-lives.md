# 0018 — Where a test lives

- **Status:** Proposed
- **Date:** 2026-08-06
- **Deciders:** Daniel Wagner
- **Ticket:** [#181](https://github.com/nanatsusaya/dot-panic/issues/181)
- **Depends on:** [0002](0002-overall-architecture.md) §2 (a test belongs to no
  part, and where it sits is not that section's question), §3 (the fifteen names
  the Core does not mention), §7 (three directories, named after the three
  parts), [0009](0009-toolchain.md) §3 (one `.js` beside each `.ts`, and R1
  keeps it out of the repository), §4 (`target` and `lib`, and what they hold),
  §6 (what makes a file a test), [0010](0010-testing-strategy.md) §2 (the third
  kind of asserted claim), §4 (the purity test reads the Core's source), §7 (the
  coverage floor is over the Core), [0012](0012-how-software-gets-developed.md)
  §4 (the failing test comes first), [0014](0014-page-layout.md) §9 (three
  invariants decidable by reading the page's source)
- **Supersedes:** nothing
- **Amended:** no

## Context

**A named kind of claim has nowhere to live.** [0010](0010-testing-strategy.md)
§2 fixes that a command asserts three kinds and nothing else, and the third is *a
fact about the source* — *"a claim whose subject is the text of the repository
rather than the behavior of a program"*. Four such tests are owed and not one of
them has a place to sit:

| Owed by | What it reads |
|---|---|
| [0010](0010-testing-strategy.md) §4, [#92](https://github.com/nanatsusaya/dot-panic/issues/92) | `core/`, for [0002](0002-overall-architecture.md) §3's fifteen names |
| [0014](0014-page-layout.md) §9 | `shell/`, for exactly one `showModal()` call |
| [0014](0014-page-layout.md) §9 | `index.html`, for a control whose label names the imprint |
| [0014](0014-page-layout.md) §9 | `styles.css`, for the absence of a breakpoint and a container query |

**Every obvious place is wrong for a different reason, and that is why this is a
record rather than a habit.**

- **At the root.** `tsconfig.json` includes `core`, `shell` and `view`, so a
  `page.test.ts` beside `index.html` would be discovered and run by `bun test`
  and **never seen by `check:types`** — a test file outside the type checker, in
  a project whose second check exists so that 0009 §4's settings are read at all.
  0009 §3 would also emit `page.test.js` at the root, where `.gitignore` covers
  the three directories and nothing else.
- **Inside `core/`.** #92's test has to contain all fifteen of 0002 §3's names,
  because they are what it searches for. **A file under `core/` that lists them
  is a file the test finds.** A test cannot naively sit inside its own subject.
- **Inside `shell/` or `view/`.** Mechanically fine — 0002 §2's checkable form
  permits anything under `shell/` — but 0002 §7 names those directories after the
  three parts, and a test whose subject is `styles.css` is not the loop, the
  clock or the drawing.

**0002 says a test belongs to no part and deliberately stops there.** Its §2:
*"A test belongs to no part. … This section never governed that, and where such a
file sits is not its question either."* That sentence is what makes the question
this record's rather than an amendment to that one.

**The repository at the time of writing.** `core/` holds three modules and four
test files, `view/` one function, `shell/` one file; `index.html` and
`styles.css` sit at the root. Every test that exists is a behavior test beside
its subject. No source-reading test has ever been written here, so nothing below
moves a file — it decides where the first one goes.

## Decision

### 1. A test lives beside its subject, unless its subject is source text

A test of behavior sits in the directory of the code it exercises, which is where
every test in this repository already sits and what
[0012](0012-how-software-gets-developed.md) §4's red-then-green loop is
comfortable with: the failing test and the code that answers it are one directory
apart.

**A test whose subject is source text lives in `tests/`.** That is
[0010](0010-testing-strategy.md) §2's third kind and only that kind. The split is
by **what the test reads**, not by what it is called.

**Checkable by reading a path:** a file under `tests/` reads files; a test file
outside `tests/` imports the module it exercises.

### 2. `tests/` is a fourth top-level directory, and it is not a part

[0002](0002-overall-architecture.md) §7 names three directories after the three
parts. This one is named after a kind of claim, and the difference is the whole
of why it does not disturb that section: §2's dependency direction is about parts
and *"a test belongs to no part"* already says so.

**It appears in no import rule.** 0002 §2's checkable form reads `core/`, `view/`
and `shell/`; `tests/` is outside all three, exactly as that section's own
sentence about test files already requires.

### 3. `tsconfig.json` includes it, so `check:types` reads it

`include` gains `"tests"`. TypeScript's `include` *"specifies an array of
filenames or patterns to include in the program"*, and a file matched by nothing
is not in the program — so without this the one place a type error could ship
unseen would be the files that exist to catch mistakes.

**0009 has nothing to say about `include`** — §4 fixes `target` and `lib`, §3 the
emitted tree, §5 the import specifiers, and none of them names it. This record
takes it rather than amending that one.

### 4. A build emits into `tests/`, and `.gitignore` grows one entry

[0009](0009-toolchain.md) §3 puts one `.js` beside each `.ts` and R1 keeps the
output out of the repository. Both apply here unchanged, so `.gitignore`'s three
directory entries become four. **Nothing else about the build changes**, and no
`outDir` is introduced: that would be an amendment to §3, and it is
[#190](https://github.com/nanatsusaya/dot-panic/issues/190)'s question rather than
this record's.

### 5. A source-reading test reads committed text, and never the emitted output

Its subject is the repository, which is what 0010 §2's third kind says. The
emitted `.js` is not in the repository (0009 R1), so a test asserting anything
about it would assert something whose presence depends on whether a build has run.

**Checkable by reading:** no path a test under `tests/` opens ends in `.js`.

### 6. A source-reading test is outside its subject by placement, not by exclusion

#92's file must contain all fifteen of 0002 §3's names. Under `tests/` it does so
harmlessly, because the purity test's scan reads `core/` — a directory that
contains no test of this kind and, after §1, never will.

**No exclusion rule, no fixture directory, no marker comment.** Each of those is a
mechanism that can be forgotten or mis-scoped; the placement cannot, because a
test that moved into its own subject would be a test in the wrong directory and
§1 is checkable by a path.

### 7. Coverage measures the Core, and `tests/` is excluded by name

`bunfig.toml` already names `shell/**` and `view/**`, because
[0010](0010-testing-strategy.md) §7 scopes the floor to the Core and Bun offers no
per-directory threshold. `tests/**` joins them for the same reason and no other:
a helper module there is not Core code and must not move a number that describes
the Core.

## Consequences

**Positive.**

- **The third kind of asserted claim has a home**, and four owed tests can be
  written without each session inventing a local answer. That was
  [#181](https://github.com/nanatsusaya/dot-panic/issues/181)'s whole argument:
  one question asked four times.
- **#92's self-reference dissolves without a mechanism.** The hardest of the four
  becomes the easiest, and nothing has to be remembered for it to stay solved.
- **[#96](https://github.com/nanatsusaya/dot-panic/issues/96) is unblocked**, and
  with it the label check that carries a piece of 0004 §1's obligation.
- **Every rule above is decidable by reading a path**, which is what §1's split
  by subject buys over a split by naming convention.

**Negative.**

- **A fourth top-level directory in a project with three parts.** A reader who
  has just learned 0002 §7's three now meets a fourth that is not one of them,
  and §2 above is the only thing that explains it. That cost is real and is paid
  once per reader.
- **The split is by subject, and nothing enforces it.** A behavior test written
  into `tests/`, or a source-reading test left beside its subject, both run
  green. §1 is checkable by a person reading a path and by no command — the same
  shape as the rules [0011](0011-delivery.md) §6 counts, and this adds one.
- **`tests/` will read as *all the tests* to somebody.** The Core's four test
  files stay where they are, so the directory's name is broader than its
  contents, and O3 is where that is weighed.
- **It takes `include` from nobody.** 0009 does not decide it, so this record is
  not overruling that one — but a later session looking for the authority on
  `tsconfig.json` will find two records touching one file, and only this sentence
  saying why.
- **Nothing here decides which tree `bun test` runs against.** After a build, an
  import resolves to the emitted file rather than the source
  ([#190](https://github.com/nanatsusaya/dot-panic/issues/190)); §5 keeps a
  source-reading test away from that question and does not answer it.

## Alternatives considered

- **A file at the root, with `include` gaining a pattern for it.** Rejected
  because 0009 §3 then emits a `.js` at the root beside `index.html`, and
  `.gitignore`'s three directory entries would become three plus a file pattern
  that has to be maintained per test file.
- **`shell/`, on the grounds that the Shell is the part that touches the page.**
  Rejected because 0002 §7 names that directory after a part and a test of
  `styles.css` is not the loop, the clock, input or the frame — and because it
  would put the purity test one directory from the code it polices for reasons
  that have nothing to do with the code.
- **A fixture directory inside `core/`, excluded from the purity scan.**
  Rejected because it solves one test's problem with a mechanism the other three
  do not need, and an exclusion is exactly what §6 refuses: a rule that can be
  mis-scoped, protecting a rule that cannot.
- **Leave 0010 §2's third kind to review.** Rejected because
  [0014](0014-page-layout.md) §9 lists three invariants as *decidable by reading
  the page's source* and 0010 §2 names the kind — so choosing this would make an
  accepted classification describe nothing. It is O1 below rather than a closed
  door, because #181's own constraint says it is a legitimate answer if it is
  written down as one.
- **A second `tsconfig.json` for the tests.** Rejected because 0009 §4's whole
  point is one answer to what the settings are; a second file is a second answer
  that can drift, in the check that exists to stop exactly that.

## Open questions

**O1 — is this built at all, or does 0010 §2's third kind stay with review?**
Four tests are owed and none exists; the alternative is that
[0014](0014-page-layout.md) §9's first table describes claims a person checks by
reading rather than claims a command decides. **Recommended: build it.** An
accepted record naming a kind that nothing can be is worse than either answer
honestly taken, and the four tests are small. If the answer is review, it is
written into this record as §1 and the rest of the record goes.

**O2 — a fourth top-level directory, or a file at the root?** The directory costs
a reader one paragraph of explanation against 0002 §7's three; the root costs a
`.gitignore` pattern per test file and puts emitted JavaScript beside
`index.html`. **Recommended: the directory**, which is what this record is
written for. `shell/` is the third option and is argued against above.

**O3 — is `tests/` the right name?** It is broader than its contents: the Core's
behavior tests stay beside the Core, so the directory holds one kind of test and
is named for all of them. TypeScript's own `include` documentation uses
`["src/**/*", "tests/**/*"]` as its example, so the name is the least surprising
one available. **Recommended: `tests/`.** The alternatives each cost something:
`checks/` collides with CLAUDE.md's four checks, which are commands and not a
directory; `source/` reads as *the source* rather than as *tests about the
source*; `meta/` says nothing to a reader who has not already read this record.

## References

- [TypeScript — `include`](https://www.typescriptlang.org/tsconfig/#include),
  read 2026-08-06. *"Specifies an array of filenames or patterns to include in
  the program."* Its own example is `["src/**/*", "tests/**/*"]`. `exclude` is
  recorded there as filtering `include` rather than preventing inclusion, which
  is why §3 adds to `include` rather than reaching for the other.
- What makes a file a test is [0009](0009-toolchain.md) §6, which quotes Bun's
  discovery patterns. This record does not re-read them and does not restate
  them.

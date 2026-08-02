# 0009 — Toolchain

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#35](https://github.com/nanatsusaya/dot-panic/issues/35)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (this is an example
  project), §3.4 (the Baseline floor), §6 (failure, ranked), R1 (how the feature
  floor is expressed in tooling belongs here) ·
  [0002](0002-overall-architecture.md) §2 (the three parts and the import rule),
  §3 (the Core names none of these), §7 (three directories, and the naming handed
  here) · [0003](0003-security-and-privacy-by-design.md) §2 (the page loads
  nothing it does not ship), §5 (no network request after load) ·
  [0008](0008-performance-budget.md) §8 (a factor recorded with its date), R1
  (numbers live in the code and in the ticket) ·
  [0012](0012-how-software-gets-developed.md) §1 (the analysis phase has no end
  condition), §4 (test-first in the Core, without exception), §5 (watch-first in
  the View)
- **Supersedes:** nothing

## Context

[CLAUDE.md](../../CLAUDE.md) states that this project has no toolchain and that
this is not an oversight: no decision covers a runtime, a test runner, a package
manager or a build step, so none of them exist. **This is the record that ends
that**, and its own acceptance changes nothing on disk.

Two accepted records have been waiting. [0002](0002-overall-architecture.md) §7
fixes three directories and then hands over file names, extensions and module
format. [0012](0012-how-software-gets-developed.md) §4 requires test-first in the
Core **without exception**, which needs something that runs tests.
[0001](0001-purpose-scope-and-success.md) R1 sends *how the feature floor is
expressed in tooling* here, and [0008](0008-performance-budget.md) §8 sends what
applies the floor device's slowdown factor.

**The tension this record sits on.** 0003 forbids the page to load or run anything
it did not ship, which says nothing about build-time tools — but
[0001](0001-purpose-scope-and-success.md) §2 makes the repository the thing being
judged, and §6.1 ranks *the documentation is poor, and a reader learns nothing
about the method from it* as the worst outcome available. Every tool between what
is written and what runs is a step a reader has to follow.

**What is not open here.** What is tested is 0010's; this record decides what runs
the tests. How anything reaches a public URL is 0011's. Whether the simulation core
is written here at all is 0013's, and it is `Planned` — so this record names what
a source file is and does not assume one exists.

**Repository state at the time of writing.** No code, no page, no toolchain.
Eleven records accepted. Nothing here has been on a screen.

## Decision

### 1. Bun, TypeScript, and `bun test`

Decided by the decider — R1. Bun is the runtime and the package manager, the
language is TypeScript, and tests run on Bun's own test runner.

**Bun supports the machine this is developed on.** It ships for macOS, Linux and
Windows on x64 and ARM64, and *"Bun requires Windows 10 version 1809 or later."*
Recorded because a toolchain that does not run where the work happens is a defect
found on the first day rather than a preference.

### 2. There is a build step, and `tsc` is what performs it

TypeScript does not run in a browser — the standard's own words are that type
annotations *"aren't part of JavaScript"* and that the compiler exists to strip
them. So a build step is not a choice this record makes; it is a consequence of §1.

**What performs it is a choice, and it is `tsc` rather than `bun build`.** Two
reasons, and the first is §4's whole subject:

- **Bun does not down-convert syntax.** *"Bun does not down-convert syntax; if you
  use recent ECMAScript syntax, it appears as-is in the bundled code."* A tool that
  emits whatever it is given cannot hold 0001 §3.4.
- **`typescript` is a dependency this project has anyway**, because *"Bun does not
  perform typechecking."* Using it for the emit as well means one tool rather than
  two, and **one answer to what syntax is allowed** rather than two that can
  disagree.

### 3. The emitted tree mirrors the source tree, and nothing is bundled

One `.js` beside each `.ts`, in the three directories [0002](0002-overall-architecture.md)
§7 fixes. No bundler, no single output file.

**The reason is 0001 §2.** A reader of this repository is the audience the project
exists for, and a bundle makes what runs unreadable at exactly the moment someone
opens the page to see how it works. 0003 §2 is indifferent — a bundle ships from
the same origin either way — so nothing but legibility is deciding this, which is
the correct thing to be deciding it.

**Nothing is bought by the alternative.** Three directories of small modules give a
bundler no meaningful work, and the request count is 0011's subject rather than
this record's.

### 4. 0001 §3.4 becomes two compiler settings, and they hold only half of it

This is what [0001](0001-purpose-scope-and-success.md) R1 sent here, and it is the
load-bearing section.

- **`target` bounds the syntax that is emitted.** *"The `target` setting changes
  which JS features are downleveled and which are left intact."*
- **`lib` bounds the APIs the type checker admits.** TypeScript *"includes APIs for
  newer JS features matching the `target` you specify"*, and code using an API
  outside the configured set does not type-check.

**Both name a bounded version, and never `ESNext`.** Bun's own recommended
configuration sets `"target": "ESNext"` and `"lib": ["ESNext"]`, which admits every
feature that exists; for this project that is precisely backwards, and the
recommendation is not followed. **Which version, and the date it was read, belong
to the ticket that creates the toolchain** — 0008 R1 puts numbers there, and 0008
§8 already established recording a floor with the date it was chosen, for the same
reason: the mapping moves and nothing announces it.

**The half this does not hold is browser APIs.** `lib` is versioned by ECMAScript
year; the DOM library is not versioned at all. So `showModal()`, `PointerEvent`,
the `resolution` media feature and every other browser feature an accepted record
already names sit outside anything `target` or `lib` can decide. **That half of
0001 §3.4 stays with a person reading the Baseline data**, and it is stated here
rather than discovered later — the same shape as the imprint address and 0008 §8's
factor: a rule with nothing that can fail.

### 5. An import names the emitted file, not the source

`./flock.js`, never `./flock.ts` and never `./flock`. The browser resolves a
specifier literally and guesses no extension, and §3 means the emitted file is the
one that will be there.

This forecloses `allowImportingTsExtensions`, which Bun's recommended configuration
enables. That option is for projects whose bundler resolves the source; §3 says
there is no bundler and the browser is the resolver.

**Checkable by reading:** no import specifier under the three directories ends in
`.ts` or lacks an extension.

### 6. Tests run on `bun test`, and the thing tested is not the thing shipped

*"Bun ships with a fast, built-in, Jest-compatible test runner"* — built in, so it
adds no dependency, and it runs TypeScript directly. It discovers
`*.test.{js|jsx|ts|tsx|mjs|cjs|mts|cts}` and the `_test`, `.spec` and `_spec`
variants. This is what makes [0012](0012-how-software-gets-developed.md) §4
possible; **what** is tested is 0010's.

Two limits are recorded rather than met later:

- *"Bun aims for compatibility with Jest, but not everything is implemented."* A
  test written against Jest's documentation is not guaranteed to run.
- **`bun test` runs the source; the browser runs the output.** §4's `target`
  down-levels syntax, so the file a test proved correct is not the file a visitor
  executes. Nothing in this record closes that gap, and 0010 inherits it.

### 7. Every dependency is a development dependency, and the list starts at two

0003 §2 and §5 make a runtime dependency impossible — the page loads nothing it did
not ship and makes no request after loading — so this is a description of what the
accepted records already force, not a new rule.

**The list starts as `typescript` and `@types/bun`**: the first because Bun does not
typecheck, the second because a test file naming `bun:test` needs declarations for
it.

**The test for admitting another one:** it makes a claim in some record's asserted
list decidable by a command. A tool that only changes how the source looks does not
meet it. **This record does not lift CLAUDE.md's stop-and-ask** — deciding the
policy is not authorizing an install, and each further dependency is still asked
about.

### 8. The chain is three checks, and the strings that invoke them are not here

A person checking this project runs three things, each **alone**:

1. **The method check** — the coherence check that already exists and is named in
   CLAUDE.md.
2. **A type check that emits nothing** — §4's settings are worth nothing unless
   something reads them.
3. **The test run** — §6.

**The literal invocations belong to the ticket that creates the files**, on 0008
R1's reasoning: a command string in a record is stale the first time a script is
renamed, and nothing checks it. What this record fixes is that there are three,
what each decides, and that none of them is run inside a pipeline — a pipeline
reports the last command's exit status, which this project has already been caught
by once.

### 9. What is asserted, and what nothing decides

The division 0006 §10, 0007 §9, 0014 §9, 0008 §9 and 0015 §8 make.

**Decidable by reading the repository, with no browser:**

| | Invariant |
|---|---|
| §3 | Every emitted `.js` sits beside exactly one `.ts` in the same directory, and no bundle exists |
| §4 | `target` and `lib` each name a bounded version, and neither is `ESNext` |
| §5 | No import specifier under `core/`, `shell/` or `view/` ends in `.ts` or lacks an extension |
| §7 | The manifest names no runtime dependency, and no development dependency this record or a later authorized change has not named |

**Decidable by running the chain:** §8's three checks pass.

**Nothing here is decided by watching.** This is a record about what runs the code,
and none of it appears on a screen — the first record carrying this division whose
watched half is empty, and the emptiness is deliberate rather than an omission.

## Consequences

**Positive.**

- **Half of 0001 §3.4 becomes machine-held for the first time.** Until now the
  Baseline floor was a sentence every record cited and nothing enforced. §4 gives
  the syntax half a compiler setting, and it names the half that is still a person.
- **0012 §4 becomes possible.** Test-first without exception has had nothing to run
  a test with since the day it was accepted.
- **0002 §7's deferred half is answered** — extensions, module format and the
  naming that goes with the three directories.
- **What is read in the repository is what runs**, module for module, which is the
  property §3 exists to protect and the one 0001 §2 is judged on.
- **One tool holds the syntax rule.** §2 refuses the arrangement where an emitter
  and a checker disagree about what is allowed.

**Negative, and these are real.**

- **The thing tested and the thing shipped are two artifacts.** §6 names it: a
  passing test is evidence about the source, and the visitor runs the output.
- **The browser-API half of the floor has nothing that can fail.** §4 says so
  plainly, which is the most a record can do — it is the third rule in this project
  held by a person remembering, beside the imprint address and 0008 §8's factor.
- **The repository stops being openable.** Before this, a page could have been
  opened from disk. After it, a build step stands between the source and anything
  that runs, and every reader of the example pays that.
- **The project now has dependencies to keep.** None of them is the toy, all of them
  age, and 0001 §6.2 — *the toy is never finished because the process ate the
  work* — has more surface than it did yesterday.
- **§4 costs a fight with the tool's own advice.** Bun's recommended configuration
  is followed nowhere in this record's two most specific settings, which means every
  future session that runs `bun init` gets a configuration this record forbids.
- **Nothing here exists.** The record decides a toolchain and creates none of it.

## Alternatives considered

- **No toolchain at all: plain ES modules, served exactly as written.** Rejected by
  the decider — R1. It was the recommendation put to him, and its cost was 0012 §4:
  test-first without exception needs something that runs tests, and nothing in the
  browser does.
- **`bun build` as the emitter.** Rejected in §2: it does not down-convert syntax,
  so it cannot hold 0001 §3.4, and `typescript` is present anyway.
- **Bundling the three directories into one file.** Rejected in §3: it buys nothing
  at this size and costs the legibility 0001 §2 is judged on.
- **Bun's recommended `tsconfig`.** Rejected in §4 and §5: `"target": "ESNext"`,
  `"lib": ["ESNext"]` and `allowImportingTsExtensions` are each right for a bundled
  project with no feature floor, and this is neither.
- **Bun emits, `tsc --noEmit` checks.** Rejected in §2: two tools with two answers
  to what syntax is allowed, and the one that emits is the one that cannot be told.
- **A linter, a formatter, or a browser-compatibility rule now.** Not rejected on
  its merits — O2 asks it. §7's test is what any of them has to meet.

## Open questions

**O1 — Is the emitted JavaScript committed to the repository, or produced when it
is needed?**

Recommended default: **not committed.** Two copies of every file is what 0001 §6.1
punishes, and a reader cannot tell which one is authoritative; 0003 §7 applies the
same instinct to the imprint in the words *it appears in one place*.

**The cost is real and lands on 0011.** If the output is not in the repository,
whatever publishes the page has to run §8's build first, which rules out publishing
straight from a branch. That constrains a record that is not yet written, which is
why this is asked rather than assumed.

**O2 — What else belongs to *alles was dazu gehört*?**

A linter, a formatter and a workflow that runs §8's chain are each plausible
readings of the answer that produced §1, and none of them is in this record.

Recommended default: **nothing further now**, each on its own ticket, each meeting
§7's test. The one with the strongest case is a browser-compatibility rule, because
it would take the half of 0001 §3.4 that §4 leaves with a person and give it
something that fails — and it is also the one that would need a data source, which
is a decision rather than an install.

## References

- Bun — installation and platform support. *"Bun requires Windows 10 version 1809
  or later."* macOS, Linux and Windows; x64, x64-baseline and ARM64.
  <https://bun.com/docs/installation>, read 2026-08-02.
- Bun — the test runner. *"Bun ships with a fast, built-in, Jest-compatible test
  runner."* And: *"Bun aims for compatibility with Jest, but not everything is
  implemented."* File discovery patterns as quoted in §6.
  <https://bun.com/docs/cli/test>, read 2026-08-02.
- Bun — loaders. *"Bun does not perform typechecking."* The sentence §2 and §7 rest
  on. <https://bun.com/docs/bundler/loaders>, read 2026-08-02.
- Bun — the bundler. *"Bun does not down-convert syntax; if you use recent
  ECMAScript syntax, it appears as-is in the bundled code."* The sentence that
  decides §2. <https://bun.com/docs/bundler>, read 2026-08-02.
- Bun — TypeScript configuration. The recommended `compilerOptions`, including
  `"target": "ESNext"`, `"lib": ["ESNext"]` and `"allowImportingTsExtensions": true`,
  which §4 and §5 decline. <https://bun.com/docs/runtime/typescript>, read
  2026-08-02.
- TypeScript — `target`. *"The `target` setting changes which JS features are
  downleveled and which are left intact."*
  <https://www.typescriptlang.org/tsconfig/target.html>, read 2026-08-02.
- TypeScript — `lib`. *"TypeScript also includes APIs for newer JS features matching
  the `target` you specify."* The mechanism §4 uses, and the one that does not
  version the DOM. <https://www.typescriptlang.org/tsconfig/lib.html>, read
  2026-08-02.
- TypeScript handbook — types are erased and the compiler emits JavaScript. *"Type
  annotations aren't part of JavaScript … That's why TypeScript needs a compiler in
  the first place."* Why §2's build step is a consequence rather than a choice.
  <https://www.typescriptlang.org/docs/handbook/2/basic-types.html>, read
  2026-08-02.
- [0001](0001-purpose-scope-and-success.md) §2, §3.4, §6, R1 — the example project,
  the feature floor, the ranked failures, and the delegation §4 answers. Read
  2026-08-02.
- [0002](0002-overall-architecture.md) §2, §3, §7 — the three parts, the Core's
  forbidden names, and the naming handed here. Read 2026-08-02.
- [0003](0003-security-and-privacy-by-design.md) §2, §5, §7 — what the page may
  load, what it may request, and the *appears in one place* O1 borrows. Read
  2026-08-02.
- [0008](0008-performance-budget.md) §8, R1 — a floor recorded with its date, and
  where numbers live. Read 2026-08-02.
- [0012](0012-how-software-gets-developed.md) §1, §4, §5 — the analysis phase, the
  requirement §6 satisfies, and the division §9 follows. Read 2026-08-02.
- [Ticket #35](https://github.com/nanatsusaya/dot-panic/issues/35) — the scope this
  record is written against. Read 2026-08-02.

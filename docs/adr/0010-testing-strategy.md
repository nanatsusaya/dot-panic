# 0010 — Testing strategy

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#36](https://github.com/nanatsusaya/dot-panic/issues/36)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (the flock
  reading as a flock is judged by watching, and no command decides it), §6 (the
  ranked failures) · [0002](0002-overall-architecture.md) §3 (the purity list,
  in a form a command can decide), §4 (the Core is deterministic), §5 (no domain
  logic outside the Core) · [0006](0006-motion-rules.md) §10 ·
  [0007](0007-pointer-and-input-model.md) §9 ·
  [0008](0008-performance-budget.md) §9 (three registers, and the measured one
  handed here) · [0009](0009-toolchain.md) §1 (`bun test` is the runner), §3
  (the emitted tree is not committed), §6 (the tests run the source, the browser
  runs the output), §7 (three dependencies, and the count is the rule), §8 (the
  four checks) · [0012](0012-how-software-gets-developed.md) §4 (test-first in
  the Core without exception), §5 (watch-first in the View) ·
  [0014](0014-page-layout.md) §9 (the same question, about a rendered page)
- **Supersedes / amends:** nothing
- **Amended:** no

## Context

The discipline is already fixed and this record does not touch it.
[0012](0012-how-software-gets-developed.md) §4 requires every rule of the
simulation to be written as a failing test first, without exception; §5 replaces
that with watch-first in the View, because test-first cannot apply where the
result is a picture. What neither fixes is **what is actually asserted**, and
that is the whole of this record.

**The dividing line is what this project exists to show.**
[0001](0001-purpose-scope-and-success.md) §3.1 says the flock reading as a flock
is judged by watching and that no command decides it, now or later. §6 ranks *it
passes its checks and looks wrong on screen* third among the ways this fails. So
the error to avoid here is not a thin test suite. It is a suite that appears to
cover the thing it cannot reach — and every technique that promises to close that
gap is a candidate for making the third failure invisible rather than fixing it.

Against that, [0002](0002-overall-architecture.md) §4 hands this record one
genuinely strong lever. Advancing the world takes a world and returns a new one,
time and randomness arrive as arguments, and the same world and the same steps
produce the same result. Almost nothing else in a browser toy is testable that
cleanly.

**Two accepted records have been waiting on this one, and for the same thing.**
[0008](0008-performance-budget.md) §9 and [0014](0014-page-layout.md) §9 each
split their claims three ways and each wrote, of the middle register, *whether
anything measures it is 0010's*. Six invariants sit in those two lists. Deciding
what a command asserts is therefore not enough; this record has to say who, if
anyone, measures a page that is running.

**Repository state.** Twelve records are Accepted and there is no code. There is
also no toolchain — [0009](0009-toolchain.md) fixed what it will be and building
it is [#69](https://github.com/nanatsusaya/dot-panic/issues/69),
[#70](https://github.com/nanatsusaya/dot-panic/issues/70) and
[#71](https://github.com/nanatsusaya/dot-panic/issues/71). Everything below
describes tests that do not exist yet, and none of it is a reason to start
writing them.

## Decision

### 1. Three registers, and every record uses these names

A claim about this project sits in exactly one of three registers:

- **Asserted** — a command decides it, and a failure is a red test.
- **Measured** — a number read off a running page, compared against a budget by a
  person. No command decides it (§5).
- **Watched** — a person looks at the screen and judges. Nothing decides it but
  the judgment, and §8 says how that judgment is recorded.

[0006](0006-motion-rules.md) §10 and [0007](0007-pointer-and-input-model.md) §9
use two registers because nothing in them needs measuring;
[0008](0008-performance-budget.md) §9 and [0014](0014-page-layout.md) §9 use
three. **That is not a disagreement, and this record does not harmonize it.** A
record with nothing to measure writes two lists, and a reader who finds two lists
should conclude the middle register is empty rather than that it was forgotten.

### 2. A command asserts three kinds of claim, and nothing else

Stated as kinds rather than as a list of tests, because a list of tests is a plan
and goes stale the first time one is renamed.

**Kind one — an invariant of the world.** A property that holds of any world the
Core produces, quantified over worlds and seeds rather than over one example.
Every entry in an accepted record's *asserted* list is one of these: the grid
query and the naive scan return the same set, a step preserves the dot count, the
minimum speed is never violated.

**Kind two — determinism.** The property §3 defines, asserted as its own test
rather than assumed by the others.

**Kind three — a fact about the source.** A claim whose subject is the text of
the repository rather than the behavior of a program. This kind was already in
use before it had a name: [0006](0006-motion-rules.md) §10 asserts that the Core
does not name pausing, and the whole of [0014](0014-page-layout.md) §9's first
list is of this kind — one `showModal()` call, a label that names the imprint, a
stylesheet with no breakpoint. §4 adds the largest member, not the first.

**Nothing else is asserted.** In particular, no test asserts that a picture is
correct, that a frame arrived in time, or that a value a person chose by looking
is still the value they chose. A claim that fits none of the three kinds belongs
in the measured or the watched register, and moving it into a test to get a green
tick is the specific mistake [0001](0001-purpose-scope-and-success.md) §6 ranks
third.

### 3. Determinism is asserted by comparing two runs, never against a stored result

The test builds a world from a fixed seed, advances it by a fixed sequence of
steps twice, and compares the two results to each other. It does not compare them
against numbers recorded in the repository.

**Because there are no numbers to record.** [0006](0006-motion-rules.md) and
[0008](0008-performance-budget.md) fix relations — a bounded frame, a minimum
speed, a packing ratio — and deliberately fix no constants;
[0008](0008-performance-budget.md) R1 puts the numbers in code and in a ticket,
where tuning them is expected. A stored expected result would turn every
legitimate tuning into a red test whose repair is to overwrite the expectation,
and a test whose failure is repaired by accepting the new output is not asserting
anything after the second time.

**What this asserts is narrower than [0002](0002-overall-architecture.md) §4
claims, and the record says so rather than implying otherwise.** §4's checkable
sentence ends *in any environment that can do arithmetic*. Two runs inside one
process, on one machine, under one runtime, are evidence for the *same*
environment and none at all for a different one. The browser never runs this
test — §9. **Nothing here exercises the cross-environment half of §4**, and this
record neither closes that gap nor pretends it is small: it is the difference
between *the Core carries no hidden state* and *the Core computes the same
numbers everywhere*, and only the first is asserted.

### 4. The purity list is asserted by a test that reads the source

[0002](0002-overall-architecture.md) §3 lists fifteen names the Core does not
mention and says it is stated as a list because a list can be decided by a
command. This record names the command: a test in the ordinary suite that reads
the Core's source files and fails if any of the fifteen appears.

**It lives with the other assertions rather than in linter configuration**, for
one reason: it is a claim this record makes about the Core, and its failure
should arrive the same way every other claim's failure arrives — from `bun test`,
in the same report, quoting the file and the name. Splitting it into
[0009](0009-toolchain.md) §7's tooling would mean two commands to run before
believing the Core is clean, and a reader of a green test report would be
believing something the report does not say.

**It is a text search and it is honest about that.** It will not catch a
forbidden name reached indirectly, and this record does not claim it will. What
it catches is the case that actually occurs — someone reaches for `Math.random`
or `performance.now` while writing Core code — and it catches it at the moment
the reach happens.

### 5. Nothing in the repository measures a running page

The middle register has no automation, and this is a decision rather than a
deferral. A measured claim is checked by a person opening the page and reading
the number off the browser's own tools, and recorded the way a watched result is
recorded (§8).

**Six invariants take this answer**: the three in
[0008](0008-performance-budget.md) §9 and the three in
[0014](0014-page-layout.md) §9. They stay stated, they stay unautomated, and both
records already anticipated that the answer might be this one.

The reasons are three and they compound. Measuring a frame budget or a rendered
layout needs a browser under program control, which is a dependency
[0009](0009-toolchain.md) §7 does not name and whose rule is *the count, not the
category*. [0003](0003-security-and-privacy-by-design.md) §2 leaves the page
loading nothing, and an instrument that ships with the page would be the first
thing it loads. And the apparatus would be larger than the toy, which is
[0001](0001-purpose-scope-and-success.md) §6.2 — *the toy is never finished
because the process ate the work* — arriving by the door it usually arrives by.

**The negative is real and belongs here rather than in a footnote.** The frame
budget is the one thing in this project with a number attached, and after this
record nothing tells you when it breaks except a person who thought to look. A
regression in it is exactly as invisible as a regression in how the flock reads.

### 6. The View is watched, and three techniques are deliberately not attempted

No test renders the page and inspects the result. Not pixel comparison, not DOM
snapshots, not a headless browser asserting that something is on screen.

- **Pixel comparison** would make the flock's appearance a red-or-green fact,
  which [0001](0001-purpose-scope-and-success.md) §3.1 says it is not. It would
  also fail on every legitimate change to a color or a radius, and the repair
  would be to bless the new image — the §3 failure mode, applied to the one thing
  this project is about.
- **DOM snapshots** would assert the shape of markup that
  [0014](0014-page-layout.md) §9 already asserts by reading the source, and would
  assert it in a form that changes whenever the markup is reformatted.
- **A headless browser** is the dependency §5 declines, for the reasons §5 gives.

What replaces them is [0012](0012-how-software-gets-developed.md) §5, unchanged
and not restated here.

**The View is therefore the part of this project with no test coverage at all**,
by construction and not by neglect. [0002](0002-overall-architecture.md) §5 is
what makes that tolerable: the View draws exactly the world it was handed and
computes nothing, so there is no logic in it for a test to protect. If that ever
stops being true, this section stops being safe — and §5 of that record, not this
one, is what would have been broken.

### 7. Coverage is not tracked

No coverage number is produced, reported, or made a condition of anything.

This is not an argument that coverage is worthless. It is that in this project
the number would be actively misleading: the Core would sit near the top because
it is pure and exhaustively testable, the View would sit at zero by §6, and the
figure for the whole would move mostly with the ratio of the two. A reader would
learn the shape of the architecture, which [0002](0002-overall-architecture.md)
already states, and nothing about whether the toy works.

The condition that replaces it is [0012](0012-how-software-gets-developed.md) §4,
which is stricter than any threshold: every rule of the simulation is written as
a failing test first, so a rule with no test is a rule that was not written the
way this project writes rules.

### 8. A watched or measured result is recorded in the change that produced it

Both registers end in a judgment by a person, and a judgment nobody wrote down is
indistinguishable from one nobody made.

The record is the change description's *Watched* section — already in
[the pull request template](../../.github/pull_request_template.md), which is its
authority and is not restated here — carrying what was watched, on what, and what
was seen. For a measured claim it carries the number and the device.

**The expectation is written before the work starts, in the ticket**, which
[0008](0008-performance-budget.md) §9 and [0014](0014-page-layout.md) §9 already
require of their watched lists. This record generalizes it to the measured
register and adds nothing else: a number read after the fact, with no prior
expectation, is a description rather than a check.

### 9. The tests run the source; nothing asserts the emitted output

[0009](0009-toolchain.md) §6 states the gap and says this record inherits it.
`bun test` executes TypeScript directly; the browser executes what `tsc` emitted.
Every assertion above is therefore a claim about the source tree, and a defect
introduced by emission would pass all of them.

**This record adds no check over the emitted output.** The output is not
committed ([0009](0009-toolchain.md) §3), so there is nothing in the repository
for a test to read; and asserting anything about it would mean running a build
first, which makes the suite depend on a build step that
[0012](0012-how-software-gets-developed.md) §4's test-first loop runs hundreds of
times.

**What covers it is watching the built page, and only that.** The emitted output
is exercised exactly once per change that reaches the page, by a person looking
at it. Whether that happens before publishing rather than after is
[0011](README.md)'s to decide, and this record does not decide it —
it only states that after this record, watching is the sole evidence that what
the browser runs matches what the tests passed.

## Consequences

**Positive.**

- **The suite claims exactly what it can show.** Three kinds, named, with
  everything else explicitly outside — so a green report is evidence about world
  invariants, determinism and the source text, and a reader cannot mistake it for
  evidence about the picture.
- **[0002](0002-overall-architecture.md) §3 becomes true rather than aspirational.**
  It said the list exists so a command can decide it, and until now no command did.
- **Two records stop waiting.** [0008](0008-performance-budget.md) §9 and
  [0014](0014-page-layout.md) §9 asked one question and now have one answer, even
  though the answer is *nobody*.
- **The registers have one vocabulary.** Five records had been writing two or
  three lists with the same headings and no shared definition; §1 supplies it
  without amending any of them.
- **Nothing here adds a dependency.** [0009](0009-toolchain.md) §7's three survive
  this record intact, and §5 and §6 are where the pressure to add a fourth was.

**Negative.**

- **The frame budget is unguarded.** §5 leaves the one numeric claim in the
  project checked by nobody unless a person remembers. This is the most expensive
  thing this record decides.
- **The cross-environment half of [0002](0002-overall-architecture.md) §4 is
  asserted by nothing.** §3 says so plainly, which does not make it smaller.
- **The View has no automated protection at all**, and §6's argument for that
  rests entirely on [0002](0002-overall-architecture.md) §5 continuing to hold.
- **The purity test can be evaded.** §4 says how, and a reader who takes it for a
  proof of purity is reading more than it says.
- **A whole register depends on people writing things down.** §8 is a discipline
  with no command behind it, which is the same class of control this project has
  already watched fail.

## Alternatives considered

- **A golden-file determinism test** — rejected because the project fixes
  relations and no numbers (§3), so every tuning would redden it and the repair
  would be to overwrite the expectation.
- **The purity list as linter configuration** — rejected because it splits this
  record's assertions across two tools and two reports (§4). Whether
  [Biome](https://biomejs.dev/) can express it was not checked; the answer would
  not change where the check belongs.
- **A headless browser for the measured register** — rejected because it is a
  dependency [0009](0009-toolchain.md) §7 does not name, and §5's third reason.
- **Pixel or snapshot testing of the View** — rejected because it converts a
  judgment [0001](0001-purpose-scope-and-success.md) §3.1 reserves for a person
  into a red-or-green fact, and its repair path blesses whatever was rendered.
- **A coverage threshold as a condition of merge** — rejected because the number
  would track the Core-to-View ratio rather than anything about correctness (§7).
- **Building the emitted tree in the test suite** — rejected because it makes
  every test-first cycle pay for a build (§9), for a defect class no one has
  seen here.
- **Harmonizing 0006 §10 and 0007 §9 to three lists** — rejected because it would
  amend two accepted records to add an empty heading, and §1 makes the empty case
  readable without touching them.

## Open questions

**O1 — Does anything in the repository measure a running page, or is §5 the
answer?** §5 as drafted says nobody does, and six invariants across two accepted
records take that answer. The alternative is a browser under program control,
which is a fourth dependency and a body of apparatus larger than the toy.
*Recommended default:* keep §5. If the frame budget later proves to drift
unnoticed, that is a real finding and earns its own ticket and its own record —
which is a better trigger than building the apparatus now against a problem
nobody has had.

**O2 — Is coverage tracked?** §7 says no, and gives the reason that the figure
would describe the architecture rather than the code's health. *Recommended
default:* keep §7. Note that reversing it is cheap in tooling terms and expensive
in a way that does not show up for months: a number on a page invites being
optimized, and the part of this project that would be easiest to optimize it
against is the Core, which is already the best-tested part.

## References

- [TypeScript Handbook — Modules Reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html),
  read 2026-08-02. Confirms that an import written `./flock.js` inside a `.ts`
  file resolves to `flock.ts`, which is what lets `bun test` run the source while
  the emitted tree carries the same specifiers — the mechanism §9 describes and
  [0009](0009-toolchain.md) §5 fixes.
- [Biome](https://biomejs.dev/), read 2026-08-02. Cited in *Alternatives* only as
  the tool a lint-based purity check would have used; no claim is made here about
  which rules it provides.

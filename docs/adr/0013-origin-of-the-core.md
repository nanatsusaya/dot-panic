# 0013 — Origin of the core

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#12](https://github.com/nanatsusaya/dot-panic/issues/12)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (a reader of this
  repository is the audience), §6 (failure, ranked) ·
  [0002](0002-overall-architecture.md) §2 (three parts, and how the Core finds
  neighbors is internal to it), §3 (purity as a list), §4 (determinism, and the
  seed), §5 (no domain logic outside the Core) ·
  [0003](0003-security-and-privacy-by-design.md) §2 (nothing loads off this
  origin), §5 (no request after the page has loaded) ·
  [0004](0004-compliance-accessibility-and-rights.md) §12 (the model is
  reimplemented and no third-party source is copied) ·
  [0006](0006-motion-rules.md) §1 (Reynolds' three behaviors, over a radius), §2
  (non-overlap after the step), §3 (the speed band), §6 (the edge is a turning
  force) · [0009](0009-toolchain.md) §3 (one `.js` beside each `.ts`, no
  bundler), §5 (an import names the emitted file), §7 (every dependency is a
  development dependency, and all three are named) ·
  [0010](0010-testing-strategy.md) §4 (a test reads the Core's source), §7 (90
  percent over the Core) ·
  [0012](0012-how-software-gets-developed.md) §4 (test-driven in the Core,
  without exception)
- **Supersedes:** nothing

## Context

The question is where the flock's rules come from: written in this repository, or
taken from an existing package. [#12](https://github.com/nanatsusaya/dot-panic/issues/12)
has carried it since 2026-08-01, and it was placed last in the set on purpose —
*once 0002 fixes the architecture, this question is largely answered by it.*

**Fourteen records are accepted and no line of code exists.** The Core does not
exist either: 0002 fixed what one is, 0006 fixed what it does, 0009 fixed what
compiles it, 0010 fixed what tests it, and 0012 fixed how it gets written. This
record arrives after all of them, which is the whole of its difficulty — the
answer is not open in the way the ticket assumed when it was filed.

The ticket says what to do about that: *"If 0002 already makes this decision
inevitable, say so and record it as a consequence rather than pretending it was
open."* It is inevitable, and it is not 0002 alone. Four records close it
jointly, and none of them was written with this question in mind.

**A first attempt at this was written as ADR 0001 and closed unmerged in
[#2](https://github.com/nanatsusaya/dot-panic/pull/2)**, because it decided a
sourcing question before anything above it existed. This record is the same
question asked in the right place.

## Decision

### 1. The Core is written in this repository

Every rule of the simulation is written here, from the published description
0004 §12 and 0006 §1 already fix as its source. No third-party implementation of
flocking, or of any part of the Core, enters this repository.

### 2. *Taken from a package* had three routes, and accepted records had closed all three

A package reaches a browser one of three ways, and each was decided before this
record was written:

| Route | What closes it |
|---|---|
| Installed and imported at runtime | 0003 §2 and §5. 0009 §7 states it: a runtime dependency is impossible, and that is *"a description of what accepted records already force, not a new rule"* |
| Installed and bundled into the output | 0009 §3 — one `.js` beside each `.ts`, no bundler — and §5, where an import names an emitted file that §3 says will be there |
| Copied into `core/` | Nothing structural. This is the one that was still open, and §3 decides it |

So the option this record was written to weigh had already shrunk to **copying
source into the repository** before it began. That is worth stating plainly,
because *taken from a package* sounds like the ordinary thing every project does
and here it is not available.

### 3. Copying source in is closed by 0012 §4, and by nothing softer

**Every rule of the simulation is written as a failing test before it is written
as code, without exception.** Code that arrives already written was not, and no
reading of §4 makes it so. Copying source into `core/` therefore costs an
amendment to 0012, and the thing that amendment would buy is precisely the step
§4 exists to stop anyone skipping.

**0010 §7 removes most of what it would have bought anyway.** The coverage floor
is 90 percent over the Core, and copied code sits in the denominator — so the
tests have to be written regardless, only now against code nobody here reasoned
through, and after the fact rather than before. What is saved is the typing.
What is lost is the understanding, which is the part 0001 §2 says this project
exists to put on display.

**0004 §12 is the second record it would cost.** It says the model is read from
the published paper and reimplemented, *"no third-party source is copied"*, and
hands only the *license* question forward to this record. Copying source in
falsifies that sentence rather than answering the question it forwarded, so the
route needs an amendment there too — the route 0005 R2 fixed for loosening an
accepted rule, not a reading of one.

### 4. The survey in #12 is not evidence, and this record does not use it as any

The ticket carries four npm packages, metadata re-read from the registry on
2026-08-02:

| Package | Latest | Published | Runtime deps |
|---|---|---|---|
| `boids` | 2.0.0 | 2016-04-04 | 1 — `inherits` |
| `boids-canvas` | 1.1.1 | 2016-01-25 | 0 |
| `boids-ts` | 0.0.0 | 2018-10-11 | 4 — `express`, `body-parser`, `gl-vec2`, `random-seed` |
| `@individual11/boidsjs` | 0.1.3 | 2026-02-24 | 0 |

All four are MIT. **No package's source has been read**, so nothing about what
any of them contains is asserted anywhere in this project, and the ticket's
older claim that none of them addresses 0006 §2, §3 and §6 is an expectation
rather than a finding.

**It does not matter, and that is the point.** §2 and §3 close every route on
grounds that have nothing to do with what the code inside a package is like. A
survey can only answer *which one*, and there is no route on which that question
is reached. It is recorded here so that a later session does not run it again.

### 5. This is about code, not about published algorithms

The rule is that no one else's **source** is copied. It is not that the Core may
only contain things invented here, and 0004 §12 already draws the line in that
place: the model is Reynolds', read from the paper, and § 69a Abs. 2 UrhG is why
that is untroubled.

**The same applies to the one other published algorithm the Core needs.** 0002 §4
has the Core derive a pseudorandom generator from a seed, and a named generator
is a published description exactly as Reynolds' behaviors are. Taking the
algorithm is fine; taking a file is what §1 forbids. 0002 §2 puts neighbor
search in the same position: how the Core finds a dot's neighbors is internal to
it, and a uniform grid is a described algorithm rather than a package.

### 6. It governs everything that enters the Core, not only the flocking rules

§2's routes are about code, not about boids, so they close in the same way for
anything else the Core turns out to need. **Whatever enters `core/` is written
here**, and a later session finding a hard sub-problem — a spatial index, a
vector helper — does not get to re-run this analysis and reach a different
answer.

**The Shell and the View need no rule of their own.** 0003 §2 and §5 and 0009 §3
close the same routes for every file that reaches the browser; the Core is only
where the question happened to be asked. Stated as a consequence of those
records rather than decided here, on 0009 §7's precedent.

### 7. What is asserted, and what nothing decides

0010 §1's registers, applied to this record:

- **Asserted.** Nothing new. 0009 §7's three development dependencies are what a
  reviewer checks a manifest against, and 0010 §4's purity test reads the Core's
  source for a different reason.
- **Measured.** Nothing.
- **Neither.** **Provenance.** No command can tell code written here from code
  copied in, and none is proposed. This record is held by a person remembering,
  which is the class 0011 §6 has been shrinking — it named three, closed one, and
  this adds a fourth.

Said out loud rather than left to be discovered, and it is
[#83](https://github.com/nanatsusaya/dot-panic/issues/83)'s to decide who
re-reads it.

## Consequences

**Positive**

- **The Core is understood by whoever maintains it.** 0001 §2 makes a reader of
  this repository the audience the project exists for, and code written from a
  paper by the person who has to explain it is what that audience opens the page
  to see.
- **There is no supply chain in the shipped page at all**, so 0003's guarantees
  need no vetting of anyone else's code — they follow from there being none.
- **Two records are not amended.** 0012 §4 and 0004 §12 stand exactly as
  written, and 0012 §1 was amended on the day this record was drafted — a second
  amendment to the same record in the same week would be the shape of a rule
  being worked around rather than followed.
- **The question stops being asked.** §6 answers it for every later part of the
  Core, so the four closed routes are analyzed once.

**Negative**

- **Reynolds' behaviors have to be written from a description, and that is real
  work with real ways to be subtly wrong.** A package would have been faster to
  something on a screen, and 0001 §6.2 — *the toy is never finished because the
  process ate the work* — is the failure this project is most exposed to.
  Fourteen records in, this record makes the remaining path longer rather than
  shorter, and it does so knowingly.
- **This record decides less than its title suggests.** A reader can fairly say
  four earlier records had already answered it, and they would be right. It is
  written anyway because a joint consequence of four records has no home, and a
  later session would otherwise rediscover the routes — or, worse, not notice
  them and install something.
- **A fourth rule now depends on a person remembering**, in a project that had
  been closing them one at a time.
- **A genuinely hard sub-problem is closed to a proven implementation.** §6 is
  the right generalization and its cost falls later, on whoever writes the
  spatial index that 0008's grid needs.

## Alternatives considered

- **Take `@individual11/boidsjs`** — the only one still maintained, zero
  dependencies, MIT. Rejected because no route puts it in the browser, and the
  one remaining route costs amendments to 0012 §4 and 0004 §12.
- **Copy a package in and write characterization tests afterward.** Rejected
  because 0012 §4 admits no exception, and A1 amended that record on the day
  this one was drafted.
- **Decide only the flocking rules and leave later Core additions open.**
  Rejected because §2's argument is about routes rather than about boids, so the
  same analysis would be run again and could come out differently for no reason
  the records support.
- **Write no record and let 0002, 0003, 0009 and 0012 speak for themselves.**
  Rejected because a consequence spread across four records is one nobody reads
  as a rule, and CLAUDE.md's test is exactly this: anything a later change could
  silently reverse gets written down.
- **Read the four packages' source before deciding.** Rejected because it would
  change nothing — and, under O1, it may be the thing this project should not
  do.

## Open questions

**O1 — May a third-party implementation be read while ours is written?** 0004
§12 forbids *copying*, and says nothing about reading. The two available rules
are a clean-room one — the published description only, no implementation opened
— and a permissive one, where reading is allowed, nothing is copied, and any
implementation actually consulted is named in the ticket that produced the code.
Nothing can check either.

*Recommended default:* the permissive rule. A prohibition nothing can check
becomes folklore by the third session, and naming what was consulted at least
leaves a record. The argument the other way is that this project is a worked
example whose output is meant to be defensible, and *nobody opened anyone's
code* is a stronger sentence than *we wrote down what we looked at*. This is
legal posture, so it is not the author's.

## References

- npm registry, read 2026-08-02: <https://registry.npmjs.org/boids> ·
  <https://registry.npmjs.org/boids-canvas> ·
  <https://registry.npmjs.org/boids-ts> ·
  <https://registry.npmjs.org/@individual11%2Fboidsjs>
- The provenance of the model and its legal reading are
  [0004](0004-compliance-accessibility-and-rights.md) §12 and §13, which cite
  § 69a UrhG at the provision they rest on. Not restated here.

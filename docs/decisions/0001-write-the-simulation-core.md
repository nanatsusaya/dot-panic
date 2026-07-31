# 0001 — Write the simulation core rather than take a package

Status: Proposed
Date: 2026-07-31
Decided by: Daniel Wagner
Depends on: nothing — this is the first decision
Supersedes: nothing

## Context

The toy needs a flock: dots that move together, stay inside a bounded frame,
never come to rest, never overlap, and move away from the pointer. The
underlying model is Reynolds' 1987 boids — separation, alignment, cohesion —
which is public, well documented and roughly a hundred lines of arithmetic.

Several npm packages implement it. Four were examined, all MIT licensed:

| Package | Latest | Published | Runtime deps |
|---|---|---|---|
| `boids` | 2.0.0 | 2016-04-04 | 1 |
| `boids-canvas` | 1.1.1 | 2016-01-25 | 0 |
| `boids-ts` | 0.0.0 | 2018-10-11 | 5 |
| `@individual11/boidsjs` | 0.1.3 | 2026-02-24 | 0 |

What is genuinely open is not whether a package *could* draw a flock. It is
whether this project's three motion requirements are the kind of thing a
general boids library provides. They are not:

- **Never at rest.** The three classic forces can cancel. Keeping a dot moving
  needs a speed floor, not only the usual ceiling.
- **Never overlapping.** Separation is a steering force. It biases dots apart
  and guarantees nothing. Non-overlap is a positional constraint applied after
  integration, which is a different mechanism.
- **A bounded frame.** Most implementations wrap around a torus, because a
  torus removes the edge case rather than solving it.

There is a second force. This repository exists to show a method, and the
method's sharpest claim is that a passing test suite proves little about
anything visual. That claim needs a core whose rules we wrote and can state.
A dependency would move the interesting part outside the repository and leave
the tests asserting that someone else's library still behaves as it did.

## Decision

### 1. The simulation core is written in this repository

No flocking library is taken as a dependency. The three Reynolds forces, the
speed floor, the boundary behavior and the non-overlap constraint are all
implemented here.

### 2. Nothing that ships to the browser has a runtime dependency

Every import in the shipped source resolves to a file inside this repository.
This is checkable: a command can read the shipped modules and fail on any
import that does not resolve locally.

### 3. The core is pure

The core takes state and returns state. It does not read the DOM, does not read
a clock, and does not call a random generator it was not handed — a seed is
passed in, so the same seed produces the same run.

This is checkable too, and deliberately phrased so: the core's source contains
no occurrence of `document`, `window`, `performance`, `Date` or `Math.random`.
A rule phrased as "keep the core pure" becomes folklore; this one fails a
command.

## Consequences

**Positive.**

- The motion rules are ours to state, which is what makes decision 0002
  possible at all.
- Determinism from a passed-in seed makes the core testable without a browser
  and makes a visual bug reproducible.
- The purity rule in section 3 is a check rather than an intention.

**Negative, and these are real.**

- **We will write bugs that a ten-year-old library has already had reported and
  fixed.** Flocking has well-known numerical traps — force explosion at small
  distances, jitter from an overly stiff separation term. We will meet them
  ourselves.
- **It is more work than `npm install`,** and the work is not the interesting
  part of the project.
- **Section 2 forbids a rendering library too,** and it does so as a side
  effect rather than by anyone weighing rendering specifically. If canvas work
  later turns out to want a helper, this decision has to be superseded rather
  than quietly bent.
- **Section 3 constrains decision 0006:** whatever runs the tests must be able
  to import a plain module with no build step, or one of the two decisions
  gives way.

## Alternatives considered

- **`@individual11/boidsjs`** — the only currently maintained option, zero
  dependencies. Rejected because it is pre-1.0, and because taking it would put
  the part of the project the method is meant to illuminate behind an API we do
  not control.
- **`boids`** — the most used. Rejected because it was last published in 2016
  and carries a dependency, and because it does not address any of the three
  requirements above.
- **`boids-canvas`** — rejected because it couples simulation to canvas
  rendering, which makes the pure core in section 3 impossible.
- **`boids-ts`** — rejected because it stands at version 0.0.0 with five
  dependencies and was last published in 2018.
- **Copy a package's source into the repository instead of depending on it.**
  Rejected because it takes on the maintenance without the provenance: the code
  arrives with no history, and the next session cannot tell which parts were
  chosen and which were inherited.

## Open questions

**O1 — Is package metadata enough to reject all four?**
Publication dates, dependency counts and stated scope were read; **no
package's source code was read.** The rejection rests on requirements rather
than on code quality.
*Recommended default: yes, enough.* The three requirements decide this, and
none of the four claims to address them. Reading source would refine an answer
we already have.

**O2 — Does "no dependencies" bind development tooling as well?**
Section 2 covers only what ships to the browser. Whether a test runner, a
formatter or a linter may be installed is a separate question and belongs to
decision 0006.
*Recommended default: no, this decision does not bind tooling.* Shipping a
dependency to a user and installing one to test locally have different costs,
and conflating them would decide 0006 here by accident.

## References

- Boids, Craig Reynolds — <https://www.red3d.com/cwr/boids/>. The model, and
  the SIGGRAPH '87 paper it comes from.
- Package metadata read from the npm registry on 2026-07-31:
  <https://registry.npmjs.org/boids>,
  <https://registry.npmjs.org/boids-canvas>,
  <https://registry.npmjs.org/boids-ts>,
  <https://registry.npmjs.org/@individual11%2fboidsjs>

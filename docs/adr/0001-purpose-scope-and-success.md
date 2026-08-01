# 0001 — Purpose, scope and success

- **Status:** Accepted
- **Date:** 2026-08-01
- **Deciders:** Daniel Wagner
- **Ticket:** [#5](https://github.com/nanatsusaya/dot-panic/issues/5)
- **Depends on:** nothing. This is the first record, and every other one is
  scoped against what it fixes here.
- **Supersedes:** nothing

## Context

The repository describes the toy in its README. A description is not a
decision: the next session cannot tell a stated goal from an assumed one, and
neither can a reviewer deciding whether a change moves toward the goal.

**Repository state at the time of writing.** No code, no runtime, no test
runner, no rendering, no deployment. Twelve decisions are planned and none is
written. This record is written against a blank slate on purpose: it is meant
to constrain what gets built, which it cannot do after the fact.

## Decision

### 1. What this is

A web page showing a flock of dots that moves as a group, never comes to rest,
and moves out of the way when the visitor's pointer approaches.

It is a toy: no goal, no score, no ending.

### 2. This is an example project

dot-panic exists to demonstrate agent-driven-development. **The priority is the
documentation and a well-written implementation; the product itself is
secondary.**

Stated so that later work does not have to rediscover it. Where effort is
limited, it goes to recording the work and to writing the code well, not to
making the page do more.

### 3. What good enough means

1. **It reads as a flock**, not as independent particles that happen to share a
   screen. Judged by watching. No command decides this, now or later.
2. **It responds to the pointer without perceptible lag.**
3. **Motion is continuous** — no dot at rest, no visible stutter in ordinary
   use.
4. **Feature floor: Baseline "widely available".** Only web features that
   reached Baseline widely available may be used — 30 months of support across
   Chrome (desktop and Android), Edge, Firefox (desktop and Android) and Safari
   (macOS and iOS).
5. **Performance floor: a mid-range phone roughly three years old**, not only
   the machine it was built on.

Conditions 4 and 5 measure different things and are both needed. Baseline says
which APIs may be used; it says nothing about how fast the device is. A phone
from 2022 running a current browser satisfies 4 and can still fail 5.

Condition 1 is the one the whole project is arranged around, and it is the one
nothing can verify. That is the point rather than a gap.

### 4. What the page contains

The flock, an imprint, and a short explanation of what the page is.

### 5. Explicitly out of scope

- A goal, a score, a win or lose condition
- Accounts, or anything remembered between visits
- Sound
- More than one scene
- Any packaging beyond a web page

Adding any of these requires superseding this record rather than extending it.

### 6. Failure, ranked

Ranked, because the ordering tells a later trade-off which way to fall:

1. **The documentation is poor**, and a reader learns nothing about the method
   from it.
2. **The toy is never finished** because the process ate the work.
3. **It passes its checks and looks wrong on screen.**
4. **It works only on the machine it was built on.**

## Consequences

**Positive.**

- Decision 0008 has something to turn into numbers without also having to
  choose the goal.
- Section 2 removes a recurring question — how much effort the toy deserves
  against the documentation — from every later session.
- The out-of-scope list names superseding as the price of changing it, so
  nothing on it arrives by drift.

**Negative, and these are real.**

- **Section 2 makes it easy to justify a thin product.** "The documentation is
  good" will at some point be offered as a reason not to finish something, and
  that is failure 6.2. Section 3 is the floor: the conditions there hold
  regardless of how good the records are.
- **Condition 3.1 leans entirely on watching**, which is not repeatable between
  two people, or by one person across two days.
- **Condition 3.4 rules out anything newer than Baseline widely available**,
  including features that would be well supported in practice. That is the cost
  of a rule a command can decide.
- **Section 4 commits to an imprint and an explanation**, which is page surface
  that has nothing to do with the flock and still has to be built and
  maintained.

## Alternatives considered

- **Make it a game — a goal, a score, a win condition.** Rejected because it
  changes the question the project answers from *how was this built* to *is
  this fun*, and the second consumes the first.
- **Set the feature floor by naming browser versions directly.** Rejected
  because a version list is stale the month it is written, while Baseline is
  maintained externally and moves on its own.
- **Set only a feature floor and leave performance to 0008.** Rejected because
  0008 would then be choosing the target device as well as the budget.
- **State no out-of-scope list.** Rejected because the items on it are exactly
  the ones that arrive one at a time, each individually reasonable.

## Resolved questions

**R1 — The device and feature floors.** Both, as two separate conditions.
Baseline "widely available" fixes which web features may be used; a mid-range
phone roughly three years old fixes the performance target. They measure
different things, and either alone leaves a real gap. *How* the feature floor
is expressed in tooling belongs to decision 0009, not here.

**R2 — Whose interests this project serves.** The earlier draft weighed a
visitor against a reader of the repository and gave the reader priority. That
framing was dropped: it invented a conflict that does not occur. dot-panic is an
example project for the method, the documentation and a well-written
implementation come first, and the product is secondary. Section 2 says that
plainly instead.

**R3 — A settings surface on the page.** Not decided here. The earlier draft
ruled it out in the out-of-scope list; that was settling a question nothing had
raised, at a point when no record existed to reason from. It is removed from
section 5 and left open for its own record if it ever becomes a real question.

## References

- [Baseline](https://web.dev/baseline) — the feature floor in condition 3.4.
  Read 2026-08-01.
- [`README.md`](../../README.md) — the informal description this record makes
  binding.
- [`docs/adr/README.md`](README.md) — the planned set and the order it is
  written in.

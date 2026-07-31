# 0001 — Purpose, scope and success

- **Status:** Proposed
- **Date:** 2026-08-01
- **Deciders:** Daniel Wagner
- **Ticket:** [#5](https://github.com/nanatsusaya/dot-panic/issues/5)
- **Depends on:** nothing. This is the first record, and every other one is
  scoped against what it fixes here.
- **Supersedes:** nothing

## Context

The repository describes the toy in its README. A description is not a
decision: the next session cannot tell a stated goal from an assumed one, and
neither can a reviewer deciding whether a change moves toward the goal — which
is half of what the review boundary is for.

Two questions in particular have been answered informally in conversation and
never written down. Who this is actually for, and what would make it finished.
Both will be needed the first time a trade-off has to fall one way.

**Repository state at the time of writing.** No code, no runtime, no test
runner, no rendering, no deployment. Twelve decisions are planned and none is
written. This record is written against a blank slate on purpose: it is meant
to constrain what gets built, which it cannot do after the fact.

## Decision

### 1. What this is

A web page showing a flock of dots that moves as a group, never comes to rest,
and moves out of the way when the visitor's pointer approaches.

That is the whole product. It is a toy, not a game: there is no goal, no score
and no ending.

### 2. Two audiences, and which one wins

- **The visitor** opens the page and gets a few seconds of something that
  looks alive.
- **The reader of the repository** is deciding whether the method used to build
  it is worth adopting, and reads the decisions, the tickets and the history to
  find out.

**Where the two conflict, the reader wins.** A choice that would make the page
better and the record of how it was built worse is decided against.

This is a real ordering and not a diplomatic one. The page has no users to
disappoint; the example has a job.

### 3. What good enough means

Four conditions. None of them is a number, and none contradicts a number that
decision 0008 might set:

1. **It reads as a flock**, not as independent particles that happen to share a
   screen. Judged by watching. No command decides this, now or later.
2. **It responds to the pointer without perceptible lag.**
3. **Motion is continuous** — no dot at rest, no visible stutter in ordinary
   use.
4. **It works on a mid-range phone roughly three years old**, not only on the
   machine it was built on.

Condition 1 is the one the whole project is arranged around, and it is the one
nothing can verify. That is the point rather than a gap.

### 4. Explicitly out of scope

None of the following is built, and adding any of them requires superseding
this record rather than extending it:

- A goal, a score, a win or lose condition
- Any settings surface — sliders, parameter panels, a control UI
- Accounts, persistence, leaderboards, anything remembered between visits
- Sound
- More than one scene
- Any packaging beyond a web page

### 5. Failure, ranked

Ranked, because the ordering is what tells a later trade-off which way to fall:

1. **The artifacts read as bureaucracy**, and a reader concludes the method is
   unusable at this size.
2. **The toy is never finished** because the process ate the work.
3. **It passes its checks and looks wrong on screen.**
4. **It works only on the machine it was built on.**

## Consequences

**Positive.**

- Decision 0008 has something to turn into numbers without also having to
  choose the goal.
- The out-of-scope list has teeth: each item names superseding as the price of
  changing it, so nothing on it can be added by drift.
- The audience ordering in section 2 settles a whole class of future ties
  without another decision.

**Negative, and these are real.**

- **Section 2 will at some point produce a worse page than we could have
  built**, and nobody will be able to point at the moment it happened. The rule
  is only useful because it applies before the trade-off is visible.
- **Ranking "reads as bureaucracy" above "looks wrong on screen" will feel
  wrong** the first time polish is skipped to keep a document short. It is
  deliberate, and it is the ordering most likely to be regretted.
- **Ruling out a settings surface forecloses the cheapest fix** if the flock
  turns out dull to watch. We have decided in advance not to solve that problem
  that way.
- **Condition 3.1 leans entirely on watching**, which is not repeatable between
  two people and not repeatable by one person across two days.

## Alternatives considered

- **Make it a game — a goal, a score, a win condition.** Rejected because it
  changes the question the project answers from *how was this built* to *is
  this fun*, and the second consumes the first.
- **Serve only the repository reader; treat the page as a fixture.** Rejected
  because a demonstration that is unpleasant to look at is evidence that the
  method produces dead things.
- **Serve only the visitor; treat the method work as overhead.** Rejected
  because then it is overhead.
- **Leave "good enough" to decision 0008 entirely.** Rejected because 0008
  would then be choosing the goal as well as the budget, and a budget that also
  sets the goal cannot be argued with.
- **State no out-of-scope list.** Rejected because the features listed there
  are exactly the ones that arrive one at a time, each individually reasonable.

## Open questions

**O1 — Is a mid-range phone about three years old the right floor?**
Condition 3.4 sets the weakest device the toy has to work on. A lower floor
costs work in decision 0008; a higher one narrows who can open the page.
*Recommended default: keep it, and test on a real device rather than a
throttled desktop browser.* A simulated slow machine has different
characteristics than a real one, and the difference lands exactly on animation.

**O2 — Is the audience ordering in section 2 right?**
Reader over visitor. The reverse is defensible: a demonstration nobody enjoys
looking at persuades nobody.
*Recommended default: keep reader first.* The toy has no users; the example
has a purpose. But this is the record's most consequential sentence and it
should be chosen deliberately rather than accepted by default.

**O3 — Is ruling out a settings surface too strict?**
A parameter panel would let a visitor find the interesting configuration
themselves, and would be cheap.
*Recommended default: keep it out.* It is surface area no check can hold, and
it converts "we chose good values" into "the visitor can fix it".

## References

- [`README.md`](../../README.md) — the informal description this record makes
  binding.
- [`docs/decisions/README.md`](README.md) — the planned set and the order it is
  written in.

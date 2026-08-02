# 0012 — How software gets developed here

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#24](https://github.com/nanatsusaya/dot-panic/issues/24)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (documentation and
  a well-written implementation come before the product), §3.1 (a flock is
  judged by watching), §6 (the ranked failures) ·
  [0002](0002-overall-architecture.md) §2 (the Core is exercisable without a
  screen, the View is not), §3 (purity), §5 (no domain logic outside the Core)
- **Supersedes:** nothing. It takes the number 0012, which the index had
  reserved as unused; see *Alternatives considered*.

## Context

agent-driven-development says how to work **with agents**. It does not say how
to develop software, and that is deliberate rather than missing: its rule
catalog admits a rule only if it holds independently of domain — for a
software product as much as for a knowledge base with no code in it — and sends
everything domain-specific to the adopting project's own layer.

**This project never filled that layer.** Nothing here says whether work is
iterative or done in one pass, whether tests come first, or what a unit of work
is.

That is not the same as having no method. In practice the work is already
incremental and trunk-based, one concern per change, criteria fixed before a
task starts, decisions written before code. What is missing is that none of it
is recorded as a *choice*, and a practice nobody chose is one a later session
reverses without noticing there was anything to reverse.

It matters more here than it would elsewhere. If the method is
domain-independent and the bridge to software development belongs to the
project layer, then **that bridge is the thing this repository can show that the
method repository cannot.** Without it the example demonstrates half of what it
claims to.

**Repository state at the time of writing.** Two records accepted, no code, no
toolchain, no directories. Nothing has been built under any method at all, so
this record constrains work that does not exist yet — which is the only moment
it can.

## Decision

### 1. Two phases, and the first one has no end condition

**Analysis.** Decision records are written until the decider judges that enough
is decided. **Then delivery**, in increments.

There is deliberately **no time box and no completion criterion** on the
analysis phase. Daniel judges when it is too much.

Stated as a decision rather than left blank, because the absence would otherwise
read as an oversight and the next session would invent a criterion. The cost is
named in *Consequences* rather than argued away.

The phases do not overlap in scope: during delivery, a ticket that would settle
something a still-open record owns is not ready, which is the existing rule
[D4](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#d4)
and not a new one. Work proceeds on what is decided; the rest waits.

### 2. A sprint is a bundle of tickets, and it produces one increment

**A sprint is a set of tickets brought to Definition of Ready together, worked,
and finished as one increment.** It is bounded by that set and by nothing else —
no time box, per §1.

The bundle exists for one reason, and it is not rhythm: §6 requires the tickets
worked in parallel to be *independent of each other*, and independence is a
property of a set rather than of any one ticket. Establishing it is an activity,
and an activity needs a moment to happen in. That moment is the start of a
sprint.

**An increment is finished, verified, and leaves the page deployable** — it
loads, something works, and nothing half-built is visible.

It does **not** mean a feature is complete. The first increment cannot be a
flock: 0001 §3.1 describes an end state, not a first step. The first increment
is the walking skeleton in
[#13](https://github.com/nanatsusaya/dot-panic/issues/13) — something visible
moving at the public URL — and that ticket is a consequence of this record
rather than a loose piece of work.

### 3. The criterion comes before the work — test-first is one form of that

The principle is **not** "write a test first". It is that what would make the
work correct is fixed before the work starts, which
[W1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#w1)
already requires of a task. This record decides what that looks like in code,
and it takes two forms because 0002 §2 split the system into a part a command
can decide and a part only an eye can.

### 4. Test-driven development, in the Core, without exception

Every rule of the simulation is written as a failing test before it is written
as code.

This is possible only because 0002 made it possible: the Core is pure (§3) and
exercisable without a screen (§2), so a test needs no browser, no clock and no
display. Test-first in the Core costs nothing that the architecture was not
already paying for.

### 5. Watch-first, in the View, because test-first cannot apply there

The View may not be developed test-first, and no amount of discipline changes
that: 0001 §3.1 fixes that *it reads as a flock* is judged by watching and no
command will ever decide it.

What takes its place is the same discipline with a different instrument. **The
expected picture is written into the ticket before the work starts** — the
`Watched and seen:` line the ticket template already carries — and the work is
verified by looking at it against what was written. A criterion recorded
afterward is a description of what happened, not a test of it.

The Shell is verified by the increment running at all. It holds no domain logic
(0002 §5), so there is little in it a unit test could assert that the increment
does not.

### 6. Parallel work is allowed on independent tickets

Two tickets may be worked at the same time when they are **independent**: they
touch no file in common, and neither one's criteria depend on the other's
result.

Independence is a property of the tickets, so it is settled when they are
brought to Definition of Ready — at the start of a sprint (§2), before any agent
starts, and not discovered by a merge conflict afterward.

**At most three changes may be open for review at once.** The limit is not the
number of agents: it exists because
[G1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#g1)
sends every change through one human, and
[G3](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#g3)
warns that a reviewer facing more than they can read stops being the gate
without noticing — by approving, not by refusing. A number can be counted; the
judgment it replaces is the thing that fails.

### 7. The vocabulary, and what is deliberately not borrowed

Borrowed, because each names something that exists here: **Definition of Ready**
and **Definition of Done** (both already written down), **increment**, and
**sprint** (both §2).

Not borrowed: daily stand-up, retrospective, velocity, story points, product
owner, scrum master. Each solves a coordination problem among several people.
Importing them into a one-person project costs the ceremony and buys none of the
coordination — and produces failure 1 in 0001 §6, where a reader concludes the
method is unusable at this size.

**Sprint is borrowed narrowly and means less here than in Scrum.** It is a
bundle of tickets, not a time box, and it carries no commitment, no planning
meeting and no review event. Borrowing the word for a smaller thing is a real
cost — a reader who knows Scrum will assume the rest of it — which is why this
paragraph exists rather than the word standing alone.

## Consequences

**Positive.**

- The practice the project already follows becomes reversible only on purpose.
- §4 and §5 give 0010 its shape in advance: the boundary between what is
  asserted and what is watched is already drawn by 0002, and this record says
  what each one costs the person doing the work.
- §2 turns #13 from a ticket nobody scheduled into the first thing delivery
  produces.
- §6 makes parallel agents a property of how tickets are cut rather than a
  question asked when two changes collide.

**Negative, and these are real.**

- **§1 accepts the failure mode that
  [A3](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a3)
  names explicitly:** a decision phase with no end condition is how a project
  accumulates impressive documentation and builds nothing. This project is more
  exposed than most, because every further record *feels* like progress here in
  a way it would not elsewhere. Two records are accepted and no line of code
  exists. The judgment replacing the criterion is one person's, and nothing will
  contradict it.
- **§4 is a bet that the Core stays pure.** Test-first in the Core is cheap only
  while 0002 §3 holds. The first time something needs a clock or a real random
  source, the cost of this record rises sharply — and the pressure will be to
  quietly weaken 0002 rather than to supersede it.
- **§5 is not enforceable.** Nothing checks that the expected picture was
  written before the work rather than after, and the difference is invisible in
  the result. It is the weakest rule here and the one that carries the most.
- **§6 shifts effort to ticket-writing.** Independence has to be established
  before work starts, which makes bringing tickets to Ready more expensive than
  it is today, for a benefit that only appears when more than one agent runs.

## Alternatives considered

- **Say nothing and keep working as we do.** Rejected because an unwritten
  practice cannot be reversed on purpose — [D1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#d1)'s
  test, applied to "tests come first", plainly fails.
- **Put this in the operating rules instead of a record.** Rejected because the
  method log already records what that produces: a convention written into
  CLAUDE.md reads to every later session as established, which is where
  pre-emption becomes invisible. CLAUDE.md may point here; it may not decide
  this.
- **Fold it into 0010 (testing strategy).** Rejected because "what is a unit of
  work" and "when does analysis end" have no home in a record about testing, and
  splitting the practice across two records would put half of it behind a
  decision that is still Planned.
- **Take the number 0014.** Rejected by the decider: a record deciding how the
  project develops software, placed last in a list the index describes as
  running top-down, would be filed where nobody looks. 0012 was free — planned
  as a walking-skeleton record and dropped unwritten — and the index's reason
  against reuse does not apply, since §2 makes the walking skeleton a
  consequence of this record rather than something unrelated. Recorded in the
  method log, because a rule set aside deliberately must be distinguishable from
  one nobody follows.
- **A fixed-length time box for cycles.** Rejected by the decider under §1: a
  time box on a project with no fixed hours measures nothing.

## Resolved questions

**R1 — A cycle is a named bundle of tickets, and the word is *sprint*.** The
alternative was continuous flow, with an increment declared whenever the page is
deployable again. The bundle wins, but not for the usual reason: a one-person
project has no use for rhythm, and rhythm is most of what a sprint is for
elsewhere. It wins because §6 requires independence to be established across a
*set* of tickets, which is an activity and therefore needs a moment to happen
in. §2 states the bundle; §7 records that the word is borrowed for something
smaller than Scrum means by it, and what that costs.

**R2 — At most three changes may be open for review at once.** Any number here
is arbitrary; the point is that it can be counted, and the judgment it replaces
is precisely the one G3 says fails silently. Three is more than one agent's
worth of work and still small enough to read in a sitting. It is a starting
value, not a finding — raising it is a change to this record like any other, and
should be made on evidence about how long a review here actually takes rather
than on how it feels during a busy session.

## References

- [The rule catalog](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md),
  agent-driven-development — the preamble on domain independence, and W1, D1,
  D4, G1, G3, A3. Read 2026-08-02.
- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success. Read
  2026-08-02.
- [0002](0002-overall-architecture.md) — the boundary between what a command can
  decide and what only an eye can. Read 2026-08-02.
- [Ticket #24](https://github.com/nanatsusaya/dot-panic/issues/24) — the scope
  this record is written against. Read 2026-08-02.

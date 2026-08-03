# 0012 — How software gets developed here

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#24](https://github.com/nanatsusaya/dot-panic/issues/24)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (documentation and
  a well-written implementation come before the product), §3 (what good enough
  means, and therefore where §1's delivery phase ends), §3.1 (a flock is
  judged by watching), §6 (the ranked failures) ·
  [0002](0002-overall-architecture.md) §2 (the Core is exercisable without a
  screen, the View is not), §3 (purity), §5 (no domain logic outside the Core)
- **Supersedes:** nothing. It takes the number 0012, which the index had
  reserved as unused; see *Alternatives considered*.
- **Amended:** 2026-08-02 — A1 · 2026-08-03 — A2

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

### 1. Seven phases, and the analysis phase has no end condition

| | Phase | What it is |
|---|---|---|
| 1 | Adoption | The goal is fixed and agent-driven-development is adopted. |
| 2 | Analysis | Decision records are written until the decider judges that enough is decided. |
| 3 | Breakdown | The epics visible in the accepted records are cut into tickets. *Epic* is §7's. |
| 4 | First increment | One sprint (§2), producing the walking skeleton. |
| 5 | Delivery | Sprint after sprint, until 0001 §3 is satisfied. |
| 6 | Maintainability | Making the project maintainable for as long as it stands. |
| 7 | Maintenance | What the project is after that. |

**There is deliberately no time box and no completion criterion on the analysis
phase, and naming six phases around it gives it none.** Daniel judges when it is
too much. The list says what comes next, not when the judgment falls, and *3
follows 2* is an order rather than a trigger — a later session must not read a
record becoming Accepted as the end of a phase.

Stated as a decision rather than left blank, because the absence would otherwise
read as an oversight and the next session would invent a criterion. The cost is
named in *Consequences* rather than argued away.

The phases do not overlap in scope: during delivery, a ticket that would settle
something a still-open record owns is not ready, which is the existing rule
[D4](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#d4)
and not a new one. Work proceeds on what is decided; the rest waits.

**Phases 1 and 2 are named for the arc rather than because anything hangs on
them.** Phase 1 is history: it produced 0001 and the adapted procedures, and
nothing in this project turns on it having a number.

**Phase 3 does not move the activity §6 puts at the start of every sprint.** It
cuts the visible work into epics and tickets once. Establishing that a particular
set of tickets is *independent* still happens when that set is brought to
Definition of Ready, every time, and phase 3 is not that.

**Phases 6 and 7 are named here and not decided here.** What being maintainable
requires of this project, and what the project is once delivery ends, needs a
record of its own; this section names the two phases and stops. A reader looking
for their content will not find it here.

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
and **Definition of Done** (both already written down), **increment** and
**sprint** (both §2), and **epic** (§1's phase 3).

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

**Epic is borrowed as narrowly, and it divides the same tickets along a
different axis.** An epic is a **named group of tickets that belong together as
one recognizable piece of work** — a part of the toy, or a bounded effort beside
it — and grouping by subject is the whole of it. It
carries no estimate, no commitment and no time box. It is never what a change is
made against, because a change is always against a ticket. An epic with no
tickets under it is a heading and not work. Where a sprint is a set worked
**together**, an epic is a set that belongs **together**, and a ticket is
normally in one of each.

**The cost here is larger than the one sprint carries**, and *Consequences* says
why rather than this section: a project with eight open tickets does not
obviously need a layer above them, the recommendation was against introducing
one, and A1 records what overruled it.

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
- **§1's table shows the arc in one place**, which nothing here previously did.
  0001 §2 makes the demonstration the point of this repository, and a reader who
  can see where a project of this shape goes learns something the record set
  alone did not tell them.
- **The end of the project has a name.** Nothing said what dot-panic is once
  0001 §3 is satisfied. Phases 6 and 7 say there is something, and hand it to a
  record rather than leaving delivery to trail off.

**Negative, and these are real.**

- **§1 accepts the failure mode that
  [A3](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a3)
  names explicitly:** a decision phase with no end condition is how a project
  accumulates impressive documentation and builds nothing. This project is more
  exposed than most, because every further record *feels* like progress here in
  a way it would not elsewhere. Fourteen records are accepted and no line of code
  exists. The judgment replacing the criterion is one person's, and nothing will
  contradict it.
- **Phase 3 sits exactly where 0001 §6.2 lives.** A breakdown phase between the
  records and the first increment is more planning before anything is on a
  screen, and 0011 §7 had just chosen the opposite pressure by putting the first
  deployment at the walking skeleton. Nothing here bounds how long phase 3 may
  take, for the same reason §1 bounds nothing else.
- **A layer above eight tickets is ceremony this project does not yet have work
  for**, which is what
  [A3](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a3)
  tells an adopter not to build. The cost lands on 0001 §6's *first* failure —
  a reader concluding the method is unusable at this size — and that is the
  failure this repository can least afford, since being read is what it is for.
- **Seven phases are six more things to be wrong about.** §1 was two words and is
  now a table; every row that turns out to describe the project badly costs an
  amendment rather than an edit.
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

## Amendments

**A1 — two phases become seven, and *epic* joins the vocabulary. 2026-08-02.**

§1 was headed:

> ### 1. Two phases, and the first one has no end condition

and opened:

> **Analysis.** Decision records are written until the decider judges that enough
> is decided. **Then delivery**, in increments.
>
> There is deliberately **no time box and no completion criterion** on the
> analysis phase. Daniel judges when it is too much.

The seven-phase table replaces those two paragraphs. **Nothing that section
decided is reversed.** Analysis still ends by one person's judgment and by no
criterion, delivery is still increments, and the sentence saying so is now
emphatic rather than incidental — because a list of seven numbered phases is
read as a schedule, and the phase this project has been in for its whole life is
the one that has no schedule.

The four phases 0012 already had are the same four: phase 2 is *Analysis*, phases
4 and 5 are *delivery, in increments* with §2's first increment named separately
because §2 and 0011 §7 both single it out. Phases 1, 3, 6 and 7 are new. §1's
three closing paragraphs are new and say what the table would otherwise leave a
later session to guess: that phase 1 is history, that phase 3 does not take over
the per-sprint activity §6 owns, and that phases 6 and 7 are named without being
decided.

§7's first sentence read:

> Borrowed, because each names something that exists here: **Definition of Ready**
> and **Definition of Done** (both already written down), **increment**, and
> **sprint** (both §2).

*Epic* is added to it, with a paragraph defining it as narrowly as the one
sprint already had. Three further things moved: the header gains its `Amended`
field, which it did not carry; *Depends on* now names 0001 §3, because phase 5
ends there; and *Consequences* gains two positives and three negatives. One
sentence in the existing negative was stale and is corrected with it —

> Two records are accepted and no line of code exists.

now reads *fourteen*, which is the same argument against a larger number.

**What was recommended, and what was decided instead.** Three options were put on
2026-08-02, and the recommended default in each case was the one **not** taken:
that 0012 §1 already decides the phases and STATUS need only name which one we
are in; that a backlog is a list of tickets and needs no layer above them; and,
for the end of the project, a `Planned` row rather than content here. The
arguments against were A3 — *do not build for a scale you do not have* — and
0001 §6's ranking, and they are recorded in *Consequences* rather than argued
again here. The third recommendation was accepted and is a separate change.

Authorized by Daniel on 2026-08-02, against
[#79](https://github.com/nanatsusaya/dot-panic/issues/79): *"zu O1: b, zu O2: c,
zu O3: a"* — where O1(b) was an amendment to this record extending the phases to
seven, and O2(c) was introducing the epic as a third issue label. **The label
itself is not decided here**; CLAUDE.md fixes *two labels, and no more*, and
changing that line is work that follows this record.

**A2 — an epic may group work that is not part of the toy. 2026-08-03.**

§7's definition read:

> An epic is a **named group of tickets that together deliver one
> recognizable part of the toy**, and grouping by subject is the whole of it.

It now names **one recognizable piece of work — a part of the toy, or a bounded
effort beside it**. Nothing else §7 decides changes: no estimate, no commitment,
no time box, an epic is never what a change is made against, and an epic with no
tickets under it is still a heading and not work.

**What forced it.** A meta-audit of this repository (2026-08-03, run against
`2130fb3`) produced a set of correction tickets — governance, documentation and
ticket hygiene — that belong together by subject and deliver no part of the toy.
Under the old wording the label could not carry that group, and carrying it on a
plain ticket would have been an epic in everything but name: two shapes for one
thing.

**The cost is the word widening.** The label no longer tells a reader that an
epic is product work; an epic's members have to say what they are. Named here
rather than argued away.

Authorized by Daniel on 2026-08-03, against
[#116](https://github.com/nanatsusaya/dot-panic/issues/116), choosing the
amendment route over an unlabeled tracking ticket and over an unrecorded
exception.

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

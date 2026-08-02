# 0008 — Performance budget

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#34](https://github.com/nanatsusaya/dot-panic/issues/34)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (documentation and
  a well-written implementation come first), §3.2 (no perceptible lag), §3.3 (no
  visible stutter), §3.4 (the Baseline floor), §3.5 (the floor device), §6 (the
  ranked failures) · [0002](0002-overall-architecture.md) §2 (the Shell owns the
  loop, the clock, the frame and the seed; neighbor search is internal to the
  Core and its algorithm belongs here), §3 (the purity list), §4 (determinism),
  §5 (no domain logic outside the Core), R1 (the Shell drives fixed steps), R2
  (a step returns a new world, and the allocation cost is measured here) ·
  [0005](0005-rendering-and-visual-design.md) §1 (one canvas, immediate mode),
  §2 (the dot radius is deferred here) · [0006](0006-motion-rules.md) §1 (the
  neighborhood is a circle of one radius, and its cost is this record's), §2
  (non-overlap, and the ceiling it hands here), §5 (enough worlds per second is
  this record's), §6 (the margin relation) ·
  [0007](0007-pointer-and-input-model.md) §6 (the radius of effect is a fraction
  of the frame's shorter side) ·
  [0012](0012-how-software-gets-developed.md) §4 (test-first in the Core), §5
  (watch-first where no command can decide) ·
  [0014](0014-page-layout.md) §2 (the canvas takes what the strip leaves)
- **Supersedes:** nothing

## Context

Four records have deferred a number here, and one has deferred a measurement.
[0005](0005-rendering-and-visual-design.md) §2 sends the dot radius.
[0006](0006-motion-rules.md) §1 sends the cost of the neighborhood radius, §2
sends a ceiling it says cannot be negotiated, and §5 sends *enough worlds per
second*. [0002](0002-overall-architecture.md) §2 sends how the Core finds a dot's
neighbors. And 0002 R2 says of returning a new world every step that **0008 is
where it gets measured**.

**Nothing has been measured, and nothing here measures it.** There is no code, no
toolchain, no page and no device. This record is in the same position as the four
before it, with one difference that matters: for those, numbers were a section.
Here they are the subject. What that leaves the record able to decide is O1.

**Ranked failure 4 in [0001](0001-purpose-scope-and-success.md) §6 is *it works
only on the machine it was built on*,** which is what a project with no stated
budget produces. Failure 2 — *the toy is never finished because the process ate
the work* — is what a project produces when it answers that by measuring things
that do not exist yet.

**Repository state at the time of writing.** Nine records accepted, no code, no
toolchain, no `core/` directory.

**What is not open here.** How the dots move is 0006. What a pointer means is
0007. What is drawn is 0005. What runs and measures anything is 0009, and
whether anything asserts a budget is 0010 — §9 divides the claims and creates
neither. Whether a visitor may change any of these numbers is 0015.

## Decision

### 1. The budget is one animation frame's work fitting in one animation frame

**On the floor device, the work the Shell does in response to one animation
frame — the steps that are due, plus one draw — completes before the next frame
is due.**

Stated this way because it is the only formulation that a clock decides. *No
visible stutter* (0001 §3.3) is watched; *sixty frames per second* names a
number that the display, not this record, chooses. Work fitting in its interval
is neither: it is a comparison between two times the Shell already has (§2).

**This is the quantity 0002 R2 asked for.** The allocation cost of returning a
new world every step is not measured separately — it is inside this, along with
the forces, the non-overlap passes and the draw. If the budget is missed, 0002's
*Consequences* names the route: a record superseding it, never quiet mutation.

### 2. The loop is `requestAnimationFrame`, and its callback's timestamp is the only clock

**`requestAnimationFrame` is Baseline widely available** — available 2015-07-29,
widely as of 2018-01-29, so 0001 §3.4 permits it.

Its callback receives the time as an argument. The HTML Standard defines the
callback as `callback FrameRequestCallback = undefined (DOMHighResTimeStamp
time)` and invokes it with *now*. **So the Shell needs no second time source**,
and `performance.now()` and `Date.now()` are not reached for.

That is not economy either. Two clocks are two things that have to agree, and
0002 §3 already forbids the Core to name any of them — a Shell with one time
argument flowing through it is the smallest thing that can be true.

### 3. The step rate is fixed; the draw rate is the display's

0002 R1 fixed that the Shell drives fixed steps rather than passing variable
elapsed time, and 0005 §1 with 0002 §5 forbid the View to invent anything
between two worlds. Those two together decide this section rather than leaving
it open.

- **A display faster than the step rate draws the same world more than once.**
  Interpolation is the alternative and 0002 §5 forbids it outright.
- **A display slower than the step rate, or a frame that arrives late, runs more
  than one step before drawing.** The steps are due whether or not a frame
  arrived.

**The step rate is a number and it is not fixed here** — 0006 §5 sends it, and
O1 is why it is still not a number.

### 4. When the device cannot keep up, the simulation runs slow

**The number of steps the Shell may run before one draw is capped.** Past the
cap, the steps that are due are abandoned rather than deferred: simulation time
falls behind wall-clock time and does not catch up.

**What a visitor sees is a flock in slow motion**, moving smoothly, on a device
that cannot afford it at full rate.

Three things were available and two are worse.

- **Running every due step** is unbounded: a frame that ran four steps takes
  longer, which makes more steps due next frame. That is the spiral, and it ends
  in a page that stops responding rather than one that runs slow.
- **Dropping dots when frames get expensive** is the obvious answer and it is
  closed by [0002](0002-overall-architecture.md). The dot count is a property of
  the world; changing it mid-run is the Shell computing something about the
  world, which §5 of that record forbids, and it would leave §4's determinism
  describing worlds nobody runs.
- **Stuttering** is what 0001 §3.3 names by name.

**Slow motion is the honest failure**, and that is the argument for it rather
than a consolation: the toy visibly runs out of budget instead of silently
becoming a different toy. It is also the only one of the three that keeps §1
meaningful, because a page that drops work to meet its budget always meets it.

### 5. The dot count is chosen before the loop starts and does not change during a visit

It is an argument to the world the Core is given, alongside the seed that 0002
§2 already gives the Shell.

This follows from §4 and is stated separately because it is the thing a later
session will want to relax first. A count that varies during a visit is a second
world, and 0002 §4's determinism — *the same world and the same sequence of
steps produce the same result* — is worth exactly as much as the Shell's
restraint about reaching into it.

### 6. Every length in the world is a fraction of the frame

The dot radius, the neighborhood radius, the speed band and the margin are all
expressed against the frame's shorter side, which 0002 §2 gives to the Shell and
0014 §2 leaves as the viewport minus the strip.

**The consequence is that the flock is one flock at every screen size** — the
same picture, larger or smaller — and **the dot count is a single number rather
than a function of the window.**

0007 §6 already made this choice for the pointer's radius of effect, for the
reason that a fixed distance clears a phone screen and barely dents a desktop
one. This record extends it to every length, and gets the budget as a
consequence: work per step depends on the count, the count does not depend on
the window, so **a maximized window on a weak machine is not a worse case than a
small one.** That is the case the alternative gets exactly backwards, and it is
in O2 because what it costs is visible.

**0006 §2's ceiling becomes a ratio.** With `n` dots of relative radius `r` in a
frame of area `A`, non-overlap is unsatisfiable unless `n·πr²` is below `A`, and
unsatisfiable *with room to move* well below it. The record fixes that the
choice of `n` and `r` is one choice against that ratio, and no number — O1.

### 7. Neighbor search is one spatial index, and the naive search survives as its oracle

0002 §2 makes this internal to the Core and sends the algorithm here.

**Two queries, one structure.** 0006 §1 asks for the dots within one radius of a
dot; 0006 §2 asks for pairs closer than `2r`. A uniform grid whose cell is the
larger of the two distances answers both: the candidates for either query lie in
a dot's own cell and the eight around it.

**The naive scan is written first and is never deleted.** It is the reference the
grid is tested against: for any world and any seed, **the two return the same
set.** That is an invariant a command decides, over the Core, with no browser and
no clock — which is what makes an optimization safe under 0012 §4, where every
rule is a failing test before it is code.

**The ticket's crossover question dissolves.** #34 asks at what dot count the
naive search stops being acceptable. There is no crossover to find, because the
choice is not *naive until N*: the naive scan is the oracle and the grid is what
runs. Which one ships first is a measurement against §1 and not a number this
record invents.

**The grid is not speculative.** 0006's own worst consequence is that satisfying
non-overlap *may cost an unbounded number of passes*, and every pass is a pair
query. Quadratic cost multiplied by an unbounded pass count is the thing that
fails on the floor device.

### 8. The floor device is a slowdown factor, recorded with the date it was read

0001 §3.5 fixes the floor as **a mid-range phone roughly three years old**.
Nobody here owns one, and a record that names a model is stale in a year.

**So the floor is expressed as a factor: the budget in §1 is met when it is met
on the development machine slowed by that factor.** A factor can be applied by
whoever is measuring, on whatever machine they have.

**The factor is recorded with the date it was chosen**, and that is the load-bearing
half. *Roughly three years old* is a rolling definition: it moves every year, so
a budget measured against it gets easier every year without anyone deciding to
loosen anything. Freezing the reading at a date is not a reinterpretation of
0001 §3.5 — the sentence still means what it says, and a **pinned** floor would
need a record superseding 0001, by the route 0005 R2 fixed. This records which
reading was measured, so a later session can see that the floor moved. O4.

**What applies the factor is 0009's**, and #34 says so: no benchmark harness is
created here.

### 9. What is asserted, what is measured, and what is only watched

Three lists rather than the two in 0006 §10 and 0007 §9, because a budget is
decidable by a machine and not by one without a browser and a clock. 0014 §9
split the same way for the same reason.

**Decidable over the Core, with no browser:**

| | Invariant |
|---|---|
| §7 | The grid query and the naive scan return the same set, for any world and seed |
| §6 | `n·πr²` leaves 0006 §2 satisfiable for the frame the world was built for |
| §5 | The dot count of a world returned by a step equals the count it was given |

**Decidable by measuring a running page** — whether anything measures it is
0010's, and there is no toolchain:

| | Quantity |
|---|---|
| §1 | Steps due plus one draw, against the frame interval, at the §8 factor |
| §4 | That the cap is reached rather than the loop spiraling |

**Only watching decides these**, under 0012 §5, with the expected picture written
into the ticket before the work starts:

- The dot count and the dot radius, which 0005 §2 sent here and §6 makes one
  choice
- Whether slow motion under §4 reads as a slow flock rather than as a broken page
- Whether the flock reads as a flock at both a phone's size and a desktop's,
  which is what §6 claims and cannot show

## Consequences

**Positive.**

- **The budget is a comparison of two numbers the Shell already holds.** §1 and
  §2 leave nothing to instrument and no second clock to disagree with the first.
- **§6 removes the window from the budget.** Work per step stops depending on how
  large the visitor's screen is, which is the variable nothing here could bound.
- **§7 makes an optimization test-first.** The reference implementation is the
  oracle, so the grid is checkable on the day it is written rather than trusted.
- **Three invariants for the Core**, on top of 0006's six and 0007's six.
- **§4 keeps 0002 §4 and §5 intact** at the one place where performance work
  normally reaches into them.

**Negative, and these are real.**

- **The subject of this record is numbers and it contains none.** That is the
  fourth record running, and the first where it is the whole point rather than a
  deferral. O1 puts it to the decider instead of arguing it away, because
  0012's own §1 names where this ends.
- **0002 R2's measurement is still not made.** That record said the allocation
  cost of a new world per step gets measured here. §1 says what would measure it
  and nothing does.
- **§6 costs a desktop visitor.** Dots scale with the frame, so a large screen
  shows the same few dots, larger. That may simply look worse than many small
  ones, and it is watched — nothing here will fail if it does.
- **§4 is invisible when it happens.** A visitor cannot tell slow motion from a
  design choice, and 0003 records nothing about a visitor, so **nobody will ever
  learn whether the cap was reached in the wild.** The same shape as 0006 R1.
- **§7 requires two implementations of one query, forever.** More code in the
  part 0001 §2 asks to be well-written, justified by a cost nobody has measured.
- **§8 pins the floor to whatever machine is doing the measuring**, so the number
  is only as honest as that machine, and it moves when the machine is replaced.
- **This record cannot be run.** Nine sections, no numbers, and §9 says which of
  its own claims will still be undecided when there is finally something to run.

## Alternatives considered

- **Dropping dots when the frame budget is missed.** Rejected in §4: the Shell
  would compute about the world, against 0002 §5, and a page that sheds work to
  meet its budget always meets it.
- **Interpolating between two worlds to smooth a slow loop.** Rejected in §3:
  0002 §5 forbids it, and it is precisely the gap between *passes its tests* and
  *looks right* that this project exists to show.
- **A variable timestep.** Rejected on 0002 R1, which chose determinism over
  smoothness and named the cost.
- **Running every due step, with no cap.** Rejected in §4 as the spiral.
- **A fixed dot size with the count growing to fill the window.** Rejected in §6,
  and it is O2: it makes the worst case a large window on a weak machine, which
  is the one combination nothing can detect.
- **Naming a phone model as the floor device.** Rejected in §8: stale within a
  year, and unowned by anyone here.
- **Benchmarking the device at load and choosing the count from the result.**
  Rejected: it costs a visible delay on the device least able to afford it, and
  it makes the opening frame depend on a measurement that differs between two
  visits — a nondeterminism with none of the reproducibility 0002 §4 buys from a
  seed.
- **A second clock — `performance.now()`.** Rejected in §2: the callback already
  carries the time, and a second source is a second thing to reconcile.
- **Moving the Core into a worker.** Rejected because it adds a part that
  [0002](0002-overall-architecture.md) §2 does not have, and the world would
  cross a message boundary every step — which is 0002 R2's allocation cost again,
  with copying on top. A record superseding 0002 is the route, not this one.
- **Deciding the numbers here anyway, from published device data.** Rejected for
  the reason 0005 R1 gives about color: a number argued into a document before
  anything has run is decided by writing rather than by measuring, and this
  project exists to show the difference.

## Open questions

**O1 — Does this record fix numbers, or only relations?**

Every record since 0005 has fixed structure and deferred its numbers to watching,
and each had a good reason. This is the record whose subject is the numbers, so
the pattern is worth stopping on rather than continuing by habit.

*Recommended default:* **relations only, as written.** A step rate, a dot count
and a slowdown factor invented today would be three numbers nobody measured,
sitting in an accepted record that is immutable — and the first measurement would
then need an amendment or a superseding record to correct them. Deferring costs
nothing except that this record cannot be run, which is already true of 0005,
0006, 0007 and 0014.

*What argues the other way, and it is not weak:* 0012 §1 puts no end condition on
the analysis phase and names the failure — impressive documentation and nothing
built. Five records that fix no number is what that failure looks like from
inside. If the answer is that numbers belong here, the honest form is a starting
value marked as a starting value, the way 0012 R2 did with the number three.

**O2 — Does the flock scale with the screen, or does the dot stay one size?**

§6 says every length is a fraction of the frame: one count everywhere, the same
picture larger or smaller, and a budget that does not depend on the window. The
alternative is a dot of fixed apparent size with the count growing to fill the
area: a phone shows few dots, a desktop many, and the budget becomes a function
of the window.

*Recommended default:* **§6 as written.** It is the only version in which the
worst case is bounded, and 0007 §6 already tied the pointer's radius to the frame
for the same reason. The cost is visible and belongs to you: on a large screen
the dots are large, and *it reads as a flock* is 0001 §3.1, which no argument
here settles.

**O3 — Under budget pressure, does the toy run slow?**

§4 abandons steps and lets simulation time fall behind, so the flock moves in
slow motion rather than stuttering or thinning out.

*Recommended default:* **§4 as written.** Both alternatives are closed by
accepted records — dropping dots by 0002 §5, stuttering by 0001 §3.3 — so this is
less a choice among three than a confirmation that the visible consequence is
acceptable. It is outward-facing, which is why it is here: a visitor on an old
phone sees a slower toy than a visitor on a new one, and nothing on the page says
so.

**O4 — Is the floor device's rolling definition frozen or superseded?**

0001 §3.5 says *roughly three years old*, which moves every year. §8 freezes the
reading by recording the date the factor was chosen, and leaves 0001 untouched.

*Recommended default:* **freeze, do not supersede.** 0005 R2 fixed the route for
loosening an accepted rule — a record that supersedes it, never a reinterpretation
inside a later one — and §8 is deliberately not a reading of 0001 §3.5 at all,
only a record of which year was measured. Superseding 0001 to pin a device class
is available and would cost a record to gain a floor that stops tracking the
phones people actually carry.

## References

- `requestAnimationFrame()` — Baseline widely available, available 2015-07-29,
  widely 2018-01-29; Chrome 24, Chrome Android 25, Edge 12, Firefox 23, Firefox
  Android 23, Safari 7, Safari iOS 7.
  <https://api.webstatus.dev/v1/features/request-animation-frame>, read
  2026-08-02.
- HTML Standard, *Animation frames* — the callback is
  `callback FrameRequestCallback = undefined (DOMHighResTimeStamp time)` and is
  invoked with *now*, which is §2's only clock.
  <https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames>,
  read 2026-08-02.
- [0002](0002-overall-architecture.md) §2, §3, §4, §5, R1, R2 — the parts, purity,
  determinism, fixed steps, and the allocation cost sent here. Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §1, §2, R1 — immediate mode, the dot
  radius sent here, and why a number is not argued into a document. Read
  2026-08-02.
- [0006](0006-motion-rules.md) §1, §2, §5, §6 — the neighborhood, the ceiling this
  record inherits, the step rate sent here, and the margin relation. Read
  2026-08-02.
- [0007](0007-pointer-and-input-model.md) §6 — the radius tied to the frame, which
  §6 generalizes. Read 2026-08-02.
- [0014](0014-page-layout.md) §2 — the canvas as the viewport minus the strip.
  Read 2026-08-02.
- [Ticket #34](https://github.com/nanatsusaya/dot-panic/issues/34) — the scope
  this record is written against, including the neighbor-search topic that
  arrived from 0002 §2. Read 2026-08-02.

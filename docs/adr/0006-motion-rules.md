# 0006 — Motion rules

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#10](https://github.com/nanatsusaya/dot-panic/issues/10)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (a flock is
  judged by watching), §3.3 (no dot at rest, no visible stutter), §3.5 (the floor
  device) · [0002](0002-overall-architecture.md) §2 (the Core owns the world and
  the rules that advance it; the Shell owns the loop, the clock and the seed),
  §3 (the purity list), §4 (determinism), §5 (the View invents no motion), R1
  (the Shell drives fixed steps) ·
  [0004](0004-compliance-accessibility-and-rights.md) §4 (reduced motion is a
  hard requirement, and what the page presents instead is this record's), §5 (a
  control that stops the motion, and what the flock does while stopped is this
  record's) · [0005](0005-rendering-and-visual-design.md) §2 (a dot is a uniform
  filled circle), §7 (the control is a real button) ·
  [0012](0012-how-software-gets-developed.md) §4 (test-first in the Core, without
  exception), §5 (watch-first in the View)
- **Supersedes:** nothing

## Context

Every record so far has deferred this one. [0002](0002-overall-architecture.md)
§5 puts the rules of motion in the Core and says plainly that *what counts as
motion is 0006's*; [0004](0004-compliance-accessibility-and-rights.md) §4 and §5
each hand over a behavior without describing it; and
[0005](0005-rendering-and-visual-design.md) §7 says what the control looks like
and leaves what it does. This record is where those land.

**One inheritance is a tension rather than a task.** 0002's *Consequences* state
it: with no interpolation in the View, *"the picture is exactly as smooth as the
sequence of steps, and 0001 §3.3 asks for no visible stutter. 0006 inherits that
tension rather than resolving it."* §5 below is the answer, and it is a division
of the problem rather than a resolution of it.

**Three properties a textbook implementation does not provide**, carried in
[#10](https://github.com/nanatsusaya/dot-panic/issues/10) since before 0004 was
written:

- **Separation is not non-overlap.** Separation is a steering force that biases
  dots apart and guarantees nothing. Non-overlap is a positional constraint.
- **Never at rest.** The three classic forces can cancel, so keeping every dot
  moving needs a floor and not only a ceiling.
- **A bounded frame, not a torus.** Wrapping removes the edge case instead of
  solving it, and a hard edge under a fleeing flock has a known consequence.

**Repository state at the time of writing.** No code, no toolchain, no `core/`
directory. Six records are accepted. Every number this record needs is a number
nothing has ever measured or looked at, which is why §10 exists.

**What is not open here.** What a pointer means and how its influence decays is
0007. How many dots, at what frame rate, and how neighbors are found in practice
is 0008 — 0002 §2 makes neighbor search internal to the Core and sends the
algorithm and its trigger there. What the control looks like is already 0005 §7.

## Decision

### 1. The base is Reynolds' three steering behaviors, over a neighborhood that is a radius

Separation, alignment and cohesion, as published: each dot steers away from
crowding by its neighbors, toward their average heading, and toward their
average position. All three act on **local** neighbors rather than on the whole
flock, and that is the load-bearing detail — the aggregate motion emerges from
each dot reacting only to what is near it.

**The neighborhood is a circle of fixed radius around each dot, the same radius
for every dot.** Reynolds' neighborhood is a distance *and an angle*: a boid
disregards flockmates outside a cone, modeling an animal that cannot see behind
itself.

**The cone is dropped, deliberately.** It is a fourth number that has to be
chosen by watching, and its effect on what a person sees is the least separable
of the four — a watcher can tell that the flock looks wrong and cannot tell that
the cone is why. Nothing here has eyes; 0004 records the model as reimplemented
rather than copied, and a simplification is a legitimate part of that. Adding it
later changes a number, not the structure.

**The three weights are not fixed here**, for the reason 0005 §3 gives about
color and R1 there records: 0001 §3.1 puts *it reads as a flock* beyond what any
command can decide, and the weights are the numbers that decide it. They are
chosen by watching, under 0012 §5. **The neighborhood radius is not fixed here
either**, and it has a second reason as well as that one: it drives the cost of
neighbor search, which is 0008's.

### 2. Non-overlap is a hard constraint, applied after the step

No two dots overlap. Given the uniform radius `r` that 0005 §2 fixes, **the
world a step returns contains no pair of dots whose centers are closer than
`2r`.**

It is a constraint on the result, not a force among the others. Separation
remains one of the three in §1 and is not asked to do this job; a steering force
biases and cannot guarantee.

**Hard rather than strong, because [0012](0012-how-software-gets-developed.md)
§4 requires every rule of the simulation to be written as a failing test first,
and a bias gives that test nothing to assert.** This is the strongest invariant
in the record and the one most worth having: it holds for any world, any seed
and any number of steps, and a command decides it.

**How the constraint is reached is implementation** — a single pairwise
relaxation pass does not generally satisfy it, and the Core may iterate. What
this record fixes is the property of the returned world, not the route to it.

**This constrains 0008 and cannot be negotiated by it.** Dots that cannot be
packed into the frame without overlapping make the constraint unsatisfiable, so
the dot count, the radius and the frame size have to leave it satisfiable with
room to move. 0008 chooses those numbers and inherits that relation.

### 3. Every dot is always moving, and its speed lies in a band

**After every step, every dot's speed is at least `vmin`, and at most `vmax`,
where `vmin` is greater than zero.** This is 0001 §3.3's *no dot at rest*, in a
form a command can decide.

The ticket asked whether the floor belongs on speed or on displacement per step.
**The question dissolves against 0002 R1**, which fixed that the Shell drives
fixed steps rather than passing variable elapsed time: with a constant step the
two differ by a constant factor and are the same rule. It is stated as speed
because speed survives a later change to the step size and displacement does
not.

`vmin` and `vmax` are not fixed here. They are watched, under 0012 §5.

### 4. Change in velocity is bounded, and a gait is a consequence rather than a property

**The change in a dot's velocity across one step is at most `amax`.** No dot
turns or accelerates instantly.

This is what the decider's speed profile — an average speed with variation above
and below it, and smooth transitions between — needs in order to be a rule
rather than a description. *Smooth* is not a property of a single world; it is a
bound on the difference between two consecutive ones. Stated this way it is an
invariant a Core test asserts, and it is the second thing in this record a
command decides.

**A gait is not something a dot carries.** No dot has a mode, a temperament, or
a preferred speed of its own. Variation in speed is what the forces in §1 and
the pointer in 0007 produce within the band in §3: a dot fleeing moves near
`vmax`, a dot deep inside a settled flock near `vmin`.

Rejected the alternative — a preferred speed per dot, drawn from the seed —
because it is per-dot state whose only job is to make dots differ, and 0002 §4
would require it to come out of the seeded generator and be carried in the
world. That is a larger world, a larger test surface, and a rule with no
counterpart in the model §1 names. **The cost of this choice is real and is in
*Consequences*:** it is the one thing the decider asked for that no invariant
here guarantees.

### 5. Smoothness has two halves, and this record owns one

0002 handed over a tension: no interpolation in the View, and 0001 §3.3 asking
for no visible stutter. It divides cleanly.

- **No discontinuity in the motion itself** is §4. A sequence of worlds in which
  velocity never jumps is smooth in the only sense the Core can be.
- **Enough worlds per second** is not this record's. 0002 §2 gives the loop and
  the clock to the Shell, and the step rate is a number 0008 sets against the
  floor device in 0001 §3.5.

**Neither half alone satisfies 0001 §3.3**, which is why the division is stated
rather than left to be discovered. A smooth rule sampled too rarely stutters, and
a fast loop over a rule that lets velocity jump does not.

### 6. The frame is bounded, and its edge is a turning force rather than a wall

The flock stays inside a rectangular frame. It does not wrap.

**Inside a margin at each edge, a force acts on the dot toward the interior**,
growing as the dot gets closer. There is no bounce, no reflection and no clamp
on position.

**This follows from §4 rather than from taste.** Reversing a velocity at the
edge is a change of `2v` in a single step, which breaks the bound in §4 for any
dot moving faster than `amax/2`. A wall and a bounded acceleration cannot both
hold. Wrapping fails a related test: a dot that leaves one edge and reappears at
the other is a discontinuity in position, and a record that forbids jumps in
velocity while permitting them in position would be arguing with itself.

**The margin has to be wide enough for the force to work.** A sufficient
condition is that it is at least `vmax² / (2·amax)` — the distance a dot at the
ceiling covers while being brought to a stop under the bound in §4. Sufficient,
not necessary: a dot only has to turn, not stop. Being conservative here costs
frame rather than correctness, and it gives the three numbers a relation a
command can check once they exist.

### 7. The corner pileup is tolerated as a state and forbidden as an end state

A fleeing flock pushed into a corner of a bounded frame piles up there. This
record does not prevent it, and does not treat it as a defect.

**It is what a cornered flock does**, and preventing it means a force pushing
dots away from corners that the visitor can feel fighting them — which reads as
the page resisting rather than as a flock behaving.

**What is forbidden is that it lasts.** With the pointer withdrawn, the flock
leaves the corner and returns to moving over the frame. Nothing new is needed to
make that true: §3 keeps every dot above `vmin`, so a pile has no resting state
to fall into, and §2 keeps it a crowd rather than letting it collapse.

**This is assertable, and not only watchable.** From a world with every dot piled
into one corner and no pointer, after a bounded number of steps the flock's
bounding box is no longer confined to that corner. The Core is pure and
deterministic (0002 §3, §4), so that test needs no screen.

### 8. Under `prefers-reduced-motion: reduce`, the world does not advance

0004 §4 requires that where the setting is `reduce` the page presents no
sustained automatic motion, and sends what it presents instead here.

**It presents one frame: the world at its starting arrangement, drawn and left
alone.** The Shell does not step the Core.

**Motion is then available on request, through the control 0004 §5 already
requires.** Under `reduce` that control starts the flock instead of stopping it.
Without this the visitor who set `reduce` could never see what the page is, and
0004 §5 took the *essential* exception off the table precisely so that this
audience is not the one served worst.

Slower motion was rejected: 0004 §4 forbids sustained automatic motion, and
slower motion is still sustained.

### 9. Stopping is the absence of steps, not a state in the world

When the control stops the motion, **the Shell stops advancing the Core.** The
last world remains, and the View keeps drawing it. Resuming continues from that
world; nothing is reset and nothing is cleared.

**The Core has no concept of being paused** — no flag, no mode, no branch. It is
checkable by reading: nothing in the Core names pausing.

This is the same mechanism as §8, which is why they are two sections and not two
designs. Under `reduce` the Shell has not started stepping; under the control it
has stopped. In both cases the Core is a function that is simply not being
called.

### 10. What is asserted, and what is only ever watched

Stated because 0002 exists to make this boundary visible, and a record about
motion that left its own side of it implicit would be the wrong example.

**A command decides these, over the Core, with no browser:**

| | Invariant |
|---|---|
| §2 | No two dots closer than `2r` in a returned world |
| §3 | Every dot's speed in `[vmin, vmax]`, with `vmin > 0` |
| §4 | Change in velocity across a step at most `amax` |
| §6 | No dot outside the frame; the margin satisfies its relation |
| §7 | A cornered flock disperses within a bounded number of steps |
| §9 | The Core does not name pausing |

**Only watching decides these**, under 0012 §5, with the expected picture written
into the ticket before the work starts:

- Whether it reads as a flock — 0001 §3.1, which no command will ever decide
- The three weights in §1, the neighborhood radius, and every number above
- Whether speed visibly varies, which §4 produces rather than guarantees

**Every number in this record is in the second list.** The record fixes relations
between numbers and no number, exactly as 0005 §3 fixes the structure of color
and no color.

## Consequences

**Positive.**

- **Six invariants, on the day the record is written.** 0012 §4 requires the
  Core to be built test-first, and §10 hands it the list to start from rather
  than asking the first implementer to invent one.
- **The boundary rule is derived, not chosen.** §6 follows from §4, so a later
  session that wants a bounce has to argue with an invariant instead of with a
  preference.
- **Pause costs the Core nothing.** §9 keeps a whole concept out of the pure
  part, and out of the tests over it.
- **0008 receives a relation rather than a free hand.** §2 ties dot count,
  radius and frame together; §5 tells it that the step rate carries half of 0001
  §3.3.

**Negative, and these are real.**

- **The one thing the decider asked for by name has no invariant behind it.**
  Visible variation in speed is a consequence in §4, not a rule. If a settled
  flock turns out to move uniformly, nothing here fails — it is only watched,
  and the fix would be the per-dot preferred speed §4 rejects.
- **§2 can be made unsatisfiable by numbers this record does not choose.** A
  Core asked to separate dots that cannot fit has no correct answer, and this
  record says only that 0008 must not ask. Nothing checks that until 0008 exists.
- **Satisfying §2 may cost an unbounded number of passes**, on the device 0001
  §3.5 makes the floor. The strongest invariant here is also the most expensive,
  and §2 deliberately leaves the route open rather than bounding the cost.
- **A visitor under `reduce` sees a still picture and may never press the
  button.** §8 is the right trade and it still means the page's entire content is
  withheld from the people 0004 §4 exists to protect, until they act. **And
  nothing will ever say whether they did.**
  [0003](0003-security-and-privacy-by-design.md) records nothing about a visitor
  and leaves no mechanism by which it could, so this choice cannot be checked
  against what actually happens — by anyone, ever. R1 takes that knowingly.
- **This record cannot be run.** Ten sections, no numbers, and §10 says so
  plainly. It constrains an implementation that will make every visible choice
  itself, and a reader who wants to know what the flock looks like will not find
  it here.
- **§7 is the softest section.** It commits to a flock leaving a corner without
  saying what force makes it leave, resting on the claim that a speed floor is
  enough. That claim is plausible and untested.

## Alternatives considered

- **A torus — wrapping at the edges.** Rejected in §6: it deletes the edge case
  rather than solving it, and a dot reappearing across the frame is a
  discontinuity in position under a record that forbids them in velocity.
- **A wall — reflection or a clamp on position.** Rejected in §6 because it
  contradicts §4 arithmetically, not because it looks worse.
- **Non-overlap as a heavily weighted separation force.** Rejected in §2: it
  guarantees nothing, and 0012 §4 needs something to assert.
- **A preferred speed per dot, drawn from the seed.** Rejected in §4: per-dot
  state whose only purpose is variety, carried in every world and asserted by
  every test.
- **Reynolds' angular neighborhood.** Rejected in §1 as a fourth number tuned
  blind, and recorded as dropped rather than left unmentioned.
- **Slower motion under `reduce`.** Rejected in §8: still sustained, still
  automatic.
- **A paused flag in the world.** Rejected in §9: it puts a Shell concern in the
  pure part and adds a branch to every rule.
- **Fixing the weights here.** Rejected in §1 for the reason 0005 R1 gives: the
  numbers that decide whether it reads as a flock are not decided by writing.

## Resolved questions

All three were confirmed rather than redirected — Daniel: *"wir folgen bei allen
deinen empfehlungen."* No decision section changed as a result, which is worth
stating plainly: these record what was **chosen against**, and what it would take
to choose differently later.

**R1 — Under `reduce` the page shows one frame, and the control starts it.** The
draft asked whether that was the right trade, against a flock that never moves on
its own but does respond to the pointer. The still picture stands: motion
triggered by the visitor's own pointer is still motion they did not ask for when
they only meant to read the imprint, and a button makes the choice explicit
rather than incidental.

**This is the one decision in the record that can never be checked against
reality.** Whether visitors press the button is exactly the kind of fact
[0003](0003-security-and-privacy-by-design.md) forbids the page to learn, and it
leaves no mechanism by which anyone could. Every other choice here is eventually
settled by watching or by a test. This one is settled by argument and stays that
way. Recorded so that a later session does not go looking for evidence that
cannot exist.

**R2 — A gait is a consequence of the forces, and no dot carries one.** The
draft read the decider's speed profile — an average speed with variation,
walking, running, sprinting, with smooth transitions — as an *observable* and
produced it from §1 and §3 rather than from per-dot state. That reading is
confirmed.

**The alternative is not closed by argument, and it is closed by §4.** If
watching shows a settled flock moving uniformly, the fix is a preferred speed per
dot drawn from the seed — and §4 decides against exactly that, so it arrives by
an authorized amendment or a superseding record, never by adding a field to the
world because the flock looked flat. This is the one place where the record's
softest claim and its firmest prohibition sit on the same question, which is why
it is written down rather than left to be worked out.

**R3 — The corner pileup is tolerated, and required to dissolve.** The draft
asked whether to prevent it instead. Tolerating stands: a corner-avoidance force
has no counterpart in the model §1 names, and the visitor feels it as the page
pushing back rather than as a flock behaving.

§7 is the record's softest section and this answer does not firm it up. What
holds the pile open is the speed floor in §3 and nothing else, and the assertion
§7 offers — that a cornered flock disperses within a bounded number of steps —
is the first thing worth writing as a failing test under
[0012](0012-how-software-gets-developed.md) §4, because it is the claim here most
likely to be wrong.

## References

- Craig W. Reynolds, *Flocks, Herds, and Schools: A Distributed Behavioral
  Model*, in Computer Graphics **21(4)** (SIGGRAPH '87 Conference Proceedings),
  pages 25–34. [The paper](https://www.red3d.com/cwr/papers/1987/boids.html),
  read 2026-08-02, which states that citation.
- [Boids](https://www.red3d.com/cwr/boids/), Craig W. Reynolds — the three
  steering behaviors and the statement that a boid reacts only to flockmates
  within a small neighborhood around itself, bounded by distance **and angle**.
  Read 2026-08-02.
- [0001](0001-purpose-scope-and-success.md) §3 — the conditions this record is
  measured against. Read 2026-08-02.
- [0002](0002-overall-architecture.md) — the parts, purity, determinism, and R1
  on fixed steps. Read 2026-08-02.
- [0004](0004-compliance-accessibility-and-rights.md) §4 and §5 — the two
  behaviors handed here. Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §2 and §7 — the uniform radius and
  the control. Read 2026-08-02.
- [0012](0012-how-software-gets-developed.md) §4 and §5 — test-first in the Core
  and watch-first in the View. Read 2026-08-02.
- [Ticket #10](https://github.com/nanatsusaya/dot-panic/issues/10) — the three
  properties, the base model, and the speed profile decided 2026-08-02. Read
  2026-08-02.

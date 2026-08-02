# 0002 — Overall architecture

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#6](https://github.com/nanatsusaya/dot-panic/issues/6)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §1 (what the thing
  is), §2 (documentation and a well-written implementation come before the
  product), §3.1 (a flock is judged by watching), §3.3 (motion is continuous),
  §3.5 (the performance floor), §4 (the page carries three things), §5 (what is
  out of scope), §6 (the ranked failures)
- **Supersedes:** nothing

## Context

The claim this project exists to demonstrate is that a passing test suite proves
little about anything visual. That claim only holds if there is a boundary
between the part a command can decide and the part only an eye can, and 0001 §3
already splits along it: four of its five conditions can be checked, and §3.1 —
*it reads as a flock* — never can.

An architecture that does not draw that boundary loses the claim. If rules of
motion live in the code that draws, a test either asserts nothing or needs a
browser to run, and either way the gap between *passes its checks* and *looks
right on screen* stops being visible. Drawing the boundary is what this record
is for; everything else here follows from it.

**Repository state at the time of writing.** No code, no runtime, no test
runner, no rendering, no deployment, and no directories for any of them. 0001 is
the only accepted record. This record is written against a blank slate, which is
also its only chance to constrain what gets built.

**What is not open here.** Where the core comes from is 0013. What draws is
0005. What runs and tests is 0009. How many dots at what frame rate is 0008.
What a pointer means is 0007. This record says where each of those lives and
what it may not do, and decides none of them.

## Decision

### 1. Three layers

| Layer | Holds |
|---|---|
| **Core** | The world, and the rules that advance it |
| **Shell** | The loop, real time, pointer input, the size of the frame |
| **View** | The drawing: given a world, put it on screen |

Not two: folding the Shell into the View would put the clock and the drawing in
one place, and §4 is the rule that separation exists to make possible.

Not more: 0001 §2 says that where two structures are equally workable, the one
needing less prose to justify wins.

### 2. Dependency direction

**Shell → Core. Shell → View. Nothing else.**

- The Core imports nothing from this project.
- The View imports nothing from this project. It receives a world as an
  argument.
- The Shell imports both, and is the only file that does.

A command can decide this by reading imports.

The Core and the View therefore do not know each other exists. That is the
boundary from the Context, expressed as a rule about files: the Core can be
exercised with no screen, and the View can only be judged by watching.

### 3. What the Core may never touch

Stated as a list of identifiers rather than a principle, so that a command can
decide it:

`window` · `document` · `navigator` · `screen` · `location` ·
`requestAnimationFrame` · `performance` · `Date` · `Math.random` ·
`setTimeout` · `setInterval` · `fetch` · `localStorage` · `sessionStorage` ·
`console`

Time reaches the Core as an argument (§6). Randomness reaches it as a seed
(§7). A Core that holds to this list runs anywhere that can do arithmetic,
which is what makes it testable without a browser.

`console` is on the list for a weaker reason than the rest: it is available
everywhere and would not break anything. A logging call left inside the step
costs time in the one loop 0008 will later measure, and the measurement would
not say why.

### 4. What the View may never do

- It may not write to the world.
- **It may not contain a rule of motion.** Every position it draws comes from
  the world it was given. It may not interpolate between two worlds, ease,
  tween, or animate.
- It may not decide when a step happens.

The second is the load-bearing one. If the drawing invents motion — a CSS
transition, an eased hand-off between frames — then what is on screen is no
longer what the Core produced, and a test over the Core says nothing about the
picture. That is precisely the gap this project was built to show. Building it
into the architecture would make the project argue against itself.

Partly checkable: nothing representing a dot carries a CSS animation or
transition.

### 5. Where state lives, and who may write it

The world belongs to the Core. It is created by a Core function and advanced by
a Core function. The Shell holds a reference and hands it to the View; neither
writes to it.

**The world holds everything a step needs** — positions, velocities, the frame,
the state of the random generator, and the pointer if there is one. Nothing a
step reads lives outside it.

That last sentence is checkable in one direction: given the same world and the
same sequence of steps, the result is identical. Anything reaching in from
outside breaks it, and a test can catch that.

That the Shell and the View do not write is **not** checkable by a command. It
is carried by review, and saying so is better than implying otherwise.

### 6. Where time enters

The Core never reads a clock. A step takes the elapsed time as an argument.

The Shell owns real time and is the only thing that knows what a frame is. How
elapsed time is turned into steps — one step per frame, or fixed steps driven
by an accumulator — is **O1**.

### 7. Where the seed enters

The Core never generates randomness. Creating a world takes a seed; the Core
derives its generator from it and keeps that generator's state inside the world
(§5).

The Shell is the only thing that chooses a seed. Where it gets one is **O3**.

Checkable: the same seed and the same sequence of steps produce the same world.

### 8. Where the pointer enters

The Shell translates browser events into either a pointer position in the
Core's coordinates, or the absence of a pointer. The Core never sees an event
object.

This leaves 0007 free to decide what a pointer *means* — radius of effect, how
it decays, that touch has no hover — without also having to decide where it
arrives.

### 9. Where neighbor search lives

**Inside the Core, as an internal, and not in its interface.** The Core exposes
no neighbor search; it is one step in advancing the world, not a layer.

What is already known and must not be lost: start with the naive all-pairs
scan, and let a **measured** limit trigger the move to a spatial grid rather
than deciding it up front. The threshold is 0008's to fix.

The question had no owner after the decision set was replanned. Placement is
settled here; the trigger is settled there.

### 10. The imprint and the explanation are outside this architecture

0001 §4 puts three things on the page. The imprint and the explanation are
static document markup. They belong to none of the three layers, no layer
creates or changes them, and they do not pass through the drawing path.

They do not move and they hold no state. Pulling them into a layer would invent
a layer that otherwise would not exist.

### 11. Layout

```
core/     the simulation
shell/    the loop, time, input, the frame
view/     the drawing
```

Three directories named after the layers, so that the rule in §2 is legible
from a path rather than only from imports. The page itself and the static
markup from §10 sit at the root.

File names, extensions and module format belong to 0009.

## Consequences

**Positive.**

- §2 and §3 can be decided by a command with no browser involved. This is the
  first claim in this project that becomes machine-checkable rather than
  reviewed.
- The Core is exercisable without a screen, which gives 0010 something to assert
  and a reason to distinguish what it asserts from what it watches.
- §4 keeps the gap between *passes its checks* and *looks right* where it can be
  seen, instead of hiding it inside the drawing.
- §9 gives an ownerless question a home without pre-empting the measurement that
  answers it.

**Negative, and these are real.**

- **§3 narrows 0013.** A package that calls `Math.random`, reads a clock, or is
  bound to the DOM cannot be used as the Core after this record without being
  wrapped. 0013 now chooses from a smaller field than it would have if it had
  been decided first. Said here rather than discovered there.
- **§4 costs smoothness.** With no interpolation, the picture is exactly as
  smooth as the sequence of steps. On a device that misses frames that is
  visible, and 0001 §3.3 asks for no visible stutter. O1 is that tension, and it
  does not disappear whichever way it is answered.
- **The rule that only the Core writes (§5) rests on review.** The import
  direction is checkable; writing is not. This is the largest unenforceable
  claim in the record.
- **Three directories for a toy this size will read as too much.** They are here
  so the dependency rule is legible from a path, but a reader who sees only the
  size will read ceremony — which is failure 1 in 0001 §6.
- **§10 leaves open how the page is produced.** Whether that markup is written
  by hand or generated belongs to 0009 and 0011. Until then, *static* is an
  intent rather than a mechanism.

## Alternatives considered

- **Two layers — the simulation, and everything else.** Rejected because the
  "everything else" would own the clock and the drawing together, and §4 is the
  rule that separating them exists to permit.
- **Let the View import the Core.** Rejected because the drawing would then
  depend on the shape of the simulation, and the two would have to change
  together for reasons unrelated to each other.
- **State the Core's restriction as a principle — "the Core is
  environment-free" — instead of a list of identifiers.** Rejected because a
  principle becomes folklore by the third session, and a list can be decided by
  a command.
- **Give neighbor search its own layer.** Rejected because it is one operation
  inside a step, and a layer boundary around it would be crossed on every frame
  for no gain.
- **Put the imprint and the explanation inside the View.** Rejected because it
  would make the drawing layer responsible for text that never moves, and give
  §4 an exception on the day it was written.
- **Decide the timestep here rather than asking.** Rejected because it trades
  determinism against visible smoothness and both are conditions 0001 fixed.
  That trade belongs to the decider (O1).

## Open questions

**O1 — Fixed timestep, or variable elapsed time?** A fixed step makes a run
reproducible from a seed and makes the checks in §5 and §7 mean something;
variable elapsed time follows the display exactly and is smoother when frames
are missed. The two cannot both be had. *Recommended default:* fixed step, with
the Shell accumulating real time and calling whole steps. Determinism is the one
property a command can check here, and without it most of §5 and §7 stops being
verifiable — which costs more than the smoothness does.

**O2 — Does a step mutate the world in place, or return a new one?** Returning a
new world is easier to reason about and to test; mutating avoids copying every
dot on every frame, against the performance floor in 0001 §3.5. *Recommended
default:* mutate in place. Determinism does not depend on immutability, only on
the same input producing the same output, and 0008 has a real device to answer
to.

**O3 — Where does the Shell get its seed?** A seed fixed in the source makes
every visit identical and every bug reproducible from nothing. A seed from the
clock makes each visit different and each bug reproducible only if the seed is
reported somewhere. *Recommended default:* fixed in the source. 0001 §5 rules
out remembering anything between visits, and a differing arrangement each visit
is a product feature nobody has asked for.

## References

- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success; every
  section this record depends on. Read 2026-08-02.
- [Ticket #6](https://github.com/nanatsusaya/dot-panic/issues/6), including the
  comment that widened its scope after 0001 was accepted. Read 2026-08-02.
- [`docs/adr/README.md`](README.md) — the shape of a record, and the planned
  set this one sits in. Read 2026-08-02.

# 0002 — Overall architecture

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#6](https://github.com/nanatsusaya/dot-panic/issues/6)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (documentation and
  a well-written implementation come before the product), §3.1 (a flock is
  judged by watching), §3.5 (the performance floor), §4 (the page carries three
  things), §5 (what is out of scope), §6 (the ranked failures)
- **Supersedes:** nothing
- **Amended:** 2026-08-02 — A1

## Context

The claim this project exists to demonstrate is that a passing test suite proves
little about anything visual. That claim needs a boundary between the part a
command can decide and the part only an eye can, and 0001 §3 already splits
along it: four of its five conditions can be checked, and §3.1 — *it reads as a
flock* — never can.

If that boundary is not in the structure, it is nowhere. Rules of motion sitting
in the code that draws make a test either assert nothing or require a browser,
and the gap between *passes its checks* and *looks right on screen* stops being
visible. This record picks the pattern that puts the boundary in the structure,
and decides nothing about what happens on either side of it.

**Repository state at the time of writing.** No code, no runtime, no test
runner, no rendering, no deployment, and no directories for any of them. 0001 is
the only accepted record. This record is written against a blank slate, which is
its only chance to constrain what gets built.

**What is not open here.** How the dots move is 0006. What a pointer means is
0007. How many dots at what frame rate is 0008. What runs and tests the code is
0009. What is asserted versus watched is 0010. Where the core comes from is
0013. This record says which part owns each of those questions; it answers none
of them.

## Decision

### 1. The pattern is a functional core inside an imperative shell

Named because an unnamed structure is one a reader has to reverse-engineer, and
0001 §2 puts the reader first. The pattern is Gary Bernhardt's, from *Boundaries*
(SCNA 2012).

Two terms, used in their ordinary sense and stated here so the record does not
assume them:

- A function is **pure** when its result depends only on its arguments and it
  changes nothing outside itself. Calling it twice with the same arguments gives
  the same answer, and calling it has no other effect.
- Code is **impure** when it does anything else: reads a clock, draws, listens
  for an event, keeps a running value.

The simulation is pure. Everything that touches the outside world is impure, sits
outside the simulation, and is kept as thin as it can be made.

The dependency rule comes from Cockburn's *ports and adapters*, which states the
inside-outside asymmetry directly: code belonging to the inside part must not
leak into the outside part. Here that means the impure parts know about the pure
part, and the pure part knows nothing about them.

### 2. Three parts

| Part | Kind | Owns |
|---|---|---|
| **Core** | pure | The world, and the rules that advance it |
| **Shell** | impure | The loop, the clock, input events, the size of the frame, the choice of seed, the wiring of the other two, and the one call §6 permits |
| **View** | impure | Given a world, drawing it |

**Dependency direction: Shell → Core, Shell → View, and nothing else.** The Core
imports nothing from this project. The View receives a world as an argument and
imports nothing from this project. The Shell imports both, and is the only file
that does. A command can decide this by reading imports.

The View is separate from the Shell rather than part of it because it is the one
part that can only be judged by watching (0001 §3.1). Keeping it alone in its own
part is what keeps that unverifiable surface as small as it can be.

**How the Core finds a dot's neighbors is internal to the Core** and not part of
its interface. That question had no owner after the decision set was replanned;
placement is settled here, and what is already known about the algorithm and its
trigger belongs to 0008.

### 3. Purity, in a form a command can decide

The Core does not name any of these:

`window` · `document` · `navigator` · `screen` · `location` ·
`requestAnimationFrame` · `performance` · `Date` · `Math.random` ·
`setTimeout` · `setInterval` · `fetch` · `localStorage` · `sessionStorage` ·
`console`

The list is the operational form of §1, not a separate rule: each entry either
reads the outside world or writes to it. Everything the Core needs arrives as an
argument instead — including the two that are easy to forget, time and
randomness (§4).

Stated as a list rather than as "the Core is environment-free" because a
principle becomes folklore by the third session, and a list can be decided by a
command.

### 4. The Core is deterministic

Advancing the world takes a world and returns a new one. It changes nothing in
the world it was given.

- **Time** arrives as an argument. The Core never reads a clock.
- **Randomness** arrives as a **seed** — the starting value of a deterministic
  pseudorandom generator, where the same starting value yields the same sequence.
  The Core derives its generator from the seed and carries that generator's state
  in the world. The Shell is the only part that chooses a seed; where it gets one
  is an implementation question, not an architectural one.

Checkable: the same world and the same sequence of steps produce the same
result, in any environment that can do arithmetic.

### 5. No domain logic outside the Core

Neither the Shell nor the View computes anything about the world. The View draws
exactly what the world it was handed contains — it does not interpolate between
two worlds, ease, or animate.

If the drawing invents motion, what is on screen is no longer what the Core
produced, and a test over the Core says nothing about the picture. That gap is
what this project was built to show; putting it inside the architecture would
make the project argue against its own premise.

What counts as motion is 0006's. That it lives in the Core is this record's.

### 6. The imprint and the explanation are outside the application

0001 §4 puts three things on the page. The imprint and the explanation are static
document markup: no part owns them, no part creates or changes them, and they do
not pass through the drawing path. They neither move nor hold state, and pulling
them inside would invent a part that otherwise would not exist.

**One exception, and it is exactly one call.** The Shell may call `showModal()`
on the element that holds them, because [0014](0014-page-layout.md) §5 puts them
in a dialog and no markup mechanism this project may use opens one. **What that
call changes is the dialog's open state, not them**: the imprint and the
explanation are still markup no part creates, changes or draws, and the Shell
never reads them.

Stated as one named call rather than as *the Shell may own page chrome*, because
the second is a category and the first is a thing a command can count. It is the
only exception in this record, and §2's list carries it so that a reader of the
parts table does not have to find it here.

### 7. Layout

```
core/     the pure simulation
shell/    the loop, time, input, the frame
view/     the drawing
```

Three directories named after the three parts, so the rule in §2 is legible from
a path rather than only from imports. The page and the static markup from §6 sit
at the root. File names, extensions and module format belong to 0009.

## Consequences

**Positive.**

- The dependency direction (§2) and purity (§3) are decidable by a command with
  no browser involved. These are the first claims in this project that a machine
  can settle rather than a reviewer.
- The Core is exercisable without a screen, which gives 0010 a real line to draw
  between what it asserts and what it only watches.
- Naming the pattern means a reader recognizes the structure instead of
  reconstructing it, and can go and read the source.

**Negative, and these are real.**

- **Returning a new world every step costs allocation on every frame**, against
  the performance floor in 0001 §3.5. This is the price of the answer to R1, paid
  knowingly. If 0008 measures that the floor cannot be met this way, that is a
  reason for a record that supersedes this one — not for quietly mutating in
  place, which would leave the word *functional* in §1 describing something it no
  longer describes.
- **§3 narrows 0013.** A package that calls `Math.random`, reads a clock, or is
  bound to the DOM cannot be the Core after this record without being wrapped.
  0013 now chooses from a smaller field than it would have if it had been decided
  first. Said here rather than discovered there.
- **§5 costs smoothness.** With no interpolation, the picture is exactly as
  smooth as the sequence of steps, and 0001 §3.3 asks for no visible stutter.
  0006 inherits that tension rather than resolving it.
- **Nothing checks that the Shell and the View leave the world alone.** The
  import direction is checkable; restraint is not. This is the largest
  unenforceable claim in the record.
- **Three directories for a toy this size will read as too much.** They exist so
  the dependency rule is legible from a path, but a reader who sees only the size
  will read ceremony — which is failure 1 in 0001 §6.

## Alternatives considered

- **MVC.** Rejected because Reenskaug built it at Xerox PARC for a user seeing
  and editing the same model element in several views at once. There is one
  scene (0001 §5) and nothing to edit, so the Controller would have no work and
  the Model/View split would carry the whole pattern alone.
- **Ports and adapters on its own.** Rejected as the primary pattern because it
  is shaped for an application with several interchangeable outside interfaces;
  there is one screen and one pointer. Its dependency rule is kept in §1, which
  is the part that applies.
- **Two parts — the simulation and everything else.** Rejected because the
  "everything else" would own the clock and the drawing together, and §5 is the
  rule that separating them exists to permit.
- **Let the View import the Core.** Rejected because the drawing would then
  depend on the shape of the simulation, and the two would have to change
  together for reasons unrelated to each other.
- **Describe the structure without naming a pattern.** Rejected because that is
  what the first draft of this record did: it restated *functional core,
  imperative shell* in its own words, borrowed the word *Shell* from it, and
  cited nothing. A reader who knows the pattern sees an unattributed copy; one
  who does not never learns the name. Both are bad outcomes in a project whose
  purpose is to be read.

## Resolved questions

**R1 — Determinism over smoothness.** The first draft asked whether the Shell
should drive fixed steps or pass variable elapsed time. Determinism and
testability win. It is the one property here a command can check, and without it
most of §3 and §4 would stop being verifiable. How the Shell turns real time into
steps is implementation, and 0006 owns the smoothness this costs.

**R2 — The step returns a new world; it does not mutate.** The first draft asked
this as a separate question. It is not one: choosing a *functional* core (R3)
answers it, because a step that mutates its input is not pure. The performance
cost is stated in Consequences rather than hidden, and 0008 is where it gets
measured.

**R3 — The pattern is named, and it is Bernhardt's.** Not an open question in the
first draft, which is the defect: that draft described a functional core and an
imperative shell in its own words, took the word *Shell* from the pattern, and
attributed nothing. Three candidates were weighed in review — this one, ports and
adapters, and MVC — and this one was chosen because it names precisely the
boundary the project exists to demonstrate. The other two are in *Alternatives
considered*, and the dependency rule from ports and adapters is kept.

**R4 — Behavior was removed from this record.** The first draft decided how
neighbors are found, how the pointer decays into the simulation, and what the
drawing may animate. Those belong to 0006, 0007 and 0008. What survives here is
only which part owns each question — an architecture record that specifies
behavior is a design document wearing the wrong header.

## Amendments

**A1 — the Shell gains one call, and §6's boundary is read rather than moved.
2026-08-02.**

§2's parts table gave the Shell:

> The loop, the clock, input events, the size of the frame, the choice of seed,
> and the wiring of the other two

§6 ended:

> They neither move nor hold state, and pulling them inside would invent a part
> that otherwise would not exist.

[0014](0014-page-layout.md) §5 put the imprint and the explanation in a
`<dialog>` on the strength of a markup mechanism that does not exist — see that
record's A1. Correcting it needs one `showModal()` call, and this record is where
its cost is paid: §2's list now names it, and §6 says what it does and does not
touch.

**The reading is this record's, and it is deliberately narrow.** *No part creates
or changes them* is about the imprint and the explanation. A call that opens their
container changes neither: no part creates that markup, changes it, reads it or
draws it. What the reading does **not** license is page chrome as a category —
§2 names one call so that a later session counts rather than argues.

**Nothing else changes.** §1, §3, §4, §5 and §7 stand as accepted, and R1 through
R4 are untouched. In particular §5 — *no domain logic outside the Core* — is
unaffected: the call computes nothing about the world.

**What it costs is real.** The Shell was the part with no page in it, and now it
has one line of page in it. The line between *one call* and *the Shell owns the
chrome* is held by this paragraph and by review, and nothing else. 0014 §5 gives
the count a command can check.

Authorized by Daniel on 2026-08-02, against
[#62](https://github.com/nanatsusaya/dot-panic/issues/62), on a recommendation of
`showModal()` bounded to one call — in preference to loosening
[0001](0001-purpose-scope-and-success.md) §3.4, which every record here leans
on — carried by amendment rather than by a superseding record: *"wir folgen
deiner empfehlung."*

## References

- [*Boundaries*, Gary Bernhardt, SCNA 2012](https://www.destroyallsoftware.com/talks/boundaries)
  — the source of *functional core, imperative shell*. Read 2026-08-02.
- [*Hexagonal architecture (ports and adapters)*, Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
  — the inside-outside asymmetry used in §1. Read 2026-08-02.
- [*MVC*, Trygve Reenskaug](https://folk.universitetetioslo.no/trygver/themes/mvc/mvc-index.html)
  — the pattern rejected in *Alternatives considered*, from its author. Read
  2026-08-02.
- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success. Read
  2026-08-02.
- [Ticket #6](https://github.com/nanatsusaya/dot-panic/issues/6), including the
  comment that widened its scope after 0001 was accepted. Read 2026-08-02.

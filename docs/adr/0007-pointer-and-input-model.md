# 0007 — Pointer and input model

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#11](https://github.com/nanatsusaya/dot-panic/issues/11)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §1 (the flock moves
  out of the way when the pointer approaches), §3.2 (no perceptible lag), §3.4
  (the Baseline floor), §4 (the page carries a flock, an imprint and an
  explanation) · [0002](0002-overall-architecture.md) §2 (the Shell owns input
  and the size of the frame), §4 (everything the Core needs arrives as an
  argument), §5 (no domain logic outside the Core) ·
  [0003](0003-security-and-privacy-by-design.md) §4, §5 (nothing is stored and
  nothing is sent) · [0006](0006-motion-rules.md) §3 (the speed band), §4 (the
  bound on change in velocity), §6 (the frame edge is a turning force), §7 (the
  corner pileup) · [0005](0005-rendering-and-visual-design.md) §7 (the control is
  always visible, not hover-revealed) ·
  [0012](0012-how-software-gets-developed.md) §4, §5
- **Supersedes:** nothing

## Context

[0001](0001-purpose-scope-and-success.md) §1 names one interaction and the whole
toy rests on it: the flock moves out of the way when the visitor's pointer
approaches. Every record since has decided around it without deciding it.

**The mouse and the finger are not the same device, and the difference is a
design decision rather than a detail.** A mouse always has a position — there is
a cursor whether or not anyone is touching anything. **On touch there is no
hover.** A position exists only while a finger is down, and it stops existing the
moment the finger lifts. A model written for the first and applied to the second
produces one of two bugs: a flock that keeps fleeing a finger that is gone, or
one that snaps back the instant contact ends.

**What [0006](0006-motion-rules.md) already fixed, and this record works
inside.** The speed band (§3), the bound on how far a velocity may change in one
step (§4), and the frame edge as a turning force (§6). Those hold for every
force, including this one — which is why §5 below can add a force without
reopening containment.

**Repository state at the time of writing.** No code, no toolchain, nothing on
screen. Seven records accepted. Every number here is deferred for the reason
0005 §3 and 0006 §10 give.

**What is not open here.** How the dots move among themselves is 0006. How many
dots at what frame rate is 0008. Nothing about the visitor is stored or sent,
and that is 0003 §4 and §5 rather than a claim this record makes.

## Decision

### 1. One code path, and it is Pointer Events

The page listens for `pointerdown`, `pointermove`, `pointerup` and
`pointercancel`. **Not mouse events and touch events as two paths.**

**Pointer Events is Baseline widely available** — available 2020-07-28, widely
as of 2023-01-28 — so 0001 §3.4 permits it.

**A naming trap worth recording**, because the next session will meet it. There
are two web features whose names differ by three characters:

| Feature | What it is | Baseline |
|---|---|---|
| `pointer-events` | the **CSS property** that controls hit-testing | widely, 2015-07-29 / 2018-01-29 |
| Pointer Events | the **DOM event API** this section chooses | widely, 2020-07-28 / 2023-01-28 |

They are different features with different dates, and checking the wrong one
against 0001 §3.4 gives an answer that is five years too generous.

**Two paths were rejected**, and not for the amount of code. Two paths is where
the mouse-versus-finger difference stops being the decision §4 makes and becomes
a discrepancy nobody chose.

### 2. The Shell passes a raw fact; everything derived from it is the Core's

The Shell hands the step either **a pointer position in the world's coordinates,
or the fact that there is no pointer.** Nothing else. No velocity, no smoothing,
no decay, no strength.

**This is 0002 §5 applied rather than a preference.** How the flock reacts to a
pointer is domain logic, and neither the Shell nor the View computes anything
about the world. A Shell that handed over an already-decayed influence would be
deciding how the flock reacts, in the part of the system no test can reach.

**So the decay in §4 is carried in the world**, like the seeded generator 0002 §4
puts there. Checkable by reading: the Shell converts an event to a position and a
presence, and does no arithmetic on the world.

### 3. The flock reacts to where the pointer is, not to how it moves

Position only. Not pointer velocity, not both.

0001 §1 says the flock moves out of the way when the pointer **approaches** —
that is a statement about proximity, and proximity is a function of position. A
model that reacted to movement would leave a resting cursor inert and then react
to a flick, which reads as a page that is asleep until startled.

It also keeps §2 honest: pointer velocity is a derivative, and something would
have to compute it. In the Shell that is domain logic outside the Core; in the
Core it is another field in the world earning its place by making one force
slightly different.

**The cost is in *Consequences* and it is real:** a parked cursor pushes forever,
so a visitor who leaves the mouse still gets a permanent hole in the flock.

### 4. On touch the pointer exists while contact is held, and its influence decays when it ends

`pointerdown` starts it. `pointerup` and `pointercancel` both end it — a browser
that takes over the gesture must be treated exactly like a finger lifting.

**When it ends, the influence does not stop; it decays to zero from the last
known position.** The world carries that last position and a strength that falls
to zero over a fixed number of steps.

Both alternatives are the bugs the ticket named. Keeping the pointer alive after
contact ends leaves the flock fleeing nothing. Removing it instantly snaps the
flock back in one step — and 0006 §4 would clamp that snap into something worse
than either, since the bound on change in velocity turns an instant release into
a slow drift back through a region the visitor has already left.

**A mouse never takes this path.** A cursor that leaves the window is the one
case where a mouse loses its position, and it is the same code: presence ends,
influence decays.

### 5. The force falls to zero at a finite radius, and it is a force rather than a rule about where dots may be

**A dot farther from the pointer than the radius of effect receives exactly zero
contribution from it.** Not a small contribution — zero. That is the strongest
invariant this record adds, and a command decides it.

An unbounded falloff would make every dot react to the pointer on every step,
which is not *moves out of the way when the pointer approaches* — it is a flock
that drifts whenever the visitor exists.

**The falloff reaches zero continuously**, so that a dot at the edge of the
radius is not pushed, released, and pushed again as it drifts across the
boundary. Its shape is not fixed here and is watched, under 0012 §5.

**It contributes a force and never constrains position.** No exclusion zone, no
clamp, no dot moved directly. 0006 §4 bounds how much a velocity may change in a
step, and a hard exclusion zone around a moving pointer is a position jump
wearing a different name.

**Containment survives this, and it needs no new rule.** 0006 §3 caps speed and
§4 caps acceleration whatever the forces are, so a force added here cannot carry
a dot through the margin 0006 §6 sized against those caps. The pointer can push
the flock into a corner; 0006 §7 already decided that is tolerated and must
dissolve.

### 6. The radius of effect is a fraction of the frame's shorter side

Not a fixed distance in world units.

A fixed radius means the same gesture clears a phone screen and barely dents a
desktop one. The flock should read the same at both sizes, and 0001 §3.5 makes a
mid-range phone the floor rather than an afterthought.

**The fraction is not fixed here.** It is watched, and the frame's size is the
Shell's under 0002 §2. What this record fixes is that the radius is proportional
to the frame and not to anything else.

### 7. No pointer is the normal case, and no interaction media query is used

A device that never produces a pointer is not a degraded case. The flock flocks;
§2's *no pointer* is the ordinary argument, not an error state.

**The interaction media queries — `hover`, `any-hover`, `pointer`, `any-pointer`
— are Baseline widely available** (2018-12-11, widely 2021-06-11) and **this
record uses none of them.** Recorded as a no, in the way 0005 §8 records one, so
a later change does not have to work out whether it was considered.

Two reasons. Nothing here needs to know: the code path is the same either way
(§1) and absence is already handled (§2). And they answer badly on the devices
that matter most — a laptop with a touchscreen reports both, a tablet with a
keyboard case changes its answer when the case is attached, and the query cannot
say which one the visitor is using right now.

**The page depends on hover nowhere**, which 0005 §7 already secured by making
the control always visible rather than hover-revealed. This record adds no second
place where it would matter.

### 8. The drawing surface sets `touch-action: none`

**Baseline widely available** — available 2019-09-19, widely as of 2022-03-19.

Without it, a finger dragged across the canvas scrolls the page, the browser
takes the gesture, and `pointercancel` arrives mid-stroke. The flock would twitch
and stop — which is precisely the *reads as a bug* case in
[#11](https://github.com/nanatsusaya/dot-panic/issues/11), arrived at by
inaction.

**It applies to the drawing surface and to nothing else**, and it puts a
requirement on whatever decides the page's layout: **the imprint and the
explanation that 0001 §4 requires must stay reachable by a gesture that does not
begin on the canvas.** A canvas filling the viewport with `touch-action: none`
traps a touch visitor away from the text — which would fail 0004's whole subject
rather than merely looking bad.

**No record owns the page's layout**, so that requirement is stated here and
owned nowhere. *Consequences* says so plainly rather than leaving it to be
discovered.

### 9. What is asserted, and what is only ever watched

The same division 0006 §10 makes, because the boundary between them is what 0002
exists to keep visible.

**A command decides these, over the Core, with no browser:**

| | Invariant |
|---|---|
| §2 | The Shell does no arithmetic on the world |
| §5 | A dot beyond the radius receives exactly zero pointer force |
| §5 | The Core contains no position clamp and no exclusion zone |
| §4 | With presence ended, the influence reaches zero in a bounded number of steps |
| §6 | The radius is computed from the frame's shorter side |
| §7 | Stepping with no pointer produces valid worlds indefinitely |

**Only watching decides these**, with the expected picture written into the
ticket before the work starts, under 0012 §5:

- Whether the flock gets out of the way convincingly — 0001 §1 and §3.1
- The radius fraction, the decay length, the falloff shape, the force's strength
- Whether releasing a touch reads as a release rather than as a snap or a haunting

## Consequences

**Positive.**

- **One input path.** §1 removes the class of bug where mouse and touch disagree
  because two pieces of code were written months apart.
- **The Shell stays arithmetic-free.** §2 keeps every decision about how the
  flock reacts inside the part 0012 §4 tests, and the Shell becomes a translator.
- **Containment needed no new rule.** 0006's caps hold whatever the forces are,
  so §5 adds a force without reopening §6 or §7 of that record. This is what the
  caps were for.
- **Six more invariants**, on top of 0006's six, for the Core that 0012 §4 says
  is written test-first.

**Negative, and these are real.**

- **A parked cursor makes a permanent hole in the flock.** §3 reacts to position,
  so a visitor who leaves the mouse still has a dead zone on the page for as long
  as they leave it there. It is the honest consequence of *approach* meaning
  proximity, and it will look like a bug to somebody.
- **Nothing owns the page's layout, and §8 now needs it to.** The requirement
  that the imprint stay reachable on touch belongs to a record that does not
  exist and is not planned. This record states it and cannot enforce it — O1.
- **§4 puts pointer state in the world**, so the Core's world grows a last
  position and a strength that exist only because input exists. 0002 §5 leaves no
  alternative, and it is still a larger world and a larger test surface.
- **§6 ties the radius to the frame, and the frame is the Shell's.** A resize
  changes the radius mid-session, which no invariant here notices and no test
  covers.
- **`getCoalescedEvents` is not available, and §1 does not reach for it.** On a
  high-frequency pointer the Shell sees one position per frame and discards the
  path between, which 0001 §3.2 may eventually notice as lag on a fast flick.
  The reason is in *Alternatives considered* and it is the same reason 0005 §5
  could not use `devicePixelRatio`.
- **This record cannot be run either.** Nine sections, no numbers, nothing on a
  screen, and the one condition it exists to satisfy — 0001 §1 — is judged by
  watching.

## Alternatives considered

- **Mouse events and touch events as two code paths.** Rejected in §1: the
  difference between the devices becomes a discrepancy rather than the decision
  §4 makes.
- **Reacting to pointer velocity, or to position and velocity together.**
  Rejected in §3: a resting cursor would be inert, and something outside the Core
  would have to differentiate.
- **Ending the pointer's influence instantly on `pointerup`.** Rejected in §4;
  it is one of the two bugs [#11](https://github.com/nanatsusaya/dot-panic/issues/11)
  named, and 0006 §4 makes it worse rather than abrupt.
- **Keeping the last touch position alive until the next one.** Rejected in §4 as
  the other of the two.
- **An unbounded falloff — inverse square, or similar.** Rejected in §5: every
  dot reacting on every step is not *moves out of the way when the pointer
  approaches*.
- **An exclusion zone the dots may not enter.** Rejected in §5: a position
  constraint around a moving pointer is a position jump, against 0006 §4.
- **Branching on `any-pointer` or `any-hover`.** Rejected in §7: nothing needs
  the answer, and the answer is wrong on hybrid devices.
- **`PointerEvent.getCoalescedEvents()`, to recover the path between frames.**
  Rejected on 0001 §3.4. Safari and Safari iOS carry it only from 18.2, and
  Firefox for Android carries it as a partial implementation — *"the method
  always returns an empty array"*. Baseline marks a feature by its worst
  implementation, which 0005 R2 already recorded as the recurring case, so it
  cannot have reached widely available.
- **Leaving `touch-action` unset.** Rejected in §8: the browser takes the
  gesture, `pointercancel` arrives mid-stroke, and the toy does not work on
  touch at all.

## Open questions

**O1 — Does the page's layout need a record of its own?** §8 requires that the
imprint and the explanation stay reachable by a gesture that does not begin on
the canvas. Nothing owns that. 0005 decided the drawing surface and the control's
appearance; no planned record covers how the three things in 0001 §4 are arranged
on a page, how the canvas is sized against them, or what happens on a narrow
screen.

*Recommended default:* yes, a new record — the last free number, written after
0008 so it knows the frame it is arranging. The alternative is to widen an
existing planned record, which means changing a topic the index has already
fixed. But a new number changes the planned set, and the index is explicit that
where a record belongs is a decision rather than a consequence of counting,
which makes this yours rather than mine.

**O2 — Should a parked cursor keep pushing forever?** §3 reacts to position, so
it does: leave the mouse on the page and the flock keeps a hole around it for as
long as it sits there. The alternative is influence that fades even while the
pointer is present, so a motionless cursor eventually stops mattering and a
moving one always does.

*Recommended default:* as written — keep pushing. The hole is the flock avoiding
something, which is what the page is about, and a pointer that fades while
visibly present is a rule the visitor cannot see the reason for. But whether that
reads as *alive* or as *broken* is exactly the judgment 0001 §3.1 puts beyond any
command, and therefore yours.

## References

- Pointer Events — Baseline widely available, available 2020-07-28, widely
  2023-01-28; Chrome 55, Edge 12, Firefox 59, Firefox Android 79, Safari 13,
  Safari iOS 13. <https://api.webstatus.dev/v1/features/pointer-events-api>, read
  2026-08-02.
- `pointer-events`, the CSS property and a **different feature** — Baseline
  widely available, available 2015-07-29, widely 2018-01-29.
  <https://api.webstatus.dev/v1/features/pointer-events>, read 2026-08-02.
- Interaction media queries (`hover`, `any-hover`, `pointer`, `any-pointer`) —
  Baseline widely available, available 2018-12-11, widely 2021-06-11.
  <https://api.webstatus.dev/v1/features/interaction>, read 2026-08-02.
- `touch-action` — Baseline widely available, available 2019-09-19, widely
  2022-03-19. <https://api.webstatus.dev/v1/features/touch-action>, read
  2026-08-02.
- `PointerEvent.getCoalescedEvents()` — Safari and Safari iOS from 18.2; Firefox
  for Android recorded as a partial implementation, *"the method always returns
  an empty array"*. No `web-features` entry exists for it, so it carries no
  Baseline status at all.
  <https://bcd.developer.mozilla.org/bcd/api/v0/current/api.PointerEvent.getCoalescedEvents.json>,
  read 2026-08-02.
- [0002](0002-overall-architecture.md) §2, §4, §5 — the Shell owns input, the
  Core takes arguments, and no domain logic lives outside it. Read 2026-08-02.
- [0006](0006-motion-rules.md) §3, §4, §6, §7 — the caps this record relies on
  and the boundary behavior it composes with. Read 2026-08-02.
- [Ticket #11](https://github.com/nanatsusaya/dot-panic/issues/11) — the touch
  research and the two bugs it names. Read 2026-08-02.

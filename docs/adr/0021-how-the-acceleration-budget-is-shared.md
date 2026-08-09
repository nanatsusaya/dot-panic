# 0021 — How the acceleration budget is shared

- **Status:** Accepted
- **Date:** 2026-08-09
- **Deciders:** Daniel Wagner
- **Ticket:** [#261](https://github.com/nanatsusaya/dot-panic/issues/261)
- **Depends on:** [0006](0006-motion-rules.md) §1 (the three steering behaviors
  and their weights), §4 (the change in velocity across a step is at most
  `amax`), §6 (the edge is a turning force, and the margin's relation), §7 (a
  cornered pile is tolerated and must dissolve), §10 (what a command decides) ·
  [0007](0007-pointer-and-input-model.md) §5 (the pointer contributes a force,
  and containment is claimed to survive it) ·
  [0002](0002-overall-architecture.md) §4 (the step is a function of a world) ·
  [0012](0012-how-software-gets-developed.md) §5 (what watching decides)
- **Supersedes / amends:** supersedes nothing. Amends
  [0006](0006-motion-rules.md) §10, recorded there as its A2, and
  [0007](0007-pointer-and-input-model.md) §5, recorded there as its A2 —
  neither of them a rule this record changes, which is §3
- **Amended:** no

## Context

**0006 §4 bounds a result and says nothing about how the forces reach it.** Its
sentence is *the change in a dot's velocity across one step is at most `amax`*,
and every force acting on a dot contributes to that one change: §1's separation,
alignment and cohesion, §6's edge force, and 0007 §5's pointer. The
implementation sums all of them and bounds the sum, which is the obvious reading
and was never decided.

**The consequence is that a force pointing outward is subtracted from the edge
force before anything is capped**, so containment does not merely compete with
steering — it can be canceled by it. Two tickets reached that wall from opposite
sides on 2026-08-09, and neither could go further.

- [#216](https://github.com/nanatsusaya/dot-panic/issues/216) raised separation
  until the flock stopped being one crystal. At a separation share of 0.889 a
  pile placed in a corner put a dot 0.00046 of the shorter side outside the
  frame, and `core/step.test.ts` refused it. The mix that landed is capped at a
  share of 0.706 — 0.706 holds the pile, 0.762 loses a dot — and the mix that
  behaves best is inadmissible.
- [#106](https://github.com/nanatsusaya/dot-panic/issues/106) raised the
  pointer. At a peak of 3.0 a dot ended 0.0432 outside, which is ninety times
  the other excursion.

**The margin cannot pay for it**, and that was measured rather than assumed.
Doubling `EDGE_MARGIN` takes the worst excursion from 0.00046 to 0.00036 and
never to zero: 0006 §6 sizes the margin as the distance a dot needs in order to
be turned, and **a pile placed in a corner starts at the edge with no distance
left**.

**What makes this worth a record now is a watch and not the arithmetic.** The
weights that landed were watched on 2026-08-09 over 120 frames: two bodies, then
three, and at one point a crescent with two loose satellites — the first picture
this project has produced that reads as a flock — and then a single loose lattice
again. **So the direction is right and what is capped is the strength**, which is
the argument this record needs and which did not exist before that recording.

**0007 §5 already claims the thing that fails.** Its closing paragraph reads
*containment survives this, and it needs no new rule*, reasoning that 0006 §3 and
§4 cap speed and acceleration whatever the forces are, so no force added there
can carry a dot through the margin. The reasoning holds for a dot's *speed* and
does not hold for the *direction* the bounded sum ends up pointing, which is what
#106 measured. `R1` is what that left.

## Decision

### 1. Containment claims the budget first, and steering receives what is left

Let `c` be 0006 §6's containment force and `s` the sum of every other force
acting on the dot — §1's three behaviors and 0007 §5's pointer.

- **`c` is bounded to `amax` on its own.**
- **`s` is bounded to `amax − |c|`.**
- **The change in velocity is `c + s`.**

**`|c + s| ≤ |c| + |s| ≤ amax` by the triangle inequality**, so 0006 §4 holds by
construction and no second bounding step is needed. Today's single bound over the
sum is precisely what allows the two to cancel; this removes that without
weakening anything §4 asserts.

**At the edge, `|c|` is `amax` and steering receives nothing.** That is the case
both findings failed on, and it is the case this record exists to change: a dot
at the edge is turned inward by the full budget, whatever the flock around it
wants.

### 2. The pointer is steering for this purpose

0007 §5's force sits inside `s` and yields to containment exactly as separation
does. It is a force the visitor aims, which makes it the one most able to point
a dot out of the frame, and #106's excursion is ninety times #216's for that
reason.

**This is not a change to 0007 §5's own rules.** The falloff, the finite radius
and the refusal to constrain position are that record's and are untouched. What
is decided here is where its contribution sits relative to containment, which
0007 does not say and could not have said — §5's containment paragraph assumes
the answer rather than choosing it.

### 3. No rule in 0006 or 0007 changes, and the reason is that §4 constrains a result

0006 §4 fixes what the change in velocity may be. It does not fix how the forces
divide the budget, and the sections around it do not either: §1 gives the three
behaviors weights relative to *each other*, §6 gives the edge force its shape and
its margin, and §10 asserts the bound rather than the arithmetic behind it. **A
record deciding the sharing adds a decision where there was none.**

**§6's margin relation becomes true rather than aspirational.** It is derived as
the distance a dot at the ceiling needs while being turned under the bound in §4
— which assumed the edge force had that bound to spend. Under §1 above it does.

**§4's second half is untouched.** A gait stays a consequence, no dot carries a
preferred speed, and nothing here gives a dot state of its own.

**Two amendments follow from this record and neither one is a rule.** 0007 §5's
containment paragraph keeps its claim and loses a reasoning that
[#106](https://github.com/nanatsusaya/dot-panic/issues/106) falsified, and 0006
§10's table gains the row §5 names. `R1` and `R3` carry both, with the
authorization that permitted them.

### 4. A cornered pile is dispersed by the speed floor and the non-overlap correction, not by separation

0006 §7 requires that a pile in a corner leaves it within a bounded number of
steps, and §1 above means separation contributes nothing to a dot that is at the
edge. **This is stated rather than left to be discovered**, because a reader who
works out §1's consequence will reach for §7 next.

Nothing new is needed and §7 already says so in its own words: §3 keeps every dot
above `vmin` so a pile has no resting state, and §2's non-overlap correction
keeps it a crowd rather than a collapse. **What changes is that the dispersal now
runs against a stronger inward force**, so §7's *bounded number of steps* is a
larger number than it was. It stays bounded and it stays asserted.

### 5. What this makes decidable, and what it leaves to watching

**A command decides one thing more than it did**: that the containment force and
the steering sum are bounded separately, and that their magnitudes satisfy
`|s| ≤ amax − |c|` for every dot in a returned world. **0006 §10's table carries
that row**, added as that record's A2. Like the six §10 was written with, it is a
list handed to the implementer under 0012 §4 rather than a claim that a command
already decides it — 0006's own *Consequences* says so, and the ticket that
builds this is what makes it true.

**It does not make *no dot outside the frame* provable**, and claiming otherwise
would be the kind of reassurance the shape of a record warns about. What §1
guarantees is that the net force is inward wherever `|c| > amax/2`, which is the
outer half of the margin — the region both findings failed in. Whether the
invariant holds for any world and any seed is what `core/step.test.ts` decides,
as it does today.

**Everything about how it looks stays watched**, under 0012 §5 and 0006 §10's
second list. This record fixes no number, and the strength it unlocks is #216's
to choose by watching.

## Consequences

**Positive.**

- **The ceiling on separation's share is gone as a structural limit.** #216 can
  choose its weights against how the flock reads rather than against what a
  containment test tolerates, which is 0001 §3.1 deciding the thing it is
  supposed to decide.
- **0007 §5's claim becomes true.** Containment does survive the pointer — by a
  rule, which is the half of that paragraph that was wrong.
- **One cause is repaired rather than two symptoms.** #216 and #106 measured the
  same defect through different forces, and neither ticket could have fixed it
  without taking territory the other owned.
- **§6's margin relation stops resting on an assumption** that the code did not
  honor.

**Negative, and these are real.**

- **Steering weakens near an edge and the flock may look stiff there.** Inside
  the outer margin a dot's separation, alignment and cohesion are scaled down by
  however much containment is taking, and nothing asserts that this looks like
  anything. It is a watched consequence and the ticket that builds it carries the
  criterion.
- **The pointer becomes harder to push a flock into a corner with.** That is the
  same mechanism seen from the visitor's side, and it may read as the page
  resisting — which 0006 §7 rejects by name for a different force. Whether it
  does is watched, and [#233](https://github.com/nanatsusaya/dot-panic/issues/233)
  is where the pointer's numbers are rechosen against it.
- **§7's dispersal takes longer**, and the bound in its assertion is a number
  somebody will have to raise.
- **The bound on `s` is conservative.** The triangle inequality is tight only
  when `c` and `s` point the same way, so a dot whose steering points *inward*
  is scaled down for nothing. A vector-exact budget would not do that, and
  *Alternatives considered* is where it was rejected.

## Alternatives considered

- **Leave it: cap separation's share at 0.706 and the pointer's peak below
  `amax`.** Rejected because it makes 0001 §3.1's judgment answerable only within
  a limit nobody chose, and because it caps two records' numbers from a third
  place that says nothing about either.
- **Widen `EDGE_MARGIN`.** Rejected on measurement: 0.08 to 0.16 moves the worst
  excursion by a fifth and never to zero, for the reason in *Context*.
- **Separate fixed budgets** — containment gets a fraction of `amax`, steering
  the rest, both fixed. Rejected because it is §1 with the sharing frozen at a
  number, and the number would be one 0006 §10 has to put in the watched
  register; §1 derives the split from where the dot is instead.
- **Containment as a constraint on the result**, applied after the step the way
  0006 §2's non-overlap is. Rejected because §6 forbids a clamp on position by
  name, and a correction that moves a *velocity* after the bound has been applied
  reopens §4 — which is the invariant this record is built to keep.
- **A vector-exact budget**: bound `s` so that `|c + s| ≤ amax` exactly, rather
  than by the triangle inequality. Rejected as the first version because it is a
  quadratic in the scale factor and a harder thing to read in a test, and because
  the conservative form is strictly safer. It is the obvious refinement if the
  stiffness in *Consequences* turns out to be visible.

## Resolved questions

**All three answered by the decider on 2026-08-09**, against
[PR #262](https://github.com/nanatsusaya/dot-panic/pull/262): *"Zu #262 folgen
wir deiner Empfehlung"* — the recommendation being (a) in each case. Two of them
are amendments, and that sentence is the authorization they exist under; each
quotes it where it lives.

**R1 — 0007 §5's containment paragraph is amended.** Its claim, *containment
survives this*, becomes true under §1 above. Its reasoning, *and it needs no new
rule*, is what #106 falsified: 0006 §3 and §4 cap a dot's speed and the size of
the change, and neither fixes the **direction** the bounded sum ends up pointing.
The sentence was load-bearing in the wrong direction — a later session reading
*it needs no new rule* has been told it may add a force without thinking about
containment, which is the mistake #106 made and paid for. Recorded as 0007's A2,
where the superseded wording is quoted.

**R2 — steering receives nothing at the very edge, and §1 stands as drafted.** A
reserved floor was rejected rather than deferred: it reintroduces the
cancellation this record removes, smaller and harder to reason about, and it
needs a number whose only job is to weaken an invariant — which 0006 §10 would
then have to put in the register only watching decides. **The answer if it turns
out to look wrong is not that floor.** It is the vector-exact budget in
*Alternatives considered*, which recovers the same headroom without giving
anything back to a force pointing outward. Nothing in this record changed for
R2, which is the outcome a recommended default is supposed to have.

**R3 — 0006 §10's asserted table gains the row.** §10 is where that record says
what a command decides about motion, and an invariant absent from it is invisible
to a session reading only 0006. Recorded as 0006's A2, which also takes that
record's count of invariants from seven to eight. **The two amendments were
authorized in one sentence and are written as two**, one per affected record,
because that is where each of them is read.

## References

- [0006](0006-motion-rules.md) §4, §6, §7, §10, read 2026-08-09.
- [0007](0007-pointer-and-input-model.md) §5, read 2026-08-09.
- [#216](https://github.com/nanatsusaya/dot-panic/issues/216)'s finding of
  2026-08-09 — the share table, the `EDGE_MARGIN` sweep and the two ways out.
- [#106](https://github.com/nanatsusaya/dot-panic/issues/106)'s measurement of a
  pointer at peak 3.0, 2026-08-09.
- [The watch of the weights that landed](https://github.com/nanatsusaya/dot-panic/pull/259#issuecomment-5233808134),
  2026-08-09.

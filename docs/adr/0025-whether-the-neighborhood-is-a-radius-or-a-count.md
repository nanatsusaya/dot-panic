# 0025 — Whether the neighborhood is a radius or a count

- **Status:** Proposed
- **Date:** 2026-10-28
- **Deciders:** Daniel Wagner
- **Ticket:** [#290](https://github.com/nanatsusaya/dot-panic/issues/290)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (*it reads as a
  flock* is judged by watching and by no command) ·
  [0004](0004-compliance-accessibility-and-rights.md) (the model is
  reimplemented rather than copied, which is what lets it be simplified) ·
  [0006](0006-motion-rules.md) §1 (the section this amends), §2 (the packing
  floor), §6 (the margin condition), §10 (which numbers only watching decides) ·
  [0008](0008-performance-budget.md) §7 (neighbor search is the cost) ·
  [0022](0022-who-watches.md) §2, §3 (what a watch is, and whose look closes a
  criterion)
- **Supersedes / amends:** amends [0006](0006-motion-rules.md) §1
- **Amended:** no

## Context

**Four weightings have been chosen by measurement and refused at the page.**
[#267](https://github.com/nanatsusaya/dot-panic/issues/267)'s separation weight
of 10, [#269](https://github.com/nanatsusaya/dot-panic/issues/269)'s reach of
0.03, the alignment pass of 2026-09-20, and
[PR #289](https://github.com/nanatsusaya/dot-panic/pull/289) on 2026-10-28 —
*das verhält sich nicht wie ein scharm*. Four passes failing the same way is a
statement about the shape rather than about the weights, and this record is what
that statement turned into.

**A dot here has five times as many neighbors as a starling, and it is the
flock's own doing.** 0006 §1 makes the neighborhood *a circle of fixed radius
around each dot, the same radius for every dot*. At 200 dots over a 16:9 frame a
uniform scatter puts 6.9 dots inside `NEIGHBORHOOD_RADIUS`, and the initial
arrangement measures 7.9 — the right number, against the **6.5 ± 0.9** that
Ballerini et al. measured in real starling flocks. Ten seconds later it is 32.9,
and over two minutes it runs **31 to 46** with peaks at **86**.

**That is a loop rather than a drift.** A metric radius makes the count a
function of local density; the density is what the flock produces; and Hemelrijk
and Hildenbrandt measured what a high count does — in their starling model fewer
interaction partners make a flock's shape more variable, and **at 50 partners the
shape is nearly constant**. So coarsening raises the count, a high count makes a
group rigid, and a rigid group coarsens.

**Ballerini's field evidence is a measurement of exactly this property.** Across
ten flocks the topological range is uncorrelated with how sparse the flock is
(R² = 0.00021, P = 0.97) where the metric range correlates strongly
(R² = 0.78, P < 0.00072). Their simulations put numbers on what it buys: under a
predator attack stragglers were 43 % of connected components with a metric
interaction against 5 % with a topological one, and at an obstacle 24 % against
0.7 %.

**Reynolds' own neighborhood is a distance and an angle**, and 0006 §1 dropped
the angle deliberately, predicting that *adding it later changes a number, not
the structure*. It did not drop the distance, and the distance is what this
record is about. The prediction about the angle survives §4's measurement below.

## Decision

### 1. The neighborhood becomes a count, and the radius follows from it

**A dot's neighbors are the `NEIGHBORHOOD_COUNT` nearest dots, and its
neighborhood radius is the distance to the furthest of them.** The radius is a
result rather than a setting, it differs per dot, and it changes every step —
which is how StarDisplay describes the same rule, adjusting a metric radius each
step to approach a fixed number of partners.

**The amended sentence.** 0006 §1 reads, and until this record is accepted
continues to read:

> **The neighborhood is a circle of fixed radius around each dot, the same
> radius for every dot.**

After this record the neighborhood is a fixed count of nearest dots, and the
circle it implies has a radius per dot per step. The section's heading moves
with it: *over a neighborhood that is a radius* becomes *over a neighborhood
that is a count*. Everything else in §1 stands — the three behaviors, their
locality, separation's shorter reach, and the reasoning about one reach for all
three.

**Checkable by reading:** no module reads a single constant as the neighborhood's
radius, and the count is the only free parameter of the neighborhood.

### 2. Seven, and the number is structural rather than watched

**`NEIGHBORHOOD_COUNT` is 7.** It is not one of 0006 §10's numbers: those are the
ones only watching decides, and this one has a field measurement behind it —
6.5 ± 0.9 interacting neighbors, with the anisotropy of real flocks becoming
isotropic between the sixth and seventh neighbor. Seven is the integer that
measurement names.

**It was measured here as well, at the weights that are on the trunk** — three
seeds, three minutes, no pointer, nothing else changed:

| | largest body | max | groups of 5+ | occupancy |
|---|---|---|---|---|
| a radius, as it is now | 158 | 200 | 2.2 | 0.179 |
| 5 nearest | 56.5 | 136 | 11.1 | 0.324 |
| **7 nearest** | **75.5** | 135 | **7.7** | 0.285 |
| 10 nearest | 87.4 | 199 | 6.0 | 0.259 |

Five and ten both work; seven is chosen because the field number is 6.5 and
neither neighbor of it is better on what was measured.

**Checkable by reading:** the constant carries the field figure and the record
it comes from.

### 3. There is no cap, and a straggler is not cut off

**A dot takes its seven nearest wherever they are.** The alternative — the seven
nearest *within* the old radius — was measured and is slightly worse where it
differs: the same three seeds give a largest body reaching **189** against
**135**, because a dot that has drifted out of everything's radius stops being
pulled back and the remainder closes without it. That is the straggler evaporation
Ballerini's attack simulation measures, arriving by a quieter route.

**`NEIGHBORHOOD_RADIUS` is retired.** It has no remaining reader: the
neighborhood no longer has one, and cohesion normalizes by the dot's own current
radius under §1.

**Checkable by reading:** the constant is gone, and nothing imports it.

### 4. Reynolds' cone stays dropped

0006 §1 dropped it with a reason and a prediction. Measured here at seven
neighbors, a rear blind angle of 90° moves the largest body from 75.5 to 95.4 and
groups of five from 7.7 to 6.5; at 120°, to 99.5 and 6.1. Neither changes the
character and both are slightly worse on the statistics.

**So the prediction holds and the cone remains a number rather than structure.**
It is not reopened here, and a later ticket may still fix it by watching.

### 5. Separation's shorter reach survives, and it is now a measured claim

0006 §1 makes separation's reach **strictly shorter** than the neighborhood's.
With a radius per dot per step that stops being a relation a command checks once
and becomes a statement about a distribution, so it was measured: over three
minutes the seventh-nearest distance has a median of **0.0602** and a fifth
percentile of **0.0402**, against per-dot reaches of 0.021 to 0.039. The share of
dot-steps where a dot's own reach exceeds its neighborhood radius is **0.0013**.

**The relation is kept as a claim about the typical case and no longer as an
invariant**, because at a count it cannot be one: a dot in a tight knot can have
its seventh neighbor closer than its own reach, and the correct behavior there is
the one the code already has — separation answers whoever is inside its reach,
and those are a superset of the seven only in that knot.

**Checkable by running:** the share above is reproducible from the Core.

## Consequences

**The weights stop being the lever and the coarsening stops being theirs.** Every
measurement in this project since 2026-08-09 has read the weights against a
neighbor count that was itself moving; the four refused passes were each chosen
inside that. What #216 chooses after this is a different question from what it
has been choosing.

**Alignment 2 becomes affordable again, and that is what buys back the gliding.**
The watched failure of 2026-09-20 was wriggling at a low alignment and a lattice
at a high one, and nothing in between was both. At seven neighbors the trunk's
alignment of 2 gives several distinct groups, each a bundle of parallel smooth
paths, with voids between them — measured at 30, 90 and 150 seconds.

**A test goes red by design.** `core/step.test.ts` carries a block named for the
sentence this amends — *the neighborhood, which is a radius and nothing else* —
asserting the boundary at 0.99 and 1.01 of the constant. It is the mechanism
0010 §2 asks for, working: a decision reversed in code turns a test red rather
than passing quietly.

**The cost of neighbor search does not change**, and 0008 §7 is untouched: a
k-nearest selection reads the same pairs a radius scan reads. #104's trigger is
still a budget found to have drifted.

**This record does not make the toy good enough.** It removes one cause measured
to be acting; whether what remains reads as a flock is 0001 §3.1's and the
decider's, and no amendment settles it.

## Alternatives considered

**Keep the radius and lower it.** `NEIGHBORHOOD_RADIUS` at 0.10 puts the mean
count at 7.2 — the field figure — and leaves the group statistics almost where
they were (largest body 54 to 47, groups 6.6 to 7.7). It is rejected because the
mean is not the quantity that misbehaves: the maximum stays at 24, and the count
still rises with the flock's own density, so the loop in *Context* is untouched.
It is a number #216 may still take, and it is not an answer to this question.

**Keep the radius and keep sweeping the weights.** Rejected on the evidence of
four refusals. A sweep cannot reach a quantity the weights do not move.

**Take the blind angle instead.** Rejected under §4: measured, it is not the
lever, and 0006 §1's existing reasoning for dropping it is unbroken.

**Take StarDisplay's adaptive radius literally** — a metric radius nudged each
step toward the target count. Rejected as the same rule with a lag: it reaches
the k-nearest set asymptotically and adds a smoothing constant that would itself
need watching.

## Open questions

- **O1 — is seven the number, or is five?** §2 takes seven on the field figure.
  Five disperses further (largest body 56.5 against 75.5, groups 11.1 against
  7.7) and looked, in four seconds of path, like more and smaller groups.
  **Recommended: seven**, because the measurement that motivates the whole change
  is 6.5 and choosing five would be choosing by preference the record cannot
  defend. If the watch prefers five, it is a one-character change and this
  question is where it is recorded.
- **O2 — does `NEIGHBORHOOD_RADIUS` go, or stay as a search cap?** §3 retires it
  on the measurement that the cap is slightly worse. **Recommended: it goes.**
  The alternative keeps a constant whose only reader would be an optimization
  0008 §7 has not asked for.
- **O3 — is the amendment to 0006 §1 authorized?** It is the whole of this
  record and it is the decider's alone. **No default is recommended**, because a
  recommendation for one's own amendment is what the rule against editing an
  accepted record exists to prevent.

## References

- [Ballerini et al. 2008, *PNAS* 105(4):1232–1237](https://pmc.ncbi.nlm.nih.gov/articles/PMC2234121/),
  read 2026-10-28 — the topological interaction, the 6.5 ± 0.9 figure, the
  anisotropy evidence, the density test and the attack simulations
- [Hemelrijk & Hildenbrandt 2011, *PLoS ONE* 6(8):e22479](https://pmc.ncbi.nlm.nih.gov/articles/PMC3150374),
  read 2026-10-28 — StarDisplay's fixed number of partners with the radius
  adjusted each step, the 2×45° rear blind angle, and what the number of partners
  does to a flock's shape
- [Reynolds, *Boids*](https://www.red3d.com/cwr/boids/), read 2026-10-28 — the
  neighborhood as a distance **and** an angle, and the three steering behaviors
- The measurements in this record were taken on a throwaway copy of the Core
  outside the repository, under 0022 §4: three seeds, three to five minutes, no
  pointer, 16:9, 200 dots, and nothing changed but the neighborhood

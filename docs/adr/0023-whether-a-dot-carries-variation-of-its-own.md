# 0023 — Whether a dot carries variation of its own

- **Status:** Proposed
- **Date:** 2026-09-20
- **Deciders:** Daniel Wagner
- **Ticket:** [#228](https://github.com/nanatsusaya/dot-panic/issues/228)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (*it reads as
  a flock* is judged by watching, and no command decides it), §6 (the ranked
  failures) · [0002](0002-overall-architecture.md) §4 (randomness arrives as a
  seed; the Core derives its generator from it and carries the generator's state
  in the world) · [0006](0006-motion-rules.md) §1 (the three behaviors, and a
  separation reach that is strictly shorter than the neighborhood's), §2
  (non-overlap as a constraint on the result), §3 (the speed band), §4 (no dot
  carries a gait, and the per-dot value it rejects), §10 (what is asserted and
  what is only ever watched), R2 (the route by which the rejected value may
  arrive) · [0008](0008-performance-budget.md) R1 (a record fixes relations and
  no numbers) · [0010](0010-testing-strategy.md) §2 (the three registers) ·
  [0012](0012-how-software-gets-developed.md) §4 (test-first in the Core), §5
  (watch-first, with the expected picture in the ticket first) ·
  [0022](0022-who-watches.md) §2 (what an agent's watch is), §3 (the decider
  looks once, at the end), §4 (measurement chooses between candidates and closes
  nothing)
- **Supersedes / amends:** amends [0006](0006-motion-rules.md) §4, recorded
  there as its A3
- **Amended:** no

## Context

**0006 §4 decided that no dot carries anything of its own, and wrote down what
would reopen it.** *A gait is not something a dot carries. No dot has a mode, a
temperament, or a preferred speed of its own.* It rejected the alternative — a
per-dot value drawn from the seed — as per-dot state whose only job is to make
dots differ, at the cost of a larger world and a larger test surface, and R2
fixed the route back: *if watching shows a settled flock moving uniformly, the
fix is a preferred speed per dot drawn from the seed — and §4 decides against
exactly that, so it arrives by an authorized amendment or a superseding record,
never by adding a field to the world because the flock looked flat.*
[#228](https://github.com/nanatsusaya/dot-panic/issues/228) is that trigger
filed, on 2026-08-09, when the decider first said the flock was *noch nicht
perfekt, insbesondere wenn ich an Vogel- oder Fischschwarm-Bewegungen denke*
and proposed both halves himself. It waited on the pointer, because every
measurement it carried came from a flock nothing disturbed.

**Two watches on 2026-09-20 bracket the problem from both ends, and neither is
about uniformity.** The decider watched reach 0.03 at an alignment weight of
0.25 and rejected it: the dots inside a group *zappeln und zittern*, nothing
glides, the elegance of a real flock is absent. The agent then watched alignment
1 under [0022](0022-who-watches.md) §2 and rejected it the other way: every
group a regular hexagonal lattice from the first frame, all two hundred one
sliding body by ninety seconds — the crystal of 2026-08-09 that #238 recorded
and that lowering alignment had been for. Measured on the Core between the two
(three seeds, twenty seconds settled, ninety read): at 0.25 six-fold order 0.43,
polarization 0.77–0.79, neighbors moving relative to one another at 0.57–0.62 of
their own speed; at 1, six-fold order 0.68–0.70, polarization 0.92–0.93,
relative motion 0.22–0.23. **Alignment moves the flock along one axis between
those two failures.** It removes relative motion, and nothing in 0006 §1's
three behaviors puts any back except the wrong kind — so no weight on it is both
gliding and soft, and the numbers #216 owns cannot reach what the decider asked
for.

**What real flocks have is variation that alignment cannot consume.** #228's
own table found that per-dot variation *moved very little* and named alignment
as the reason: it pulls neighbors onto a common velocity and eats exactly the
variation a preferred speed introduces. That was measured at #99's weights,
where the flock was one block whatever else was true, and it is not true at
today's reach and separation weight — because a reach that differs per dot is
variation in the *spacing*, and alignment acts on velocity. Measured the same
way, with throwaway code outside the repository
([the comment on #228](https://github.com/nanatsusaya/dot-panic/issues/228#issuecomment-5752340795)
carries the whole table):

| variant | six-fold order | polarization | relative / own speed | mean speed | largest body at 90 s |
|---|---|---|---|---|---|
| alignment 0.25, as on `main` | 0.43 | 0.77–0.79 | 0.57–0.62 | 0.080 | 89–98 |
| alignment 2 | 0.71–0.76 | 0.93–0.94 | 0.14–0.18 | 0.057 | 132–200 |
| alignment 2, heading noise 6° per step | 0.42–0.43 | 0.77–0.81 | 0.69–0.73 | 0.052 | 155–200 |
| **alignment 2, separation reach ±30 % per dot, drawn once** | **0.38–0.41** | **0.90–0.91** | **0.22–0.24** | **0.090** | 94–179 |

Six-fold order is the lattice measure #228 named — the mean resultant of
`exp(6iθ)` over neighbors within 0.045, where 1 is a perfect hexagonal lattice
and about 0.4 a random arrangement. The last row is the combination nothing
else reaches: polarized like a real flock, less ordered than a random
arrangement, a quarter of the relative motion, faster rather than slower, and
short of one body through ninety seconds. **Per-step noise is not that row.** It
breaks the lattice only by restoring the relative motion the decider rejected —
at 6° per step the polarization is back where 0.25 had it and the turn rate is
three times worse. Variation that reads as elegance is slow or fixed; white
noise at sixty hertz is the wriggling by another name.

**What is genuinely open** is not whether the mechanism works — that is measured
— but whether a dot may carry it at all, which of the two values #228 named it
is, whether it is drawn once or drifts, and what it is measured against before
it is watched. Those are #228's five questions, 0006 §4 owns the first, and
0001 §3.1 owns the last. This record answers them as a record and not as a
field added to the world.

**What this is not.** It does not choose the spread: [0008](0008-performance-budget.md)
R1 keeps every number in the code and in the ticket that fixed the criteria,
and the ±30 % above is the value the measurement was taken at, not the value
decided. It does not touch 0006 §1's three behaviors, §2's constraint, §3's
band or §6's edge. It adds no adaptation: the motion rules are this project's
own.

## Decision

### 1. A dot carries one value of its own: the reach its separation acts over

0006 §4's *no dot has a mode, a temperament, or a preferred speed of its own*
stands for speed and for everything else, and gains one exception: **each dot
carries its own separation reach**, the radius inside which §1's separation
answers neighbors. Nothing else about a dot is its own — not its speed, not its
band, not its weights, not its neighborhood.

**Checkable by reading:** the `Dot` type carries exactly one field beyond
position and velocity, and it is a length.

### 2. It is drawn once, from the seeded generator, when the world is created

The value is fixed for the life of the dot. It comes out of the world's
generator in `createWorld`, in the same pass that places the dot and turns it,
and is carried in the world from then on — 0002 §4's only route. **It does not
drift**: per-dot state advanced every step is the larger world and the larger
test surface 0006 §4 gave as its reason, and the measurement above did not need
it. A resize does not redraw it (0006 §6's *a resize rebuilds nothing* holds),
and neither does anything else.

**Checkable by a command:** the same seed produces the same reaches
(0002 §4's determinism test extends to the field), and a stepped world's
reaches equal the created world's.

### 3. It is a factor on the shared reach, bounded so that every relation holds

A dot's reach is `SEPARATION_RADIUS` scaled by a factor in a closed range around
1, and the range is a number chosen under #216 like the rest — this record fixes
the relations the range must satisfy:

1. **0006 §1's *strictly shorter* holds for every dot**: the largest reach any
   dot can carry is shorter than `NEIGHBORHOOD_RADIUS`. The §10 assertion that
   decides it today decides it for the maximum of the range.
2. **The factor is strictly positive**, so a dot never carries a reach of zero
   and separation never vanishes for it.
3. **Non-overlap is untouched.** 0006 §2's `2r` is a constraint on the result
   and not a reach; a dot's factor scales what its separation looks at, not what
   it may end a step touching.

**Checkable by a command:** a test asserts the three over the range's bounds,
and the purity and determinism tests over `core/` are unchanged in scope.

### 4. Where it enters the step, and what it leaves alone

Separation reads the *steering* dot's reach: a dot answers the neighbors inside
its own circle, at the urgency its own reach gives. That is the asymmetry the
measurement was taken with — two dots may each be inside the other's reach or
not — and it is kept because it is what a dot's own value means. Alignment and
cohesion still take the whole neighborhood, and the neighborhood is still one
radius for every dot (0006 §1, unchanged).

### 5. What it is measured against, and what decides it

The measured register (0010 §2, 0022 §4) chooses the spread and says why a
state fails; it closes nothing. The three figures are the ones this record was
argued from and #228 named: six-fold order over neighbors within a short reach,
polarization over the neighborhood, and relative neighbor speed against own
speed — with the largest connected body over time beside them, because #238
stays open. The expected picture stands in #216 before the work starts (0012
§5), the agent watches under 0022 §2, and the decider looks once at the end
(0022 §3). *It reads as a flock* is his.

### 6. The sentences of 0006 this changes, and the ones it leaves

§4's paragraph beginning *A gait is not something a dot carries* and the
paragraph rejecting the alternative are amended as A3 in 0006, with the
superseded wording quoted there. §4's bound on change in velocity is untouched.
R2 stands as history: this record is the *superseding record* it named. §1, §2,
§3, §6, §7 and §10's asserted list are unchanged, except that §10's first row —
*separation's reach is shorter than the neighborhood's* — is now read over the
range's maximum (§3.1 above) and says so in A3.

## Consequences

**Positive.**

- A state that is polarized and not a lattice is reachable, which no number in
  #216's table could reach. The two failures of 2026-09-20 stop being the only
  two states.
- The world grows by one number per dot and no per-step state; determinism,
  purity and the four checks are unchanged in what they decide.
- 0006 §4's *the cost of this choice is real* is paid on the one value the
  measurement shows earning it, and on no other.

**Negative, and real.**

- **0006 §4 is amended on the ground it named**, five weeks after being
  accepted. Its reasoning — per-dot state whose only job is to make dots
  differ — was right about speed and is right still; the exception is narrow
  because the reasoning survives.
- **A larger `Dot`, and every test that builds one builds it with a reach.**
  #102's non-overlap suite, the containment tests, the pointer tests — each
  constructs dots by hand, and each grows a field. That is the test surface §4
  priced.
- **Two dots may see each other asymmetrically.** A pair inside one reach and
  outside the other is pushed by one side only; the measurement was taken that
  way and it did not read as a defect, but it is a thing a later reader will
  wonder about, and §4 is where the answer is.
- **The lattice measure can be optimized against.** Six-fold order below 0.4 is
  what the argument rests on, and it is a proxy; 0001 §3.1 and 0022 §3 are what
  keep it from becoming the criterion.
- **The spread is one more number chosen by watching**, and #216's table grows
  a row. The pass that lands it moves alignment in the same change, because the
  measurement was taken with both and neither alone reaches the row above —
  which is two numbers in one change, and the change says so.

## Alternatives considered

- **A preferred speed per dot** — #228's other half — rejected because a
  settled flock sits mid-band and touches neither end, so a per-dot band does
  nothing and a per-dot *target* is a fourth steering behavior, crossing 0006
  §1 as well as §4; and because alignment consumes it, which #228 measured.
- **Both, reach and speed** — rejected because the reach alone reaches the row
  and the second value would be state with no measured job.
- **A drifting value** — rejected by §2: per-step state, the cost §4 named, and
  not needed for the measured effect.
- **Heading noise per step** — rejected by the measurement: it is the wriggling
  the decider rejected, produced deliberately.
- **A fission mechanism in 0006 §1** — a rule that splits a body — rejected
  here because it is a change to the three behaviors and #228's own constraint
  keeps it out; #238 stays open on whether one is needed.
- **Raising alignment alone** — rejected by the watch of 2026-09-20 on #216.
- **Leaving 0006 §4 as it is** — rejected because both ends of the one axis the
  numbers can move along have been watched and refused, and the decider asked
  for what neither gives.

## Open questions

- **O1 — Reach, and only the reach?** Default: yes — §1 as written. Speed is
  #228's other half and is rejected in *Alternatives* for reasons that were
  measured; adding it back is a second record.
- **O2 — Drawn once, never drifting?** Default: yes — §2 as written. Drift is
  per-step state; the measured effect did not need it.
- **O3 — Does the change that builds this move `ALIGNMENT_WEIGHT` in the same
  pass under #216?** Default: yes. The measurement was taken with both and
  neither alone reaches the row; a change that lands one without the other
  lands a state nobody measured. It is two numbers in one change, and the
  change description names both and why.
- **O4 — Does the decider's one look (0022 §3) come on the first state the
  agent calls good, or after the other five numbers of #216 have been looked at
  as well?** Default: on the first state the agent calls good. He rejected 0.03
  after one look; a state that clears his bar is worth knowing about before the
  rest of the table is swept against it.

## References

- [0006](0006-motion-rules.md) §1, §4, §10, R2, read 2026-09-20 — the
  rejection, its reason, and the route back.
- [#228](https://github.com/nanatsusaya/dot-panic/issues/228), read
  2026-09-20 — the trigger, the five questions, the earlier table, and
  [the measurement of 2026-09-20](https://github.com/nanatsusaya/dot-panic/issues/228#issuecomment-5752340795).
- [#216, the watch of 2026-09-20](https://github.com/nanatsusaya/dot-panic/issues/216#issuecomment-5752338023)
  — alignment 1 refused as a sliding lattice, whose eyes and what was seen.
- [PR #269, comment of 2026-09-20](https://github.com/nanatsusaya/dot-panic/pull/269#issuecomment-5752123820)
  — the decider's verdict on 0.03 and the measurement behind it.
- A. Cavagna, A. Cimarelli, I. Giardina, G. Parisi, R. Santagati, F. Stefanini,
  M. Viale, *Scale-free correlations in starling flocks*, PNAS 107 (2010);
  [arXiv:0911.4393](https://arxiv.org/abs/0911.4393), Table S1, read
  2026-09-20 — polarization of 24 flocking events, 0.844 to 0.995, which is
  what *polarized like a real flock* means above.

/**
 * The world, and how one is built.
 *
 * This is the shape the Core has before any rule of the flock is in it: no
 * steering behavior, no pointer and no frame. Every later ticket under #87 adds
 * to what is here rather than replacing it.
 */

import { withoutOverlap } from "./overlap.js";
import type { Random } from "./random.js";
import { nextFraction, randomFromSeed } from "./random.js";

/**
 * A position or a velocity.
 *
 * Every length in the world is a fraction of the frame's shorter side
 * (0008 §6), so the Core holds no pixel and never learns how large the frame
 * is. That is what makes the flock one flock at every size, and the dot count a
 * single number instead of a function of the viewport.
 */
export type Vector = {
  readonly x: number;
  readonly y: number;
};

/**
 * One dot.
 *
 * It carries no gait, no temperament and no preferred speed of its own: 0006 §4
 * rejects per-dot state whose only job is to make dots differ, so variation is
 * something the forces produce rather than something a dot holds.
 */
export type Dot = {
  readonly position: Vector;
  readonly velocity: Vector;
};

/**
 * The visitor's influence on the flock, as the world carries it (0007 §4).
 *
 * **It is here because it is derived, and derived is the Core's** (0007 §2). The
 * Shell hands a step a position or the fact that there is none, and nothing
 * else; a Shell that handed over an already-faded influence would be deciding
 * how the flock reacts, in the part of the system no test reaches.
 */
export type PointerInfluence = {
  /**
   * Where the force pushes from. While presence lasts this is where the pointer
   * is; after it ends this is the last position it was seen at, which is what
   * 0007 §4 fades from rather than dropping.
   */
  readonly position: Vector;
  /**
   * How many steps of influence are left, in `[1, POINTER_DECAY_STEPS]`. It
   * scales the force by that many `POINTER_DECAY_STEPS`ths, so the ceiling is
   * full strength — 0007 R2 keeps a parked pointer pushing for as long as it
   * sits there — and presence ending is what starts it counting down.
   *
   * **A count of steps rather than a fraction**, so that it reaches zero
   * exactly. Subtracting a step's worth from a fraction eighteen times leaves a
   * residue near 1e-16, and an influence that is over would last one step longer
   * than 0007 §9's bound says it may.
   */
  readonly remainingSteps: number;
};

/**
 * The rectangle the flock stays inside (0006 §6).
 *
 * Its shorter side is 1, because 0008 §6 makes every length in the world a
 * fraction of that side — so one of the two numbers below is always 1 and the
 * other is the ratio between them. The Core still learns nothing about how
 * large anything is.
 */
export type Frame = {
  readonly width: number;
  readonly height: number;
};

/**
 * A world — the whole of what a step takes and returns (0002 §4), and the whole
 * of what the View is handed to draw (0002 §5).
 */
export type World = {
  readonly dots: readonly Dot[];
  /**
   * Carried here rather than passed beside the world, so that a step still
   * takes one argument and 0002 §4's sentence keeps meaning what it says.
   */
  readonly frame: Frame;
  /** One radius for every dot (0005 §2); a dot carries no size of its own. */
  readonly radius: number;
  /** Here rather than in the generator, so a world is all a run depends on. */
  readonly random: Random;
  /**
   * The visitor's influence, or absent where there is none — which 0007 §7
   * makes the ordinary case rather than a degraded one. Here for the reason
   * `random` is here: a world is the whole of what a run depends on, and a fade
   * held anywhere else would be state a step could not see.
   */
  readonly pointer?: PointerInfluence;
};

/**
 * How many dots a world holds. Provisional; #110 supersedes it by watching.
 *
 * It is one choice with `DOT_RADIUS` rather than two numbers. 0008 §6 requires
 * `n·πr²` to sit well below the frame's area, or 0006 §2's non-overlap has no
 * solution with room to move; 200 at 0.005 puts it near 0.9 percent of a 16:9
 * frame. Fixed in #91 before the work started, which is where 0008 R1 puts a
 * number.
 */
export const DOT_COUNT = 200;

/**
 * The radius every dot has, as a fraction of the frame's shorter side.
 *
 * The other half of the choice `DOT_COUNT` explains, provisional in the same
 * way and superseded by the same watching.
 */
export const DOT_RADIUS = 0.005;

/**
 * The floor a dot's speed is held above, as a fraction of the frame's shorter
 * side per second (0008 §6). Provisional; #216 supersedes it by watching.
 *
 * It is above zero because 0006 §3 requires it — a flock in which something has
 * stopped reads as broken, and a floor is cheaper than explaining why. A dot
 * here crosses the shorter side in twenty-five seconds: plainly moving, and
 * slow. Fixed in #100 before the work started, which is where 0008 R1 puts a
 * number.
 */
export const SPEED_MIN = 0.04;

/**
 * The ceiling, provisional in the same way and superseded by the same watching.
 *
 * A dot here crosses the shorter side in a little over six seconds. The 4:1
 * ratio against the floor is the room 0006 §4 leaves the forces to produce
 * variation in, rather than a dot carrying a speed of its own — which §4
 * rejects and R2 keeps rejected.
 */
export const SPEED_MAX = 0.16;

/**
 * How deep the band at each edge is in which 0006 §6's turning force acts, as a
 * fraction of the frame's shorter side. Provisional; #216 supersedes it by
 * watching.
 *
 * §6 gives a sufficient condition — at least `SPEED_MAX² / (2·MAX_ACCELERATION)`,
 * which is 0.0107 at these numbers — and calls it sufficient rather than
 * necessary, because a dot only has to turn and not to stop. 0.08 is
 * deliberately far above it: being generous here costs frame and not
 * correctness. Fixed in #103 before the work started, which is where 0008 R1
 * puts a number.
 */
export const EDGE_MARGIN = 0.08;

/**
 * The largest acceleration one edge applies, in shorter sides per second
 * squared. Provisional in the same way and superseded by the same watching.
 *
 * **It is #101's number entering the code here**, because this is the first
 * ticket that needs one: 0006 §6's turning force is designed against §4's bound
 * and the margin relation is checked against it. One number rather than a
 * second, so that the force at an edge and the bound on a change in velocity
 * cannot drift apart.
 */
export const MAX_ACCELERATION = 1.2;

/**
 * How far a dot looks for others to steer by, as a fraction of the frame's
 * shorter side (0008 §6). Provisional; #216 supersedes it by watching.
 *
 * 200 dots over a 16:9 frame's ≈1.778 square units is a density of ≈112 per
 * unit², so `π·0.14²·112 ≈ 7` puts about six others inside it **while the flock
 * is spread evenly** — enough for an average to mean something.
 *
 * **A settled flock is not spread evenly, and the arithmetic above is about the
 * one that is.** With groups a dot has forty or more of the other 199 inside
 * this radius, because the radius has not changed and the density inside a
 * group has. That is the cost 0006 §1 records rather than a number wanting a
 * turn: a dot still reacts only to what is near it, and near is what this
 * number defines. Deriving the radius from the even case is also what pinned
 * the flock to it — see `SEPARATION_RADIUS`.
 *
 * **It is a radius and nothing else.** 0006 §1 drops Reynolds' angular
 * neighborhood deliberately, so one behind counts exactly as much as one ahead,
 * and restoring the angle is an amendment's business rather than a knob. Fixed
 * in #99 before the work started, which is where 0008 R1 puts a number.
 */
export const NEIGHBORHOOD_RADIUS = 0.14;

/**
 * How close another dot has to be before separation answers it, as a fraction
 * of the frame's shorter side (0008 §6). Provisional; #216 supersedes it by
 * watching.
 *
 * **0006 §1 requires it to be shorter than `NEIGHBORHOOD_RADIUS`**, and that
 * requirement is A1 on that record — written on 2026-08-09, after the flock was
 * built over one reach and looked at. Alignment and cohesion take the whole
 * neighborhood; separation answers roughly its nearest third.
 *
 * **What one reach did is why there are two.** Separation and cohesion oppose
 * each other, so over one reach they balance at 0.686 of it — 0.096, which is
 * the 0.094 that 200 dots over a 16:9 frame are apart on average. A flock whose
 * preferred spacing is the spacing it already has is at rest when it is spread
 * evenly, and it spread evenly: its Clark-Evans index, the mean distance to the
 * nearest other dot over what a random scatter of the same density gives, went
 * from 0.83 to 1.74 in a minute, where 1 is random and 2.15 a perfect lattice.
 * At 0.05 the same two balance well inside that — 0.0451 at the weights this
 * file now carries, a little under half the 0.094 — which is the room a group
 * forms in.
 *
 * **The factor is not a property of separation's shape**, which is what this
 * comment got wrong twice. It is the root of
 * `SEPARATION_WEIGHT · (r/d − 1) = COHESION_WEIGHT · d/NEIGHBORHOOD_RADIUS`, so
 * every term in it moves the answer: 0.686 of the reach when both radii were
 * 0.14, 0.834 once only one of them shortened, 0.903 once the weights changed
 * as well. **The argument A1 rests on survives all three**, because what it
 * needs is a preferred spacing below the one a uniform scatter already has.
 *
 * **That root is a two-body figure and a settled flock is not two bodies.** The
 * mean distance to a nearest neighbor measures 0.039 against the 0.0451 above,
 * because inside a group a dot is pulled toward many neighbors at once and
 * pushed by its nearest few. The equation says which way a change moves things;
 * it does not predict the flock.
 *
 * **Do not reach for this number to break the flock into groups.** Swept over a
 * minute and three seeds at #99's weights, 0.05, 0.07, 0.09, 0.11 and 0.14 put
 * the index at 0.67, 0.86–1.14, 1.34–1.41, 1.54–1.62 and 1.71–1.79 — passing
 * cleanly through the wanted band while **every setting ended as one body of all
 * 200 dots**. What the reach moves is how far that one body is inflated, from a
 * tight crystal to wallpaper. #238 found the same cliff from the other side, and
 * the weights are what answered it.
 *
 * Chosen by measuring rather than before the work, which is the one number here
 * 0008 R1 could not have in the ticket first — nothing could be measured until
 * A1 existed. Recorded on #99 at the weights of that day, where three seeds of
 * thirty seconds put the index at 0.67 and the closest pair at 0.020 against the
 * 0.010 that 0006 §2 forbids.
 */
export const SEPARATION_RADIUS = 0.05;

/**
 * How much separation counts against the other two behaviors (0006 §1).
 * Provisional; #216 supersedes it by watching.
 *
 * Above the other two because that is the usual starting point for Reynolds'
 * three. **It is a bias and not a guarantee**: 0006 §2 deliberately refuses to
 * let separation carry non-overlap, which is a constraint on the result and
 * #102's. Fixed in #99 before the work started, which is where 0008 R1 puts a
 * number.
 *
 * **This number has been three things.** #99's 1.5 merged the flock into one
 * body of all 200 dots that never came apart: two minutes, three seeds, the
 * largest body at 200 throughout. #216's first pass raised it to 3, and
 * `ALIGNMENT_WEIGHT` carries the other half of what changed there —
 * `SEPARATION_RADIUS` records why reaching for the reach instead is worthless.
 *
 * **3 was a ceiling and not a preference, and 0021 §1 is what removed it.** The
 * three weights are divided by their own total before the sum is scaled by
 * `MAX_ACCELERATION`, so what reaches an edge is separation's **share** — and
 * while one bound held the sum of every force, a share large enough cancelled
 * 0006 §6's turning force. Measured against a pile placed in a corner: at 0.706
 * every dot stayed inside, at 0.762 one left, and 3 is exactly 0.706. Containment
 * claims its share of the budget first now, so no share of these three can cancel
 * an edge and the ceiling is gone.
 *
 * **10 is the mix that ceiling was hiding**, at a share of 0.889, and it was
 * measured before it was written. Two minutes, three seeds, against 3 on the same
 * Core: the Clark-Evans index over the frame runs **0.94 to 1.09** where 3 runs
 * 0.75 to 0.89, the flock occupies 47 to 76 percent of the frame where 3 occupies
 * 24 to 35, and the largest body **grows and comes apart again** — 2, 1, 4, 1
 * bodies across one run — where 3 reaches 200 and stays. The closest pair over
 * the whole run is 0.0100 against the 0.0100 0006 §2 forbids crossing.
 *
 * **The index is the argument and not the answer.** 0.90 to 1.10 is the band
 * groups that form and break sit in, and every number above is a proxy for the
 * one thing that decides this — whether it reads as a flock, which is 0001 §3.1's
 * and #216's to watch. This is still that ticket's first pass and not its answer.
 */
export const SEPARATION_WEIGHT = 10;

/**
 * How much alignment counts, on the same scale. Provisional in the same way and
 * superseded by the same watching.
 *
 * **The three are ratios rather than sizes.** Each behavior produces a
 * dimensionless vector, the weighted sum is divided by the three weights'
 * total, and what comes out is scaled by `MAX_ACCELERATION` — so a dot whose
 * behaviors disagree accelerates gently and one whose behaviors agree
 * accelerates hard. That is the variation 0006 §4 asks the forces to produce,
 * rather than a dot carrying a gait of its own.
 *
 * **0.25 rather than 1, and of the three this is the one that decides whether
 * anything ever comes apart.** It stood at 1 in every measurement taken here
 * until #238, and at 1 a body of two hundred dots averages every velocity to
 * the same one — so the arrangement crosses the frame as a block, without
 * reordering inside itself, which is what watching it on 2026-08-09 found and
 * what a Clark-Evans figure cannot see.
 *
 * **It does not decide where two bodies meet; it decides whether two that have
 * met stay met.** That distinction is why the number went unexamined while the
 * radii were swept: alignment matches velocities rather than distances, which
 * is true, and is beside the point.
 *
 * **Lowering it is also what buys the separation above its room.** The share
 * that reaches an edge is over the three weights' total, so a small alignment
 * spends less of the budget 0006 §6's turning force has to win back.
 */
export const ALIGNMENT_WEIGHT = 0.25;

/**
 * How much cohesion counts, on the same scale. Provisional in the same way and
 * superseded by the same watching.
 *
 * **The one of the three that has not moved**, so the other two are read
 * against it: separation is three times it and alignment a quarter of it. What
 * it buys is a spacing to settle at rather than a collision or a drift apart —
 * cohesion grows to one over `NEIGHBORHOOD_RADIUS` while separation falls away
 * over `SEPARATION_RADIUS`, and at these three the two balance at 0.903 of the
 * shorter one, which is 0.0451. **Not 0.834 of it**, which is the same pair of
 * radii at #99's weights, and not 0.686, which is the one-reach case;
 * `SEPARATION_RADIUS` carries the arithmetic and what each revision did to it.
 *
 * **It is also what holds separation's room open.** The share of the steering
 * that reaches an edge is over the three weights' total, so raising this number
 * is how a stronger separation stays inside the ceiling `SEPARATION_WEIGHT`
 * describes — which is a reason to move it that has nothing to do with cohesion
 * itself, and is worth knowing before it looks like an idle 1.
 *
 * **The weights decide where that balance sits and not whether there is one.**
 * Over a single reach it sat at the spacing the flock already had, no weighting
 * moved it into the middle, and the shape rather than the ratio is what had to
 * change — 0006 §1's amendment of 2026-08-09. These three are what the first
 * measurement over two reaches was taken at, and #216 chooses them again.
 */
export const COHESION_WEIGHT = 1;

/**
 * How far the visitor's pointer reaches, as a fraction of the frame's shorter
 * side (0007 §6). Provisional; #233 supersedes it by watching.
 *
 * **0007 §6 fixes that it is a fraction of the shorter side and leaves the
 * fraction open**, because a fixed distance would clear a phone's canvas and
 * barely dent a desktop one. Under 0008 §6 that shorter side is 1, so this
 * number is the fraction and needs no arithmetic to become one.
 *
 * 0.18 is 97 px on a 540 px canvas. A parked pointer at that reach has 84 to
 * 105 of the 200 dots inside it — about half the flock, which is a hole the
 * flock parts around. At 0.12 it is 38 to 51 and reads as small; at 0.25 it is
 * 141 to 176, which displaces the flock rather than parting it. Fixed in #106
 * before the work started, which is where 0008 R1 puts a number.
 */
export const POINTER_RADIUS = 0.18;

/**
 * The largest acceleration the pointer applies, in shorter sides per second
 * squared, reached as a dot approaches it. Provisional in the same way and
 * superseded by the same watching.
 *
 * **It had to stay at or under `MAX_ACCELERATION` and no longer does.** While
 * 0006 §4's bound held the *sum* of the forces, a pointer pushing outward was
 * subtracted from §6's edge force before anything was capped, so a peak above
 * the bound could cancel that edge entirely — measured on 2026-08-09 with a
 * pointer held against an edge over three seeds, where 3.0 put a dot 0.0432
 * outside the frame and this value put none. 0021 §2 makes the pointer steering,
 * which yields to containment, so the relation that forced this number is gone.
 *
 * **It has not moved on the strength of that.** What a bigger push would buy is
 * a question for eyes: 0021 §5 fixes no number and #233 is where this one is
 * chosen again. Doubling it moves how far a dot escapes hardly at all in any
 * case — what limits that is `SPEED_MAX`, and that number is #216's.
 */
export const POINTER_STRENGTH = MAX_ACCELERATION;

/**
 * How many steps the influence takes to reach zero once presence has ended
 * (0007 §4). Provisional; #233 supersedes it by watching.
 *
 * **It counts steps and not seconds**, so a change to 0008 §3's step rate
 * changes how long a release takes on a clock and not how it is shaped. That is
 * the reasoning 0006 §4's bound is written with, arrived at from the other side.
 *
 * 18 steps is 0.3 s at 0008 §3's rate of 60 a second. A dot at 0006 §3's
 * ceiling covers 0.048 shorter sides while it fades — 26 px on a 540 px canvas
 * — so the flock is seen gliding back rather than jumping. Short enough that the
 * influence is gone by the time the visitor has moved on; long enough that 0006
 * §4's bound is not what shapes the return, which is the failure 0007 §4 names
 * for an instant release. Fixed in #107 before the work started, which is where
 * 0008 R1 puts a number.
 */
export const POINTER_DECAY_STEPS = 18;

/*
 * A third number the work needed and #91 had not named — recorded in a comment
 * on that ticket rather than added to its criteria afterward. Every dot leaves
 * at one speed, in shorter sides per second, so a dot crosses the frame in ten
 * seconds.
 *
 * #100 superseded it in the sense that mattered. It is the middle of
 * `[SPEED_MIN, SPEED_MAX]` now rather than a free-standing number, so the world
 * this builds satisfies 0006 §3 without anything having to clamp it. It stays
 * one speed for every dot: §4 rejects a dot carrying a speed of its own, and R2
 * keeps the route back an amendment.
 */
const INITIAL_SPEED = 0.1;

// A whole turn, so that a fraction drawn in [0, 1) becomes a heading.
const FULL_TURN = 2 * Math.PI;

/**
 * Build the world a visit starts from.
 *
 * The dots are scattered over the frame, inset by `EDGE_MARGIN` on every side,
 * and each leaves in a direction drawn from the generator — which assumes as
 * little about a heading as anything can.
 *
 * **The inset is not tidiness.** A dot spawned against an edge is one 0006 §6's
 * turning force has almost no room to turn, and under §8 the Shell never steps
 * at all — so that dot would sit on the edge for the whole visit, for the
 * audience 0004 §4 exists to protect. Insetting is also what makes containment
 * a property of every world this Core produces rather than of the first few
 * seconds of a run.
 *
 * The inset always fits: the frame's shorter side is 1 (0008 §6) and twice the
 * margin is 0.16, so neither side can be consumed by it.
 *
 * **The scatter is then corrected for 0006 §2**, because a random one puts a
 * handful of pairs inside `2r` at any seed. It is corrected here rather than
 * left to the first step for the same reason the inset exists: under §8 the
 * Shell never steps where the visitor asked for reduced motion, so this world is
 * the whole of what those visitors see. The correction moves positions only, so
 * every dot still leaves at the speed and heading it was drawn.
 *
 * @param options         what the world is made of, all of it chosen outside
 *                        the Core
 * @param options.count   how many dots. An argument rather than a constant
 *                        because 0008 §5 makes it the Shell's to choose,
 *                        alongside the seed
 * @param options.frame   the rectangle to scatter over (0006 §6). The Shell
 *                        measures it and updates it through `withFrame`
 * @param options.radius  the radius every dot has, as a fraction of the frame's
 *                        shorter side (0008 §6)
 * @param options.seed    the whole of what this world depends on. The Shell is
 *                        the only part that chooses one (0002 §4)
 * @returns a world holding `count` dots, carrying the generator state left
 *          after placing them
 */
export function createWorld(options: {
  readonly count: number;
  readonly frame: Frame;
  readonly radius: number;
  readonly seed: number;
}): World {
  const dots: Dot[] = [];
  const spreadX = options.frame.width - 2 * EDGE_MARGIN;
  const spreadY = options.frame.height - 2 * EDGE_MARGIN;
  let random = randomFromSeed(options.seed);

  for (let made = 0; made < options.count; made += 1) {
    const [x, afterX] = nextFraction(random);
    const [y, afterY] = nextFraction(afterX);
    const [turn, afterTurn] = nextFraction(afterY);
    const heading = turn * FULL_TURN;

    dots.push({
      position: {
        x: EDGE_MARGIN + x * spreadX,
        y: EDGE_MARGIN + y * spreadY,
      },
      velocity: {
        x: Math.cos(heading) * INITIAL_SPEED,
        y: Math.sin(heading) * INITIAL_SPEED,
      },
    });
    random = afterTurn;
  }

  return {
    dots: withoutOverlap(dots, options.radius),
    frame: options.frame,
    radius: options.radius,
    random,
  };
}

/**
 * The same world in a frame of a different size.
 *
 * **A resize changes the frame and rebuilds nothing** (0006 §6). Every dot,
 * every velocity and the generator's state survive it, and dots the new frame
 * leaves outside are brought back by the turning force rather than moved — a
 * flock that reset itself whenever somebody dragged an edge would read as
 * broken.
 *
 * @param world  the world to re-frame; it is not modified
 * @param frame  the frame it should have
 * @returns a new world identical to `world` except for its frame
 */
export function withFrame(world: World, frame: Frame): World {
  return { ...world, frame };
}

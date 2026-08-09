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
 * At 0.05 the same two balance at 0.034 instead, about a third of the spacing a
 * uniform scatter has, which is the room a group forms in.
 *
 * Chosen by measuring rather than before the work, which is the one number here
 * 0008 R1 could not have in the ticket first — nothing could be measured until
 * A1 existed. Three seeds of thirty seconds put the index at 0.67, and the
 * closest pair at 0.020 against the 0.010 that 0006 §2 forbids. Recorded on #99.
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
 */
export const SEPARATION_WEIGHT = 1.5;

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
 */
export const ALIGNMENT_WEIGHT = 1;

/**
 * How much cohesion counts, on the same scale. Provisional in the same way and
 * superseded by the same watching.
 *
 * Equal to alignment's and below separation's, which is what gives a pair of
 * dots a spacing to settle at rather than a collision or a drift apart:
 * cohesion grows to one over `NEIGHBORHOOD_RADIUS` while separation falls away
 * over `SEPARATION_RADIUS`, and at these numbers the two balance at 0.686 of
 * the shorter one.
 *
 * **The weights decide where that balance sits and not whether there is one.**
 * Over a single reach it sat at the spacing the flock already had, no weighting
 * moved it into the middle, and the shape rather than the ratio is what had to
 * change — 0006 §1's amendment of 2026-08-09. These three are what the first
 * measurement over two reaches was taken at, and #216 chooses them again.
 */
export const COHESION_WEIGHT = 1;

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

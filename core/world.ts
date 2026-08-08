/**
 * The world, and how one is built.
 *
 * This is the shape the Core has before any rule of the flock is in it: no
 * steering behavior, no pointer and no frame. Every later ticket under #87 adds
 * to what is here rather than replacing it.
 */

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
 * The dots are scattered over one square of the frame's shorter side, because
 * the frame is #103's: until 0006 §6's edge exists the Core has no rectangle to
 * spread them over. Each leaves in a direction drawn from the generator, which
 * assumes as little about a heading as anything can.
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
  let random = randomFromSeed(options.seed);

  for (let made = 0; made < options.count; made += 1) {
    const [x, afterX] = nextFraction(random);
    const [y, afterY] = nextFraction(afterX);
    const [turn, afterTurn] = nextFraction(afterY);
    const heading = turn * FULL_TURN;

    dots.push({
      position: { x, y },
      velocity: {
        x: Math.cos(heading) * INITIAL_SPEED,
        y: Math.sin(heading) * INITIAL_SPEED,
      },
    });
    random = afterTurn;
  }

  return { dots, frame: options.frame, radius: options.radius, random };
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

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
 * A world — the whole of what a step takes and returns (0002 §4), and the whole
 * of what the View is handed to draw (0002 §5).
 */
export type World = {
  readonly dots: readonly Dot[];
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

/*
 * A third number the work needed and #91 had not named — recorded in a comment
 * on that ticket rather than added to its criteria afterward. Every dot leaves
 * at one speed, in shorter sides per second, so a dot crosses the frame in ten
 * seconds. #100 supersedes it with 0006 §3's band, which is where a speed
 * belongs.
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
 * @param options.radius  the radius every dot has, as a fraction of the frame's
 *                        shorter side (0008 §6)
 * @param options.seed    the whole of what this world depends on. The Shell is
 *                        the only part that chooses one (0002 §4)
 * @returns a world holding `count` dots, carrying the generator state left
 *          after placing them
 */
export function createWorld(options: {
  readonly count: number;
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

  return { dots, radius: options.radius, random };
}

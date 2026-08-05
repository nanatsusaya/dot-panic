import type { Random } from "./random.js";
import { nextFraction, randomFromSeed } from "./random.js";

/**
 * A position or a velocity. Every length here is a fraction of the frame's
 * shorter side (0008 §6), so the Core holds no pixel and never learns how
 * large the frame is.
 */
export type Vector = {
  readonly x: number;
  readonly y: number;
};

export type Dot = {
  readonly position: Vector;
  readonly velocity: Vector;
};

/** Everything a step reads, and everything the View is handed (0002 §2). */
export type World = {
  readonly dots: readonly Dot[];
  /** One radius for every dot (0005 §2). */
  readonly radius: number;
  readonly random: Random;
};

// The two numbers #91 fixed before the work started (0008 R1). Both are
// provisional and #110 supersedes both by watching. They are one choice
// against one ratio rather than two numbers: 0008 §6 keeps `n·πr²` well below
// the frame's area so that 0006 §2 is satisfiable with room to move, and 200
// at 0.005 lands near 0.9 percent of a 16:9 frame.
export const DOT_COUNT = 200;
export const DOT_RADIUS = 0.005;

// A third number the work needed and the ticket did not name. Every dot leaves
// at one speed, in shorter sides per second, so a dot crosses the frame in ten
// seconds. #100 supersedes it with 0006 §3's band, which is where a speed
// belongs.
const INITIAL_SPEED = 0.1;

const FULL_TURN = 2 * Math.PI;

/**
 * The world a visit starts from. The count and the seed are arguments because
 * 0008 §5 and 0002 §4 make both the Shell's to choose.
 *
 * The dots are scattered over one square of the frame's shorter side. The
 * frame itself is not here: 0006 §6's edge is #103's, and until it lands the
 * Core has no rectangle to spread them over.
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

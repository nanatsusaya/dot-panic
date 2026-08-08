/**
 * Advancing the world, which is the one thing the Core does (0002 §2).
 *
 * 0006 §3's speed band is here and is the first rule of the flock to arrive.
 * Nothing steers: the three behaviors, the bound on how far a velocity may
 * change, the non-overlap and the frame's edge each arrive with their own
 * ticket under #87, in the order that epic's table fixes.
 */

import type { Vector, World } from "./world.js";
import { SPEED_MAX, SPEED_MIN } from "./world.js";

/**
 * Hold a speed inside 0006 §3's band, keeping the direction it was given.
 *
 * **A velocity already inside the band comes back untouched rather than
 * rescaled.** Multiplying by `speed / speed` is not the identity in binary
 * floating point, and a step that quietly moved every velocity by an ulp would
 * make *nothing changed* impossible to assert anywhere else.
 *
 * **A dot standing exactly still has no direction to preserve**, so it is given
 * a fixed one. Drawing one is not available: the generator belongs to the world
 * (0002 §4), and a step that consumed it would change the world's generator
 * state on every frame. No world this Core builds or returns holds such a dot —
 * this is a total function's obligation, not a rule anyone watches.
 *
 * @param velocity  the velocity to hold inside the band
 * @returns a velocity with the same heading and a speed in `[SPEED_MIN,
 *          SPEED_MAX]`
 */
function withSpeedInBand(velocity: Vector): Vector {
  const speed = Math.hypot(velocity.x, velocity.y);

  if (speed >= SPEED_MIN && speed <= SPEED_MAX) {
    return velocity;
  }

  if (speed === 0) {
    return { x: SPEED_MIN, y: 0 };
  }

  const wanted = speed < SPEED_MIN ? SPEED_MIN : SPEED_MAX;

  return {
    x: (velocity.x / speed) * wanted,
    y: (velocity.y / speed) * wanted,
  };
}

/**
 * Advance a world by one step.
 *
 * The world that went in comes back untouched. 0002 §4 makes the step pure and
 * that record's own *Consequences* accept the allocation it costs on every
 * frame, rather than mutating in place and leaving the word *functional*
 * describing something it no longer describes.
 *
 * @param world    the world to advance; it is not modified
 * @param seconds  how much time one step covers. Time arrives as an argument
 *                 because 0002 §3 forbids the Core to read a clock, and 0002 R1
 *                 leaves the Shell driving fixed steps
 * @returns a new world with the same dot count (0008 §9), the same radius and
 *          the same generator state — nothing here draws from it
 */
export function step(world: World, seconds: number): World {
  return {
    ...world,
    dots: world.dots.map((dot) => {
      // The band is applied before the dot is moved, so its displacement is the
      // velocity it ends the step with. A world where those two disagree draws
      // a dot travelling at a speed it does not have.
      const velocity = withSpeedInBand(dot.velocity);

      return {
        position: {
          x: dot.position.x + velocity.x * seconds,
          y: dot.position.y + velocity.y * seconds,
        },
        velocity,
      };
    }),
  };
}

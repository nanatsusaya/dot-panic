/**
 * Advancing the world, which is the one thing the Core does (0002 §2).
 *
 * Nothing steers yet. 0006's three behaviors, its speed band, its bound on
 * acceleration, its non-overlap and its frame edge each arrive with their own
 * ticket under #87, and every one of them changes a velocity. What is here is
 * the thing they all act through.
 */

import type { World } from "./world.js";

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
    dots: world.dots.map((dot) => ({
      position: {
        x: dot.position.x + dot.velocity.x * seconds,
        y: dot.position.y + dot.velocity.y * seconds,
      },
      velocity: dot.velocity,
    })),
  };
}

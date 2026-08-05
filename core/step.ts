import type { World } from "./world.js";

/**
 * Advance a world by `seconds`. The time arrives as an argument, and the world
 * that went in comes back unchanged (0002 §4).
 *
 * Nothing steers yet. 0006's three behaviors, its speed band, its bound on
 * acceleration, its non-overlap and its frame edge each arrive with their own
 * ticket under #87, and every one of them changes a velocity. What is here is
 * the thing they all act through: a dot goes where its velocity points.
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

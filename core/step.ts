/**
 * Advancing the world, which is the one thing the Core does (0002 §2).
 *
 * Two of 0006's rules are here: §3's speed band, and §6's frame edge, which is
 * the first **force** in this project rather than a second constraint on the
 * result. Nothing steers yet — the three behaviors, the bound on how far a
 * velocity may change and the non-overlap each arrive with their own ticket
 * under #87, in the order that epic's table fixes.
 *
 * **The order inside a step is the whole design.** A force changes the
 * velocity, the band then holds the result inside itself, and only then is the
 * dot moved — so a dot's displacement is always the velocity it ends the step
 * with, and every world that leaves here satisfies §3.
 */

import type { Frame, Vector, World } from "./world.js";
import {
  EDGE_MARGIN,
  MAX_ACCELERATION,
  SPEED_MAX,
  SPEED_MIN,
} from "./world.js";

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
 * How hard one edge pushes a dot that is `distance` away from it.
 *
 * Zero at the margin's inner boundary, `MAX_ACCELERATION` at the edge, linear
 * between them — and **no stronger than that outside the frame**. A ramp that
 * kept growing would be a spring, and a dot the Shell hands in from far outside
 * after a shrink would be given a change in velocity that 0006 §4 forbids by
 * any number. Bounded here, the stray comes back under the same force as a dot
 * that never left.
 *
 * @param distance  how far the dot is from that edge; negative outside the
 *                  frame
 * @returns an acceleration toward the interior, never away from it
 */
function edgePush(distance: number): number {
  if (distance >= EDGE_MARGIN) {
    return 0;
  }

  const depth = (EDGE_MARGIN - distance) / EDGE_MARGIN;

  return MAX_ACCELERATION * Math.min(depth, 1);
}

/**
 * 0006 §6's turning force, summed over the four edges.
 *
 * **In a corner two edges act at once**, so the sum reaches `MAX_ACCELERATION`
 * times the square root of two. That is deliberate and it is left uncapped
 * here: §4's bound is #101's, and the corner is the case that makes it
 * necessary rather than an accident to smooth over now.
 *
 * @param position  where the dot is, which may be outside the frame
 * @param frame     the rectangle the flock stays inside
 * @returns an acceleration, so what it does to a velocity depends on how long
 *          the step is
 */
function edgeForce(position: Vector, frame: Frame): Vector {
  return {
    x: edgePush(position.x) - edgePush(frame.width - position.x),
    y: edgePush(position.y) - edgePush(frame.height - position.y),
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
 * @returns a new world with the same dot count (0008 §9), the same radius, the
 *          same frame and the same generator state — nothing here draws from it
 */
export function step(world: World, seconds: number): World {
  return {
    ...world,
    dots: world.dots.map((dot) => {
      const force = edgeForce(dot.position, world.frame);

      /*
       * The band is applied after the force and before the dot is moved. After,
       * because a force that could leave a velocity outside the band would make
       * 0006 §3 false of the world this returns; before, because a dot's
       * displacement has to be the velocity it ends the step with — a world
       * where those two disagree draws a dot travelling at a speed it does not
       * have.
       */
      const velocity = withSpeedInBand({
        x: dot.velocity.x + force.x * seconds,
        y: dot.velocity.y + force.y * seconds,
      });

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

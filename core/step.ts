/**
 * Advancing the world, which is the one thing the Core does (0002 §2).
 *
 * Three of 0006's rules are here: §3's speed band, §6's frame edge — the first
 * **force** in this project rather than a second constraint on the result — and
 * §4's bound on what the forces may do in one step. Nothing steers yet: the
 * three behaviors and the non-overlap each arrive with their own ticket under
 * #87, in the order that epic's table fixes.
 *
 * **The order inside a step is the whole design.** The forces are summed and
 * bounded, the bounded acceleration changes the velocity, the band then holds
 * the result inside itself, and only then is the dot moved — so a dot's
 * displacement is always the velocity it ends the step with, and every world
 * that leaves here satisfies §3.
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
 * times the square root of two — and it is still summed that way here, because
 * what the edges want is not the same question as what §4 allows. Bounding it
 * is `withBoundedSize`'s, one call later, and the corner is the case that made
 * that bound necessary rather than an accident smoothed over here.
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
 * Hold an acceleration inside 0006 §4's bound, keeping the direction it points.
 *
 * **The bound is on the acceleration and not on the change**, which is the same
 * statement: every force here is multiplied by the same `seconds`, so capping
 * the acceleration at `MAX_ACCELERATION` caps the change at
 * `MAX_ACCELERATION · seconds`. Written that way it carries the dimension 0006
 * §6's own formula needs, and a change to 0008 §3's step rate cannot silently
 * change the motion.
 *
 * **What is bounded is what the forces produce.** §2's non-overlap and §3's
 * band are constraints on the result and are exempt — the reading #101 settled,
 * with §2's own *"a constraint on the result, not a force among the others"* as
 * the precedent. The band's correction is why the asserted bound over a step is
 * twice this one.
 *
 * A force of exactly zero has no direction to keep and needs none: nothing is
 * scaled, because nothing is over the bound.
 *
 * @param force  the acceleration the forces produced together
 * @returns an acceleration pointing the same way, of size at most
 *          `MAX_ACCELERATION`
 */
function withBoundedSize(force: Vector): Vector {
  const size = Math.hypot(force.x, force.y);

  if (size <= MAX_ACCELERATION) {
    return force;
  }

  return {
    x: (force.x / size) * MAX_ACCELERATION,
    y: (force.y / size) * MAX_ACCELERATION,
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
      const force = withBoundedSize(edgeForce(dot.position, world.frame));

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

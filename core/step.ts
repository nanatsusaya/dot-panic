/**
 * Advancing the world, which is the one thing the Core does (0002 §2).
 *
 * All five of 0006's rules are here: §3's speed band, §6's frame edge — the
 * first **force** in this project rather than a second constraint on the result
 * — §4's bound on what the forces may do in one step, §1's three steering
 * behaviors, which are what make these dots a flock rather than particles, and
 * §2's non-overlap, which lives in `overlap.ts` because `createWorld` owes the
 * same guarantee.
 *
 * **The order inside a step is the whole design.** The forces are summed and
 * bounded, the bounded acceleration changes the velocity, the band then holds
 * the result inside itself, the dot is moved, and only then is §2's correction
 * applied — so a dot's displacement is the velocity it ends the step with, and
 * every world that leaves here satisfies §3 and §2 together.
 *
 * **§2 comes last because it is a constraint on the result.** A correction
 * applied before the move would be repaired by the move itself; applied to a
 * velocity it would be a force, which is what that section refuses to make it.
 *
 * **Every dot is steered by the world that went in**, never by a neighbor that
 * has already moved this step. A dot's new velocity would otherwise depend on
 * where it sits in the array, which is an ordering nothing in 0002 §4 gives a
 * meaning to.
 */

import { withoutOverlap } from "./overlap.js";
import type { Dot, Frame, Vector, World } from "./world.js";
import {
  ALIGNMENT_WEIGHT,
  COHESION_WEIGHT,
  EDGE_MARGIN,
  MAX_ACCELERATION,
  NEIGHBORHOOD_RADIUS,
  SEPARATION_RADIUS,
  SEPARATION_WEIGHT,
  SPEED_MAX,
  SPEED_MIN,
} from "./world.js";

/*
 * What the three weights add up to, which is what the weighted sum is divided
 * by. Dividing is what makes the three numbers ratios of influence rather than
 * sizes: separation and cohesion are dimensionless and no longer than one, so
 * the quotient is close to one and scaling it by `MAX_ACCELERATION` puts the
 * steering at roughly 0006 §4's bound rather than far past it.
 *
 * **Roughly, and not inside it.** Alignment reaches two where a dot and its
 * neighbors are at the ceiling and exactly opposed, which lifts the quotient to
 * 1.286 — so `withBoundedSize` is what holds §4, here as everywhere else, and
 * this division is about the weights meaning what they say.
 */
const TOTAL_WEIGHT = SEPARATION_WEIGHT + ALIGNMENT_WEIGHT + COHESION_WEIGHT;

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
 * The dots close enough to steer by (0006 §1).
 *
 * **The neighborhood is a radius and carries no angle**, so one behind counts
 * exactly as much as one ahead. That section drops Reynolds' angular term
 * deliberately and calls restoring it a change of number rather than of
 * structure, which makes the absence a decision holding rather than a
 * simplification.
 *
 * The scan is the naive one, every dot against every other. 0008 §7 keeps it
 * that way as the oracle the spatial grid is checked against, and #104 replaces
 * it when a measurement asks rather than when this looks slow.
 *
 * @param dot   the dot whose neighbors are wanted; it is never its own
 * @param dots  every dot in the world, this one among them
 * @returns those inside `NEIGHBORHOOD_RADIUS`, in the order they were given
 */
function neighborsOf(dot: Dot, dots: readonly Dot[]): Dot[] {
  return dots.filter(
    (other) =>
      other !== dot &&
      Math.hypot(
        other.position.x - dot.position.x,
        other.position.y - dot.position.y,
      ) <= NEIGHBORHOOD_RADIUS,
  );
}

/**
 * Reynolds' separation: steer away from the neighbors, hardest from the nearest
 * (0006 §1).
 *
 * **It answers only what is inside `SEPARATION_RADIUS`**, where the other two
 * answer the whole neighborhood. 0006 §1 requires that, by the amendment of
 * 2026-08-09, and the requirement came out of building this function without
 * it. Over one reach separation and cohesion oppose each other everywhere, so
 * their balance sits at 0.686 of it — the spacing the flock already has when it
 * is spread evenly, which leaves nothing to pull a group together. It spread
 * evenly and stayed that way. Over the shorter reach the same balance sits at
 * 0.686 of *that*, about a third of the spacing a uniform scatter has, and a
 * group has room to be denser than its surroundings.
 *
 * The push from one neighbor is `SEPARATION_RADIUS / gap − 1` along the unit
 * vector away from it: nothing at the edge of that reach, one at half of it,
 * and without limit as two dots approach each other.
 *
 * **The shape, the sum and the limit below were each chosen by measuring, and
 * the first shape tried was wrong.** A push fading linearly to nothing,
 * averaged over the neighbors, let the flock collapse into one clump: after
 * thirty seconds a dot had 105 of the other 199 inside its neighborhood and the
 * heading agreement across neighbors was 0.97, which is a flock moving as one
 * block. Growing without limit up close is what holds dots apart; summing
 * rather than averaging is what stops a crowd diluting its own escape.
 *
 * **The limit exists because an unbounded force makes the frame's edge
 * invisible.** Summed and unheld, separation reaches thousands where 0006 §6's
 * edge reaches 1.2 — so after `withBoundedSize` the direction is separation's
 * alone, and a dot in a tight crowd against an edge leaves the frame. Three
 * seeds of twenty did, first at step 894. Held to one, none of the twenty left
 * it in 1,800 steps, and none does over the shorter reach either.
 *
 * **A neighbor at exactly the same position is skipped**, because there is no
 * direction to steer away in and the Core may not draw one — the generator
 * belongs to the world (0002 §4). Nothing here resolves that state either:
 * 0006 §2's non-overlap is a constraint on the result and is #102's.
 *
 * @param dot        the dot being steered
 * @param neighbors  the dots inside its neighborhood, never empty. Those past
 *                   `SEPARATION_RADIUS` are among them and contribute nothing
 * @returns a dimensionless vector no longer than one
 */
function separationFrom(dot: Dot, neighbors: readonly Dot[]): Vector {
  let x = 0;
  let y = 0;

  for (const neighbor of neighbors) {
    const awayX = dot.position.x - neighbor.position.x;
    const awayY = dot.position.y - neighbor.position.y;
    const gap = Math.hypot(awayX, awayY);

    if (gap > 0 && gap <= SEPARATION_RADIUS) {
      // The push divided by `gap` once more, because `awayX` and `awayY` carry
      // a length of `gap` rather than a length of one.
      const urgency = (SEPARATION_RADIUS - gap) / (gap * gap);

      x += awayX * urgency;
      y += awayY * urgency;
    }
  }

  const reach = Math.hypot(x, y);

  return reach <= 1 ? { x, y } : { x: x / reach, y: y / reach };
}

/**
 * Reynolds' alignment: steer toward the heading the neighbors share (0006 §1).
 *
 * It is the difference from their average velocity rather than that velocity
 * itself, so a dot already moving with them is not steered at all. Divided by
 * `SPEED_MAX` to put it on the same dimensionless scale as the other two, which
 * is what makes the three weights ratios rather than magnitudes.
 *
 * @param dot        the dot being steered
 * @param neighbors  the dots inside its neighborhood, never empty
 * @returns a dimensionless vector, at most two long — a dot and its neighbors
 *          may be at the ceiling and exactly opposed
 */
function alignmentTo(dot: Dot, neighbors: readonly Dot[]): Vector {
  let x = 0;
  let y = 0;

  for (const neighbor of neighbors) {
    x += neighbor.velocity.x;
    y += neighbor.velocity.y;
  }

  return {
    x: (x / neighbors.length - dot.velocity.x) / SPEED_MAX,
    y: (y / neighbors.length - dot.velocity.y) / SPEED_MAX,
  };
}

/**
 * Reynolds' cohesion: steer toward where the neighbors average out (0006 §1).
 *
 * Divided by `NEIGHBORHOOD_RADIUS`, so it is nothing at the neighbors' own
 * center and one at the edge of what a dot can see — the growth separation's
 * fade is measured against.
 *
 * @param dot        the dot being steered
 * @param neighbors  the dots inside its neighborhood, never empty
 * @returns a dimensionless vector no longer than one
 */
function cohesionTo(dot: Dot, neighbors: readonly Dot[]): Vector {
  let x = 0;
  let y = 0;

  for (const neighbor of neighbors) {
    x += neighbor.position.x;
    y += neighbor.position.y;
  }

  return {
    x: (x / neighbors.length - dot.position.x) / NEIGHBORHOOD_RADIUS,
    y: (y / neighbors.length - dot.position.y) / NEIGHBORHOOD_RADIUS,
  };
}

/**
 * The three behaviors, weighted and summed into one acceleration (0006 §1).
 *
 * **One vector leaves here and not three.** 0006 §4's bound applies to what the
 * forces produce together, so summing before the edge force joins is what makes
 * the corner and a crowd one budget rather than two — and a dot pulled three
 * ways accelerates gently while one whose behaviors agree accelerates hard,
 * which is the variation §4 asks the forces to produce.
 *
 * A dot with nobody inside its neighborhood is steered by nothing at all, which
 * is a real state rather than a guard: the flock breaks up, and the edge is
 * what eventually brings a stray back.
 *
 * @param dot   the dot being steered
 * @param dots  every dot in the world, this one among them
 * @returns an acceleration, so what it does to a velocity depends on how long
 *          the step is
 */
function steeringFor(dot: Dot, dots: readonly Dot[]): Vector {
  const neighbors = neighborsOf(dot, dots);

  if (neighbors.length === 0) {
    return { x: 0, y: 0 };
  }

  const separation = separationFrom(dot, neighbors);
  const alignment = alignmentTo(dot, neighbors);
  const cohesion = cohesionTo(dot, neighbors);
  const scale = MAX_ACCELERATION / TOTAL_WEIGHT;

  return {
    x:
      scale *
      (SEPARATION_WEIGHT * separation.x +
        ALIGNMENT_WEIGHT * alignment.x +
        COHESION_WEIGHT * cohesion.x),
    y:
      scale *
      (SEPARATION_WEIGHT * separation.y +
        ALIGNMENT_WEIGHT * alignment.y +
        COHESION_WEIGHT * cohesion.y),
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
 * @param _pointer  where the visitor's pointer is, in the world's own
 *                  coordinates, or `undefined` where there is none — which 0007
 *                  §7 makes the ordinary argument rather than an error state.
 *                  **Nothing reads it yet**, and the underscore is Biome's own
 *                  way of saying so: 0007 §2 puts everything derived from a
 *                  pointer inside the Core, and the force that derives something
 *                  is #106's. This is #105 giving the Shell somewhere to hand
 *                  the raw fact, and #106 is what drops the underscore
 * @returns a new world with the same dot count (0008 §9), the same radius, the
 *          same frame and the same generator state — nothing here draws from it
 */
export function step(world: World, seconds: number, _pointer?: Vector): World {
  const moved = world.dots.map((dot) => {
    const edge = edgeForce(dot.position, world.frame);
    const steering = steeringFor(dot, world.dots);
    const force = withBoundedSize({
      x: edge.x + steering.x,
      y: edge.y + steering.y,
    });

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
  });

  return { ...world, dots: withoutOverlap(moved, world.radius) };
}

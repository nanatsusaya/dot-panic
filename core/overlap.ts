/**
 * 0006 §2's non-overlap: no two dots whose centers are closer than `2r`.
 *
 * **It is a constraint on a result and not a force**, which is why it is its
 * own file rather than a fourth behavior in `step.ts`. That record refuses to
 * let separation carry it — a steering force biases and cannot guarantee — and
 * 0012 §4 needs something a test can assert of any world, any seed and any
 * number of steps.
 *
 * **Two callers, one rule.** A step applies it to the world it is about to
 * return, and `createWorld` applies it to the world it builds: under 0006 §8 the
 * Shell never steps where the visitor asked for reduced motion, so the
 * constructor's world is the whole of what those visitors see, and an invariant
 * arriving with the first step would not reach them at all. The rule lives here
 * so that there is one of it rather than two that agree today.
 */

import type { Dot } from "./world.js";

/**
 * How many times the pass below may be repeated before it gives up.
 *
 * **Iterating is 0006 §2's own instruction** — a single pairwise relaxation
 * pass does not generally satisfy it, because pushing one pair apart can drive
 * a dot into a third. Eight is generous at #102's packing ratio of 0.88
 * percent, where a scatter of 200 produces a handful of local pairs and a
 * correction has to travel nowhere.
 *
 * **Reaching it is that record's unsatisfiability warning firing rather than a
 * condition handled here.** Dots that cannot be packed into the frame without
 * overlapping have no correct answer, and what a run reports then is the
 * constraint itself failing — which sends the numbers back to 0008 §6 and the
 * record to its own *Consequences*. Nothing here softens that, and raising this
 * number to turn a red run green is what 0008 R1 exists to prevent.
 *
 * It sits here rather than beside the numbers in `world.ts` because it is
 * structural: #216 chooses those again by watching and deliberately not this
 * one, since a wrong value shows up as a red run rather than as a picture.
 */
export const OVERLAP_PASSES = 8;

/*
 * How much past the floor a pair is separated to, as a factor.
 *
 * **Not slack, and not a tuned number.** Placing a dot adds a shift to a
 * coordinate and that addition rounds, so a pair aimed at exactly `2r` comes
 * back a few ulps short of it — which is 0006 §2 failing by 1e-17 and failing
 * all the same, because that section is asserted exactly rather than nearly.
 * Every failure of that kind measured here was under 1e-16 of a shorter side,
 * and this margin is forty times it.
 *
 * It is the same reasoning `withSpeedInBand` gives for not rescaling a velocity
 * already inside the band: binary floating point is not the arithmetic the
 * record is written in, and the gap between them has to be closed somewhere
 * visible.
 *
 * **What it costs is nothing anyone can see.** At 0008 §6's numbers it moves a
 * dot by nine femtometers of a shorter side — twelve orders of magnitude below
 * the smallest thing 0005 §2 asks the View to draw.
 */
const CLEARANCE = 1 + 2 ** -40;

/**
 * Separate every pair closer than `2 · radius`, moving positions and nothing
 * else.
 *
 * **Each dot of a pair moves half the deficit**, so the pair keeps the midpoint
 * it had. Moving one of them would satisfy the constraint and drag every crowd
 * in one direction, which is a force under another name.
 *
 * **Every dot is corrected against the dots that went into the pass**, never
 * against a neighbor already moved by it. A dot's final position would
 * otherwise depend on where it sits in the array, which is an ordering 0002 §4
 * gives no meaning to — the same reason a step steers by the world that came
 * in.
 *
 * **Two dots at one position have no line to be pushed apart along, and the
 * Core may not draw one**: the generator belongs to the world (0002 §4) and
 * this function is not given it. The earlier of the two goes one way along the
 * frame's first axis and the later goes the other, which is a tiebreak by the
 * order they arrive in and is the same every time.
 *
 * @param dots    the dots to correct, in the order the world holds them
 * @param radius  the radius every dot has, from the world that carries it
 * @returns dots satisfying 0006 §2 — and **the array it was given** where
 *          nothing was too close, which is the common path. A settled flock
 *          holds its closest pair at two or three times the floor, so most
 *          steps correct nothing and allocate nothing for it
 */
export function withoutOverlap(
  dots: readonly Dot[],
  radius: number,
): readonly Dot[] {
  const floor = 2 * radius;
  let current = dots;

  for (let pass = 0; pass < OVERLAP_PASSES; pass += 1) {
    let crowded = false;

    const corrected = current.map((here, hereIndex) => {
      let shiftX = 0;
      let shiftY = 0;

      for (const [thereIndex, there] of current.entries()) {
        if (thereIndex === hereIndex) {
          continue;
        }

        const awayX = there.position.x - here.position.x;
        const awayY = there.position.y - here.position.y;
        const gap = Math.hypot(awayX, awayY);

        if (gap >= floor) {
          continue;
        }

        /*
         * Half the deficit, along the line from this dot to the other one and
         * then backwards — or along the tiebreak where the two coincide and
         * there is no such line.
         */
        const push = (floor * CLEARANCE - gap) / 2;
        const towardX =
          gap === 0 ? (hereIndex < thereIndex ? 1 : -1) : awayX / gap;
        const towardY = gap === 0 ? 0 : awayY / gap;

        shiftX -= towardX * push;
        shiftY -= towardY * push;
      }

      if (shiftX === 0 && shiftY === 0) {
        return here;
      }

      crowded = true;

      return {
        position: {
          x: here.position.x + shiftX,
          y: here.position.y + shiftY,
        },
        velocity: here.velocity,
      };
    });

    if (!crowded) {
      return current;
    }

    current = corrected;
  }

  return current;
}

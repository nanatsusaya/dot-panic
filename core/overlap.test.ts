/**
 * 0006 §2's non-overlap — no two dots closer than `2r` — asserted over the
 * correction itself: that it separates, that it moves positions and nothing
 * else, and that it keeps going until the constraint holds rather than making
 * one pass and hoping.
 *
 * That a *step* returns a world satisfying it is `step.test.ts`'s, and that the
 * world `createWorld` builds satisfies it is `world.test.ts`'s. Those are the
 * two rows 0006 §10 and #102 ask for; this file is what makes them one rule
 * instead of two implementations.
 */

import { describe, expect, test } from "bun:test";

import { OVERLAP_PASSES, withoutOverlap } from "./overlap.js";
import { DOT_RADIUS, type Dot } from "./world.js";

/** Two radii, which is the distance 0006 §2 makes the floor. */
const TOUCHING = 2 * DOT_RADIUS;

/**
 * A dot that carries no velocity, because nothing here is about motion.
 *
 * @param x  where it sits across the frame
 * @param y  where it sits down the frame
 */
function still(x: number, y: number): Dot {
  return { position: { x, y }, velocity: { x: 0, y: 0 } };
}

/**
 * The closest any two dots are to each other, which is the quantity 0006 §2
 * bounds from below.
 *
 * @param dots  the dots to measure, in any order
 * @returns the smallest distance between two of them, or infinity if there are
 *          fewer than two
 */
function closest(dots: readonly Dot[]): number {
  let smallest = Number.POSITIVE_INFINITY;

  dots.forEach((one, index) => {
    for (const other of dots.slice(index + 1)) {
      smallest = Math.min(
        smallest,
        Math.hypot(
          one.position.x - other.position.x,
          one.position.y - other.position.y,
        ),
      );
    }
  });

  return smallest;
}

/** Every number a dot carries, in one comparable shape. */
function reading(dots: readonly Dot[]): number[][] {
  return dots.map((dot) => [
    dot.position.x,
    dot.position.y,
    dot.velocity.x,
    dot.velocity.y,
  ]);
}

describe("the non-overlap correction", () => {
  /*
   * The common case by a long way — a settled flock holds its closest pair at
   * two or three times this floor — so it is asserted as the same array rather
   * than as an equal one. A correction that allocated 200 dots every frame to
   * change none of them would satisfy `toEqual` and cost 0008 §4 a copy per
   * step.
   */
  test("returns what it was given when nothing is too close", () => {
    const dots = [still(0.5, 0.5), still(0.5 + 4 * TOUCHING, 0.5)];

    expect(withoutOverlap(dots, DOT_RADIUS)).toBe(dots);
  });

  test("pushes an overlapping pair apart until they touch and no further", () => {
    const dots = [still(0.5, 0.5), still(0.5 + TOUCHING / 2, 0.5)];

    expect(closest(withoutOverlap(dots, DOT_RADIUS))).toBeCloseTo(TOUCHING, 12);
  });

  /*
   * Both dots move and each moves half the deficit, so the pair's midpoint
   * stays where it was. A correction that moved only the later dot would
   * satisfy the constraint and drag every crowd in one direction, which is a
   * force in everything but name — and 0006 §2 refuses to make this one.
   */
  test("moves both dots of a pair, keeping the midpoint they had", () => {
    const dots = [still(0.5, 0.5), still(0.5 + TOUCHING / 2, 0.5)];

    const [first, second] = withoutOverlap(dots, DOT_RADIUS);

    expect(first?.position.x).toBeLessThan(0.5);
    expect(second?.position.x).toBeGreaterThan(0.5 + TOUCHING / 2);
    expect(
      ((first?.position.x ?? 0) + (second?.position.x ?? 0)) / 2,
    ).toBeCloseTo(0.5 + TOUCHING / 4, 12);
  });

  /*
   * Positions only. A correction that touched a velocity would be a force among
   * the three in 0006 §1, which is exactly what §2 refuses to make it — and it
   * would put a change into the world that 0006 §4's bound never saw.
   */
  test("leaves every velocity exactly as it found it", () => {
    const dots: Dot[] = [
      { position: { x: 0.5, y: 0.5 }, velocity: { x: 0.1, y: -0.05 } },
      {
        position: { x: 0.5 + TOUCHING / 2, y: 0.5 },
        velocity: { x: -0.02, y: 0.09 },
      },
    ];

    const separated = withoutOverlap(dots, DOT_RADIUS);

    expect(separated.map((dot) => dot.velocity)).toEqual(
      dots.map((dot) => dot.velocity),
    );
  });

  /*
   * Two dots at one position have no direction to be pushed apart along, and
   * the Core may not draw one: the generator belongs to the world (0002 §4) and
   * this function is not given it. The tiebreak is the order the dots arrive
   * in, which is what makes the same input give the same output forever.
   */
  test("separates two dots at one position, by the order they arrive in", () => {
    const dots = [still(0.5, 0.5), still(0.5, 0.5)];

    const separated = withoutOverlap(dots, DOT_RADIUS);

    expect(closest(separated)).toBeGreaterThanOrEqual(TOUCHING);
    expect(reading(separated)).toEqual(
      reading(withoutOverlap(dots, DOT_RADIUS)),
    );
  });

  /*
   * One pass is not enough and 0006 §2 says so in terms — *a single pairwise
   * relaxation pass does not generally satisfy it, and the Core may iterate*.
   *
   * **The world is built so that the second pass is forced and the first is not
   * undone**, which takes a little care. The first two dots are inside the
   * floor, so the first pass separates them along their own line and leaves them
   * exactly on it. The third sits **square to that line** and just outside the
   * floor — outside it before the pass, inside it after, because the second dot
   * moved toward it. The second pass then pushes those two apart perpendicular
   * to the first pair, which *lengthens* the first gap rather than shortening
   * it, so the row settles instead of trading one violation for another.
   *
   * **A row along one line does not settle**, and that is worth knowing rather
   * than discovering. Each pass halves what is left, so a chain approaches the
   * floor without reaching it and runs out of passes — which is 0006 §2's
   * unbounded cost, arriving as arithmetic rather than as a warning.
   */
  test("resolves a violation its own first pass created", () => {
    const dots = [
      still(0.5, 0.5),
      still(0.5 + 0.6 * TOUCHING, 0.5),
      still(0.5 + 0.8 * TOUCHING, 0.5 + 0.99 * TOUCHING),
    ];

    expect(closest(dots)).toBeLessThan(TOUCHING);
    expect(closest(withoutOverlap(dots, DOT_RADIUS))).toBeGreaterThanOrEqual(
      TOUCHING,
    );
  });

  test("changes nothing in the array it was given", () => {
    const dots = [still(0.5, 0.5), still(0.5 + TOUCHING / 2, 0.5)];
    const before = reading(dots);

    withoutOverlap(dots, DOT_RADIUS);

    expect(reading(dots)).toEqual(before);
  });

  /*
   * What happens when the dots cannot be packed at all, which 0006 §2's own
   * *Consequences* say may cost an unbounded number of passes. It stops at
   * `OVERLAP_PASSES` and returns.
   *
   * **This documents the exit rather than excusing it.** Reaching the cap is
   * that record's unsatisfiability warning firing — the numbers make the
   * constraint impossible — and what it produces is a red run on the two rows
   * above, not a world quietly returned as if it held. #102 fixed the cap
   * before the work for that reason, and raising it to make a red run green is
   * what 0008 R1 exists to prevent.
   */
  test("stops at the pass cap rather than looping forever", () => {
    const crammed = Array.from({ length: 40 }, (_, index) =>
      still(0.5 + (index % 8) * 0.0001, 0.5 + Math.floor(index / 8) * 0.0001),
    );

    expect(withoutOverlap(crammed, DOT_RADIUS)).toHaveLength(crammed.length);
    expect(OVERLAP_PASSES).toBeGreaterThan(1);
  });
});

/**
 * A world is what its seed and its two numbers say it is — 0002 §4 for the
 * seed, 0008 R1 for the numbers — and those numbers leave 0006 §2 satisfiable,
 * which is a row in 0008 §9's asserted list.
 */

import { describe, expect, test } from "bun:test";

import {
  createWorld,
  DOT_COUNT,
  DOT_RADIUS,
  SPEED_MAX,
  SPEED_MIN,
} from "./world.js";

const ordinary = { count: DOT_COUNT, radius: DOT_RADIUS, seed: 1 };

describe("a world", () => {
  test("holds the count it was asked for", () => {
    expect(createWorld({ ...ordinary, count: 12 }).dots).toHaveLength(12);
  });

  test("carries one radius for every dot", () => {
    expect(createWorld({ ...ordinary, radius: 0.01 }).radius).toBe(0.01);
  });

  test("places every dot inside the frame's shorter side", () => {
    for (const dot of createWorld(ordinary).dots) {
      expect(dot.position.x).toBeGreaterThanOrEqual(0);
      expect(dot.position.x).toBeLessThan(1);
      expect(dot.position.y).toBeGreaterThanOrEqual(0);
      expect(dot.position.y).toBeLessThan(1);
    }
  });

  test("leaves no dot at rest", () => {
    for (const dot of createWorld(ordinary).dots) {
      const speed = Math.hypot(dot.velocity.x, dot.velocity.y);

      expect(speed).toBeGreaterThan(0);
    }
  });

  /*
   * 0006 §3 over the world nothing has stepped yet. It holds by construction
   * today, and it is asserted because of 0006 §8: under `prefers-reduced-motion`
   * the Shell never steps, so this world is the whole of what some visitors ever
   * see — and an invariant that only arrives with the first step does not reach
   * them at all.
   */
  test("gives every dot a speed inside the band", () => {
    for (const dot of createWorld(ordinary).dots) {
      const speed = Math.hypot(dot.velocity.x, dot.velocity.y);

      expect(speed).toBeGreaterThanOrEqual(SPEED_MIN);
      expect(speed).toBeLessThanOrEqual(SPEED_MAX);
    }
  });

  test("points the dots in more than one direction", () => {
    const headings = createWorld(ordinary).dots.map((dot) =>
      Math.atan2(dot.velocity.y, dot.velocity.x),
    );

    expect(new Set(headings).size).toBeGreaterThan(1);
  });

  test("is built by its seed and by nothing else", () => {
    expect(createWorld(ordinary)).toEqual(createWorld(ordinary));
    expect(createWorld(ordinary)).not.toEqual(
      createWorld({ ...ordinary, seed: 2 }),
    );
  });
});

describe("the numbers this ticket fixed", () => {
  // 0008 §6: `n·πr²` has to sit below the frame's area, or 0006 §2's
  // non-overlap has no solution at all. The tightest frame is a square, whose
  // area is 1 when a length is a fraction of the shorter side — so this is the
  // worst case rather than a chosen one.
  test("leave 0006 §2 satisfiable in the tightest frame", () => {
    const covered = DOT_COUNT * Math.PI * DOT_RADIUS ** 2;

    expect(covered).toBeLessThan(1);
  });
});

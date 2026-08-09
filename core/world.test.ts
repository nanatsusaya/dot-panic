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
  EDGE_MARGIN,
  type Frame,
  MAX_ACCELERATION,
  NEIGHBORHOOD_RADIUS,
  SEPARATION_RADIUS,
  SPEED_MAX,
  SPEED_MIN,
  withFrame,
} from "./world.js";

/** A 16:9 frame; its shorter side is 1 by 0008 §6's definition. */
const WIDE: Frame = { width: 16 / 9, height: 1 };

const ordinary = {
  count: DOT_COUNT,
  radius: DOT_RADIUS,
  frame: WIDE,
  seed: 1,
};

describe("a world", () => {
  test("holds the count it was asked for", () => {
    expect(createWorld({ ...ordinary, count: 12 }).dots).toHaveLength(12);
  });

  test("carries one radius for every dot", () => {
    expect(createWorld({ ...ordinary, radius: 0.01 }).radius).toBe(0.01);
  });

  test("carries the frame it was given", () => {
    expect(createWorld(ordinary).frame).toEqual(WIDE);
  });

  test("places every dot inside the frame", () => {
    for (const dot of createWorld(ordinary).dots) {
      expect(dot.position.x).toBeGreaterThanOrEqual(0);
      expect(dot.position.x).toBeLessThanOrEqual(WIDE.width);
      expect(dot.position.y).toBeGreaterThanOrEqual(0);
      expect(dot.position.y).toBeLessThanOrEqual(WIDE.height);
    }
  });

  /*
   * The dots occupy the frame and not the unit square #91 had to scatter over
   * while there was no rectangle to spread across. Asserted through the longer
   * side, because that is the half a unit square would leave empty — and it is
   * what the empty band on the right of the picture was.
   */
  test("scatters across the frame's longer side", () => {
    const beyondTheSquare = createWorld(ordinary).dots.filter(
      (dot) => dot.position.x > 1,
    );

    expect(beyondTheSquare.length).toBeGreaterThan(0);
  });

  /*
   * No dot starts inside a margin, which is what makes containment a property
   * of the Core rather than of the first few seconds. A dot spawned against an
   * edge is one the turning force has almost no room to turn — and under 0006
   * §8 the Shell never steps, so it would sit there for the whole visit.
   */
  test("starts every dot clear of the edge force", () => {
    for (const dot of createWorld(ordinary).dots) {
      expect(dot.position.x).toBeGreaterThanOrEqual(EDGE_MARGIN);
      expect(dot.position.y).toBeGreaterThanOrEqual(EDGE_MARGIN);
      expect(WIDE.width - dot.position.x).toBeGreaterThanOrEqual(EDGE_MARGIN);
      expect(WIDE.height - dot.position.y).toBeGreaterThanOrEqual(EDGE_MARGIN);
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

/*
 * 0006 §6 puts a resize here rather than in a second constructor: the frame
 * changes and the turning force brings the strays back. Rebuilding would reset
 * the flock every time somebody drags an edge, which reads as broken.
 */
describe("a frame that changes", () => {
  test("replaces the frame and nothing else", () => {
    const world = createWorld(ordinary);
    const narrow: Frame = { width: 1, height: 2 };

    const resized = withFrame(world, narrow);

    expect(resized.frame).toEqual(narrow);
    expect(resized.dots).toBe(world.dots);
    expect(resized.random).toBe(world.random);
    expect(resized.radius).toBe(world.radius);
  });

  test("leaves the world it was given alone", () => {
    const world = createWorld(ordinary);

    withFrame(world, { width: 1, height: 2 });

    expect(world.frame).toEqual(WIDE);
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

  /*
   * 0006 §6's own relation, and the half of §10's row this ticket used to drop.
   * The margin has to be at least the distance a dot at the ceiling covers
   * while the bound in §4 brings it to a stop. Sufficient and not necessary — a
   * dot only has to turn — so a generous margin costs frame rather than
   * correctness.
   */
  test("leave 0006 §6's margin sufficient", () => {
    const stoppingDistance = SPEED_MAX ** 2 / (2 * MAX_ACCELERATION);

    expect(EDGE_MARGIN).toBeGreaterThanOrEqual(stoppingDistance);
  });

  /*
   * §10's seventh row, which A1 added on 2026-08-09. It is the same kind of
   * claim as the margin's above — a relation between two numbers the record
   * fixes and does not choose — and it is strict rather than loose, because two
   * reaches that were equal would be the one reach A1 rejected.
   */
  test("leave 0006 §1's two reaches ordered", () => {
    expect(SEPARATION_RADIUS).toBeLessThan(NEIGHBORHOOD_RADIUS);
  });
});

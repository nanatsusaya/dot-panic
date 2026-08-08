/**
 * A step returns a new world and changes nothing in the one it was given
 * (0002 §4), and the count it was given survives it — a row in 0008 §9's
 * asserted list. What a step does *not* do is asserted here as well, because
 * every rule of the flock is still absent and its arrival must be visible.
 */

import { describe, expect, test } from "bun:test";

import { randomFromSeed } from "./random.js";
import { step } from "./step.js";
import {
  createWorld,
  DOT_COUNT,
  DOT_RADIUS,
  SPEED_MAX,
  SPEED_MIN,
  type Vector,
  type World,
} from "./world.js";

const ordinary = { count: DOT_COUNT, radius: DOT_RADIUS, seed: 3 };

/*
 * The band is a rule about real numbers and the clamp does its arithmetic in
 * binary floating point, so a speed scaled to an end of the band can miss it by
 * an ulp or two. This is that and nothing more: it is not room for a rule to be
 * approximately followed.
 */
const SLACK = 8 * Number.EPSILON * SPEED_MAX;

/**
 * A world whose dots differ in velocity and in nothing else, so that a rule
 * about velocity has exactly what it needs to act on.
 *
 * @param velocities  one dot per entry, all at the same position
 */
function worldOf(velocities: readonly Vector[]): World {
  return {
    dots: velocities.map((velocity) => ({
      position: { x: 0.5, y: 0.5 },
      velocity,
    })),
    radius: DOT_RADIUS,
    random: randomFromSeed(1),
  };
}

/**
 * How fast a velocity is, which is the thing 0006 §3 bounds.
 *
 * @param velocity  the velocity to measure
 */
function speedOf(velocity: Vector): number {
  return Math.hypot(velocity.x, velocity.y);
}

/** Every number a world holds about its dots, in one comparable shape. */
function reading(world: World): number[][] {
  return world.dots.map((dot) => [
    dot.position.x,
    dot.position.y,
    dot.velocity.x,
    dot.velocity.y,
  ]);
}

describe("a step", () => {
  test("changes nothing in the world it was given", () => {
    const world = createWorld(ordinary);
    const before = reading(world);

    step(world, 1 / 60);

    expect(reading(world)).toEqual(before);
  });

  test("returns a world that is not the one it was given", () => {
    const world = createWorld(ordinary);

    expect(step(world, 1 / 60)).not.toBe(world);
  });

  test("returns the count it was given", () => {
    const world = createWorld(ordinary);

    expect(step(world, 1 / 60).dots).toHaveLength(world.dots.length);
  });

  test("moves every dot along its velocity", () => {
    const world = createWorld(ordinary);
    const seconds = 0.5;
    const expected = world.dots.map((dot) => [
      dot.position.x + dot.velocity.x * seconds,
      dot.position.y + dot.velocity.y * seconds,
    ]);

    const moved = step(world, seconds).dots.map((dot) => [
      dot.position.x,
      dot.position.y,
    ]);

    expect(moved).toEqual(expected);
  });

  // Nothing steers yet. 0006 §1's three behaviors, its speed band, its bound
  // on acceleration, its non-overlap and its frame edge each arrive with their
  // own ticket under #87, and every one of them changes a velocity.
  test("leaves every velocity alone", () => {
    const world = createWorld(ordinary);
    const before = world.dots.map((dot) => [dot.velocity.x, dot.velocity.y]);

    const after = step(world, 0.5).dots.map((dot) => [
      dot.velocity.x,
      dot.velocity.y,
    ]);

    expect(after).toEqual(before);
  });

  test("carries the radius and the generator forward untouched", () => {
    const world = createWorld(ordinary);
    const stepped = step(world, 1 / 60);

    expect(stepped.radius).toBe(world.radius);
    expect(stepped.random).toBe(world.random);
  });
});

/*
 * 0006 §3, and the first rule of the flock to arrive. What is asserted here is
 * the band itself; that the clamp is a constraint on the result rather than a
 * force — so 0006 §4's bound does not apply to it — is #101's to assert, and
 * the reason it has to be said at all is in that ticket.
 */
describe("the speed band", () => {
  test("pulls a speed above the ceiling down to it", () => {
    for (const dot of step(worldOf([{ x: 1, y: 0 }]), 1 / 60).dots) {
      expect(speedOf(dot.velocity)).toBeCloseTo(SPEED_MAX, 12);
    }
  });

  test("lifts a speed below the floor up to it", () => {
    for (const dot of step(worldOf([{ x: 0.001, y: 0 }]), 1 / 60).dots) {
      expect(speedOf(dot.velocity)).toBeCloseTo(SPEED_MIN, 12);
    }
  });

  test("keeps the heading it was given while it clamps", () => {
    for (const dot of step(worldOf([{ x: 3, y: 4 }]), 1 / 60).dots) {
      expect(Math.atan2(dot.velocity.y, dot.velocity.x)).toBeCloseTo(
        Math.atan2(4, 3),
        12,
      );
    }
  });

  test("leaves a velocity already inside the band alone", () => {
    const velocity = { x: 0.06, y: 0.08 };

    const after = step(worldOf([velocity]), 0.5).dots.map(
      (dot) => dot.velocity,
    );

    expect(after).toEqual([velocity]);
  });

  // 0006 §10's second row, over the world a step returns.
  test("holds every dot in a returned world inside the band", () => {
    const world = worldOf([
      { x: 1, y: 0 },
      { x: 0, y: 0.001 },
      { x: 0.06, y: 0.08 },
      { x: -0.5, y: 0.5 },
    ]);

    for (const dot of step(world, 1 / 60).dots) {
      const speed = speedOf(dot.velocity);

      expect(speed).toBeGreaterThanOrEqual(SPEED_MIN - SLACK);
      expect(speed).toBeLessThanOrEqual(SPEED_MAX + SLACK);
    }
  });

  /*
   * A dot standing exactly still has no heading to preserve, and the Core may
   * not draw one: the generator belongs to the world (0002 §4), and a step that
   * consumed it would change the world's generator state on every frame. So the
   * direction is a fixed one, deliberately arbitrary and deterministic. No world
   * this Core builds or returns contains such a dot — which is why this is a
   * total function's obligation rather than a rule anybody watches.
   */
  test("gives a dot standing exactly still a direction to leave in", () => {
    for (const dot of step(worldOf([{ x: 0, y: 0 }]), 1 / 60).dots) {
      expect(speedOf(dot.velocity)).toBeCloseTo(SPEED_MIN, 12);
    }
  });

  // The dot's displacement matches the velocity it ends the step with, rather
  // than the one it came in at. A picture drawn from a world where those two
  // disagree is a picture of a dot moving at a speed it does not have.
  test("moves a clamped dot at the speed it ends the step with", () => {
    const seconds = 0.5;

    for (const dot of step(worldOf([{ x: 1, y: 0 }]), seconds).dots) {
      expect(dot.position.x).toBeCloseTo(0.5 + SPEED_MAX * seconds, 12);
    }
  });
});

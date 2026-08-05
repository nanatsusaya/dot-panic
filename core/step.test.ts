/**
 * A step returns a new world and changes nothing in the one it was given
 * (0002 §4), and the count it was given survives it — a row in 0008 §9's
 * asserted list. What a step does *not* do is asserted here as well, because
 * every rule of the flock is still absent and its arrival must be visible.
 */

import { describe, expect, test } from "bun:test";

import { step } from "./step.js";
import { createWorld, DOT_COUNT, DOT_RADIUS, type World } from "./world.js";

const ordinary = { count: DOT_COUNT, radius: DOT_RADIUS, seed: 3 };

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

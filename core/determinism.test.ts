import { describe, expect, test } from "bun:test";

import { step } from "./step.js";
import { createWorld, DOT_COUNT, DOT_RADIUS, type World } from "./world.js";

const SECONDS_PER_STEP = 1 / 60;

function run(seed: number, steps: number): World {
  let world = createWorld({ count: DOT_COUNT, radius: DOT_RADIUS, seed });

  for (let taken = 0; taken < steps; taken += 1) {
    world = step(world, SECONDS_PER_STEP);
  }

  return world;
}

// 0010 §3: two runs compared against each other, never against a result stored
// in this repository. There are no numbers to store — 0006 and 0008 fix
// relations and no constants, so an expectation checked into the tree would
// turn every legitimate tuning red and be repaired by overwriting it.
//
// What this shows is narrower than 0002 §4 claims. Two runs inside one process
// are evidence that the Core carries no hidden state; the sentence *in any
// environment that can do arithmetic* is exercised by nothing here, and 0010 §3
// says so rather than implying otherwise.
describe("determinism", () => {
  test("the same world and the same steps produce the same result", () => {
    expect(run(42, 100)).toEqual(run(42, 100));
  });

  test("a different seed produces a different result", () => {
    expect(run(42, 100)).not.toEqual(run(43, 100));
  });
});

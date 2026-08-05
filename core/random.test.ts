/**
 * The seed is the whole of what a run depends on, and the generator holds no
 * state of its own — which is what 0002 §4 asks of it and what the world and
 * the step both rest on.
 */

import { describe, expect, test } from "bun:test";

import { nextFraction, randomFromSeed } from "./random.js";

/** The first `howMany` fractions a seed produces. */
function take(seed: number, howMany: number): number[] {
  const fractions: number[] = [];
  let random = randomFromSeed(seed);

  for (let taken = 0; taken < howMany; taken += 1) {
    const [fraction, next] = nextFraction(random);
    fractions.push(fraction);
    random = next;
  }

  return fractions;
}

describe("the seeded generator", () => {
  test("one state yields one fraction, however often it is asked", () => {
    const random = randomFromSeed(7);

    expect(nextFraction(random)).toEqual(nextFraction(random));
  });

  test("the seed is the whole of what a run depends on", () => {
    expect(take(7, 20)).toEqual(take(7, 20));
    expect(take(7, 20)).not.toEqual(take(8, 20));
  });

  test("every fraction lies in [0, 1)", () => {
    for (const fraction of take(1, 1000)) {
      expect(fraction).toBeGreaterThanOrEqual(0);
      expect(fraction).toBeLessThan(1);
    }
  });

  test("the run does not repeat itself", () => {
    const fractions = take(1, 1000);

    expect(new Set(fractions).size).toBe(fractions.length);
  });

  test("a step of the generator leaves a state it has not used", () => {
    const random = randomFromSeed(0);
    const [, next] = nextFraction(random);

    expect(next).not.toBe(random);
  });
});

/**
 * A step returns a new world and changes nothing in the one it was given
 * (0002 §4), and the count it was given survives it — a row in 0008 §9's
 * asserted list. What a step does *not* do is asserted here as well, because
 * the rules of the flock arrive one ticket at a time and each arrival has to be
 * visible in what stops being true here.
 */

import { describe, expect, test } from "bun:test";

import { randomFromSeed } from "./random.js";
import { step } from "./step.js";
import {
  createWorld,
  DOT_COUNT,
  DOT_RADIUS,
  EDGE_MARGIN,
  type Frame,
  MAX_ACCELERATION,
  SPEED_MAX,
  SPEED_MIN,
  type Vector,
  type World,
} from "./world.js";

/**
 * A 16:9 frame. Its shorter side is 1 by 0008 §6's definition, so the only
 * number here is the ratio between the two sides.
 */
const WIDE: Frame = { width: 16 / 9, height: 1 };

const ordinary = {
  count: DOT_COUNT,
  radius: DOT_RADIUS,
  frame: WIDE,
  seed: 3,
};

/**
 * A world whose dots differ in velocity and in nothing else, so that a rule
 * about velocity has exactly what it needs to act on.
 *
 * The position is the middle of the frame, which is where 0006 §6's edge force
 * is zero — so a test about the band is not also a test about the edge.
 *
 * @param velocities  one dot per entry, all at the same position
 */
function worldOf(velocities: readonly Vector[]): World {
  return {
    dots: velocities.map((velocity) => ({
      position: { x: 0.5, y: 0.5 },
      velocity,
    })),
    frame: WIDE,
    radius: DOT_RADIUS,
    random: randomFromSeed(1),
  };
}

/**
 * A world holding one dot, placed where a rule about the frame needs it.
 *
 * @param frame     the frame the dot is placed in
 * @param position  where the dot sits, which may be outside `frame`
 * @param velocity  the velocity it carries in
 */
function dotIn(frame: Frame, position: Vector, velocity: Vector): World {
  return {
    dots: [{ position, velocity }],
    frame,
    radius: DOT_RADIUS,
    random: randomFromSeed(1),
  };
}

/*
 * #103's third number under 0008 R1, and provisional like the other two. Ten
 * seconds at 0008 §3's step rate: at the speed floor a dot covers 0.4 of the
 * frame's shorter side in that time, which is far more than leaving a corner
 * takes. #216 is where it is chosen again.
 */
const DISPERSAL_STEPS = 600;

/*
 * How large the corner is that a pile has to leave. It is wider than the margin
 * on purpose — a flock that only stepped out of reach of the edge force would
 * satisfy a narrower box while still sitting in the corner.
 */
const CORNER = 0.1;

/**
 * The smallest rectangle holding every dot, which is what 0006 §7 asks about a
 * cornered flock and what containment is read from over a run.
 *
 * @param world  the world to measure
 */
function boundingBox(world: World): {
  left: number;
  right: number;
  top: number;
  bottom: number;
} {
  const xs = world.dots.map((dot) => dot.position.x);
  const ys = world.dots.map((dot) => dot.position.y);

  return {
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
  };
}

/**
 * The same world with every dot squeezed into the corner at the origin, keeping
 * the velocities it already had.
 *
 * 0006 §7 asks what happens *after* a pointer has driven a flock into a corner,
 * and there is no pointer until #106 — so the state is built rather than
 * produced, which is the only way to assert the section before then.
 *
 * @param world  the world whose dots are moved
 */
function pileIntoCorner(world: World): World {
  return {
    ...world,
    dots: world.dots.map((dot) => ({
      velocity: dot.velocity,
      position: {
        x: (dot.position.x / world.frame.width) * CORNER,
        y: (dot.position.y / world.frame.height) * CORNER,
      },
    })),
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

  // Nothing steers yet. 0006 §1's three behaviors, its bound on how far a
  // velocity may change and its non-overlap each arrive with their own ticket
  // under #87. The two rules that have arrived do not fire here: every dot in a
  // new world starts at one speed inside the band, and none of them starts
  // inside a margin.
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

  /*
   * 0006 §10's second row, over the world a step returns.
   *
   * **The bounds carry no tolerance**, and that was measured rather than
   * assumed: the band is a rule about real numbers and the clamp does its
   * arithmetic in binary floating point, so a scaled speed could miss the end it
   * was scaled to by an ulp. At these four velocities and these two numbers it
   * does not. A tolerance written in on the chance it might would make exactly
   * that failure invisible.
   */
  test("holds every dot in a returned world inside the band", () => {
    const world = worldOf([
      { x: 1, y: 0 },
      { x: 0, y: 0.001 },
      { x: 0.06, y: 0.08 },
      { x: -0.5, y: 0.5 },
    ]);

    for (const dot of step(world, 1 / 60).dots) {
      const speed = speedOf(dot.velocity);

      expect(speed).toBeGreaterThanOrEqual(SPEED_MIN);
      expect(speed).toBeLessThanOrEqual(SPEED_MAX);
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

/*
 * 0006 §6, and the first force in this project rather than a second constraint
 * on the result. The edge turns a dot and never reverses one, which that
 * section derives from §4 rather than choosing: a wall changes a velocity by
 * `2v` in a single step and no bound on that change survives it.
 *
 * The step size below is the one 0008 §3 fixes, because a force is an
 * acceleration and what it does to a velocity depends on how long it acts.
 */
describe("the frame's edge", () => {
  const seconds = 1 / 60;
  const perStep = MAX_ACCELERATION * seconds;

  test("leaves a dot away from every edge alone", () => {
    const velocity = { x: 0.1, y: 0 };

    for (const dot of step(dotIn(WIDE, { x: 0.5, y: 0.5 }, velocity), seconds)
      .dots) {
      expect(dot.velocity).toEqual(velocity);
    }
  });

  test("turns a dot inside the margin back toward the interior", () => {
    const velocity = { x: -SPEED_MAX, y: 0 };
    const world = dotIn(WIDE, { x: EDGE_MARGIN / 2, y: 0.5 }, velocity);

    for (const dot of step(world, seconds).dots) {
      expect(dot.velocity.x).toBeGreaterThan(velocity.x);
    }
  });

  // The half of §6 that a wall would fail. After one step the dot is still
  // heading at the edge, more slowly — it did not bounce off it.
  test("does not reverse it, which is what a wall would do", () => {
    const inward = { x: EDGE_MARGIN / 2, y: 0.5 };
    const world = dotIn(WIDE, inward, { x: -SPEED_MAX, y: 0 });

    for (const dot of step(world, seconds).dots) {
      expect(dot.velocity.x).toBeLessThan(0);
    }
  });

  // The force ramps to `MAX_ACCELERATION` at the edge and goes no further, so a
  // dot the Shell hands in from outside the frame — which is what a shrink
  // produces — is brought back under the same bound as one still inside.
  test("pushes a dot outside the frame back toward it", () => {
    const world = dotIn(WIDE, { x: -0.05, y: 0.5 }, { x: 0, y: SPEED_MIN });

    for (const dot of step(world, seconds).dots) {
      expect(dot.velocity.x).toBeGreaterThan(0);
    }
  });

  test("gives one edge no more than `MAX_ACCELERATION`, however far out", () => {
    for (const x of [0, -10]) {
      const world = dotIn(WIDE, { x, y: 0.5 }, { x: 0, y: SPEED_MIN });

      for (const dot of step(world, seconds).dots) {
        expect(dot.velocity.x).toBeCloseTo(perStep, 12);
      }
    }
  });

  /*
   * In a corner both edges act, so their sum reaches `MAX_ACCELERATION·√2`.
   * That is deliberate and it is exactly what #101 clamps — this test is what
   * that ticket's own failing test will be written against, and capping it here
   * would take its subject away.
   *
   * **The incoming speed is low on purpose**, because the band is downstream of
   * the force and would otherwise be what this measured: at 0.1 in each
   * component the corner's sum carries the dot to 0.1697, above the ceiling,
   * and the number that comes back is the band's rather than the edge's. That
   * is the next test.
   */
  test("fires both edges in a corner", () => {
    const world = dotIn(WIDE, { x: 0, y: 0 }, { x: 0.05, y: 0.05 });

    for (const dot of step(world, seconds).dots) {
      expect(dot.velocity.x).toBeCloseTo(0.05 + perStep, 12);
      expect(dot.velocity.y).toBeCloseTo(0.05 + perStep, 12);
    }
  });

  // What #101 is for, visible before it exists. A dot crossing a corner near
  // the ceiling is already being held back by 0006 §3's band rather than by
  // §4's bound — the band changes the speed and keeps the heading, where the
  // bound will limit the change itself.
  test("hands the corner's sum to the band at the ceiling", () => {
    const world = dotIn(WIDE, { x: 0, y: 0 }, { x: 0.1, y: 0.1 });

    for (const dot of step(world, seconds).dots) {
      expect(speedOf(dot.velocity)).toBeCloseTo(SPEED_MAX, 12);
      expect(dot.velocity.x).toBeCloseTo(dot.velocity.y, 12);
    }
  });

  /*
   * 0006 §10's §6 row — *no dot outside the frame* — over the worlds the Core
   * itself produces, which is narrower than the row's words and is what can be
   * true of them. **A one-step claim about any world at all is false**, and
   * provably: §6 forbids a clamp on position, so a dot placed a hair inside the
   * edge with the ceiling speed pointing out is outside after one step and no
   * force acting over that step can prevent it. What holds is that no world
   * this Core builds contains such a dot, and that stepping never creates one.
   */
  test("keeps every dot inside the frame over a run", () => {
    let world = createWorld({ ...ordinary, seed: 5 });

    for (let taken = 0; taken < DISPERSAL_STEPS; taken += 1) {
      world = step(world, seconds);

      const box = boundingBox(world);

      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(WIDE.width);
      expect(box.top).toBeGreaterThanOrEqual(0);
      expect(box.bottom).toBeLessThanOrEqual(WIDE.height);
    }
  });

  /*
   * 0006 §7's row, and R3 calls it *"the first thing worth writing as a failing
   * test, because it is the claim here most likely to be wrong"*. Nothing was
   * built for it: §3's floor is what denies a pile a resting state, and the
   * edge force is what points the dots out of the corner rather than a fourth
   * force pushing them, which §7 rejects by name.
   */
  test("a flock piled into one corner does not stay in it", () => {
    let world = pileIntoCorner(createWorld({ ...ordinary, seed: 7 }));

    for (let taken = 0; taken < DISPERSAL_STEPS; taken += 1) {
      world = step(world, seconds);
    }

    const box = boundingBox(world);

    expect(Math.max(box.right, box.bottom)).toBeGreaterThan(CORNER);
  });
});

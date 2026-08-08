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
 * The largest change in velocity any dot underwent between two worlds, which is
 * the quantity 0006 §4 bounds.
 *
 * @param before  the world that went into a step
 * @param after   the world that came out of it
 */
function largestChange(before: World, after: World): number {
  let largest = 0;

  before.dots.forEach((dot, index) => {
    const moved = after.dots[index];

    if (moved !== undefined) {
      largest = Math.max(
        largest,
        Math.hypot(
          moved.velocity.x - dot.velocity.x,
          moved.velocity.y - dot.velocity.y,
        ),
      );
    }
  });

  return largest;
}

/**
 * The same world with every dot squeezed into the corner at the origin and
 * still heading into it.
 *
 * 0006 §7 asks what happens *after* a pointer has driven a flock into a corner,
 * and there is no pointer until #106 — so the state is built rather than
 * produced, which is the only way to assert the section before then.
 *
 * **The velocities are turned into the corner and that is what gives the test
 * teeth.** Keeping the headings the dots already had made it a test nothing
 * could fail: dots at the speed floor pointing in every direction leave a
 * corner whatever the edge does, so the assertion reported the same thing
 * whether §7 held or not. Pointed inward, only a force can bring them back.
 *
 * @param world  the world whose dots are moved
 */
function pileIntoCorner(world: World): World {
  return {
    ...world,
    dots: world.dots.map((dot) => {
      const speed = speedOf(dot.velocity);

      return {
        position: {
          x: (dot.position.x / world.frame.width) * CORNER,
          y: (dot.position.y / world.frame.height) * CORNER,
        },
        velocity: { x: -speed / Math.SQRT2, y: -speed / Math.SQRT2 },
      };
    }),
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
   * In a corner both edges act, so the push runs along the diagonal rather than
   * along either axis. **What this used to assert was the size of it** — one
   * `MAX_ACCELERATION` per edge, so `MAX_ACCELERATION·√2` together — and #101
   * has since capped exactly that, which is what it exists for. The direction
   * is the half that is the edge's own and survives the cap.
   *
   * **The incoming speed is low on purpose**, because the band is downstream of
   * the force and would otherwise be what this measured: at 0.1 in each
   * component the corner's sum carries the dot past the ceiling, and the number
   * that comes back is the band's rather than the edge's. That is the next test.
   */
  test("fires both edges in a corner", () => {
    const world = dotIn(WIDE, { x: 0, y: 0 }, { x: 0.05, y: 0.05 });

    for (const dot of step(world, seconds).dots) {
      expect(dot.velocity.x).toBeGreaterThan(0.05);
      expect(dot.velocity.x).toBeCloseTo(dot.velocity.y, 12);
    }
  });

  // Both of the other two rules act here and it is worth seeing them apart:
  // 0006 §4's bound decides how much of the corner's push survives, and §3's
  // band then decides what the speed may be. The bound caps a change and keeps
  // its direction; the band caps a speed and keeps its heading.
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

/*
 * 0006 §4, and the rule the frame's edge was derived from: a wall changes a
 * velocity by `2v` in one step and no bound survives that, so §6 has a turning
 * force instead.
 *
 * **What is bounded is the change the forces produce.** §2's non-overlap and
 * §3's band are constraints on the result and are exempt — the reading settled
 * on 2026-08-08, with §2's own *"a constraint on the result, not a force among
 * the others"* as the precedent, and #101 carries the worked example.
 */
describe("the bound on a change in velocity", () => {
  const seconds = 1 / 60;
  const bound = MAX_ACCELERATION * seconds;
  const inCorner = dotIn(WIDE, { x: 0, y: 0 }, { x: 0.05, y: 0.05 });

  // The failing test this ticket exists for. Two edges at MAX_ACCELERATION each
  // sum to MAX_ACCELERATION·√2, which is 41 percent above the bound — 0006 §7's
  // corner arriving from the arithmetic rather than from the picture.
  test("caps the corner, where two edges together exceed it", () => {
    expect(largestChange(inCorner, step(inCorner, seconds))).toBeCloseTo(
      bound,
      12,
    );
  });

  test("leaves one edge alone, which is already at the bound", () => {
    const atOneEdge = dotIn(WIDE, { x: 0, y: 0.5 }, { x: 0, y: SPEED_MIN });

    expect(largestChange(atOneEdge, step(atOneEdge, seconds))).toBeCloseTo(
      bound,
      12,
    );
  });

  // A cap on the size and not on the heading: the corner still pushes along its
  // diagonal, which is what makes it a corner rather than one edge.
  test("keeps the direction the forces pointed while it caps", () => {
    for (const dot of step(inCorner, seconds).dots) {
      expect(dot.velocity.x - 0.05).toBeCloseTo(dot.velocity.y - 0.05, 12);
    }
  });

  /*
   * An acceleration and not an amount per call, which 0006 §6's own formula
   * settles: `vmax² / (2·MAX_ACCELERATION)` has the dimension of a length only
   * if the bound is a length per second squared. Written per step instead, a
   * change to 0008 §3's step rate would silently change the motion.
   */
  test("scales with the length of the step, being an acceleration", () => {
    const short = largestChange(inCorner, step(inCorner, seconds));
    const long = largestChange(inCorner, step(inCorner, 2 * seconds));

    expect(long).toBeCloseTo(2 * short, 12);
  });

  /*
   * 0006 §10's §4 row, over a run rather than over one hand-built world.
   *
   * **The factor of two is 0006 §3's exempt correction and not slack.** A dot
   * at the floor decelerated by the full bound ends below it, and the band
   * restoring it moves the velocity a second time — the region the band allows
   * is an annulus and is not convex, so the two corrections need not point the
   * same way. The band can add at most one further `MAX_ACCELERATION · seconds`,
   * which is where the two comes from and why it is asserted rather than hidden.
   */
  test("changes no velocity by more than twice the bound over a run", () => {
    let world = createWorld({ ...ordinary, seed: 11 });

    for (let taken = 0; taken < DISPERSAL_STEPS; taken += 1) {
      const stepped = step(world, seconds);

      expect(largestChange(world, stepped)).toBeLessThanOrEqual(2 * bound);
      world = stepped;
    }
  });

  // The same over the state that produces the largest changes there are, since
  // a corner is where two edges act at once and the band fires most often.
  test("holds the same over a run out of a corner", () => {
    let world = pileIntoCorner(createWorld({ ...ordinary, seed: 13 }));

    for (let taken = 0; taken < DISPERSAL_STEPS; taken += 1) {
      const stepped = step(world, seconds);

      expect(largestChange(world, stepped)).toBeLessThanOrEqual(2 * bound);
      world = stepped;
    }
  });
});

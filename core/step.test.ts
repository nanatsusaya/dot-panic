/**
 * A step returns a new world and changes nothing in the one it was given
 * (0002 §4), and the count it was given survives it — a row in 0008 §9's
 * asserted list. What a step does *not* do is asserted here as well, because
 * the rules of the flock arrive one ticket at a time and each arrival has to be
 * visible in what stops being true here. #99 is the fourth of those arrivals
 * and one such assertion left with it: *leaves every velocity alone* was true
 * only while nothing steered.
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
  NEIGHBORHOOD_RADIUS,
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

/** The middle of the frame, where 0006 §6's edge force is zero. */
const MIDDLE: Vector = { x: WIDE.width / 2, y: 0.5 };

/*
 * Every world below places a neighbor at the neighborhood's radius over a whole
 * number, and the whole numbers are not decoration. Separation pushes with
 * `NEIGHBORHOOD_RADIUS / gap − 1`, so a neighbor at the radius over `k` pushes
 * with exactly `k − 1` — which is what lets one neighbor's push cancel two
 * others' in integers, at whatever radius #216 chooses. Sevenths, fifths and
 * thirds give six, four and two, and six is four plus two.
 *
 * @param divisor  what to divide the radius by
 */
function radiusOver(divisor: number): number {
  return NEIGHBORHOOD_RADIUS / divisor;
}

/*
 * The speed the dot under test carries, in the middle of 0006 §3's band.
 *
 * **Not the floor**, which is the trap: a test of a force that slows a dot would
 * be answered by the band lifting it back rather than by the force, and it would
 * report the floor's number while looking like it reported the force's.
 */
const CARRIED: Vector = { x: (SPEED_MIN + SPEED_MAX) / 2, y: 0 };

/**
 * A world holding the dot under test and the neighbors it steers by.
 *
 * The dot sits in the middle of the frame for the same reason `worldOf`'s do —
 * so that a test about steering is not also a test about the edge.
 *
 * @param offsets           where each neighbor sits relative to the dot under
 *                          test
 * @param neighborVelocity  the velocity every neighbor carries. Passing
 *                          `CARRIED` is what makes alignment say nothing, since
 *                          it steers toward the difference from the dot's own
 * @returns a world whose first dot is the one under test
 */
function flockAround(
  offsets: readonly Vector[],
  neighborVelocity: Vector,
): World {
  return {
    dots: [
      { position: MIDDLE, velocity: CARRIED },
      ...offsets.map((offset) => ({
        position: { x: MIDDLE.x + offset.x, y: MIDDLE.y + offset.y },
        velocity: neighborVelocity,
      })),
    ],
    frame: WIDE,
    radius: DOT_RADIUS,
    random: randomFromSeed(1),
  };
}

/**
 * The velocity the dot under test ends a step with.
 *
 * `flockAround` and the worlds beside it always build a first dot, which
 * `noUncheckedIndexedAccess` cannot know — and a helper that quietly returned
 * nothing would leave every assertion below passing over an absence.
 *
 * @param world    the world to advance
 * @param seconds  how long the step covers
 */
function steered(world: World, seconds: number): Vector {
  const dot = step(world, seconds).dots[0];

  if (dot === undefined) {
    throw new Error("the world under test has no first dot");
  }

  return dot.velocity;
}

/**
 * How far the dot under test had its velocity changed by one step.
 *
 * `largestChange` narrowed to the first dot: in these worlds the others are
 * scenery, and what happens to them says nothing about the claim.
 *
 * @param before  the world that went into a step
 * @param after   the world that came out of it
 */
function changeOfSubject(before: World, after: World): number {
  const from = before.dots[0];
  const to = after.dots[0];

  if (from === undefined || to === undefined) {
    throw new Error("the world under test has no first dot");
  }

  return Math.hypot(
    to.velocity.x - from.velocity.x,
    to.velocity.y - from.velocity.y,
  );
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

  /*
   * A dot's displacement is the velocity it **ends** the step with, never the
   * one it came in at — a world where those two disagree draws a dot travelling
   * at a speed it does not have.
   *
   * This read *along its velocity* until #99, which was the same claim while
   * nothing changed one in the middle of a frame. It is not the same claim any
   * more, and stating it the weaker way would now assert that nothing steers.
   */
  test("moves every dot along the velocity it ends the step with", () => {
    const world = createWorld(ordinary);
    const seconds = 0.5;
    const stepped = step(world, seconds);

    const expected = stepped.dots.map((dot, index) => {
      const before = world.dots[index];

      return before === undefined
        ? []
        : [
            before.position.x + dot.velocity.x * seconds,
            before.position.y + dot.velocity.y * seconds,
          ];
    });

    const moved = stepped.dots.map((dot) => [dot.position.x, dot.position.y]);

    expect(moved).toEqual(expected);
  });

  /*
   * The one rule of the flock still absent, and the last one this file asserts
   * the absence of. 0006 §2's non-overlap is a constraint on the world a step
   * returns rather than a fourth force, and it arrives with #102 — which is
   * also what makes two dots at one position a case the Core may leave alone
   * rather than a state it has to resolve.
   *
   * **It reports less than its name suggests, and mutating the code is what
   * showed that.** Two identical dots stay identical under any rule that treats
   * them the same, so a separation that invented one fixed direction for a zero
   * distance left this green. What it does report is a rule that breaks the tie
   * — by array order, which is what a real non-overlap pass has to do — and
   * that is the shape #102 will arrive in. Read it as *nothing here separates
   * two dots that coincide*, not as *nothing here could*.
   */
  test("moves no dot to resolve an overlap, which #102 is what adds", () => {
    const together = worldOf([CARRIED, CARRIED]);

    const [first, second] = step(together, 1 / 60).dots;

    expect(first).toBeDefined();
    expect(second?.position).toEqual(first?.position);
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
   *
   * **Four seeds and three times #103's run, because #99 made this negotiable.**
   * Until steering existed the edge was the only force acting inside a margin
   * and one short run reported the whole rule. Now another force can point out
   * of the frame while the edge points in, and an early shape of separation did
   * exactly that — seeds 4, 11 and 15 lost a dot, the first at step 894, which
   * one seed over 600 steps saw nothing of. Those three are here as the cases
   * that were found rather than as a wider net for its own sake.
   */
  test("keeps every dot inside the frame over a run", () => {
    for (const seed of [4, 5, 11, 15]) {
      let world = createWorld({ ...ordinary, seed });

      for (let taken = 0; taken < 3 * DISPERSAL_STEPS; taken += 1) {
        world = step(world, seconds);

        const box = boundingBox(world);

        expect(box.left).toBeGreaterThanOrEqual(0);
        expect(box.right).toBeLessThanOrEqual(WIDE.width);
        expect(box.top).toBeGreaterThanOrEqual(0);
        expect(box.bottom).toBeLessThanOrEqual(WIDE.height);
      }
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

/*
 * 0006 §1's neighborhood, which is a radius and nothing else. That section
 * drops Reynolds' angular term deliberately, and says restoring it changes a
 * number rather than the structure — so the absence is a rule to assert and not
 * an omission to leave to review.
 */
describe("the neighborhood", () => {
  const seconds = 1 / 60;

  test("leaves a dot with nobody near it alone", () => {
    expect(steered(flockAround([], CARRIED), seconds)).toEqual(CARRIED);
  });

  // Both halves in one test, because the claim is where the boundary sits and
  // one side of it says nothing on its own.
  test("steers by a dot inside the radius and not by one outside it", () => {
    const inside = flockAround(
      [{ x: 0.99 * NEIGHBORHOOD_RADIUS, y: 0 }],
      CARRIED,
    );
    const outside = flockAround(
      [{ x: 1.01 * NEIGHBORHOOD_RADIUS, y: 0 }],
      CARRIED,
    );

    expect(steered(inside, seconds).x).not.toBeCloseTo(CARRIED.x, 12);
    expect(steered(outside, seconds)).toEqual(CARRIED);
  });

  /*
   * The angular term's absence, asserted where it would show. The one neighbor
   * sits directly **behind** the dot and carries a heading of its own, so the
   * dot turns toward that heading only if a dot it is moving away from counts
   * as a neighbor at all. Separation and cohesion both act along the line
   * between the two and can say nothing about `y`.
   */
  test("counts a neighbor behind exactly as one ahead", () => {
    const behind = flockAround([{ x: -radiusOver(2), y: 0 }], {
      x: CARRIED.x,
      y: CARRIED.x,
    });

    expect(steered(behind, seconds).y).toBeGreaterThan(0);
  });
});

/*
 * 0006 §1's three steering behaviors — the ticket that makes dots into a flock
 * rather than particles, and the only one of the five under #87 with no row in
 * 0006 §10. What a command decides here is each behavior's directional effect;
 * everything past that is the watching, and *it reads as a flock* is what 0001
 * §3.1 puts beyond any of this.
 *
 * **Each world below silences two of the three**, which is what makes these
 * claims about one behavior each rather than about their sum:
 *
 * - **alignment** says nothing when the neighbors carry the dot's own velocity,
 *   because it steers toward the difference from it;
 * - **cohesion** says nothing when the neighbors' average position is the dot
 *   itself;
 * - **separation** says nothing when the pushes away from the neighbors cancel,
 *   which takes three of them and works out in whole numbers: a neighbor at the
 *   radius over `k` pushes with `k − 1`, and six is four plus two.
 */
describe("the three steering behaviors", () => {
  const seconds = 1 / 60;

  /*
   * Two neighbors on the left and one on the right as far away as both of them
   * together, so their positions average to the dot's own and cohesion has
   * nothing to say. What is left pushes away from the crowded side.
   */
  test("steers away from its neighbors, cohesion being silent", () => {
    const world = flockAround(
      [
        { x: -radiusOver(7), y: 0 },
        { x: -radiusOver(3), y: 0 },
        { x: radiusOver(7) + radiusOver(3), y: 0 },
      ],
      CARRIED,
    );

    const velocity = steered(world, seconds);

    expect(velocity.x).toBeGreaterThan(CARRIED.x);
    expect(velocity.y).toBeCloseTo(0, 12);
  });

  /*
   * The mirror of it, and the reason the distances are the radius over a whole
   * number. The near neighbor on the right pushes with `7 − 1`; the two on the
   * left push with `5 − 1` and `3 − 1`, which is the same six. Separation
   * cancels exactly and the dot is left with the pull toward where its
   * neighbors average out, which is behind it.
   */
  test("steers toward their average position, separation being silent", () => {
    const world = flockAround(
      [
        { x: radiusOver(7), y: 0 },
        { x: -radiusOver(5), y: 0 },
        { x: -radiusOver(3), y: 0 },
      ],
      CARRIED,
    );

    const velocity = steered(world, seconds);

    expect(velocity.x).toBeLessThan(CARRIED.x);
    expect(velocity.y).toBeCloseTo(0, 12);
  });

  /*
   * Two neighbors placed symmetrically: the pushes away from them cancel and
   * their average position is the dot, so both of the other behaviors are
   * silent and only a heading is left to steer by.
   */
  test("steers toward their average heading, the other two being silent", () => {
    const world = flockAround(
      [
        { x: -radiusOver(2), y: 0 },
        { x: radiusOver(2), y: 0 },
      ],
      { x: CARRIED.x, y: CARRIED.x },
    );

    const velocity = steered(world, seconds);

    expect(velocity.y).toBeGreaterThan(0);
    expect(velocity.x).toBeCloseTo(CARRIED.x, 12);
  });

  /*
   * The crossover, which is what the three weights are for. Separation is
   * weighted above cohesion but falls away with distance while cohesion grows
   * to its full value at the radius — so the same neighbor is pushed away from
   * up close and steered toward far off. That is where a flock's spacing comes
   * from, and at these three numbers the two balance at 0.686 of the radius.
   */
  test("pushes away from a near neighbor and pulls toward a far one", () => {
    const near = flockAround([{ x: radiusOver(7), y: 0 }], CARRIED);
    const far = flockAround([{ x: 0.9 * NEIGHBORHOOD_RADIUS, y: 0 }], CARRIED);

    expect(steered(near, seconds).x).toBeLessThan(CARRIED.x);
    expect(steered(far, seconds).x).toBeGreaterThan(CARRIED.x);
  });

  /*
   * The scope item that ties this ticket to #101: the three vectors are summed
   * with 0006 §6's edge force and the bound applies to that sum, not to each
   * force in turn. In the corner below the edge alone already exceeds the bound
   * and the steering pushes the same way, so a bound applied per force would let
   * the velocity change by more than one of them allows.
   */
  test("hands the forces to #101's bound summed, not one at a time", () => {
    const bound = MAX_ACCELERATION * seconds;
    const inward = { x: -0.07, y: -0.07 };
    const crowded: World = {
      dots: [
        { position: { x: 0.02, y: 0.02 }, velocity: inward },
        { position: { x: 0.013, y: 0.013 }, velocity: inward },
      ],
      frame: WIDE,
      radius: DOT_RADIUS,
      random: randomFromSeed(1),
    };

    expect(changeOfSubject(crowded, step(crowded, seconds))).toBeCloseTo(
      bound,
      12,
    );
  });
});

/**
 * The Shell: the loop, the clock, the frame, the seed and the wiring.
 *
 * 0002 §2 gives this part everything the Core may not have and makes it the one
 * file that imports both of the others. Nothing here decides anything about the
 * world — 0002 §5 keeps that in the Core — so what this file contains is when
 * the Core is called, what it is called with, and where its result is drawn.
 *
 * It is also the first thing in this project that moves, which is why it lands
 * together with the control and the reduced-motion behavior: 0004 §4 makes
 * honoring `reduce` a condition of every motion change, so an increment that
 * moves without it is one that record forbids.
 */

import { step } from "../core/step.js";
import { createWorld, DOT_COUNT, DOT_RADIUS } from "../core/world.js";
import { type Colors, draw } from "../view/draw.js";

/*
 * 0008 R1 puts a number in the code and in the ticket that fixed it before the
 * work started, never in a record. Both of these are #94's and both are
 * provisional until #110 measures them on the floor device.
 *
 * Sixty is the refresh rate of most displays, so the ordinary case is one step
 * per frame and 0008 §3's *the same world drawn twice* reaches only faster
 * ones.
 */
const STEPS_PER_SECOND = 60;
const STEP_SECONDS = 1 / STEPS_PER_SECOND;

/*
 * Three steps is 50 ms of simulation before the flock starts falling behind:
 * enough to absorb a hitch, short of the spiral 0008 §4 rejects, where catching
 * up costs more than the frame that was missed.
 */
const MAX_STEPS_PER_DRAW = 3;

const MILLISECONDS = 1000;

/*
 * Read once at load. #97's criterion is the preference as it stands when the
 * page opens rather than one toggled mid-visit, so nothing here listens for a
 * change.
 */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const canvas = document.getElementById("flock") as HTMLCanvasElement;
const control = document.getElementById("motion") as HTMLButtonElement;
const context = canvas.getContext("2d");

/*
 * 0005 §3 defines the colors once in the stylesheet and has the Shell hand them
 * to the View, so that a mode change is a different argument rather than a
 * different View. Reading them inside the View is the alternative that record
 * rejects.
 *
 * The values themselves are #109's, together with `prefers-color-scheme`. What
 * this does is the route, which is what the View needs in order to be drawn at
 * all.
 */
function readColors(): Colors {
  const styles = getComputedStyle(document.documentElement);

  return {
    surface: styles.getPropertyValue("--surface"),
    dot: styles.getPropertyValue("--dot"),
  };
}

/*
 * The frame is the Shell's (0002 §2), and 0014 §2 leaves it as the viewport
 * minus the strip — which is what the canvas's own box already measures.
 *
 * This is CSS pixels. Sizing the backing store in device pixels is #108's, by
 * the `resolution` route 0005 §5 fixes, and so is keeping it current when the
 * window changes or the page is zoomed.
 */
function sizeCanvas(): void {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

/*
 * The seed is the Shell's under 0002 §2, and it is drawn fresh on every visit
 * so that no two loads start from the same arrangement. The Core stays
 * deterministic either way (0002 §4): given this seed it produces exactly one
 * world.
 */
function chooseSeed(): number {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

let world = createWorld({
  count: DOT_COUNT,
  radius: DOT_RADIUS,
  seed: chooseSeed(),
});

/*
 * 0006 §8: under `reduce` the page shows one frame and the world does not
 * advance, and the control starts the flock instead of stopping it. 0006 §9
 * makes both of those the same mechanism — the Shell not calling the Core —
 * rather than a state the world carries.
 */
let running = !prefersReducedMotion;

/*
 * The one clock in the project is the timestamp `requestAnimationFrame` hands
 * its own callback (0008 §2). `Date` and `performance` are both on 0002 §3's
 * list, and reaching for either here would be a second clock even outside the
 * Core.
 */
let previousTimestamp: number | undefined;

/*
 * What is left over after the whole steps a frame could afford. It is time the
 * simulation owes, not a fraction of a step: 0008 §3 fixes the step rate and
 * lets the draw rate be the display's, so a frame that lasts longer than one
 * step owes more than one.
 */
let owed = 0;

function frame(timestamp: number): void {
  if (context === null) {
    return;
  }

  const elapsed =
    previousTimestamp === undefined
      ? 0
      : (timestamp - previousTimestamp) / MILLISECONDS;

  previousTimestamp = timestamp;

  if (running) {
    owed += elapsed;

    let taken = 0;

    while (owed >= STEP_SECONDS && taken < MAX_STEPS_PER_DRAW) {
      world = step(world, STEP_SECONDS);
      owed -= STEP_SECONDS;
      taken += 1;
    }

    /*
     * 0008 §4: what the device could not afford is abandoned rather than
     * deferred, so the flock runs slow instead of stuttering — and a tab that
     * was in the background for a minute does not come back to a minute of
     * simulation owed.
     */
    if (owed >= STEP_SECONDS) {
      owed = 0;
    }
  }

  draw(context, world, readColors());

  requestAnimationFrame(frame);
}

control.addEventListener("click", () => {
  running = !running;
  label();
});

/*
 * The label is the whole of what the control says it does, because 0005 §7
 * gives it words rather than a symbol and 0004 §5 requires it to be operable
 * without a pointing device — a visitor arriving on it by keyboard has the
 * label and nothing else.
 */
function label(): void {
  control.textContent = running ? "Stop the flock" : "Start the flock";
}

sizeCanvas();
label();
requestAnimationFrame(frame);

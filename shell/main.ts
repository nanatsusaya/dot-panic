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
import {
  createWorld,
  DOT_COUNT,
  DOT_RADIUS,
  type Frame,
  type Vector,
  withFrame,
} from "../core/world.js";
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
 * The bounds of the search in `readResolution` below, and both are #108's under
 * 0008 R1 rather than any record's.
 *
 * Eight is an upper bound rather than a display anybody owns: the densest
 * screens in the wild are near 4 dppx, and a visitor zooming in doubles what
 * the page sees. A search needs a bound it can start from, and one nothing
 * reaches costs the twenty questions below and nothing else.
 *
 * Twenty halvings of that bound leave the answer short by less than 1e-5 dppx.
 * Across a 4000-pixel canvas that is 0.04 of a pixel, which cannot change a
 * rounded size — so the precision is spent where it is free rather than tuned.
 */
const MAX_RESOLUTION = 8;
const RESOLUTION_STEPS = 20;

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
 * 0014 §4's dialog and the control that opens it. This is the whole of the page
 * chrome any part of this project owns: 0002 A1 gave the Shell exactly one call
 * and says in terms that what it licenses is one call rather than page chrome as
 * a category, so 0014 §9 can have a command count instead of a reviewer arguing.
 */
const about = document.getElementById("about") as HTMLButtonElement;
const dialog = document.getElementById("about-dialog") as HTMLDialogElement;

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
 * How many device pixels the display puts in one CSS pixel, read through the
 * `resolution` media feature because 0005 §5 requires that route.
 *
 * **The property everyone reaches for first is not named anywhere in this
 * file**, which is #108's criterion rather than squeamishness: this project
 * already reads *appears nowhere in the source* as reaching comments too, which
 * is what 0002 §3's fifteen names cost `core/`. 0005 §5 and its R2 are where it
 * is named and where the reason sits — Baseline marks it limited because Safari
 * does not follow the page's zoom with it, 0001 §3.4 admits only what is widely
 * available, and a fallback to it is that floor loosened by another name.
 *
 * A media feature answers a question instead of returning a number, so the
 * number is found by asking: each answer halves the interval the display's
 * resolution lies in. `low` is only ever set to a value the display met, so
 * what comes back is a lower bound — a backing store a hair smaller than the
 * display can show is invisible, where one a hair larger is a picture the
 * browser scales down.
 */
function readResolution(): number {
  let low = 0;
  let high = MAX_RESOLUTION;

  for (let asked = 0; asked < RESOLUTION_STEPS; asked += 1) {
    const middle = (low + high) / 2;

    if (window.matchMedia(`(min-resolution: ${middle}dppx)`).matches) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return low;
}

/*
 * The frame is the Shell's (0002 §2), and 0014 §2 leaves it as the viewport
 * minus the strip — which is what the canvas's own box already measures.
 *
 * That box is in CSS pixels and the backing store is set in device pixels,
 * which is the whole of 0005 §5: on the mid-range phone 0001 §3.5 makes the
 * floor, a canvas sized in CSS pixels is one the display scales up, and every
 * dot's rim goes soft.
 *
 * **The world does not learn that any of this happened.** 0008 §6 makes every
 * length in it a fraction of the frame's shorter side, so the Core is the same
 * whether it is drawn onto 700 pixels or 2100.
 */
function sizeCanvas(): void {
  const resolution = readResolution();

  canvas.width = Math.round(canvas.clientWidth * resolution);
  canvas.height = Math.round(canvas.clientHeight * resolution);
}

/*
 * The same box read as 0006 §6's frame. 0008 §6 makes every length in the world
 * a fraction of the shorter side, so one of the two numbers below is 1 and the
 * other is the ratio — which is the whole of what the Core learns about size.
 *
 * **A box of zero would put NaN in every position and nothing recovers from
 * that**: the world carries it forward for the rest of the visit. The square
 * below is a frame nothing is ever drawn into, replaced by the next resize.
 */
function readFrame(): Frame {
  const shorter = Math.min(canvas.clientWidth, canvas.clientHeight);

  if (shorter === 0) {
    return { width: 1, height: 1 };
  }

  return {
    width: canvas.clientWidth / shorter,
    height: canvas.clientHeight / shorter,
  };
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
  frame: readFrame(),
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

/*
 * Where the visitor's pointer is, in the world's coordinates, or `undefined`
 * where there is none — which 0007 §7 makes the ordinary case rather than a
 * degraded one. A device that never produces a pointer leaves this exactly as
 * it starts.
 *
 * **This is the whole of what the Shell keeps about input**, and 0007 §2 is why:
 * no velocity, no smoothing, no decay, no strength. Each of those is derived,
 * and derived is the Core's — a Shell handing over an already-decayed influence
 * would be deciding how the flock reacts, in the part of the system no test
 * reaches.
 */
let pointer: Vector | undefined;

function frame(timestamp: number): void {
  if (context === null) {
    return;
  }

  const elapsed =
    previousTimestamp === undefined
      ? 0
      : (timestamp - previousTimestamp) / MILLISECONDS;

  previousTimestamp = timestamp;

  /*
   * 0008 §10: the Core is not stepped while the dialog is open. That record is
   * explicit that the reason is not wasted work — the standard's backdrop is ten
   * percent, so the flock stays plainly visible — but that motion sits behind
   * text somebody is reading, and 0004 §5's control is inert exactly then,
   * because everything outside a modal dialog is.
   *
   * Reading `open` is not opening, closing or toggling anything, so 0014 §9's
   * invariant is untouched. And nothing is owed on the way back: `owed` only
   * grows inside this branch, so a dialog left open for a minute resumes from
   * the world it stopped on with no catch-up at all — which is inside what §4's
   * cap already allows rather than a second rule.
   */
  if (running && !dialog.open) {
    owed += elapsed;

    let taken = 0;

    while (owed >= STEP_SECONDS && taken < MAX_STEPS_PER_DRAW) {
      world = step(world, STEP_SECONDS, pointer);
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
 * The one call, and the whole of it. 0014 §5 could not use markup: a form with
 * `method="dialog"` closes rather than opens, and invoker commands are Baseline
 * newly available until 2028-06-12, which 0001 §3.4 does not admit. **It is a
 * bridge with an end date** — on that date the markup becomes permitted and this
 * handler goes, without anyone deciding anything.
 *
 * `showModal` rather than `show`, and that is not a preference either: the
 * backdrop, focus containment, the inertness 0008 §10 relies on and dismissal by
 * `Escape` are properties of a modal dialog only. Closing is markup's, from the
 * form inside the dialog, so `close` appears nowhere in this project.
 */
about.addEventListener("click", () => {
  dialog.showModal();
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

/*
 * Both halves of what #108 asks to stay current arrive here. A window that
 * changes size changes the canvas's box; a page that is zoomed changes how many
 * CSS pixels the viewport holds, so it changes that box as well — and the
 * resolution is read again either way, because the sizing is one operation
 * rather than two.
 *
 * Setting the backing store clears it, and the next frame redraws it whole
 * (0005 §1), which is also true while the flock is stopped: the loop keeps
 * drawing, only the Core stops being called (0006 §9).
 *
 * **The world's frame moves with it and the world is not rebuilt** (0006 §6).
 * Dots the new frame leaves outside are brought back by the turning force,
 * which is why that force is a force: a flock that started over whenever
 * somebody dragged an edge would read as broken.
 *
 * **No browser fires this event on page load**, so the call below is what sizes
 * the canvas the first time and is not something this listener would have done.
 */
function fitToCanvas(): void {
  sizeCanvas();
  world = withFrame(world, readFrame());
}

window.addEventListener("resize", fitToCanvas);

/*
 * An event's position in the **world's** coordinates, which is the raw fact 0007
 * §2 lets this file hand over and the only arithmetic it does.
 *
 * It divides by the same shorter side `readFrame` divides by, so the pointer and
 * the frame are in one coordinate system by construction rather than by two
 * places agreeing. The offset comes from the box because that is the only thing
 * carrying where the canvas sits on the page; the canvas has no border and no
 * padding, so the two measurements are the same rectangle.
 *
 * **A box of zero has no coordinates to give**, and the answer is that there is
 * no pointer rather than a position built from a division by zero — the same
 * state `readFrame` guards, reached the same way.
 *
 * @param event  the pointer event to place
 * @returns where it happened, in the world's coordinates, or `undefined` where
 *          the canvas has no size
 */
function inWorld(event: PointerEvent): Vector | undefined {
  const shorter = Math.min(canvas.clientWidth, canvas.clientHeight);

  if (shorter === 0) {
    return undefined;
  }

  const box = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - box.left) / shorter,
    y: (event.clientY - box.top) / shorter,
  };
}

/*
 * 0007 §1's one code path: Pointer Events, and no mouse or touch listener beside
 * them.
 *
 * **The page listens rather than the canvas**, so that a pointer crossing onto
 * the strip stays a pointer instead of disappearing at an edge the visitor
 * cannot see. The world's coordinates simply run past the frame there, which
 * 0006 §6's edge already deals with for dots and 0007 §5 makes harmless for a
 * force that falls to zero.
 *
 * **What happens after presence ends is the Core's** — 0007 §2 puts the fade in
 * the world, so nothing here counts anything down and there is no timer.
 *
 * **`pointerup` does not end presence, and that is 0007 §4 read with §4's own
 * device split.** Its *`pointerup` and `pointercancel` both end it* stands in
 * the touch paragraph; applied to a mouse it would leave a click followed by a
 * perfectly still cursor with no pointer at all, which is R2's parked cursor
 * contradicted by a sentence naming no device. So a release records where the
 * pointer is, like a move, and what ends presence is `pointerleave` below —
 * which [Pointer Events Level 3](https://www.w3.org/TR/pointerevents3/#the-pointerout-event)
 * fires *"after the user agent fires the pointerup event for a device that does
 * not support hover"*, so a lifted finger produces one and a released button
 * does not. §4's line between the two paths, in one code path where the four
 * names could not express it.
 *
 * **The four names are written out rather than looped over.** A loop over an
 * array of them is shorter and defeats the command that decides this section: it
 * reads literal event names out of this file, so a name it cannot see is a path
 * nothing checks. Writing them out also gives each handler its event type from
 * `WindowEventMap` instead of a cast.
 */
window.addEventListener("pointerdown", (event) => {
  pointer = inWorld(event);
});

window.addEventListener("pointermove", (event) => {
  pointer = inWorld(event);
});

window.addEventListener("pointerup", (event) => {
  pointer = inWorld(event);
});

window.addEventListener("pointercancel", () => {
  pointer = undefined;
});

/*
 * The fifth Pointer Event, and 0007 §1 is untouched by it: that section decides
 * *one code path, and it is Pointer Events*, so a fifth name from the same API
 * reopens nothing — where a second set of listeners would. The decider settled
 * that against PR #235's O1 on 2026-08-09.
 *
 * **It carries two cases the four cannot produce**, both required by 0007 §4. A
 * finger lifted or a gesture taken over reaches it through the specification's
 * *after the user agent fires the pointerup event for a device that does not
 * support hover*. And a cursor leaving the window — §4's one case where a mouse
 * loses its position — arrives as the pointer leaving the document element,
 * which is **a browser's behavior rather than a guarantee that list makes**, so
 * #107 watches it rather than asserting it.
 *
 * **On the document element and not on `window`**, because `pointerleave` does
 * not bubble: on the root it means the pointer left the page and all of it,
 * where `pointerout` would fire every time a cursor crossed from the canvas onto
 * the strip and release the flock in the middle of a visit.
 */
document.documentElement.addEventListener("pointerleave", () => {
  pointer = undefined;
});

fitToCanvas();
label();
requestAnimationFrame(frame);

/**
 * The View: given a world, draw it (0002 §2).
 *
 * It is the one part of this project that can only be judged by watching
 * (0001 §3.1), which is why 0002 §2 keeps it alone in a part of its own — that
 * is what holds the unverifiable surface to its smallest possible size.
 *
 * **Nothing here is tested, by construction rather than by neglect.** 0010 §6
 * declines pixel comparison, DOM snapshots and a headless browser, each for its
 * own reason, and 0010 §7 excludes this directory from the coverage floor by
 * name. What replaces a test is 0012 §5: the expected picture is written into
 * the ticket before the work, and the work is looked at against it.
 */

import type { World } from "../core/world.js";

/**
 * The colors the View is told, never the ones it decides.
 *
 * 0005 §3 puts the page's three colors in the stylesheet and has the Shell hand
 * them over rather than the View read them, so a color mode is a different
 * argument instead of a different View.
 *
 * **Two of the three, and the third is not an omission.** The canvas carries no
 * text — 0005 §2 makes a dot a plain filled circle and #93 forbids text
 * outright — so a text color would be an argument this file never reads, which
 * would say the View might draw text one day.
 */
export type Colors = {
  readonly surface: string;
  readonly dot: string;
};

/**
 * Draw one world onto one canvas.
 *
 * Immediate mode, cleared and redrawn whole every frame (0005 §1). The surface
 * keeps no state that could disagree with the world, so a picture that is wrong
 * is a world that is wrong — which is the property that makes a test over the
 * Core mean something about what is on screen. Nothing here interpolates, eases
 * or animates (0002 §5).
 *
 * **The multiplication below is not what 0002 §5 forbids.** A world holds
 * fractions of the frame's shorter side (0008 §6) and a canvas holds pixels, so
 * something has to convert between the two. What §5 forbids is the drawing
 * inventing motion, and nothing here does: the same world always produces the
 * same picture.
 *
 * @param context  the 2D context to draw into. Its canvas's own dimensions are
 *                 the frame — choosing them is the Shell's (0002 §2), and
 *                 meeting a high-density display with them is 0005 §5's
 * @param world    the world to draw. Read and not changed
 * @param colors   what to paint with (0005 §3)
 */
export function draw(
  context: CanvasRenderingContext2D,
  world: World,
  colors: Colors,
): void {
  // Nothing in this file lives outside this call. 0005 §1 makes that checkable
  // by reading — no variable in the View survives the frame it drew — so even
  // a constant belongs in here rather than at module scope.
  const fullCircle = Math.PI * 2;
  const { width, height } = context.canvas;
  const shorterSide = Math.min(width, height);
  const radius = world.radius * shorterSide;

  context.fillStyle = colors.surface;
  context.fillRect(0, 0, width, height);

  context.fillStyle = colors.dot;
  for (const dot of world.dots) {
    context.beginPath();
    context.arc(
      dot.position.x * shorterSide,
      dot.position.y * shorterSide,
      radius,
      0,
      fullCircle,
    );
    context.fill();
  }
}

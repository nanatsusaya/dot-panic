# 0014 — Page layout

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#49](https://github.com/nanatsusaya/dot-panic/issues/49)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (it reads as a
  flock, judged by watching), §3.4 (the Baseline floor), §3.5 (a mid-range phone
  is the floor device), §4 (the page carries a flock, an imprint and an
  explanation) · [0002](0002-overall-architecture.md) §2 (the Shell owns the size
  of the frame), §6 (the imprint and the explanation are outside the
  application) · [0003](0003-security-and-privacy-by-design.md) §7 (the imprint
  is on the page, in exactly one place) ·
  [0004](0004-compliance-accessibility-and-rights.md) §1 (*leicht erkennbar,
  unmittelbar erreichbar*), §5 (a control that stops the motion), §10 (the text
  is document text and is never drawn) ·
  [0005](0005-rendering-and-visual-design.md) §1 (one canvas), §6 (the visitor's
  own fonts), §7 (the control is a visible button, always present) ·
  [0006](0006-motion-rules.md) §9 (stopping is the absence of steps) ·
  [0007](0007-pointer-and-input-model.md) §6 (the radius scales with the frame),
  §8 (`touch-action: none`, and the requirement it leaves unowned) ·
  [0012](0012-how-software-gets-developed.md) §5 (watch-first where no command
  can decide)
- **Supersedes:** nothing

## Context

[0001](0001-purpose-scope-and-success.md) §4 puts three things on the page and
no record has said how they sit together. Until 0007 that was a gap nobody had
to care about.

**0007 §8 turned it into a defect waiting to happen.** `touch-action: none` on
the drawing surface is required or touch does not work at all — without it the
browser takes the gesture and `pointercancel` arrives mid-stroke. Its cost is
that a gesture beginning on the canvas can no longer scroll the page. **A canvas
filling the viewport therefore traps a touch visitor away from the imprint**,
which fails the whole subject of
[0004](0004-compliance-accessibility-and-rights.md) rather than merely looking
bad. 0007 §8 states the requirement and says plainly that it owns nothing that
can satisfy it.

**A second requirement was already unsatisfiable, and nothing had noticed.**
[0005](0005-rendering-and-visual-design.md) §7 says the control from 0004 §5 is
*always visible*, and rejects both hover-revealed and focus-revealed for the same
reason: a control the visitor cannot see is not a mechanism they can use. 0005
cannot deliver that alone. A button that is in the document and below the fold on
a phone is not visible, and **whether it is on screen is decided by layout and by
nothing else.** So this record owns two obligations it did not create, and they
have the same answer.

**Repository state at the time of writing.** No code, no page, no toolchain.
Eight records accepted. Every number here is deferred, for the reason 0005 §3 and
0006 §10 give.

**What is not open here.** What is drawn and in what color is 0005. How many dots
is 0008. How big the frame is in pixels is the Shell's under 0002 §2 — this
record decides what box the canvas gets, not what it measures.

## Decision

### 1. One column, and the order is flock, control, explanation, imprint

Document order and reading order are the same, and there is no second
arrangement.

The control sits directly under the canvas because it acts on it: 0004 §5 makes
it a way to stop *that motion*, and a control separated from what it controls
has to be labeled into a relationship it could have had by position.

**The imprint is last, and that costs it nothing.** 0004 §1's *leicht erkennbar,
unmittelbar erreichbar und ständig verfügbar* is already satisfied more strictly
than it asks, by 0003 §7 putting the imprint on the page itself rather than
behind a link. Its position in the column is not carrying that obligation.

### 2. The canvas never occupies the whole viewport

**At every viewport size, some part of the page that is not the canvas is on
screen without scrolling.**

That is the answer to 0007 §8, and it is the whole of it. The trap that record
describes needs a gesture to have nowhere to begin except the canvas; this
guarantees somewhere. `touch-action: none` then costs nothing a visitor can
reach.

**It is also what makes 0005 §7 true.** The control is the first thing in the
non-canvas region under §1, so the same invariant that keeps the page scrollable
keeps the control on screen. Two requirements, one mechanism — which is why they
are one section and not two.

Stated as an invariant rather than as a fraction on purpose. *The canvas is 70%
tall* is a number that can be right on one device and wrong on the next; *there
is always somewhere else to put a finger* is the thing actually required.

### 3. The text takes the height it needs, and the canvas takes what is left

Not a fixed fraction of the viewport, and not a fixed height.

**The reason is text scaling, and it is the strongest argument in this record.** A
visitor who enlarges text is using an accessibility mechanism, and a canvas
pinned to a fraction of the viewport fights it: at doubled text the explanation
and the imprint need roughly twice the height, and a fixed canvas pushes them out
of the space that is left. §2 would go on holding while 0004 §1 quietly failed —
the worst shape a rule can have, because the invariant that was supposed to
protect the text is the one still passing.

So the non-canvas blocks are laid out at their natural height and the canvas
takes the remainder, down to a floor. **Both flexbox** — Baseline widely
available, widely as of 2018-03-30 — **and grid** — widely as of 2020-04-17 —
express this; which one is implementation. A floor on the result is
`min()`/`max()`/`clamp()`, widely as of 2023-01-28.

**The floor itself is not fixed here.** Below some height a flock stops reading
as a flock, and 0001 §3.1 puts that beyond what any document can decide. What is
fixed is that a floor exists, and that reaching it is what makes the page scroll.

### 4. Below the floor the page scrolls, and that is the designed outcome

When the text needs more room than the viewport leaves above the canvas's floor,
the page scrolls. Nothing is clipped, nothing is hidden, and nothing is moved
somewhere else.

**A page that never scrolls was the attractive alternative**, because it makes §2
true without an argument: with nothing to scroll to, `touch-action: none` traps
nobody. It was rejected. Guaranteeing it at every combination of viewport size
and text size means either clipping the text or shrinking the canvas without
limit — the first breaks 0004 §1, the second breaks 0001 §3.1, and there is no
third option. **A page that scrolls is the only one that keeps both.**

§2 survives scrolling because the canvas's height is bounded by the viewport and
not by the document: however far the page is scrolled, the canvas cannot grow to
cover the screen.

### 5. The text carries a maximum line length; the canvas is not bound by it

The canvas may be wider than the text, and on any display wide enough for the
difference to matter, it is.

Two reasons pulling opposite ways, which is why this is a decision rather than a
default. A flock in a column narrow enough to read comfortably reads as a queue
rather than as a flock, and 0001 §3.1 is the condition the whole project is
arranged around. A line of explanation the full width of a wide display is
unreadable, and the imprint is the one text 0004 §1 requires a person be able to
actually find and read.

**Neither measure is fixed here.** 0005 §6 gives the page whatever fonts the
visitor already has, so a line length can only be expressed in characters, and
which number reads well is watched. How far past the text the canvas goes is
watched for the same reason 0005 §3 fixes no color: it is judged by looking, and
a number argued into a document before anything has been on a screen is that
judgment made by writing.

### 6. Viewport height is measured with the small viewport unit

`svh`. **Baseline widely available** — available 2022-12-05, widely as of
2025-06-05, so 0001 §3.4 permits it.

`100vh` on a phone is the viewport with the browser's chrome **retracted**. A
layout sized against it is taller than the screen exactly when the chrome is
showing, which is on load — so §2 would be false at the one moment it matters
most, and false in the direction that pushes the control off screen.

`svh` is the viewport with the chrome shown, so a layout that fits it fits at
every point in the chrome's travel.

**`dvh` was rejected and it is the interesting one.** It tracks the chrome live,
which sounds strictly better and is worse here: it would resize the canvas while
the visitor scrolls. That resizes the frame under 0002 §2, and the pointer's
radius of effect is a fraction of the frame under 0007 §6 — so scrolling would
change how the flock responds to a finger. Motion caused by scrolling is motion
nothing asked for.

### 7. No breakpoint, and no container query

There is one arrangement, and it is §1's, from the floor device to a desktop.

**Container queries are Baseline widely available** — available 2023-02-14,
widely as of 2025-08-14 — so 0001 §3.4 permits them and this record uses none.
Recorded as a no in the way 0005 §8 and 0007 §7 record theirs, so that a later
change does not have to work out whether it was considered.

A breakpoint is a second layout, and 0012 §5 makes every layout claim watch-first
because no command decides one. One arrangement costs one thing to watch. Two
cost three, because the switch between them is its own failure and it appears at
a width nobody is looking at.

### 8. What is asserted, and what is only ever watched

The same division 0006 §10 and 0007 §9 make.

**Decidable by measuring a rendered page** — whether anything measures it is
0010's, and there is no toolchain yet:

| | Invariant |
|---|---|
| §2 | The canvas's height is less than the viewport's, at every viewport size |
| §2 | The control is on screen without scrolling, on the floor device |
| §3 | Doubling the text size does not push the imprint out of the document flow |
| §7 | The stylesheet contains no width breakpoint and no container query |

**Only watching decides these**, under 0012 §5, with the expected picture written
into the ticket before the work starts:

- The canvas's floor height — the point below which it stops reading as a flock
- The maximum line length, and how far past it the canvas extends
- Whether the page reads as a flock with text beneath it, rather than as a widget
  embedded in a document

## Consequences

**Positive.**

- **0007 §8's requirement has an owner and a mechanism**, not a sentence in a
  record that could not enforce it.
- **0005 §7 becomes true.** *Always visible* was a claim about a button that
  layout had to make good on, and §1 and §2 together do. Nothing else could.
- **One arrangement is one thing to watch**, which is the only currency 0012 §5
  deals in for this kind of claim.
- **The page still loads nothing.** 0003 §2 survives another visible record: no
  image, no font, and now no second layout either.

**Negative, and these are real.**

- **The flock gets less of the screen than a page about a flock would want.** §2
  is a permanent tax, paid on every device — including every device with no touch
  input at all, which will never meet the problem it pays for.
- **§3 makes the canvas's height depend on something the visitor controls.** A
  font-size change resizes the frame, and 0007 §6 ties the pointer's radius to the
  frame. 0007 already named a resize as changing the radius mid-session with no
  invariant noticing; this record makes that reachable without touching the
  window.
- **Scrolling moves the flock partly off screen while it keeps stepping.**
  Nothing pauses it. 0006 §9 makes stopping the Shell's absence of steps rather
  than anything the Core knows about, so this record could ask for it only by
  putting a scroll listener in the Shell — and whether that is worth it is O2.
- **§5 gives the page two widths**, and it is the first place anything here has
  more than one measure. A reader arriving from 0005, which describes one canvas
  and one column of text, meets a distinction that record does not prepare them
  for.
- **Nothing here can be run.** Eight sections, no numbers, nothing on a screen —
  the same position 0005, 0006 and 0007 are in, and the third record in a row
  whose central claims are settled by watching a thing that does not exist.

## Alternatives considered

- **A canvas filling the viewport, with the text below the fold.** Rejected in
  §2: it is precisely the trap 0007 §8 names, and on touch it is not a degraded
  experience but an unreachable imprint.
- **A canvas filling the viewport, with the text overlaid on it.** Rejected:
  reading text over a moving field is the failure 0004 §5 exists to prevent, and
  an overlay would have to be dismissible — which is a second control on a page
  that has one only because an obligation required it.
- **The imprint behind a link, or in a dialog.** Rejected: 0003 §7 puts it on the
  page in exactly one place, and 0004 §1 records that this already exceeds
  *unmittelbar erreichbar*. Moving it would spend that margin for nothing.
- **A page that never scrolls.** Rejected in §4: it holds only by clipping the
  text or by shrinking the canvas without limit.
- **A fixed fraction of the viewport for the canvas.** Rejected in §3: it fights
  text scaling, and it fails in the shape where the invariant still passes.
- **Sizing the canvas by `aspect-ratio`.** Rejected because it makes the canvas's
  height a function of the window's width, so a wide, short window gets a canvas
  taller than the screen — §2 failing on exactly the shape where it is easiest to
  fail, and one a laptop meets every day.
- **Breakpoints, or a container query.** Rejected in §7: a second layout costs
  more to watch than it buys, and it is available rather than needed.
- **`100vh`, or `dvh`.** Rejected in §6. The first is taller than the screen when
  the chrome is showing; the second changes the pointer's radius while the visitor
  scrolls.

## Open questions

**O1 — Does the control sit under the canvas or above it?**

§1 puts it under, and §2 guarantees it is on screen either way. Above would
guarantee it more strongly: it would be the first thing on the page, before the
visitor has scrolled anything, and 0004 §5 exists for people who need the motion
stopped. The cost is that the page then opens with a button rather than with the
thing the page is.

*Recommended: under the canvas.* The guarantee in §2 is what 0004 §5 actually
needs, and it does not get stronger by moving the button — a control on screen is
a control on screen. Putting it first buys prominence and spends the page's
opening on the exit.

**O2 — Does the flock keep stepping while it is scrolled off screen, and is that
this record's question or 0008's?**

Nothing currently stops it. 0006 §9 gives the mechanism for free — the Shell
stops calling the Core — but noticing that the canvas has left the screen is a
new thing in the Shell that no record asks for.

*Recommended: not this record's, and 0008 decides it.* It is a question about
work done for nothing on a device with a battery, which is the shape of a
performance budget rather than of a layout. Named here so 0008 finds it in
writing rather than discovering it.

If the answer is that it belongs here, this record gains a section and 0008
inherits a constraint instead of a question.

## References

- Small, large, and dynamic viewport units (`svh`, `lvh`, `dvh`) — Baseline
  widely available, available 2022-12-05, widely 2025-06-05; Chrome 108, Edge
  108, Firefox 101, Firefox Android 101, Safari 15.4, Safari iOS 15.4.
  <https://api.webstatus.dev/v1/features/viewport-unit-variants>, read
  2026-08-02.
- Container queries — Baseline widely available, available 2023-02-14, widely
  2025-08-14; Chrome 105, Edge 105, Firefox 110, Safari 16, Safari iOS 16. The
  feature §7 records as considered and unused.
  <https://api.webstatus.dev/v1/features/container-queries>, read 2026-08-02.
- Flexbox — Baseline widely available, available 2015-09-30, widely 2018-03-30.
  <https://api.webstatus.dev/v1/features/flexbox>, read 2026-08-02.
- Grid — Baseline widely available, available 2017-10-17, widely 2020-04-17.
  <https://api.webstatus.dev/v1/features/grid>, read 2026-08-02.
- `min()`, `max()` and `clamp()` — Baseline widely available, available
  2020-07-28, widely 2023-01-28.
  <https://api.webstatus.dev/v1/features/min-max-clamp>, read 2026-08-02.
- [0004](0004-compliance-accessibility-and-rights.md) §1, §5, §10 — the imprint
  obligation, the control, and why the text is never drawn. Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §1, §6, §7 — the surface, the
  fonts, and the *always visible* claim this record makes good on. Read
  2026-08-02.
- [0007](0007-pointer-and-input-model.md) §6, §8 — the radius tied to the frame,
  and the requirement this record exists to own. Read 2026-08-02.
- [Ticket #49](https://github.com/nanatsusaya/dot-panic/issues/49) — the scope
  this record is written against. Read 2026-08-02.

# 0014 — Page layout

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#49](https://github.com/nanatsusaya/dot-panic/issues/49)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (it reads as a
  flock, judged by watching), §3.4 (the Baseline floor), §3.5 (a mid-range phone
  is the floor device), §4 (the page carries a flock, an imprint and an
  explanation), R3 (a settings surface was left to its own record) ·
  [0002](0002-overall-architecture.md) §2 (the Shell owns the size of the frame
  and nothing else on the page), §6 (the imprint and the explanation are outside
  the application) · [0003](0003-security-and-privacy-by-design.md) §4 (nothing
  is stored on the visitor's device), §7 (the imprint is readable on the page and
  appears in one place) ·
  [0004](0004-compliance-accessibility-and-rights.md) §1 (*leicht erkennbar,
  unmittelbar erreichbar*), §5 (a control that stops the motion), §10 (*leicht
  erkennbar* is about a person finding it) ·
  [0005](0005-rendering-and-visual-design.md) §1 (one canvas), §6 (the visitor's
  own fonts, and no icon font), §7 (the control is a visible button, always
  present) · [0006](0006-motion-rules.md) §6 (the frame edge is a turning force),
  §8 (under `reduce` the control starts the flock), §9 (stopping is the absence
  of steps) · [0007](0007-pointer-and-input-model.md) §6 (the radius scales with
  the frame), §8 (`touch-action: none`, and the requirement it leaves unowned) ·
  [0012](0012-how-software-gets-developed.md) §5 (watch-first where no command
  can decide)
- **Supersedes:** nothing

## Context

[0001](0001-purpose-scope-and-success.md) §4 puts three things on the page and no
record has said how they sit together. Until 0007 that was a gap nobody had to
care about.

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
[0005](0005-rendering-and-visual-design.md) §7 calls the control from 0004 §5
*always visible* and rejects both hover-revealed and focus-revealed, for one
reason: a control the visitor cannot see is not a mechanism they can use. 0005
cannot deliver that alone. A button that is in the document and below the fold on
a phone is not visible, and **whether it is on screen is decided by layout and by
nothing else.**

Both obligations have the same answer, and it is §2.

**Repository state at the time of writing.** No code, no page, no toolchain.
Eight records accepted. Every number here is deferred, for the reason 0005 §3 and
0006 §10 give.

**What is not open here.** What is drawn and in what color is 0005. How many dots
is 0008. Whether the visitor may change anything is 0015, which R5 creates. How
big the frame is in pixels is the Shell's under 0002 §2 — this record decides
what box the canvas gets, not what it measures.

## Decision

### 1. The page is one screen and does not scroll

The document is exactly as tall as the viewport at every size. Nothing is below a
fold, because there is no fold.

**This is what makes 0007 §8 cost nothing.** That record's trap needs a page with
somewhere to scroll to and no gesture able to reach it. A page that does not
scroll has no such place, so `touch-action: none` takes away a capability nothing
was using.

The text this displaces is not deleted; §4 gives it a dialog, which scrolls
inside itself. **That is the whole of the trick**, and it is worth naming plainly
because an earlier draft of this record concluded the opposite — see R1.

### 2. A strip at the bottom carries the controls; everything above it is canvas

The strip holds two things and nothing else:

- **The control from 0004 §5**, a real button that stops the motion and starts it
  again. Under `reduce` it starts rather than stops, which 0006 §8 already
  decided. Labeled with words, because 0005 §6 leaves no icon font.
- **A second button that opens the dialog in §4.**

**The strip is the guaranteed non-canvas region**, and it is what both context
obligations were asking for. The imprint is reachable by a gesture that does not
begin on the canvas (0007 §8) because the button that reaches it is not on the
canvas. The control is on screen without scrolling (0005 §7) because the strip
always is.

**It takes the height its two controls need**, and the canvas takes the rest.
Not a fraction of the viewport: a visitor who enlarges text is using an
accessibility mechanism, and a fixed fraction fights it. Two buttons have a
bounded height, so the canvas cannot be squeezed to nothing by text alone.

### 3. The strip's top edge is the frame's boundary, not an obstacle inside it

The canvas ends where the strip begins. The flock never enters the strip because
**there is no strip to enter** — that region is not part of the frame.

The alternative was a canvas filling the whole viewport with the strip floating
over it, and the flock avoiding the covered region as an obstacle. It produces
the same picture and costs a great deal more: an obstacle is a fourth force in
the Core, which 0012 §4 requires be written as a failing test first, with a new
invariant and a new number to watch. And a dot that wandered under an opaque
strip would simply vanish, which reads as a bug rather than as a rule.

**0006 §6 already does this work.** The frame edge is a turning force with a
margin sized against the caps in §3 and §4 of that record. This record adds no
mechanism; it decides where one of the four edges is.

### 4. The explanation and the imprint live in a dialog, opened from the strip

Sections inside it, each collapsible, so a visitor opens the one they came for.

**The dialog scrolls; the page does not.** That is what lets §1 hold at any text
size without clipping anything — the failure an earlier draft could see no way
around.

The text inside carries a maximum line length. 0005 §6 gives the page whatever
fonts the visitor already has, so that length can only be expressed in
characters, and which number reads well is watched.

**This puts the imprint one press away**, which is a reading of 0003 §7 rather
than a plain consequence of it. R1 records the reading, whose it is, and the
argument against it.

### 5. The dialog and its sections are native elements, so that no part owns them

`<dialog>` — **Baseline widely available**, available 2022-03-14, widely as of
2024-09-14. `<details>` — widely as of 2022-07-15.

**No script opens, closes or toggles anything on this page.**

That is not economy, it is 0002. The architecture has three parts, and 0002 §2
gives the Shell the loop, the clock, input events, the frame and the wiring —
page chrome is not among them. A scripted dialog would make the Shell own a
second job that no record gives it, or invent a fourth part. Native elements make
the question disappear: the markup is static, 0002 §6 keeps holding, and nothing
in the application knows the dialog exists.

`showModal()` would be script. **The dialog is opened by a form submission
targeting it**, which is markup. Focus containment and dismissal by `Escape` come
with the element rather than being reimplemented, which is the second reason and
would have been enough on its own.

### 6. The control that opens the dialog names the imprint

Its label says so. Not *info*, not *about*, not a symbol.

**This is the price of §4 and it is not optional.** 0004 §10 states what the
obligation actually turns on: *§1's `leicht erkennbar` is about a person finding
it.* While the imprint sat directly on the page the question could not arise.
Behind a control, the control's label is the whole of whether a person finds it —
so the label is a requirement of this record rather than a matter of wording.

What the label says is watched; that it names the imprint is asserted.

### 7. Viewport height is measured with the small viewport unit

`svh`. **Baseline widely available** — available 2022-12-05, widely as of
2025-06-05, so 0001 §3.4 permits it.

`100vh` on a phone is the viewport with the browser's chrome **retracted**. A
layout sized against it is taller than the screen exactly when the chrome is
showing, which is on load — so §1 would be false and the strip would be pushed
off the bottom, taking the control with it.

**`dvh` was rejected and it is the interesting one.** It tracks the chrome live,
which sounds strictly better. It would resize the canvas whenever the chrome
moved, and 0007 §6 ties the pointer's radius of effect to the frame — so the
flock's response to a finger would change underneath the visitor.

**§1 is what makes `svh` exactly right rather than merely safe.** Browser chrome
retracts in response to scrolling, and this page does not scroll, so the small
viewport is the one the visitor actually has.

### 8. No breakpoint, and no container query

There is one arrangement, and it is §2's, from the floor device to a desktop.

**Container queries are Baseline widely available** — available 2023-02-14,
widely as of 2025-08-14 — so 0001 §3.4 permits them and this record uses none.
Recorded as a no in the way 0005 §8 and 0007 §7 record theirs, so that a later
change does not have to work out whether it was considered.

A breakpoint is a second layout, and 0012 §5 makes every layout claim watch-first
because no command decides one. One arrangement costs one thing to watch. Two
cost three, because the switch between them is its own failure and it appears at
a width nobody is looking at.

### 9. What is asserted, and what is only ever watched

The same division 0006 §10 and 0007 §9 make.

**Decidable by reading the page's source, with no browser:**

| | Invariant |
|---|---|
| §5 | No script opens, closes or toggles the dialog |
| §6 | The label of the control that opens the dialog names the imprint |
| §8 | The stylesheet contains no width breakpoint and no container query |

**Decidable by measuring a rendered page** — whether anything measures it is
0010's, and there is no toolchain yet:

| | Invariant |
|---|---|
| §1 | The document's scrollable height equals the viewport's, at every size |
| §2 | The strip and both its controls are on screen, on the floor device |
| §2 | Doubling the text size leaves both controls on screen |

**Only watching decides these**, under 0012 §5, with the expected picture written
into the ticket before the work starts:

- Whether the strip reads as the edge of the flock's world rather than as a
  toolbar bolted underneath it
- Whether the flock turning away from that edge reads as intended
- The strip's height, and the dialog's line length

## Consequences

**Positive.**

- **0007 §8's requirement has an owner and a mechanism**, and §1 reduces it to
  nothing rather than working around it.
- **0005 §7 becomes true.** *Always visible* was a claim about a button that
  layout had to make good on, and §2 does. Nothing else could.
- **No script outside the three parts.** §5 keeps 0002 intact at the first point
  where a page would normally grow a fourth concern.
- **The page still loads nothing.** 0003 §2 survives another visible record: no
  image, no font, no second layout, and now no dialog library either.
- **One screen means one thing to watch**, which is the only currency 0012 §5
  deals in for a claim no command settles.

**Negative, and these are real.**

- **The imprint is one press away, and 0003 §7's stated reason argues against
  that.** *A link is a step, and a step is a place to give up.* R1 records why
  this is nonetheless permitted and whose reading that is — but it is a reading,
  and a later session meeting 0003 §7 cold could reach the other one.
- **A visitor who never presses the button never learns what the page is.** 0001
  §4 puts an explanation on the page, and it is now behind a press. Nothing
  compelled anyone to read it before either; this makes not reading it the
  default rather than a choice.
- **The page cannot grow.** §1 means anything added later either goes in the
  dialog or takes space from the flock. That is a constraint on every future
  record, and it arrives without any of them being consulted.
- **§2 makes the canvas's height depend on something the visitor controls.**
  Enlarging text grows the strip, which resizes the frame, and 0007 §6 ties the
  pointer's radius to the frame. 0007 named the window-resize version of this as
  covered by no invariant; this makes it reachable without touching the window.
- **The dialog creates the place where settings would go, before 0015 decides
  whether there are any.** A reader who opens it and finds two sections will
  notice the shape of a third.
- **Nothing here can be run.** Nine sections, no numbers, nothing on a screen —
  the same position 0005, 0006 and 0007 are in.

## Alternatives considered

- **A canvas filling the viewport, with the text below the fold.** Rejected in
  §1: it is precisely the trap 0007 §8 names, and on touch it is not a degraded
  experience but an unreachable imprint.
- **A scrolling page: canvas, then control, then text in normal flow.** This was
  the whole of the previous draft, and it is rejected in §1 and §4. It made the
  canvas's height fight text scaling, and it left `touch-action: none` costing
  something real — a visitor whose finger landed on the canvas could not scroll,
  and the page still had somewhere to scroll to.
- **The imprint on the strip rather than in the dialog.** Rejected by the
  decider — R1. It would have satisfied 0003 §7 by its plainest reading, at the
  cost of a strip several lines tall on the floor device.
- **The strip as an obstacle inside a full-viewport canvas.** Rejected in §3: a
  fourth force in the Core for a picture the frame boundary already produces, and
  dots vanishing under an opaque strip.
- **The strip at the top.** Rejected in R3: the bottom is thumb-reachable on the
  floor device, and it keeps the flock the first thing on the page.
- **A dialog opened by script.** Rejected in §5: it gives the Shell a job 0002 §2
  does not give it, to reimplement what the element already does.
- **Text overlaid on the canvas.** Rejected: reading text over a moving field is
  the failure 0004 §5 exists to prevent, and the overlay would need dismissing,
  which is another control.
- **A fixed fraction of the viewport for the canvas.** Rejected in §2: it fights
  text scaling, and it fails in the shape where the invariant still passes.
- **`100vh`, or `dvh`.** Rejected in §7.
- **Breakpoints, or a container query.** Rejected in §8: available rather than
  needed.

## Resolved questions

The first draft of this record described a scrolling page with the text beneath
the canvas. **The decider replaced its central arrangement**, and R1 is where the
consequence of that lands. Four of the six answers below are confirmations; two
are not.

**R1 — The imprint goes in the dialog, and `<dialog>` is not a link.**

The draft put it on the strip, on the reading that 0003 §7's *a link is a step,
and a step is a place to give up* covers a button as well as a link. Daniel:
*"ich finde ein dialog aufmachen ist kein link und damit noch immer in dieser
regel. außerdem finde ich die regel ein wenig zu extrem und zu streng."*

**The reading is available on the text.** 0003 §7's operative sentence names
links twice — *no link to this repository and no link anywhere else* — and a
dialog on the same page is no navigation at all. Its other four bullets are
untouched: the imprint lives in the repository as page content, appears in
exactly one place, is not confidential, and nothing derived from it is stored.

**The argument against it is the reason rather than the wording**, and it belongs
here rather than in a footnote: a press is a step, and *a step is a place to give
up* is what 0003 §7 gives as its reason. §6 exists because of that argument
rather than in spite of it — a labeled control is the smallest thing that answers
*where would a person look*.

**Nothing legal turns on it.** 0004 records that § 18's *unmittelbar erreichbar*
is satisfied either way, in the alternative it rejected for its own reasons.

**The second half of the answer has a route nobody has taken.** *The rule is a
little too extreme and too strict* is a position about 0003 §7, not about this
record — and 0005 R2 already fixed what to do with one: a record that supersedes
the rule, never a reinterpretation inside a later record. This record reads 0003
§7; it does not narrow it, and 0003 stands as written.

**R2 — The strip carries a play/pause control, and it stays out of the dialog.**

Confirmed by the decider. It is also the only place it could go: 0005 §7 rejects
a control revealed only on focus because that *hides the control from the visitor
who most needs it*, and a button behind a dialog is hidden by the same argument
with an extra press attached.

**R3 — The strip is the frame's boundary, not an obstacle.** Confirmed as
recommended. 0006 §6 turns the flock at a frame edge already, so the picture the
decider described — the flock never going there — costs nothing beyond deciding
where the edge is.

**R4 — The strip is at the bottom.** Confirmed as recommended, replacing the
draft's question about whether the control sat above or below the canvas. The
bottom is thumb-reachable on the device 0001 §3.5 makes the floor, and it leaves
the flock as the first thing on the page. Document order follows the visual
order, so the controls come last for a screen reader as well.

**R5 — A settings surface is not this record's, and it becomes 0015.** Confirmed
as recommended. 0001 R3 left it *for its own record if it ever becomes a real
question*, and §4's dialog is where one would go, which makes it one.

**Two accepted records bound it before it is written.** 0003 §4 stores nothing on
the visitor's device, so no setting survives a reload — 0001 §5 puts anything
remembered between visits out of scope for the same outcome by a different route.
And 0006 §2 makes non-overlap a hard constraint on every world the Core returns,
so a control over the number of dots could drive the simulation into a state an
accepted record calls impossible. Bounds are the substance of that record, not a
detail of it.

**R6 — Whether the flock steps while the dialog is open belongs to 0008.**

The draft asked whether the flock keeps stepping while scrolled off screen, and
recommended that 0008 own it. **§1 dissolved the question and not the answer:** a
page that does not scroll never scrolls the flock away, but a modal dialog covers
it, and the question returns unchanged in substance — work done for nothing on a
device with a battery, which is the shape of a performance budget rather than of
a layout.

0006 §9 supplies the mechanism either way: the Shell stops calling the Core, and
the Core never learns there was a pause. What 0008 decides is whether it is worth
noticing.

## References

- `<dialog>` — Baseline widely available, available 2022-03-14, widely
  2024-09-14; Chrome 37, Edge 79, Firefox 98, Safari 15.4, Safari iOS 15.4.
  <https://api.webstatus.dev/v1/features/dialog>, read 2026-08-02.
- `<details>` — Baseline widely available, available 2020-01-15, widely
  2022-07-15; Chrome 12, Edge 79, Firefox 49, Safari 6, Safari iOS 6.
  <https://api.webstatus.dev/v1/features/details>, read 2026-08-02.
- Small, large, and dynamic viewport units (`svh`, `lvh`, `dvh`) — Baseline
  widely available, available 2022-12-05, widely 2025-06-05; Chrome 108, Edge
  108, Firefox 101, Firefox Android 101, Safari 15.4, Safari iOS 15.4.
  <https://api.webstatus.dev/v1/features/viewport-unit-variants>, read
  2026-08-02.
- Container queries — Baseline widely available, available 2023-02-14, widely
  2025-08-14; Chrome 105, Edge 105, Firefox 110, Safari 16, Safari iOS 16. The
  feature §8 records as considered and unused.
  <https://api.webstatus.dev/v1/features/container-queries>, read 2026-08-02.
- [0003](0003-security-and-privacy-by-design.md) §4, §7 — what may be stored, and
  the imprint rule R1 reads. Read 2026-08-02.
- [0004](0004-compliance-accessibility-and-rights.md) §1, §5, §10 — the imprint
  obligation, the control, and that *leicht erkennbar* is about a person finding
  it. Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §1, §6, §7 — the surface, the
  fonts, and the *always visible* claim this record makes good on. Read
  2026-08-02.
- [0006](0006-motion-rules.md) §1, §2, §6, §8, §9 — the force set, the density
  ceiling R5 names, the frame edge §3 relies on, and the two ways the Core is not
  stepped. Read 2026-08-02.
- [0007](0007-pointer-and-input-model.md) §6, §8 — the radius tied to the frame,
  and the requirement this record exists to own. Read 2026-08-02.
- [Ticket #49](https://github.com/nanatsusaya/dot-panic/issues/49) — the scope
  this record is written against. Read 2026-08-02.

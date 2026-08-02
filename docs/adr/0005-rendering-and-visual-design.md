# 0005 — Rendering and visual design

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#42](https://github.com/nanatsusaya/dot-panic/issues/42)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3 (good enough,
  including the Baseline floor and the floor device), §4 (the page carries a
  flock, an imprint and an explanation) ·
  [0002](0002-overall-architecture.md) §2 (the View is given a world and draws
  it; the Shell owns the size of the frame), §5 (the View invents no motion), §6
  (the imprint and the explanation are outside the application) ·
  [0003](0003-security-and-privacy-by-design.md) §2 (the page loads nothing it
  does not ship), §6 (the policy floor, and the one widening this record may
  make) · [0004](0004-compliance-accessibility-and-rights.md) §5 (a control that
  stops the motion), §10 (the dots are not bound by contrast criteria)
- **Supersedes:** nothing

## Context

This is the first decision whose answer is visible. Everything accepted so far
says what the page may not do; this one says what it looks like.

It is also the record with the most inherited homework, and the inheritance is
explicit rather than implied. [0003](0003-security-and-privacy-by-design.md) §6
permits exactly one widening of the Content-Security-Policy and names this
record as the only one allowed to make it.
[0004](0004-compliance-accessibility-and-rights.md) §5 requires a control that
stops the motion and says *what it looks like is 0005's*. §10 of the same record
releases the dots from WCAG's contrast criteria and says *0005 owns color*.

**Nothing is built.** There is no page, no `view/` directory and no toolchain;
0009 owns creating one. This record decides what the View is written against,
not what it is written in.

## Decision

### 1. The surface is one canvas, drawn in immediate mode

**2D canvas.** Baseline widely available — available since 2015-07-29, widely
as of 2018-01-29.

The argument is architectural rather than about speed.
[0002](0002-overall-architecture.md) §5 requires that the View draw exactly what
the world it was handed contains: no interpolation between two worlds, no
easing, no animation of its own. **An immediate-mode surface has no state that
could disagree with the world.** Each frame is drawn from nothing, so a picture
that is wrong is a world that is wrong.

SVG and DOM elements are both retained trees. The picture persists between
frames and has to be reconciled with the world, and every reconciliation is a
place where the two can come apart — leaving something on screen that the Core
never produced. That gap is the exact thing 0002 §5 exists to close, and it says
why: *if the drawing invents motion, a test over the Core says nothing about the
picture.* Canvas closes it by construction. The alternatives close it by
discipline, and discipline is what this project is trying not to rely on.

**The View therefore keeps nothing between calls.** It is checkable by reading:
no variable in the View survives the call that drew a frame.

### 2. A dot is a filled circle, and all of them are the same

No outline, no shadow, no blur, fully opaque, one radius for every dot.

Each of those buys nothing 0001 §3.1 asks for — *it reads as a flock* is about
collective motion — and each costs per dot, on the device 0001 §3.5 makes the
floor. Opacity is the one worth naming separately: semi-transparent dots make
overlap read as depth, and whether dots overlap at all is 0006's.

**The radius is uniform; the number is not fixed here.** It trades directly
against how many dots there are, which is 0008's. What this record fixes is that
0008 is choosing one number and not a distribution.

### 3. Three colors, defined once, and the View is told them

The page has a surface color, a dot color and a text color. They are defined in
one place, as custom properties in the stylesheet.

**The View receives its colors as arguments** rather than reading them from the
document. It already receives a world under 0002 §2; colors arrive the same way,
from the Shell, which 0002 §2 makes the part that wires the other two. §4 is
then free, because a mode change is a different argument rather than a different
View.

**No value is fixed here, and that is a decision rather than a gap.** 0001 §3.1
puts *it reads as a flock* beyond what any command can decide, and 0012 §5 makes
the View watch-first for the same reason. A palette chosen in a document, before
anything has ever been on a screen, would be settled by writing rather than by
looking — which is the move this project exists to avoid. What this record fixes
is the structure: three roles, one place, passed in. The values are chosen when
there is something to watch, and R1 records that this was asked and answered.

### 4. `prefers-color-scheme` is honored, and it is not a hard requirement

Baseline widely available — available since 2020-01-15, widely as of
2022-07-15, so 0001 §3.4 permits it.

Both modes are first-class. Neither is the design with the other bolted on.

**This is deliberately weaker than
[0004](0004-compliance-accessibility-and-rights.md) §4, and the difference is
not an oversight.** Reduced motion is a health matter, which is why 0004 §4
makes it a condition of every motion change from here on. A color scheme is
comfort. A change that ships in one mode and follows with the other is
acceptable; a change that ships motion without honoring `reduce` is not. Stated
here so a later session does not read one obligation as the other, in either
direction.

### 5. The drawing is sized in device pixels, by a route that is not `devicePixelRatio`

**The requirement:** the dots are crisp on a high-density display. 0001 §3.5
puts the floor on a mid-range phone roughly three years old, which is precisely
the device where a canvas sized in CSS pixels looks soft.

**The obvious mechanism is not available here, and not for want of data.**
`window.devicePixelRatio` is Baseline **limited**. The reason is recorded in the
compatibility data: Safari (from version 3) and Safari iOS (from version 2)
carry it as a *partial implementation*, because `devicePixelRatio` does not
change when the page is zoomed. 0001 §3.4 admits only what has reached Baseline
widely available, so this record does not reach for it — and R2 records why that
is not a judgment call anyone here gets to make.

**The `resolution` media feature is widely available** and expresses the same
fact — Safari 16 and Safari iOS 16, both 2022-09-12, widely as of 2025-03-12.

**The number itself is not this record's to obtain.** 0002 §2 gives the size of
the frame to the Shell. This record fixes the requirement and the constraint on
how it may be met; how the Shell learns the ratio is the Shell's.

### 6. Typography is whatever the visitor already has

0003 §2 forbids the page loading anything it does not ship, and a web font is
something it does not ship. So a system font stack, and no icon font either —
which is why §7's control is labeled with words.

This costs the page a consistent look across platforms. It is worth less here
than one fewer thing to load, on a page whose text is an imprint and a
paragraph.

### 7. The control from 0004 §5 is a visible button, always present

0004 §5 requires a mechanism to pause, stop or hide the motion, operable without
a pointing device, and hands over what it looks like. It is:

- **A real `button` element in the document**, never drawn on the canvas. 0004
  §10 gives the reason that matters: text inside a canvas cannot be read by a
  screen reader, resized, or selected.
- **Always visible.** Not revealed on hover — that fails 0004 §5 outright. And
  not revealed only on focus: that satisfies the wording while hiding the
  control from the visitor who most needs it, who may not know it is there to be
  focused.
- **Labeled with words**, per §6.
- **Carrying a visible focus indicator.** `:focus-visible` is Baseline widely
  available — available since 2022-03-14, widely as of 2024-09-14.

What it does to the flock is 0006's.

### 8. `style-src 'unsafe-inline'` is not needed

0003 §6 permits this record to add it *if the rendering choice turns out to need
it, and must record why*. It does not need it: a canvas and a button are styled
by a stylesheet served from this origin, which `default-src 'self'` already
covers.

**Recorded as a no rather than left silent**, because 0003 §6 asked this record
a question, and a later change should not have to work out whether it was
considered or forgotten.

## Consequences

**Positive.**

- **The View's central rule is enforced by the medium rather than by care.**
  There is no retained picture to drift from the world, so 0002 §5 cannot be
  violated by a reconciliation bug — only by writing motion into the View on
  purpose.
- **The page still loads nothing.** No font, no icon set, no image. 0003 §2
  survives contact with the first visible decision, which is where that kind of
  rule usually breaks.
- **Everything a screen reader needs is document text**, because the only text
  on the page is the imprint, the explanation and one button label.
- **The policy floor stands unwidened.** §8 closes the one door 0003 left ajar.

**Negative.**

- **A canvas is opaque to everything outside it.** No element inspector, no text
  selection, no browser find, no reflow when the visitor zooms. 0001 §3.1
  already says the flock is judged by watching; this extends that to the whole
  drawing surface, including failures that have nothing to do with flocking.
- **A Safari visitor who zooms the page may see a soft canvas.** That is the
  concrete cost of §5's finding, and it lands on exactly the people who zoom in
  order to read. Naming it is not fixing it.
- **Nothing here says what the page looks like.** §3 fixes the structure of
  color and deliberately no value, so the first implementation chooses them
  under 0012 §5's watch-first, with no criterion written down beforehand beyond
  both modes existing. That is the right way round for something only an eye can
  judge, and it still means a reader of this record cannot predict the page.
- **The dot radius is deferred to 0008**, which means 0008 is now deciding
  something visual as well as something numerical.
- **A workaround is carried for a flaw this page never meets.** §5 avoids
  `devicePixelRatio` over zoom behavior nothing here depends on, which leaves a
  less obvious route to a number every canvas needs. R2 takes that cost
  deliberately rather than by not noticing it.

## Alternatives considered

- **SVG.** Rejected because it is a retained tree: the picture persists and must
  be reconciled with the world, which is the failure 0002 §5 exists to prevent.
  Per-element cost on the floor device is the second reason, not the first.
- **DOM elements, one per dot.** Rejected for the same reason as SVG, plus a
  worse one: an element per dot invites CSS transitions, and a transition is the
  View inventing motion, which 0002 §5 forbids outright.
- **Reading the colors inside the View with `getComputedStyle`.** Rejected
  because it puts an environment read into the part of the system that is
  hardest to test — the View is impure and allowed to, but §3 costs nothing and
  keeps it a function of its arguments.
- **Using `devicePixelRatio` anyway, on the grounds that the partial
  implementation concerns zoom rather than density.** Rejected because 0001 §3.4
  is a floor, not a guideline, and this record may not read it down — see R2.
- **Fixing a palette here.** Rejected in §3: the one thing 0001 §3.1 says no
  command can decide should not be decided by a document either.
- **A control revealed on focus only.** Rejected in §7: it passes the letter of
  0004 §5 and fails the person.

## Resolved questions

**R1 — The palette is not fixed here. Only that both modes exist.** The draft
asked which three colors, and recommended a dark surface with light dots.

Daniel: *"das einzige was ich jetzt bestimmen würde, ist dass wir ein hell und
dunkel modus unterstützen, mehr nicht."*

**The question was the wrong shape, not merely premature**, and the reason is
this project's own: 0001 §3.1 puts how the flock reads beyond what any command
can decide, and 0012 §5 makes the View watch-first because of it. A palette
argued into a document before anything has been on a screen is that judgment
made by writing instead of by looking. §3 keeps what 0004 §10 actually handed
over — the structure of color — and leaves the values to the first
implementation, where they can be seen.

**R2 — The second question dissolved on re-reading 0001 §3.4, and was withdrawn
rather than answered.** The draft asked whether §3.4 should be read strictly
when Baseline marks a feature *limited* for a reason that does not affect this
page, and put it to the decider.

It is not the decider's, because it is not open. §3.4 reads: *"Only web features
that reached Baseline widely available may be used."* That names a status, and
`devicePixelRatio` does not have it. There is no second test in the sentence for
a reading to choose between.

**What the draft was really proposing was to loosen 0001**, and that is a
different act with a different route: a record that supersedes §3.4, never a
reinterpretation inside a later record. Nothing here justifies one — the
`resolution` media feature costs a paragraph and settles it.

Recorded rather than deleted, because the case recurs. **Baseline marks a
feature by its worst implementation**, so a feature that is limited for reasons
irrelevant to this page will come up again, and the next session should find the
route already named instead of reopening the question.

## References

- 2D canvas — Baseline widely available, available 2015-07-29, widely
  2018-01-29. <https://api.webstatus.dev/v1/features/canvas-2d>, read
  2026-08-02.
- `prefers-color-scheme` — Baseline widely available, available 2020-01-15,
  widely 2022-07-15.
  <https://api.webstatus.dev/v1/features/prefers-color-scheme>, read 2026-08-02.
- `:focus-visible` — Baseline widely available, available 2022-03-14, widely
  2024-09-14. <https://api.webstatus.dev/v1/features/focus-visible>, read
  2026-08-02.
- `resolution` media feature — Baseline widely available, available 2022-09-12,
  widely 2025-03-12. <https://api.webstatus.dev/v1/features/resolution>, read
  2026-08-02. Safari 16 and Safari iOS 16 per
  <https://bcd.developer.mozilla.org/bcd/api/v0/current/css.at-rules.media.resolution.json>,
  read 2026-08-02.
- `Window.devicePixelRatio` — Baseline limited. Safari 3 and Safari iOS 2 are
  recorded as partial implementations, *"devicePixelRatio does not change when
  the page is zoomed"*.
  <https://bcd.developer.mozilla.org/bcd/api/v0/current/api.Window.devicePixelRatio.json>
  and <https://api.webstatus.dev/v1/features/devicepixelratio>, both read
  2026-08-02.

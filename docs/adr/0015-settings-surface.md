# 0015 — Settings surface

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#53](https://github.com/nanatsusaya/dot-panic/issues/53)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §4 (what the page
  contains), §5 (nothing remembered between visits), §6 (failure, ranked), R3 (a
  settings surface was left to its own record) ·
  [0002](0002-overall-architecture.md) §2 (the Shell's jobs, enumerated), §5 (no
  domain logic outside the Core), §6 and A1 (the one call, and what it cost) ·
  [0003](0003-security-and-privacy-by-design.md) §4 (nothing is stored on the
  visitor's device) ·
  [0004](0004-compliance-accessibility-and-rights.md) §4
  (`prefers-reduced-motion` is a hard requirement), §5 (the control that stops the
  motion, and what it says about R3) ·
  [0005](0005-rendering-and-visual-design.md) §3 (three colors, defined once), §4
  (`prefers-color-scheme` is honored), §7 (the control is a visible button) ·
  [0006](0006-motion-rules.md) §2 (non-overlap is a hard constraint), §8 (under
  `reduce` the world does not advance) · [0008](0008-performance-budget.md) §5
  (the dot count does not change during a visit), §6 (the packing ratio), §10 (no
  step while the dialog is open) ·
  [0012](0012-how-software-gets-developed.md) §5 (watch-first where no command can
  decide) · [0014](0014-page-layout.md) §2 (the strip holds two controls and
  nothing else), §4 (the dialog), §5 (nothing else on the page is toggled by
  script)
- **Supersedes:** nothing

## Context

[0001](0001-purpose-scope-and-success.md) R3 removed a settings surface from the
out-of-scope list rather than deciding it, because ruling it out there was
*"settling a question nothing had raised, at a point when no record existed to
reason from."* It was left for its own record **if it ever becomes a real
question.**

[0014](0014-page-layout.md) §4 made it one. The page now has a dialog with
collapsible sections, and that is where settings would go. 0014's own
*Consequences* names the pressure: a reader who opens it and finds two sections
notices the shape of a third.

**Five accepted records already constrain this, and between them they leave less
room than the question suggests.** Nothing may be stored (0003 §4, and 0001 §5
independently). The dot count may not change during a visit (0008 §5). Non-overlap
is a hard constraint on every world (0006 §2). The Shell's jobs are enumerated
(0002 §2). And the flock stops while the dialog is open (0008 §10), which is where
any control would sit.

**What is not open here.** The control from
[0004](0004-compliance-accessibility-and-rights.md) §5 is not a setting and this
record does not govern it: it is a legal obligation, 0005 §7 fixes its shape, 0014
§2 fixes its place, and 0006 §8 and §9 fix what it does. 0004 §5 says so about
this very question — *"This is the question 0001 R3 left open … and it is answered
by an obligation rather than by anyone wanting one."* A setting, for this record,
is something narrower: **a control on the page that changes a value or a rule an
accepted record fixes, and that exists because it was wanted.**

What the values would be is not open either. 0006 fixes relations and no numbers,
0008 §5 and §6 fix the count as one number against a ratio, and 0008 R1 puts every
number in the code and in the ticket that fixed the criteria. This record decides
what may be exposed and what bounds it.

**Repository state at the time of writing.** No code, no page, no toolchain. Ten
records accepted, four of them carrying an amendment. Nothing here has been on a
screen.

## Decision

### 1. A preference the platform already carries is read there, and no control duplicates it

Two of the settings a visitor might want, they already have. `prefers-reduced-motion`
is a hard requirement of every motion change under 0004 §4, and `prefers-color-scheme`
is honored under 0005 §4. **The page adds no control for either.**

A page control that disagrees with the platform is a second authority for one
fact, and the visitor who set the platform preference is the one it would
misinform. Where a preference exists in the browser or the operating system, this
project reads it there.

**This is not the same as 0004 §5's control**, and the difference is the reason
that record gives: a browser setting is not a mechanism on the page, most visitors
have never set one, and **both are required, for different people.** That argument
is about an obligation. It does not extend to a preference nobody is obliged to
offer.

### 2. The dot count is not exposable, and this record is not what closes it

[0008](0008-performance-budget.md) §5 fixes that the count **is chosen before the
loop starts and does not change during a visit.** It is an argument to the world,
alongside the seed. A count that varies during a visit is a second world, and that
record names it as the thing a later session will want to relax first.

**So the most obvious setting was closed before this record was written**, and a
control over the count needs a record superseding 0008 rather than an answer here.
Stated plainly because *the slider that changes how many dots there are* is what
the phrase *settings surface* will suggest to everyone who reads it.

### 3. Any setting costs an amendment to an accepted record, and this record grants none

[0002](0002-overall-architecture.md) §2 lists the Shell's jobs: the loop, the
clock, input events, the size of the frame, the choice of seed, the wiring, and
the one call §6 permits. **Reading a control and handing its value to the Core is
not on that list.** Neither is changing what the View is told, which 0005 §3 gives
it once.

The precedent is this project's most recent amendment, and it is exact.
[0014](0014-page-layout.md) §5 needed the Shell to make a single `showModal()`
call, and it cost an authorized amendment to 0002 — written as one named call
rather than as *the Shell may own page chrome*, **because the second is a category
and the first is a thing a command can count.** A settings surface is that
category. It gets the same instrument or none: **an amendment naming what the
Shell may read and hand over, bounded the same way.**

Anything that changes the page's appearance rather than the world costs a second
one. 0014 §5 holds that **nothing else on the page is opened, closed or toggled by
script**, and 0014 §9 makes it an invariant a reader decides from the source.

This record does not grant either amendment. Authorizing one is the decider's, and
O1 is where it is asked.

### 4. No control may offer a value that makes an accepted record false

The range is part of the Core's contract, not a property of the widget.

[0006](0006-motion-rules.md) §2 makes non-overlap a hard constraint on **every**
world the Core returns, and says outright that this constrains 0008 and cannot be
negotiated. [0008](0008-performance-budget.md) §6 gives it a form: with `n` dots of
relative radius `r` in a frame of area `A`, the constraint is unsatisfiable unless
`n·πr²` is below `A`, and unsatisfiable with room to move well below it.

**A control whose range includes a value the Core cannot satisfy is a defect, not
a setting.** Checkable without a browser: each endpoint of an exposed range is a
value that leaves every invariant in 0006 §10 satisfiable.

### 5. A setting lasts one visit, and no URL carries one

0003 §4 stores nothing on the visitor's device, and 0001 §5 puts *anything
remembered between visits* out of scope by a different route to the same outcome.
Every visit therefore starts from the same values, and a control is a thing the
visitor does to this visit.

**A query string is closed as well**, and it is worth naming because it is the
loophole a later session finds: it stores nothing on the device, so 0003 §4's
mechanism list does not reach it, but a bookmarked URL is remembered between
visits and 0001 §5 names the outcome rather than the mechanism. 0003 §4 already
lists `history.pushState` *used to carry state* for the same reason.

**This is a reading of 0001 §5, and the other one is available**: a link is not the
visitor's device, and 0003 §4 is a device list. It is recorded here so that a later
change meets an answer rather than a gap.

### 6. No control whose value can only be chosen by watching

[0008](0008-performance-budget.md) §10 stops the flock while the dialog is open,
and [0014](0014-page-layout.md) §2 gives the strip exactly two controls and nothing
else. Every setting therefore sits inside the dialog, **which is open exactly when
the flock is not moving.**

So a value is chosen against a still picture, and its effect appears when the
dialog closes. Comparing two values costs a stop each time. **A slider dragged
while watching the flock respond is not available here**, and it is the natural
design for every value this record could expose — 0001 §3.1 makes *it reads as a
flock* something only watching decides, so the one feedback loop a settings
surface exists to provide is the one the layout forbids.

What survives is a control whose value is meaningful before it is seen: a small
number of named choices, judged after the dialog closes. **A control that needs
live feedback needs the strip**, which is an amendment to 0014 §2 on top of §3's.

### 7. What is asserted, and what is only ever watched

The same division 0006 §10, 0007 §9, 0014 §9 and 0008 §9 make.

**Decidable by reading the page's source, with no browser:**

| | Invariant |
|---|---|
| §1 | No control on the page sets a color mode or a motion preference |
| §2 | No control on the page changes the dot count |
| §3 | The Shell reads no control except the one 0014 §5 permits, unless an amendment names it |
| §5 | Nothing on the page reads or writes a query string |

**Decidable by a test over the Core**, wherever a range is exposed:

| | Invariant |
|---|---|
| §4 | Each endpoint of an exposed range leaves every 0006 §10 invariant satisfiable |

**Only watching decides this**, under 0012 §5:

- Whether a control whose effect appears only after the dialog closes reads as a
  setting at all, rather than as a control that did nothing

## Consequences

**Positive.**

- **0001 R3 is answered in the record the index made for it.** The condition R3
  named — *if it ever becomes a real question* — occurred, and it is answered
  rather than deferred a second time.
- **The price is named once.** Any later setting knows what it costs before anyone
  designs one, and §3 names the instrument rather than leaving it to be invented.
- **Bounds are a Core contract.** §4 turns *what range should the slider have* from
  a UI question into an invariant a test decides.
- **The boundary 0002 A1 moved by one call stays moved by one call.** No part gains
  a job here.
- **The visitor's own settings keep working.** §1 leaves `prefers-reduced-motion`
  and `prefers-color-scheme` as the settings surface the page already obeys.

**Negative, and these are real.**

- **This record raises the price of a setting without paying it.** If O1 is
  answered *yes*, the first one costs an amendment to 0002 and possibly to 0014,
  and this record is what made that explicit rather than something anyone could
  have done quietly.
- **§6 forecloses the natural design for a reason nobody wrote with settings in
  mind.** 0008 §10 was decided as a performance and accessibility question earlier
  the same day, and it now shapes an area it never mentioned.
- **§5's second half is a reading**, and a later session meeting 0001 §5 cold could
  reach the other one. The record says so rather than hiding it, which is the most
  that can be done about it.
- **The page's two controls are both ones nobody chose.** Both arrived as
  obligations. A visitor who wants to change the toy is told by §1 to change their
  operating system, and by §2 that the interesting number is fixed.
- **A record that mostly says what may not happen is easy to read as pessimism.**
  Every no here traces to a record that was accepted for its own reasons, and none
  of them was written to prevent settings — which is exactly why the pile is worth
  writing down in one place.
- **Nothing here can be run.** The same position 0005, 0006, 0007, 0014 and 0008
  are in.

## Alternatives considered

- **A slider for the dot count.** Rejected in §2: 0008 §5 closed it before this
  record existed, and reopening it needs a record superseding 0008.
- **A slider for anything else, dragged while watching.** Rejected in §6: the flock
  does not move while the dialog is open, and the strip has no room for a third
  control.
- **A dark-mode toggle on the page.** Rejected in §1: 0005 §4 already honors
  `prefers-color-scheme`, and a page control that disagrees with the platform is a
  second authority for one fact.
- **A control that reseeds the world.** Rejected: it changes no value a record
  fixes, so it is a restart rather than a setting — and it fails §6 anyway, because
  a new world appears only once the dialog closes and there is nothing to compare
  it against.
- **Settings carried in a query string.** Rejected in §5: it evades 0003 §4's
  mechanism list and lands on 0001 §5's outcome.
- **Deferring the question again.** Rejected: deferring is what 0001 R3 did, and it
  named the condition under which that stops being available. 0014 §4 met it.
- **A settings surface decided here and built later.** Rejected: §3's amendment is
  the decider's to authorize, and a record that assumed it would be deciding
  something that is not its own — which the record shape forbids in those words.

## Open questions

**O1 — Are there any settings at all?**

Recommended default: **no.** Five things point the same way, and none of them is a
preference about settings:

- §3 — the first one costs an amendment to an accepted record.
- §6 — it cannot be tuned by watching, and watching is what 0001 §3.1 makes the
  judge of the only thing this toy is trying to be.
- §5 — it is forgotten on reload, so it is a per-visit gesture rather than a
  preference.
- §2 — the value everyone would reach for first is already closed.
- 0001 §6.2 ranks *the toy is never finished because the process ate the work* as
  the second-worst outcome, and a settings surface is the increment that adds a
  control, a bound, an invariant, a thing to watch and two amendments.

Against it, honestly: it is a toy, turning a knob is how a visitor finds out what
makes the dots read as a flock, and this project is a worked example where one more
increment has value beyond the product.

**O2 — If yes, which one, and is it exactly one?**

Recommended default, conditional on O1: **one control, offering a small number of
named choices rather than a continuous range.** §6 is why — a discrete choice can
be meaningful before it is seen, and a range cannot. Which value it governs is then
a second question, and §2 removes the count from the candidates.

**O3 — If no, is the question closed here or added to 0001 §5?**

Recommended default: **closed here.** This record becomes the authority, and
reopening takes a record superseding it — the ordinary route, the one 0005 R2 fixed
for exactly this shape. Adding a line to 0001 §5 would need a record superseding
0001, which is a heavy instrument for a question that already has its own row in
the index.

## References

- [0001](0001-purpose-scope-and-success.md) §3.1, §4, §5, §6, R3 — what watching
  decides, what the page contains, what is out of scope, the ranked failures, and
  the question this record was left. Read 2026-08-02.
- [0002](0002-overall-architecture.md) §2, §5, §6, A1 — the Shell's enumerated
  jobs, no domain logic outside the Core, and the one call, with what authorizing
  it cost. Read 2026-08-02.
- [0003](0003-security-and-privacy-by-design.md) §4 — the mechanism list §5 reads,
  including `history.pushState`. Read 2026-08-02.
- [0004](0004-compliance-accessibility-and-rights.md) §4, §5 — the reduced-motion
  requirement, and the control whose record says what it settles about 0001 R3.
  Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §3, §4, §7 — the colors the View is
  told, `prefers-color-scheme`, and the shape of the control that is not a setting.
  Read 2026-08-02.
- [0006](0006-motion-rules.md) §2, §8, §9, §10 — the constraint §4 bounds against,
  the two ways the Core is not stepped, and the invariant list §7 refers to. Read
  2026-08-02.
- [0007](0007-pointer-and-input-model.md) §9 — one of the four asserted-and-watched
  divisions §7 follows. Nothing here depends on it. Read 2026-08-02.
- [0008](0008-performance-budget.md) §5, §6, §10, R1 — the count fixed for a visit,
  the packing ratio, the dialog stopping the steps, and where numbers live. Read
  2026-08-02.
- [0014](0014-page-layout.md) §2, §4, §5, §9 — the strip's two controls, the dialog
  this record's surface would sit in, and the sentence §3 relies on. Read
  2026-08-02.
- [Ticket #53](https://github.com/nanatsusaya/dot-panic/issues/53) — the scope this
  record is written against. Read 2026-08-02.

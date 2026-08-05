# 0015 — Settings surface

- **Status:** Accepted
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
- **Amended:** 2026-08-05 — A1

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
what may be exposed, what bounds it, and — R1 — that nothing is.

**Repository state at the time of writing.** No code, no page, no toolchain. Ten
records accepted, four of them carrying an amendment. Nothing here has been on a
screen.

## Decision

### 1. The page has no settings surface

**Nothing on the page changes a value or a rule an accepted record fixes.** The
page carries two controls and no third: 0004 §5's, which stops the motion, and
0014 §2's, which opens the dialog. Both are obligations. Neither is a setting, and
none is added.

The dialog's third section stays empty. That is the pressure 0014 named, and this
is the answer to it rather than an oversight.

**§2 through §7 are why**, and each of them was already true before this section
was written: the value everyone reaches for first is closed by another record, the
first control costs an amendment, a range is a contract rather than a widget
property, nothing survives a reload, and no control here can be adjusted by
watching. [0001](0001-purpose-scope-and-success.md) §6.2 ranks *the toy is never
finished because the process ate the work* as the second-worst outcome, and a
settings surface is the increment that adds a control, a bound, an invariant, a
thing to watch and two amendments.

**This is a no for now, not a no forever**, and R1 records the decider's words for
it. The route to a later yes is a record superseding this one — R3 — and **§2
through §7 are its terms.** They are written as conditions rather than as reasons
so that the record which reopens this starts from a price list instead of a blank
page.

### 2. A preference the platform already carries is read there, and no control duplicates it

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

### 3. The dot count is not exposable, and this record is not what closes it

[0008](0008-performance-budget.md) §5 fixes that the count **is chosen before the
loop starts and does not change during a visit.** It is an argument to the world,
alongside the seed. A count that varies during a visit is a second world, and that
record names it as the thing a later session will want to relax first.

**So the most obvious setting was closed before this record was written**, and a
control over the count needs a record superseding 0008 rather than an answer here.
Stated plainly because *the slider that changes how many dots there are* is what
the phrase *settings surface* will suggest to everyone who reads it.

### 4. Any setting costs an amendment to an accepted record, and this record grants none

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

This record grants neither amendment, and §1 is why there is nothing to grant one
for.

### 5. No control may offer a value that makes an accepted record false

The range is part of the Core's contract, not a property of the widget.

[0006](0006-motion-rules.md) §2 makes non-overlap a hard constraint on **every**
world the Core returns, and says outright that this constrains 0008 and cannot be
negotiated. [0008](0008-performance-budget.md) §6 gives it a form: with `n` dots of
relative radius `r` in a frame of area `A`, the constraint is unsatisfiable unless
`n·πr²` is below `A`, and unsatisfiable with room to move well below it.

**A control whose range includes a value the Core cannot satisfy is a defect, not
a setting.** Checkable without a browser: each endpoint of an exposed range is a
value that leaves every invariant in 0006 §10 satisfiable.

Under §1 no range is exposed, so this binds the record that reopens the question
rather than this page.

### 6. A setting lasts one visit, and no URL carries one

0003 §4 stores nothing on the visitor's device, and 0001 §5 puts *anything
remembered between visits* out of scope by a different route to the same outcome.
Every visit therefore starts from the same values, and a control would be a thing
the visitor does to this visit.

**A query string is closed as well**, and it is worth naming because it is the
loophole a later session finds: it stores nothing on the device, so 0003 §4's
mechanism list does not reach it, but a bookmarked URL is remembered between
visits and 0001 §5 names the outcome rather than the mechanism. 0003 §4 already
lists `history.pushState` *used to carry state* for the same reason.

**This is a reading of 0001 §5, and the other one is available**: a link is not the
visitor's device, and 0003 §4 is a device list. It is recorded here so that a later
change meets an answer rather than a gap.

**This half of the record survives §1.** The page reads no query string whether or
not it has settings, and that is an invariant now rather than a term of a later
yes.

### 7. No control whose value can only be chosen by watching

[0008](0008-performance-budget.md) §10 stops the flock while the dialog is open,
and [0014](0014-page-layout.md) §2 gives the strip exactly two controls and nothing
else. Every setting would therefore sit inside the dialog, **which is open exactly
when the flock is not moving.**

So a value would be chosen against a still picture, and its effect would appear
when the dialog closes. Comparing two values costs a stop each time. **A slider
dragged while watching the flock respond is not available here**, and it is the
natural design for every value this record could have exposed — 0001 §3.1 makes
*it reads as a flock* something only watching decides, so the one feedback loop a
settings surface exists to provide is the one the layout forbids.

What would survive is a control whose value is meaningful before it is seen: a
small number of named choices, judged after the dialog closes. **A control that
needs live feedback needs the strip**, which is an amendment to 0014 §2 on top of
§4's.

### 8. What is asserted, and what is only ever watched

The same division 0006 §10, 0007 §9, 0014 §9 and 0008 §9 make.

**Decidable by reading the page's source, with no browser:**

| | Invariant |
|---|---|
| §1 | The strip [0014](0014-page-layout.md) §2 fixes contains exactly two controls, 0004 §5's and 0014 §2's, and no element anywhere on the page changes what the Core or the View is given |
| §4 | The Shell reads no control's value and hands nothing from one to the Core or the View |
| §6 | Nothing on the page reads or writes a query string |

§2's and §3's noes are specific cases of §1's and get no row of their own, because
one invariant that a reviewer reads once is worth more than three that overlap.

**Decidable by a test over the Core**, and binding only on a record that reopens
this one:

| | Invariant |
|---|---|
| §5 | Each endpoint of an exposed range leaves every 0006 §10 invariant satisfiable |

**Only watching decides this**, under 0012 §5:

- Whether the dialog's two sections read as complete, or as a page missing the
  third one 0014 predicted a reader would notice

## Consequences

**Positive.**

- **0001 R3 is answered in the record the index made for it.** The condition R3
  named — *if it ever becomes a real question* — occurred, and it is answered
  rather than deferred a second time.
- **Nothing on the page exists because someone wanted a knob.** Both controls are
  obligations, which makes the page's surface exactly 0001 §4's three things plus
  what the law and WCAG require.
- **A later yes starts from a price list.** §4 through §7 are written as terms
  rather than as reasons, so the record that reopens this has conditions to satisfy
  instead of a blank page.
- **Bounds are a Core contract.** §5 turns *what range should the slider have* from
  a UI question into an invariant a test decides, whenever it arrives.
- **The boundary 0002 A1 moved by one call stays moved by one call.** No part gains
  a job here.
- **The visitor's own settings keep working.** §2 leaves `prefers-reduced-motion`
  and `prefers-color-scheme` as the settings surface the page already obeys.

**Negative, and these are real.**

- **The dialog's third section stays empty and nothing on the page says why.** 0014
  predicted a reader would notice its shape, and this record decides the reader is
  right and gets no explanation. The same shape as 0007 R2's parked cursor:
  correct, and indistinguishable from unfinished.
- **§7 forecloses the natural design for a reason nobody wrote with settings in
  mind.** 0008 §10 was decided as a performance and accessibility question earlier
  the same day, and it now shapes an area it never mentioned.
- **§6's second half is a reading**, and a later session meeting 0001 §5 cold could
  reach the other one. The record says so rather than hiding it, which is the most
  that can be done about it.
- **A visitor who wants to change the toy is told by §2 to change their operating
  system, and by §3 that the interesting number is fixed.** Neither is a good
  answer to give someone; they are the true ones.
- **A record that mostly says what may not happen is easy to read as pessimism.**
  Every no here traces to a record that was accepted for its own reasons, and none
  of them was written to prevent settings — which is exactly why the pile is worth
  writing down in one place.
- **Nothing here can be run.** The same position 0005, 0006, 0007, 0014 and 0008
  are in.

## Alternatives considered

- **One control, offering a small number of named choices.** Not rejected on its
  merits — R1 answered the prior question and R2 never reached this one. It remains
  the shape §7 would permit if the question is reopened.
- **A slider for the dot count.** Rejected in §3: 0008 §5 closed it before this
  record existed, and reopening it needs a record superseding 0008.
- **A slider for anything else, dragged while watching.** Rejected in §7: the flock
  does not move while the dialog is open, and the strip has no room for a third
  control.
- **A dark-mode toggle on the page.** Rejected in §2: 0005 §4 already honors
  `prefers-color-scheme`, and a page control that disagrees with the platform is a
  second authority for one fact.
- **A control that reseeds the world.** Rejected: it changes no value a record
  fixes, so it is a restart rather than a setting — and it fails §7 anyway, because
  a new world appears only once the dialog closes and there is nothing to compare
  it against.
- **Settings carried in a query string.** Rejected in §6: it evades 0003 §4's
  mechanism list and lands on 0001 §5's outcome.
- **Deferring the question again.** Rejected: deferring is what 0001 R3 did, and it
  named the condition under which that stops being available. 0014 §4 met it.
- **Adding *no settings* to 0001 §5's out-of-scope list.** Rejected in R3: that list
  requires superseding 0001 to change, which would price the later addition the
  decider left open against the project's founding record.

## Resolved questions

**R1 — There are no settings, and that is a decision rather than a deferral.**

Decided as recommended. Daniel: *"wir machen keine einstellungen. wenn überhaupt
könnten wir die später hinzufügen."*

**The second sentence is what §1's last paragraph is built on.** A no that stays
open to a later yes is not the same artifact as a no that closes the topic: it
means the reasons have to be written as **conditions** — something a later record
can satisfy or fail — rather than as an argument nobody can act on. §4 through §7
were drafted before the answer and needed no rewriting for it, which is the sign
they were the right sections.

**What the answer does not rest on.** None of the five reasons in §1 is a
preference about settings. Each is an accepted record that was written for its own
purpose and happens to constrain this one — which is why the record states them as
a pile in one place rather than arguing from taste.

**R2 — Which setting, and how many: not reached.**

This question was asked conditionally — *if yes, which one* — and R1 answered *no*,
so it lapses. It is recorded rather than deleted because its recommended default
still binds a later record: **a small number of named choices rather
than a continuous range**, for §7's reason — a discrete choice can be meaningful
before it is seen, and a range cannot. A record that reopens this starts there.

**R3 — The question is closed here, not added to 0001 §5.**

Confirmed as recommended, and R1's second sentence is what makes it the only
sensible instrument rather than merely the lighter one. 0001 §5 states that adding
to it *"requires superseding this record rather than extending it"* — so putting
settings on that list would price the *später* the decider left open against
0001, the record everything else in the project rests on.

Closed here, the same *später* costs a record superseding **this** one, which is
the ordinary route and the one 0005 R2 fixed for exactly this shape. The index row
for 0015 is what a later session finds; nothing is hidden by the lighter
instrument.

## Amendments

**A1 — two rows in §8 promised what no command could decide. 2026-08-05.**

§8's first table read:

> | §1 | The page contains exactly two controls — 0004 §5's and 0014 §2's — and no other element changes what the Core or the View is given |
> | §4 | The Shell reads no control's value, and makes no call except 0014 §5's `showModal()` |

**Nothing this record decides changes.** There is still no settings surface, §6's
query-string invariant stands, and §2 through §7 are the same price list. What
moves is two claims about what a reader can decide from the source.

**The §4 row was false, and it was also a copy.** The Shell runs the loop
([0002](0002-overall-architecture.md) §2), calls `requestAnimationFrame`
([0008](0008-performance-budget.md) §2) and listens for four pointer events
([0007](0007-pointer-and-input-model.md) §1) — so *makes no call except* was
contradicted by three accepted records the day it was written. That half was also
[0014](0014-page-layout.md) §9's row already, in the form that is actually true:
*the Shell contains exactly one `showModal()` call, and nothing else on the page
is opened, closed or toggled by script.* It is dropped here rather than repaired,
because two authorities for one fact is what C2 forbids and 0014 owns page
chrome. What remains is what §4 decides.

**The §1 row was not false but was unusable as a count.** §1's prose means
controls that change something, and nothing in the dialog does. A reviewer
applying the row literally counts `<details>` sections and the close button
0014 §5 puts inside a `<form method="dialog">`, and fails the page on first read.
The count is now anchored to the strip, which is where 0014 §2 already put
it — *the strip holds two things and nothing else* — and the half that reaches
the whole page keeps reaching it, because it is about changing what the Core or
the View is given rather than about being a control.

**Anchored rather than defined**, and that was a choice. Defining *control* in
this record would put a term in the record that uses it instead of the record
that owns the page's elements. 0014 §2 already carries the count.

**One thing was checked and needed no change.** §4's argument leans on
[0002](0002-overall-architecture.md) §2's list of the Shell's jobs being
exhaustive, and [0005](0005-rendering-and-visual-design.md) §3 has the Shell hand
the View three colors — a job the list does not name. It is not an exception:
0005 §3 already reads it as wiring, in the record's own words, *from the Shell,
which 0002 §2 makes the part that wires the other two*. And §4 says *changing*
what the View is told, not handing it. So no amendment to 0002's list is
authorized here and none is needed; this paragraph exists because the question
was asked and the answer would otherwise have to be worked out again.

**The prose of §1 and §4 is untouched.** They said what they meant; the rows
turned one of them into a number and the other into a superset.

Authorized by Daniel on 2026-08-05, against
[#125](https://github.com/nanatsusaya/dot-panic/issues/125), on a recommendation
of anchoring the count to 0014 §2 rather than defining *control* here, of
dropping the duplicated half rather than repairing it, and of the colors sitting
inside *wiring*: *"wir folgen deiner empfehlung bei beiden."*

## References

- [0001](0001-purpose-scope-and-success.md) §3.1, §4, §5, §6, R3 — what watching
  decides, what the page contains, what is out of scope and what changing that list
  costs, the ranked failures, and the question this record was left. Read
  2026-08-02.
- [0002](0002-overall-architecture.md) §2, §5, §6, A1 — the Shell's enumerated
  jobs, no domain logic outside the Core, and the one call, with what authorizing
  it cost. Read 2026-08-02.
- [0003](0003-security-and-privacy-by-design.md) §4 — the mechanism list §6 reads,
  including `history.pushState`. Read 2026-08-02.
- [0004](0004-compliance-accessibility-and-rights.md) §4, §5 — the reduced-motion
  requirement, and the control whose record says what it settles about 0001 R3.
  Read 2026-08-02.
- [0005](0005-rendering-and-visual-design.md) §3, §4, §7 — the colors the View is
  told, `prefers-color-scheme`, and the shape of the control that is not a setting.
  Read 2026-08-02.
- [0006](0006-motion-rules.md) §2, §8, §9, §10 — the constraint §5 bounds against,
  the two ways the Core is not stepped, and the invariant list §8 refers to. Read
  2026-08-02.
- [0007](0007-pointer-and-input-model.md) §9 — one of the four asserted-and-watched
  divisions §8 follows. Nothing here depends on it. Read 2026-08-02.
- [0008](0008-performance-budget.md) §5, §6, §10, R1 — the count fixed for a visit,
  the packing ratio, the dialog stopping the steps, and where numbers live. Read
  2026-08-02.
- [0014](0014-page-layout.md) §2, §4, §5, §9 — the strip's two controls, the dialog
  this record's surface would have sat in, and the sentence §4 relies on. Read
  2026-08-02.
- [Ticket #53](https://github.com/nanatsusaya/dot-panic/issues/53) — the scope this
  record is written against. Read 2026-08-02.

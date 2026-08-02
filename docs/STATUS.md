# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-02.*

## Position

The method has been adopted. **Nothing of the toy exists yet** — no simulation
code, no page, no rendering. Everything built so far is the way of working:
the operating rules, the decision set, nine accepted records, and the five
session procedures in [`.claude/skills/`](../.claude/skills/README.md).

The procedures have now been used. `/moin`, `/weiterimtext` and `/adr` all ran
on 2026-08-02 and behaved as their files describe. `/feierabend` and `/passtdas`
have still never been invoked.

**The architecture is decided and none of it is built.**
[0002](adr/0002-overall-architecture.md) fixes a functional core inside an
imperative shell, three parts, and the directory layout that goes with them —
but `core/`, `shell/` and `view/` do not exist, and creating them is work that
needs a ticket, not a side effect of reading the record. There is still **no
toolchain at all**: no runtime, no test runner, no package manifest. That is
decision 0009.

**How the work gets built is decided as well, and nothing has been built under
it.** [0012](adr/0012-how-software-gets-developed.md) fixes an analysis phase
with no end condition, then increments; test-first in the Core without
exception; watch-first in the View, where no command can decide; and at most
three changes open for review at once.

**What the page may never do is decided.**
[0003](adr/0003-security-and-privacy-by-design.md) forbids loading anything off
its own origin, running any third-party code, storing anything on the visitor's
device, and making any network request after the page has loaded — and gives the
browser a copy of all three as a Content-Security-Policy. Nothing about a
visitor is recorded anywhere, and there is no mechanism left by which it could
be.

**What the law asks of it is decided, and the register that settles it is
written.** [0004](adr/0004-compliance-accessibility-and-rights.md) makes
`prefers-reduced-motion` a hard requirement of every motion change from here on,
puts a control on the page that stops the motion, fixes MIT across the whole
repository, records that the flocking model is reimplemented rather than copied,
and rules out a consent banner. Its §13 reads twenty-two instruments —
fourteen European, eight German — each at the provision its verdict rests on.
Two of them put anything here: § 18 MStV and § 69a UrhG.

**The imprint is the one thing 0004 decided and could not finish.** Its address
is a placeholder, chosen to be unmistakably fake, and 0004 R2 makes a real one a
precondition of publishing — a constraint 0011 inherits. **Nothing checks it.**
There is no build to fail and no command to run; a person remembering is the
whole of that gate, which is worth knowing rather than discovering later.

**What it looks like on screen is decided, and what color it is deliberately is
not.** [0005](adr/0005-rendering-and-visual-design.md) puts everything that moves
on one canvas drawn in immediate mode, makes a dot a plain filled circle, honors
`prefers-color-scheme` — explicitly weaker than 0004 §4, because a color mode is
comfort and reduced motion is health — and gives 0004 §5's control a shape: a
real button, always visible, labeled with words. It leaves the
Content-Security-Policy alone, which 0003 §6 had permitted it to widen. **No
color value is fixed**, and R1 says why: 0001 §3.1 and 0012 §5 put *it reads as a
flock* beyond what any document can settle, so a palette argued onto a page
before anything has been on a screen would be decided by writing rather than by
looking.

**`devicePixelRatio` is not Baseline widely available**, so 0005 §5 sizes the
drawing through the `resolution` media feature, which is. Safari has shipped
`devicePixelRatio` since version 3, but as a partial implementation — it does not
change when the page is zoomed — and Baseline does not count partials. R2 records
that this is not a reading of [0001](adr/0001-purpose-scope-and-success.md) §3.4
but the plain text of it: the sentence names a status, and loosening that floor
would need a record superseding 0001 rather than an argument about what it meant.

**How the dots move is decided.** [0006](adr/0006-motion-rules.md) takes
Reynolds' three steering behaviors as the base and drops his angular
neighborhood deliberately, makes non-overlap a hard constraint on the world a
step returns rather than a steering force among the others, puts every dot's
speed in a band whose floor is above zero, and bounds how far a velocity may
change in one step. Under `prefers-reduced-motion` the page shows one frame and
0004 §5's control starts the flock rather than stopping it. Its §10 names which
of its own claims a command decides — six invariants — and which only an eye can.

**Two of its rules are derived rather than chosen**, which is what to know before
touching them. A wall at the frame edge reverses a velocity by `2v` in one step
and therefore cannot coexist with a bound on acceleration, so the edge is a
turning force because nothing else is left. And pausing needs no concept in the
Core: the Shell stops calling it, which is exactly what reduced motion does, so
the two are one mechanism. **No number is fixed here either**, and one relation
runs the unusual way — dots that cannot be packed into the frame without
overlapping make §2 unsatisfiable, so 0008 inherits a ceiling it cannot
negotiate.

**The one interaction the toy has is decided.**
[0007](adr/0007-pointer-and-input-model.md) puts mouse and finger on one code
path — Pointer Events, not two sets of listeners — and has the Shell hand the
Core a raw fact: a position, or the fact that there is no pointer. Everything
derived from it, including the decay after a touch ends, is the Core's and lives
in the world. The flock reacts to where the pointer is rather than to how it
moves; the force falls to exactly zero at a finite radius, which is a fraction of
the frame's shorter side; and it is a force throughout, never a rule about where
a dot may be. Containment needed no new rule, because 0006's caps hold whatever
the forces are.

**Its §8 asked for something no record owned**, and that is what added
[0014](adr/0014-page-layout.md) to the set. `touch-action: none` is required or
touch does not work at all, and the cost is that a canvas filling the viewport
traps a touch visitor away from the imprint. 0014 now owns that requirement, and
dissolved it rather than working around it. **The record's own most likely bug
report is in R2:** a parked cursor pushes forever, so a visitor who leaves the
mouse still comes back to a permanent hole in the flock, and nothing on the page
explains that it is intended.

**How the page is arranged is decided.**
[0014](adr/0014-page-layout.md) makes the document exactly as tall as the
viewport at every size, so nothing is ever below a fold and 0007 §8 costs
nothing — `touch-action: none` takes away a capability nothing was using. A strip
at the bottom carries 0004 §5's control and a second button that opens a dialog
holding the explanation and the imprint; everything above it is canvas, and the
dialog scrolls where the page does not. The strip's top edge is the frame's
boundary rather than an obstacle inside it, so 0006 §6 turns the flock there and
the Core gains no fourth force. Heights are measured in `svh`, there is no
breakpoint and no container query, and **no script opens, closes or toggles
anything** — `<dialog>` and `<details>` are both Baseline widely available, and
the dialog opens by a form submission targeting it, because `showModal()` would
be script and 0002 §2 gives the Shell no page chrome.

**Two of its findings outlive the layout.** The label of the button that opens
the dialog must name the imprint, because behind a control the label is the whole
of what 0004 §10 calls a person finding it — a question that could not arise
while the imprint sat directly on the page. And the imprint being one press away
is a **reading** of 0003 §7 rather than a plain consequence of it: R1 records the
decider's reading that a dialog is no navigation, together with the argument
against it, which is 0003 §7's own stated reason. 0003 stands as written, and the
route 0005 R2 fixes for loosening an accepted rule — a record that supersedes
it — has not been taken.

**Fifteen decisions are planned** in [docs/adr/](adr/README.md).
[0001](adr/0001-purpose-scope-and-success.md),
[0002](adr/0002-overall-architecture.md),
[0012](adr/0012-how-software-gets-developed.md),
[0003](adr/0003-security-and-privacy-by-design.md),
[0004](adr/0004-compliance-accessibility-and-rights.md),
[0005](adr/0005-rendering-and-visual-design.md),
[0006](adr/0006-motion-rules.md),
[0007](adr/0007-pointer-and-input-model.md) and
[0014](adr/0014-page-layout.md) are Accepted; the other
six are `Planned`. **The table runs by meaning and not by number**, and three
numbers have a history it carries rather than this file: 0012 was reserved as
unused until 2026-08-02, and 0014 and 0015 were both added after the set was
planned.

What is awaiting review is not repeated here. The
[pull request list](https://github.com/nanatsusaya/dot-panic/pulls) is the
authority for that, and a copy of it in this file would be wrong within a day.
Parked branches **are** named here, because nothing else announces them.
There are none.

## What the tickets hold

Nine issues are open. One of them still carries research that would otherwise
have existed only in the conversation that produced it, and each ticket says in
its own header how ready it is.

| Ticket | State |
|---|---|
| [#12](https://github.com/nanatsusaya/dot-panic/issues/12) 0013 Origin of the core | not ready — holds the package survey |
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | not ready — 0012 §2 makes it the first increment |
| [#34](https://github.com/nanatsusaya/dot-panic/issues/34) 0008 Performance budget | ready — 0007, the last record blocking it, is Accepted |
| [#35](https://github.com/nanatsusaya/dot-panic/issues/35) 0009 Toolchain | ready |
| [#36](https://github.com/nanatsusaya/dot-panic/issues/36) 0010 Testing strategy | waits on 0009 |
| [#37](https://github.com/nanatsusaya/dot-panic/issues/37) 0011 Delivery | waits on 0009 |
| [#38](https://github.com/nanatsusaya/dot-panic/issues/38) The two repository notes 0004 §2 assumes | ready |
| [#46](https://github.com/nanatsusaya/dot-panic/issues/46) Ticket readiness is stated in two places | ready — and this table is one of the two |
| [#53](https://github.com/nanatsusaya/dot-panic/issues/53) 0015 Settings surface | ready — every record it depends on is Accepted |

**The ticket gap is closed.** Every planned decision has one. Five were filed on
2026-08-02 — 0008, 0009, 0010, 0011 and the repository notes — because the four
records written so far were each written against one, and the next would have
been the first without. 0005's was written alongside its record rather than ahead
of it, and closed with it. **Neither row added since then opened the gap again:**
[#49](https://github.com/nanatsusaya/dot-panic/issues/49) for 0014 and
[#53](https://github.com/nanatsusaya/dot-panic/issues/53) for 0015 were each
filed in the same change that added the row, because a planned row without a
ticket is the state those five were filed to end.

**This table restates something the tickets already say**, and
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) is the ticket for it.
The readiness column drifted twice within an hour on 2026-08-02, against two
tickets whose blockers had been Accepted. It is left standing rather than removed
here, because that ticket has a real question underneath it — the tracker is
outside this repository, and a session reading only this file would lose the
picture — and answering it by editing is the thing tickets exist to stop.

**0004 §2 assumes two files that do not exist.** It says the repository carries
what the decider's other projects carry — a README and the conventional security
and conduct notes — and calls creating them ordinary work with its own ticket.
The README exists; `SECURITY.md` and `CODE_OF_CONDUCT.md` do not.
[#38](https://github.com/nanatsusaya/dot-panic/issues/38) is now that ticket.

**The imprint conflict this section used to name is settled**, and it turned out
not to be a conflict. 0003 R1 tells two parties apart: the person responsible
for a published project is attached to it by name on purpose, and P1 protects
the visitor, about whom nothing is recorded anywhere. P1 stands unnarrowed, no
adaptation is declared, the imprint text lives here as ordinary page content,
and `method.json` binds `secrets` to the platform scanner instead of `null`. The
legal half was 0004's, and it is answered above.

**The definition of done has one authority**, and it is
[the ticket template](../.github/ISSUE_TEMPLATE/task.md). It was stated in three
places, not the two [#23](https://github.com/nanatsusaya/dot-panic/issues/23)
knew about: `/feierabend` carried a copy as well, and that one required a green
local check chain this project has never had. Four conditions survive as one
list, `0009` is named as what would make any of them decidable by a command, and
CLAUDE.md and `/feierabend` now refer to it and state nothing.

What a change description must contain is no longer among the gaps here.
[The pull request template](../.github/pull_request_template.md) fixes it.

## The single clearest next step

**Write [decision 0008](adr/README.md) — performance budget**, against
[#34](https://github.com/nanatsusaya/dot-panic/issues/34). Everything it depends
on is Accepted, and 0006 §2 hands it a ceiling it cannot negotiate: dots that
cannot be packed into the frame without overlapping make that section
unsatisfiable, whatever a budget would prefer. Its ticket also carries a second
topic that arrived from 0002 §2 — how the Core finds a dot's neighbors is
internal to the Core, and naive neighbor search is quadratic, so the dot count
and the search strategy are one question.

**It is written before 0015, which the index places first.** The index orders by
meaning and says nothing about the order of writing, and here the dependency runs
one way only. [0014](adr/0014-page-layout.md) R5 makes bounds the substance of
0015 rather than a detail of it; one of those bounds is 0006 §2, which is
Accepted, and the other is performance, which is 0008's whole subject. 0008 needs
nothing from 0015 in return — the maximum count it has to name is the same number
whether or not a visitor may move it. Decided on 2026-08-02.

**0009 is the other ready ticket**, and it is the only one that unblocks others:
[#36](https://github.com/nanatsusaya/dot-panic/issues/36) and
[#37](https://github.com/nanatsusaya/dot-panic/issues/37) both wait on
[#35](https://github.com/nanatsusaya/dot-panic/issues/35).

## Implementation scale

A decision's status says only whether the choice is binding. This is the scale
that says whether anything exists:

| Stage | Means |
|---|---|
| `planned` | Nothing written. No decision, no ticket, no code. |
| `decided` | The decision is Accepted. No code. |
| `built` | Implemented, tested, and watched running. |
| `live` | Deployed and reachable at the public URL. |

An accepted decision confers `decided` and nothing more.

**The simulation core does not move off `planned`, and 0006 is the reason it
looks as though it should.** 0006 decides the rules the core runs, but
[0013](adr/README.md) still owns whether that core is written here or taken from
a package, and it is `Planned`. Rendering moved because 0005 is the whole of that
question; the core is two records and only one of them exists.

**Pointer handling moves for the same reason rendering did**, and one thing it
leaves open is not part of it: 0007 §8's requirement that the imprint stay
reachable on touch is 0014's, and 0014 arranges the page rather than deciding the
input model. The model itself is one record and that record is Accepted.

**Page layout is a new row, not a moved one.** It was not an area on this scale
until a record owned it, and 0014 is the whole of that question the way 0005 is
for rendering. 0015 decides what goes inside the dialog 0014 places, not where
anything sits.

| Area | Stage |
|---|---|
| Toolchain | `planned` |
| Simulation core | `planned` |
| Rendering | `decided` |
| Pointer handling | `decided` |
| Page layout | `decided` |
| Deployment | `planned` |

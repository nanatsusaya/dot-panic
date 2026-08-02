# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-02.*

## Position

The method has been adopted. **Nothing of the toy exists yet** — no simulation
code, no page, no rendering. Everything built so far is the way of working:
the operating rules, the decision set, fourteen accepted records, and the five
session procedures in [`.claude/skills/`](../.claude/skills/README.md).

The procedures have now been used. `/moin`, `/weiterimtext` and `/adr` all ran
on 2026-08-02 and behaved as their files describe. `/feierabend` and `/passtdas`
have still never been invoked.

**The architecture is decided and none of it is built.**
[0002](adr/0002-overall-architecture.md) fixes a functional core inside an
imperative shell, three parts, and the directory layout that goes with them —
but `core/`, `shell/` and `view/` do not exist, and creating them is work that
needs a ticket, not a side effect of reading the record. There is still **no
toolchain at all** — no runtime, no test runner, no package manifest — but that
is no longer an open question. 0009 decides it and
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) is the work.

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
precondition of publishing. **Something checks it now.** 0011 §6 fails the
deployment if the built artifact carries `Musterstadt`, so the gate that used to
be a person remembering is a command — on publishing rather than on committing,
because the source is supposed to carry the placeholder until a real address
exists. What no command decides is an address that is real and wrong.

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
the Core gains no fourth force. Heights are measured in `svh`, and there is no
breakpoint and no container query.

**How that dialog opens was wrong, and correcting it moved a boundary.** 0014 §5
said the dialog opens by a form submission targeting it, and no such mechanism
exists — `method="dialog"` *closes* the dialog a form sits in. The one markup
mechanism that opens one, invoker commands, is Baseline *newly available* and
does not reach 0001 §3.4's floor until **2028-06-12**. Both of §5's reasons for
markup rested on the `showModal()` call it forbade, because the backdrop, the
focus containment and the `Escape` key belong only to a modal dialog. **The Shell
now makes that one call**, and 0002 A1 is where the cost is paid: its parts table
names the call, and its §6 is read as being about the imprint and the explanation
rather than about the open state of their container. The call is a bridge with an
end date — on 2028-06-12 the markup becomes permitted and the handler can go.

**Its price is on the page and nothing mitigates it:** a browser that runs no
script now shows a button that does nothing, and the imprint behind it is a legal
obligation. The alternative failed in the same direction and worse — invoker
commands are silent on exactly the device 0001 §3.5 makes the floor.

**Two of its findings outlive the layout.** The label of the button that opens
the dialog must name the imprint, because behind a control the label is the whole
of what 0004 §10 calls a person finding it — a question that could not arise
while the imprint sat directly on the page. And the imprint being one press away
is a **reading** of 0003 §7 rather than a plain consequence of it: R1 records the
decider's reading that a dialog is no navigation, together with the argument
against it, which is 0003 §7's own stated reason. 0003 stands as written, and the
route 0005 R2 fixes for loosening an accepted rule — a record that supersedes
it — has not been taken.

**How much work one frame may do is decided, and there is no number in it.**
[0008](adr/0008-performance-budget.md) makes the budget a comparison the Shell
already holds: the steps that are due plus one draw finish before the next frame
is due. The `requestAnimationFrame` callback carries the time, so there is no
second clock anywhere in the project. When the device cannot keep up, the flock
runs **slow** — steps past a cap are abandoned rather than deferred, because
dropping dots is closed by 0002 §5 and stuttering is what 0001 §3.3 names by
name. Every length in the world is a fraction of the frame, which makes the dot
count one number instead of a function of the window; neighbor search is a
uniform grid, and the naive scan is never deleted, because it is the oracle the
grid is tested against.

**Its R1 says where numbers live in this project**, which is the half of that
record that outlives it: in the code and in the ticket that fixed the criteria
before the work started, never in a record. Five records now defer a number, and
saying it once makes that a rule rather than five coincidences. **No measurement
can falsify an accepted record**, because none claims a number — but changing a
*relation*, such as the single dot count, still takes one. Two things it leaves
open are worth knowing before the first measurement: 0002 R2's allocation cost
was to be measured here and still is not, and §8 freezes 0001 §3.5's rolling
floor by recording a date beside the slowdown factor — held by a person writing
it down, with nothing to check it. That used to be the shape the imprint address
had as well; 0011 §6 has since taken the address out of its company.

**Whether the visitor may change anything is decided, and the answer is no.**
[0015](adr/0015-settings-surface.md) gives the page no settings surface. Two
controls, both obligations, and the third section of 0014's dialog stays empty —
which is the pressure 0014 named answered rather than left. Its §1 is the answer
and §2 through §8 are **the terms of a later yes**, because the decision was *no
for now*: a no that stays open has to state its reasons as conditions a later
record can satisfy or fail. **None of those reasons was written to prevent
settings.** 0008 §5 closed the dot count before 0015 existed; 0002 §2's
enumerated job list makes the first control an amendment on the precedent of 0002
A1; 0003 §4 forgets it on reload.

**Its §7 is the one that decided it**, and it came from a record about
performance. 0008 §10 stops the flock exactly while the dialog holding any
control is open, and 0014 §2 leaves the strip no room for a third — so a value
would be chosen against a still picture, and **a slider dragged while watching is
not available on this page.** 0001 §3.1 makes watching the judge of the only
thing the toy is trying to be, so the one feedback loop a settings surface exists
to provide is the one the layout forbids. **Two readings are recorded as
readings:** §6 closes a query string, which stores nothing on the device and so is
not reached by 0003 §4's mechanism list, on 0001 §5's outcome instead; and R3
closes the question in 0015 rather than on 0001 §5's out-of-scope list, so that
the later addition the decider left open costs a record superseding 0015 and not
one superseding 0001.

**What runs the code is decided, and none of it is installed.**
[0009](adr/0009-toolchain.md) fixes Bun, TypeScript and `bun test` — the decider's
choice, taken against a recommendation of no toolchain at all. **Its §4 is the
load-bearing part**, because 0001 R1 sent the Baseline floor there and the two
tools disagree about it: Bun's bundler does not down-convert syntax, so it cannot
hold the floor, while `tsc`'s `target` does and its `lib` bounds the APIs that
type-check. So `tsc` emits and `bun build` does not — one answer to what syntax is
allowed instead of two that can differ — and **Bun's own recommended `tsconfig` is
declined** in exactly those two settings. One `.js` beside each `.ts`, no bundler,
and R1 keeps the output out of the repository, which closes publishing straight
from a branch before 0011 exists to weigh it.

**Two gaps are named in the record rather than left to be found.** `lib` is
versioned by ECMAScript year and the DOM library is not versioned at all, so every
browser feature an accepted record names sits outside what any setting can
decide — **one of the rules here held by a person remembering**, beside 0008 §8's
factor. There were three of them; 0011 §6 closed the imprint address and these
two are what is left. Biome was checked for it and has no browser-support
rule group. And `bun test` runs the source while the browser runs the down-leveled
output, so a passing test is a statement about the source. **0010 took that and
did not close it** — see below.

**What a test may claim is decided, and one whole register has nobody in it.**
[0010](adr/0010-testing-strategy.md) names three registers for the entire set —
asserted, measured, watched — and fixes that a command asserts three kinds of
claim and nothing else: invariants of the world, determinism, and facts about the
source text. **Its §5 answers a question two accepted records had each handed
forward.** 0008 §9 and 0014 §9 both wrote that whether anything measures a running
page is 0010's; six invariants sat on that answer, and the answer is **nobody**. A
person reads the number off the browser's own tools, and R1 fixes the trigger for
ever building a harness: a budget found to have drifted, not the absence of one.
**The frame budget is the only number in this project and after this record
nothing guards it.**

**Two things it says it cannot show.** 0002 §4 claims the same world and steps
produce the same result *in any environment that can do arithmetic*; §3 asserts
determinism as two runs compared to each other, under one runtime, and states that
the cross-environment half is exercised by nothing. And §9 leaves 0009 §6's gap
open rather than closing it: the output is not committed, so there is nothing for
a test to read, and **watching the built page is the sole evidence that what the
browser runs matches what the tests passed.**

**Its §7 is the one the record argued against and lost.**
[0010](adr/0010-testing-strategy.md) proposed tracking no coverage, on the grounds
that one percentage over this repository would describe the ratio of Core to View.
R2 reverses it for a reason the draft never weighed — **testability as
maintainability for agents**, which is what this project is a worked example of —
and answers the objection by scoping instead of dropping: **90 percent over the
Core**, with `shell/` and `view/` excluded by name because Bun offers no
per-directory threshold. It costs no fourth dependency, `bun test` carrying
coverage itself, and it hands [0002](adr/0002-overall-architecture.md) §5 the
first enforcement it has ever had — logic moved out of the Core to dodge a test
shrinks the numerator and reddens the run. What it does not do is prove anything:
90 percent is reachable by tests that assert nothing, and the record says so.

**How it reaches the public is decided, and nothing is deployed.**
[0011](adr/0011-delivery.md) puts the page on GitHub Pages at
`https://nanatsusaya.github.io/dot-panic/`, with no custom domain and nothing
bought or registered. An Actions workflow publishes it rather than a branch,
because a branch leaves 0009 §8's checks with nothing to gate: the checks run,
`tsc` emits, and `actions/deploy-pages` runs only if everything before it passed,
so a red check produces no deployment rather than a deployed page with a warning
beside it. **This is not continuous integration** — what gates a merge is still
review — and **the workflow is a file nobody has written**, so that ordering is a
claim about a file rather than a property of the project. Its §5 settles 0003
§6's conditional the unwanted way: GitHub's documentation provides no way to set
response headers, stated as what was found rather than as a capability claim, so
the policy ships as a `meta` element alone and `report-uri`, `frame-ancestors`
and `sandbox` stay unsent.

**The host logs the visitor's IP address, and the page will say so.** GitHub
documents it plainly, which answers what 0004 §8 handed forward and contradicts
nothing 0004 decided — the page still collects nothing, and the host does, before
a line of the page runs. Two sentences and a link go **inside** the imprint
section of 0014 §4's dialog rather than becoming a section of their own, which is
what leaves 0004 R2's imprint content, 0003 §7's *one place* and 0015 §1's
deliberately empty third section untouched; writing them is
[#77](https://github.com/nanatsusaya/dot-panic/issues/77). **The disclosure rests
on no legal determination.** R4 records that the question was whether disclosure
was *owed*, that 0004 §13's GDPR row reached nothing on the page because no host
was chosen then, and that the answer is the cheap side of an asymmetry rather
than a finding — so a later reader looking for the reasoning that makes it
required will not find one.

**It goes live at the walking skeleton**,
[#13](https://github.com/nanatsusaya/dot-panic/issues/13), and not at the point
0001 §3 calls the toy good enough. The argument is 0001 §6.2 — *the toy is never
finished because the process ate the work* — which is the failure this project is
most exposed to, fourteen records in with nothing on a screen. **The cost is
chosen rather than overlooked:** the public URL will serve a poor toy for a
while, and it is the artifact most likely to be judged without the records beside
it.

**Fifteen decisions are planned** in [docs/adr/](adr/README.md).
[0001](adr/0001-purpose-scope-and-success.md),
[0002](adr/0002-overall-architecture.md),
[0012](adr/0012-how-software-gets-developed.md),
[0003](adr/0003-security-and-privacy-by-design.md),
[0004](adr/0004-compliance-accessibility-and-rights.md),
[0005](adr/0005-rendering-and-visual-design.md),
[0006](adr/0006-motion-rules.md),
[0007](adr/0007-pointer-and-input-model.md),
[0014](adr/0014-page-layout.md),
[0015](adr/0015-settings-surface.md),
[0008](adr/0008-performance-budget.md),
[0009](adr/0009-toolchain.md),
[0010](adr/0010-testing-strategy.md) and
[0011](adr/0011-delivery.md) are Accepted; the fifteenth,
[0013](adr/README.md), is `Planned`. **The table runs by meaning and not by
number**, and three
numbers have a history it carries rather than this file: 0012 was reserved as
unused until 2026-08-02, and 0014 and 0015 were both added after the set was
planned.

What is awaiting review is not repeated here. The
[pull request list](https://github.com/nanatsusaya/dot-panic/pulls) is the
authority for that, and a copy of it in this file would be wrong within a day.
Parked branches **are** named here, because nothing else announces them.
There are none.

## What the tickets hold

Eight issues are open. One of them still carries research that would otherwise
have existed only in the conversation that produced it, and each ticket says in
its own header how ready it is.

| Ticket | State |
|---|---|
| [#12](https://github.com/nanatsusaya/dot-panic/issues/12) 0013 Origin of the core | not ready — holds the package survey |
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | not ready — 0012 §2 makes it the first increment |
| [#38](https://github.com/nanatsusaya/dot-panic/issues/38) The two repository notes 0004 §2 assumes | ready |
| [#46](https://github.com/nanatsusaya/dot-panic/issues/46) Ticket readiness is stated in two places | ready — and this table is one of the two |
| [#69](https://github.com/nanatsusaya/dot-panic/issues/69) Create the toolchain 0009 decides | ready — and starting it is the decider's call |
| [#70](https://github.com/nanatsusaya/dot-panic/issues/70) Biome | waits on #69 |
| [#71](https://github.com/nanatsusaya/dot-panic/issues/71) The check chain as commands | waits on #69 and #70 |
| [#77](https://github.com/nanatsusaya/dot-panic/issues/77) The hosting notice 0011 §4 puts beside the imprint | not ready — waits on #13 for a dialog to sit in |

**The ticket gap is closed.** Every planned decision has one. Five were filed on
2026-08-02 — 0008, 0009, 0010, 0011 and the repository notes — because the four
records written so far were each written against one, and the next would have
been the first without. 0005's was written alongside its record rather than ahead
of it, and closed with it. **Neither row added since then opened the gap again:**
[#49](https://github.com/nanatsusaya/dot-panic/issues/49) for 0014 and
[#53](https://github.com/nanatsusaya/dot-panic/issues/53) for 0015 were each
filed in the same change that added the row, because a planned row without a
ticket is the state those five were filed to end.

**Four of the eight were asked for by a record rather than noticed in passing.**
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) creates what 0009
decides, [#70](https://github.com/nanatsusaya/dot-panic/issues/70) configures
Biome, and [#71](https://github.com/nanatsusaya/dot-panic/issues/71) turns 0009
§8's four checks into commands a person runs — those three came with 0009 R2,
where the decider asked for them by name. The fourth is
[#77](https://github.com/nanatsusaya/dot-panic/issues/77), which writes the two
sentences 0011 §4 puts beside the imprint, and it was filed before that record
was accepted so that the reference inside it would point at something real.
**#69 has since grown a requirement it was not filed with**: 0010 §7 puts the
coverage floor and its two exclusions in `bunfig.toml`, so the file that ticket
creates now carries a number as well as a toolchain. **None of them starts by
existing:** 0012 §1's analysis phase has no end condition, and leaving it is a
decision rather than a consequence of a record being Accepted.

**This table restates something the tickets already say**, and
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) is the ticket for it.
The readiness column drifted twice within an hour on 2026-08-02, against two
tickets whose blockers had been Accepted. It is left standing rather than removed
here, because that ticket has a real question underneath it — the tracker is
outside this repository, and a session reading only this file would lose the
picture — and answering it by editing is the thing tickets exist to stop.

**The first amendments in this project's history have been written**, and
[#58](https://github.com/nanatsusaya/dot-panic/issues/58) is what caused them.
0007's *Consequences* and 0008 §3 and §6 each pointed at an `O1` that became an
`R1` when the record was accepted, and the reference did not move with it. Daniel
authorized one amendment per record on 2026-08-02; each quotes the superseded
wording, and neither changes anything either record decides.

**What that established is bigger than three characters.** There was no form for
an amendment until one was needed: [docs/adr/](adr/README.md) now fixes where the
log sits, what it must quote, and that the body above it always states current
truth — so a reader starting at the top is never reading superseded wording.
**The coherence check still cannot see this**, because it resolves links between
documents and not a record's references to its own sections. What changed on
2026-08-02 is that something else can: the rule was written down, **the next two
records broke it four more times**, and `/adr` now runs
`grep -n "O[1-9]" docs/adr/*.md` before a record is merged. The expected result is
known — quotations inside an *Amendments* section, plus the index's own row — which
is what makes it a check rather than a reminder to be careful. It is the sixth
adaptation of the copied procedures and the [method log](method-log.md) carries
why.

**The question nobody owned has an owner.**
[0014](adr/0014-page-layout.md) R6 said whether the flock keeps stepping while
the dialog covers it *belongs to 0008*, and 0008 did not mention it. Its new §10
does: **the Shell stops calling the Core while the dialog is open.** R6's own
reason for asking — *work done for nothing on a device with a battery* — is
false, because a modal dialog's backdrop is ten percent black and the flock stays
visible. The two reasons that hold are that motion sits behind text somebody is
reading, and that 0004 §5's control is inert exactly then, so a visitor bothered
by it has no mechanism. Nothing was built for it: 0006 §9 already makes stopping
the absence of steps, and 0008 §4 already decides the resume.

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
list, and what would make any of them decidable by a command is no longer only a
number: 0009 §8 fixes four checks and
[#71](https://github.com/nanatsusaya/dot-panic/issues/71) is what turns them into
commands. CLAUDE.md and `/feierabend` refer to the template and state nothing.

What a change description must contain is no longer among the gaps here.
[The pull request template](../.github/pull_request_template.md) fixes it.

## The single clearest next step

**Bring [#12](https://github.com/nanatsusaya/dot-panic/issues/12) to ready**, so
that [decision 0013](adr/README.md) — origin of the core — can be written. It is
the last planned record and the only thing between the decision set and being
finished; every other row is Accepted.

**Half of what makes that ticket not ready has expired.** Its header gives two
reasons, *blocked by 0002* and *"Scope is not final"*. 0002 was Accepted on
2026-08-02, the day after the ticket was filed, so the first is gone. The second
is a judgement rather than a blocker, and the ticket predicted how it would
resolve: *"once 0002 fixes the architecture, this question is largely answered by
it."* Establishing whether that came true is the work.

**Records accepted since reach into two of its three scope items**, one of them
all the way. It asks whether anything shipped to the browser may have a runtime
dependency at all — 0009 §7 answers no, and calls that a description of what 0003
§2 and §5 already force rather than a new rule. And it asks which package to take,
while
0009 §3 emits one `.js` beside each `.ts` with no bundler, which is not how an
installed package reaches a browser. **Whether that leaves *taken from a package*
meaning anything is 0013's to work out**, not this file's — and it is why the
ticket needs rereading rather than answering.

**What the ticket carries is a survey, and it is not evidence.** The four npm
packages in it are metadata read from the registry on 2026-07-31; no package's
source was read, and the argument recorded against them was never code quality
but scope — none addresses 0006's speed floor, bounded frame or non-overlap.

**Nothing here says to start building.**
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) creates what 0009 and
0010 §7 decide, and 0012 §1's analysis phase has no end condition — leaving it is
the decider's call, not something a record becoming Accepted does on its own.

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
for rendering. 0015 has since decided that nothing joins what 0014 put in the
dialog, which leaves this row exactly where it was.

**Toolchain moves to `decided`, and it is the row where that word is easiest to
misread.** 0009 is the whole of that question the way 0005 is for rendering, so
the move is the ordinary one — but *decided* here means there is no `package.json`
and no `node_modules`, not that a `bun install` has been run. CLAUDE.md carries the
same sentence for the same reason.
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) is what would move it
again.

**0015 adds no row and moves none**, for a reason no other record has had: it
decided that the area does not exist. There is nothing to build, so there is
nothing to track. Its one lasting invariant — nothing on the page reads or writes
a query string — arrives wherever the page arrives, which is the row above.

**0008 adds no row and moves none**, which is worth saying because a record about
how fast things run looks as though it should. A budget is not an area that gets
built; it is a constraint on the areas that are. Its three Core invariants arrive
wherever the simulation core arrives, and the two things it measures need a
running page and whatever applies §8's slowdown factor — which §8 hands to 0009.

**0010 adds no row and moves none either**, for 0008's reason: a testing strategy
is a constraint on the areas that get built rather than an area itself. One part
of it does arrive with a row, though, and it is the toolchain — 0010 §7's coverage
floor is a line in `bunfig.toml`, so it reaches `built` when
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) does and not before.

**Deployment moves to `decided`**, which is the ordinary move: 0011 is the whole
of that question the way 0005 is for rendering. *Decided* here means there is no
workflow file and nothing has ever been deployed. What moves it again is
[#13](https://github.com/nanatsusaya/dot-panic/issues/13) — 0011 §7 fixes the
first deployment at the walking skeleton, which is also the first time any row on
this scale reaches `live`.

| Area | Stage |
|---|---|
| Toolchain | `decided` |
| Simulation core | `planned` |
| Rendering | `decided` |
| Pointer handling | `decided` |
| Page layout | `decided` |
| Deployment | `decided` |

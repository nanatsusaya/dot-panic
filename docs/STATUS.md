# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-05.*

## Position

The method has been adopted, and **the first thing here that is not a document
now exists**: the toolchain [0009](adr/0009-toolchain.md) decides.
**Nothing of the toy exists yet** — no simulation code, no page, no rendering.
The rest of what is built is the way of working: the operating rules, the
decision set, seventeen accepted records, and the five session procedures in
[`.claude/skills/`](../.claude/skills/README.md).

The procedures have now been used. `/moin`, `/weiterimtext` and `/adr` ran on
2026-08-02 and `/feierabend` on 2026-08-03, all behaving as their files
describe — `/feierabend`'s first run is what added this sentence's other half
and #114 to the ticket list, by reading the documents it asks to be brought
current. **`/passtdas` ran on 2026-08-05 and was the last one outstanding.**

**It found nothing to declare, and that is the answer rather than a shrug.**
Seven phases, epics, a third label and a cap on open changes are **project
layer**, not adaptations: an adaptation is a catalog rule narrowed, replaced,
dropped or deferred, and none of them touches one. So `"adaptations": []`
stands, and the check reporting thirty-two rules in force and none adapted is
the right answer rather than an oversight. The [method log](method-log.md)
carries the boundary, because a session answering it the other way would
declare adaptations that switch checks off for rules that are in force.

**What the review did find is one rule in force and failing, and one nobody has
verified.** A3 — *scale ceremony to the stage* — describes this project in the
catalog's own words: *a decision phase with no end condition* is how a project
accumulates a complete architecture and no running code. Seventeen records, no
code, and [0012](adr/0012-how-software-gets-developed.md) §1 says the analysis
phase has no end condition. None of that is news here —
[0001](adr/0001-purpose-scope-and-success.md) §6.2 ranks it as a failure and
[0011](adr/0011-delivery.md) §7 puts the first deployment at the walking
skeleton because of it — and supplying the end condition belongs to the decider
rather than to a review. **G1's binding has never been checked**: the catalog
asks for trunk protection that binds administrators too, and for a deliberate
zero on required approvals where one account both writes and merges. The check
states that it can decide neither and names the address; the decider is looking.

**The method this project demonstrates was renamed on 2026-08-05**, and
`method.json` follows it: `agent-project-rules`, catalog `0.5`. None of the
thirty-two rules moved — none added, withdrawn or renumbered — but the check
hard-fails on the old name rather than warning about it, so following was not
optional. **The five accepted records carrying the old name keep it**, because
a record is immutable and none of them decides anything different under the new
one. GitHub's redirect is what holds those links, and it survives only while
the old name stays free. The [method log](method-log.md) has the reasoning, and
a session finding two names for one thing should read it before *finishing* the
rename.

**That change found a live defect no count would have shown.** The plugin was
enabled at user scope under its new identity while `.claude/settings.json`
disabled only the old one — so its five procedures ran beside the five adapted
copies, which is the second authority CLAUDE.md exists to prevent. Both
identities are disabled now.

**The copies have since been compared against plugin `0.5.0`, and they match
it.** In the five files the plugin changed only the method's own name, which the
rename had already carried through them, and the catalog number in the template
`/passtdas` shows, which this repository had already set to the same value — so
the first case of 0016 §6's fourth kind of maintenance work took nothing, which
is a result rather than a reason to skip the next one.

**What the comparison found outside the adaptations was two values**, both in
the `method.json` template inside `/passtdas`, and
[`.claude/skills/README.md`](../.claude/skills/README.md) is where they are
read. One is still ours: the `"language"` line declares American spelling here
and British upstream. **The other closed the same afternoon.** The `"version"`
line was set to `0.5` here on the decider's call; the plugin made the same
change for the same reason half an hour later and put a command behind it, so
what this repository had written down as a divergence to preserve is no longer a
divergence. Nothing here would have caught that — a version number sits in no
link, and the coherence check reads links.

**The record set was read from outside on 2026-08-03, and no decision was
reversed.** Two independent audits and a meta-audit that verified both against
the records went through every record, ticket and pull request. **The three
release blockers one of them raised each dissolved against the sources**: the
imprint's model is coherent across 0003 §7, 0004 §3 and 0011 §6 — a stand-in
that the source carries until #90 replaces it, gated on publishing — P1's
reading is 0003 R1's and the decider's, and 0012 §6 asks independence of tickets
worked *in parallel* rather than of a whole set at once. A later session finding
those conflicts again should read the resolved questions before believing them.

**The one defect that survived them is corrected.** 0010 §7 claimed the coverage
floor gave 0002 §5 its first enforcement — logic moved out of the Core
*"shrinks the numerator and leaves the denominator alone"* — and the arithmetic
does not work: lines leaving `core/` leave both, and logic written straight into
the Shell or the View is never measured, because §7 excludes them by name. 0010
A1 says so, on the decider's authorization of 2026-08-05 and against
[#119](https://github.com/nanatsusaya/dot-panic/issues/119). **The state it
leaves is the state that was always true**: *no domain logic outside the Core* is
carried by review, exactly as before 0010 existed, and a green run says nothing
about it. The rest of what the audits found is
[#117](https://github.com/nanatsusaya/dot-panic/issues/117)'s.

**The section three readers misread now names what it rejects.** 0003 §7's
second bullet said *no placeholder, no injection at deploy time*, and its fourth
kept the imprint to one place with no copy *in a decision record, none in a
ticket*. Both still forbid what they forbade; 0003 A1 adds to each the boundary
it already had somewhere else. **The fourth bullet was the one actually
failing** — `Musterstadt` sits in 0004 §3 and is the target of 0011 §6's check,
and the contact address sits in two files under `.github/` by 0004 §2, each
excused by an argument in a different record, which is the route
[0005](adr/0005-rendering-and-visual-design.md) R2 calls the wrong one.
Authorized on 2026-08-05 against
[#134](https://github.com/nanatsusaya/dot-panic/issues/134), which was itself an
offer made in the comment on PR #52 and left unanswered until now.

**And the word *asserted* has one meaning again.** 0010 §2 fixed three kinds of
claim *and nothing else*, while 0011 §8 filled an asserted list with four claims
decided in the deploy workflow — three of them about the built artifact, which
0010 §9 said nothing asserts. **0010 A2 names the missing distinction as context
rather than kind**: the kinds say what a claim is about, and the deploy gate is
the second place a command runs. One of 0011's four was kind three all along —
*deployment runs only after the checks pass* is decidable by reading a workflow
file, so only its context was unaccounted for. §9 keeps its load-bearing half and
loses one word: watching is still the only evidence that the artifact matches
what the tests passed, because four named properties are not a match. The
vocabulary moved in 0010 rather than 0011 because §1 says every record uses these
names, and no check changes either way.

**Two rows in 0015's asserted table now say what a command can decide.** One
promised the Shell *makes no call except* 0014 §5's `showModal()` — contradicted
by three accepted records on the day it was written, since the Shell runs the
loop, calls `requestAnimationFrame` and listens for four pointer events — and it
was a second copy of 0014 §9's row besides, so 0015 A1 drops that half rather
than repairing it. The other counted the page's controls without defining
*control*, which a reviewer applying it literally fails on `<details>` and a
close button; the count is anchored to the strip, where 0014 §2 already put it.
**Nothing 0015 decides moves**, and its prose is untouched — the rows had turned
one sentence into a number and another into a superset. A1 also records one
thing that was checked and needed nothing: 0005 §3's color hand-off sits inside
0002 §2's *wiring* by that record's own reading, so 0002's list is not amended.

**Four British spellings survived the sweep, and two claims said none had.**
`authorisation` twice in `/adr`, `Summarise` in `/moin`, `judgement` in
`/weiterimtext`, and `monetised` twice in 0004 §13 — all corrected against
[#130](https://github.com/nanatsusaya/dot-panic/issues/130), the record's two by
0004 A1. They survived because the check scans a list of word pairs and not the
general `-ise` ending, a limit it prints on every run. **The claims were the
larger defect.** The skills README said the check *found all twenty-five
instances* while three of the four survivors sat in exactly the files that
sentence is about, and CLAUDE.md called the regime *machine-checked* with no
qualifier; both now say what the command does and leave the rest with review.
0004 A1 also records that Recital 18 of the Regulation spells the word the
British way, so a later session reading the mismatch finds the reason instead of
restoring it.

**Three stale references are repaired, and one of them was load-bearing.** 0002
§6 gave one section credit for two things: [0014](adr/0014-page-layout.md) §4 is
what puts the imprint and the explanation in a dialog, and §5 is where markup
turns out not to open one. That citation is the premise under the only
page-chrome call this project owns, and 0008 §10 already cited §4 for the same
fact — so one fact had two citations and one was wrong. 0002 A3 splits it,
authorized on 2026-08-05 against
[#127](https://github.com/nanatsusaya/dot-panic/issues/127), and **nothing §6
permits or forbids moves.** The [method log](method-log.md)'s two stale
statements gain dated corrections rather than rewrites, because a log entry stays
historically true: the toolchain is 0009 and not the 0006 of the six-topic plan,
and the skills README lists seven adaptations and not four — a count that entry
states twice, where the ticket found it once.

**The heading was damage rather than drift.** Inserting a newer entry replaced
the `##` line of *A recommendation was approved, and part of its reason was
false*, so two entries had sat fused under one title, with two *Two consequences.*
blocks, since 2026-08-02. The line is restored verbatim from the commit that
added it. **And the question that entry parks now has an answer**: PR #51 asked
whether a record's recommended default should cite sections the way a dependency
must, and merged without the question being put to anyone. The answer is **no** —
nothing checks either kind of citation, so the requirement would add a line to the
shape without adding a mechanism, and review is what catches both. The disposition
sits where the entry promised one, counter-argument included.

**The breakdown's ticket metadata agrees with itself again.** Thirteen quoted
mismatches from the day the work was cut into tickets — a header and its own
*Related* section naming different blockers, an epic table disagreeing with a
member's header and with the row in this file, a cross-reference to a ticket that
touches nothing it claims, a constraint pointing at an epic where 0012 §7 says a
change is never made against one, and a duty cited to 0013 §7 that belongs to
§5 — all corrected against
[#123](https://github.com/nanatsusaya/dot-panic/issues/123). Four open tickets
gained the `Ready:` header every other one carries. The fifth the ticket named,
#38, got none: it is closed, and readiness is a claim about work still to do.

**One item resolved the opposite way from the way it was filed.** #123 offered
either #90 gaining a dependency note or #96 dropping its claim to block it —
but the claim is true, because #96 fixes that the imprint carries the placeholder
*until #90 replaces it*. So #90 gained the note and nothing was dropped. **The
two items marked as the decider's both moved a boundary rather than a word**,
answered on 2026-08-05: #90 joined #13's table, and **Biome's enabled rule groups
are [#70](https://github.com/nanatsusaya/dot-panic/issues/70)'s**. No record
fixes that set — 0009 §7 names the dependency and §8 fixes that there are four
checks and what each decides, and neither reaches a rule group — so
[#71](https://github.com/nanatsusaya/dot-panic/issues/71)'s constraint now says
where the set is decided instead of implying a record does.

**The tracker carries three labels, which is the number the rule allows.** GitHub
creates nine of its own with every repository — `bug`, `documentation`,
`duplicate`, `enhancement`, `good first issue`, `help wanted`, `invalid`,
`question`, `wontfix` — and they had sat there since the first day. None was on
any issue or any pull request, so deleting them moved no ticket;
[#129](https://github.com/nanatsusaya/dot-panic/issues/129) removed nine things a
fresh session had to read and classify before finding out they mean nothing here.
**It is the first ticket in this project whose done state no file records.** The
criterion is what the label list returns, and the sentence above is a claim about
somebody else's system rather than about this repository — the class
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) was filed for.

**One of the three surviving labels described itself in wording an amendment had
replaced.** `type:epic` still read *delivering one recognizable part of the toy*,
which is §7 as first accepted — and
[0012](adr/0012-how-software-gets-developed.md) A2 widened it on 2026-08-03 to
one recognizable piece of work, *a part of the toy or a bounded effort beside
it*, for [#117](https://github.com/nanatsusaya/dot-panic/issues/117), which
carried the label saying it did not qualify. Corrected on the decider's call the
same day #129 ran. **A2's sentence does not fit**: GitHub rejects a label
description over 100 characters, which is a limit found by being refused rather
than recalled, so the description carries the disjunction and drops the word
*recognizable*. The record is where the wording is read; a label is a handle.

**Readiness has one place now, and this file is no longer the second.** Every
ticket says in its own `Ready:` header what it waits on, and the table below said
it again in a `State` column — which drifted twice within an hour on 2026-08-02,
against two tickets whose blockers were already Accepted.
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) removed the column
rather than repairing it. [The ticket
template](../.github/ISSUE_TEMPLATE/task.md) was already the authority for what
makes a ticket ready, so that is where the header is named as the one place
readiness is stated, and CLAUDE.md's existing one-authority rule reaches this
file from there without a new rule being written. **What the tables say instead
is what each row is for**, which is the thing a session reading only this file
would otherwise call the tracker to learn.

**The template concedes that the header drifts**, because an answer that
pretended otherwise would be unenforceable: the tracker is outside this
repository and no command here reaches it. Readiness is the one fact that goes
stale on **somebody else's merge**, and 0012 §2's activity — a set brought to
Ready together — is what re-reads it. **The proof arrived while the ticket was
being worked.** [#132](https://github.com/nanatsusaya/dot-panic/issues/132)'s
header still named #120, #121 and #124 as blockers, all three closed the same
day, while this file's row for it was right — the same drift as 2026-08-02, from
the other side. That is why *the ticket is simply the reliable one* was not the
answer: it moves the staleness rather than ending it. The header is corrected.

**The analysis phase is over, and what ended it was the decider naming a
ticket.** 0012 §1 gives that phase no end condition and puts leaving it in one
person's judgment;
[#69](https://github.com/nanatsusaya/dot-panic/issues/69) is what he named on
2026-08-05. `package.json`, `tsconfig.json` and `bunfig.toml` are here, the three
development dependencies 0009 §7 names are installed and pinned exactly, and
`core/`, `shell/` and `view/` exist and are empty.

**`target` and `lib` are ES2023, and the reasoning is worth more than the
value.** A year is only as available as its **last** feature. ES2024 looks a
month away — three of its proposals become Baseline widely available on
2026-09-05 — but `Atomics.waitAsync` reached the fourth browser only on
2025-11-11, so ES2024 cannot qualify before **2028-05-11**. ES2023 cleared the
floor on 2026-01-04, on *Change Array by Copy*. The Baseline data was read on
2026-08-05 and the working is in #69, per 0008 R1; [the maintenance
list](maintenance.md) carries the date. One line is unverified and says so: the
feature catalog has no row for *Symbols as WeakMap keys*.

**Two of 0009 §8's four checks are red, and that is the toolchain existing
before the toy does.** `tsc` ends on *no inputs were found* and `bun test` on *0
test files matching*, because the three directories are empty — both end when
[#91](https://github.com/nanatsusaya/dot-panic/issues/91) writes the first Core
file with its test, which is 0012 §4. **A placeholder would have made both green
and said nothing**, which is the trade 0010 §7 already warns about in its own
terms.

**Building it turned two written rules into machine-held ones and found one
collision.** `moduleResolution: node16` rejects an import specifier that lacks an
extension **and** one ending in `.ts` — both halves of 0009 §5, which §9 lists as
decidable by reading the repository and which a command now decides. The
collision is between §3 and §6: emitting a `.js` beside every `.ts` produces
`*.test.js`, which §6's discovery patterns also match, so a build doubled the
suite until `pathIgnorePatterns` was set. Neither record saw it.

**Biome is configured, and the set of rules is a ticket's call rather than a
record's.** Seven groups on, `nursery` off — a rule still under development turns
a check from a finding into churn, and it can change under a pinned version. Each
group's one line is in [#70](https://github.com/nanatsusaya/dot-panic/issues/70),
written before the file was, and `style` is named there as the one carrying real
risk. Nothing turns on a rule outside the recommended subset.

**The question that ticket was filed to settle turned out to rest on a capability
Biome does not have.** Whether the formatter reflows `docs/` mattered because an
accepted record is immutable — but **Biome cannot format Markdown**: its own
language table lists that as *In progress*, and Markdown linting as *Not in
progress*. So the exclusion changes nothing today and is written for the day it
lands, which is the opposite of discovering it by finding a record reflowed.

**The first formatting pass touched no file.** It reads five — `package.json`,
`tsconfig.json`, `biome.jsonc`, `method.json` and `.claude/settings.json` — and
all five were already conformant, so the commit the ticket reserved for that pass
does not exist. Both failure modes were triggered on purpose instead:
`correctness/noUnusedVariables` and `suspicious/noDoubleEquals` on one throwaway
file, and a formatter refusing eight-space indentation, each exiting 1.

**The architecture is decided and none of it is built.**
[0002](adr/0002-overall-architecture.md) fixes a functional core inside an
imperative shell, three parts, and the directory layout that goes with them.
**The three directories exist now and hold nothing**, which #69 created and
0002 §7 fixes; what goes in them is still work that needs a ticket rather than a
side effect of reading the record.

**0002 §2 now says what a type-only import is**, which is the first thing the
architecture record has had to settle about a language rather than about parts.
The View makes no **value** import from this project and may write a whole
`import type { … } from …` statement to name the world's type — permitted
because TypeScript erases such a statement from the emitted JavaScript, so the
file the browser loads imports nothing and the direction holds where it runs.
The inline `import { type World }` form is refused, which keeps the check
reading statements rather than specifiers. 0002 A2 carries it, authorized on
2026-08-05 against [#120](https://github.com/nanatsusaya/dot-panic/issues/120),
and [#93](https://github.com/nanatsusaya/dot-panic/issues/93) cites it.
**No ticket owns the command that would decide it.** §2 says one can, and the
purity test [#92](https://github.com/nanatsusaya/dot-panic/issues/92) plans is a
different command — it reads `core/` for fifteen names, not `view/` for imports.

**The page's language is decided, in the seventeenth record.**
[0017](adr/0017-the-pages-language.md) puts the page in English, keeps
`Impressum` on the control 0014 §6 requires and on the heading it opens, gives
the document `lang="en"` and that one word `lang="de"`, and puts the canonical
copy in the page source so that tickets cite it rather than restate it.
**The German word is not decoration.** 0014 §6 makes the control's label the
whole of whether a person finds the imprint and takes that reading from 0004
§10, so tidying it into English would remove a piece of what 0004 §1 asks for.
[#77](https://github.com/nanatsusaya/dot-panic/issues/77),
[#95](https://github.com/nanatsusaya/dot-panic/issues/95) and
[#96](https://github.com/nanatsusaya/dot-panic/issues/96) cite it now. **`lang`
is on neither of 0004 §10's accessibility lists**, and 0017 says so in its
*Consequences* rather than quietly filling a gap in another record.

**How the work gets built is decided as well, and nothing has been built under
it.** [0012](adr/0012-how-software-gets-developed.md) fixes seven phases running
from adoption to maintenance, of which the analysis phase — the one this project
has been in for its whole life — still has no end condition; test-first in the
Core without exception; watch-first in the View, where no command can decide;
and at most three changes open for review at once.

**A1 is what made it seven, and it reversed nothing the record had decided.**
Adoption is history given a number, a breakdown into epics is new work between
the records and the first increment, delivery is split so that §2's first
increment has a row of its own, and the two phases at the end are named without
being decided. **The word *epic* enters the project with it** — a named group of
tickets, grouping by subject and nothing else, never the thing a change is made
against. The recommendation had been against all of it, on A3's *do not build for
a scale you do not have*; A1 records that and what overruled it. **The two end
phases now have a record**, [0016](adr/0016-maintainability-and-maintenance.md),
which is where their content goes and why A1 was allowed to name them and
nothing more.

**A2 widened that word on 2026-08-03**, and it is the first amendment this
project made to hold something it was already doing. An epic now groups one
recognizable piece of **work** — a part of the toy, or a bounded effort beside
it — because the audit corrections belong together and build nothing, and
carrying them on an ordinary ticket would have been an epic without the label.
The cost is that the label no longer tells a reader an epic is product work; an
epic's members have to say what they are.

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

**What runs the code is decided, and it is installed now.**
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
coverage itself. What it does not do is prove anything: 90 percent is reachable
by tests that assert nothing, and the record says so — and it hands
[0002](adr/0002-overall-architecture.md) §5 no enforcement either, which is what
A1 corrected and what this file claimed with it.

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
most exposed to, fifteen records in with nothing on a screen. **The cost is
chosen rather than overlooked:** the public URL will serve a poor toy for a
while, and it is the artifact most likely to be judged without the records beside
it.

**Where the Core comes from is decided, and it was already decided before the
record asked.** [0013](adr/0013-origin-of-the-core.md) writes the simulation in
this repository. A package reaches a browser by three routes and accepted
records had closed all of them: 0003 §2 and §5 the runtime import, 0009 §3 and
§5 the bundle, and **0012 §4 the last one** — test-first without exception
cannot be satisfied by code that arrives already written, so copying source into
`core/` costs an amendment to 0012 and a second one to 0004 §12. The option had
shrunk to one route before the record began.

**That makes the package survey irrelevant rather than decisive**, and its §4
says so instead of leaning on it. The metadata was re-read from the registry on
2026-08-02 and one number in it was wrong; **no package's source has ever been
read**, so the older claim that none of them addresses 0006 §2, §3 and §6 is an
expectation and not a finding. Its §6 generalizes the answer to everything that
enters the Core, because the routes are about code rather than about boids —
which closes a later spatial index to a proven implementation, and that cost
falls on whoever writes it.

**Reading someone else's implementation is allowed; copying it is not.** §7 and
R1: nothing is copied, and anything actually consulted is named in the ticket
that produced the code. The clean-room alternative was rejected because nothing
can check either rule, and an obligation that leaves a trace beats a prohibition
nobody can enforce — at the price of a sentence this project can no longer use,
which R1 keeps rather than argues away. **Its §8 counts the cost:** provenance
and both halves of §7 are decided by no command, so 0011 §6's shrinking set of
remembered rules gains a fourth.

**What happens after everything above is built is decided, and most of the
answer is *nothing*.** [0016](adr/0016-maintainability-and-maintenance.md)
maintains nothing operational — no monitoring, no uptime target, nobody on
call — and names four kinds of work that count as maintenance and no others: a
dated commitment coming due, a defect on the live page, a platform change
breaking it, and a release of the method this project demonstrates.
**Everything else is not maintenance and is not done**, which closes polish,
refactors and rewrites the way 0001 §5 already closed features. Its §5 turns
0011 §6's shrinking set of rules no command decides into a routing table, which
is a more useful thing than a count.

**Its two hardest answers came from the decider, and both widen the record.**
The project **does not end**: this repository is the demonstration, so it stays
visible for as long as the method points at it, and a larger release of the
method brings the toy and its records up to date and not only the five
procedure copies. And a platform change is repaired **whenever it is noticed,
for as long as the page is up**, with nothing watching for it, because §1
creates no monitoring. **What that promises is attention, not uptime** — the
only one of the two a single person can keep.

**The list its §2 decides exists now.**
[docs/maintenance.md](maintenance.md) carries every commitment that depends on
time, one row each, pointing at the record that owns it, so `/moin` step 5 and
`/feierabend` step 4 have an object for the first time. **The list decides
nothing**; a row that disagrees with the record it names is wrong by
construction.

**Writing it split the rows two standing and two dated, not three and one**, and
#69 has since added a third dated row. 0016's *Context* counts three commitments
that move with time, but §3 splits on whether a **date** makes a row due — so
which browser features are Baseline widely available stayed standing, and
calling it dated would have meant inventing the review interval §3 refuses for
the standing row it names. **That row and the new one are the same floor at two
grains**: 0001 §3.4's ECMAScript half now has a compiler setting with a version
in it and therefore a date, 2028-05-11, while the DOM half has no version
anywhere and stays a person reading. **One dated row still carries no date at
all**: no slowdown factor has been chosen, because nothing has been measured.

**Seventeen decisions stand in [docs/adr/](adr/README.md), and all seventeen
are Accepted.** There is no `Planned` row left, which has not been true
before — and it says nothing about what exists: every area on the scale at the
end of this file is `decided` and none is `built`. Which record answers what is
the index's to say, and enumerating them here would be a second copy of it.
**The table runs by meaning and not by number**, and five numbers have a
history it carries rather than this file: 0012 was reserved as unused until
2026-08-02, and 0014, 0015, 0016 and 0017 were all added after the set was
planned.

What is awaiting review is not repeated here. The
[pull request list](https://github.com/nanatsusaya/dot-panic/pulls) is the
authority for that, and a copy of it in this file would be wrong within a day.
Parked branches **are** named here, because nothing else announces them.
There are none.

## What the tickets hold

**How many issues are open is the tracker's to say, and this file has stopped
counting.** The last count written here merged wrong — thirty-two, against a
tracker that held thirty-three — and a number a command settles in a second has
no business being prose that goes stale;
[#131](https://github.com/nanatsusaya/dot-panic/issues/131) carries the lesson.
What belongs here is where the volume came from: eight issues became four epics
and twenty-one tickets when 0012 §1's phase 3 ran on 2026-08-02,
[#114](https://github.com/nanatsusaya/dot-panic/issues/114) came from reading
the operating rules rather than from the breakdown, and a meta-audit of this
project added a fifth epic on 2026-08-03 —
[#117](https://github.com/nanatsusaya/dot-panic/issues/117) — holding its
correction tickets, with the audits attached to it.

**This file no longer lists every ticket, and it no longer says which of them are
ready.** An epic is the authority for its own members, which is what 0012 §7
makes it, so restating twenty-one rows here would duplicate a list that has a
home — and readiness is the ticket's own header's, which is what
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) settled. What is left
is why each row exists, which nothing else here says.

| Epic | Holds | Why it exists |
|---|---|---|
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | 9 tickets | 0012 §2 makes it the first increment, and 0011 §7 puts the first deployment here |
| [#87](https://github.com/nanatsusaya/dot-panic/issues/87) The flock's motion | 6 tickets | 0006's motion rules, cut one per ticket |
| [#88](https://github.com/nanatsusaya/dot-panic/issues/88) The pointer | 3 tickets | 0007's input model — the toy's one interaction |
| [#89](https://github.com/nanatsusaya/dot-panic/issues/89) The finished page | 3 tickets | 0005's rendering, plus the palette and the dot count no record fixes |
| [#117](https://github.com/nanatsusaya/dot-panic/issues/117) The meta-audit corrections | 19 tickets | the 2026-08-03 audits' findings; it builds nothing, which is what 0012 A2 widened *epic* to allow |

Outside the epics:

| Ticket | Why it exists |
|---|---|
| [#71](https://github.com/nanatsusaya/dot-panic/issues/71) The check chain as commands | 0009 §8's four checks, as commands a person can run |
| [#77](https://github.com/nanatsusaya/dot-panic/issues/77) The hosting notice 0011 §4 puts beside the imprint | the host logs the visitor's IP address, and the page says so inside 0014 §4's dialog |

**[#90](https://github.com/nanatsusaya/dot-panic/issues/90) is the one thing
nobody here can work, and it stops the URL rather than the code.** 0004 R2 makes
a real address a precondition of publishing and 0011 §6 turns that into a check
over the built artifact, so the first increment can be finished and cannot be
deployed until the decider supplies one. It is the only hand-off in the whole
breakdown — and it is a **member of #13** rather than a row here, decided on
2026-08-05: that epic's prose already called it the single hand-off in the whole
epic while its table left it out, and 0012 §7 makes the table the authority.

**What phase 3 deliberately did not do is establish readiness.** 0012 §6 puts
that at the moment a set is brought to Definition of Ready **together**, every
time, and says phase 3 is not that. So every ticket below carries a header
saying what it waits on, and none of them has been through the activity that
opens a sprint.

**Definition of Ready now says that itself**, which it did not.
[The ticket template](../.github/ISSUE_TEMPLATE/task.md) named three conditions,
all of them about one ticket, so a header reading *waits on #91* satisfied Ready
as written — the gap an outside audit read as *the sprint can never open*. Three
more conditions are there now, by reference to 0012 §2 and §6 rather than
restating them: blockers cleared or sequenced, the numbers the records defer
fixed in the ticket, and independence and order settled for the whole set at
once. **The sixth is the one no ticket can acquire by being edited**, which is
what makes the activity an activity.

**The ticket that held research no longer has to.** #12 carried a survey of four
npm packages so that it would not be lost with the session that produced it, and
that was the last thing in this project living only in the tracker. 0013 §4 has
it now — re-read from the registry, one number corrected, and recorded as
something that did **not** decide the record it sits in.

**The ticket gap is closed.** Every planned decision has one. Five were filed on
2026-08-02 — 0008, 0009, 0010, 0011 and the repository notes — because the four
records written so far were each written against one, and the next would have
been the first without. 0005's was written alongside its record rather than ahead
of it, and closed with it. **No row added since then has opened the gap again:**
[#49](https://github.com/nanatsusaya/dot-panic/issues/49) for 0014,
[#53](https://github.com/nanatsusaya/dot-panic/issues/53) for 0015 and
[#83](https://github.com/nanatsusaya/dot-panic/issues/83) for 0016 were each
filed in the same change that added the row, because a planned row without a
ticket is the state those five were filed to end.

**This section used to count how many tickets a record had asked for, and that
number has stopped being informative.** It was five of eight. After the
breakdown it is essentially all of them: every ticket phase 3 produced was cut
from an accepted record and cites the sections it serves. What is worth naming
now is the other direction — the tickets **no record asked for**. Two were
noticed in passing: [#46](https://github.com/nanatsusaya/dot-panic/issues/46)
came from this table drifting twice within an hour, and
[#114](https://github.com/nanatsusaya/dot-panic/issues/114) from reading
CLAUDE.md at the end of the session that produced the breakdown. The audits of
2026-08-03 added sixteen more under
[#117](https://github.com/nanatsusaya/dot-panic/issues/117). All of them are
defects in how this project describes itself, which is what looking at it from
outside tends to find — and one of the sixteen,
[#134](https://github.com/nanatsusaya/dot-panic/issues/134), exists because
three readers misread one section three different ways.

**#69 grew a requirement it was not filed with, and it shipped with it**: 0010
§7 put the coverage floor and its two exclusions in `bunfig.toml`, so that file
carries a number as well as a toolchain. The breakdown caught the gap; the floor
is in place and was watched failing a run at 18.18 percent, which is how a
threshold is shown to be more than a line.

**None of it started by existing**, and the analysis phase is what ended
instead. 0012 §1 gave that phase no end condition and put leaving it in the
decider's judgment rather than in a record being Accepted or a ticket being
written — and on 2026-08-05 he named #69.

**The tables above used to restate what the tickets already say**, and
[#46](https://github.com/nanatsusaya/dot-panic/issues/46) is what took the column
out. What that ticket had underneath it was real — the tracker is outside this
repository, so a session reading only this file would lose the picture — and the
answer keeps the tables and drops the one column that had a home elsewhere.
**Neither side was the reliable one.** Both were wrong about #10 and #11 on
2026-08-02; on 2026-08-05 the ticket was wrong and this file was right. So the
template names an authority and states that it drifts, rather than promising a
freshness nothing can enforce.

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

**0004 §2's two files exist now**, and they are in
[`.github/`](../.github/) rather than at the root. GitHub recognizes a
community health file in the root, in `docs/` or in `.github/`, so the choice
is free — and putting them where the issue and pull request templates already
live keeps the root at the four things a reader of this project came for.
Neither file carries a postal address or reads as an imprint, which 0004 §2
decided the repository does not hold.

**The security note says what is here to attack, and today the answer is
nothing.** It points at [0003](adr/0003-security-and-privacy-by-design.md)
rather than restating it, names the three consequences a reader would otherwise
have to infer — no supply chain in the shipped page, nothing recorded about
anybody, no server and no credential — and promises **no response time**,
because one person reads that mailbox. Private vulnerability reporting was
confirmed enabled before the file named it, so the route it gives is real
rather than assumed.

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

**The bar beside it now has one authority too.** *Correct, complete and safe, or
name the specific uncertainty* was in CLAUDE.md's *Delivery* and in
`/feierabend` step 2, where the copy introduced itself as something the
procedure **adds** — which is how it survived three merged changes that each
named it. CLAUDE.md keeps it, because it governs every hand-back and not only a
wind-down, and [#128](https://github.com/nanatsusaya/dot-panic/issues/128) is
what closed it. **It is the seventh adaptation of the copied procedures**, and
[`.claude/skills/README.md`](../.claude/skills/README.md) carries it, because
that list is what a later comparison against the plugin must not overwrite.

What a change description must contain is no longer among the gaps here.
[The pull request template](../.github/pull_request_template.md) fixes it.

## The single clearest next step

**[#71](https://github.com/nanatsusaya/dot-panic/issues/71) — 0009 §8's four
checks, as commands a person can run.** It is the last piece of the toolchain and
the only one left whose absence is felt every session: the four exist as a
description in a record, and what invokes them is remembered rather than written.
§8 fixes that there are four, what each decides, and that **none of them runs
inside a pipeline** — a rule this project has been caught by twice, most recently
while working #70. Its own ticket also carries the note that 0009 §9's row over
the emitted tree cannot be checked until a build has run.

**[#132](https://github.com/nanatsusaya/dot-panic/issues/132) is the other thing
now open, and the order between them is the decider's.** 0012 §2 makes a sprint
a set of tickets brought to Definition of Ready **together** and §6 puts their
independence at that same moment; that activity has never run, and it is what
stands between here and [#91](https://github.com/nanatsusaya/dot-panic/issues/91)
writing the first Core file. The argument for #71 first is that it is small and
finishes the toolchain, so the first code arrives into a chain that can check it.
The argument for #132 first is 0001 §6.2 — *the toy is never finished because the
process ate the work* — and it gets stronger with every ticket spent on tools.

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

**The simulation core moves to `decided`, and with it every row on this scale
is there.** It was held on `planned` because the core is two records — 0006
decides the rules it runs, and [0013](adr/0013-origin-of-the-core.md) owned where
the code comes from. Both exist now.

**Five areas at `decided` and one at `built` is the first time this table has not
read as the warning it was made to carry.** Six at `decided` and none at `built`
is exactly 0001 §6.2 — a project that has decided everything and made nothing —
and it is why 0011 §7 puts the first deployment at the walking skeleton rather
than at *good enough*. **One row moving is not the end of that exposure**, since
the row that moved runs no simulation and appears on no screen.
[#13](https://github.com/nanatsusaya/dot-panic/issues/13) is what moves the rest,
and it moves several at once.

**Pointer handling moves for the same reason rendering did**, and one thing it
leaves open is not part of it: 0007 §8's requirement that the imprint stay
reachable on touch is 0014's, and 0014 arranges the page rather than deciding the
input model. The model itself is one record and that record is Accepted.

**Page layout is a new row, not a moved one.** It was not an area on this scale
until a record owned it, and 0014 is the whole of that question the way 0005 is
for rendering. 0015 has since decided that nothing joins what 0014 put in the
dialog, which leaves this row exactly where it was.

**Toolchain moves to `built`, and it is the first row ever to leave `decided`.**
`package.json`, `tsconfig.json` and `bunfig.toml` exist, the three dependencies
are installed and pinned, and each claim was exercised rather than assumed:
`tsc` emitted one `.js` beside each `.ts` in place, `bun test` failed a test for
a real reason and then passed it, and the coverage floor failed a run at 18.18
percent with every test green. **The third word in this scale's definition of
`built` is *watched*, and here it is empty by the record's own decision** —
0009 §9 says nothing it decides appears on a screen, and calls that emptiness
deliberate. It is the only row for which that can be true.

**What `built` does not mean here is that the chain is green.** Two of 0009 §8's
four checks end on having nothing to read, because the three directories are
empty; [#91](https://github.com/nanatsusaya/dot-panic/issues/91) is what gives
them something. **Biome's is the one that passes**, and on five JSON files
rather than on any code.

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
floor is a line in `bunfig.toml`, and it arrived with
[#69](https://github.com/nanatsusaya/dot-panic/issues/69).

**Deployment moves to `decided`**, which is the ordinary move: 0011 is the whole
of that question the way 0005 is for rendering. *Decided* here means there is no
workflow file and nothing has ever been deployed. What moves it again is
[#13](https://github.com/nanatsusaya/dot-panic/issues/13) — 0011 §7 fixes the
first deployment at the walking skeleton, which is also the first time any row on
this scale reaches `live`.

| Area | Stage |
|---|---|
| Toolchain | `built` |
| Simulation core | `decided` |
| Rendering | `decided` |
| Pointer handling | `decided` |
| Page layout | `decided` |
| Deployment | `decided` |

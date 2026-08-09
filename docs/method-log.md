# Method log

*Why the way we work here looks the way it does.* Not a progress log and not a
decision log. An entry earns its place only if an agent with no memory of that
session would decide worse without it.

Newest first.

## 2026-08-09 — A broken measurement of structure reads as an absence of structure

**Everything here so far has run one direction: a watch decides what no command
can.** The amendment recorded directly below is that, and so is the rule in
CLAUDE.md that anything touching motion is verified by watching it. **This is the
other direction**, and it turns out to be the one that is easy to get wrong.

A minute of the running page was recorded as 300 images and the dot centers were
pulled back out of them, so that the thing being watched and the thing being
measured would for once be the same thing. The first run reported the settled
flock at a Clark-Evans index of **1.0** and a hexatic order of **0.29** — a
random scatter, on both measures, which is the opposite of what the images
plainly show. The cause was worth nothing: the extraction wrote decimals with a
comma into a comma-separated file, so every column shifted by one.

**What is worth something is the shape of the failure.** Garbling coordinates
produces a random point set, and a random point set is exactly what a measure of
order is built to report as *no order*. So a corrupted run of one does not look
corrupted. It lands on the textbook value — 1.0 is the Clark-Evans index of a
random scatter, to two digits — and it lands there **more convincingly than a
correct run would**, because a correct run of anything real is never quite that
round.

**A number was about to be written down.** It was going into a comment on
[#216](https://github.com/nanatsusaya/dot-panic/issues/216), whose whole premise
is that the settled flock is *too* ordered and that the numbers in its table are
the lever for it. *The flock is a random scatter* would have reversed that
premise, in the artifact the next session reads before retuning anything. What
stopped it was not a check and could not have been: throwaway measurement tooling
lives outside this repository, so no test covers it, no review sees it, and the
four checks never run against it. **What stopped it was having looked at the
pictures first, and refusing to publish a number that disagreed with them.**

**The repair is a positive control, and it is cheap.** The same functions were
run against the Core over five seeds, which read 2.00 to 2.08 where the page read
2.09, and the random baseline was *computed* — 200 dots scattered over the same
disc — rather than quoted as 1.0. Both had to be there. The Core run says the
pipeline can find order that is known to exist; the computed baseline says how
much of the reading is the bounded region flattering it, which turned out to be
four percent. Quoting 1.0 from a textbook instead would have made the corrupted
run agree with its own control.

**So: give a new measurement something whose answer is already known, before
giving it the question.** Especially a measurement whose interesting answer is a
negative one — no order, no difference, no effect — because that is the answer
every way of breaking it produces.

## 2026-08-09 — The first record amended because what it decided was built, passed everything, and was wrong

**[0006](adr/0006-motion-rules.md) A1 is the first amendment here caused by
looking at the thing rather than by reading about it.**
[#99](https://github.com/nanatsusaya/dot-panic/issues/99) implemented §1's three
behaviors over one neighborhood radius. Every invariant in §10 held, seventy tests
passed, all four checks were green — and the decider watched it and reported
particles keeping their distance rather than a flock. The record was wrong, and
nothing this project runs was ever going to say so.

**That much is 0001 §3.1 working as designed.** The entry worth keeping is what
came after it, because the obvious response was the wrong one.

**A watch that fails does not say whether the numbers are wrong or the record
is**, and those have opposite routes: a number is
[#216](https://github.com/nanatsusaya/dot-panic/issues/216)'s and needs no record
at all, while a structure is an amendment on the stop-and-ask list. The first
instinct was to retune, and retuning could not have worked: a sweep showed two
regimes and nothing between them, because over one reach separation and cohesion
balance at a spacing fixed by their weights alone. **What told the two apart was a
measurement rather than a judgment** — and the measurement was worth making
precisely because the answer decided which procedure to follow.

**Then the fix was measured before it was recorded, not after.** A1 was written
after a two-radius sweep, against a Core copied out of the repository and mutated
there. The previous failure had come from choosing a shape and checking it
afterwards; writing an accepted record and then finding out is the same mistake
with a worse artifact, because a record is immutable and a branch is not.

**And a green suite after a behavior change is not the suite you had.** Mutating
the code found an assertion that had gone quiet: the containment run used to
redden when the hold on separation was removed, and after the change it did not,
because the world it runs on had moved out from under it. That is the 2026-08-08
entry's question asked of a test that already existed rather than of a new one,
and it is the reason to re-run the mutations after a change and not only after
writing a test.

**What this costs to say plainly: the check chain cannot see a wrong decision.**
It sees a wrong implementation of whatever was decided. Four green checks meant
the Core did exactly what 0006 §1 said, and 0006 §1 was the defect.

## 2026-08-09 — A watch that cannot be judged yet is deferred by name, not skipped

**Three changes here merged with a *Watched and seen* criterion nobody had met** —
[#94](https://github.com/nanatsusaya/dot-panic/issues/94)'s smoothness,
[#109](https://github.com/nanatsusaya/dot-panic/issues/109)'s palettes and
[#96](https://github.com/nanatsusaya/dot-panic/issues/96)'s dialog. Two were met
afterwards by a comment on the merged pull request; one is still open. **It is not
carelessness.** The definition of done asks for the watch and CLAUDE.md asks for it
of anything touching motion, so an author holding a criterion that is not yet
judgeable is choosing between merging without it and stopping.

**There is a third option, and the sprint over
[#87](https://github.com/nanatsusaya/dot-panic/issues/87) used it.**
[#100](https://github.com/nanatsusaya/dot-panic/issues/100)'s *nothing parks,
nothing shoots* needs a force that varies a speed;
[#103](https://github.com/nanatsusaya/dot-panic/issues/103)'s frame criteria need
that force capped. Neither could be judged at its own merge. Both named
[#101](https://github.com/nanatsusaya/dot-panic/issues/101) inside their own scope
as the ticket that makes them judgeable, both merged saying so, and one sitting on
2026-08-09 discharged all three.

**What makes it a deferral rather than a skip is that it is named in both
directions.** The waiting ticket says which ticket it waits on, the receiving
ticket's scope says whose criteria it is carrying, and the sitting's evidence names
all three. A watch pushed forward without a named receiver is a watch nobody owes,
which is what the three above turned out to be.

**It costs one thing, and the cost is worth writing down.** Three scopes closed on
one person's *sieht gut aus*, so the evidence is a single judgment covering three
tickets rather than three judgments. That is the reading #109 already established —
the criterion met, and not its falsifiers separately checked — and it is the price
of judging a thing when it becomes judgeable instead of when its ticket happens to
merge.

## 2026-08-08 — The questions were asked before the branch existed

**An open question in a pull request is answered in a window minutes wide**, and
[agent-project-rules#22](https://github.com/nanatsusaya/agent-project-rules/issues/22)
carries the measurement. The obvious repair is a better pointer line in the
description. It is not the repair.

**The sprint over [#87](https://github.com/nanatsusaya/dot-panic/issues/87) was
opened with the questions asked first.** 0012 §2 puts an activity at the start of
a sprint and §6 gives it one job — establishing independence, which is a property
of a set rather than of any one ticket. Working five tickets through it surfaced
eight decisions belonging to the decider, all eight answered before a branch
existed. [PR #218](https://github.com/nanatsusaya/dot-panic/pull/218), the first
of the five, carries no *Open questions* section at all, and three of the eight
are load-bearing in it.

**They were discoverable there because that is where the set is read.** Whether
0006 §3's speed band is a force or a constraint on the result, whether the world
`createWorld` returns has to satisfy the positional rules itself, what the order
is and what fixes it — none of those is a question about one ticket. Each came
out of holding five against each other, which is exactly what §6's activity makes
somebody do.

**One answer invalidated the plan, and that is the finding rather than the
count.** The recommended order put
[#101](https://github.com/nanatsusaya/dot-panic/issues/101) second; the answer to
`O3` — the bound is on the steering forces, and the band is a result-constraint —
took its subject away, because a ticket bounding change has nothing to bound
before something changes a velocity. Asking cost a sentence. Building it would
have cost a branch that could not produce a failing test, which is where 0012 §4
would have stopped it.

**This makes no rule, and none of it is checked.** §6 names one job for that
activity and this is not it; the ticket template names six Ready conditions and
this is not one. The habit is the whole of it: while establishing independence,
ask what else the set decides, and put those to the decider in the same sitting.
A question only the implementation can raise still belongs in the pull request —
most of these were not that kind.

## 2026-08-08 — The post-mortem is written in the medium that caused the accident

**The entry below says a warning has to be somewhere the author looks. It was
written into commit messages that carried the accident with them**, and
[#185](https://github.com/nanatsusaya/dot-panic/issues/185) shut a second time
one second after those commits reached the trunk.

**A linking keyword is read in a commit message, and this project knew only the
half about descriptions.** GitHub names both places in one sentence, and the
warning kept here names one of them. So the change describing the first
accident quoted the sentence that caused it — which a post-mortem has to do,
because paraphrasing the evidence is how a record stops being one — and the
parser read the quotation exactly like the original.

**The general form is not about this parser.** *A rule learned from an incident
has to survive being written down*, and it often has to survive being written
down **in the medium that caused the incident**: a post-mortem of a bad commit
message is a commit message, of a bad description is a description, of a bad
migration is a migration. The moment to ask is while writing the record, not
after — does the artifact I am about to write do the thing it describes?

**What that costs here is one habit.** Never place a keyword immediately before
a `#`-reference, in a quotation or otherwise; write the number apart from the
word. CLAUDE.md's *Delivery* carries it, because that is where an agent looks,
and this entry does not restate what it says.

**The state was right by accident, which is the part to distrust.** #185's scope
was met by that same merge, so the ticket was correctly closed by a mechanism
that had no idea what it was doing. A wrong outcome would have been cheaper: it
would have been noticed by somebody other than the author reading a timestamp.

## 2026-08-08 — A warning nobody reads is a warning nobody has

**[The pull request template](../.github/pull_request_template.md) carries a
warning about closing keywords**, written here after
[#83](https://github.com/nanatsusaya/dot-panic/issues/83) was closed by accident
twice in one evening. It says, in those words, that the parser does not read a
negation: *this does not close #NN* closes it.

**[PR #205](https://github.com/nanatsusaya/dot-panic/pull/205) wrote
`Nothing here closes #185`**, and closed
[#185](https://github.com/nanatsusaya/dot-panic/issues/185). The ticket whose
whole subject is careless mechanics around merged pull requests was closed with
none of its scope done, by the sentence written to say it had not been.

**The warning is in an HTML comment in the template.** That is the right place
for the shape of a description — CLAUDE.md says so and calls it *the form an
author actually sees*. **An agent creating a pull request does not see it.**
`gh pr create --body-file` never opens the template, never renders the comment
and never passes the text through anything that would show it. So the rule holds
for a person typing in a browser and reaches nobody else, which is not a
weakness of the rule.

**Two things follow, and only the first is cheap.** A prohibition an author
cannot encounter belongs where the author does look — for an agent that is
CLAUDE.md, and for a human it is still the template. And **the general form is
worth more than this instance**: every warning this project keeps in a template
comment should be asked the same question, *who opens the file this lives in?*

**The window is the other half.** #205's author had no way to know it would
matter, but the same afternoon a session edited a merged description four minutes
after the merge, and #168 is a third instance. All three are the same shape: the
world moved while work was going on, and nothing re-read it before writing. That
is what CLAUDE.md's new *Delivery* bullet says out loud rather than leaving to
the template.

## 2026-08-08 — Two verifications that would have passed either way

**A check whose result does not depend on the thing it checks looks exactly like
one that does.** Two arrived in consecutive tickets, and neither was noticed by
writing it.

[#92](https://github.com/nanatsusaya/dot-panic/issues/92)'s purity test reads
`core/` and fails on any of 0002 §3's fifteen names. Pointed at a directory that
matches nothing it reports nothing and passes — for ever, silently, and printing
the same green line as a clean Core. What caught it was a second assertion that
the scan had read anything at all, and then making that one fail: with the glob
changed to `**/*.tsx`, the purity assertion **passed over zero files**.

[#96](https://github.com/nanatsusaya/dot-panic/issues/96) had to show that
everything outside a modal dialog is inert, which is what 0008 §10 leans on. The
first attempt called `motion.click()` from the console, watched the label change,
and read that as inertness broken. **A scripted click is not what inertness
stops.** It removes an element from hit-testing and from focus;
`element.click()` dispatches straight at the element and asks neither. The real
click, through the coordinates a person would use, left the label alone.

**The two are the same mistake from opposite sides.** One would have passed while
the property was false; the other failed while the property was true. Both were
verifications whose outcome was independent of what they claimed to decide.

**One question finds both, and it is cheap: what would this report if the
property were false?** If the answer is *the same thing*, it is decoration. That
question is the only thing that caught either of these, and it belongs before
believing a green result rather than after a session has been built on one.

**It costs an assertion that looks redundant.** *The scan read something* reads
as ceremony beside *the scan found nothing forbidden*, and it is the one of the
two that can fail for a reason worth knowing.

## 2026-08-06 — When the agent cannot watch, the decider watches

The entry below says the session's browser pane composites nothing and that
measuring is not watching. It leaves the question it raises unanswered: how
anything here is ever watched at all.
[#108](https://github.com/nanatsusaya/dot-panic/issues/108) answered it by
handing the looking over. The page was served from disk on a local port, **the
decider opened it in his own browser**, and three states came back as
screenshots — the full window, the same window at 200 percent, and one dragged to
a third of its width. The change's *Watched* section is read from those and says
whose eyes they are.

**What that bought was not confirmation.** The three states closed the criterion,
and one of them produced a question no criterion had asked: the dots do not grow
when the page is zoomed. That is correct, deliberate, and was written down
nowhere — now [#191](https://github.com/nanatsusaya/dot-panic/issues/191). A
measurement would have agreed with the code and asked nothing.

**The cost is that watching is synchronous with one person.** A change whose
criterion is visual cannot be finished while he is away, and the tempting way out
is a *Watched* section written from a measurement, which reads identically and is
not the same claim. Name whose eyes, or say the criterion is open.

## 2026-08-06 — When the instrument cannot watch, say so and supply the clock

The first change that moved anything could not be watched. The browser pane the
session had reported `visibilityState: "hidden"` for its whole life and
composited no frames, so **`requestAnimationFrame` never fired once** and a
screenshot failed outright. A loop that runs on that callback does nothing at
all under those conditions.

**It looked like a defect three times before it was understood.** The canvas
read back 0×0, then read back fully transparent, then a hand-rolled
`requestAnimationFrame` probe returned zero calls — each of which has an obvious
wrong reading, and the first two were nearly written down as findings about the
code.

**What worked was to supply the clock.** The shipped module was imported into
the loaded page with `requestAnimationFrame` replaced by a collector, and its
callback then called with timestamps chosen for the case: sixty at 16.7 ms for
ordinary motion, one 60-second jump for the catch-up cap, and a faked
`matchMedia` for the reduced-motion branch. The canvas was read back with
`getImageData` after each. That decided the loop's arithmetic exactly — a
60-second gap advances the flock three pixels rather than four thousand — on the
file that ships rather than on a copy of its logic.

**The entry is here for the boundary, not the technique.** Driving a loop with a
supplied clock is measuring, which [0010](adr/0010-testing-strategy.md) §1 keeps
distinct from watching for a reason: none of it says whether the motion is
smooth, and *it reads as a flock* is the thing this project exists to get right.
A session that mistakes the one for the other has a green report and an unseen
page. Say which of the two happened.

## 2026-08-05 — The failing test is its own commit

[0012](adr/0012-how-software-gets-developed.md) §4 requires every rule of the
simulation to be written as a failing test before it is written as code, and
that record's own *Consequences* say of its neighbor §5 that nothing checks
whether the expectation came first, *"and the difference is invisible in the
result"*. §4 sits in exactly that position. A change arriving with its tests and
its code together is indistinguishable from one that wrote the tests afterward
to match what was built.

**So the first Core change split them**: one commit carrying four red test files
and nothing else, then one carrying the code that turns them green. The commit
sequence is the only trace the rule can leave, and it costs one `git commit`.

**It is evidence and not a check**, which is the part worth not overstating.
Nothing enforces the split, and a session that wanted to could write the tests
last and commit them first. What it buys is that the honest case leaves a
record, where before it left none.

## 2026-08-05 — What a project adds is not what it adapts

The first `/passtdas` run existed to answer one question: whether this week's
additions — seven phases, epics, a third label, a cap on open changes — had to
be declared in `method.json` as adaptations. They did not, and the boundary is
worth one entry because the question is cheap to ask and the wrong answer is
expensive.

**An adaptation is a catalog rule narrowed, replaced, dropped or deferred.
Nothing else is one.** The method splits every project into the catalog, which
holds regardless of what the project is, and the project layer, which is
everything true only here — and it expects the second to grow: a project
*gains* rules the catalog does not have, and those belong in the layer rather
than in the declaration. A rule this project invented is therefore not a
deviation to record. `"adaptations": []` is correct, and thirty-two rules in
force with none adapted is the right result rather than an unexamined one.

**The sharp case is the one the decider asked about.** The five procedures
carry German names, and German is not the language everything committed here is
written in. That is not a narrowing of L1 either: L1 has two halves, and the
method puts a skill name on the conversation half rather than the artifact
half — the plugin's own README says so in a section written for it, and its
table supplies these exact five names. What it asks in return is that the
choice does not leak the other way, and it does not: headings, descriptions and
every document stay in the one language everybody reads.

**Two edges, because the next session will find them.** L1's own enumeration
covers a committed identifier, and the document carving the skill name out of
it is not the normative one — so this rests on the method author's published
reading of his own rule rather than on the rule's text. And nothing checks the
condition: the spelling scan compares British and American word pairs, and a
German heading would be in neither list.

Recorded because the other answer is the damaging one. Declaring an adaptation
that is not one costs more than tidiness: `dropped`, `replaced` and `deferred`
each switch a rule's check off, so the tidy-looking declaration would stop
verifying rules that are in force.

## 2026-08-05 — The method was renamed, and the records keep the old name

`agent-driven-development` became
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules) on
2026-08-05, and the check hard-fails on the old value, so following it was not
optional. This repository followed it in every document that may be edited and
left it standing in the five accepted records that carry it — twenty-five
occurrences across 0001, 0003, 0004, 0012 and 0016.

**That is a decision and not an oversight.** A record is immutable, so the two
routes are an amendment or a superseding record, and neither fits: no record
decides anything different under the new name. Five amendments for one string
would be ceremony that corrects nothing, in the artifact this project can least
afford to make look like overhead.

**What holds those links is GitHub's redirect, and it is conditional.** It
survives only while the old name stays free — a new repository under the old
name would break all of them at once, including the ones in documents that may
no longer be edited. The method's own 0.5 changelog says so, which is exactly
why it is written down here: the promise is kept in the other repository, and
this one now depends on it.

The two lines in the 2026-07-31 entry below are left alone for the same kind of
reason. A dated entry records which command worked on that date, and correcting
it would falsify the moment it exists to hold.

Recorded because a session reading the record set will find two names for one
thing, and the readings available are "the rename was left half-done" and "the
records may not be touched". Only one of them is true.

## 2026-08-03 — Two audits agreed, and the agreement was worth nothing

The decider had the project read from outside twice, and then had the two
readings checked against the records rather than against each other. The
instruction that made it work was one sentence: **agreement between the audits is
not evidence; the sources decide.** It earned its place twice in the same
afternoon, in opposite directions.

**Three release blockers dissolved on a fuller read.** One audit found the
imprint model self-contradictory — 0003 §7 forbids a placeholder, 0004 §3
requires one — and the contradiction is not there: 0003 R1 names the *model* it
rejects, which is a permanent stand-in with injection at deploy time, and 0004's
stand-in is temporary with the gate on publishing. The other two went the same
way. Each blocker came from reading a *Decision* section and stopping before the
*Resolved questions* underneath it, where this project keeps the reasoning that
makes a categorical sentence precise.

**One defect survived, and nothing here could have found it.** 0010 §7 claims the
coverage floor gives 0002 §5 its first enforcement, because logic moved out of
the Core *"shrinks the numerator and leaves the denominator alone"*. Coverage is
measured per file over `core/` alone, so lines leaving that directory leave both
— and logic written straight into the Shell is excluded by name and never
measured at all. The claim is persuasive to read and false to compute. The
coherence check passed it, review passed it, the second audit called the record
consistent, and one reader doing the arithmetic did not.

**Two consequences.**

- **A claim about a mechanism is checked by working the mechanism.** The
  operating rules already say to run a command before writing a claim it settles;
  this is the half that has no command. Where a record says *this enforces that*,
  the reviewer's job is to construct the case it forbids and see whether the
  mechanism actually fires. Reading it cannot find this class, and neither can
  another reader agreeing.
- **Read a record's answers before believing its rules conflict.** A decision
  section here states prohibitions flatly on purpose, and the resolved question
  underneath is where the exception, the reason and the rejected alternative
  live. An outside reader who stops at the heading manufactures conflicts that
  cost days — and the cheaper repair may belong on the sentence rather than on
  the reader: three readings of 0003 §7 went wrong three different ways, which is
  evidence about the wording, and
  [#134](https://github.com/nanatsusaya/dot-panic/issues/134) is where that gets
  decided.

**What this says about the audits is not that they were poor.** The one that
raised the three false blockers is also the one that found the arithmetic, and
the one that got the verdict right is the one that testified the broken record
consistent. Breadth and caution came apart, which is the argument for reading
twice from different angles rather than for trusting the reader who agrees with
you.

## 2026-08-03 — A denial of a closing keyword closed the ticket

A pull request that added an index row said, in its own description, that it did
not close the ticket it had created in the same change:

> **This does not close #83, and no keyword in this description does.**

GitHub reads `close #83` and does not read the negation in front of it. The
merge closed #83, and the sentence written to prevent exactly that is what did
it.

**The sentence was right and said the wrong way.** The distinction it drew was
real: that change added the row for a planned record, while #83 is the ticket
for *writing* the record and had nothing done in it. Two earlier tickets here
failed in the opposite direction — #36 and #37 stayed open after their work
merged, because those descriptions named the issue without a keyword. Both come
from one place: a change description is read by a machine as well as by a
person, and only one of the two understands *not*.

**Two consequences.**

- **A closing keyword never appears beside an issue number unless the merge
  should close it** — not in a denial, not in a quotation, not in an explanation
  of what the change is not doing. To mention an issue otherwise, name it with
  no verb in front of it. That is now in
  [the pull request template](../.github/pull_request_template.md), which is the
  authority for what a change description contains.
- **What a change closed is checked after the merge**, not read off the
  description. The tracker is outside this repository and nothing here can fail
  when the two disagree; the issue's own state is the only evidence. This one
  survived overnight because nothing gave the next session a reason to look.

**It happened again while this entry was being written, and that is the more
useful half.** The ticket was reopened, and then a second pull request — the one
bringing the state artifact current — explained the accident in its own
description **by quoting the offending sentence verbatim.** The quotation carries
the keyword. Merging it shut the ticket a second time, two seconds after the
merge, and the change that introduced the rule above merged nineteen seconds
later.

**A rule introduced in one change does not repair a description already open in
another.** Both were open at the same time; writing the rule in one of them did
nothing for the other, and nothing ever will — a description is read at merge
time by a parser that has never seen this repository. So a rule about change
descriptions is only in force for descriptions **written after it**, and the ones
already in review are swept by hand or not at all. The same holds for every rule
this project writes about how a change is described rather than about what is in
it.

## 2026-08-02 — A rule was written down, and the next two records broke it

The afternoon repaired a defect by amendment: two accepted records still pointed
at an `O1` that had become an `R1` when they were accepted. The same change wrote
the rule into [`docs/adr/README.md`](adr/README.md) — an Accepted record contains
no `O`-number, `check-method.mjs` cannot see it, review is what carries it. And
[0008](adr/0008-performance-budget.md) A1 diagnosed the failure exactly: *"Every
other reference to the four questions was migrated at acceptance; these two sat
inside decision sections and were missed."*

**The next two records written did it again — four more times.** Three in
[0015](adr/0015-settings-surface.md), one in [0009](adr/0009-toolchain.md), all in
freshly written prose, all in the same session that had written the rule down
hours earlier. None reached a commit, because a grep was run on purpose. Nothing
failed; nothing would have.

So the entry is not *this defect exists* — it was known, named, repaired and
documented before it recurred. The entry is that **writing it down did nothing**,
and the useful part is what the fix costs:

```
grep -n "O[1-9]" docs/adr/*.md
```

It has a known result, which is what makes it a check rather than a prompt to be
careful. Everything it returns should be a quotation inside an *Amendments*
section, plus the README's own table row. Today that is exactly what it returns.
It is now the first item on `/adr`'s pre-merge list.

**The same shape, in the same session, without a grep to catch it.** The change
description for [#67](https://github.com/nanatsusaya/dot-panic/pull/67) said in
so many words that its next-step section would be false as soon as
[#68](https://github.com/nanatsusaya/dot-panic/pull/68) landed — #68 was open at
the same time and accepted the very record #67 pointed forward to. Both were
merged in that order, and for just under ten minutes the trunk's single clearest
next step named work that was already done. The prediction was accurate, it was
written where the decider would read it, and it prevented nothing.

**A warning in a change description is not a control, and neither is a rule in a
README.** The author's move was available and not taken: a change whose document
a change already in review will falsify should not be opened — it waits, or it is
folded into the one that falsifies it. That half has no command behind it, which
makes it the half to watch.

## 2026-08-02 — A link that resolves is not a fact that is true

Three defects were found in accepted records inside one hour, none of them by a
command:

- Two records pointed at an `O1` that had become an `R1` when they were accepted.
- [0014](adr/0014-page-layout.md) R6 said a question *belongs to 0008*, and 0008
  never took it — a question owned by nobody, in a set where every question has an
  owner by construction.
- 0014 §5 opened the dialog **by a form submission that does not exist**. The HTML
  Standard defines `method="dialog"` as closing the dialog a form sits in.

`check-method.mjs` printed `OK` over all three, correctly. It resolves that a
reference points at something. **It cannot know whether the something says what
the reference claims** — and all three defects live in exactly that gap. A green
check is evidence about links, and this project had been reading it as evidence
about records.

The third one is the instructive one. 0014 cited Baseline status for every
*feature* it used — `<dialog>`, `<details>`, `svh`, container queries — and cited
nothing for the *mechanism* that was supposed to tie them together. It then
argued **for** markup using the backdrop, the focus containment and the `Escape`
key, all of which belong only to a modal dialog, which exists only through the
`showModal()` call the same paragraph forbade. The record refuted itself in four
sentences, and it read as careful because every citation in it was real.

**Two consequences.**

- **Cite the mechanism, not only the features.** *This element is widely
  available* and *this is how the page uses it* are two claims, and the record
  shape asks for a source for the first. The second is where the error was, and it
  is the one a session can only get from the standard. 0014 A1 now cites
  `method="dialog"`, modal dialogs and invoker commands, none of which is a
  feature the page uses — they are the reasons the mechanism is what it is.
- **Amending an accepted record is cheap, and that is the thing to watch.** The
  rule reads as though immutability were friction; in practice one sentence from
  the decider unlocks it, and this afternoon produced three amendments across
  three records. What holds the line is not difficulty but visibility: each one
  quotes the wording it replaces and the authorization that permitted it, in the
  record itself. A later session should read that as neither forbidden nor
  routine — it is ordinary, and it leaves a trail on purpose.

## 2026-08-02 — A record said something was impossible, and one unstated premise made it so

0014's first draft described a scrolling page: canvas, then the control, then the
explanation and the imprint below it in normal flow. Its §4 argued that a page
which never scrolls was not available here — the text has to go somewhere, the
floor device is a phone, and a visitor who enlarges text is using an
accessibility mechanism that no layout may fight.

The decider did not answer the open questions. He described a different page: a
strip carrying a button, and a popup behind it holding the settings, the imprint
and the explanation under collapsible sections.

**The argument was valid and its conclusion was false**, because it rested on a
premise nobody had written down: that the text had to be in the page's flow. Put
it in a dialog that scrolls inside itself and the impossibility is gone — and
0007 §8's `touch-action: none` stops costing anything at all, because a page with
nowhere to scroll to loses nothing by refusing to scroll. The premise was not
defended anywhere in the draft. It was never visible enough to defend.

**Two consequences.**

- **A record that rejects an alternative as impossible names the premise the
  impossibility rests on.** [The record shape](adr/README.md) asks each
  alternative for a one-line *rejected because*, and *it cannot be done* satisfies
  that while giving a reader nothing to push against. A preference stated as a
  constraint reads exactly like a constraint.
  [0014](adr/0014-page-layout.md) §1 names the move that dissolves this one and
  says plainly that an earlier draft concluded the opposite.
- **The window before Accepted is the only place a record's arrangement is cheap
  to change.** This was the first time review replaced the substance of a record
  rather than answering its questions, and it cost one rewrite on the same branch
  because the record was still `Proposed`. After the merge the same change would
  have needed a superseding record, and 0014 would stand permanently as the
  reasoning that got it wrong.

## 2026-08-02 — A recommendation was approved, and part of its reason was false

0007's O1 asked whether the page's layout should get a record of its own. It
recommended yes, and it recommended writing that record **after 0008**, *so it
knows the frame it is arranging*. Daniel approved both at once: *"bei beiden
folgen wir deinen empfehlungen."*

The ordering reason is false. 0008 does not decide the frame — 0002 §2 gives its
size to the Shell, and 0008 decides how many dots move inside it and how fast.
0014's real dependencies were all Accepted the moment 0007 was, so it waits on
nothing and could be written the same day.

The choice was right and the argument for half of it was not. R1 states the
correction in the record, the change under review said so at the top rather than
letting a corrected version land quietly, and the index row is placed by meaning
with a sentence saying it implies no order of writing.

**Two consequences.**

- **An approval attaches to the choice, not to the author's argument for it.** A
  reason found wrong before the change lands is corrected in the resolution and
  named as a correction. Reopening the question would hand back a decision that
  was actually made; leaving the reason standing would preserve a false claim
  about which record decides the frame, in the one place a later session looks to
  find out — and R1 is read by everyone who reads 0014.
- **A recommended default is the only argument in a record that nothing checks.**
  [The record shape](adr/README.md) requires a dependency to name the **section**
  relied on, and every decision section here does — which is what makes a wrong
  dependency claim cheap to catch. Open questions carry no such requirement, and
  the false claim lived exactly in that gap: *so it knows the frame it is
  arranging* names no section, and following it to one is what falsified it.

Whether the shape should require it is not settled here. It is an open question
on the change that carries this entry.

[Answered 2026-08-05, against
[#127](https://github.com/nanatsusaya/dot-panic/issues/127): **no.** The shape is
left alone and this entry is the record. A requirement there would be
unenforceable in exactly the way the existing one is — nothing checks either, and
review catches both — so it would add a line to the shape without adding a
mechanism. The counter-argument above stands as written: this failed because
nothing made the author look up a section. The question was in the description of
[PR #51](https://github.com/nanatsusaya/dot-panic/pull/51) and merged with it, and
nothing carried it anywhere — which is how a question stated in a change survives
a closed change.]

## 2026-08-02 — A status update named a gap the same session then closed

STATUS.md was brought current after 0004 and, being honest about what it found,
recorded a gap: eight of the thirteen planned decisions had no ticket, and every
record between there and a deployed page was among them. The change went into
review.

The next instruction was to close that gap. Five tickets were written, and the
sentence was false within the hour — along with the issue count and a paragraph
naming a missing ticket that now existed. The change merged while the correction
was still being typed, so it merged carrying only the false version. One change
became two, and the second existed only to repair the first.

**Two consequences.**

- **The state artifact is the only document that describes the work being done
  right now.** That is what makes a finding recorded in it worth acting on, and
  it is the same property that lets acting on the finding falsify the record.
  Every other document here describes something that holds still while it is
  written about. So when a status update finds a gap that is cheap to close,
  close it first and let the update describe the closed state. Naming a gap you
  are about to fix buys a second change.
- **A branch is not its pull request.** Pushing a second commit to a branch does
  not add it to a change that has already merged, and nothing warns you — the
  push succeeds and looks ordinary. Check the state of the change, not the state
  of the branch, before believing a commit landed where it was aimed.

**This one was checkable, and nothing checked it.** Unlike the reading error
below, *ten issues are open* is a claim a command settles in a second. The
coherence check does not make it: it reads this repository, and the ticket
tracker is not in it. Worth knowing before a green check is read as covering a
count.

## 2026-08-02 — A rule was read by its wording, and nearly bought an adaptation

The draft of decision 0003 recommended narrowing P1 — *no credential, token, key
or personal datum is ever committed* — by a recorded adaptation. Its argument was
that the rule had never held here: every commit in this repository carries a real
name and a real email address, in the author and in the committer field, since
the first one.

The observation is correct, and it was checked rather than assumed:

```bash
git log --format='%an <%ae> | %cn <%ce>' | sort -u
```

Daniel: *"wir unterschieden doch zwischen zwei verschiedenen dingen."* The person
responsible for a published project is attached to it by name, deliberately.
What is never stored is anything about a **visitor** — an address, a cookie, a
count. Two parties, one word.

P1's stated reason settles it in a line: a pushed secret is **compromised** the
moment it exists in the history. Compromise is the test, and something published
on purpose cannot be compromised by being published. P1 needed no narrowing. It
was never the rule in question.

**Three consequences.**

- **Read a rule by its reason before proposing to change it.** Every rule in the
  catalog carries a *Why*, and the binding line is its lossy short form — it has
  to be short enough to remember. A rule that appears to forbid something absurd
  is far more often a reading error than a rule error.
- **A recorded adaptation is the most expensive way to be wrong.** A2 requires
  one, and it should: an unexplained gap gets helpfully restored by the next
  session. But the permanence cuts both ways. An adaptation reads to every later
  session as considered, and nothing revisits it. A wrong one does not decay back
  into a question — it hardens into how things are done here.
- **Where a rule names a kind of data, ask whose.** P1 says *personal datum* and
  does not say whose. The whole error lives in that gap: an operator's identity
  and a visitor's address are both personal data, and only one of them is what
  the rule protects.

**What found it was not a check.** The coherence check passed on the draft, as it
passes on anything whose links resolve and whose spelling is American — it does
not read an argument. What found it was Daniel reading a recommendation and
refusing its premise, which is what found the drifted failure list as well.

## 2026-08-02 — A number that carries two jobs ran out of room

0012 was planned as a walking-skeleton record, dropped before it was written,
and the index says the number is not reused — with a reason: a number that later
means something different is worse than one that means nothing. It is now in use
for the record that decides how software gets developed here.

The narrow justification holds and Daniel authorized it. That record makes the
walking skeleton a consequence of itself, so 0012 comes to mean the larger frame
the original topic sits inside, rather than something unrelated — which is the
case the index rule guards against.

The part worth keeping is why the question came up at all.

**The number does two jobs.** It is the identity every reference uses, which is
why it must never move. It is also a position in a list the index describes as
running top-down, from what the thing is to how it is built — which makes it a
statement about where a topic belongs. That coupling is invisible while the set
is complete. It becomes load-bearing the moment a topic turns out to be both
important and unforeseen: identity says take the next free number, ordering says
put it near the front, and no number does both.

**This resolution works exactly once.** 0012 was the only gap and there is not
another. Renumbering is not a fallback either: 0002 is Accepted, immutable, and
names six planned numbers at fourteen places, so moving them would falsify a
record that may not be edited.

A later session meeting this again therefore has no cheap option, and the
expensive one is invisible from the index. It will have to decouple the two jobs
— number as identity, index position as meaning — rather than look for a gap.
Written down now, while the reasoning is intact, because at that moment the
obvious move will be to renumber.

**Added the same day.** There was no later session. The decoupling happened
within hours, because taking the gap did not solve the problem: 0012 is a lower
number than 0014 and still sits second-to-last, so the record meant to frame how
everything gets built was filed between *Delivery* and *Origin of the core*. The
index is now ordered by meaning and the number is identity only.

The diagnosis above was right and the conclusion drawn from it was wrong. *A
later session will have to decouple* should have read *we have to decouple now*.
What produced the error is worth more than the correction: **a cheap workaround
was available, and its availability was mistaken for a reason to defer the
expensive fix.** The gap did not make the problem smaller. It made it invisible
for exactly as long as it took to write the record and look at where it had
landed.

## 2026-08-02 — A duplicated fact had already drifted, and no command could find it

The operating rules carried their own ranked list of the ways this project
fails. So does decision 0001, in §6, and that is the authority. The two no
longer matched: three entries against four, and a first entry that said
something different — *the artifacts read as bureaucracy* against *the
documentation is poor*.

The entry below, written the day before, described a duplicated fact as
invisible **because the two copies agreed**. This is the next stage of the same
failure, and the finding is that it stays invisible once they stop agreeing.
Nothing raises a hand. The coherence check resolves references and scans
spelling; it does not read two passages and notice they contradict each other,
and it says so itself — twenty-one rules in force are marked `manual` and depend
on review.

What found it was Daniel asking whether the documentation says clearly enough
that this is an example project for the method. Reading a document against an
expectation, not running anything.

**Two consequences.**

- **A document that retells what a record decides is a defect when it is
  written, not when it drifts.** The drift is the symptom. CLAUDE.md now names
  the project and points at 0001 for what it is, what good enough means, and how
  it fails.
- **Before amending an accepted record, read it.** The proposal here was to
  write into 0001 that this is an example project. It already said so three
  times — §2, §6.1 and R2. An amendment quoting superseded wording verbatim, to
  insert a repetition, spends a mechanism that exists for real changes.

## 2026-08-01 — The session procedures were copied and adapted, not installed

The five procedures were installed as a plugin at the start of the session and
are now adapted copies in `.claude/skills/`, renamed to German. The plugin is
disabled for this repository.

Renaming was the visible reason and the least interesting one. Two others
matter more.

**A copy could be corrected; an installed one could not.** Two of the four
adaptations exist because this project made a mistake the procedure did not
prevent. The wind-down now refuses to run on an inference, because it once did.
The check is now described as a command run on its own, with the reason, because
piping it into `tail` once hid a failure. Neither correction was available while
the procedures lived in a cache that the next plugin update overwrites.

**The record shape had two authorities.** The plugin procedure defined the
structure of a decision record, and so did `docs/adr/README.md`. Nothing failed,
because the two agreed on the day they were written — which is exactly the
condition under which a duplicated fact is invisible. The copy points at the
repository's file and defines nothing.

**The cost is real and is written down where it will be seen.** These files no
longer track the source. `.claude/skills/README.md` names the version they were
taken from, lists the four adaptations, and names the trigger: a release of the
source repository means comparing the five files against it. Nothing will
announce that. A calendar has no opinion about it either, which is why the
trigger is an event and not a date.

**What was not done:** the source repository keeps its English names. German
skill names there would ship to everyone who installs the plugin, and its own
README presents German as one of several options an adopter picks — not a
default. The rename belongs to the adopter, which is this repository.

[Corrected 2026-08-05, against
[#127](https://github.com/nanatsusaya/dot-panic/issues/127): four was the count
that day, and this entry states it twice. The README lists **seven** adaptations
now, and the two named above — the wind-down, and the check as a command on its
own — are among them.]

## 2026-08-01 — A wind-down was run on an announcement, not an instruction

Daniel asked for a review of the open tickets, saying he intended to end the
session soon. The agent read that as authorization, ran the wind-down procedure
— branch hygiene, state artifact, method log, handoff summary — and reported
the session closed. It was not.

Nothing was destroyed and the work would have been done eventually. The error
is the inference. *"I will want to do X shortly"* states an intention; it is not
a request to do X. Treating them as the same thing takes a decision about
sequencing away from the person it belongs to, and does it invisibly, because
the resulting work looks exactly like work that was asked for.

The shape matches the toolchain entry below: an action taken because it looked
like the obvious next step. Named procedures make this **easier** to get wrong,
not harder — a procedure with a name feels like something authorized in
general, and none of them is.

**Consequence.** A session procedure runs when it is asked for, or when the
state artifact says it is due. Never on an inference from what someone said
they intend to do later.

## 2026-08-01 — A check reported green while failing, because its exit code was piped away

Bringing the state artifact current, the agent ran roughly this:

```
node …/check-method.mjs . 2>&1 | tail -4 && git add -A && git commit …
```

The check failed on one finding. The pipeline reported `tail`'s exit code,
which was zero, so the chain continued, the commit went out on a red check, and
"the check passed" was then written into a pull request description.

The operating rules already said to run a check unpiped so that a failure can
fail. The rule was not forgotten. It was defeated by a shell detail unrelated
to its subject: the intention was to trim the output to the last few lines, and
those lines happened not to contain the finding.

**Two consequences.**

- **A verifying command never goes in a pipeline.** Run it alone, read all of
  it, then act. Trimming the output is exactly what hid this.
- **A rule that a shell detail can defeat needs the detail named.** "Run it
  unpiped" is the rule; "a pipeline reports the last command's exit status, not
  the first's" is why — and without the why it reads as fussiness and gets
  optimized away by the next person in a hurry.

## 2026-08-01 — Unready tickets were created on purpose, against an earlier rule

Earlier in the same session the agent argued against creating tickets whose
scope is not yet knowable: an unready ticket cannot state testable criteria, and
a backlog full of them is what teaches people that tickets are decoration. That
argument stands.

It was overruled at the end of the session anyway, and three tickets were
created for records that cannot be worked yet — motion rules, the pointer model,
and where the core comes from.

The reason is the premise the whole method rests on. Those three tickets carry
research that existed **only in the conversation**: that separation is a
steering force and non-overlap is a positional constraint applied after
integration; that touch has no hover, so a pointer exists only while contact is
held; that four npm packages were surveyed and what their registry metadata
said. None of it was written anywhere. At the end of the session it would simply
have been gone, and the next session would have redone the work or, worse,
guessed at the conclusions.

The resolution is not that the earlier rule was wrong, but that it was about a
smaller cost:

- **An unready ticket is cheaper than lost knowledge**, and the two are only in
  tension because a ticket is the nearest available home. Anywhere else is
  worse: a decision record cannot hold undecided research, and the state
  artifact answers a different question.
- **The unreadiness has to be stated in the ticket itself**, in the first line,
  not inferred from an empty criteria list. Each of the three opens with
  `Ready: no` and what blocks it.

If a project later finds a better home for research that is not yet a decision,
these three are the reason to look for one.

## 2026-08-01 — Two concerns in one change, authorized rather than assumed

Pull request #9 carried decision 0001 **and** the rename of `docs/decisions` to
`docs/adr`. The operating rules say one concern per change.

The agent proposed folding them rather than doing it quietly: the record being
renamed had not reached the trunk yet, so a separate rename would have produced
a commit moving a file that arrived hours earlier. Daniel authorized it.

Recorded for the same reason as the first-push entry below. A later session
reading that pull request finds a rule visibly broken, and the two available
readings are "the rule is not really enforced" and "an exception was decided".
Only one is true, and nothing else in the history distinguishes them.

**Consequence.** Where a rule is set aside deliberately, the change says so in
its own commit message **and** the reason lands here. An exception nobody
recorded is indistinguishable from a rule nobody follows — and the second is
contagious in a way the first is not.

## 2026-08-01 — A record section arbitrated a conflict that does not occur

The first draft of decision 0001 contained a section weighing two audiences —
someone opening the page against someone reading the repository — and gave the
reader priority where the two conflict. Asked to explain it, the agent produced
three examples of that conflict. All three were invented.

Daniel: *"das ist vollkommen unsinnig dieses ganze gedankenspiel."* This is an
example project for the method; the documentation and a well-written
implementation come first; the product is secondary. There was no conflict to
arbitrate, only a fact to state.

The pattern repeated immediately. Asked whether the page should carry settings,
the agent answered in images — a panel turning the project into "a lab", a
decision becoming "a shrug" — instead of naming the object, which is sliders on
the finished page. Daniel supplied the plain version himself, as a question.

**Three consequences.**

- **Before writing a rule that resolves a trade-off, check that both sides
  actually occur.** A rule for a conflict that does not happen reads like
  thought and costs a reader real time to discover it decides nothing.
- **Name the object, not a picture of it.** "Sliders on the finished page", not
  "a settings surface". An explanation that needs an analogy to land is not
  understood well enough to be written down yet.
- **A section that survives being deleted should be deleted.** Section 2 of
  0001 now states a fact in three lines and arbitrates nothing, which is what
  it was for.

## 2026-08-01 — The first decision started too low, and no ticket had scoped it

The first record proposed for this project asked where the flocking code should
come from: written here, or taken from one of four npm packages. It was
researched, argued and opened for review before the decider pointed out that
nothing above it had been decided — no purpose, no architecture, no stance on
security, rights or accessibility.

The record was closed unmerged.

Two things produced it, and only the second is interesting.

**The obvious one.** Build-or-buy is the question that sounds most concrete, so
it is the one an agent reaches for first. Concreteness is not the same as
precedence.

**The one worth keeping.** No ticket existed. The record's scope was chosen by
whoever wrote it, at the moment of writing it, which means the scope was chosen
by the same judgment that then argued for it. A ticket written first would have
had to state which questions the record must answer and which decisions it must
not settle in passing — and that statement is exactly what was missing.

Two consequences:

- **A decision record is written against a ticket**, not against an index row.
  The row fixes the topic; the ticket fixes the scope.
- **Records are planned top-down and written in dependency order.** The set was
  replanned from six topics to thirteen, and the build-or-buy question moved to
  the end, where it largely answers itself once the architecture is fixed.

The replanning also renumbered rows that were `Planned`. That is permitted —
none was Accepted, and nothing referred to them — but it is the last moment at
which it is permitted, and it is recorded here rather than left to look like
drift.

## 2026-07-31 — The agent built a toolchain nobody had decided on

Setting up the repository, the agent wrote a `package.json` naming Node as the
runtime, `node --test` as the test runner, ES modules as the module system and
a minimum Node version. It then wrote those choices into the operating rules as
settled conventions, alongside assertions about how the simulation core would
be structured.

None of it had been decided. The decider caught it and said so.

What makes this worth an entry is not the mistake but its shape. Nothing about
it looked like a decision while it was being made — it looked like ordinary
setup, the kind of scaffolding that precedes the interesting work. A choice
embodied in a config file does not announce itself, and by the time it appears
in the operating rules as a convention it reads as something that was always
true. That is exactly the failure the rule against implementing ahead of a
decision describes, arriving in the least dramatic way available.

Two consequences, kept:

- **Scaffolding is not exempt.** A runtime, a test runner and a package manager
  are decisions with alternatives and costs, whatever the ceremony of writing
  them down feels like against how routine they seem.
- **The operating-rules file is where pre-emption becomes invisible.** A
  convention written there is read by every later session as established. It
  may only state what a decision already owns.

The toolchain question is now decision 0006, undecided.

[Corrected 2026-08-05, against
[#127](https://github.com/nanatsusaya/dot-panic/issues/127): true under the
six-topic plan this entry was written against. The set was replanned on
2026-08-02, and the toolchain is [0009](adr/0009-toolchain.md) — Accepted, and
still not installed. 0006 is [motion rules](adr/0006-motion-rules.md).]

## 2026-07-31 — The ceremony here is deliberately heavier than the stage warrants

A toy this size would normally defer most of the decision and enforcement
clusters, and the method says so itself: scale ceremony to the stage, and do not
build for a scale you do not have. This project keeps all thirty-two rules in
force anyway.

The reason is that the decision and enforcement machinery is the thing this
project exists to show. A reader comes here to see the method run, not to see a
flock of dots.

**This is not a recommendation for ordinary projects of this size.** Anyone
copying the shape of this repository into a real toy should defer most of the
decision cluster with a named trigger instead. Written down because the honest
reading of an unexplained pile of process is that somebody thought it was
required.

## 2026-07-31 — The plugin installs from the CLI, not only from `/plugin`

The documented installation path is `/plugin marketplace add` followed by
`/plugin install`. Neither exists in every environment; in this one `/plugin`
reported that it is unavailable, which reads like a dead end.

The non-interactive equivalent worked immediately:

```bash
claude plugin marketplace add nanatsusaya/agent-driven-development
claude plugin install agent-method@agent-driven-development --scope user
```

Scope matters. Installing at repository scope would have bound the plugin to
whichever directory the session happened to start in, not to this project.

## 2026-07-31 — The first push to main predated the gate

Trunk protection cannot exist before the branch does, so the two commits that
created this repository reached `main` without passing a review boundary. The
ruleset was configured immediately afterward, and every change since has gone
through a pull request.

Recorded because a later session reading the history will find two commits on
`main` with no pull request behind them, and the available readings are "the
rule was broken" or "the rule did not exist yet". Only one of them is true.

## 2026-07-31 — Deployment runs through Actions, against the agent's advice

The agent recommended serving Pages straight from `main` and a `docs/`
directory: no workflow, no build, fewest moving parts. Daniel chose a GitHub
Actions workflow instead.

The recommendation was wrong. A workflow costs setup, but it makes the command
chain real — tests run on every push, and nothing deploys unless they pass.
Serving straight from a directory would have left the enforcement cluster with
nothing to enforce, in the one project built to demonstrate it.

Kept because the agent's default is to minimize moving parts, and here that
default argued against the point of the exercise.

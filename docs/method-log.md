# Method log

*Why the way we work here looks the way it does.* Not a progress log and not a
decision log. An entry earns its place only if an agent with no memory of that
session would decide worse without it.

Newest first.

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

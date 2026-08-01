# Method log

*Why the way we work here looks the way it does.* Not a progress log and not a
decision log. An entry earns its place only if an agent with no memory of that
session would decide worse without it.

Newest first.

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

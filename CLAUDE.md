# dot-panic

This file holds the **stable operating rules**, not the current state. Where we
stand is in [docs/STATUS.md](docs/STATUS.md); what was decided is in
[docs/adr/](docs/adr/README.md). STATUS.md is always the same
place, is brought current before a session ends, and names a **single** clearest
next step — not everything outstanding.

## What this is

A small browser toy — a flock of dots that scatters when your pointer comes
near — built as a worked example of
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules),
a published ruleset for running projects with AI agents. Demonstrating the
method is what this project is for: the documentation and a well-written
implementation come first, and the toy itself is secondary.

What it is, what good enough means, what is out of scope, and the ranked ways
it fails are fixed by
[decision 0001](docs/adr/0001-purpose-scope-and-success.md) — including which
way to fall when two of them are in tension. Read them there. This section
names the project; it does not define it.

## Commands

**The toolchain exists now**, and what it is is
[0009](docs/adr/0009-toolchain.md)'s — Bun, TypeScript, `bun test`, `tsc` and
Biome. `package.json`, `tsconfig.json` and `bunfig.toml` are here and
`bun install` restores the three development dependencies §7 names. **Still do
not add a dependency §7 does not name**; §7 explicitly leaves the stop-and-ask
below in force, and deciding a policy is not authorizing an install.

**The method check needs a repository that is not vendored here**, so clone it
beside this one before running anything:

```bash
git clone https://github.com/nanatsusaya/agent-project-rules ../agent-project-rules
```

### The four checks

0009 §8 fixes that there are four and what each decides. These are the strings,
and the record deliberately does not carry them — a command in a record is stale
the first time a script is renamed, and nothing checks it.

**Run one at a time.** None of them goes in a pipeline: a pipeline reports the
last command's exit status, so piping a check into anything that trims its output
hides both the finding and the failure. That has happened here more than once.

```bash
bun run check:method
```

Decides whether the documents still describe the project: the declaration, the
artifacts it names, the adaptations and the decision index, plus every link
between markdown files and the American-spelling word list. A failure means a
document is wrong, never that the toy is. **Do not add `--lint`** — that flag
runs the document scans only, skips the declaration, artifact, adaptation and
decision-index checks, and still prints `OK`.

```bash
bun run check:types
```

Decides whether the source type-checks under the settings 0009 §4 fixes, and
emits nothing while deciding it. A failure is either a type error or a rule of
§4's holding: `target` and `lib` are bounded versions, so an API newer than
ES2023 fails here rather than in a browser.

```bash
bun run check:lint
```

Decides format and lint in one run — 0009 §7's one-tool-two-jobs. A failure is
one of seven enabled rule groups, or a file the formatter would have written
differently. Neither is advisory.

```bash
bun run check:test
```

Decides that the tests pass **and** that coverage clears 0010 §7's floor. Read
the exit status rather than the summary: a run can print `1 pass 0 fail` and
still exit 1, because the floor is what failed.

```bash
bun run check
```

Runs all four in that order and stops at the first failure, carrying its exit
status. It is not a substitute for reading which one failed.

**All four are green today**, which they have not been before.
[#91](https://github.com/nanatsusaya/dot-panic/issues/91) gave `check:types` and
`check:test` something to read; until it landed they ended on *no inputs were
found* and *0 test files matching*, because the three directories were empty.

## Working conventions specific to this project

- **A passing check is not evidence that the toy works.** The failures that
  matter here are visual. Anything touching motion is verified by watching it,
  and the change says what was watched and what was seen.
- **Prefer the smaller, more boring artifact.** Someone judging the method reads
  these files, and length is the fastest way to make a method look like
  overhead.

How the simulation is structured, what it is written against and how it is
tested are decided. [0002](docs/adr/0002-overall-architecture.md) owns the
first, [0009](docs/adr/0009-toolchain.md) the second and
[0010](docs/adr/0010-testing-strategy.md) the third, and each is where its own
answer is read. How a change begins is
[0012](docs/adr/0012-how-software-gets-developed.md) — §4 for the Core, §5
for the View. That the Core is written in this repository rather than taken
from a package is [0013](docs/adr/0013-origin-of-the-core.md) §1.

**None of it is restated here.** A summary in this file would be a second
authority for a fact that already has one, and it is the copy a session reads
first.

## Decisions

- Anything a later change could silently reverse gets written down **before** it
  is built. Routine implementation work does not.
- An accepted decision is **immutable**. Change it by an amendment the decider
  explicitly authorizes — recorded in the decision itself, with the superseded
  wording quoted verbatim — or by a later decision that supersedes it. Never by
  editing.
- **Accepted means decided, not built.** Implementation state lives in
  [docs/STATUS.md](docs/STATUS.md), on its own scale. Never read progress out of
  a decision's status.

## Delivery

- **Every change goes on a branch and through a pull request. Never write to
  `main` directly.** No exception — not for a status flip, not for a log entry,
  not for a change that looks mechanical.
- **What the review decides is direction and coherence**: does this move toward
  the goal, and does it fit what already exists rather than working by making an
  exception to it. Line-level correctness is not the reviewer's job — that is
  the definition of done below.
- **One concern per change.** No refactors, formatting churn or unrelated
  tidying folded into other work. A change too large to answer those two
  questions about is a change that gets waved through.
- **Commit messages** follow `type(scope): summary`, lowercase, describing what
  the change is rather than commanding. The body says why. **Agent assistance is
  disclosed as an `Assisted-by:` trailer** naming what assisted — a trailer
  survives a squash merge and cannot be edited afterwards, where a line in a
  description can be, which makes that a claim rather than a record. A commit
  written by an agent here also carries a `Co-Authored-By:` trailer, which its
  harness requires; the two say different things and curl's keyword list, where
  `Assisted-by:` comes from, carries both.
- **The shape of a change description** is
  [.github/pull_request_template.md](.github/pull_request_template.md) — the
  form an author actually sees. It is not restated here.
- **The definition of done** is
  [.github/ISSUE_TEMPLATE/task.md](.github/ISSUE_TEMPLATE/task.md) — the same
  authority the Tickets section names, for the same reason. It is not restated
  here. It was, in a version that disagreed with it.
- **Hand work back only when you believe it is correct, complete and safe.**
  Below that bar, keep working or name the specific uncertainty — what exactly
  is unverified, and what would settle it.

## Working with the decider

Daniel decides. There is no second reviewer, which makes the two review
questions above the whole of the gate.

- **Surface decisions that belong to a person before acting**: direction and
  sequencing, anything legal, anything outward-facing, anything expensive to
  reverse. Number them `O1..On`, recommend a default for each, and **do not
  answer them yourself**. **Where the answer goes depends on the artifact.** In a
  decision record it is folded in and the questions become `R1..Rn`, with what
  was decided and why. In a pull request it arrives as a comment naming the
  `O`-number and nothing already written is rewritten —
  [the template](.github/pull_request_template.md) is the authority for that, and
  says why, and it is not restated here.
- **Stop and ask** before: amending an accepted decision · publishing or
  deploying · changing the public URL · adding any dependency · introducing
  network calls or telemetry.
- **Verify external facts from primary sources** and cite them. Do not assert
  capabilities, limits or interface details from memory.
- **Language — two separate decisions.** Everything committed here is written in
  **English, American spelling**, and a command checks part of that: it scans a
  list of word pairs, not the general `-ise` ending, and prints that limit on
  every run. The rest is review. Conversation with Daniel happens in **German**.

## Documentation

- Documentation is **self-supporting**: a session begins with this repository
  and nothing else — no earlier conversation, no recollection of why a rule
  exists. This is about the seam between sessions, not about working memory:
  keep the context you build up within a session, and write down what the next
  one will need.
- **Every fact has exactly one authority.** Refer to it; do not restate it.
- **When an authority moves, every reference to it moves in the same change.**
- **Docs change in the same commit as what they describe.** Stale documentation
  is a defect, and the most expensive kind: it does not fail, it misinforms
  every session that follows.
- [docs/method-log.md](docs/method-log.md) records *why the way we work looks
  like this*. Write an entry only for a genuinely methodological moment. The
  test: would an agent with no memory of that session decide worse without it?

### What the code says about itself

Comments explain **why**, not what — the reason, the constraint, who needs
it — never a paraphrase of what the line plainly does. The form below is the one
the decider already keeps in
[grimora](https://github.com/nanatsusaya/grimora/blob/main/CLAUDE.md), adapted
rather than copied on his call of 2026-08-05.

- **Every file, and every exported function, type and constant, carries a block
  header.** Always the multi-line JSDoc form, never the single-line
  `/** … */`. A function header documents **every parameter** with `@param`,
  plus `@returns` where the name does not already answer it.
- **A property of a type may be one line**, as long as it gives the why or the
  contract rather than paraphrasing the type. A purely structural one — a
  vector's `x` and `y` — needs nothing, because the type's own header carries
  it.
- **A test file's header names the claim it asserts and the record asking for
  it.** That is the whole of why such a file exists.
- **The why usually ends at a record.** A line is there because something was
  decided, so cite the section — `(0008 §6)` — rather than restating what it
  says. The same rule the documents follow, applied to code.
- **One to three lines use `//`. Longer goes in a `/* … */` block.**
- **Length is not the thing to optimize here.** Verbose is fine where it buys
  the next session clarity. *Prefer the smaller, more boring artifact* is about
  the documents above, not about a comment that saves someone reading three
  records.
- **Nothing under `core/` may name one of 0002 §3's fifteen, and a comment is
  source too.** The purity test reads that directory as text, so writing *do not
  reach for `Math.random` here* is a line that reddens it. **It is easier to hit
  than it sounds**: 0008 §6's own reasoning is about screen size and the window,
  and quoting it inside `core/` is what this rule was written after.

**No command decides any of this.**
[#178](https://github.com/nanatsusaya/dot-panic/issues/178) is the one that
would, and it would decide presence rather than quality — whether a why is a why
is review's either way.

## Tickets

Issues live at <https://github.com/nanatsusaya/dot-panic/issues>. Agents write
tickets too, and are held to the same bar.

The shape of a ticket, and what makes it ready and done, is
[.github/ISSUE_TEMPLATE/task.md](.github/ISSUE_TEMPLATE/task.md) — the form an
author actually sees. It is not restated here.

Three labels, and no more: `type:decision`, `type:build` and `type:epic`.

`type:epic` goes on the issue that **is** the epic — the one listing its
tickets — and never on a member ticket. One label, not one per epic. What an
epic is, and what it deliberately is not, is
[0012](docs/adr/0012-how-software-gets-developed.md) §7.

## Session rituals

Five procedures live in [`.claude/skills/`](.claude/skills/README.md) as
adapted copies, not as an installed plugin. That file records where they came
from, what was changed and why, and what to do when the source releases a new
version. None of it is repeated here.

| Procedure | When |
|---|---|
| `/moin` | Sitting down. Reads STATUS.md first and ends with a question, never an action. |
| `/weiterimtext` | A change just landed. Keeps context, re-verifies the outside world. |
| `/feierabend` | Stopping. **Only when asked for by name** — never on an inference that the session is ending. |
| `/adr` | Writing a decision and taking it through to Accepted. |
| `/passtdas` | Checking whether `method.json` still matches how work is actually done. |

The `agent-method` plugin is disabled for this repository. Two sets of the same
procedures would be two authorities for one thing.

## Guardrails

- **Read before writing.** Check STATUS.md and the decision that owns the area
  before changing anything. Do not invent structures no decision covers.
- **Do not implement ahead of a decision.** If a task would settle in code
  something a still-open decision owns, write the decision first.
- **Do not restate a fact that has an authority.** Read it from there.
- **If a claim is checkable by a command, run the command before writing the
  claim.** Run it **alone** — not in a pipeline, not chained to what comes
  next. A pipeline reports the last command's exit status, so piping a check
  into anything that trims its output hides both the finding and the failure.
- **Never commit secrets, credentials or personal data.** This project needs no
  secret and no credential; anything that looks like one is a mistake. Personal
  data is where the rule has to be read rather than applied: whom it protects
  here is the visitor, about whom nothing is recorded anywhere, and the
  operator's identity in the imprint is the other party — decided page content,
  committed like any other text.
  [0003](docs/adr/0003-security-and-privacy-by-design.md) R1 is what tells the
  two apart, and it narrows nothing.

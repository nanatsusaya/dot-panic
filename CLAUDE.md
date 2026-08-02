# dot-panic

This file holds the **stable operating rules**, not the current state. Where we
stand is in [docs/STATUS.md](docs/STATUS.md); what was decided is in
[docs/adr/](docs/adr/README.md). STATUS.md is always the same
place, is brought current before a session ends, and names a **single** clearest
next step — not everything outstanding.

## What this is

A small browser toy — a flock of dots that scatters when your pointer comes
near — built as a worked example of
[agent-driven-development](https://github.com/nanatsusaya/agent-driven-development),
a published ruleset for running projects with AI agents. Demonstrating the
method is what this project is for: the documentation and a well-written
implementation come first, and the toy itself is secondary.

What it is, what good enough means, what is out of scope, and the ranked ways
it fails are fixed by
[decision 0001](docs/adr/0001-purpose-scope-and-success.md) — including which
way to fall when two of them are in tension. Read them there. This section
names the project; it does not define it.

## Commands

**This project has no toolchain yet, and that is not an oversight.** It is now
decided rather than open — [0009](docs/adr/0009-toolchain.md) fixes Bun,
TypeScript, `bun test`, `tsc` and Biome — and **deciding is not building.** There
is no manifest, no `tsconfig`, no `node_modules` and no build output, and
creating any of it is work with its own ticket. Do not introduce a piece of it as
a side effect of some other task, and do not add a dependency 0009 §7 does not
name; §7 explicitly leaves the stop-and-ask below in force.

One command does exist, because it belongs to the method rather than to the
toy. It runs out of the method repository, which is not vendored here and has
to be cloned beside this one:

```bash
git clone https://github.com/nanatsusaya/agent-driven-development ../agent-driven-development
```

Then, from the root of this repository:

```bash
node ../agent-driven-development/checks/check-method.mjs .
```

Do not add `--lint`. That flag runs the document scans **only** and skips the
declaration, artifact, adaptation and decision-index checks — and still prints
`OK`. The spelling regime comes from `method.json`, so it needs no flag either.

## Working conventions specific to this project

- **A passing check is not evidence that the toy works.** The failures that
  matter here are visual. Anything touching motion is verified by watching it,
  and the change says what was watched and what was seen.
- **Prefer the smaller, more boring artifact.** Someone judging the method reads
  these files, and length is the fastest way to make a method look like
  overhead.

How the simulation is structured, what it is written against and how it is
tested are open questions owned by the decisions in
[docs/adr/](docs/adr/README.md). Until those are Accepted, this
section stays short, because anything added to it would be a decision made by
writing it down here rather than by deciding it.

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
  the change is rather than commanding. The body says why.
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
  answer them yourself**. Once answered, rewrite them in place as `R1..Rn` with
  what was decided and why.
- **Stop and ask** before: amending an accepted decision · publishing or
  deploying · changing the public URL · adding any dependency · introducing
  network calls or telemetry.
- **Verify external facts from primary sources** and cite them. Do not assert
  capabilities, limits or interface details from memory.
- **Language — two separate decisions.** Everything committed here is written in
  **English, American spelling**, and that is machine-checked. Conversation with
  Daniel happens in **German**.

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
- Comments explain **why**, not what.
- [docs/method-log.md](docs/method-log.md) records *why the way we work looks
  like this*. Write an entry only for a genuinely methodological moment. The
  test: would an agent with no memory of that session decide worse without it?

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
- **Never commit secrets, credentials or personal data.** This project needs
  none of them; anything that looks like one is a mistake.

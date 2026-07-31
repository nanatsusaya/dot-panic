# dot-panic

This file holds the **stable operating rules**, not the current state. Where we
stand is in [docs/STATUS.md](docs/STATUS.md); what was decided is in
[docs/decisions/](docs/decisions/README.md). STATUS.md is always the same
place, is brought current before a session ends, and names a **single** clearest
next step — not everything outstanding.

## What this is

A small browser toy — a flock of dots that scatters when your pointer comes
near — and at the same time a worked example of the method it is built under.
No goal, no score, no ending. A toy, not a game.

Three ways it fails, in order of how likely they are:

1. The artifacts here read as bureaucracy, and a reader concludes the method
   is unusable at this size.
2. The toy is never finished because the process ate the work.
3. It passes its tests and still looks wrong on screen.

The bar is not data correctness or legal exposure. It is that a stranger can
read this repository and see how the work was actually run.

## Commands

**This project has no toolchain yet, and that is not an oversight.** No
decision covers a runtime, a test runner, a package manager or a build step, so
none of them exist here. Do not introduce one as a side effect of some other
task; write the decision first.

One command does exist, because it belongs to the method rather than to the
toy. With the method repository cloned beside this one:

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
[docs/decisions/](docs/decisions/README.md). Until those are Accepted, this
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
- **Definition of done:** the criteria the task fixed **before it started**,
  verified rather than assumed; anything with observable behavior **exercised**,
  not merely built; docs changed in the same commit. There is no local command
  chain to point at yet, and until a decision creates one this bullet is carried
  by review alone — which is worth knowing rather than papering over.
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

- **Ready:** a scoped title; the goal and why it exists; concrete scope — the
  decisions to make, or testable acceptance criteria; links to related
  decisions.
- **Done:** criteria met **and verified**; work and docs updated together; CI
  green; merged; the ticket closed from the change description.

## Session rituals

The five procedures are installed as the `agent-method` plugin.

| Procedure | When |
|---|---|
| `/agent-method:session-start` | Sitting down. Reads STATUS.md first and ends with a question, never an action. |
| `/agent-method:after-merge` | A change just landed. Keeps context, re-verifies the outside world. |
| `/agent-method:session-end` | Stopping. Parks unfinished work visibly and brings STATUS.md current. |
| `/agent-method:decision-record` | Writing a decision and taking it through its cycle. |
| `/agent-method:adopt` | Reviewing how well this project still fits the method. |

## Guardrails

- **Read before writing.** Check STATUS.md and the decision that owns the area
  before changing anything. Do not invent structures no decision covers.
- **Do not implement ahead of a decision.** If a task would settle in code
  something a still-open decision owns, write the decision first.
- **Do not restate a fact that has an authority.** Read it from there.
- **If a claim is checkable by a command, run the command before writing the
  claim.** Run it unpiped, so a failure can actually fail.
- **Never commit secrets, credentials or personal data.** This project needs
  none of them; anything that looks like one is a mistake.

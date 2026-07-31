# Method log

*Why the way we work here looks the way it does.* Not a progress log and not a
decision log. An entry earns its place only if an agent with no memory of that
session would decide worse without it.

Newest first.

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

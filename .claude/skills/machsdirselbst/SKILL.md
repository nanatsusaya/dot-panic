---
name: machsdirselbst
description: >-
  Use when the decider wants a planned set of tasks worked through without approving each change and
  without the session standing still while nobody answers. Checks the start strictly, reads every
  open task, asks every question up front, and presents a closed plan; only an explicit yes starts
  the run. Then works the list one entry at a time, merges within it, parks any task that meets a
  question or needs the decider's eyes, lists each change's judgment calls, and ends with a report
  when the list is done. Never extends the plan. Run after moin.
disable-model-invocation: true
---

# Autopilot — working through an approved plan

*Carries out rules G4, G1, G2, S2, S3, W1 and H1. The
[catalog](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md)
is the authority; this file is only the procedure. **What a run may do in this
project is [0024](../../../docs/adr/0024-whether-a-plan-may-be-approved-instead-of-each-change.md)**,
and where the two differ that record wins.*

Sometimes the planning has been done well, and what the decider wants is the
work: no approval per change, no question in the middle of the day, and no
session standing still overnight because nobody was there to answer.
[G4](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g4)
allows that — a plan approved instead of each change — on five conditions.
This procedure carries them out.

An autopilot flies a route someone else set. When the route ends, it hands the
controls back; it does not pick a new destination.

**Guardrails (do not violate):**

- **Only an explicit yes in this conversation starts the run.** Not silence,
  not a document, not a yes from an earlier session. The grant ends with the
  session, and when the list is done (0024 §1).
- **Nothing outside the list.** A task that grows something new on the way — a
  second concern, a new capability in a tool it was only meant to use — has
  become a new entry. Park the growth; do not build it.
- **Never answer a question that belongs to the decider.** Park the entry with
  the question written where it is held, and take the next one.
- **What a plan may not contain is [0024 §3](../../../docs/adr/0024-whether-a-plan-may-be-approved-instead-of-each-change.md)'s
  four exclusions**, and the fourth is this project's: **no entry whose *Done*
  needs the decider's eyes may merge inside a plan.** Such an entry may stand in
  the plan and its work may be done — you watch it under
  [0022](../../../docs/adr/0022-who-watches.md) §2 as always — but the run
  **parks it before the merge** and reports it. The other three are the method's
  own and are read there.
- **Never lower a platform setting, and never merge past what it requires.**
  The four checks gate every merge ([0020](../../../docs/adr/0020-whether-the-checks-gate-a-merge.md)
  §1), and a run waits for them like anybody else (0024 §4).
- **No force-push and no rewriting the trunk's history.**
- **A closing keyword only where it is meant.** Read the description of each
  change for one before you create it. Which words, the two places the platform
  reads them, and when to write one at all are
  [CLAUDE.md](../../../CLAUDE.md#delivery)'s, together with the four times this
  project has shut a ticket by accident. It is not repeated here.

## 1. Check the start, strictly

Before anything is planned:

- The trunk is current, the tree is clean, and the four checks are green on the
  trunk — each run on its own, which is
  [CLAUDE.md](../../../CLAUDE.md#the-four-checks)'s rule and carries its reason.
- No change is waiting for the decider. A run built on an unreviewed change
  builds on something nobody approved; settle it first.
- The state artifact ([docs/STATUS.md](../../../docs/STATUS.md)) is current. If
  bring-up reported that the last session ended without a wind-down, that repair
  comes first, outside the run.
- **The tools the run will need are allowed in advance.** An unattended run that
  meets a permission prompt stands still until someone answers it. Name what the
  run will use — the four checks, the version-control and platform commands —
  and have the decider allow them now.
- **The merge is named among them, because it is the one that stopped a run
  here.** On 2026-10-22 the first entry of the first granted plan reached a
  green change and the harness refused the merge as a self-approval: the thing
  the run lacked was not a tool but the permission to be the one pressing it.
  0024 §2 settles who merges inside a plan; the agent's harness does not read
  that record. Establish before the grant that the merge will actually go
  through, or plan the run knowing the decider presses it.

If any of these fails, stop and say which. Do not plan around a broken start.

## 2. Read every open task

Read each candidate task against the current state, not against what it said
when it was written. Sort them:

- **Ready** — it says what finishes it
  ([W1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#w1);
  what *ready* and *done* mean here is
  [`.github/ISSUE_TEMPLATE/task.md`](../../../.github/ISSUE_TEMPLATE/task.md)'s
  and is not restated), nothing it depends on is open, and it needs no decision
  first.
- **Needs a decision** — a question belongs to the decider before it can start.
- **Blocked** — waiting on something the run cannot provide.

A task that has gone stale — already done, overtaken, or its criteria no longer
true — is noted. Refreshing it is a plan entry or a question, not something done
before the grant.

## 3. Ask everything up front

The point of the run is that it has nothing left to ask. Run the `interview`
procedure through your skill tool, for every question in the *needs a decision*
group and every question the plan itself raises. In case it does not load, its
essence:

> Ask in rounds: each round holds every question whose prerequisites are
> settled, and no question that depends on another in the same round. Number
> them `O1..On`, running on across rounds, each with a recommended default.
> Facts are looked up, never asked; decisions are the person's, and the
> interview ends only when nothing is left to ask and the person confirms.

Each answer goes where its question is held
([G2](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g2))
before the plan is written. A task whose answer needs a decision record is not
on this list; the record is.

## 4. Write the plan

A closed list, in the order it will be worked. For each entry:

- the task, and **what finishes it**;
- its expected size;
- **what it may merge** — which changes, into what.

And for the list as a whole:

- **what is out of scope**, named — the obvious next steps above all, because
  those are the ones a run drifts into;
- **the budget**: a number of changes or an end time. The list expires at the
  budget or when it is done, whichever comes first. **No number bounds the list
  itself** (0024 §1): what bounds it is that it is closed and that the budget is
  stated here;
- **one change open at a time**, unless the plan names an exception. Parallel
  changes conflict in the state artifact, and in anything generated;
- **which entries will be parked before the merge** because their *Done* needs
  the decider's eyes. Say it when the plan is presented, not when the run
  reaches them.

Read the list against 0024 §3 before presenting it. An entry one of the four
exclusions covers either comes off the list or goes on it knowing it parks.

## 5. The grant

Present the plan and ask for a yes. Only an explicit yes to this plan, in this
conversation, starts the run. A question about the plan is not a yes; answer it
and ask again.

The run's first change writes the plan into the state artifact
([S3](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#s3)),
before the first entry starts, **and the words that granted it, quoted, with
their date** (0024 §1). A plan in the state artifact whose authorization sits
only in a chat log is the half the next session cannot read. If the run stops,
that is what the next session reads.

## 6. Keeping the run alive — optional, and untested

The run does not depend on anything in this step. Neither mechanism below has
been shown to rescue a stalled run — upstream says so, and neither has been
exercised here. Use them as a precaution, never describe them as a guarantee,
and check that the harness in front of you actually offers one before promising
it.

- **A goal the session works towards.** In Claude Code, after the grant, the
  decider sets it — it is a command a person types:

  ```
  /goal Every entry of the plan in docs/STATUS.md is merged or parked with its
  question written in its ticket, and the closing report is in docs/STATUS.md.
  Nothing outside the plan is started. Stop after «budget».
  ```

  After each turn a small model checks the condition and, if it does not hold,
  starts the next turn. When the condition holds, the goal ends — which is what
  makes the run expire rather than extend. It does not change the permission
  mode, which is why step 1 allows the tools first. Source:
  [code.claude.com/docs/en/goal](https://code.claude.com/docs/en/goal).
- **A recurring nudge**, where a goal is not available. Schedule a prompt in
  the session, every 30 minutes, whose text stands on its own — a scheduled
  fire does not run this procedure, because only a person may start it:

  > If your last turn ended with a question to the decider that is still
  > unanswered, say so in one sentence and do nothing else. Otherwise say in
  > one sentence what stopped the work, and continue with the next entry of the
  > approved plan — that plan and nothing else.

  It fires only between turns, while the session is running and idle — not
  while a turn hangs on a prompt. Source:
  [code.claude.com/docs/en/scheduled-tasks](https://code.claude.com/docs/en/scheduled-tasks).

**A watch outside the session is not a safeguard.** A scheduled job elsewhere
can only report. It cannot tell a session waiting for the decider from one that
hangs, and whether its report reaches him away from the desk is not
established. Do not name one as protection for the run.

## 7. Work the list

For each entry, in order:

1. **Branch** fresh from the up-to-date trunk. Never write to the trunk
   directly — a plan is no exception to that, and
   [CLAUDE.md](../../../CLAUDE.md#delivery) names none.
2. **Work to what finishes it.** The four checks are green, each run on its
   own; anything that moves on screen has been watched under 0022 §2, and the
   change says what was watched and what was seen.
3. **The change that closes the entry marks it in the state artifact** (S3), in
   the same change.
4. **List the judgment calls** in the change's description: every choice in it
   that the decider could have made differently. None is written as *none*.
   This list, not the diff, is what he reviews. **It goes at the end of *What*,
   under a bold line of its own** — the template's headings are the handbook's
   shape and a run does not add to them.
5. **There is no second reviewer here** ([CLAUDE.md](../../../CLAUDE.md#working-with-the-decider)),
   so nothing reviews the change before the merge but the four checks and your
   own watch. That is the whole of what a plan trades away, and step 4's list is
   what is left in its place.
6. **Merge** within what the entry allows — 0024 §2 is what permits it, and only
   inside the granted plan. An entry whose *Done* needs the decider's eyes is
   **parked here, with the change open**, and the run takes the next entry.
7. **The seam after the merge**: confirm it landed, tidy the branches. The next
   entry on the list needs no further yes
   ([S2](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#s2));
   anything not on the list does.

When an entry cannot finish:

- **A question for the decider** → write it where it is held, with a recommended
  default; mark the entry parked in the state artifact; take the next entry.
  Never wait, never answer it.
- **The task grew** → finish only what the entry covers, and write the rest up
  as a proposed entry for the next list.
- **Something failed** that you cannot put right within the entry → park it
  with what failed and what was tried
  ([H1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#h1)).

## 8. Land

When every entry is merged or parked, or the budget runs out:

- **Write the closing report** in the run's last change, where the state
  artifact holds the plan: what merged, what is parked and the question or the
  look each one waits on, what was not started, and **every judgment call the
  run made, collected in one list**.
- **Remove what kept the run alive**, if step 6 put anything there: the goal
  ends with its condition — if it has not, the decider clears it with
  `/goal clear`; delete the nudge.

The grant ends here. If the state artifact names a next step, that step is not
on the list by being next. Carrying on means presenting the next list and
waiting.

**Then stop.** End with the report and a question — and **do not run
`/feierabend`**: it runs only when the decider asks for it by name, which is
this project's adaptation and was made after a session was reported closed while
it was still running.

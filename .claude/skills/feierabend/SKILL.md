---
name: feierabend
description: >-
  Use at the end of a working session to wind down cleanly: tidy the branch state, finish or safely
  park in-flight work at an honest stopping point, bring the living documents current, run any
  maintenance that has come due, then give a handoff summary. This is a wind-down, NOT a trigger to
  start new work. The counterpart to moin.
---

# Session end — wind-down

*Carries out rules S1, S3, W1 and H1. The
[catalog](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md)
is the authority; this file is only the procedure.*

Closing a session cleanly is a procedure. The goal is to leave the repository
and the handoff at an **honest stopping point**: everything genuinely finished
is finished, everything unfinished is parked visibly and handed off.

Work the steps in order and **report faithfully** — a skipped step or a red
check is stated plainly, never glossed. The next session has this repository and
nothing else; anything you leave unsaid is lost.

**Guardrails (do not violate):**

- **Run this only when it is asked for by name.** Not because the work looks
  finished, not because someone mentioned they intend to stop soon. *"I want to
  end the session shortly"* states an intention; it is not a request to end it.
  This has already gone wrong once here — the wind-down was run on an
  announcement, the session was reported closed, and it was not. A procedure
  with a name feels like something authorized in general. None of them is.
- **Start no new work.** If a task surfaces, record it. Do not begin it.
- **Never merge**, and never write to the trunk. Report what awaits review.
- **Do not round a partial result up to a finished one.** The cost of an honest
  "this part is not done" is one sentence; the alternative compounds.

## 1. Branch hygiene

- Check for uncommitted work. Anything in the tree is either **finished** (step
  2), **parked** on a branch with a clear work-in-progress commit, or explicitly
  named in the handoff. Never leave it dangling and unmentioned.
- If something merged this session: sync the trunk, delete the merged branch,
  prune.
- List every change still awaiting review, with its state, so the decider knows
  what is queued.
- End on the trunk with a clean tree — unless a branch is deliberately parked
  and named in the handoff.

## 2. Finish what is finishable

**The definition of done is
[`.github/ISSUE_TEMPLATE/task.md`](../../../.github/ISSUE_TEMPLATE/task.md), and
it is not restated here.** Read it and apply it before calling anything done.
This section used to carry its own copy, which required a green local check
chain — something this project does not have and says so.

One thing this procedure adds, because it is about stopping rather than about a
ticket:

- Claim a task done only if you believe it is correct, complete and safe. If
  you are not there, park it and hand off the **specific** uncertainty — what
  exactly is unverified, and what would settle it — rather than declaring it
  finished.

## 3. Bring the living documents current

- **State artifact:** refresh the date, the *where we stand* section and the
  *next step* if the session changed them. Make what is open honest: changes
  awaiting review, parked work, the single clearest next step. This is a normal
  change through review.
- **Method log:** only for a genuinely methodological moment — a correction and
  its reasoning, a workflow experiment and its outcome, a mistake worth not
  repeating. The test: would an agent with no memory of this session decide
  worse without the entry? Routine execution is what the commit history is for.
- **Memory**, if your tooling has one: save durable facts worth carrying
  forward. Not what the repository already records, and not what mattered only
  to this conversation.

## 4. Maintenance

If the project keeps a calendar-driven maintenance list, run anything whose
interval has elapsed and update its date. Unlike bring-up, running it here is
correct: the session is ending, and a task that depends on somebody noticing is
a task that does not happen.

## 5. Handoff and close

Give a concise recap: what was accomplished, what is open (changes awaiting
review, parked work), and the single clearest next step for the next session.

Then stop. Begin nothing new, and leave the session at a clean stopping point.

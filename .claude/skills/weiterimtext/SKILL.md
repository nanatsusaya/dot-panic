---
name: weiterimtext
description: >-
  Use mid-session to move cleanly from a just-merged change to the next task — the seam between two
  units of work, and the counterpart to moin (bring-up) and feierabend (wind-down). Confirm the
  change actually landed, tidy the branch state, check the state artifact says what is now true, then
  re-validate the next task against current reality and start it ONLY if it is genuinely ready and
  decision-free; otherwise surface the decision and stop. Keeps the session's context; re-verifies
  the external world before writing.
---

# After merge — the seam between two units of work

*Carries out rules S1, S2, S3, G1 and C4. The
[catalog](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md)
is the authority; this file is only the procedure.*

Between finishing one unit of work and starting the next there is a seam, and
the seam is where things quietly go wrong: a branch is left dangling, the state
artifact drifts, or the task you had in mind was closed by something that merged
while you were busy.

This runs **mid-session**, so it is deliberately light. You are already
oriented — do not re-brief the project, its history or its standing rules.

## The principle: keep your context, re-verify the world

The context you have accumulated this session — the decisions, the reasoning,
the why — is an **asset. Keep it.** This procedure does not ask you to distrust
it or start from a blank slate.

What changes outside your control is the **shared, external state**: the trunk,
the changes awaiting review, the status and scope of tickets, the files on the
remote. Other people and other sessions move those while you work. So the
discipline is narrow and specific: **before writing to a shared artifact or
committing to the next task, re-fetch and re-check that external state.**

The distinction matters. Losing your own context to be safe costs you everything
you worked out this session and prevents nothing.

**Guardrails (do not violate):**

- **Gated autonomy — the crux.** Steps 1 to 3 run autonomously. Starting the
  next task in step 5 does not. Begin only if the task is genuinely ready and
  decision-free. If it needs a judgment that belongs to the decider, is too
  large to start without agreeing its shape first, or is ambiguous — **stop and
  ask.**
- **Never merge.** This runs *after* a merge someone else performed. Step 1
  verifies that; if it did not happen, this stops.
- **Never write to the trunk.** Every change goes through review like any
  other.

## 1. Did the unit actually close?

Do not tidy up work that is not finished. Fetch, then read the current state
rather than assuming it:

- Confirm the change is **actually merged** — not merely opened, approved or
  green.
- If it is not merged, or there is uncommitted work that was not part of it,
  **stop here.** Report the real state and let the decider resolve it. Cleaning
  up on a false premise destroys work.

## 2. Branch hygiene

Sync to the merged state, delete the merged branch locally, prune
remote-tracking branches. End on the trunk with a clean tree.

## 3. Does the state artifact say what is now true?

The state artifact is brought current by the change that moves the position,
not by a change of its own. If the change that just merged closed a task, it
should already have carried the update. Check that it did, on the freshly
synced trunk:

- Re-read the **current** state artifact, together with recent merges and open
  changes. A **parallel** change may have moved the position again or
  overwritten the line this one wrote.
- If it is current, move on. If it is not, **do not open a change just for
  it.** The next change that closes a task carries the correction, or
  `/feierabend` does if nothing else will. Note the gap so it is not forgotten.
- The **method log** is not written here. `/feierabend` asks its question once
  for the whole session, and this project's permission for the two to travel
  together is read in [CLAUDE.md](../../../CLAUDE.md#delivery).

## 4. Re-validate the next task against current reality

Take the single clearest next task from the state artifact — but treat the plan
you formed earlier as a **hypothesis**, because the world may have moved:

- **Still the right next step?** Or has something reordered priorities, or is
  there now a defect that jumps the queue?
- **Already done or obsolete?** Re-read the ticket's current state and criteria.
- **Preconditions met?** The things it depends on — are they actually in place?
- **Is a decision open?** If so, that is the gate below.

## 5. Start clean, or stop

- **Ready and decision-free:** cut a fresh branch from the up-to-date trunk and
  begin, carrying your full session context forward and working to the project's
  definition of done. The change that closes the task brings the state artifact
  current in the same change.
- **The gate tripped:** do **not** start. Present the specific decision or the
  planning that is needed, recommend a default, and wait. Starting the next task
  is never worth undermining the review boundary.

Either way, report the transition briefly: what closed, what the state artifact
now says, and either what you started or what needs an answer.

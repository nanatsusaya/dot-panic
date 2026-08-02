---
name: Task
about: A decision to make or work to do
title: ''
labels: ''
---

<!--
Adapted from agent-manual/issue-templates/task.md in agent-driven-development.
Two changes: the handbook's "CI is green" condition is dropped, because there is
no CI here and no check chain to be green — decision 0009 owns creating one; and
the "Watched and seen" criterion is ours, because the failures that matter here
are visual.

This file is the one authority for what makes a ticket ready and done. CLAUDE.md
and the session procedures refer to it and state nothing.
-->

## Context

<!-- Why this exists. Enough that someone holding this repository and nothing
     else can act on it, with no memory of the conversation it came from. -->

## Scope

<!-- For a decision: the choices that have to be made.
     For work: testable acceptance criteria, one per line. -->

- [ ] 

<!-- Anything that moves on screen carries this criterion as well. A passing
     check is not evidence that motion looks right. -->

- [ ] Watched and seen: 

## Constraints

<!-- What limits the solution. In particular: which open decision this work
     must NOT settle along the way. If the work reaches that boundary, stop
     and say so rather than deciding it in code. -->

## Related

<!-- Decision numbers, related tickets. -->

---

**Ready** when the scope is concrete, every criterion is testable, and the
constraints name what this ticket may not decide.

**Done** when all four of these hold:

1. The criteria above are **met and verified**, not assumed — and they were
   fixed before the work started rather than written afterwards to match what
   was built.
2. Anything with observable behavior was **exercised**, not merely built. Here
   that usually means watched.
3. Work and its documentation changed **together**, in the same commit.
4. The change is **merged**.

These four are the conditions every ticket is finished under, and they are the
same for all of them. What a ticket adds is its own criteria, above — that is
[W1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#w1),
and it is a different thing from this list.

**No command decides any of the four.** There is no build, no test runner and no
check chain — that is decision 0009 — so until one exists they are carried by
review alone. Worth knowing rather than papering over.

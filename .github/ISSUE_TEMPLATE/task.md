---
name: Task
about: A decision to make or work to do
title: ''
labels: ''
---

<!--
Adapted from agent-manual/issue-templates/task.md in agent-project-rules.
Three changes: the handbook's "CI is green" condition is dropped, because there
is no CI here and no check chain to be green — decision 0009 owns creating one;
the "Watched and seen" criterion is ours, because the failures that matter here
are visual; and conditions 4 to 6 of Ready are ours, because 0012 §2 and §6 hang
a set-level activity on Ready that the handbook's template knows nothing about.

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

**Ready** when three things hold of the ticket itself:

1. The scope is **concrete**.
2. Every criterion is **testable**.
3. The constraints name what this ticket **may not decide**.

**And three more that no ticket can reach alone.**
[0012](../../docs/adr/0012-how-software-gets-developed.md) §2 and §6 own them
and they are not restated here:

4. **Named blockers are cleared or sequenced.** A header saying *waits on #91*
   describes state; it does not satisfy a condition.
5. **Numbers the records defer are fixed here.** 0008 R1 puts them in the code
   and in the ticket that fixed the criteria before the work started, never in
   a record — so a ticket needing one and not carrying it is not ready.
6. **Independence and order are established for the whole set at once**, at the
   start of a sprint, before any agent starts. §6 makes independence a property
   of the set, so this is the one condition a ticket cannot acquire by being
   edited.

**A `Ready:` header written when the work was broken down is state before that
activity, not the result of it.** 0012 §1 says phase 3 cut the work into
tickets and did not establish readiness. Read such a header as *nothing known
to block this yet*.

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
[W1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#w1),
and it is a different thing from this list.

**No command decides any of the four.** There is no build, no test runner and no
check chain — that is decision 0009 — so until one exists they are carried by
review alone. Worth knowing rather than papering over.

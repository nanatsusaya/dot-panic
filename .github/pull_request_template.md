<!--
Adapted from agent-manual/pull-request.md in agent-project-rules. Two
changes: the "Watched" section is ours, because the failures that matter here
are visual; and "Verified" names the one command this project has.

One concern per change. Delete any section that is genuinely not applicable —
an empty heading reads as "considered and found empty".

A closing keyword next to an issue number — closes, fixes, resolves — closes
that issue when this merges, and the parser does not read a negation in front
of it. "This does not close #83" closes #83. Write one only when the merge
should close the ticket; to mention an issue otherwise, name it with no verb
in front of it. Then check the issue's state after the merge rather than
trusting the description.
-->

## What

<!-- What this change does, concretely. -->

## Why

<!-- The problem it solves. If it follows from a decision or a ticket, say
     which, and link it. -->

## Verified

<!-- How you know it works. Name the commands you ran and what they returned —
     not what they would have returned. State what you did NOT verify.

     The method check, run alone and never in a pipeline:
     node ../agent-project-rules/checks/check-method.mjs . -->

## Watched

<!-- Anything touching motion is verified by watching it. Say what was watched
     and what was seen. A passing check is not evidence that the toy works.
     Delete if this change moves nothing on screen. -->

## Open questions

<!-- Numbered O1..On, each with a recommended default. Delete if none. Do not
     answer them yourself. -->

## Follow-ups

<!-- What this deliberately leaves undone, and where it is recorded. -->

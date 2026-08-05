<!--
Copied from agent-manual/pull-request.md in agent-project-rules. The five
headings below are the shape and are the same in every project that takes that
handbook. What, Why and Verified are always answered; Open questions and
Follow-ups are deleted when there are none — an empty heading reads as
"considered and found empty".

One concern per change. The decider merges, never the author.

**Watched is this project's one declared section**, and one is what the handbook
permits. It exists because the failures that matter here are visual: 0001 §3.1
puts "it reads as a flock" beyond what any command will ever decide, so a change
that moves something on screen has no other evidence.

Three other things differ from the published file, declared here so that a later
reader can tell a change somebody made from one that drifted in:

- Verified points at CLAUDE.md's Commands section rather than naming a command
  string. That file is the authority for the four checks and what each decides,
  and a string copied here goes stale the first time a script is renamed.
- The spelling is American, which is this repository's regime.
- The warning below about closing keywords is ours. The handbook has none.

A closing keyword next to an issue number — closes, fixes, resolves — closes
that issue when the pull request merges, and the parser does not read a negation
in front of it: "this does not close #NN" closes it. It is also silently inert
inside a code span, so write the line as plain text and never in backticks. It
goes once, at the end of the description. Write one only when the merge should
close the ticket; to mention an issue otherwise, name it with no verb in front
of it. Then check the issue's state after the merge rather than trusting the
description.
-->

## What

<!-- What this change does, concretely. -->

## Why

<!-- The problem it solves. If it follows from a decision or a ticket, say
     which, and link it. -->

## Verified

<!-- How you know it works. Name the commands you ran and what they returned —
     not what they would have returned. Anything with observable behavior was
     exercised, not merely built. State what you did NOT verify.

     The four checks, what each decides, and the rule that none of them runs in
     a pipeline are in CLAUDE.md's Commands section. -->

## Watched

<!-- Anything touching motion is verified by watching it. Say what was watched,
     on what, and what was seen. A passing check is not evidence that the toy
     works. Delete if this change moves nothing on screen. -->

## Open questions

<!-- Numbered O1..On, each with a recommended default. Delete if none.

     Do not answer them yourself. When the answer comes it arrives as a comment
     on this pull request, naming the O-number — and nothing already written
     here is rewritten. This section keeps one line per question:
     `O1 — answered: … → <link>`.

     An answer edited into this description overwrites the question it answers.
     It gets no permalink, notifies nobody, carries no timestamp except one
     typed by hand, and races whoever else is editing. The durable consequence
     goes where it belongs: the decision record, or docs/STATUS.md. -->

## Follow-ups

<!-- What this deliberately leaves undone, and where it is recorded. -->

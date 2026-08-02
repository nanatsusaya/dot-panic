# Decisions

One file per decision, named `NNNN-slug.md`. Every file appears in the table
below with the status the file itself claims — a disagreement between the two is
checked and fails.

A decision is **immutable once accepted**. It changes by an authorized amendment
recorded inside it, quoting the superseded wording verbatim, or by a later
decision that supersedes it and flips this status. Never by editing.

**Status says whether the choice is binding. It says nothing about whether the
thing exists.** Implementation stage is tracked separately, in
[STATUS.md](../STATUS.md).

## The shape of a record

Written down here because a session that has no session procedures installed
otherwise has no way to know what a record in this project looks like.

**Header:** status · date · deciders · the ticket it was written against ·
what it depends on · what it supersedes or amends. Dependencies name the
**sections** relied on, not only the record — "0002 §3" tells a reader what to
go and check; "0002" tells them to read all of it.

**Body, in this order:**

| Section | What belongs in it |
|---|---|
| Context | The forces. What an earlier record already fixed, versus what is genuinely open. State the problem so a reader who disagrees with the outcome can still see it was the right problem. Include the repository state at the time of writing when the record is written against a blank slate. |
| Decision | Numbered subsections, each making an actual choice. **Prefer formulations a command could decide** — a choice phrased as a principle becomes folklore by the third session. |
| Consequences | Positive **and** negative. A record with no negative consequences has not been thought about, and a reader can tell. |
| Alternatives considered | Each with a one-line "rejected because". |
| Open questions | `O1..On`, the choices that genuinely belong to the decider, each with a recommended default. Never answered by the author. |
| References | Primary sources, with the date they were read. |

Once the open questions are answered they become **Resolved questions**,
`R1..Rn`, recording what was decided and why — including what an earlier draft
said, where the answer changed it.

Two things this shape is deliberately strict about. A section that only
surveys options is not a decision and does not belong under *Decision*. And a
record that would be falsified by a choice another record owns has taken
territory that is not its own — say so in *Consequences* rather than deciding
it quietly.

## The set

The numbers run top-down: what the thing is, then how it is shaped, then what
constrains it, then how it is built. A record is written only once the decisions
it depends on are Accepted — scoping one against an unanswered question is how a
record ends up deciding something that was never its own.

| # | Decision | Answers | Status |
|---|---|---|---|
| [0001](0001-purpose-scope-and-success.md) | Purpose, scope and success | What is this, who for, when is it good enough, what is explicitly out | Accepted |
| [0002](0002-overall-architecture.md) | Overall architecture | Which layers exist, which may depend on which, what the core may not touch | Accepted |
| 0003 | Security and privacy by design | What is worth protecting, where the trust boundaries are, what never runs or is stored | Planned |
| 0004 | Compliance, accessibility and rights | Motion and reduced-motion, license, provenance of the model, what law applies | Planned |
| 0005 | Rendering and visual design | Canvas, SVG or DOM; color, light and dark, pixel density | Planned |
| 0006 | Motion rules | Bounded frame, minimum speed, non-overlap as a constraint | Planned |
| 0007 | Pointer and input model | Mouse and touch, radius of effect, how it decays | Planned |
| 0008 | Performance budget | How many dots at what frame rate on which device | Planned |
| 0009 | Toolchain | What runs the code, what tests it, what builds it | Planned |
| 0010 | Testing strategy | What is asserted by a command and what is only ever watched | Planned |
| 0011 | Delivery | How it reaches the public URL, and when | Planned |
| 0013 | Origin of the core | Written here or taken from a package | Planned |

**0012 is missing on purpose.** It was planned as a walking-skeleton record and
dropped before it was written: a first end-to-end slice is work to be done, not
a choice with alternatives. It becomes a ticket instead. **The number is not
reused** — a number is how the rest of the project refers to a decision, and one
that means something different later is worse than one that means nothing.

`Planned` means the topic is fixed and the record is not yet written; it is the
only status a row may carry without a file behind it. A `Planned` row is not a
promise that the record will say anything in particular — only that the question
belongs to this project and has not been answered.

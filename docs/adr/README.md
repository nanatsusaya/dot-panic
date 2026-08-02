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

**The table runs top-down by meaning, not by number:** what the thing is, then
how the work is done, then how the thing is shaped, then what constrains it,
then how it is built. A record is written only once the decisions it depends on
are Accepted — scoping one against an unanswered question is how a record ends
up deciding something that was never its own.

**A number is an identity and nothing else.** It is what every reference in the
project uses, so it never moves; it says nothing about where a record belongs.
The two used to coincide, because the first numbers were handed out in the order
above — and they came apart the first time a topic turned out to be important
and unforeseen. Reading position out of a number is a mistake this table no
longer supports.

| # | Decision | Answers | Status |
|---|---|---|---|
| [0001](0001-purpose-scope-and-success.md) | Purpose, scope and success | What is this, who for, when is it good enough, what is explicitly out | Accepted |
| [0002](0002-overall-architecture.md) | Overall architecture | Which layers exist, which may depend on which, what the core may not touch | Accepted |
| [0012](0012-how-software-gets-developed.md) | How software gets developed here | Analysis then increments; where test-first applies and what replaces it where it cannot; when work may run in parallel | Accepted |
| [0003](0003-security-and-privacy-by-design.md) | Security and privacy by design | What is worth protecting, where the trust boundaries are, what never runs or is stored | Accepted |
| 0004 | Compliance, accessibility and rights | Motion and reduced-motion, license, provenance of the model, what law applies | Planned |
| 0005 | Rendering and visual design | Canvas, SVG or DOM; color, light and dark, pixel density | Planned |
| 0006 | Motion rules | Bounded frame, minimum speed, non-overlap as a constraint | Planned |
| 0007 | Pointer and input model | Mouse and touch, radius of effect, how it decays | Planned |
| 0008 | Performance budget | How many dots at what frame rate on which device | Planned |
| 0009 | Toolchain | What runs the code, what tests it, what builds it | Planned |
| 0010 | Testing strategy | What is asserted by a command and what is only ever watched | Planned |
| 0011 | Delivery | How it reaches the public URL, and when | Planned |
| 0013 | Origin of the core | Written here or taken from a package | Planned |

0012 sits third because it decides how everything below it gets built. Its
number says when it was written, which is a different question.

**0012 was reserved as unused and is now in use.** It was planned as a
walking-skeleton record and dropped before it was written — a first end-to-end
slice is work to be done, not a choice with alternatives — and the number was
then declared never to be reused, on the grounds that a number meaning something
different later is worse than one meaning nothing.

That was set aside on 2026-08-02 with the decider's authorization, because the
reason does not apply: [0012](0012-how-software-gets-developed.md) §2 makes the
walking skeleton a consequence of itself, so the number came to mean the larger
frame the original topic sits inside rather than something unrelated. **This does
not open the numbers generally.** It was the only gap, there is not a second, and
renumbering is unavailable while 0002 is accepted and names six planned numbers.
The reasoning is in the [method log](../method-log.md).

`Planned` means the topic is fixed and the record is not yet written; it is the
only status a row may carry without a file behind it. A `Planned` row is not a
promise that the record will say anything in particular — only that the question
belongs to this project and has not been answered.

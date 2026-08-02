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
what it depends on · what it supersedes or amends · whether it **has been**
amended, and when. Dependencies name the **sections** relied on, not only the
record — "0002 §3" tells a reader what to go and check; "0002" tells them to
read all of it.

**Body, in this order:**

| Section | What belongs in it |
|---|---|
| Context | The forces. What an earlier record already fixed, versus what is genuinely open. State the problem so a reader who disagrees with the outcome can still see it was the right problem. Include the repository state at the time of writing when the record is written against a blank slate. |
| Decision | Numbered subsections, each making an actual choice. **Prefer formulations a command could decide** — a choice phrased as a principle becomes folklore by the third session. |
| Consequences | Positive **and** negative. A record with no negative consequences has not been thought about, and a reader can tell. |
| Alternatives considered | Each with a one-line "rejected because". |
| Open questions | `O1..On`, the choices that genuinely belong to the decider, each with a recommended default. Never answered by the author. |
| Amendments | Only in a record that has been amended. `A1..An`, each quoting the superseded wording verbatim, naming what replaced it, and quoting the decider's authorization with its date. |
| References | Primary sources, with the date they were read. |

Once the open questions are answered they become **Resolved questions**,
`R1..Rn`, recording what was decided and why — including what an earlier draft
said, where the answer changed it. **Every reference in the body moves with
them**, and nothing checks that it did: `check-method.mjs` resolves links between
documents, not a record's references to its own sections. The whole of the rule
is that an Accepted record contains no `O`-number, and review is what carries it.

**An amendment changes the body in place and logs itself at the bottom.** The
sections above *Amendments* always state what is true now, so a reader who starts
at the top is never reading superseded wording — which is why the log sits near
the end, with the other provenance, rather than as a warning at the front. The
header is what announces that a record has one. An amendment exists only with the
decider's explicit authorization, and quoting it is not ceremony: it is the only
evidence a later session has that the authorization was ever given.

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
| [0012](0012-how-software-gets-developed.md) | How software gets developed here | The seven phases and which of them has no end; where test-first applies and what replaces it where it cannot; when work may run in parallel | Accepted |
| [0003](0003-security-and-privacy-by-design.md) | Security and privacy by design | What is worth protecting, where the trust boundaries are, what never runs or is stored | Accepted |
| [0004](0004-compliance-accessibility-and-rights.md) | Compliance, accessibility and rights | Motion and reduced-motion, license, provenance of the model, what law applies | Accepted |
| [0005](0005-rendering-and-visual-design.md) | Rendering and visual design | Canvas, SVG or DOM; color, light and dark, pixel density | Accepted |
| [0006](0006-motion-rules.md) | Motion rules | Bounded frame, minimum speed, non-overlap as a constraint | Accepted |
| [0007](0007-pointer-and-input-model.md) | Pointer and input model | Mouse and touch, radius of effect, how it decays | Accepted |
| [0014](0014-page-layout.md) | Page layout | How the flock, the imprint and the explanation are arranged; how the canvas is sized against them | Accepted |
| [0015](0015-settings-surface.md) | Settings surface | Whether the visitor may change the flock, which values are exposed, and what bounds them | Accepted |
| [0008](0008-performance-budget.md) | Performance budget | How many dots at what frame rate on which device | Accepted |
| [0009](0009-toolchain.md) | Toolchain | What runs the code, what tests it, what builds it | Accepted |
| [0010](0010-testing-strategy.md) | Testing strategy | What is asserted by a command, what a person measures, and what is only ever watched | Accepted |
| [0011](0011-delivery.md) | Delivery | How it reaches the public URL, and when | Accepted |
| 0013 | Origin of the core | Written here or taken from a package | Planned |
| 0016 | Maintainability and maintenance | What keeps this maintainable, who re-reads the commitments that depend on time, and what the project is once delivery ends | Planned |

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

**0014 was added after the set was planned**, by
[0007](0007-pointer-and-input-model.md) R1: its §8 requires that the imprint stay
reachable by a gesture that does not begin on the canvas, and no existing row
owned that. It takes the next free number rather than being folded into a
neighbor, because widening a planned row changes a topic this table has already
fixed. Its position between 0007 and 0008 is by meaning and says nothing about
the order the two are written in — R1 covers that.

**0015 was added the same way**, by [0014](0014-page-layout.md) R5.
[0001](0001-purpose-scope-and-success.md) R3 left a settings surface to its own
record *if it ever becomes a real question*, and 0014 §4 puts a dialog on the
page, which is where one would go — so it became one. Two accepted records bound
it before it is written: 0003 §4 stores nothing on the visitor's device, and 0006
§2 makes a dot count that cannot be packed into the frame unsatisfiable.

**0016 was added by [0012](0012-how-software-gets-developed.md) §1**, which names
seven phases and says of the last two that what being maintainable requires, and
what the project is once delivery ends, needs a record of its own. It sits last
because it is about the project after everything above it has been built, which
is the one position in this table that is chronological rather than by meaning.

**Three rows have now been added after the set was planned**, and that is the
mechanism working rather than the plan failing. Each came from a record finding a
topic no existing row owned, each took the next free number, and each arrived
with a ticket in the same change. It is the numbering in
[0012](0012-how-software-gets-developed.md)'s paragraph above that is closed, not
the set.

`Planned` means the topic is fixed and the record is not yet written; it is the
only status a row may carry without a file behind it. A `Planned` row is not a
promise that the record will say anything in particular — only that the question
belongs to this project and has not been answered.

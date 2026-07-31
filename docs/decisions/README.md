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

## The set

The numbers run top-down: what the thing is, then how it is shaped, then what
constrains it, then how it is built. A record is written only once the decisions
it depends on are Accepted — scoping one against an unanswered question is how a
record ends up deciding something that was never its own.

| # | Decision | Answers | Status |
|---|---|---|---|
| 0001 | Purpose, scope and success | What is this, who for, when is it good enough, what is explicitly out | Planned |
| 0002 | Overall architecture | Which layers exist, which may depend on which, what the core may not touch | Planned |
| 0003 | Security and privacy by design | What is worth protecting, where the trust boundaries are, what never runs or is stored | Planned |
| 0004 | Compliance, accessibility and rights | Motion and reduced-motion, license, provenance of the model, what law applies | Planned |
| 0005 | Rendering and visual design | Canvas, SVG or DOM; color, light and dark, pixel density | Planned |
| 0006 | Motion rules | Bounded frame, minimum speed, non-overlap as a constraint | Planned |
| 0007 | Pointer and input model | Mouse and touch, radius of effect, how it decays | Planned |
| 0008 | Performance budget | How many dots at what frame rate on which device | Planned |
| 0009 | Toolchain | What runs the code, what tests it, what builds it | Planned |
| 0010 | Testing strategy | What is asserted by a command and what is only ever watched | Planned |
| 0011 | Delivery | How it reaches the public URL, and when | Planned |
| 0012 | Walking skeleton | What the first end-to-end slice contains | Planned |
| 0013 | Origin of the core | Written here or taken from a package | Planned |

`Planned` means the topic is fixed and the record is not yet written; it is the
only status a row may carry without a file behind it. A `Planned` row is not a
promise that the record will say anything in particular — only that the question
belongs to this project and has not been answered.

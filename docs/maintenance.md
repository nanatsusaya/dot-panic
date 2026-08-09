# Maintenance

*Every commitment in this project that depends on time, one row each.*
[0016](adr/0016-maintainability-and-maintenance.md) §2 decides this file and
its columns, §3 what separates a dated row from a standing one, and §4 when it
is read, when it is worked, and why a reading that comes out the wrong way
stops at the decider.

**This list decides nothing.** Every row points at the record that owns the
commitment and restates none of it. A row that disagrees with the record it
names is wrong by construction, and the row is what gets repaired.

| The commitment | Owner | Kind | Last read | What makes it due |
|---|---|---|---|---|
| The slowdown factor standing in for the device floor | [0008](adr/0008-performance-budget.md) §8 | Dated | Never — no factor has been chosen | The first measurement chooses one and writes down the date it was read. The floor rolls forward every year, so that date is the only thing that later shows it has moved |
| Which browser features are Baseline widely available | [0009](adr/0009-toolchain.md) §4 | Standing | 2026-08-08, after [#96](https://github.com/nanatsusaya/dot-panic/issues/96) | A change that names a browser feature. No compiler setting reaches this half of the floor, so the reading is made where the feature is used |
| The ECMAScript year `target` and `lib` name | [0009](adr/0009-toolchain.md) §4 | Dated | 2026-08-05, in [#69](https://github.com/nanatsusaya/dot-panic/issues/69) | **2028-05-11.** ES2023 is the highest year fully Baseline widely available; ES2024 waits on `Atomics.waitAsync`, which reached the fourth browser only on 2025-11-11. Raising the setting is a change somebody makes, never something that happens |
| The `showModal()` bridge the Shell holds open | [0014](adr/0014-page-layout.md) §5 | Dated | 2026-08-02 | **2028-06-12.** Invoker commands reach Baseline widely available, the markup becomes permitted, and the handler can go |
| Provenance of the Core, and both halves of *read but do not copy* | [0013](adr/0013-origin-of-the-core.md) §7, §8 | Standing | 2026-08-09, in [#99](https://github.com/nanatsusaya/dot-panic/issues/99) — nothing consulted; 2026-08-05, in [#91](https://github.com/nanatsusaya/dot-panic/issues/91) — Vigna's `splitmix64.c` | Code being written into the Core. The question is answered while it is written and by nobody afterwards |
| The ruleset version the deploy workflow pins | [0016](adr/0016-maintainability-and-maintenance.md) §6 | Standing | 2026-08-08, in [#98](https://github.com/nanatsusaya/dot-panic/issues/98) — pinned at `v0.5.3` | A release of `agent-project-rules`, which is §6's fourth kind of maintenance work. That trigger already moves the five procedure copies; this is the second thing on it, and the two are read together or the workflow decides a deployment against a catalog this project has not adopted |

**Three rows are standing and three are dated**, where 0016's *Context* table
counts three commitments that move with time. Moving with time is not what §3
splits on: a dated row is one that a **date** makes due. Calling the
browser-feature row dated would mean inventing a review interval, which is what
§3 refuses for the standing row it names.

**The two rows above it are the same floor read at two grains**, and they part
where the tooling does. 0009 §4 gives the ECMAScript half a compiler setting
with a version in it, so that half has a date the next reading can be measured
against; the DOM half has no version anywhere, so it stays standing and is read
where a feature is used. A session that repairs one without the other has
repaired half of 0001 §3.4.

**The word *after* in one Last-read cell is the row failing rather than
working.** Every other reading in this file was made inside the change that
needed it, which is what *the reading is made where the feature is used* asks
for. [#96](https://github.com/nanatsusaya/dot-panic/issues/96) named a feature no
reading had covered and merged without one; the reading was made at the wind-down
that followed, and the cell says so instead of borrowing the ticket's credit.
**Nothing here catches that**, and 0016 §4 puts the noticing in a person.

**One dated row carries no date yet**, and that is the state rather than a gap
in this file. [0008](adr/0008-performance-budget.md) §8 fixes that the factor
is recorded with the date it was read and leaves the number to whoever measures.
**What is missing is the ratio and not a measurement**: one step over 200 dots
has been timed here more than once — 0.382 ms in
[#99](https://github.com/nanatsusaya/dot-panic/issues/99), and 0.895 ms in
[#102](https://github.com/nanatsusaya/dot-panic/issues/102) once non-overlap was
added — but §8's factor is a **ratio** against 0001 §3.5's floor device, and
nothing here has run on one. A number from a development machine alone would put
a date beside a factor nobody measured, and the date is what reads as evidence.
The row is here so that the session which chooses the factor sees that writing
the date down is part of choosing it.

**The provenance row carries two readings and cannot tell anyone about the
changes between them.** [#91](https://github.com/nanatsusaya/dot-panic/issues/91)
named Vigna's `splitmix64.c`, and
[#99](https://github.com/nanatsusaya/dot-panic/issues/99) recorded that nothing
was consulted for the three steering behaviors. Five other changes wrote into
`core/` and recorded neither, which is **compatible with
[0013](adr/0013-origin-of-the-core.md) §7 rather than a breach of it** — that
section asks for an implementation *actually consulted* to be named, so nothing
consulted leaves nothing to write. What it is not is evidence that anyone asked,
and asking is what this row is for.

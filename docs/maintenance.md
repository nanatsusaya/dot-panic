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
| Which browser features are Baseline widely available | [0009](adr/0009-toolchain.md) §4 | Standing | 2026-08-02, in [0014](adr/0014-page-layout.md)'s *References* | A change that names a browser feature. No compiler setting reaches this half of the floor, so the reading is made where the feature is used |
| The `showModal()` bridge the Shell holds open | [0014](adr/0014-page-layout.md) §5 | Dated | 2026-08-02 | **2028-06-12.** Invoker commands reach Baseline widely available, the markup becomes permitted, and the handler can go |
| Provenance of the Core, and both halves of *read but do not copy* | [0013](adr/0013-origin-of-the-core.md) §7, §8 | Standing | Nothing has entered `core/` | Code being written into the Core. The question is answered while it is written and by nobody afterwards |

**Two rows are standing and two are dated**, where 0016's *Context* table counts
three commitments that move with time. Moving with time is not what §3 splits
on: a dated row is one that a **date** makes due, and 2028-06-12 is the only
such date any record carries. Calling the browser-feature row dated would mean
inventing a review interval, which is what §3 refuses for the standing row it
names.

**One dated row carries no date yet**, and that is the state rather than a gap
in this file. [0008](adr/0008-performance-budget.md) §8 fixes that the factor
is recorded with the date it was read and leaves the number to whoever
measures; nothing has been measured, because there is no toolchain. The row is
here so that the session which chooses the factor sees that writing the date
down is part of choosing it.

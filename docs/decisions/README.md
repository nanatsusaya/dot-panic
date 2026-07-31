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

| # | Decision | Status |
|---|---|---|
| 0001 | Write the simulation core rather than take a package | Planned |
| 0002 | Motion rules: bounded frame, minimum speed, no overlap | Planned |
| 0003 | Pointer model, including touch | Planned |
| 0004 | Neighbor search, and what triggers replacing it | Planned |
| 0005 | Performance budget, and what done means for the toy | Planned |
| 0006 | Toolchain: what runs the code, what tests it, what builds it | Planned |

`Planned` means ticketed and not yet written; it is the only status a row may
carry without a file behind it.

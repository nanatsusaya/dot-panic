# 0016 — Maintainability and maintenance

- **Status:** Proposed
- **Date:** 2026-08-05
- **Deciders:** Daniel Wagner
- **Ticket:** [#83](https://github.com/nanatsusaya/dot-panic/issues/83)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3 (what good enough
  means, and therefore where delivery ends), §3.4 (the Baseline floor), §3.5 (the
  device floor), §5 (what is out of scope) ·
  [0002](0002-overall-architecture.md) §5 (no domain logic outside the Core) ·
  [0003](0003-security-and-privacy-by-design.md) §2 (the page loads nothing it
  does not ship) · [0008](0008-performance-budget.md) §8 (the slowdown factor,
  recorded with the date it was read) · [0009](0009-toolchain.md) §4 (browser
  APIs sit outside what `target` and `lib` decide), §7 (three development
  dependencies, and the count is the rule) ·
  [0010](0010-testing-strategy.md) §1 (the three registers), A1 (the coverage
  floor enforces no architecture rule) · [0011](0011-delivery.md) §1 (static
  files on GitHub Pages), §6 (the rules held by a person, and the first of them
  to become a command), §7 (the first deployment) ·
  [0012](0012-how-software-gets-developed.md) §1 (seven phases; the last two
  named and not decided) · [0013](0013-origin-of-the-core.md) §7 (a third-party
  implementation may be read; nothing is copied), §8 (provenance is decided by
  no command) · [0014](0014-page-layout.md) §5 (the `showModal()` bridge and its
  end date)
- **Supersedes / amends:** nothing
- **Amended:** no

## Context

[0012](0012-how-software-gets-developed.md) §1 names seven phases and says of the
last two that what being maintainable requires of this project, and what the
project is once delivery ends, needs a record of its own. This is that record.

**Repository state.** Fifteen records are Accepted and no line of the toy exists.
There is no toolchain, no `core/`, no page and nothing deployed. This record is
therefore written about a project whose maintainable part is, today, entirely
documents.

**What can rot here is not an installation.** There is no server, no database and
no runtime dependency: [0009](0009-toolchain.md) §7 fixes three development
dependencies and nothing else, [0003](0003-security-and-privacy-by-design.md) §2
forbids loading anything the page does not ship, and
[0011](0011-delivery.md) §1 serves static files. Nothing here can be left
unpatched, go down at three in the morning, or run up a bill. **Maintenance in the
usual operational sense has no subject in this project**, and a record that
imported the usual vocabulary would be deciding for a shape this project does not
have.

**What can rot is a written claim that stopped being true.** Four commitments
already carry a sentence saying that nothing re-reads them. Three of them move
with time; the fourth never moves and can never be checked, which is a different
problem with the same symptom:

| The commitment | Owner | Why it needs re-reading |
|---|---|---|
| The slowdown factor standing in for the device floor, and the date it was read | [0008](0008-performance-budget.md) §8 | *Roughly three years old* rolls forward every year, so the floor gets easier without anyone loosening it |
| Which browser features are Baseline widely available | [0009](0009-toolchain.md) §4 | `lib` is versioned by ECMAScript year and the DOM library is not versioned at all, so no compiler setting can hold this half of 0001 §3.4 |
| The `showModal()` bridge | [0014](0014-page-layout.md) §5 | Invoker commands reach Baseline widely available on **2028-06-12**, after which the markup is permitted and the handler can go |
| Provenance, and both halves of *read but do not copy* | [0013](0013-origin-of-the-core.md) §7, §8 | Nothing moves; no command can decide any of it, ever |

**The set has been both shrinking and growing.** [0011](0011-delivery.md) §6
named three rules held by a person and closed the first of them — the imprint
address, which became a check because
[0004](0004-compliance-accessibility-and-rights.md) §3 had chosen a placeholder
string that could not be anything else.
[0013](0013-origin-of-the-core.md) §8 then added a fourth, and
[0010](0010-testing-strategy.md) A1 removed an enforcement
[0002](0002-overall-architecture.md) §5 was believed to have. Counting them in one
place is half of what this record is for.

**The mechanism to carry them is already installed and has nothing to read.**
[`/moin`](../../.claude/skills/moin/SKILL.md) step 5 compares a maintenance
list's due dates to today and reports what is due without running it;
[`/feierabend`](../../.claude/skills/feierabend/SKILL.md) step 4 runs what is due
and updates the date. Both begin *if the project keeps a calendar-driven
maintenance list*. This project keeps none, so both steps have been passing over
an empty question at every session boundary since 2026-08-01.

## Decision

### 1. What is maintained is this repository, and nothing operational

There is no uptime commitment, no monitoring, no alerting and no on-call, and this
record creates none. The published page is static files served by a host this
project does not run; if that host is down, this project has no lever and no
obligation, and [0001](0001-purpose-scope-and-success.md) §5 already closes
anything that would create one.

**Stated as a decision rather than left silent**, because *maintenance* imports an
operational meaning by default, and the next session should not go looking for the
runbook this record deliberately does not write.

### 2. Every commitment that depends on time is one row in one list

The list lives in `docs/maintenance.md` and each row carries five things: **what**
the commitment is, **which record and section owns it**, whether it is **dated or
standing** (§3), **the date it was last read**, and **what makes it due**.

**The list decides nothing.** It is a routing table over rules that already have
authorities, which is what keeps it from becoming a second one: a row that
disagrees with the record it names is wrong by construction, and the repair is
always the row.

**Creating the file is work with its own ticket**, not a side effect of this
record being accepted. So is populating it with the four rows in *Context* above.

### 3. A row is dated or standing, and a standing row says so

- **Dated.** A date makes it due, and re-reading it is a task with an outcome —
  the date moves, or the row closes. The `showModal()` bridge is one: on
  2028-06-12 it becomes work rather than a note.
- **Standing.** No date makes it due; a person re-reads it when the area is
  touched, and the row exists so that a session can see the rule at all. Every
  entry in [0013](0013-origin-of-the-core.md) §8's *neither* list is standing.

**A standing row is not a weaker dated row, and the list does not pretend
otherwise.** Giving provenance a review date would manufacture a cadence for
something no cadence helps: the question *was anything copied* is answered at the
moment code is written and by nobody afterwards.

### 4. The list is read at every session start and worked at a session end

No new mechanism is decided here, because the two procedures already do it and
this record's job is to give them the file they ask for.
[`/moin`](../../.claude/skills/moin/SKILL.md) step 5 reports what is due and
explicitly does not run it; [`/feierabend`](../../.claude/skills/feierabend/SKILL.md)
step 4 runs what is due and updates the date.

**Nothing is scheduled, and nothing runs unattended.** There is no cron, no
workflow on a timer and no service, which is what
[#83](https://github.com/nanatsusaya/dot-panic/issues/83) requires of this record
and also what [0009](0009-toolchain.md) §7 makes true of the toolchain. A
commitment comes due when a person sits down, and if nobody sits down for a year
then nothing was due to anybody.

### 5. The rules no command decides are enumerated here, and this is the enumeration

| Rule | Owner | What would decide it |
|---|---|---|
| The device floor, through 0008 §8's factor and its date | [0008](0008-performance-budget.md) §8 | Nothing. A person applies the factor while measuring |
| Which browser features may be used | [0009](0009-toolchain.md) §4 | Nothing available: `tsc` bounds syntax and ECMAScript APIs, not DOM features, and Biome has no browser-support rule group |
| *No domain logic outside the Core* | [0002](0002-overall-architecture.md) §5 | Review, and only review — [0010](0010-testing-strategy.md) A1 is why the coverage floor is not an answer |
| Provenance of the Core, and *read but do not copy* | [0013](0013-origin-of-the-core.md) §7, §8 | Nothing, by that record's own finding |
| That the imprint address is real rather than merely not the placeholder | [0004](0004-compliance-accessibility-and-rights.md) R2 | Nothing. [0011](0011-delivery.md) §6 catches the placeholder string and cannot catch a wrong address |

**This table is a routing table and not an authority**, on §2's reasoning. What it
adds is the count: **five**, where [0011](0011-delivery.md) §6 named three and
closed one of them.

**A rule leaves this table only by acquiring a command**, and the precedent for
how that happens is 0011 §6 — a check became possible because an earlier record
had chosen a string that could not occur by accident. Wishing for a check is not
the same as one existing, and a row here is not a promise that one is coming.

### 6. The maintenance phase admits four kinds of work and no others

After [0001](0001-purpose-scope-and-success.md) §3 is satisfied and delivery ends,
work happens here only when one of these is true:

1. A **dated commitment** from §2's list has come due.
2. A **defect on the live page** — it no longer does what
   [0001](0001-purpose-scope-and-success.md) §3 says good enough means.
3. A **platform change breaks it** — a browser, or the host, moves under a page
   that was correct when it shipped.
4. The **method this project demonstrates changes**, in the sense
   [`.claude/skills/README.md`](../../.claude/skills/README.md) already fixes: a
   release of `agent-driven-development`, whose handling that file owns and this
   record does not touch.

**Everything else is not maintenance and is not done.** In particular: no
features, no polish, no refactor for its own sake, and no rewrite onto whatever
is current. [0001](0001-purpose-scope-and-success.md) §5 already closes the
feature half by superseding-only, and this section closes the rest — a project
that is *good enough* by a definition it wrote down is finished being improved,
and continuing to improve it is [0001](0001-purpose-scope-and-success.md) §6.2's
failure arriving after delivery instead of before it.

### 7. The decision set is not archived, rewritten or retired

Records stay where they are, immutable, published, and in the same directory,
including any whose subject no longer exists. A record that the world has moved
past is superseded by a new one or amended with the decider's authorization —
the routes [docs/adr/README.md](README.md) already fixes — and never edited to
match, never deleted, and never moved into a history folder.

**Because the set is the artifact.** This project is a worked example of a method,
so a decision that turned out badly, and the record that superseded it, are worth
more together than a tidy set would be worth alone. That is also the answer to
what happens to them once nobody is building: nothing happens to them.

### 8. What is asserted, and what nothing decides

[0010](0010-testing-strategy.md) §1's registers, applied to this record:

- **Asserted.** That every record and section §2's list names resolves — the
  coherence check reads ordinary links between documents and fails on a broken
  one. Nothing else here is asserted.
- **Measured.** Nothing.
- **Neither.** Every date in the list, whether a row is honest about being
  standing, and whether anyone sat down to read it at all. §4 is a discipline
  attached to two procedures, which is the same class of control this project has
  already watched fail once — and it is the strongest available without the
  scheduler [#83](https://github.com/nanatsusaya/dot-panic/issues/83) forbids.

## Consequences

**Positive.**

- **The four commitments have an owner for the first time.** Each was written with
  its own sentence saying nothing re-read it; §2 replaces four gaps with one file.
- **Nothing new is installed to get it.** §4 uses two procedures that already ask
  for exactly this file, so the cost of the mechanism is zero dependencies and
  zero services — [0009](0009-toolchain.md) §7's three survive this record.
- **The count of person-held rules is visible.** §5 makes *five* a number a
  reader can see rather than a fact spread across four records, which is what
  made it possible to notice that the set had grown rather than shrunk.
- **The end of delivery has a shape.** §6 says what work still happens, which is
  what stops *maintenance* from becoming a phase where anything may be done
  because nothing is forbidden.

**Negative.**

- **The mechanism depends on people running the procedures.** A commitment comes
  due only when somebody sits down, and 2028-06-12 will pass unnoticed in a
  repository nobody opens. §8 says so rather than dressing it up.
- **A fifth living document is one more thing that can go stale.** The list
  restates nothing, but it names records and sections, and a section number that
  moves leaves a row pointing at the wrong place. Only the link half is checked.
- **§6 will be unwelcome exactly when it bites.** The four kinds of work exclude
  the change somebody wants to make, and the record cannot know in advance which
  one that is.
- **Nothing here helps the case that hurt most.** The defect
  [0010](0010-testing-strategy.md) A1 corrected was a false claim inside a record,
  and no list of dates would have found it. What finds that class is working the
  mechanism, which belongs to review and not to this record.

## Alternatives considered

- **A calendar or a scheduled workflow.** Rejected: it needs a service or a timer
  this project does not have, and [#83](https://github.com/nanatsusaya/dot-panic/issues/83)
  rules out requiring one. A GitHub Actions schedule would also mean a workflow
  running against a repository nobody is reading, which moves the noticing rather
  than solving it.
- **Nobody re-reads anything, said out loud.** Rejected, though it was a real
  option — [0010](0010-testing-strategy.md) §5 shows this project will answer
  *nobody* when that is the truth. Here it is not: two procedures already ask for
  the list, so the honest answer is not *nobody* but *nobody has written the file*.
- **The list inside [STATUS.md](../STATUS.md).** Rejected: that file is rewritten
  at every session end and is about where the project stands, while these rows
  outlive every session and change rarely. Mixing the two would make the stable
  half churn with the volatile one.
- **The list inside each record.** Rejected: it is where the rows already are, and
  that is the state this record exists to fix. Four sentences in four files is
  what nobody re-reads.
- **A maintenance phase with a service-level objective.** Rejected in §1: there is
  nothing to run, so a target for running it would be theater.
- **Archiving superseded records into a subdirectory.** Rejected in §7: the set is
  the artifact, and a tidy set is worth less than a complete one.

## Open questions

**O1 — Does this project ever end, and in what state?** §6 says what work happens
during maintenance and deliberately does not say whether maintenance stops.
Options: **(a)** it never formally ends — the page stays up, the repository stays
open, and work simply becomes rare; **(b)** the repository is archived on the
decider's word once the last dated commitment is closed, with the page left
serving; **(c)** archived and the page taken down. *Recommended default: (b)* —
archiving is reversible, it makes the state legible to a stranger, and taking the
page down would destroy the only artifact anyone can look at without reading
sixteen records.

**O2 — May an agent work a due commitment without asking?** §4 has `/feierabend`
running what is due, which was written for interval chores rather than for
re-reading a Baseline status and possibly finding that a floor moved. Options:
**(a)** any session may re-read and report, and only the decider authorizes the
change that follows; **(b)** a session may also make the change when the outcome
is only a date moving. *Recommended default: (a)* — reading is cheap and reversible,
and every commitment in §2's table touches an accepted record if the reading
comes out the wrong way.

**O3 — Does a platform change get fixed for as long as the page is up?** §6.3
admits the work without bounding it. Options: **(a)** yes, indefinitely, which is
an open-ended commitment on one person; **(b)** yes until the repository is
archived under O1, and after that the page stands or breaks as it will.
*Recommended default: (b)* — it is the only version that does not quietly promise
somebody's attention forever, and it makes O1's archiving the one decision that
ends the obligations rather than leaving them implicit.

## References

**No external source was read for this record, and none was needed.** Every
external fact it leans on is already carried by an accepted record with the date
it was read: the Baseline thirty-month rule and 2028-06-12 in
[0014](0014-page-layout.md), Bun's coverage behavior in
[0010](0010-testing-strategy.md), and `tsc`'s `target` and `lib` in
[0009](0009-toolchain.md). Restating any of them here would create a second copy
with a newer date and no new reading behind it.

The two in-repository authorities this record routes to rather than restates:

- [`.claude/skills/moin/SKILL.md`](../../.claude/skills/moin/SKILL.md) — step 5,
  which reports what is due and does not run it.
- [`.claude/skills/feierabend/SKILL.md`](../../.claude/skills/feierabend/SKILL.md)
  — step 4, which runs what is due and updates the date.

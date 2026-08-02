# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-02.*

## Position

The method has been adopted. **Nothing of the toy exists yet** — no simulation
code, no page, no rendering. Everything built so far is the way of working:
the operating rules, the decision set, four accepted records, and the five
session procedures in [`.claude/skills/`](../.claude/skills/README.md).

The procedures have now been used. `/moin`, `/weiterimtext` and `/adr` all ran
on 2026-08-02 and behaved as their files describe. `/feierabend` and `/passtdas`
have still never been invoked.

**The architecture is decided and none of it is built.**
[0002](adr/0002-overall-architecture.md) fixes a functional core inside an
imperative shell, three parts, and the directory layout that goes with them —
but `core/`, `shell/` and `view/` do not exist, and creating them is work that
needs a ticket, not a side effect of reading the record. There is still **no
toolchain at all**: no runtime, no test runner, no package manifest. That is
decision 0009.

**How the work gets built is decided as well, and nothing has been built under
it.** [0012](adr/0012-how-software-gets-developed.md) fixes an analysis phase
with no end condition, then increments; test-first in the Core without
exception; watch-first in the View, where no command can decide; and at most
three changes open for review at once.

**What the page may never do is decided.**
[0003](adr/0003-security-and-privacy-by-design.md) forbids loading anything off
its own origin, running any third-party code, storing anything on the visitor's
device, and making any network request after the page has loaded — and gives the
browser a copy of all three as a Content-Security-Policy. Nothing about a
visitor is recorded anywhere, and there is no mechanism left by which it could
be.

**Thirteen decisions are planned** in [docs/adr/](adr/README.md).
[0001](adr/0001-purpose-scope-and-success.md),
[0002](adr/0002-overall-architecture.md),
[0012](adr/0012-how-software-gets-developed.md) and
[0003](adr/0003-security-and-privacy-by-design.md) are Accepted; the other nine
are `Planned`. Number 0012 was reserved as unused until 2026-08-02; the index
says why it is not, and why the table is no longer ordered by number.

What is awaiting review is not repeated here. The
[pull request list](https://github.com/nanatsusaya/dot-panic/pulls) is the
authority for that, and a copy of it in this file would be wrong within a day.
Parked branches **are** named here, because nothing else announces them.
There are none.

## What the tickets hold

Six issues are open, and three of them exist for a reason worth knowing: they
are **not ready to be worked**, and they carry research that would otherwise
have existed only in the conversation that produced it.

| Ticket | State |
|---|---|
| [#8](https://github.com/nanatsusaya/dot-panic/issues/8) 0004 Compliance, accessibility, rights | ready — this is the next one |
| [#10](https://github.com/nanatsusaya/dot-panic/issues/10) 0006 Motion rules | not ready — holds the motion research |
| [#11](https://github.com/nanatsusaya/dot-panic/issues/11) 0007 Pointer and input model | not ready — holds the touch research |
| [#12](https://github.com/nanatsusaya/dot-panic/issues/12) 0013 Origin of the core | not ready — holds the package survey |
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | not ready — 0012 §2 makes it the first increment |
| [#23](https://github.com/nanatsusaya/dot-panic/issues/23) One authority for the definition of done | ready — see below |

**The imprint conflict this section used to name is settled**, and it turned out
not to be a conflict. 0003 R1 tells two parties apart: the person responsible
for a published project is attached to it by name on purpose, and P1 protects
the visitor, about whom nothing is recorded anywhere. P1 stands unnarrowed, no
adaptation is declared, the imprint text lives here as ordinary page content,
and `method.json` now binds `secrets` to the platform scanner instead of `null`.
What 0004 still owns is the legal half: whether an imprint is required, and what
it must contain.

**The definition of done is still stated twice** — in
[the ticket template](../.github/ISSUE_TEMPLATE/task.md) and in
[CLAUDE.md](../CLAUDE.md) — in two versions that do not match: one requires the
change to be merged, the other requires observable behavior to be exercised.
[#23](https://github.com/nanatsusaya/dot-panic/issues/23) owns resolving it, and
owns recording why *the build is green* is not among the conditions: there is no
build. That waits on 0009 for a command chain and 0011 for somewhere to run it.

What a change description must contain is no longer among the gaps here.
[The pull request template](../.github/pull_request_template.md) fixes it.

## The single clearest next step

**Write [decision 0004](adr/README.md) — compliance, accessibility and rights**
— against [its ticket](https://github.com/nanatsusaya/dot-panic/issues/8). It
has been unblocked since 0002 and waited for 0003, which has now fixed the
mechanisms 0004 has to reason about: what the page loads, what it stores, and
that the imprint text lives here as ordinary page content.

## Implementation scale

A decision's status says only whether the choice is binding. This is the scale
that says whether anything exists:

| Stage | Means |
|---|---|
| `planned` | Nothing written. No decision, no ticket, no code. |
| `decided` | The decision is Accepted. No code. |
| `built` | Implemented, tested, and watched running. |
| `live` | Deployed and reachable at the public URL. |

An accepted decision confers `decided` and nothing more.

| Area | Stage |
|---|---|
| Toolchain | `planned` |
| Simulation core | `planned` |
| Rendering | `planned` |
| Pointer handling | `planned` |
| Deployment | `planned` |

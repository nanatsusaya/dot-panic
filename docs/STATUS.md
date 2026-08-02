# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-02.*

## Position

The method has been adopted. **Nothing of the toy exists yet** — no simulation
code, no page, no rendering. Everything built so far is the way of working:
the operating rules, the decision set, two accepted records, and the five
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

**Thirteen decisions are planned** in [docs/adr/](adr/README.md).
[0001](adr/0001-purpose-scope-and-success.md) and
[0002](adr/0002-overall-architecture.md) are Accepted,
[0012](adr/0012-how-software-gets-developed.md) is Proposed, and the other ten
are `Planned`. Number 0012 was reserved as unused until 2026-08-02; the index
says why it is not.

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
| [#7](https://github.com/nanatsusaya/dot-panic/issues/7) 0003 Security and privacy | ready — this is the next one |
| [#8](https://github.com/nanatsusaya/dot-panic/issues/8) 0004 Compliance, accessibility, rights | ready — unblocked by 0002 |
| [#10](https://github.com/nanatsusaya/dot-panic/issues/10) 0006 Motion rules | not ready — holds the motion research |
| [#11](https://github.com/nanatsusaya/dot-panic/issues/11) 0007 Pointer and input model | not ready — holds the touch research |
| [#12](https://github.com/nanatsusaya/dot-panic/issues/12) 0013 Origin of the core | not ready — holds the package survey |
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | not ready — was ADR 0012 |

**One conflict is open and belongs to nobody yet.** ADR 0001 §4 puts an imprint
on the page; an imprint carries a real name and postal address; the method's P1
says real personal data never enters the repository. #8 owns resolving it, and
`method.json` still declares `"secrets": null` on an assumption that is no
longer true.

**Two things about how work is run have no authority yet.** There is no pull
request template, so nothing fixes what a change description must contain. And
the definition of done is stated twice — in
[the ticket template](../.github/ISSUE_TEMPLATE/task.md) and in
[CLAUDE.md](../CLAUDE.md) — in two versions that do not match: one requires the
change to be merged, the other requires observable behavior to be exercised.
Neither has a ticket.

## The single clearest next step

**Write [decision 0003](adr/README.md) — security and privacy by design** —
against [its ticket](https://github.com/nanatsusaya/dot-panic/issues/7). 0002
unblocked it and #8 together; 0003 comes first because the decision set is
written top-down and 0004 reasons about what 0003 fixes.

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

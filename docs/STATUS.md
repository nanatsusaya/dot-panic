# Where we stand

*Brought current before a session ends. Read first when one starts.*

*Last brought current: 2026-08-01.*

## Position

The method has been adopted. **Nothing of the toy exists yet** — no simulation
code, no page, no rendering. Everything built so far is the way of working:
the operating rules, the decision set, one accepted record, and the five
session procedures in [`.claude/skills/`](../.claude/skills/README.md).

**The renamed procedures have never been invoked.** They were copied in at the
end of a session and load on the next one. Whether all five appear as `/moin`,
`/weiterimtext`, `/feierabend`, `/adr` and `/passtdas` is the first thing to
check, before relying on any of them.

There is deliberately no `src/`, no `web/`, no deployment workflow and **no
toolchain at all** — no runtime, no test runner, no package manifest. What the
layout is comes from decision 0002; what runs and tests the code is decision
0009. Creating any of it before then would be implementing ahead of a decision,
which is how a choice gets made without anyone noticing one was on offer.

**Twelve decisions are planned** in [docs/adr/](adr/README.md).
[0001](adr/0001-purpose-scope-and-success.md) is Accepted; the other eleven are
`Planned`. Number 0012 is deliberately unused.

What is awaiting review is not repeated here. The
[pull request list](https://github.com/nanatsusaya/dot-panic/pulls) is the
authority for that, and a copy of it in this file would be wrong within a day.
Parked branches **are** named here, because nothing else announces them.
There are none.

## What the tickets hold

Seven issues are open, and three of them exist for a reason worth knowing: they
are **not ready to be worked**, and they carry research that would otherwise
have existed only in the conversation that produced it.

| Ticket | State |
|---|---|
| [#6](https://github.com/nanatsusaya/dot-panic/issues/6) 0002 Overall architecture | ready — this is the next one |
| [#7](https://github.com/nanatsusaya/dot-panic/issues/7) 0003 Security and privacy | blocked by 0002 |
| [#8](https://github.com/nanatsusaya/dot-panic/issues/8) 0004 Compliance, accessibility, rights | blocked by 0002 |
| [#10](https://github.com/nanatsusaya/dot-panic/issues/10) 0006 Motion rules | not ready — holds the motion research |
| [#11](https://github.com/nanatsusaya/dot-panic/issues/11) 0007 Pointer and input model | not ready — holds the touch research |
| [#12](https://github.com/nanatsusaya/dot-panic/issues/12) 0013 Origin of the core | not ready — holds the package survey |
| [#13](https://github.com/nanatsusaya/dot-panic/issues/13) Walking skeleton | not ready — was ADR 0012 |

**One conflict is open and belongs to nobody yet.** ADR 0001 §4 puts an imprint
on the page; an imprint carries a real name and postal address; the method's P1
says real personal data never enters the repository. #8 owns resolving it, and
`method.json` still declares `"secrets": null` on an assumption that is no
longer true.

## The single clearest next step

**Write [decision 0002](adr/README.md) — overall architecture** — against
[its ticket](https://github.com/nanatsusaya/dot-panic/issues/6). It is the only
unblocked record, and eight of the eleven remaining wait on it.

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

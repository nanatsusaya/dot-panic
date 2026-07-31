# Where we stand

*Brought current before a session ends. Read first when one starts.*

## Position

The method has been adopted; nothing of the toy exists yet. The repository
holds its operating rules, an empty decision set, and no simulation code at
all.

There is deliberately no `src/`, no `web/`, no deployment workflow and **no
toolchain at all** — no runtime, no test runner, no package manifest. Which
directories exist is settled by decisions 0001 and 0005; what runs and tests
the code is decision 0006. Creating any of it before then would be
implementing ahead of a decision, which is how a choice gets made without
anyone noticing one was on offer.

## The single clearest next step

**Answer the two open questions in [decision 0001](decisions/0001-write-the-simulation-core.md)**,
which is `Proposed` and under review. Nothing else can start: 0006 depends on
its answer, and every remaining decision depends on 0006.

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

# Where we stand

*Brought current before a session ends. Read first when one starts.*

## Position

The method has been adopted; nothing of the toy exists yet. The repository
holds its operating rules, an empty decision set, and no simulation code at
all.

There is deliberately no `src/`, no `web/`, no deployment workflow and **no
toolchain at all** — no runtime, no test runner, no package manifest. What the
layout is comes from decision 0002; what runs and tests the code is decision
0009. Creating any of it before then would be implementing ahead of a decision,
which is how a choice gets made without anyone noticing one was on offer.

Thirteen decisions are planned, in
[docs/decisions/](decisions/README.md). None is written.

## The single clearest next step

**Answer the three open questions in
[decision 0001](decisions/0001-purpose-scope-and-success.md)**, which is
`Proposed` and under review. Nothing else starts until it is Accepted: 0002
through 0004 are scoped against what it fixes.

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

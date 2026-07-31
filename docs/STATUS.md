# Where we stand

*Brought current before a session ends. Read first when one starts.*

## Position

The method has been adopted; nothing of the toy exists yet. The repository
holds its operating rules, an empty decision set, and no simulation code at
all.

There is deliberately no `src/`, no `web/` and no deployment workflow. Which
directories exist and what goes in them is settled by decisions 0001 and 0005,
and inventing the layout before then would be implementing ahead of a decision.

## The single clearest next step

**Write decision 0001** — whether the simulation core is written here or taken
from an existing package — and take it through the cycle to Accepted. Every
other decision depends on the answer.

## Implementation scale

A decision's status says only whether the choice is binding. This is the scale
that says whether anything exists:

| Stage | Means |
|---|---|
| `planned` | Ticketed. Nothing written, not even the decision. |
| `decided` | The decision is Accepted. No code. |
| `built` | Implemented, tested, and watched running. |
| `live` | Deployed and reachable at the public URL. |

An accepted decision confers `decided` and nothing more.

| Area | Stage |
|---|---|
| Simulation core | `planned` |
| Rendering | `planned` |
| Pointer handling | `planned` |
| Deployment | `planned` |

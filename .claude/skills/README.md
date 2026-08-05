# Session procedures

Five procedures, one per directory. They are **adapted copies** of the
`agent-method` plugin, version `0.4.0`, taken on 2026-08-01 from
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules).

**They match `0.5.0`, compared on 2026-08-05 against
[#147](https://github.com/nanatsusaya/dot-panic/issues/147).** Between the two
versions the plugin changed nothing in these five files except the method's own
name, and [#146](https://github.com/nanatsusaya/dot-panic/pull/146) had already
carried that through them. Nothing was taken, because there was nothing to
take — which is a result of the comparison rather than a reason to skip the
next one.

Copying rather than installing is what that repository recommends for anyone
who wants to change them, and it is what makes this project self-supporting:
the procedures are here, in the repository, whether or not anything is
installed.

| Type | Was | When to reach for it |
|---|---|---|
| `/moin` | `session-start` | Sitting down. Reads STATUS.md first, ends with a question, never an action. |
| `/weiterimtext` | `after-merge` | A change just landed. Keeps context, re-verifies the outside world. |
| `/feierabend` | `session-end` | Stopping — **only when asked for by name.** |
| `/adr` | `decision-record` | Writing a decision and taking it through to Accepted. |
| `/passtdas` | `adopt` | Checking whether `method.json` still matches how work is actually done. |

The German names are a deliberate choice the source repository invites: a skill
name is typed in conversation rather than read in a document, so it does not
belong to the one language everything committed here is written in. The
procedures themselves stay in English, like every other file.

## What was changed

Seven adaptations, and each exists for a reason this project ran into:

1. **`/adr` no longer defines the shape of a record.** It points at
   [`docs/adr/README.md`](../../docs/adr/README.md), which is the only
   authority for that. Before the split there were two descriptions of the same
   structure, one of them outside the repository.
2. **`/feierabend` runs only when asked for by name.** It was once run because
   someone said they intended to end the session soon, and the session was then
   reported closed while it was still running.
3. **`/passtdas` leads with the review case.** This project has a `method.json`,
   so the first-time-adoption path cannot happen here.
4. **The check is run as a command on its own**, with the reason stated: a
   pipeline reports the last command's exit status, so trimming a check's output
   hides its failure. That has happened here.
5. **`/feierabend` no longer states the definition of done.** It points at
   [`.github/ISSUE_TEMPLATE/task.md`](../../.github/ISSUE_TEMPLATE/task.md),
   which is the only authority for it. Its own copy was a third version and the
   worst of the three: it required a green local check chain, and there is no
   check chain.
6. **`/adr` runs a grep before a record is merged.** The rule that an Accepted
   record carries no `O`-number was written down and then broken four times in
   the next two records. A sentence in a document was not what held it; a command
   with a known result is. The [method log](../../docs/method-log.md) has the
   incident.
7. **`/feierabend` no longer states the bar for handing work back.** It points
   at [CLAUDE.md](../../CLAUDE.md#delivery), where that bar governs every
   hand-back rather than only a wind-down. Its copy introduced itself as
   something the procedure *adds*, which is how it went on reading as an
   addition through three merged changes that each named it and left it.

An eighth change was not a choice. Copying these files made them documents of
this repository, so they fall under its spelling regime and were rewritten from
British to American. The check found all twenty-five instances; it was not
noticed by reading. One word had to be put back by hand: `artefacts` is the
literal key in `method.json` and keeps the spelling of the interface it names,
not the one this project writes in.

**Two values in one template are ours, and neither is a word.** `/passtdas`
shows a `method.json` template, and this copy of it carries the declaration
this project actually holds rather than the plugin's example:

- `"language"` reads `"american"` where the plugin's reads `"british"`, which
  is the spelling regime above reaching a value.
- `"version"` reads `"0.5"` where the plugin's still reads `"0.4"`. The
  decider's call on 2026-08-05: a procedure of this repository shows the
  catalog this repository declares. **It moves when `method.json` moves**, and
  nothing checks that — the version is in no link, so the coherence check
  cannot see it.

Both are named here because the comparison of 2026-08-05 found them outside the
six above, and a difference nothing accounts for is one a later comparison
overwrites.

## The cost

These are copies. When the plugin releases a new version they no longer match
it, and nothing will announce that.

**The trigger is a release of `agent-project-rules`.** Compare these five
files against the new version, take what applies, and leave what was adapted on
purpose. The seven changes above are the list of what not to overwrite.

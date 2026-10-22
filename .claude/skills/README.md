# Session procedures

Seven procedures, one per directory, and they were not all taken at once. **Five
are adapted copies** of the `agent-method` plugin, version `0.4.0`, taken on
2026-08-01 from
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules).
**Two more came from plugin `0.7.0` on 2026-10-22** — `interview`, and
`autopilot` as `machsdirselbst` — on the decider's ask of that day and on the
terms
[0024](../../docs/adr/0024-whether-a-plan-may-be-approved-instead-of-each-change.md)
§5 sets. The same section leaves `kickoff` untaken: it founds a project from a
description, and this one exists.

**Before this release they matched `0.5.0`**, compared on 2026-08-05 against
[#147](https://github.com/nanatsusaya/dot-panic/issues/147) and re-checked
against the plugin later the same day. Two things changed in these five files
since the version they were taken from: the method's own name, which
[#146](https://github.com/nanatsusaya/dot-panic/pull/146) had already carried
through them, and the catalog number in the template `/passtdas` shows, which
this copy had been given half an hour earlier for the same reason. Nothing was
taken either time — a result of the comparison rather than a reason to skip the
next one.

**All seven match `0.7.0`, compared file by file on 2026-10-23 in
[#278](https://github.com/nanatsusaya/dot-panic/issues/278)** — the maintenance
that `v0.6` and `v0.7` made due, which 0016 §6 puts on the same trigger as the
two workflow pins. **Four of the five were changed and the fifth by one line**,
and what came across is behavior, not wording:

- **`/moin`** gains S1's second duty: step 4 decides whether the last session
  ended without a wind-down, by comparing the state artifact against the trunk,
  and step 6 names bringing it current as the next step when it did. Its
  read-only guardrail now says that this holds even for the stale document step
  4 just found — reporting it is bring-up, repairing it is work.
- **`/weiterimtext`** carries S3. Step 3 stopped being *bring the living
  documents current* and became a question — does the artifact already say what
  is true? — because the change that moves the position is what brings it
  current. It no longer opens a change for the artifact alone, and the method
  log is no longer written at a seam.
- **`/feierabend`** carries S3 and M1. Step 3 writes only what no change
  carried, writes nothing when the last closing change left the artifact true,
  and **asks the method-log question every time**, with the answer going into
  the handoff either way — an entry, or *nothing for the method log*.
- **`/adr`** moves the state-artifact update onto the branch. The flip to
  Accepted is the change that moves the position, so S3 puts the update in it
  rather than after the merge; step 6 now writes nothing.
- **`/passtdas`** needed one line: the catalog number in the `method.json`
  template it shows.

Nothing in the seven adaptations below was overwritten, and nothing upstream
was taken that this project had deliberately left. **Two things upstream now
says that these copies do not**, both because this project already had an
authority for them: `/feierabend`'s own definition of done, which 0.7 restated
and which [`.github/ISSUE_TEMPLATE/task.md`](../../.github/ISSUE_TEMPLATE/task.md)
owns here, and `/adr`'s description of the shape of a record, which
[`docs/adr/README.md`](../../docs/adr/README.md) owns.

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
| `/interview` | `interview` | An undertaking needs a series of decisions before anything is written. Asks in rounds, never answers one. |
| `/machsdirselbst` | `autopilot` | A closed list the decider granted. Works it one entry at a time and merges inside it. |

The German names are a deliberate choice the source repository invites: a skill
name is typed in conversation rather than read in a document, so it does not
belong to the one language everything committed here is written in. The
procedures themselves stay in English, like every other file.

**`interview` is the one exception, and it is the source's.** Its rename table
keeps that name in every language, because other procedures call it by it and a
renamed one falls back to the few sentences they carry — `/machsdirselbst` §3 is
exactly that case. 0024 R4 is where the two names were decided together.

## What was changed in the five

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
British to American. The check found twenty-five instances that reading had
missed — **and it missed four of its own**, corrected on 2026-08-05 against
[#130](https://github.com/nanatsusaya/dot-panic/issues/130): `authorisation`
twice in `/adr`, `Summarise` in `/moin`, `judgement` in `/weiterimtext`. It
scans a list of word pairs and not the general `-ise` ending, and it prints that
limit on every run. One word had to be put back by hand: `artefacts` is the
literal key in `method.json` and keeps the spelling of the interface it names,
not the one this project writes in.

**One value in one template is ours, and it is not a word.** `/passtdas` shows
a `method.json` template, and this copy of it declares American spelling where
the plugin's declares British — the spelling regime above reaching a value. It
is named here because the comparison of 2026-08-05 found it outside the
adaptations, and a difference nothing accounts for is one a later comparison
overwrites.

**A second value was ours for half an afternoon.** The same template's
`"version"` read `0.5` here and `0.4` upstream, on the decider's call that a
procedure of this repository shows the catalog this repository declares. The
plugin then made the same change for the same reason, and put a command behind
it, so there is no longer a difference to keep. It is written down because **a
recorded divergence is a claim about somebody else's file** — it goes stale the
way any other claim does, and the next comparison would have protected it.

## What was changed in the two

Six, and the first is the only one that is a difference of substance rather than
a pointer.

1. **`/machsdirselbst` carries the fourth exclusion**, which upstream has no
   equivalent of: no entry whose *Done* needs the decider's eyes may merge
   inside a plan. The work may be done and watched; the run parks the change
   before the merge. 0024 §3 is the authority and the guardrail names it —
   without it the procedure would merge a watched criterion closed, which
   [0022](../../docs/adr/0022-who-watches.md) decided against four weeks
   earlier.
2. **Step 1 names the merge as a tool the run needs allowed.** Upstream asks for
   the check chain and the platform commands. On 2026-10-22 the first granted
   run reached a green change and the harness refused the merge as a
   self-approval — so the permission the run was missing was not a tool but the
   right to be the one pressing it. The step says so, with the date, because the
   next run will meet the same wall.
3. **It does not run the wind-down.** Upstream's last step calls `session-end`;
   `/feierabend` here runs only when it is asked for by name, which is
   adaptation 2 above. Step 8 ends with the report and a question.
4. **Four things it points at instead of stating:** the four checks and the rule
   that none runs in a pipeline ([CLAUDE.md](../../CLAUDE.md#the-four-checks)),
   what *ready* and *done* mean
   ([`.github/ISSUE_TEMPLATE/task.md`](../../.github/ISSUE_TEMPLATE/task.md)),
   closing keywords and the four accidents behind them
   ([CLAUDE.md](../../CLAUDE.md#delivery)), and that the checks gate a merge
   ([0020](../../docs/adr/0020-whether-the-checks-gate-a-merge.md) §1). The same
   split adaptations 1, 5 and 7 made for the five.
5. **There is no reviewing agent, because there is no second reviewer.**
   Upstream's step 5 describes one and how to tell whether it wrote anything.
   Here the step says what actually stands between a change and the trunk inside
   a plan — the four checks and the agent's own watch — and that the judgment
   calls are what is left in a reviewer's place.
6. **`interview` asks for one person.** Upstream tells the caller to say who
   each question is for where several people decide; this project has one
   decider and no second reviewer, so a round is never split by who it is for.
   Its ending points at [CLAUDE.md](../../CLAUDE.md#working-with-the-decider)
   for where an answer goes rather than listing the destinations.

As with the five, the spelling was not a choice: `catalogue`, `artefact`,
`judgement`, `behaviour` and `initialled` were rewritten because these files
became documents of this repository. Only three of those five are in the word
list the check scans, so the others are review's.

**`/machsdirselbst` keeps upstream's step 6 and its warning.** Neither the goal
nor the nudge has been shown to rescue a stalled run upstream, and neither has
been exercised here; the copy adds that second half rather than quietly
inheriting the first.

## The cost

These are copies. When the plugin releases a new version they no longer match
it, and nothing will announce that.

**The trigger is a release of `agent-project-rules`.** Compare these seven
files against the new version, take what applies, and leave what was adapted on
purpose. The two lists above — seven changes in the five, six in the two — are
the list of what not to overwrite.

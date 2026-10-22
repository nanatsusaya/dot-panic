# 0024 — Whether a plan may be approved instead of each change

- **Status:** Proposed
- **Date:** 2026-10-22
- **Deciders:** Daniel Wagner
- **Ticket:** [#278](https://github.com/nanatsusaya/dot-panic/issues/278), whose
  *Constraints* hold this question open by name
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (*it reads as a
  flock* is judged by watching and by no command) ·
  [0012](0012-how-software-gets-developed.md) §2 (the set-level activity that
  makes tickets ready), §6 (parallel work, and the cap on changes open for
  review) · [0016](0016-maintainability-and-maintenance.md) §6 (a release of the
  method is maintenance work, and it moves the procedure copies) ·
  [0019](0019-fidelity-to-the-method.md) §1 (what an empty declaration asserts),
  §2 (what is an adaptation and what is project layer), §3 (declaring one is the
  decider's) · [0020](0020-whether-the-checks-gate-a-merge.md) §1 (the four
  checks gate a merge, in a workflow of their own) ·
  [0022](0022-who-watches.md) §2 (what an agent's watch is), §3 (the decider
  looks once, and his word prevails)
- **Supersedes / amends:** nothing
- **Amended:** no

## Context

**The method released `v0.6` on 2026-09-28 and `v0.7` on 2026-09-29, and 0.7
adds one rule.** [G4](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g4)
— *a plan can be approved instead of each change* — lets the person who holds
the gate approve a closed list of work for one session, inside which the agent
merges its own changes. It carries five conditions: the grant is explicit and
ends with the session; the plan is a closed list that expires rather than
extending; anything not on it, including a task that grew, needs a new grant; an
open question parks its task; and each change lists its judgment calls, which is
what the person reviews instead of the diffs.

**`autopilot` is that rule carried out**, and with `interview` it is what the
decider asked for on 2026-10-22: *ich will die interview und insbesondere
autopilot Prozeduren in unser projekt mit übernehmen.* The procedure cannot be
taken without the rule — it merges inside a plan, which is the thing G4 grants.

**What holds the gate here today is an instruction and not a setting.** The
trunk's ruleset requires a pull request, forbids deletion and non-fast-forward
pushes, and requires the status checks 0020 §1 put there — and it sets
`required_approving_review_count` to **0** (read from the platform on
2026-10-22). So nothing on the platform stops an author merging their own
change; what stops it is the sentence in
[the pull-request template](../../.github/pull_request_template.md): *the
decider merges, never the author*. That sentence came up on 2026-10-22, when an
agent asked for the merge rather than taking it, and it was left standing.

**This project has never had an exception to it, and the exception is what is
being decided.** Not whether an agent may merge in general, which
[G1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g1)
still forbids, but whether a person may draw the review boundary around a list
of changes instead of around each one.

**Adopting a rule is not an adaptation.** 0019 §1's empty declaration asserts
that every rule of the method is in force as written; taking G4 keeps it empty
and keeps that assertion true. Dropping G4 would be the first entry in it, and
§3 makes that the decider's on the standing of an amendment. Taking two
procedures is neither: 0019 §2 puts what this project adds in the project layer,
where nothing is declared.

## Decision

### 1. G4 is in force here, and only the decider grants a plan

The rule is adopted as written. **A grant is explicit, is given in the
conversation it applies to, names the plan it applies to, and ends with the
session or with the list, whichever comes first.** Silence is not a grant, an
earlier session's grant is not a grant, and a grant for one plan does not reach
the next.

**Checkable by reading:** `method.json` declares no adaptation, and no document
here says a rule of the method is dropped.

### 2. Inside a granted plan the agent merges; outside one the decider merges

The arrangement that has held until now stays the default and gains one
exception, and the exception is bounded by §1's grant and §3's exclusions.
**Where no plan has been granted the author never merges** — which is every
session this project has had so far.

**Where it is written is CLAUDE.md and not the template.** The method's own 0.6
moved a template's instructions into the operating rules, because a template
comment is read by a person typing in a browser and by no agent writing a
description from a file. The template keeps the shape; the rule about who merges
is the operating rules'.

### 3. What a plan may not contain here

Four exclusions. The first three are the method's own guardrails, restated only
where this project's wording differs. **The fourth is this project's, and it is
why this is a record rather than a line in CLAUDE.md.**

1. **No decision record** — written, amended or accepted. A task that needs one
   decided first is not on the list. An adaptation is further out still: 0019 §3
   makes it the decider's on the standing of an amendment.
2. **Nothing on CLAUDE.md's stop-and-ask list** — publishing or deploying,
   changing the public URL, adding a dependency, introducing a network call or
   telemetry. A grant for a plan is not a grant for any of these.
3. **Nothing that needs a question answered.** An open question parks its entry,
   with the question written where the entry is held, and the run takes the next
   one.
4. **No entry whose *Done* needs the decider's eyes.** 0022 §3 reserves his one
   look for the state the agent calls good, and 0001 §3.1 puts *it reads as a
   flock* beyond any command. Such an entry **may** stand in a plan and its work
   **may** be done — the agent watches under 0022 §2 as it already does — but the
   run **parks it before the merge** and reports it. A plan that merged a watched
   criterion closed would be an agent closing it, which 0022 decided against four
   weeks ago.

**Checkable by reading:** no change a run merged carries a criterion naming
watching, and every entry that does appears in the closing report as parked.

### 4. What a run does not change about the gate

The platform settings stay where they are: G4 changes none and this record
lowers none. The four checks still gate every merge under 0020 §1, so a run
waits for them like anybody else. **0012 §6's cap is untouched** — a run works
one change at a time, so it never has three open for review, and the cap goes on
meaning what it meant for work that is not in a plan.

### 5. The two procedures are taken, and a third is not

`interview` and `autopilot` are taken as **adapted copies**, the sixth and
seventh beside the five, on the terms
[`.claude/skills/README.md`](../../.claude/skills/README.md) already fixes for
copies: what was taken, what was changed and why, recorded there, with a release
of the method as the trigger to compare again.

**`autopilot` is named `machsdirselbst`, and `interview` keeps its name.** Both
are the method's own rename table, where `interview` keeps one name everywhere
because other procedures call it by that name and a renamed one falls back to the
few sentences they carry.

**`kickoff` is not taken.** It founds a project from a description, and this one
exists.

### 6. What stays the decider's whatever a plan says

The look that closes a watched criterion (0022 §3) · an amendment to an accepted
record ([the index's rules](README.md)) · an adaptation (0019 §3) · everything on
CLAUDE.md's stop-and-ask list · and the grant itself. **A plan is a boundary
drawn around work, and not around any of these.**

## Consequences

**The gate stops being one change, one person, for planned work.** That is the
point of the rule and it is also the cost: to somebody reading this project as a
worked example, its most legible property is that every change went through a
human. After this, some will not have, and what records which is the plan in
[docs/STATUS.md](../STATUS.md) and the judgment calls each change lists.

**Drift inside an entry is caught by nobody until afterwards.** CLAUDE.md already
says review decides direction and coherence rather than line-level correctness,
and a plan approval front-loads exactly those two — so what is lost is smaller
than it looks, and it is not nothing: a change that quietly does something a
little different from its entry has no reader before the merge.

**Several merges can land while the decider is away**, so a wrong direction
compounds across them instead of stopping at the first review. The five
conditions are what bound that, and §3's fourth exclusion is what keeps the
compounding away from the thing this project is actually judged on.

**A run needs its tools allowed in advance**, because an unattended run stands
still at the first permission prompt. That widens a permission surface for
convenience, which is a real cost, and it is why §3's second exclusion is written
in terms of what a plan may contain rather than what a tool may do.

**Keeping a run alive is marked untested upstream** in a real stall, and a watch
outside the session cannot tell waiting from hanging. This record takes the
procedure including that limit rather than pretending it is solved.

**`method.json` moves to `0.7` with the declaration still empty**, which is 0019
§1's claim surviving its first release — and the first time this project has had
to make that claim about a rule it was offered rather than one it already had.

## Alternatives considered

**Keep G4 in force and never use it.** Rejected because the decider asked for
`autopilot`, which is the rule in use; the declaration would have been the same
and no procedure would stand behind it.

**Drop G4 as an adaptation under
[A2](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#a2).**
Rejected for the same reason, and it would put the first entry into a
declaration 0019 §1 makes a claim.

**Take `autopilot` as a maintenance pass and leave the rule undecided.**
Rejected: the procedure merges inside a plan, so taking it decides who merges
whether or not a record says so — the silent reversal CLAUDE.md's *Decisions*
exists to prevent.

**Let a plan contain watched work and have the decider look afterwards.**
Rejected because 0022 §3 reserves his look for before the criterion closes, and
the merge is what closes it; looking afterwards makes his verdict a correction
rather than a gate.

## Open questions

- **O1 — Does a parked watched entry stop the run, or only itself?** §3's fourth
  exclusion parks the entry before its merge. *Recommended default: only itself.*
  The run takes the next entry and the closing report collects what waits, which
  is what the procedure already does with a parked question; stopping the whole
  run at the first watched entry would make a plan containing one nearly
  useless.
- **O2 — Where is the grant recorded?** *Recommended default: in
  [docs/STATUS.md](../STATUS.md), in the run's first change, quoting the words
  that granted it with their date.* The procedure writes the plan there before
  the first entry starts; the grant is what the plan rests on, and a plan in the
  state artifact whose authorization sits only in a chat log is the half that
  cannot be read next session.
- **O3 — Does a plan have a size here?** *Recommended default: no number, and
  the budget is stated when the plan is presented.* 0012 §6's cap counts changes
  open for review at once and a run opens one at a time, so a number invented
  here would be a second cap measuring a different thing.
- **O4 — `machsdirselbst`, or the English name?** *Recommended default:
  `machsdirselbst`, from the method's own rename table*, because the five copies
  here already use that table's German column and a mixed set reads as an
  oversight rather than as a choice.

## References

- [G4](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g4)
  and the 0.7 entry in
  [`method/CHANGELOG.md`](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/CHANGELOG.md),
  read 2026-10-22 — the rule, its five conditions, and what an adopter has to do
- The `autopilot` and `interview` procedures of plugin `0.7.0`, read 2026-10-22 —
  the guardrails, the strict start, and the grant
- [The procedure rename table](https://github.com/nanatsusaya/agent-project-rules/blob/main/docs/skills/README.md),
  read 2026-10-22 — the German names, and why `interview` keeps one name
  everywhere
- The trunk's ruleset on GitHub, read 2026-10-22 —
  `required_approving_review_count` is 0, so the gate here is held by instruction

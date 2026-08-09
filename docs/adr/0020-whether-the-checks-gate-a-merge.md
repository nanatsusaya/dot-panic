# 0020 — Whether the checks gate a merge

- **Status:** Proposed
- **Date:** 2026-08-09
- **Deciders:** Daniel Wagner
- **Ticket:** [#202](https://github.com/nanatsusaya/dot-panic/issues/202)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (this is an example
  project; the documentation and a well-written implementation come first) ·
  [0009](0009-toolchain.md) §8 (the four checks and what each decides) ·
  [0010](0010-testing-strategy.md) §7 (the coverage floor, which is what failed) ·
  [0011](0011-delivery.md) §2 (the checks gate a deployment and not a merge), §6
  (the placeholder gate, which is expected to fail until
  [#90](https://github.com/nanatsusaya/dot-panic/issues/90)), §8 (what a command
  decides about a deployment) · [0019](0019-fidelity-to-the-method.md) §2 (a rule
  this project invents is not an adaptation), §3 (declaring one is the decider's)
- **Supersedes / amends:** nothing yet. O1 is whether it amends
  [0011](0011-delivery.md) §2
- **Amended:** no

## Context

**Something already runs, and the ticket that asked for this record was written
before it did.** `.github/workflows/deploy.yml` landed on 2026-08-08 by
[#98](https://github.com/nanatsusaya/dot-panic/issues/98). It triggers on a push
to `main`, checks out this repository and a pinned clone of the method's beside
it, runs [0009](0009-toolchain.md) §8's four checks one step each, emits with
`tsc`, assembles the site, fails if the artifact still carries the placeholder
address, and deploys. So *nothing runs automatically here* has stopped being
true, and the question narrows to **when** the checks run and **what their result
is allowed to decide**.

**[0011](0011-delivery.md) §2 decided that in terms**, and the sentence is what
this record has to get past or leave alone:

> This is not continuous integration and does not become it. The checks run here
> because they gate a deployment, not because they gate a merge. What gates a
> merge is review.

**Thirty-seven runs have fired and every one of them is red.** Read from each
run's own failing step on 2026-08-09 rather than inferred from any: **twenty-six**
stopped at *The imprint carries no placeholder*, and **eleven** stopped earlier,
at *Tests, and the coverage floor*. The twenty-six are §6 working — that gate
cannot pass until #90 supplies a real address, and 0011 §6 says so when it builds
it. The eleven were a defect.

**The eleven are one class of failure and it is the interesting one.**
`check:test` carries a wall-clock ceiling that had been read off a development
machine, and the hosted runner is slower; the run was green here and red there.
[#249](https://github.com/nanatsusaya/dot-panic/pull/249) raised the ceiling and
the three newest runs, [#251](https://github.com/nanatsusaya/dot-panic/pull/251)'s
merge among them, fail only at the imprint gate — so all four checks now pass on
the runner. **It was also marginal rather than deterministic**: two runs fifteen
seconds apart on near-identical source took 30806 ms and 21075 ms.

**What it cost was not a deployment.** None was owed — Pages has no publishing
source configured and #90 is open, so the imprint gate would have stopped every
one of the thirty-seven regardless. What it cost is that eleven real failures sat
inside twenty-six expected ones for a day, **interleaved rather than forming a
block**, and nobody could tell them apart from the only thing a person reads at a
glance: the color.

**That is a property of the arrangement and not of anyone's attention.** A run
that is red by design has a true and sufficient explanation before it is opened.
Every red mark this repository has ever produced was correctly explained by *the
address is still a placeholder*, so a second, wrong reason for the same mark is
invisible by construction — and stays invisible however carefully anybody looks
at the list.

**One account writes the change and merges it**, so *what gates a merge is review*
means the person who ran the four checks is the person who believes they were run.
[G1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g1)
— *"Every change reaches the trunk through a review boundary that a human
controls"* — is the rule that boundary exists under, and the coherence check
states on every run that it cannot decide whether the platform binding is in
place.

**Where the ticket came from is a comparison, and it does not carry all the way.**
`agent-project-rules` runs its own document checks on every push and every pull
request, so a reader arriving from there to see the method at work — which
[0001](0001-purpose-scope-and-success.md) §2 makes the point of this project —
finds one that requires four checks and enforces none. But that repository's
workflow matrix exists for two claims it makes about itself, this one ships
static files and makes neither, and it is deliberately exempt from its own
coherence check as a gate.

**Repository state.** Nineteen records are Accepted. One workflow file exists,
the four checks are green on the hosted runner, no ruleset requires any status
check, and no page has been published.

## Decision

### 1. If anything runs before a merge, it is a second workflow and never this one

`deploy.yml` carries [0011](0011-delivery.md) §6's gate, which is **correct when
it is red** and will be until #90 lands. A signal that is expected to be red
cannot also be the signal that something is wrong; that is not a prediction, it
is what the thirty-seven runs did. Requiring this file would block every merge
rather than the wrong ones.

**A command decides the weaker half of this**: the two are different files, and
the gating one assembles no site, contains no step that reads the artifact for a
placeholder, and deploys nothing. Whether a step is *expected* to fail is a
judgment; whether the publishing steps are absent is text.

### 2. What it runs is the four, and the hard part is already solved

[0009](0009-toolchain.md) §8's four, **one step each and in that order** — not
`bun run check`, because the aggregate stops at the first failure and carries its
exit status, which is right for a person and wrong where *which* step failed is
the finding. `deploy.yml` already establishes both that and the awkward part:
`check:method` invokes a script from a sibling clone, so the runner checks this
repository into a subdirectory and `nanatsusaya/agent-project-rules` beside it,
reproducing the layout [CLAUDE.md](../../CLAUDE.md) tells a person to create.

**The pin is the load-bearing part and it becomes more so here.** That clone is
pinned to the release carrying the catalog `method.json` declares, and a gating
workflow makes another repository's release decide whether a change may land in
this one. The pin moves in the same change as `method.json` or the check is
deciding against a catalog this project has not adopted.

### 3. What a local run cannot decide is the whole of what this buys

Every change here is run through all four by its author before it is opened, so a
gate that only repeats that is ceremony with a runtime. **What it adds is the
class of failure a development machine cannot see**, and the eleven are that class
exactly rather than an argument by analogy: a wall-clock ceiling is a fact about
the machine, and this project has exactly one other of the same shape —
[0008](0008-performance-budget.md)'s budget, which no check reads.

**So the value is bounded and nameable.** It decides machine-dependent outcomes
and the state of the merged result, and nothing else. A record claiming more than
that would be claiming the author does not run the checks, which is a different
problem and is not fixed by a workflow.

**The merged result is the second half and it is not a small one.** GitHub
documents that for the `pull_request` event *"`GITHUB_REF` is set to
`refs/pull/PULL_REQUEST_NUMBER/merge`"* and that *"Your CI tests run against the
merged result, not just the head branch alone."* A local run tests the branch and
`deploy.yml` tests what has already landed; neither tests what is about to.

### 4. This adds a rule of this project's own, and adapts nothing

[0019](0019-fidelity-to-the-method.md) §2 draws the boundary: a rule **of the
method** narrowed, replaced, dropped or deferred is an adaptation, and a rule this
project **invents** is project layer and is never declared. A gate on a merge is
invented here — no catalog rule is being changed — so the declaration stays empty,
which §2 says is the correct outcome of adding one rather than an omission.

**And [E1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#e1)
is not the argument, though the ticket reads it as one.** E1 asks that a rule be
written in a form a command could decide — *"What can be a check, is a check"* —
and all four already are. It says nothing about when a check runs or what its
result may block. What argues here is the thirty-seven runs; the catalog is
neutral on this, and a record leaning on a rule that does not say what it needs
would be the weaker for it.

### 5. Whatever is chosen, the checks' conclusion must be readable without opening a run

This is the part the evidence decides on its own. The failure was not that
nothing blocked — it was that **one boolean carried two facts**. Any arrangement
that leaves the four checks' result legible only inside a run whose red state is
already correct reproduces exactly what happened, whether or not it also blocks a
merge.

**Checkable by reading**: the four checks and the publishing steps do not share a
workflow file. That is §1 from the other side, and it is why §1 holds even under
the answer to O1 that changes nothing about merging.

### 6. What is asserted, and what is not

The registers are [0010](0010-testing-strategy.md) §1's.

**Asserted — a command decides these:**

| | Claim |
|---|---|
| §1, §5 | The four checks and the publishing steps are in different workflow files |
| §1 | The gating workflow contains no `deploy-pages` step and no placeholder scan |
| §2 | It runs the four 0009 §8 names, as four steps |
| §2 | The pinned ref of `agent-project-rules` matches the catalog version `method.json` declares |

The fourth is worth more than the other three: it is the only one that fails when
something outside this repository moves, and it is the failure mode §2 names.

**Measured** — nothing. **Watched** — nothing. This record moves nothing on
screen, and no criterion of it belongs to an eye.

## Consequences

**Positive.**

- **The one class of failure the author cannot see locally becomes visible**, and
  it is visible before the merge rather than a day after it.
- **A red mark stops being ambiguous.** §1 and §5 separate a signal that is
  correct when red from one that never is, which is the whole of what went wrong.
- **The comparison with the method's own repository stops being embarrassing**,
  which is [0001](0001-purpose-scope-and-success.md) §2's concern rather than an
  engineering one — and this record is honest that it is the weaker of the two
  reasons.
- **Nothing new has to be worked out.** The sibling checkout, the pin and the
  four-steps-not-one shape are `deploy.yml`'s, copied with their reasons.

**Negative.**

- **[0011](0011-delivery.md) §2 stops being true** if O1 is answered yes, six days
  after it was accepted, and an accepted record acquires an amendment. That is the
  cost the ticket asked to have weighed and it is a real one.
- **Another repository's release enters this one's merge path.** If
  `agent-project-rules` moves its catalog, or the pinned tag is deleted, nothing
  merges here until a workflow file changes — and under O2's blocking answer that
  is a stop rather than a warning.
- **Most runs will be redundant by construction**, because the author runs the
  same four before opening anything. The gate earns itself on a narrow class and
  spends runner minutes on every other change.
- **Part of the gate moves from a person to a machine.** G1's subject is review
  and this narrows nothing it decides, but *the human is the gate* and *a check
  decides whether you may merge* pull in different directions, and a project
  demonstrating a method should say so rather than let it read as alignment.
- **It is a second file to keep current** with `package.json`, `method.json` and
  the Bun version, in a repository where the same drift already has a ticket in
  [#170](https://github.com/nanatsusaya/dot-panic/issues/170).

## Alternatives considered

- **One workflow, the checks in a job of their own.** Rejected: a run's conclusion
  is still one boolean, [0011](0011-delivery.md) §6's gate still makes it red by
  design, and the trunk's status at a glance is unchanged — which is the thing
  that failed.
- **Requiring `deploy.yml` itself.** Rejected: it is expected to fail until #90,
  so it would block every merge rather than the wrong ones.
- **A local pre-push hook running the four.** Rejected twice over: it runs on the
  machine whose difference from the runner is the entire finding, and it is
  bypassable by exactly the account it would be protecting against.
- **Leaving `check:method` out of whatever runs.** Rejected: it is the check that
  decides whether the documents still describe the project, which
  [0001](0001-purpose-scope-and-success.md) §2 makes the primary artifact here —
  dropping it would gate the toy and not the thing the project is for. The
  cross-repository hazard it brings is named in *Consequences* instead.

## Open questions

**O1 — is [0011](0011-delivery.md) §2 amended so that something may run before a
merge, or does it stand as written and this ticket end with the arrangement
unchanged?** *Recommended: amend, and run the four on `pull_request`.* The
sentence to be superseded is *"This is not continuous integration and does not
become it. The checks run here because they gate a deployment, not because they
gate a merge."* An amendment rather than a superseding record is not a question:
[docs/adr/README.md](README.md) makes superseding flip the whole record's status,
and 0011 §1 and §3 to §8 are untouched and right. **This needs the authorization
itself, quoted with its date**, which is what §3 of
[0019](0019-fidelity-to-the-method.md) requires of the neighboring case and what
the README requires here.

If the answer is no, §1 and §5 of this record still hold and shrink to one thing:
the checks move to a workflow of their own on push to `main`, so that a red mark
means something. That is the smaller half and it needs no amendment — except that
§2's *this is not continuous integration* reaches it too, which is why it is
inside O1 rather than beside it.

**O2 — does the result report, or is it required by a ruleset?** *Recommended:
required.* GitHub documents that *"all required status checks must pass before
collaborators can merge changes into the branch or tag"*, and a mark nobody has
to act on is precisely what has just failed for a day. **The cost is named
above**: a required check puts another repository's release in the merge path,
and it is a repository setting — the same setting G1's binding lives in, which
has never been verified here. Reporting first and requiring later is the
defensible other answer, and the reason it is not the recommendation is that the
reporting-only state is the one this record exists because of.

## References

- [G1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g1)
  and [E1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#e1),
  catalog 0.5, read 2026-08-09.
- GitHub, *Available rules for rulesets* —
  <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets>,
  read 2026-08-09.
- GitHub, *Events that trigger workflows* —
  <https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows>,
  read 2026-08-09.
- The thirty-seven runs and their failing steps, read from the workflow's own run
  list on 2026-08-09 and recorded on
  [#202](https://github.com/nanatsusaya/dot-panic/issues/202).

# 0019 — Fidelity to the method

- **Status:** Accepted
- **Date:** 2026-08-06
- **Deciders:** Daniel Wagner
- **Ticket:** [#199](https://github.com/nanatsusaya/dot-panic/issues/199)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (this is an
  example project; the documentation and a well-written implementation come
  first) · [0003](0003-security-and-privacy-by-design.md) R1 (the adaptation this
  project nearly paid, and why it was the wrong question) ·
  [0012](0012-how-software-gets-developed.md) §1 (the seven phases, and the
  analysis phase with no end condition) ·
  [0016](0016-maintainability-and-maintenance.md) §2 (every commitment that
  depends on time is one row in one list), §6 (the four kinds of maintenance
  work, the fourth being a release of the method)
- **Supersedes / amends:** nothing
- **Amended:** no

## Context

Eighteen records decide what the toy is and how it is built. **None decides how
this project stands toward the method it exists to demonstrate.**

[0001](0001-purpose-scope-and-success.md) §2 fixes the *why* — dot-panic exists
to demonstrate the method, and the product is secondary.
[0012](0012-how-software-gets-developed.md) adds the bridge from a
domain-independent rule set to software development, and calls that bridge the
thing this repository can show and the method's own repository cannot.
[0016](0016-maintainability-and-maintenance.md) §6 makes a release of the method
one of the four kinds of work that outlive delivery.

**What none of them says is that the rules run here unchanged, or what it would
take for that to stop being true.** The only place the fact appears is
`method.json`, whose adaptation list is empty — and a declaration states a value
without saying whether anybody chose it. The only place it is *reasoned* is
[docs/method-log.md](../method-log.md), which by the method's own M1 records why
the way of working looks like this and is deliberately not somewhere a session
goes to find a rule.

**The question has been asked twice already and answered locally both times.**
On 2026-08-02, [0003](0003-security-and-privacy-by-design.md) R1 was, in its own
words, *one review away from paying a permanent method adaptation to solve a
problem that did not exist*. On 2026-08-05 the first `/passtdas` run asked
whether this project's seven phases, its epics, its third label and its cap on
open changes had to be declared, and found they are project layer rather than
adaptations. Two right answers. Neither binds the third session to ask.

**And the temptation is not hypothetical.** [docs/STATUS.md](../STATUS.md)
records A3 — *scale ceremony to the stage* — as a rule in force and failing, in
the method's own words about a decision phase with no end condition. The
adaptation vocabulary would make that finding stop being reported: three of its
four kinds switch a rule's check off, which the method's adaptation guide states
plainly. The way to silence a true finding is documented, supported and one line
of JSON away.

**The reason to write this down rather than assume it is the method's own A1.**
That rule is titled *this is a starting point, not a doctrine*, and it says: *"A
project that follows every rule unchanged has probably not read them against its
own circumstances."* An empty adaptation list is precisely what that sentence is
suspicious of. This project's answer to it currently exists nowhere.

**Repository state.** The toy runs and nothing is published. Every rule in the
method is in force and none is adapted, which the coherence check prints on every
run.

## Decision

### 1. The empty declaration is a claim, and this record is what makes it one

`method.json` declares no adaptation. That asserts that **every rule in the
method is in force here as written** — not that the field was never filled in.

Stated as a decision because the two are indistinguishable by reading the file,
and they call for opposite behavior from the next session. Under the first, a
rule that appears not to fit is a finding. Under the second, it is an oversight
to be tidied up.

**Checkable, and already checked:** the coherence check reports the number of
rules in force and the number adapted on every run, and names every check an
adaptation switched off. What no command decides is whether the emptiness is
honest — §5 is what this project offers instead.

### 2. An adaptation is a rule of the method changed. What this project adds is not one

The four kinds — narrowed, replaced, dropped, deferred — and what each does to a
rule's check belong to the method's adaptation guide, and are not reproduced
here. What this record fixes is the boundary they sit on:

- A **rule of the method** narrowed, replaced, dropped or deferred is an
  adaptation, and is declared.
- A rule **this project invented** is project layer. It is never declared, and
  the declaration staying empty is the correct outcome of adding one.

So the seven phases, the epics, the third label and the cap on open changes are
not adaptations, and neither is anything later work adds in the same way. That
is the boundary the [method log](../method-log.md) found on 2026-08-05; this
section is what makes it binding rather than remembered.

**The cost of the other answer is asymmetric, and that is the argument.**
Declaring an addition as an adaptation is not untidiness: three of the four kinds
switch a rule's check off, so a declaration made for neatness stops verifying a
rule that is in force.

### 3. Declaring one is the decider's, on the standing of an amendment

An adaptation is not an author's call and not an agent's. It is proposed like any
other decision and written only with the decider's explicit authorization,
carrying the reason and the date the method's own format asks for, and a
[method log](../method-log.md) entry saying what it cost.

**The standing is deliberate.** An adaptation reads to every later session as
settled, it survives every refactor, and nothing about it decays — which is the
same permanence that makes an amendment to an accepted record the decider's under
[docs/adr/README.md](README.md). A wrong adaptation is worse than a wrong record:
the record can be superseded and read as history, while the adaptation leaves a
rule quietly unverified for as long as it stands.

**Checkable by reading:** every entry in the declaration carries a reason and a
date, and a [method log](../method-log.md) entry shares that date. Whether the
reason is a good one is review's, which is the method's E2 and not this record's
to change.

### 4. A finding is never the reason

**A check that fails, or a rule that is reported as failing, is not grounds for
an adaptation.** It is either a defect to repair or a true finding to carry.

This is the one motive named and closed, because it is the one that will actually
occur: the vocabulary exists, it is a line of JSON, and it makes the report go
quiet without anything being fixed. A3 is the live case — in force, failing, and
not narrowed — and it stays that way until the decider ends the analysis phase or
decides something else. **This record does not resolve A3**; it removes one wrong
way of resolving it.

**It is the motive that is forbidden, not a kind, so all four are covered** —
narrowing included, though narrowing alone leaves a rule's check running and hides
nothing. What a failing finding is usually *about* is reach, so *this rule does not
apply to X*, where X is the thing failing, is the same move made quietly. R2.

The corollary, so the rule cannot be read as *never adapt*: a rule may be adapted
for the reason A1 gives — its reasoning does not hold for this project — and that
reason has to be statable without reference to any finding the rule produced. That
route stays open for every one of the four kinds.

### 5. Fidelity is not the goal, and re-examination is what stands in for it

A1 is answered rather than worked around: **this project does not treat an
unchanged rule set as an achievement.** If a rule stops fitting, adapting it is
the correct answer and §3 is how it arrives. What would be wrong is keeping the
list empty because an empty list looks better in a project built to be read.

What this project offers in place of that vanity is that the emptiness is
**re-examined rather than assumed**, and the mechanism already exists:
`/passtdas` is the procedure, it has run once, and it returned a boundary — §2's
— rather than a shrug. **No new trigger is created here.** A release of the
method is already [0016](0016-maintainability-and-maintenance.md) §6's fourth
kind of work, and a second mechanism for one question would be the second
authority this project spends most of its rules avoiding.

## Consequences

**Positive.**

- The empty declaration stops being ambiguous between *examined* and *never
  filled in*, which is the difference between a finding and a tidy-up for every
  session that meets a rule not fitting.
- The cheapest wrong answer is closed by name **before** it is needed rather than
  after it is taken. 0003 R1 is the evidence that it gets close.
- §2 means a project that keeps growing rules does not slowly acquire a
  declaration full of things that are not adaptations, each of which would
  switch off a check for a rule still in force.

**Negative, and these are real.**

- **§4 leaves a check red and supplies no other way out.** A3 is in force and
  failing today. This record forbids the one-line fix and offers nothing in its
  place, because the thing that would fix it — an end condition on the analysis
  phase — is 0012 §1's and the decider's. A session reading this while looking at
  a red rule gets a prohibition and no route.
- **§3 puts a person in the path of a correct adaptation.** Where a rule
  genuinely does not fit, the work waits for an authorization rather than
  proceeding, and with one decider that is a real delay measured against a cost
  nobody is paying yet.
- **Writing fidelity down makes it something to be proud of**, which is the exact
  failure A1 describes. §5 is the only guard against it and it is prose — nothing
  checks whether an examination happened, only that the field is empty.
- **This is a record about the project's relationship to its own method**, which
  makes it the one whose subject is not the toy at all. A reader who came for a
  flock of dots finds a nineteenth record deciding something the page does not
  contain, and [0001](0001-purpose-scope-and-success.md) §6.2 is what that risks.

## Alternatives considered

- **Leave it to the method log.** Rejected because M1 makes that document the
  record of *why the way of working looks like this*, not an authority — a
  session looking for a rule does not go there, which is the whole reason this
  gap existed.
- **Put it in CLAUDE.md and write no record.** Rejected because a rule protecting
  the declaration would then be reversible by exactly the kind of change that
  would want to reverse it. CLAUDE.md is edited by ordinary work; a record is
  not.
- **Amend [0001](0001-purpose-scope-and-success.md) §2 to add it.** Rejected
  because that record is accepted and nothing in it is reversed by this, and
  because it would make *this is an example project* the authority for something
  wider than it decides.
- **Declare A3 narrowed and be done with it.** Rejected in §4. It is the case
  this record exists to forbid, and it would trade a visible failing rule for an
  invisible unverified one.
- **Decide that no adaptation is ever permitted.** Rejected because that is
  doctrine, which A1 names as the failure mode, and because it would make the one
  legitimate case — a rule whose reasoning does not hold here — impossible to
  express honestly.
- **Say nothing, on the grounds that two sessions already got it right.**
  Rejected because both answers were reached locally and neither is binding; the
  third session inherits the reasoning only if it reads two documents that do not
  claim to hold it.

## Resolved questions

All three answered on 2026-08-06 against
[#199](https://github.com/nanatsusaya/dot-panic/issues/199): *"wir folgen bei
allen drei fragen deiner empfehlung."*

**R1 — An adaptation stands where an amendment stands.** The recommendation. The
alternative was not *who decides* — with one decider that is the same person
either way — but **what trace the decision leaves**. An amendment has to quote its
authorization, and that quotation is the only evidence a later session has that it
was ever given; a merge leaves a different trace, one that says a change landed and
not that anybody weighed it. The property the two share is what makes the weight
proportionate: both are permanent, both read as settled, and both are invisible a
week later. §3 carries the consequence an author feels — a rule that does not fit
cannot be resolved inside the change that met it.

**R2 — All four kinds, because the prohibition is on the motive.** The
recommendation, and the closest of the three. Narrowing is genuinely different in
kind: it leaves the rule's check running, the method gives it its own mechanism for
naming what falls outside, and nothing is hidden by it. What decided it is that
**§4 never forbade a kind.** It forbids a reason, and the corollary keeps every
kind available for the reason A1 gives. So the question was only whether the motive
test applies to narrowing too — and it does, because what a failing finding is
usually about is reach, which makes *this rule does not apply to X* the same move
made quietly. §4 says so in terms rather than leaving it to be inferred.

**R3 — A record, not a section of CLAUDE.md.** The recommendation, and
[0017](0017-the-pages-language.md) R5's question a second time. CLAUDE.md is edited
by ordinary work in ordinary changes, and a rule about what may not be changed
quietly is weakest exactly there. **The three answers also interact**, which is why
this one was not free: had it gone the other way, R1's amendment standing would
have lost its anchor — a rule living somewhere ordinary work edits cannot carry the
weight of one that does not — and §4 would have been left holding the record alone.
The argument against is unchanged and is in *Consequences*: a nineteenth record
with no code behind it is ceremony, and ceremony is
[0001](0001-purpose-scope-and-success.md) §6's second-ranked failure.

## References

- [`adapting.md`](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/adapting.md)
  — the four kinds of adaptation, which of them switch a rule's check off, and
  the fields an entry carries. Read from the clone beside this repository,
  2026-08-06.
- [`rules.md`](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md)
  — A1, A2 and A3 as quoted, and E2 on what a check may decide. Read 2026-08-06.
- [0003](0003-security-and-privacy-by-design.md) R1 — the adaptation nearly paid.
  Read 2026-08-06.
- [docs/method-log.md](../method-log.md) — the entries of 2026-08-02 and
  2026-08-05, which hold the reasoning this record makes binding. Read
  2026-08-06.
- [Ticket #199](https://github.com/nanatsusaya/dot-panic/issues/199).

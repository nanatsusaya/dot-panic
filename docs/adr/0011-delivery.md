# 0011 — Delivery

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#37](https://github.com/nanatsusaya/dot-panic/issues/37)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3 (what good enough
  means), §6.2 (the toy is never finished because the process ate the work) ·
  [0003](0003-security-and-privacy-by-design.md) §5 (no network request after
  load), §6 (the policy, and what a `meta` element cannot carry), §7 (the imprint
  appears in one place) · [0004](0004-compliance-accessibility-and-rights.md) §1
  (the imprint obligation), §3 (the placeholder address, named on purpose), §8
  (what a host records is this record's), §13 (the register, and its GDPR row),
  R2 (a real address is a precondition of publishing) ·
  [0009](0009-toolchain.md) §2 (`tsc` emits), §3 (the emitted tree is not
  committed), §8 (the four checks) · [0010](0010-testing-strategy.md) §1 (the
  three registers), §7 (the coverage floor), §9 (watching the built page is the
  only evidence spanning source and output) ·
  [0012](0012-how-software-gets-developed.md) §2 (the walking skeleton is the
  first increment)
- **Supersedes / amends:** nothing
- **Amended:** no

## Context

This record decides the mechanism by which the page reaches a public URL. **It
does not publish anything**, and publishing remains a stop-and-ask in
[CLAUDE.md](../../CLAUDE.md) after this record is accepted.

**Three accepted records put questions here from different directions.**
[0003](0003-security-and-privacy-by-design.md) §6 says the shipped
Content-Security-Policy is everything a static file can deliver alone, and that
*if the chosen host can set response headers, it sends the same policy as a
header as well*. [0004](0004-compliance-accessibility-and-rights.md) §8 says
serving a page means a host sees a request, and that whichever host is picked,
this record states what it records and what follows. And 0004 R2 makes a real
imprint address a precondition of publishing, with nothing checking it.

**The host and the trigger were chosen before this record existed.** On
2026-07-31 the decider chose GitHub Pages published by a GitHub Actions workflow,
against a recommendation to serve straight from a branch with no workflow at all;
the reasoning is in the [method log](../method-log.md). That entry is an
authority for *why the way we work looks like this* and not for what is decided,
so the choice was confirmed before drafting (R1) and this record is what makes it
binding.

**What has changed since is that the workflow now has something to do.**
[0009](0009-toolchain.md) gives it a build, [0010](0010-testing-strategy.md) §7
gives it a floor that can fail, and 0009 §8 fixes four checks. The 2026-07-31
argument — that a workflow *makes the command chain real* — was a prediction then
and is a description now.

**Repository state.** Thirteen records are Accepted, there is no code, no
toolchain, no page and no workflow file. Nothing below is built by being decided.

## Decision

### 1. The host is GitHub Pages, serving this repository

GitHub documents it as *"a static site hosting service that takes HTML, CSS, and
JavaScript files straight from a repository on GitHub, optionally runs the files
through a build process, and publishes a website"* — which is the whole of what
this project needs, since [0003](0003-security-and-privacy-by-design.md) §5
leaves the page making no request after it loads and there is nothing for a
server to compute.

The documented limits are not close to binding here: a published site may be no
larger than 1 GB against a page that is one HTML file and a few scripts, and a
soft bandwidth limit of 100 GB per month against a toy.

### 2. A GitHub Actions workflow deploys, and nothing reaches the URL that has not passed the checks

Publishing is by custom workflow rather than from a branch. GitHub documents both
as publishing sources, and the workflow path is the one that lets the deploy
depend on something.

**The order is fixed and it is the point of choosing a workflow at all:** the
checks [0009](0009-toolchain.md) §8 fixes run first, `tsc` emits, and
`actions/deploy-pages` runs only if everything before it passed. A red check does
not produce a deployed page with a warning next to it; it produces no deployment.

The workflow triggers on a push to the default branch. Under
[CLAUDE.md](../../CLAUDE.md) every change arrives there by merging a reviewed
pull request, so *deploy on push to trunk* and *deploy on merge* are the same
event here. GitHub recommends a deployment protection rule restricting the
`github-pages` environment to the default branch, and this record adopts it —
without it, any branch could deploy and §6's gate would be one workflow file away
from being bypassed.

**This is not continuous integration and does not become it.** The checks run
here because they gate a deployment, not because they gate a merge. What gates a
merge is review, [0010](0010-testing-strategy.md) invents no CI condition, and
this record does not either.

### 3. The URL is the default one, and there is no custom domain

`https://nanatsusaya.github.io/dot-panic/`. No domain is bought, registered or
configured.

A custom domain costs money and renewal attention for a toy, and moving to one
later is cheap: it changes a setting and a link, and nothing in the page depends
on the origin it is served from, because [0003](0003-security-and-privacy-by-design.md)
§5 leaves it making no requests at all.

### 4. The host logs the visitor's IP address, and this record states what follows

GitHub documents it plainly: *"When a GitHub Pages site is visited, the visitor's
IP address is logged and stored for security purposes, regardless of whether the
visitor has signed into GitHub or not."*

**This is the answer [0004](0004-compliance-accessibility-and-rights.md) §8 asked
for, and it does not contradict anything 0004 decided.** Its §13 GDPR row already
says the Regulation *"[a]pplies in principle and reaches nothing on the page"*
because 0003 §4 and §5 leave the page processing nothing — and that row ends
*"What a host logs is §8"*. The page still collects nothing. **The host does**,
before a single line of the page runs, and no choice available here removes that:
serving a file over the internet means somebody's server sees who asked.

**What follows is a statement, not a mechanism.** Nothing on the page can prevent
it, [0003](0003-security-and-privacy-by-design.md) §4 is untouched because nothing
is stored on the visitor's device, and 0004's decision against a consent banner is
untouched because security logging by a host is not something a visitor is asked
to agree to.

**The page says so.** Two sentences sit with the imprint: that the site is hosted
by GitHub, that GitHub logs visitors' IP addresses for security, and a link to
GitHub's privacy statement. It is information and not a request for consent, so
0004's decision against a banner stands as written.

**This amends nothing, and the reasoning matters more than the two sentences.**
The notice is not part of the imprint — § 18 MStV asks for the operator, and who
hosts the operator's page is a different fact — so
[0004](0004-compliance-accessibility-and-rights.md) R2's *name, email and address*
is unchanged and [0003](0003-security-and-privacy-by-design.md) §7's *one place*
is not duplicated. It goes **inside** the imprint section of
[0014](0014-page-layout.md) §4's dialog rather than becoming a section of its own,
which is what keeps 0014's shape and [0015](0015-settings-surface.md) §1's empty
third section out of it. **Writing the sentences is not this record's work**; it
is [#77](https://github.com/nanatsusaya/dot-panic/issues/77), because a decision
record that writes page content has stopped being one.

### 5. The policy ships as a `meta` element alone

[0003](0003-security-and-privacy-by-design.md) §6 made the header conditional on
the host being able to send one. **Nothing in GitHub's Pages documentation
provides a way to set response headers**, and this record states that as what was
found rather than as a capability claim: the documentation does not mention
custom headers at all, which is weaker evidence than a documented refusal.

Either way the conditional is unmet, so the `meta` element stands alone and
`report-uri`, `frame-ancestors` and `sandbox` remain undeliverable — exactly the
state 0003 §6 anticipated and permitted. **0003 §6 is not relaxed by this**, and
if a later host can send headers, sending them needs no new record because 0003 §6
already requires it.

### 6. The placeholder address is stopped by a check, not by a person remembering

[0004](0004-compliance-accessibility-and-rights.md) §3 put the placeholder in a
record on purpose, so that *the one value worth being able to search for* can be
searched for. This record uses that.

**A check fails the workflow if the built artifact contains `Musterstadt`.** It
runs against what is about to be deployed rather than against the source tree,
because the source is *supposed* to carry the placeholder until a real address
exists — the gate is on publishing, which is what 0004 R2 makes it a precondition
of, and not on committing.

**This is the first time one of this project's remembered rules becomes a
command.** Three were named as held by a person writing something down: the
imprint address, 0008 §8's slowdown factor and its date, and 0009 §4's browser
APIs. This closes the first of the three, and the other two stay open — a check
that fails on a known-fake string is available here only because 0004 §3 chose a
string that could not be anything else.

### 7. It goes live at the walking skeleton

The first deployment is [#13](https://github.com/nanatsusaya/dot-panic/issues/13),
the first end-to-end increment, and not the point at which
[0001](0001-purpose-scope-and-success.md) §3 calls the toy good enough.

**The reason is [0001](0001-purpose-scope-and-success.md) §6.2** — *the toy is
never finished because the process ate the work* — which is the second-worst way
this project fails and the one it is most exposed to, thirteen records in with
nothing on a screen. A URL that serves something early makes that failure visible
in the only way it can be: by there being a page, and by it being poor. Waiting
for good enough hides the same state behind a decision that always looks
defensible one more week.

What goes live is bounded by §6 and by 0004 R2 regardless: an increment carrying
the placeholder address does not deploy, whatever else it does.

### 8. What is asserted, measured and watched

The registers are [0010](0010-testing-strategy.md) §1's.

**Asserted — a command decides these:**

| | Claim |
|---|---|
| §6 | The deployed artifact does not contain `Musterstadt` |
| §5 | The deployed page carries the 0003 §6 policy as a `meta` element |
| §4 | The deployed page links GitHub's privacy statement |
| §2 | Deployment runs only after the 0009 §8 checks pass |

The third is there because §4's two sentences are the kind of thing a page rewrite
drops without anyone noticing, and a link is the one part of them a command can
recognize. **What it cannot decide is whether the sentences still say anything
true** — that is a person reading them, like the address above.

**Measured** — nothing. This record adds no quantity to
[0008](0008-performance-budget.md) §9's list.

**Only watching decides these**, under [0012](0012-how-software-gets-developed.md)
§5, with the expected picture written into the ticket before the work starts:

- Whether the page at the public URL is the page that was watched locally —
  [0010](0010-testing-strategy.md) §9 makes this the only evidence that the
  emitted output matches what the tests passed, and §7's *live at the walking
  skeleton* is what makes it a routine step rather than a one-time event
- Whether the imprint is reachable at the public URL on a phone, which is
  0014 §9's claim arriving somewhere real

## Consequences

**Positive.**

- **[0004](0004-compliance-accessibility-and-rights.md) §8 is answered**, and
  answered with a quotation rather than an assumption.
- **A remembered rule became a command.** §6 is the first of three to close, and
  the imprint was the one with a legal obligation behind it.
- **The 2026-07-31 choice is now binding.** It lived in the method log, which is
  not an authority for what is decided; a later session reading only the records
  would not have found it.
- **Nothing is bought and nothing is registered.** §3 leaves the project with no
  renewal, no expiry and no second account.
- **The deploy gate is not a merge gate**, so [0012](0012-how-software-gets-developed.md)
  §6's review boundary is untouched and no change waits on a machine.

**Negative.**

- **The page cannot deliver three directives, and this record does not fix it.**
  §5 leaves `report-uri`, `frame-ancestors` and `sandbox` unsent. 0003 §6
  permitted exactly this, which makes it accepted rather than harmless.
- **The visitor's IP is logged and nothing on the page can stop it.** §4 discloses
  it, which is the only response available and is not a remedy. A visitor who
  minds has one option, which is not to visit.
- **The disclosure rests on no legal determination.** R4 chose the cheap side of
  an asymmetry rather than establishing a duty, so a later reader looking for the
  reasoning that makes it *required* will not find one here.
- **Deploying early means the public URL will serve a poor toy for a while.**
  §7 chooses that deliberately, and it is still a real cost: the URL is the
  artifact most likely to be judged without the records beside it.
- **§6 catches one string.** A real address that is wrong, stale or incomplete
  passes it, and 0004 §1's obligation is about a *ladungsfähige Anschrift* rather
  than about a string that is not `Musterstadt`.
- **The workflow is a file nobody has written**, and this record does not make it
  exist. Until it does, §2's ordering is a claim about a file rather than a
  property of the project.

## Alternatives considered

- **Publishing from a branch, with no workflow** — rejected on 2026-07-31 by the
  decider and again here: it leaves the checks 0009 §8 fixes with nothing to
  gate, in the project built to demonstrate that they gate something.
- **A custom domain** — rejected because it costs money and renewal attention for
  a toy, and §3's move to one later is cheap.
- **A host that can set response headers** — not rejected on capability, which
  was not established, but not sought: 0003 §6 explicitly makes the header a
  bonus and not a constraint on which host may be chosen.
- **Going live only once 0001 §3 is satisfied** — rejected because it is the
  shape 0001 §6.2 warns about, and because it makes the first deployment a large
  untested step rather than a routine one.
- **A check on the source tree rather than the artifact** — rejected because the
  source is meant to carry the placeholder until a real address exists; gating
  commits would make 0004 §3's deliberate stand-in unusable.

## Resolved questions

Three of these were answered before the record was drafted and the fourth while it
was being written, which is why they are not all of one kind.

**R1 — GitHub Pages, deployed by a GitHub Actions workflow that runs the checks
first.** Answered *"wir folgen in allen punkten deiner empfehlung"* on 2026-08-02,
confirming the 2026-07-31 choice unchanged. §1 and §2 are that answer. It was put
again rather than read out of the method log because that file records why the way
we work looks as it does and not what is binding, and because four of
[#37](https://github.com/nanatsusaya/dot-panic/issues/37)'s six scope items follow
from it — a stale answer would have taken most of the record with it.

**R2 — The default URL, and no custom domain.** Same authorization. §3.

**R3 — Live at the walking skeleton, not at good enough.** Same authorization.
§7, whose argument is 0001 §6.2 rather than a preference for shipping early.

**R4 — The page says that its host logs the visitor's IP address.** Answered *"wir
folgen deiner Empfehlung"* on 2026-08-02. §4 is that answer, and
[#77](https://github.com/nanatsusaya/dot-panic/issues/77) is the work.

**The question was not whether to disclose but whether disclosure was owed**, and
that is a legal determination this record still does not make. It was the only
question here no document could settle: [0004](0004-compliance-accessibility-and-rights.md)
§13 read twenty-two instruments and its GDPR row reached nothing on the page,
correctly, because no host was chosen then. Choosing one puts processing at a
layer the page cannot touch, and whether the operator is a controller for it is
contestable in a way the fact is not.

**So the answer is the cheap side of an asymmetry rather than a finding.** Two
sentences and a link cost no mechanism, no request and nothing stored; being wrong
in the other direction costs a duty unmet. That is why the recommendation was made
without the determination behind it, and why the record says so instead of
dressing the choice up as settled law.

## References

- [GitHub — About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages),
  read 2026-08-02. *"GitHub Pages is a static site hosting service that takes
  HTML, CSS, and JavaScript files straight from a repository on GitHub,
  optionally runs the files through a build process, and publishes a website."* ·
  *"When a GitHub Pages site is visited, the visitor's IP address is logged and
  stored for security purposes, regardless of whether the visitor has signed into
  GitHub or not."* The page does not mention custom HTTP response headers, which
  is what §5 rests on and all §5 claims.
- [GitHub — Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site),
  read 2026-08-02. Publishing from a branch and publishing with a custom GitHub
  Actions workflow are the two sources. A custom workflow uses `actions/checkout`,
  `actions/upload-pages-artifact` and `actions/deploy-pages`, deploys through a
  `github-pages` environment created automatically, and the documentation
  recommends *"a deployment protection rule so that only the default branch can
  deploy to this environment"* — adopted in §2.
- [GitHub — GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits),
  read 2026-08-02. *"Published GitHub Pages sites may be no larger than 1 GB"* ·
  *"GitHub Pages sites have a soft bandwidth limit of 100 GB per month"* · the
  soft limit of 10 builds per hour *"does not apply if you build and publish your
  site with a custom GitHub Actions workflow"*.

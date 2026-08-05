# Security

## What is here to attack

**Today, nothing.** This repository is documents. There is no code, no build,
no dependency and nothing deployed, and [docs/STATUS.md](../docs/STATUS.md) is
where that is kept current rather than here.

What will be here is a page made of static files, and what it may and may not
do is decided rather than left to convention.
[0003](../docs/adr/0003-security-and-privacy-by-design.md) is the authority and
this file restates none of it — it forbids loading anything off the page's own
origin, running third-party code, storing anything on the visitor's device, and
making any network request once the page has loaded.

Three consequences are worth naming, because they are what a reader comes here
looking for and would otherwise have to infer:

- **There is no supply chain in the shipped page.** The simulation is written
  in this repository rather than taken from a package
  ([0013](../docs/adr/0013-origin-of-the-core.md)), so there is no third-party
  code in it to have a vulnerability.
- **Nothing is recorded about anybody.** No storage, no analytics and no
  request after load means there is no visitor data here to leak.
- **There is no server and no credential.** The page is static files on a host
  this project does not run, and the project holds no secret of any kind.

## What is worth reporting

- The page doing something
  [0003](../docs/adr/0003-security-and-privacy-by-design.md) forbids: a request
  after load, a third-party resource, anything written to the visitor's device.
- The Content-Security-Policy not doing what that record says it does.
- Anything in this repository that looks like a real credential, or like a
  person's data other than the operator's own contact details — which are
  decided content and belong here.

## Reporting something

**[GitHub's private vulnerability reporting](https://github.com/nanatsusaya/dot-panic/security/advisories/new)**
is enabled on this repository and is the better route: it stays private until a
fix exists, which a public issue does not.

If that form is unavailable to you, email **nanatsusaya@mein.gmx** — or open an
ordinary [issue](https://github.com/nanatsusaya/dot-panic/issues) saying only
that you have something to report and asking for a private channel, with no
details in the issue itself.

## What to expect

One person, no security team, no advisory pipeline and **no promised response
time.** Any of those would be a process this project cannot honor, and naming
what is not here is more useful than a sentence about taking security
seriously.

What you can expect is an honest answer rather than a fast one. A report that
turns out to be a real defect gets fixed and credited, unless you would rather
it were not.

# dot-panic

A flock of dots that scatters when your pointer comes near.

## What this is

Two things at once, and the second one is the point.

**A small browser toy.** Dots move in a flock. They never stop moving, they
never overlap, they stay inside the frame, and they get out of your way when
you approach with a mouse or a finger. There is no goal, no score and no
ending — this is a toy, not a game.

**A worked example of a method.** It is built under
[agent-driven-development](https://github.com/nanatsusaya/agent-driven-development),
a published ruleset for running projects with AI agents. The interesting
question here is not what gets built but how: which decisions were written
down before any code existed, what "done" meant before the work started, and
which of the claims made about this project a command can actually check.

## Why a flock

Because a green test suite proves almost nothing here.

The rules of the simulation are easy to test. No two dots overlap. Every dot
keeps moving. Every dot stays inside the frame. The same seed produces the
same run. All of that can pass while what appears on screen looks like
twitching confetti rather than a flock.

That gap — between a passing build and a thing that actually works — is what
this project is built to show.

## Status

Nothing is built yet. The method is being adopted first, which is the order
the method asks for: decide before building.

## License

Not yet decided.

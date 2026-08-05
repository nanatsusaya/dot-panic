/**
 * The pseudorandom generator, which is the only source of variation the Core
 * has: 0002 §3 leaves it no clock and no ambient randomness, so everything a
 * world differs by comes through a seed.
 *
 * It is SplitMix64, written here from the published algorithm — 0013 §5 permits
 * taking a named generator's algorithm where §1 forbids taking anyone's file,
 * and §7 asks that whatever was consulted is named in the ticket that produced
 * the code, which #91 does.
 *
 * It is this generator and not one of the xoshiro family because its whole
 * state is a single 64-bit word. Deriving a generator from a seed, which 0002
 * §4 requires, is then the seed itself rather than a second algorithm chosen
 * only to expand it.
 */

/**
 * The generator's entire state.
 *
 * A world carries one (0002 §4), which is what lets a world be the whole of
 * what a run depends on. A caller advances it by taking the state that comes
 * back from each draw.
 */
export type Random = bigint;

const SIXTY_FOUR_BITS = 0xffffffffffffffffn;
const INCREMENT = 0x9e3779b97f4a7c15n;
const FIRST_MULTIPLIER = 0xbf58476d1ce4e5b9n;
const SECOND_MULTIPLIER = 0x94d049bb133111ebn;

// A number carries 53 bits exactly, so a fraction takes the top 53 of the
// generator's 64 and invents nothing below them.
const DISCARDED_BITS = 11n;
const FRACTIONS = 2 ** 53;

/**
 * Derive a generator from a seed.
 *
 * @param seed  any integer. The Shell is the only part that chooses one
 *              (0002 §4), and where it gets one is not the Core's question
 * @returns the state that seed starts from
 */
export function randomFromSeed(seed: number): Random {
  return BigInt(seed) & SIXTY_FOUR_BITS;
}

/**
 * Draw one fraction.
 *
 * The state comes back beside the value rather than being kept here, because a
 * generator holding its own state would be the one impure thing in a pure part
 * (0002 §1) and would put a world's future outside the world.
 *
 * @param random  the state to draw from. The same state always gives the same
 *                pair, which is the property 0010 §3's determinism test rests on
 * @returns the fraction, in [0, 1), and the state that follows it
 */
export function nextFraction(random: Random): readonly [number, Random] {
  const next = (random + INCREMENT) & SIXTY_FOUR_BITS;
  const once = ((next ^ (next >> 30n)) * FIRST_MULTIPLIER) & SIXTY_FOUR_BITS;
  const twice = ((once ^ (once >> 27n)) * SECOND_MULTIPLIER) & SIXTY_FOUR_BITS;
  const mixed = twice ^ (twice >> 31n);

  return [Number(mixed >> DISCARDED_BITS) / FRACTIONS, next];
}

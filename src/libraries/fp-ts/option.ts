import { sequenceS, sequenceT } from 'fp-ts/lib/Apply';
import { chain, none, Option, option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { GuardedType, Predicate } from 'src/libraries/typescript';

/**
 * Takes in an optional array and chains empty arrays to none
 *
 * option.chain(xs => xs.length === 0 ? none : some(xs))
 */
export const chainEmpty = <T>(o: Option<T[]>): Option<T[]> =>
  pipe(
    o,
    chain(ps => (ps.length === 0 ? none : some(ps)))
  );

/**
 * Sequence instances for option monads
 */
export const optionSequenceT = sequenceT(option);
export const optionSequenceS = sequenceS(option);

/**
 * Chainable type guard factory
 */
export const guard = <P extends Predicate>(p: P) =>
  chain(o => (p(o) ? (some(o) as Option<GuardedType<P>>) : none));

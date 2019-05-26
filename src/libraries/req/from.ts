import { Either } from 'fp-ts/lib/Either';
import { Option } from 'fp-ts/lib/Option';

import { failure, pending, Req, success } from './type';

export const fromEither = <L, A>(e: Either<L, A>): Req<L, A> =>
  e.fold<Req<L, A>>(failure, success);

export const fromOption = <A>(e: Option<A>): Req<unknown, A> =>
  e.fold<Req<unknown, A>>(pending(), success);

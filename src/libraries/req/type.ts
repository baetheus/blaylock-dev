import { fromEquals, Setoid } from 'fp-ts/lib/Setoid';
import { Prism } from 'monocle-ts';

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    Req: Req<L, A>;
  }
}

export const URI = 'Req';

export type URI = typeof URI;

export type Req<L, A> =
  | Pending<L, A>
  | Failure<L, A>
  | Success<L, A>
  | Refresh<L, A>;

export class Pending<L, A> {
  static value: Req<never, never> = new Pending();
  readonly type: 'Pending' = 'Pending';
  readonly _A!: A;
  readonly _L!: L;
  readonly _URI!: URI;
  private constructor() {}
  fold<R>(
    onPending: R,
    _onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onPending;
  }
  foldL<R>(
    onPending: () => R,
    _onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onPending();
  }
}

export class Failure<L, A> {
  readonly type: 'Failure' = 'Failure';
  readonly _A!: A;
  readonly _L!: L;
  readonly _URI!: URI;
  constructor(readonly value0: L) {}
  fold<R>(
    _onPending: R,
    onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onFailure(this.value0);
  }
  foldL<R>(
    _onPending: () => R,
    onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onFailure(this.value0);
  }
}

export class Success<L, A> {
  readonly type: 'Success' = 'Success';
  readonly _A!: A;
  readonly _L!: L;
  readonly _URI!: URI;
  constructor(readonly value0: A) {}
  fold<R>(
    _onPending: R,
    _onFailure: (value0: L) => R,
    onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onSuccess(this.value0);
  }
  foldL<R>(
    _onPending: () => R,
    _onFailure: (value0: L) => R,
    onSuccess: (value0: A) => R,
    _onRefresh: (value0: A) => R
  ): R {
    return onSuccess(this.value0);
  }
}

export class Refresh<L, A> {
  readonly type: 'Refresh' = 'Refresh';
  readonly _A!: A;
  readonly _L!: L;
  readonly _URI!: URI;
  constructor(readonly value0: A) {}
  fold<R>(
    _onPending: R,
    _onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    onRefresh: (value0: A) => R
  ): R {
    return onRefresh(this.value0);
  }
  foldL<R>(
    _onPending: () => R,
    _onFailure: (value0: L) => R,
    _onSuccess: (value0: A) => R,
    onRefresh: (value0: A) => R
  ): R {
    return onRefresh(this.value0);
  }
}

export const pending = <L, A>(): Req<L, A> => Pending.value;

export const failure = <L, A>(value0: L): Req<L, A> => new Failure(value0);

export const success = <L, A>(value0: A): Req<L, A> => new Success(value0);

export const refresh = <L, A>(value0: A): Req<L, A> => new Refresh(value0);

export function _pending<L, A>(): Prism<Req<L, A>, Req<L, A>> {
  return Prism.fromPredicate(s => s.type === 'Pending');
}

export function _failure<L, A>(): Prism<Req<L, A>, Req<L, A>> {
  return Prism.fromPredicate(s => s.type === 'Failure');
}

export function _success<L, A>(): Prism<Req<L, A>, Req<L, A>> {
  return Prism.fromPredicate(s => s.type === 'Success');
}

export function _refresh<L, A>(): Prism<Req<L, A>, Req<L, A>> {
  return Prism.fromPredicate(s => s.type === 'Refresh');
}

export function getSetoid<L, A>(
  setoidFailureValue0: Setoid<L>,
  setoidSuccessValue0: Setoid<A>,
  setoidRefreshValue0: Setoid<A>
): Setoid<Req<L, A>> {
  return fromEquals((x, y) => {
    if (x.type === 'Pending' && y.type === 'Pending') {
      return true;
    }
    if (x.type === 'Failure' && y.type === 'Failure') {
      return setoidFailureValue0.equals(x.value0, y.value0);
    }
    if (x.type === 'Success' && y.type === 'Success') {
      return setoidSuccessValue0.equals(x.value0, y.value0);
    }
    if (x.type === 'Refresh' && y.type === 'Refresh') {
      return setoidRefreshValue0.equals(x.value0, y.value0);
    }
    return false;
  });
}

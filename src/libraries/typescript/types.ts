/**
 * Function Types
 */

/**
 * A better type for function conditionals
 */
export type FunctionN<A extends Array<unknown>, B> = (...a: A) => B;

/**
 * A type that extracts the argument and return types of a function
 */
export type FunctionTypes<F> = F extends FunctionN<infer A, infer B>
  ? [A, B]
  : never;

/**
 * Standalone type for extracting function arguments
 *
 * @example
 * const myFunc = (foo: number) => foo + 1;
 * type MyFuncArgs = Args<typeof myFunc>; // [number]
 */
export type Args<F> = FunctionTypes<F>[0];

/**
 * Standalone type for extracting function arguments
 *
 * @example
 * const myFunc = (foo: number) => foo + 1;
 * type MyFuncReturn = Return<typeof myFunc>; // number
 */
export type Return<F> = FunctionTypes<F>[1];

/**
 * A type that represents a record of functions. ie
 *
 * const record = {
 *   foo: (f: number) => f + 1,
 *   bar: (b: string) => b.toUpperCase(),
 * }
 */
export type FunctionRecord = Record<string, FunctionN<unknown[], unknown>>;

/**
 * A type that infers the return types of a FunctionRecord
 *
 * @example
 * const record = {
 *   foo: (f: number) => f + 1,
 *   bar: (b: string) => b.toUpperCase(),
 * }
 * type RecordReturns = ReturnRecord<typeof record>; // { foo: number, bar: string }
 */
export type ReturnRecord<P extends FunctionRecord> = {
  [K in keyof P]: Return<P[K]>;
};

/**
 * Readable/Writeable Types
 */

/**
 * Utility type for comparing other types
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? A
  : B;

/**
 * Utility type for extracting the writable keys of a type
 */
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

/**
 * Utility type for extracting the readonly keys of a type
 */
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

/**
 * Type to pull the writable type from a type
 */
export type WritableRecord<T extends Record<any, any>> = Pick<
  T,
  WritableKeys<T>
>;

export type ReadonlyRecord<T extends Record<any, any>> = Pick<
  T,
  ReadonlyKeys<T>
>;

/**
 * Predicate Types
 */
export type Nil = undefined | null;

export type Nullable<T> = T | Nil;

export type GuardedType<T> = T extends (x: any) => x is infer T ? T : never;

export type Predicate = (x: unknown) => boolean;

/**
 * Constructable Types
 */

export type Constructable<AS extends any[] = any[], T = any> = {
  new (...as: AS): T;
  prototype: T;
};

export type FromConstructable<C> = C extends Constructable<infer AS, infer T>
  ? [AS, T]
  : never;

export type ConstructableArgs<C> = FromConstructable<C>[0];

export type ConstructableReturn<C> = FromConstructable<C>[1];

export type ConstructableWriteable<C extends Constructable> = WritableRecord<
  ConstructableReturn<C>
>;

export type ConstructableReadonly<C extends Constructable> = ReadonlyRecord<
  ConstructableReturn<C>
>;

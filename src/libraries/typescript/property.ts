/**
 * Marks keys in RS as required
 */
export type MarkRequired<
  T extends Record<any, any>,
  RS extends keyof T
> = Required<Pick<T, RS>> & Pick<T, Exclude<keyof T, RS>>;

import { Context } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Store } from 'redux';

/**
 * Creates a useRedux hook.
 *
 * First function takes Context.
 *
 * Second function takes a selector and an optional comparator and
 * returns the output of the selector and the store's dispatch function
 *
 * Updates only when comparator detects a change (by default on strict equality change)
 */
export const useReduxFactory = <S>(context: Context<Store<S>>) => <O>(
  selector: (s: S) => O,
  comparator: (p: O, n: O) => boolean = (p, n) => p !== n
) => {
  const { dispatch, subscribe, getState } = useContext(context);
  const [state, setState] = useState(selector(getState()));

  const listener = () => {
    const nextState = selector(getState());
    if (comparator(state, nextState)) {
      setState(nextState);
    }
  };

  useEffect(() => subscribe(listener), [context, selector, comparator]);

  return [state, dispatch] as [typeof state, typeof dispatch];
};

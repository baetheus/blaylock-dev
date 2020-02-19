import { useEffect, useState } from "preact/hooks";
import { StoreApi } from "@nll/dux/lib/Store";

/**
 * Creates a useStore hook.
 *
 * First function takes Context.
 *
 * Second function takes a selector and an optional comparator and
 * returns the output of the selector and the store's dispatch function
 *
 * Updates only when comparator detects a change (by default on strict equality change)
 */
export const useStoreFactory = <S>(store: StoreApi<S>) =>
  function useStore<O>(selector: (s: S) => O, comparator?: (p: O, n: O) => boolean) {
    const { dispatch, select, getState } = store;
    const [state, setState] = useState<O>(selector(getState()));

    useEffect(() => {
      const sub = select(selector, comparator).subscribe(setState);
      return () => sub.unsubscribe();
    }, [store, selector, comparator]);

    return [state, dispatch] as [typeof state, typeof dispatch];
  };

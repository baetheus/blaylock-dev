import { DatumEither, failure, initial, toRefresh } from '@nll/datum/lib/DatumEither';
import { Task } from 'fp-ts/lib/Task';
import { Errors } from 'io-ts';
import { useEffect, useState } from 'preact/hooks';

export const useTaskDatumEither = <T>(task: Task<DatumEither<Errors, T>>) => {
  const [state, setState] = useState<DatumEither<Errors, T>>(initial);
  useEffect(() => {
    // Setup "cancellation closure"
    let linked = true;
    // Initialze loading state
    setState(toRefresh(state));
    task()
      .then(d => {
        if (linked) {
          setState(d);
        }
      })
      .catch(() => setState(failure([])));
    return () => (linked = false);
  }, [task]);
  return state;
};

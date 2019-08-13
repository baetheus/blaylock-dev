import { AsyncData, failure, initial, pending, success } from '@nll/dux';
import { Task } from 'fp-ts/lib/Task';
import { Errors } from 'io-ts';
import { useEffect, useState } from 'preact/hooks';

export const useTaskData = <T>(task: Task<AsyncData<Errors, T>>) => {
  const [state, setState] = useState(initial<Errors, T>());
  useEffect(() => {
    // Setup "cancellation closure"
    let linked = true;
    // Initialze state
    setState(
      state.fold(
        pending(),
        state,
        error => failure(error, true),
        data => success(data, true)
      )
    );
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

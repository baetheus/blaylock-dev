import { AsyncData, failure, initial, pending } from '@nll/dux';
import { Task } from 'fp-ts/lib/Task';
import { Errors } from 'io-ts';
import { useEffect, useState } from 'preact/hooks';

export const useTaskData = <T>(task: Task<AsyncData<Errors, T>>) => {
  const [state, setState] = useState(initial<Errors, T>());
  useEffect(() => {
    let linked = true;
    setState(pending());
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

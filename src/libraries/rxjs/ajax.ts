import { Observable, of, throwError } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

export const mapAjaxJson = (
  obs: Observable<AjaxResponse>
): Observable<unknown> =>
  obs.pipe(
    mergeMap(res =>
      res.responseType === 'json'
        ? of(res.response)
        : throwError(new TypeError('Response type is not JSON'))
    )
  );

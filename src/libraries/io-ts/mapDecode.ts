import { Decoder } from 'io-ts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromEither } from '~/libraries/rxjs';

/**
 * @name mapDecode
 * @description A pipeable observable operator factory that takes an io-ts decoder
 * and returns a pipeable operator that decodes the
 */
export const mapDecode = <I, A>({ decode }: Decoder<I, A>) => (
  obs: Observable<I>
): Observable<A> =>
  obs.pipe(
    map(decode),
    fromEither
  );

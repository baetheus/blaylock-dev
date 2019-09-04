import { DatumEither, initial } from '@nll/datum/lib/DatumEither';
import { asyncActionCreators } from '@nll/dux/lib/Actions';
import { asyncExhaustMap } from '@nll/dux/lib/AsyncMap';
import { asyncReducerFactory, reducerDefaultFn } from '@nll/dux/lib/Reducers';
import { isLeft } from 'fp-ts/lib/Either';
import { Lens } from 'monocle-ts';
import { Epic } from 'redux-observable';
import { of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';

import { Articles } from './validators';

export interface DevtoStore {
  articles: DatumEither<Error, Articles>;
}

export const INIT_DEVTO_STORE: DevtoStore = {
  articles: initial,
};
export const articlesL = Lens.fromProp<DevtoStore>()('articles');

export const getArticles = asyncActionCreators<string, Articles, Error>(
  'GET_DEVTO'
);
export const getArticlesReducer = reducerDefaultFn(
  INIT_DEVTO_STORE,
  asyncReducerFactory(getArticles, articlesL)
);

export const getArticlesEpic: Epic = asyncExhaustMap(getArticles, username =>
  ajax(`https://dev.to/api/articles?username=${username}`).pipe(
    filter(r => r.responseType === 'json'),
    map(r => Articles.decode(r.response)),
    mergeMap(e =>
      isLeft(e) ? throwError(new Error(JSON.stringify(e))) : of(e.right)
    )
  )
);

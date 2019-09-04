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

import { GithubData } from './validators';

export interface GithubStore {
  github: DatumEither<Error, GithubData>;
}

export const INIT_GITHUB_STORE: GithubStore = {
  github: initial,
};
export const githubL = Lens.fromProp<GithubStore>()('github');

export const getGithub = asyncActionCreators<void, GithubData, Error>(
  'GET_GITHUB'
);
export const getGithubReducer = reducerDefaultFn(
  INIT_GITHUB_STORE,
  asyncReducerFactory(getGithub, githubL)
);

export const getGithubEpic: Epic = asyncExhaustMap(getGithub, () =>
  ajax({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    body: JSON.stringify({
      query: `{ viewer { gists(last:5) { nodes { name description updatedAt files { name } stargazers { totalCount } } } repositories(last:7) { nodes { nameWithOwner description url updatedAt } } } organization(login: "nullpub") { repositories(last: 7) { nodes { nameWithOwner description url updatedAt } } }}`,
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  }).pipe(
    filter(r => r.responseType === 'json'),
    map(r => GithubData.decode(r.response)),
    mergeMap(e =>
      isLeft(e) ? throwError(new Error(JSON.stringify(e))) : of(e.right)
    )
  )
);

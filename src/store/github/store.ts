import { DatumEither, initial } from '@nll/datum/lib/DatumEither';
import { asyncActionCreators } from '@nll/dux/lib/Actions';
import { asyncExhaustMap } from '@nll/dux/lib/AsyncMap';
import { asyncReducerFactory, reducerDefaultFn } from '@nll/dux/lib/Reducers';
import { Lens } from 'monocle-ts';
import { Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { mapDecode } from '~/libraries/io-ts';
import { mapAjaxJson } from '~/libraries/rxjs';

import * as queries from './queries';
import { GistData, RepoData } from './validators';

interface GithubStore {
  gists: DatumEither<Error, GistData>;
  repos: DatumEither<Error, RepoData>;
}

const INIT_GITHUB_STORE: GithubStore = {
  gists: initial,
  repos: initial,
};

const githubStoreL = Lens.fromProp<GithubStore>();

export const reposL = githubStoreL('repos');
export const gistsL = githubStoreL('gists');

/**
 * Github Repos Store Controls
 */
export const getRepos = asyncActionCreators<void, RepoData, Error>(
  'GET_GITHUB_REPOS'
);
export const getReposEpic: Epic = asyncExhaustMap(getRepos, () =>
  ajax({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    body: JSON.stringify({
      query: queries.repos(),
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  }).pipe(
    mapAjaxJson,
    mapDecode(RepoData)
  )
);

export const getGists = asyncActionCreators<void, GistData, Error>(
  'GET_GITHUB_GISTS'
);
export const getGistsEpic: Epic = asyncExhaustMap(getGists, () =>
  ajax({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    body: JSON.stringify({
      query: queries.gists(),
    }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  }).pipe(
    mapAjaxJson,
    mapDecode(GistData)
  )
);

export const githubReducer = reducerDefaultFn(
  INIT_GITHUB_STORE,
  asyncReducerFactory(getGists, gistsL),
  asyncReducerFactory(getRepos, reposL)
);

import { actionCreatorFactory } from "@nll/dux/lib/Actions";
import { ajax } from "rxjs/ajax";
import { asyncReducerFactory, reducerFn } from "@nll/dux/lib/Reducers";
import { DatumEither, initial } from "@nll/datum/lib/DatumEither";
import { GistData, RepoData } from "./validators";
import { Lens } from "monocle-ts";
import { mapAjaxJson } from "~/libraries/rxjs";
import { mapDecode } from "~/libraries/io-ts";
import * as queries from "./queries";
import { createStore } from "@nll/dux/lib/Store";
import { asyncExhaustMap } from "@nll/dux/lib/AsyncMap";
import { useStoreFactory } from "~/libraries/dux/useStoreFactory";
import { loggingMetaReducer } from "~/libraries/dux";

interface GithubStore {
  gists: DatumEither<Error, GistData>;
  repos: DatumEither<Error, RepoData>;
}

const INIT_GITHUB_STORE: GithubStore = {
  gists: initial,
  repos: initial
};

const githubStoreL = Lens.fromProp<GithubStore>();

const reposL = githubStoreL("repos");
const gistsL = githubStoreL("gists");

const API_TOKEN = process.env.GITHUB_API_TOKEN;

/**
 * Actions
 */
const a = actionCreatorFactory("GITHUB");
export const getRepos = a.async<void, RepoData, Error>("GET_GITHUB_REPOS");
export const getGists = a.async<void, GistData, Error>("GET_GITHUB_GISTS");

/**
 * Epics
 */
const getReposEpic = asyncExhaustMap(getRepos, () =>
  ajax({
    url: "https://api.github.com/graphql",
    method: "POST",
    body: JSON.stringify({
      query: queries.repos()
    }),
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  }).pipe(mapAjaxJson, mapDecode(RepoData))
);

const getGistsEpic = asyncExhaustMap(getGists, () =>
  ajax({
    url: "https://api.github.com/graphql",
    method: "POST",
    body: JSON.stringify({
      query: queries.gists()
    }),
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  }).pipe(mapAjaxJson, mapDecode(GistData))
);

/**
 * Reducers
 */
const githubReducer = reducerFn(
  asyncReducerFactory(getGists, gistsL),
  asyncReducerFactory(getRepos, reposL)
);

/**
 * Store
 */
const githubStore = createStore(INIT_GITHUB_STORE)
  .addMetaReducers(loggingMetaReducer())
  .addReducers(githubReducer)
  .addRunOnces(getReposEpic, getGistsEpic);

export const useGithub = useStoreFactory(githubStore);

import { actionCreatorFactory } from "@nll/dux/Actions";
import { ajax } from "rxjs/ajax";
import { asyncExhaustMap } from "@nll/dux/Operators";
import { asyncReducerFactory, reducerFn } from "@nll/dux/Reducers";
import { createStore } from "@nll/dux/Store";
import { useStoreFactory } from "@nll/dux/React";
import { DatumEither, initial } from "@nll/datum/DatumEither";
import { GistData, RepoData } from "./validators";
import { Lens } from "monocle-ts";
import { loggingMetaReducer } from "~/libraries/dux";
import { mapAjaxJson } from "~/libraries/rxjs";
import { mapDecode } from "~/libraries/io-ts";
import * as queries from "./queries";
import { useState, useEffect } from "preact/hooks";

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

export const useGithub = useStoreFactory(githubStore, useState, useEffect);

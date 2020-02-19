import { actionCreatorFactory } from "@nll/dux/lib/Actions";
import { ajax } from "rxjs/ajax";
import { asyncReducerFactory, reducerFn } from "@nll/dux/lib/Reducers";
import { DatumEither, initial } from "@nll/datum/lib/DatumEither";
import { filter, map, mergeMap } from "rxjs/operators";
import { isLeft } from "fp-ts/lib/Either";
import { Lens } from "monocle-ts";
import { of, throwError } from "rxjs";
import { createStore } from "@nll/dux/lib/Store";
import { asyncSwitchMap } from "@nll/dux/lib/AsyncMap";

import { Articles } from "./validators";
import { useStoreFactory } from "~/libraries/dux/useStoreFactory";

interface DevtoState {
  articles: DatumEither<Error, Articles>;
}

const INIT_DEVTO_STORE: DevtoState = {
  articles: initial
};
const articlesL = Lens.fromProp<DevtoState>()("articles");

/**
 * Actions
 */
const a = actionCreatorFactory("DEVTO");
export const getArticles = a.async<string, Articles, Error>("GET_DEVTO");

/**
 * Epics
 */
const getArticlesEpic = asyncSwitchMap(getArticles, username =>
  ajax(`https://dev.to/api/articles?username=${username}`).pipe(
    filter(r => r.responseType === "json"),
    map(r => Articles.decode(r.response)),
    mergeMap(e => (isLeft(e) ? throwError(new Error(JSON.stringify(e))) : of(e.right)))
  )
);

/**
 * Reducers
 */
const getArticlesReducer = reducerFn(asyncReducerFactory(getArticles, articlesL));

/**
 * Store
 */
const devtoStore = createStore(INIT_DEVTO_STORE)
  .addReducers(getArticlesReducer)
  .addRunOnces(getArticlesEpic);

export const useDevto = useStoreFactory(devtoStore);

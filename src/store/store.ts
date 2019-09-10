import { createContext } from 'preact';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { useReduxFactory } from '~/libraries/redux';

import { getArticlesEpic, getArticlesReducer } from './devto';
import { getGithubEpic, getGithubReducer } from './github';

type ToStore<T> = T extends Store<infer S> ? S : never;

const storeFactory = () => {
  const reducers = combineReducers({
    github: getGithubReducer,
    devto: getArticlesReducer,
  });
  const epics = combineEpics(getGithubEpic, getArticlesEpic);
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(reducers, applyMiddleware(epicMiddleware));

  epicMiddleware.run(epics);

  return {
    store,
  };
};

const { store } = storeFactory();
const storeContext = createContext(store);
const useRedux = useReduxFactory(storeContext);

type RootStore = ToStore<typeof store>;

export { store, storeContext, useRedux, RootStore };

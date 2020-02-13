import { createContext } from 'preact';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { useReduxFactory } from '~/libraries/redux';

import { getGistsEpic, getReposEpic, githubReducer } from './github';

type ToStore<T> = T extends Store<infer S, any> ? S : never;

const storeFactory = () => {
  const reducers = combineReducers({
    github: githubReducer,
  });
  const epics = combineEpics(getGistsEpic, getReposEpic);
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(reducers, applyMiddleware(epicMiddleware));

  epicMiddleware.run(epics);

  return store;
};

const store = storeFactory();
const storeContext = createContext(store);
const useRedux = useReduxFactory(storeContext);

type RootStore = ToStore<typeof store>;

export { store, storeContext, useRedux, RootStore };

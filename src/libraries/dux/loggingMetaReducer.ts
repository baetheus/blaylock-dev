import { MetaReducer } from "@nll/dux/lib/Store";

export const loggingMetaReducer = <S>(): MetaReducer<S> => reducer => {
  return (state, action) => {
    const _state = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("Action", action);
    console.log("State Before", state);
    console.log("State After", _state);
    console.groupEnd();
    return _state;
  };
};

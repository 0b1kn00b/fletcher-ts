// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
import { useReducer, useCallback, Reducer } from 'react';
import { ArrowletApi } from "src/core/ArrowletApi";
import { Fletcher } from "../Fletcher";
import { Dispatch} from 'react'; 
import { Result } from "src/core/Result";

export function react<P,R,E>(self:ArrowletApi<P,R,E>,p:P){
  return async function(dispatch:Dispatch<Result<R,E>>) {
    const result = await Fletcher.Resolve(self,p);
    dispatch(result);
  }
}
function useReducerWithThunk<S,A>(reducer:Reducer<S,A>, initialState:S) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function customDispatch(action:any) {
    if (typeof action === 'function') {
      return action(customDispatch);
    } else {
      dispatch(action);
    }
  };

  // Memoize so you can include it in the dependency array without causing infinite loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableDispatch = useCallback(customDispatch, [dispatch]);

  return [state, stableDispatch];
}

export { useReducerWithThunk };
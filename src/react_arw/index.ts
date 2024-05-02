// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
import { useReducer, useCallback, Reducer } from 'react';
import { ArrowletApi } from "../core/ArrowletApi";
import { Fletcher } from "../Fletcher";
import { Dispatch} from 'react'; 
import { Result } from "../core/Result";

export function react<P,R,E>(self:ArrowletApi<P,R,E>,p:P){
  return async function(dispatch:Dispatch<Result<R,E>>) {
    const result = await Fletcher.Resolve(self,p);
    dispatch(result);
  }
}
type AsyncAction<A> = (action: A | ((a: A) => void)) => void;
//<Reducer<S, A>>(reducer: Reducer<S, A>, initialState: S, initializer?: undefined): [S, Dispatch<A>] (+4 overloads) import useReducer
function useReducerWithThunk<S,A>(reducer:Reducer<S,A>, initialState:S) : [S,AsyncAction<A>] {
  const [state, dispatch] : [S, Dispatch<A>]= useReducer(reducer, initialState);

  function customDispatch(action:((a:A)=>void) | A):void{
    switch  (typeof action ) {
      case 'function' :
        return (action as ( (fn:((a:A) => void)) => void))(customDispatch);
      default : 
        dispatch(action);
    }
  };

  // Memoize so you can include it in the dependency array without causing infinite loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableDispatch : (action: A | ((a: A) => void)) => void = useCallback(customDispatch, [dispatch]);

  return [state, stableDispatch];
}

export { useReducerWithThunk };
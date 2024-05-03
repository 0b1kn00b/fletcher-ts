// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
import { useReducer, useCallback, Reducer } from 'react';
import { Arrowlet } from "../core/Arrowlet";
import { Dispatch} from 'react'; 
import { Result } from "../core/Result";
import { ReactAsyncAction } from './ReactAsyncAction';
import { resolve } from '../util';
import { Terminal } from '../core/Terminal';
import { Anon } from '../term/Anon';
import { Cycle } from '../core/Cycle';

export function react<P,R>(dispatch:Dispatch<R>):Arrowlet<R,void>{
  return new Anon(
    (p:R,cont:Terminal<void>) => {
      dispatch(p);
      return Cycle.Unit();
    }
  );
}

//(reducer: Reducer<S, A>, initialState: S): [S, Dispatch<A>] 
//<Reducer<S, A>>(reducer: Reducer<S, A>, initialState: S, initializer?: undefined): [S, Dispatch<A>] (+4 overloads) import useReducer
function useReducerWithThunk<A>(dispatch:Dispatch<A>):Dispatch<A> {
  //const [state, dispatch] : [S, Dispatch<A>]= useReducer(reducer, initialState);

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
  //const stableDispatch : (action: A | ((a: A) => void)) => void = useCallback(customDispatch, [dispatch]);

  return customDispatch;
}

export { useReducerWithThunk };
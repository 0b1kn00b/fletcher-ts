// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
import { useReducer, useCallback, Reducer } from 'react';
import { Arrowlet } from "../Core";
import { Allocator} from 'react'; 
import { ReactAsyncAction } from './ReactAsyncAction';
import { resolve } from '../util';
import { Junction } from '../core/Junction';
import { Anon } from '../term/Anon';
import { Work } from '../core/Work';

export function react<P,R>(dispatch:Allocator<R>):Arrowlet<R,void>{
  return new Anon(
    (p:R,cont:Junction<void>) => {
      dispatch(p);
      return Work.ZERO;
    }
  );
}

//(reducer: Reducer<S, A>, initialState: S): [S, Allocator<A>] 
//<Reducer<S, A>>(reducer: Reducer<S, A>, initialState: S, initializer?: undefined): [S, Allocator<A>] (+4 overloads) import useReducer
function useReducerWithThunk<A>(dispatch:Allocator<A>):Allocator<A> {
  //const [state, dispatch] : [S, Allocator<A>]= useReducer(reducer, initialState);

  function customAllocator(action:((a:A)=>void) | A):void{
    switch  (typeof action ) {
      case 'function' :
        return (action as ( (fn:((a:A) => void)) => void))(customAllocator);
      default : 
        dispatch(action);
    }
  };

  // Memoize so you can include it in the dependency array without causing infinite loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //const stableAllocator : (action: A | ((a: A) => void)) => void = useCallback(customAllocator, [dispatch]);

  return customAllocator;
}

export { useReducerWithThunk };
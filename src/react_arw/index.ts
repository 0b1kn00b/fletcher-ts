// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
import { useReducer, useCallback, type Reducer } from 'react';
import { type Arrowlet, Allocator, Junction, Work } from "src/Core";
import { type Dispatch } from 'react'; 
import { type ReactAsyncAction } from 'src/react_arw/ReactAsyncAction';
import { resolve } from 'src/util';
import { Anon } from 'src/term/Anon';

export function react<P,R>(dispatch:Dispatch<R>):Arrowlet<R,void>{
  return new Anon(
    (p:R,cont:Junction<void>):Work.Work => {
      dispatch(p);
      return cont.receive(Junction.issue(null));
    }
  );
}

//(reducer: Reducer<S, A>, initialState: S): [S, Allocator<A>] 
//<Reducer<S, A>>(reducer: Reducer<S, A>, initialState: S, initializer?: undefined): [S, Allocator<A>] (+4 overloads) import useReducer
function useReducerWithThunk<A>(dispatch:Dispatch<A>):Dispatch<A> {
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
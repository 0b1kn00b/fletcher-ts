import { Anon } from '../term/Anon';
import { Work } from '../core/Work';
export function react(dispatch) {
    return new Anon((p, cont) => {
        dispatch(p);
        return Work.ZERO;
    });
}
//(reducer: Reducer<S, A>, initialState: S): [S, Allocator<A>] 
//<Reducer<S, A>>(reducer: Reducer<S, A>, initialState: S, initializer?: undefined): [S, Allocator<A>] (+4 overloads) import useReducer
function useReducerWithThunk(dispatch) {
    //const [state, dispatch] : [S, Allocator<A>]= useReducer(reducer, initialState);
    function customAllocator(action) {
        switch (typeof action) {
            case 'function':
                return action(customAllocator);
            default:
                dispatch(action);
        }
    }
    ;
    // Memoize so you can include it in the dependency array without causing infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //const stableAllocator : (action: A | ((a: A) => void)) => void = useCallback(customAllocator, [dispatch]);
    return customAllocator;
}
export { useReducerWithThunk };

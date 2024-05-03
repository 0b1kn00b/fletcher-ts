import { Arrowlet } from "../core/Arrowlet";
import { Dispatch } from 'react';
export declare function react<P, R>(dispatch: Dispatch<R>): Arrowlet<R, void>;
declare function useReducerWithThunk<A>(dispatch: Dispatch<A>): Dispatch<A>;
export { useReducerWithThunk };

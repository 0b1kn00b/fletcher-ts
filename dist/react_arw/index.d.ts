import { ArrowletApi } from "../core/ArrowletApi";
import { Dispatch } from 'react';
export declare function react<P, R, E>(dispatch: Dispatch<R>): ArrowletApi<R, void, E>;
declare function useReducerWithThunk<A>(dispatch: Dispatch<A>): Dispatch<A>;
export { useReducerWithThunk };

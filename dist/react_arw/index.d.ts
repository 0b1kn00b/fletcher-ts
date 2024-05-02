import { ArrowletApi } from "../core/ArrowletApi";
import { Dispatch } from 'react';
import { Result } from "../core/Result";
import { ReactAsyncAction } from './ReactAsyncAction';
export declare function react<P, R, E>(self: ArrowletApi<P, R, E>, p: P): (dispatch: Dispatch<Result<R, E>>) => Promise<void>;
declare function useReducerWithThunk<S, A>(dispatch: Dispatch<A>): ReactAsyncAction<A>;
export { useReducerWithThunk };

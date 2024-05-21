import { Arrowlet } from "../Core";
import { Allocator } from 'react';
export declare function react<P, R>(dispatch: Allocator<R>): Arrowlet<R, void>;
declare function useReducerWithThunk<A>(dispatch: Allocator<A>): Allocator<A>;
export { useReducerWithThunk };

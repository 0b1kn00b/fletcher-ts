import { Receiver } from "./core/Receiver";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
export declare function forward<P, R, E>(self: ArrowletApi<P, R, E>, p: P): Receiver<R, E>;
export declare function resolve<P, R, E>(self: ArrowletApi<P, R, E>, input: P): Promise<Result<R, E>>;
/**
 * normallly as ArrowletApi<void,void> to drive Arrow
 * @returns
 */
export declare function unit<Pi, Ri, E>(): ArrowletApi<Pi, Ri, E>;

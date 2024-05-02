import { Receiver } from "./core/Receiver";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
export declare function forward<P, R>(self: ArrowletApi<P, R>, p: P): Receiver<R>;
export declare function resolve<P, R>(self: ArrowletApi<P, R>, input: P): Promise<Result<R>>;
/**
 * normallly as ArrowletApi<void,void> to drive Arrow
 * @returns
 */
export declare function unit<Pi, Ri>(): ArrowletApi<Pi, Ri>;

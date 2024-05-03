import { Receiver } from "./core/Receiver";
import { Arrowlet } from "./core/Arrowlet";
import { Result } from "./core/Result";
export declare function forward<P, R>(self: Arrowlet<P, R>, p: P): Receiver<R>;
export declare function resolve<P, R>(self: Arrowlet<P, R>, input: P): Promise<Result<R>>;
/**
 * normallly as Arrowlet<void,void> to drive Arrow
 * @returns
 */
export declare function unit<Pi, Ri>(): Arrowlet<Pi, Ri>;

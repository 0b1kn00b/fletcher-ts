import { Allocator } from "./core/Allocator";
import { Arrowlet } from "./core/Arrowlet";
export declare function forward<P, R>(self: Arrowlet<P, R>, p: P): Allocator<R>;
export declare function resolve<P, R>(self: Arrowlet<P, R>, input: P): Promise<R>;
/**
 * normallly as Arrowlet<void,void> to drive Arrow
 * @returns
 */
export declare function unit<Pi, Ri>(): Arrowlet<Pi, Ri>;

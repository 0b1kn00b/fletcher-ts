import { Terminal } from "./core/Terminal";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P, E>(): Terminal<P, E>;
    static Fun1R<P, R, E>(fn: (p: P) => R): ArrowletApi<P, R, E>;
    static Unit<P, E>(): ArrowletApi<P, P, E>;
    static Pure<P, R, E>(r: R): ArrowletApi<P, R, E>;
    static Resolve<P, R, E>(self: ArrowletApi<P, R, E>, input: P): Promise<Result<R, E>>;
    static Forward<P, R, E>(self: ArrowletApi<P, R, E>, input: P): Receiver<R, E>;
}

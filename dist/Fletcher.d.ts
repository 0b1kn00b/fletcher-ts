import { Terminal } from "./core/Terminal";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
import { Arrow } from "./core/Arrow";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P, E>(): Terminal<P, E>;
    static Arrow(): typeof Arrow;
    static Fun1R<P, R, E>(fn: (p: P) => R): Arrow<void, void, P, R, E>;
    static Unit<P, E>(): Arrow<void, void, P, P, E>;
    static Pure<P, R, E>(r: R): Arrow<void, void, P, R, E>;
    static Resolve<P, R, E>(self: ArrowletApi<P, R, E>, input: P): Promise<Result<R, E>>;
    static Forward<P, R, E>(self: ArrowletApi<P, R, E>, input: P): Receiver<R, E>;
    static Event<R extends Event, E>(self: EventTarget): ArrowletApi<string, R, E>;
    static Then<Pi, Ri, Rii, E>(that: ArrowletApi<Ri, Rii, E>): Arrow<Pi, Ri, Pi, Rii, E>;
    static Pair<Pi, Pii, Ri, Rii, E>(that: ArrowletApi<Pii, Rii, E>): Arrow<unknown, unknown, [unknown, Pii], [unknown, Rii], E>;
    static FlatMap<Pi, Ri, Rii, E>(fn: (p: Ri) => ArrowletApi<Pi, Rii, E>): Arrow<Pi, Ri, Pi, Rii, E>;
    static First<Pi, Ri, Pii, E>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown], unknown>;
    static Second<Pi, Ri, Pii, E>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown], unknown>;
    static Pinch<Pi, Ri, Rii, E>(that: ArrowletApi<Pi, Rii, E>): Arrow<Pi, unknown, Pi, [unknown, Rii], E>;
    static Joint<Pi, Ri, Rii, E>(that: ArrowletApi<Ri, Rii, E>): Arrow<Pi, Ri, Pi, [Ri, Rii], E>;
}

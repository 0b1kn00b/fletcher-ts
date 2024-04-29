import { Terminal } from "./core/Terminal";
import { Cycle } from "./core/Cycle";
import { Receiver } from "./core/Receiver";
import { ArrowletApi } from "./core/ArrowletApi";
import { Arrowlet } from "./core/Arrowlet";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P, E>(): Terminal<P, E>;
    static Fun1R<P, R, E>(fn: (p: P) => R): Arrowlet<P, R, E>;
    static Unit<P, E>(): ArrowletApi<P, P, E>;
    static Pure<P, R, E>(r: R): ArrowletApi<P, R, E>;
    static Anon<P, R, E>(fn: (p: P, cont: Terminal<R, E>) => Cycle): ArrowletApi<P, R, E>;
    static Then<Pi, Pii, R, E>(lhs: ArrowletApi<Pi, Pii, E>, rhs: ArrowletApi<Pii, R, E>): ArrowletApi<Pi, R, E>;
    static FlatMap<Pi, R, Ri, E>(self: ArrowletApi<Pi, R, E>, fn: (r: R) => ArrowletApi<Pi, Ri, E>): ArrowletApi<Pi, Ri, E>;
    static Pair<Pi, Ri, Pii, Rii, E>(self: ArrowletApi<Pi, Ri, E>, that: ArrowletApi<Pii, Rii, E>): ArrowletApi<[Pi, Pii], [Ri, Rii], E>;
    static Split<Pi, Ri, Rii, E>(self: ArrowletApi<Pi, Ri, E>, that: ArrowletApi<Pi, Rii, E>): ArrowletApi<Pi, [Ri, Rii], E>;
    static First<Pi, Ri, E>(self: ArrowletApi<Pi, Ri, E>): ArrowletApi<[Pi, unknown], [Ri, unknown], E>;
    static Pinch<P, Ri, Rii, E>(self: ArrowletApi<P, Ri, E>, that: ArrowletApi<P, Rii, E>): ArrowletApi<P, [Ri, Rii], E>;
    static Joint<Pi, Ri, Rii, E>(lhs: ArrowletApi<Pi, Ri, E>, rhs: ArrowletApi<Ri, Rii, E>): ArrowletApi<Pi, [Ri, Rii], E>;
    static Bound<P, Ri, Rii, E>(self: ArrowletApi<P, Ri, E>, that: ArrowletApi<[P, Ri], Rii, E>): ArrowletApi<P, Rii, E>;
    static Broach<Ri, Rii, E>(self: ArrowletApi<Ri, Rii, E>): ArrowletApi<Ri, [Ri, Rii], E>;
    static Event<R extends Event, E>(self: EventTarget): ArrowletApi<string, R, E>;
    static forward<P, R, E>(self: ArrowletApi<P, R, E>, p: P): Receiver<R, E>;
}

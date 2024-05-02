import { Terminal } from "./core/Terminal";
import { Cycle } from "./core/Cycle";
import { Anon } from "./term/Anon";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
import { Arrow } from "./core/Arrow";
import { useReducerWithThunk } from "./react_arw";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P, E>(): Terminal<P, E>;
    static Arrow(): typeof Arrow;
    static Fun1R<Pi, Ri, E>(fn: (p: Pi) => Ri): ArrowletApi<Pi, Ri, E>;
    static Pure<Pi, Ri, E>(r: Ri): ArrowletApi<Pi, Ri, E>;
    static Anon<Pi, Ri, E>(fn: (p: Pi, cont: Terminal<Ri, E>) => Cycle): Anon<Pi, Ri, E>;
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
    static Next<Pi, Pii, Piii, Ri, Rii, Riii, E>(lhs: Arrow<Pi, Pii, Ri, Rii, E>, rhs: Arrow<Ri, Rii, Piii, Riii, E>): Arrow<Pi, Pii, Piii, Riii, E>;
    static React<P, R, E>(self: ArrowletApi<P, R, E>, p: P, r: R): void;
}
export { useReducerWithThunk };

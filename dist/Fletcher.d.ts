import { Terminal } from "./core/Terminal";
import { Cycle } from "./core/Cycle";
import { Anon } from "./term/Anon";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
import { Arrow } from "./core/Arrow";
import { Dispatch } from "react";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P>(): Terminal<P>;
    static Arrow(): typeof Arrow;
    static Fun1R<Pi, Ri>(fn: (p: Pi) => Ri): ArrowletApi<Pi, Ri>;
    static Pure<Pi, Ri>(r: Ri): ArrowletApi<Pi, Ri>;
    static Anon<Pi, Ri>(fn: (p: Pi, cont: Terminal<Ri>) => Cycle): Anon<Pi, Ri>;
    static Resolve<P, R>(self: ArrowletApi<P, R>, input: P): Promise<Result<R>>;
    static Forward<P, R>(self: ArrowletApi<P, R>, input: P): Receiver<R>;
    static Event<R extends Event>(self: EventTarget): ArrowletApi<string, R>;
    static Then<Pi, Ri, Rii>(that: ArrowletApi<Ri, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    static Pair<Pi, Pii, Ri, Rii>(that: ArrowletApi<Pii, Rii>): Arrow<unknown, unknown, [unknown, Pii], [unknown, Rii]>;
    static FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => ArrowletApi<Pi, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    static First<Pi, Ri, Pii>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown]>;
    static Second<Pi, Ri, Pii>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown]>;
    static Pinch<Pi, Ri, Rii>(that: ArrowletApi<Pi, Rii>): Arrow<Pi, unknown, Pi, [unknown, Rii]>;
    static Joint<Pi, Ri, Rii>(that: ArrowletApi<Ri, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    static Next<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow<Pi, Pii, Ri, Rii>, rhs: Arrow<Ri, Rii, Piii, Riii>): Arrow<Pi, Pii, Piii, Riii>;
    static React<R>(dispatch: Dispatch<R>): ArrowletApi<R, void>;
    static Dispatch<R>(self: ArrowletApi<R, void>): (r: R) => void;
}

import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Unit } from "./term/Unit";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
import { EventArrowlet } from "./term/Event";
import { Arrow } from "./core/Arrow";
import { Dispatch } from "react";
import { Option as OptionArw } from "./term/Option";
import { OptionM } from "./term/OptionM";
import * as O from 'fp-ts/Option';
import { Arrowlet, Terminal, Cycle } from "./Core";
import { Then } from "./term/Then";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P>(): Terminal<P>;
    static Arrow(): typeof Arrow;
    static Fun1R<Pi, Ri>(fn: (p: Pi) => Ri): Arrowlet<Pi, Ri>;
    static Pure<Pi, Ri>(r: Ri): Arrowlet<Pi, Ri>;
    static Anon<Pi, Ri>(fn: (p: Pi, cont: Terminal<Ri>) => Cycle): Anon<Pi, Ri>;
    static Resolve<P, R>(self: Arrowlet<P, R>, input: P): Promise<Result<R>>;
    static Forward<P, R>(self: Arrowlet<P, R>, input: P): Receiver<R>;
    static Event<R extends Event>(self: string): Arrowlet<EventTarget, R>;
    static Then<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, Rii>;
    static Pair<Pi, Pii, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pii, Rii>): Arrowlet<[Pi, Pii], [Ri, Rii]>;
    static FlatMap<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, fn: (p: Ri) => Arrowlet<Pi, Rii>): Arrowlet<Pi, Rii>;
    static First<Pi, Ri, Pii>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Ri], [Pi, Pi]>;
    static Second<Pi, Ri, Pii>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Pi], [Pi, Ri]>;
    static Pinch<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pi, Rii>): Arrowlet<Pi, [Ri, Rii]>;
    static Joint<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, [Ri, Rii]>;
    static Bound<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<[Pi, Ri], Rii>): Arrowlet<Pi, Rii>;
    static Broach<Pi, Ri>(self: Arrowlet<Pi, Ri>): Arrowlet<Pi, [Pi, Ri]>;
    static Next<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow<Pi, Pii, Ri, Rii>, rhs: Arrow<Ri, Rii, Piii, Riii>): Arrow<Pi, Pii, Piii, Riii>;
    static React<R>(dispatch: Dispatch<R>): Arrowlet<R, void>;
    static Dispatch<R>(self: Arrowlet<R, void>): (r: R) => void;
    static Stage<P, R>(self: Arrowlet<P, R>, before: ((p: P) => void) | null, after: ((r: R) => void) | null): Arrowlet<P, R>;
    static Option<P, R>(self: Arrowlet<P, R>): Arrowlet<O.Option<P>, O.Option<R>>;
    static OptionM<P, R>(self: Arrowlet<P, O.Option<R>>): Arrowlet<O.Option<P>, O.Option<R>>;
    static OptionP<P>(fn: (p: P) => boolean): Arrowlet<P, O.Option<P>>;
    static Instances: {
        EventArrowlet: typeof EventArrowlet;
        Anon: typeof Anon;
        Fun: typeof Fun;
        Option: typeof OptionArw;
        OptionM: typeof OptionM;
        Then: typeof Then;
        Unit: typeof Unit;
    };
    static Core: {
        Terminal: typeof Terminal;
        Cycle: typeof Cycle;
    };
}

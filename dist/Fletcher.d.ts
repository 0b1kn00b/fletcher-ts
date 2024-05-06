import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Unit } from "./term/Unit";
import { Result } from "./core/Result";
import { Receiver } from "./core/Receiver";
import { EventArrowlet } from "./term/Event";
import { Arrow } from "./core/Arrow";
import { Dispatch } from "react";
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
    static Event<R extends Event>(self: EventTarget): Arrowlet<string, R>;
    static Then<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, Rii>;
    static Pair<Pi, Pii, Ri, Rii>(that: Arrowlet<Pii, Rii>): Arrow<unknown, unknown, [unknown, Pii], [unknown, Rii]>;
    static FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => Arrowlet<Pi, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    static First<Pi, Ri, Pii>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown]>;
    static Second<Pi, Ri, Pii>(): Arrow<unknown, unknown, [unknown, unknown], [unknown, unknown]>;
    static Pinch<Pi, Ri, Rii>(that: Arrowlet<Pi, Rii>): Arrow<Pi, unknown, Pi, [unknown, Rii]>;
    static Joint<Pi, Ri, Rii>(that: Arrowlet<Ri, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    static Next<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow<Pi, Pii, Ri, Rii>, rhs: Arrow<Ri, Rii, Piii, Riii>): Arrow<Pi, Pii, Piii, Riii>;
    static React<R>(dispatch: Dispatch<R>): Arrowlet<R, void>;
    static Dispatch<R>(self: Arrowlet<R, void>): (r: R) => void;
    static Option<P, R>(self: Arrowlet<P, R>): Arrowlet<O.Option<P>, O.Option<R>>;
    static OptionM<P, R>(self: Arrowlet<P, O.Option<R>>): Arrowlet<O.Option<P>, O.Option<R>>;
    static Instances: {
        EventArrowlet: typeof EventArrowlet;
        Anon: typeof Anon;
        Fun: typeof Fun;
        Option: new (text?: string, value?: string, defaultSelected?: boolean, selected?: boolean) => HTMLOptionElement;
        OptionM: typeof OptionM;
        Then: typeof Then;
        Unit: typeof Unit;
    };
    static Core: {
        Terminal: typeof Terminal;
        Cycle: typeof Cycle;
    };
}

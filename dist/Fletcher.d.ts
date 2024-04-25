import { Terminal } from "./core/Terminal";
import { Cycle } from "./core/Cycle";
import { Arrowlet } from "./core/Arrowlet";
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
export declare class Fletcher {
    static Terminal<P, E>(): Terminal<P, E>;
    static Fun1R<P, R, E>(fn: (p: P) => R): Arrowlet<P, R, E>;
    static Unit<P, E>(): Arrowlet<P, P, E>;
    static Pure<P, R, E>(r: R): Arrowlet<P, R, E>;
    static Anon<P, R, E>(fn: (p: P, cont: Terminal<R, E>) => Cycle): Arrowlet<P, R, E>;
    static Then<Pi, Pii, R, E>(lhs: Arrowlet<Pi, Pii, E>, rhs: Arrowlet<Pii, R, E>): Arrowlet<Pi, R, E>;
    static FlatMap<Pi, R, Ri, E>(self: Arrowlet<Pi, R, E>, fn: (r: R) => Arrowlet<Pi, Ri, E>): Arrowlet<Pi, Ri, E>;
    static Pair<Pi, Ri, Pii, Rii, E>(self: Arrowlet<Pi, Ri, E>, that: Arrowlet<Pii, Rii, E>): Arrowlet<[Pi, Pii], [Ri, Rii], E>;
    static Split<Pi, Ri, Rii, E>(self: Arrowlet<Pi, Ri, E>, that: Arrowlet<Pi, Rii, E>): Arrowlet<Pi, [Ri, Rii], E>;
    static First<Pi, Ri, E>(self: Arrowlet<Pi, Ri, E>): Arrowlet<[Pi, unknown], [Ri, unknown], E>;
    static Pinch<P, Ri, Rii, E>(self: Arrowlet<P, Ri, E>, that: Arrowlet<P, Rii, E>): Arrowlet<P, [Ri, Rii], E>;
    static Joint<Pi, Ri, Rii, E>(lhs: Arrowlet<Pi, Ri, E>, rhs: Arrowlet<Ri, Rii, E>): Arrowlet<Pi, [Ri, Rii], E>;
    static Bound<P, Ri, Rii, E>(self: Arrowlet<P, Ri, E>, that: Arrowlet<[P, Ri], Rii, E>): Arrowlet<P, Rii, E>;
    static Broach<Ri, Rii, E>(self: Arrowlet<Ri, Rii, E>): Arrowlet<Ri, [Ri, Rii], E>;
}

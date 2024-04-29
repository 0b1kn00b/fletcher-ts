import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";
import { Receiver } from "./Receiver";
interface ArrowletApi<P, R, E> {
    defer(p: P, cont: Terminal<R, E>): Cycle;
    toArrowlet(): Arrowlet<P, R, E>;
}
export declare class Arrowlet<P, R, E> implements ArrowletApi<P, R, E> {
    constructor();
    defer(p: P, cont: Terminal<R, E>): Cycle;
    toArrowlet(): Arrowlet<P, R, E>;
    forward(p: P): Receiver<R, E>;
    then<Ri>(that: Arrowlet<R, Ri, E>): Arrowlet<P, Ri, E>;
    pair<Pi, Ri>(that: Arrowlet<Pi, Ri, E>): Arrowlet<[P, Pi], [R, Ri], E>;
    split<Ri>(that: Arrowlet<P, Ri, E>): Arrowlet<P, [R, Ri], E>;
    flat_map<Ri>(fn: (r: R) => Arrowlet<P, Ri, E>): Arrowlet<P, Ri, E>;
    first<Pi, Ri, E>(self: Arrowlet<Pi, Ri, E>): Arrowlet<[Pi, unknown], [Ri, unknown], E>;
    pinch<Ri>(self: Arrowlet<P, R, E>, that: Arrowlet<P, Ri, E>): Arrowlet<P, [R, Ri], E>;
    joint<Ri>(rhs: Arrowlet<R, Ri, E>): Arrowlet<P, [R, Ri], E>;
    bound<Ri>(that: Arrowlet<[P, R], Ri, E>): Arrowlet<P, Ri, E>;
    broach<Ri>(self: Arrowlet<R, Ri, E>): Arrowlet<R, [R, Ri], E>;
}
export {};

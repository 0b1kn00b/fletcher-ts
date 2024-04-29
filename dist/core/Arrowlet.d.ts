import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";
import { Receiver } from "./Receiver";
import { ArrowletApi } from "./ArrowletApi";
import { Result } from "./Result";
export declare class Arrowlet<P, R, E> implements ArrowletApi<P, R, E> {
    constructor();
    forward(p: P): Receiver<R, E>;
    defer(p: P, cont: Terminal<R, E>): Cycle;
    then<Ri>(that: ArrowletApi<R, Ri, E>): Arrowlet<P, Ri, E>;
    pair<Pi, Ri>(that: ArrowletApi<Pi, Ri, E>): Arrowlet<[P, Pi], [R, Ri], E>;
    split<Ri>(that: ArrowletApi<P, Ri, E>): Arrowlet<P, [R, Ri], E>;
    flat_map<Ri>(fn: (r: R) => ArrowletApi<P, Ri, E>): Arrowlet<P, Ri, E>;
    first<Pi, Ri, E>(self: Arrowlet<Pi, Ri, E>): Arrowlet<[Pi, R], [Ri, R], E>;
    pinch<Ri>(self: Arrowlet<P, R, E>, that: Arrowlet<P, Ri, E>): Arrowlet<P, [R, Ri], E>;
    joint<Ri>(rhs: Arrowlet<R, Ri, E>): Arrowlet<P, [R, Ri], E>;
    bound<Ri>(that: Arrowlet<[P, R], Ri, E>): Arrowlet<P, Ri, E>;
    broach(): Arrowlet<P, [P, R], E>;
    resolve(input: P): Promise<Result<R, E>>;
    static Delegate<P, R, E>(self: ArrowletApi<P, R, E>): Arrowlet<P, R, E>;
}

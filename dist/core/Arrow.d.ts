import { Arrowlet } from "../Core";
export declare class Arrow<Pi, Ri, Pii, Rii> {
    private _apply;
    constructor(_apply: (self: Arrowlet<Pi, Ri>) => Arrowlet<Pii, Rii>);
    apply(self: Arrowlet<Pi, Ri>): Arrowlet<Pii, Rii>;
    /**
     * You liked arrows so much, we put arrows in your arrows.
     * @param that You
     * @returns
     */
    next<Piii, Riii>(that: Arrow<Pii, Rii, Piii, Riii>): Arrow<Pi, Ri, Piii, Riii>;
    static Make<Pi, Ri, Pii, Rii>(apply: (self: Arrowlet<Pi, Ri>) => Arrowlet<Pii, Rii>): Arrow<Pi, Ri, Pii, Rii>;
    static Unit<Pi, Ri>(): Arrow<Pi, Ri, Pi, Ri>;
    static Pure<Pi, Ri, Pii, Rii>(self: Arrowlet<Pii, Rii>): Arrow<Pi, Ri, Pii, Rii>;
    static Then<Pi, Ri, Rii>(that: Arrowlet<Ri, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    then<Riii>(that: Arrowlet<Rii, Riii>): Arrow<Pi, Ri, Pii, Riii>;
    static Pair<Pi, Pii, Ri, Rii>(that: Arrowlet<Pii, Rii>): Arrow<Pi, Ri, [Pi, Pii], [Ri, Rii]>;
    pair(that: Arrowlet<Pii, Rii>): Arrow<Pi, Ri, [Pii, Pii], [Rii, Rii]>;
    static Split<Pi, Ri, Rii>(that: Arrowlet<Pi, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    split<Riii>(that: Arrowlet<Pii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => Arrowlet<Pi, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    flat_map<Riii>(fn: (p: Rii) => Arrowlet<Pii, Riii>): Arrow<Pi, Ri, Pii, Riii>;
    static First<Pi, Ri, Pii>(): Arrow<Pi, Ri, [Pi, Pii], [Ri, Pii]>;
    first(): Arrow<Pi, Ri, [Pii, unknown], [Rii, unknown]>;
    static Second<Pi, Ri, Pii>(): Arrow<Pi, Ri, [Pii, Pi], [Pii, Ri]>;
    second(): Arrow<Pi, Ri, [unknown, Pii], [unknown, Rii]>;
    static Pinch<Pi, Ri, Rii>(that: Arrowlet<Pi, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    pinch<Riii>(that: Arrowlet<Pii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static Joint<Pi, Ri, Rii>(that: Arrowlet<Ri, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    joint<Riii>(that: Arrowlet<Rii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static Bound<Pi, Ri, Rii>(that: Arrowlet<[Pi, Ri], Rii>): Arrow<Pi, Ri, Pi, Rii>;
    bound<Riii>(that: Arrowlet<[Pii, Rii], Riii>): Arrow<Pi, Ri, Pii, Riii>;
    static Broach<Pi, Ri>(): Arrow<Pi, Ri, Pi, [Pi, Ri]>;
    broach(): Arrow<Pi, Ri, Pii, [Pii, Rii]>;
    resolve(p: Pii): Promise<Rii>;
    static Compose<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow<Ri, Rii, Piii, Riii>, rhs: Arrow<Pi, Pii, Ri, Rii>): Arrow<Pi, Pii, Piii, Riii>;
    compose<P, R>(before: Arrow<P, R, Pi, Ri>): Arrow<P, R, Pii, Rii>;
}

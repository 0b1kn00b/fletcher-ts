import { ArrowletApi } from "./ArrowletApi";
export declare class Arrow<Pi, Ri, Pii, Rii, E> {
    private _apply;
    constructor(_apply: (self: ArrowletApi<Pi, Ri, E>) => ArrowletApi<Pii, Rii, E>);
    apply(self: ArrowletApi<Pi, Ri, E>): ArrowletApi<Pii, Rii, E>;
    /**
     * You liked arrows so much, we put arrows in your arrows.
     * @param that You
     * @returns
     */
    next<Piii, Riii>(that: Arrow<Pii, Rii, Piii, Riii, E>): Arrow<Pi, Ri, Piii, Riii, E>;
    static Unit<Pi, Ri, E>(): Arrow<Pi, Ri, Pi, Ri, E>;
    static Pure<Pi, Ri, Pii, Rii, E>(self: ArrowletApi<Pii, Rii, E>): Arrow<Pi, Ri, Pii, Rii, E>;
    static Then<Pi, Ri, Rii, E>(that: ArrowletApi<Ri, Rii, E>): Arrow<Pi, Ri, Pi, Rii, E>;
    then<Riii>(that: ArrowletApi<Rii, Riii, E>): Arrow<Pi, Ri, Pii, Riii, E>;
    static Pair<Pi, Pii, Ri, Rii, E>(that: ArrowletApi<Pii, Rii, E>): Arrow<Pi, Ri, [Pi, Pii], [Ri, Rii], E>;
    pair(that: ArrowletApi<Pii, Rii, E>): Arrow<Pi, Ri, [Pii, Pii], [Rii, Rii], E>;
    static Split<Pi, Ri, Rii, E>(that: ArrowletApi<Pi, Rii, E>): Arrow<Pi, Ri, Pi, [Ri, Rii], E>;
    split<Riii>(that: ArrowletApi<Pii, Riii, E>): Arrow<Pi, Ri, Pii, [Rii, Riii], E>;
    static FlatMap<Pi, Ri, Rii, E>(fn: (p: Ri) => ArrowletApi<Pi, Rii, E>): Arrow<Pi, Ri, Pi, Rii, E>;
    flat_map<Riii>(fn: (p: Rii) => ArrowletApi<Pii, Riii, E>): Arrow<Pi, Ri, Pii, Riii, E>;
    static First<Pi, Ri, Pii, E>(): Arrow<Pi, Ri, [Pi, Pii], [Ri, Pii], E>;
    first(): Arrow<Pi, Ri, [Pii, unknown], [Rii, unknown], E>;
    static Second<Pi, Ri, Pii, E>(): Arrow<Pi, Ri, [Pii, Pi], [Pii, Ri], E>;
    second(): Arrow<Pi, Ri, [unknown, Pii], [unknown, Rii], E>;
    static Pinch<Pi, Ri, Rii, E>(that: ArrowletApi<Pi, Rii, E>): Arrow<Pi, Ri, Pi, [Ri, Rii], E>;
    pinch<Riii>(that: ArrowletApi<Pii, Riii, E>): Arrow<Pi, Ri, Pii, [Rii, Riii], E>;
    static Joint<Pi, Ri, Rii, E>(that: ArrowletApi<Ri, Rii, E>): Arrow<Pi, Ri, Pi, [Ri, Rii], E>;
    joint<Riii>(that: ArrowletApi<Rii, Riii, E>): Arrow<Pi, Ri, Pii, [Rii, Riii], E>;
    static Bound<Pi, Ri, Rii, E>(that: ArrowletApi<[Pi, Ri], Rii, E>): Arrow<Pi, Ri, Ri, Rii, E>;
    bound<Riii>(that: ArrowletApi<[Pii, Rii], Riii, E>): Arrow<Pi, Ri, Rii, Riii, E>;
    static Broach<Pi, Ri, E>(): Arrow<Pi, Ri, Ri, [Pi, Ri], unknown>;
    broach(): Arrow<Pi, Ri, Rii, [Pii, Rii], E>;
    resolve(): void;
}

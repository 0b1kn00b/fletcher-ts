import { ArrowletApi } from "./ArrowletApi";
export declare class Arrow<Pi, Ri, Pii, Rii> {
    private _apply;
    constructor(_apply: (self: ArrowletApi<Pi, Ri>) => ArrowletApi<Pii, Rii>);
    apply(self: ArrowletApi<Pi, Ri>): ArrowletApi<Pii, Rii>;
    /**
     * You liked arrows so much, we put arrows in your arrows.
     * @param that You
     * @returns
     */
    next<Piii, Riii>(that: Arrow<Pii, Rii, Piii, Riii>): Arrow<Pi, Ri, Piii, Riii>;
    static Make<Pi, Ri, Pii, Rii>(apply: (self: ArrowletApi<Pi, Ri>) => ArrowletApi<Pii, Rii>): Arrow<Pi, Ri, Pii, Rii>;
    static Unit<Pi, Ri>(): Arrow<Pi, Ri, Pi, Ri>;
    static Pure<Pi, Ri, Pii, Rii>(self: ArrowletApi<Pii, Rii>): Arrow<Pi, Ri, Pii, Rii>;
    static Then<Pi, Ri, Rii>(that: ArrowletApi<Ri, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    then<Riii>(that: ArrowletApi<Rii, Riii>): Arrow<Pi, Ri, Pii, Riii>;
    static Pair<Pi, Pii, Ri, Rii>(that: ArrowletApi<Pii, Rii>): Arrow<Pi, Ri, [Pi, Pii], [Ri, Rii]>;
    pair(that: ArrowletApi<Pii, Rii>): Arrow<Pi, Ri, [Pii, Pii], [Rii, Rii]>;
    static Split<Pi, Ri, Rii>(that: ArrowletApi<Pi, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    split<Riii>(that: ArrowletApi<Pii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => ArrowletApi<Pi, Rii>): Arrow<Pi, Ri, Pi, Rii>;
    flat_map<Riii>(fn: (p: Rii) => ArrowletApi<Pii, Riii>): Arrow<Pi, Ri, Pii, Riii>;
    static First<Pi, Ri, Pii>(): Arrow<Pi, Ri, [Pi, Pii], [Ri, Pii]>;
    first(): Arrow<Pi, Ri, [Pii, unknown], [Rii, unknown]>;
    static Second<Pi, Ri, Pii>(): Arrow<Pi, Ri, [Pii, Pi], [Pii, Ri]>;
    second(): Arrow<Pi, Ri, [unknown, Pii], [unknown, Rii]>;
    static Pinch<Pi, Ri, Rii>(that: ArrowletApi<Pi, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    pinch<Riii>(that: ArrowletApi<Pii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static Joint<Pi, Ri, Rii>(that: ArrowletApi<Ri, Rii>): Arrow<Pi, Ri, Pi, [Ri, Rii]>;
    joint<Riii>(that: ArrowletApi<Rii, Riii>): Arrow<Pi, Ri, Pii, [Rii, Riii]>;
    static Bound<Pi, Ri, Rii>(that: ArrowletApi<[Pi, Ri], Rii>): Arrow<Pi, Ri, Ri, Rii>;
    bound<Riii>(that: ArrowletApi<[Pii, Rii], Riii>): Arrow<Pi, Ri, Rii, Riii>;
    static Broach<Pi, Ri>(): Arrow<Pi, Ri, Ri, [Pi, Ri]>;
    broach(): Arrow<Pi, Ri, Rii, [Pii, Rii]>;
    resolve(p: Pii): Promise<import("./Result").Result<Rii>>;
    static Compose<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow<Ri, Rii, Piii, Riii>, rhs: Arrow<Pi, Pii, Ri, Rii>): Arrow<Pi, Pii, Piii, Riii>;
    compose<P, R>(before: Arrow<P, R, Pi, Ri>): Arrow<P, R, Pii, Rii>;
}

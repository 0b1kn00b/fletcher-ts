import { ArrowletApi } from "../core/ArrowletApi";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class Fun<P, R, E> implements ArrowletApi<P, R, E> {
    private _apply;
    constructor(_apply: (p: P) => R);
    defer(p: P, cont: Terminal<R, E>): Cycle;
}

import { Arrowlet, Cycle, Terminal } from "@fletcher-ts/core";
export declare class Fun<P, R, E> extends Arrowlet<P, R, E> {
    private _apply;
    constructor(_apply: (p: P) => R);
    defer(p: P, cont: Terminal<R, E>): Cycle;
}

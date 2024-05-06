import { Arrowlet, Cycle, Terminal } from "../Core";
export declare class Fun<P, R> implements Arrowlet<P, R> {
    private _apply;
    constructor(_apply: (p: P) => R);
    defer(p: P, cont: Terminal<R>): Cycle;
}

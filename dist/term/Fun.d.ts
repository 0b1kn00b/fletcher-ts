import { Arrowlet, Work, Junction } from "../Core";
export declare class Fun<P, R> implements Arrowlet<P, R> {
    private _apply;
    constructor(_apply: (p: P) => R);
    defer(p: P, cont: Junction<R>): Work;
}

import { Arrowlet } from "../Core";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class Fun<P, R> implements Arrowlet<P, R> {
    private _apply;
    constructor(_apply: (p: P) => R);
    defer(p: P, cont: Terminal<R>): Cycle;
}

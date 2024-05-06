import { Arrowlet, Cycle, Terminal } from "../Core";
export declare class Anon<Pi, R> implements Arrowlet<Pi, R> {
    private _defer;
    constructor(_defer: ((p: Pi, cont: Terminal<R>) => Cycle));
    defer(p: Pi, cont: Terminal<R>): Cycle;
}

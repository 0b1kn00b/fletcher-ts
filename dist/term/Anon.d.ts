import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class Anon<Pi, R, E> extends Arrowlet<Pi, R, E> {
    private _defer;
    constructor(_defer: ((p: Pi, cont: Terminal<R, E>) => Cycle));
    defer(p: Pi, cont: Terminal<R, E>): Cycle;
}

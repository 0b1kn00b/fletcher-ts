import { ArrowletApi } from "../core/ArrowletApi";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class Anon<Pi, R> implements ArrowletApi<Pi, R> {
    private _defer;
    constructor(_defer: ((p: Pi, cont: Terminal<R>) => Cycle));
    defer(p: Pi, cont: Terminal<R>): Cycle;
}

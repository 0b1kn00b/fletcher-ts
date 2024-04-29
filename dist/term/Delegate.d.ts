import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { ArrowletApi } from "../core/ArrowletApi";
export declare class Delegate<P, R, E> extends Arrowlet<P, R, E> {
    _delegate: ArrowletApi<P, R, E>;
    constructor(_delegate: ArrowletApi<P, R, E>);
    defer(p: P, cont: Terminal<R, E>): Cycle;
}

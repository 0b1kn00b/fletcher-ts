import { Arrowlet } from "src/core/Arrowlet";
import { Cycle } from "src/core/Cycle";
import { Terminal } from "src/core/Terminal";
import { ArrowletApi } from "src/core/ArrowletApi";
export declare class Delegate<P, R, E> extends Arrowlet<P, R, E> {
    _delegate: ArrowletApi<P, R, E>;
    constructor(_delegate: ArrowletApi<P, R, E>);
    defer(p: P, cont: Terminal<R, E>): Cycle;
}

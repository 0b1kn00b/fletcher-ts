import { ArrowletApi } from "../core/ArrowletApi";
import { Terminal } from "../core/Terminal";
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {ArrowletApi<Pi, R>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error typeq
 */
export declare class Then<Pi, Pii, R> implements ArrowletApi<Pi, R> {
    lhs: ArrowletApi<Pi, Pii>;
    rhs: ArrowletApi<Pii, R>;
    constructor(lhs: ArrowletApi<Pi, Pii>, rhs: ArrowletApi<Pii, R>);
    defer(p: Pi, cont: Terminal<R>): import("../core/Cycle").Cycle;
}

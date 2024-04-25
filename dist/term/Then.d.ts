import { Arrowlet, Terminal } from "@fletcher-ts/core";
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R, E>}
 * @implements {ArrowletApi<Pi, R, E>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error type
 */
export declare class Then<Pi, Pii, R, E> extends Arrowlet<Pi, R, E> {
    lhs: Arrowlet<Pi, Pii, E>;
    rhs: Arrowlet<Pii, R, E>;
    constructor(lhs: Arrowlet<Pi, Pii, E>, rhs: Arrowlet<Pii, R, E>);
    defer(p: Pi, cont: Terminal<R, E>): import("@fletcher-ts/core").Cycle;
}

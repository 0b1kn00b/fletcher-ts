"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Then = void 0;
const core_1 = require("@fletcher-ts/core");
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
class Then extends core_1.Arrowlet {
    constructor(lhs, rhs) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
    defer(p, cont) {
        var a = this.lhs.forward(p);
        return cont.receive(a.flat_fold(ok => this.rhs.forward(ok), no => core_1.Terminal.error(no)));
    }
}
exports.Then = Then;

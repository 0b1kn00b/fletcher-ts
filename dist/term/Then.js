"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Then = void 0;
const Terminal_1 = require("../core/Terminal");
const util_1 = require("src/util");
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {ArrowletApi<Pi, R, E>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error typeq
 */
class Then {
    constructor(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    defer(p, cont) {
        var a = (0, util_1.forward)(this.lhs, p);
        return cont.receive(a.flat_fold(ok => (0, util_1.forward)(this.rhs, ok), no => Terminal_1.Terminal.error(no)));
    }
}
exports.Then = Then;

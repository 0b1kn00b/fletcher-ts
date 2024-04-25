"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Then = void 0;
const Arrowlet_1 = require("src/core/Arrowlet");
const Terminal_1 = require("src/core/Terminal");
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R, E>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error typeq
 */
class Then extends Arrowlet_1.Arrowlet {
    constructor(lhs, rhs) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
    defer(p, cont) {
        var a = this.lhs.forward(p);
        return cont.receive(a.flat_fold(ok => this.rhs.forward(ok), no => Terminal_1.Terminal.error(no)));
    }
}
exports.Then = Then;

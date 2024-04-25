"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fun = void 0;
const core_1 = require("@fletcher-ts/core");
class Fun extends core_1.Arrowlet {
    constructor(_apply) {
        super();
        this._apply = _apply;
    }
    defer(p, cont) {
        return cont.receive(core_1.Terminal.value(this._apply(p)));
    }
}
exports.Fun = Fun;

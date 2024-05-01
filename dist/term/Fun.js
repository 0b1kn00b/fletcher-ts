"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fun = void 0;
const Terminal_1 = require("../core/Terminal");
class Fun {
    _apply;
    constructor(_apply) {
        this._apply = _apply;
    }
    defer(p, cont) {
        return cont.receive(Terminal_1.Terminal.value(this._apply(p)));
    }
}
exports.Fun = Fun;

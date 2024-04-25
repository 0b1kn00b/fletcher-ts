"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fun = void 0;
const Arrowlet_1 = require("../core/Arrowlet");
const Terminal_1 = require("../core/Terminal");
class Fun extends Arrowlet_1.Arrowlet {
    constructor(_apply) {
        super();
        this._apply = _apply;
    }
    defer(p, cont) {
        return cont.receive(Terminal_1.Terminal.value(this._apply(p)));
    }
}
exports.Fun = Fun;

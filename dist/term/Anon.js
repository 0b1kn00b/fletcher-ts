"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anon = void 0;
const Arrowlet_1 = require("../core/Arrowlet");
class Anon extends Arrowlet_1.Arrowlet {
    constructor(_defer) {
        super();
        this._defer = _defer;
    }
    defer(p, cont) {
        return this._defer(p, cont);
    }
}
exports.Anon = Anon;

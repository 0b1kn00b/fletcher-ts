"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anon = void 0;
class Anon {
    _defer;
    constructor(_defer) {
        this._defer = _defer;
    }
    defer(p, cont) {
        return this._defer(p, cont);
    }
}
exports.Anon = Anon;

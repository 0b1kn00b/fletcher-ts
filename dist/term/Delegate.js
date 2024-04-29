"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegate = void 0;
const Arrowlet_1 = require("src/core/Arrowlet");
class Delegate extends Arrowlet_1.Arrowlet {
    constructor(_delegate) {
        super();
        this._delegate = _delegate;
    }
    defer(p, cont) {
        return this._delegate.defer(p, cont);
    }
}
exports.Delegate = Delegate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apply = void 0;
/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
class Apply {
    _apply;
    constructor(_apply) { this._apply = _apply; }
    apply(a) { return this._apply(a); }
}
exports.Apply = Apply;

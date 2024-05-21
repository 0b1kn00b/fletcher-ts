/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
export class Apply {
    _apply;
    constructor(_apply) { this._apply = _apply; }
    apply(a) { return this._apply(a); }
}

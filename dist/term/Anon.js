export class Anon {
    _defer;
    constructor(_defer) {
        this._defer = _defer;
    }
    defer(p, cont) {
        return this._defer(p, cont);
    }
}

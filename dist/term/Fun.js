import { Junction } from "../Core";
export class Fun {
    _apply;
    constructor(_apply) {
        this._apply = _apply;
    }
    defer(p, cont) {
        return cont.receive(Junction.value(this._apply(p)));
    }
}

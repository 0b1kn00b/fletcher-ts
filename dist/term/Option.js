import * as O from 'fp-ts/Option';
import { Junction } from "../core/Junction";
import { Then } from "./Then";
import { Fun } from "./Fun";
export class Option {
    delegate;
    constructor(delegate) {
        this.delegate = delegate;
    }
    defer(p, cont) {
        let result = O.fold(() => cont.receive(Junction.value(O.none)), (p) => new Then(this.delegate, new Fun((r) => O.some(r))).defer(p, cont))(p);
        return result;
    }
}

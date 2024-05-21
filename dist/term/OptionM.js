import * as O from 'fp-ts/Option';
import { Junction } from "../core/Junction";
export class OptionM {
    delegate;
    constructor(delegate) {
        this.delegate = delegate;
    }
    defer(p, cont) {
        let result = O.fold(() => cont.receive(Junction.value(O.none)), (p) => this.delegate.defer(p, cont))(p);
        return result;
    }
}

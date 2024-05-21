import { Arrowlet } from "../Core";
import * as O from 'fp-ts/Option';
import { Work } from "../core/Work";
import { Junction } from "../core/Junction";
export declare class OptionM<P, R> implements Arrowlet<O.Option<P>, O.Option<R>> {
    delegate: Arrowlet<P, O.Option<R>>;
    constructor(delegate: Arrowlet<P, O.Option<R>>);
    defer(p: O.Option<P>, cont: Junction<O.Option<R>>): Work;
}

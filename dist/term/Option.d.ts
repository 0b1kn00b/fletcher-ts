import { Arrowlet } from "../Core";
import * as O from 'fp-ts/Option';
import { Work } from "../core/Work";
import { Junction } from "../core/Junction";
export declare class Option<P, R> implements Arrowlet<O.Option<P>, O.Option<R>> {
    delegate: Arrowlet<P, R>;
    constructor(delegate: Arrowlet<P, R>);
    defer(p: O.Option<P>, cont: Junction<O.Option<R>>): Work;
}

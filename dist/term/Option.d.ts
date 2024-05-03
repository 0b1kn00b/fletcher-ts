import { Arrowlet } from "../Core";
import * as O from 'fp-ts/Option';
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class Option<P, R> implements Arrowlet<O.Option<P>, O.Option<R>> {
    delegate: Arrowlet<P, R>;
    constructor(delegate: Arrowlet<P, R>);
    defer(p: O.Option<P>, cont: Terminal<O.Option<R>>): Cycle;
}

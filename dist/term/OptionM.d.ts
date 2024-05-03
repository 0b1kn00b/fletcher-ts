import { Arrowlet } from "../core/Arrowlet";
import * as O from 'fp-ts/Option';
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class OptionM<P, R> implements Arrowlet<O.Option<P>, O.Option<R>> {
    delegate: Arrowlet<P, O.Option<R>>;
    constructor(delegate: Arrowlet<P, O.Option<R>>);
    defer(p: O.Option<P>, cont: Terminal<O.Option<R>>): Cycle;
}

import { ArrowletApi } from "../core/ArrowletApi";
import * as O from 'fp-ts/Option';
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
export declare class OptionM<P, R> implements ArrowletApi<O.Option<P>, O.Option<R>> {
    delegate: ArrowletApi<P, O.Option<R>>;
    constructor(delegate: ArrowletApi<P, O.Option<R>>);
    defer(p: O.Option<P>, cont: Terminal<O.Option<R>>): Cycle;
}

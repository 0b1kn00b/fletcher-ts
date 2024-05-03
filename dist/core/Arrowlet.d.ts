import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";
export interface Arrowlet<P, R> {
    defer(p: P, cont: Terminal<R>): Cycle;
}

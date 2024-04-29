import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";
export interface ArrowletApi<P, R, E> {
    defer(p: P, cont: Terminal<R, E>): Cycle;
}

import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";

export interface ArrowletApi<P, R> {
  defer(p: P, cont: Terminal<R>): Cycle;
  //toArrowlet(): Arrowlet<P, R, E>;
}
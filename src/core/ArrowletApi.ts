import { Terminal } from "./Terminal";
import { Cycle } from "./Cycle";
import { Receiver } from "./Receiver";
export interface ArrowletApi<P, R, E> {
  defer(p: P, cont: Terminal<R, E>): Cycle;
  //toArrowlet(): Arrowlet<P, R, E>;
}
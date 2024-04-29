import { ArrowletApi } from "../core/ArrowletApi";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";


export class Fun<P,R,E> implements ArrowletApi<P,R,E>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){

    this._apply = _apply;
  }
  defer(p: P, cont: Terminal<R, E>): Cycle {
    return cont.receive(Terminal.value(this._apply(p)));
  }
}
import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";


export class Fun<P,R> implements Arrowlet<P,R>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){
    this._apply = _apply;
  }
  defer(p: P, cont: Terminal<R>): Cycle {
    return cont.receive(Terminal.value(this._apply(p)));
  }
}
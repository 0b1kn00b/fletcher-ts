import {Arrowlet, Cycle, Terminal} from "@fletcher-ts/core";

export class Fun<P,R,E> extends Arrowlet<P,R,E>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){
    super();
    this._apply = _apply;
  }
  defer(p: P, cont: Terminal<R, E>): Cycle {
    return receive(cont,Terminal.value(this._apply(p)));
  }
}
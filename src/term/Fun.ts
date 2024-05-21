import { Arrowlet, Work, Junction } from "../Core";

export class Fun<P,R> implements Arrowlet<P,R>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){
    this._apply = _apply;
  }
  defer(p: P, cont: Junction<R>): Work {
    return cont.receive(Junction.value(this._apply(p)));
  }
}
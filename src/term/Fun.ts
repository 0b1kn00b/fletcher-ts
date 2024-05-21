import { type Arrowlet, Work, Junction } from "src/Core";

export class Fun<P,R> implements Arrowlet<P,R>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){
    this._apply = _apply;
  }
  defer(p: P, cont: Junction<R>): Work.Work {
    return cont.receive(Junction.issue(this._apply(p)));
  }
}
import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { ArrowletApi } from "../core/ArrowletApi";

export class Delegate<P,R,E> extends Arrowlet<P,R,E>{
  _delegate : ArrowletApi<P,R,E>;
  constructor(_delegate : ArrowletApi<P,R,E>){
    super();
    this._delegate = _delegate;
  }
  defer(p:P,cont:Terminal<R,E>):Cycle{
    return this._delegate.defer(p,cont);
  }
}
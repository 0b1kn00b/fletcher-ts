import { Arrowlet } from "src/core/Arrowlet";
import { Cycle } from "src/core/Cycle";
import { Terminal } from "src/core/Terminal";
import { ArrowletApi } from "src/core/ArrowletApi";

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
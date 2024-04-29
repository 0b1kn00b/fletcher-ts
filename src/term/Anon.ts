import { ArrowletApi } from "../core/ArrowletApi";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";

export class Anon<Pi,R,E> implements ArrowletApi<Pi,R,E>{
  private _defer :   ( (p:Pi,cont:Terminal<R,E>) => Cycle);
  constructor(_defer:( (p:Pi,cont:Terminal<R,E>) => Cycle)){
    this._defer = _defer;
  }
  defer(p:Pi,cont:Terminal<R,E>):Cycle{
    return this._defer(p,cont);
  }
}



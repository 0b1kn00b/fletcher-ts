import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";

export class Anon<Pi,R> implements Arrowlet<Pi,R>{
  private _defer :   ( (p:Pi,cont:Terminal<R>) => Cycle);
  constructor(_defer:( (p:Pi,cont:Terminal<R>) => Cycle)){
    this._defer = _defer;
  }
  defer(p:Pi,cont:Terminal<R>):Cycle{
    return this._defer(p,cont);
  }
}



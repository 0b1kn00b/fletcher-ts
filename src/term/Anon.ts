import { Arrowlet } from "../core/Arrowlet";
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";

export class Anon<Pi,R,E> extends Arrowlet<Pi,R,E>{
  private _defer :   ( (p:Pi,cont:Terminal<R,E>) => Cycle);
  constructor(_defer:( (p:Pi,cont:Terminal<R,E>) => Cycle)){
    super();
    this._defer = _defer;
  }
  defer(p:Pi,cont:Terminal<R,E>):Cycle{
    return this._defer(p,cont);
  }
}


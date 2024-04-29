import { Arrowlet } from "src/core/Arrowlet";
import { Cycle } from "src/core/Cycle";
import { Terminal } from "src/core/Terminal";

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


import { Arrowlet, Cycle, Terminal } from "../Core";

export class Anon<Pi,R> implements Arrowlet<Pi,R>{
  private _defer :   ( (p:Pi,cont:Terminal<R>) => Cycle);
  constructor(_defer:( (p:Pi,cont:Terminal<R>) => Cycle)){
    this._defer = _defer;
  }
  defer(p:Pi,cont:Terminal<R>):Cycle{
    return this._defer(p,cont);
  }
}



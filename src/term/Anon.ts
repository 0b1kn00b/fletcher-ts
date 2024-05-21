import { Arrowlet, Work, Junction } from "../Core";

export class Anon<Pi,R> implements Arrowlet<Pi,R>{
  private _defer :   ( (p:Pi,cont:Junction<R>) => Work);
  constructor(_defer:( (p:Pi,cont:Junction<R>) => Work)){
    this._defer = _defer;
  }
  defer(p:Pi,cont:Junction<R>):Work{
    return this._defer(p,cont);
  }
}



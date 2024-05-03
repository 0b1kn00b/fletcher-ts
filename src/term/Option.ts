import { Arrowlet } from "../Core";

import * as O from 'fp-ts/Option';
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { Then } from "./Then";
import { Fun } from "./Fun";


export class Option<P,R> implements Arrowlet<O.Option<P>,O.Option<R>>{
  delegate : Arrowlet<P,R>;
  constructor(delegate : Arrowlet<P,R>){
    this.delegate = delegate;
  }
  defer(p: O.Option<P>, cont: Terminal<O.Option<R>>): Cycle {
    let result = O.fold(
      ()    => cont.receive(Terminal.value(O.none)),
      (p:P) => new Then(this.delegate,new Fun((r:R) => O.some(r))).defer(p,cont) 
    )(p);
    return result;
  }
}
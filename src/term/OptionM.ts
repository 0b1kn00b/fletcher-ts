import { Arrowlet } from "../core/Arrowlet";

import * as O from 'fp-ts/Option';
import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { Then } from "./Then";
import { Fun } from "./Fun";


export class OptionM<P,R> implements Arrowlet<O.Option<P>,O.Option<R>>{
  delegate : Arrowlet<P,O.Option<R>>;
  constructor(delegate : Arrowlet<P,O.Option<R>>){
    this.delegate = delegate;
  }
  defer(p: O.Option<P>, cont: Terminal<O.Option<R>>): Cycle {
    let result = O.fold(
      ()    => cont.receive(Terminal.value(O.none)),
      (p:P) => this.delegate.defer(p,cont) 
    )(p);
    return result;
  }
}
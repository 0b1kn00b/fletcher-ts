import { Arrowlet } from "../Core";

import * as O from 'fp-ts/Option';
import { Work } from "../core/Work";
import { Junction } from "../core/Junction";
import { Then } from "./Then";
import { Fun } from "./Fun";


export class OptionM<P,R> implements Arrowlet<O.Option<P>,O.Option<R>>{
  delegate : Arrowlet<P,O.Option<R>>;
  constructor(delegate : Arrowlet<P,O.Option<R>>){
    this.delegate = delegate;
  }
  defer(p: O.Option<P>, cont: Junction<O.Option<R>>): Work {
    let result = O.fold(
      ()    => cont.receive(Junction.value(O.none)),
      (p:P) => this.delegate.defer(p,cont) 
    )(p);
    return result;
  }
}
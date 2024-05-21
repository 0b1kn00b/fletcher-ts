import { type Arrowlet, Work, Junction } from "src/Core";
import { Fun, Then } from "src/Term";

import * as O from 'fp-ts/Option';

export class Option<P,R> implements Arrowlet<O.Option<P>,O.Option<R>>{
  delegate : Arrowlet<P,R>;
  constructor(delegate : Arrowlet<P,R>){
    this.delegate = delegate;
  }
  defer(p: O.Option<P>, cont: Junction<O.Option<R>>): Work.Work {
    let result = O.fold(
      ()    => cont.receive(Junction.issue(O.none)),
      (p:P) => new Then(this.delegate,new Fun((r:R) => O.some(r))).defer(p,cont) 
    )(p);
    return result;
  }
}
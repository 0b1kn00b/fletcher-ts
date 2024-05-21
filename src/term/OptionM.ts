import * as O from 'fp-ts/Option';

import { type Arrowlet, Work, Junction } from "src/Core";


import { Then, Fun } from "src/Term";


export class OptionM<P,R> implements Arrowlet<O.Option<P>,O.Option<R>>{
  delegate : Arrowlet<P,O.Option<R>>;
  constructor(delegate : Arrowlet<P,O.Option<R>>){
    this.delegate = delegate;
  }
  defer(p: O.Option<P>, cont: Junction<O.Option<R>>): Work.Work {
    let result = O.fold(
      ()    => cont.receive(Junction.issue(O.none)),
      (p:P) => this.delegate.defer(p,cont) 
    )(p);
    return result;
  }
}
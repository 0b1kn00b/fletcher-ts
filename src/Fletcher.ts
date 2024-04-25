import {Deferred} from "ts-deferred";


/** Returns Cycle from Continuation */

/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
type TerminalApi<R, E> = SettlerApi<TerminalInput<R, E>>;

export class Fletcher{
  static Terminal<P,E>(){
    return new Terminal(
      (a:ApplyCls<TerminalInput<P,E>,Cycle>):Cycle => {
        return a.apply(new Deferred());
      }
    )
  }
  static Fun1R<P,R,E>(fn:(p:P)=>R):Arrowlet<P,R,E>{
    return new ArrowletFn(fn);
  }
  static Then<Pi,Pii,R,E>(lhs:Arrowlet<Pi,Pii,E>,rhs:Arrowlet<Pii,R,E>){
    return new Then(lhs,rhs);
  }
}


function receive<P,E>(self:Terminal<P,E>,receiver:ReceiverCls<P,E>):Cycle{
  return receiver.apply(
    new ApplyCls(
      (a:ReceiverInput<P,E>):Cycle => {
        return self.apply(
          new ApplyCls(
            (b:TerminalInput<P,E>):Cycle => {
              a.then(
                (v) => {
                  b.resolve(v);
                }
              );
              return new Cycle(null);
            }
          )
        );
      }
    )
  )
}



// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
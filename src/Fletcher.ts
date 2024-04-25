import {Deferred} from "ts-deferred";
import { Terminal, TerminalInput, Cycle, Apply, Arrowlet } from "./core";
import { Fun, Then } from "./term";
/** Returns Cycle from Continuation */

/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/

export class Fletcher{
  static Terminal<P,E>(){
    return new Terminal(
      (a:Apply<TerminalInput<P,E>,Cycle>):Cycle => {
        return a.apply(new Deferred());
      }
    )
  }
  static Fun1R<P,R,E>(fn:(p:P)=>R):Arrowlet<P,R,E>{
    return new Fun(fn);
  }
  static Then<Pi,Pii,R,E>(lhs:Arrowlet<Pi,Pii,E>,rhs:Arrowlet<Pii,R,E>){
    return new Then(lhs,rhs);
  }
}






// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
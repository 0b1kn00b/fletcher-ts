import {Deferred} from "ts-deferred";
import { Terminal, TerminalInput } from "./core/Terminal";
import { Apply } from "./core/Apply";
import { Cycle } from "./core/Cycle";
import { Fun } from "./term/Fun";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { forward, resolve } from "./util";
import { Receiver } from "./core/Receiver";

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
  static Fun1R<P,R,E>(fn:(p:P)=>R):ArrowletApi<P,R,E>{
    return new Fun(fn);
  }
  static Unit<P,E>():ArrowletApi<P,P,E>{
    return new Fun((x) => x);
  }
  static Pure<P,R,E>(r:R):ArrowletApi<P,R,E>{
    return new Fun((_:P) => r);
  }
  static Resolve<P,R,E>(self:ArrowletApi<P,R,E>,input:P):Promise<Result<R,E>>{
    return resolve(self,input);
  }
  static Forward<P,R,E>(self:ArrowletApi<P,R,E>,input:P):Receiver<R,E>{
    return forward(self,input);
  }
}



// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
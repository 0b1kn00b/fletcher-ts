import {Deferred} from "ts-deferred";
import { Terminal, TerminalInput } from "./core/Terminal";
import { Apply } from "./core/Apply";
import { Cycle } from "./core/Cycle";
import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Then } from "./term/Then";
import { EventArrowlet } from "./term/Event";
import { Receiver, ReceiverSink } from "./core/Receiver";
import { ArrowletApi } from "./core/ArrowletApi";
import { Arrowlet } from "./core/Arrowlet";
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
    return Arrowlet.Delegate(new Fun(fn));
  }
  static Unit<P,E>():ArrowletApi<P,P,E>{
    return new Fun((x) => x);
  }
  static Pure<P,R,E>(r:R):ArrowletApi<P,R,E>{
    return new Fun((_:P) => r);
  }
  static Anon<P,R,E>(fn:(p:P,cont:Terminal<R,E>) => Cycle):ArrowletApi<P,R,E>{
    return new Anon(fn);

  }
  static Then<Pi,Pii,R,E>(lhs:ArrowletApi<Pi,Pii,E>,rhs:ArrowletApi<Pii,R,E>):ArrowletApi<Pi,R,E>{
    return new Then(lhs,rhs);
  }
  static FlatMap<Pi,R,Ri,E>(self:ArrowletApi<Pi,R,E>,fn:(r:R) => ArrowletApi<Pi,Ri,E>){
    return Fletcher.Anon(
      (p:Pi,cont:Terminal<Ri,E>) => {
        return cont.receive(Fletcher.forward(self,p).flat_fold(
          ok => Fletcher.forward(fn(ok),p),
          no => Terminal.error(no)
        ));
      }
    );
  }
  static Pair<Pi,Ri,Pii,Rii,E>(self:ArrowletApi<Pi,Ri,E>,that:ArrowletApi<Pii,Rii,E>){
    return Fletcher.Anon(
      (p:[Pi,Pii],cont:Terminal<[Ri,Rii],E>) => {
        let [l, r] = p;
        let lhs = Fletcher.forward(self,l);
        let rhs = Fletcher.forward(that,r);
        return cont.receive(lhs.zip(rhs)); 
      }
    );
  } 
  static Split<Pi,Ri,Rii,E>(self:ArrowletApi<Pi,Ri,E>,that:ArrowletApi<Pi,Rii,E>):ArrowletApi<Pi,[Ri,Rii],E>{
    return Fletcher.Anon(
      (p:Pi,cont:Terminal<[Ri,Rii],E>) => {
        return Fletcher.Pair(self,that).defer([p,p],cont);
      } 
    );
  }
  static First<Pi,Ri,E>(self:ArrowletApi<Pi,Ri,E>){
    return Fletcher.Pair(self,Fletcher.Unit());
  }
  static Pinch<P,Ri,Rii,E>(self:ArrowletApi<P,Ri,E>,that:ArrowletApi<P,Rii,E>):ArrowletApi<P,[Ri,Rii],E>{
    return Fletcher.Anon((p:P,cont:Terminal<[Ri,Rii],E>) => cont.receive(
      Fletcher.forward(self,p).zip(Fletcher.forward(that,p))
    ));
  }
  static Joint<Pi,Ri,Rii,E>(lhs:ArrowletApi<Pi,Ri,E>,rhs:ArrowletApi<Ri,Rii,E>):ArrowletApi<Pi,[Ri,Rii],E>{
    let rhs_u : ArrowletApi<Ri,Ri,E>        = Fletcher.Unit();
    let rhs_a : ArrowletApi<Ri,[Ri,Rii],E>  = Fletcher.Split(rhs_u,rhs);
    return Fletcher.Then(lhs,rhs_a);
  }
  static Bound<P,Ri,Rii,E>(self:ArrowletApi<P,Ri,E>,that:ArrowletApi<[P,Ri],Rii,E>):ArrowletApi<P,Rii,E>{
    let u : ArrowletApi<P,P,E> = Fletcher.Unit();
    return Fletcher.Then(Fletcher.Joint(u,self),that);
  }
  static Broach<Ri,Rii,E>(self:ArrowletApi<Ri,Rii,E>):ArrowletApi<Ri,[Ri,Rii],E>{
    return Fletcher.Bound(self,Fletcher.Fun1R(x => x));
  }
  static Event<R extends Event,E>(self:EventTarget):ArrowletApi<string,R,E>{
    return new EventArrowlet(self);
  }
  static forward<P,R,E>(self:ArrowletApi<P,R,E>, p: P) {
    return new Receiver(
      (k:ReceiverSink<R,E>): Cycle => {
        let deferred : TerminalInput<R,E> = new Deferred();
        let fst      = self.defer(
          p,
          new Terminal(
            (t_sink:Apply<TerminalInput<R,E>,Cycle>):Cycle => {
              let result = t_sink.apply(deferred);
              return result;
            }
          )
        );
        let snd       = k.apply(deferred.promise);
        return Cycle.Seq(fst,snd);
      }
    );
  }
}






// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
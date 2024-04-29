import {Deferred} from "ts-deferred";
import { Terminal, TerminalInput } from "./core/Terminal";
import { Apply } from "./core/Apply";
import { Cycle } from "./core/Cycle";
import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { ArrowletApi } from "./core/ArrowletApi";
import { Result } from "./core/Result";
import { forward, resolve } from "./util";
import { Receiver } from "./core/Receiver";
import { EventArrowlet } from "./term/Event";
import { Arrow } from "./core/Arrow";

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
  static Arrow(){
    return Arrow;
  }
  static Fun1R<Pi,Ri,E>(fn:(p:Pi)=>Ri):ArrowletApi<Pi,Ri,E>{
    return new Fun(fn);
  }
  static Pure<Pi,Ri,E>(r:Ri):ArrowletApi<Pi,Ri,E>{
    return Fletcher.Fun1R((_:Pi) =>r);
  }
  static Anon<Pi,Ri,E>(fn:(p:Pi,cont:Terminal<Ri,E>)=>Cycle){
    return new Anon(fn)
  }
  static Resolve<P,R,E>(self:ArrowletApi<P,R,E>,input:P):Promise<Result<R,E>>{
    return resolve(self,input);
  }
  static Forward<P,R,E>(self:ArrowletApi<P,R,E>,input:P):Receiver<R,E>{
    return forward(self,input);
  }
  static Event<R extends Event,E>(self:EventTarget):ArrowletApi<string,R,E>{
    return new EventArrowlet(self)
  }

  static Then<Pi,Ri,Rii,E>(that:ArrowletApi<Ri,Rii,E>):Arrow<Pi,Ri,Pi,Rii,E>{
    return Fletcher.Arrow().Then(that);
  }
  static Pair<Pi,Pii,Ri,Rii,E>(that:ArrowletApi<Pii,Rii,E>){
    return Fletcher.Arrow().Pair(that);
  }
  static FlatMap<Pi,Ri,Rii,E>(fn:(p:Ri)=>ArrowletApi<Pi,Rii,E>){
    return Fletcher.Arrow().FlatMap(fn);
  }
  static First<Pi,Ri,Pii,E>(){
    return Fletcher.Arrow().First();
  }
  static Second<Pi,Ri,Pii,E>(){
    return Fletcher.Arrow().Second();
  }
  static Pinch<Pi,Ri,Rii,E>(that:ArrowletApi<Pi,Rii,E>){
    return Fletcher.Arrow().Pinch(that);
  }
  static Joint<Pi,Ri,Rii,E>(that:ArrowletApi<Ri,Rii,E>):Arrow<Pi,Ri,Pi,[Ri,Rii],E>{
    return Fletcher.Arrow().Joint(that);
  }
}


// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
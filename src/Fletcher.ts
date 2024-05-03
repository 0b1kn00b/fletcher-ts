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
import { react, useReducerWithThunk } from "./react_arw"
import { ReactAsyncAction } from "./react_arw/ReactAsyncAction";
import { Dispatch } from "react";
import { Option as OptionArw } from "./term/Option";
import { OptionM } from "./term/OptionM";
import * as O from 'fp-ts/Option';
/** Returns Cycle from Continuation */

/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/

export class Fletcher{
  static Terminal<P>(){
    return new Terminal(
      (a:Apply<TerminalInput<P>,Cycle>):Cycle => {
        return a.apply(new Deferred());
      }
    )
  }
  static Arrow(){
    return Arrow;
  }
  static Fun1R<Pi,Ri>(fn:(p:Pi)=>Ri):ArrowletApi<Pi,Ri>{
    return new Fun(fn);
  }
  static Pure<Pi,Ri>(r:Ri):ArrowletApi<Pi,Ri>{
    return Fletcher.Fun1R((_:Pi) =>r);
  }
  static Anon<Pi,Ri>(fn:(p:Pi,cont:Terminal<Ri>)=>Cycle){
    return new Anon(fn)
  }
  static Resolve<P,R>(self:ArrowletApi<P,R>,input:P):Promise<Result<R>>{
    return resolve(self,input);
  }
  static Forward<P,R>(self:ArrowletApi<P,R>,input:P):Receiver<R>{
    return forward(self,input);
  }
  static Event<R extends Event>(self:EventTarget):ArrowletApi<string,R>{
    return new EventArrowlet(self)
  }

  static Then<Pi,Ri,Rii>(that:ArrowletApi<Ri,Rii>):Arrow<Pi,Ri,Pi,Rii>{
    return Fletcher.Arrow().Then(that);
  }
  static Pair<Pi,Pii,Ri,Rii>(that:ArrowletApi<Pii,Rii>){
    return Fletcher.Arrow().Pair(that);
  }
  static FlatMap<Pi,Ri,Rii>(fn:(p:Ri)=>ArrowletApi<Pi,Rii>){
    return Fletcher.Arrow().FlatMap(fn);
  }
  static First<Pi,Ri,Pii>(){
    return Fletcher.Arrow().First();
  }
  static Second<Pi,Ri,Pii>(){
    return Fletcher.Arrow().Second();
  }
  static Pinch<Pi,Ri,Rii>(that:ArrowletApi<Pi,Rii>){
    return Fletcher.Arrow().Pinch(that);
  }
  static Joint<Pi,Ri,Rii>(that:ArrowletApi<Ri,Rii>):Arrow<Pi,Ri,Pi,[Ri,Rii]>{
    return Fletcher.Arrow().Joint(that);
  }
  static Next<Pi,Pii,Piii,Ri,Rii,Riii>(lhs:Arrow<Pi,Pii,Ri,Rii>,rhs:Arrow<Ri,Rii,Piii,Riii>){
    return lhs.next(rhs);
  }
  static React<R>(dispatch:Dispatch<R>):ArrowletApi<R,void>{  
    return react(useReducerWithThunk(dispatch));
  }
  static Dispatch<R>(self:ArrowletApi<R,void>):(r:R) => void{
    return (r:R) =>{
      self.defer(r,Fletcher.Terminal()).submit();
    } 
  }
  static Option<P,R>(self:ArrowletApi<P,R>):ArrowletApi<O.Option<P>,O.Option<R>>{
    return new OptionArw(self);
  }
  static OptionM<P,R>(self:ArrowletApi<P,O.Option<R>>):ArrowletApi<O.Option<P>,O.Option<R>>{
    return new OptionM(self);
  }
}
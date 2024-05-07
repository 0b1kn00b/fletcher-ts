import {Deferred} from "ts-deferred";
import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Unit } from "./term/Unit";
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
import { Arrowlet, Terminal, Cycle, TerminalInput, Apply } from "./Core";
import * as E from 'fp-ts/Either';

import { Then } from "./term/Then";
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
  static Unit<P>():Arrowlet<P,P>{
    return new Unit();
  }
  static Arrow(){
    return Arrow;
  }
  static Fun1R<Pi,Ri>(fn:(p:Pi)=>Ri):Arrowlet<Pi,Ri>{
    return new Fun(fn);
  }
  static Pure<Pi,Ri>(r:Ri):Arrowlet<Pi,Ri>{
    return Fletcher.Fun1R((_:Pi) =>r);
  }
  static Anon<Pi,Ri>(fn:(p:Pi,cont:Terminal<Ri>)=>Cycle){
    return new Anon(fn)
  }
  static Resolve<P,R>(self:Arrowlet<P,R>,input:P):Promise<Result<R>>{
    return resolve(self,input);
  }
  static Forward<P,R>(self:Arrowlet<P,R>,input:P):Receiver<R>{
    return forward(self,input);
  }
  static Event<R extends Event>(self:string):Arrowlet<EventTarget,R>{
    return new EventArrowlet(self)
  }

  static Then<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,Rii>{
    return new Then(self,that);
  }
  static Pair<Pi,Pii,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pii,Rii>):Arrowlet<[Pi,Pii],[Ri,Rii]>{
    return Fletcher.Arrow().Pair(that).apply(self);
  }
  static FlatMap<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,fn:(p:Ri)=>Arrowlet<Pi,Rii>){
    return Fletcher.Arrow().FlatMap(fn).apply(self);
  }
  static First<Pi,Ri,Pii>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Ri],[Pi,Pi]>{
    return Fletcher.Arrow().First().apply(self);
  }
  static Second<Pi,Ri,Pii>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pi],[Pi,Ri]>{
    return Fletcher.Arrow().Second().apply(self);
  }
  static Pinch<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pi,Rii>):Arrowlet<Pi,[Ri,Rii]>{
    return Fletcher.Arrow().Pinch(that).apply(self);
  }
  static Joint<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,[Ri,Rii]>{
    return Fletcher.Arrow().Joint(that).apply(self);
  }
  static Bound<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<[Pi,Ri],Rii>):Arrowlet<Pi,Rii>{
    return Fletcher.Arrow().Bound(that).apply(self);
  }
  static Broach<Pi,Ri>(self:Arrowlet<Pi,Ri>):Arrowlet<Pi,[Pi,Ri]>{
    return Fletcher.Arrow().Broach().apply(self);
  }
  static Next<Pi,Pii,Piii,Ri,Rii,Riii>(lhs:Arrow<Pi,Pii,Ri,Rii>,rhs:Arrow<Ri,Rii,Piii,Riii>){
    return lhs.next(rhs);
  }
  static React<R>(dispatch:Dispatch<R>):Arrowlet<R,void>{  
    return react(useReducerWithThunk(dispatch));
  }
  static Dispatch<R>(self:Arrowlet<R,void>):(r:R) => void{
    return (r:R) =>{
      self.defer(r,Fletcher.Terminal()).submit();
    } 
  }
  static Stage<P,R>(self:Arrowlet<P,R>,before:((p:P)=>void) | null, after:((r:R) => void) | null):Arrowlet<P,R>{
    return Fletcher.Anon(
      (p:P,cont:Terminal<R>) => {
        if(before){
          before(p)
        }
        return Fletcher.Then(self,Fletcher.Fun1R(
          (r:R) => {
            if(after){
              after(r);
            }
            return r;
          }
        )).defer(p,cont);
      }
    );
  }
  static Option<P,R>(self:Arrowlet<P,R>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionArw(self);
  }
  static OptionM<P,R>(self:Arrowlet<P,O.Option<R>>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionM(self);
  }
  static OptionP<P>(fn:(p:P)=>boolean):Arrowlet<P,O.Option<P>>{
    return Fletcher.Fun1R(
      (p:P) => {
        if(fn(p)){
          return O.some(p);
        }else{
          return O.none;
        }
      }
    );
  }
  static Instances = {
    EventArrowlet : EventArrowlet,
    Anon          : Anon,
    Fun           : Fun,
    Option        : OptionArw,
    OptionM       : OptionM,
    Then          : Then,
    Unit          : Unit
  }
  static Core = {
    Terminal  : Terminal,
    Cycle     : Cycle 
  }
}
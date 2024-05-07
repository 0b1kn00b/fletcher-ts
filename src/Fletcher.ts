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
  
  /**
   * Arrow that passed the input p to the output
   *
   * @static
   * @typeParam P
   * @return {*}  {Arrowlet<P,P>}
   * @memberof Fletcher
   */
  static Unit<P>():Arrowlet<P,P>{
    return new Unit();
  }
  static Arrow(){
    return Arrow;
  }
  /**
   * Arrow of function `fn`
   * @static
   * @typeParam Pi 
   * @typeParam Ri
   * @param {(p:Pi)=>Ri} fn
   * @return {*}  {Arrowlet<Pi,Ri>}
   * @memberof Fletcher
   */
  static Fun1R<Pi,Ri>(fn:(p:Pi)=>Ri):Arrowlet<Pi,Ri>{
    return new Fun(fn);
  }
  /**
   * Arrow that produces result `r`, no matter the input
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @param {Ri} r
   * @return {*}  {Arrowlet<Pi,Ri>}
   * @memberof Fletcher
   */
  static Pure<Pi,Ri>(r:Ri):Arrowlet<Pi,Ri>{
    return Fletcher.Fun1R((_:Pi) =>r);
  }
  /**
   * Arrow instance of lambda
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @param {(p:Pi,cont:Terminal<Ri>)=>Cycle} fn
   * @return {*} 
   * @memberof Fletcher
   */
  static Anon<Pi,Ri>(fn:(p:Pi,cont:Terminal<Ri>)=>Cycle):Arrowlet<Pi,Ri>{
    return new Anon(fn)
  }
  /**
   * Runs Arrow and produces Promise result
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @param {P} input
   * @return {*}  {Promise<Result<R>>}
   * @memberof Fletcher
   */
  static Resolve<P,R>(self:Arrowlet<P,R>,input:P):Promise<Result<R>>{
    return resolve(self,input);
  }
  /**
   * Produces Receiver for Terminal to receive
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @param {P} input
   * @return {*}  {Receiver<R>}
   * @memberof Fletcher
   */
  static Forward<P,R>(self:Arrowlet<P,R>,input:P):Receiver<R>{
    return forward(self,input);
  }
  /**
   * Produces Arrow that listend for named event
   *
   * @static
   * @typeParam R
   * @param {string} self
   * @return {*}  {Arrowlet<EventTarget,R>}
   * @memberof Fletcher
   */
  static Event<R extends Event>(self:string):Arrowlet<EventTarget,R>{
    return new EventArrowlet(self)
  }
  /**
   * Arrow runs `self`, then runs `that` with it's output
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Rii
   * @param {Arrowlet<Pi,Ri>} self
   * @param {Arrowlet<Ri,Rii>} that
   * @return {*}  {Arrowlet<Pi,Rii>}
   * @memberof Fletcher
   */
  static Then<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,Rii>{
    return new Then(self,that);
  }
  /**
   * Arrow that takes a tuple [pi,pii] and produced [ri,rii]
   *
   * @static
   * @typeParam Pi
   * @typeParam Pii
   * @typeParam Ri
   * @typeParam Rii
   * @param {Arrowlet<Pi,Ri>} self
   * @param {Arrowlet<Pii,Rii>} that
   * @return {*}  {Arrowlet<[Pi,Pii],[Ri,Rii]>}
   * @memberof Fletcher
   */
  static Pair<Pi,Pii,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pii,Rii>):Arrowlet<[Pi,Pii],[Ri,Rii]>{
    return Fletcher.Arrow().Pair(that).apply(self);
  }
  /**
   * Use the output of Arrow to produce another and run with input Pi
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Rii
   * @param {Arrowlet<Pi,Ri>} self
   * @param {(p:Ri)=>Arrowlet<Pi,Rii>} fn
   * @return {*} 
   * @memberof Fletcher
   */
  static FlatMap<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,fn:(p:Ri)=>Arrowlet<Pi,Rii>){
    return Fletcher.Arrow().FlatMap(fn).apply(self);
  }
   /**
   * Runs an Arrow over the left component of a tuple.
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Pii
   * @return {*}  {Arrow<Pi,Ri,[Pi,Pii],[Ri,Pii]>}
   * @memberof Arrow
   */
  static First<Pi,Ri>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pi],[Pi,Ri]>{
    return Fletcher.Arrow().First().apply(self);
  }
  /**
   * Runs an Arrow over the rignt component of a tuple
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Pii
   * @return {*}  {Arrow<Pi,Ri,[Pii,Pi],[Pii,Ri]>}
   * @memberof Arrow
   */
  static Second<Pi,Ri,Pii>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pi],[Pi,Ri]>{
    return Fletcher.Arrow().Second().apply(self);
  }
  /**
   * An Arrow which runs two Arrows with the same input
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Rii
   * @param {Arrowlet<Pi,Ri>} self
   * @param {Arrowlet<Pi,Rii>} that
   * @return {*}  {Arrowlet<Pi,[Ri,Rii]>}
   * @memberof Fletcher
   */
  static Pinch<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pi,Rii>):Arrowlet<Pi,[Ri,Rii]>{
    return Fletcher.Arrow().Pinch(that).apply(self);
  }
  /**
   * An Arrow which produces the result of the left and the right arrow as a tuple
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Rii
   * @param {Arrowlet<Pi,Ri>} self
   * @param {Arrowlet<Ri,Rii>} that
   * @return {*}  {Arrowlet<Pi,[Ri,Rii]>}
   * @memberof Fletcher
   */
  static Joint<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,[Ri,Rii]>{
    return Fletcher.Arrow().Joint(that).apply(self);
  }
  /**
   * An Arrow which places the input and output of the left arrow as a tuple into the right 
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @typeParam Rii
   * @param  self
   * @param  that
   * @return {*}  {Arrowlet<Pi,Rii>}
   * @memberof Fletcher
   */
  static Bound<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<[Pi,Ri],Rii>):Arrowlet<Pi,Rii>{
    return Fletcher.Arrow().Bound(that).apply(self);
  }
  /**
   * An Arrow which produces both it's result and it's input as a result.
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @param {Arrowlet<Pi,Ri>} self
   * @return {*}  {Arrowlet<Pi,[Pi,Ri]>}
   * @memberof Fletcher
   */
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
/**
 * Produce the first result to arrive. Note it runs in left right order
 *
 * @static
 * @typeParam P
 * @typeParam R
 * @param {Arrowlet<P,R>} self
 * @param {Arrowlet<P,R>} that
 * @return {*}  {Arrowlet<P,R>}
 * @memberof Fletcher
 */
static Race<P,R>(self:Arrowlet<P,R>,that:Arrowlet<P,R>):Arrowlet<P,R>{
    return Fletcher.Anon(
      (p:P,cont:Terminal<R>) => {
        const deferred  = new Deferred();
        var complete    = false;
        function handler(r:R){
          if(!complete){
            complete = true;
            deferred.resolve(r);
          }
        }
        const a = Fletcher.Then(self,Fletcher.Fun1R(handler));
        const b = Fletcher.Then(self,Fletcher.Fun1R(handler));
        return new Cycle(() => Promise.any([Fletcher.Resolve(a,p),Fletcher.Resolve(b,p)]).then(
          (_) => deferred.promise.then(
            (r:R) => cont.receive(
              Terminal.value(r)
            )
          )
        ));
      }
    );
  }
  /**
   * An Arrow which calls handler `before` with it's input adn handler `after` with it's output
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @param {(((p:P)=>void) | null)} before
   * @param {(((r:R) => void) | null)} after
   * @return {*}  {Arrowlet<P,R>}
   * @memberof Fletcher
   */
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
  /**
   * Wraps an Arrow in such a way as it takes an Option 
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @return {*}  {Arrowlet<O.Option<P>,O.Option<R>>}
   * @memberof Fletcher
   */
  static Option<P,R>(self:Arrowlet<P,R>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionArw(self);
  }
  /**
   * Turns the flatMap function of an Option into an Option Arrow.
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,O.Option<R>>} self
   * @return {*}  {Arrowlet<O.Option<P>,O.Option<R>>}
   * @memberof Fletcher
   */
  static OptionM<P,R>(self:Arrowlet<P,O.Option<R>>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionM(self);
  }
  /**
   * Produces Some(p) if the predicate returns true, None otherwise
   *
   * @static
   * @typeParam P
   * @param {(p:P)=>boolean} fn
   * @return {*}  {Arrowlet<P,O.Option<P>>}
   * @memberof Fletcher
   */
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
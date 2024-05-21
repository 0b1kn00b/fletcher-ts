import {Deferred} from "ts-deferred";
import { Fun } from "./term/Fun";
import { Anon as AnonCls} from "./term/Anon";
import { Unit as UnitCls } from "./term/Unit";
import { forward, resolve } from "./util";
import { EventArrowlet } from "./term/Event";
import { Arrow as ArrowCls} from "./core/Arrow";
import { react, useReducerWithThunk } from "./react_arw"
import { ReactAsyncAction } from "./react_arw/ReactAsyncAction";
import { Option as OptionCls } from "./term/Option";
import { OptionM as OptionMCls} from "./term/OptionM";
import * as O from 'fp-ts/Option';
import { Arrowlet, Junction as JunctionCls, Work, Apply } from "./Core";
import * as E from 'fp-ts/Either';
import { Then as ThenCls } from "./term/Then";
import { Allocator } from "./core/Allocator";
import { Effect as EffectNms, Either, pipe } from "effect";
import { Callback as CallbackCls } from "./term/Callback";
import { Receiver as ReceiverCls } from "./term/Receiver";
/** Returns Work from Continuation */

/**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/

export namespace Fletcher{
  export function Junction<R>():JunctionCls<R>{
    return new JunctionCls(
      (a:Apply<Deferred<R>,Work.Work>):Work.Work => {
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
  export function Unit<P>():Arrowlet<P,P>{
    return new UnitCls();
  }
  export function Arrow(){
    return ArrowCls;
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
  export function Fun1R<Pi,Ri>(fn:(p:Pi)=>Ri):Arrowlet<Pi,Ri>{
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
  export function Pure<Pi,Ri>(r:Ri):Arrowlet<Pi,Ri>{
    return Fletcher.Fun1R((_:Pi) =>r);
  }
  /**
   * Arrow instance of lambda
   *
   * @static
   * @typeParam Pi
   * @typeParam Ri
   * @param {(p:Pi,cont:Junction<Ri>)=>Work.Work} fn
   * @return {*} 
   * @memberof Fletcher
   */
  export function Anon<Pi,Ri>(fn:(p:Pi,cont:JunctionCls<Ri>)=>Work.Work):Arrowlet<Pi,Ri>{
    return new AnonCls(fn)
  }
  /**
   * Runs Arrow and produces Promise result
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @param {P} input
   * @return {*}  {Promise<R>}
   * @memberof Fletcher
   */
  export function Resolve<P,R>(self:Arrowlet<P,R>,input:P):Promise<R>{
    return resolve(self,input);
  }
  /**
   * Produces Allocator for Junction to receive
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @param {Arrowlet<P,R>} self
   * @param {P} input
   * @return {*}  {Allocator<R>}
   * @memberof Fletcher
   */
  export function Forward<P,R>(self:Arrowlet<P,R>,input:P):Allocator<R>{
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
  export function Event<R extends Event>(self:string):Arrowlet<EventTarget,R>{
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
  export function Then<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,Rii>{
    return new ThenCls(self,that);
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
  export function Pair<Pi,Pii,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pii,Rii>):Arrowlet<[Pi,Pii],[Ri,Rii]>{
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
  export function FlatMap<Pi,Ri,Rii>(fn:(p:Ri)=>Arrowlet<Pi,Rii>):ArrowCls<Pi,Ri,Pi,Rii>{
    return Fletcher.Arrow().FlatMap(fn);
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
  export function First<Pi,Ri>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pi],[Pi,Ri]>{
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
  export function Second<Pi,Ri,Pii>(self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pi],[Pi,Ri]>{
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
  export function Pinch<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Pi,Rii>):Arrowlet<Pi,[Ri,Rii]>{
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
  export function Joint<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<Ri,Rii>):Arrowlet<Pi,[Ri,Rii]>{
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
  export function Bound<Pi,Ri,Rii>(self:Arrowlet<Pi,Ri>,that:Arrowlet<[Pi,Ri],Rii>):Arrowlet<Pi,Rii>{
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
  export function Broach<Pi,Ri>(self:Arrowlet<Pi,Ri>):Arrowlet<Pi,[Pi,Ri]>{
    return Fletcher.Arrow().Broach().apply(self);
  }
  export function Next<Pi,Pii,Piii,Ri,Rii,Riii>(lhs:ArrowCls<Pi,Pii,Ri,Rii>,rhs:ArrowCls<Ri,Rii,Piii,Riii>){
    return lhs.next(rhs);
  }
  export function React<R>(dispatch:Allocator<R>):Arrowlet<R,void>{  
    return react(useReducerWithThunk(dispatch));
  }
  export function Handler<R>(self:Arrowlet<R,void>):(r:R) => void{
    return (r:R) =>{
      Work.Submit(self.defer(r,Fletcher.Junction()));
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
export function Race<P,R>(self:Arrowlet<P,R>,that:Arrowlet<P,R>):Arrowlet<P,R>{
    return Fletcher.Anon(
      (p:P,cont:JunctionCls<R>) => {
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
        return Work.fromPromise(Promise.any([Fletcher.Resolve(a,p),Fletcher.Resolve(b,p)]).then(
          (_) => deferred.promise.then(
            (r:R) => cont.receive(
              JunctionCls.issue(r)
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
  export function Stage<P,R>(self:Arrowlet<P,R>,before:((p:P)=>void) | null, after:((r:R) => void) | null):Arrowlet<P,R>{
    return Fletcher.Anon(
      (p:P,cont:JunctionCls<R>) => {
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
  export function Option<P,R>(self:Arrowlet<P,R>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionCls(self);
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
  export function OptionM<P,R>(self:Arrowlet<P,O.Option<R>>):Arrowlet<O.Option<P>,O.Option<R>>{
    return new OptionMCls(self);
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
  export function OptionP<P>(fn:(p:P)=>boolean):Arrowlet<P,O.Option<P>>{
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
  /**
   * Runs the arrow unless `ms` time passes and returns Left(e)
   *
   * @static
   * @typeParam P
   * @typeParam R
   * @typeParam E
   * @param {Arrowlet<P,R>} self
   * @param {number} ms
   * @param {E} error
   * @return {*}  {Arrowlet<P,E.Either<E,R>>}
   * @memberof Fletcher
   */
  export function Timeout<P,R,E>(self:Arrowlet<P,R>,ms:number,error:E):Arrowlet<P,E.Either<E,R>>{
    return Fletcher.Race(
      Fletcher.Anon(
        (p:P,junc:JunctionCls<E.Either<E,R>>) => {
          const deferred : Deferred<E.Either<E,R>> = new Deferred();
          setTimeout(
            () => {
              deferred.resolve(E.left(error));
            },
            ms
          );
          return junc.receive(JunctionCls.later(deferred.promise));
        }
      ),
      Fletcher.Then(self,Fletcher.Fun1R(E.right))
    );
  }
  /**
   * Produces an `Arrow` that does `Work`
   *
   * @static
   * @typeParam P
   * @param {Work} work
   * @return {*}  {Arrowlet<P,P>}
   * @memberof Fletcher
   */
  export function Worker<P>(work:Work.Work):Arrowlet<P,P>{
    return Fletcher.Anon(
      (p:P,junc:JunctionCls<P>) => {
        return Work.Seq(junc.receive(JunctionCls.issue(p)),work)
      }
    );
  }
  /**
   *`Race`'s two Arrows and times out after `ms` with error `E`
   *
   * @static
   * @template P
   * @template R
   * @template E
   * @param {Arrowlet<P,R>} l
   * @param {Arrowlet<P,R>} r
   * @param {*} ms
   * @param {E} error
   * @return {*}  {Arrowlet<P,E.Either<E,R>>}
   * @memberof Fletcher
   */
  export function RaceWithTimeout<P,R,E>(l:Arrowlet<P,R>,r:Arrowlet<P,R>,ms,error:E):Arrowlet<P,E.Either<E,R>>{
    const lhs : Arrowlet<P,E.Either<E,R>> = Fletcher.Timeout(l,ms,error);
    const rhs : Arrowlet<P,E.Either<E,R>> = Fletcher.Timeout(r,ms,error);
    return Fletcher.Race(lhs,rhs);
  }
  /**
   * Like `Then` but call a function on the right.
   *
   * @static
   * @template Pi
   * @template R
   * @template Ri
   * @param {Arrowlet<Pi,R>} l
   * @param {(r:R) => Ri} fn
   * @return {*}  {Arrowlet<Pi,Ri>}
   * @memberof Fletcher
   */
  export function Map<Pi,R,Ri>(l:Arrowlet<Pi,R>,fn:(r:R) => Ri):Arrowlet<Pi,Ri>{
    return Fletcher.Then(l,Fletcher.Fun1R(fn));
  }
  export function Mapi<Pi,Pii,R>(self:Arrowlet<Pii,R>,fn:(pi:Pi) => Pii):Arrowlet<Pi,R>{
    return Fletcher.Then(Fletcher.Fun1R(fn),self);
  }
  export function Effect<Pi,R>(self:Arrowlet<Pi,R>):(pi:Pi) => EffectNms.Effect<R,any,Pi>{
    return (pi:Pi) => {
      return EffectNms.promise((signal:AbortSignal) => Fletcher.Resolve(self,pi));
    }
  }
  export function Loop<Pi,R>(self:Arrowlet<Pi,Either.Either<R,Pi>>):Arrowlet<Pi,R>{
    return Fletcher.Anon(
      function rec(pi:Pi,cont:JunctionCls<R>){
        return forward(self,pi).flat_fold(
          (r:Either.Either<R,Pi>) => Either.match({
            onLeft    : (pi:Pi)   => Work.fromThunk(() => rec(pi,cont)),//yay?
            onRight   : (r:R)     => cont.receive(JunctionCls.issue(r))
          })
        )
      }
    );
  }
  export function Callback<P,R>(fn: (p:P,cb:(r:R) => void) => void){
    return new CallbackCls(fn);
  }
  export function Receiver<R>(self:Allocator<R>):Arrowlet<void,R>{
    return new ReceiverCls(self);
  }
}
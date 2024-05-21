import { Arrow as ArrowCls } from "./core/Arrow";
import * as O from 'fp-ts/Option';
import { Arrowlet, Junction as JunctionCls, Work } from "./Core";
import * as E from 'fp-ts/Either';
import { Allocator } from "./core/Allocator";
import { Effect as EffectNms, Either } from "effect";
import { Callback as CallbackCls } from "./term/Callback";
/** Returns Work from Continuation */
/**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
export declare namespace Fletcher {
    function Junction<R>(): JunctionCls<R>;
    /**
     * Arrow that passed the input p to the output
     *
     * @static
     * @typeParam P
     * @return {*}  {Arrowlet<P,P>}
     * @memberof Fletcher
     */
    function Unit<P>(): Arrowlet<P, P>;
    function Arrow(): typeof ArrowCls;
    /**
     * Arrow of function `fn`
     * @static
     * @typeParam Pi
     * @typeParam Ri
     * @param {(p:Pi)=>Ri} fn
     * @return {*}  {Arrowlet<Pi,Ri>}
     * @memberof Fletcher
     */
    function Fun1R<Pi, Ri>(fn: (p: Pi) => Ri): Arrowlet<Pi, Ri>;
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
    function Pure<Pi, Ri>(r: Ri): Arrowlet<Pi, Ri>;
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
    function Anon<Pi, Ri>(fn: (p: Pi, cont: JunctionCls<Ri>) => Work.Work): Arrowlet<Pi, Ri>;
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
    function Resolve<P, R>(self: Arrowlet<P, R>, input: P): Promise<R>;
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
    function Forward<P, R>(self: Arrowlet<P, R>, input: P): Allocator<R>;
    /**
     * Produces Arrow that listend for named event
     *
     * @static
     * @typeParam R
     * @param {string} self
     * @return {*}  {Arrowlet<EventTarget,R>}
     * @memberof Fletcher
     */
    function Event<R extends Event>(self: string): Arrowlet<EventTarget, R>;
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
    function Then<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, Rii>;
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
    function Pair<Pi, Pii, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pii, Rii>): Arrowlet<[Pi, Pii], [Ri, Rii]>;
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
    function FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => Arrowlet<Pi, Rii>): ArrowCls<Pi, Ri, Pi, Rii>;
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
    function First<Pi, Ri>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Pi], [Pi, Ri]>;
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
    function Second<Pi, Ri, Pii>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Pi], [Pi, Ri]>;
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
    function Pinch<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pi, Rii>): Arrowlet<Pi, [Ri, Rii]>;
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
    function Joint<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, [Ri, Rii]>;
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
    function Bound<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<[Pi, Ri], Rii>): Arrowlet<Pi, Rii>;
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
    function Broach<Pi, Ri>(self: Arrowlet<Pi, Ri>): Arrowlet<Pi, [Pi, Ri]>;
    function Next<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: ArrowCls<Pi, Pii, Ri, Rii>, rhs: ArrowCls<Ri, Rii, Piii, Riii>): ArrowCls<Pi, Pii, Piii, Riii>;
    function React<R>(dispatch: Allocator<R>): Arrowlet<R, void>;
    function Handler<R>(self: Arrowlet<R, void>): (r: R) => void;
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
    function Race<P, R>(self: Arrowlet<P, R>, that: Arrowlet<P, R>): Arrowlet<P, R>;
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
    function Stage<P, R>(self: Arrowlet<P, R>, before: ((p: P) => void) | null, after: ((r: R) => void) | null): Arrowlet<P, R>;
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
    function Option<P, R>(self: Arrowlet<P, R>): Arrowlet<O.Option<P>, O.Option<R>>;
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
    function OptionM<P, R>(self: Arrowlet<P, O.Option<R>>): Arrowlet<O.Option<P>, O.Option<R>>;
    /**
     * Produces Some(p) if the predicate returns true, None otherwise
     *
     * @static
     * @typeParam P
     * @param {(p:P)=>boolean} fn
     * @return {*}  {Arrowlet<P,O.Option<P>>}
     * @memberof Fletcher
     */
    function OptionP<P>(fn: (p: P) => boolean): Arrowlet<P, O.Option<P>>;
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
    function Timeout<P, R, E>(self: Arrowlet<P, R>, ms: number, error: E): Arrowlet<P, E.Either<E, R>>;
    /**
     * Produces an `Arrow` that does `Work`
     *
     * @static
     * @typeParam P
     * @param {Work} work
     * @return {*}  {Arrowlet<P,P>}
     * @memberof Fletcher
     */
    function Worker<P>(work: Work.Work): Arrowlet<P, P>;
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
    function RaceWithTimeout<P, R, E>(l: Arrowlet<P, R>, r: Arrowlet<P, R>, ms: any, error: E): Arrowlet<P, E.Either<E, R>>;
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
    function Map<Pi, R, Ri>(l: Arrowlet<Pi, R>, fn: (r: R) => Ri): Arrowlet<Pi, Ri>;
    function Mapi<Pi, Pii, R>(self: Arrowlet<Pii, R>, fn: (pi: Pi) => Pii): Arrowlet<Pi, R>;
    function Effect<Pi, R>(self: Arrowlet<Pi, R>): (pi: Pi) => EffectNms.Effect<R, any, Pi>;
    function Loop<Pi, R>(self: Arrowlet<Pi, Either.Either<R, Pi>>): Arrowlet<Pi, R>;
    function Callback<P, R>(fn: (p: P, cb: (r: R) => void) => void): CallbackCls<P, R>;
    function Receiver<R>(self: Allocator<R>): Arrowlet<void, R>;
}

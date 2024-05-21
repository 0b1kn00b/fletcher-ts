import { Cancel } from 'effect/Runtime';
import { Deferred } from 'ts-deferred';
import { Dispatch } from 'react';
import { Effect as Effect_2 } from 'effect';
import * as Either from 'effect/Either';
import * as O from 'fp-ts/Option';

/**
 * The `Junction` is responsible for both creating `Allocators` and fullfilling
 * Promises to them.
 * The `Allocator` can return `Work.Work` to be done by a scheduler, which is passed through
 * the allocator.
 * @export
 * @class Allocator
 * @extends {Settler<Promise<R>>}
 * @typeParam R
 */
export declare class Allocator<R> extends Settler<Promise<R>> {
    flat_fold<Ri>(fn: (r: R) => Allocator<Ri>): Allocator<Ri>;
    zip<Ri>(that: Allocator<Ri>): Allocator<[R, Ri]>;
    static Zip<R, Ri>(self: Allocator<R>, that: Allocator<Ri>): Allocator<[R, Ri]>;
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
export declare function Anon<Pi, Ri>(fn: (p: Pi, cont: Junction<Ri>) => Work.Work): Arrowlet<Pi, Ri>;

/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
export declare class Apply<A, B> {
    private _apply;
    constructor(_apply: (a: A) => B);
    apply(a: A): B;
}

export declare function Arrow(): typeof Arrow_2;

declare class Arrow_2<Pi, Ri, Pii, Rii> {
    private _apply;
    constructor(_apply: (self: Arrowlet<Pi, Ri>) => Arrowlet<Pii, Rii>);
    apply(self: Arrowlet<Pi, Ri>): Arrowlet<Pii, Rii>;
    /**
     * You liked arrows so much, we put arrows in your arrows.
     * @param that You
     * @returns
     */
    next<Piii, Riii>(that: Arrow_2<Pii, Rii, Piii, Riii>): Arrow_2<Pi, Ri, Piii, Riii>;
    static Make<Pi, Ri, Pii, Rii>(apply: (self: Arrowlet<Pi, Ri>) => Arrowlet<Pii, Rii>): Arrow_2<Pi, Ri, Pii, Rii>;
    static Unit<Pi, Ri>(): Arrow_2<Pi, Ri, Pi, Ri>;
    static Pure<Pi, Ri, Pii, Rii>(self: Arrowlet<Pii, Rii>): Arrow_2<Pi, Ri, Pii, Rii>;
    static Then<Pi, Ri, Rii>(that: Arrowlet<Ri, Rii>): Arrow_2<Pi, Ri, Pi, Rii>;
    then<Riii>(that: Arrowlet<Rii, Riii>): Arrow_2<Pi, Ri, Pii, Riii>;
    static Pair<Pi, Pii, Ri, Rii>(that: Arrowlet<Pii, Rii>): Arrow_2<Pi, Ri, [Pi, Pii], [Ri, Rii]>;
    pair(that: Arrowlet<Pii, Rii>): Arrow_2<Pi, Ri, [Pii, Pii], [Rii, Rii]>;
    static Split<Pi, Ri, Rii>(that: Arrowlet<Pi, Rii>): Arrow_2<Pi, Ri, Pi, [Ri, Rii]>;
    split<Riii>(that: Arrowlet<Pii, Riii>): Arrow_2<Pi, Ri, Pii, [Rii, Riii]>;
    static FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => Arrowlet<Pi, Rii>): Arrow_2<Pi, Ri, Pi, Rii>;
    flat_map<Riii>(fn: (p: Rii) => Arrowlet<Pii, Riii>): Arrow_2<Pi, Ri, Pii, Riii>;
    static First<Pi, Ri, Pii>(): Arrow_2<Pi, Ri, [Pi, Pii], [Ri, Pii]>;
    first(): Arrow_2<Pi, Ri, [Pii, unknown], [Rii, unknown]>;
    static Second<Pi, Ri, Pii>(): Arrow_2<Pi, Ri, [Pii, Pi], [Pii, Ri]>;
    second(): Arrow_2<Pi, Ri, [unknown, Pii], [unknown, Rii]>;
    static Pinch<Pi, Ri, Rii>(that: Arrowlet<Pi, Rii>): Arrow_2<Pi, Ri, Pi, [Ri, Rii]>;
    pinch<Riii>(that: Arrowlet<Pii, Riii>): Arrow_2<Pi, Ri, Pii, [Rii, Riii]>;
    static Joint<Pi, Ri, Rii>(that: Arrowlet<Ri, Rii>): Arrow_2<Pi, Ri, Pi, [Ri, Rii]>;
    joint<Riii>(that: Arrowlet<Rii, Riii>): Arrow_2<Pi, Ri, Pii, [Rii, Riii]>;
    static Bound<Pi, Ri, Rii>(that: Arrowlet<[Pi, Ri], Rii>): Arrow_2<Pi, Ri, Pi, Rii>;
    bound<Riii>(that: Arrowlet<[Pii, Rii], Riii>): Arrow_2<Pi, Ri, Pii, Riii>;
    static Broach<Pi, Ri>(): Arrow_2<Pi, Ri, Pi, [Pi, Ri]>;
    broach(): Arrow_2<Pi, Ri, Pii, [Pii, Rii]>;
    static Compose<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow_2<Ri, Rii, Piii, Riii>, rhs: Arrow_2<Pi, Pii, Ri, Rii>): Arrow_2<Pi, Pii, Piii, Riii>;
    compose<P, R>(before: Arrow_2<P, R, Pi, Ri>): Arrow_2<P, R, Pii, Rii>;
}

export declare interface Arrowlet<P, R> {
    defer(p: P, cont: Junction<R>): Work.Work;
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
export declare function Bound<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<[Pi, Ri], Rii>): Arrowlet<Pi, Rii>;

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
export declare function Broach<Pi, Ri>(self: Arrowlet<Pi, Ri>): Arrowlet<Pi, [Pi, Ri]>;

export declare function Callback<P, R>(fn: (p: P, cb: (r: R) => void) => void): Callback_2<P, R>;

declare class Callback_2<P, R> implements Arrowlet<P, R> {
    private deferred;
    constructor(deferred: (p: P, cb: (r: R) => void) => void);
    defer(p: P, cont: Junction<R>): Work.Work;
}

export declare class Cont<P, R> extends Apply<Apply<P, R>, R> {
}

export declare function Effect<Pi, R>(self: Arrowlet<Pi, R>): (pi: Pi) => Effect_2.Effect<R, any, Pi>;

/**
 * Produces Arrow that listend for named event
 *
 * @static
 * @typeParam R
 * @param {string} self
 * @return {*}  {Arrowlet<EventTarget,R>}
 * @memberof Fletcher
 */
declare function Event_2<R extends Event>(self: string): Arrowlet<EventTarget, R>;
export { Event_2 as Event }

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
export declare function First<Pi, Ri>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Pi], [Pi, Ri]>;

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
export declare function FlatMap<Pi, Ri, Rii>(fn: (p: Ri) => Arrowlet<Pi, Rii>): Arrow_2<Pi, Ri, Pi, Rii>;

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
export declare function Forward<P, R>(self: Arrowlet<P, R>, input: P): Allocator<R>;

/**
 * Arrow of function `fn`
 * @static
 * @typeParam Pi
 * @typeParam Ri
 * @param {(p:Pi)=>Ri} fn
 * @return {*}  {Arrowlet<Pi,Ri>}
 * @memberof Fletcher
 */
export declare function Fun1R<Pi, Ri>(fn: (p: Pi) => Ri): Arrowlet<Pi, Ri>;

export declare function Handler<R>(self: Arrowlet<R, void>): (r: R) => void;

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
export declare function Joint<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, [Ri, Rii]>;

/**
 * Junction represents the contiuation passed through the Arrowlets to run them
 *
 * @class Junction
 * @extends {SettlerCls<Deferred<R>>}
 * @typeParam R
 * @typeParam E
 */
export declare class Junction<R> extends Settler<Deferred<R>> {
    receive(receiver: Allocator<R>): Work.Work;
    static later<R>(payload: Promise<R>): Allocator<R>;
    static issue<R>(self: R): Allocator<R>;
    static Pure<R>(deferred: Deferred<R>): Junction<R>;
    /**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
    static Unit<R>(): Junction<R>;
}

export declare type JunctionSink<R> = Apply<Deferred<R>, Work.Work>;

export declare function Loop<Pi, R>(self: Arrowlet<Pi, Either.Either<R, Pi>>): Arrowlet<Pi, R>;

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
declare function Map_2<Pi, R, Ri>(l: Arrowlet<Pi, R>, fn: (r: R) => Ri): Arrowlet<Pi, Ri>;
export { Map_2 as Map }

export declare function Mapi<Pi, Pii, R>(self: Arrowlet<Pii, R>, fn: (pi: Pi) => Pii): Arrowlet<Pi, R>;

export declare function Next<Pi, Pii, Piii, Ri, Rii, Riii>(lhs: Arrow_2<Pi, Pii, Ri, Rii>, rhs: Arrow_2<Ri, Rii, Piii, Riii>): Arrow_2<Pi, Pii, Piii, Riii>;

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
declare function Option_2<P, R>(self: Arrowlet<P, R>): Arrowlet<O.Option<P>, O.Option<R>>;
export { Option_2 as Option }

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
export declare function OptionM<P, R>(self: Arrowlet<P, O.Option<R>>): Arrowlet<O.Option<P>, O.Option<R>>;

/**
 * Produces Some(p) if the predicate returns true, None otherwise
 *
 * @static
 * @typeParam P
 * @param {(p:P)=>boolean} fn
 * @return {*}  {Arrowlet<P,O.Option<P>>}
 * @memberof Fletcher
 */
export declare function OptionP<P>(fn: (p: P) => boolean): Arrowlet<P, O.Option<P>>;

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
export declare function Pair<Pi, Pii, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pii, Rii>): Arrowlet<[Pi, Pii], [Ri, Rii]>;

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
export declare function Pinch<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Pi, Rii>): Arrowlet<Pi, [Ri, Rii]>;

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
export declare function Pure<Pi, Ri>(r: Ri): Arrowlet<Pi, Ri>;

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
export declare function Race<P, R>(self: Arrowlet<P, R>, that: Arrowlet<P, R>): Arrowlet<P, R>;

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
export declare function RaceWithTimeout<P, R, E>(l: Arrowlet<P, R>, r: Arrowlet<P, R>, ms: any, error: E): Arrowlet<P, Either.Either<R, E>>;

declare function React_2<R>(dispatch: Dispatch<R>): Arrowlet<R, void>;
export { React_2 as React }

export declare function Receiver<R>(self: Allocator<R>): Arrowlet<void, R>;

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
export declare function Resolve<P, R>(self: Arrowlet<P, R>, input: P): Promise<R>;

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
export declare function Second<Pi, Ri, Pii>(self: Arrowlet<Pi, Ri>): Arrowlet<[Pi, Pi], [Pi, Ri]>;

export declare class Settler<P> extends Cont<P, Work.Work> {
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
export declare function Stage<P, R>(self: Arrowlet<P, R>, before: ((p: P) => void) | null, after: ((r: R) => void) | null): Arrowlet<P, R>;

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
export declare function Then<Pi, Ri, Rii>(self: Arrowlet<Pi, Ri>, that: Arrowlet<Ri, Rii>): Arrowlet<Pi, Rii>;

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
export declare function Timeout<P, R, E>(self: Arrowlet<P, R>, ms: number, error: E): Arrowlet<P, Either.Either<R, E>>;

/** Returns Work from Continuation */
/**
 * Arrow that passed the input p to the output
 *
 * @static
 * @typeParam P
 * @return {*}  {Arrowlet<P,P>}
 * @memberof Fletcher
 */
export declare function Unit<P>(): Arrowlet<P, P>;

export declare namespace Work {
    export type Work = Effect_2.Effect<Work | void, never, never>;
    export function Seq(lhs: Work, rhs: Work): Work;
    export function Par(self: Work, that: Work): Work;
    const ZERO: Work;
    export function fromPromise(promise: Promise<Work>): Work;
    export function fromThunk(thunk: () => Work): Work;
    export function Submit(self: Work): Cancel<void | Work, never>;
    export function Promise(self: Work): Promise<void | Work>;
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
declare function Worker_2<P>(work: Work.Work): Arrowlet<P, P>;
export { Worker_2 as Worker }

export { }


export declare namespace Work {
    type Work = Effect.Effect<Work | void, never, never>;
    function Seq(lhs: Work, rhs: Work): Work;
    function Par(self: Work, that: Work): Work;
    const ZERO: Work;
    function fromPromise(promise: Promise<Work>): Work;
    function fromThunk(thunk: () => Work): Work;
    function Submit(self: Work): import("effect/Runtime").Cancel<void | Work, never>;
    function Promise(self: Work): Promise<void | Work>;
}


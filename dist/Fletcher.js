import { Deferred } from "ts-deferred";
import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Unit } from "./term/Unit";
import { forward, resolve } from "./util";
import { EventArrowlet } from "./term/Event";
import { Arrow } from "./core/Arrow";
import { react, useReducerWithThunk } from "./react_arw";
import { Option as OptionArw } from "./term/Option";
import { OptionM } from "./term/OptionM";
import * as O from 'fp-ts/Option';
import { Junction, Work } from "./Core";
import * as E from 'fp-ts/Either';
import { Then } from "./term/Then";
/** Returns Work from Continuation */
/**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
export class Fletcher {
    static Junction() {
        return new Junction((a) => {
            return a.apply(new Deferred());
        });
    }
    /**
     * Arrow that passed the input p to the output
     *
     * @static
     * @typeParam P
     * @return {*}  {Arrowlet<P,P>}
     * @memberof Fletcher
     */
    static Unit() {
        return new Unit();
    }
    static Arrow() {
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
    static Fun1R(fn) {
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
    static Pure(r) {
        return Fletcher.Fun1R((_) => r);
    }
    /**
     * Arrow instance of lambda
     *
     * @static
     * @typeParam Pi
     * @typeParam Ri
     * @param {(p:Pi,cont:Junction<Ri>)=>Work} fn
     * @return {*}
     * @memberof Fletcher
     */
    static Anon(fn) {
        return new Anon(fn);
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
    static Resolve(self, input) {
        return resolve(self, input);
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
    static Forward(self, input) {
        return forward(self, input);
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
    static Event(self) {
        return new EventArrowlet(self);
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
    static Then(self, that) {
        return new Then(self, that);
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
    static Pair(self, that) {
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
    static FlatMap(fn) {
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
    static First(self) {
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
    static Second(self) {
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
    static Pinch(self, that) {
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
    static Joint(self, that) {
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
    static Bound(self, that) {
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
    static Broach(self) {
        return Fletcher.Arrow().Broach().apply(self);
    }
    static Next(lhs, rhs) {
        return lhs.next(rhs);
    }
    static React(dispatch) {
        return react(useReducerWithThunk(dispatch));
    }
    static Handler(self) {
        return (r) => {
            self.defer(r, Fletcher.Junction()).submit();
        };
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
    static Race(self, that) {
        return Fletcher.Anon((p, cont) => {
            const deferred = new Deferred();
            var complete = false;
            function handler(r) {
                if (!complete) {
                    complete = true;
                    deferred.resolve(r);
                }
            }
            const a = Fletcher.Then(self, Fletcher.Fun1R(handler));
            const b = Fletcher.Then(self, Fletcher.Fun1R(handler));
            return new Work(() => Promise.any([Fletcher.Resolve(a, p), Fletcher.Resolve(b, p)]).then((_) => deferred.promise.then((r) => cont.receive(Junction.issue(r)))));
        });
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
    static Stage(self, before, after) {
        return Fletcher.Anon((p, cont) => {
            if (before) {
                before(p);
            }
            return Fletcher.Then(self, Fletcher.Fun1R((r) => {
                if (after) {
                    after(r);
                }
                return r;
            })).defer(p, cont);
        });
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
    static Option(self) {
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
    static OptionM(self) {
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
    static OptionP(fn) {
        return Fletcher.Fun1R((p) => {
            if (fn(p)) {
                return O.some(p);
            }
            else {
                return O.none;
            }
        });
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
    static Timeout(self, ms, error) {
        return Fletcher.Race(Fletcher.Anon((p, junc) => {
            const deferred = new Deferred();
            setTimeout(() => {
                deferred.resolve(E.left(error));
            }, ms);
            return junc.receive(Junction.later(deferred.promise));
        }), Fletcher.Then(self, Fletcher.Fun1R(E.right)));
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
    static Worker(work) {
        return Fletcher.Anon((p, junc) => {
            return junc.receive(Junction.issue(p)).seq(work);
        });
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
    static RaceWithTimeout(l, r, ms, error) {
        const lhs = Fletcher.Timeout(l, ms, error);
        const rhs = Fletcher.Timeout(r, ms, error);
        return Fletcher.Race(lhs, rhs);
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
    static Map(l, fn) {
        return Fletcher.Then(l, Fletcher.Fun1R(fn));
    }
    static Instances = {
        EventArrowlet: EventArrowlet,
        Anon: Anon,
        Fun: Fun,
        Option: OptionArw,
        OptionM: OptionM,
        Then: Then,
        Unit: Unit
    };
    static Core = {
        Junction: Junction,
        Work: Work
    };
}

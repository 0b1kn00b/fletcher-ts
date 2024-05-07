var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Deferred = function() {
  function Deferred2() {
    var _this = this;
    this.resolve = function(value) {
      _this._resolve(value);
    };
    this.reject = function(reason) {
      _this._reject(reason);
    };
    this._promise = new Promise(function(resolve2, reject) {
      _this._resolve = resolve2;
      _this._reject = reject;
    });
  }
  Object.defineProperty(Deferred2.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: true,
    configurable: true
  });
  return Deferred2;
}();
var Deferred_1 = Deferred;
class Apply {
  constructor(_apply) {
    __publicField(this, "_apply");
    this._apply = _apply;
  }
  apply(a) {
    return this._apply(a);
  }
}
const _Cycle = class _Cycle {
  constructor(_after) {
    __publicField(this, "_after", null);
    this._after = _after;
  }
  get after() {
    return this._after == null ? null : this._after();
  }
  static Seq(lhs, rhs) {
    return new _Cycle(() => {
      let a = lhs == null ? void 0 : lhs.after;
      if (a != null) {
        return new Promise((resolve2) => a.then((x) => {
          return _Cycle.Seq(x, rhs);
        }).then(resolve2));
      } else {
        return rhs == null ? void 0 : rhs.after;
      }
    });
  }
  seq(rhs) {
    return _Cycle.Par(this, rhs);
  }
  par(rhs) {
    return _Cycle.Par(this, rhs);
  }
  submit() {
    return _Cycle.Submit(this);
  }
  static Submit(self) {
    let deferred = new Deferred_1();
    if (self != null) {
      const after = self.after;
      if (after != null) {
        after.then((x) => {
          if (x != null) {
            _Cycle.Submit(x).then((x2) => deferred.resolve(x2), (e) => deferred.reject(e));
          } else {
            deferred.resolve(null);
          }
        });
      } else {
        deferred.resolve(null);
      }
    } else {
      deferred.resolve(null);
    }
    return deferred.promise;
  }
  static Par(self, that) {
    let l = self.after ?? Promise.resolve(_Cycle.ZERO);
    let r = that.after ?? Promise.resolve(_Cycle.ZERO);
    let a = Promise.all([l, r]);
    a.then((x) => {
    });
    return _Cycle.Pure(a.then(([l2, r2]) => {
      const do_left = !(l2 === _Cycle.ZERO);
      const do_right = !(r2 === _Cycle.ZERO);
      var result = _Cycle.ZERO;
      if (do_left) {
        if (do_right) {
          result = _Cycle.Par(l2, r2);
        } else {
          result = l2;
        }
      } else if (do_right) {
        result = r2;
      }
      return result;
    }));
  }
  // static Unit(){
  //   return new Cycle(null);
  // }
  static Pure(self) {
    return new _Cycle(() => self);
  }
};
__publicField(_Cycle, "ZERO", new _Cycle(null));
let Cycle = _Cycle;
(function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
});
var none$1 = { _tag: "None" };
var some$1 = function(a) {
  return { _tag: "Some", value: a };
};
var isLeft$1 = function(ma) {
  return ma._tag === "Left";
};
var left$1 = function(e) {
  return { _tag: "Left", left: e };
};
var right$1 = function(a) {
  return { _tag: "Right", right: a };
};
var left = left$1;
var right = right$1;
var isLeft = isLeft$1;
var matchW$1 = function(onLeft, onRight) {
  return function(ma) {
    return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
  };
};
var match$1 = matchW$1;
var fold$1 = match$1;
class Cont extends Apply {
}
class Settler extends Cont {
}
class Receiver extends Settler {
  flat_fold(ok, no) {
    return new Receiver((cont) => {
      return this.apply(new Apply((p) => {
        let a = p.then((outcome) => {
          let a2 = match$1(ok, no)(outcome);
          return a2;
        });
        let b = a.then((x) => {
          let a2 = x.apply(cont);
          return a2;
        });
        let c = new Cycle(() => b);
        return c;
      }));
    });
  }
  handler(ok, no) {
    return match$1((result) => ok(result), (error) => {
      if (no) {
        no(error);
      } else {
        throw no;
      }
    });
  }
  zip(that) {
    return Receiver.Zip(this, that);
  }
  static Zip(self, that) {
    return new Receiver((f) => {
      var lhs = null;
      var rhs = null;
      let work_left = self.apply(new Apply((ocI) => {
        lhs = ocI;
        return Cycle.ZERO;
      }));
      var work_right = that.apply(new Apply((ocII) => {
        rhs = ocII;
        return Cycle.ZERO;
      }));
      return work_left.par(work_right).seq(new Cycle(() => {
        let lhs_ = lhs;
        let rhs_ = rhs;
        let ipt = lhs_.then((okI) => rhs_.then((okII) => {
          return { fst: okI, snd: okII };
        }));
        let nxt = ipt.then((p) => {
          return fold$1((l) => {
            return fold$1((lI) => {
              let res2 = [l, lI];
              return left(res2);
            }, (r) => right(r))(p.snd);
          }, (r) => right(r))(p.fst);
        });
        let res = f.apply(nxt);
        return new Promise((resolve2) => {
          resolve2(res);
        });
      }));
    });
  }
}
class Terminal extends Settler {
  receive(receiver) {
    return receiver.apply(new Apply((a) => {
      return this.apply(new Apply((b) => {
        let result = a.then((v) => {
          b.resolve(v);
        });
        return new Cycle(() => {
          return result.then((_) => {
            return Cycle.ZERO;
          });
        });
      }));
    }));
  }
  static later(payload) {
    return new Receiver((fn) => {
      return fn.apply(payload);
    });
  }
  static issue(self) {
    return new Receiver(function(fn) {
      let promise = new Promise((resolve2) => {
        resolve2(self);
      });
      return fn.apply(promise);
    });
  }
  static value(self) {
    return Terminal.issue(left(self));
  }
  static error(self) {
    return Terminal.issue(right(self));
  }
  static Pure(deferred) {
    return new Terminal((a) => {
      return a.apply(deferred);
    });
  }
}
class Fun {
  constructor(_apply) {
    __publicField(this, "_apply");
    this._apply = _apply;
  }
  defer(p, cont) {
    return cont.receive(Terminal.value(this._apply(p)));
  }
}
class Anon {
  constructor(_defer) {
    __publicField(this, "_defer");
    this._defer = _defer;
  }
  defer(p, cont) {
    return this._defer(p, cont);
  }
}
class Unit extends Fun {
  constructor() {
    super((p) => p);
  }
}
function forward(self, p) {
  return new Receiver((k) => {
    let deferred = new Deferred_1();
    let fst = self.defer(p, new Terminal((t_sink) => {
      let result = t_sink.apply(deferred);
      return result;
    }));
    let snd = k.apply(deferred.promise);
    return Cycle.Seq(fst, snd);
  });
}
function resolve(self, input) {
  let deferred = new Deferred_1();
  let cycle = self.defer(input, Terminal.Pure(deferred));
  let finish = cycle.submit();
  return finish.then(() => {
    return deferred.promise.then((x) => {
      return x;
    });
  });
}
function unit() {
  return new Fun((pi) => {
    return null;
  });
}
class EventArrowlet {
  constructor(event_name) {
    __publicField(this, "event_name");
    this.event_name = event_name;
  }
  defer(target, cont) {
    let deferred = new Deferred_1();
    let handler = {
      handleEvent: function(evt) {
        console.log("loaded");
        deferred.resolve(left(evt));
        target.removeEventListener(this.event_name, handler);
      }
    };
    target.addEventListener(this.event_name, handler);
    return cont.receive(Terminal.later(deferred.promise));
  }
}
class Then {
  constructor(lhs, rhs) {
    __publicField(this, "lhs");
    __publicField(this, "rhs");
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p, cont) {
    var a = forward(this.lhs, p);
    return cont.receive(a.flat_fold((ok) => forward(this.rhs, ok), (no) => Terminal.error(no)));
  }
}
class Arrow {
  constructor(_apply) {
    __publicField(this, "_apply");
    this._apply = _apply;
  }
  apply(self) {
    return this._apply(self);
  }
  /**
   * You liked arrows so much, we put arrows in your arrows.
   * @param that You
   * @returns
   */
  next(that) {
    return new Arrow((self) => {
      let next = this.apply(self);
      return that.apply(next);
    });
  }
  static Make(apply) {
    return new Arrow(apply);
  }
  static Unit() {
    return new Arrow((self) => self);
  }
  static Pure(self) {
    return new Arrow((_) => {
      return self;
    });
  }
  static Then(that) {
    return new Arrow((self) => new Then(self, that));
  }
  then(that) {
    return this.next(Arrow.Then(that));
  }
  static Pair(that) {
    return new Arrow((self) => new Anon((p, cont) => {
      let [l, r] = p;
      let lhs = forward(self, l);
      let rhs = forward(that, r);
      return cont.receive(lhs.zip(rhs));
    }));
  }
  pair(that) {
    return this.next(Arrow.Pair(that));
  }
  static Split(that) {
    return new Arrow((self) => {
      return new Anon((p, cont) => {
        return Arrow.Pair(that).apply(self).defer([p, p], cont);
      });
    });
  }
  split(that) {
    return this.next(Arrow.Split(that));
  }
  static FlatMap(fn) {
    return new Arrow((self) => {
      return new Anon((p, cont) => {
        return cont.receive(forward(self, p).flat_fold((ok) => forward(fn(ok), p), (no) => Terminal.error(no)));
      });
    });
  }
  flat_map(fn) {
    return this.next(Arrow.FlatMap(fn));
  }
  static First() {
    return new Arrow((self) => {
      let l = Arrow.Pure(new Fun((x) => x));
      let r = Arrow.Pair(l.apply(self)).apply(self);
      return r;
    });
  }
  first() {
    return this.next(Arrow.First());
  }
  static Second() {
    return new Arrow((self) => {
      let l = Arrow.Pure(new Fun((x) => x));
      let r = Arrow.Pair(self).apply(l.apply(self));
      return r;
    });
  }
  second() {
    return this.next(Arrow.Second());
  }
  static Pinch(that) {
    return new Arrow((self) => {
      return new Anon((p, cont) => {
        return cont.receive(forward(self, p).zip(forward(that, p)));
      });
    });
  }
  pinch(that) {
    return this.next(Arrow.Pinch(that));
  }
  static Joint(that) {
    return new Arrow((self) => {
      return Arrow.Then(Arrow.Pure(Arrow.Split(that).apply(new Unit())).apply(new Unit())).apply(self);
    });
  }
  joint(that) {
    return this.next(Arrow.Joint(that));
  }
  static Bound(that) {
    return new Arrow((self) => {
      let u = new Unit();
      let l = Arrow.Then(that);
      let r = Arrow.Joint(self).apply(u);
      let n = l.apply(r);
      return n;
    });
  }
  bound(that) {
    return this.next(Arrow.Bound(that));
  }
  static Broach() {
    return new Arrow((self) => {
      let unit2 = new Fun((p) => p);
      return Arrow.Bound(unit2).apply(self);
    });
  }
  broach() {
    return this.next(Arrow.Broach());
  }
  resolve(p) {
    return resolve(this.apply(unit()), p);
  }
  static Compose(lhs, rhs) {
    return rhs.next(lhs);
  }
  compose(before) {
    return Arrow.Compose(this, before);
  }
}
function react(dispatch) {
  return new Anon((p, cont) => {
    dispatch(p);
    return Cycle.ZERO;
  });
}
function useReducerWithThunk(dispatch) {
  function customDispatch(action) {
    switch (typeof action) {
      case "function":
        return action(customDispatch);
      default:
        dispatch(action);
    }
  }
  return customDispatch;
}
var none = none$1;
var some = some$1;
var isNone = function(fa) {
  return fa._tag === "None";
};
var matchW = function(onNone, onSome) {
  return function(ma) {
    return isNone(ma) ? onNone() : onSome(ma.value);
  };
};
var match = matchW;
var fold = match;
class Option {
  constructor(delegate) {
    __publicField(this, "delegate");
    this.delegate = delegate;
  }
  defer(p, cont) {
    let result = fold(() => cont.receive(Terminal.value(none)), (p2) => new Then(this.delegate, new Fun((r) => some(r))).defer(p2, cont))(p);
    return result;
  }
}
class OptionM {
  constructor(delegate) {
    __publicField(this, "delegate");
    this.delegate = delegate;
  }
  defer(p, cont) {
    let result = fold(() => cont.receive(Terminal.value(none)), (p2) => this.delegate.defer(p2, cont))(p);
    return result;
  }
}
const _Fletcher = class _Fletcher {
  static Terminal() {
    return new Terminal((a) => {
      return a.apply(new Deferred_1());
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
    return _Fletcher.Fun1R((_) => r);
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
   * @return {*}  {Promise<Result<R>>}
   * @memberof Fletcher
   */
  static Resolve(self, input) {
    return resolve(self, input);
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
    return _Fletcher.Arrow().Pair(that).apply(self);
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
  static FlatMap(self, fn) {
    return _Fletcher.Arrow().FlatMap(fn).apply(self);
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
    return _Fletcher.Arrow().First().apply(self);
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
    return _Fletcher.Arrow().Second().apply(self);
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
    return _Fletcher.Arrow().Pinch(that).apply(self);
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
    return _Fletcher.Arrow().Joint(that).apply(self);
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
    return _Fletcher.Arrow().Bound(that).apply(self);
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
    return _Fletcher.Arrow().Broach().apply(self);
  }
  static Next(lhs, rhs) {
    return lhs.next(rhs);
  }
  static React(dispatch) {
    return react(useReducerWithThunk(dispatch));
  }
  static Dispatch(self) {
    return (r) => {
      self.defer(r, _Fletcher.Terminal()).submit();
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
    return _Fletcher.Anon((p, cont) => {
      const deferred = new Deferred_1();
      var complete = false;
      function handler(r) {
        if (!complete) {
          complete = true;
          deferred.resolve(r);
        }
      }
      const a = _Fletcher.Then(self, _Fletcher.Fun1R(handler));
      const b = _Fletcher.Then(self, _Fletcher.Fun1R(handler));
      return new Cycle(() => Promise.any([_Fletcher.Resolve(a, p), _Fletcher.Resolve(b, p)]).then((_) => deferred.promise.then((r) => cont.receive(Terminal.value(r)))));
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
    return _Fletcher.Anon((p, cont) => {
      if (before) {
        before(p);
      }
      return _Fletcher.Then(self, _Fletcher.Fun1R((r) => {
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
    return new Option(self);
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
    return _Fletcher.Fun1R((p) => {
      if (fn(p)) {
        return some(p);
      } else {
        return none;
      }
    });
  }
};
__publicField(_Fletcher, "Instances", {
  EventArrowlet,
  Anon,
  Fun,
  Option,
  OptionM,
  Then,
  Unit
});
__publicField(_Fletcher, "Core", {
  Terminal,
  Cycle
});
let Fletcher = _Fletcher;
export {
  Apply,
  Cycle,
  Fletcher,
  Terminal
};

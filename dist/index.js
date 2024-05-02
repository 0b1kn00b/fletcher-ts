var M = Object.defineProperty;
var k = (s, e, t) => e in s ? M(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var o = (s, e, t) => (k(s, typeof e != "symbol" ? e + "" : e, t), t);
var D = function() {
  function s() {
    var e = this;
    this.resolve = function(t) {
      e._resolve(t);
    }, this.reject = function(t) {
      e._reject(t);
    }, this._promise = new Promise(function(t, r) {
      e._resolve = t, e._reject = r;
    });
  }
  return Object.defineProperty(s.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: !0,
    configurable: !0
  }), s;
}(), g = D, R = function(s) {
  return s._tag === "Left";
}, z = function(s) {
  return { _tag: "Left", left: s };
}, $ = function(s) {
  return { _tag: "Right", right: s };
}, L = z, T = $, W = R, Z = function(s, e) {
  return function(t) {
    return W(t) ? s(t.left) : e(t.right);
  };
}, j = Z, q = j;
class a {
  constructor(e) {
    o(this, "_after", null);
    this._after = e;
  }
  get after() {
    return this._after == null ? null : this._after();
  }
  static Seq(e, t) {
    return new a(() => {
      let r = e == null ? void 0 : e.after;
      return r != null ? new Promise((n) => r.then((i) => a.Seq(i, t)).then(n)) : t == null ? void 0 : t.after;
    });
  }
  seq(e) {
    return a.Par(this, e);
  }
  par(e) {
    return a.Par(this, e);
  }
  submit() {
    return a.Submit(this);
  }
  static Submit(e) {
    let t = new g();
    if (e != null) {
      const r = e.after;
      r != null ? r.then((n) => {
        n != null ? a.Submit(n).then((i) => t.resolve(i), (i) => t.reject(i)) : t.resolve(null);
      }) : t.resolve(null);
    } else
      t.resolve(null);
    return t.promise;
  }
  static Par(e, t) {
    let r = e.after ?? Promise.resolve(a.Unit()), n = t.after ?? Promise.resolve(a.Unit()), i = Promise.all([r, n]);
    return a.Pure(i.then(([l, h]) => l != null && h != null ? a.Par(l, h) : l ?? h));
  }
  static Unit() {
    return new a(null);
  }
  static Pure(e) {
    return new a(() => e);
  }
}
class w {
  constructor(e) {
    o(this, "_apply");
    this._apply = e;
  }
  apply(e) {
    return this._apply(e);
  }
}
class N extends w {
}
class B extends N {
}
class v extends B {
  flat_fold(e, t) {
    return new v((r) => this.apply(new w((n) => {
      let l = n.then((p) => j(e, t)(p)).then((p) => p.apply(r));
      return new a(() => l);
    })));
  }
  handler(e, t) {
    return j((r) => e(r), (r) => {
      if (t)
        t(r);
      else
        throw t;
    });
  }
  zip(e) {
    return v.Zip(this, e);
  }
  static Zip(e, t) {
    return new v((r) => {
      var n = null, i = null;
      let l = e.apply(new w((p) => (n = p, a.Unit())));
      var h = t.apply(new w((p) => (i = p, a.Unit())));
      return l.par(h).seq(new a(() => {
        let p = n, S = i, F = p.then((y) => S.then((m) => ({ fst: y, snd: m }))).then((y) => q((m) => q((b) => L([m, b]), (b) => T(b))(y.snd), (m) => T(m))(y.fst)), J = r.apply(F);
        return new Promise((y) => y(J));
      }));
    });
  }
}
class c extends B {
  receive(e) {
    return e.apply(new w((t) => this.apply(new w((r) => {
      let n = t.then((i) => {
        r.resolve(i);
      });
      return new a(() => n.then((i) => a.Unit()));
    }))));
  }
  static later(e) {
    return new v((t) => t.apply(e));
  }
  static issue(e) {
    return new v(function(t) {
      let r = new Promise((n) => {
        n(e);
      });
      return t.apply(r);
    });
  }
  static value(e) {
    return c.issue(L(e));
  }
  static error(e) {
    return c.issue(T(e));
  }
  static Pure(e) {
    return new c((t) => t.apply(e));
  }
}
class P {
  constructor(e) {
    o(this, "_apply");
    this._apply = e;
  }
  defer(e, t) {
    return t.receive(c.value(this._apply(e)));
  }
}
class x {
  constructor(e) {
    o(this, "_defer");
    this._defer = e;
  }
  defer(e, t) {
    return this._defer(e, t);
  }
}
function d(s, e) {
  return new v((t) => {
    let r = new g(), n = s.defer(e, new c((l) => l.apply(r))), i = t.apply(r.promise);
    return a.Seq(n, i);
  });
}
function E(s, e) {
  let t = new g();
  return s.defer(e, c.Pure(t)).submit().then(() => t.promise.then((i) => i));
}
function O() {
  return new P((s) => null);
}
class G {
  constructor(e) {
    o(this, "_emiter");
    this._emiter = e;
  }
  defer(e, t) {
    let r = new g(), n = this, i = {
      handleEvent: function(l) {
        r.resolve(L(l)), n._emiter.removeEventListener(e, i);
      }
    };
    return this._emiter.addEventListener(e, i), t.receive(c.later(r.promise));
  }
}
class H {
  constructor(e, t) {
    o(this, "lhs");
    o(this, "rhs");
    this.lhs = e, this.rhs = t;
  }
  defer(e, t) {
    var r = d(this.lhs, e);
    return t.receive(r.flat_fold((n) => d(this.rhs, n), (n) => c.error(n)));
  }
}
class U extends P {
  constructor() {
    super((e) => e);
  }
}
class u {
  constructor(e) {
    o(this, "_apply");
    this._apply = e;
  }
  apply(e) {
    return this._apply(e);
  }
  /**
   * You liked arrows so much, we put arrows in your arrows.
   * @param that You
   * @returns
   */
  next(e) {
    return new u((t) => {
      let r = this.apply(t);
      return e.apply(r);
    });
  }
  static Make(e) {
    return new u(e);
  }
  static Unit() {
    return new u((e) => e);
  }
  static Pure(e) {
    return new u((t) => e);
  }
  static Then(e) {
    return new u((t) => new H(t, e));
  }
  then(e) {
    return this.next(u.Then(e));
  }
  static Pair(e) {
    return new u((t) => new x((r, n) => {
      let [i, l] = r, h = d(t, i), p = d(e, l);
      return n.receive(h.zip(p));
    }));
  }
  pair(e) {
    return this.next(u.Pair(e));
  }
  static Split(e) {
    return new u((t) => new x((r, n) => u.Pair(e).apply(t).defer([r, r], n)));
  }
  split(e) {
    return this.next(u.Split(e));
  }
  static FlatMap(e) {
    return new u((t) => new x((r, n) => n.receive(d(t, r).flat_fold((i) => d(e(i), r), (i) => c.error(i)))));
  }
  flat_map(e) {
    return this.next(u.FlatMap(e));
  }
  static First() {
    return new u((e) => {
      let t = u.Pure(new P((n) => n));
      return u.Pair(t.apply(e)).apply(e);
    });
  }
  first() {
    return this.next(u.First());
  }
  static Second() {
    return new u((e) => {
      let t = u.Pure(new P((n) => n));
      return u.Pair(e).apply(t.apply(e));
    });
  }
  second() {
    return this.next(u.Second());
  }
  static Pinch(e) {
    return new u((t) => new x((r, n) => n.receive(d(t, r).zip(d(e, r)))));
  }
  pinch(e) {
    return this.next(u.Pinch(e));
  }
  static Joint(e) {
    return new u((t) => u.Then(u.Pure(u.Split(e).apply(new U())).apply(new U())).apply(t));
  }
  joint(e) {
    return this.next(u.Joint(e));
  }
  static Bound(e) {
    return new u((t) => {
      let r = new U(), n = u.Then(e), i = u.Joint(t).apply(r);
      return n.apply(i);
    });
  }
  bound(e) {
    return this.next(u.Bound(e));
  }
  static Broach() {
    return new u((e) => {
      let t = new P((r) => r);
      return u.Bound(t).apply(e);
    });
  }
  broach() {
    return this.next(u.Broach());
  }
  resolve(e) {
    return E(this.apply(O()), e);
  }
  static Compose(e, t) {
    return t.next(e);
  }
  compose(e) {
    return u.Compose(this, e);
  }
}
function V(s) {
  function e(t) {
    switch (typeof t) {
      case "function":
        return t(e);
      default:
        s(t);
    }
  }
  return e;
}
class f {
  static Terminal() {
    return new c((e) => e.apply(new g()));
  }
  static Arrow() {
    return u;
  }
  static Fun1R(e) {
    return new P(e);
  }
  static Pure(e) {
    return f.Fun1R((t) => e);
  }
  static Anon(e) {
    return new x(e);
  }
  static Resolve(e, t) {
    return E(e, t);
  }
  static Forward(e, t) {
    return d(e, t);
  }
  static Event(e) {
    return new G(e);
  }
  static Then(e) {
    return f.Arrow().Then(e);
  }
  static Pair(e) {
    return f.Arrow().Pair(e);
  }
  static FlatMap(e) {
    return f.Arrow().FlatMap(e);
  }
  static First() {
    return f.Arrow().First();
  }
  static Second() {
    return f.Arrow().Second();
  }
  static Pinch(e) {
    return f.Arrow().Pinch(e);
  }
  static Joint(e) {
    return f.Arrow().Joint(e);
  }
  static Next(e, t) {
    return e.next(t);
  }
  static React(e, t, r) {
  }
}
export {
  f as Fletcher,
  V as useReducerWithThunk
};

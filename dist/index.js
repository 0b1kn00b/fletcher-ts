var M = Object.defineProperty;
var k = (i, e, t) => e in i ? M(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var o = (i, e, t) => (k(i, typeof e != "symbol" ? e + "" : e, t), t);
var z = function() {
  function i() {
    var e = this;
    this.resolve = function(t) {
      e._resolve(t);
    }, this.reject = function(t) {
      e._reject(t);
    }, this._promise = new Promise(function(t, r) {
      e._resolve = t, e._reject = r;
    });
  }
  return Object.defineProperty(i.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: !0,
    configurable: !0
  }), i;
}(), g = z, D = function(i) {
  return i._tag === "Left";
}, $ = function(i) {
  return { _tag: "Left", left: i };
}, R = function(i) {
  return { _tag: "Right", right: i };
}, L = $, T = R, Z = D, N = function(i, e) {
  return function(t) {
    return Z(t) ? i(t.left) : e(t.right);
  };
}, j = N, q = j;
class l {
  constructor(e) {
    o(this, "_after", null);
    this._after = e;
  }
  get after() {
    return this._after == null ? null : this._after();
  }
  static Seq(e, t) {
    return new l(() => {
      let r = e == null ? void 0 : e.after;
      return r != null ? new Promise((n) => r.then((s) => l.Seq(s, t)).then(n)) : t == null ? void 0 : t.after;
    });
  }
  seq(e) {
    return l.Par(this, e);
  }
  par(e) {
    return l.Par(this, e);
  }
  submit() {
    return l.Submit(this);
  }
  static Submit(e) {
    let t = new g();
    return setTimeout(() => {
      if (e != null) {
        const r = e.after;
        r != null ? r.then((n) => {
          n != null ? l.Submit(n).then((s) => t.resolve(s), (s) => t.reject(s)) : t.resolve(null);
        }) : t.resolve(null);
      } else
        t.resolve(null);
    }), t.promise;
  }
  static Par(e, t) {
    let r = e.after ?? Promise.resolve(l.Unit()), n = t.after ?? Promise.resolve(l.Unit()), s = Promise.all([r, n]);
    return l.Pure(s.then(([a, h]) => a != null && h != null ? l.Par(a, h) : a ?? h));
  }
  static Unit() {
    return new l(null);
  }
  static Pure(e) {
    return new l(() => e);
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
class O extends w {
}
class B extends O {
}
class v extends B {
  flat_fold(e, t) {
    return new v((r) => this.apply(new w((n) => {
      let a = n.then((p) => j(e, t)(p)).then((p) => p.apply(r));
      return new l(() => a);
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
      var n = null, s = null;
      let a = e.apply(new w((p) => (n = p, l.Unit())));
      var h = t.apply(new w((p) => (s = p, l.Unit())));
      return a.par(h).seq(new l(() => {
        let p = n, S = s, F = p.then((y) => S.then((m) => ({ fst: y, snd: m }))).then((y) => q((m) => q((b) => L([m, b]), (b) => T(b))(y.snd), (m) => T(m))(y.fst)), J = r.apply(F);
        return new Promise((y) => y(J));
      }));
    });
  }
}
class c extends B {
  receive(e) {
    return e.apply(new w((t) => this.apply(new w((r) => {
      let n = t.then((s) => {
        r.resolve(s);
      });
      return new l(() => n.then((s) => l.Unit()));
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
function d(i, e) {
  return new v((t) => {
    let r = new g(), n = i.defer(e, new c((a) => a.apply(r))), s = t.apply(r.promise);
    return l.Seq(n, s);
  });
}
function E(i, e) {
  let t = new g();
  return i.defer(e, c.Pure(t)).submit().then(() => t.promise.then((s) => s));
}
function W() {
  return new P((i) => null);
}
class G {
  constructor(e) {
    o(this, "_emiter");
    this._emiter = e;
  }
  defer(e, t) {
    let r = new g(), n = this, s = {
      handleEvent: function(a) {
        r.resolve(L(a)), n._emiter.removeEventListener(e, s);
      }
    };
    return this._emiter.addEventListener(e, s), t.receive(c.later(r.promise));
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
      let [s, a] = r, h = d(t, s), p = d(e, a);
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
    return new u((t) => new x((r, n) => n.receive(d(t, r).flat_fold((s) => d(e(s), r), (s) => c.error(s)))));
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
      let r = new U(), n = u.Then(e), s = u.Joint(t).apply(r);
      return n.apply(s);
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
    return E(this.apply(W()), e);
  }
  static Compose(e, t) {
    return t.next(e);
  }
  compose(e) {
    return u.Compose(this, e);
  }
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
}
export {
  f as Fletcher
};

var id = Object.defineProperty;
var cd = (t, e, n) => e in t ? id(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var f = (t, e, n) => (cd(t, typeof e != "symbol" ? e + "" : e, n), n), Hc = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var Jc = (t, e, n) => (Hc(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Wc = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, Gc = (t, e, n, r) => (Hc(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var ad = function() {
  function t() {
    var e = this;
    this.resolve = function(n) {
      e._resolve(n);
    }, this.reject = function(n) {
      e._reject(n);
    }, this._promise = new Promise(function(n, r) {
      e._resolve = n, e._reject = r;
    });
  }
  return Object.defineProperty(t.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: !0,
    configurable: !0
  }), t;
}(), Kt = ad;
let en = class {
  constructor(e) {
    f(this, "_defer");
    this._defer = e;
  }
  defer(e, n) {
    return this._defer(e, n);
  }
}, ud = class {
  constructor(e) {
    this.deferred = e;
  }
  defer(e, n) {
    let r = new Kt();
    return this.deferred(
      e,
      (s) => {
        r.resolve(s);
      }
    ), _e.fromPromise(r.promise.then((s) => _e.ZERO));
  }
};
var ld = { _tag: "None" }, fd = function(t) {
  return { _tag: "Some", value: t };
};
class hd {
  constructor(e) {
    f(this, "event_name");
    this.event_name = e;
  }
  defer(e, n) {
    let r = !1, s = new Kt(), o = {
      handleEvent: function(a) {
        s.resolve(a), r = !0, e.removeEventListener(this.event_name, o);
      }
    };
    e.addEventListener(
      this.event_name,
      o
    );
    let c = _e.fromThunk(
      () => (r || e.removeEventListener(this.event_name, o), null)
    );
    return _e.Seq(n.receive(Pe.later(s.promise)), c);
  }
}
class nn {
  constructor(e) {
    f(this, "_apply");
    this._apply = e;
  }
  defer(e, n) {
    return n.receive(Pe.issue(this._apply(e)));
  }
}
var Xo = ld, Xa = fd, dd = function(t) {
  return t._tag === "None";
}, pd = function(t, e) {
  return function(n) {
    return dd(n) ? t() : e(n.value);
  };
}, gd = pd, Za = gd;
let md = class {
  constructor(e) {
    f(this, "delegate");
    this.delegate = e;
  }
  defer(e, n) {
    return Za(
      () => n.receive(Pe.issue(Xo)),
      (s) => new Zo(this.delegate, new nn((o) => Xa(o))).defer(s, n)
    )(e);
  }
}, _d = class {
  constructor(e) {
    f(this, "delegate");
    this.delegate = e;
  }
  defer(e, n) {
    return Za(
      () => n.receive(Pe.issue(Xo)),
      (s) => this.delegate.defer(s, n)
    )(e);
  }
}, yd = class {
  constructor(e) {
    this.deferred = e;
  }
  defer(e, n) {
    return n.receive(this.deferred);
  }
}, Zo = class {
  constructor(e, n) {
    f(this, "lhs");
    f(this, "rhs");
    this.lhs = e, this.rhs = n;
  }
  defer(e, n) {
    var r = it(this.lhs, e);
    return n.receive(
      r.flat_fold(
        (s) => it(this.rhs, s)
      )
    );
  }
}, Nr = class extends nn {
  constructor() {
    super((e) => e);
  }
};
function it(t, e) {
  return new Mt(
    (n) => {
      let r = new Kt(), s = t.defer(
        e,
        new Pe(
          (c) => c.apply(r)
        )
      ), o = n.apply(r.promise);
      return _e.Seq(s, o);
    }
  );
}
function bd(t, e) {
  let n = new Kt(), r = t.defer(
    e,
    Pe.Pure(n)
  );
  return _e.Promise(r).then(
    (o) => n.promise.then(
      (c) => c
    )
  );
}
const vd = (t) => typeof t == "function", g = function(t, e) {
  if (typeof t == "function")
    return function() {
      return t(arguments) ? e.apply(this, arguments) : (n) => e(n, ...arguments);
    };
  switch (t) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${t}`);
    case 2:
      return function(n, r) {
        return arguments.length >= 2 ? e(n, r) : function(s) {
          return e(s, n);
        };
      };
    case 3:
      return function(n, r, s) {
        return arguments.length >= 3 ? e(n, r, s) : function(o) {
          return e(o, n, r);
        };
      };
    case 4:
      return function(n, r, s, o) {
        return arguments.length >= 4 ? e(n, r, s, o) : function(c) {
          return e(c, n, r, s);
        };
      };
    case 5:
      return function(n, r, s, o, c) {
        return arguments.length >= 5 ? e(n, r, s, o, c) : function(a) {
          return e(a, n, r, s, o);
        };
      };
    default:
      return function() {
        if (arguments.length >= t)
          return e.apply(this, arguments);
        const n = arguments;
        return function(r) {
          return e(r, ...n);
        };
      };
  }
}, Ve = (t) => t, ds = (t) => () => t, zc = /* @__PURE__ */ ds(!0), ho = /* @__PURE__ */ ds(!1), Sd = /* @__PURE__ */ ds(void 0);
function m(t, e, n, r, s, o, c, a, u) {
  switch (arguments.length) {
    case 1:
      return t;
    case 2:
      return e(t);
    case 3:
      return n(e(t));
    case 4:
      return r(n(e(t)));
    case 5:
      return s(r(n(e(t))));
    case 6:
      return o(s(r(n(e(t)))));
    case 7:
      return c(o(s(r(n(e(t))))));
    case 8:
      return a(c(o(s(r(n(e(t)))))));
    case 9:
      return u(a(c(o(s(r(n(e(t))))))));
    default: {
      let h = arguments[0];
      for (let b = 1; b < arguments.length; b++)
        h = arguments[b](h);
      return h;
    }
  }
}
const ei = (t) => (e, n) => e === n || t(e, n), wd = /* @__PURE__ */ g(2, (t, e) => ei((n, r) => t(e(n), e(r)))), kd = (t) => ei((e, n) => {
  if (e.length !== n.length)
    return !1;
  for (let r = 0; r < e.length; r++)
    if (!t(e[r], n[r]))
      return !1;
  return !0;
});
let Ed = "3.2.1";
const Jr = () => Ed, po = /* @__PURE__ */ Symbol.for(`effect/GlobalValue/globalStoreId/${/* @__PURE__ */ Jr()}`);
po in globalThis || (globalThis[po] = /* @__PURE__ */ new Map());
const Gs = globalThis[po], Q = (t, e) => (Gs.has(t) || Gs.set(t, e()), Gs.get(t)), eu = (t) => typeof t == "string", xr = (t) => typeof t == "number", Od = (t) => typeof t == "bigint", ps = vd, Rd = (t) => typeof t == "object" && t !== null, ti = (t) => Rd(t) || ps(t), D = /* @__PURE__ */ g(2, (t, e) => ti(t) && e in t), tu = /* @__PURE__ */ g(2, (t, e) => D(t, "_tag") && t._tag === e), Yt = (t) => t == null, Id = (t) => D(t, "then") && ps(t.then), ni = (t) => `BUG: ${t} - please report an issue at https://github.com/Effect-TS/effect/issues`;
let Cd = class nu {
  constructor(e) {
    f(this, "self");
    f(this, "called", !1);
    this.self = e;
  }
  /**
   * @since 2.0.0
   */
  next(e) {
    return this.called ? {
      value: e,
      done: !0
    } : (this.called = !0, {
      value: this.self,
      done: !1
    });
  }
  /**
   * @since 2.0.0
   */
  return(e) {
    return {
      value: e,
      done: !0
    };
  }
  /**
   * @since 2.0.0
   */
  throw(e) {
    throw e;
  }
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new nu(this.self);
  }
};
const Td = 335903614, $d = 4150755663, Fd = 1481765933, Ad = 1284865837, Md = 9007199254740992, Pd = 134217728;
class ru {
  constructor(e, n, r, s) {
    f(this, "_state");
    return Yt(n) && Yt(e) ? (n = Math.random() * 4294967295 >>> 0, e = 0) : Yt(n) && (n = e, e = 0), Yt(s) && Yt(r) ? (s = this._state ? this._state[3] : $d, r = this._state ? this._state[2] : Td) : Yt(s) && (s = r, r = 0), this._state = new Int32Array([0, 0, r >>> 0, ((s || 0) | 1) >>> 0]), this._next(), Yc(this._state, this._state[0], this._state[1], e >>> 0, n >>> 0), this._next(), this;
  }
  /**
   * Returns a copy of the internal state of this random number generator as a
   * JavaScript Array.
   *
   * @category getters
   * @since 2.0.0
   */
  getState() {
    return [this._state[0], this._state[1], this._state[2], this._state[3]];
  }
  /**
   * Restore state previously retrieved using `getState()`.
   *
   * @since 2.0.0
   */
  setState(e) {
    this._state[0] = e[0], this._state[1] = e[1], this._state[2] = e[2], this._state[3] = e[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 2.0.0
   */
  integer(e) {
    if (!e)
      return this._next();
    if (e = e >>> 0, !(e & e - 1))
      return this._next() & e - 1;
    let n = 0;
    const r = (-e >>> 0) % e >>> 0;
    for (n = this._next(); n < r; n = this._next())
      ;
    return n % e;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 2.0.0
   */
  number() {
    const e = (this._next() & 67108863) * 1, n = (this._next() & 134217727) * 1;
    return (e * Pd + n) / Md;
  }
  /** @internal */
  _next() {
    const e = this._state[0] >>> 0, n = this._state[1] >>> 0;
    Nd(this._state, e, n, Fd, Ad), Yc(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let r = e >>> 18, s = (n >>> 18 | e << 14) >>> 0;
    r = (r ^ e) >>> 0, s = (s ^ n) >>> 0;
    const o = (s >>> 27 | r << 5) >>> 0, c = e >>> 27, a = (-c >>> 0 & 31) >>> 0;
    return (o >>> c | o << a) >>> 0;
  }
}
function Nd(t, e, n, r, s) {
  let o = (n >>> 16) * (s & 65535) >>> 0, c = (n & 65535) * (s >>> 16) >>> 0, a = (n & 65535) * (s & 65535) >>> 0, u = (n >>> 16) * (s >>> 16) + ((c >>> 16) + (o >>> 16)) >>> 0;
  c = c << 16 >>> 0, a = a + c >>> 0, a >>> 0 < c >>> 0 && (u = u + 1 >>> 0), o = o << 16 >>> 0, a = a + o >>> 0, a >>> 0 < o >>> 0 && (u = u + 1 >>> 0), u = u + Math.imul(n, r) >>> 0, u = u + Math.imul(e, s) >>> 0, t[0] = u, t[1] = a;
}
function Yc(t, e, n, r, s) {
  let o = e + r >>> 0;
  const c = n + s >>> 0;
  c >>> 0 < n >>> 0 && (o = o + 1 | 0), t[0] = o, t[1] = c;
}
const xd = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
var rr;
class gs {
  constructor(e) {
    /**
     * @since 3.0.6
     */
    Wc(this, rr, void 0);
    Gc(this, rr, e);
  }
  /**
   * @since 3.0.6
   */
  [xd]() {
    return Jc(this, rr);
  }
}
rr = new WeakMap();
const Ge = /* @__PURE__ */ Q("effect/Utils/isStructuralRegion", () => ({
  enabled: !1,
  tester: void 0
})), zs = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap()), jd = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Hash/pcgr"), () => new ru()), j = /* @__PURE__ */ Symbol.for("effect/Hash"), I = (t) => {
  if (Ge.enabled === !0)
    return 0;
  switch (typeof t) {
    case "number":
      return si(t);
    case "bigint":
      return me(t.toString(10));
    case "boolean":
      return me(String(t));
    case "symbol":
      return me(String(t));
    case "string":
      return me(t);
    case "undefined":
      return me("undefined");
    case "function":
    case "object":
      return t === null ? me("null") : Ld(t) ? t[j]() : ri(t);
    default:
      throw new Error(`BUG: unhandled typeof ${typeof t} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
}, ri = (t) => (zs.has(t) || zs.set(t, si(jd.integer(Number.MAX_SAFE_INTEGER))), zs.get(t)), K = (t) => (e) => e * 53 ^ t, ms = (t) => t & 3221225471 | t >>> 1 & 1073741824, Ld = (t) => D(t, j), si = (t) => {
  if (t !== t || t === 1 / 0)
    return 0;
  let e = t | 0;
  for (e !== t && (e ^= t * 4294967295); t > 4294967295; )
    e ^= t /= 4294967295;
  return ms(t);
}, me = (t) => {
  let e = 5381, n = t.length;
  for (; n; )
    e = e * 33 ^ t.charCodeAt(--n);
  return ms(e);
}, Dd = (t, e) => {
  let n = 12289;
  for (let r = 0; r < e.length; r++)
    n ^= m(me(e[r]), K(I(t[e[r]])));
  return ms(n);
}, su = (t) => Dd(t, Object.keys(t)), sr = (t) => {
  let e = 6151;
  for (let n = 0; n < t.length; n++)
    e = m(e, K(I(t[n])));
  return ms(e);
}, ue = function() {
  if (arguments.length === 1) {
    const n = arguments[0];
    return function(r) {
      return Object.defineProperty(n, j, {
        value() {
          return r;
        },
        enumerable: !1
      }), r;
    };
  }
  const t = arguments[0], e = arguments[1];
  return Object.defineProperty(t, j, {
    value() {
      return e;
    },
    enumerable: !1
  }), e;
}, P = /* @__PURE__ */ Symbol.for("effect/Equal");
function N() {
  return arguments.length === 1 ? (t) => Wr(t, arguments[0]) : Wr(arguments[0], arguments[1]);
}
function Wr(t, e) {
  if (t === e)
    return !0;
  const n = typeof t;
  if (n !== typeof e)
    return !1;
  if (n === "object" || n === "function") {
    if (t !== null && e !== null && Gr(t) && Gr(e))
      return I(t) === I(e) && t[P](e) ? !0 : Ge.enabled && Ge.tester ? Ge.tester(t, e) : !1;
    if (Ge.enabled) {
      if (Array.isArray(t) && Array.isArray(e))
        return t.length === e.length && t.every((r, s) => Wr(r, e[s]));
      if (Object.getPrototypeOf(t) === Object.prototype && Object.getPrototypeOf(t) === Object.prototype) {
        const r = Object.keys(t), s = Object.keys(e);
        if (r.length === s.length) {
          for (const o of r)
            if (!(o in e && Wr(t[o], e[o])))
              return Ge.tester ? Ge.tester(t, e) : !1;
          return !0;
        }
      }
      return Ge.tester ? Ge.tester(t, e) : !1;
    }
  }
  return Ge.enabled && Ge.tester ? Ge.tester(t, e) : !1;
}
const Gr = (t) => D(t, P), oi = () => N, he = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), ye = (t) => D(t, "toJSON") && ps(t.toJSON) && t.toJSON.length === 0 ? t.toJSON() : Array.isArray(t) ? t.map(ye) : t, Ie = (t) => JSON.stringify(t, null, 2), qn = (t, e = 2) => {
  try {
    return typeof t == "object" ? Ud(t, e) : String(t);
  } catch {
    return String(t);
  }
}, Ud = (t, e) => {
  let n = [];
  const r = JSON.stringify(t, (s, o) => typeof o == "object" && o !== null ? n.includes(o) ? void 0 : n.push(o) && o : o, e);
  return n = void 0, r;
}, A = (t, e) => {
  switch (e.length) {
    case 1:
      return e[0](t);
    case 2:
      return e[1](e[0](t));
    case 3:
      return e[2](e[1](e[0](t)));
    case 4:
      return e[3](e[2](e[1](e[0](t))));
    case 5:
      return e[4](e[3](e[2](e[1](e[0](t)))));
    case 6:
      return e[5](e[4](e[3](e[2](e[1](e[0](t))))));
    case 7:
      return e[6](e[5](e[4](e[3](e[2](e[1](e[0](t)))))));
    case 8:
      return e[7](e[6](e[5](e[4](e[3](e[2](e[1](e[0](t))))))));
    case 9:
      return e[8](e[7](e[6](e[5](e[4](e[3](e[2](e[1](e[0](t)))))))));
    default: {
      let n = t;
      for (let r = 0, s = e.length; r < s; r++)
        n = e[r](n);
      return n;
    }
  }
}, jr = "Async", ii = "Commit", je = "Failure", Ys = "OnFailure", zr = "OnSuccess", Yr = "OnSuccessAndFailure", Le = "Success", ou = "Sync", qd = "Tag", or = "UpdateRuntimeFlags", Qr = "While", iu = "WithRuntime", Lr = "Yield", ci = "RevertFlags", cu = /* @__PURE__ */ Symbol.for("effect/Effect"), Bd = /* @__PURE__ */ Symbol.for("effect/Stream"), Vd = /* @__PURE__ */ Symbol.for("effect/Sink"), Kd = /* @__PURE__ */ Symbol.for("effect/Channel"), an = {
  /* c8 ignore next */
  _R: (t) => t,
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _A: (t) => t,
  _V: /* @__PURE__ */ Jr()
}, Hd = {
  /* c8 ignore next */
  _A: (t) => t,
  /* c8 ignore next */
  _In: (t) => t,
  /* c8 ignore next */
  _L: (t) => t,
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _R: (t) => t
}, Jd = {
  /* c8 ignore next */
  _Env: (t) => t,
  /* c8 ignore next */
  _InErr: (t) => t,
  /* c8 ignore next */
  _InElem: (t) => t,
  /* c8 ignore next */
  _InDone: (t) => t,
  /* c8 ignore next */
  _OutErr: (t) => t,
  /* c8 ignore next */
  _OutElem: (t) => t,
  /* c8 ignore next */
  _OutDone: (t) => t
}, _s = {
  [cu]: an,
  [Bd]: an,
  [Vd]: Hd,
  [Kd]: Jd,
  [P](t) {
    return this === t;
  },
  [j]() {
    return ue(this, ri(this));
  },
  [Symbol.iterator]() {
    return new Cd(new gs(this));
  },
  pipe() {
    return A(this, arguments);
  }
}, ai = {
  [j]() {
    return ue(this, su(this));
  },
  [P](t) {
    const e = Object.keys(this), n = Object.keys(t);
    if (e.length !== n.length)
      return !1;
    for (const r of e)
      if (!(r in t && N(this[r], t[r])))
        return !1;
    return !0;
  }
}, Wd = {
  ..._s,
  _op: ii
}, Gd = {
  ...Wd,
  ...ai
}, au = /* @__PURE__ */ Symbol.for("effect/Option"), uu = {
  ..._s,
  [au]: {
    _A: (t) => t
  },
  [he]() {
    return this.toJSON();
  },
  toString() {
    return Ie(this.toJSON());
  }
}, zd = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(uu), {
  _tag: "Some",
  _op: "Some",
  [P](t) {
    return lu(t) && hu(t) && N(this.value, t.value);
  },
  [j]() {
    return ue(this, K(I(this._tag))(I(this.value)));
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag,
      value: ye(this.value)
    };
  }
}), Yd = /* @__PURE__ */ I("None"), Qd = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(uu), {
  _tag: "None",
  _op: "None",
  [P](t) {
    return lu(t) && fu(t);
  },
  [j]() {
    return Yd;
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag
    };
  }
}), lu = (t) => D(t, au), fu = (t) => t._tag === "None", hu = (t) => t._tag === "Some", du = /* @__PURE__ */ Object.create(Qd), pu = (t) => {
  const e = Object.create(zd);
  return e.value = t, e;
}, gu = /* @__PURE__ */ Symbol.for("effect/Either"), mu = {
  ..._s,
  [gu]: {
    _R: (t) => t
  },
  [he]() {
    return this.toJSON();
  },
  toString() {
    return Ie(this.toJSON());
  }
}, Xd = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(mu), {
  _tag: "Right",
  _op: "Right",
  [P](t) {
    return _u(t) && bu(t) && N(this.right, t.right);
  },
  [j]() {
    return K(I(this._tag))(I(this.right));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      right: ye(this.right)
    };
  }
}), Zd = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(mu), {
  _tag: "Left",
  _op: "Left",
  [P](t) {
    return _u(t) && yu(t) && N(this.left, t.left);
  },
  [j]() {
    return K(I(this._tag))(I(this.left));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      left: ye(this.left)
    };
  }
}), _u = (t) => D(t, gu), yu = (t) => t._tag === "Left", bu = (t) => t._tag === "Right", ep = (t) => {
  const e = Object.create(Zd);
  return e.left = t, e;
}, tp = (t) => {
  const e = Object.create(Xd);
  return e.right = t, e;
}, at = tp, Pt = ep, Dn = yu, $r = bu, vu = /* @__PURE__ */ g(2, (t, {
  onLeft: e,
  onRight: n
}) => Dn(t) ? e(t.left) : n(t.right)), np = /* @__PURE__ */ vu({
  onLeft: Ve,
  onRight: Ve
}), Su = (t) => t.length > 0, wu = (t) => (e, n) => e === n ? 0 : t(e, n), rp = /* @__PURE__ */ wu((t, e) => t < e ? -1 : 1), sp = /* @__PURE__ */ g(2, (t, e) => wu((n, r) => t(e(n), e(r)))), op = (t) => g(2, (e, n) => t(e, n) === 1), M = () => du, H = pu, De = fu, nt = hu, ui = /* @__PURE__ */ g(2, (t, {
  onNone: e,
  onSome: n
}) => De(t) ? e() : n(t.value)), Nt = /* @__PURE__ */ g(2, (t, e) => De(t) ? e() : t.value), ip = /* @__PURE__ */ g(2, (t, e) => De(t) ? H(e()) : t), li = (t) => t == null ? M() : H(t), Rt = /* @__PURE__ */ Nt(Sd), cp = /* @__PURE__ */ g(2, (t, e) => {
  if (nt(t))
    return t.value;
  throw e();
}), ap = /* @__PURE__ */ cp(() => new Error("getOrThrow called on a None")), ku = /* @__PURE__ */ g(2, (t, e) => De(t) ? M() : H(e(t.value))), Eu = /* @__PURE__ */ g(2, (t, e) => De(t) ? M() : e(t.value)), up = (t) => g(2, (e, n) => De(e) ? !1 : t(e.value, n)), lp = /* @__PURE__ */ oi(), fp = /* @__PURE__ */ up(lp), hp = (...t) => t, fi = (t) => new Array(t), dp = (t, e) => {
  const n = Math.max(1, Math.floor(t)), r = new Array(n);
  for (let s = 0; s < n; s++)
    r[s] = e(s);
  return r;
}, Se = (t) => Array.isArray(t) ? t : Array.from(t), Xr = /* @__PURE__ */ g(2, (t, e) => [e, ...t]), pp = /* @__PURE__ */ g(2, (t, e) => [...t, e]), Ou = /* @__PURE__ */ g(2, (t, e) => Se(t).concat(Se(e))), gp = (t) => t.length === 0, mp = gp, _p = Su, He = Su, Ru = (t, e) => t < 0 || t >= e.length, yp = (t, e) => Math.floor(Math.min(Math.max(0, t), e.length)), bp = /* @__PURE__ */ g(2, (t, e) => {
  const n = Math.floor(e);
  return Ru(n, t) ? M() : H(t[n]);
}), Iu = /* @__PURE__ */ g(2, (t, e) => {
  const n = Math.floor(e);
  if (Ru(n, t))
    throw new Error(`Index ${n} out of bounds`);
  return t[n];
}), Bn = /* @__PURE__ */ bp(0), Ke = /* @__PURE__ */ Iu(0), vp = (t) => He(t) ? H(Cu(t)) : M(), Cu = (t) => t[t.length - 1], un = (t) => t.slice(1), Sp = (t, e) => {
  let n = 0;
  for (const r of t) {
    if (!e(r, n))
      break;
    n++;
  }
  return n;
}, wp = /* @__PURE__ */ g(2, (t, e) => Rp(t, Sp(t, e))), kp = /* @__PURE__ */ g(2, (t, e) => {
  const n = Se(t);
  return n.slice(yp(e, n), n.length);
}), Qc = (t) => Array.from(t).reverse(), Zr = /* @__PURE__ */ g(2, (t, e) => {
  const n = Array.from(t);
  return n.sort(e), n;
}), Xc = /* @__PURE__ */ g(2, (t, e) => Ep(t, e, hp)), Ep = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = Se(t), s = Se(e);
  if (He(r) && He(s)) {
    const o = [n(Ke(r), Ke(s))], c = Math.min(r.length, s.length);
    for (let a = 1; a < c; a++)
      o[a] = n(r[a], s[a]);
    return o;
  }
  return [];
}), Op = /* @__PURE__ */ oi(), Rp = /* @__PURE__ */ g(2, (t, e) => {
  const n = Array.from(t), r = Math.floor(e);
  return He(n) ? r >= 1 ? Ip(n, r) : [[], n] : [n, []];
}), Ip = /* @__PURE__ */ g(2, (t, e) => {
  const n = Math.max(1, Math.floor(e));
  return n >= t.length ? [Cp(t), []] : [Xr(t.slice(1, n), Ke(t)), t.slice(n)];
}), Cp = (t) => t.slice(), Tp = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = Se(t), s = Se(e);
  return He(r) ? He(s) ? Tu(n)(Ou(r, s)) : r : s;
}), go = /* @__PURE__ */ g(2, (t, e) => Tp(t, e, Op)), ln = () => [], Xe = (t) => [t], rn = /* @__PURE__ */ g(2, (t, e) => t.map(e)), $p = /* @__PURE__ */ g(2, (t, e) => {
  if (mp(t))
    return [];
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = e(t[r], r);
    for (let o = 0; o < s.length; o++)
      n.push(s[o]);
  }
  return n;
}), Fp = /* @__PURE__ */ $p(Ve), Wn = /* @__PURE__ */ g(3, (t, e, n) => Se(t).reduce((r, s, o) => n(r, s, o), e)), Zc = (t, e) => {
  const n = [];
  let r = t, s;
  for (; nt(s = e(r)); ) {
    const [o, c] = s.value;
    n.push(o), r = c;
  }
  return n;
}, hi = kd, Tu = /* @__PURE__ */ g(2, (t, e) => {
  const n = Se(t);
  if (He(n)) {
    const r = [Ke(n)], s = un(n);
    for (const o of s)
      r.every((c) => !e(o, c)) && r.push(o);
    return r;
  }
  return [];
}), Ap = (t) => Tu(t, oi()), Sn = /* @__PURE__ */ g(2, (t, e) => Se(t).join(e)), Mp = /* @__PURE__ */ Symbol.for("effect/Context/Tag"), Pp = "effect/STM", Np = /* @__PURE__ */ Symbol.for(Pp), xp = {
  ..._s,
  _tag: "Tag",
  _op: "Tag",
  [Np]: an,
  [Mp]: {
    _Service: (t) => t,
    _Identifier: (t) => t
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Tag",
      key: this.key,
      stack: this.stack
    };
  },
  [he]() {
    return this.toJSON();
  },
  of(t) {
    return t;
  },
  context(t) {
    return Vp(this, t);
  }
}, jp = (t) => {
  const e = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const n = new Error();
  Error.stackTraceLimit = e;
  const r = Object.create(xp);
  return Object.defineProperty(r, "stack", {
    get() {
      return n.stack;
    }
  }), r.key = t, r;
}, $u = /* @__PURE__ */ Symbol.for("effect/Context"), Lp = {
  [$u]: {
    _Services: (t) => t
  },
  [P](t) {
    if (Up(t) && this.unsafeMap.size === t.unsafeMap.size) {
      for (const e of this.unsafeMap.keys())
        if (!t.unsafeMap.has(e) || !N(this.unsafeMap.get(e), t.unsafeMap.get(e)))
          return !1;
      return !0;
    }
    return !1;
  },
  [j]() {
    return ue(this, si(this.unsafeMap.size));
  },
  pipe() {
    return A(this, arguments);
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Context",
      services: Array.from(this.unsafeMap).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  }
}, Gn = (t) => {
  const e = Object.create(Lp);
  return e.unsafeMap = t, e;
}, Dp = (t) => {
  const e = new Error(`Service not found${t.key ? `: ${String(t.key)}` : ""}`);
  if (t.stack) {
    const n = t.stack.split(`
`);
    if (n.length > 2) {
      const r = n[2].match(/at (.*)/);
      r && (e.message = e.message + ` (defined at ${r[1]})`);
    }
  }
  if (e.stack) {
    const n = e.stack.split(`
`);
    n.splice(1, 3), e.stack = n.join(`
`);
  }
  return e;
}, Up = (t) => D(t, $u), qp = /* @__PURE__ */ Gn(/* @__PURE__ */ new Map()), Bp = () => qp, Vp = (t, e) => Gn(/* @__PURE__ */ new Map([[t.key, e]])), Kp = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = new Map(t.unsafeMap);
  return r.set(e.key, n), Gn(r);
}), Fu = /* @__PURE__ */ g(2, (t, e) => {
  if (!t.unsafeMap.has(e.key))
    throw Dp(e);
  return t.unsafeMap.get(e.key);
}), Hp = Fu, Jp = /* @__PURE__ */ g(2, (t, e) => t.unsafeMap.has(e.key) ? pu(t.unsafeMap.get(e.key)) : du), wn = jp, di = Bp, Pn = Kp, Vn = Hp, Wp = Fu, Gp = Jp, Au = /* @__PURE__ */ Symbol.for("effect/Chunk");
function zp(t, e, n, r, s) {
  for (let o = e; o < Math.min(t.length, e + s); o++)
    n[r + o - e] = t[o];
  return n;
}
const Mu = [], Yp = (t) => ei((e, n) => e.length === n.length && Ft(e).every((r, s) => t(r, sn(n, s)))), Qp = /* @__PURE__ */ Yp(N), Xp = {
  [Au]: {
    _A: (t) => t
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Chunk",
      values: Ft(this).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  },
  [P](t) {
    return Pu(t) && Qp(this, t);
  },
  [j]() {
    return ue(this, sr(Ft(this)));
  },
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray":
        return this.backing.array[Symbol.iterator]();
      case "IEmpty":
        return Mu[Symbol.iterator]();
      default:
        return Ft(this)[Symbol.iterator]();
    }
  },
  pipe() {
    return A(this, arguments);
  }
}, fe = (t) => {
  const e = Object.create(Xp);
  switch (e.backing = t, t._tag) {
    case "IEmpty": {
      e.length = 0, e.depth = 0, e.left = e, e.right = e;
      break;
    }
    case "IConcat": {
      e.length = t.left.length + t.right.length, e.depth = 1 + Math.max(t.left.depth, t.right.depth), e.left = t.left, e.right = t.right;
      break;
    }
    case "IArray": {
      e.length = t.array.length, e.depth = 0, e.left = ct, e.right = ct;
      break;
    }
    case "ISingleton": {
      e.length = 1, e.depth = 0, e.left = ct, e.right = ct;
      break;
    }
    case "ISlice": {
      e.length = t.length, e.depth = t.chunk.depth + 1, e.left = ct, e.right = ct;
      break;
    }
  }
  return e;
}, Pu = (t) => D(t, Au), ct = /* @__PURE__ */ fe({
  _tag: "IEmpty"
}), vt = () => ct, Qs = (...t) => t.length === 1 ? Je(t[0]) : Zp(t), Je = (t) => fe({
  _tag: "ISingleton",
  a: t
}), ys = (t) => Pu(t) ? t : fe({
  _tag: "IArray",
  array: Se(t)
}), mo = (t, e, n) => {
  switch (t.backing._tag) {
    case "IArray": {
      zp(t.backing.array, 0, e, n, t.length);
      break;
    }
    case "IConcat": {
      mo(t.left, e, n), mo(t.right, e, n + t.left.length);
      break;
    }
    case "ISingleton": {
      e[n] = t.backing.a;
      break;
    }
    case "ISlice": {
      let r = 0, s = n;
      for (; r < t.length; )
        e[s] = sn(t, r), r += 1, s += 1;
      break;
    }
  }
}, Ft = (t) => {
  switch (t.backing._tag) {
    case "IEmpty":
      return Mu;
    case "IArray":
      return t.backing.array;
    default: {
      const e = new Array(t.length);
      return mo(t, e, 0), t.backing = {
        _tag: "IArray",
        array: e
      }, t.left = ct, t.right = ct, t.depth = 0, e;
    }
  }
}, fn = (t) => {
  switch (t.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return t;
    case "IArray":
      return fe({
        _tag: "IArray",
        array: Qc(t.backing.array)
      });
    case "IConcat":
      return fe({
        _tag: "IConcat",
        left: fn(t.backing.right),
        right: fn(t.backing.left)
      });
    case "ISlice":
      return bs(Qc(Ft(t)));
  }
}, bs = (t) => fe({
  _tag: "IArray",
  array: t
}), Zp = (t) => bs(t), sn = /* @__PURE__ */ g(2, (t, e) => {
  switch (t.backing._tag) {
    case "IEmpty":
      throw new Error("Index out of bounds");
    case "ISingleton": {
      if (e !== 0)
        throw new Error("Index out of bounds");
      return t.backing.a;
    }
    case "IArray": {
      if (e >= t.length || e < 0)
        throw new Error("Index out of bounds");
      return t.backing.array[e];
    }
    case "IConcat":
      return e < t.left.length ? sn(t.left, e) : sn(t.right, e - t.left.length);
    case "ISlice":
      return sn(t.backing.chunk, e + t.backing.offset);
  }
}), eg = /* @__PURE__ */ g(2, (t, e) => Ze(t, Je(e))), Ye = /* @__PURE__ */ g(2, (t, e) => Ze(Je(e), t)), _o = /* @__PURE__ */ g(2, (t, e) => {
  if (e <= 0)
    return t;
  if (e >= t.length)
    return ct;
  switch (t.backing._tag) {
    case "ISlice":
      return fe({
        _tag: "ISlice",
        chunk: t.backing.chunk,
        offset: t.backing.offset + e,
        length: t.backing.length - e
      });
    case "IConcat":
      return e > t.left.length ? _o(t.right, e - t.left.length) : fe({
        _tag: "IConcat",
        left: _o(t.left, e),
        right: t.right
      });
    default:
      return fe({
        _tag: "ISlice",
        chunk: t,
        offset: e,
        length: t.length - e
      });
  }
}), Ze = /* @__PURE__ */ g(2, (t, e) => {
  if (t.backing._tag === "IEmpty")
    return e;
  if (e.backing._tag === "IEmpty")
    return t;
  const n = e.depth - t.depth;
  if (Math.abs(n) <= 1)
    return fe({
      _tag: "IConcat",
      left: t,
      right: e
    });
  if (n < -1)
    if (t.left.depth >= t.right.depth) {
      const r = Ze(t.right, e);
      return fe({
        _tag: "IConcat",
        left: t.left,
        right: r
      });
    } else {
      const r = Ze(t.right.right, e);
      if (r.depth === t.depth - 3) {
        const s = fe({
          _tag: "IConcat",
          left: t.right.left,
          right: r
        });
        return fe({
          _tag: "IConcat",
          left: t.left,
          right: s
        });
      } else {
        const s = fe({
          _tag: "IConcat",
          left: t.left,
          right: t.right.left
        });
        return fe({
          _tag: "IConcat",
          left: s,
          right: r
        });
      }
    }
  else if (e.right.depth >= e.left.depth) {
    const r = Ze(t, e.left);
    return fe({
      _tag: "IConcat",
      left: r,
      right: e.right
    });
  } else {
    const r = Ze(t, e.left.left);
    if (r.depth === e.depth - 3) {
      const s = fe({
        _tag: "IConcat",
        left: r,
        right: e.left.right
      });
      return fe({
        _tag: "IConcat",
        left: s,
        right: e.right
      });
    } else {
      const s = fe({
        _tag: "IConcat",
        left: e.left.right,
        right: e.right
      });
      return fe({
        _tag: "IConcat",
        left: r,
        right: s
      });
    }
  }
}), tg = (t) => t.length === 0, xt = (t) => t.length > 0, Nu = (t) => sn(t, 0), jt = Nu, yt = (t) => _o(t, 1), Lt = 5, pi = /* @__PURE__ */ Math.pow(2, Lt), ng = pi - 1, rg = pi / 2, sg = pi / 4;
function og(t) {
  return t -= t >> 1 & 1431655765, t = (t & 858993459) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, t & 127;
}
function hn(t, e) {
  return e >>> t & ng;
}
function tn(t) {
  return 1 << t;
}
function xu(t, e) {
  return og(t & e - 1);
}
const ig = (t, e) => ({
  value: t,
  previous: e
});
function on(t, e, n, r) {
  let s = r;
  if (!t) {
    const o = r.length;
    s = new Array(o);
    for (let c = 0; c < o; ++c)
      s[c] = r[c];
  }
  return s[e] = n, s;
}
function ju(t, e, n) {
  const r = n.length - 1;
  let s = 0, o = 0, c = n;
  if (t)
    s = o = e;
  else
    for (c = new Array(r); s < e; )
      c[o++] = n[s++];
  for (++s; s <= r; )
    c[o++] = n[s++];
  return t && (c.length = r), c;
}
function cg(t, e, n, r) {
  const s = r.length;
  if (t) {
    let u = s;
    for (; u >= e; )
      r[u--] = r[u];
    return r[e] = n, r;
  }
  let o = 0, c = 0;
  const a = new Array(s + 1);
  for (; o < e; )
    a[c++] = r[o++];
  for (a[e] = n; o < s; )
    a[++c] = r[o++];
  return a;
}
class St {
  constructor() {
    f(this, "_tag", "EmptyNode");
  }
  modify(e, n, r, s, o, c) {
    const a = r(M());
    return De(a) ? new St() : (++c.value, new At(e, s, o, a));
  }
}
function et(t) {
  return tu(t, "EmptyNode");
}
function ag(t) {
  return et(t) || t._tag === "LeafNode" || t._tag === "CollisionNode";
}
function vs(t, e) {
  return et(t) ? !1 : e === t.edit;
}
class At {
  constructor(e, n, r, s) {
    f(this, "edit");
    f(this, "hash");
    f(this, "key");
    f(this, "value");
    f(this, "_tag", "LeafNode");
    this.edit = e, this.hash = n, this.key = r, this.value = s;
  }
  modify(e, n, r, s, o, c) {
    if (N(o, this.key)) {
      const u = r(this.value);
      return u === this.value ? this : De(u) ? (--c.value, new St()) : vs(this, e) ? (this.value = u, this) : new At(e, s, o, u);
    }
    const a = r(M());
    return De(a) ? this : (++c.value, Lu(e, n, this.hash, this, s, new At(e, s, o, a)));
  }
}
class gi {
  constructor(e, n, r) {
    f(this, "edit");
    f(this, "hash");
    f(this, "children");
    f(this, "_tag", "CollisionNode");
    this.edit = e, this.hash = n, this.children = r;
  }
  modify(e, n, r, s, o, c) {
    if (s === this.hash) {
      const u = vs(this, e), h = this.updateCollisionList(u, e, this.hash, this.children, r, o, c);
      return h === this.children ? this : h.length > 1 ? new gi(e, this.hash, h) : h[0];
    }
    const a = r(M());
    return De(a) ? this : (++c.value, Lu(e, n, this.hash, this, s, new At(e, s, o, a)));
  }
  updateCollisionList(e, n, r, s, o, c, a) {
    const u = s.length;
    for (let b = 0; b < u; ++b) {
      const y = s[b];
      if ("key" in y && N(c, y.key)) {
        const k = y.value, w = o(k);
        return w === k ? s : De(w) ? (--a.value, ju(e, b, s)) : on(e, b, new At(n, r, c, w), s);
      }
    }
    const h = o(M());
    return De(h) ? s : (++a.value, on(e, u, new At(n, r, c, h), s));
  }
}
class dn {
  constructor(e, n, r) {
    f(this, "edit");
    f(this, "mask");
    f(this, "children");
    f(this, "_tag", "IndexedNode");
    this.edit = e, this.mask = n, this.children = r;
  }
  modify(e, n, r, s, o, c) {
    const a = this.mask, u = this.children, h = hn(n, s), b = tn(h), y = xu(a, b), k = a & b, w = vs(this, e);
    if (!k) {
      const Y = new St().modify(e, n + Lt, r, s, o, c);
      return Y ? u.length >= rg ? lg(e, h, Y, a, u) : new dn(e, a | b, cg(w, y, Y, u)) : this;
    }
    const R = u[y], J = R.modify(e, n + Lt, r, s, o, c);
    if (R === J)
      return this;
    let B = a, ce;
    if (et(J)) {
      if (B &= ~b, !B)
        return new St();
      if (u.length <= 2 && ag(u[y ^ 1]))
        return u[y ^ 1];
      ce = ju(w, y, u);
    } else
      ce = on(w, y, J, u);
    return w ? (this.mask = B, this.children = ce, this) : new dn(e, B, ce);
  }
}
class mi {
  constructor(e, n, r) {
    f(this, "edit");
    f(this, "size");
    f(this, "children");
    f(this, "_tag", "ArrayNode");
    this.edit = e, this.size = n, this.children = r;
  }
  modify(e, n, r, s, o, c) {
    let a = this.size;
    const u = this.children, h = hn(n, s), b = u[h], y = (b || new St()).modify(e, n + Lt, r, s, o, c);
    if (b === y)
      return this;
    const k = vs(this, e);
    let w;
    if (et(b) && !et(y))
      ++a, w = on(k, h, y, u);
    else if (!et(b) && et(y)) {
      if (--a, a <= sg)
        return ug(e, a, h, u);
      w = on(k, h, new St(), u);
    } else
      w = on(k, h, y, u);
    return k ? (this.size = a, this.children = w, this) : new mi(e, a, w);
  }
}
function ug(t, e, n, r) {
  const s = new Array(e - 1);
  let o = 0, c = 0;
  for (let a = 0, u = r.length; a < u; ++a)
    if (a !== n) {
      const h = r[a];
      h && !et(h) && (s[o++] = h, c |= 1 << a);
    }
  return new dn(t, c, s);
}
function lg(t, e, n, r, s) {
  const o = [];
  let c = r, a = 0;
  for (let u = 0; c; ++u)
    c & 1 && (o[u] = s[a++]), c >>>= 1;
  return o[e] = n, new mi(t, a + 1, o);
}
function fg(t, e, n, r, s, o) {
  if (n === s)
    return new gi(t, n, [o, r]);
  const c = hn(e, n), a = hn(e, s);
  if (c === a)
    return (u) => new dn(t, tn(c) | tn(a), [u]);
  {
    const u = c < a ? [r, o] : [o, r];
    return new dn(t, tn(c) | tn(a), u);
  }
}
function Lu(t, e, n, r, s, o) {
  let c, a = e;
  for (; ; ) {
    const u = fg(t, a, n, r, s, o);
    if (typeof u == "function")
      c = ig(u, c), a = a + Lt;
    else {
      let h = u;
      for (; c != null; )
        h = c.value(h), c = c.previous;
      return h;
    }
  }
}
const Du = "effect/HashMap", yo = /* @__PURE__ */ Symbol.for(Du), hg = {
  [yo]: yo,
  [Symbol.iterator]() {
    return new Ss(this, (t, e) => [t, e]);
  },
  [j]() {
    let t = I(Du);
    for (const e of this)
      t ^= m(I(e[0]), K(I(e[1])));
    return ue(this, t);
  },
  [P](t) {
    if (gg(t)) {
      if (t._size !== this._size)
        return !1;
      for (const e of this) {
        const n = m(t, yi(e[0], I(e[0])));
        if (De(n))
          return !1;
        if (!N(e[1], n.value))
          return !1;
      }
      return !0;
    }
    return !1;
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashMap",
      values: Array.from(this).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  },
  pipe() {
    return A(this, arguments);
  }
}, _i = (t, e, n, r) => {
  const s = Object.create(hg);
  return s._editable = t, s._edit = e, s._root = n, s._size = r, s;
};
class Ss {
  constructor(e, n) {
    f(this, "map");
    f(this, "f");
    f(this, "v");
    this.map = e, this.f = n, this.v = Uu(this.map._root, this.f, void 0);
  }
  next() {
    if (De(this.v))
      return {
        done: !0,
        value: void 0
      };
    const e = this.v.value;
    return this.v = es(e.cont), {
      done: !1,
      value: e.value
    };
  }
  [Symbol.iterator]() {
    return new Ss(this.map, this.f);
  }
}
const es = (t) => t ? qu(t[0], t[1], t[2], t[3], t[4]) : M(), Uu = (t, e, n = void 0) => {
  switch (t._tag) {
    case "LeafNode":
      return nt(t.value) ? H({
        value: e(t.key, t.value.value),
        cont: n
      }) : es(n);
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const r = t.children;
      return qu(r.length, r, 0, e, n);
    }
    default:
      return es(n);
  }
}, qu = (t, e, n, r, s) => {
  for (; n < t; ) {
    const o = e[n++];
    if (o && !et(o))
      return Uu(o, r, [t, e, n, r, s]);
  }
  return es(s);
}, dg = /* @__PURE__ */ _i(!1, 0, /* @__PURE__ */ new St(), 0), ws = () => dg, pg = (t) => {
  const e = Vu(ws());
  for (const n of t)
    zn(e, n[0], n[1]);
  return vg(e);
}, gg = (t) => D(t, yo), mg = (t) => t && et(t._root), _g = /* @__PURE__ */ g(2, (t, e) => yi(t, e, I(e))), yi = /* @__PURE__ */ g(3, (t, e, n) => {
  let r = t._root, s = 0;
  for (; ; )
    switch (r._tag) {
      case "LeafNode":
        return N(e, r.key) ? r.value : M();
      case "CollisionNode": {
        if (n === r.hash) {
          const o = r.children;
          for (let c = 0, a = o.length; c < a; ++c) {
            const u = o[c];
            if ("key" in u && N(e, u.key))
              return u.value;
          }
        }
        return M();
      }
      case "IndexedNode": {
        const o = hn(s, n), c = tn(o);
        if (r.mask & c) {
          r = r.children[xu(r.mask, c)], s += Lt;
          break;
        }
        return M();
      }
      case "ArrayNode": {
        if (r = r.children[hn(s, n)], r) {
          s += Lt;
          break;
        }
        return M();
      }
      default:
        return M();
    }
}), yg = /* @__PURE__ */ g(2, (t, e) => nt(yi(t, e, I(e)))), zn = /* @__PURE__ */ g(3, (t, e, n) => bi(t, e, () => H(n))), bg = /* @__PURE__ */ g(3, (t, e, n) => t._editable ? (t._root = e, t._size = n, t) : e === t._root ? t : _i(t._editable, t._edit, e, n)), Bu = (t) => new Ss(t, (e) => e), ts = (t) => t._size, Vu = (t) => _i(!0, t._edit + 1, t._root, t._size), vg = (t) => (t._editable = !1, t), bi = /* @__PURE__ */ g(3, (t, e, n) => Sg(t, e, I(e), n)), Sg = /* @__PURE__ */ g(4, (t, e, n, r) => {
  const s = {
    value: t._size
  }, o = t._root.modify(t._editable ? t._edit : NaN, 0, r, n, e, s);
  return m(t, bg(o, s.value));
}), ea = /* @__PURE__ */ g(2, (t, e) => bi(t, e, M)), wg = /* @__PURE__ */ g(2, (t, e) => ks(t, ws(), (n, r, s) => zn(n, s, e(r, s)))), kg = /* @__PURE__ */ g(2, (t, e) => ks(t, void 0, (n, r, s) => e(r, s))), ks = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = t._root;
  if (r._tag === "LeafNode")
    return nt(r.value) ? n(e, r.value.value, r.key) : e;
  if (r._tag === "EmptyNode")
    return e;
  const s = [r.children];
  let o;
  for (; o = s.pop(); )
    for (let c = 0, a = o.length; c < a; ) {
      const u = o[c++];
      u && !et(u) && (u._tag === "LeafNode" ? nt(u.value) && (e = n(e, u.value.value, u.key)) : s.push(u.children));
    }
  return e;
}), Ku = "effect/HashSet", bo = /* @__PURE__ */ Symbol.for(Ku), Eg = {
  [bo]: bo,
  [Symbol.iterator]() {
    return Bu(this._keyMap);
  },
  [j]() {
    return ue(this, K(I(this._keyMap))(I(Ku)));
  },
  [P](t) {
    return Og(t) ? ts(this._keyMap) === ts(t._keyMap) && N(this._keyMap, t._keyMap) : !1;
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashSet",
      values: Array.from(this).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  },
  pipe() {
    return A(this, arguments);
  }
}, Es = (t) => {
  const e = Object.create(Eg);
  return e._keyMap = t, e;
}, Og = (t) => D(t, bo), Rg = /* @__PURE__ */ Es(/* @__PURE__ */ ws()), Os = () => Rg, Ig = (t) => {
  const e = vi(Os());
  for (const n of t)
    Yn(e, n);
  return Si(e);
}, Cg = (...t) => {
  const e = vi(Os());
  for (const n of t)
    Yn(e, n);
  return Si(e);
}, Tg = /* @__PURE__ */ g(2, (t, e) => yg(t._keyMap, e)), $g = (t) => ts(t._keyMap), vi = (t) => Es(Vu(t._keyMap)), Si = (t) => (t._keyMap._editable = !1, t), Hu = /* @__PURE__ */ g(2, (t, e) => {
  const n = vi(t);
  return e(n), Si(n);
}), Yn = /* @__PURE__ */ g(2, (t, e) => t._keyMap._editable ? (zn(e, !0)(t._keyMap), t) : Es(zn(e, !0)(t._keyMap))), Ju = /* @__PURE__ */ g(2, (t, e) => t._keyMap._editable ? (ea(e)(t._keyMap), t) : Es(ea(e)(t._keyMap))), Fg = /* @__PURE__ */ g(2, (t, e) => Hu(t, (n) => {
  for (const r of e)
    Ju(n, r);
})), Ag = /* @__PURE__ */ g(2, (t, e) => Hu(Os(), (n) => {
  Mg(t, (r) => Yn(n, r));
  for (const r of e)
    Yn(n, r);
})), Mg = /* @__PURE__ */ g(2, (t, e) => kg(t._keyMap, (n, r) => e(r))), Pg = /* @__PURE__ */ g(3, (t, e, n) => ks(t._keyMap, e, (r, s, o) => n(r, o))), Dt = Os, Ng = Ig, wi = Cg, xg = Tg, Wu = $g, Kn = Yn, Gu = Ju, ta = Fg, Qn = Ag, ns = Pg, na = /* @__PURE__ */ Symbol.for("effect/MutableRef"), jg = {
  [na]: na,
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableRef",
      current: ye(this.current)
    };
  },
  [he]() {
    return this.toJSON();
  },
  pipe() {
    return A(this, arguments);
  }
}, ki = (t) => {
  const e = Object.create(jg);
  return e.current = t, e;
}, Ut = (t) => t.current, Rs = /* @__PURE__ */ g(2, (t, e) => (t.current = e, t)), Ei = "effect/FiberId", Xn = /* @__PURE__ */ Symbol.for(Ei), rs = "None", vo = "Runtime", Lg = "Composite", Dg = /* @__PURE__ */ me(`${Ei}-${rs}`);
var Dw;
let Ug = class {
  constructor() {
    f(this, Dw, Xn);
    f(this, "_tag", rs);
    f(this, "id", -1);
    f(this, "startTimeMillis", -1);
  }
  [(Dw = Xn, j)]() {
    return Dg;
  }
  [P](e) {
    return zu(e) && e._tag === rs;
  }
  toString() {
    return Ie(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag
    };
  }
  [he]() {
    return this.toJSON();
  }
};
var Uw;
class qg {
  constructor(e, n) {
    f(this, "id");
    f(this, "startTimeMillis");
    f(this, Uw, Xn);
    f(this, "_tag", vo);
    this.id = e, this.startTimeMillis = n;
  }
  [(Uw = Xn, j)]() {
    return ue(this, me(`${Ei}-${this._tag}-${this.id}-${this.startTimeMillis}`));
  }
  [P](e) {
    return zu(e) && e._tag === vo && this.id === e.id && this.startTimeMillis === e.startTimeMillis;
  }
  toString() {
    return Ie(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      id: this.id,
      startTimeMillis: this.startTimeMillis
    };
  }
  [he]() {
    return this.toJSON();
  }
}
const Bg = /* @__PURE__ */ new Ug(), zu = (t) => D(t, Xn), So = (t) => {
  switch (t._tag) {
    case rs:
      return Dt();
    case vo:
      return wi(t.id);
    case Lg:
      return m(So(t.left), Qn(So(t.right)));
  }
}, ra = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Fiber/Id/_fiberCounter"), () => ki(0)), Yu = (t) => Array.from(So(t)).map((n) => `#${n}`).join(","), Vg = () => {
  const t = Ut(ra);
  return m(ra, Rs(t + 1)), new qg(t, Date.now());
}, Is = Bg, Kg = Yu, Qu = Vg, Oi = ws, Hg = pg, Jg = mg, Xu = _g, Zu = zn, el = Bu, Wg = ts, Gg = bi, tl = wg, nl = ks, Zn = /* @__PURE__ */ Symbol.for("effect/List"), wo = (t) => Se(t), zg = (t) => wd(hi(t), wo), Yg = /* @__PURE__ */ zg(N), Qg = {
  [Zn]: Zn,
  _tag: "Cons",
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Cons",
      values: wo(this).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  },
  [P](t) {
    return sl(t) && this._tag === t._tag && Yg(this, t);
  },
  [j]() {
    return ue(this, sr(wo(this)));
  },
  [Symbol.iterator]() {
    let t = !1, e = this;
    return {
      next() {
        if (t)
          return this.return();
        if (e._tag === "Nil")
          return t = !0, this.return();
        const n = e.head;
        return e = e.tail, {
          done: t,
          value: n
        };
      },
      return(n) {
        return t || (t = !0), {
          done: !0,
          value: n
        };
      }
    };
  },
  pipe() {
    return A(this, arguments);
  }
}, ss = (t, e) => {
  const n = Object.create(Qg);
  return n.head = t, n.tail = e, n;
}, Xg = /* @__PURE__ */ me("Nil"), Zg = {
  [Zn]: Zn,
  _tag: "Nil",
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Nil"
    };
  },
  [he]() {
    return this.toJSON();
  },
  [j]() {
    return Xg;
  },
  [P](t) {
    return sl(t) && this._tag === t._tag;
  },
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: !0,
          value: void 0
        };
      }
    };
  },
  pipe() {
    return A(this, arguments);
  }
}, rl = /* @__PURE__ */ Object.create(Zg), sl = (t) => D(t, Zn), ht = (t) => t._tag === "Nil", ol = (t) => t._tag === "Cons", em = () => rl, qt = (t, e) => ss(t, e), pn = em, Ri = (t) => ss(t, rl), tm = /* @__PURE__ */ g(2, (t, e) => rm(e, t)), nm = /* @__PURE__ */ g(2, (t, e) => qt(e, t)), rm = /* @__PURE__ */ g(2, (t, e) => {
  if (ht(t))
    return e;
  if (ht(e))
    return t;
  {
    const n = ss(e.head, t);
    let r = n, s = e.tail;
    for (; !ht(s); ) {
      const o = ss(s.head, t);
      r.tail = o, r = o, s = s.tail;
    }
    return n;
  }
}), sm = /* @__PURE__ */ g(3, (t, e, n) => {
  let r = e, s = t;
  for (; !ht(s); )
    r = n(r, s.head), s = s.tail;
  return r;
}), om = (t) => {
  let e = pn(), n = t;
  for (; !ht(n); )
    e = nm(e, n.head), n = n.tail;
  return e;
}, Ii = /* @__PURE__ */ function() {
  function t(e) {
    e && Object.assign(this, e);
  }
  return t.prototype = ai, t;
}(), im = /* @__PURE__ */ Symbol.for("effect/DifferContextPatch");
function sa(t) {
  return t;
}
const ir = {
  ...Ii.prototype,
  [im]: {
    _Value: sa,
    _Patch: sa
  }
}, cm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(ir), {
  _tag: "Empty"
}), am = /* @__PURE__ */ Object.create(cm), il = () => am, um = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(ir), {
  _tag: "AndThen"
}), lm = (t, e) => {
  const n = Object.create(um);
  return n.first = t, n.second = e, n;
}, fm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(ir), {
  _tag: "AddService"
}), hm = (t, e) => {
  const n = Object.create(fm);
  return n.key = t, n.service = e, n;
}, dm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(ir), {
  _tag: "RemoveService"
}), pm = (t) => {
  const e = Object.create(dm);
  return e.key = t, e;
}, gm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(ir), {
  _tag: "UpdateService"
}), mm = (t, e) => {
  const n = Object.create(gm);
  return n.key = t, n.update = e, n;
}, _m = (t, e) => {
  const n = new Map(t.unsafeMap);
  let r = il();
  for (const [s, o] of e.unsafeMap.entries())
    if (n.has(s)) {
      const c = n.get(s);
      n.delete(s), N(c, o) || (r = Dr(mm(s, () => o))(r));
    } else
      n.delete(s), r = Dr(hm(s, o))(r);
  for (const [s] of n.entries())
    r = Dr(pm(s))(r);
  return r;
}, Dr = /* @__PURE__ */ g(2, (t, e) => lm(t, e)), ym = /* @__PURE__ */ g(2, (t, e) => {
  if (t._tag === "Empty")
    return e;
  let n = !1, r = Je(t);
  const s = new Map(e.unsafeMap);
  for (; xt(r); ) {
    const c = jt(r), a = yt(r);
    switch (c._tag) {
      case "Empty": {
        r = a;
        break;
      }
      case "AddService": {
        s.set(c.key, c.service), r = a;
        break;
      }
      case "AndThen": {
        r = Ye(Ye(a, c.second), c.first);
        break;
      }
      case "RemoveService": {
        s.delete(c.key), r = a;
        break;
      }
      case "UpdateService": {
        s.set(c.key, c.update(s.get(c.key))), n = !0, r = a;
        break;
      }
    }
  }
  if (!n)
    return Gn(s);
  const o = /* @__PURE__ */ new Map();
  for (const [c] of e.unsafeMap)
    s.has(c) && (o.set(c, s.get(c)), s.delete(c));
  for (const [c, a] of s)
    o.set(c, a);
  return Gn(o);
}), bm = /* @__PURE__ */ Symbol.for("effect/DifferHashSetPatch");
function Xs(t) {
  return t;
}
const Cs = {
  ...Ii.prototype,
  [bm]: {
    _Value: Xs,
    _Key: Xs,
    _Patch: Xs
  }
}, vm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(Cs), {
  _tag: "Empty"
}), Sm = /* @__PURE__ */ Object.create(vm), cl = () => Sm, wm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(Cs), {
  _tag: "AndThen"
}), km = (t, e) => {
  const n = Object.create(wm);
  return n.first = t, n.second = e, n;
}, Em = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(Cs), {
  _tag: "Add"
}), Om = (t) => {
  const e = Object.create(Em);
  return e.value = t, e;
}, Rm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(Cs), {
  _tag: "Remove"
}), Im = (t) => {
  const e = Object.create(Rm);
  return e.value = t, e;
}, Cm = (t, e) => {
  const [n, r] = ns([t, cl()], ([s, o], c) => xg(c)(s) ? [Gu(c)(s), o] : [s, ko(Om(c))(o)])(e);
  return ns(r, (s, o) => ko(Im(o))(s))(n);
}, ko = /* @__PURE__ */ g(2, (t, e) => km(t, e)), Tm = /* @__PURE__ */ g(2, (t, e) => {
  if (t._tag === "Empty")
    return e;
  let n = e, r = Je(t);
  for (; xt(r); ) {
    const s = jt(r), o = yt(r);
    switch (s._tag) {
      case "Empty": {
        r = o;
        break;
      }
      case "AndThen": {
        r = Ye(s.first)(Ye(s.second)(o));
        break;
      }
      case "Add": {
        n = Kn(s.value)(n), r = o;
        break;
      }
      case "Remove":
        n = Gu(s.value)(n), r = o;
    }
  }
  return n;
}), $m = /* @__PURE__ */ Symbol.for("effect/DifferReadonlyArrayPatch");
function oa(t) {
  return t;
}
const cr = {
  ...Ii.prototype,
  [$m]: {
    _Value: oa,
    _Patch: oa
  }
}, Fm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(cr), {
  _tag: "Empty"
}), Am = /* @__PURE__ */ Object.create(Fm), al = () => Am, Mm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(cr), {
  _tag: "AndThen"
}), Pm = (t, e) => {
  const n = Object.create(Mm);
  return n.first = t, n.second = e, n;
}, Nm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(cr), {
  _tag: "Append"
}), xm = (t) => {
  const e = Object.create(Nm);
  return e.values = t, e;
}, jm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(cr), {
  _tag: "Slice"
}), Lm = (t, e) => {
  const n = Object.create(jm);
  return n.from = t, n.until = e, n;
}, Dm = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(cr), {
  _tag: "Update"
}), Um = (t, e) => {
  const n = Object.create(Dm);
  return n.index = t, n.patch = e, n;
}, qm = (t) => {
  let e = 0, n = al();
  for (; e < t.oldValue.length && e < t.newValue.length; ) {
    const r = t.oldValue[e], s = t.newValue[e], o = t.differ.diff(r, s);
    N(o, t.differ.empty) || (n = Ur(n, Um(e, o))), e = e + 1;
  }
  return e < t.oldValue.length && (n = Ur(n, Lm(0, e))), e < t.newValue.length && (n = Ur(n, xm(kp(e)(t.newValue)))), n;
}, Ur = /* @__PURE__ */ g(2, (t, e) => Pm(t, e)), Bm = /* @__PURE__ */ g(3, (t, e, n) => {
  if (t._tag === "Empty")
    return e;
  let r = e.slice(), s = Xe(t);
  for (; _p(s); ) {
    const o = Ke(s), c = un(s);
    switch (o._tag) {
      case "Empty": {
        s = c;
        break;
      }
      case "AndThen": {
        c.unshift(o.first, o.second), s = c;
        break;
      }
      case "Append": {
        for (const a of o.values)
          r.push(a);
        s = c;
        break;
      }
      case "Slice": {
        r = r.slice(o.from, o.until), s = c;
        break;
      }
      case "Update": {
        r[o.index] = n.patch(o.patch, r[o.index]), s = c;
        break;
      }
    }
  }
  return r;
}), Vm = /* @__PURE__ */ Symbol.for("effect/Differ"), Km = {
  [Vm]: {
    _P: Ve,
    _V: Ve
  }
}, kn = (t) => {
  const e = Object.create(Km);
  return e.empty = t.empty, e.diff = t.diff, e.combine = t.combine, e.patch = t.patch, e;
}, Hm = () => kn({
  empty: il(),
  combine: (t, e) => Dr(e)(t),
  diff: (t, e) => _m(t, e),
  patch: (t, e) => ym(e)(t)
}), Jm = () => kn({
  empty: cl(),
  combine: (t, e) => ko(e)(t),
  diff: (t, e) => Cm(t, e),
  patch: (t, e) => Tm(e)(t)
}), Wm = (t) => kn({
  empty: al(),
  combine: (e, n) => Ur(e, n),
  diff: (e, n) => qm({
    oldValue: e,
    newValue: n,
    differ: t
  }),
  patch: (e, n) => Bm(e, n, t)
}), ul = () => Gm((t, e) => e), Gm = (t) => kn({
  empty: Ve,
  combine: (e, n) => e === Ve ? n : n === Ve ? e : (r) => n(e(r)),
  diff: (e, n) => N(e, n) ? Ve : ds(n),
  patch: (e, n) => t(n, e(n))
}), er = 255, ll = 8, Eo = (t) => t & er, Oo = (t) => t >> ll & er, ar = (t, e) => (t & er) + ((e & t & er) << ll), zm = /* @__PURE__ */ ar(0, 0), Ym = (t) => ar(t, t), Qm = (t) => ar(t, 0), Xm = /* @__PURE__ */ g(2, (t, e) => ar(Eo(t) & ~e, Oo(t))), Zm = /* @__PURE__ */ g(2, (t, e) => t | e), e_ = (t) => ~t >>> 0 & er, t_ = 0, En = 1, n_ = 2, fl = 4, Ro = 16, hl = 32, r_ = (t) => Ts(t, hl), s_ = /* @__PURE__ */ g(2, (t, e) => t | e), _t = (t) => dl(t) && !i_(t), dl = (t) => Ts(t, En), Ts = /* @__PURE__ */ g(2, (t, e) => (t & e) !== 0), pl = (...t) => t.reduce((e, n) => e | n, 0), o_ = /* @__PURE__ */ pl(t_), ia = (t) => Ts(t, fl), i_ = (t) => Ts(t, Ro), qr = /* @__PURE__ */ g(2, (t, e) => ar(t ^ e, e)), Br = /* @__PURE__ */ g(2, (t, e) => t & (e_(Eo(e)) | Oo(e)) | Eo(e) & Oo(e)), ca = /* @__PURE__ */ kn({
  empty: zm,
  diff: (t, e) => qr(t, e),
  combine: (t, e) => Zm(e)(t),
  patch: (t, e) => Br(e, t)
}), c_ = Ym, gl = Qm, aa = Xm, ml = (t, e) => ({
  _tag: "Par",
  left: t,
  right: e
}), Fr = (t, e) => ({
  _tag: "Seq",
  left: t,
  right: e
}), a_ = (t) => {
  let e = Ri(t), n = pn();
  for (; ; ) {
    const [r, s] = sm(e, [_l(), pn()], ([o, c], a) => {
      const [u, h] = u_(a);
      return [p_(o, u), tm(c, h)];
    });
    if (n = l_(n, r), ht(s))
      return om(n);
    e = s;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues");
}, u_ = (t) => {
  let e = t, n = _l(), r = pn(), s = pn();
  for (; ; )
    switch (e._tag) {
      case "Empty": {
        if (ht(r))
          return [n, s];
        e = r.head, r = r.tail;
        break;
      }
      case "Par": {
        r = qt(e.right, r), e = e.left;
        break;
      }
      case "Seq": {
        const o = e.left, c = e.right;
        switch (o._tag) {
          case "Empty": {
            e = c;
            break;
          }
          case "Par": {
            const a = o.left, u = o.right;
            e = ml(Fr(a, c), Fr(u, c));
            break;
          }
          case "Seq": {
            const a = o.left, u = o.right;
            e = Fr(a, Fr(u, c));
            break;
          }
          case "Single": {
            e = o, s = qt(c, s);
            break;
          }
        }
        break;
      }
      case "Single": {
        if (n = d_(n, e), ht(r))
          return [n, s];
        e = r.head, r = r.tail;
        break;
      }
    }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/effect/issues");
}, l_ = (t, e) => {
  if (ht(t))
    return Ri(Zs(e));
  if (g_(e))
    return t;
  const n = S_(t.head), r = m_(e);
  return n.length === 1 && r.length === 1 && N(n[0], r[0]) ? qt(v_(t.head, Zs(e)), t.tail) : qt(Zs(e), t);
}, f_ = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockParallel"), h_ = {
  /* c8 ignore next */
  _R: (t) => t
};
var qw;
class Ci {
  constructor(e) {
    f(this, "map");
    f(this, qw, h_);
    this.map = e;
  }
}
qw = f_;
const _l = () => new Ci(Oi()), d_ = (t, e) => new Ci(Gg(t.map, e.dataSource, (n) => ip(ku(n, eg(e.blockedRequest)), () => Je(e.blockedRequest)))), p_ = (t, e) => new Ci(nl(t.map, e.map, (n, r, s) => Zu(n, s, ui(Xu(n, s), {
  onNone: () => r,
  onSome: (o) => Ze(r, o)
})))), g_ = (t) => Jg(t.map), m_ = (t) => Array.from(el(t.map)), Zs = (t) => b_(tl(t.map, (e) => Je(e))), __ = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockSequential"), y_ = {
  /* c8 ignore next */
  _R: (t) => t
};
var Bw;
class yl {
  constructor(e) {
    f(this, "map");
    f(this, Bw, y_);
    this.map = e;
  }
}
Bw = __;
const b_ = (t) => new yl(t), v_ = (t, e) => new yl(nl(e.map, t.map, (n, r, s) => Zu(n, s, ui(Xu(n, s), {
  onNone: () => vt(),
  onSome: (o) => Ze(o, r)
})))), S_ = (t) => Array.from(el(t.map)), w_ = (t) => Array.from(t.map), ur = "Die", gn = "Empty", On = "Fail", Rn = "Interrupt", mn = "Parallel", _n = "Sequential", bl = "effect/Cause", vl = /* @__PURE__ */ Symbol.for(bl), k_ = {
  /* c8 ignore next */
  _E: (t) => t
}, In = {
  [vl]: k_,
  [j]() {
    return m(I(bl), K(I(N_(this))), ue(this));
  },
  [P](t) {
    return E_(t) && P_(this, t);
  },
  pipe() {
    return A(this, arguments);
  },
  toJSON() {
    switch (this._tag) {
      case "Empty":
        return {
          _id: "Cause",
          _tag: this._tag
        };
      case "Die":
        return {
          _id: "Cause",
          _tag: this._tag,
          defect: ye(this.defect)
        };
      case "Interrupt":
        return {
          _id: "Cause",
          _tag: this._tag,
          fiberId: this.fiberId.toJSON()
        };
      case "Fail":
        return {
          _id: "Cause",
          _tag: this._tag,
          failure: ye(this.error)
        };
      case "Sequential":
      case "Parallel":
        return {
          _id: "Cause",
          _tag: this._tag,
          left: ye(this.left),
          right: ye(this.right)
        };
    }
  },
  toString() {
    return Fi(this);
  },
  [he]() {
    return this.toJSON();
  }
}, tr = /* @__PURE__ */ (() => {
  const t = /* @__PURE__ */ Object.create(In);
  return t._tag = gn, t;
})(), Io = (t) => {
  const e = Object.create(In);
  return e._tag = On, e.error = t, e;
}, ut = (t) => {
  const e = Object.create(In);
  return e._tag = ur, e.defect = t, e;
}, Ct = (t) => {
  const e = Object.create(In);
  return e._tag = Rn, e.fiberId = t, e;
}, lr = (t, e) => {
  const n = Object.create(In);
  return n._tag = mn, n.left = t, n.right = e, n;
}, tt = (t, e) => {
  const n = Object.create(In);
  return n._tag = _n, n.left = t, n.right = e, n;
}, E_ = (t) => D(t, vl), O_ = (t) => t._tag === gn ? !0 : yn(t, !0, (e, n) => {
  switch (n._tag) {
    case gn:
      return H(e);
    case ur:
    case On:
    case Rn:
      return H(!1);
    default:
      return M();
  }
}), R_ = (t) => nt(A_(t)), Ti = (t) => $i(void 0, j_)(t), I_ = (t) => fn(yn(t, vt(), (e, n) => n._tag === On ? H(m(e, Ye(n.error))) : M())), C_ = (t) => fn(yn(t, vt(), (e, n) => n._tag === ur ? H(m(e, Ye(n.defect))) : M())), T_ = (t) => yn(t, Dt(), (e, n) => n._tag === Rn ? H(m(e, Kn(n.fiberId))) : M()), $_ = (t) => Sl(t, (e) => e._tag === On ? H(e.error) : M()), F_ = (t) => {
  const e = $_(t);
  switch (e._tag) {
    case "None":
      return at(t);
    case "Some":
      return Pt(e.value);
  }
}, A_ = (t) => Sl(t, (e) => e._tag === Rn ? H(e.fiberId) : M()), ua = (t) => wl(t, {
  onEmpty: tr,
  onFail: () => tr,
  onDie: (e) => ut(e),
  onInterrupt: (e) => Ct(e),
  onSequential: tt,
  onParallel: lr
}), M_ = (t) => wl(t, {
  onEmpty: tr,
  onFail: (e) => ut(e),
  onDie: (e) => ut(e),
  onInterrupt: (e) => Ct(e),
  onSequential: (e, n) => tt(e, n),
  onParallel: (e, n) => lr(e, n)
}), P_ = (t, e) => {
  let n = Je(t), r = Je(e);
  for (; xt(n) && xt(r); ) {
    const [s, o] = m(jt(n), yn([Dt(), vt()], ([u, h], b) => {
      const [y, k] = Co(b);
      return H([m(u, Qn(y)), m(h, Ze(k))]);
    })), [c, a] = m(jt(r), yn([Dt(), vt()], ([u, h], b) => {
      const [y, k] = Co(b);
      return H([m(u, Qn(y)), m(h, Ze(k))]);
    }));
    if (!N(s, c))
      return !1;
    n = o, r = a;
  }
  return !0;
}, N_ = (t) => x_(Je(t), vt()), x_ = (t, e) => {
  for (; ; ) {
    const [n, r] = m(t, Wn([Dt(), vt()], ([o, c], a) => {
      const [u, h] = Co(a);
      return [m(o, Qn(u)), m(c, Ze(h))];
    })), s = Wu(n) > 0 ? m(e, Ye(n)) : e;
    if (tg(r))
      return fn(s);
    t = r, e = s;
  }
  throw new Error(ni("Cause.flattenCauseLoop"));
}, Sl = /* @__PURE__ */ g(2, (t, e) => {
  const n = [t];
  for (; n.length > 0; ) {
    const r = n.pop(), s = e(r);
    switch (s._tag) {
      case "None": {
        switch (r._tag) {
          case _n:
          case mn: {
            n.push(r.right), n.push(r.left);
            break;
          }
        }
        break;
      }
      case "Some":
        return s;
    }
  }
  return M();
}), Co = (t) => {
  let e = t;
  const n = [];
  let r = Dt(), s = vt();
  for (; e !== void 0; )
    switch (e._tag) {
      case gn: {
        if (n.length === 0)
          return [r, s];
        e = n.pop();
        break;
      }
      case On: {
        if (r = Kn(r, Qs(e._tag, e.error)), n.length === 0)
          return [r, s];
        e = n.pop();
        break;
      }
      case ur: {
        if (r = Kn(r, Qs(e._tag, e.defect)), n.length === 0)
          return [r, s];
        e = n.pop();
        break;
      }
      case Rn: {
        if (r = Kn(r, Qs(e._tag, e.fiberId)), n.length === 0)
          return [r, s];
        e = n.pop();
        break;
      }
      case _n: {
        switch (e.left._tag) {
          case gn: {
            e = e.right;
            break;
          }
          case _n: {
            e = tt(e.left.left, tt(e.left.right, e.right));
            break;
          }
          case mn: {
            e = lr(tt(e.left.left, e.right), tt(e.left.right, e.right));
            break;
          }
          default: {
            s = Ye(s, e.right), e = e.left;
            break;
          }
        }
        break;
      }
      case mn: {
        n.push(e.right), e = e.left;
        break;
      }
    }
  throw new Error(ni("Cause.evaluateCauseLoop"));
}, j_ = {
  emptyCase: zc,
  failCase: ho,
  dieCase: ho,
  interruptCase: zc,
  sequentialCase: (t, e, n) => e && n,
  parallelCase: (t, e, n) => e && n
}, la = "SequentialCase", fa = "ParallelCase", wl = /* @__PURE__ */ g(2, (t, {
  onDie: e,
  onEmpty: n,
  onFail: r,
  onInterrupt: s,
  onParallel: o,
  onSequential: c
}) => $i(t, void 0, {
  emptyCase: () => n,
  failCase: (a, u) => r(u),
  dieCase: (a, u) => e(u),
  interruptCase: (a, u) => s(u),
  sequentialCase: (a, u, h) => c(u, h),
  parallelCase: (a, u, h) => o(u, h)
})), yn = /* @__PURE__ */ g(3, (t, e, n) => {
  let r = e, s = t;
  const o = [];
  for (; s !== void 0; ) {
    const c = n(r, s);
    switch (r = nt(c) ? c.value : r, s._tag) {
      case _n: {
        o.push(s.right), s = s.left;
        break;
      }
      case mn: {
        o.push(s.right), s = s.left;
        break;
      }
      default: {
        s = void 0;
        break;
      }
    }
    s === void 0 && o.length > 0 && (s = o.pop());
  }
  return r;
}), $i = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = [t], s = [];
  for (; r.length > 0; ) {
    const c = r.pop();
    switch (c._tag) {
      case gn: {
        s.push(at(n.emptyCase(e)));
        break;
      }
      case On: {
        s.push(at(n.failCase(e, c.error)));
        break;
      }
      case ur: {
        s.push(at(n.dieCase(e, c.defect)));
        break;
      }
      case Rn: {
        s.push(at(n.interruptCase(e, c.fiberId)));
        break;
      }
      case _n: {
        r.push(c.right), r.push(c.left), s.push(Pt({
          _tag: la
        }));
        break;
      }
      case mn: {
        r.push(c.right), r.push(c.left), s.push(Pt({
          _tag: fa
        }));
        break;
      }
    }
  }
  const o = [];
  for (; s.length > 0; ) {
    const c = s.pop();
    switch (c._tag) {
      case "Left": {
        switch (c.left._tag) {
          case la: {
            const a = o.pop(), u = o.pop(), h = n.sequentialCase(e, a, u);
            o.push(h);
            break;
          }
          case fa: {
            const a = o.pop(), u = o.pop(), h = n.parallelCase(e, a, u);
            o.push(h);
            break;
          }
        }
        break;
      }
      case "Right": {
        o.push(c.right);
        break;
      }
    }
  }
  if (o.length === 0)
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
  return o.pop();
}), Fi = (t) => Ti(t) ? "All fibers interrupted without errors." : kl(t).map((e) => e.stack).join(`
`);
class ha extends globalThis.Error {
  constructor(n) {
    const r = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    super(L_(n));
    f(this, "span");
    Error.stackTraceLimit = r, this.name = n instanceof Error ? n.name : "Error", typeof n == "object" && n !== null && (da in n && (this.span = n[da]), Object.keys(n).forEach((s) => {
      s in this || (this[s] = n[s]);
    })), this.stack = U_(this.message, n instanceof Error && n.stack ? n.stack : "", this.span);
  }
  toJSON() {
    const n = {
      message: this.message,
      stack: this.stack
    };
    return this.span && (n.span = this.span), n;
  }
}
const L_ = (t) => {
  if (typeof t == "string")
    return `Error: ${t}`;
  try {
    if (D(t, "toString") && ps(t.toString) && t.toString !== Object.prototype.toString && t.toString !== globalThis.Array.prototype.toString)
      return t.toString();
  } catch {
  }
  return `Error: ${JSON.stringify(t)}`;
}, D_ = /\((.*)\)/, U_ = (t, e, n) => {
  const r = [t], s = e.split(`
`);
  for (let o = 1; o < s.length && !(s[o].includes("effect_cutpoint") || s[o].includes("Generator.next") || (r.push(s[o].replace(/at .*effect_instruction_i.*\((.*)\)/, "at $1").replace(/EffectPrimitive\.\w+/, "<anonymous>")), s[o].includes("effect_instruction_i"))); o++)
    ;
  if (n) {
    let o = n, c = 0;
    for (; o && o._tag === "Span" && c < 10; ) {
      const a = o.attributes.get("code.stacktrace");
      if (typeof a == "string") {
        const u = a.match(D_), h = u ? u[1] : a.replace(/^at /, "");
        r.push(`    at ${o.name} (${h})`);
      } else
        r.push(`    at ${o.name}`);
      o = Rt(o.parent), c++;
    }
  }
  return r.join(`
`);
}, da = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation"), kl = (t) => $i(t, void 0, {
  emptyCase: () => [],
  dieCase: (e, n) => [new ha(n)],
  failCase: (e, n) => [new ha(n)],
  interruptCase: () => [],
  parallelCase: (e, n, r) => [...n, ...r],
  sequentialCase: (e, n, r) => [...n, ...r]
}), fr = "Pending", Ai = "Done", q_ = "effect/Deferred", B_ = /* @__PURE__ */ Symbol.for(q_), V_ = {
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _A: (t) => t
}, K_ = (t) => ({
  _tag: fr,
  joiners: t
}), El = (t) => ({
  _tag: Ai,
  effect: t
});
class hr {
  constructor(e) {
    f(this, "self");
    f(this, "called", !1);
    this.self = e;
  }
  next(e) {
    return this.called ? {
      value: e,
      done: !0
    } : (this.called = !0, {
      value: this.self,
      done: !1
    });
  }
  return(e) {
    return {
      value: e,
      done: !0
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new hr(this.self);
  }
}
const pa = /* @__PURE__ */ Symbol.for("effect/Tracer"), H_ = (t) => ({
  [pa]: pa,
  ...t
}), To = /* @__PURE__ */ wn("effect/Tracer"), Ol = /* @__PURE__ */ wn("effect/ParentSpan"), ga = /* @__PURE__ */ function() {
  const t = "abcdef0123456789", e = t.length;
  return function(n) {
    let r = "";
    for (let s = 0; s < n; s++)
      r += t.charAt(Math.floor(Math.random() * e));
    return r;
  };
}();
class J_ {
  constructor(e, n, r, s, o, c) {
    f(this, "name");
    f(this, "parent");
    f(this, "context");
    f(this, "links");
    f(this, "startTime");
    f(this, "kind");
    f(this, "_tag", "Span");
    f(this, "spanId");
    f(this, "traceId", "native");
    f(this, "sampled", !0);
    f(this, "status");
    f(this, "attributes");
    f(this, "events", []);
    this.name = e, this.parent = n, this.context = r, this.links = s, this.startTime = o, this.kind = c, this.status = {
      _tag: "Started",
      startTime: o
    }, this.attributes = /* @__PURE__ */ new Map(), this.traceId = n._tag === "Some" ? n.value.traceId : ga(32), this.spanId = ga(16);
  }
  end(e, n) {
    this.status = {
      _tag: "Ended",
      endTime: e,
      exit: n,
      startTime: this.status.startTime
    };
  }
  attribute(e, n) {
    this.attributes.set(e, n);
  }
  event(e, n, r) {
    this.events.push([e, n, r ?? {}]);
  }
}
const W_ = /* @__PURE__ */ H_({
  span: (t, e, n, r, s, o) => new J_(t, e, n, r, s, o),
  context: (t) => t()
}), G_ = "effect/EffectError", z_ = /* @__PURE__ */ Symbol.for(G_), Y_ = (t) => D(t, z_), Rl = (t, e) => {
  const n = new Ne("Blocked");
  return n.effect_instruction_i0 = t, n.effect_instruction_i1 = e, n;
}, Q_ = (t) => {
  const e = new Ne("RunBlocked");
  return e.effect_instruction_i0 = t, e;
}, $s = /* @__PURE__ */ Symbol.for("effect/Effect");
class X_ {
  constructor(e, n) {
    f(this, "patch");
    f(this, "op");
    f(this, "_op", ci);
    this.patch = e, this.op = n;
  }
}
var Vw;
class Ne {
  constructor(e) {
    f(this, "_op");
    f(this, "effect_instruction_i0");
    f(this, "effect_instruction_i1");
    f(this, "effect_instruction_i2");
    f(this, "trace");
    f(this, Vw, an);
    this._op = e;
  }
  [(Vw = $s, P)](e) {
    return this === e;
  }
  [j]() {
    return ue(this, ri(this));
  }
  pipe() {
    return A(this, arguments);
  }
  toJSON() {
    return {
      _id: "Effect",
      _op: this._op,
      effect_instruction_i0: ye(this.effect_instruction_i0),
      effect_instruction_i1: ye(this.effect_instruction_i1),
      effect_instruction_i2: ye(this.effect_instruction_i2)
    };
  }
  toString() {
    return Ie(this.toJSON());
  }
  [he]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new hr(new gs(this));
  }
}
var Kw;
class Il {
  constructor(e) {
    f(this, "_op");
    f(this, "effect_instruction_i0");
    f(this, "effect_instruction_i1");
    f(this, "effect_instruction_i2");
    f(this, "trace");
    f(this, Kw, an);
    this._op = e, this._tag = e;
  }
  [(Kw = $s, P)](e) {
    return Wi(e) && e._op === "Failure" && // @ts-expect-error
    N(this.effect_instruction_i0, e.effect_instruction_i0);
  }
  [j]() {
    return m(
      // @ts-expect-error
      me(this._tag),
      // @ts-expect-error
      K(I(this.effect_instruction_i0)),
      ue(this)
    );
  }
  get cause() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return A(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      cause: this.cause.toJSON()
    };
  }
  toString() {
    return Ie(this.toJSON());
  }
  [he]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new hr(new gs(this));
  }
}
var Hw;
class Cl {
  constructor(e) {
    f(this, "_op");
    f(this, "effect_instruction_i0");
    f(this, "effect_instruction_i1");
    f(this, "effect_instruction_i2");
    f(this, "trace");
    f(this, Hw, an);
    this._op = e, this._tag = e;
  }
  [(Hw = $s, P)](e) {
    return Wi(e) && e._op === "Success" && // @ts-expect-error
    N(this.effect_instruction_i0, e.effect_instruction_i0);
  }
  [j]() {
    return m(
      // @ts-expect-error
      me(this._tag),
      // @ts-expect-error
      K(I(this.effect_instruction_i0)),
      ue(this)
    );
  }
  get value() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return A(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      value: ye(this.value)
    };
  }
  toString() {
    return Ie(this.toJSON());
  }
  [he]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new hr(new gs(this));
  }
}
const Tl = (t) => D(t, $s), rt = (t) => {
  const e = new Ne(iu);
  return e.effect_instruction_i0 = t, e;
}, Z_ = /* @__PURE__ */ g(3, (t, e, n) => dr((r) => T(t, (s) => T(Ml(Ae(() => r(e(s)))), (o) => Ae(() => n(s, o)).pipe(bn({
  onFailure: (c) => {
    switch (o._tag) {
      case je:
        return Qe(lr(o.effect_instruction_i0, c));
      case Le:
        return Qe(c);
    }
  },
  onSuccess: () => o
})))))), Cn = /* @__PURE__ */ g(2, (t, e) => T(t, () => ie(e))), Ht = (t) => Cn(t, void 0);
function ey() {
  return this.effect_cutpoint();
}
const $l = function() {
  const t = new Ne(ii);
  switch (t.commit = ey, arguments.length) {
    case 2: {
      t.effect_instruction_i0 = arguments[0], t.effect_cutpoint = arguments[1];
      break;
    }
    case 3: {
      t.effect_instruction_i0 = arguments[0], t.effect_instruction_i1 = arguments[1], t.effect_cutpoint = arguments[2];
      break;
    }
    case 4: {
      t.effect_instruction_i0 = arguments[0], t.effect_instruction_i1 = arguments[1], t.effect_instruction_i2 = arguments[2], t.effect_cutpoint = arguments[3];
      break;
    }
    default:
      throw new Error(ni("you're not supposed to end up here"));
  }
  return t;
}, lt = (t, e = Is) => $l(t, function() {
  let n, r;
  function s(u) {
    n ? n(u) : r === void 0 && (r = u);
  }
  const o = new Ne(jr);
  o.effect_instruction_i0 = (u) => {
    n = u, r && u(r);
  }, o.effect_instruction_i1 = e;
  let c, a;
  return this.effect_instruction_i0.length !== 1 ? (a = new AbortController(), c = this.effect_instruction_i0(s, a.signal)) : c = this.effect_instruction_i0(s), c || a ? Ll(o, (u) => (a && a.abort(), c ?? Ue)) : o;
}), ma = /* @__PURE__ */ g(2, (t, e) => Pi(t, {
  onFailure: e,
  onSuccess: ie
})), os = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation"), _a = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation"), Fl = (t, e) => nt(e) ? new Proxy(t, {
  has(n, r) {
    return r === os || r === _a || r in n;
  },
  get(n, r) {
    return r === os ? e.value : r === _a ? t : n[r];
  }
}) : t, Al = (t) => ti(t) && !(os in t) ? rt((e) => Qe(ut(Fl(t, ef(e))))) : Qe(ut(t)), ty = (t) => ry(() => ut(new Ty(t))), ny = (t) => T($(t), Al), $o = (t) => Pi(t, {
  onFailure: (e) => ie(Pt(e)),
  onSuccess: (e) => ie(at(e))
}), Ml = (t) => oy(t, {
  onFailure: Z,
  onSuccess: Oe
}), Be = (t) => ti(t) && !(os in t) ? rt((e) => Qe(Io(Fl(t, ef(e))))) : Qe(Io(t)), Pl = (t) => T($(t), Be), Qe = (t) => {
  const e = new Il(je);
  return e.effect_instruction_i0 = t, e;
}, ry = (t) => T($(t), Qe), Nl = /* @__PURE__ */ rt((t) => ie(t.id())), xl = (t) => rt((e) => t(e.id())), T = /* @__PURE__ */ g(2, (t, e) => {
  const n = new Ne(zr);
  return n.effect_instruction_i0 = t, n.effect_instruction_i1 = e, n;
}), sy = (t) => {
  const e = new Ne("OnStep");
  return e.effect_instruction_i0 = t, e;
}, Mi = (t) => T(t, Ve), oy = /* @__PURE__ */ g(2, (t, e) => bn(t, {
  onFailure: (n) => ie(e.onFailure(n)),
  onSuccess: (n) => ie(e.onSuccess(n))
})), bn = /* @__PURE__ */ g(2, (t, e) => {
  const n = new Ne(Yr);
  return n.effect_instruction_i0 = t, n.effect_instruction_i1 = e.onFailure, n.effect_instruction_i2 = e.onSuccess, n;
}), Pi = /* @__PURE__ */ g(2, (t, e) => bn(t, {
  onFailure: (n) => {
    if (C_(n).length > 0)
      return Qe(M_(n));
    const s = I_(n);
    return s.length > 0 ? e.onFailure(Nu(s)) : Qe(n);
  },
  onSuccess: e.onSuccess
})), bt = /* @__PURE__ */ g(2, (t, e) => Ae(() => {
  const n = Se(t), r = fi(n.length);
  let s = 0;
  return Cn(Li({
    while: () => s < n.length,
    body: () => e(n[s], s),
    step: (o) => {
      r[s++] = o;
    }
  }), r);
})), Ni = /* @__PURE__ */ g(2, (t, e) => Ae(() => {
  const n = Se(t);
  let r = 0;
  return Li({
    while: () => r < n.length,
    body: () => e(n[r], r),
    step: () => {
      r++;
    }
  });
})), is = (t) => {
  const e = new Ne(or);
  return e.effect_instruction_i0 = c_(En), e.effect_instruction_i1 = () => t, e;
}, Me = /* @__PURE__ */ g(2, (t, e) => T(t, (n) => $(() => e(n)))), jl = /* @__PURE__ */ g(2, (t, e) => Pi(t, {
  onFailure: (n) => Pl(() => e.onFailure(n)),
  onSuccess: (n) => $(() => e.onSuccess(n))
})), xi = /* @__PURE__ */ g(2, (t, e) => bn(t, {
  onFailure: (n) => {
    const r = F_(n);
    switch (r._tag) {
      case "Left":
        return Pl(() => e(r.left));
      case "Right":
        return Qe(r.right);
    }
  },
  onSuccess: ie
})), ji = /* @__PURE__ */ g(2, (t, e) => dr((n) => bn(n(t), {
  onFailure: (r) => {
    const s = Z(r);
    return bn(e(s), {
      onFailure: (o) => Z(tt(r, o)),
      onSuccess: () => s
    });
  },
  onSuccess: (r) => {
    const s = Oe(r);
    return Ui(e(s), s);
  }
}))), Ll = /* @__PURE__ */ g(2, (t, e) => ji(t, zl({
  onFailure: (n) => Ti(n) ? Ht(e(T_(n))) : Ue,
  onSuccess: () => Ue
}))), ie = (t) => {
  const e = new Cl(Le);
  return e.effect_instruction_i0 = t, e;
}, Ae = (t) => T($(t), Ve), $ = (t) => {
  const e = new Ne(ou);
  return e.effect_instruction_i0 = t, e;
}, Dl = /* @__PURE__ */ g(2, (t, e) => T(t, (n) => {
  const r = typeof e == "function" ? e(n) : e;
  return Tl(r) ? Cn(r, n) : Id(r) ? lt((s) => {
    r.then((o) => s(ie(n)), (o) => s(Be(new My(o))));
  }) : ie(n);
})), iy = (t) => rt((e) => {
  const n = e.getFiberRef(Ao), r = m(n, Nt(() => e.scope()));
  return t(Ki(Ao, H(r)));
}), Ul = (t) => {
  const e = new Ne(or);
  return e.effect_instruction_i0 = gl(En), e.effect_instruction_i1 = () => t, e;
}, dr = (t) => $l(t, function() {
  const e = new Ne(or);
  return e.effect_instruction_i0 = gl(En), e.effect_instruction_i1 = (n) => dl(n) ? this.effect_instruction_i0(is) : this.effect_instruction_i0(Ul), e;
}), Ue = /* @__PURE__ */ ie(void 0), cy = (t) => {
  const e = new Ne(or);
  return e.effect_instruction_i0 = t, e.effect_instruction_i1 = void 0, e;
}, Li = (t) => {
  const e = new Ne(Qr);
  return e.effect_instruction_i0 = t.while, e.effect_instruction_i1 = t.body, e.effect_instruction_i2 = t.step, e;
}, Di = (t) => {
  const e = new Ne(Lr);
  return typeof (t == null ? void 0 : t.priority) < "u" ? Ey(e, t.priority) : e;
}, ql = /* @__PURE__ */ g(2, (t, e) => T(t, (n) => Me(e, (r) => [n, r]))), Fs = /* @__PURE__ */ g(2, (t, e) => T(t, (n) => Cn(e, n))), Ui = /* @__PURE__ */ g(2, (t, e) => T(t, () => e)), qi = (t) => T(Nl, (e) => m(t, Bi(e))), Bi = /* @__PURE__ */ g(2, (t, e) => T(t.interruptAsFork(e), () => t.await)), ay = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return A(this, arguments);
  }
}, uy = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return A(this, arguments);
  }
}, ly = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return A(this, arguments);
  }
}, fy = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return A(this, arguments);
  }
}, Bl = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return A(this, arguments);
  }
}, Vl = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return A(this, arguments);
  }
}, hy = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return A(this, arguments);
  }
}, dy = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return A(this, arguments);
  }
}, py = "effect/FiberRef", gy = /* @__PURE__ */ Symbol.for(py), my = {
  /* c8 ignore next */
  _A: (t) => t
}, Vi = (t) => Hl(t, (e) => [e, e]), Kl = /* @__PURE__ */ g(2, (t, e) => T(Vi(t), e)), ya = /* @__PURE__ */ g(2, (t, e) => Hl(t, () => [void 0, e])), Hl = /* @__PURE__ */ g(2, (t, e) => rt((n) => {
  const [r, s] = e(n.getFiberRef(t));
  return n.setFiberRef(t, s), ie(r);
})), Ki = /* @__PURE__ */ g(3, (t, e, n) => Z_(Fs(Vi(e), ya(e, n)), () => t, (r) => ya(e, r))), st = (t, e) => Tn(t, {
  differ: ul(),
  fork: (e == null ? void 0 : e.fork) ?? Ve,
  join: e == null ? void 0 : e.join
}), _y = (t) => {
  const e = Jm();
  return Tn(t, {
    differ: e,
    fork: e.empty
  });
}, yy = (t) => {
  const e = Wm(ul());
  return Tn(t, {
    differ: e,
    fork: e.empty
  });
}, Jl = (t) => {
  const e = Hm();
  return Tn(t, {
    differ: e,
    fork: e.empty
  });
}, Tn = (t, e) => ({
  [gy]: my,
  initial: t,
  diff: (n, r) => e.differ.diff(n, r),
  combine: (n, r) => e.differ.combine(n, r),
  patch: (n) => (r) => e.differ.patch(n, r),
  fork: e.fork,
  join: e.join ?? ((n, r) => r),
  pipe() {
    return A(this, arguments);
  }
}), by = (t) => Tn(t, {
  differ: ca,
  fork: ca.empty
}), pr = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentContext"), () => Jl(di())), Hi = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentSchedulingPriority"), () => st(0)), vy = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMaxOpsBeforeYield"), () => st(2048)), Sy = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogAnnotation"), () => st(Oi())), wy = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogLevel"), () => st(Bl)), ky = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogSpan"), () => st(pn())), Ey = /* @__PURE__ */ g(2, (t, e) => Ki(t, Hi, e)), Oy = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentUnhandledErrorLogLevel"), () => st(H(Vl))), Fo = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMetricLabels"), () => yy(ln())), Ao = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentForkScopeOverride"), () => st(M(), {
  fork: () => M(),
  join: (t, e) => t
})), Ar = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentInterruptedCause"), () => st(tr, {
  fork: () => tr,
  join: (t, e) => t
})), Ry = (t, e) => t.addFinalizer(() => Ht(e)), Iy = (t, e) => t.close(e), Cy = (t, e) => t.fork(e), Wl = /* @__PURE__ */ function() {
  class t extends globalThis.Error {
    commit() {
      return Be(this);
    }
    toString() {
      return this.message ? `${this.name}: ${this.message}` : this.name;
    }
    toJSON() {
      return {
        ...this
      };
    }
    [he]() {
      const n = this.stack;
      return n ? `${this.toString()}
${n.split(`
`).slice(1).join(`
`)}` : this.toString();
    }
  }
  return Object.assign(t.prototype, Gd), t;
}(), Ji = (t, e) => {
  class n extends Wl {
    constructor() {
      super(...arguments);
      f(this, "_tag", e);
    }
  }
  return Object.assign(n.prototype, t), n.prototype.name = e, n;
}, ba = /* @__PURE__ */ Symbol.for("effect/Cause/errors/RuntimeException"), Ty = /* @__PURE__ */ Ji({
  [ba]: ba
}, "RuntimeException"), $y = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InterruptedException"), Fy = (t) => D(t, $y), va = /* @__PURE__ */ Symbol.for("effect/Cause/errors/IllegalArgument"), Ay = /* @__PURE__ */ Ji({
  [va]: va
}, "IllegalArgumentException"), Sa = /* @__PURE__ */ Symbol.for("effect/Cause/errors/NoSuchElement"), Gl = /* @__PURE__ */ Ji({
  [Sa]: Sa
}, "NoSuchElementException"), wa = /* @__PURE__ */ Symbol.for("effect/Cause/errors/UnknownException"), My = /* @__PURE__ */ function() {
  class t extends Wl {
    constructor(r, s) {
      super(s ?? (D(r, "message") && eu(r.message) ? r.message : void 0));
      f(this, "error");
      f(this, "_tag", "UnknownException");
      this.error = r;
    }
  }
  return Object.assign(t.prototype, {
    [wa]: wa,
    name: "UnknownException"
  }), t;
}(), Wi = (t) => Tl(t) && "_tag" in t && (t._tag === "Success" || t._tag === "Failure"), eo = (t, e) => Dy(t, e != null && e.parallel ? lr : tt), ka = (t) => Z(ut(t)), Ea = (t) => Z(Io(t)), Z = (t) => {
  const e = new Il(je);
  return e.effect_instruction_i0 = t, e;
}, Py = /* @__PURE__ */ g(2, (t, e) => {
  switch (t._tag) {
    case je:
      return Z(t.effect_instruction_i0);
    case Le:
      return e(t.effect_instruction_i0);
  }
}), Ny = (t) => m(t, Py(Ve)), xy = (t) => Z(Ct(t)), to = /* @__PURE__ */ g(2, (t, e) => {
  switch (t._tag) {
    case je:
      return Z(t.effect_instruction_i0);
    case Le:
      return Oe(e(t.effect_instruction_i0));
  }
}), zl = /* @__PURE__ */ g(2, (t, {
  onFailure: e,
  onSuccess: n
}) => {
  switch (t._tag) {
    case je:
      return e(t.effect_instruction_i0);
    case Le:
      return n(t.effect_instruction_i0);
  }
}), jy = /* @__PURE__ */ g(2, (t, {
  onFailure: e,
  onSuccess: n
}) => {
  switch (t._tag) {
    case je:
      return e(t.effect_instruction_i0);
    case Le:
      return n(t.effect_instruction_i0);
  }
}), Oe = (t) => {
  const e = new Cl(Le);
  return e.effect_instruction_i0 = t, e;
}, Tt = /* @__PURE__ */ Oe(void 0), Ly = /* @__PURE__ */ g(3, (t, e, {
  onFailure: n,
  onSuccess: r
}) => {
  switch (t._tag) {
    case je:
      switch (e._tag) {
        case Le:
          return Z(t.effect_instruction_i0);
        case je:
          return Z(n(t.effect_instruction_i0, e.effect_instruction_i0));
      }
    case Le:
      switch (e._tag) {
        case Le:
          return Oe(r(t.effect_instruction_i0, e.effect_instruction_i0));
        case je:
          return Z(e.effect_instruction_i0);
      }
  }
}), Dy = (t, e) => {
  const n = ys(t);
  return xt(n) ? m(yt(n), Wn(m(jt(n), to(Je)), (r, s) => m(r, Ly(s, {
    onSuccess: (o, c) => m(o, Ye(c)),
    onFailure: e
  }))), to(fn), to((r) => Ft(r)), H) : M();
}, Yl = (t) => ({
  [B_]: V_,
  state: ki(K_([])),
  blockingOn: t,
  pipe() {
    return A(this, arguments);
  }
}), Uy = () => T(Nl, (t) => qy(t)), qy = (t) => $(() => Yl(t)), Ql = (t) => lt((e) => {
  const n = Ut(t.state);
  switch (n._tag) {
    case Ai:
      return e(n.effect);
    case fr:
      return n.joiners.push(e), Ky(t, e);
  }
}, t.blockingOn), Xl = /* @__PURE__ */ g(2, (t, e) => $(() => {
  const n = Ut(t.state);
  switch (n._tag) {
    case Ai:
      return !1;
    case fr: {
      Rs(t.state, El(e));
      for (let r = 0, s = n.joiners.length; r < s; r++)
        n.joiners[r](e);
      return !0;
    }
  }
})), By = /* @__PURE__ */ g(2, (t, e) => Xl(t, Qe(e))), Vy = /* @__PURE__ */ g(2, (t, e) => Xl(t, ie(e))), Zl = (t, e) => {
  const n = Ut(t.state);
  if (n._tag === fr) {
    Rs(t.state, El(e));
    for (let r = 0, s = n.joiners.length; r < s; r++)
      n.joiners[r](e);
  }
}, Ky = (t, e) => $(() => {
  const n = Ut(t.state);
  if (n._tag === fr) {
    const r = n.joiners.indexOf(e);
    r >= 0 && n.joiners.splice(r, 1);
  }
}), ef = (t) => {
  const e = t.getFiberRef(pr).unsafeMap.get(Ol.key);
  return e !== void 0 && e._tag === "Span" ? H(e) : M();
}, Hy = Ql, Mo = /* @__PURE__ */ Symbol.for("effect/Duration"), Zt = /* @__PURE__ */ BigInt(0), no = /* @__PURE__ */ BigInt(24), Qt = /* @__PURE__ */ BigInt(60), Vr = /* @__PURE__ */ BigInt(1e3), ro = /* @__PURE__ */ BigInt(1e6), Po = /* @__PURE__ */ BigInt(1e9), Oa = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/, wt = (t) => {
  if (tf(t))
    return t;
  if (xr(t))
    return No(t);
  if (Od(t))
    return so(t);
  if (Array.isArray(t)) {
    if (t.length === 2 && xr(t[0]) && xr(t[1]))
      return so(BigInt(t[0]) * Po + BigInt(t[1]));
  } else if (eu(t)) {
    Oa.lastIndex = 0;
    const e = Oa.exec(t);
    if (e) {
      const [n, r, s] = e, o = Number(r);
      switch (s) {
        case "nano":
        case "nanos":
          return so(BigInt(r));
        case "micro":
        case "micros":
          return zy(BigInt(r));
        case "milli":
        case "millis":
          return No(o);
        case "second":
        case "seconds":
          return Yy(o);
        case "minute":
        case "minutes":
          return Qy(o);
        case "hour":
        case "hours":
          return Xy(o);
        case "day":
        case "days":
          return Zy(o);
        case "week":
        case "weeks":
          return eb(o);
      }
    }
  }
  throw new Error("Invalid DurationInput");
}, Ra = {
  _tag: "Millis",
  millis: 0
}, Jy = {
  _tag: "Infinity"
}, Wy = {
  [Mo]: Mo,
  [j]() {
    return ue(this, su(this.value));
  },
  [P](t) {
    return tf(t) && ob(this, t);
  },
  toString() {
    return `Duration(${ib(this)})`;
  },
  toJSON() {
    switch (this.value._tag) {
      case "Millis":
        return {
          _id: "Duration",
          _tag: "Millis",
          millis: this.value.millis
        };
      case "Nanos":
        return {
          _id: "Duration",
          _tag: "Nanos",
          hrtime: nb(this)
        };
      case "Infinity":
        return {
          _id: "Duration",
          _tag: "Infinity"
        };
    }
  },
  [he]() {
    return this.toJSON();
  },
  pipe() {
    return A(this, arguments);
  }
}, dt = (t) => {
  const e = Object.create(Wy);
  return xr(t) ? isNaN(t) || t <= 0 ? e.value = Ra : Number.isFinite(t) ? Number.isInteger(t) ? e.value = {
    _tag: "Millis",
    millis: t
  } : e.value = {
    _tag: "Nanos",
    nanos: BigInt(Math.round(t * 1e6))
  } : e.value = Jy : t <= Zt ? e.value = Ra : e.value = {
    _tag: "Nanos",
    nanos: t
  }, e;
}, tf = (t) => D(t, Mo), Gy = /* @__PURE__ */ dt(0), so = (t) => dt(t), zy = (t) => dt(t * Vr), No = (t) => dt(t), Yy = (t) => dt(t * 1e3), Qy = (t) => dt(t * 6e4), Xy = (t) => dt(t * 36e5), Zy = (t) => dt(t * 864e5), eb = (t) => dt(t * 6048e5), xo = (t) => {
  const e = wt(t);
  switch (e.value._tag) {
    case "Infinity":
      return 1 / 0;
    case "Nanos":
      return Number(e.value.nanos) / 1e6;
    case "Millis":
      return e.value.millis;
  }
}, tb = (t) => {
  const e = wt(t);
  switch (e.value._tag) {
    case "Infinity":
      throw new Error("Cannot convert infinite duration to nanos");
    case "Nanos":
      return e.value.nanos;
    case "Millis":
      return BigInt(Math.round(e.value.millis * 1e6));
  }
}, nb = (t) => {
  const e = wt(t);
  switch (e.value._tag) {
    case "Infinity":
      return [1 / 0, 0];
    case "Nanos":
      return [Number(e.value.nanos / Po), Number(e.value.nanos % Po)];
    case "Millis":
      return [Math.floor(e.value.millis / 1e3), Math.round(e.value.millis % 1e3 * 1e6)];
  }
}, nf = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = wt(t), s = wt(e);
  if (r.value._tag === "Infinity" || s.value._tag === "Infinity")
    return n.onMillis(xo(r), xo(s));
  if (r.value._tag === "Nanos" || s.value._tag === "Nanos") {
    const o = r.value._tag === "Nanos" ? r.value.nanos : BigInt(Math.round(r.value.millis * 1e6)), c = s.value._tag === "Nanos" ? s.value.nanos : BigInt(Math.round(s.value.millis * 1e6));
    return n.onNanos(o, c);
  }
  return n.onMillis(r.value.millis, s.value.millis);
}), rb = (t, e) => nf(t, e, {
  onMillis: (n, r) => n === r,
  onNanos: (n, r) => n === r
}), sb = /* @__PURE__ */ g(2, (t, e) => nf(t, e, {
  onMillis: (n, r) => n >= r,
  onNanos: (n, r) => n >= r
})), ob = /* @__PURE__ */ g(2, (t, e) => rb(wt(t), wt(e))), ib = (t) => {
  const e = wt(t), n = [];
  if (e.value._tag === "Infinity")
    return "Infinity";
  const r = tb(e);
  r % ro && n.push(`${r % ro}ns`);
  const s = r / ro;
  s % Vr !== Zt && n.push(`${s % Vr}ms`);
  const o = s / Vr;
  o % Qt !== Zt && n.push(`${o % Qt}s`);
  const c = o / Qt;
  c % Qt !== Zt && n.push(`${c % Qt}m`);
  const a = c / Qt;
  a % no !== Zt && n.push(`${a % no}h`);
  const u = a / no;
  return u !== Zt && n.push(`${u}d`), n.reverse().join(" ");
}, cb = Ny, Ia = /* @__PURE__ */ Symbol.for("effect/MutableHashMap"), ab = {
  [Ia]: Ia,
  [Symbol.iterator]() {
    return new Gi(this);
  },
  toString() {
    return Ie(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableHashMap",
      values: Array.from(this).map(ye)
    };
  },
  [he]() {
    return this.toJSON();
  },
  pipe() {
    return A(this, arguments);
  }
};
class Gi {
  constructor(e) {
    f(this, "self");
    f(this, "referentialIterator");
    f(this, "bucketIterator");
    this.self = e, this.referentialIterator = e.referential[Symbol.iterator]();
  }
  next() {
    if (this.bucketIterator !== void 0)
      return this.bucketIterator.next();
    const e = this.referentialIterator.next();
    return e.done ? (this.bucketIterator = new ub(this.self.buckets.values()), this.next()) : e;
  }
  [Symbol.iterator]() {
    return new Gi(this.self);
  }
}
class ub {
  constructor(e) {
    f(this, "backing");
    f(this, "currentBucket");
    this.backing = e;
  }
  next() {
    if (this.currentBucket === void 0) {
      const n = this.backing.next();
      if (n.done)
        return n;
      this.currentBucket = n.value[Symbol.iterator]();
    }
    const e = this.currentBucket.next();
    return e.done ? (this.currentBucket = void 0, this.next()) : e;
  }
}
const lb = () => {
  const t = Object.create(ab);
  return t.referential = /* @__PURE__ */ new Map(), t.buckets = /* @__PURE__ */ new Map(), t.bucketsSize = 0, t;
}, It = /* @__PURE__ */ g(2, (t, e) => {
  if (Gr(e) === !1)
    return t.referential.has(e) ? H(t.referential.get(e)) : M();
  const n = e[j](), r = t.buckets.get(n);
  return r === void 0 ? M() : fb(t, r, e);
}), fb = (t, e, n, r = !1) => {
  for (let s = 0, o = e.length; s < o; s++)
    if (n[P](e[s][0])) {
      const c = e[s][1];
      return r && (e.splice(s, 1), t.bucketsSize--), H(c);
    }
  return M();
}, Nn = /* @__PURE__ */ g(2, (t, e) => nt(It(t, e))), xn = /* @__PURE__ */ g(3, (t, e, n) => {
  if (Gr(e) === !1)
    return t.referential.set(e, n), t;
  const r = e[j](), s = t.buckets.get(r);
  return s === void 0 ? (t.buckets.set(r, [[e, n]]), t.bucketsSize++, t) : (hb(t, s, e), s.push([e, n]), t.bucketsSize++, t);
}), hb = (t, e, n) => {
  for (let r = 0, s = e.length; r < s; r++)
    if (n[P](e[r][0])) {
      e.splice(r, 1), t.bucketsSize--;
      return;
    }
}, db = "effect/Clock", Ca = /* @__PURE__ */ Symbol.for(db), zi = /* @__PURE__ */ wn("effect/Clock"), pb = 2 ** 31 - 1, Ta = {
  unsafeSchedule(t, e) {
    const n = xo(e);
    if (n > pb)
      return ho;
    let r = !1;
    const s = setTimeout(() => {
      r = !0, t();
    }, n);
    return () => (clearTimeout(s), !r);
  }
}, $a = /* @__PURE__ */ function() {
  const t = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance > "u")
    return () => BigInt(Date.now()) * t;
  const e = "timeOrigin" in performance && typeof performance.timeOrigin == "number" ? /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(performance.timeOrigin * 1e6)) : /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * t - /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(/* @__PURE__ */ performance.now() * 1e6));
  return () => e + BigInt(Math.round(performance.now() * 1e6));
}(), gb = /* @__PURE__ */ function() {
  const t = typeof process == "object" && "hrtime" in process && typeof process.hrtime.bigint == "function" ? process.hrtime : void 0;
  if (!t)
    return $a;
  const e = /* @__PURE__ */ $a() - /* @__PURE__ */ t.bigint();
  return () => e + t.bigint();
}();
var Jw;
class mb {
  constructor() {
    f(this, Jw, Ca);
    f(this, "currentTimeMillis", $(() => this.unsafeCurrentTimeMillis()));
    f(this, "currentTimeNanos", $(() => this.unsafeCurrentTimeNanos()));
  }
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return gb();
  }
  scheduler() {
    return ie(Ta);
  }
  sleep(e) {
    return lt((n) => {
      const r = Ta.unsafeSchedule(() => n(Ue), e);
      return Ht($(r));
    });
  }
}
Jw = Ca;
const _b = () => new mb(), nr = rp, yb = (t) => t.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&"), rf = "And", sf = "Or", of = "InvalidData", cf = "MissingData", af = "SourceUnavailable", uf = "Unsupported", bb = "effect/ConfigError", Fa = /* @__PURE__ */ Symbol.for(bb), $n = {
  _tag: "ConfigError",
  [Fa]: Fa
}, lf = (t, e) => {
  const n = Object.create($n);
  return n._op = rf, n.left = t, n.right = e, Object.defineProperty(n, "toString", {
    enumerable: !1,
    value() {
      return `${this.left} and ${this.right}`;
    }
  }), n;
}, ff = (t, e) => {
  const n = Object.create($n);
  return n._op = sf, n.left = t, n.right = e, Object.defineProperty(n, "toString", {
    enumerable: !1,
    value() {
      return `${this.left} or ${this.right}`;
    }
  }), n;
}, vb = (t, e, n = {
  pathDelim: "."
}) => {
  const r = Object.create($n);
  return r._op = of, r.path = t, r.message = e, Object.defineProperty(r, "toString", {
    enumerable: !1,
    value() {
      return `(Invalid data at ${m(this.path, Sn(n.pathDelim))}: "${this.message}")`;
    }
  }), r;
}, Bt = (t, e, n = {
  pathDelim: "."
}) => {
  const r = Object.create($n);
  return r._op = cf, r.path = t, r.message = e, Object.defineProperty(r, "toString", {
    enumerable: !1,
    value() {
      return `(Missing data at ${m(this.path, Sn(n.pathDelim))}: "${this.message}")`;
    }
  }), r;
}, Sb = (t, e, n, r = {
  pathDelim: "."
}) => {
  const s = Object.create($n);
  return s._op = af, s.path = t, s.message = e, s.cause = n, Object.defineProperty(s, "toString", {
    enumerable: !1,
    value() {
      return `(Source unavailable at ${m(this.path, Sn(r.pathDelim))}: "${this.message}")`;
    }
  }), s;
}, wb = (t, e, n = {
  pathDelim: "."
}) => {
  const r = Object.create($n);
  return r._op = uf, r.path = t, r.message = e, Object.defineProperty(r, "toString", {
    enumerable: !1,
    value() {
      return `(Unsupported operation at ${m(this.path, Sn(n.pathDelim))}: "${this.message}")`;
    }
  }), r;
}, $t = /* @__PURE__ */ g(2, (t, e) => {
  switch (t._op) {
    case rf:
      return lf($t(t.left, e), $t(t.right, e));
    case sf:
      return ff($t(t.left, e), $t(t.right, e));
    case of:
      return vb([...e, ...t.path], t.message);
    case cf:
      return Bt([...e, ...t.path], t.message);
    case af:
      return Sb([...e, ...t.path], t.message, t.cause);
    case uf:
      return wb([...e, ...t.path], t.message);
  }
}), kb = {
  _tag: "Empty"
}, oo = /* @__PURE__ */ g(2, (t, e) => {
  let n = Ri(e), r = t;
  for (; ol(n); ) {
    const s = n.head;
    switch (s._tag) {
      case "Empty": {
        n = n.tail;
        break;
      }
      case "AndThen": {
        n = qt(s.first, qt(s.second, n.tail));
        break;
      }
      case "MapName": {
        r = rn(r, s.f), n = n.tail;
        break;
      }
      case "Nested": {
        r = Xr(r, s.name), n = n.tail;
        break;
      }
      case "Unnested": {
        if (m(Bn(r), fp(s.name)))
          r = un(r), n = n.tail;
        else
          return Pt(Bt(r, `Expected ${s.name} to be in path in ConfigProvider#unnested`));
        break;
      }
    }
  }
  return at(r);
}), Eb = "Constant", Ob = "Fail", Rb = "Fallback", Ib = "Described", Cb = "Lazy", Tb = "MapOrFail", $b = "Nested", Fb = "Primitive", Ab = "Sequence", Mb = "HashMap", Pb = "ZipWith", cs = (t, e) => [...t, ...e], Nb = "effect/ConfigProvider", Aa = /* @__PURE__ */ Symbol.for(Nb), xb = /* @__PURE__ */ wn("effect/ConfigProvider"), jb = "effect/ConfigProviderFlat", Ma = /* @__PURE__ */ Symbol.for(jb), Lb = (t) => ({
  [Aa]: Aa,
  pipe() {
    return A(this, arguments);
  },
  ...t
}), Db = (t) => ({
  [Ma]: Ma,
  patch: t.patch,
  load: (e, n, r = !0) => t.load(e, n, r),
  enumerateChildren: t.enumerateChildren
}), Ub = (t) => Lb({
  load: (e) => T(ze(t, ln(), e, !1), (n) => ui(Bn(n), {
    onNone: () => Be(Bt(ln(), `Expected a single value having structure: ${e}`)),
    onSome: ie
  })),
  flattened: t
}), qb = (t) => {
  const {
    pathDelim: e,
    seqDelim: n
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, t), r = (u) => m(u, Sn(e)), s = (u) => u.split(e), o = () => typeof process < "u" && "env" in process && typeof process.env == "object" ? process.env : {};
  return Ub(Db({
    load: (u, h, b = !0) => {
      const y = r(u), k = o(), w = y in k ? H(k[y]) : M();
      return m(w, xi(() => Bt(u, `Expected ${y} to exist in the process context`)), T((R) => Jb(R, u, h, n, b)));
    },
    enumerateChildren: (u) => $(() => {
      const h = o(), k = Object.keys(h).map((w) => s(w.toUpperCase())).filter((w) => {
        for (let R = 0; R < u.length; R++) {
          const J = m(u, Iu(R)), B = w[R];
          if (B === void 0 || J !== B)
            return !1;
        }
        return !0;
      }).flatMap((w) => w.slice(u.length, u.length + 1));
      return Ng(k);
    }),
    patch: kb
  }));
}, Bb = (t, e, n, r) => {
  const s = Zc(n.length, (u) => u >= r.length ? M() : H([t(u), u + 1])), o = Zc(r.length, (u) => u >= n.length ? M() : H([e(u), u + 1])), c = cs(n, s), a = cs(r, o);
  return [c, a];
}, Vb = (t, e) => {
  let n = e;
  if (n._tag === "Nested") {
    const r = t.slice();
    for (; n._tag === "Nested"; )
      r.push(n.name), n = n.config;
    return r;
  }
  return t;
}, ze = (t, e, n, r) => {
  const s = n;
  switch (s._tag) {
    case Eb:
      return ie(Xe(s.value));
    case Ib:
      return Ae(() => ze(t, e, s.config, r));
    case Ob:
      return Be(Bt(e, s.message));
    case Rb:
      return m(Ae(() => ze(t, e, s.first, r)), ma((o) => s.condition(o) ? m(ze(t, e, s.second, r), ma((c) => Be(ff(o, c)))) : Be(o)));
    case Cb:
      return Ae(() => ze(t, e, s.config(), r));
    case Tb:
      return Ae(() => m(ze(t, e, s.original, r), T(bt((o) => m(s.mapOrFail(o), xi($t(Vb(e, s.original))))))));
    case $b:
      return Ae(() => ze(t, cs(e, Xe(s.name)), s.config, r));
    case Fb:
      return m(oo(e, t.patch), T((o) => m(t.load(o, s, r), T((c) => {
        if (c.length === 0) {
          const a = m(vp(o), Nt(() => "<n/a>"));
          return Be(Bt([], `Expected ${s.description} with name ${a}`));
        }
        return ie(c);
      }))));
    case Ab:
      return m(oo(e, t.patch), T((o) => m(t.enumerateChildren(o), T(Gb), T((c) => c.length === 0 ? Ae(() => Me(ze(t, o, s.config, !0), Xe)) : m(bt(c, (a) => ze(t, pp(e, `[${a}]`), s.config, !0)), Me((a) => {
        const u = Fp(a);
        return u.length === 0 ? Xe(ln()) : Xe(u);
      }))))));
    case Mb:
      return Ae(() => m(oo(e, t.patch), T((o) => m(t.enumerateChildren(o), T((c) => m(c, bt((a) => ze(t, cs(o, Xe(a)), s.valueConfig, r)), Me((a) => a.length === 0 ? Xe(Oi()) : m(Wb(a), rn((u) => Hg(Xc(Se(c), u)))))))))));
    case Pb:
      return Ae(() => m(ze(t, e, s.left, r), $o, T((o) => m(ze(t, e, s.right, r), $o, T((c) => {
        if (Dn(o) && Dn(c))
          return Be(lf(o.left, c.left));
        if (Dn(o) && $r(c))
          return Be(o.left);
        if ($r(o) && Dn(c))
          return Be(c.left);
        if ($r(o) && $r(c)) {
          const a = m(e, Sn(".")), u = Kb(e, a), [h, b] = Bb(u, u, m(o.right, rn(at)), m(c.right, rn(at)));
          return m(h, Xc(b), bt(([y, k]) => m(ql(y, k), Me(([w, R]) => s.zip(w, R)))));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
      })))));
  }
}, Kb = (t, e) => (n) => Pt(Bt(t, `The element at index ${n} in a sequence at path "${e}" was missing`)), Hb = (t, e) => t.split(new RegExp(`\\s*${yb(e)}\\s*`)), Jb = (t, e, n, r, s) => s ? m(Hb(t, r), bt((o) => n.parse(o.trim())), xi($t(e))) : m(n.parse(t), jl({
  onFailure: $t(e),
  onSuccess: Xe
})), Wb = (t) => Object.keys(t[0]).map((e) => t.map((n) => n[e])), Gb = (t) => m(bt(t, Yb), jl({
  onFailure: () => ln(),
  onSuccess: Zr(nr)
}), $o, Me(np)), zb = /^(\[(\d+)\])$/, Yb = (t) => {
  const e = t.match(zb);
  if (e !== null) {
    const n = e[2];
    return m(n !== void 0 && n.length > 0 ? H(n) : M(), Eu(Qb));
  }
  return M();
}, Qb = (t) => {
  const e = Number.parseInt(t);
  return Number.isNaN(e) ? M() : H(e);
}, Pa = /* @__PURE__ */ Symbol.for("effect/Console"), hf = /* @__PURE__ */ wn("effect/Console"), Xb = {
  [Pa]: Pa,
  assert(t, ...e) {
    return $(() => {
      console.assert(t, ...e);
    });
  },
  clear: /* @__PURE__ */ $(() => {
    console.clear();
  }),
  count(t) {
    return $(() => {
      console.count(t);
    });
  },
  countReset(t) {
    return $(() => {
      console.countReset(t);
    });
  },
  debug(...t) {
    return $(() => {
      console.debug(...t);
    });
  },
  dir(t, e) {
    return $(() => {
      console.dir(t, e);
    });
  },
  dirxml(...t) {
    return $(() => {
      console.dirxml(...t);
    });
  },
  error(...t) {
    return $(() => {
      console.error(...t);
    });
  },
  group(t) {
    return t != null && t.collapsed ? $(() => console.groupCollapsed(t == null ? void 0 : t.label)) : $(() => console.group(t == null ? void 0 : t.label));
  },
  groupEnd: /* @__PURE__ */ $(() => {
    console.groupEnd();
  }),
  info(...t) {
    return $(() => {
      console.info(...t);
    });
  },
  log(...t) {
    return $(() => {
      console.log(...t);
    });
  },
  table(t, e) {
    return $(() => {
      console.table(t, e);
    });
  },
  time(t) {
    return $(() => console.time(t));
  },
  timeEnd(t) {
    return $(() => console.timeEnd(t));
  },
  timeLog(t, ...e) {
    return $(() => {
      console.timeLog(t, ...e);
    });
  },
  trace(...t) {
    return $(() => {
      console.trace(...t);
    });
  },
  warn(...t) {
    return $(() => {
      console.warn(...t);
    });
  },
  unsafe: console
}, Zb = "effect/Random", Na = /* @__PURE__ */ Symbol.for(Zb), ev = /* @__PURE__ */ wn("effect/Random");
var Ww;
class tv {
  constructor(e) {
    f(this, "seed");
    f(this, Ww, Na);
    f(this, "PRNG");
    this.seed = e, this.PRNG = new ru(e);
  }
  get next() {
    return $(() => this.PRNG.number());
  }
  get nextBoolean() {
    return Me(this.next, (e) => e > 0.5);
  }
  get nextInt() {
    return $(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(e, n) {
    return Me(this.next, (r) => (n - e) * r + e);
  }
  nextIntBetween(e, n) {
    return $(() => this.PRNG.integer(n - e) + e);
  }
  shuffle(e) {
    return nv(e, (n) => this.nextIntBetween(0, n));
  }
}
Ww = Na;
const nv = (t, e) => Ae(() => m($(() => Array.from(t)), T((n) => {
  const r = [];
  for (let s = n.length; s >= 2; s = s - 1)
    r.push(s);
  return m(r, Ni((s) => m(e(s), Me((o) => rv(n, s - 1, o)))), Cn(ys(n)));
}))), rv = (t, e, n) => {
  const r = t[e];
  return t[e] = t[n], t[n] = r, t;
}, sv = (t) => new tv(t), ov = /* @__PURE__ */ m(/* @__PURE__ */ di(), /* @__PURE__ */ Pn(zi, /* @__PURE__ */ _b()), /* @__PURE__ */ Pn(hf, Xb), /* @__PURE__ */ Pn(ev, /* @__PURE__ */ sv(/* @__PURE__ */ Math.random() * 4294967296 >>> 0)), /* @__PURE__ */ Pn(xb, /* @__PURE__ */ qb()), /* @__PURE__ */ Pn(To, W_)), Hn = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/DefaultServices/currentServices"), () => Jl(ov));
function iv(t) {
  return new kt(t);
}
function cv() {
  return iv(/* @__PURE__ */ new Map());
}
const xa = /* @__PURE__ */ Symbol.for("effect/FiberRefs");
var Gw;
class kt {
  constructor(e) {
    f(this, "locals");
    f(this, Gw, xa);
    this.locals = e;
  }
  pipe() {
    return A(this, arguments);
  }
}
Gw = xa;
const av = (t, e, n, r = !1) => {
  const s = t;
  let o = e, c = n, a = r, u;
  for (; u === void 0; )
    if (He(o) && He(c)) {
      const h = Ke(o)[0], b = un(o), y = Ke(c)[0], k = Ke(c)[1], w = un(c);
      h.startTimeMillis < y.startTimeMillis ? (c = w, a = !0) : h.startTimeMillis > y.startTimeMillis ? o = b : h.id < y.id ? (c = w, a = !0) : h.id > y.id ? o = b : u = [k, a];
    } else
      u = [s.initial, !0];
  return u;
}, uv = /* @__PURE__ */ g(3, (t, e, n) => {
  const r = new Map(t.locals);
  return n.locals.forEach((s, o) => {
    const c = s[0][1];
    if (!s[0][0][P](e)) {
      if (!r.has(o)) {
        if (N(c, o.initial))
          return;
        r.set(o, [[e, o.join(o.initial, c)]]);
        return;
      }
      const a = r.get(o), [u, h] = av(o, a, s);
      if (h) {
        const b = o.diff(u, c), y = a[0][1], k = o.join(y, o.patch(b)(y));
        if (!N(y, k)) {
          let w;
          const R = a[0][0];
          R[P](e) ? w = [[R, k], ...a.slice(1)] : w = [[e, k], ...a], r.set(o, w);
        }
      }
    }
  }), new kt(r);
}), lv = /* @__PURE__ */ g(2, (t, e) => {
  const n = /* @__PURE__ */ new Map();
  return df(t, n, e), new kt(n);
}), df = (t, e, n) => {
  t.locals.forEach((r, s) => {
    const o = r[0][1], c = s.patch(s.fork)(o);
    N(o, c) ? e.set(s, r) : e.set(s, [[n, c], ...r]);
  });
}, pf = /* @__PURE__ */ g(2, (t, e) => {
  const n = new Map(t.locals);
  return n.delete(e), new kt(n);
}), jo = /* @__PURE__ */ g(2, (t, e) => t.locals.has(e) ? H(Ke(t.locals.get(e))[1]) : M()), Yi = /* @__PURE__ */ g(2, (t, e) => m(jo(t, e), Nt(() => e.initial))), Lo = /* @__PURE__ */ g(2, (t, {
  fiberId: e,
  fiberRef: n,
  value: r
}) => {
  if (t.locals.size === 0)
    return new kt(/* @__PURE__ */ new Map([[n, [[e, r]]]]));
  const s = new Map(t.locals);
  return Do(s, e, n, r), new kt(s);
}), Do = (t, e, n, r) => {
  const s = t.get(n) ?? [];
  let o;
  if (He(s)) {
    const [c, a] = Ke(s);
    if (c[P](e)) {
      if (N(a, r))
        return;
      o = [[e, r], ...s.slice(1)];
    } else
      o = [[e, r], ...s];
  } else
    o = [[e, r]];
  t.set(n, o);
}, fv = /* @__PURE__ */ g(2, (t, {
  entries: e,
  forkAs: n
}) => {
  if (t.locals.size === 0)
    return new kt(new Map(e));
  const r = new Map(t.locals);
  return n !== void 0 && df(t, r, n), e.forEach(([s, o]) => {
    o.length === 1 ? Do(r, o[0][0], s, o[0][1]) : o.forEach(([c, a]) => {
      Do(r, c, s, a);
    });
  }), new kt(r);
}), hv = Yi, dv = fv, pv = cv, gv = ay, mv = uy, _v = ly, yv = fy, bv = Bl, vv = Vl, Sv = hy, wv = dy, kv = /* @__PURE__ */ m(nr, /* @__PURE__ */ sp((t) => t.ordinal)), Ev = /* @__PURE__ */ op(kv), Ov = (t) => {
  switch (t) {
    case "All":
      return gv;
    case "Debug":
      return vv;
    case "Error":
      return _v;
    case "Fatal":
      return mv;
    case "Info":
      return bv;
    case "Trace":
      return Sv;
    case "None":
      return wv;
    case "Warning":
      return yv;
  }
}, Rv = (t) => (e) => `${e.label.replace(/[\s="]/g, "_")}=${t - e.startTime}ms`, Iv = Rv, io = /* @__PURE__ */ Symbol.for("effect/Readable"), Cv = /* @__PURE__ */ Symbol.for("effect/Ref"), Tv = {
  /* c8 ignore next */
  _A: (t) => t
};
var zw, Yw;
class $v {
  constructor(e) {
    f(this, "ref");
    f(this, zw, Tv);
    f(this, Yw);
    f(this, "get");
    this.ref = e, this[io] = io, this.get = $(() => Ut(this.ref));
  }
  modify(e) {
    return $(() => {
      const n = Ut(this.ref), [r, s] = e(n);
      return n !== s && Rs(s)(this.ref), r;
    });
  }
  pipe() {
    return A(this, arguments);
  }
}
zw = Cv, Yw = io;
const Fv = (t) => new $v(ki(t)), Av = (t) => $(() => Fv(t)), Mv = /* @__PURE__ */ g(2, (t, e) => t.modify(e)), Pv = Av, Nv = Mv, gf = "Empty", mf = "Add", _f = "Remove", yf = "Update", bf = "AndThen", xv = {
  _tag: gf
}, jv = (t, e) => {
  const n = new Map(t.locals);
  let r = xv;
  for (const [s, o] of e.locals.entries()) {
    const c = Ke(o)[1], a = n.get(s);
    if (a !== void 0) {
      const u = Ke(a)[1];
      N(u, c) || (r = co({
        _tag: yf,
        fiberRef: s,
        patch: s.diff(u, c)
      })(r));
    } else
      r = co({
        _tag: mf,
        fiberRef: s,
        value: c
      })(r);
    n.delete(s);
  }
  for (const [s] of n.entries())
    r = co({
      _tag: _f,
      fiberRef: s
    })(r);
  return r;
}, co = /* @__PURE__ */ g(2, (t, e) => ({
  _tag: bf,
  first: t,
  second: e
})), Lv = /* @__PURE__ */ g(3, (t, e, n) => {
  let r = n, s = Xe(t);
  for (; He(s); ) {
    const o = Ke(s), c = un(s);
    switch (o._tag) {
      case gf: {
        s = c;
        break;
      }
      case mf: {
        r = Lo(r, {
          fiberId: e,
          fiberRef: o.fiberRef,
          value: o.value
        }), s = c;
        break;
      }
      case _f: {
        r = pf(r, o.fiberRef), s = c;
        break;
      }
      case yf: {
        const a = Yi(r, o.fiberRef);
        r = Lo(r, {
          fiberId: e,
          fiberRef: o.fiberRef,
          value: o.fiberRef.patch(o.patch)(a)
        }), s = c;
        break;
      }
      case bf: {
        s = Xr(o.first)(Xr(o.second)(c));
        break;
      }
    }
  }
  return r;
}), vf = "effect/MetricLabel", Uo = /* @__PURE__ */ Symbol.for(vf);
var Qw;
class Dv {
  constructor(e, n) {
    f(this, "key");
    f(this, "value");
    f(this, Qw, Uo);
    f(this, "_hash");
    this.key = e, this.value = n, this._hash = me(vf + this.key + this.value);
  }
  [(Qw = Uo, j)]() {
    return this._hash;
  }
  [P](e) {
    return qv(e) && this.key === e.key && this.value === e.value;
  }
  pipe() {
    return A(this, arguments);
  }
}
const Uv = (t, e) => new Dv(t, e), qv = (t) => D(t, Uo), Bv = (t) => t.length >= 1 ? lt((e, n) => {
  t(n).then((r) => e(Oe(r)), (r) => e(ka(r)));
}) : lt((e) => {
  t().then((n) => e(Oe(n)), (n) => e(ka(n)));
}), ja = cu, Vv = "Sequential", Kv = {
  _tag: Vv
}, Hv = jv, Jv = Lv, As = "effect/FiberStatus", Vt = /* @__PURE__ */ Symbol.for(As), as = "Done", La = "Running", Da = "Suspended", Wv = /* @__PURE__ */ me(`${As}-${as}`);
var Xw;
class Gv {
  constructor() {
    f(this, Xw, Vt);
    f(this, "_tag", as);
  }
  [(Xw = Vt, j)]() {
    return Wv;
  }
  [P](e) {
    return Qi(e) && e._tag === as;
  }
}
var Zw;
class zv {
  constructor(e) {
    f(this, "runtimeFlags");
    f(this, Zw, Vt);
    f(this, "_tag", La);
    this.runtimeFlags = e;
  }
  [(Zw = Vt, j)]() {
    return m(I(As), K(I(this._tag)), K(I(this.runtimeFlags)), ue(this));
  }
  [P](e) {
    return Qi(e) && e._tag === La && this.runtimeFlags === e.runtimeFlags;
  }
}
var ek;
class Yv {
  constructor(e, n) {
    f(this, "runtimeFlags");
    f(this, "blockingOn");
    f(this, ek, Vt);
    f(this, "_tag", Da);
    this.runtimeFlags = e, this.blockingOn = n;
  }
  [(ek = Vt, j)]() {
    return m(I(As), K(I(this._tag)), K(I(this.runtimeFlags)), K(I(this.blockingOn)), ue(this));
  }
  [P](e) {
    return Qi(e) && e._tag === Da && this.runtimeFlags === e.runtimeFlags && N(this.blockingOn, e.blockingOn);
  }
}
const Qv = /* @__PURE__ */ new Gv(), Xv = (t) => new zv(t), Zv = (t, e) => new Yv(t, e), Qi = (t) => D(t, Vt), eS = (t) => t._tag === as, tS = Qv, Sf = Xv, nS = Zv, rS = eS;
class sS {
  constructor() {
    /**
     * @since 2.0.0
     */
    f(this, "buckets", []);
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(e, n) {
    let r, s;
    for (s = 0; s < this.buckets.length && this.buckets[s][0] <= n; s++)
      r = this.buckets[s];
    if (r)
      r[1].push(e);
    else {
      const o = [];
      for (let c = 0; c < s; c++)
        o.push(this.buckets[c]);
      o.push([n, [e]]);
      for (let c = s; c < this.buckets.length; c++)
        o.push(this.buckets[c]);
      this.buckets = o;
    }
  }
}
class oS {
  constructor(e) {
    f(this, "maxNextTickBeforeTimer");
    /**
     * @since 2.0.0
     */
    f(this, "running", !1);
    /**
     * @since 2.0.0
     */
    f(this, "tasks", new sS());
    this.maxNextTickBeforeTimer = e;
  }
  /**
   * @since 2.0.0
   */
  starveInternal(e) {
    const n = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [r, s] of n)
      for (let o = 0; o < s.length; o++)
        s[o]();
    this.tasks.buckets.length === 0 ? this.running = !1 : this.starve(e);
  }
  /**
   * @since 2.0.0
   */
  starve(e = 0) {
    e >= this.maxNextTickBeforeTimer ? setTimeout(() => this.starveInternal(0), 0) : Promise.resolve(void 0).then(() => this.starveInternal(e + 1));
  }
  /**
   * @since 2.0.0
   */
  shouldYield(e) {
    return e.currentOpCount > e.getFiberRef(vy) ? e.getFiberRef(Hi) : !1;
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(e, n) {
    this.tasks.scheduleTask(e, n), this.running || (this.running = !0, this.starve());
  }
}
const iS = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Scheduler/defaultScheduler"), () => new oS(2048)), qo = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentScheduler"), () => st(iS)), wf = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestMap"), () => st(/* @__PURE__ */ new Map())), Xi = "InterruptSignal", Zi = "Stateful", ec = "Resume", tc = "YieldNow", ao = (t) => ({
  _tag: Xi,
  cause: t
}), Kr = (t) => ({
  _tag: Zi,
  onFiber: t
}), Xt = (t) => ({
  _tag: ec,
  effect: t
}), cS = () => ({
  _tag: tc
}), aS = "effect/FiberScope", us = /* @__PURE__ */ Symbol.for(aS);
var tk;
class uS {
  constructor() {
    f(this, tk, us);
    f(this, "fiberId", Is);
    f(this, "roots", /* @__PURE__ */ new Set());
  }
  add(e, n) {
    this.roots.add(n), n.addObserver(() => {
      this.roots.delete(n);
    });
  }
}
tk = us;
var nk;
class lS {
  constructor(e, n) {
    f(this, "fiberId");
    f(this, "parent");
    f(this, nk, us);
    this.fiberId = e, this.parent = n;
  }
  add(e, n) {
    this.parent.tell(Kr((r) => {
      r.addChild(n), n.addObserver(() => {
        r.removeChild(n);
      });
    }));
  }
}
nk = us;
const fS = (t) => new lS(t.id(), t), nc = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberScope/Global"), () => new uS()), hS = "effect/Fiber", dS = /* @__PURE__ */ Symbol.for(hS), pS = {
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _A: (t) => t
}, gS = "effect/Fiber", mS = /* @__PURE__ */ Symbol.for(gS), _S = (t) => t.await, yS = (t) => t.inheritAll, bS = (t) => Fs(Mi(t.await), t.inheritAll), Ot = "effect/FiberCurrent", vS = "effect/Logger", SS = /* @__PURE__ */ Symbol.for(vS), wS = {
  /* c8 ignore next */
  _Message: (t) => t,
  /* c8 ignore next */
  _Output: (t) => t
}, rc = (t) => ({
  [SS]: wS,
  log: t,
  pipe() {
    return A(this, arguments);
  }
}), kS = /* @__PURE__ */ rc(({
  annotations: t,
  cause: e,
  date: n,
  fiberId: r,
  logLevel: s,
  message: o,
  spans: c
}) => {
  const a = n.getTime();
  let h = [`timestamp=${n.toISOString()}`, `level=${s.label}`, `fiber=${Yu(r)}`].join(" ");
  if (Array.isArray(o))
    for (let b = 0; b < o.length; b++) {
      const y = qn(o[b]);
      y.length > 0 && (h = h + " message=", h = Mr(y, h));
    }
  else {
    const b = qn(o);
    b.length > 0 && (h = h + " message=", h = Mr(b, h));
  }
  if (e != null && e._tag !== "Empty" && (h = h + " cause=", h = Mr(Fi(e), h)), ol(c)) {
    h = h + " ";
    let b = !0;
    for (const y of c)
      b ? b = !1 : h = h + " ", h = h + m(y, Iv(a));
  }
  if (m(t, Wg) > 0) {
    h = h + " ";
    let b = !0;
    for (const [y, k] of t)
      b ? b = !1 : h = h + " ", h = h + RS(y), h = h + "=", h = Mr(qn(k), h);
  }
  return h;
}), ES = (t) => `"${t.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`, OS = /^[^\s"=]+$/, Mr = (t, e) => e + (t.match(OS) ? t : ES(t)), RS = (t) => t.replace(/[\s="]/g, "_"), kf = "effect/MetricBoundaries", Bo = /* @__PURE__ */ Symbol.for(kf);
var rk;
class IS {
  constructor(e) {
    f(this, "values");
    f(this, rk, Bo);
    f(this, "_hash");
    this.values = e, this._hash = m(me(kf), K(sr(this.values)));
  }
  [(rk = Bo, j)]() {
    return this._hash;
  }
  [P](e) {
    return CS(e) && N(this.values, e.values);
  }
  pipe() {
    return A(this, arguments);
  }
}
const CS = (t) => D(t, Bo), TS = (t) => {
  const e = m(t, Ou(Je(Number.POSITIVE_INFINITY)), Ap);
  return new IS(e);
}, $S = (t) => m(dp(t.count - 1, (e) => t.start * Math.pow(t.factor, e)), bs, TS), FS = "effect/MetricKeyType", Ef = /* @__PURE__ */ Symbol.for(FS), Of = "effect/MetricKeyType/Counter", Vo = /* @__PURE__ */ Symbol.for(Of), AS = "effect/MetricKeyType/Frequency", MS = /* @__PURE__ */ Symbol.for(AS), PS = "effect/MetricKeyType/Gauge", NS = /* @__PURE__ */ Symbol.for(PS), Rf = "effect/MetricKeyType/Histogram", Ko = /* @__PURE__ */ Symbol.for(Rf), xS = "effect/MetricKeyType/Summary", jS = /* @__PURE__ */ Symbol.for(xS), If = {
  /* c8 ignore next */
  _In: (t) => t,
  /* c8 ignore next */
  _Out: (t) => t
};
var sk, ok;
class LS {
  constructor(e, n) {
    f(this, "incremental");
    f(this, "bigint");
    f(this, sk, If);
    f(this, ok, Vo);
    f(this, "_hash");
    this.incremental = e, this.bigint = n, this._hash = me(Of);
  }
  [(sk = Ef, ok = Vo, j)]() {
    return this._hash;
  }
  [P](e) {
    return Cf(e);
  }
  pipe() {
    return A(this, arguments);
  }
}
var ik, ck;
class DS {
  constructor(e) {
    f(this, "boundaries");
    f(this, ik, If);
    f(this, ck, Ko);
    f(this, "_hash");
    this.boundaries = e, this._hash = m(me(Rf), K(I(this.boundaries)));
  }
  [(ik = Ef, ck = Ko, j)]() {
    return this._hash;
  }
  [P](e) {
    return Tf(e) && N(this.boundaries, e.boundaries);
  }
  pipe() {
    return A(this, arguments);
  }
}
const US = (t) => new LS((t == null ? void 0 : t.incremental) ?? !1, (t == null ? void 0 : t.bigint) ?? !1), qS = (t) => new DS(t), Cf = (t) => D(t, Vo), BS = (t) => D(t, MS), VS = (t) => D(t, NS), Tf = (t) => D(t, Ko), KS = (t) => D(t, jS), HS = "effect/MetricKey", $f = /* @__PURE__ */ Symbol.for(HS), JS = {
  /* c8 ignore next */
  _Type: (t) => t
}, WS = /* @__PURE__ */ hi(N);
var ak;
class sc {
  constructor(e, n, r, s = []) {
    f(this, "name");
    f(this, "keyType");
    f(this, "description");
    f(this, "tags");
    f(this, ak, JS);
    f(this, "_hash");
    this.name = e, this.keyType = n, this.description = r, this.tags = s, this._hash = m(me(this.name + this.description), K(I(this.keyType)), K(sr(this.tags)));
  }
  [(ak = $f, j)]() {
    return this._hash;
  }
  [P](e) {
    return GS(e) && this.name === e.name && N(this.keyType, e.keyType) && N(this.description, e.description) && WS(this.tags, e.tags);
  }
  pipe() {
    return A(this, arguments);
  }
}
const GS = (t) => D(t, $f), zS = (t, e) => new sc(t, US(e), li(e == null ? void 0 : e.description)), YS = (t, e, n) => new sc(t, qS(e), li(n)), QS = /* @__PURE__ */ g(2, (t, e) => e.length === 0 ? t : new sc(t.name, t.keyType, t.description, go(t.tags, e))), XS = "effect/MetricState", gr = /* @__PURE__ */ Symbol.for(XS), Ff = "effect/MetricState/Counter", Ho = /* @__PURE__ */ Symbol.for(Ff), Af = "effect/MetricState/Frequency", Jo = /* @__PURE__ */ Symbol.for(Af), Mf = "effect/MetricState/Gauge", Wo = /* @__PURE__ */ Symbol.for(Mf), Pf = "effect/MetricState/Histogram", Go = /* @__PURE__ */ Symbol.for(Pf), Nf = "effect/MetricState/Summary", zo = /* @__PURE__ */ Symbol.for(Nf), mr = {
  /* c8 ignore next */
  _A: (t) => t
};
var uk, lk;
class ZS {
  constructor(e) {
    f(this, "count");
    f(this, uk, mr);
    f(this, lk, Ho);
    this.count = e;
  }
  [(uk = gr, lk = Ho, j)]() {
    return m(I(Ff), K(I(this.count)), ue(this));
  }
  [P](e) {
    return l0(e) && this.count === e.count;
  }
  pipe() {
    return A(this, arguments);
  }
}
const e0 = /* @__PURE__ */ hi(N);
var fk, hk;
class t0 {
  constructor(e) {
    f(this, "occurrences");
    f(this, fk, mr);
    f(this, hk, Jo);
    f(this, "_hash");
    this.occurrences = e;
  }
  [(fk = gr, hk = Jo, j)]() {
    return m(me(Af), K(sr(Se(this.occurrences.entries()))), ue(this));
  }
  [P](e) {
    return f0(e) && e0(Se(this.occurrences.entries()), Se(e.occurrences.entries()));
  }
  pipe() {
    return A(this, arguments);
  }
}
var dk, pk;
class n0 {
  constructor(e) {
    f(this, "value");
    f(this, dk, mr);
    f(this, pk, Wo);
    this.value = e;
  }
  [(dk = gr, pk = Wo, j)]() {
    return m(I(Mf), K(I(this.value)), ue(this));
  }
  [P](e) {
    return h0(e) && this.value === e.value;
  }
  pipe() {
    return A(this, arguments);
  }
}
var gk, mk;
class r0 {
  constructor(e, n, r, s, o) {
    f(this, "buckets");
    f(this, "count");
    f(this, "min");
    f(this, "max");
    f(this, "sum");
    f(this, gk, mr);
    f(this, mk, Go);
    this.buckets = e, this.count = n, this.min = r, this.max = s, this.sum = o;
  }
  [(gk = gr, mk = Go, j)]() {
    return m(I(Pf), K(I(this.buckets)), K(I(this.count)), K(I(this.min)), K(I(this.max)), K(I(this.sum)), ue(this));
  }
  [P](e) {
    return d0(e) && N(this.buckets, e.buckets) && this.count === e.count && this.min === e.min && this.max === e.max && this.sum === e.sum;
  }
  pipe() {
    return A(this, arguments);
  }
}
var _k, yk;
class s0 {
  constructor(e, n, r, s, o, c) {
    f(this, "error");
    f(this, "quantiles");
    f(this, "count");
    f(this, "min");
    f(this, "max");
    f(this, "sum");
    f(this, _k, mr);
    f(this, yk, zo);
    this.error = e, this.quantiles = n, this.count = r, this.min = s, this.max = o, this.sum = c;
  }
  [(_k = gr, yk = zo, j)]() {
    return m(I(Nf), K(I(this.error)), K(I(this.quantiles)), K(I(this.count)), K(I(this.min)), K(I(this.max)), K(I(this.sum)), ue(this));
  }
  [P](e) {
    return p0(e) && this.error === e.error && N(this.quantiles, e.quantiles) && this.count === e.count && this.min === e.min && this.max === e.max && this.sum === e.sum;
  }
  pipe() {
    return A(this, arguments);
  }
}
const o0 = (t) => new ZS(t), i0 = (t) => new t0(t), c0 = (t) => new n0(t), a0 = (t) => new r0(t.buckets, t.count, t.min, t.max, t.sum), u0 = (t) => new s0(t.error, t.quantiles, t.count, t.min, t.max, t.sum), l0 = (t) => D(t, Ho), f0 = (t) => D(t, Jo), h0 = (t) => D(t, Wo), d0 = (t) => D(t, Go), p0 = (t) => D(t, zo), g0 = "effect/MetricHook", m0 = /* @__PURE__ */ Symbol.for(g0), _0 = {
  /* c8 ignore next */
  _In: (t) => t,
  /* c8 ignore next */
  _Out: (t) => t
}, _r = (t) => ({
  [m0]: _0,
  pipe() {
    return A(this, arguments);
  },
  ...t
}), Ua = /* @__PURE__ */ BigInt(0), y0 = (t) => {
  let e = t.keyType.bigint ? Ua : 0;
  const n = t.keyType.incremental ? t.keyType.bigint ? (r) => r >= Ua : (r) => r >= 0 : (r) => !0;
  return _r({
    get: () => o0(e),
    update: (r) => {
      n(r) && (e = e + r);
    }
  });
}, b0 = (t) => {
  const e = /* @__PURE__ */ new Map();
  for (const r of t.keyType.preregisteredWords)
    e.set(r, 0);
  return _r({
    get: () => i0(e),
    update: (r) => {
      const s = e.get(r) ?? 0;
      e.set(r, s + 1);
    }
  });
}, v0 = (t, e) => {
  let n = e;
  return _r({
    get: () => c0(n),
    update: (r) => {
      n = r;
    }
  });
}, S0 = (t) => {
  const e = t.keyType.boundaries.values, n = e.length, r = new Uint32Array(n + 1), s = new Float32Array(n);
  let o = 0, c = 0, a = Number.MAX_VALUE, u = Number.MIN_VALUE;
  m(e, Zr(nr), rn((y, k) => {
    s[k] = y;
  }));
  const h = (y) => {
    let k = 0, w = n;
    for (; k !== w; ) {
      const R = Math.floor(k + (w - k) / 2), J = s[R];
      y <= J ? w = R : k = R, w === k + 1 && (y <= s[k] ? w = k : k = w);
    }
    r[k] = r[k] + 1, o = o + 1, c = c + y, y < a && (a = y), y > u && (u = y);
  }, b = () => {
    const y = fi(n);
    let k = 0;
    for (let w = 0; w < n; w++) {
      const R = s[w], J = r[w];
      k = k + J, y[w] = [R, k];
    }
    return y;
  };
  return _r({
    get: () => a0({
      buckets: b(),
      count: o,
      min: a,
      max: u,
      sum: c
    }),
    update: h
  });
}, w0 = (t) => {
  const {
    error: e,
    maxAge: n,
    maxSize: r,
    quantiles: s
  } = t.keyType, o = m(s, Zr(nr)), c = fi(r);
  let a = 0, u = 0, h = 0, b = Number.MAX_VALUE, y = Number.MIN_VALUE;
  const k = (R) => {
    const J = [];
    let B = 0;
    for (; B !== r - 1; ) {
      const ce = c[B];
      if (ce != null) {
        const [Y, we] = ce, de = No(R - Y);
        sb(de, Gy) && de <= n && J.push(we);
      }
      B = B + 1;
    }
    return k0(e, o, Zr(J, nr));
  }, w = (R, J) => {
    if (r > 0) {
      a = a + 1;
      const B = a % r;
      c[B] = [J, R];
    }
    u = u + 1, h = h + R, R < b && (b = R), R > y && (y = R);
  };
  return _r({
    get: () => u0({
      error: e,
      quantiles: k(Date.now()),
      count: u,
      min: b,
      max: y,
      sum: h
    }),
    update: ([R, J]) => w(R, J)
  });
}, k0 = (t, e, n) => {
  const r = n.length;
  if (!He(e))
    return ln();
  const s = e[0], o = e.slice(1), c = qa(t, r, M(), 0, s, n), a = Xe(c);
  return o.forEach((u) => {
    a.push(qa(t, r, c.value, c.consumed, u, c.rest));
  }), rn(a, (u) => [u.quantile, u.value]);
}, qa = (t, e, n, r, s, o) => {
  let c = t, a = e, u = n, h = r, b = s, y = o, k = t, w = e, R = n, J = r, B = s, ce = o;
  for (; ; ) {
    if (!He(y))
      return {
        quantile: b,
        value: M(),
        consumed: h,
        rest: []
      };
    if (b === 1)
      return {
        quantile: b,
        value: H(Cu(y)),
        consumed: h + y.length,
        rest: []
      };
    const Y = wp(y, (Ce) => Ce <= y[0]), we = b * a, de = c / 2 * we, G = h + Y[0].length, be = Math.abs(G - we);
    if (G < we - de) {
      k = c, w = a, R = Bn(y), J = G, B = b, ce = Y[1], c = k, a = w, u = R, h = J, b = B, y = ce;
      continue;
    }
    if (G > we + de)
      return {
        quantile: b,
        value: u,
        consumed: h,
        rest: y
      };
    switch (u._tag) {
      case "None": {
        k = c, w = a, R = Bn(y), J = G, B = b, ce = Y[1], c = k, a = w, u = R, h = J, b = B, y = ce;
        continue;
      }
      case "Some": {
        const Ce = Math.abs(we - u.value);
        if (be < Ce) {
          k = c, w = a, R = Bn(y), J = G, B = b, ce = Y[1], c = k, a = w, u = R, h = J, b = B, y = ce;
          continue;
        }
        return {
          quantile: b,
          value: H(u.value),
          consumed: h,
          rest: y
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues");
}, E0 = "effect/MetricPair", O0 = /* @__PURE__ */ Symbol.for(E0), R0 = {
  /* c8 ignore next */
  _Type: (t) => t
}, I0 = (t, e) => ({
  [O0]: R0,
  metricKey: t,
  metricState: e,
  pipe() {
    return A(this, arguments);
  }
}), C0 = "effect/MetricRegistry", Ba = /* @__PURE__ */ Symbol.for(C0);
var bk;
class T0 {
  constructor() {
    f(this, bk, Ba);
    f(this, "map", lb());
  }
  snapshot() {
    const e = [];
    for (const [n, r] of this.map)
      e.push(I0(n, r.get()));
    return e;
  }
  get(e) {
    const n = m(this.map, It(e), Rt);
    if (n == null) {
      if (Cf(e.keyType))
        return this.getCounter(e);
      if (VS(e.keyType))
        return this.getGauge(e);
      if (BS(e.keyType))
        return this.getFrequency(e);
      if (Tf(e.keyType))
        return this.getHistogram(e);
      if (KS(e.keyType))
        return this.getSummary(e);
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/effect/issues");
    } else
      return n;
  }
  getCounter(e) {
    let n = m(this.map, It(e), Rt);
    if (n == null) {
      const r = y0(e);
      m(this.map, Nn(e)) || m(this.map, xn(e, r)), n = r;
    }
    return n;
  }
  getFrequency(e) {
    let n = m(this.map, It(e), Rt);
    if (n == null) {
      const r = b0(e);
      m(this.map, Nn(e)) || m(this.map, xn(e, r)), n = r;
    }
    return n;
  }
  getGauge(e) {
    let n = m(this.map, It(e), Rt);
    if (n == null) {
      const r = v0(e, e.keyType.bigint ? BigInt(0) : 0);
      m(this.map, Nn(e)) || m(this.map, xn(e, r)), n = r;
    }
    return n;
  }
  getHistogram(e) {
    let n = m(this.map, It(e), Rt);
    if (n == null) {
      const r = S0(e);
      m(this.map, Nn(e)) || m(this.map, xn(e, r)), n = r;
    }
    return n;
  }
  getSummary(e) {
    let n = m(this.map, It(e), Rt);
    if (n == null) {
      const r = w0(e);
      m(this.map, Nn(e)) || m(this.map, xn(e, r)), n = r;
    }
    return n;
  }
}
bk = Ba;
const $0 = () => new T0(), F0 = "effect/Metric", A0 = /* @__PURE__ */ Symbol.for(F0), M0 = {
  /* c8 ignore next */
  _Type: (t) => t,
  /* c8 ignore next */
  _In: (t) => t,
  /* c8 ignore next */
  _Out: (t) => t
}, Va = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Metric/globalMetricRegistry"), () => $0()), xf = function(t, e, n) {
  const r = Object.assign((s) => Dl(s, (o) => j0(r, o)), {
    [A0]: M0,
    keyType: t,
    unsafeUpdate: e,
    unsafeValue: n,
    register() {
      return this.unsafeValue([]), this;
    },
    pipe() {
      return A(this, arguments);
    }
  });
  return r;
}, Ms = (t, e) => jf(zS(t, e)), jf = (t) => {
  let e;
  const n = /* @__PURE__ */ new WeakMap(), r = (s) => {
    if (s.length === 0)
      return e !== void 0 || (e = Va.get(t)), e;
    let o = n.get(s);
    return o !== void 0 || (o = Va.get(QS(t, s)), n.set(s, o)), o;
  };
  return xf(t.keyType, (s, o) => r(o).update(s), (s) => r(s).get());
}, P0 = (t, e, n) => jf(YS(t, e, n)), N0 = /* @__PURE__ */ g(3, (t, e, n) => x0(t, [Uv(e, n)])), x0 = /* @__PURE__ */ g(2, (t, e) => xf(t.keyType, (n, r) => t.unsafeUpdate(n, go(e, r)), (n) => t.unsafeValue(go(e, n)))), j0 = /* @__PURE__ */ g(2, (t, e) => Kl(Fo, (n) => $(() => t.unsafeUpdate(e, n)))), L0 = "effect/Request", D0 = /* @__PURE__ */ Symbol.for(L0), U0 = {
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _A: (t) => t
};
({
  ...ai,
  [D0]: 0
});
const q0 = /* @__PURE__ */ g(2, (t, e) => Kl(wf, (n) => $(() => {
  if (n.has(t)) {
    const r = n.get(t);
    r.state.completed || (r.state.completed = !0, Zl(r.result, e));
  }
}))), B0 = "effect/Supervisor", Ps = /* @__PURE__ */ Symbol.for(B0), oc = {
  /* c8 ignore next */
  _T: (t) => t
};
var vk;
const ic = class ic {
  constructor(e, n) {
    f(this, "underlying");
    f(this, "value0");
    f(this, vk, oc);
    this.underlying = e, this.value0 = n;
  }
  get value() {
    return this.value0;
  }
  onStart(e, n, r, s) {
    this.underlying.onStart(e, n, r, s);
  }
  onEnd(e, n) {
    this.underlying.onEnd(e, n);
  }
  onEffect(e, n) {
    this.underlying.onEffect(e, n);
  }
  onSuspend(e) {
    this.underlying.onSuspend(e);
  }
  onResume(e) {
    this.underlying.onResume(e);
  }
  map(e) {
    return new ic(this, m(this.value, Me(e)));
  }
  zip(e) {
    return new fs(this, e);
  }
};
vk = Ps;
let ls = ic;
var Sk;
const cc = class cc {
  constructor(e, n) {
    f(this, "left");
    f(this, "right");
    f(this, "_tag", "Zip");
    f(this, Sk, oc);
    this.left = e, this.right = n;
  }
  get value() {
    return ql(this.left.value, this.right.value);
  }
  onStart(e, n, r, s) {
    this.left.onStart(e, n, r, s), this.right.onStart(e, n, r, s);
  }
  onEnd(e, n) {
    this.left.onEnd(e, n), this.right.onEnd(e, n);
  }
  onEffect(e, n) {
    this.left.onEffect(e, n), this.right.onEffect(e, n);
  }
  onSuspend(e) {
    this.left.onSuspend(e), this.right.onSuspend(e);
  }
  onResume(e) {
    this.left.onResume(e), this.right.onResume(e);
  }
  map(e) {
    return new ls(this, m(this.value, Me(e)));
  }
  zip(e) {
    return new cc(this, e);
  }
};
Sk = Ps;
let fs = cc;
const Lf = (t) => D(t, Ps) && tu(t, "Zip");
var wk;
class V0 {
  constructor(e) {
    f(this, "effect");
    f(this, wk, oc);
    this.effect = e;
  }
  get value() {
    return this.effect;
  }
  onStart(e, n, r, s) {
  }
  onEnd(e, n) {
  }
  onEffect(e, n) {
  }
  onSuspend(e) {
  }
  onResume(e) {
  }
  map(e) {
    return new ls(this, m(this.value, Me(e)));
  }
  zip(e) {
    return new fs(this, e);
  }
  onRun(e, n) {
    return e();
  }
}
wk = Ps;
const K0 = (t) => new V0(t), Ns = /* @__PURE__ */ Q("effect/Supervisor/none", () => K0(Ue)), H0 = kn, Df = "Empty", Uf = "AddSupervisor", qf = "RemoveSupervisor", Bf = "AndThen", Jn = {
  _tag: Df
}, Hr = (t, e) => ({
  _tag: Bf,
  first: t,
  second: e
}), J0 = (t, e) => W0(e, Je(t)), W0 = (t, e) => {
  let n = t, r = e;
  for (; xt(r); ) {
    const s = jt(r);
    switch (s._tag) {
      case Df: {
        r = yt(r);
        break;
      }
      case Uf: {
        n = n.zip(s.supervisor), r = yt(r);
        break;
      }
      case qf: {
        n = Yo(n, s.supervisor), r = yt(r);
        break;
      }
      case Bf: {
        r = Ye(s.first)(Ye(s.second)(yt(r)));
        break;
      }
    }
  }
  return n;
}, Yo = (t, e) => N(t, e) ? Ns : Lf(t) ? Yo(t.left, e).zip(Yo(t.right, e)) : t, hs = (t) => N(t, Ns) ? Dt() : Lf(t) ? m(hs(t.left), Qn(hs(t.right))) : wi(t), G0 = (t, e) => {
  if (N(t, e))
    return Jn;
  const n = hs(t), r = hs(e), s = m(r, ta(n), ns(Jn, (c, a) => Hr(c, {
    _tag: Uf,
    supervisor: a
  }))), o = m(n, ta(r), ns(Jn, (c, a) => Hr(c, {
    _tag: qf,
    supervisor: a
  })));
  return Hr(s, o);
}, z0 = /* @__PURE__ */ H0({
  empty: Jn,
  patch: J0,
  combine: Hr,
  diff: G0
}), Y0 = /* @__PURE__ */ Ms("effect_fiber_started", {
  incremental: !0
}), Ka = /* @__PURE__ */ Ms("effect_fiber_active"), Q0 = /* @__PURE__ */ Ms("effect_fiber_successes", {
  incremental: !0
}), X0 = /* @__PURE__ */ Ms("effect_fiber_failures", {
  incremental: !0
}), Z0 = /* @__PURE__ */ N0(/* @__PURE__ */ P0("effect_fiber_lifetimes", /* @__PURE__ */ $S({
  start: 0.5,
  factor: 2,
  count: 35
})), "time_unit", "milliseconds"), jn = "Continue", ew = "Done", Ha = "Yield", tw = {
  /* c8 ignore next */
  _E: (t) => t,
  /* c8 ignore next */
  _A: (t) => t
}, Ln = (t) => {
  throw new Error(`BUG: FiberRuntime - ${qn(t)} - please report an issue at https://github.com/Effect-TS/effect/issues`);
}, mt = /* @__PURE__ */ Symbol.for("effect/internal/fiberRuntime/YieldedOp"), ft = /* @__PURE__ */ Q("effect/internal/fiberRuntime/yieldedOpChannel", () => ({
  currentOp: null
})), Pr = {
  [zr]: (t, e, n) => e.effect_instruction_i1(n),
  OnStep: (t, e, n) => Oe(Oe(n)),
  [Yr]: (t, e, n) => e.effect_instruction_i2(n),
  [ci]: (t, e, n) => (t.patchRuntimeFlags(t._runtimeFlags, e.patch), _t(t._runtimeFlags) && t.isInterrupted() ? Z(t.getInterruptedCause()) : Oe(n)),
  [Qr]: (t, e, n) => (e.effect_instruction_i2(n), e.effect_instruction_i0() ? (t.pushStack(e), e.effect_instruction_i1()) : Ue)
}, nw = {
  [Xi]: (t, e, n, r) => (t.processNewInterruptSignal(r.cause), _t(e) ? Z(r.cause) : n),
  [ec]: (t, e, n, r) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [Zi]: (t, e, n, r) => (r.onFiber(t, Sf(e)), n),
  [tc]: (t, e, n, r) => T(Di(), () => n)
}, rw = (t) => Ni(a_(t), (e) => Kf(w_(e), ([n, r]) => {
  const s = /* @__PURE__ */ new Map(), o = [];
  for (const a of r) {
    o.push(Ft(a));
    for (const u of a)
      s.set(u.request, u);
  }
  const c = o.flat();
  return Ki(pw(n.runAll(o), c, () => c.forEach((a) => {
    a.listeners.interrupted = !0;
  })), wf, s);
}, !1, !1));
var kk, Ek;
class Vf {
  constructor(e, n, r) {
    f(this, kk, pS);
    f(this, Ek, tw);
    f(this, "_fiberRefs");
    f(this, "_fiberId");
    f(this, "_runtimeFlags");
    f(this, "_queue", new Array());
    f(this, "_children", null);
    f(this, "_observers", new Array());
    f(this, "_running", !1);
    f(this, "_stack", []);
    f(this, "_asyncInterruptor", null);
    f(this, "_asyncBlockingOn", null);
    f(this, "_exitValue", null);
    f(this, "_steps", []);
    f(this, "_supervisor");
    f(this, "_scheduler");
    f(this, "_tracer");
    f(this, "currentOpCount", 0);
    f(this, "isYielding", !1);
    f(this, "run", () => {
      this.drainQueueOnCurrentThread();
    });
    if (this._runtimeFlags = r, this._fiberId = e, this._fiberRefs = n, this._supervisor = this.getFiberRef(Wa), this._scheduler = this.getFiberRef(qo), ia(r)) {
      const s = this.getFiberRef(Fo);
      Y0.unsafeUpdate(1, s), Ka.unsafeUpdate(1, s);
    }
    this._tracer = Vn(this.getFiberRef(Hn), To);
  }
  pipe() {
    return A(this, arguments);
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(e) {
    this.tell(Xt(e));
  }
  /**
   * The status of the fiber.
   */
  get status() {
    return this.ask((e, n) => n);
  }
  /**
   * Gets the fiber runtime flags.
   */
  get runtimeFlags() {
    return this.ask((e, n) => rS(n) ? e._runtimeFlags : n.runtimeFlags);
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return fS(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  get children() {
    return this.ask((e) => Array.from(e.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    return this._children === null && (this._children = /* @__PURE__ */ new Set()), this._children;
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(Ar);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((e) => e.getFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(e) {
    return Ae(() => {
      const n = Yl(this._fiberId);
      return this.tell(Kr((r, s) => {
        Zl(n, $(() => e(r, s)));
      })), Ql(n);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(e) {
    this._queue.push(e), this._running || (this._running = !0, this.drainQueueLaterOnExecutor());
  }
  get await() {
    return lt((e) => {
      const n = (r) => e(ie(r));
      return this.tell(Kr((r, s) => {
        r._exitValue !== null ? n(this._exitValue) : r.addObserver(n);
      })), $(() => this.tell(Kr((r, s) => {
        r.removeObserver(n);
      })));
    }, this.id());
  }
  get inheritAll() {
    return rt((e, n) => {
      const r = e.id(), s = e.getFiberRefs(), o = n.runtimeFlags, c = this.getFiberRefs(), a = uv(s, r, c);
      e.setFiberRefs(a);
      const u = e.getFiberRef(Ja), h = m(
        qr(o, u),
        // Do not inherit WindDown or Interruption!
        aa(En),
        aa(Ro)
      );
      return cy(h);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  get poll() {
    return $(() => li(this._exitValue));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(e) {
    return $(() => this.tell(ao(Ct(e))));
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  unsafeInterruptAsFork(e) {
    this.tell(ao(Ct(e)));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addObserver(e) {
    this._exitValue !== null ? e(this._exitValue) : this._observers.push(e);
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeObserver(e) {
    this._observers = this._observers.filter((n) => n !== e);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRefs() {
    return this.setFiberRef(Ja, this._runtimeFlags), this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(e) {
    this._fiberRefs = pf(this._fiberRefs, e);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(e) {
    return this._fiberRefs.locals.has(e) ? this._fiberRefs.locals.get(e)[0][1] : e.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(e, n) {
    this._fiberRefs = Lo(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef: e,
      value: n
    }), this.refreshRefCache();
  }
  refreshRefCache() {
    this._tracer = Vn(this.getFiberRef(Hn), To), this._supervisor = this.getFiberRef(Wa), this._scheduler = this.getFiberRef(qo);
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(e) {
    this._fiberRefs = e, this.refreshRefCache();
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(e) {
    this.getChildren().add(e);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(e) {
    this.getChildren().delete(e);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let e = !0;
    for (; e; ) {
      let n = jn;
      const r = globalThis[Ot];
      globalThis[Ot] = this;
      try {
        for (; n === jn; )
          n = this._queue.length === 0 ? ew : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
      } finally {
        this._running = !1, globalThis[Ot] = r;
      }
      this._queue.length > 0 && !this._running ? (this._running = !0, n === Ha ? (this.drainQueueLaterOnExecutor(), e = !1) : e = !0) : e = !1;
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this._scheduler.scheduleTask(this.run, this.getFiberRef(Hi));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(e, n) {
    let r = n;
    for (; this._queue.length > 0; ) {
      const s = this._queue.splice(0, 1)[0];
      r = nw[s._tag](this, e, r, s);
    }
    return r;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !O_(this.getFiberRef(Ar));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(e) {
    const n = this.getFiberRef(Ar);
    this.setFiberRef(Ar, tt(n, e));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(e) {
    this.addInterruptedCause(e), this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0)
      return !1;
    let e = !1;
    for (const n of this._children)
      n.tell(ao(Ct(this.id()))), e = !0;
    return e;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const e = this._children.values();
      this._children = null;
      let n = !1;
      return Li({
        while: () => !n,
        body: () => {
          const s = e.next();
          return s.done ? $(() => {
            n = !0;
          }) : Ht(s.value.await);
        },
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(e) {
    if (ia(this._runtimeFlags)) {
      const n = this.getFiberRef(Fo), r = this.id().startTimeMillis, s = Date.now();
      switch (Z0.unsafeUpdate(s - r, n), Ka.unsafeUpdate(-1, n), e._tag) {
        case Le: {
          Q0.unsafeUpdate(1, n);
          break;
        }
        case je: {
          X0.unsafeUpdate(1, n);
          break;
        }
      }
    }
    if (e._tag === "Failure") {
      const n = this.getFiberRef(Oy);
      !Ti(e.cause) && n._tag === "Some" && this.log("Fiber terminated with an unhandled error", e.cause, n);
    }
  }
  setExitValue(e) {
    this._exitValue = e, this.reportExitValue(e);
    for (let n = this._observers.length - 1; n >= 0; n--)
      this._observers[n](e);
  }
  getLoggers() {
    return this.getFiberRef(aw);
  }
  log(e, n, r) {
    const s = nt(r) ? r.value : this.getFiberRef(wy), o = this.getFiberRef(sw);
    if (Ev(o, s))
      return;
    const c = this.getFiberRef(ky), a = this.getFiberRef(Sy), u = this.getLoggers(), h = this.getFiberRefs();
    if (Wu(u) > 0) {
      const b = Vn(this.getFiberRef(Hn), zi), y = new Date(b.unsafeCurrentTimeMillis());
      for (const k of u)
        k.log({
          fiberId: this.id(),
          logLevel: s,
          message: e,
          cause: n,
          context: h,
          spans: c,
          annotations: a,
          date: y
        });
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(e) {
    switch (e._tag) {
      case tc:
        return Ha;
      case Xi:
        return this.processNewInterruptSignal(e.cause), this._asyncInterruptor !== null && (this._asyncInterruptor(Z(e.cause)), this._asyncInterruptor = null), jn;
      case ec:
        return this._asyncInterruptor = null, this._asyncBlockingOn = null, this.evaluateEffect(e.effect), jn;
      case Zi:
        return e.onFiber(this, this._exitValue !== null ? tS : nS(this._runtimeFlags, this._asyncBlockingOn)), jn;
      default:
        return Ln(e);
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(e) {
    this._supervisor.onResume(this);
    try {
      let n = _t(this._runtimeFlags) && this.isInterrupted() ? Z(this.getInterruptedCause()) : e;
      for (; n !== null; ) {
        const r = n, s = this.runLoop(r);
        if (s === mt) {
          const o = ft.currentOp;
          ft.currentOp = null, o._op === Lr ? r_(this._runtimeFlags) ? (this.tell(cS()), this.tell(Xt(Tt)), n = null) : n = Tt : o._op === jr && (n = null);
        } else {
          this._runtimeFlags = m(this._runtimeFlags, s_(Ro));
          const o = this.interruptAllChildren();
          o !== null ? n = T(o, () => s) : (this._queue.length === 0 ? this.setExitValue(s) : this.tell(Xt(s)), n = null);
        }
      }
    } finally {
      this._supervisor.onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(e) {
    if (this._running)
      this.tell(Xt(e));
    else {
      this._running = !0;
      const n = globalThis[Ot];
      globalThis[Ot] = this;
      try {
        this.evaluateEffect(e);
      } finally {
        this._running = !1, globalThis[Ot] = n, this._queue.length > 0 && this.drainQueueLaterOnExecutor();
      }
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(e) {
    this.tell(Xt(e));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(e, n) {
    const r = Br(e, n);
    return globalThis[Ot] = this, this._runtimeFlags = r, r;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(e, n) {
    let r = !1;
    const s = (o) => {
      r || (r = !0, this.tell(Xt(o)));
    };
    _t(e) && (this._asyncInterruptor = s);
    try {
      n(s);
    } catch (o) {
      s(Qe(ut(o)));
    }
  }
  pushStack(e) {
    this._stack.push(e), e._op === "OnStep" && this._steps.push({
      refs: this.getFiberRefs(),
      flags: this._runtimeFlags
    });
  }
  popStack() {
    const e = this._stack.pop();
    if (e)
      return e._op === "OnStep" && this._steps.pop(), e;
  }
  getNextSuccessCont() {
    let e = this.popStack();
    for (; e; ) {
      if (e._op !== Ys)
        return e;
      e = this.popStack();
    }
  }
  getNextFailCont() {
    let e = this.popStack();
    for (; e; ) {
      if (e._op !== zr && e._op !== Qr)
        return e;
      e = this.popStack();
    }
  }
  [(kk = dS, Ek = mS, qd)](e) {
    return Me(Vi(pr), (n) => Wp(n, e));
  }
  Left(e) {
    return Be(e.left);
  }
  None(e) {
    return Be(new Gl());
  }
  Right(e) {
    return Oe(e.right);
  }
  Some(e) {
    return Oe(e.value);
  }
  [ou](e) {
    const n = e.effect_instruction_i0(), r = this.getNextSuccessCont();
    return r !== void 0 ? (r._op in Pr || Ln(r), Pr[r._op](this, r, n)) : (ft.currentOp = Oe(n), mt);
  }
  [Le](e) {
    const n = e, r = this.getNextSuccessCont();
    return r !== void 0 ? (r._op in Pr || Ln(r), Pr[r._op](this, r, n.effect_instruction_i0)) : (ft.currentOp = n, mt);
  }
  [je](e) {
    const n = e.effect_instruction_i0, r = this.getNextFailCont();
    if (r !== void 0)
      switch (r._op) {
        case Ys:
        case Yr:
          return _t(this._runtimeFlags) && this.isInterrupted() ? Z(ua(n)) : r.effect_instruction_i1(n);
        case "OnStep":
          return _t(this._runtimeFlags) && this.isInterrupted() ? Z(ua(n)) : Oe(Z(n));
        case ci:
          return this.patchRuntimeFlags(this._runtimeFlags, r.patch), _t(this._runtimeFlags) && this.isInterrupted() ? Z(tt(n, this.getInterruptedCause())) : Z(n);
        default:
          Ln(r);
      }
    else
      return ft.currentOp = Z(n), mt;
  }
  [iu](e) {
    return e.effect_instruction_i0(this, Sf(this._runtimeFlags));
  }
  Blocked(e) {
    const n = this.getFiberRefs(), r = this._runtimeFlags;
    if (this._steps.length > 0) {
      const s = [], o = this._steps[this._steps.length - 1];
      let c = this.popStack();
      for (; c && c._op !== "OnStep"; )
        s.push(c), c = this.popStack();
      this.setFiberRefs(o.refs), this._runtimeFlags = o.flags;
      const a = Hv(o.refs, n), u = qr(o.flags, r);
      return Oe(Rl(e.effect_instruction_i0, rt((h) => {
        for (; s.length > 0; )
          h.pushStack(s.pop());
        return h.setFiberRefs(Jv(h.id(), h.getFiberRefs())(a)), h._runtimeFlags = Br(u)(h._runtimeFlags), e.effect_instruction_i1;
      })));
    }
    return dr((s) => T(Hf(Q_(e.effect_instruction_i0)), () => s(e.effect_instruction_i1)));
  }
  RunBlocked(e) {
    return rw(e.effect_instruction_i0);
  }
  [or](e) {
    const n = e.effect_instruction_i0, r = this._runtimeFlags, s = Br(r, n);
    if (_t(s) && this.isInterrupted())
      return Z(this.getInterruptedCause());
    if (this.patchRuntimeFlags(this._runtimeFlags, n), e.effect_instruction_i1) {
      const o = qr(s, r);
      return this.pushStack(new X_(o, e)), e.effect_instruction_i1(r);
    } else
      return Tt;
  }
  [zr](e) {
    return this.pushStack(e), e.effect_instruction_i0;
  }
  OnStep(e) {
    return this.pushStack(e), e.effect_instruction_i0;
  }
  [Ys](e) {
    return this.pushStack(e), e.effect_instruction_i0;
  }
  [Yr](e) {
    return this.pushStack(e), e.effect_instruction_i0;
  }
  [jr](e) {
    return this._asyncBlockingOn = e.effect_instruction_i1, this.initiateAsync(this._runtimeFlags, e.effect_instruction_i0), ft.currentOp = e, mt;
  }
  [Lr](e) {
    return this.isYielding = !1, ft.currentOp = e, mt;
  }
  [Qr](e) {
    const n = e.effect_instruction_i0, r = e.effect_instruction_i1;
    return n() ? (this.pushStack(e), r()) : Tt;
  }
  [ii](e) {
    return e.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(e) {
    let n = e;
    for (this.currentOpCount = 0; ; ) {
      if (this._runtimeFlags & n_ && this._supervisor.onEffect(this, n), this._queue.length > 0 && (n = this.drainQueueWhileRunning(this._runtimeFlags, n)), !this.isYielding) {
        this.currentOpCount += 1;
        const r = this._scheduler.shouldYield(this);
        if (r !== !1) {
          this.isYielding = !0, this.currentOpCount = 0;
          const s = n;
          n = T(Di({
            priority: r
          }), () => s);
        }
      }
      try {
        if ((!("_op" in n) || !(n._op in this)) && Ln(n), n = this._tracer.context(() => Jr() !== n[ja]._V ? ty(`Cannot execute an Effect versioned ${n[ja]._V} with a Runtime of version ${Jr()}`) : this[n._op](n), this), n === mt) {
          const r = ft.currentOp;
          return r._op === Lr || r._op === jr ? mt : (ft.currentOp = null, r._op === Le || r._op === je ? r : Z(ut(r)));
        }
      } catch (r) {
        Y_(r) ? n = Z(r.cause) : Fy(r) ? n = Z(tt(ut(r), Ct(Is))) : n = Al(r);
      }
    }
  }
}
const sw = /* @__PURE__ */ Q("effect/FiberRef/currentMinimumLogLevel", () => st(Ov("Info"))), ow = (t) => rc((e) => {
  const n = hv(e.context, Hn);
  Vn(n, hf).unsafe.log(t.log(e));
}), iw = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Logger/defaultLogger"), () => ow(kS)), cw = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/Logger/tracerLogger"), () => rc(({
  annotations: t,
  cause: e,
  context: n,
  fiberId: r,
  logLevel: s,
  message: o
}) => {
  const c = Eu(jo(n, pr), Gp(Ol)), a = ku(jo(n, Hn), (h) => Vn(h, zi));
  if (c._tag === "None" || c.value._tag === "ExternalSpan" || a._tag === "None")
    return;
  const u = Object.fromEntries(tl(t, qn));
  u["effect.fiberId"] = Kg(r), u["effect.logLevel"] = s.label, e !== null && e._tag !== "Empty" && (u["effect.cause"] = Fi(e)), c.value.event(String(o), a.value.unsafeCurrentTimeNanos(), u);
})), aw = /* @__PURE__ */ Q(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLoggers"), () => _y(wi(iw, cw))), Kf = (t, e, n, r, s) => dr((o) => iy((c) => rt((a) => {
  let u = Array.from(t).reverse(), h = u.length;
  if (h === 0)
    return Ue;
  let b = 0, y = !1;
  const k = s ? Math.min(u.length, s) : u.length, w = /* @__PURE__ */ new Set(), R = new Array(), J = () => w.forEach((ne) => {
    ne._scheduler.scheduleTask(() => {
      ne.unsafeInterruptAsFork(a.id());
    }, 0);
  }), B = new Array(), ce = new Array(), Y = new Array(), we = () => {
    const ne = R.filter(({
      exit: ve
    }) => ve._tag === "Failure").sort((ve, ke) => ve.index < ke.index ? -1 : ve.index === ke.index ? 0 : 1).map(({
      exit: ve
    }) => ve);
    return ne.length === 0 && ne.push(Tt), ne;
  }, de = (ne, ve = !1) => {
    const ke = Ul(c(ne)), pe = uw(ke, a, a._runtimeFlags, nc);
    return a._scheduler.scheduleTask(() => {
      ve && pe.unsafeInterruptAsFork(a.id()), pe.resume(ke);
    }, 0), pe;
  }, G = () => {
    r || (h -= u.length, u = []), y = !0, J();
  }, be = n ? sy : Ml, Ce = de(lt((ne) => {
    const ve = (pe, Te) => {
      pe._op === "Blocked" ? Y.push(pe) : (R.push({
        index: Te,
        exit: pe
      }), pe._op === "Failure" && !y && G());
    }, ke = () => {
      if (u.length > 0) {
        const pe = u.pop();
        let Te = b++;
        const ot = () => {
          const E = u.pop();
          return Te = b++, T(Di(), () => T(be(o(e(E, Te))), xe));
        }, xe = (E) => u.length > 0 && (ve(E, Te), u.length > 0) ? ot() : ie(E), Re = T(be(o(e(pe, Te))), xe), ge = de(Re);
        B.push(ge), w.add(ge), y && ge._scheduler.scheduleTask(() => {
          ge.unsafeInterruptAsFork(a.id());
        }, 0), ge.addObserver((E) => {
          let qe;
          if (E._op === "Failure" ? qe = E : qe = E.effect_instruction_i0, ce.push(ge), w.delete(ge), ve(qe, Te), R.length === h)
            ne(ie(Nt(eo(we(), {
              parallel: !0
            }), () => Tt)));
          else if (Y.length + R.length === h) {
            const pt = Y.map((We) => We.effect_instruction_i0).reduce(ml);
            ne(ie(Rl(pt, Kf([Nt(eo(we(), {
              parallel: !0
            }), () => Tt), ...Y.map((We) => We.effect_instruction_i1)], (We) => We, n, !0, s))));
          } else
            ke();
        });
      }
    };
    for (let pe = 0; pe < k; pe++)
      ke();
  }));
  return Ht(ji(Mi(o(bS(Ce))), zl({
    onFailure: () => {
      G();
      const ne = Y.length + 1, ve = Math.min(typeof s == "number" ? s : Y.length, Y.length), ke = Array.from(Y);
      return lt((pe) => {
        const Te = [];
        let ot = 0, xe = 0;
        const Re = (E, qe) => (pt) => {
          Te[E] = pt, ot++, ot === ne && pe(ap(eo(Te, {
            parallel: !0
          }))), ke.length > 0 && qe && ge();
        }, ge = () => {
          de(ke.pop(), !0).addObserver(Re(xe, !0)), xe++;
        };
        Ce.addObserver(Re(xe, !1)), xe++;
        for (let E = 0; E < ve; E++)
          ge();
      });
    },
    onSuccess: () => bt(ce, (ne) => ne.inheritAll)
  })));
}))), uo = (t) => rt((e, n) => ie(Jf(t, e, n.runtimeFlags))), Hf = (t) => lw(t, nc), Jf = (t, e, n, r = null) => {
  const s = Wf(t, e, n, r);
  return s.resume(t), s;
}, uw = (t, e, n, r = null) => Wf(t, e, n, r), Wf = (t, e, n, r = null) => {
  const s = Qu(), o = e.getFiberRefs(), c = lv(o, s), a = new Vf(s, c, n), u = Yi(c, pr), h = a._supervisor;
  return h.onStart(u, t, H(e), a), a.addObserver((y) => h.onEnd(y, a)), (r !== null ? r : m(e.getFiberRef(Ao), Nt(() => e.scope()))).add(n, a), a;
}, lw = (t, e) => rt((n, r) => ie(Jf(t, n, r.runtimeFlags, e))), fw = (t) => {
  const e = ys(t);
  if (!xt(e))
    return ny(() => new Ay("Received an empty collection of effects"));
  const n = jt(e), r = yt(e), s = (o) => m(yS(o[1]), Cn(o[0]));
  return m(Uy(), T((o) => m(Pv(r.length), T((c) => dr((a) => m(uo(is(n)), T((u) => m(r, bt((h) => uo(is(h))), Me((h) => bs(h)), Me((h) => m(h, Ye(u))), Dl((h) => m(h, Wn(Ue, (b, y) => m(b, Ui(m(_S(y), T(hw(h, y, o, c)), uo, Ht)))))), T((h) => m(a(m(Hy(o), T(s))), Ll(() => m(h, Wn(Ue, (b, y) => m(b, Fs(qi(y))))))))))))))));
}, hw = (t, e, n, r) => (s) => jy(s, {
  onFailure: (o) => m(Nv(r, (c) => [c === 0 ? m(By(n, o), Ht) : Ue, c - 1]), Mi),
  onSuccess: (o) => m(Vy(n, [o, e]), T((c) => c ? m(ys(t), Wn(Ue, (a, u) => u === e ? a : m(a, Fs(qi(u))))) : Ue))
}), dw = (t) => Tn(t, {
  differ: z0,
  fork: Jn
}), Ja = /* @__PURE__ */ by(o_), Wa = /* @__PURE__ */ dw(Ns), pw = (t, e, n) => xl((r) => T(T(Hf(is(t)), (s) => lt((o) => {
  const c = e.map((h) => h.listeners.count), a = () => {
    c.every((h) => h === 0) && e.every((h) => h.result.state.current._tag === "Pending" ? !0 : !!(h.result.state.current._tag === "Done" && Wi(h.result.state.current.effect) && h.result.state.current.effect._tag === "Failure" && R_(h.result.state.current.effect.cause))) && (u.forEach((h) => h()), n == null || n(), o(qi(s)));
  };
  s.addObserver((h) => {
    u.forEach((b) => b()), o(h);
  });
  const u = e.map((h, b) => {
    const y = (k) => {
      c[b] = k, a();
    };
    return h.listeners.addObserver(y), () => h.listeners.removeObserver(y);
  });
  return a(), $(() => {
    u.forEach((h) => h());
  });
})), () => Ae(() => {
  const s = e.flatMap((o) => o.state.completed ? [] : [o]);
  return Ni(s, (o) => q0(o.request, xy(r)));
}))), gw = Iy, mw = Cy, _w = Bi, Gf = (t) => (e, n) => {
  const r = Qu(), s = [[pr, [[r, t.context]]]];
  n != null && n.scheduler && s.push([qo, [[r, n.scheduler]]]);
  let o = dv(t.fiberRefs, {
    entries: s,
    forkAs: r
  });
  n != null && n.updateRefs && (o = n.updateRefs(o, r));
  const c = new Vf(r, o, t.runtimeFlags);
  let a = e;
  n != null && n.scope && (a = T(mw(n.scope, Kv), (h) => Ui(Ry(h, xl((b) => N(b, c.id()) ? Ue : Bi(c, b))), ji(e, (b) => gw(h, b)))));
  const u = c._supervisor;
  return u !== Ns && (u.onStart(t.context, a, M(), c), c.addObserver((h) => u.onEnd(h, c))), nc.add(t.runtimeFlags, c), (n == null ? void 0 : n.immediate) === !1 ? c.resume(a) : c.start(a), c;
}, zf = (t) => (e, n = {}) => {
  const r = Gf(t)(e, n);
  return n.onExit && r.addObserver((s) => {
    n.onExit(s);
  }), (s, o) => zf(t)(m(r, _w(s ?? Is)), {
    ...o,
    onExit: o != null && o.onExit ? (c) => o.onExit(cb(c)) : void 0
  });
}, lo = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure"), fo = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure/Cause");
var Ok, Rk;
class yw extends Error {
  constructor(n) {
    super();
    f(this, Ok);
    f(this, Rk);
    this[lo] = lo, this[fo] = n;
    const r = kl(n);
    if (r.length > 0) {
      const s = r[0];
      this.name = s.name, this.message = s.message, this.stack = s.stack;
    }
    this.name = `(FiberFailure) ${this.name}`, (this.message === void 0 || this.message.length === 0) && (this.message = "An error has occurred");
  }
  toJSON() {
    return {
      _id: "FiberFailure",
      cause: this[fo].toJSON()
    };
  }
  toString() {
    return "(FiberFailure) " + (this.stack ?? this.message);
  }
  [(Ok = lo, Rk = fo, he)]() {
    return this.toString();
  }
}
const bw = (t) => {
  const e = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const n = new yw(t);
  return Error.stackTraceLimit = e, n;
}, vw = (t) => {
  const e = t;
  switch (e._op) {
    case "Failure":
    case "Success":
      return e;
    case "Left":
      return Ea(e.left);
    case "Right":
      return Oe(e.right);
    case "Some":
      return Oe(e.value);
    case "None":
      return Ea(Gl());
  }
}, Sw = (t) => (e, n) => ww(t)(e, n).then((r) => {
  switch (r._tag) {
    case Le:
      return r.effect_instruction_i0;
    case je:
      throw bw(r.effect_instruction_i0);
  }
}), ww = (t) => (e, n) => new Promise((r) => {
  const s = vw(e);
  s && r(s);
  const o = Gf(t)(e);
  o.addObserver((c) => {
    r(c);
  }), (n == null ? void 0 : n.signal) !== void 0 && (n.signal.aborted ? o.unsafeInterruptAsFork(o.id()) : n.signal.addEventListener("abort", () => {
    o.unsafeInterruptAsFork(o.id());
  }, {
    once: !0
  }));
});
class kw {
  constructor(e, n, r) {
    f(this, "context");
    f(this, "runtimeFlags");
    f(this, "fiberRefs");
    this.context = e, this.runtimeFlags = n, this.fiberRefs = r;
  }
  pipe() {
    return A(this, arguments);
  }
}
const Ew = (t) => new kw(t.context, t.runtimeFlags, t.fiberRefs), Ow = /* @__PURE__ */ pl(En, hl, fl), Yf = /* @__PURE__ */ Ew({
  context: /* @__PURE__ */ di(),
  runtimeFlags: Ow,
  fiberRefs: /* @__PURE__ */ pv()
}), Rw = /* @__PURE__ */ zf(Yf), Iw = /* @__PURE__ */ Sw(Yf), Ga = lt, Cw = Bv, Tw = Ue, $w = T, Fw = fw, Aw = Rw, Mw = Iw;
class cn {
  constructor(e) {
    f(this, "_apply");
    this._apply = e;
  }
  apply(e) {
    return this._apply(e);
  }
}
class Pw extends cn {
}
class Qf extends Pw {
}
class Mt extends Qf {
  flat_fold(e) {
    return new Mt(
      (n) => this.apply(
        new cn(
          (r) => {
            let o = r.then(
              (a) => e(a)
            ).then(
              (a) => a.apply(n)
            );
            return _e.fromPromise(o);
          }
        )
      )
    );
  }
  zip(e) {
    return Mt.Zip(this, e);
  }
  static Zip(e, n) {
    return new Mt(
      (r) => {
        var s = null, o = null;
        let c = e.apply(
          new cn((u) => (s = u, _e.ZERO))
        );
        var a = n.apply(
          new cn((u) => (o = u, _e.ZERO))
        );
        return _e.Seq(
          _e.Par(c, a),
          r.apply(
            Promise.all([s, o]).then(
              (u) => [u[0], u[1]]
            )
          )
        );
      }
    );
  }
}
var _e;
((t) => {
  function e(a, u) {
    return $w(
      a,
      (h) => h == null ? u : t.Seq(h, u)
    );
  }
  t.Seq = e;
  function n(a, u) {
    return Fw([a, u]);
  }
  t.Par = n, t.ZERO = Tw;
  function r(a) {
    return Ga((u, h) => {
      a.then(
        (b) => u(b)
      );
    });
  }
  t.fromPromise = r;
  function s(a) {
    return Ga((u, h) => {
      u(a());
    });
  }
  t.fromThunk = s;
  function o(a) {
    return Aw(a);
  }
  t.Submit = o;
  function c(a) {
    return Mw(a);
  }
  t.Promise = c;
})(_e || (_e = {}));
class Pe extends Qf {
  receive(e) {
    return e.apply(
      new cn(
        (n) => this.apply(
          new cn(
            (r) => _e.fromPromise(
              n.then(
                (s) => (r.resolve(s), _e.ZERO)
              )
            )
          )
        )
      )
    );
  }
  static later(e) {
    return new Mt(
      (n) => n.apply(e)
    );
  }
  static issue(e) {
    return new Mt(
      function(n) {
        let r = new Promise(
          (s) => {
            s(e);
          }
        );
        return n.apply(r);
      }
    );
  }
  static Pure(e) {
    return new Pe(
      (n) => n.apply(e)
    );
  }
  /**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
  static Unit() {
    return new Pe(
      (e) => e.apply(new Kt())
    );
  }
}
var x = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var za;
function Nw() {
  if (za)
    return x;
  za = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), c = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), y = Symbol.iterator;
  function k(d) {
    return d === null || typeof d != "object" ? null : (d = y && d[y] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var w = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, R = Object.assign, J = {};
  function B(d, v, U) {
    this.props = d, this.context = v, this.refs = J, this.updater = U || w;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(d, v) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, v, "setState");
  }, B.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function ce() {
  }
  ce.prototype = B.prototype;
  function Y(d, v, U) {
    this.props = d, this.context = v, this.refs = J, this.updater = U || w;
  }
  var we = Y.prototype = new ce();
  we.constructor = Y, R(we, B.prototype), we.isPureReactComponent = !0;
  var de = Array.isArray, G = Object.prototype.hasOwnProperty, be = { current: null }, Ce = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ne(d, v, U) {
    var V, W = {}, ae = null, re = null;
    if (v != null)
      for (V in v.ref !== void 0 && (re = v.ref), v.key !== void 0 && (ae = "" + v.key), v)
        G.call(v, V) && !Ce.hasOwnProperty(V) && (W[V] = v[V]);
    var se = arguments.length - 2;
    if (se === 1)
      W.children = U;
    else if (1 < se) {
      for (var X = Array(se), $e = 0; $e < se; $e++)
        X[$e] = arguments[$e + 2];
      W.children = X;
    }
    if (d && d.defaultProps)
      for (V in se = d.defaultProps, se)
        W[V] === void 0 && (W[V] = se[V]);
    return { $$typeof: t, type: d, key: ae, ref: re, props: W, _owner: be.current };
  }
  function ve(d, v) {
    return { $$typeof: t, type: d.type, key: v, ref: d.ref, props: d.props, _owner: d._owner };
  }
  function ke(d) {
    return typeof d == "object" && d !== null && d.$$typeof === t;
  }
  function pe(d) {
    var v = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(U) {
      return v[U];
    });
  }
  var Te = /\/+/g;
  function ot(d, v) {
    return typeof d == "object" && d !== null && d.key != null ? pe("" + d.key) : v.toString(36);
  }
  function xe(d, v, U, V, W) {
    var ae = typeof d;
    (ae === "undefined" || ae === "boolean") && (d = null);
    var re = !1;
    if (d === null)
      re = !0;
    else
      switch (ae) {
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case t:
            case e:
              re = !0;
          }
      }
    if (re)
      return re = d, W = W(re), d = V === "" ? "." + ot(re, 0) : V, de(W) ? (U = "", d != null && (U = d.replace(Te, "$&/") + "/"), xe(W, v, U, "", function($e) {
        return $e;
      })) : W != null && (ke(W) && (W = ve(W, U + (!W.key || re && re.key === W.key ? "" : ("" + W.key).replace(Te, "$&/") + "/") + d)), v.push(W)), 1;
    if (re = 0, V = V === "" ? "." : V + ":", de(d))
      for (var se = 0; se < d.length; se++) {
        ae = d[se];
        var X = V + ot(ae, se);
        re += xe(ae, v, U, X, W);
      }
    else if (X = k(d), typeof X == "function")
      for (d = X.call(d), se = 0; !(ae = d.next()).done; )
        ae = ae.value, X = V + ot(ae, se++), re += xe(ae, v, U, X, W);
    else if (ae === "object")
      throw v = String(d), Error("Objects are not valid as a React child (found: " + (v === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : v) + "). If you meant to render a collection of children, use an array instead.");
    return re;
  }
  function Re(d, v, U) {
    if (d == null)
      return d;
    var V = [], W = 0;
    return xe(d, V, "", "", function(ae) {
      return v.call(U, ae, W++);
    }), V;
  }
  function ge(d) {
    if (d._status === -1) {
      var v = d._result;
      v = v(), v.then(function(U) {
        (d._status === 0 || d._status === -1) && (d._status = 1, d._result = U);
      }, function(U) {
        (d._status === 0 || d._status === -1) && (d._status = 2, d._result = U);
      }), d._status === -1 && (d._status = 0, d._result = v);
    }
    if (d._status === 1)
      return d._result.default;
    throw d._result;
  }
  var E = { current: null }, qe = { transition: null }, pt = { ReactCurrentDispatcher: E, ReactCurrentBatchConfig: qe, ReactCurrentOwner: be };
  function We() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return x.Children = { map: Re, forEach: function(d, v, U) {
    Re(d, function() {
      v.apply(this, arguments);
    }, U);
  }, count: function(d) {
    var v = 0;
    return Re(d, function() {
      v++;
    }), v;
  }, toArray: function(d) {
    return Re(d, function(v) {
      return v;
    }) || [];
  }, only: function(d) {
    if (!ke(d))
      throw Error("React.Children.only expected to receive a single React element child.");
    return d;
  } }, x.Component = B, x.Fragment = n, x.Profiler = s, x.PureComponent = Y, x.StrictMode = r, x.Suspense = u, x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pt, x.act = We, x.cloneElement = function(d, v, U) {
    if (d == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
    var V = R({}, d.props), W = d.key, ae = d.ref, re = d._owner;
    if (v != null) {
      if (v.ref !== void 0 && (ae = v.ref, re = be.current), v.key !== void 0 && (W = "" + v.key), d.type && d.type.defaultProps)
        var se = d.type.defaultProps;
      for (X in v)
        G.call(v, X) && !Ce.hasOwnProperty(X) && (V[X] = v[X] === void 0 && se !== void 0 ? se[X] : v[X]);
    }
    var X = arguments.length - 2;
    if (X === 1)
      V.children = U;
    else if (1 < X) {
      se = Array(X);
      for (var $e = 0; $e < X; $e++)
        se[$e] = arguments[$e + 2];
      V.children = se;
    }
    return { $$typeof: t, type: d.type, key: W, ref: ae, props: V, _owner: re };
  }, x.createContext = function(d) {
    return d = { $$typeof: c, _currentValue: d, _currentValue2: d, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, d.Provider = { $$typeof: o, _context: d }, d.Consumer = d;
  }, x.createElement = ne, x.createFactory = function(d) {
    var v = ne.bind(null, d);
    return v.type = d, v;
  }, x.createRef = function() {
    return { current: null };
  }, x.forwardRef = function(d) {
    return { $$typeof: a, render: d };
  }, x.isValidElement = ke, x.lazy = function(d) {
    return { $$typeof: b, _payload: { _status: -1, _result: d }, _init: ge };
  }, x.memo = function(d, v) {
    return { $$typeof: h, type: d, compare: v === void 0 ? null : v };
  }, x.startTransition = function(d) {
    var v = qe.transition;
    qe.transition = {};
    try {
      d();
    } finally {
      qe.transition = v;
    }
  }, x.unstable_act = We, x.useCallback = function(d, v) {
    return E.current.useCallback(d, v);
  }, x.useContext = function(d) {
    return E.current.useContext(d);
  }, x.useDebugValue = function() {
  }, x.useDeferredValue = function(d) {
    return E.current.useDeferredValue(d);
  }, x.useEffect = function(d, v) {
    return E.current.useEffect(d, v);
  }, x.useId = function() {
    return E.current.useId();
  }, x.useImperativeHandle = function(d, v, U) {
    return E.current.useImperativeHandle(d, v, U);
  }, x.useInsertionEffect = function(d, v) {
    return E.current.useInsertionEffect(d, v);
  }, x.useLayoutEffect = function(d, v) {
    return E.current.useLayoutEffect(d, v);
  }, x.useMemo = function(d, v) {
    return E.current.useMemo(d, v);
  }, x.useReducer = function(d, v, U) {
    return E.current.useReducer(d, v, U);
  }, x.useRef = function(d) {
    return E.current.useRef(d);
  }, x.useState = function(d) {
    return E.current.useState(d);
  }, x.useSyncExternalStore = function(d, v, U) {
    return E.current.useSyncExternalStore(d, v, U);
  }, x.useTransition = function() {
    return E.current.useTransition();
  }, x.version = "18.3.1", x;
}
var Un = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Un.exports;
var Ya;
function xw() {
  return Ya || (Ya = 1, function(t, e) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var n = "18.3.1", r = Symbol.for("react.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), h = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), J = Symbol.for("react.offscreen"), B = Symbol.iterator, ce = "@@iterator";
      function Y(i) {
        if (i === null || typeof i != "object")
          return null;
        var l = B && i[B] || i[ce];
        return typeof l == "function" ? l : null;
      }
      var we = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, de = {
        transition: null
      }, G = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, be = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ce = {}, ne = null;
      function ve(i) {
        ne = i;
      }
      Ce.setExtraStackFrame = function(i) {
        ne = i;
      }, Ce.getCurrentStack = null, Ce.getStackAddendum = function() {
        var i = "";
        ne && (i += ne);
        var l = Ce.getCurrentStack;
        return l && (i += l() || ""), i;
      };
      var ke = !1, pe = !1, Te = !1, ot = !1, xe = !1, Re = {
        ReactCurrentDispatcher: we,
        ReactCurrentBatchConfig: de,
        ReactCurrentOwner: be
      };
      Re.ReactDebugCurrentFrame = Ce, Re.ReactCurrentActQueue = G;
      function ge(i) {
        {
          for (var l = arguments.length, p = new Array(l > 1 ? l - 1 : 0), _ = 1; _ < l; _++)
            p[_ - 1] = arguments[_];
          qe("warn", i, p);
        }
      }
      function E(i) {
        {
          for (var l = arguments.length, p = new Array(l > 1 ? l - 1 : 0), _ = 1; _ < l; _++)
            p[_ - 1] = arguments[_];
          qe("error", i, p);
        }
      }
      function qe(i, l, p) {
        {
          var _ = Re.ReactDebugCurrentFrame, S = _.getStackAddendum();
          S !== "" && (l += "%s", p = p.concat([S]));
          var C = p.map(function(O) {
            return String(O);
          });
          C.unshift("Warning: " + l), Function.prototype.apply.call(console[i], console, C);
        }
      }
      var pt = {};
      function We(i, l) {
        {
          var p = i.constructor, _ = p && (p.displayName || p.name) || "ReactClass", S = _ + "." + l;
          if (pt[S])
            return;
          E("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", l, _), pt[S] = !0;
        }
      }
      var d = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(i) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(i, l, p) {
          We(i, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(i, l, p, _) {
          We(i, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(i, l, p, _) {
          We(i, "setState");
        }
      }, v = Object.assign, U = {};
      Object.freeze(U);
      function V(i, l, p) {
        this.props = i, this.context = l, this.refs = U, this.updater = p || d;
      }
      V.prototype.isReactComponent = {}, V.prototype.setState = function(i, l) {
        if (typeof i != "object" && typeof i != "function" && i != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, i, l, "setState");
      }, V.prototype.forceUpdate = function(i) {
        this.updater.enqueueForceUpdate(this, i, "forceUpdate");
      };
      {
        var W = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, ae = function(i, l) {
          Object.defineProperty(V.prototype, i, {
            get: function() {
              ge("%s(...) is deprecated in plain JavaScript React classes. %s", l[0], l[1]);
            }
          });
        };
        for (var re in W)
          W.hasOwnProperty(re) && ae(re, W[re]);
      }
      function se() {
      }
      se.prototype = V.prototype;
      function X(i, l, p) {
        this.props = i, this.context = l, this.refs = U, this.updater = p || d;
      }
      var $e = X.prototype = new se();
      $e.constructor = X, v($e, V.prototype), $e.isPureReactComponent = !0;
      function eh() {
        var i = {
          current: null
        };
        return Object.seal(i), i;
      }
      var th = Array.isArray;
      function br(i) {
        return th(i);
      }
      function nh(i) {
        {
          var l = typeof Symbol == "function" && Symbol.toStringTag, p = l && i[Symbol.toStringTag] || i.constructor.name || "Object";
          return p;
        }
      }
      function rh(i) {
        try {
          return ac(i), !1;
        } catch {
          return !0;
        }
      }
      function ac(i) {
        return "" + i;
      }
      function vr(i) {
        if (rh(i))
          return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nh(i)), ac(i);
      }
      function sh(i, l, p) {
        var _ = i.displayName;
        if (_)
          return _;
        var S = l.displayName || l.name || "";
        return S !== "" ? p + "(" + S + ")" : p;
      }
      function uc(i) {
        return i.displayName || "Context";
      }
      function gt(i) {
        if (i == null)
          return null;
        if (typeof i.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
          return i.displayName || i.name || null;
        if (typeof i == "string")
          return i;
        switch (i) {
          case o:
            return "Fragment";
          case s:
            return "Portal";
          case a:
            return "Profiler";
          case c:
            return "StrictMode";
          case y:
            return "Suspense";
          case k:
            return "SuspenseList";
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case h:
              var l = i;
              return uc(l) + ".Consumer";
            case u:
              var p = i;
              return uc(p._context) + ".Provider";
            case b:
              return sh(i, i.render, "ForwardRef");
            case w:
              var _ = i.displayName || null;
              return _ !== null ? _ : gt(i.type) || "Memo";
            case R: {
              var S = i, C = S._payload, O = S._init;
              try {
                return gt(O(C));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Fn = Object.prototype.hasOwnProperty, lc = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, fc, hc, xs;
      xs = {};
      function dc(i) {
        if (Fn.call(i, "ref")) {
          var l = Object.getOwnPropertyDescriptor(i, "ref").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return i.ref !== void 0;
      }
      function pc(i) {
        if (Fn.call(i, "key")) {
          var l = Object.getOwnPropertyDescriptor(i, "key").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return i.key !== void 0;
      }
      function oh(i, l) {
        var p = function() {
          fc || (fc = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: p,
          configurable: !0
        });
      }
      function ih(i, l) {
        var p = function() {
          hc || (hc = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: p,
          configurable: !0
        });
      }
      function ch(i) {
        if (typeof i.ref == "string" && be.current && i.__self && be.current.stateNode !== i.__self) {
          var l = gt(be.current.type);
          xs[l] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', l, i.ref), xs[l] = !0);
        }
      }
      var js = function(i, l, p, _, S, C, O) {
        var F = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: r,
          // Built-in properties that belong on the element
          type: i,
          key: l,
          ref: p,
          props: O,
          // Record the component responsible for creating this element.
          _owner: C
        };
        return F._store = {}, Object.defineProperty(F._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(F, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: _
        }), Object.defineProperty(F, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: S
        }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
      };
      function ah(i, l, p) {
        var _, S = {}, C = null, O = null, F = null, q = null;
        if (l != null) {
          dc(l) && (O = l.ref, ch(l)), pc(l) && (vr(l.key), C = "" + l.key), F = l.__self === void 0 ? null : l.__self, q = l.__source === void 0 ? null : l.__source;
          for (_ in l)
            Fn.call(l, _) && !lc.hasOwnProperty(_) && (S[_] = l[_]);
        }
        var z = arguments.length - 2;
        if (z === 1)
          S.children = p;
        else if (z > 1) {
          for (var ee = Array(z), te = 0; te < z; te++)
            ee[te] = arguments[te + 2];
          Object.freeze && Object.freeze(ee), S.children = ee;
        }
        if (i && i.defaultProps) {
          var oe = i.defaultProps;
          for (_ in oe)
            S[_] === void 0 && (S[_] = oe[_]);
        }
        if (C || O) {
          var le = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          C && oh(S, le), O && ih(S, le);
        }
        return js(i, C, O, F, q, be.current, S);
      }
      function uh(i, l) {
        var p = js(i.type, l, i.ref, i._self, i._source, i._owner, i.props);
        return p;
      }
      function lh(i, l, p) {
        if (i == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + i + ".");
        var _, S = v({}, i.props), C = i.key, O = i.ref, F = i._self, q = i._source, z = i._owner;
        if (l != null) {
          dc(l) && (O = l.ref, z = be.current), pc(l) && (vr(l.key), C = "" + l.key);
          var ee;
          i.type && i.type.defaultProps && (ee = i.type.defaultProps);
          for (_ in l)
            Fn.call(l, _) && !lc.hasOwnProperty(_) && (l[_] === void 0 && ee !== void 0 ? S[_] = ee[_] : S[_] = l[_]);
        }
        var te = arguments.length - 2;
        if (te === 1)
          S.children = p;
        else if (te > 1) {
          for (var oe = Array(te), le = 0; le < te; le++)
            oe[le] = arguments[le + 2];
          S.children = oe;
        }
        return js(i.type, C, O, F, q, z, S);
      }
      function Wt(i) {
        return typeof i == "object" && i !== null && i.$$typeof === r;
      }
      var gc = ".", fh = ":";
      function hh(i) {
        var l = /[=:]/g, p = {
          "=": "=0",
          ":": "=2"
        }, _ = i.replace(l, function(S) {
          return p[S];
        });
        return "$" + _;
      }
      var mc = !1, dh = /\/+/g;
      function _c(i) {
        return i.replace(dh, "$&/");
      }
      function Ls(i, l) {
        return typeof i == "object" && i !== null && i.key != null ? (vr(i.key), hh("" + i.key)) : l.toString(36);
      }
      function Sr(i, l, p, _, S) {
        var C = typeof i;
        (C === "undefined" || C === "boolean") && (i = null);
        var O = !1;
        if (i === null)
          O = !0;
        else
          switch (C) {
            case "string":
            case "number":
              O = !0;
              break;
            case "object":
              switch (i.$$typeof) {
                case r:
                case s:
                  O = !0;
              }
          }
        if (O) {
          var F = i, q = S(F), z = _ === "" ? gc + Ls(F, 0) : _;
          if (br(q)) {
            var ee = "";
            z != null && (ee = _c(z) + "/"), Sr(q, l, ee, "", function(od) {
              return od;
            });
          } else
            q != null && (Wt(q) && (q.key && (!F || F.key !== q.key) && vr(q.key), q = uh(
              q,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              p + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (q.key && (!F || F.key !== q.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                _c("" + q.key) + "/"
              ) : "") + z
            )), l.push(q));
          return 1;
        }
        var te, oe, le = 0, Ee = _ === "" ? gc : _ + fh;
        if (br(i))
          for (var Tr = 0; Tr < i.length; Tr++)
            te = i[Tr], oe = Ee + Ls(te, Tr), le += Sr(te, l, p, oe, S);
        else {
          var Ws = Y(i);
          if (typeof Ws == "function") {
            var Bc = i;
            Ws === Bc.entries && (mc || ge("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), mc = !0);
            for (var rd = Ws.call(Bc), Vc, sd = 0; !(Vc = rd.next()).done; )
              te = Vc.value, oe = Ee + Ls(te, sd++), le += Sr(te, l, p, oe, S);
          } else if (C === "object") {
            var Kc = String(i);
            throw new Error("Objects are not valid as a React child (found: " + (Kc === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : Kc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return le;
      }
      function wr(i, l, p) {
        if (i == null)
          return i;
        var _ = [], S = 0;
        return Sr(i, _, "", "", function(C) {
          return l.call(p, C, S++);
        }), _;
      }
      function ph(i) {
        var l = 0;
        return wr(i, function() {
          l++;
        }), l;
      }
      function gh(i, l, p) {
        wr(i, function() {
          l.apply(this, arguments);
        }, p);
      }
      function mh(i) {
        return wr(i, function(l) {
          return l;
        }) || [];
      }
      function _h(i) {
        if (!Wt(i))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return i;
      }
      function yh(i) {
        var l = {
          $$typeof: h,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: i,
          _currentValue2: i,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        l.Provider = {
          $$typeof: u,
          _context: l
        };
        var p = !1, _ = !1, S = !1;
        {
          var C = {
            $$typeof: h,
            _context: l
          };
          Object.defineProperties(C, {
            Provider: {
              get: function() {
                return _ || (_ = !0, E("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), l.Provider;
              },
              set: function(O) {
                l.Provider = O;
              }
            },
            _currentValue: {
              get: function() {
                return l._currentValue;
              },
              set: function(O) {
                l._currentValue = O;
              }
            },
            _currentValue2: {
              get: function() {
                return l._currentValue2;
              },
              set: function(O) {
                l._currentValue2 = O;
              }
            },
            _threadCount: {
              get: function() {
                return l._threadCount;
              },
              set: function(O) {
                l._threadCount = O;
              }
            },
            Consumer: {
              get: function() {
                return p || (p = !0, E("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), l.Consumer;
              }
            },
            displayName: {
              get: function() {
                return l.displayName;
              },
              set: function(O) {
                S || (ge("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", O), S = !0);
              }
            }
          }), l.Consumer = C;
        }
        return l._currentRenderer = null, l._currentRenderer2 = null, l;
      }
      var An = -1, Ds = 0, yc = 1, bh = 2;
      function vh(i) {
        if (i._status === An) {
          var l = i._result, p = l();
          if (p.then(function(C) {
            if (i._status === Ds || i._status === An) {
              var O = i;
              O._status = yc, O._result = C;
            }
          }, function(C) {
            if (i._status === Ds || i._status === An) {
              var O = i;
              O._status = bh, O._result = C;
            }
          }), i._status === An) {
            var _ = i;
            _._status = Ds, _._result = p;
          }
        }
        if (i._status === yc) {
          var S = i._result;
          return S === void 0 && E(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, S), "default" in S || E(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, S), S.default;
        } else
          throw i._result;
      }
      function Sh(i) {
        var l = {
          // We use these fields to store the result.
          _status: An,
          _result: i
        }, p = {
          $$typeof: R,
          _payload: l,
          _init: vh
        };
        {
          var _, S;
          Object.defineProperties(p, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return _;
              },
              set: function(C) {
                E("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), _ = C, Object.defineProperty(p, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return S;
              },
              set: function(C) {
                E("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), S = C, Object.defineProperty(p, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return p;
      }
      function wh(i) {
        i != null && i.$$typeof === w ? E("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof i != "function" ? E("forwardRef requires a render function but was given %s.", i === null ? "null" : typeof i) : i.length !== 0 && i.length !== 2 && E("forwardRef render functions accept exactly two parameters: props and ref. %s", i.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), i != null && (i.defaultProps != null || i.propTypes != null) && E("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var l = {
          $$typeof: b,
          render: i
        };
        {
          var p;
          Object.defineProperty(l, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return p;
            },
            set: function(_) {
              p = _, !i.name && !i.displayName && (i.displayName = _);
            }
          });
        }
        return l;
      }
      var bc;
      bc = Symbol.for("react.module.reference");
      function vc(i) {
        return !!(typeof i == "string" || typeof i == "function" || i === o || i === a || xe || i === c || i === y || i === k || ot || i === J || ke || pe || Te || typeof i == "object" && i !== null && (i.$$typeof === R || i.$$typeof === w || i.$$typeof === u || i.$$typeof === h || i.$$typeof === b || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        i.$$typeof === bc || i.getModuleId !== void 0));
      }
      function kh(i, l) {
        vc(i) || E("memo: The first argument must be a component. Instead received: %s", i === null ? "null" : typeof i);
        var p = {
          $$typeof: w,
          type: i,
          compare: l === void 0 ? null : l
        };
        {
          var _;
          Object.defineProperty(p, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return _;
            },
            set: function(S) {
              _ = S, !i.name && !i.displayName && (i.displayName = S);
            }
          });
        }
        return p;
      }
      function Fe() {
        var i = we.current;
        return i === null && E(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), i;
      }
      function Eh(i) {
        var l = Fe();
        if (i._context !== void 0) {
          var p = i._context;
          p.Consumer === i ? E("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : p.Provider === i && E("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return l.useContext(i);
      }
      function Oh(i) {
        var l = Fe();
        return l.useState(i);
      }
      function Rh(i, l, p) {
        var _ = Fe();
        return _.useReducer(i, l, p);
      }
      function Ih(i) {
        var l = Fe();
        return l.useRef(i);
      }
      function Ch(i, l) {
        var p = Fe();
        return p.useEffect(i, l);
      }
      function Th(i, l) {
        var p = Fe();
        return p.useInsertionEffect(i, l);
      }
      function $h(i, l) {
        var p = Fe();
        return p.useLayoutEffect(i, l);
      }
      function Fh(i, l) {
        var p = Fe();
        return p.useCallback(i, l);
      }
      function Ah(i, l) {
        var p = Fe();
        return p.useMemo(i, l);
      }
      function Mh(i, l, p) {
        var _ = Fe();
        return _.useImperativeHandle(i, l, p);
      }
      function Ph(i, l) {
        {
          var p = Fe();
          return p.useDebugValue(i, l);
        }
      }
      function Nh() {
        var i = Fe();
        return i.useTransition();
      }
      function xh(i) {
        var l = Fe();
        return l.useDeferredValue(i);
      }
      function jh() {
        var i = Fe();
        return i.useId();
      }
      function Lh(i, l, p) {
        var _ = Fe();
        return _.useSyncExternalStore(i, l, p);
      }
      var Mn = 0, Sc, wc, kc, Ec, Oc, Rc, Ic;
      function Cc() {
      }
      Cc.__reactDisabledLog = !0;
      function Dh() {
        {
          if (Mn === 0) {
            Sc = console.log, wc = console.info, kc = console.warn, Ec = console.error, Oc = console.group, Rc = console.groupCollapsed, Ic = console.groupEnd;
            var i = {
              configurable: !0,
              enumerable: !0,
              value: Cc,
              writable: !0
            };
            Object.defineProperties(console, {
              info: i,
              log: i,
              warn: i,
              error: i,
              group: i,
              groupCollapsed: i,
              groupEnd: i
            });
          }
          Mn++;
        }
      }
      function Uh() {
        {
          if (Mn--, Mn === 0) {
            var i = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: v({}, i, {
                value: Sc
              }),
              info: v({}, i, {
                value: wc
              }),
              warn: v({}, i, {
                value: kc
              }),
              error: v({}, i, {
                value: Ec
              }),
              group: v({}, i, {
                value: Oc
              }),
              groupCollapsed: v({}, i, {
                value: Rc
              }),
              groupEnd: v({}, i, {
                value: Ic
              })
            });
          }
          Mn < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Us = Re.ReactCurrentDispatcher, qs;
      function kr(i, l, p) {
        {
          if (qs === void 0)
            try {
              throw Error();
            } catch (S) {
              var _ = S.stack.trim().match(/\n( *(at )?)/);
              qs = _ && _[1] || "";
            }
          return `
` + qs + i;
        }
      }
      var Bs = !1, Er;
      {
        var qh = typeof WeakMap == "function" ? WeakMap : Map;
        Er = new qh();
      }
      function Tc(i, l) {
        if (!i || Bs)
          return "";
        {
          var p = Er.get(i);
          if (p !== void 0)
            return p;
        }
        var _;
        Bs = !0;
        var S = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var C;
        C = Us.current, Us.current = null, Dh();
        try {
          if (l) {
            var O = function() {
              throw Error();
            };
            if (Object.defineProperty(O.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(O, []);
              } catch (Ee) {
                _ = Ee;
              }
              Reflect.construct(i, [], O);
            } else {
              try {
                O.call();
              } catch (Ee) {
                _ = Ee;
              }
              i.call(O.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Ee) {
              _ = Ee;
            }
            i();
          }
        } catch (Ee) {
          if (Ee && _ && typeof Ee.stack == "string") {
            for (var F = Ee.stack.split(`
`), q = _.stack.split(`
`), z = F.length - 1, ee = q.length - 1; z >= 1 && ee >= 0 && F[z] !== q[ee]; )
              ee--;
            for (; z >= 1 && ee >= 0; z--, ee--)
              if (F[z] !== q[ee]) {
                if (z !== 1 || ee !== 1)
                  do
                    if (z--, ee--, ee < 0 || F[z] !== q[ee]) {
                      var te = `
` + F[z].replace(" at new ", " at ");
                      return i.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", i.displayName)), typeof i == "function" && Er.set(i, te), te;
                    }
                  while (z >= 1 && ee >= 0);
                break;
              }
          }
        } finally {
          Bs = !1, Us.current = C, Uh(), Error.prepareStackTrace = S;
        }
        var oe = i ? i.displayName || i.name : "", le = oe ? kr(oe) : "";
        return typeof i == "function" && Er.set(i, le), le;
      }
      function Bh(i, l, p) {
        return Tc(i, !1);
      }
      function Vh(i) {
        var l = i.prototype;
        return !!(l && l.isReactComponent);
      }
      function Or(i, l, p) {
        if (i == null)
          return "";
        if (typeof i == "function")
          return Tc(i, Vh(i));
        if (typeof i == "string")
          return kr(i);
        switch (i) {
          case y:
            return kr("Suspense");
          case k:
            return kr("SuspenseList");
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case b:
              return Bh(i.render);
            case w:
              return Or(i.type, l, p);
            case R: {
              var _ = i, S = _._payload, C = _._init;
              try {
                return Or(C(S), l, p);
              } catch {
              }
            }
          }
        return "";
      }
      var $c = {}, Fc = Re.ReactDebugCurrentFrame;
      function Rr(i) {
        if (i) {
          var l = i._owner, p = Or(i.type, i._source, l ? l.type : null);
          Fc.setExtraStackFrame(p);
        } else
          Fc.setExtraStackFrame(null);
      }
      function Kh(i, l, p, _, S) {
        {
          var C = Function.call.bind(Fn);
          for (var O in i)
            if (C(i, O)) {
              var F = void 0;
              try {
                if (typeof i[O] != "function") {
                  var q = Error((_ || "React class") + ": " + p + " type `" + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[O] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw q.name = "Invariant Violation", q;
                }
                F = i[O](l, O, _, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (z) {
                F = z;
              }
              F && !(F instanceof Error) && (Rr(S), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", _ || "React class", p, O, typeof F), Rr(null)), F instanceof Error && !(F.message in $c) && ($c[F.message] = !0, Rr(S), E("Failed %s type: %s", p, F.message), Rr(null));
            }
        }
      }
      function Gt(i) {
        if (i) {
          var l = i._owner, p = Or(i.type, i._source, l ? l.type : null);
          ve(p);
        } else
          ve(null);
      }
      var Vs;
      Vs = !1;
      function Ac() {
        if (be.current) {
          var i = gt(be.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
      function Hh(i) {
        if (i !== void 0) {
          var l = i.fileName.replace(/^.*[\\\/]/, ""), p = i.lineNumber;
          return `

Check your code at ` + l + ":" + p + ".";
        }
        return "";
      }
      function Jh(i) {
        return i != null ? Hh(i.__source) : "";
      }
      var Mc = {};
      function Wh(i) {
        var l = Ac();
        if (!l) {
          var p = typeof i == "string" ? i : i.displayName || i.name;
          p && (l = `

Check the top-level render call using <` + p + ">.");
        }
        return l;
      }
      function Pc(i, l) {
        if (!(!i._store || i._store.validated || i.key != null)) {
          i._store.validated = !0;
          var p = Wh(l);
          if (!Mc[p]) {
            Mc[p] = !0;
            var _ = "";
            i && i._owner && i._owner !== be.current && (_ = " It was passed a child from " + gt(i._owner.type) + "."), Gt(i), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, _), Gt(null);
          }
        }
      }
      function Nc(i, l) {
        if (typeof i == "object") {
          if (br(i))
            for (var p = 0; p < i.length; p++) {
              var _ = i[p];
              Wt(_) && Pc(_, l);
            }
          else if (Wt(i))
            i._store && (i._store.validated = !0);
          else if (i) {
            var S = Y(i);
            if (typeof S == "function" && S !== i.entries)
              for (var C = S.call(i), O; !(O = C.next()).done; )
                Wt(O.value) && Pc(O.value, l);
          }
        }
      }
      function xc(i) {
        {
          var l = i.type;
          if (l == null || typeof l == "string")
            return;
          var p;
          if (typeof l == "function")
            p = l.propTypes;
          else if (typeof l == "object" && (l.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          l.$$typeof === w))
            p = l.propTypes;
          else
            return;
          if (p) {
            var _ = gt(l);
            Kh(p, i.props, "prop", _, i);
          } else if (l.PropTypes !== void 0 && !Vs) {
            Vs = !0;
            var S = gt(l);
            E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", S || "Unknown");
          }
          typeof l.getDefaultProps == "function" && !l.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Gh(i) {
        {
          for (var l = Object.keys(i.props), p = 0; p < l.length; p++) {
            var _ = l[p];
            if (_ !== "children" && _ !== "key") {
              Gt(i), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", _), Gt(null);
              break;
            }
          }
          i.ref !== null && (Gt(i), E("Invalid attribute `ref` supplied to `React.Fragment`."), Gt(null));
        }
      }
      function jc(i, l, p) {
        var _ = vc(i);
        if (!_) {
          var S = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = Jh(l);
          C ? S += C : S += Ac();
          var O;
          i === null ? O = "null" : br(i) ? O = "array" : i !== void 0 && i.$$typeof === r ? (O = "<" + (gt(i.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, E("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, S);
        }
        var F = ah.apply(this, arguments);
        if (F == null)
          return F;
        if (_)
          for (var q = 2; q < arguments.length; q++)
            Nc(arguments[q], i);
        return i === o ? Gh(F) : xc(F), F;
      }
      var Lc = !1;
      function zh(i) {
        var l = jc.bind(null, i);
        return l.type = i, Lc || (Lc = !0, ge("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(l, "type", {
          enumerable: !1,
          get: function() {
            return ge("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: i
            }), i;
          }
        }), l;
      }
      function Yh(i, l, p) {
        for (var _ = lh.apply(this, arguments), S = 2; S < arguments.length; S++)
          Nc(arguments[S], _.type);
        return xc(_), _;
      }
      function Qh(i, l) {
        var p = de.transition;
        de.transition = {};
        var _ = de.transition;
        de.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          i();
        } finally {
          if (de.transition = p, p === null && _._updatedFibers) {
            var S = _._updatedFibers.size;
            S > 10 && ge("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), _._updatedFibers.clear();
          }
        }
      }
      var Dc = !1, Ir = null;
      function Xh(i) {
        if (Ir === null)
          try {
            var l = ("require" + Math.random()).slice(0, 7), p = t && t[l];
            Ir = p.call(t, "timers").setImmediate;
          } catch {
            Ir = function(S) {
              Dc === !1 && (Dc = !0, typeof MessageChannel > "u" && E("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var C = new MessageChannel();
              C.port1.onmessage = S, C.port2.postMessage(void 0);
            };
          }
        return Ir(i);
      }
      var zt = 0, Uc = !1;
      function qc(i) {
        {
          var l = zt;
          zt++, G.current === null && (G.current = []);
          var p = G.isBatchingLegacy, _;
          try {
            if (G.isBatchingLegacy = !0, _ = i(), !p && G.didScheduleLegacyUpdate) {
              var S = G.current;
              S !== null && (G.didScheduleLegacyUpdate = !1, Js(S));
            }
          } catch (oe) {
            throw Cr(l), oe;
          } finally {
            G.isBatchingLegacy = p;
          }
          if (_ !== null && typeof _ == "object" && typeof _.then == "function") {
            var C = _, O = !1, F = {
              then: function(oe, le) {
                O = !0, C.then(function(Ee) {
                  Cr(l), zt === 0 ? Ks(Ee, oe, le) : oe(Ee);
                }, function(Ee) {
                  Cr(l), le(Ee);
                });
              }
            };
            return !Uc && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              O || (Uc = !0, E("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), F;
          } else {
            var q = _;
            if (Cr(l), zt === 0) {
              var z = G.current;
              z !== null && (Js(z), G.current = null);
              var ee = {
                then: function(oe, le) {
                  G.current === null ? (G.current = [], Ks(q, oe, le)) : oe(q);
                }
              };
              return ee;
            } else {
              var te = {
                then: function(oe, le) {
                  oe(q);
                }
              };
              return te;
            }
          }
        }
      }
      function Cr(i) {
        i !== zt - 1 && E("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), zt = i;
      }
      function Ks(i, l, p) {
        {
          var _ = G.current;
          if (_ !== null)
            try {
              Js(_), Xh(function() {
                _.length === 0 ? (G.current = null, l(i)) : Ks(i, l, p);
              });
            } catch (S) {
              p(S);
            }
          else
            l(i);
        }
      }
      var Hs = !1;
      function Js(i) {
        if (!Hs) {
          Hs = !0;
          var l = 0;
          try {
            for (; l < i.length; l++) {
              var p = i[l];
              do
                p = p(!0);
              while (p !== null);
            }
            i.length = 0;
          } catch (_) {
            throw i = i.slice(l + 1), _;
          } finally {
            Hs = !1;
          }
        }
      }
      var Zh = jc, ed = Yh, td = zh, nd = {
        map: wr,
        forEach: gh,
        count: ph,
        toArray: mh,
        only: _h
      };
      e.Children = nd, e.Component = V, e.Fragment = o, e.Profiler = a, e.PureComponent = X, e.StrictMode = c, e.Suspense = y, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, e.act = qc, e.cloneElement = ed, e.createContext = yh, e.createElement = Zh, e.createFactory = td, e.createRef = eh, e.forwardRef = wh, e.isValidElement = Wt, e.lazy = Sh, e.memo = kh, e.startTransition = Qh, e.unstable_act = qc, e.useCallback = Fh, e.useContext = Eh, e.useDebugValue = Ph, e.useDeferredValue = xh, e.useEffect = Ch, e.useId = jh, e.useImperativeHandle = Mh, e.useInsertionEffect = Th, e.useLayoutEffect = $h, e.useMemo = Ah, e.useReducer = Rh, e.useRef = Ih, e.useState = Oh, e.useSyncExternalStore = Lh, e.useTransition = Nh, e.version = n, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Un, Un.exports)), Un.exports;
}
process.env.NODE_ENV === "production" ? Nw() : xw();
function jw(t) {
  return new en(
    (e, n) => (t(e), n.receive(Pe.issue(null)))
  );
}
function Lw(t) {
  function e(n) {
    switch (typeof n) {
      case "function":
        return n(e);
      default:
        t(n);
    }
  }
  return e;
}
let Xf = class L {
  constructor(e) {
    f(this, "_apply");
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
    return new L((n) => {
      let r = this.apply(n);
      return e.apply(r);
    });
  }
  static Make(e) {
    return new L(e);
  }
  static Unit() {
    return new L(
      (e) => e
    );
  }
  static Pure(e) {
    return new L(
      (n) => e
    );
  }
  static Then(e) {
    return new L(
      (n) => new Zo(n, e)
    );
  }
  then(e) {
    return this.next(L.Then(e));
  }
  static Pair(e) {
    return new L(
      (n) => new en(
        (r, s) => {
          let [o, c] = r, a = it(n, o), u = it(e, c);
          return s.receive(a.zip(u));
        }
      )
    );
  }
  pair(e) {
    return this.next(L.Pair(e));
  }
  static Split(e) {
    return new L(
      (n) => new en(
        (r, s) => L.Pair(e).apply(n).defer([r, r], s)
      )
    );
  }
  split(e) {
    return this.next(L.Split(e));
  }
  static FlatMap(e) {
    return new L(
      (n) => new en(
        (r, s) => s.receive(it(n, r).flat_fold(
          (o) => it(e(o), r)
        ))
      )
    );
  }
  flat_map(e) {
    return this.next(L.FlatMap(e));
  }
  static First() {
    return new L((e) => {
      let n = L.Pure(new nn((s) => s));
      return L.Pair(n.apply(e)).apply(e);
    });
  }
  first() {
    return this.next(L.First());
  }
  static Second() {
    return new L((e) => {
      let n = L.Pure(new nn((s) => s));
      return L.Pair(e).apply(n.apply(e));
    });
  }
  second() {
    return this.next(L.Second());
  }
  static Pinch(e) {
    return new L(
      (n) => new en(
        (r, s) => s.receive(
          it(n, r).zip(it(e, r))
        )
      )
    );
  }
  pinch(e) {
    return this.next(L.Pinch(e));
  }
  static Joint(e) {
    return new L(
      (n) => L.Then(
        L.Pure(L.Split(e).apply(new Nr())).apply(new Nr())
      ).apply(n)
    );
  }
  joint(e) {
    return this.next(L.Joint(e));
  }
  static Bound(e) {
    return new L(
      (n) => {
        let r = new Nr(), s = L.Then(e), o = L.Joint(n).apply(r);
        return s.apply(o);
      }
    );
  }
  bound(e) {
    return this.next(L.Bound(e));
  }
  static Broach() {
    return new L(
      (e) => {
        let n = new nn((r) => r);
        return L.Bound(n).apply(e);
      }
    );
  }
  broach() {
    return this.next(L.Broach());
  }
  // public resolve(p:Pii){
  //   return resolve(this.apply(unit()),p);
  // }
  static Compose(e, n) {
    return n.next(e);
  }
  compose(e) {
    return L.Compose(this, e);
  }
};
function xk() {
  return new Nr();
}
function Jt() {
  return Xf;
}
function Et(t) {
  return new nn(t);
}
function jk(t) {
  return Et((e) => t);
}
function yr(t) {
  return new en(t);
}
function Qo(t, e) {
  return bd(t, e);
}
function Lk(t, e) {
  return it(t, e);
}
function Dk(t) {
  return new hd(t);
}
function vn(t, e) {
  return new Zo(t, e);
}
function Uk(t, e) {
  return Jt().Pair(e).apply(t);
}
function qk(t) {
  return Xf.FlatMap(t);
}
function Bk(t) {
  return Jt().First().apply(t);
}
function Vk(t) {
  return Jt().Second().apply(t);
}
function Kk(t, e) {
  return Jt().Pinch(e).apply(t);
}
function Hk(t, e) {
  return Jt().Joint(e).apply(t);
}
function Jk(t, e) {
  return Jt().Bound(e).apply(t);
}
function Wk(t) {
  return Jt().Broach().apply(t);
}
function Gk(t, e) {
  return t.next(e);
}
function zk(t) {
  return jw(Lw(t));
}
function Yk(t) {
  return (e) => {
    _e.Submit(t.defer(e, Pe.Unit()));
  };
}
function Zf(t, e) {
  return yr(
    (n, r) => {
      const s = new Kt();
      var o = !1;
      function c(h) {
        o || (o = !0, s.resolve(h));
      }
      const a = vn(t, Et(c)), u = vn(e, Et(c));
      return _e.fromPromise(Promise.any([Qo(a, n), Qo(u, n)]).then(
        (h) => s.promise.then(
          (b) => r.receive(
            Pe.issue(b)
          )
        )
      ));
    }
  );
}
function Qk(t, e, n) {
  return yr(
    (r, s) => (e && e(r), vn(t, Et(
      (o) => (n && n(o), o)
    )).defer(r, s))
  );
}
function Xk(t) {
  return new md(t);
}
function Zk(t) {
  return new _d(t);
}
function eE(t) {
  return Et(
    (e) => t(e) ? Xa(e) : Xo
  );
}
function Qa(t, e, n) {
  return Zf(
    yr(
      (r, s) => {
        const o = new Kt();
        return setTimeout(
          () => {
            o.resolve(Pt(n));
          },
          e
        ), s.receive(Pe.later(o.promise));
      }
    ),
    vn(t, Et(at))
  );
}
function tE(t) {
  return yr(
    (e, n) => _e.Seq(n.receive(Pe.issue(e)), t)
  );
}
function nE(t, e, n, r) {
  const s = Qa(t, n, r), o = Qa(e, n, r);
  return Zf(s, o);
}
function rE(t, e) {
  return vn(t, Et(e));
}
function sE(t, e) {
  return vn(Et(e), t);
}
function oE(t) {
  return (e) => Cw((n) => Qo(t, e));
}
function iE(t) {
  return yr(
    function e(n, r) {
      return it(t, n).flat_fold(
        (s) => vu({
          onLeft: (o) => _e.fromThunk(() => e(o, r)),
          //yay?
          onRight: (o) => r.receive(Pe.issue(o))
        })
      );
    }
  );
}
function cE(t) {
  return new ud(t);
}
function aE(t) {
  return new yd(t);
}
export {
  Mt as Allocator,
  yr as Anon,
  cn as Apply,
  Jt as Arrow,
  Jk as Bound,
  Wk as Broach,
  cE as Callback,
  Pw as Cont,
  oE as Effect,
  Dk as Event,
  Bk as First,
  qk as FlatMap,
  Lk as Forward,
  Et as Fun1R,
  Yk as Handler,
  Hk as Joint,
  Pe as Junction,
  iE as Loop,
  rE as Map,
  sE as Mapi,
  Gk as Next,
  Xk as Option,
  Zk as OptionM,
  eE as OptionP,
  Uk as Pair,
  Kk as Pinch,
  jk as Pure,
  Zf as Race,
  nE as RaceWithTimeout,
  zk as React,
  aE as Receiver,
  Qo as Resolve,
  Vk as Second,
  Qf as Settler,
  Qk as Stage,
  vn as Then,
  Qa as Timeout,
  xk as Unit,
  _e as Work,
  tE as Worker
};

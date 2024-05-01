var Xr = Object.defineProperty;
var Zr = (y, r, o) => r in y ? Xr(y, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : y[r] = o;
var J = (y, r, o) => (Zr(y, typeof r != "symbol" ? r + "" : r, o), o);
var en = function() {
  function y() {
    var r = this;
    this.resolve = function(o) {
      r._resolve(o);
    }, this.reject = function(o) {
      r._reject(o);
    }, this._promise = new Promise(function(o, l) {
      r._resolve = o, r._reject = l;
    });
  }
  return Object.defineProperty(y.prototype, "promise", {
    get: function() {
      return this._promise;
    },
    enumerable: !0,
    configurable: !0
  }), y;
}(), Re = en, tn = function(y) {
  return y._tag === "Left";
}, rn = function(y) {
  return { _tag: "Left", left: y };
}, nn = function(y) {
  return { _tag: "Right", right: y };
}, rt = rn, Ze = nn, an = tn, un = function(y, r) {
  return function(o) {
    return an(o) ? y(o.left) : r(o.right);
  };
}, et = un, Nt = et;
class $ {
  constructor(r) {
    J(this, "_after", null);
    this._after = r;
  }
  get after() {
    return this._after == null ? null : this._after();
  }
  static Seq(r, o) {
    return new $(() => {
      let l = r == null ? void 0 : r.after;
      return l != null ? new Promise((d) => l.then((h) => $.Seq(h, o)).then(d)) : o == null ? void 0 : o.after;
    });
  }
  seq(r) {
    return $.Par(this, r);
  }
  par(r) {
    return $.Par(this, r);
  }
  submit() {
    return $.Submit(this);
  }
  static Submit(r) {
    let o = new Re();
    return setTimeout(() => {
      if (r != null) {
        const l = r.after;
        l != null ? l.then((d) => {
          d != null ? $.Submit(d).then((h) => o.resolve(h), (h) => o.reject(h)) : o.resolve(null);
        }) : o.resolve(null);
      } else
        o.resolve(null);
    }), o.promise;
  }
  static Par(r, o) {
    let l = r.after ?? Promise.resolve($.Unit()), d = o.after ?? Promise.resolve($.Unit()), h = Promise.all([l, d]);
    return $.Pure(h.then(([S, M]) => S != null && M != null ? $.Par(S, M) : S ?? M));
  }
  static Unit() {
    return new $(null);
  }
  static Pure(r) {
    return new $(() => r);
  }
}
class ve {
  constructor(r) {
    J(this, "_apply");
    this._apply = r;
  }
  apply(r) {
    return this._apply(r);
  }
}
class on extends ve {
}
class Bt extends on {
}
class oe extends Bt {
  flat_fold(r, o) {
    return new oe((l) => this.apply(new ve((d) => {
      let S = d.then((F) => et(r, o)(F)).then((F) => F.apply(l));
      return new $(() => S);
    })));
  }
  handler(r, o) {
    return et((l) => r(l), (l) => {
      if (o)
        o(l);
      else
        throw o;
    });
  }
  zip(r) {
    return oe.Zip(this, r);
  }
  static Zip(r, o) {
    return new oe((l) => {
      var d = null, h = null;
      let S = r.apply(new ve((F) => (d = F, $.Unit())));
      var M = o.apply(new ve((F) => (h = F, $.Unit())));
      return S.par(M).seq(new $(() => {
        let F = d, z = h, K = F.then((L) => z.then((V) => ({ fst: L, snd: V }))).then((L) => Nt((V) => Nt((Z) => rt([V, Z]), (Z) => Ze(Z))(L.snd), (V) => Ze(V))(L.fst)), ne = l.apply(K);
        return new Promise((L) => L(ne));
      }));
    });
  }
}
class B extends Bt {
  receive(r) {
    return r.apply(new ve((o) => this.apply(new ve((l) => {
      let d = o.then((h) => {
        l.resolve(h);
      });
      return new $(() => d.then((h) => $.Unit()));
    }))));
  }
  static later(r) {
    return new oe((o) => o.apply(r));
  }
  static issue(r) {
    return new oe(function(o) {
      let l = new Promise((d) => {
        d(r);
      });
      return o.apply(l);
    });
  }
  static value(r) {
    return B.issue(rt(r));
  }
  static error(r) {
    return B.issue(Ze(r));
  }
  static Pure(r) {
    return new B((o) => o.apply(r));
  }
}
class ye {
  constructor(r) {
    J(this, "_apply");
    this._apply = r;
  }
  defer(r, o) {
    return o.receive(B.value(this._apply(r)));
  }
}
class Ee {
  constructor(r) {
    J(this, "_defer");
    this._defer = r;
  }
  defer(r, o) {
    return this._defer(r, o);
  }
}
function Q(y, r) {
  return new oe((o) => {
    let l = new Re(), d = y.defer(r, new B((S) => S.apply(l))), h = o.apply(l.promise);
    return $.Seq(d, h);
  });
}
function zt(y, r) {
  let o = new Re();
  return y.defer(r, B.Pure(o)).submit().then(() => o.promise.then((h) => h));
}
function sn() {
  return new ye((y) => null);
}
class cn {
  constructor(r) {
    J(this, "_emiter");
    this._emiter = r;
  }
  defer(r, o) {
    let l = new Re(), d = this, h = {
      handleEvent: function(S) {
        l.resolve(rt(S)), d._emiter.removeEventListener(r, h);
      }
    };
    return this._emiter.addEventListener(r, h), o.receive(B.later(l.promise));
  }
}
class ln {
  constructor(r, o) {
    J(this, "lhs");
    J(this, "rhs");
    this.lhs = r, this.rhs = o;
  }
  defer(r, o) {
    var l = Q(this.lhs, r);
    return o.receive(l.flat_fold((d) => Q(this.rhs, d), (d) => B.error(d)));
  }
}
class Xe extends ye {
  constructor() {
    super((r) => r);
  }
}
class g {
  constructor(r) {
    J(this, "_apply");
    this._apply = r;
  }
  apply(r) {
    return this._apply(r);
  }
  /**
   * You liked arrows so much, we put arrows in your arrows.
   * @param that You
   * @returns
   */
  next(r) {
    return new g((o) => {
      let l = this.apply(o);
      return r.apply(l);
    });
  }
  static Make(r) {
    return new g(r);
  }
  static Unit() {
    return new g((r) => r);
  }
  static Pure(r) {
    return new g((o) => r);
  }
  static Then(r) {
    return new g((o) => new ln(o, r));
  }
  then(r) {
    return this.next(g.Then(r));
  }
  static Pair(r) {
    return new g((o) => new Ee((l, d) => {
      let [h, S] = l, M = Q(o, h), F = Q(r, S);
      return d.receive(M.zip(F));
    }));
  }
  pair(r) {
    return this.next(g.Pair(r));
  }
  static Split(r) {
    return new g((o) => new Ee((l, d) => g.Pair(r).apply(o).defer([l, l], d)));
  }
  split(r) {
    return this.next(g.Split(r));
  }
  static FlatMap(r) {
    return new g((o) => new Ee((l, d) => d.receive(Q(o, l).flat_fold((h) => Q(r(h), l), (h) => B.error(h)))));
  }
  flat_map(r) {
    return this.next(g.FlatMap(r));
  }
  static First() {
    return new g((r) => {
      let o = g.Pure(new ye((d) => d));
      return g.Pair(o.apply(r)).apply(r);
    });
  }
  first() {
    return this.next(g.First());
  }
  static Second() {
    return new g((r) => {
      let o = g.Pure(new ye((d) => d));
      return g.Pair(r).apply(o.apply(r));
    });
  }
  second() {
    return this.next(g.Second());
  }
  static Pinch(r) {
    return new g((o) => new Ee((l, d) => d.receive(Q(o, l).zip(Q(r, l)))));
  }
  pinch(r) {
    return this.next(g.Pinch(r));
  }
  static Joint(r) {
    return new g((o) => g.Then(g.Pure(g.Split(r).apply(new Xe())).apply(new Xe())).apply(o));
  }
  joint(r) {
    return this.next(g.Joint(r));
  }
  static Bound(r) {
    return new g((o) => {
      let l = new Xe(), d = g.Then(r), h = g.Joint(o).apply(l);
      return d.apply(h);
    });
  }
  bound(r) {
    return this.next(g.Bound(r));
  }
  static Broach() {
    return new g((r) => {
      let o = new ye((l) => l);
      return g.Bound(o).apply(r);
    });
  }
  broach() {
    return this.next(g.Broach());
  }
  resolve(r) {
    return zt(this.apply(sn()), r);
  }
  static Compose(r, o) {
    return o.next(r);
  }
  compose(r) {
    return g.Compose(this, r);
  }
}
var tt = { exports: {} }, m = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function fn() {
  if (Vt)
    return m;
  Vt = 1;
  var y = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), S = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), X = Symbol.for("react.lazy"), K = Symbol.iterator;
  function ne(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var L = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, V = Object.assign, Z = {};
  function q(n, i, b) {
    this.props = n, this.context = i, this.refs = Z, this.updater = b || L;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(n, i) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, n, i, "setState");
  }, q.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function Se() {
  }
  Se.prototype = q.prototype;
  function ie(n, i, b) {
    this.props = n, this.context = i, this.refs = Z, this.updater = b || L;
  }
  var se = ie.prototype = new Se();
  se.constructor = ie, V(se, q.prototype), se.isPureReactComponent = !0;
  var G = Array.isArray, I = Object.prototype.hasOwnProperty, W = { current: null }, ee = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ae(n, i, b) {
    var E, w = {}, x = null, O = null;
    if (i != null)
      for (E in i.ref !== void 0 && (O = i.ref), i.key !== void 0 && (x = "" + i.key), i)
        I.call(i, E) && !ee.hasOwnProperty(E) && (w[E] = i[E]);
    var k = arguments.length - 2;
    if (k === 1)
      w.children = b;
    else if (1 < k) {
      for (var C = Array(k), U = 0; U < k; U++)
        C[U] = arguments[U + 2];
      w.children = C;
    }
    if (n && n.defaultProps)
      for (E in k = n.defaultProps, k)
        w[E] === void 0 && (w[E] = k[E]);
    return { $$typeof: y, type: n, key: x, ref: O, props: w, _owner: W.current };
  }
  function Ce(n, i) {
    return { $$typeof: y, type: n.type, key: i, ref: n.ref, props: n.props, _owner: n._owner };
  }
  function he(n) {
    return typeof n == "object" && n !== null && n.$$typeof === y;
  }
  function Ue(n) {
    var i = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(b) {
      return i[b];
    });
  }
  var Pe = /\/+/g;
  function me(n, i) {
    return typeof n == "object" && n !== null && n.key != null ? Ue("" + n.key) : i.toString(36);
  }
  function ce(n, i, b, E, w) {
    var x = typeof n;
    (x === "undefined" || x === "boolean") && (n = null);
    var O = !1;
    if (n === null)
      O = !0;
    else
      switch (x) {
        case "string":
        case "number":
          O = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case y:
            case r:
              O = !0;
          }
      }
    if (O)
      return O = n, w = w(O), n = E === "" ? "." + me(O, 0) : E, G(w) ? (b = "", n != null && (b = n.replace(Pe, "$&/") + "/"), ce(w, i, b, "", function(U) {
        return U;
      })) : w != null && (he(w) && (w = Ce(w, b + (!w.key || O && O.key === w.key ? "" : ("" + w.key).replace(Pe, "$&/") + "/") + n)), i.push(w)), 1;
    if (O = 0, E = E === "" ? "." : E + ":", G(n))
      for (var k = 0; k < n.length; k++) {
        x = n[k];
        var C = E + me(x, k);
        O += ce(x, i, b, C, w);
      }
    else if (C = ne(n), typeof C == "function")
      for (n = C.call(n), k = 0; !(x = n.next()).done; )
        x = x.value, C = E + me(x, k++), O += ce(x, i, b, C, w);
    else if (x === "object")
      throw i = String(n), Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
    return O;
  }
  function Y(n, i, b) {
    if (n == null)
      return n;
    var E = [], w = 0;
    return ce(n, E, "", "", function(x) {
      return i.call(b, x, w++);
    }), E;
  }
  function te(n) {
    if (n._status === -1) {
      var i = n._result;
      i = i(), i.then(function(b) {
        (n._status === 0 || n._status === -1) && (n._status = 1, n._result = b);
      }, function(b) {
        (n._status === 0 || n._status === -1) && (n._status = 2, n._result = b);
      }), n._status === -1 && (n._status = 0, n._result = i);
    }
    if (n._status === 1)
      return n._result.default;
    throw n._result;
  }
  var p = { current: null }, ue = { transition: null }, Te = { ReactCurrentDispatcher: p, ReactCurrentBatchConfig: ue, ReactCurrentOwner: W };
  function le() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return m.Children = { map: Y, forEach: function(n, i, b) {
    Y(n, function() {
      i.apply(this, arguments);
    }, b);
  }, count: function(n) {
    var i = 0;
    return Y(n, function() {
      i++;
    }), i;
  }, toArray: function(n) {
    return Y(n, function(i) {
      return i;
    }) || [];
  }, only: function(n) {
    if (!he(n))
      throw Error("React.Children.only expected to receive a single React element child.");
    return n;
  } }, m.Component = q, m.Fragment = o, m.Profiler = d, m.PureComponent = ie, m.StrictMode = l, m.Suspense = F, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Te, m.act = le, m.cloneElement = function(n, i, b) {
    if (n == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + n + ".");
    var E = V({}, n.props), w = n.key, x = n.ref, O = n._owner;
    if (i != null) {
      if (i.ref !== void 0 && (x = i.ref, O = W.current), i.key !== void 0 && (w = "" + i.key), n.type && n.type.defaultProps)
        var k = n.type.defaultProps;
      for (C in i)
        I.call(i, C) && !ee.hasOwnProperty(C) && (E[C] = i[C] === void 0 && k !== void 0 ? k[C] : i[C]);
    }
    var C = arguments.length - 2;
    if (C === 1)
      E.children = b;
    else if (1 < C) {
      k = Array(C);
      for (var U = 0; U < C; U++)
        k[U] = arguments[U + 2];
      E.children = k;
    }
    return { $$typeof: y, type: n.type, key: w, ref: x, props: E, _owner: O };
  }, m.createContext = function(n) {
    return n = { $$typeof: S, _currentValue: n, _currentValue2: n, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, n.Provider = { $$typeof: h, _context: n }, n.Consumer = n;
  }, m.createElement = ae, m.createFactory = function(n) {
    var i = ae.bind(null, n);
    return i.type = n, i;
  }, m.createRef = function() {
    return { current: null };
  }, m.forwardRef = function(n) {
    return { $$typeof: M, render: n };
  }, m.isValidElement = he, m.lazy = function(n) {
    return { $$typeof: X, _payload: { _status: -1, _result: n }, _init: te };
  }, m.memo = function(n, i) {
    return { $$typeof: z, type: n, compare: i === void 0 ? null : i };
  }, m.startTransition = function(n) {
    var i = ue.transition;
    ue.transition = {};
    try {
      n();
    } finally {
      ue.transition = i;
    }
  }, m.unstable_act = le, m.useCallback = function(n, i) {
    return p.current.useCallback(n, i);
  }, m.useContext = function(n) {
    return p.current.useContext(n);
  }, m.useDebugValue = function() {
  }, m.useDeferredValue = function(n) {
    return p.current.useDeferredValue(n);
  }, m.useEffect = function(n, i) {
    return p.current.useEffect(n, i);
  }, m.useId = function() {
    return p.current.useId();
  }, m.useImperativeHandle = function(n, i, b) {
    return p.current.useImperativeHandle(n, i, b);
  }, m.useInsertionEffect = function(n, i) {
    return p.current.useInsertionEffect(n, i);
  }, m.useLayoutEffect = function(n, i) {
    return p.current.useLayoutEffect(n, i);
  }, m.useMemo = function(n, i) {
    return p.current.useMemo(n, i);
  }, m.useReducer = function(n, i, b) {
    return p.current.useReducer(n, i, b);
  }, m.useRef = function(n) {
    return p.current.useRef(n);
  }, m.useState = function(n) {
    return p.current.useState(n);
  }, m.useSyncExternalStore = function(n, i, b) {
    return p.current.useSyncExternalStore(n, i, b);
  }, m.useTransition = function() {
    return p.current.useTransition();
  }, m.version = "18.3.1", m;
}
var we = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
we.exports;
var Wt;
function pn() {
  return Wt || (Wt = 1, function(y, r) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var o = "18.3.1", l = Symbol.for("react.element"), d = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), F = Symbol.for("react.provider"), z = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), Z = Symbol.for("react.offscreen"), q = Symbol.iterator, Se = "@@iterator";
      function ie(e) {
        if (e === null || typeof e != "object")
          return null;
        var t = q && e[q] || e[Se];
        return typeof t == "function" ? t : null;
      }
      var se = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, G = {
        transition: null
      }, I = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, W = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ee = {}, ae = null;
      function Ce(e) {
        ae = e;
      }
      ee.setExtraStackFrame = function(e) {
        ae = e;
      }, ee.getCurrentStack = null, ee.getStackAddendum = function() {
        var e = "";
        ae && (e += ae);
        var t = ee.getCurrentStack;
        return t && (e += t() || ""), e;
      };
      var he = !1, Ue = !1, Pe = !1, me = !1, ce = !1, Y = {
        ReactCurrentDispatcher: se,
        ReactCurrentBatchConfig: G,
        ReactCurrentOwner: W
      };
      Y.ReactDebugCurrentFrame = ee, Y.ReactCurrentActQueue = I;
      function te(e) {
        {
          for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), u = 1; u < t; u++)
            a[u - 1] = arguments[u];
          ue("warn", e, a);
        }
      }
      function p(e) {
        {
          for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), u = 1; u < t; u++)
            a[u - 1] = arguments[u];
          ue("error", e, a);
        }
      }
      function ue(e, t, a) {
        {
          var u = Y.ReactDebugCurrentFrame, s = u.getStackAddendum();
          s !== "" && (t += "%s", a = a.concat([s]));
          var f = a.map(function(c) {
            return String(c);
          });
          f.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, f);
        }
      }
      var Te = {};
      function le(e, t) {
        {
          var a = e.constructor, u = a && (a.displayName || a.name) || "ReactClass", s = u + "." + t;
          if (Te[s])
            return;
          p("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, u), Te[s] = !0;
        }
      }
      var n = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
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
        enqueueForceUpdate: function(e, t, a) {
          le(e, "forceUpdate");
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
        enqueueReplaceState: function(e, t, a, u) {
          le(e, "replaceState");
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
        enqueueSetState: function(e, t, a, u) {
          le(e, "setState");
        }
      }, i = Object.assign, b = {};
      Object.freeze(b);
      function E(e, t, a) {
        this.props = e, this.context = t, this.refs = b, this.updater = a || n;
      }
      E.prototype.isReactComponent = {}, E.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, t, "setState");
      }, E.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var w = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, x = function(e, t) {
          Object.defineProperty(E.prototype, e, {
            get: function() {
              te("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
            }
          });
        };
        for (var O in w)
          w.hasOwnProperty(O) && x(O, w[O]);
      }
      function k() {
      }
      k.prototype = E.prototype;
      function C(e, t, a) {
        this.props = e, this.context = t, this.refs = b, this.updater = a || n;
      }
      var U = C.prototype = new k();
      U.constructor = C, i(U, E.prototype), U.isPureReactComponent = !0;
      function qt() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Ht = Array.isArray;
      function Oe(e) {
        return Ht(e);
      }
      function Kt(e) {
        {
          var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return a;
        }
      }
      function Gt(e) {
        try {
          return nt(e), !1;
        } catch {
          return !0;
        }
      }
      function nt(e) {
        return "" + e;
      }
      function ke(e) {
        if (Gt(e))
          return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Kt(e)), nt(e);
      }
      function Jt(e, t, a) {
        var u = e.displayName;
        if (u)
          return u;
        var s = t.displayName || t.name || "";
        return s !== "" ? a + "(" + s + ")" : a;
      }
      function at(e) {
        return e.displayName || "Context";
      }
      function re(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case h:
            return "Fragment";
          case d:
            return "Portal";
          case M:
            return "Profiler";
          case S:
            return "StrictMode";
          case K:
            return "Suspense";
          case ne:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case z:
              var t = e;
              return at(t) + ".Consumer";
            case F:
              var a = e;
              return at(a._context) + ".Provider";
            case X:
              return Jt(e, e.render, "ForwardRef");
            case L:
              var u = e.displayName || null;
              return u !== null ? u : re(e.type) || "Memo";
            case V: {
              var s = e, f = s._payload, c = s._init;
              try {
                return re(c(f));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ge = Object.prototype.hasOwnProperty, ut = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, ot, it, Ne;
      Ne = {};
      function st(e) {
        if (ge.call(e, "ref")) {
          var t = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (t && t.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function ct(e) {
        if (ge.call(e, "key")) {
          var t = Object.getOwnPropertyDescriptor(e, "key").get;
          if (t && t.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Qt(e, t) {
        var a = function() {
          ot || (ot = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
      function Xt(e, t) {
        var a = function() {
          it || (it = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
      function Zt(e) {
        if (typeof e.ref == "string" && W.current && e.__self && W.current.stateNode !== e.__self) {
          var t = re(W.current.type);
          Ne[t] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', t, e.ref), Ne[t] = !0);
        }
      }
      var Ve = function(e, t, a, u, s, f, c) {
        var v = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: l,
          // Built-in properties that belong on the element
          type: e,
          key: t,
          ref: a,
          props: c,
          // Record the component responsible for creating this element.
          _owner: f
        };
        return v._store = {}, Object.defineProperty(v._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(v, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: u
        }), Object.defineProperty(v, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: s
        }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
      };
      function er(e, t, a) {
        var u, s = {}, f = null, c = null, v = null, _ = null;
        if (t != null) {
          st(t) && (c = t.ref, Zt(t)), ct(t) && (ke(t.key), f = "" + t.key), v = t.__self === void 0 ? null : t.__self, _ = t.__source === void 0 ? null : t.__source;
          for (u in t)
            ge.call(t, u) && !ut.hasOwnProperty(u) && (s[u] = t[u]);
        }
        var R = arguments.length - 2;
        if (R === 1)
          s.children = a;
        else if (R > 1) {
          for (var P = Array(R), T = 0; T < R; T++)
            P[T] = arguments[T + 2];
          Object.freeze && Object.freeze(P), s.children = P;
        }
        if (e && e.defaultProps) {
          var j = e.defaultProps;
          for (u in j)
            s[u] === void 0 && (s[u] = j[u]);
        }
        if (f || c) {
          var D = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && Qt(s, D), c && Xt(s, D);
        }
        return Ve(e, f, c, v, _, W.current, s);
      }
      function tr(e, t) {
        var a = Ve(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
        return a;
      }
      function rr(e, t, a) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var u, s = i({}, e.props), f = e.key, c = e.ref, v = e._self, _ = e._source, R = e._owner;
        if (t != null) {
          st(t) && (c = t.ref, R = W.current), ct(t) && (ke(t.key), f = "" + t.key);
          var P;
          e.type && e.type.defaultProps && (P = e.type.defaultProps);
          for (u in t)
            ge.call(t, u) && !ut.hasOwnProperty(u) && (t[u] === void 0 && P !== void 0 ? s[u] = P[u] : s[u] = t[u]);
        }
        var T = arguments.length - 2;
        if (T === 1)
          s.children = a;
        else if (T > 1) {
          for (var j = Array(T), D = 0; D < T; D++)
            j[D] = arguments[D + 2];
          s.children = j;
        }
        return Ve(e.type, f, c, v, _, R, s);
      }
      function fe(e) {
        return typeof e == "object" && e !== null && e.$$typeof === l;
      }
      var lt = ".", nr = ":";
      function ar(e) {
        var t = /[=:]/g, a = {
          "=": "=0",
          ":": "=2"
        }, u = e.replace(t, function(s) {
          return a[s];
        });
        return "$" + u;
      }
      var ft = !1, ur = /\/+/g;
      function pt(e) {
        return e.replace(ur, "$&/");
      }
      function We(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? (ke(e.key), ar("" + e.key)) : t.toString(36);
      }
      function je(e, t, a, u, s) {
        var f = typeof e;
        (f === "undefined" || f === "boolean") && (e = null);
        var c = !1;
        if (e === null)
          c = !0;
        else
          switch (f) {
            case "string":
            case "number":
              c = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case l:
                case d:
                  c = !0;
              }
          }
        if (c) {
          var v = e, _ = s(v), R = u === "" ? lt + We(v, 0) : u;
          if (Oe(_)) {
            var P = "";
            R != null && (P = pt(R) + "/"), je(_, t, P, "", function(Qr) {
              return Qr;
            });
          } else
            _ != null && (fe(_) && (_.key && (!v || v.key !== _.key) && ke(_.key), _ = tr(
              _,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              a + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (_.key && (!v || v.key !== _.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                pt("" + _.key) + "/"
              ) : "") + R
            )), t.push(_));
          return 1;
        }
        var T, j, D = 0, A = u === "" ? lt : u + nr;
        if (Oe(e))
          for (var Me = 0; Me < e.length; Me++)
            T = e[Me], j = A + We(T, Me), D += je(T, t, a, j, s);
        else {
          var Qe = ie(e);
          if (typeof Qe == "function") {
            var Lt = e;
            Qe === Lt.entries && (ft || te("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ft = !0);
            for (var Gr = Qe.call(Lt), Mt, Jr = 0; !(Mt = Gr.next()).done; )
              T = Mt.value, j = A + We(T, Jr++), D += je(T, t, a, j, s);
          } else if (f === "object") {
            var Ut = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (Ut === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Ut) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return D;
      }
      function xe(e, t, a) {
        if (e == null)
          return e;
        var u = [], s = 0;
        return je(e, u, "", "", function(f) {
          return t.call(a, f, s++);
        }), u;
      }
      function or(e) {
        var t = 0;
        return xe(e, function() {
          t++;
        }), t;
      }
      function ir(e, t, a) {
        xe(e, function() {
          t.apply(this, arguments);
        }, a);
      }
      function sr(e) {
        return xe(e, function(t) {
          return t;
        }) || [];
      }
      function cr(e) {
        if (!fe(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function lr(e) {
        var t = {
          $$typeof: z,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
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
        t.Provider = {
          $$typeof: F,
          _context: t
        };
        var a = !1, u = !1, s = !1;
        {
          var f = {
            $$typeof: z,
            _context: t
          };
          Object.defineProperties(f, {
            Provider: {
              get: function() {
                return u || (u = !0, p("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), t.Provider;
              },
              set: function(c) {
                t.Provider = c;
              }
            },
            _currentValue: {
              get: function() {
                return t._currentValue;
              },
              set: function(c) {
                t._currentValue = c;
              }
            },
            _currentValue2: {
              get: function() {
                return t._currentValue2;
              },
              set: function(c) {
                t._currentValue2 = c;
              }
            },
            _threadCount: {
              get: function() {
                return t._threadCount;
              },
              set: function(c) {
                t._threadCount = c;
              }
            },
            Consumer: {
              get: function() {
                return a || (a = !0, p("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), t.Consumer;
              }
            },
            displayName: {
              get: function() {
                return t.displayName;
              },
              set: function(c) {
                s || (te("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", c), s = !0);
              }
            }
          }), t.Consumer = f;
        }
        return t._currentRenderer = null, t._currentRenderer2 = null, t;
      }
      var be = -1, Ye = 0, dt = 1, fr = 2;
      function pr(e) {
        if (e._status === be) {
          var t = e._result, a = t();
          if (a.then(function(f) {
            if (e._status === Ye || e._status === be) {
              var c = e;
              c._status = dt, c._result = f;
            }
          }, function(f) {
            if (e._status === Ye || e._status === be) {
              var c = e;
              c._status = fr, c._result = f;
            }
          }), e._status === be) {
            var u = e;
            u._status = Ye, u._result = a;
          }
        }
        if (e._status === dt) {
          var s = e._result;
          return s === void 0 && p(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, s), "default" in s || p(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, s), s.default;
        } else
          throw e._result;
      }
      function dr(e) {
        var t = {
          // We use these fields to store the result.
          _status: be,
          _result: e
        }, a = {
          $$typeof: V,
          _payload: t,
          _init: pr
        };
        {
          var u, s;
          Object.defineProperties(a, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return u;
              },
              set: function(f) {
                p("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), u = f, Object.defineProperty(a, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return s;
              },
              set: function(f) {
                p("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), s = f, Object.defineProperty(a, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return a;
      }
      function vr(e) {
        e != null && e.$$typeof === L ? p("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? p("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && p("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && p("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var t = {
          $$typeof: X,
          render: e
        };
        {
          var a;
          Object.defineProperty(t, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(u) {
              a = u, !e.name && !e.displayName && (e.displayName = u);
            }
          });
        }
        return t;
      }
      var vt;
      vt = Symbol.for("react.module.reference");
      function yt(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === h || e === M || ce || e === S || e === K || e === ne || me || e === Z || he || Ue || Pe || typeof e == "object" && e !== null && (e.$$typeof === V || e.$$typeof === L || e.$$typeof === F || e.$$typeof === z || e.$$typeof === X || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === vt || e.getModuleId !== void 0));
      }
      function yr(e, t) {
        yt(e) || p("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var a = {
          $$typeof: L,
          type: e,
          compare: t === void 0 ? null : t
        };
        {
          var u;
          Object.defineProperty(a, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return u;
            },
            set: function(s) {
              u = s, !e.name && !e.displayName && (e.displayName = s);
            }
          });
        }
        return a;
      }
      function N() {
        var e = se.current;
        return e === null && p(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function hr(e) {
        var t = N();
        if (e._context !== void 0) {
          var a = e._context;
          a.Consumer === e ? p("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : a.Provider === e && p("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return t.useContext(e);
      }
      function mr(e) {
        var t = N();
        return t.useState(e);
      }
      function gr(e, t, a) {
        var u = N();
        return u.useReducer(e, t, a);
      }
      function br(e) {
        var t = N();
        return t.useRef(e);
      }
      function _r(e, t) {
        var a = N();
        return a.useEffect(e, t);
      }
      function Er(e, t) {
        var a = N();
        return a.useInsertionEffect(e, t);
      }
      function wr(e, t) {
        var a = N();
        return a.useLayoutEffect(e, t);
      }
      function Rr(e, t) {
        var a = N();
        return a.useCallback(e, t);
      }
      function Sr(e, t) {
        var a = N();
        return a.useMemo(e, t);
      }
      function Cr(e, t, a) {
        var u = N();
        return u.useImperativeHandle(e, t, a);
      }
      function Pr(e, t) {
        {
          var a = N();
          return a.useDebugValue(e, t);
        }
      }
      function Tr() {
        var e = N();
        return e.useTransition();
      }
      function Or(e) {
        var t = N();
        return t.useDeferredValue(e);
      }
      function kr() {
        var e = N();
        return e.useId();
      }
      function jr(e, t, a) {
        var u = N();
        return u.useSyncExternalStore(e, t, a);
      }
      var _e = 0, ht, mt, gt, bt, _t, Et, wt;
      function Rt() {
      }
      Rt.__reactDisabledLog = !0;
      function xr() {
        {
          if (_e === 0) {
            ht = console.log, mt = console.info, gt = console.warn, bt = console.error, _t = console.group, Et = console.groupCollapsed, wt = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: Rt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          _e++;
        }
      }
      function Dr() {
        {
          if (_e--, _e === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: i({}, e, {
                value: ht
              }),
              info: i({}, e, {
                value: mt
              }),
              warn: i({}, e, {
                value: gt
              }),
              error: i({}, e, {
                value: bt
              }),
              group: i({}, e, {
                value: _t
              }),
              groupCollapsed: i({}, e, {
                value: Et
              }),
              groupEnd: i({}, e, {
                value: wt
              })
            });
          }
          _e < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Be = Y.ReactCurrentDispatcher, ze;
      function De(e, t, a) {
        {
          if (ze === void 0)
            try {
              throw Error();
            } catch (s) {
              var u = s.stack.trim().match(/\n( *(at )?)/);
              ze = u && u[1] || "";
            }
          return `
` + ze + e;
        }
      }
      var qe = !1, $e;
      {
        var $r = typeof WeakMap == "function" ? WeakMap : Map;
        $e = new $r();
      }
      function St(e, t) {
        if (!e || qe)
          return "";
        {
          var a = $e.get(e);
          if (a !== void 0)
            return a;
        }
        var u;
        qe = !0;
        var s = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var f;
        f = Be.current, Be.current = null, xr();
        try {
          if (t) {
            var c = function() {
              throw Error();
            };
            if (Object.defineProperty(c.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(c, []);
              } catch (A) {
                u = A;
              }
              Reflect.construct(e, [], c);
            } else {
              try {
                c.call();
              } catch (A) {
                u = A;
              }
              e.call(c.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (A) {
              u = A;
            }
            e();
          }
        } catch (A) {
          if (A && u && typeof A.stack == "string") {
            for (var v = A.stack.split(`
`), _ = u.stack.split(`
`), R = v.length - 1, P = _.length - 1; R >= 1 && P >= 0 && v[R] !== _[P]; )
              P--;
            for (; R >= 1 && P >= 0; R--, P--)
              if (v[R] !== _[P]) {
                if (R !== 1 || P !== 1)
                  do
                    if (R--, P--, P < 0 || v[R] !== _[P]) {
                      var T = `
` + v[R].replace(" at new ", " at ");
                      return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && $e.set(e, T), T;
                    }
                  while (R >= 1 && P >= 0);
                break;
              }
          }
        } finally {
          qe = !1, Be.current = f, Dr(), Error.prepareStackTrace = s;
        }
        var j = e ? e.displayName || e.name : "", D = j ? De(j) : "";
        return typeof e == "function" && $e.set(e, D), D;
      }
      function Ir(e, t, a) {
        return St(e, !1);
      }
      function Fr(e) {
        var t = e.prototype;
        return !!(t && t.isReactComponent);
      }
      function Ie(e, t, a) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return St(e, Fr(e));
        if (typeof e == "string")
          return De(e);
        switch (e) {
          case K:
            return De("Suspense");
          case ne:
            return De("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case X:
              return Ir(e.render);
            case L:
              return Ie(e.type, t, a);
            case V: {
              var u = e, s = u._payload, f = u._init;
              try {
                return Ie(f(s), t, a);
              } catch {
              }
            }
          }
        return "";
      }
      var Ct = {}, Pt = Y.ReactDebugCurrentFrame;
      function Fe(e) {
        if (e) {
          var t = e._owner, a = Ie(e.type, e._source, t ? t.type : null);
          Pt.setExtraStackFrame(a);
        } else
          Pt.setExtraStackFrame(null);
      }
      function Ar(e, t, a, u, s) {
        {
          var f = Function.call.bind(ge);
          for (var c in e)
            if (f(e, c)) {
              var v = void 0;
              try {
                if (typeof e[c] != "function") {
                  var _ = Error((u || "React class") + ": " + a + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw _.name = "Invariant Violation", _;
                }
                v = e[c](t, c, u, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (R) {
                v = R;
              }
              v && !(v instanceof Error) && (Fe(s), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", a, c, typeof v), Fe(null)), v instanceof Error && !(v.message in Ct) && (Ct[v.message] = !0, Fe(s), p("Failed %s type: %s", a, v.message), Fe(null));
            }
        }
      }
      function pe(e) {
        if (e) {
          var t = e._owner, a = Ie(e.type, e._source, t ? t.type : null);
          Ce(a);
        } else
          Ce(null);
      }
      var He;
      He = !1;
      function Tt() {
        if (W.current) {
          var e = re(W.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function Lr(e) {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + t + ":" + a + ".";
        }
        return "";
      }
      function Mr(e) {
        return e != null ? Lr(e.__source) : "";
      }
      var Ot = {};
      function Ur(e) {
        var t = Tt();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
      function kt(e, t) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var a = Ur(t);
          if (!Ot[a]) {
            Ot[a] = !0;
            var u = "";
            e && e._owner && e._owner !== W.current && (u = " It was passed a child from " + re(e._owner.type) + "."), pe(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, u), pe(null);
          }
        }
      }
      function jt(e, t) {
        if (typeof e == "object") {
          if (Oe(e))
            for (var a = 0; a < e.length; a++) {
              var u = e[a];
              fe(u) && kt(u, t);
            }
          else if (fe(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var s = ie(e);
            if (typeof s == "function" && s !== e.entries)
              for (var f = s.call(e), c; !(c = f.next()).done; )
                fe(c.value) && kt(c.value, t);
          }
        }
      }
      function xt(e) {
        {
          var t = e.type;
          if (t == null || typeof t == "string")
            return;
          var a;
          if (typeof t == "function")
            a = t.propTypes;
          else if (typeof t == "object" && (t.$$typeof === X || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          t.$$typeof === L))
            a = t.propTypes;
          else
            return;
          if (a) {
            var u = re(t);
            Ar(a, e.props, "prop", u, e);
          } else if (t.PropTypes !== void 0 && !He) {
            He = !0;
            var s = re(t);
            p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
          }
          typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Nr(e) {
        {
          for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
            var u = t[a];
            if (u !== "children" && u !== "key") {
              pe(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), pe(null);
              break;
            }
          }
          e.ref !== null && (pe(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), pe(null));
        }
      }
      function Dt(e, t, a) {
        var u = yt(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var f = Mr(t);
          f ? s += f : s += Tt();
          var c;
          e === null ? c = "null" : Oe(e) ? c = "array" : e !== void 0 && e.$$typeof === l ? (c = "<" + (re(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : c = typeof e, p("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c, s);
        }
        var v = er.apply(this, arguments);
        if (v == null)
          return v;
        if (u)
          for (var _ = 2; _ < arguments.length; _++)
            jt(arguments[_], e);
        return e === h ? Nr(v) : xt(v), v;
      }
      var $t = !1;
      function Vr(e) {
        var t = Dt.bind(null, e);
        return t.type = e, $t || ($t = !0, te("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(t, "type", {
          enumerable: !1,
          get: function() {
            return te("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), t;
      }
      function Wr(e, t, a) {
        for (var u = rr.apply(this, arguments), s = 2; s < arguments.length; s++)
          jt(arguments[s], u.type);
        return xt(u), u;
      }
      function Yr(e, t) {
        var a = G.transition;
        G.transition = {};
        var u = G.transition;
        G.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (G.transition = a, a === null && u._updatedFibers) {
            var s = u._updatedFibers.size;
            s > 10 && te("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), u._updatedFibers.clear();
          }
        }
      }
      var It = !1, Ae = null;
      function Br(e) {
        if (Ae === null)
          try {
            var t = ("require" + Math.random()).slice(0, 7), a = y && y[t];
            Ae = a.call(y, "timers").setImmediate;
          } catch {
            Ae = function(s) {
              It === !1 && (It = !0, typeof MessageChannel > "u" && p("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var f = new MessageChannel();
              f.port1.onmessage = s, f.port2.postMessage(void 0);
            };
          }
        return Ae(e);
      }
      var de = 0, Ft = !1;
      function At(e) {
        {
          var t = de;
          de++, I.current === null && (I.current = []);
          var a = I.isBatchingLegacy, u;
          try {
            if (I.isBatchingLegacy = !0, u = e(), !a && I.didScheduleLegacyUpdate) {
              var s = I.current;
              s !== null && (I.didScheduleLegacyUpdate = !1, Je(s));
            }
          } catch (j) {
            throw Le(t), j;
          } finally {
            I.isBatchingLegacy = a;
          }
          if (u !== null && typeof u == "object" && typeof u.then == "function") {
            var f = u, c = !1, v = {
              then: function(j, D) {
                c = !0, f.then(function(A) {
                  Le(t), de === 0 ? Ke(A, j, D) : j(A);
                }, function(A) {
                  Le(t), D(A);
                });
              }
            };
            return !Ft && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              c || (Ft = !0, p("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), v;
          } else {
            var _ = u;
            if (Le(t), de === 0) {
              var R = I.current;
              R !== null && (Je(R), I.current = null);
              var P = {
                then: function(j, D) {
                  I.current === null ? (I.current = [], Ke(_, j, D)) : j(_);
                }
              };
              return P;
            } else {
              var T = {
                then: function(j, D) {
                  j(_);
                }
              };
              return T;
            }
          }
        }
      }
      function Le(e) {
        e !== de - 1 && p("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), de = e;
      }
      function Ke(e, t, a) {
        {
          var u = I.current;
          if (u !== null)
            try {
              Je(u), Br(function() {
                u.length === 0 ? (I.current = null, t(e)) : Ke(e, t, a);
              });
            } catch (s) {
              a(s);
            }
          else
            t(e);
        }
      }
      var Ge = !1;
      function Je(e) {
        if (!Ge) {
          Ge = !0;
          var t = 0;
          try {
            for (; t < e.length; t++) {
              var a = e[t];
              do
                a = a(!0);
              while (a !== null);
            }
            e.length = 0;
          } catch (u) {
            throw e = e.slice(t + 1), u;
          } finally {
            Ge = !1;
          }
        }
      }
      var zr = Dt, qr = Wr, Hr = Vr, Kr = {
        map: xe,
        forEach: ir,
        count: or,
        toArray: sr,
        only: cr
      };
      r.Children = Kr, r.Component = E, r.Fragment = h, r.Profiler = M, r.PureComponent = C, r.StrictMode = S, r.Suspense = K, r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y, r.act = At, r.cloneElement = qr, r.createContext = lr, r.createElement = zr, r.createFactory = Hr, r.createRef = qt, r.forwardRef = vr, r.isValidElement = fe, r.lazy = dr, r.memo = yr, r.startTransition = Yr, r.unstable_act = At, r.useCallback = Rr, r.useContext = hr, r.useDebugValue = Pr, r.useDeferredValue = Or, r.useEffect = _r, r.useId = kr, r.useImperativeHandle = Cr, r.useInsertionEffect = Er, r.useLayoutEffect = wr, r.useMemo = Sr, r.useReducer = gr, r.useRef = br, r.useState = mr, r.useSyncExternalStore = jr, r.useTransition = Tr, r.version = o, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(we, we.exports)), we.exports;
}
process.env.NODE_ENV === "production" ? tt.exports = fn() : tt.exports = pn();
var Yt = tt.exports;
function dn(y, r) {
  return async function(o) {
    const l = await H.Resolve(y, r);
    o(l);
  };
}
function yn(y, r) {
  const [o, l] = Yt.useReducer(y, r);
  function d(S) {
    if (typeof S == "function")
      return S(d);
    l(S);
  }
  const h = Yt.useCallback(d, [l]);
  return [o, h];
}
class H {
  static Terminal() {
    return new B((r) => r.apply(new Re()));
  }
  static Arrow() {
    return g;
  }
  static Fun1R(r) {
    return new ye(r);
  }
  static Pure(r) {
    return H.Fun1R((o) => r);
  }
  static Anon(r) {
    return new Ee(r);
  }
  static Resolve(r, o) {
    return zt(r, o);
  }
  static Forward(r, o) {
    return Q(r, o);
  }
  static Event(r) {
    return new cn(r);
  }
  static Then(r) {
    return H.Arrow().Then(r);
  }
  static Pair(r) {
    return H.Arrow().Pair(r);
  }
  static FlatMap(r) {
    return H.Arrow().FlatMap(r);
  }
  static First() {
    return H.Arrow().First();
  }
  static Second() {
    return H.Arrow().Second();
  }
  static Pinch(r) {
    return H.Arrow().Pinch(r);
  }
  static Joint(r) {
    return H.Arrow().Joint(r);
  }
  static Next(r, o) {
    return r.next(o);
  }
  static React(r, o) {
    return dn(r, o);
  }
}
export {
  H as Fletcher,
  yn as useReducerWithThunk
};

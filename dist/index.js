"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _value, _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
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
const isFunction$1 = (input) => typeof input === "function";
const dual = function(arity, body) {
  if (typeof arity === "function") {
    return function() {
      if (arity(arguments)) {
        return body.apply(this, arguments);
      }
      return (self) => body(self, ...arguments);
    };
  }
  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);
    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self) {
          return body(self, a);
        };
      };
    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self) {
          return body(self, a, b);
        };
      };
    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self) {
          return body(self, a, b, c);
        };
      };
    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self) {
          return body(self, a, b, c, d);
        };
      };
    default:
      return function() {
        if (arguments.length >= arity) {
          return body.apply(this, arguments);
        }
        const args = arguments;
        return function(self) {
          return body(self, ...args);
        };
      };
  }
};
const identity = (a) => a;
const constant = (value) => () => value;
const constTrue = /* @__PURE__ */ constant(true);
const constFalse = /* @__PURE__ */ constant(false);
const constUndefined = /* @__PURE__ */ constant(void 0);
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
const make$o = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
const mapInput$1 = /* @__PURE__ */ dual(2, (self, f) => make$o((x, y) => self(f(x), f(y))));
const array$1 = (item) => make$o((self, that) => {
  if (self.length !== that.length) {
    return false;
  }
  for (let i = 0; i < self.length; i++) {
    const isEq = item(self[i], that[i]);
    if (!isEq) {
      return false;
    }
  }
  return true;
});
let moduleVersion = "3.2.1";
const getCurrentVersion = () => moduleVersion;
const globalStoreId = /* @__PURE__ */ Symbol.for(`effect/GlobalValue/globalStoreId/${/* @__PURE__ */ getCurrentVersion()}`);
if (!(globalStoreId in globalThis)) {
  globalThis[globalStoreId] = /* @__PURE__ */ new Map();
}
const globalStore = globalThis[globalStoreId];
const globalValue = (id, compute) => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};
const isString = (input) => typeof input === "string";
const isNumber = (input) => typeof input === "number";
const isBigInt = (input) => typeof input === "bigint";
const isFunction = isFunction$1;
const isRecordOrArray = (input) => typeof input === "object" && input !== null;
const isObject = (input) => isRecordOrArray(input) || isFunction(input);
const hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);
const isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self["_tag"] === tag);
const isNullable = (input) => input === null || input === void 0;
const isPromiseLike = (input) => hasProperty(input, "then") && isFunction(input.then);
const getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;
let SingleShotGen$1 = class SingleShotGen {
  constructor(self) {
    __publicField(this, "self");
    __publicField(this, "called", false);
    this.self = self;
  }
  /**
   * @since 2.0.0
   */
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  /**
   * @since 2.0.0
   */
  return(a) {
    return {
      value: a,
      done: true
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
    return new SingleShotGen(this.self);
  }
};
const defaultIncHi = 335903614;
const defaultIncLo = 4150755663;
const MUL_HI = 1481765933 >>> 0;
const MUL_LO = 1284865837 >>> 0;
const BIT_53 = 9007199254740992;
const BIT_27 = 134217728;
class PCGRandom {
  constructor(seedHi, seedLo, incHi, incLo) {
    __publicField(this, "_state");
    if (isNullable(seedLo) && isNullable(seedHi)) {
      seedLo = Math.random() * 4294967295 >>> 0;
      seedHi = 0;
    } else if (isNullable(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNullable(incLo) && isNullable(incHi)) {
      incLo = this._state ? this._state[3] : defaultIncLo;
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNullable(incLo)) {
      incLo = incHi;
      incHi = 0;
    }
    this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
    this._next();
    add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
    this._next();
    return this;
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
  setState(state) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 2.0.0
   */
  integer(max) {
    if (!max) {
      return this._next();
    }
    max = max >>> 0;
    if ((max & max - 1) === 0) {
      return this._next() & max - 1;
    }
    let num = 0;
    const skew = (-max >>> 0) % max >>> 0;
    for (num = this._next(); num < skew; num = this._next()) {
    }
    return num % max;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 2.0.0
   */
  number() {
    const hi = (this._next() & 67108863) * 1;
    const lo = (this._next() & 134217727) * 1;
    return (hi * BIT_27 + lo) / BIT_53;
  }
  /** @internal */
  _next() {
    const oldHi = this._state[0] >>> 0;
    const oldLo = this._state[1] >>> 0;
    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let xsHi = oldHi >>> 18;
    let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = (-rot >>> 0 & 31) >>> 0;
    return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
  }
}
function mul64(out, aHi, aLo, bHi, bLo) {
  let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
  let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
  let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
  let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
  c0 = c0 << 16 >>> 0;
  lo = lo + c0 >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  c1 = c1 << 16 >>> 0;
  lo = lo + c1 >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  hi = hi + Math.imul(aLo, bHi) >>> 0;
  hi = hi + Math.imul(aHi, bLo) >>> 0;
  out[0] = hi;
  out[1] = lo;
}
function add64(out, aHi, aLo, bHi, bLo) {
  let hi = aHi + bHi >>> 0;
  const lo = aLo + bLo >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = hi + 1 | 0;
  }
  out[0] = hi;
  out[1] = lo;
}
const YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
class YieldWrap {
  constructor(value) {
    /**
     * @since 3.0.6
     */
    __privateAdd(this, _value, void 0);
    __privateSet(this, _value, value);
  }
  /**
   * @since 3.0.6
   */
  [YieldWrapTypeId]() {
    return __privateGet(this, _value);
  }
}
_value = new WeakMap();
const structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
  enabled: false,
  tester: void 0
}));
const randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
const pcgr = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/pcgr"), () => new PCGRandom());
const symbol$1 = /* @__PURE__ */ Symbol.for("effect/Hash");
const hash = (self) => {
  if (structuralRegionState.enabled === true) {
    return 0;
  }
  switch (typeof self) {
    case "number":
      return number$1(self);
    case "bigint":
      return string(self.toString(10));
    case "boolean":
      return string(String(self));
    case "symbol":
      return string(String(self));
    case "string":
      return string(self);
    case "undefined":
      return string("undefined");
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      }
      if (isHash(self)) {
        return self[symbol$1]();
      } else {
        return random(self);
      }
    }
    default:
      throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
};
const random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number$1(pcgr.integer(Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
const combine$5 = (b) => (self) => self * 53 ^ b;
const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
const isHash = (u) => hasProperty(u, symbol$1);
const number$1 = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(n);
};
const string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
const structureKeys = (o, keys2) => {
  let h = 12289;
  for (let i = 0; i < keys2.length; i++) {
    h ^= pipe(string(keys2[i]), combine$5(hash(o[keys2[i]])));
  }
  return optimize(h);
};
const structure = (o) => structureKeys(o, Object.keys(o));
const array = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = pipe(h, combine$5(hash(arr[i])));
  }
  return optimize(h);
};
const cached = function() {
  if (arguments.length === 1) {
    const self2 = arguments[0];
    return function(hash3) {
      Object.defineProperty(self2, symbol$1, {
        value() {
          return hash3;
        },
        enumerable: false
      });
      return hash3;
    };
  }
  const self = arguments[0];
  const hash2 = arguments[1];
  Object.defineProperty(self, symbol$1, {
    value() {
      return hash2;
    },
    enumerable: false
  });
  return hash2;
};
const symbol = /* @__PURE__ */ Symbol.for("effect/Equal");
function equals$1() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if (selfType === "object" || selfType === "function") {
    if (self !== null && that !== null) {
      if (isEqual(self) && isEqual(that)) {
        if (hash(self) === hash(that) && self[symbol](that)) {
          return true;
        } else {
          return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
        }
      }
    }
    if (structuralRegionState.enabled) {
      if (Array.isArray(self) && Array.isArray(that)) {
        return self.length === that.length && self.every((v, i) => compareBoth(v, that[i]));
      }
      if (Object.getPrototypeOf(self) === Object.prototype && Object.getPrototypeOf(self) === Object.prototype) {
        const keysSelf = Object.keys(self);
        const keysThat = Object.keys(that);
        if (keysSelf.length === keysThat.length) {
          for (const key of keysSelf) {
            if (!(key in that && compareBoth(self[key], that[key]))) {
              return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
            }
          }
          return true;
        }
      }
      return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
    }
  }
  return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
}
const isEqual = (u) => hasProperty(u, symbol);
const equivalence = () => equals$1;
const NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
const toJSON = (x) => {
  if (hasProperty(x, "toJSON") && isFunction(x["toJSON"]) && x["toJSON"].length === 0) {
    return x.toJSON();
  } else if (Array.isArray(x)) {
    return x.map(toJSON);
  }
  return x;
};
const format$1 = (x) => JSON.stringify(x, null, 2);
const toStringUnknown = (u, whitespace = 2) => {
  try {
    return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
  } catch (_) {
    return String(u);
  }
};
const stringifyCircular = (obj, whitespace) => {
  let cache = [];
  const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && value : value, whitespace);
  cache = void 0;
  return retVal;
};
const pipeArguments = (self, args) => {
  switch (args.length) {
    case 1:
      return args[0](self);
    case 2:
      return args[1](args[0](self));
    case 3:
      return args[2](args[1](args[0](self)));
    case 4:
      return args[3](args[2](args[1](args[0](self))));
    case 5:
      return args[4](args[3](args[2](args[1](args[0](self)))));
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
    case 8:
      return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
    case 9:
      return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args.length; i < len; i++) {
        ret = args[i](ret);
      }
      return ret;
    }
  }
};
const OP_ASYNC = "Async";
const OP_COMMIT = "Commit";
const OP_FAILURE = "Failure";
const OP_ON_FAILURE = "OnFailure";
const OP_ON_SUCCESS = "OnSuccess";
const OP_ON_SUCCESS_AND_FAILURE = "OnSuccessAndFailure";
const OP_SUCCESS = "Success";
const OP_SYNC = "Sync";
const OP_TAG = "Tag";
const OP_UPDATE_RUNTIME_FLAGS = "UpdateRuntimeFlags";
const OP_WHILE = "While";
const OP_WITH_RUNTIME = "WithRuntime";
const OP_YIELD = "Yield";
const OP_REVERT_FLAGS = "RevertFlags";
const EffectTypeId$2 = /* @__PURE__ */ Symbol.for("effect/Effect");
const StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
const SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
const ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
const effectVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _,
  _V: /* @__PURE__ */ getCurrentVersion()
};
const sinkVariance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
const channelVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
const EffectPrototype = {
  [EffectTypeId$2]: effectVariance,
  [StreamTypeId]: effectVariance,
  [SinkTypeId]: sinkVariance,
  [ChannelTypeId]: channelVariance,
  [symbol](that) {
    return this === that;
  },
  [symbol$1]() {
    return cached(this, random(this));
  },
  [Symbol.iterator]() {
    return new SingleShotGen$1(new YieldWrap(this));
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const StructuralPrototype = {
  [symbol$1]() {
    return cached(this, structure(this));
  },
  [symbol](that) {
    const selfKeys = Object.keys(this);
    const thatKeys = Object.keys(that);
    if (selfKeys.length !== thatKeys.length) {
      return false;
    }
    for (const key of selfKeys) {
      if (!(key in that && equals$1(this[key], that[key]))) {
        return false;
      }
    }
    return true;
  }
};
const CommitPrototype = {
  ...EffectPrototype,
  _op: OP_COMMIT
};
const StructuralCommitPrototype = {
  ...CommitPrototype,
  ...StructuralPrototype
};
const TypeId$9 = /* @__PURE__ */ Symbol.for("effect/Option");
const CommonProto$1 = {
  ...EffectPrototype,
  [TypeId$9]: {
    _A: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format$1(this.toJSON());
  }
};
const SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
  _tag: "Some",
  _op: "Some",
  [symbol](that) {
    return isOption(that) && isSome$1(that) && equals$1(this.value, that.value);
  },
  [symbol$1]() {
    return cached(this, combine$5(hash(this._tag))(hash(this.value)));
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag,
      value: toJSON(this.value)
    };
  }
});
const NoneHash = /* @__PURE__ */ hash("None");
const NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
  _tag: "None",
  _op: "None",
  [symbol](that) {
    return isOption(that) && isNone$2(that);
  },
  [symbol$1]() {
    return NoneHash;
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag
    };
  }
});
const isOption = (input) => hasProperty(input, TypeId$9);
const isNone$2 = (fa) => fa._tag === "None";
const isSome$1 = (fa) => fa._tag === "Some";
const none$7 = /* @__PURE__ */ Object.create(NoneProto);
const some$3 = (value) => {
  const a = Object.create(SomeProto);
  a.value = value;
  return a;
};
const TypeId$8 = /* @__PURE__ */ Symbol.for("effect/Either");
const CommonProto = {
  ...EffectPrototype,
  [TypeId$8]: {
    _R: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format$1(this.toJSON());
  }
};
const RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Right",
  _op: "Right",
  [symbol](that) {
    return isEither(that) && isRight$1(that) && equals$1(this.right, that.right);
  },
  [symbol$1]() {
    return combine$5(hash(this._tag))(hash(this.right));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      right: toJSON(this.right)
    };
  }
});
const LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Left",
  _op: "Left",
  [symbol](that) {
    return isEither(that) && isLeft$1(that) && equals$1(this.left, that.left);
  },
  [symbol$1]() {
    return combine$5(hash(this._tag))(hash(this.left));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      left: toJSON(this.left)
    };
  }
});
const isEither = (input) => hasProperty(input, TypeId$8);
const isLeft$1 = (ma) => ma._tag === "Left";
const isRight$1 = (ma) => ma._tag === "Right";
const left$3 = (left2) => {
  const a = Object.create(LeftProto);
  a.left = left2;
  return a;
};
const right$3 = (right2) => {
  const a = Object.create(RightProto);
  a.right = right2;
  return a;
};
const right$2 = right$3;
const left$2 = left$3;
const isLeft = isLeft$1;
const isRight = isRight$1;
const match$3 = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft(self) ? onLeft(self.left) : onRight(self.right));
const merge$1 = /* @__PURE__ */ match$3({
  onLeft: identity,
  onRight: identity
});
const isNonEmptyArray$1 = (self) => self.length > 0;
const make$n = (compare) => (self, that) => self === that ? 0 : compare(self, that);
const number = /* @__PURE__ */ make$n((self, that) => self < that ? -1 : 1);
const mapInput = /* @__PURE__ */ dual(2, (self, f) => make$n((b1, b2) => self(f(b1), f(b2))));
const greaterThan$1 = (O) => dual(2, (self, that) => O(self, that) === 1);
const none$6 = () => none$7;
const some$2 = some$3;
const isNone$1 = isNone$2;
const isSome = isSome$1;
const match$2 = /* @__PURE__ */ dual(2, (self, {
  onNone,
  onSome
}) => isNone$1(self) ? onNone() : onSome(self.value));
const getOrElse = /* @__PURE__ */ dual(2, (self, onNone) => isNone$1(self) ? onNone() : self.value);
const orElseSome = /* @__PURE__ */ dual(2, (self, onNone) => isNone$1(self) ? some$2(onNone()) : self);
const fromNullable = (nullableValue) => nullableValue == null ? none$6() : some$2(nullableValue);
const getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
const getOrThrowWith = /* @__PURE__ */ dual(2, (self, onNone) => {
  if (isSome(self)) {
    return self.value;
  }
  throw onNone();
});
const getOrThrow = /* @__PURE__ */ getOrThrowWith(() => new Error("getOrThrow called on a None"));
const map$4 = /* @__PURE__ */ dual(2, (self, f) => isNone$1(self) ? none$6() : some$2(f(self.value)));
const flatMap$3 = /* @__PURE__ */ dual(2, (self, f) => isNone$1(self) ? none$6() : f(self.value));
const containsWith = (isEquivalent) => dual(2, (self, a) => isNone$1(self) ? false : isEquivalent(self.value, a));
const _equivalence$3 = /* @__PURE__ */ equivalence();
const contains = /* @__PURE__ */ containsWith(_equivalence$3);
const make$m = (...elements) => elements;
const allocate = (n) => new Array(n);
const makeBy = (n, f) => {
  const max = Math.max(1, Math.floor(n));
  const out = new Array(max);
  for (let i = 0; i < max; i++) {
    out[i] = f(i);
  }
  return out;
};
const fromIterable$6 = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
const prepend$2 = /* @__PURE__ */ dual(2, (self, head2) => [head2, ...self]);
const append$1 = /* @__PURE__ */ dual(2, (self, last2) => [...self, last2]);
const appendAll$2 = /* @__PURE__ */ dual(2, (self, that) => fromIterable$6(self).concat(fromIterable$6(that)));
const isEmptyArray = (self) => self.length === 0;
const isEmptyReadonlyArray = isEmptyArray;
const isNonEmptyArray = isNonEmptyArray$1;
const isNonEmptyReadonlyArray = isNonEmptyArray$1;
const isOutOfBound = (i, as2) => i < 0 || i >= as2.length;
const clamp = (i, as2) => Math.floor(Math.min(Math.max(0, i), as2.length));
const get$7 = /* @__PURE__ */ dual(2, (self, index) => {
  const i = Math.floor(index);
  return isOutOfBound(i, self) ? none$6() : some$2(self[i]);
});
const unsafeGet$3 = /* @__PURE__ */ dual(2, (self, index) => {
  const i = Math.floor(index);
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
const head = /* @__PURE__ */ get$7(0);
const headNonEmpty$1 = /* @__PURE__ */ unsafeGet$3(0);
const last = (self) => isNonEmptyReadonlyArray(self) ? some$2(lastNonEmpty(self)) : none$6();
const lastNonEmpty = (self) => self[self.length - 1];
const tailNonEmpty$1 = (self) => self.slice(1);
const spanIndex = (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (!predicate(a, i)) {
      break;
    }
    i++;
  }
  return i;
};
const span = /* @__PURE__ */ dual(2, (self, predicate) => splitAt(self, spanIndex(self, predicate)));
const drop$1 = /* @__PURE__ */ dual(2, (self, n) => {
  const input = fromIterable$6(self);
  return input.slice(clamp(n, input), input.length);
});
const reverse$2 = (self) => Array.from(self).reverse();
const sort = /* @__PURE__ */ dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O);
  return out;
});
const zip$1 = /* @__PURE__ */ dual(2, (self, that) => zipWith(self, that, make$m));
const zipWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const as2 = fromIterable$6(self);
  const bs = fromIterable$6(that);
  if (isNonEmptyReadonlyArray(as2) && isNonEmptyReadonlyArray(bs)) {
    const out = [f(headNonEmpty$1(as2), headNonEmpty$1(bs))];
    const len = Math.min(as2.length, bs.length);
    for (let i = 1; i < len; i++) {
      out[i] = f(as2[i], bs[i]);
    }
    return out;
  }
  return [];
});
const _equivalence$2 = /* @__PURE__ */ equivalence();
const splitAt = /* @__PURE__ */ dual(2, (self, n) => {
  const input = Array.from(self);
  const _n2 = Math.floor(n);
  if (isNonEmptyReadonlyArray(input)) {
    if (_n2 >= 1) {
      return splitNonEmptyAt(input, _n2);
    }
    return [[], input];
  }
  return [input, []];
});
const splitNonEmptyAt = /* @__PURE__ */ dual(2, (self, n) => {
  const _n2 = Math.max(1, Math.floor(n));
  return _n2 >= self.length ? [copy$1(self), []] : [prepend$2(self.slice(1, _n2), headNonEmpty$1(self)), self.slice(_n2)];
});
const copy$1 = (self) => self.slice();
const unionWith = /* @__PURE__ */ dual(3, (self, that, isEquivalent) => {
  const a = fromIterable$6(self);
  const b = fromIterable$6(that);
  if (isNonEmptyReadonlyArray(a)) {
    if (isNonEmptyReadonlyArray(b)) {
      const dedupe2 = dedupeWith(isEquivalent);
      return dedupe2(appendAll$2(a, b));
    }
    return a;
  }
  return b;
});
const union$2 = /* @__PURE__ */ dual(2, (self, that) => unionWith(self, that, _equivalence$2));
const empty$j = () => [];
const of$2 = (a) => [a];
const map$3 = /* @__PURE__ */ dual(2, (self, f) => self.map(f));
const flatMap$2 = /* @__PURE__ */ dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    const inner = f(self[i], i);
    for (let j = 0; j < inner.length; j++) {
      out.push(inner[j]);
    }
  }
  return out;
});
const flatten$3 = /* @__PURE__ */ flatMap$2(identity);
const reduce$6 = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable$6(self).reduce((b2, a, i) => f(b2, a, i), b));
const unfold = (b, f) => {
  const out = [];
  let next = b;
  let o;
  while (isSome(o = f(next))) {
    const [a, b2] = o.value;
    out.push(a);
    next = b2;
  }
  return out;
};
const getEquivalence$2 = array$1;
const dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const input = fromIterable$6(self);
  if (isNonEmptyReadonlyArray(input)) {
    const out = [headNonEmpty$1(input)];
    const rest = tailNonEmpty$1(input);
    for (const r of rest) {
      if (out.every((a) => !isEquivalent(r, a))) {
        out.push(r);
      }
    }
    return out;
  }
  return [];
});
const dedupe = (self) => dedupeWith(self, equivalence());
const join$1 = /* @__PURE__ */ dual(2, (self, sep) => fromIterable$6(self).join(sep));
const TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
const STMSymbolKey = "effect/STM";
const STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
const TagProto = {
  ...EffectPrototype,
  _tag: "Tag",
  _op: "Tag",
  [STMTypeId]: effectVariance,
  [TagTypeId]: {
    _Service: (_) => _,
    _Identifier: (_) => _
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Tag",
      key: this.key,
      stack: this.stack
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  of(self) {
    return self;
  },
  context(self) {
    return make$l(this, self);
  }
};
const makeGenericTag = (key) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  const tag = Object.create(TagProto);
  Object.defineProperty(tag, "stack", {
    get() {
      return creationError.stack;
    }
  });
  tag.key = key;
  return tag;
};
const TypeId$7 = /* @__PURE__ */ Symbol.for("effect/Context");
const ContextProto = {
  [TypeId$7]: {
    _Services: (_) => _
  },
  [symbol](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals$1(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  },
  [symbol$1]() {
    return cached(this, number$1(this.unsafeMap.size));
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Context",
      services: Array.from(this.unsafeMap).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
const makeContext = (unsafeMap) => {
  const context = Object.create(ContextProto);
  context.unsafeMap = unsafeMap;
  return context;
};
const serviceNotFoundError = (tag) => {
  const error = new Error(`Service not found${tag.key ? `: ${String(tag.key)}` : ""}`);
  if (tag.stack) {
    const lines = tag.stack.split("\n");
    if (lines.length > 2) {
      const afterAt = lines[2].match(/at (.*)/);
      if (afterAt) {
        error.message = error.message + ` (defined at ${afterAt[1]})`;
      }
    }
  }
  if (error.stack) {
    const lines = error.stack.split("\n");
    lines.splice(1, 3);
    error.stack = lines.join("\n");
  }
  return error;
};
const isContext = (u) => hasProperty(u, TypeId$7);
const _empty$6 = /* @__PURE__ */ makeContext(/* @__PURE__ */ new Map());
const empty$i = () => _empty$6;
const make$l = (tag, service) => makeContext(/* @__PURE__ */ new Map([[tag.key, service]]));
const add$3 = /* @__PURE__ */ dual(3, (self, tag, service) => {
  const map2 = new Map(self.unsafeMap);
  map2.set(tag.key, service);
  return makeContext(map2);
});
const unsafeGet$2 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag.key)) {
    throw serviceNotFoundError(tag);
  }
  return self.unsafeMap.get(tag.key);
});
const get$6 = unsafeGet$2;
const getOption$1 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag.key)) {
    return none$7;
  }
  return some$3(self.unsafeMap.get(tag.key));
});
const GenericTag = makeGenericTag;
const empty$h = empty$i;
const add$2 = add$3;
const get$5 = get$6;
const unsafeGet$1 = unsafeGet$2;
const getOption = getOption$1;
const TypeId$6 = /* @__PURE__ */ Symbol.for("effect/Chunk");
function copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
const emptyArray = [];
const getEquivalence$1 = (isEquivalent) => make$o((self, that) => self.length === that.length && toReadonlyArray(self).every((value, i) => isEquivalent(value, unsafeGet(that, i))));
const _equivalence$1 = /* @__PURE__ */ getEquivalence$1(equals$1);
const ChunkProto = {
  [TypeId$6]: {
    _A: (_) => _
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Chunk",
      values: toReadonlyArray(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol](that) {
    return isChunk(that) && _equivalence$1(this, that);
  },
  [symbol$1]() {
    return cached(this, array(toReadonlyArray(this)));
  },
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]();
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]();
      }
      default: {
        return toReadonlyArray(this)[Symbol.iterator]();
      }
    }
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeChunk = (backing) => {
  const chunk = Object.create(ChunkProto);
  chunk.backing = backing;
  switch (backing._tag) {
    case "IEmpty": {
      chunk.length = 0;
      chunk.depth = 0;
      chunk.left = chunk;
      chunk.right = chunk;
      break;
    }
    case "IConcat": {
      chunk.length = backing.left.length + backing.right.length;
      chunk.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
      chunk.left = backing.left;
      chunk.right = backing.right;
      break;
    }
    case "IArray": {
      chunk.length = backing.array.length;
      chunk.depth = 0;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
    case "ISingleton": {
      chunk.length = 1;
      chunk.depth = 0;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
    case "ISlice": {
      chunk.length = backing.length;
      chunk.depth = backing.chunk.depth + 1;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
  }
  return chunk;
};
const isChunk = (u) => hasProperty(u, TypeId$6);
const _empty$5 = /* @__PURE__ */ makeChunk({
  _tag: "IEmpty"
});
const empty$g = () => _empty$5;
const make$k = (...as2) => as2.length === 1 ? of$1(as2[0]) : unsafeFromNonEmptyArray(as2);
const of$1 = (a) => makeChunk({
  _tag: "ISingleton",
  a
});
const fromIterable$5 = (self) => isChunk(self) ? self : makeChunk({
  _tag: "IArray",
  array: fromIterable$6(self)
});
const copyToArray = (self, array2, initial) => {
  switch (self.backing._tag) {
    case "IArray": {
      copy(self.backing.array, 0, array2, initial, self.length);
      break;
    }
    case "IConcat": {
      copyToArray(self.left, array2, initial);
      copyToArray(self.right, array2, initial + self.left.length);
      break;
    }
    case "ISingleton": {
      array2[initial] = self.backing.a;
      break;
    }
    case "ISlice": {
      let i = 0;
      let j = initial;
      while (i < self.length) {
        array2[j] = unsafeGet(self, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
const toReadonlyArray = (self) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray;
    }
    case "IArray": {
      return self.backing.array;
    }
    default: {
      const arr = new Array(self.length);
      copyToArray(self, arr, 0);
      self.backing = {
        _tag: "IArray",
        array: arr
      };
      self.left = _empty$5;
      self.right = _empty$5;
      self.depth = 0;
      return arr;
    }
  }
};
const reverse$1 = (self) => {
  switch (self.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self;
    case "IArray": {
      return makeChunk({
        _tag: "IArray",
        array: reverse$2(self.backing.array)
      });
    }
    case "IConcat": {
      return makeChunk({
        _tag: "IConcat",
        left: reverse$1(self.backing.right),
        right: reverse$1(self.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse$2(toReadonlyArray(self)));
  }
};
const unsafeFromArray = (self) => makeChunk({
  _tag: "IArray",
  array: self
});
const unsafeFromNonEmptyArray = (self) => unsafeFromArray(self);
const unsafeGet = /* @__PURE__ */ dual(2, (self, index) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`);
    }
    case "ISingleton": {
      if (index !== 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.a;
    }
    case "IArray": {
      if (index >= self.length || index < 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.array[index];
    }
    case "IConcat": {
      return index < self.left.length ? unsafeGet(self.left, index) : unsafeGet(self.right, index - self.left.length);
    }
    case "ISlice": {
      return unsafeGet(self.backing.chunk, index + self.backing.offset);
    }
  }
});
const append = /* @__PURE__ */ dual(2, (self, a) => appendAll$1(self, of$1(a)));
const prepend$1 = /* @__PURE__ */ dual(2, (self, elem) => appendAll$1(of$1(elem), self));
const drop = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _empty$5;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return makeChunk({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          offset: self.backing.offset + n,
          length: self.backing.length - n
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return drop(self.right, n - self.left.length);
        }
        return makeChunk({
          _tag: "IConcat",
          left: drop(self.left, n),
          right: self.right
        });
      }
      default: {
        return makeChunk({
          _tag: "ISlice",
          chunk: self,
          offset: n,
          length: self.length - n
        });
      }
    }
  }
});
const appendAll$1 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.backing._tag === "IEmpty") {
    return that;
  }
  if (that.backing._tag === "IEmpty") {
    return self;
  }
  const diff2 = that.depth - self.depth;
  if (Math.abs(diff2) <= 1) {
    return makeChunk({
      _tag: "IConcat",
      left: self,
      right: that
    });
  } else if (diff2 < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = appendAll$1(self.right, that);
      return makeChunk({
        _tag: "IConcat",
        left: self.left,
        right: nr
      });
    } else {
      const nrr = appendAll$1(self.right.right, that);
      if (nrr.depth === self.depth - 3) {
        const nr = makeChunk({
          _tag: "IConcat",
          left: self.right.left,
          right: nrr
        });
        return makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: nr
        });
      } else {
        const nl = makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: self.right.left
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: nrr
        });
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = appendAll$1(self, that.left);
      return makeChunk({
        _tag: "IConcat",
        left: nl,
        right: that.right
      });
    } else {
      const nll = appendAll$1(self, that.left.left);
      if (nll.depth === that.depth - 3) {
        const nl = makeChunk({
          _tag: "IConcat",
          left: nll,
          right: that.left.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nr = makeChunk({
          _tag: "IConcat",
          left: that.left.right,
          right: that.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nll,
          right: nr
        });
      }
    }
  }
});
const isEmpty$3 = (self) => self.length === 0;
const isNonEmpty = (self) => self.length > 0;
const unsafeHead = (self) => unsafeGet(self, 0);
const headNonEmpty = unsafeHead;
const tailNonEmpty = (self) => drop(self, 1);
const SIZE = 5;
const BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
const MASK = BUCKET_SIZE - 1;
const MAX_INDEX_NODE = BUCKET_SIZE / 2;
const MIN_ARRAY_NODE = BUCKET_SIZE / 4;
function popcount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function hashFragment(shift, h) {
  return h >>> shift & MASK;
}
function toBitmap(x) {
  return 1 << x;
}
function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
const make$j = (value, previous) => ({
  value,
  previous
});
function arrayUpdate(mutate2, at, v, arr) {
  let out = arr;
  if (!mutate2) {
    const len = arr.length;
    out = new Array(len);
    for (let i = 0; i < len; ++i)
      out[i] = arr[i];
  }
  out[at] = v;
  return out;
}
function arraySpliceOut(mutate2, at, arr) {
  const newLen = arr.length - 1;
  let i = 0;
  let g = 0;
  let out = arr;
  if (mutate2) {
    i = g = at;
  } else {
    out = new Array(newLen);
    while (i < at)
      out[g++] = arr[i++];
  }
  ++i;
  while (i <= newLen)
    out[g++] = arr[i++];
  if (mutate2) {
    out.length = newLen;
  }
  return out;
}
function arraySpliceIn(mutate2, at, v, arr) {
  const len = arr.length;
  if (mutate2) {
    let i2 = len;
    while (i2 >= at)
      arr[i2--] = arr[i2];
    arr[at] = v;
    return arr;
  }
  let i = 0, g = 0;
  const out = new Array(len + 1);
  while (i < at)
    out[g++] = arr[i++];
  out[at] = v;
  while (i < len)
    out[++g] = arr[i++];
  return out;
}
class EmptyNode {
  constructor() {
    __publicField(this, "_tag", "EmptyNode");
  }
  modify(edit, _shift, f, hash2, key, size2) {
    const v = f(none$6());
    if (isNone$1(v))
      return new EmptyNode();
    ++size2.value;
    return new LeafNode(edit, hash2, key, v);
  }
}
function isEmptyNode(a) {
  return isTagged(a, "EmptyNode");
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
class LeafNode {
  constructor(edit, hash2, key, value) {
    __publicField(this, "edit");
    __publicField(this, "hash");
    __publicField(this, "key");
    __publicField(this, "value");
    __publicField(this, "_tag", "LeafNode");
    this.edit = edit;
    this.hash = hash2;
    this.key = key;
    this.value = value;
  }
  modify(edit, shift, f, hash2, key, size2) {
    if (equals$1(key, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value)
        return this;
      else if (isNone$1(v2)) {
        --size2.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new LeafNode(edit, hash2, key, v2);
    }
    const v = f(none$6());
    if (isNone$1(v))
      return this;
    ++size2.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
}
class CollisionNode {
  constructor(edit, hash2, children) {
    __publicField(this, "edit");
    __publicField(this, "hash");
    __publicField(this, "children");
    __publicField(this, "_tag", "CollisionNode");
    this.edit = edit;
    this.hash = hash2;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size2) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size2);
      if (list === this.children)
        return this;
      return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0];
    }
    const v = f(none$6());
    if (isNone$1(v))
      return this;
    ++size2.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
  updateCollisionList(mutate2, edit, hash2, list, f, key, size2) {
    const len = list.length;
    for (let i = 0; i < len; ++i) {
      const child = list[i];
      if ("key" in child && equals$1(key, child.key)) {
        const value = child.value;
        const newValue2 = f(value);
        if (newValue2 === value)
          return list;
        if (isNone$1(newValue2)) {
          --size2.value;
          return arraySpliceOut(mutate2, i, list);
        }
        return arrayUpdate(mutate2, i, new LeafNode(edit, hash2, key, newValue2), list);
      }
    }
    const newValue = f(none$6());
    if (isNone$1(newValue))
      return list;
    ++size2.value;
    return arrayUpdate(mutate2, len, new LeafNode(edit, hash2, key, newValue), list);
  }
}
class IndexedNode {
  constructor(edit, mask, children) {
    __publicField(this, "edit");
    __publicField(this, "mask");
    __publicField(this, "children");
    __publicField(this, "_tag", "IndexedNode");
    this.edit = edit;
    this.mask = mask;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size2) {
    const mask = this.mask;
    const children = this.children;
    const frag = hashFragment(shift, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists) {
      const _newChild = new EmptyNode().modify(edit, shift + SIZE, f, hash2, key, size2);
      if (!_newChild)
        return this;
      return children.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children));
    }
    const current = children[indx];
    const child = current.modify(edit, shift + SIZE, f, hash2, key, size2);
    if (current === child)
      return this;
    let bitmap = mask;
    let newChildren;
    if (isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap)
        return new EmptyNode();
      if (children.length <= 2 && isLeafNode(children[indx ^ 1])) {
        return children[indx ^ 1];
      }
      newChildren = arraySpliceOut(canEdit, indx, children);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return new IndexedNode(edit, bitmap, newChildren);
  }
}
class ArrayNode {
  constructor(edit, size2, children) {
    __publicField(this, "edit");
    __publicField(this, "size");
    __publicField(this, "children");
    __publicField(this, "_tag", "ArrayNode");
    this.edit = edit;
    this.size = size2;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size2) {
    let count = this.size;
    const children = this.children;
    const frag = hashFragment(shift, hash2);
    const child = children[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift + SIZE, f, hash2, key, size2);
    if (child === newChild)
      return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ++count;
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      --count;
      if (count <= MIN_ARRAY_NODE) {
        return pack(edit, count, frag, children);
      }
      newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    }
    if (canEdit) {
      this.size = count;
      this.children = newChildren;
      return this;
    }
    return new ArrayNode(edit, count, newChildren);
  }
}
function pack(edit, count, removed, elements) {
  const children = new Array(count - 1);
  let g = 0;
  let bitmap = 0;
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];
      if (elem && !isEmptyNode(elem)) {
        children[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }
  return new IndexedNode(edit, bitmap, children);
}
function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count = 0;
  for (let i = 0; bit; ++i) {
    if (bit & 1)
      arr[i] = subNodes[count++];
    bit >>>= 1;
  }
  arr[frag] = child;
  return new ArrayNode(edit, count + 1, arr);
}
function mergeLeavesInner(edit, shift, h1, n1, h2, n2) {
  if (h1 === h2)
    return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = hashFragment(shift, h1);
  const subH2 = hashFragment(shift, h2);
  if (subH1 === subH2) {
    return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
  } else {
    const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children);
  }
}
function mergeLeaves(edit, shift, h1, n1, h2, n2) {
  let stack = void 0;
  let currentShift = shift;
  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
    if (typeof res === "function") {
      stack = make$j(res, stack);
      currentShift = currentShift + SIZE;
    } else {
      let final = res;
      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }
      return final;
    }
  }
}
const HashMapSymbolKey = "effect/HashMap";
const HashMapTypeId = /* @__PURE__ */ Symbol.for(HashMapSymbolKey);
const HashMapProto = {
  [HashMapTypeId]: HashMapTypeId,
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  },
  [symbol$1]() {
    let hash$1 = hash(HashMapSymbolKey);
    for (const item of this) {
      hash$1 ^= pipe(hash(item[0]), combine$5(hash(item[1])));
    }
    return cached(this, hash$1);
  },
  [symbol](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = pipe(that, getHash(item[0], hash(item[0])));
        if (isNone$1(elem)) {
          return false;
        } else {
          if (!equals$1(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeImpl$1 = (editable, edit, root, size2) => {
  const map2 = Object.create(HashMapProto);
  map2._editable = editable;
  map2._edit = edit;
  map2._root = root;
  map2._size = size2;
  return map2;
};
class HashMapIterator {
  constructor(map2, f) {
    __publicField(this, "map");
    __publicField(this, "f");
    __publicField(this, "v");
    this.map = map2;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone$1(this.v)) {
      return {
        done: true,
        value: void 0
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this.map, this.f);
  }
}
const applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none$6();
const visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome(node.value)) {
        return some$2({
          value: f(node.key, node.value.value),
          cont
        });
      }
      return applyCont(cont);
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children = node.children;
      return visitLazyChildren(children.length, children, 0, f, cont);
    }
    default: {
      return applyCont(cont);
    }
  }
};
const visitLazyChildren = (len, children, i, f, cont) => {
  while (i < len) {
    const child = children[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }
  return applyCont(cont);
};
const _empty$4 = /* @__PURE__ */ makeImpl$1(false, 0, /* @__PURE__ */ new EmptyNode(), 0);
const empty$f = () => _empty$4;
const fromIterable$4 = (entries) => {
  const map2 = beginMutation$1(empty$f());
  for (const entry of entries) {
    set$3(map2, entry[0], entry[1]);
  }
  return endMutation$1(map2);
};
const isHashMap = (u) => hasProperty(u, HashMapTypeId);
const isEmpty$2 = (self) => self && isEmptyNode(self._root);
const get$4 = /* @__PURE__ */ dual(2, (self, key) => getHash(self, key, hash(key)));
const getHash = /* @__PURE__ */ dual(3, (self, key, hash2) => {
  let node = self._root;
  let shift = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals$1(key, node.key) ? node.value : none$6();
      }
      case "CollisionNode": {
        if (hash2 === node.hash) {
          const children = node.children;
          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if ("key" in child && equals$1(key, child.key)) {
              return child.value;
            }
          }
        }
        return none$6();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift += SIZE;
          break;
        }
        return none$6();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift, hash2)];
        if (node) {
          shift += SIZE;
          break;
        }
        return none$6();
      }
      default:
        return none$6();
    }
  }
});
const has$3 = /* @__PURE__ */ dual(2, (self, key) => isSome(getHash(self, key, hash(key))));
const set$3 = /* @__PURE__ */ dual(3, (self, key, value) => modifyAt$1(self, key, () => some$2(value)));
const setTree = /* @__PURE__ */ dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : makeImpl$1(self._editable, self._edit, newRoot, newSize);
});
const keys$1 = (self) => new HashMapIterator(self, (key) => key);
const size$3 = (self) => self._size;
const beginMutation$1 = (self) => makeImpl$1(true, self._edit + 1, self._root, self._size);
const endMutation$1 = (self) => {
  self._editable = false;
  return self;
};
const modifyAt$1 = /* @__PURE__ */ dual(3, (self, key, f) => modifyHash(self, key, hash(key), f));
const modifyHash = /* @__PURE__ */ dual(4, (self, key, hash2, f) => {
  const size2 = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash2, key, size2);
  return pipe(self, setTree(newRoot, size2.value));
});
const remove$2 = /* @__PURE__ */ dual(2, (self, key) => modifyAt$1(self, key, none$6));
const map$2 = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, empty$f(), (map2, value, key) => set$3(map2, key, f(value, key))));
const forEach$1 = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, void 0, (_, value, key) => f(value, key)));
const reduce$5 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  const root = self._root;
  if (root._tag === "LeafNode") {
    return isSome(root.value) ? f(zero2, root.value.value, root.key) : zero2;
  }
  if (root._tag === "EmptyNode") {
    return zero2;
  }
  const toVisit = [root.children];
  let children;
  while (children = toVisit.pop()) {
    for (let i = 0, len = children.length; i < len; ) {
      const child = children[i++];
      if (child && !isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (isSome(child.value)) {
            zero2 = f(zero2, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero2;
});
const HashSetSymbolKey = "effect/HashSet";
const HashSetTypeId = /* @__PURE__ */ Symbol.for(HashSetSymbolKey);
const HashSetProto = {
  [HashSetTypeId]: HashSetTypeId,
  [Symbol.iterator]() {
    return keys$1(this._keyMap);
  },
  [symbol$1]() {
    return cached(this, combine$5(hash(this._keyMap))(hash(HashSetSymbolKey)));
  },
  [symbol](that) {
    if (isHashSet(that)) {
      return size$3(this._keyMap) === size$3(that._keyMap) && equals$1(this._keyMap, that._keyMap);
    }
    return false;
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashSet",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeImpl = (keyMap) => {
  const set2 = Object.create(HashSetProto);
  set2._keyMap = keyMap;
  return set2;
};
const isHashSet = (u) => hasProperty(u, HashSetTypeId);
const _empty$3 = /* @__PURE__ */ makeImpl(/* @__PURE__ */ empty$f());
const empty$e = () => _empty$3;
const fromIterable$3 = (elements) => {
  const set2 = beginMutation(empty$e());
  for (const value of elements) {
    add$1(set2, value);
  }
  return endMutation(set2);
};
const make$i = (...elements) => {
  const set2 = beginMutation(empty$e());
  for (const value of elements) {
    add$1(set2, value);
  }
  return endMutation(set2);
};
const has$2 = /* @__PURE__ */ dual(2, (self, value) => has$3(self._keyMap, value));
const size$2 = (self) => size$3(self._keyMap);
const beginMutation = (self) => makeImpl(beginMutation$1(self._keyMap));
const endMutation = (self) => {
  self._keyMap._editable = false;
  return self;
};
const mutate = /* @__PURE__ */ dual(2, (self, f) => {
  const transient = beginMutation(self);
  f(transient);
  return endMutation(transient);
});
const add$1 = /* @__PURE__ */ dual(2, (self, value) => self._keyMap._editable ? (set$3(value, true)(self._keyMap), self) : makeImpl(set$3(value, true)(self._keyMap)));
const remove$1 = /* @__PURE__ */ dual(2, (self, value) => self._keyMap._editable ? (remove$2(value)(self._keyMap), self) : makeImpl(remove$2(value)(self._keyMap)));
const difference$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(self, (set2) => {
  for (const value of that) {
    remove$1(set2, value);
  }
}));
const union$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(empty$e(), (set2) => {
  forEach(self, (value) => add$1(set2, value));
  for (const value of that) {
    add$1(set2, value);
  }
}));
const forEach = /* @__PURE__ */ dual(2, (self, f) => forEach$1(self._keyMap, (_, k) => f(k)));
const reduce$4 = /* @__PURE__ */ dual(3, (self, zero2, f) => reduce$5(self._keyMap, zero2, (z, _, a) => f(z, a)));
const empty$d = empty$e;
const fromIterable$2 = fromIterable$3;
const make$h = make$i;
const has$1 = has$2;
const size$1 = size$2;
const add = add$1;
const remove = remove$1;
const difference = difference$1;
const union = union$1;
const reduce$3 = reduce$4;
const TypeId$5 = /* @__PURE__ */ Symbol.for("effect/MutableRef");
const MutableRefProto = {
  [TypeId$5]: TypeId$5,
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableRef",
      current: toJSON(this.current)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$g = (value) => {
  const ref = Object.create(MutableRefProto);
  ref.current = value;
  return ref;
};
const get$3 = (self) => self.current;
const set$2 = /* @__PURE__ */ dual(2, (self, value) => {
  self.current = value;
  return self;
});
const FiberIdSymbolKey = "effect/FiberId";
const FiberIdTypeId = /* @__PURE__ */ Symbol.for(FiberIdSymbolKey);
const OP_NONE = "None";
const OP_RUNTIME = "Runtime";
const OP_COMPOSITE = "Composite";
const emptyHash = /* @__PURE__ */ string(`${FiberIdSymbolKey}-${OP_NONE}`);
let None$2 = class None {
  constructor() {
    __publicField(this, _a, FiberIdTypeId);
    __publicField(this, "_tag", OP_NONE);
    __publicField(this, "id", -1);
    __publicField(this, "startTimeMillis", -1);
  }
  [(_a = FiberIdTypeId, symbol$1)]() {
    return emptyHash;
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
  toString() {
    return format$1(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
class Runtime {
  constructor(id, startTimeMillis) {
    __publicField(this, "id");
    __publicField(this, "startTimeMillis");
    __publicField(this, _b, FiberIdTypeId);
    __publicField(this, "_tag", OP_RUNTIME);
    this.id = id;
    this.startTimeMillis = startTimeMillis;
  }
  [(_b = FiberIdTypeId, symbol$1)]() {
    return cached(this, string(`${FiberIdSymbolKey}-${this._tag}-${this.id}-${this.startTimeMillis}`));
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
  toString() {
    return format$1(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      id: this.id,
      startTimeMillis: this.startTimeMillis
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
}
const none$5 = /* @__PURE__ */ new None$2();
const isFiberId = (self) => hasProperty(self, FiberIdTypeId);
const ids = (self) => {
  switch (self._tag) {
    case OP_NONE: {
      return empty$d();
    }
    case OP_RUNTIME: {
      return make$h(self.id);
    }
    case OP_COMPOSITE: {
      return pipe(ids(self.left), union(ids(self.right)));
    }
  }
};
const _fiberCounter = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Fiber/Id/_fiberCounter"), () => make$g(0));
const threadName$1 = (self) => {
  const identifiers = Array.from(ids(self)).map((n) => `#${n}`).join(",");
  return identifiers;
};
const unsafeMake$5 = () => {
  const id = get$3(_fiberCounter);
  pipe(_fiberCounter, set$2(id + 1));
  return new Runtime(id, Date.now());
};
const none$4 = none$5;
const threadName = threadName$1;
const unsafeMake$4 = unsafeMake$5;
const empty$c = empty$f;
const fromIterable$1 = fromIterable$4;
const isEmpty$1 = isEmpty$2;
const get$2 = get$4;
const set$1 = set$3;
const keys = keys$1;
const size = size$3;
const modifyAt = modifyAt$1;
const map$1 = map$2;
const reduce$2 = reduce$5;
const TypeId$4 = /* @__PURE__ */ Symbol.for("effect/List");
const toArray = (self) => fromIterable$6(self);
const getEquivalence = (isEquivalent) => mapInput$1(getEquivalence$2(isEquivalent), toArray);
const _equivalence = /* @__PURE__ */ getEquivalence(equals$1);
const ConsProto = {
  [TypeId$4]: TypeId$4,
  _tag: "Cons",
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Cons",
      values: toArray(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol](that) {
    return isList(that) && this._tag === that._tag && _equivalence(this, that);
  },
  [symbol$1]() {
    return cached(this, array(toArray(this)));
  },
  [Symbol.iterator]() {
    let done2 = false;
    let self = this;
    return {
      next() {
        if (done2) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done2 = true;
          return this.return();
        }
        const value = self.head;
        self = self.tail;
        return {
          done: done2,
          value
        };
      },
      return(value) {
        if (!done2) {
          done2 = true;
        }
        return {
          done: true,
          value
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeCons = (head2, tail) => {
  const cons2 = Object.create(ConsProto);
  cons2.head = head2;
  cons2.tail = tail;
  return cons2;
};
const NilHash = /* @__PURE__ */ string("Nil");
const NilProto = {
  [TypeId$4]: TypeId$4,
  _tag: "Nil",
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Nil"
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol$1]() {
    return NilHash;
  },
  [symbol](that) {
    return isList(that) && this._tag === that._tag;
  },
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: void 0
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const _Nil = /* @__PURE__ */ Object.create(NilProto);
const isList = (u) => hasProperty(u, TypeId$4);
const isNil = (self) => self._tag === "Nil";
const isCons = (self) => self._tag === "Cons";
const nil = () => _Nil;
const cons = (head2, tail) => makeCons(head2, tail);
const empty$b = nil;
const of = (value) => makeCons(value, _Nil);
const appendAll = /* @__PURE__ */ dual(2, (self, that) => prependAll(that, self));
const prepend = /* @__PURE__ */ dual(2, (self, element) => cons(element, self));
const prependAll = /* @__PURE__ */ dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = makeCons(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = makeCons(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
const reduce$1 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  let acc = zero2;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
const reverse = (self) => {
  let result = empty$b();
  let these = self;
  while (!isNil(these)) {
    result = prepend(result, these.head);
    these = these.tail;
  }
  return result;
};
const Structural = /* @__PURE__ */ function() {
  function Structural2(args) {
    if (args) {
      Object.assign(this, args);
    }
  }
  Structural2.prototype = StructuralPrototype;
  return Structural2;
}();
const ContextPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferContextPatch");
function variance$3(a) {
  return a;
}
const PatchProto$2 = {
  ...Structural.prototype,
  [ContextPatchTypeId]: {
    _Value: variance$3,
    _Patch: variance$3
  }
};
const EmptyProto$2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "Empty"
});
const _empty$2 = /* @__PURE__ */ Object.create(EmptyProto$2);
const empty$a = () => _empty$2;
const AndThenProto$2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "AndThen"
});
const makeAndThen$2 = (first, second) => {
  const o = Object.create(AndThenProto$2);
  o.first = first;
  o.second = second;
  return o;
};
const AddServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "AddService"
});
const makeAddService = (key, service) => {
  const o = Object.create(AddServiceProto);
  o.key = key;
  o.service = service;
  return o;
};
const RemoveServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "RemoveService"
});
const makeRemoveService = (key) => {
  const o = Object.create(RemoveServiceProto);
  o.key = key;
  return o;
};
const UpdateServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "UpdateService"
});
const makeUpdateService = (key, update2) => {
  const o = Object.create(UpdateServiceProto);
  o.key = key;
  o.update = update2;
  return o;
};
const diff$6 = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch2 = empty$a();
  for (const [tag, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag)) {
      const old = missingServices.get(tag);
      missingServices.delete(tag);
      if (!equals$1(old, newService)) {
        patch2 = combine$4(makeUpdateService(tag, () => newService))(patch2);
      }
    } else {
      missingServices.delete(tag);
      patch2 = combine$4(makeAddService(tag, newService))(patch2);
    }
  }
  for (const [tag] of missingServices.entries()) {
    patch2 = combine$4(makeRemoveService(tag))(patch2);
  }
  return patch2;
};
const combine$4 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen$2(self, that));
const patch$7 = /* @__PURE__ */ dual(2, (self, context) => {
  if (self._tag === "Empty") {
    return context;
  }
  let wasServiceUpdated = false;
  let patches = of$1(self);
  const updatedContext = new Map(context.unsafeMap);
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AddService": {
        updatedContext.set(head2.key, head2.service);
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(prepend$1(tail, head2.second), head2.first);
        break;
      }
      case "RemoveService": {
        updatedContext.delete(head2.key);
        patches = tail;
        break;
      }
      case "UpdateService": {
        updatedContext.set(head2.key, head2.update(updatedContext.get(head2.key)));
        wasServiceUpdated = true;
        patches = tail;
        break;
      }
    }
  }
  if (!wasServiceUpdated) {
    return makeContext(updatedContext);
  }
  const map2 = /* @__PURE__ */ new Map();
  for (const [tag] of context.unsafeMap) {
    if (updatedContext.has(tag)) {
      map2.set(tag, updatedContext.get(tag));
      updatedContext.delete(tag);
    }
  }
  for (const [tag, s] of updatedContext) {
    map2.set(tag, s);
  }
  return makeContext(map2);
});
const HashSetPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferHashSetPatch");
function variance$2(a) {
  return a;
}
const PatchProto$1 = {
  ...Structural.prototype,
  [HashSetPatchTypeId]: {
    _Value: variance$2,
    _Key: variance$2,
    _Patch: variance$2
  }
};
const EmptyProto$1 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Empty"
});
const _empty$1 = /* @__PURE__ */ Object.create(EmptyProto$1);
const empty$9 = () => _empty$1;
const AndThenProto$1 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "AndThen"
});
const makeAndThen$1 = (first, second) => {
  const o = Object.create(AndThenProto$1);
  o.first = first;
  o.second = second;
  return o;
};
const AddProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Add"
});
const makeAdd = (value) => {
  const o = Object.create(AddProto);
  o.value = value;
  return o;
};
const RemoveProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Remove"
});
const makeRemove = (value) => {
  const o = Object.create(RemoveProto);
  o.value = value;
  return o;
};
const diff$5 = (oldValue, newValue) => {
  const [removed, patch2] = reduce$3([oldValue, empty$9()], ([set2, patch3], value) => {
    if (has$1(value)(set2)) {
      return [remove(value)(set2), patch3];
    }
    return [set2, combine$3(makeAdd(value))(patch3)];
  })(newValue);
  return reduce$3(patch2, (patch3, value) => combine$3(makeRemove(value))(patch3))(removed);
};
const combine$3 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen$1(self, that));
const patch$6 = /* @__PURE__ */ dual(2, (self, oldValue) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let set2 = oldValue;
  let patches = of$1(self);
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tail));
        break;
      }
      case "Add": {
        set2 = add(head2.value)(set2);
        patches = tail;
        break;
      }
      case "Remove": {
        set2 = remove(head2.value)(set2);
        patches = tail;
      }
    }
  }
  return set2;
});
const ReadonlyArrayPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferReadonlyArrayPatch");
function variance$1(a) {
  return a;
}
const PatchProto = {
  ...Structural.prototype,
  [ReadonlyArrayPatchTypeId]: {
    _Value: variance$1,
    _Patch: variance$1
  }
};
const EmptyProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Empty"
});
const _empty = /* @__PURE__ */ Object.create(EmptyProto);
const empty$8 = () => _empty;
const AndThenProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "AndThen"
});
const makeAndThen = (first, second) => {
  const o = Object.create(AndThenProto);
  o.first = first;
  o.second = second;
  return o;
};
const AppendProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Append"
});
const makeAppend = (values) => {
  const o = Object.create(AppendProto);
  o.values = values;
  return o;
};
const SliceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Slice"
});
const makeSlice = (from, until) => {
  const o = Object.create(SliceProto);
  o.from = from;
  o.until = until;
  return o;
};
const UpdateProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Update"
});
const makeUpdate = (index, patch2) => {
  const o = Object.create(UpdateProto);
  o.index = index;
  o.patch = patch2;
  return o;
};
const diff$4 = (options) => {
  let i = 0;
  let patch2 = empty$8();
  while (i < options.oldValue.length && i < options.newValue.length) {
    const oldElement = options.oldValue[i];
    const newElement = options.newValue[i];
    const valuePatch = options.differ.diff(oldElement, newElement);
    if (!equals$1(valuePatch, options.differ.empty)) {
      patch2 = combine$2(patch2, makeUpdate(i, valuePatch));
    }
    i = i + 1;
  }
  if (i < options.oldValue.length) {
    patch2 = combine$2(patch2, makeSlice(0, i));
  }
  if (i < options.newValue.length) {
    patch2 = combine$2(patch2, makeAppend(drop$1(i)(options.newValue)));
  }
  return patch2;
};
const combine$2 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen(self, that));
const patch$5 = /* @__PURE__ */ dual(3, (self, oldValue, differ2) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let readonlyArray2 = oldValue.slice();
  let patches = of$2(self);
  while (isNonEmptyArray(patches)) {
    const head2 = headNonEmpty$1(patches);
    const tail = tailNonEmpty$1(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        tail.unshift(head2.first, head2.second);
        patches = tail;
        break;
      }
      case "Append": {
        for (const value of head2.values) {
          readonlyArray2.push(value);
        }
        patches = tail;
        break;
      }
      case "Slice": {
        readonlyArray2 = readonlyArray2.slice(head2.from, head2.until);
        patches = tail;
        break;
      }
      case "Update": {
        readonlyArray2[head2.index] = differ2.patch(head2.patch, readonlyArray2[head2.index]);
        patches = tail;
        break;
      }
    }
  }
  return readonlyArray2;
});
const DifferTypeId = /* @__PURE__ */ Symbol.for("effect/Differ");
const DifferProto = {
  [DifferTypeId]: {
    _P: identity,
    _V: identity
  }
};
const make$f = (params) => {
  const differ2 = Object.create(DifferProto);
  differ2.empty = params.empty;
  differ2.diff = params.diff;
  differ2.combine = params.combine;
  differ2.patch = params.patch;
  return differ2;
};
const environment = () => make$f({
  empty: empty$a(),
  combine: (first, second) => combine$4(second)(first),
  diff: (oldValue, newValue) => diff$6(oldValue, newValue),
  patch: (patch2, oldValue) => patch$7(oldValue)(patch2)
});
const hashSet = () => make$f({
  empty: empty$9(),
  combine: (first, second) => combine$3(second)(first),
  diff: (oldValue, newValue) => diff$5(oldValue, newValue),
  patch: (patch2, oldValue) => patch$6(oldValue)(patch2)
});
const readonlyArray = (differ2) => make$f({
  empty: empty$8(),
  combine: (first, second) => combine$2(first, second),
  diff: (oldValue, newValue) => diff$4({
    oldValue,
    newValue,
    differ: differ2
  }),
  patch: (patch2, oldValue) => patch$5(patch2, oldValue, differ2)
});
const update$1 = () => updateWith((_, a) => a);
const updateWith = (f) => make$f({
  empty: identity,
  combine: (first, second) => {
    if (first === identity) {
      return second;
    }
    if (second === identity) {
      return first;
    }
    return (a) => second(first(a));
  },
  diff: (oldValue, newValue) => {
    if (equals$1(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch2, oldValue) => f(oldValue, patch2(oldValue))
});
const BIT_MASK = 255;
const BIT_SHIFT = 8;
const active = (patch2) => patch2 & BIT_MASK;
const enabled = (patch2) => patch2 >> BIT_SHIFT & BIT_MASK;
const make$e = (active2, enabled2) => (active2 & BIT_MASK) + ((enabled2 & active2 & BIT_MASK) << BIT_SHIFT);
const empty$7 = /* @__PURE__ */ make$e(0, 0);
const enable$2 = (flag) => make$e(flag, flag);
const disable$1 = (flag) => make$e(flag, 0);
const exclude$1 = /* @__PURE__ */ dual(2, (self, flag) => make$e(active(self) & ~flag, enabled(self)));
const andThen = /* @__PURE__ */ dual(2, (self, that) => self | that);
const invert = (n) => ~n >>> 0 & BIT_MASK;
const None$1 = 0;
const Interruption = 1 << 0;
const OpSupervision = 1 << 1;
const RuntimeMetrics = 1 << 2;
const WindDown = 1 << 4;
const CooperativeYielding = 1 << 5;
const cooperativeYielding = (self) => isEnabled(self, CooperativeYielding);
const enable$1 = /* @__PURE__ */ dual(2, (self, flag) => self | flag);
const interruptible$1 = (self) => interruption(self) && !windDown(self);
const interruption = (self) => isEnabled(self, Interruption);
const isEnabled = /* @__PURE__ */ dual(2, (self, flag) => (self & flag) !== 0);
const make$d = (...flags) => flags.reduce((a, b) => a | b, 0);
const none$3 = /* @__PURE__ */ make$d(None$1);
const runtimeMetrics = (self) => isEnabled(self, RuntimeMetrics);
const windDown = (self) => isEnabled(self, WindDown);
const diff$3 = /* @__PURE__ */ dual(2, (self, that) => make$e(self ^ that, that));
const patch$4 = /* @__PURE__ */ dual(2, (self, patch2) => self & (invert(active(patch2)) | enabled(patch2)) | active(patch2) & enabled(patch2));
const differ$1 = /* @__PURE__ */ make$f({
  empty: empty$7,
  diff: (oldValue, newValue) => diff$3(oldValue, newValue),
  combine: (first, second) => andThen(second)(first),
  patch: (_patch, oldValue) => patch$4(oldValue, _patch)
});
const enable = enable$2;
const disable = disable$1;
const exclude = exclude$1;
const par = (self, that) => ({
  _tag: "Par",
  left: self,
  right: that
});
const seq = (self, that) => ({
  _tag: "Seq",
  left: self,
  right: that
});
const flatten$2 = (self) => {
  let current = of(self);
  let updated = empty$b();
  while (1) {
    const [parallel2, sequential2] = reduce$1(current, [parallelCollectionEmpty(), empty$b()], ([parallel3, sequential3], blockedRequest) => {
      const [par2, seq2] = step$1(blockedRequest);
      return [parallelCollectionCombine(parallel3, par2), appendAll(sequential3, seq2)];
    });
    updated = merge(updated, parallel2);
    if (isNil(sequential2)) {
      return reverse(updated);
    }
    current = sequential2;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const step$1 = (requests) => {
  let current = requests;
  let parallel2 = parallelCollectionEmpty();
  let stack = empty$b();
  let sequential2 = empty$b();
  while (1) {
    switch (current._tag) {
      case "Empty": {
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
      case "Par": {
        stack = cons(current.right, stack);
        current = current.left;
        break;
      }
      case "Seq": {
        const left2 = current.left;
        const right2 = current.right;
        switch (left2._tag) {
          case "Empty": {
            current = right2;
            break;
          }
          case "Par": {
            const l = left2.left;
            const r = left2.right;
            current = par(seq(l, right2), seq(r, right2));
            break;
          }
          case "Seq": {
            const l = left2.left;
            const r = left2.right;
            current = seq(l, seq(r, right2));
            break;
          }
          case "Single": {
            current = left2;
            sequential2 = cons(right2, sequential2);
            break;
          }
        }
        break;
      }
      case "Single": {
        parallel2 = parallelCollectionAdd(parallel2, current);
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
    }
  }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const merge = (sequential2, parallel2) => {
  if (isNil(sequential2)) {
    return of(parallelCollectionToSequentialCollection(parallel2));
  }
  if (parallelCollectionIsEmpty(parallel2)) {
    return sequential2;
  }
  const seqHeadKeys = sequentialCollectionKeys(sequential2.head);
  const parKeys = parallelCollectionKeys(parallel2);
  if (seqHeadKeys.length === 1 && parKeys.length === 1 && equals$1(seqHeadKeys[0], parKeys[0])) {
    return cons(sequentialCollectionCombine(sequential2.head, parallelCollectionToSequentialCollection(parallel2)), sequential2.tail);
  }
  return cons(parallelCollectionToSequentialCollection(parallel2), sequential2);
};
const RequestBlockParallelTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockParallel");
const parallelVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
class ParallelImpl {
  constructor(map2) {
    __publicField(this, "map");
    __publicField(this, _c, parallelVariance);
    this.map = map2;
  }
}
_c = RequestBlockParallelTypeId;
const parallelCollectionEmpty = () => new ParallelImpl(empty$c());
const parallelCollectionAdd = (self, blockedRequest) => new ParallelImpl(modifyAt(self.map, blockedRequest.dataSource, (_) => orElseSome(map$4(_, append(blockedRequest.blockedRequest)), () => of$1(blockedRequest.blockedRequest))));
const parallelCollectionCombine = (self, that) => new ParallelImpl(reduce$2(self.map, that.map, (map2, value, key) => set$1(map2, key, match$2(get$2(map2, key), {
  onNone: () => value,
  onSome: (other) => appendAll$1(value, other)
}))));
const parallelCollectionIsEmpty = (self) => isEmpty$1(self.map);
const parallelCollectionKeys = (self) => Array.from(keys(self.map));
const parallelCollectionToSequentialCollection = (self) => sequentialCollectionMake(map$1(self.map, (x) => of$1(x)));
const SequentialCollectionTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockSequential");
const sequentialVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
class SequentialImpl {
  constructor(map2) {
    __publicField(this, "map");
    __publicField(this, _d, sequentialVariance);
    this.map = map2;
  }
}
_d = SequentialCollectionTypeId;
const sequentialCollectionMake = (map2) => new SequentialImpl(map2);
const sequentialCollectionCombine = (self, that) => new SequentialImpl(reduce$2(that.map, self.map, (map2, value, key) => set$1(map2, key, match$2(get$2(map2, key), {
  onNone: () => empty$g(),
  onSome: (a) => appendAll$1(a, value)
}))));
const sequentialCollectionKeys = (self) => Array.from(keys(self.map));
const sequentialCollectionToChunk = (self) => Array.from(self.map);
const OP_DIE = "Die";
const OP_EMPTY$2 = "Empty";
const OP_FAIL$1 = "Fail";
const OP_INTERRUPT = "Interrupt";
const OP_PARALLEL = "Parallel";
const OP_SEQUENTIAL$1 = "Sequential";
const CauseSymbolKey = "effect/Cause";
const CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
const variance = {
  /* c8 ignore next */
  _E: (_) => _
};
const proto$1 = {
  [CauseTypeId]: variance,
  [symbol$1]() {
    return pipe(hash(CauseSymbolKey), combine$5(hash(flattenCause(this))), cached(this));
  },
  [symbol](that) {
    return isCause(that) && causeEquals(this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
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
          defect: toJSON(this.defect)
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
          failure: toJSON(this.error)
        };
      case "Sequential":
      case "Parallel":
        return {
          _id: "Cause",
          _tag: this._tag,
          left: toJSON(this.left),
          right: toJSON(this.right)
        };
    }
  },
  toString() {
    return pretty(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
const empty$6 = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ Object.create(proto$1);
  o._tag = OP_EMPTY$2;
  return o;
})();
const fail$1 = (error) => {
  const o = Object.create(proto$1);
  o._tag = OP_FAIL$1;
  o.error = error;
  return o;
};
const die$1 = (defect) => {
  const o = Object.create(proto$1);
  o._tag = OP_DIE;
  o.defect = defect;
  return o;
};
const interrupt = (fiberId2) => {
  const o = Object.create(proto$1);
  o._tag = OP_INTERRUPT;
  o.fiberId = fiberId2;
  return o;
};
const parallel = (left2, right2) => {
  const o = Object.create(proto$1);
  o._tag = OP_PARALLEL;
  o.left = left2;
  o.right = right2;
  return o;
};
const sequential$1 = (left2, right2) => {
  const o = Object.create(proto$1);
  o._tag = OP_SEQUENTIAL$1;
  o.left = left2;
  o.right = right2;
  return o;
};
const isCause = (u) => hasProperty(u, CauseTypeId);
const isEmpty = (self) => {
  if (self._tag === OP_EMPTY$2) {
    return true;
  }
  return reduce(self, true, (acc, cause) => {
    switch (cause._tag) {
      case OP_EMPTY$2: {
        return some$2(acc);
      }
      case OP_DIE:
      case OP_FAIL$1:
      case OP_INTERRUPT: {
        return some$2(false);
      }
      default: {
        return none$6();
      }
    }
  });
};
const isInterrupted = (self) => isSome(interruptOption(self));
const isInterruptedOnly = (self) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self);
const failures = (self) => reverse$1(reduce(self, empty$g(), (list, cause) => cause._tag === OP_FAIL$1 ? some$2(pipe(list, prepend$1(cause.error))) : none$6()));
const defects = (self) => reverse$1(reduce(self, empty$g(), (list, cause) => cause._tag === OP_DIE ? some$2(pipe(list, prepend$1(cause.defect))) : none$6()));
const interruptors = (self) => reduce(self, empty$d(), (set2, cause) => cause._tag === OP_INTERRUPT ? some$2(pipe(set2, add(cause.fiberId))) : none$6());
const failureOption = (self) => find(self, (cause) => cause._tag === OP_FAIL$1 ? some$2(cause.error) : none$6());
const failureOrCause = (self) => {
  const option = failureOption(self);
  switch (option._tag) {
    case "None": {
      return right$2(self);
    }
    case "Some": {
      return left$2(option.value);
    }
  }
};
const interruptOption = (self) => find(self, (cause) => cause._tag === OP_INTERRUPT ? some$2(cause.fiberId) : none$6());
const stripFailures = (self) => match$1(self, {
  onEmpty: empty$6,
  onFail: () => empty$6,
  onDie: (defect) => die$1(defect),
  onInterrupt: (fiberId2) => interrupt(fiberId2),
  onSequential: sequential$1,
  onParallel: parallel
});
const electFailures = (self) => match$1(self, {
  onEmpty: empty$6,
  onFail: (failure) => die$1(failure),
  onDie: (defect) => die$1(defect),
  onInterrupt: (fiberId2) => interrupt(fiberId2),
  onSequential: (left2, right2) => sequential$1(left2, right2),
  onParallel: (left2, right2) => parallel(left2, right2)
});
const causeEquals = (left2, right2) => {
  let leftStack = of$1(left2);
  let rightStack = of$1(right2);
  while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = pipe(headNonEmpty(leftStack), reduce([empty$d(), empty$g()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some$2([pipe(parallel2, union(par2)), pipe(sequential2, appendAll$1(seq2))]);
    }));
    const [rightParallel, rightSequential] = pipe(headNonEmpty(rightStack), reduce([empty$d(), empty$g()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some$2([pipe(parallel2, union(par2)), pipe(sequential2, appendAll$1(seq2))]);
    }));
    if (!equals$1(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
const flattenCause = (cause) => {
  return flattenCauseLoop(of$1(cause), empty$g());
};
const flattenCauseLoop = (causes, flattened) => {
  while (1) {
    const [parallel2, sequential2] = pipe(causes, reduce$6([empty$d(), empty$g()], ([parallel3, sequential3], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return [pipe(parallel3, union(par2)), pipe(sequential3, appendAll$1(seq2))];
    }));
    const updated = size$1(parallel2) > 0 ? pipe(flattened, prepend$1(parallel2)) : flattened;
    if (isEmpty$3(sequential2)) {
      return reverse$1(updated);
    }
    causes = sequential2;
    flattened = updated;
  }
  throw new Error(getBugErrorMessage("Cause.flattenCauseLoop"));
};
const find = /* @__PURE__ */ dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option = pf(item);
    switch (option._tag) {
      case "None": {
        switch (item._tag) {
          case OP_SEQUENTIAL$1:
          case OP_PARALLEL: {
            stack.push(item.right);
            stack.push(item.left);
            break;
          }
        }
        break;
      }
      case "Some": {
        return option;
      }
    }
  }
  return none$6();
});
const evaluateCause = (self) => {
  let cause = self;
  const stack = [];
  let _parallel = empty$d();
  let _sequential = empty$g();
  while (cause !== void 0) {
    switch (cause._tag) {
      case OP_EMPTY$2: {
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_FAIL$1: {
        _parallel = add(_parallel, make$k(cause._tag, cause.error));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_DIE: {
        _parallel = add(_parallel, make$k(cause._tag, cause.defect));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        _parallel = add(_parallel, make$k(cause._tag, cause.fiberId));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_SEQUENTIAL$1: {
        switch (cause.left._tag) {
          case OP_EMPTY$2: {
            cause = cause.right;
            break;
          }
          case OP_SEQUENTIAL$1: {
            cause = sequential$1(cause.left.left, sequential$1(cause.left.right, cause.right));
            break;
          }
          case OP_PARALLEL: {
            cause = parallel(sequential$1(cause.left.left, cause.right), sequential$1(cause.left.right, cause.right));
            break;
          }
          default: {
            _sequential = prepend$1(_sequential, cause.right);
            cause = cause.left;
            break;
          }
        }
        break;
      }
      case OP_PARALLEL: {
        stack.push(cause.right);
        cause = cause.left;
        break;
      }
    }
  }
  throw new Error(getBugErrorMessage("Cause.evaluateCauseLoop"));
};
const IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  sequentialCase: (_, left2, right2) => left2 && right2,
  parallelCase: (_, left2, right2) => left2 && right2
};
const OP_SEQUENTIAL_CASE = "SequentialCase";
const OP_PARALLEL_CASE = "ParallelCase";
const match$1 = /* @__PURE__ */ dual(2, (self, {
  onDie,
  onEmpty,
  onFail,
  onInterrupt: onInterrupt2,
  onParallel,
  onSequential
}) => {
  return reduceWithContext(self, void 0, {
    emptyCase: () => onEmpty,
    failCase: (_, error) => onFail(error),
    dieCase: (_, defect) => onDie(defect),
    interruptCase: (_, fiberId2) => onInterrupt2(fiberId2),
    sequentialCase: (_, left2, right2) => onSequential(left2, right2),
    parallelCase: (_, left2, right2) => onParallel(left2, right2)
  });
});
const reduce = /* @__PURE__ */ dual(3, (self, zero2, pf) => {
  let accumulator = zero2;
  let cause = self;
  const causes = [];
  while (cause !== void 0) {
    const option = pf(accumulator, cause);
    accumulator = isSome(option) ? option.value : accumulator;
    switch (cause._tag) {
      case OP_SEQUENTIAL$1: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      case OP_PARALLEL: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      default: {
        cause = void 0;
        break;
      }
    }
    if (cause === void 0 && causes.length > 0) {
      cause = causes.pop();
    }
  }
  return accumulator;
});
const reduceWithContext = /* @__PURE__ */ dual(3, (self, context, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause = input.pop();
    switch (cause._tag) {
      case OP_EMPTY$2: {
        output.push(right$2(reducer.emptyCase(context)));
        break;
      }
      case OP_FAIL$1: {
        output.push(right$2(reducer.failCase(context, cause.error)));
        break;
      }
      case OP_DIE: {
        output.push(right$2(reducer.dieCase(context, cause.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right$2(reducer.interruptCase(context, cause.fiberId)));
        break;
      }
      case OP_SEQUENTIAL$1: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left$2({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left$2({
          _tag: OP_PARALLEL_CASE
        }));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either2 = output.pop();
    switch (either2._tag) {
      case "Left": {
        switch (either2.left._tag) {
          case OP_SEQUENTIAL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value = reducer.sequentialCase(context, left2, right2);
            accumulator.push(value);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value = reducer.parallelCase(context, left2, right2);
            accumulator.push(value);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either2.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
  }
  return accumulator.pop();
});
const pretty = (cause) => {
  if (isInterruptedOnly(cause)) {
    return "All fibers interrupted without errors.";
  }
  return prettyErrors(cause).map((e) => e.stack).join("\n");
};
class PrettyError extends globalThis.Error {
  constructor(originalError) {
    const prevLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    super(prettyErrorMessage(originalError));
    __publicField(this, "span");
    Error.stackTraceLimit = prevLimit;
    this.name = originalError instanceof Error ? originalError.name : "Error";
    if (typeof originalError === "object" && originalError !== null) {
      if (spanSymbol$1 in originalError) {
        this.span = originalError[spanSymbol$1];
      }
      Object.keys(originalError).forEach((key) => {
        if (!(key in this)) {
          this[key] = originalError[key];
        }
      });
    }
    this.stack = prettyErrorStack(this.message, originalError instanceof Error && originalError.stack ? originalError.stack : "", this.span);
  }
  toJSON() {
    const out = {
      message: this.message,
      stack: this.stack
    };
    if (this.span) {
      out.span = this.span;
    }
    return out;
  }
}
const prettyErrorMessage = (u) => {
  if (typeof u === "string") {
    return `Error: ${u}`;
  }
  try {
    if (hasProperty(u, "toString") && isFunction(u["toString"]) && u["toString"] !== Object.prototype.toString && u["toString"] !== globalThis.Array.prototype.toString) {
      return u["toString"]();
    }
  } catch {
  }
  return `Error: ${JSON.stringify(u)}`;
};
const locationRegex = /\((.*)\)/;
const prettyErrorStack = (message, stack, span2) => {
  const out = [message];
  const lines = stack.split("\n");
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes("effect_cutpoint") || lines[i].includes("Generator.next")) {
      break;
    }
    out.push(lines[i].replace(/at .*effect_instruction_i.*\((.*)\)/, "at $1").replace(/EffectPrimitive\.\w+/, "<anonymous>"));
    if (lines[i].includes("effect_instruction_i")) {
      break;
    }
  }
  if (span2) {
    let current = span2;
    let i = 0;
    while (current && current._tag === "Span" && i < 10) {
      const stack2 = current.attributes.get("code.stacktrace");
      if (typeof stack2 === "string") {
        const locationMatch = stack2.match(locationRegex);
        const location = locationMatch ? locationMatch[1] : stack2.replace(/^at /, "");
        out.push(`    at ${current.name} (${location})`);
      } else {
        out.push(`    at ${current.name}`);
      }
      current = getOrUndefined(current.parent);
      i++;
    }
  }
  return out.join("\n");
};
const spanSymbol$1 = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
const prettyErrors = (cause) => reduceWithContext(cause, void 0, {
  emptyCase: () => [],
  dieCase: (_, unknownError) => {
    return [new PrettyError(unknownError)];
  },
  failCase: (_, error) => {
    return [new PrettyError(error)];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r]
});
const OP_STATE_PENDING = "Pending";
const OP_STATE_DONE = "Done";
const DeferredSymbolKey = "effect/Deferred";
const DeferredTypeId = /* @__PURE__ */ Symbol.for(DeferredSymbolKey);
const deferredVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const pending = (joiners) => {
  return {
    _tag: OP_STATE_PENDING,
    joiners
  };
};
const done$2 = (effect) => {
  return {
    _tag: OP_STATE_DONE,
    effect
  };
};
class SingleShotGen2 {
  constructor(self) {
    __publicField(this, "self");
    __publicField(this, "called", false);
    this.self = self;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(this.self);
  }
}
const TracerTypeId = /* @__PURE__ */ Symbol.for("effect/Tracer");
const make$c = (options) => ({
  [TracerTypeId]: TracerTypeId,
  ...options
});
const tracerTag = /* @__PURE__ */ GenericTag("effect/Tracer");
const spanTag = /* @__PURE__ */ GenericTag("effect/ParentSpan");
const randomHexString = /* @__PURE__ */ function() {
  const characters = "abcdef0123456789";
  const charactersLength = characters.length;
  return function(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
}();
class NativeSpan {
  constructor(name, parent, context, links, startTime, kind) {
    __publicField(this, "name");
    __publicField(this, "parent");
    __publicField(this, "context");
    __publicField(this, "links");
    __publicField(this, "startTime");
    __publicField(this, "kind");
    __publicField(this, "_tag", "Span");
    __publicField(this, "spanId");
    __publicField(this, "traceId", "native");
    __publicField(this, "sampled", true);
    __publicField(this, "status");
    __publicField(this, "attributes");
    __publicField(this, "events", []);
    this.name = name;
    this.parent = parent;
    this.context = context;
    this.links = links;
    this.startTime = startTime;
    this.kind = kind;
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = /* @__PURE__ */ new Map();
    this.traceId = parent._tag === "Some" ? parent.value.traceId : randomHexString(32);
    this.spanId = randomHexString(16);
  }
  end(endTime, exit2) {
    this.status = {
      _tag: "Ended",
      endTime,
      exit: exit2,
      startTime: this.status.startTime
    };
  }
  attribute(key, value) {
    this.attributes.set(key, value);
  }
  event(name, startTime, attributes) {
    this.events.push([name, startTime, attributes ?? {}]);
  }
}
const nativeTracer = /* @__PURE__ */ make$c({
  span: (name, parent, context, links, startTime, kind) => new NativeSpan(name, parent, context, links, startTime, kind),
  context: (f) => f()
});
const EffectErrorSymbolKey = "effect/EffectError";
const EffectErrorTypeId = /* @__PURE__ */ Symbol.for(EffectErrorSymbolKey);
const isEffectError = (u) => hasProperty(u, EffectErrorTypeId);
const blocked = (blockedRequests, _continue) => {
  const effect = new EffectPrimitive("Blocked");
  effect.effect_instruction_i0 = blockedRequests;
  effect.effect_instruction_i1 = _continue;
  return effect;
};
const runRequestBlock = (blockedRequests) => {
  const effect = new EffectPrimitive("RunBlocked");
  effect.effect_instruction_i0 = blockedRequests;
  return effect;
};
const EffectTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Effect");
class RevertFlags {
  constructor(patch2, op) {
    __publicField(this, "patch");
    __publicField(this, "op");
    __publicField(this, "_op", OP_REVERT_FLAGS);
    this.patch = patch2;
    this.op = op;
  }
}
class EffectPrimitive {
  constructor(_op) {
    __publicField(this, "_op");
    __publicField(this, "effect_instruction_i0");
    __publicField(this, "effect_instruction_i1");
    __publicField(this, "effect_instruction_i2");
    __publicField(this, "trace");
    __publicField(this, _e, effectVariance);
    this._op = _op;
  }
  [(_e = EffectTypeId$1, symbol)](that) {
    return this === that;
  }
  [symbol$1]() {
    return cached(this, random(this));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Effect",
      _op: this._op,
      effect_instruction_i0: toJSON(this.effect_instruction_i0),
      effect_instruction_i1: toJSON(this.effect_instruction_i1),
      effect_instruction_i2: toJSON(this.effect_instruction_i2)
    };
  }
  toString() {
    return format$1(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
class EffectPrimitiveFailure {
  constructor(_op) {
    __publicField(this, "_op");
    __publicField(this, "effect_instruction_i0");
    __publicField(this, "effect_instruction_i1");
    __publicField(this, "effect_instruction_i2");
    __publicField(this, "trace");
    __publicField(this, _f, effectVariance);
    this._op = _op;
    this._tag = _op;
  }
  [(_f = EffectTypeId$1, symbol)](that) {
    return exitIsExit(that) && that._op === "Failure" && // @ts-expect-error
    equals$1(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol$1]() {
    return pipe(
      // @ts-expect-error
      string(this._tag),
      // @ts-expect-error
      combine$5(hash(this.effect_instruction_i0)),
      cached(this)
    );
  }
  get cause() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      cause: this.cause.toJSON()
    };
  }
  toString() {
    return format$1(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
class EffectPrimitiveSuccess {
  constructor(_op) {
    __publicField(this, "_op");
    __publicField(this, "effect_instruction_i0");
    __publicField(this, "effect_instruction_i1");
    __publicField(this, "effect_instruction_i2");
    __publicField(this, "trace");
    __publicField(this, _g, effectVariance);
    this._op = _op;
    this._tag = _op;
  }
  [(_g = EffectTypeId$1, symbol)](that) {
    return exitIsExit(that) && that._op === "Success" && // @ts-expect-error
    equals$1(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol$1]() {
    return pipe(
      // @ts-expect-error
      string(this._tag),
      // @ts-expect-error
      combine$5(hash(this.effect_instruction_i0)),
      cached(this)
    );
  }
  get value() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      value: toJSON(this.value)
    };
  }
  toString() {
    return format$1(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
const isEffect = (u) => hasProperty(u, EffectTypeId$1);
const withFiberRuntime = (withRuntime) => {
  const effect = new EffectPrimitive(OP_WITH_RUNTIME);
  effect.effect_instruction_i0 = withRuntime;
  return effect;
};
const acquireUseRelease = /* @__PURE__ */ dual(3, (acquire, use, release) => uninterruptibleMask((restore) => flatMap$1(acquire, (a) => flatMap$1(exit(suspend(() => restore(use(a)))), (exit2) => {
  return suspend(() => release(a, exit2)).pipe(matchCauseEffect({
    onFailure: (cause) => {
      switch (exit2._tag) {
        case OP_FAILURE:
          return failCause(parallel(exit2.effect_instruction_i0, cause));
        case OP_SUCCESS:
          return failCause(cause);
      }
    },
    onSuccess: () => exit2
  }));
}))));
const as = /* @__PURE__ */ dual(2, (self, value) => flatMap$1(self, () => succeed(value)));
const asVoid = (self) => as(self, void 0);
function commitCallCutpoint() {
  return this.effect_cutpoint();
}
const custom = function() {
  const wrapper = new EffectPrimitive(OP_COMMIT);
  wrapper.commit = commitCallCutpoint;
  switch (arguments.length) {
    case 2: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.effect_cutpoint = arguments[1];
      break;
    }
    case 3: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.effect_instruction_i1 = arguments[1];
      wrapper.effect_cutpoint = arguments[2];
      break;
    }
    case 4: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.effect_instruction_i1 = arguments[1];
      wrapper.effect_instruction_i2 = arguments[2];
      wrapper.effect_cutpoint = arguments[3];
      break;
    }
    default: {
      throw new Error(getBugErrorMessage("you're not supposed to end up here"));
    }
  }
  return wrapper;
};
const async$1 = (register, blockingOn = none$4) => {
  return custom(register, function() {
    let backingResume = void 0;
    let pendingEffect = void 0;
    function proxyResume(effect2) {
      if (backingResume) {
        backingResume(effect2);
      } else if (pendingEffect === void 0) {
        pendingEffect = effect2;
      }
    }
    const effect = new EffectPrimitive(OP_ASYNC);
    effect.effect_instruction_i0 = (resume2) => {
      backingResume = resume2;
      if (pendingEffect) {
        resume2(pendingEffect);
      }
    };
    effect.effect_instruction_i1 = blockingOn;
    let cancelerRef = void 0;
    let controllerRef = void 0;
    if (this.effect_instruction_i0.length !== 1) {
      controllerRef = new AbortController();
      cancelerRef = this.effect_instruction_i0(proxyResume, controllerRef.signal);
    } else {
      cancelerRef = this.effect_instruction_i0(proxyResume);
    }
    return cancelerRef || controllerRef ? onInterrupt(effect, (_) => {
      if (controllerRef) {
        controllerRef.abort();
      }
      return cancelerRef ?? void_;
    }) : effect;
  });
};
const catchAll = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: f,
  onSuccess: succeed
}));
const spanSymbol = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
const originalSymbol = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation");
const capture = (obj, span2) => {
  if (isSome(span2)) {
    return new Proxy(obj, {
      has(target, p) {
        return p === spanSymbol || p === originalSymbol || p in target;
      },
      get(target, p) {
        if (p === spanSymbol) {
          return span2.value;
        }
        if (p === originalSymbol) {
          return obj;
        }
        return target[p];
      }
    });
  }
  return obj;
};
const die = (defect) => isObject(defect) && !(spanSymbol in defect) ? withFiberRuntime((fiber) => failCause(die$1(capture(defect, currentSpanFromFiber(fiber))))) : failCause(die$1(defect));
const dieMessage = (message) => failCauseSync(() => die$1(new RuntimeException(message)));
const dieSync = (evaluate) => flatMap$1(sync(evaluate), die);
const either = (self) => matchEffect(self, {
  onFailure: (e) => succeed(left$2(e)),
  onSuccess: (a) => succeed(right$2(a))
});
const exit = (self) => matchCause(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
const fail = (error) => isObject(error) && !(spanSymbol in error) ? withFiberRuntime((fiber) => failCause(fail$1(capture(error, currentSpanFromFiber(fiber))))) : failCause(fail$1(error));
const failSync = (evaluate) => flatMap$1(sync(evaluate), fail);
const failCause = (cause) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.effect_instruction_i0 = cause;
  return effect;
};
const failCauseSync = (evaluate) => flatMap$1(sync(evaluate), failCause);
const fiberId = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.id()));
const fiberIdWith = (f) => withFiberRuntime((state) => f(state.id()));
const flatMap$1 = /* @__PURE__ */ dual(2, (self, f) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS);
  effect.effect_instruction_i0 = self;
  effect.effect_instruction_i1 = f;
  return effect;
});
const step = (self) => {
  const effect = new EffectPrimitive("OnStep");
  effect.effect_instruction_i0 = self;
  return effect;
};
const flatten$1 = (self) => flatMap$1(self, identity);
const matchCause = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect(self, {
  onFailure: (cause) => succeed(options.onFailure(cause)),
  onSuccess: (a) => succeed(options.onSuccess(a))
}));
const matchCauseEffect = /* @__PURE__ */ dual(2, (self, options) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS_AND_FAILURE);
  effect.effect_instruction_i0 = self;
  effect.effect_instruction_i1 = options.onFailure;
  effect.effect_instruction_i2 = options.onSuccess;
  return effect;
});
const matchEffect = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect(self, {
  onFailure: (cause) => {
    const defects$1 = defects(cause);
    if (defects$1.length > 0) {
      return failCause(electFailures(cause));
    }
    const failures$1 = failures(cause);
    if (failures$1.length > 0) {
      return options.onFailure(unsafeHead(failures$1));
    }
    return failCause(cause);
  },
  onSuccess: options.onSuccess
}));
const forEachSequential = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable$6(self);
  const ret = allocate(arr.length);
  let i = 0;
  return as(whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: (b) => {
      ret[i++] = b;
    }
  }), ret);
}));
const forEachSequentialDiscard = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable$6(self);
  let i = 0;
  return whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: () => {
      i++;
    }
  });
}));
const interruptible = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.effect_instruction_i0 = enable(Interruption);
  effect.effect_instruction_i1 = () => self;
  return effect;
};
const map = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(self, (a) => sync(() => f(a))));
const mapBoth = /* @__PURE__ */ dual(2, (self, options) => matchEffect(self, {
  onFailure: (e) => failSync(() => options.onFailure(e)),
  onSuccess: (a) => sync(() => options.onSuccess(a))
}));
const mapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause) => {
    const either2 = failureOrCause(cause);
    switch (either2._tag) {
      case "Left": {
        return failSync(() => f(either2.left));
      }
      case "Right": {
        return failCause(either2.right);
      }
    }
  },
  onSuccess: succeed
}));
const onExit = /* @__PURE__ */ dual(2, (self, cleanup) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => {
    const result = exitFailCause(cause1);
    return matchCauseEffect(cleanup(result), {
      onFailure: (cause2) => exitFailCause(sequential$1(cause1, cause2)),
      onSuccess: () => result
    });
  },
  onSuccess: (success) => {
    const result = exitSucceed(success);
    return zipRight(cleanup(result), result);
  }
})));
const onInterrupt = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, exitMatch({
  onFailure: (cause) => isInterruptedOnly(cause) ? asVoid(cleanup(interruptors(cause))) : void_,
  onSuccess: () => void_
})));
const succeed = (value) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.effect_instruction_i0 = value;
  return effect;
};
const suspend = (effect) => flatMap$1(sync(effect), identity);
const sync = (evaluate) => {
  const effect = new EffectPrimitive(OP_SYNC);
  effect.effect_instruction_i0 = evaluate;
  return effect;
};
const tap = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(self, (a) => {
  const b = typeof f === "function" ? f(a) : f;
  if (isEffect(b)) {
    return as(b, a);
  } else if (isPromiseLike(b)) {
    return async$1((resume2) => {
      b.then((_) => resume2(succeed(a)), (e) => resume2(fail(new UnknownException(e))));
    });
  }
  return succeed(a);
}));
const transplant = (f) => withFiberRuntime((state) => {
  const scopeOverride = state.getFiberRef(currentForkScopeOverride);
  const scope = pipe(scopeOverride, getOrElse(() => state.scope()));
  return f(fiberRefLocally(currentForkScopeOverride, some$2(scope)));
});
const uninterruptible = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.effect_instruction_i0 = disable(Interruption);
  effect.effect_instruction_i1 = () => self;
  return effect;
};
const uninterruptibleMask = (f) => custom(f, function() {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.effect_instruction_i0 = disable(Interruption);
  effect.effect_instruction_i1 = (oldFlags) => interruption(oldFlags) ? this.effect_instruction_i0(interruptible) : this.effect_instruction_i0(uninterruptible);
  return effect;
});
const void_ = /* @__PURE__ */ succeed(void 0);
const updateRuntimeFlags = (patch2) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.effect_instruction_i0 = patch2;
  effect.effect_instruction_i1 = void 0;
  return effect;
};
const whileLoop = (options) => {
  const effect = new EffectPrimitive(OP_WHILE);
  effect.effect_instruction_i0 = options.while;
  effect.effect_instruction_i1 = options.body;
  effect.effect_instruction_i2 = options.step;
  return effect;
};
const yieldNow$1 = (options) => {
  const effect = new EffectPrimitive(OP_YIELD);
  return typeof (options == null ? void 0 : options.priority) !== "undefined" ? withSchedulingPriority(effect, options.priority) : effect;
};
const zip = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, (a) => map(that, (b) => [a, b])));
const zipLeft = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, (a) => as(that, a)));
const zipRight = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, () => that));
const interruptFiber = (self) => flatMap$1(fiberId, (fiberId2) => pipe(self, interruptAsFiber(fiberId2)));
const interruptAsFiber = /* @__PURE__ */ dual(2, (self, fiberId2) => flatMap$1(self.interruptAsFork(fiberId2), () => self.await));
const logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const FiberRefSymbolKey = "effect/FiberRef";
const FiberRefTypeId = /* @__PURE__ */ Symbol.for(FiberRefSymbolKey);
const fiberRefVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const fiberRefGet = (self) => fiberRefModify(self, (a) => [a, a]);
const fiberRefGetWith = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(fiberRefGet(self), f));
const fiberRefSet = /* @__PURE__ */ dual(2, (self, value) => fiberRefModify(self, () => [void 0, value]));
const fiberRefModify = /* @__PURE__ */ dual(2, (self, f) => withFiberRuntime((state) => {
  const [b, a] = f(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}));
const fiberRefLocally = /* @__PURE__ */ dual(3, (use, self, value) => acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value)), () => use, (oldValue) => fiberRefSet(self, oldValue)));
const fiberRefUnsafeMake = (initial, options) => fiberRefUnsafeMakePatch(initial, {
  differ: update$1(),
  fork: (options == null ? void 0 : options.fork) ?? identity,
  join: options == null ? void 0 : options.join
});
const fiberRefUnsafeMakeHashSet = (initial) => {
  const differ2 = hashSet();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakeReadonlyArray = (initial) => {
  const differ2 = readonlyArray(update$1());
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakeContext = (initial) => {
  const differ2 = environment();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakePatch = (initial, options) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => options.differ.diff(oldValue, newValue),
  combine: (first, second) => options.differ.combine(first, second),
  patch: (patch2) => (oldValue) => options.differ.patch(patch2, oldValue),
  fork: options.fork,
  join: options.join ?? ((_, n) => n),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const fiberRefUnsafeMakeRuntimeFlags = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: differ$1,
  fork: differ$1.empty
});
const currentContext = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentContext"), () => fiberRefUnsafeMakeContext(empty$h()));
const currentSchedulingPriority = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentSchedulingPriority"), () => fiberRefUnsafeMake(0));
const currentMaxOpsBeforeYield = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMaxOpsBeforeYield"), () => fiberRefUnsafeMake(2048));
const currentLogAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogAnnotation"), () => fiberRefUnsafeMake(empty$c()));
const currentLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogLevel"), () => fiberRefUnsafeMake(logLevelInfo));
const currentLogSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogSpan"), () => fiberRefUnsafeMake(empty$b()));
const withSchedulingPriority = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentSchedulingPriority, scheduler));
const currentUnhandledErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentUnhandledErrorLogLevel"), () => fiberRefUnsafeMake(some$2(logLevelDebug)));
const currentMetricLabels = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMetricLabels"), () => fiberRefUnsafeMakeReadonlyArray(empty$j()));
const currentForkScopeOverride = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentForkScopeOverride"), () => fiberRefUnsafeMake(none$6(), {
  fork: () => none$6(),
  join: (parent, _) => parent
}));
const currentInterruptedCause = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentInterruptedCause"), () => fiberRefUnsafeMake(empty$6, {
  fork: () => empty$6,
  join: (parent, _) => parent
}));
const scopeAddFinalizer = (self, finalizer) => self.addFinalizer(() => asVoid(finalizer));
const scopeClose = (self, exit2) => self.close(exit2);
const scopeFork = (self, strategy) => self.fork(strategy);
const YieldableError = /* @__PURE__ */ function() {
  class YieldableError2 extends globalThis.Error {
    commit() {
      return fail(this);
    }
    toString() {
      return this.message ? `${this.name}: ${this.message}` : this.name;
    }
    toJSON() {
      return {
        ...this
      };
    }
    [NodeInspectSymbol]() {
      const stack = this.stack;
      if (stack) {
        return `${this.toString()}
${stack.split("\n").slice(1).join("\n")}`;
      }
      return this.toString();
    }
  }
  Object.assign(YieldableError2.prototype, StructuralCommitPrototype);
  return YieldableError2;
}();
const makeException = (proto2, tag) => {
  class Base extends YieldableError {
    constructor() {
      super(...arguments);
      __publicField(this, "_tag", tag);
    }
  }
  Object.assign(Base.prototype, proto2);
  Base.prototype.name = tag;
  return Base;
};
const RuntimeExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/RuntimeException");
const RuntimeException = /* @__PURE__ */ makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
const InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InterruptedException");
const isInterruptedException = (u) => hasProperty(u, InterruptedExceptionTypeId);
const IllegalArgumentExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/IllegalArgument");
const IllegalArgumentException = /* @__PURE__ */ makeException({
  [IllegalArgumentExceptionTypeId]: IllegalArgumentExceptionTypeId
}, "IllegalArgumentException");
const NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/NoSuchElement");
const NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
const UnknownExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/UnknownException");
const UnknownException = /* @__PURE__ */ function() {
  class UnknownException2 extends YieldableError {
    constructor(error, message) {
      super(message ?? (hasProperty(error, "message") && isString(error.message) ? error.message : void 0));
      __publicField(this, "error");
      __publicField(this, "_tag", "UnknownException");
      this.error = error;
    }
  }
  Object.assign(UnknownException2.prototype, {
    [UnknownExceptionTypeId]: UnknownExceptionTypeId,
    name: "UnknownException"
  });
  return UnknownException2;
}();
const exitIsExit = (u) => isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
const exitCollectAll = (exits, options) => exitCollectAllInternal(exits, (options == null ? void 0 : options.parallel) ? parallel : sequential$1);
const exitDie = (defect) => exitFailCause(die$1(defect));
const exitFail = (error) => exitFailCause(fail$1(error));
const exitFailCause = (cause) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.effect_instruction_i0 = cause;
  return effect;
};
const exitFlatMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.effect_instruction_i0);
    }
    case OP_SUCCESS: {
      return f(self.effect_instruction_i0);
    }
  }
});
const exitFlatten = (self) => pipe(self, exitFlatMap(identity));
const exitInterrupt = (fiberId2) => exitFailCause(interrupt(fiberId2));
const exitMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE:
      return exitFailCause(self.effect_instruction_i0);
    case OP_SUCCESS:
      return exitSucceed(f(self.effect_instruction_i0));
  }
});
const exitMatch = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE:
      return onFailure(self.effect_instruction_i0);
    case OP_SUCCESS:
      return onSuccess(self.effect_instruction_i0);
  }
});
const exitMatchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE:
      return onFailure(self.effect_instruction_i0);
    case OP_SUCCESS:
      return onSuccess(self.effect_instruction_i0);
  }
});
const exitSucceed = (value) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.effect_instruction_i0 = value;
  return effect;
};
const exitVoid = /* @__PURE__ */ exitSucceed(void 0);
const exitZipWith = /* @__PURE__ */ dual(3, (self, that, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      switch (that._tag) {
        case OP_SUCCESS:
          return exitFailCause(self.effect_instruction_i0);
        case OP_FAILURE: {
          return exitFailCause(onFailure(self.effect_instruction_i0, that.effect_instruction_i0));
        }
      }
    }
    case OP_SUCCESS: {
      switch (that._tag) {
        case OP_SUCCESS:
          return exitSucceed(onSuccess(self.effect_instruction_i0, that.effect_instruction_i0));
        case OP_FAILURE:
          return exitFailCause(that.effect_instruction_i0);
      }
    }
  }
});
const exitCollectAllInternal = (exits, combineCauses) => {
  const list = fromIterable$5(exits);
  if (!isNonEmpty(list)) {
    return none$6();
  }
  return pipe(tailNonEmpty(list), reduce$6(pipe(headNonEmpty(list), exitMap(of$1)), (accumulator, current) => pipe(accumulator, exitZipWith(current, {
    onSuccess: (list2, value) => pipe(list2, prepend$1(value)),
    onFailure: combineCauses
  }))), exitMap(reverse$1), exitMap((chunk) => toReadonlyArray(chunk)), some$2);
};
const deferredUnsafeMake = (fiberId2) => ({
  [DeferredTypeId]: deferredVariance,
  state: make$g(pending([])),
  blockingOn: fiberId2,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const deferredMake = () => flatMap$1(fiberId, (id) => deferredMakeAs(id));
const deferredMakeAs = (fiberId2) => sync(() => deferredUnsafeMake(fiberId2));
const deferredAwait = (self) => async$1((resume2) => {
  const state = get$3(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return resume2(state.effect);
    }
    case OP_STATE_PENDING: {
      state.joiners.push(resume2);
      return deferredInterruptJoiner(self, resume2);
    }
  }
}, self.blockingOn);
const deferredCompleteWith = /* @__PURE__ */ dual(2, (self, effect) => sync(() => {
  const state = get$3(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return false;
    }
    case OP_STATE_PENDING: {
      set$2(self.state, done$2(effect));
      for (let i = 0, len = state.joiners.length; i < len; i++) {
        state.joiners[i](effect);
      }
      return true;
    }
  }
}));
const deferredFailCause = /* @__PURE__ */ dual(2, (self, cause) => deferredCompleteWith(self, failCause(cause)));
const deferredSucceed = /* @__PURE__ */ dual(2, (self, value) => deferredCompleteWith(self, succeed(value)));
const deferredUnsafeDone = (self, effect) => {
  const state = get$3(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set$2(self.state, done$2(effect));
    for (let i = 0, len = state.joiners.length; i < len; i++) {
      state.joiners[i](effect);
    }
  }
};
const deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = get$3(self.state);
  if (state._tag === OP_STATE_PENDING) {
    const index = state.joiners.indexOf(joiner);
    if (index >= 0) {
      state.joiners.splice(index, 1);
    }
  }
});
const currentSpanFromFiber = (fiber) => {
  const span2 = fiber.getFiberRef(currentContext).unsafeMap.get(spanTag.key);
  return span2 !== void 0 && span2._tag === "Span" ? some$2(span2) : none$6();
};
const _await$1 = deferredAwait;
const TypeId$3 = /* @__PURE__ */ Symbol.for("effect/Duration");
const bigint0$1 = /* @__PURE__ */ BigInt(0);
const bigint24 = /* @__PURE__ */ BigInt(24);
const bigint60 = /* @__PURE__ */ BigInt(60);
const bigint1e3 = /* @__PURE__ */ BigInt(1e3);
const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
const bigint1e9 = /* @__PURE__ */ BigInt(1e9);
const DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/;
const decode = (input) => {
  if (isDuration(input)) {
    return input;
  } else if (isNumber(input)) {
    return millis(input);
  } else if (isBigInt(input)) {
    return nanos(input);
  } else if (Array.isArray(input)) {
    if (input.length === 2 && isNumber(input[0]) && isNumber(input[1])) {
      return nanos(BigInt(input[0]) * bigint1e9 + BigInt(input[1]));
    }
  } else if (isString(input)) {
    DURATION_REGEX.lastIndex = 0;
    const match2 = DURATION_REGEX.exec(input);
    if (match2) {
      const [_, valueStr, unit2] = match2;
      const value = Number(valueStr);
      switch (unit2) {
        case "nano":
        case "nanos":
          return nanos(BigInt(valueStr));
        case "micro":
        case "micros":
          return micros(BigInt(valueStr));
        case "milli":
        case "millis":
          return millis(value);
        case "second":
        case "seconds":
          return seconds(value);
        case "minute":
        case "minutes":
          return minutes(value);
        case "hour":
        case "hours":
          return hours(value);
        case "day":
        case "days":
          return days(value);
        case "week":
        case "weeks":
          return weeks(value);
      }
    }
  }
  throw new Error("Invalid DurationInput");
};
const zeroValue = {
  _tag: "Millis",
  millis: 0
};
const infinityValue = {
  _tag: "Infinity"
};
const DurationProto = {
  [TypeId$3]: TypeId$3,
  [symbol$1]() {
    return cached(this, structure(this.value));
  },
  [symbol](that) {
    return isDuration(that) && equals(this, that);
  },
  toString() {
    return `Duration(${format(this)})`;
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
          hrtime: toHrTime(this)
        };
      case "Infinity":
        return {
          _id: "Duration",
          _tag: "Infinity"
        };
    }
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$b = (input) => {
  const duration = Object.create(DurationProto);
  if (isNumber(input)) {
    if (isNaN(input) || input <= 0) {
      duration.value = zeroValue;
    } else if (!Number.isFinite(input)) {
      duration.value = infinityValue;
    } else if (!Number.isInteger(input)) {
      duration.value = {
        _tag: "Nanos",
        nanos: BigInt(Math.round(input * 1e6))
      };
    } else {
      duration.value = {
        _tag: "Millis",
        millis: input
      };
    }
  } else if (input <= bigint0$1) {
    duration.value = zeroValue;
  } else {
    duration.value = {
      _tag: "Nanos",
      nanos: input
    };
  }
  return duration;
};
const isDuration = (u) => hasProperty(u, TypeId$3);
const zero = /* @__PURE__ */ make$b(0);
const nanos = (nanos2) => make$b(nanos2);
const micros = (micros2) => make$b(micros2 * bigint1e3);
const millis = (millis2) => make$b(millis2);
const seconds = (seconds2) => make$b(seconds2 * 1e3);
const minutes = (minutes2) => make$b(minutes2 * 6e4);
const hours = (hours2) => make$b(hours2 * 36e5);
const days = (days2) => make$b(days2 * 864e5);
const weeks = (weeks2) => make$b(weeks2 * 6048e5);
const toMillis = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return Infinity;
    case "Nanos":
      return Number(_self.value.nanos) / 1e6;
    case "Millis":
      return _self.value.millis;
  }
};
const unsafeToNanos = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      throw new Error("Cannot convert infinite duration to nanos");
    case "Nanos":
      return _self.value.nanos;
    case "Millis":
      return BigInt(Math.round(_self.value.millis * 1e6));
  }
};
const toHrTime = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return [Infinity, 0];
    case "Nanos":
      return [Number(_self.value.nanos / bigint1e9), Number(_self.value.nanos % bigint1e9)];
    case "Millis":
      return [Math.floor(_self.value.millis / 1e3), Math.round(_self.value.millis % 1e3 * 1e6)];
  }
};
const matchWith = /* @__PURE__ */ dual(3, (self, that, options) => {
  const _self = decode(self);
  const _that = decode(that);
  if (_self.value._tag === "Infinity" || _that.value._tag === "Infinity") {
    return options.onMillis(toMillis(_self), toMillis(_that));
  } else if (_self.value._tag === "Nanos" || _that.value._tag === "Nanos") {
    const selfNanos = _self.value._tag === "Nanos" ? _self.value.nanos : BigInt(Math.round(_self.value.millis * 1e6));
    const thatNanos = _that.value._tag === "Nanos" ? _that.value.nanos : BigInt(Math.round(_that.value.millis * 1e6));
    return options.onNanos(selfNanos, thatNanos);
  }
  return options.onMillis(_self.value.millis, _that.value.millis);
});
const Equivalence = (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 === that2,
  onNanos: (self2, that2) => self2 === that2
});
const greaterThanOrEqualTo = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 >= that2,
  onNanos: (self2, that2) => self2 >= that2
}));
const equals = /* @__PURE__ */ dual(2, (self, that) => Equivalence(decode(self), decode(that)));
const format = (self) => {
  const duration = decode(self);
  const parts = [];
  if (duration.value._tag === "Infinity") {
    return "Infinity";
  }
  const nanos2 = unsafeToNanos(duration);
  if (nanos2 % bigint1e6) {
    parts.push(`${nanos2 % bigint1e6}ns`);
  }
  const ms = nanos2 / bigint1e6;
  if (ms % bigint1e3 !== bigint0$1) {
    parts.push(`${ms % bigint1e3}ms`);
  }
  const sec = ms / bigint1e3;
  if (sec % bigint60 !== bigint0$1) {
    parts.push(`${sec % bigint60}s`);
  }
  const min = sec / bigint60;
  if (min % bigint60 !== bigint0$1) {
    parts.push(`${min % bigint60}m`);
  }
  const hr = min / bigint60;
  if (hr % bigint24 !== bigint0$1) {
    parts.push(`${hr % bigint24}h`);
  }
  const days2 = hr / bigint24;
  if (days2 !== bigint0$1) {
    parts.push(`${days2}d`);
  }
  return parts.reverse().join(" ");
};
const flatten = exitFlatten;
const TypeId$2 = /* @__PURE__ */ Symbol.for("effect/MutableHashMap");
const MutableHashMapProto = {
  [TypeId$2]: TypeId$2,
  [Symbol.iterator]() {
    return new MutableHashMapIterator(this);
  },
  toString() {
    return format$1(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableHashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
class MutableHashMapIterator {
  constructor(self) {
    __publicField(this, "self");
    __publicField(this, "referentialIterator");
    __publicField(this, "bucketIterator");
    this.self = self;
    this.referentialIterator = self.referential[Symbol.iterator]();
  }
  next() {
    if (this.bucketIterator !== void 0) {
      return this.bucketIterator.next();
    }
    const result = this.referentialIterator.next();
    if (result.done) {
      this.bucketIterator = new BucketIterator(this.self.buckets.values());
      return this.next();
    }
    return result;
  }
  [Symbol.iterator]() {
    return new MutableHashMapIterator(this.self);
  }
}
class BucketIterator {
  constructor(backing) {
    __publicField(this, "backing");
    __publicField(this, "currentBucket");
    this.backing = backing;
  }
  next() {
    if (this.currentBucket === void 0) {
      const result2 = this.backing.next();
      if (result2.done) {
        return result2;
      }
      this.currentBucket = result2.value[Symbol.iterator]();
    }
    const result = this.currentBucket.next();
    if (result.done) {
      this.currentBucket = void 0;
      return this.next();
    }
    return result;
  }
}
const empty$5 = () => {
  const self = Object.create(MutableHashMapProto);
  self.referential = /* @__PURE__ */ new Map();
  self.buckets = /* @__PURE__ */ new Map();
  self.bucketsSize = 0;
  return self;
};
const get$1 = /* @__PURE__ */ dual(2, (self, key) => {
  if (isEqual(key) === false) {
    return self.referential.has(key) ? some$2(self.referential.get(key)) : none$6();
  }
  const hash2 = key[symbol$1]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    return none$6();
  }
  return getFromBucket(self, bucket, key);
});
const getFromBucket = (self, bucket, key, remove2 = false) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key[symbol](bucket[i][0])) {
      const value = bucket[i][1];
      if (remove2) {
        bucket.splice(i, 1);
        self.bucketsSize--;
      }
      return some$2(value);
    }
  }
  return none$6();
};
const has = /* @__PURE__ */ dual(2, (self, key) => isSome(get$1(self, key)));
const set = /* @__PURE__ */ dual(3, (self, key, value) => {
  if (isEqual(key) === false) {
    self.referential.set(key, value);
    return self;
  }
  const hash2 = key[symbol$1]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    self.buckets.set(hash2, [[key, value]]);
    self.bucketsSize++;
    return self;
  }
  removeFromBucket(self, bucket, key);
  bucket.push([key, value]);
  self.bucketsSize++;
  return self;
});
const removeFromBucket = (self, bucket, key) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key[symbol](bucket[i][0])) {
      bucket.splice(i, 1);
      self.bucketsSize--;
      return;
    }
  }
};
const ClockSymbolKey = "effect/Clock";
const ClockTypeId = /* @__PURE__ */ Symbol.for(ClockSymbolKey);
const clockTag = /* @__PURE__ */ GenericTag("effect/Clock");
const MAX_TIMER_MILLIS = 2 ** 31 - 1;
const globalClockScheduler = {
  unsafeSchedule(task, duration) {
    const millis2 = toMillis(duration);
    if (millis2 > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = setTimeout(() => {
      completed = true;
      task();
    }, millis2);
    return () => {
      clearTimeout(handle);
      return !completed;
    };
  }
};
const performanceNowNanos = /* @__PURE__ */ function() {
  const bigint1e62 = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e62;
  }
  const origin = "timeOrigin" in performance && typeof performance.timeOrigin === "number" ? /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(performance.timeOrigin * 1e6)) : /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e62 - /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(/* @__PURE__ */ performance.now() * 1e6));
  return () => origin + BigInt(Math.round(performance.now() * 1e6));
}();
const processOrPerformanceNow = /* @__PURE__ */ function() {
  const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
  if (!processHrtime) {
    return performanceNowNanos;
  }
  const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
  return () => origin + processHrtime.bigint();
}();
class ClockImpl {
  constructor() {
    __publicField(this, _h, ClockTypeId);
    __publicField(this, "currentTimeMillis", sync(() => this.unsafeCurrentTimeMillis()));
    __publicField(this, "currentTimeNanos", sync(() => this.unsafeCurrentTimeNanos()));
  }
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return processOrPerformanceNow();
  }
  scheduler() {
    return succeed(globalClockScheduler);
  }
  sleep(duration) {
    return async$1((resume2) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => resume2(void_), duration);
      return asVoid(sync(canceler));
    });
  }
}
_h = ClockTypeId;
const make$a = () => new ClockImpl();
const Order$1 = number;
const escape = (string2) => string2.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&");
const OP_AND = "And";
const OP_OR = "Or";
const OP_INVALID_DATA = "InvalidData";
const OP_MISSING_DATA = "MissingData";
const OP_SOURCE_UNAVAILABLE = "SourceUnavailable";
const OP_UNSUPPORTED = "Unsupported";
const ConfigErrorSymbolKey = "effect/ConfigError";
const ConfigErrorTypeId = /* @__PURE__ */ Symbol.for(ConfigErrorSymbolKey);
const proto = {
  _tag: "ConfigError",
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
const And = (self, that) => {
  const error = Object.create(proto);
  error._op = OP_AND;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  return error;
};
const Or = (self, that) => {
  const error = Object.create(proto);
  error._op = OP_OR;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  return error;
};
const InvalidData = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto);
  error._op = OP_INVALID_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$1(options.pathDelim));
      return `(Invalid data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const MissingData = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto);
  error._op = OP_MISSING_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$1(options.pathDelim));
      return `(Missing data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const SourceUnavailable = (path, message, cause, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto);
  error._op = OP_SOURCE_UNAVAILABLE;
  error.path = path;
  error.message = message;
  error.cause = cause;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$1(options.pathDelim));
      return `(Source unavailable at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const Unsupported = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto);
  error._op = OP_UNSUPPORTED;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$1(options.pathDelim));
      return `(Unsupported operation at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const prefixed = /* @__PURE__ */ dual(2, (self, prefix) => {
  switch (self._op) {
    case OP_AND: {
      return And(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_OR: {
      return Or(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_INVALID_DATA: {
      return InvalidData([...prefix, ...self.path], self.message);
    }
    case OP_MISSING_DATA: {
      return MissingData([...prefix, ...self.path], self.message);
    }
    case OP_SOURCE_UNAVAILABLE: {
      return SourceUnavailable([...prefix, ...self.path], self.message, self.cause);
    }
    case OP_UNSUPPORTED: {
      return Unsupported([...prefix, ...self.path], self.message);
    }
  }
});
const empty$4 = {
  _tag: "Empty"
};
const patch$3 = /* @__PURE__ */ dual(2, (path, patch2) => {
  let input = of(patch2);
  let output = path;
  while (isCons(input)) {
    const patch3 = input.head;
    switch (patch3._tag) {
      case "Empty": {
        input = input.tail;
        break;
      }
      case "AndThen": {
        input = cons(patch3.first, cons(patch3.second, input.tail));
        break;
      }
      case "MapName": {
        output = map$3(output, patch3.f);
        input = input.tail;
        break;
      }
      case "Nested": {
        output = prepend$2(output, patch3.name);
        input = input.tail;
        break;
      }
      case "Unnested": {
        const containsName = pipe(head(output), contains(patch3.name));
        if (containsName) {
          output = tailNonEmpty$1(output);
          input = input.tail;
        } else {
          return left$2(MissingData(output, `Expected ${patch3.name} to be in path in ConfigProvider#unnested`));
        }
        break;
      }
    }
  }
  return right$2(output);
});
const OP_CONSTANT = "Constant";
const OP_FAIL = "Fail";
const OP_FALLBACK = "Fallback";
const OP_DESCRIBED = "Described";
const OP_LAZY = "Lazy";
const OP_MAP_OR_FAIL = "MapOrFail";
const OP_NESTED = "Nested";
const OP_PRIMITIVE = "Primitive";
const OP_SEQUENCE = "Sequence";
const OP_HASHMAP = "HashMap";
const OP_ZIP_WITH = "ZipWith";
const concat = (l, r) => [...l, ...r];
const ConfigProviderSymbolKey = "effect/ConfigProvider";
const ConfigProviderTypeId = /* @__PURE__ */ Symbol.for(ConfigProviderSymbolKey);
const configProviderTag = /* @__PURE__ */ GenericTag("effect/ConfigProvider");
const FlatConfigProviderSymbolKey = "effect/ConfigProviderFlat";
const FlatConfigProviderTypeId = /* @__PURE__ */ Symbol.for(FlatConfigProviderSymbolKey);
const make$9 = (options) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
const makeFlat = (options) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch: options.patch,
  load: (path, config, split = true) => options.load(path, config, split),
  enumerateChildren: options.enumerateChildren
});
const fromFlat = (flat) => make$9({
  load: (config) => flatMap$1(fromFlatLoop(flat, empty$j(), config, false), (chunk) => match$2(head(chunk), {
    onNone: () => fail(MissingData(empty$j(), `Expected a single value having structure: ${config}`)),
    onSome: succeed
  })),
  flattened: flat
});
const fromEnv = (config) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, config);
  const makePathString = (path) => pipe(path, join$1(pathDelim));
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load = (path, primitive, split = true) => {
    const pathString = makePathString(path);
    const current = getEnv();
    const valueOpt = pathString in current ? some$2(current[pathString]) : none$6();
    return pipe(valueOpt, mapError(() => MissingData(path, `Expected ${pathString} to exist in the process context`)), flatMap$1((value) => parsePrimitive(value, path, primitive, seqDelim, split)));
  };
  const enumerateChildren = (path) => sync(() => {
    const current = getEnv();
    const keys2 = Object.keys(current);
    const keyPaths = keys2.map((value) => unmakePathString(value.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = pipe(path, unsafeGet$3(i));
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path.length, path.length + 1));
    return fromIterable$2(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load,
    enumerateChildren,
    patch: empty$4
  }));
};
const extend = (leftDef, rightDef, left2, right2) => {
  const leftPad = unfold(left2.length, (index) => index >= right2.length ? none$6() : some$2([leftDef(index), index + 1]));
  const rightPad = unfold(right2.length, (index) => index >= left2.length ? none$6() : some$2([rightDef(index), index + 1]));
  const leftExtension = concat(left2, leftPad);
  const rightExtension = concat(right2, rightPad);
  return [leftExtension, rightExtension];
};
const appendConfigPath = (path, config) => {
  let op = config;
  if (op._tag === "Nested") {
    const out = path.slice();
    while (op._tag === "Nested") {
      out.push(op.name);
      op = op.config;
    }
    return out;
  }
  return path;
};
const fromFlatLoop = (flat, prefix, config, split) => {
  const op = config;
  switch (op._tag) {
    case OP_CONSTANT: {
      return succeed(of$2(op.value));
    }
    case OP_DESCRIBED: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config, split));
    }
    case OP_FAIL: {
      return fail(MissingData(prefix, op.message));
    }
    case OP_FALLBACK: {
      return pipe(suspend(() => fromFlatLoop(flat, prefix, op.first, split)), catchAll((error1) => {
        if (op.condition(error1)) {
          return pipe(fromFlatLoop(flat, prefix, op.second, split), catchAll((error2) => fail(Or(error1, error2))));
        }
        return fail(error1);
      }));
    }
    case OP_LAZY: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config(), split));
    }
    case OP_MAP_OR_FAIL: {
      return suspend(() => pipe(fromFlatLoop(flat, prefix, op.original, split), flatMap$1(forEachSequential((a) => pipe(op.mapOrFail(a), mapError(prefixed(appendConfigPath(prefix, op.original))))))));
    }
    case OP_NESTED: {
      return suspend(() => fromFlatLoop(flat, concat(prefix, of$2(op.name)), op.config, split));
    }
    case OP_PRIMITIVE: {
      return pipe(patch$3(prefix, flat.patch), flatMap$1((prefix2) => pipe(flat.load(prefix2, op, split), flatMap$1((values) => {
        if (values.length === 0) {
          const name = pipe(last(prefix2), getOrElse(() => "<n/a>"));
          return fail(MissingData([], `Expected ${op.description} with name ${name}`));
        }
        return succeed(values);
      }))));
    }
    case OP_SEQUENCE: {
      return pipe(patch$3(prefix, flat.patch), flatMap$1((patchedPrefix) => pipe(flat.enumerateChildren(patchedPrefix), flatMap$1(indicesFrom), flatMap$1((indices) => {
        if (indices.length === 0) {
          return suspend(() => map(fromFlatLoop(flat, patchedPrefix, op.config, true), of$2));
        }
        return pipe(forEachSequential(indices, (index) => fromFlatLoop(flat, append$1(prefix, `[${index}]`), op.config, true)), map((chunkChunk) => {
          const flattened = flatten$3(chunkChunk);
          if (flattened.length === 0) {
            return of$2(empty$j());
          }
          return of$2(flattened);
        }));
      }))));
    }
    case OP_HASHMAP: {
      return suspend(() => pipe(patch$3(prefix, flat.patch), flatMap$1((prefix2) => pipe(flat.enumerateChildren(prefix2), flatMap$1((keys2) => {
        return pipe(keys2, forEachSequential((key) => fromFlatLoop(flat, concat(prefix2, of$2(key)), op.valueConfig, split)), map((matrix) => {
          if (matrix.length === 0) {
            return of$2(empty$c());
          }
          return pipe(transpose(matrix), map$3((values) => fromIterable$1(zip$1(fromIterable$6(keys2), values))));
        }));
      })))));
    }
    case OP_ZIP_WITH: {
      return suspend(() => pipe(fromFlatLoop(flat, prefix, op.left, split), either, flatMap$1((left2) => pipe(fromFlatLoop(flat, prefix, op.right, split), either, flatMap$1((right2) => {
        if (isLeft(left2) && isLeft(right2)) {
          return fail(And(left2.left, right2.left));
        }
        if (isLeft(left2) && isRight(right2)) {
          return fail(left2.left);
        }
        if (isRight(left2) && isLeft(right2)) {
          return fail(right2.left);
        }
        if (isRight(left2) && isRight(right2)) {
          const path = pipe(prefix, join$1("."));
          const fail2 = fromFlatLoopFail(prefix, path);
          const [lefts, rights] = extend(fail2, fail2, pipe(left2.right, map$3(right$2)), pipe(right2.right, map$3(right$2)));
          return pipe(lefts, zip$1(rights), forEachSequential(([left3, right3]) => pipe(zip(left3, right3), map(([left4, right4]) => op.zip(left4, right4)))));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
      })))));
    }
  }
};
const fromFlatLoopFail = (prefix, path) => (index) => left$2(MissingData(prefix, `The element at index ${index} in a sequence at path "${path}" was missing`));
const splitPathString = (text, delim) => {
  const split = text.split(new RegExp(`\\s*${escape(delim)}\\s*`));
  return split;
};
const parsePrimitive = (text, path, primitive, delimiter, split) => {
  if (!split) {
    return pipe(primitive.parse(text), mapBoth({
      onFailure: prefixed(path),
      onSuccess: of$2
    }));
  }
  return pipe(splitPathString(text, delimiter), forEachSequential((char) => primitive.parse(char.trim())), mapError(prefixed(path)));
};
const transpose = (array2) => {
  return Object.keys(array2[0]).map((column) => array2.map((row) => row[column]));
};
const indicesFrom = (quotedIndices) => pipe(forEachSequential(quotedIndices, parseQuotedIndex), mapBoth({
  onFailure: () => empty$j(),
  onSuccess: sort(Order$1)
}), either, map(merge$1));
const QUOTED_INDEX_REGEX = /^(\[(\d+)\])$/;
const parseQuotedIndex = (str) => {
  const match2 = str.match(QUOTED_INDEX_REGEX);
  if (match2 !== null) {
    const matchedIndex = match2[2];
    return pipe(matchedIndex !== void 0 && matchedIndex.length > 0 ? some$2(matchedIndex) : none$6(), flatMap$3(parseInteger));
  }
  return none$6();
};
const parseInteger = (str) => {
  const parsedIndex = Number.parseInt(str);
  return Number.isNaN(parsedIndex) ? none$6() : some$2(parsedIndex);
};
const TypeId$1 = /* @__PURE__ */ Symbol.for("effect/Console");
const consoleTag = /* @__PURE__ */ GenericTag("effect/Console");
const defaultConsole = {
  [TypeId$1]: TypeId$1,
  assert(condition, ...args) {
    return sync(() => {
      console.assert(condition, ...args);
    });
  },
  clear: /* @__PURE__ */ sync(() => {
    console.clear();
  }),
  count(label) {
    return sync(() => {
      console.count(label);
    });
  },
  countReset(label) {
    return sync(() => {
      console.countReset(label);
    });
  },
  debug(...args) {
    return sync(() => {
      console.debug(...args);
    });
  },
  dir(item, options) {
    return sync(() => {
      console.dir(item, options);
    });
  },
  dirxml(...args) {
    return sync(() => {
      console.dirxml(...args);
    });
  },
  error(...args) {
    return sync(() => {
      console.error(...args);
    });
  },
  group(options) {
    return (options == null ? void 0 : options.collapsed) ? sync(() => console.groupCollapsed(options == null ? void 0 : options.label)) : sync(() => console.group(options == null ? void 0 : options.label));
  },
  groupEnd: /* @__PURE__ */ sync(() => {
    console.groupEnd();
  }),
  info(...args) {
    return sync(() => {
      console.info(...args);
    });
  },
  log(...args) {
    return sync(() => {
      console.log(...args);
    });
  },
  table(tabularData, properties) {
    return sync(() => {
      console.table(tabularData, properties);
    });
  },
  time(label) {
    return sync(() => console.time(label));
  },
  timeEnd(label) {
    return sync(() => console.timeEnd(label));
  },
  timeLog(label, ...args) {
    return sync(() => {
      console.timeLog(label, ...args);
    });
  },
  trace(...args) {
    return sync(() => {
      console.trace(...args);
    });
  },
  warn(...args) {
    return sync(() => {
      console.warn(...args);
    });
  },
  unsafe: console
};
const RandomSymbolKey = "effect/Random";
const RandomTypeId = /* @__PURE__ */ Symbol.for(RandomSymbolKey);
const randomTag = /* @__PURE__ */ GenericTag("effect/Random");
class RandomImpl {
  constructor(seed) {
    __publicField(this, "seed");
    __publicField(this, _i, RandomTypeId);
    __publicField(this, "PRNG");
    this.seed = seed;
    this.PRNG = new PCGRandom(seed);
  }
  get next() {
    return sync(() => this.PRNG.number());
  }
  get nextBoolean() {
    return map(this.next, (n) => n > 0.5);
  }
  get nextInt() {
    return sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(min, max) {
    return map(this.next, (n) => (max - min) * n + min);
  }
  nextIntBetween(min, max) {
    return sync(() => this.PRNG.integer(max - min) + min);
  }
  shuffle(elements) {
    return shuffleWith(elements, (n) => this.nextIntBetween(0, n));
  }
}
_i = RandomTypeId;
const shuffleWith = (elements, nextIntBounded) => {
  return suspend(() => pipe(sync(() => Array.from(elements)), flatMap$1((buffer) => {
    const numbers = [];
    for (let i = buffer.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return pipe(numbers, forEachSequentialDiscard((n) => pipe(nextIntBounded(n), map((k) => swap(buffer, n - 1, k)))), as(fromIterable$5(buffer)));
  })));
};
const swap = (buffer, index1, index2) => {
  const tmp = buffer[index1];
  buffer[index1] = buffer[index2];
  buffer[index2] = tmp;
  return buffer;
};
const make$8 = (seed) => new RandomImpl(seed);
const liveServices = /* @__PURE__ */ pipe(/* @__PURE__ */ empty$h(), /* @__PURE__ */ add$2(clockTag, /* @__PURE__ */ make$a()), /* @__PURE__ */ add$2(consoleTag, defaultConsole), /* @__PURE__ */ add$2(randomTag, /* @__PURE__ */ make$8(/* @__PURE__ */ Math.random() * 4294967296 >>> 0)), /* @__PURE__ */ add$2(configProviderTag, /* @__PURE__ */ fromEnv()), /* @__PURE__ */ add$2(tracerTag, nativeTracer));
const currentServices = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/DefaultServices/currentServices"), () => fiberRefUnsafeMakeContext(liveServices));
function unsafeMake$3(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
function empty$3() {
  return unsafeMake$3(/* @__PURE__ */ new Map());
}
const FiberRefsSym = /* @__PURE__ */ Symbol.for("effect/FiberRefs");
class FiberRefsImpl {
  constructor(locals) {
    __publicField(this, "locals");
    __publicField(this, _j, FiberRefsSym);
    this.locals = locals;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
_j = FiberRefsSym;
const findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = void 0;
  while (ret === void 0) {
    if (isNonEmptyReadonlyArray(parentStack) && isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = headNonEmpty$1(parentStack)[0];
      const parentAncestors = tailNonEmpty$1(parentStack);
      const childFiberId = headNonEmpty$1(childStack)[0];
      const childRefValue = headNonEmpty$1(childStack)[1];
      const childAncestors = tailNonEmpty$1(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
const joinAs = /* @__PURE__ */ dual(3, (self, fiberId2, that) => {
  const parentFiberRefs = new Map(self.locals);
  that.locals.forEach((childStack, fiberRef) => {
    const childValue = childStack[0][1];
    if (!childStack[0][0][symbol](fiberId2)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (equals$1(childValue, fiberRef.initial)) {
          return;
        }
        parentFiberRefs.set(fiberRef, [[fiberId2, fiberRef.join(fiberRef.initial, childValue)]]);
        return;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch2 = fiberRef.diff(ancestor, childValue);
        const oldValue = parentStack[0][1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch2)(oldValue));
        if (!equals$1(oldValue, newValue)) {
          let newStack;
          const parentFiberId = parentStack[0][0];
          if (parentFiberId[symbol](fiberId2)) {
            newStack = [[parentFiberId, newValue], ...parentStack.slice(1)];
          } else {
            newStack = [[fiberId2, newValue], ...parentStack];
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  });
  return new FiberRefsImpl(parentFiberRefs);
});
const forkAs = /* @__PURE__ */ dual(2, (self, childId) => {
  const map2 = /* @__PURE__ */ new Map();
  unsafeForkAs(self, map2, childId);
  return new FiberRefsImpl(map2);
});
const unsafeForkAs = (self, map2, fiberId2) => {
  self.locals.forEach((stack, fiberRef) => {
    const oldValue = stack[0][1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (equals$1(oldValue, newValue)) {
      map2.set(fiberRef, stack);
    } else {
      map2.set(fiberRef, [[fiberId2, newValue], ...stack]);
    }
  });
};
const delete_ = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
const get = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return none$6();
  }
  return some$2(headNonEmpty$1(self.locals.get(fiberRef))[1]);
});
const getOrDefault$1 = /* @__PURE__ */ dual(2, (self, fiberRef) => pipe(get(self, fiberRef), getOrElse(() => fiberRef.initial)));
const updateAs = /* @__PURE__ */ dual(2, (self, {
  fiberId: fiberId2,
  fiberRef,
  value
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(/* @__PURE__ */ new Map([[fiberRef, [[fiberId2, value]]]]));
  }
  const locals = new Map(self.locals);
  unsafeUpdateAs(locals, fiberId2, fiberRef, value);
  return new FiberRefsImpl(locals);
});
const unsafeUpdateAs = (locals, fiberId2, fiberRef, value) => {
  const oldStack = locals.get(fiberRef) ?? [];
  let newStack;
  if (isNonEmptyReadonlyArray(oldStack)) {
    const [currentId, currentValue] = headNonEmpty$1(oldStack);
    if (currentId[symbol](fiberId2)) {
      if (equals$1(currentValue, value)) {
        return;
      } else {
        newStack = [[fiberId2, value], ...oldStack.slice(1)];
      }
    } else {
      newStack = [[fiberId2, value], ...oldStack];
    }
  } else {
    newStack = [[fiberId2, value]];
  }
  locals.set(fiberRef, newStack);
};
const updateManyAs$1 = /* @__PURE__ */ dual(2, (self, {
  entries,
  forkAs: forkAs2
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(new Map(entries));
  }
  const locals = new Map(self.locals);
  if (forkAs2 !== void 0) {
    unsafeForkAs(self, locals, forkAs2);
  }
  entries.forEach(([fiberRef, values]) => {
    if (values.length === 1) {
      unsafeUpdateAs(locals, values[0][0], fiberRef, values[0][1]);
    } else {
      values.forEach(([fiberId2, value]) => {
        unsafeUpdateAs(locals, fiberId2, fiberRef, value);
      });
    }
  });
  return new FiberRefsImpl(locals);
});
const getOrDefault = getOrDefault$1;
const updateManyAs = updateManyAs$1;
const empty$2 = empty$3;
const All = logLevelAll;
const Fatal = logLevelFatal;
const Error$1 = logLevelError;
const Warning = logLevelWarning;
const Info = logLevelInfo;
const Debug = logLevelDebug;
const Trace = logLevelTrace;
const None2 = logLevelNone;
const Order = /* @__PURE__ */ pipe(Order$1, /* @__PURE__ */ mapInput((level) => level.ordinal));
const greaterThan = /* @__PURE__ */ greaterThan$1(Order);
const fromLiteral = (literal) => {
  switch (literal) {
    case "All":
      return All;
    case "Debug":
      return Debug;
    case "Error":
      return Error$1;
    case "Fatal":
      return Fatal;
    case "Info":
      return Info;
    case "Trace":
      return Trace;
    case "None":
      return None2;
    case "Warning":
      return Warning;
  }
};
const render$1 = (now) => (self) => {
  const label = self.label.replace(/[\s="]/g, "_");
  return `${label}=${now - self.startTime}ms`;
};
const render = render$1;
const TypeId = /* @__PURE__ */ Symbol.for("effect/Readable");
const RefTypeId = /* @__PURE__ */ Symbol.for("effect/Ref");
const refVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
class RefImpl {
  constructor(ref) {
    __publicField(this, "ref");
    __publicField(this, _k, refVariance);
    __publicField(this, _l);
    __publicField(this, "get");
    this.ref = ref;
    this[TypeId] = TypeId;
    this.get = sync(() => get$3(this.ref));
  }
  modify(f) {
    return sync(() => {
      const current = get$3(this.ref);
      const [b, a] = f(current);
      if (current !== a) {
        set$2(a)(this.ref);
      }
      return b;
    });
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
_k = RefTypeId, _l = TypeId;
const unsafeMake$2 = (value) => new RefImpl(make$g(value));
const make$7 = (value) => sync(() => unsafeMake$2(value));
const modify$1 = /* @__PURE__ */ dual(2, (self, f) => self.modify(f));
const make$6 = make$7;
const modify = modify$1;
const OP_EMPTY$1 = "Empty";
const OP_ADD = "Add";
const OP_REMOVE = "Remove";
const OP_UPDATE = "Update";
const OP_AND_THEN$1 = "AndThen";
const empty$1 = {
  _tag: OP_EMPTY$1
};
const diff$2 = (oldValue, newValue) => {
  const missingLocals = new Map(oldValue.locals);
  let patch2 = empty$1;
  for (const [fiberRef, pairs] of newValue.locals.entries()) {
    const newValue2 = headNonEmpty$1(pairs)[1];
    const old = missingLocals.get(fiberRef);
    if (old !== void 0) {
      const oldValue2 = headNonEmpty$1(old)[1];
      if (!equals$1(oldValue2, newValue2)) {
        patch2 = combine$1({
          _tag: OP_UPDATE,
          fiberRef,
          patch: fiberRef.diff(oldValue2, newValue2)
        })(patch2);
      }
    } else {
      patch2 = combine$1({
        _tag: OP_ADD,
        fiberRef,
        value: newValue2
      })(patch2);
    }
    missingLocals.delete(fiberRef);
  }
  for (const [fiberRef] of missingLocals.entries()) {
    patch2 = combine$1({
      _tag: OP_REMOVE,
      fiberRef
    })(patch2);
  }
  return patch2;
};
const combine$1 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: OP_AND_THEN$1,
  first: self,
  second: that
}));
const patch$2 = /* @__PURE__ */ dual(3, (self, fiberId2, oldValue) => {
  let fiberRefs = oldValue;
  let patches = of$2(self);
  while (isNonEmptyReadonlyArray(patches)) {
    const head2 = headNonEmpty$1(patches);
    const tail = tailNonEmpty$1(patches);
    switch (head2._tag) {
      case OP_EMPTY$1: {
        patches = tail;
        break;
      }
      case OP_ADD: {
        fiberRefs = updateAs(fiberRefs, {
          fiberId: fiberId2,
          fiberRef: head2.fiberRef,
          value: head2.value
        });
        patches = tail;
        break;
      }
      case OP_REMOVE: {
        fiberRefs = delete_(fiberRefs, head2.fiberRef);
        patches = tail;
        break;
      }
      case OP_UPDATE: {
        const value = getOrDefault$1(fiberRefs, head2.fiberRef);
        fiberRefs = updateAs(fiberRefs, {
          fiberId: fiberId2,
          fiberRef: head2.fiberRef,
          value: head2.fiberRef.patch(head2.patch)(value)
        });
        patches = tail;
        break;
      }
      case OP_AND_THEN$1: {
        patches = prepend$2(head2.first)(prepend$2(head2.second)(tail));
        break;
      }
    }
  }
  return fiberRefs;
});
const MetricLabelSymbolKey = "effect/MetricLabel";
const MetricLabelTypeId = /* @__PURE__ */ Symbol.for(MetricLabelSymbolKey);
class MetricLabelImpl {
  constructor(key, value) {
    __publicField(this, "key");
    __publicField(this, "value");
    __publicField(this, _m, MetricLabelTypeId);
    __publicField(this, "_hash");
    this.key = key;
    this.value = value;
    this._hash = string(MetricLabelSymbolKey + this.key + this.value);
  }
  [(_m = MetricLabelTypeId, symbol$1)]() {
    return this._hash;
  }
  [symbol](that) {
    return isMetricLabel(that) && this.key === that.key && this.value === that.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make$5 = (key, value) => {
  return new MetricLabelImpl(key, value);
};
const isMetricLabel = (u) => hasProperty(u, MetricLabelTypeId);
const promise$1 = (evaluate) => evaluate.length >= 1 ? async$1((resolve2, signal) => {
  evaluate(signal).then((a) => resolve2(exitSucceed(a)), (e) => resolve2(exitDie(e)));
}) : async$1((resolve2) => {
  evaluate().then((a) => resolve2(exitSucceed(a)), (e) => resolve2(exitDie(e)));
});
const EffectTypeId = EffectTypeId$2;
const OP_SEQUENTIAL = "Sequential";
const sequential = {
  _tag: OP_SEQUENTIAL
};
const diff$1 = diff$2;
const patch$1 = patch$2;
const FiberStatusSymbolKey = "effect/FiberStatus";
const FiberStatusTypeId = /* @__PURE__ */ Symbol.for(FiberStatusSymbolKey);
const OP_DONE = "Done";
const OP_RUNNING = "Running";
const OP_SUSPENDED = "Suspended";
const DoneHash = /* @__PURE__ */ string(`${FiberStatusSymbolKey}-${OP_DONE}`);
class Done {
  constructor() {
    __publicField(this, _n, FiberStatusTypeId);
    __publicField(this, "_tag", OP_DONE);
  }
  [(_n = FiberStatusTypeId, symbol$1)]() {
    return DoneHash;
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_DONE;
  }
}
class Running {
  constructor(runtimeFlags) {
    __publicField(this, "runtimeFlags");
    __publicField(this, _o, FiberStatusTypeId);
    __publicField(this, "_tag", OP_RUNNING);
    this.runtimeFlags = runtimeFlags;
  }
  [(_o = FiberStatusTypeId, symbol$1)]() {
    return pipe(hash(FiberStatusSymbolKey), combine$5(hash(this._tag)), combine$5(hash(this.runtimeFlags)), cached(this));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
}
class Suspended {
  constructor(runtimeFlags, blockingOn) {
    __publicField(this, "runtimeFlags");
    __publicField(this, "blockingOn");
    __publicField(this, _p, FiberStatusTypeId);
    __publicField(this, "_tag", OP_SUSPENDED);
    this.runtimeFlags = runtimeFlags;
    this.blockingOn = blockingOn;
  }
  [(_p = FiberStatusTypeId, symbol$1)]() {
    return pipe(hash(FiberStatusSymbolKey), combine$5(hash(this._tag)), combine$5(hash(this.runtimeFlags)), combine$5(hash(this.blockingOn)), cached(this));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && equals$1(this.blockingOn, that.blockingOn);
  }
}
const done$1 = /* @__PURE__ */ new Done();
const running$1 = (runtimeFlags) => new Running(runtimeFlags);
const suspended$1 = (runtimeFlags, blockingOn) => new Suspended(runtimeFlags, blockingOn);
const isFiberStatus = (u) => hasProperty(u, FiberStatusTypeId);
const isDone$1 = (self) => self._tag === OP_DONE;
const done = done$1;
const running = running$1;
const suspended = suspended$1;
const isDone = isDone$1;
class PriorityBuckets {
  constructor() {
    /**
     * @since 2.0.0
     */
    __publicField(this, "buckets", []);
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    let bucket = void 0;
    let index;
    for (index = 0; index < this.buckets.length; index++) {
      if (this.buckets[index][0] <= priority) {
        bucket = this.buckets[index];
      } else {
        break;
      }
    }
    if (bucket) {
      bucket[1].push(task);
    } else {
      const newBuckets = [];
      for (let i = 0; i < index; i++) {
        newBuckets.push(this.buckets[i]);
      }
      newBuckets.push([priority, [task]]);
      for (let i = index; i < this.buckets.length; i++) {
        newBuckets.push(this.buckets[i]);
      }
      this.buckets = newBuckets;
    }
  }
}
class MixedScheduler {
  constructor(maxNextTickBeforeTimer) {
    __publicField(this, "maxNextTickBeforeTimer");
    /**
     * @since 2.0.0
     */
    __publicField(this, "running", false);
    /**
     * @since 2.0.0
     */
    __publicField(this, "tasks", new PriorityBuckets());
    this.maxNextTickBeforeTimer = maxNextTickBeforeTimer;
  }
  /**
   * @since 2.0.0
   */
  starveInternal(depth) {
    const tasks = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [_, toRun] of tasks) {
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    if (this.tasks.buckets.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  /**
   * @since 2.0.0
   */
  starve(depth = 0) {
    if (depth >= this.maxNextTickBeforeTimer) {
      setTimeout(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  /**
   * @since 2.0.0
   */
  shouldYield(fiber) {
    return fiber.currentOpCount > fiber.getFiberRef(currentMaxOpsBeforeYield) ? fiber.getFiberRef(currentSchedulingPriority) : false;
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    this.tasks.scheduleTask(task, priority);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
}
const defaultScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Scheduler/defaultScheduler"), () => new MixedScheduler(2048));
const currentScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentScheduler"), () => fiberRefUnsafeMake(defaultScheduler));
const currentRequestMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestMap"), () => fiberRefUnsafeMake(/* @__PURE__ */ new Map()));
const OP_INTERRUPT_SIGNAL = "InterruptSignal";
const OP_STATEFUL = "Stateful";
const OP_RESUME = "Resume";
const OP_YIELD_NOW = "YieldNow";
const interruptSignal = (cause) => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause
});
const stateful = (onFiber) => ({
  _tag: OP_STATEFUL,
  onFiber
});
const resume = (effect) => ({
  _tag: OP_RESUME,
  effect
});
const yieldNow = () => ({
  _tag: OP_YIELD_NOW
});
const FiberScopeSymbolKey = "effect/FiberScope";
const FiberScopeTypeId = /* @__PURE__ */ Symbol.for(FiberScopeSymbolKey);
class Global {
  constructor() {
    __publicField(this, _q, FiberScopeTypeId);
    __publicField(this, "fiberId", none$4);
    __publicField(this, "roots", /* @__PURE__ */ new Set());
  }
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.addObserver(() => {
      this.roots.delete(child);
    });
  }
}
_q = FiberScopeTypeId;
class Local {
  constructor(fiberId2, parent) {
    __publicField(this, "fiberId");
    __publicField(this, "parent");
    __publicField(this, _r, FiberScopeTypeId);
    this.fiberId = fiberId2;
    this.parent = parent;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(stateful((parentFiber) => {
      parentFiber.addChild(child);
      child.addObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
}
_r = FiberScopeTypeId;
const unsafeMake$1 = (fiber) => {
  return new Local(fiber.id(), fiber);
};
const globalScope = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberScope/Global"), () => new Global());
const FiberSymbolKey = "effect/Fiber";
const FiberTypeId = /* @__PURE__ */ Symbol.for(FiberSymbolKey);
const fiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const RuntimeFiberSymbolKey = "effect/Fiber";
const RuntimeFiberTypeId = /* @__PURE__ */ Symbol.for(RuntimeFiberSymbolKey);
const _await = (self) => self.await;
const inheritAll = (self) => self.inheritAll;
const join = (self) => zipLeft(flatten$1(self.await), self.inheritAll);
const currentFiberURI = "effect/FiberCurrent";
const LoggerSymbolKey = "effect/Logger";
const LoggerTypeId = /* @__PURE__ */ Symbol.for(LoggerSymbolKey);
const loggerVariance = {
  /* c8 ignore next */
  _Message: (_) => _,
  /* c8 ignore next */
  _Output: (_) => _
};
const makeLogger = (log) => ({
  [LoggerTypeId]: loggerVariance,
  log,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const stringLogger = /* @__PURE__ */ makeLogger(({
  annotations,
  cause,
  date,
  fiberId: fiberId2,
  logLevel,
  message,
  spans
}) => {
  const nowMillis = date.getTime();
  const outputArray = [`timestamp=${date.toISOString()}`, `level=${logLevel.label}`, `fiber=${threadName$1(fiberId2)}`];
  let output = outputArray.join(" ");
  if (Array.isArray(message)) {
    for (let i = 0; i < message.length; i++) {
      const stringMessage = toStringUnknown(message[i]);
      if (stringMessage.length > 0) {
        output = output + " message=";
        output = appendQuoted(stringMessage, output);
      }
    }
  } else {
    const stringMessage = toStringUnknown(message);
    if (stringMessage.length > 0) {
      output = output + " message=";
      output = appendQuoted(stringMessage, output);
    }
  }
  if (cause != null && cause._tag !== "Empty") {
    output = output + " cause=";
    output = appendQuoted(pretty(cause), output);
  }
  if (isCons(spans)) {
    output = output + " ";
    let first = true;
    for (const span2 of spans) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + pipe(span2, render(nowMillis));
    }
  }
  if (pipe(annotations, size) > 0) {
    output = output + " ";
    let first = true;
    for (const [key, value] of annotations) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key);
      output = output + "=";
      output = appendQuoted(toStringUnknown(value), output);
    }
  }
  return output;
});
const escapeDoubleQuotes = (str) => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
const textOnly = /^[^\s"=]+$/;
const appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
const filterKeyName = (key) => key.replace(/[\s="]/g, "_");
const MetricBoundariesSymbolKey = "effect/MetricBoundaries";
const MetricBoundariesTypeId = /* @__PURE__ */ Symbol.for(MetricBoundariesSymbolKey);
class MetricBoundariesImpl {
  constructor(values) {
    __publicField(this, "values");
    __publicField(this, _s, MetricBoundariesTypeId);
    __publicField(this, "_hash");
    this.values = values;
    this._hash = pipe(string(MetricBoundariesSymbolKey), combine$5(array(this.values)));
  }
  [(_s = MetricBoundariesTypeId, symbol$1)]() {
    return this._hash;
  }
  [symbol](u) {
    return isMetricBoundaries(u) && equals$1(this.values, u.values);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricBoundaries = (u) => hasProperty(u, MetricBoundariesTypeId);
const fromIterable = (iterable) => {
  const values = pipe(iterable, appendAll$2(of$1(Number.POSITIVE_INFINITY)), dedupe);
  return new MetricBoundariesImpl(values);
};
const exponential = (options) => pipe(makeBy(options.count - 1, (i) => options.start * Math.pow(options.factor, i)), unsafeFromArray, fromIterable);
const MetricKeyTypeSymbolKey = "effect/MetricKeyType";
const MetricKeyTypeTypeId = /* @__PURE__ */ Symbol.for(MetricKeyTypeSymbolKey);
const CounterKeyTypeSymbolKey = "effect/MetricKeyType/Counter";
const CounterKeyTypeTypeId = /* @__PURE__ */ Symbol.for(CounterKeyTypeSymbolKey);
const FrequencyKeyTypeSymbolKey = "effect/MetricKeyType/Frequency";
const FrequencyKeyTypeTypeId = /* @__PURE__ */ Symbol.for(FrequencyKeyTypeSymbolKey);
const GaugeKeyTypeSymbolKey = "effect/MetricKeyType/Gauge";
const GaugeKeyTypeTypeId = /* @__PURE__ */ Symbol.for(GaugeKeyTypeSymbolKey);
const HistogramKeyTypeSymbolKey = "effect/MetricKeyType/Histogram";
const HistogramKeyTypeTypeId = /* @__PURE__ */ Symbol.for(HistogramKeyTypeSymbolKey);
const SummaryKeyTypeSymbolKey = "effect/MetricKeyType/Summary";
const SummaryKeyTypeTypeId = /* @__PURE__ */ Symbol.for(SummaryKeyTypeSymbolKey);
const metricKeyTypeVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
class CounterKeyType {
  constructor(incremental, bigint) {
    __publicField(this, "incremental");
    __publicField(this, "bigint");
    __publicField(this, _t, metricKeyTypeVariance);
    __publicField(this, _u, CounterKeyTypeTypeId);
    __publicField(this, "_hash");
    this.incremental = incremental;
    this.bigint = bigint;
    this._hash = string(CounterKeyTypeSymbolKey);
  }
  [(_t = MetricKeyTypeTypeId, _u = CounterKeyTypeTypeId, symbol$1)]() {
    return this._hash;
  }
  [symbol](that) {
    return isCounterKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramKeyType {
  constructor(boundaries) {
    __publicField(this, "boundaries");
    __publicField(this, _v, metricKeyTypeVariance);
    __publicField(this, _w, HistogramKeyTypeTypeId);
    __publicField(this, "_hash");
    this.boundaries = boundaries;
    this._hash = pipe(string(HistogramKeyTypeSymbolKey), combine$5(hash(this.boundaries)));
  }
  [(_v = MetricKeyTypeTypeId, _w = HistogramKeyTypeTypeId, symbol$1)]() {
    return this._hash;
  }
  [symbol](that) {
    return isHistogramKey(that) && equals$1(this.boundaries, that.boundaries);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$4 = (options) => new CounterKeyType((options == null ? void 0 : options.incremental) ?? false, (options == null ? void 0 : options.bigint) ?? false);
const histogram$4 = (boundaries) => {
  return new HistogramKeyType(boundaries);
};
const isCounterKey = (u) => hasProperty(u, CounterKeyTypeTypeId);
const isFrequencyKey = (u) => hasProperty(u, FrequencyKeyTypeTypeId);
const isGaugeKey = (u) => hasProperty(u, GaugeKeyTypeTypeId);
const isHistogramKey = (u) => hasProperty(u, HistogramKeyTypeTypeId);
const isSummaryKey = (u) => hasProperty(u, SummaryKeyTypeTypeId);
const MetricKeySymbolKey = "effect/MetricKey";
const MetricKeyTypeId = /* @__PURE__ */ Symbol.for(MetricKeySymbolKey);
const metricKeyVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
const arrayEquivilence = /* @__PURE__ */ getEquivalence$2(equals$1);
class MetricKeyImpl {
  constructor(name, keyType, description, tags = []) {
    __publicField(this, "name");
    __publicField(this, "keyType");
    __publicField(this, "description");
    __publicField(this, "tags");
    __publicField(this, _x, metricKeyVariance);
    __publicField(this, "_hash");
    this.name = name;
    this.keyType = keyType;
    this.description = description;
    this.tags = tags;
    this._hash = pipe(string(this.name + this.description), combine$5(hash(this.keyType)), combine$5(array(this.tags)));
  }
  [(_x = MetricKeyTypeId, symbol$1)]() {
    return this._hash;
  }
  [symbol](u) {
    return isMetricKey(u) && this.name === u.name && equals$1(this.keyType, u.keyType) && equals$1(this.description, u.description) && arrayEquivilence(this.tags, u.tags);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricKey = (u) => hasProperty(u, MetricKeyTypeId);
const counter$3 = (name, options) => new MetricKeyImpl(name, counter$4(options), fromNullable(options == null ? void 0 : options.description));
const histogram$3 = (name, boundaries, description) => new MetricKeyImpl(name, histogram$4(boundaries), fromNullable(description));
const taggedWithLabels$1 = /* @__PURE__ */ dual(2, (self, extraTags) => extraTags.length === 0 ? self : new MetricKeyImpl(self.name, self.keyType, self.description, union$2(self.tags, extraTags)));
const MetricStateSymbolKey = "effect/MetricState";
const MetricStateTypeId = /* @__PURE__ */ Symbol.for(MetricStateSymbolKey);
const CounterStateSymbolKey = "effect/MetricState/Counter";
const CounterStateTypeId = /* @__PURE__ */ Symbol.for(CounterStateSymbolKey);
const FrequencyStateSymbolKey = "effect/MetricState/Frequency";
const FrequencyStateTypeId = /* @__PURE__ */ Symbol.for(FrequencyStateSymbolKey);
const GaugeStateSymbolKey = "effect/MetricState/Gauge";
const GaugeStateTypeId = /* @__PURE__ */ Symbol.for(GaugeStateSymbolKey);
const HistogramStateSymbolKey = "effect/MetricState/Histogram";
const HistogramStateTypeId = /* @__PURE__ */ Symbol.for(HistogramStateSymbolKey);
const SummaryStateSymbolKey = "effect/MetricState/Summary";
const SummaryStateTypeId = /* @__PURE__ */ Symbol.for(SummaryStateSymbolKey);
const metricStateVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
class CounterState {
  constructor(count) {
    __publicField(this, "count");
    __publicField(this, _y, metricStateVariance);
    __publicField(this, _z, CounterStateTypeId);
    this.count = count;
  }
  [(_y = MetricStateTypeId, _z = CounterStateTypeId, symbol$1)]() {
    return pipe(hash(CounterStateSymbolKey), combine$5(hash(this.count)), cached(this));
  }
  [symbol](that) {
    return isCounterState(that) && this.count === that.count;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const arrayEquals = /* @__PURE__ */ getEquivalence$2(equals$1);
class FrequencyState {
  constructor(occurrences) {
    __publicField(this, "occurrences");
    __publicField(this, _A, metricStateVariance);
    __publicField(this, _B, FrequencyStateTypeId);
    __publicField(this, "_hash");
    this.occurrences = occurrences;
  }
  [(_A = MetricStateTypeId, _B = FrequencyStateTypeId, symbol$1)]() {
    return pipe(string(FrequencyStateSymbolKey), combine$5(array(fromIterable$6(this.occurrences.entries()))), cached(this));
  }
  [symbol](that) {
    return isFrequencyState(that) && arrayEquals(fromIterable$6(this.occurrences.entries()), fromIterable$6(that.occurrences.entries()));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class GaugeState {
  constructor(value) {
    __publicField(this, "value");
    __publicField(this, _C, metricStateVariance);
    __publicField(this, _D, GaugeStateTypeId);
    this.value = value;
  }
  [(_C = MetricStateTypeId, _D = GaugeStateTypeId, symbol$1)]() {
    return pipe(hash(GaugeStateSymbolKey), combine$5(hash(this.value)), cached(this));
  }
  [symbol](u) {
    return isGaugeState(u) && this.value === u.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramState {
  constructor(buckets, count, min, max, sum) {
    __publicField(this, "buckets");
    __publicField(this, "count");
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "sum");
    __publicField(this, _E, metricStateVariance);
    __publicField(this, _F, HistogramStateTypeId);
    this.buckets = buckets;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
  }
  [(_E = MetricStateTypeId, _F = HistogramStateTypeId, symbol$1)]() {
    return pipe(hash(HistogramStateSymbolKey), combine$5(hash(this.buckets)), combine$5(hash(this.count)), combine$5(hash(this.min)), combine$5(hash(this.max)), combine$5(hash(this.sum)), cached(this));
  }
  [symbol](that) {
    return isHistogramState(that) && equals$1(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class SummaryState {
  constructor(error, quantiles, count, min, max, sum) {
    __publicField(this, "error");
    __publicField(this, "quantiles");
    __publicField(this, "count");
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "sum");
    __publicField(this, _G, metricStateVariance);
    __publicField(this, _H, SummaryStateTypeId);
    this.error = error;
    this.quantiles = quantiles;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
  }
  [(_G = MetricStateTypeId, _H = SummaryStateTypeId, symbol$1)]() {
    return pipe(hash(SummaryStateSymbolKey), combine$5(hash(this.error)), combine$5(hash(this.quantiles)), combine$5(hash(this.count)), combine$5(hash(this.min)), combine$5(hash(this.max)), combine$5(hash(this.sum)), cached(this));
  }
  [symbol](that) {
    return isSummaryState(that) && this.error === that.error && equals$1(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$2 = (count) => new CounterState(count);
const frequency$1 = (occurrences) => {
  return new FrequencyState(occurrences);
};
const gauge$1 = (count) => new GaugeState(count);
const histogram$2 = (options) => new HistogramState(options.buckets, options.count, options.min, options.max, options.sum);
const summary$1 = (options) => new SummaryState(options.error, options.quantiles, options.count, options.min, options.max, options.sum);
const isCounterState = (u) => hasProperty(u, CounterStateTypeId);
const isFrequencyState = (u) => hasProperty(u, FrequencyStateTypeId);
const isGaugeState = (u) => hasProperty(u, GaugeStateTypeId);
const isHistogramState = (u) => hasProperty(u, HistogramStateTypeId);
const isSummaryState = (u) => hasProperty(u, SummaryStateTypeId);
const MetricHookSymbolKey = "effect/MetricHook";
const MetricHookTypeId = /* @__PURE__ */ Symbol.for(MetricHookSymbolKey);
const metricHookVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
const make$4 = (options) => ({
  [MetricHookTypeId]: metricHookVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
const bigint0 = /* @__PURE__ */ BigInt(0);
const counter$1 = (key) => {
  let sum = key.keyType.bigint ? bigint0 : 0;
  const canUpdate = key.keyType.incremental ? key.keyType.bigint ? (value) => value >= bigint0 : (value) => value >= 0 : (_value2) => true;
  return make$4({
    get: () => counter$2(sum),
    update: (value) => {
      if (canUpdate(value)) {
        sum = sum + value;
      }
    }
  });
};
const frequency = (key) => {
  const values = /* @__PURE__ */ new Map();
  for (const word of key.keyType.preregisteredWords) {
    values.set(word, 0);
  }
  const update2 = (word) => {
    const slotCount = values.get(word) ?? 0;
    values.set(word, slotCount + 1);
  };
  return make$4({
    get: () => frequency$1(values),
    update: update2
  });
};
const gauge = (_key, startAt) => {
  let value = startAt;
  return make$4({
    get: () => gauge$1(value),
    update: (v) => {
      value = v;
    }
  });
};
const histogram$1 = (key) => {
  const bounds = key.keyType.boundaries.values;
  const size2 = bounds.length;
  const values = new Uint32Array(size2 + 1);
  const boundaries = new Float32Array(size2);
  let count = 0;
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  pipe(bounds, sort(Order$1), map$3((n, i) => {
    boundaries[i] = n;
  }));
  const update2 = (value) => {
    let from = 0;
    let to = size2;
    while (from !== to) {
      const mid = Math.floor(from + (to - from) / 2);
      const boundary = boundaries[mid];
      if (value <= boundary) {
        to = mid;
      } else {
        from = mid;
      }
      if (to === from + 1) {
        if (value <= boundaries[from]) {
          to = from;
        } else {
          from = to;
        }
      }
    }
    values[from] = values[from] + 1;
    count = count + 1;
    sum = sum + value;
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  };
  const getBuckets = () => {
    const builder = allocate(size2);
    let cumulated = 0;
    for (let i = 0; i < size2; i++) {
      const boundary = boundaries[i];
      const value = values[i];
      cumulated = cumulated + value;
      builder[i] = [boundary, cumulated];
    }
    return builder;
  };
  return make$4({
    get: () => histogram$2({
      buckets: getBuckets(),
      count,
      min,
      max,
      sum
    }),
    update: update2
  });
};
const summary = (key) => {
  const {
    error,
    maxAge,
    maxSize,
    quantiles
  } = key.keyType;
  const sortedQuantiles = pipe(quantiles, sort(Order$1));
  const values = allocate(maxSize);
  let head2 = 0;
  let count = 0;
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  const snapshot = (now) => {
    const builder = [];
    let i = 0;
    while (i !== maxSize - 1) {
      const item = values[i];
      if (item != null) {
        const [t, v] = item;
        const age = millis(now - t);
        if (greaterThanOrEqualTo(age, zero) && age <= maxAge) {
          builder.push(v);
        }
      }
      i = i + 1;
    }
    return calculateQuantiles(error, sortedQuantiles, sort(builder, Order$1));
  };
  const observe = (value, timestamp) => {
    if (maxSize > 0) {
      head2 = head2 + 1;
      const target = head2 % maxSize;
      values[target] = [timestamp, value];
    }
    count = count + 1;
    sum = sum + value;
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  };
  return make$4({
    get: () => summary$1({
      error,
      quantiles: snapshot(Date.now()),
      count,
      min,
      max,
      sum
    }),
    update: ([value, timestamp]) => observe(value, timestamp)
  });
};
const calculateQuantiles = (error, sortedQuantiles, sortedSamples) => {
  const sampleCount = sortedSamples.length;
  if (!isNonEmptyReadonlyArray(sortedQuantiles)) {
    return empty$j();
  }
  const head2 = sortedQuantiles[0];
  const tail = sortedQuantiles.slice(1);
  const resolvedHead = resolveQuantile(error, sampleCount, none$6(), 0, head2, sortedSamples);
  const resolved = of$2(resolvedHead);
  tail.forEach((quantile) => {
    resolved.push(resolveQuantile(error, sampleCount, resolvedHead.value, resolvedHead.consumed, quantile, resolvedHead.rest));
  });
  return map$3(resolved, (rq) => [rq.quantile, rq.value]);
};
const resolveQuantile = (error, sampleCount, current, consumed, quantile, rest) => {
  let error_1 = error;
  let sampleCount_1 = sampleCount;
  let current_1 = current;
  let consumed_1 = consumed;
  let quantile_1 = quantile;
  let rest_1 = rest;
  let error_2 = error;
  let sampleCount_2 = sampleCount;
  let current_2 = current;
  let consumed_2 = consumed;
  let quantile_2 = quantile;
  let rest_2 = rest;
  while (1) {
    if (!isNonEmptyReadonlyArray(rest_1)) {
      return {
        quantile: quantile_1,
        value: none$6(),
        consumed: consumed_1,
        rest: []
      };
    }
    if (quantile_1 === 1) {
      return {
        quantile: quantile_1,
        value: some$2(lastNonEmpty(rest_1)),
        consumed: consumed_1 + rest_1.length,
        rest: []
      };
    }
    const sameHead = span(rest_1, (n) => n <= rest_1[0]);
    const desired = quantile_1 * sampleCount_1;
    const allowedError = error_1 / 2 * desired;
    const candConsumed = consumed_1 + sameHead[0].length;
    const candError = Math.abs(candConsumed - desired);
    if (candConsumed < desired - allowedError) {
      error_2 = error_1;
      sampleCount_2 = sampleCount_1;
      current_2 = head(rest_1);
      consumed_2 = candConsumed;
      quantile_2 = quantile_1;
      rest_2 = sameHead[1];
      error_1 = error_2;
      sampleCount_1 = sampleCount_2;
      current_1 = current_2;
      consumed_1 = consumed_2;
      quantile_1 = quantile_2;
      rest_1 = rest_2;
      continue;
    }
    if (candConsumed > desired + allowedError) {
      return {
        quantile: quantile_1,
        value: current_1,
        consumed: consumed_1,
        rest: rest_1
      };
    }
    switch (current_1._tag) {
      case "None": {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead[1];
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      case "Some": {
        const prevError = Math.abs(desired - current_1.value);
        if (candError < prevError) {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead[1];
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        return {
          quantile: quantile_1,
          value: some$2(current_1.value),
          consumed: consumed_1,
          rest: rest_1
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const MetricPairSymbolKey = "effect/MetricPair";
const MetricPairTypeId = /* @__PURE__ */ Symbol.for(MetricPairSymbolKey);
const metricPairVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
const unsafeMake = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState,
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
};
const MetricRegistrySymbolKey = "effect/MetricRegistry";
const MetricRegistryTypeId = /* @__PURE__ */ Symbol.for(MetricRegistrySymbolKey);
class MetricRegistryImpl {
  constructor() {
    __publicField(this, _I, MetricRegistryTypeId);
    __publicField(this, "map", empty$5());
  }
  snapshot() {
    const result = [];
    for (const [key, hook] of this.map) {
      result.push(unsafeMake(key, hook.get()));
    }
    return result;
  }
  get(key) {
    const hook = pipe(this.map, get$1(key), getOrUndefined);
    if (hook == null) {
      if (isCounterKey(key.keyType)) {
        return this.getCounter(key);
      }
      if (isGaugeKey(key.keyType)) {
        return this.getGauge(key);
      }
      if (isFrequencyKey(key.keyType)) {
        return this.getFrequency(key);
      }
      if (isHistogramKey(key.keyType)) {
        return this.getHistogram(key);
      }
      if (isSummaryKey(key.keyType)) {
        return this.getSummary(key);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/effect/issues");
    } else {
      return hook;
    }
  }
  getCounter(key) {
    let value = pipe(this.map, get$1(key), getOrUndefined);
    if (value == null) {
      const counter2 = counter$1(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, counter2));
      }
      value = counter2;
    }
    return value;
  }
  getFrequency(key) {
    let value = pipe(this.map, get$1(key), getOrUndefined);
    if (value == null) {
      const frequency$12 = frequency(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, frequency$12));
      }
      value = frequency$12;
    }
    return value;
  }
  getGauge(key) {
    let value = pipe(this.map, get$1(key), getOrUndefined);
    if (value == null) {
      const gauge$12 = gauge(key, key.keyType.bigint ? BigInt(0) : 0);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, gauge$12));
      }
      value = gauge$12;
    }
    return value;
  }
  getHistogram(key) {
    let value = pipe(this.map, get$1(key), getOrUndefined);
    if (value == null) {
      const histogram2 = histogram$1(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, histogram2));
      }
      value = histogram2;
    }
    return value;
  }
  getSummary(key) {
    let value = pipe(this.map, get$1(key), getOrUndefined);
    if (value == null) {
      const summary$12 = summary(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, summary$12));
      }
      value = summary$12;
    }
    return value;
  }
}
_I = MetricRegistryTypeId;
const make$3 = () => {
  return new MetricRegistryImpl();
};
const MetricSymbolKey = "effect/Metric";
const MetricTypeId = /* @__PURE__ */ Symbol.for(MetricSymbolKey);
const metricVariance = {
  /* c8 ignore next */
  _Type: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
const globalMetricRegistry = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Metric/globalMetricRegistry"), () => make$3());
const make$2 = function(keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign((effect) => tap(effect, (a) => update(metric, a)), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue,
    register() {
      this.unsafeValue([]);
      return this;
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  });
  return metric;
};
const counter = (name, options) => fromMetricKey(counter$3(name, options));
const fromMetricKey = (key) => {
  let untaggedHook;
  const hookCache = /* @__PURE__ */ new WeakMap();
  const hook = (extraTags) => {
    if (extraTags.length === 0) {
      if (untaggedHook !== void 0) {
        return untaggedHook;
      }
      untaggedHook = globalMetricRegistry.get(key);
      return untaggedHook;
    }
    let hook2 = hookCache.get(extraTags);
    if (hook2 !== void 0) {
      return hook2;
    }
    hook2 = globalMetricRegistry.get(taggedWithLabels$1(key, extraTags));
    hookCache.set(extraTags, hook2);
    return hook2;
  };
  return make$2(key.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get());
};
const histogram = (name, boundaries, description) => fromMetricKey(histogram$3(name, boundaries, description));
const tagged = /* @__PURE__ */ dual(3, (self, key, value) => taggedWithLabels(self, [make$5(key, value)]));
const taggedWithLabels = /* @__PURE__ */ dual(2, (self, extraTags) => {
  return make$2(self.keyType, (input, extraTags1) => self.unsafeUpdate(input, union$2(extraTags, extraTags1)), (extraTags1) => self.unsafeValue(union$2(extraTags, extraTags1)));
});
const update = /* @__PURE__ */ dual(2, (self, input) => fiberRefGetWith(currentMetricLabels, (tags) => sync(() => self.unsafeUpdate(input, tags))));
const RequestSymbolKey = "effect/Request";
const RequestTypeId = /* @__PURE__ */ Symbol.for(RequestSymbolKey);
const requestVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
({
  ...StructuralPrototype,
  [RequestTypeId]: requestVariance
});
const complete = /* @__PURE__ */ dual(2, (self, result) => fiberRefGetWith(currentRequestMap, (map2) => sync(() => {
  if (map2.has(self)) {
    const entry = map2.get(self);
    if (!entry.state.completed) {
      entry.state.completed = true;
      deferredUnsafeDone(entry.result, result);
    }
  }
})));
const SupervisorSymbolKey = "effect/Supervisor";
const SupervisorTypeId = /* @__PURE__ */ Symbol.for(SupervisorSymbolKey);
const supervisorVariance = {
  /* c8 ignore next */
  _T: (_) => _
};
const _ProxySupervisor = class _ProxySupervisor {
  constructor(underlying, value0) {
    __publicField(this, "underlying");
    __publicField(this, "value0");
    __publicField(this, _J, supervisorVariance);
    this.underlying = underlying;
    this.value0 = value0;
  }
  get value() {
    return this.value0;
  }
  onStart(context, effect, parent, fiber) {
    this.underlying.onStart(context, effect, parent, fiber);
  }
  onEnd(value, fiber) {
    this.underlying.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.underlying.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new _ProxySupervisor(this, pipe(this.value, map(f)));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
};
_J = SupervisorTypeId;
let ProxySupervisor = _ProxySupervisor;
const _Zip = class _Zip {
  constructor(left2, right2) {
    __publicField(this, "left");
    __publicField(this, "right");
    __publicField(this, "_tag", "Zip");
    __publicField(this, _K, supervisorVariance);
    this.left = left2;
    this.right = right2;
  }
  get value() {
    return zip(this.left.value, this.right.value);
  }
  onStart(context, effect, parent, fiber) {
    this.left.onStart(context, effect, parent, fiber);
    this.right.onStart(context, effect, parent, fiber);
  }
  onEnd(value, fiber) {
    this.left.onEnd(value, fiber);
    this.right.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.left.onEffect(fiber, effect);
    this.right.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map(f)));
  }
  zip(right2) {
    return new _Zip(this, right2);
  }
};
_K = SupervisorTypeId;
let Zip = _Zip;
const isZip = (self) => hasProperty(self, SupervisorTypeId) && isTagged(self, "Zip");
class Const {
  constructor(effect) {
    __publicField(this, "effect");
    __publicField(this, _L, supervisorVariance);
    this.effect = effect;
  }
  get value() {
    return this.effect;
  }
  onStart(_context, _effect, _parent, _fiber) {
  }
  onEnd(_value2, _fiber) {
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map(f)));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
  onRun(execution, _fiber) {
    return execution();
  }
}
_L = SupervisorTypeId;
const fromEffect = (effect) => {
  return new Const(effect);
};
const none$2 = /* @__PURE__ */ globalValue("effect/Supervisor/none", () => fromEffect(void_));
const make$1 = make$f;
const OP_EMPTY = "Empty";
const OP_ADD_SUPERVISOR = "AddSupervisor";
const OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
const OP_AND_THEN = "AndThen";
const empty = {
  _tag: OP_EMPTY
};
const combine = (self, that) => {
  return {
    _tag: OP_AND_THEN,
    first: self,
    second: that
  };
};
const patch = (self, supervisor) => {
  return patchLoop(supervisor, of$1(self));
};
const patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    switch (head2._tag) {
      case OP_EMPTY: {
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_ADD_SUPERVISOR: {
        supervisor = supervisor.zip(head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_REMOVE_SUPERVISOR: {
        supervisor = removeSupervisor(supervisor, head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_AND_THEN: {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tailNonEmpty(patches)));
        break;
      }
    }
  }
  return supervisor;
};
const removeSupervisor = (self, that) => {
  if (equals$1(self, that)) {
    return none$2;
  } else {
    if (isZip(self)) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
const toSet = (self) => {
  if (equals$1(self, none$2)) {
    return empty$d();
  } else {
    if (isZip(self)) {
      return pipe(toSet(self.left), union(toSet(self.right)));
    } else {
      return make$h(self);
    }
  }
};
const diff = (oldValue, newValue) => {
  if (equals$1(oldValue, newValue)) {
    return empty;
  }
  const oldSupervisors = toSet(oldValue);
  const newSupervisors = toSet(newValue);
  const added = pipe(newSupervisors, difference(oldSupervisors), reduce$3(empty, (patch2, supervisor) => combine(patch2, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  })));
  const removed = pipe(oldSupervisors, difference(newSupervisors), reduce$3(empty, (patch2, supervisor) => combine(patch2, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  })));
  return combine(added, removed);
};
const differ = /* @__PURE__ */ make$1({
  empty,
  patch,
  combine,
  diff
});
const fiberStarted = /* @__PURE__ */ counter("effect_fiber_started", {
  incremental: true
});
const fiberActive = /* @__PURE__ */ counter("effect_fiber_active");
const fiberSuccesses = /* @__PURE__ */ counter("effect_fiber_successes", {
  incremental: true
});
const fiberFailures = /* @__PURE__ */ counter("effect_fiber_failures", {
  incremental: true
});
const fiberLifetimes = /* @__PURE__ */ tagged(/* @__PURE__ */ histogram("effect_fiber_lifetimes", /* @__PURE__ */ exponential({
  start: 0.5,
  factor: 2,
  count: 35
})), "time_unit", "milliseconds");
const EvaluationSignalContinue = "Continue";
const EvaluationSignalDone = "Done";
const EvaluationSignalYieldNow = "Yield";
const runtimeFiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const absurd = (_) => {
  throw new Error(`BUG: FiberRuntime - ${toStringUnknown(_)} - please report an issue at https://github.com/Effect-TS/effect/issues`);
};
const YieldedOp = /* @__PURE__ */ Symbol.for("effect/internal/fiberRuntime/YieldedOp");
const yieldedOpChannel = /* @__PURE__ */ globalValue("effect/internal/fiberRuntime/yieldedOpChannel", () => ({
  currentOp: null
}));
const contOpSuccess = {
  [OP_ON_SUCCESS]: (_, cont, value) => {
    return cont.effect_instruction_i1(value);
  },
  ["OnStep"]: (_, _cont, value) => {
    return exitSucceed(exitSucceed(value));
  },
  [OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value) => {
    return cont.effect_instruction_i2(value);
  },
  [OP_REVERT_FLAGS]: (self, cont, value) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch);
    if (interruptible$1(self._runtimeFlags) && self.isInterrupted()) {
      return exitFailCause(self.getInterruptedCause());
    } else {
      return exitSucceed(value);
    }
  },
  [OP_WHILE]: (self, cont, value) => {
    cont.effect_instruction_i2(value);
    if (cont.effect_instruction_i0()) {
      self.pushStack(cont);
      return cont.effect_instruction_i1();
    } else {
      return void_;
    }
  }
};
const drainQueueWhileRunningTable = {
  [OP_INTERRUPT_SIGNAL]: (self, runtimeFlags, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return interruptible$1(runtimeFlags) ? exitFailCause(message.cause) : cur;
  },
  [OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [OP_STATEFUL]: (self, runtimeFlags, cur, message) => {
    message.onFiber(self, running(runtimeFlags));
    return cur;
  },
  [OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return flatMap$1(yieldNow$1(), () => cur);
  }
};
const runBlockedRequests = (self) => forEachSequentialDiscard(flatten$2(self), (requestsByRequestResolver) => forEachConcurrentDiscard(sequentialCollectionToChunk(requestsByRequestResolver), ([dataSource, sequential2]) => {
  const map2 = /* @__PURE__ */ new Map();
  const arr = [];
  for (const block of sequential2) {
    arr.push(toReadonlyArray(block));
    for (const entry of block) {
      map2.set(entry.request, entry);
    }
  }
  const flat = arr.flat();
  return fiberRefLocally(invokeWithInterrupt(dataSource.runAll(arr), flat, () => flat.forEach((entry) => {
    entry.listeners.interrupted = true;
  })), currentRequestMap, map2);
}, false, false));
class FiberRuntime {
  constructor(fiberId2, fiberRefs0, runtimeFlags0) {
    __publicField(this, _M, fiberVariance);
    __publicField(this, _N, runtimeFiberVariance);
    __publicField(this, "_fiberRefs");
    __publicField(this, "_fiberId");
    __publicField(this, "_runtimeFlags");
    __publicField(this, "_queue", new Array());
    __publicField(this, "_children", null);
    __publicField(this, "_observers", new Array());
    __publicField(this, "_running", false);
    __publicField(this, "_stack", []);
    __publicField(this, "_asyncInterruptor", null);
    __publicField(this, "_asyncBlockingOn", null);
    __publicField(this, "_exitValue", null);
    __publicField(this, "_steps", []);
    __publicField(this, "_supervisor");
    __publicField(this, "_scheduler");
    __publicField(this, "_tracer");
    __publicField(this, "currentOpCount", 0);
    __publicField(this, "isYielding", false);
    __publicField(this, "run", () => {
      this.drainQueueOnCurrentThread();
    });
    this._runtimeFlags = runtimeFlags0;
    this._fiberId = fiberId2;
    this._fiberRefs = fiberRefs0;
    this._supervisor = this.getFiberRef(currentSupervisor);
    this._scheduler = this.getFiberRef(currentScheduler);
    if (runtimeMetrics(runtimeFlags0)) {
      const tags = this.getFiberRef(currentMetricLabels);
      fiberStarted.unsafeUpdate(1, tags);
      fiberActive.unsafeUpdate(1, tags);
    }
    this._tracer = get$5(this.getFiberRef(currentServices), tracerTag);
  }
  pipe() {
    return pipeArguments(this, arguments);
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
  resume(effect) {
    this.tell(resume(effect));
  }
  /**
   * The status of the fiber.
   */
  get status() {
    return this.ask((_, status) => status);
  }
  /**
   * Gets the fiber runtime flags.
   */
  get runtimeFlags() {
    return this.ask((state, status) => {
      if (isDone(status)) {
        return state._runtimeFlags;
      }
      return status.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return unsafeMake$1(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  get children() {
    return this.ask((fiber) => Array.from(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = /* @__PURE__ */ new Set();
    }
    return this._children;
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
    return this.getFiberRef(currentInterruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((fiber) => fiber.getFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return suspend(() => {
      const deferred = deferredUnsafeMake(this._fiberId);
      this.tell(stateful((fiber, status) => {
        deferredUnsafeDone(deferred, sync(() => f(fiber, status)));
      }));
      return deferredAwait(deferred);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    this._queue.push(message);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  get await() {
    return async$1((resume2) => {
      const cb = (exit2) => resume2(succeed(exit2));
      this.tell(stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.addObserver(cb);
        }
      }));
      return sync(() => this.tell(stateful((fiber, _) => {
        fiber.removeObserver(cb);
      })));
    }, this.id());
  }
  get inheritAll() {
    return withFiberRuntime((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.getFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.getFiberRefs();
      const updatedFiberRefs = joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch2 = pipe(
        diff$3(parentRuntimeFlags, updatedRuntimeFlags),
        // Do not inherit WindDown or Interruption!
        exclude(Interruption),
        exclude(WindDown)
      );
      return updateRuntimeFlags(patch2);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  get poll() {
    return sync(() => fromNullable(this._exitValue));
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
  interruptAsFork(fiberId2) {
    return sync(() => this.tell(interruptSignal(interrupt(fiberId2))));
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  unsafeInterruptAsFork(fiberId2) {
    this.tell(interruptSignal(interrupt(fiberId2)));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeObserver(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    if (this._fiberRefs.locals.has(fiberRef)) {
      return this._fiberRefs.locals.get(fiberRef)[0][1];
    }
    return fiberRef.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value) {
    this._fiberRefs = updateAs(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef,
      value
    });
    this.refreshRefCache();
  }
  refreshRefCache() {
    this._tracer = get$5(this.getFiberRef(currentServices), tracerTag);
    this._supervisor = this.getFiberRef(currentSupervisor);
    this._scheduler = this.getFiberRef(currentScheduler);
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs) {
    this._fiberRefs = fiberRefs;
    this.refreshRefCache();
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = this._queue.length === 0 ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
        }
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
      }
      if (this._queue.length > 0 && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
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
    this._scheduler.scheduleTask(this.run, this.getFiberRef(currentSchedulingPriority));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags, cur0) {
    let cur = cur0;
    while (this._queue.length > 0) {
      const message = this._queue.splice(0, 1)[0];
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !isEmpty(this.getFiberRef(currentInterruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause) {
    const oldSC = this.getFiberRef(currentInterruptedCause);
    this.setFiberRef(currentInterruptedCause, sequential$1(oldSC, cause));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause) {
    this.addInterruptedCause(cause);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(interruptSignal(interrupt(this.id())));
      told = true;
    }
    return told;
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
      const it = this._children.values();
      this._children = null;
      let isDone2 = false;
      const body = () => {
        const next = it.next();
        if (!next.done) {
          return asVoid(next.value.await);
        } else {
          return sync(() => {
            isDone2 = true;
          });
        }
      };
      return whileLoop({
        while: () => !isDone2,
        body,
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(exit2) {
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(currentMetricLabels);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = Date.now();
      fiberLifetimes.unsafeUpdate(endTimeMillis - startTimeMillis, tags);
      fiberActive.unsafeUpdate(-1, tags);
      switch (exit2._tag) {
        case OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags);
          break;
        }
        case OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags);
          break;
        }
      }
    }
    if (exit2._tag === "Failure") {
      const level = this.getFiberRef(currentUnhandledErrorLogLevel);
      if (!isInterruptedOnly(exit2.cause) && level._tag === "Some") {
        this.log("Fiber terminated with an unhandled error", exit2.cause, level);
      }
    }
  }
  setExitValue(exit2) {
    this._exitValue = exit2;
    this.reportExitValue(exit2);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit2);
    }
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause, overrideLogLevel) {
    const logLevel = isSome(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(currentLogLevel);
    const minimumLogLevel = this.getFiberRef(currentMinimumLogLevel);
    if (greaterThan(minimumLogLevel, logLevel)) {
      return;
    }
    const spans = this.getFiberRef(currentLogSpan);
    const annotations = this.getFiberRef(currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.getFiberRefs();
    if (size$1(loggers) > 0) {
      const clockService = get$5(this.getFiberRef(currentServices), clockTag);
      const date = new Date(clockService.unsafeCurrentTimeMillis());
      for (const logger of loggers) {
        logger.log({
          fiberId: this.id(),
          logLevel,
          message,
          cause,
          context: contextMap,
          spans,
          annotations,
          date
        });
      }
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case OP_YIELD_NOW: {
        return EvaluationSignalYieldNow;
      }
      case OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause);
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(exitFailCause(message.cause));
          this._asyncInterruptor = null;
        }
        return EvaluationSignalContinue;
      }
      case OP_RESUME: {
        this._asyncInterruptor = null;
        this._asyncBlockingOn = null;
        this.evaluateEffect(message.effect);
        return EvaluationSignalContinue;
      }
      case OP_STATEFUL: {
        message.onFiber(this, this._exitValue !== null ? done : suspended(this._runtimeFlags, this._asyncBlockingOn));
        return EvaluationSignalContinue;
      }
      default: {
        return absurd(message);
      }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this._supervisor.onResume(this);
    try {
      let effect = interruptible$1(this._runtimeFlags) && this.isInterrupted() ? exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect !== null) {
        const eff = effect;
        const exit2 = this.runLoop(eff);
        if (exit2 === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          yieldedOpChannel.currentOp = null;
          if (op._op === OP_YIELD) {
            if (cooperativeYielding(this._runtimeFlags)) {
              this.tell(yieldNow());
              this.tell(resume(exitVoid));
              effect = null;
            } else {
              effect = exitVoid;
            }
          } else if (op._op === OP_ASYNC) {
            effect = null;
          }
        } else {
          this._runtimeFlags = pipe(this._runtimeFlags, enable$1(WindDown));
          const interruption2 = this.interruptAllChildren();
          if (interruption2 !== null) {
            effect = flatMap$1(interruption2, () => exit2);
          } else {
            if (this._queue.length === 0) {
              this.setExitValue(exit2);
            } else {
              this.tell(resume(exit2));
            }
            effect = null;
          }
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
  start(effect) {
    if (!this._running) {
      this._running = true;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        this.evaluateEffect(effect);
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
        if (this._queue.length > 0) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(resume(effect));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect) {
    this.tell(resume(effect));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch2) {
    const newRuntimeFlags = patch$4(oldRuntimeFlags, patch2);
    globalThis[currentFiberURI] = this;
    this._runtimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags, asyncRegister) {
    let alreadyCalled = false;
    const callback = (effect) => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(resume(effect));
      }
    };
    if (interruptible$1(runtimeFlags)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(failCause(die$1(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if (cont._op === "OnStep") {
      this._steps.push({
        refs: this.getFiberRefs(),
        flags: this._runtimeFlags
      });
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if (item._op === "OnStep") {
        this._steps.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_FAILURE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_SUCCESS && frame._op !== OP_WHILE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [(_M = FiberTypeId, _N = RuntimeFiberTypeId, OP_TAG)](op) {
    return map(fiberRefGet(currentContext), (context) => unsafeGet$1(context, op));
  }
  ["Left"](op) {
    return fail(op.left);
  }
  ["None"](_) {
    return fail(new NoSuchElementException());
  }
  ["Right"](op) {
    return exitSucceed(op.right);
  }
  ["Some"](op) {
    return exitSucceed(op.value);
  }
  [OP_SYNC](op) {
    const value = op.effect_instruction_i0();
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, value);
    } else {
      yieldedOpChannel.currentOp = exitSucceed(value);
      return YieldedOp;
    }
  }
  [OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, oldCur.effect_instruction_i0);
    } else {
      yieldedOpChannel.currentOp = oldCur;
      return YieldedOp;
    }
  }
  [OP_FAILURE](op) {
    const cause = op.effect_instruction_i0;
    const cont = this.getNextFailCont();
    if (cont !== void 0) {
      switch (cont._op) {
        case OP_ON_FAILURE:
        case OP_ON_SUCCESS_AND_FAILURE: {
          if (!(interruptible$1(this._runtimeFlags) && this.isInterrupted())) {
            return cont.effect_instruction_i1(cause);
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case "OnStep": {
          if (!(interruptible$1(this._runtimeFlags) && this.isInterrupted())) {
            return exitSucceed(exitFailCause(cause));
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this._runtimeFlags, cont.patch);
          if (interruptible$1(this._runtimeFlags) && this.isInterrupted()) {
            return exitFailCause(sequential$1(cause, this.getInterruptedCause()));
          } else {
            return exitFailCause(cause);
          }
        }
        default: {
          absurd(cont);
        }
      }
    } else {
      yieldedOpChannel.currentOp = exitFailCause(cause);
      return YieldedOp;
    }
  }
  [OP_WITH_RUNTIME](op) {
    return op.effect_instruction_i0(this, running(this._runtimeFlags));
  }
  ["Blocked"](op) {
    const refs = this.getFiberRefs();
    const flags = this._runtimeFlags;
    if (this._steps.length > 0) {
      const frames = [];
      const snap = this._steps[this._steps.length - 1];
      let frame = this.popStack();
      while (frame && frame._op !== "OnStep") {
        frames.push(frame);
        frame = this.popStack();
      }
      this.setFiberRefs(snap.refs);
      this._runtimeFlags = snap.flags;
      const patchRefs = diff$1(snap.refs, refs);
      const patchFlags = diff$3(snap.flags, flags);
      return exitSucceed(blocked(op.effect_instruction_i0, withFiberRuntime((newFiber) => {
        while (frames.length > 0) {
          newFiber.pushStack(frames.pop());
        }
        newFiber.setFiberRefs(patch$1(newFiber.id(), newFiber.getFiberRefs())(patchRefs));
        newFiber._runtimeFlags = patch$4(patchFlags)(newFiber._runtimeFlags);
        return op.effect_instruction_i1;
      })));
    }
    return uninterruptibleMask((restore) => flatMap$1(forkDaemon(runRequestBlock(op.effect_instruction_i0)), () => restore(op.effect_instruction_i1)));
  }
  ["RunBlocked"](op) {
    return runBlockedRequests(op.effect_instruction_i0);
  }
  [OP_UPDATE_RUNTIME_FLAGS](op) {
    const updateFlags = op.effect_instruction_i0;
    const oldRuntimeFlags = this._runtimeFlags;
    const newRuntimeFlags = patch$4(oldRuntimeFlags, updateFlags);
    if (interruptible$1(newRuntimeFlags) && this.isInterrupted()) {
      return exitFailCause(this.getInterruptedCause());
    } else {
      this.patchRuntimeFlags(this._runtimeFlags, updateFlags);
      if (op.effect_instruction_i1) {
        const revertFlags = diff$3(newRuntimeFlags, oldRuntimeFlags);
        this.pushStack(new RevertFlags(revertFlags, op));
        return op.effect_instruction_i1(oldRuntimeFlags);
      } else {
        return exitVoid;
      }
    }
  }
  [OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  ["OnStep"](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ASYNC](op) {
    this._asyncBlockingOn = op.effect_instruction_i1;
    this.initiateAsync(this._runtimeFlags, op.effect_instruction_i0);
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_YIELD](op) {
    this.isYielding = false;
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_WHILE](op) {
    const check = op.effect_instruction_i0;
    const body = op.effect_instruction_i1;
    if (check()) {
      this.pushStack(op);
      return body();
    } else {
      return exitVoid;
    }
  }
  [OP_COMMIT](op) {
    return op.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    this.currentOpCount = 0;
    while (true) {
      if ((this._runtimeFlags & OpSupervision) !== 0) {
        this._supervisor.onEffect(this, cur);
      }
      if (this._queue.length > 0) {
        cur = this.drainQueueWhileRunning(this._runtimeFlags, cur);
      }
      if (!this.isYielding) {
        this.currentOpCount += 1;
        const shouldYield = this._scheduler.shouldYield(this);
        if (shouldYield !== false) {
          this.isYielding = true;
          this.currentOpCount = 0;
          const oldCur = cur;
          cur = flatMap$1(yieldNow$1({
            priority: shouldYield
          }), () => oldCur);
        }
      }
      try {
        if (!("_op" in cur) || !(cur._op in this)) {
          absurd(cur);
        }
        cur = this._tracer.context(() => {
          if (getCurrentVersion() !== cur[EffectTypeId]._V) {
            return dieMessage(`Cannot execute an Effect versioned ${cur[EffectTypeId]._V} with a Runtime of version ${getCurrentVersion()}`);
          }
          return this[cur._op](cur);
        }, this);
        if (cur === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          if (op._op === OP_YIELD || op._op === OP_ASYNC) {
            return YieldedOp;
          }
          yieldedOpChannel.currentOp = null;
          return op._op === OP_SUCCESS || op._op === OP_FAILURE ? op : exitFailCause(die$1(op));
        }
      } catch (e) {
        if (isEffectError(e)) {
          cur = exitFailCause(e.cause);
        } else if (isInterruptedException(e)) {
          cur = exitFailCause(sequential$1(die$1(e), interrupt(none$4)));
        } else {
          cur = die(e);
        }
      }
    }
  }
}
const currentMinimumLogLevel = /* @__PURE__ */ globalValue("effect/FiberRef/currentMinimumLogLevel", () => fiberRefUnsafeMake(fromLiteral("Info")));
const loggerWithConsoleLog = (self) => makeLogger((opts) => {
  const services = getOrDefault(opts.context, currentServices);
  get$5(services, consoleTag).unsafe.log(self.log(opts));
});
const defaultLogger = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/defaultLogger"), () => loggerWithConsoleLog(stringLogger));
const tracerLogger = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/tracerLogger"), () => makeLogger(({
  annotations,
  cause,
  context,
  fiberId: fiberId2,
  logLevel,
  message
}) => {
  const span2 = flatMap$3(get(context, currentContext), getOption(spanTag));
  const clockService = map$4(get(context, currentServices), (_) => get$5(_, clockTag));
  if (span2._tag === "None" || span2.value._tag === "ExternalSpan" || clockService._tag === "None") {
    return;
  }
  const attributes = Object.fromEntries(map$1(annotations, toStringUnknown));
  attributes["effect.fiberId"] = threadName(fiberId2);
  attributes["effect.logLevel"] = logLevel.label;
  if (cause !== null && cause._tag !== "Empty") {
    attributes["effect.cause"] = pretty(cause);
  }
  span2.value.event(String(message), clockService.value.unsafeCurrentTimeNanos(), attributes);
}));
const currentLoggers = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLoggers"), () => fiberRefUnsafeMakeHashSet(make$h(defaultLogger, tracerLogger)));
const forEachConcurrentDiscard = (self, f, batching, processAll, n) => uninterruptibleMask((restore) => transplant((graft) => withFiberRuntime((parent) => {
  let todos = Array.from(self).reverse();
  let target = todos.length;
  if (target === 0) {
    return void_;
  }
  let counter2 = 0;
  let interrupted = false;
  const fibersCount = n ? Math.min(todos.length, n) : todos.length;
  const fibers = /* @__PURE__ */ new Set();
  const results = new Array();
  const interruptAll = () => fibers.forEach((fiber) => {
    fiber._scheduler.scheduleTask(() => {
      fiber.unsafeInterruptAsFork(parent.id());
    }, 0);
  });
  const startOrder = new Array();
  const joinOrder = new Array();
  const residual = new Array();
  const collectExits = () => {
    const exits = results.filter(({
      exit: exit2
    }) => exit2._tag === "Failure").sort((a, b) => a.index < b.index ? -1 : a.index === b.index ? 0 : 1).map(({
      exit: exit2
    }) => exit2);
    if (exits.length === 0) {
      exits.push(exitVoid);
    }
    return exits;
  };
  const runFiber = (eff, interruptImmediately = false) => {
    const runnable = uninterruptible(graft(eff));
    const fiber = unsafeForkUnstarted(runnable, parent, parent._runtimeFlags, globalScope);
    parent._scheduler.scheduleTask(() => {
      if (interruptImmediately) {
        fiber.unsafeInterruptAsFork(parent.id());
      }
      fiber.resume(runnable);
    }, 0);
    return fiber;
  };
  const onInterruptSignal = () => {
    if (!processAll) {
      target -= todos.length;
      todos = [];
    }
    interrupted = true;
    interruptAll();
  };
  const stepOrExit = batching ? step : exit;
  const processingFiber = runFiber(async$1((resume2) => {
    const pushResult = (res, index) => {
      if (res._op === "Blocked") {
        residual.push(res);
      } else {
        results.push({
          index,
          exit: res
        });
        if (res._op === "Failure" && !interrupted) {
          onInterruptSignal();
        }
      }
    };
    const next = () => {
      if (todos.length > 0) {
        const a = todos.pop();
        let index = counter2++;
        const returnNextElement = () => {
          const a2 = todos.pop();
          index = counter2++;
          return flatMap$1(yieldNow$1(), () => flatMap$1(stepOrExit(restore(f(a2, index))), onRes));
        };
        const onRes = (res) => {
          if (todos.length > 0) {
            pushResult(res, index);
            if (todos.length > 0) {
              return returnNextElement();
            }
          }
          return succeed(res);
        };
        const todo = flatMap$1(stepOrExit(restore(f(a, index))), onRes);
        const fiber = runFiber(todo);
        startOrder.push(fiber);
        fibers.add(fiber);
        if (interrupted) {
          fiber._scheduler.scheduleTask(() => {
            fiber.unsafeInterruptAsFork(parent.id());
          }, 0);
        }
        fiber.addObserver((wrapped) => {
          let exit2;
          if (wrapped._op === "Failure") {
            exit2 = wrapped;
          } else {
            exit2 = wrapped.effect_instruction_i0;
          }
          joinOrder.push(fiber);
          fibers.delete(fiber);
          pushResult(exit2, index);
          if (results.length === target) {
            resume2(succeed(getOrElse(exitCollectAll(collectExits(), {
              parallel: true
            }), () => exitVoid)));
          } else if (residual.length + results.length === target) {
            const requests = residual.map((blocked2) => blocked2.effect_instruction_i0).reduce(par);
            resume2(succeed(blocked(requests, forEachConcurrentDiscard([getOrElse(exitCollectAll(collectExits(), {
              parallel: true
            }), () => exitVoid), ...residual.map((blocked2) => blocked2.effect_instruction_i1)], (i) => i, batching, true, n))));
          } else {
            next();
          }
        });
      }
    };
    for (let i = 0; i < fibersCount; i++) {
      next();
    }
  }));
  return asVoid(onExit(flatten$1(restore(join(processingFiber))), exitMatch({
    onFailure: () => {
      onInterruptSignal();
      const target2 = residual.length + 1;
      const concurrency = Math.min(typeof n === "number" ? n : residual.length, residual.length);
      const toPop = Array.from(residual);
      return async$1((cb) => {
        const exits = [];
        let count = 0;
        let index = 0;
        const check = (index2, hitNext) => (exit2) => {
          exits[index2] = exit2;
          count++;
          if (count === target2) {
            cb(getOrThrow(exitCollectAll(exits, {
              parallel: true
            })));
          }
          if (toPop.length > 0 && hitNext) {
            next();
          }
        };
        const next = () => {
          runFiber(toPop.pop(), true).addObserver(check(index, true));
          index++;
        };
        processingFiber.addObserver(check(index, false));
        index++;
        for (let i = 0; i < concurrency; i++) {
          next();
        }
      });
    },
    onSuccess: () => forEachSequential(joinOrder, (f2) => f2.inheritAll)
  })));
})));
const fork$1 = (self) => withFiberRuntime((state, status) => succeed(unsafeFork$1(self, state, status.runtimeFlags)));
const forkDaemon = (self) => forkWithScopeOverride(self, globalScope);
const unsafeFork$1 = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect);
  return childFiber;
};
const unsafeForkUnstarted = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope);
  return childFiber;
};
const unsafeMakeChildFiber = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = unsafeMake$4();
  const parentFiberRefs = parentFiber.getFiberRefs();
  const childFiberRefs = forkAs(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = getOrDefault$1(childFiberRefs, currentContext);
  const supervisor = childFiber._supervisor;
  supervisor.onStart(childContext, effect, some$2(parentFiber), childFiber);
  childFiber.addObserver((exit2) => supervisor.onEnd(exit2, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : pipe(parentFiber.getFiberRef(currentForkScopeOverride), getOrElse(() => parentFiber.scope()));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
const forkWithScopeOverride = (self, scopeOverride) => withFiberRuntime((parentFiber, parentStatus) => succeed(unsafeFork$1(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
const raceAll$1 = (all) => {
  const list = fromIterable$5(all);
  if (!isNonEmpty(list)) {
    return dieSync(() => new IllegalArgumentException(`Received an empty collection of effects`));
  }
  const self = headNonEmpty(list);
  const effects = tailNonEmpty(list);
  const inheritAll$1 = (res) => pipe(inheritAll(res[1]), as(res[0]));
  return pipe(deferredMake(), flatMap$1((done2) => pipe(make$6(effects.length), flatMap$1((fails) => uninterruptibleMask((restore) => pipe(fork$1(interruptible(self)), flatMap$1((head2) => pipe(effects, forEachSequential((effect) => fork$1(interruptible(effect))), map((fibers) => unsafeFromArray(fibers)), map((tail) => pipe(tail, prepend$1(head2))), tap((fibers) => pipe(fibers, reduce$6(void_, (effect, fiber) => pipe(effect, zipRight(pipe(_await(fiber), flatMap$1(raceAllArbiter(fibers, fiber, done2, fails)), fork$1, asVoid)))))), flatMap$1((fibers) => pipe(restore(pipe(_await$1(done2), flatMap$1(inheritAll$1))), onInterrupt(() => pipe(fibers, reduce$6(void_, (effect, fiber) => pipe(effect, zipLeft(interruptFiber(fiber))))))))))))))));
};
const raceAllArbiter = (fibers, winner, deferred, fails) => (exit2) => exitMatchEffect(exit2, {
  onFailure: (cause) => pipe(modify(fails, (fails2) => [fails2 === 0 ? pipe(deferredFailCause(deferred, cause), asVoid) : void_, fails2 - 1]), flatten$1),
  onSuccess: (value) => pipe(deferredSucceed(deferred, [value, winner]), flatMap$1((set2) => set2 ? pipe(fromIterable$5(fibers), reduce$6(void_, (effect, fiber) => fiber === winner ? effect : pipe(effect, zipLeft(interruptFiber(fiber))))) : void_))
});
const fiberRefUnsafeMakeSupervisor = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ,
  fork: empty
});
const currentRuntimeFlags = /* @__PURE__ */ fiberRefUnsafeMakeRuntimeFlags(none$3);
const currentSupervisor = /* @__PURE__ */ fiberRefUnsafeMakeSupervisor(none$2);
const invokeWithInterrupt = (self, entries, onInterrupt2) => fiberIdWith((id) => flatMap$1(flatMap$1(forkDaemon(interruptible(self)), (processing) => async$1((cb) => {
  const counts = entries.map((_) => _.listeners.count);
  const checkDone = () => {
    if (counts.every((count) => count === 0)) {
      if (entries.every((_) => {
        if (_.result.state.current._tag === "Pending") {
          return true;
        } else if (_.result.state.current._tag === "Done" && exitIsExit(_.result.state.current.effect) && _.result.state.current.effect._tag === "Failure" && isInterrupted(_.result.state.current.effect.cause)) {
          return true;
        } else {
          return false;
        }
      })) {
        cleanup.forEach((f) => f());
        onInterrupt2 == null ? void 0 : onInterrupt2();
        cb(interruptFiber(processing));
      }
    }
  };
  processing.addObserver((exit2) => {
    cleanup.forEach((f) => f());
    cb(exit2);
  });
  const cleanup = entries.map((r, i) => {
    const observer = (count) => {
      counts[i] = count;
      checkDone();
    };
    r.listeners.addObserver(observer);
    return () => r.listeners.removeObserver(observer);
  });
  checkDone();
  return sync(() => {
    cleanup.forEach((f) => f());
  });
})), () => suspend(() => {
  const residual = entries.flatMap((entry) => {
    if (!entry.state.completed) {
      return [entry];
    }
    return [];
  });
  return forEachSequentialDiscard(residual, (entry) => complete(entry.request, exitInterrupt(id)));
})));
const close = scopeClose;
const fork = scopeFork;
const interruptAs = interruptAsFiber;
const unsafeFork = (runtime) => (self, options) => {
  const fiberId2 = unsafeMake$4();
  const fiberRefUpdates = [[currentContext, [[fiberId2, runtime.context]]]];
  if (options == null ? void 0 : options.scheduler) {
    fiberRefUpdates.push([currentScheduler, [[fiberId2, options.scheduler]]]);
  }
  let fiberRefs = updateManyAs(runtime.fiberRefs, {
    entries: fiberRefUpdates,
    forkAs: fiberId2
  });
  if (options == null ? void 0 : options.updateRefs) {
    fiberRefs = options.updateRefs(fiberRefs, fiberId2);
  }
  const fiberRuntime = new FiberRuntime(fiberId2, fiberRefs, runtime.runtimeFlags);
  let effect = self;
  if (options == null ? void 0 : options.scope) {
    effect = flatMap$1(fork(options.scope, sequential), (closeableScope) => zipRight(scopeAddFinalizer(closeableScope, fiberIdWith((id) => equals$1(id, fiberRuntime.id()) ? void_ : interruptAsFiber(fiberRuntime, id))), onExit(self, (exit2) => close(closeableScope, exit2))));
  }
  const supervisor = fiberRuntime._supervisor;
  if (supervisor !== none$2) {
    supervisor.onStart(runtime.context, effect, none$6(), fiberRuntime);
    fiberRuntime.addObserver((exit2) => supervisor.onEnd(exit2, fiberRuntime));
  }
  globalScope.add(runtime.runtimeFlags, fiberRuntime);
  if ((options == null ? void 0 : options.immediate) === false) {
    fiberRuntime.resume(effect);
  } else {
    fiberRuntime.start(effect);
  }
  return fiberRuntime;
};
const unsafeRunCallback = (runtime) => (effect, options = {}) => {
  const fiberRuntime = unsafeFork(runtime)(effect, options);
  if (options.onExit) {
    fiberRuntime.addObserver((exit2) => {
      options.onExit(exit2);
    });
  }
  return (id, cancelOptions) => unsafeRunCallback(runtime)(pipe(fiberRuntime, interruptAs(id ?? none$4)), {
    ...cancelOptions,
    onExit: (cancelOptions == null ? void 0 : cancelOptions.onExit) ? (exit2) => cancelOptions.onExit(flatten(exit2)) : void 0
  });
};
const FiberFailureId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure");
const FiberFailureCauseId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure/Cause");
class FiberFailureImpl extends Error {
  constructor(cause) {
    super();
    __publicField(this, _O);
    __publicField(this, _P);
    this[FiberFailureId] = FiberFailureId;
    this[FiberFailureCauseId] = cause;
    const prettyErrors$1 = prettyErrors(cause);
    if (prettyErrors$1.length > 0) {
      const head2 = prettyErrors$1[0];
      this.name = head2.name;
      this.message = head2.message;
      this.stack = head2.stack;
    }
    this.name = `(FiberFailure) ${this.name}`;
    if (this.message === void 0 || this.message.length === 0) {
      this.message = "An error has occurred";
    }
  }
  toJSON() {
    return {
      _id: "FiberFailure",
      cause: this[FiberFailureCauseId].toJSON()
    };
  }
  toString() {
    return "(FiberFailure) " + (this.stack ?? this.message);
  }
  [(_O = FiberFailureId, _P = FiberFailureCauseId, NodeInspectSymbol)]() {
    return this.toString();
  }
}
const fiberFailure = (cause) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error = new FiberFailureImpl(cause);
  Error.stackTraceLimit = limit;
  return error;
};
const fastPath = (effect) => {
  const op = effect;
  switch (op._op) {
    case "Failure":
    case "Success": {
      return op;
    }
    case "Left": {
      return exitFail(op.left);
    }
    case "Right": {
      return exitSucceed(op.right);
    }
    case "Some": {
      return exitSucceed(op.value);
    }
    case "None": {
      return exitFail(NoSuchElementException());
    }
  }
};
const unsafeRunPromise = (runtime) => (effect, options) => unsafeRunPromiseExit(runtime)(effect, options).then((result) => {
  switch (result._tag) {
    case OP_SUCCESS: {
      return result.effect_instruction_i0;
    }
    case OP_FAILURE: {
      throw fiberFailure(result.effect_instruction_i0);
    }
  }
});
const unsafeRunPromiseExit = (runtime) => (effect, options) => new Promise((resolve2) => {
  const op = fastPath(effect);
  if (op) {
    resolve2(op);
  }
  const fiber = unsafeFork(runtime)(effect);
  fiber.addObserver((exit2) => {
    resolve2(exit2);
  });
  if ((options == null ? void 0 : options.signal) !== void 0) {
    if (options.signal.aborted) {
      fiber.unsafeInterruptAsFork(fiber.id());
    } else {
      options.signal.addEventListener("abort", () => {
        fiber.unsafeInterruptAsFork(fiber.id());
      }, {
        once: true
      });
    }
  }
});
class RuntimeImpl {
  constructor(context, runtimeFlags, fiberRefs) {
    __publicField(this, "context");
    __publicField(this, "runtimeFlags");
    __publicField(this, "fiberRefs");
    this.context = context;
    this.runtimeFlags = runtimeFlags;
    this.fiberRefs = fiberRefs;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make = (options) => new RuntimeImpl(options.context, options.runtimeFlags, options.fiberRefs);
const defaultRuntimeFlags = /* @__PURE__ */ make$d(Interruption, CooperativeYielding, RuntimeMetrics);
const defaultRuntime = /* @__PURE__ */ make({
  context: /* @__PURE__ */ empty$h(),
  runtimeFlags: defaultRuntimeFlags,
  fiberRefs: /* @__PURE__ */ empty$2()
});
const unsafeRunEffect = /* @__PURE__ */ unsafeRunCallback(defaultRuntime);
const unsafeRunPromiseEffect = /* @__PURE__ */ unsafeRunPromise(defaultRuntime);
const async = async$1;
const promise = promise$1;
const _void = void_;
const flatMap = flatMap$1;
const raceAll = raceAll$1;
const runCallback = unsafeRunEffect;
const runPromise = unsafeRunPromiseEffect;
exports.Work = void 0;
(function(Work2) {
  function Seq(lhs, rhs) {
    return flatMap(lhs, (x) => x == null ? rhs : Work2.Seq(x, rhs));
  }
  Work2.Seq = Seq;
  function Par(self, that) {
    return raceAll([self, that]);
  }
  Work2.Par = Par;
  Work2.ZERO = _void;
  function fromPromise(promise2) {
    return async((callback, signal) => {
      promise2.then((value) => callback(value));
    });
  }
  Work2.fromPromise = fromPromise;
  function fromThunk(thunk) {
    return async((callback, signal) => {
      callback(thunk());
    });
  }
  Work2.fromThunk = fromThunk;
  function Submit(self) {
    return runCallback(self);
  }
  Work2.Submit = Submit;
  function Promise2(self) {
    return runPromise(self);
  }
  Work2.Promise = Promise2;
})(exports.Work || (exports.Work = {}));
class Apply {
  constructor(_apply) {
    __publicField(this, "_apply");
    this._apply = _apply;
  }
  apply(a) {
    return this._apply(a);
  }
}
class Cont extends Apply {
}
class Settler extends Cont {
}
class Allocator extends Settler {
  flat_fold(fn) {
    return new Allocator((cont) => {
      return this.apply(new Apply((p) => {
        let a = p.then((outcome) => {
          return fn(outcome);
        });
        let b = a.then((x) => {
          let a2 = x.apply(cont);
          return a2;
        });
        let c = exports.Work.fromPromise(b);
        return c;
      }));
    });
  }
  zip(that) {
    return Allocator.Zip(this, that);
  }
  static Zip(self, that) {
    return new Allocator((f) => {
      var lhs = null;
      var rhs = null;
      let work_left = self.apply(new Apply((ocI) => {
        lhs = ocI;
        return exports.Work.ZERO;
      }));
      var work_right = that.apply(new Apply((ocII) => {
        rhs = ocII;
        return exports.Work.ZERO;
      }));
      return exports.Work.Seq(exports.Work.Par(work_left, work_right), f.apply(Promise.all([lhs, rhs]).then((values) => {
        let tuple = [values[0], values[1]];
        return tuple;
      })));
    });
  }
}
class Junction extends Settler {
  receive(receiver) {
    return receiver.apply(new Apply((a) => {
      return this.apply(new Apply((b) => {
        return exports.Work.fromPromise(a.then((v) => {
          b.resolve(v);
          return exports.Work.ZERO;
        }));
      }));
    }));
  }
  static later(payload) {
    return new Allocator((fn) => {
      return fn.apply(payload);
    });
  }
  static issue(self) {
    return new Allocator(function(fn) {
      let promise2 = new Promise((resolve2) => {
        resolve2(self);
      });
      return fn.apply(promise2);
    });
  }
  static Pure(deferred) {
    return new Junction((a) => {
      return a.apply(deferred);
    });
  }
  /**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
  static Unit() {
    return new Junction((a) => {
      return a.apply(new Deferred_1());
    });
  }
}
class Fun {
  constructor(_apply) {
    __publicField(this, "_apply");
    this._apply = _apply;
  }
  defer(p, cont) {
    return cont.receive(Junction.issue(this._apply(p)));
  }
}
let Anon$1 = class Anon {
  constructor(_defer) {
    __publicField(this, "_defer");
    this._defer = _defer;
  }
  defer(p, cont) {
    return this._defer(p, cont);
  }
};
let Unit$1 = class Unit extends Fun {
  constructor() {
    super((p) => p);
  }
};
function forward(self, p) {
  return new Allocator((k) => {
    let deferred = new Deferred_1();
    let fst = self.defer(p, new Junction((t_sink) => {
      let result = t_sink.apply(deferred);
      return result;
    }));
    let snd = k.apply(deferred.promise);
    return exports.Work.Seq(fst, snd);
  });
}
function resolve(self, input) {
  let deferred = new Deferred_1();
  let cycle = self.defer(input, Junction.Pure(deferred));
  let finish = exports.Work.Promise(cycle);
  return finish.then((_) => {
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
    let event_handler_removed = false;
    let deferred = new Deferred_1();
    let handler = {
      handleEvent: function(evt) {
        console.log("loaded");
        deferred.resolve(evt);
        event_handler_removed = true;
        target.removeEventListener(this.event_name, handler);
      }
    };
    target.addEventListener(this.event_name, handler);
    let canceller = exports.Work.fromThunk(() => {
      if (!event_handler_removed) {
        target.removeEventListener(this.event_name, handler);
      }
      return null;
    });
    return exports.Work.Seq(cont.receive(Junction.later(deferred.promise)), canceller);
  }
}
let Then$1 = class Then {
  constructor(lhs, rhs) {
    __publicField(this, "lhs");
    __publicField(this, "rhs");
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p, cont) {
    var a = forward(this.lhs, p);
    return cont.receive(a.flat_fold((ok) => forward(this.rhs, ok)));
  }
};
let Arrow$1 = class Arrow {
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
    return new Arrow((self) => new Then$1(self, that));
  }
  then(that) {
    return this.next(Arrow.Then(that));
  }
  static Pair(that) {
    return new Arrow((self) => new Anon$1((p, cont) => {
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
      return new Anon$1((p, cont) => {
        return Arrow.Pair(that).apply(self).defer([p, p], cont);
      });
    });
  }
  split(that) {
    return this.next(Arrow.Split(that));
  }
  static FlatMap(fn) {
    return new Arrow((self) => {
      return new Anon$1((p, cont) => {
        return cont.receive(forward(self, p).flat_fold((ok) => forward(fn(ok), p)));
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
      return new Anon$1((p, cont) => {
        return cont.receive(forward(self, p).zip(forward(that, p)));
      });
    });
  }
  pinch(that) {
    return this.next(Arrow.Pinch(that));
  }
  static Joint(that) {
    return new Arrow((self) => {
      return Arrow.Then(Arrow.Pure(Arrow.Split(that).apply(new Unit$1())).apply(new Unit$1())).apply(self);
    });
  }
  joint(that) {
    return this.next(Arrow.Joint(that));
  }
  static Bound(that) {
    return new Arrow((self) => {
      let u = new Unit$1();
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
};
function react(dispatch) {
  return new Anon$1((p, cont) => {
    dispatch(p);
    return exports.Work.ZERO;
  });
}
function useReducerWithThunk(dispatch) {
  function customAllocator(action) {
    switch (typeof action) {
      case "function":
        return action(customAllocator);
      default:
        dispatch(action);
    }
  }
  return customAllocator;
}
(function(to, from, pack2) {
  if (pack2 || arguments.length === 2)
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
var left$1 = function(e) {
  return { _tag: "Left", left: e };
};
var right$1 = function(a) {
  return { _tag: "Right", right: a };
};
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
let Option$1 = class Option {
  constructor(delegate) {
    __publicField(this, "delegate");
    this.delegate = delegate;
  }
  defer(p, cont) {
    let result = fold(() => cont.receive(Junction.issue(none)), (p2) => new Then$1(this.delegate, new Fun((r) => some(r))).defer(p2, cont))(p);
    return result;
  }
};
let OptionM$1 = class OptionM {
  constructor(delegate) {
    __publicField(this, "delegate");
    this.delegate = delegate;
  }
  defer(p, cont) {
    let result = fold(() => cont.receive(Junction.issue(none)), (p2) => this.delegate.defer(p2, cont))(p);
    return result;
  }
};
var left = left$1;
var right = right$1;
let Callback$1 = class Callback {
  constructor(deferred) {
    __publicField(this, "deferred");
    this.deferred = deferred;
  }
  defer(p, cont) {
    let d = new Deferred_1();
    this.deferred(p, (r) => {
      d.resolve(r);
    });
    return exports.Work.fromPromise(d.promise.then((x) => exports.Work.ZERO));
  }
};
let Receiver$1 = class Receiver {
  constructor(deferred) {
    __publicField(this, "deferred");
    this.deferred = deferred;
  }
  defer(_, cont) {
    return cont.receive(this.deferred);
  }
};
function Unit2() {
  return new Unit$1();
}
function Arrow2() {
  return Arrow$1;
}
function Fun1R(fn) {
  return new Fun(fn);
}
function Pure(r) {
  return Fun1R((_) => r);
}
function Anon2(fn) {
  return new Anon$1(fn);
}
function Resolve(self, input) {
  return resolve(self, input);
}
function Forward(self, input) {
  return forward(self, input);
}
function Event(self) {
  return new EventArrowlet(self);
}
function Then2(self, that) {
  return new Then$1(self, that);
}
function Pair(self, that) {
  return Arrow2().Pair(that).apply(self);
}
function FlatMap(fn) {
  return Arrow2().FlatMap(fn);
}
function First(self) {
  return Arrow2().First().apply(self);
}
function Second(self) {
  return Arrow2().Second().apply(self);
}
function Pinch(self, that) {
  return Arrow2().Pinch(that).apply(self);
}
function Joint(self, that) {
  return Arrow2().Joint(that).apply(self);
}
function Bound(self, that) {
  return Arrow2().Bound(that).apply(self);
}
function Broach(self) {
  return Arrow2().Broach().apply(self);
}
function Next(lhs, rhs) {
  return lhs.next(rhs);
}
function React(dispatch) {
  return react(useReducerWithThunk(dispatch));
}
function Handler(self) {
  return (r) => {
    exports.Work.Submit(self.defer(r, Junction.Unit()));
  };
}
function Race(self, that) {
  return Anon2((p, cont) => {
    const deferred = new Deferred_1();
    var complete2 = false;
    function handler(r) {
      if (!complete2) {
        complete2 = true;
        deferred.resolve(r);
      }
    }
    const a = Then2(self, Fun1R(handler));
    const b = Then2(that, Fun1R(handler));
    return exports.Work.fromPromise(Promise.any([Resolve(a, p), Resolve(b, p)]).then((_) => deferred.promise.then((r) => cont.receive(Junction.issue(r)))));
  });
}
function Stage(self, before, after) {
  return Anon2((p, cont) => {
    if (before) {
      before(p);
    }
    return Then2(self, Fun1R((r) => {
      if (after) {
        after(r);
      }
      return r;
    })).defer(p, cont);
  });
}
function Option2(self) {
  return new Option$1(self);
}
function OptionM2(self) {
  return new OptionM$1(self);
}
function OptionP(fn) {
  return Fun1R((p) => {
    if (fn(p)) {
      return some(p);
    } else {
      return none;
    }
  });
}
function Timeout(self, ms, error) {
  return Race(Anon2((p, junc) => {
    const deferred = new Deferred_1();
    setTimeout(() => {
      deferred.resolve(left(error));
    }, ms);
    return junc.receive(Junction.later(deferred.promise));
  }), Then2(self, Fun1R(right)));
}
function Worker(work) {
  return Anon2((p, junc) => {
    return exports.Work.Seq(junc.receive(Junction.issue(p)), work);
  });
}
function RaceWithTimeout(l, r, ms, error) {
  const lhs = Timeout(l, ms, error);
  const rhs = Timeout(r, ms, error);
  return Race(lhs, rhs);
}
function Map$1(l, fn) {
  return Then2(l, Fun1R(fn));
}
function Mapi(self, fn) {
  return Then2(Fun1R(fn), self);
}
function Effect(self) {
  return (pi) => {
    return promise((signal) => Resolve(self, pi));
  };
}
function Loop(self) {
  return Anon2(function rec(pi, cont) {
    return forward(self, pi).flat_fold((r) => match$3({
      onLeft: (pi2) => exports.Work.fromThunk(() => rec(pi2, cont)),
      //yay?
      onRight: (r2) => cont.receive(Junction.issue(r2))
    }));
  });
}
function Callback2(fn) {
  return new Callback$1(fn);
}
function Receiver2(self) {
  return new Receiver$1(self);
}
exports.Allocator = Allocator;
exports.Anon = Anon2;
exports.Apply = Apply;
exports.Arrow = Arrow2;
exports.Bound = Bound;
exports.Broach = Broach;
exports.Callback = Callback2;
exports.Effect = Effect;
exports.Event = Event;
exports.First = First;
exports.FlatMap = FlatMap;
exports.Forward = Forward;
exports.Fun1R = Fun1R;
exports.Handler = Handler;
exports.Joint = Joint;
exports.Junction = Junction;
exports.Loop = Loop;
exports.Map = Map$1;
exports.Mapi = Mapi;
exports.Next = Next;
exports.Option = Option2;
exports.OptionM = OptionM2;
exports.OptionP = OptionP;
exports.Pair = Pair;
exports.Pinch = Pinch;
exports.Pure = Pure;
exports.Race = Race;
exports.RaceWithTimeout = RaceWithTimeout;
exports.React = React;
exports.Receiver = Receiver2;
exports.Resolve = Resolve;
exports.Second = Second;
exports.Stage = Stage;
exports.Then = Then2;
exports.Timeout = Timeout;
exports.Unit = Unit2;
exports.Worker = Worker;

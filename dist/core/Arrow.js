"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrow = void 0;
const Then_1 = require("../term/Then");
const Anon_1 = require("../term/Anon");
const Terminal_1 = require("./Terminal");
const util_1 = require("../util");
const Fun_1 = require("../term/Fun");
const Unit_1 = require("../term/Unit");
class Arrow {
    _apply;
    constructor(_apply) {
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
        return new Arrow((self) => new Then_1.Then(self, that));
    }
    then(that) {
        return this.next(Arrow.Then(that));
    }
    static Pair(that) {
        return new Arrow((self) => new Anon_1.Anon((p, cont) => {
            let [l, r] = p;
            let lhs = (0, util_1.forward)(self, l);
            let rhs = (0, util_1.forward)(that, r);
            return cont.receive(lhs.zip(rhs));
        }));
    }
    pair(that) {
        return this.next(Arrow.Pair(that));
    }
    static Split(that) {
        return new Arrow((self) => {
            return new Anon_1.Anon((p, cont) => {
                return Arrow.Pair(that).apply(self).defer([p, p], cont);
            });
        });
    }
    split(that) {
        return this.next(Arrow.Split(that));
    }
    static FlatMap(fn) {
        return new Arrow((self) => {
            return new Anon_1.Anon((p, cont) => {
                return cont.receive((0, util_1.forward)(self, p).flat_fold(ok => (0, util_1.forward)(fn(ok), p), no => Terminal_1.Terminal.error(no)));
            });
        });
    }
    flat_map(fn) {
        return this.next(Arrow.FlatMap(fn));
    }
    static First() {
        return new Arrow((self) => {
            let l = Arrow.Pure(new Fun_1.Fun((x) => x));
            let r = Arrow.Pair(l.apply(self)).apply(self);
            return r;
        });
    }
    first() {
        return this.next(Arrow.First());
    }
    static Second() {
        return new Arrow((self) => {
            let l = Arrow.Pure(new Fun_1.Fun((x) => x));
            let r = Arrow.Pair(self).apply(l.apply(self));
            return r;
        });
    }
    second() {
        return this.next(Arrow.Second());
    }
    static Pinch(that) {
        return new Arrow((self) => {
            return new Anon_1.Anon((p, cont) => {
                return cont.receive((0, util_1.forward)(self, p).zip((0, util_1.forward)(that, p)));
            });
        });
    }
    pinch(that) {
        return this.next(Arrow.Pinch(that));
    }
    static Joint(that) {
        return new Arrow((self) => {
            return Arrow.Then(Arrow.Pure(Arrow.Split(that).apply(new Unit_1.Unit())).apply(new Unit_1.Unit())).apply(self);
        });
    }
    joint(that) {
        return this.next(Arrow.Joint(that));
    }
    static Bound(that) {
        return new Arrow((self) => {
            let u = new Unit_1.Unit();
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
            let unit = new Fun_1.Fun((p) => p);
            return Arrow.Bound(unit).apply(self);
        });
    }
    broach() {
        return this.next(Arrow.Broach());
    }
    resolve(p) {
        return (0, util_1.resolve)(this.apply((0, util_1.unit)()), p);
    }
    static Compose(lhs, rhs) {
        return rhs.next(lhs);
    }
    compose(before) {
        return Arrow.Compose(this, before);
    }
}
exports.Arrow = Arrow;

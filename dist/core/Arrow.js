import { Then } from "../term/Then";
import { Junction } from "../Core";
import { Anon } from "../term/Anon";
import { forward, resolve, unit } from "../util";
import { Fun } from "../term/Fun";
import { Unit } from "../term/Unit";
export class Arrow {
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
                return cont.receive(forward(self, p).flat_fold(ok => forward(fn(ok), p), no => Junction.error(no)));
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
            let unit = new Fun((p) => p);
            return Arrow.Bound(unit).apply(self);
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

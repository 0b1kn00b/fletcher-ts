"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fletcher = void 0;
const ts_deferred_1 = require("ts-deferred");
const Terminal_1 = require("./core/Terminal");
const Fun_1 = require("./term/Fun");
const Anon_1 = require("./term/Anon");
const Then_1 = require("./term/Then");
const Event_1 = require("./term/Event");
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
class Fletcher {
    static Terminal() {
        return new Terminal_1.Terminal((a) => {
            return a.apply(new ts_deferred_1.Deferred());
        });
    }
    static Fun1R(fn) {
        return new Fun_1.Fun(fn);
    }
    static Unit() {
        return new Fun_1.Fun((x) => x);
    }
    static Pure(r) {
        return new Fun_1.Fun((_) => r);
    }
    static Anon(fn) {
        return new Anon_1.Anon(fn);
    }
    static Then(lhs, rhs) {
        return new Then_1.Then(lhs, rhs);
    }
    static FlatMap(self, fn) {
        return Fletcher.Anon((p, cont) => {
            return cont.receive(self.forward(p).flat_fold(ok => fn(ok).forward(p), no => Terminal_1.Terminal.error(no)));
        });
    }
    static Pair(self, that) {
        return Fletcher.Anon((p, cont) => {
            let [l, r] = p;
            let lhs = self.forward(l);
            let rhs = that.forward(r);
            return cont.receive(lhs.zip(rhs));
        });
    }
    static Split(self, that) {
        return Fletcher.Anon((p, cont) => {
            return Fletcher.Pair(self, that).defer([p, p], cont);
        });
    }
    static First(self) {
        return Fletcher.Pair(self, Fletcher.Unit());
    }
    static Pinch(self, that) {
        return Fletcher.Anon((p, cont) => cont.receive(self.forward(p).zip(that.forward(p))));
    }
    static Joint(lhs, rhs) {
        let rhs_u = Fletcher.Unit();
        let rhs_a = rhs_u.split(rhs);
        return Fletcher.Then(lhs, rhs_a);
    }
    static Bound(self, that) {
        let u = Fletcher.Unit();
        return Fletcher.Joint(u, self).then(that);
    }
    static Broach(self) {
        return Fletcher.Bound(self, Fletcher.Fun1R(x => x));
    }
    static Event(self) {
        return new Event_1.EventArrowlet(self);
    }
}
exports.Fletcher = Fletcher;
// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {
//   }
// }

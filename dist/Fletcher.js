"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fletcher = void 0;
const ts_deferred_1 = require("ts-deferred");
const Terminal_1 = require("./core/Terminal");
const Cycle_1 = require("./core/Cycle");
const Fun_1 = require("./term/Fun");
const Anon_1 = require("./term/Anon");
const Then_1 = require("./term/Then");
const Event_1 = require("./term/Event");
const Receiver_1 = require("./core/Receiver");
const Arrowlet_1 = require("./core/Arrowlet");
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
class Fletcher {
    static Terminal() {
        return new Terminal_1.Terminal((a) => {
            return a.apply(new ts_deferred_1.Deferred());
        });
    }
    static Fun1R(fn) {
        return Arrowlet_1.Arrowlet.Delegate(new Fun_1.Fun(fn));
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
            return cont.receive(Fletcher.forward(self, p).flat_fold(ok => Fletcher.forward(fn(ok), p), no => Terminal_1.Terminal.error(no)));
        });
    }
    static Pair(self, that) {
        return Fletcher.Anon((p, cont) => {
            let [l, r] = p;
            let lhs = Fletcher.forward(self, l);
            let rhs = Fletcher.forward(that, r);
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
        return Fletcher.Anon((p, cont) => cont.receive(Fletcher.forward(self, p).zip(Fletcher.forward(that, p))));
    }
    static Joint(lhs, rhs) {
        let rhs_u = Fletcher.Unit();
        let rhs_a = Fletcher.Split(rhs_u, rhs);
        return Fletcher.Then(lhs, rhs_a);
    }
    static Bound(self, that) {
        let u = Fletcher.Unit();
        return Fletcher.Then(Fletcher.Joint(u, self), that);
    }
    static Broach(self) {
        return Fletcher.Bound(self, Fletcher.Fun1R(x => x));
    }
    static Event(self) {
        return new Event_1.EventArrowlet(self);
    }
    static forward(self, p) {
        return new Receiver_1.Receiver((k) => {
            let deferred = new ts_deferred_1.Deferred();
            let fst = self.defer(p, new Terminal_1.Terminal((t_sink) => {
                let result = t_sink.apply(deferred);
                return result;
            }));
            let snd = k.apply(deferred.promise);
            return Cycle_1.Cycle.Seq(fst, snd);
        });
    }
}
exports.Fletcher = Fletcher;
// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {
//   }
// }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fletcher = void 0;
const ts_deferred_1 = require("ts-deferred");
const Terminal_1 = require("./core/Terminal");
const Fun_1 = require("./term/Fun");
const Anon_1 = require("./term/Anon");
const util_1 = require("./util");
const Event_1 = require("./term/Event");
const Arrow_1 = require("./core/Arrow");
/** Returns Cycle from Continuation */
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
class Fletcher {
    static Terminal() {
        return new Terminal_1.Terminal((a) => {
            return a.apply(new ts_deferred_1.Deferred());
        });
    }
    static Arrow() {
        return Arrow_1.Arrow;
    }
    static Fun1R(fn) {
        return new Fun_1.Fun(fn);
    }
    static Pure(r) {
        return Fletcher.Fun1R((_) => r);
    }
    static Anon(fn) {
        return new Anon_1.Anon(fn);
    }
    static Resolve(self, input) {
        return (0, util_1.resolve)(self, input);
    }
    static Forward(self, input) {
        return (0, util_1.forward)(self, input);
    }
    static Event(self) {
        return new Event_1.EventArrowlet(self);
    }
    static Then(that) {
        return Fletcher.Arrow().Then(that);
    }
    static Pair(that) {
        return Fletcher.Arrow().Pair(that);
    }
    static FlatMap(fn) {
        return Fletcher.Arrow().FlatMap(fn);
    }
    static First() {
        return Fletcher.Arrow().First();
    }
    static Second() {
        return Fletcher.Arrow().Second();
    }
    static Pinch(that) {
        return Fletcher.Arrow().Pinch(that);
    }
    static Joint(that) {
        return Fletcher.Arrow().Joint(that);
    }
    static Next(lhs, rhs) {
        return lhs.next(rhs);
    }
}
exports.Fletcher = Fletcher;
// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {
//   }
// }

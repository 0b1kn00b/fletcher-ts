"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fletcher = void 0;
const ts_deferred_1 = require("ts-deferred");
const Terminal_1 = require("./core/Terminal");
const Fun_1 = require("./term/Fun");
const util_1 = require("./util");
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
    static Resolve(self, input) {
        return (0, util_1.resolve)(self, input);
    }
    static Forward(self, input) {
        return (0, util_1.forward)(self, input);
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

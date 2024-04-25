"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrowlet = void 0;
const Terminal_1 = require("./Terminal");
const Cycle_1 = require("./Cycle");
const Receiver_1 = require("./Receiver");
const Then_1 = require("../term/Then");
const ts_deferred_1 = require("ts-deferred");
const __1 = require("..");
class Arrowlet {
    constructor() {
    }
    defer(p, cont) {
        return new Cycle_1.Cycle(null);
    }
    toArrowlet() {
        return this;
    }
    forward(p) {
        return new Receiver_1.Receiver((k) => {
            let deferred = new ts_deferred_1.Deferred();
            let fst = this.defer(p, new Terminal_1.Terminal((t_sink) => {
                let result = t_sink.apply(deferred);
                return result;
            }));
            let snd = k.apply(deferred.promise);
            return Cycle_1.Cycle.Seq(fst, snd);
        });
    }
    then(that) {
        return new Then_1.Then(this, that);
    }
    pair(that) {
        return __1.Fletcher.Pair(this, that);
    }
    split(that) {
        return __1.Fletcher.Split(this, that);
    }
    flat_map(fn) {
        return __1.Fletcher.Anon((p, cont) => {
            return cont.receive(this.forward(p).flat_fold(ok => fn(ok).forward(p), no => Terminal_1.Terminal.error(no)));
        });
    }
    first(self) {
        return __1.Fletcher.Pair(self, __1.Fletcher.Unit());
    }
    pinch(self, that) {
        return __1.Fletcher.Anon((p, cont) => cont.receive(self.forward(p).zip(that.forward(p))));
    }
    joint(rhs) {
        let rhs_u = __1.Fletcher.Unit();
        let rhs_a = rhs_u.split(rhs);
        return __1.Fletcher.Then(this, rhs_a);
    }
    bound(that) {
        let u = __1.Fletcher.Unit();
        return __1.Fletcher.Joint(u, this).then(that);
    }
    broach(self) {
        return __1.Fletcher.Bound(self, __1.Fletcher.Fun1R(x => x));
    }
}
exports.Arrowlet = Arrowlet;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrowlet = void 0;
const core_1 = require("@fletcher-ts/core");
const term_1 = require("@fletcher-ts/term");
const ts_deferred_1 = require("ts-deferred");
class Arrowlet {
    defer(p, cont) {
        return new core_1.Cycle(null);
    }
    toArrowlet() {
        return this;
    }
    forward(p) {
        return new core_1.Receiver((k) => {
            let deferred = new ts_deferred_1.Deferred();
            let fst = this.defer(p, new core_1.Terminal((t_sink) => {
                let result = t_sink.apply(deferred);
                return result;
            }));
            let snd = k.apply(deferred.promise);
            return core_1.Cycle.seq(fst, snd);
        });
    }
    then(that) {
        return new term_1.Then(this, that);
    }
}
exports.Arrowlet = Arrowlet;

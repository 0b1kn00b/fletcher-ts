"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.forward = void 0;
const Receiver_1 = require("./core/Receiver");
const ts_deferred_1 = require("ts-deferred");
const Cycle_1 = require("./core/Cycle");
const Terminal_1 = require("./core/Terminal");
function forward(self, p) {
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
exports.forward = forward;
function resolve(self, input) {
    //console.log('resolve init');
    let deferred = new ts_deferred_1.Deferred();
    let cycle = self.defer(input, Terminal_1.Terminal.Pure(deferred));
    //console.log('resolve: post defer');
    let finish = cycle.submit();
    //console.log('resolve: post submit')
    return finish.then(() => {
        //console.log('resolve resolved')
        return deferred.promise.then(x => {
            //console.log('deferred resolved');
            return x;
        });
    });
}
exports.resolve = resolve;

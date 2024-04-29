"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrowlet = void 0;
const Terminal_1 = require("./Terminal");
const Cycle_1 = require("./Cycle");
const Then_1 = require("../term/Then");
const ts_deferred_1 = require("ts-deferred");
const __1 = require("..");
const E = require("fp-ts/Either");
const Delegate_1 = require("../term/Delegate");
class Arrowlet {
    constructor() {
    }
    forward(p) {
        return __1.Fletcher.forward(this, p);
    }
    defer(p, cont) {
        return new Cycle_1.Cycle(null);
    }
    then(that) {
        return Arrowlet.Delegate(new Then_1.Then(this, that));
    }
    pair(that) {
        return Arrowlet.Delegate(__1.Fletcher.Pair(this, that));
    }
    split(that) {
        return Arrowlet.Delegate(__1.Fletcher.Split(this, that));
    }
    flat_map(fn) {
        return Arrowlet.Delegate(__1.Fletcher.Anon((p, cont) => {
            return cont.receive(this.forward(p).flat_fold(ok => __1.Fletcher.forward(fn(ok), p), no => Terminal_1.Terminal.error(no)));
        }));
    }
    first(self) {
        return Arrowlet.Delegate(__1.Fletcher.Pair(self, __1.Fletcher.Unit()));
    }
    pinch(self, that) {
        return Arrowlet.Delegate(__1.Fletcher.Anon((p, cont) => cont.receive(__1.Fletcher.forward(self, p).zip(that.forward(p)))));
    }
    joint(rhs) {
        let rhs_u = Arrowlet.Delegate(__1.Fletcher.Unit());
        let rhs_a = rhs_u.split(rhs);
        return Arrowlet.Delegate(__1.Fletcher.Then(this, rhs_a));
    }
    bound(that) {
        let u = Arrowlet.Delegate(__1.Fletcher.Unit());
        return Arrowlet.Delegate(__1.Fletcher.Joint(u, this)).then(that);
    }
    broach() {
        return Arrowlet.Delegate(__1.Fletcher.Bound(this, __1.Fletcher.Fun1R(x => x)));
    }
    resolve(input) {
        //console.log('resolve init');
        let deferred = new ts_deferred_1.Deferred();
        let all = this.then(__1.Fletcher.Fun1R((ok) => {
            //console.log('resolve:::', ok);
            deferred.resolve(E.left(ok));
            return ok;
        }));
        //console.log('resolve: pre defer');
        let cycle = all.defer(input, __1.Fletcher.Terminal());
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
    static Delegate(self) {
        return new Delegate_1.Delegate(self);
    }
}
exports.Arrowlet = Arrowlet;

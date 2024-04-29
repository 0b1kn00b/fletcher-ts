"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cycle = void 0;
const ts_deferred_1 = require("ts-deferred");
class Cycle {
    constructor(_after) {
        this._after = null;
        this._after = _after;
    }
    get after() { return this._after == null ? null : this._after(); }
    static Seq(lhs, rhs) {
        //console.log('seq');
        return new Cycle(() => {
            let a = lhs === null || lhs === void 0 ? void 0 : lhs.after;
            if (a != null) {
                //console.log('after done');
                return new Promise((resolve) => a.then(x => {
                    //console.log(x);
                    return Cycle.Seq(x, rhs);
                }).then(resolve));
            }
            else {
                //console.log('rhs', rhs?.after);
                return rhs === null || rhs === void 0 ? void 0 : rhs.after;
            }
        });
    }
    seq(rhs) {
        return Cycle.Par(this, rhs);
    }
    par(rhs) {
        return Cycle.Par(this, rhs);
    }
    submit() {
        //console.log('submit');
        return Cycle.Submit(this);
    }
    static Submit(self) {
        let deferred = new ts_deferred_1.Deferred();
        setTimeout(() => {
            //console.log('timeout');
            if (self != null) {
                if (self.after != null) {
                    self.after.then(x => {
                        if (x != null) {
                            Cycle.Submit(x);
                        }
                    });
                }
                else {
                    deferred.resolve(null);
                }
            }
            else {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }
    static Par(self, that) {
        var _a, _b;
        let l = (_a = self.after) !== null && _a !== void 0 ? _a : Promise.resolve(Cycle.Unit());
        let r = (_b = that.after) !== null && _b !== void 0 ? _b : Promise.resolve(Cycle.Unit());
        let a = Promise.all([l, r]);
        return Cycle.Pure(a.then(([l, r]) => {
            if (l != null && r != null) {
                return Cycle.Par(l, r);
            }
            else if (l != null) {
                return l;
            }
            else {
                return r;
            }
        }));
    }
    static Unit() {
        return new Cycle(null);
    }
    static Pure(self) {
        return new Cycle(() => self);
    }
}
exports.Cycle = Cycle;

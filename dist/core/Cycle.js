"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cycle = void 0;
const ts_deferred_1 = require("ts-deferred");
class Cycle {
    _after = null;
    constructor(_after) { this._after = _after; }
    get after() { return this._after == null ? null : this._after(); }
    static Seq(lhs, rhs) {
        //console.log('seq');
        return new Cycle(() => {
            let a = lhs?.after;
            if (a != null) {
                //console.log('after done');
                return new Promise((resolve) => a.then(x => {
                    //console.log(x);
                    return Cycle.Seq(x, rhs);
                }).then(resolve));
            }
            else {
                //console.log('rhs', rhs?.after);
                return rhs?.after;
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
        //console.log('submit');
        let deferred = new ts_deferred_1.Deferred();
        setTimeout(() => {
            //console.log('timeout');
            if (self != null) {
                const after = self.after;
                if (after != null) {
                    //console.log('after:')
                    after.then(x => {
                        if (x != null) {
                            //console.log('resubmit');
                            Cycle.Submit(x).then(x => deferred.resolve(x), e => deferred.reject(e));
                        }
                        else {
                            //console.log('end x');
                            deferred.resolve(null);
                        }
                    });
                }
                else {
                    //console.log('end after')
                    deferred.resolve(null);
                }
            }
            else {
                //console.log('end');
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }
    static Par(self, that) {
        let l = self.after ?? Promise.resolve(Cycle.Unit());
        let r = that.after ?? Promise.resolve(Cycle.Unit());
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

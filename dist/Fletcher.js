"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fletcher = void 0;
const E = require("fp-ts/Either");
const ts_deferred_1 = require("ts-deferred");
/** Something that happens and maybe after that another thing*/
class Cycle {
    constructor(_after) {
        this._after = null;
        this._after = _after;
    }
    get after() { return this._after == null ? null : this._after(); }
    static seq(lhs, rhs) {
        //console.log('seq');
        return new Cycle(() => {
            let a = lhs === null || lhs === void 0 ? void 0 : lhs.after;
            if (a != null) {
                //console.log('after done');
                return new Promise((resolve) => a.then(x => {
                    //console.log(x);
                    return Cycle.seq(x, rhs);
                }).then(resolve));
            }
            else {
                //console.log('rhs', rhs?.after);
                return rhs === null || rhs === void 0 ? void 0 : rhs.after;
            }
        });
    }
    submit() {
        //console.log('submit');
        Cycle.Submit(this);
    }
    static Submit(self) {
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
                    //console.log('after empty');
                }
            }
            else {
                //console.log('empty');
            }
        });
    }
}
class ApplyCls {
    constructor(_apply) { this._apply = _apply; }
    apply(a) { return this._apply(a); }
}
class ContCls extends ApplyCls {
}
class SettlerCls extends ContCls {
}
;
class ReceiverCls extends SettlerCls {
    flat_fold(ok, no) {
        return new ReceiverCls((cont) => {
            return this.apply(new ApplyCls((p) => {
                let a = p.then((outcome) => {
                    let a = E.match(ok, no)(outcome);
                    return a;
                });
                let b = a.then((x) => {
                    let a = x.apply(cont);
                    return a;
                });
                let c = new Cycle(() => b);
                return c;
            }));
        });
    }
}
;
/**main internal continuation api */
class Terminal extends SettlerCls {
    static later(payload) {
        return new ReceiverCls((fn) => {
            return fn.apply(payload);
        });
    }
    static issue(self) {
        return new ReceiverCls(function (fn) {
            let promise = new Promise((resolve) => {
                resolve(self);
            });
            return fn.apply(promise);
        });
    }
    static value(self) {
        return Terminal.issue(E.left(self));
    }
    static error(self) {
        return Terminal.issue(E.right(self));
    }
}
class Fletcher {
    defer(p, cont) {
        return new Cycle(null);
    }
    toFletcher() {
        return this;
    }
    static Fun1R(fn) {
        return new FletcherFn(fn);
    }
    then(that) {
        return new Then(this, that);
    }
    static Terminal() {
        return new Terminal((a) => {
            return a.apply(new ts_deferred_1.Deferred());
        });
    }
}
exports.Fletcher = Fletcher;
class FletcherFn extends Fletcher {
    constructor(_apply) {
        super();
        this._apply = _apply;
    }
    defer(p, cont) {
        return receive(cont, Terminal.value(this._apply(p)));
    }
}
//apply: (a: ApplyApi<TerminalInput<unknown, Error>, Cycle>) => Cycle)
function forward(self, p) {
    return new ReceiverCls((k) => {
        let deferred = new ts_deferred_1.Deferred();
        let fst = self.defer(p, new Terminal((t_sink) => {
            let result = t_sink.apply(deferred);
            return result;
        }));
        let snd = k.apply(deferred.promise);
        return Cycle.seq(fst, snd);
    });
}
function receive(self, receiver) {
    return receiver.apply(new ApplyCls((a) => {
        return self.apply(new ApplyCls((b) => {
            a.then((v) => {
                b.resolve(v);
            });
            return new Cycle(null);
        }));
    }));
}
class Then extends Fletcher {
    constructor(lhs, rhs) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
    defer(p, cont) {
        var a = forward(this.lhs, p);
        return receive(cont, a.flat_fold(ok => forward(this.rhs, ok), no => Terminal.error(no)));
    }
}
// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {
//   }
// }

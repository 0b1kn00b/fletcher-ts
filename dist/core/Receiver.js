"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receiver = void 0;
const Cycle_1 = require("./Cycle");
const Settler_1 = require("./Settler");
const Apply_1 = require("./Apply");
const Either = require("fp-ts/Either");
class Receiver extends Settler_1.Settler {
    flat_fold(ok, no) {
        return new Receiver((cont) => {
            return this.apply(new Apply_1.Apply((p) => {
                let a = p.then((outcome) => {
                    let a = Either.match(ok, no)(outcome);
                    return a;
                });
                let b = a.then((x) => {
                    let a = x.apply(cont);
                    return a;
                });
                let c = new Cycle_1.Cycle(() => b);
                return c;
            }));
        });
    }
    handler(ok, no) {
        return Either.match(result => ok(result), error => {
            if (no) {
                no(error);
            }
            else {
                throw no;
            }
        });
    }
    zip(that) {
        return Receiver.Zip(this, that);
    }
    static Zip(self, that) {
        return new Receiver((f) => {
            var lhs = null;
            var rhs = null;
            let work_left = self.apply(new Apply_1.Apply((ocI) => {
                lhs = ocI;
                return Cycle_1.Cycle.Unit();
            }));
            var work_right = that.apply(new Apply_1.Apply((ocII) => {
                rhs = ocII;
                return Cycle_1.Cycle.Unit();
            }));
            return work_left.par(work_right).seq(new Cycle_1.Cycle(() => {
                let ipt = lhs.zip(rhs);
                let res = f.apply(ipt);
                return new Promise(resolve => resolve(res));
            }));
        });
    }
}
exports.Receiver = Receiver;
;

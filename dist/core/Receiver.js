"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receiver = void 0;
const Cycle_1 = require("./Cycle");
const Settler_1 = require("./Settler");
const Apply_1 = require("./Apply");
const Either = __importStar(require("fp-ts/Either"));
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

import { Work } from "./Work";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
/**
 * The `Junction` is responsible for both creating `Allocators` and fullfilling
 * Promises to them.
 * The `Allocator` can return `Work` to be done by a scheduler, which is passed through
 * the allocator.
 * @export
 * @class Allocator
 * @extends {Settler<Promise<R>>}
 * @typeParam R
 */
export class Allocator extends Settler {
    flat_fold(fn) {
        return new Allocator((cont) => {
            return this.apply(new Apply((p) => {
                let a = p.then((outcome) => {
                    return fn(outcome);
                });
                let b = a.then((x) => {
                    let a = x.apply(cont);
                    return a;
                });
                let c = new Work(() => b);
                return c;
            }));
        });
    }
    zip(that) {
        return Allocator.Zip(this, that);
    }
    static Zip(self, that) {
        return new Allocator((f) => {
            var lhs = null;
            var rhs = null;
            let work_left = self.apply(new Apply((ocI) => {
                lhs = ocI;
                //console.log("zip: set left");
                return Work.ZERO;
            }));
            var work_right = that.apply(new Apply((ocII) => {
                rhs = ocII;
                //console.log("zip: set right");
                return Work.ZERO;
            }));
            return work_left.par(work_right).seq(new Work(() => {
                let lhs_ = lhs;
                let rhs_ = rhs;
                let ipt = lhs_.then((okI) => rhs_.then((okII) => {
                    //console.log("zip: set both");
                    return { fst: okI, snd: okII };
                }));
                let nxt = ipt.then((p) => {
                    return [p.fst, p.snd];
                });
                let res = f.apply(nxt);
                return new Promise(resolve => {
                    //console.log('zip:zippped', res);
                    resolve(res);
                });
            }));
        });
    }
}
;

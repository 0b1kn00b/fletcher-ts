import { Deferred } from "ts-deferred";
/**
 * An item of work embeded in the after call, with the option
 * to return a promise of later work.
 */
export class Work {
    _after = null;
    constructor(_after) {
        var called = false;
        var result = null;
        this._after = () => {
            if (!called) {
                called = true;
                result = _after();
            }
            return result;
        };
    }
    get after() { return this._after == null ? null : this._after(); }
    static Seq(lhs, rhs) {
        ////console.log('seq');
        return new Work(() => {
            let a = lhs?.after;
            if (a != null) {
                ////console.log('after done');
                return new Promise((resolve) => a.then(x => {
                    ////console.log(x);
                    return Work.Seq(x, rhs);
                }).then(resolve));
            }
            else {
                ////console.log('rhs', rhs?.after);
                return rhs?.after;
            }
        });
    }
    seq(rhs) {
        return Work.Par(this, rhs);
    }
    par(rhs) {
        return Work.Par(this, rhs);
    }
    submit() {
        ////console.log('submit');
        return Work.Submit(this);
    }
    static Submit(self) {
        ////console.log('submit');
        let deferred = new Deferred();
        ////console.log('timeout');
        if (self != null) {
            const after = self.after;
            if (after != null) {
                ////console.log('after:')
                after.then(x => {
                    if (x != null) {
                        ////console.log('resubmit');
                        Work.Submit(x).then(x => deferred.resolve(x), e => deferred.reject(e));
                    }
                    else {
                        ////console.log('end x');
                        deferred.resolve(null);
                    }
                });
            }
            else {
                ////console.log('end after')
                deferred.resolve(null);
            }
        }
        else {
            ////console.log('end');
            deferred.resolve(null);
        }
        return deferred.promise;
    }
    static Par(self, that) {
        //console.log(self,that);
        let l = self.after ?? Promise.resolve(Work.ZERO);
        let r = that.after ?? Promise.resolve(Work.ZERO);
        //console.log(l,r);
        let a = Promise.all([l, r]);
        a.then(x => {
            //console.log('par:done', x);
        });
        //return Work.ZERO;
        return Work.Pure(a.then(([l, r]) => {
            //console.log('par:combine',l);
            const do_left = !(l === Work.ZERO);
            const do_right = !(r === Work.ZERO);
            //console.log('doos',do_left,do_right);
            var result = Work.ZERO;
            if (do_left) {
                if (do_right) {
                    result = Work.Par(l, r);
                }
                else {
                    result = l;
                }
            }
            else if (do_right) {
                result = r;
            }
            //console.log('result',result, result == Work.ZERO);
            return result;
        }));
    }
    static ZERO = new Work(null);
    // static Unit(){
    //   return new Work(null);
    // }
    static Pure(self) {
        return new Work(() => self);
    }
}

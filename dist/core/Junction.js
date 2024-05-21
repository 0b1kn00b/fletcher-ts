import { Allocator } from "./Allocator";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
import { Work } from "./Work";
/**
 * Junction represents the contiuation passed through the Arrowlets to run them
 *
 * @class Junction
 * @extends {SettlerCls<Deferred<R>>}
 * @typeParam R
 * @typeParam E
 */
export class Junction extends Settler {
    receive(receiver) {
        //console.log('receiver called');``
        return receiver.apply(new Apply((a) => {
            return this.apply(new Apply((b) => {
                let result = a.then((v) => {
                    //console.log('receiver inner',v);
                    b.resolve(v);
                });
                return new Work(() => {
                    //console.log('receiver done');
                    return result.then(_ => {
                        //console.log('receiver unit');
                        return Work.ZERO;
                    });
                });
            }));
        }));
    }
    static later(payload) {
        return new Allocator((fn) => {
            return fn.apply(payload);
        });
    }
    static issue(self) {
        return new Allocator(function (fn) {
            let promise = new Promise((resolve) => {
                resolve(self);
            });
            return fn.apply(promise);
        });
    }
    static Pure(deferred) {
        return new Junction((a) => {
            return a.apply(deferred);
        });
    }
}

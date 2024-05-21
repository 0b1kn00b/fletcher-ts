import { Deferred } from "ts-deferred";
import * as E from "fp-ts/Either";
import { Allocator } from "./Allocator";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
import { Work } from "./Work";

//Discharge
export type JunctionSink<R>       = Apply<Deferred<R>,Work.Work>;

/**
 * Junction represents the contiuation passed through the Arrowlets to run them
 *
 * @class Junction
 * @extends {SettlerCls<Deferred<R>>}
 * @typeParam R
 * @typeParam E
 */
export class Junction<R> extends Settler<Deferred<R>> {
  receive(receiver:Allocator<R>):Work.Work{
    //console.log('receiver called');``
    return receiver.apply(
      new Apply(
        (a:Promise<R>):Work.Work => {
          return this.apply(
            new Apply(
              (b:Deferred<R>):Work.Work => {
                return Work.fromPromise(
                  a.then(
                    (v) => {
                      //console.log('receiver inner',v);
                      b.resolve(v);
                      return Work.ZERO;
                    }
                  )
                );
              }
            )
          );
        }
      )
    )
  }
  static later<R>(payload: Promise<R>): Allocator<R> {
    return new Allocator(
      (fn: Apply<Promise<R>, Work.Work>): Work.Work => {
        return fn.apply(payload);
      }
    );
  }
  static issue<R>(self: R) {
    return new Allocator(
      function (fn: Apply<Promise<R>, Work.Work>): Work.Work {
        let promise: Promise<R> = new Promise(
          (resolve) => {
            resolve(self);
          }
        );
        return fn.apply(promise);
      }
    )
  }
  static Pure<R>(deferred:Deferred<R>):Junction<R>{
    return new Junction(
      (a:Apply<Deferred<R>,Work.Work>)=>{
        return a.apply(deferred);
      }
    );
  }
}

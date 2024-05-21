import { Deferred } from "ts-deferred";
import { forward, resolve } from "src/util";
import { Effect } from "effect";
/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
export class Apply<A, B> { 
  private _apply: (a: A) => B; 
  constructor(_apply: (a: A) => B) { this._apply = _apply; } 
  apply(a: A):B { return this._apply(a); } 
}
export class Cont<P, R> extends Apply<Apply<P, R>, R> { }
export class Settler<P> extends Cont<P, Work.Work> { };

/**
 * The `Junction` is responsible for both creating `Allocators` and fullfilling
 * Promises to them.
 * The `Allocator` can return `Work.Work` to be done by a scheduler, which is passed through
 * the allocator. 
 * @export
 * @class Allocator
 * @extends {Settler<Promise<R>>}
 * @typeParam R
 */
export class Allocator<R> extends Settler<Promise<R>>{
  flat_fold<Ri>(fn:(r:R)=>Allocator<Ri>):Allocator<Ri>{
    return new Allocator(
      (cont:Apply<Promise<Ri>,Work.Work>) => {
        return this.apply(
          new Apply(
            (p:Promise<R>) => {
              let a = p.then(
                (outcome:R) : Allocator<Ri> => {
                  return fn(outcome);
                }
              );
              let b = a.then(
                (x:Allocator<Ri>):Work.Work => {
                  let a : Work.Work = x.apply(cont);
                  return a;
                }
              );
              let c = Work.fromPromise(b);
              return c;
            }
          )
       ); 
      }
    );
  }
  zip<Ri>(that:Allocator<Ri>){
    return Allocator.Zip(this,that);
  }
  static Zip<R,Ri>(self:Allocator<R>,that:Allocator<Ri>):Allocator<[R,Ri]>{
    return new Allocator(
      (f:Apply<Promise<[R,Ri]>,Work.Work>) => {
          var lhs  : Promise<R>     | null = null;
          var rhs  : Promise<Ri>    | null = null;
          let work_left  = self.apply(
            new Apply((ocI)   => {
              lhs = ocI;
              //console.log("zip: set left");
              return Work.ZERO;
            })
          );
          var work_right = that.apply(
            new Apply((ocII)  => {
              rhs = ocII;
              //console.log("zip: set right");
              return Work.ZERO;
            })
          );
          return Work.Seq(Work.Par(work_left,work_right),
            f.apply(
              Promise.all([lhs,rhs]).then(
                (values) => {
                  let tuple : [R,Ri] = [values[0],values[1]];
                  return tuple;
                }
              )
            )
          );
        }
    );
  }
};




export interface Arrowlet<P, R> {
  defer(p: P, cont: Junction<R>): Work.Work;
  //toArrowlet(): Arrowlet<P, R, E>;
}
export namespace Work{
  export type Work = Effect.Effect<Work | void, never, never>; 
  export function Seq(lhs:Work,rhs:Work):Work{
    return Effect.flatMap(lhs,
        (x:Work) => x == null ? rhs : Work.Seq(x,rhs)
    )
  }
  export function Par(self:Work,that:Work):Work{
    return Effect.raceAll([self,that]);
  }
  export const ZERO : Work = Effect.void;
  export function fromPromise(promise:Promise<Work>):Work{
    return Effect.async(
      (callback,signal) => {
        promise.then(
          value => callback(value)
        )
      }
    );
  }
  export function fromThunk(thunk:() => Work):Work{
    return Effect.async(
      (callback,signal) => {
        callback(thunk())
      }
    )
  }
  export function Submit(self:Work){
    return Effect.runCallback(self);
  }
  export function Promise(self:Work){
    return Effect.runPromise(self);
  }
}

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
  /**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/

  static Unit<R>():Junction<R>{
    return new Junction(
      (a:Apply<Deferred<R>,Work.Work>):Work.Work => {
        return a.apply(new Deferred());
      }
    )
  }

}
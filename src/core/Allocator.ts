import { Cont } from "./Cont";
import { Work } from "./Work";
import { Settler } from "./Settler";
import { Apply } from "./Apply";

import * as Either from "fp-ts/Either";

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
export class Allocator<R> extends Settler<Promise<R>>{
  flat_fold<Ri>(fn:(r:R)=>Allocator<Ri>):Allocator<Ri>{
    return new Allocator(
      (cont:Apply<Promise<Ri>,Work>) => {
        return this.apply(
          new Apply(
            (p:Promise<R>) => {
              let a = p.then(
                (outcome:R) : Allocator<Ri> => {
                  return fn(outcome);
                }
              );
              let b = a.then(
                (x:Allocator<Ri>):Work => {
                  let a : Work = x.apply(cont);
                  return a;
                }
              );
              let c = new Work(() => b);
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
      (f:Apply<Promise<[R,Ri]>,Work>) => {
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
          return work_left.par(work_right).seq(
            new Work(
              () => {
                let lhs_ : Promise<R>   = lhs!;
                let rhs_ : Promise<Ri>  = rhs!;
                let ipt = 
                  lhs_.then(
                    (okI:R) => rhs_.then(
                      (okII:Ri) => { 
                        //console.log("zip: set both");
                        return {fst : okI, snd : okII} 
                      }
                    )
                  );

                let nxt = ipt.then(
                  (p:{ fst : R,snd : Ri}):[R,Ri] => {
                    return [p.fst,p.snd];
                  }
                );
                let res = f.apply(nxt);
                return new Promise(
                  resolve => {
                    //console.log('zip:zippped', res);
                    resolve(res)
                  }
                );
              }
            )
          );
        }
    );
  }
};


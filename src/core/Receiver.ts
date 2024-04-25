import { Cont } from "./Cont";
import { Cycle } from "./Cycle";
import { Result } from "./Result";
import { Settler } from "./Settler";
import { Apply } from "./Apply";

import * as E from "fp-ts/Either";
import { Fletcher } from '..';

/**Type only createable through Terminal that resolves a Arrowlet*/
export type ReceiverInput<R, E>   = Promise<Result<R, E>>;
export type ReceiverSink<R,E>     = Apply<ReceiverInput<R,E>,Cycle>;
export class Receiver<R, E> extends Settler<ReceiverInput<R, E>>{
  flat_fold<Ri>(ok:(r:R)=>Receiver<Ri,E>,no:(e:E)=>Receiver<Ri,E>):Receiver<Ri,E>{
    return new Receiver(
      (cont:Apply<ReceiverInput<Ri,E>,Cycle>) => {
        return this.apply(
          new Apply(
            (p:ReceiverInput<R,E>) => {
              let a = p.then(
                (outcome:Result<R,E>) : Receiver<Ri,E> => {
                  let a = E.match(ok,no)(outcome);
                  return a;
                }
              );
              let b = a.then(
                (x:Receiver<Ri,E>):Cycle => {
                  let a : Cycle = x.apply(cont);
                  return a;
                }
              );
              let c = new Cycle(() => b);
              return c;
            }
          )
       ); 
      }
    );
  }
  zip<Ri>(that:Receiver<Ri,E>){
    return Receiver.Zip(this,that);
  }
  static Zip<R,Ri,E>(self:Receiver<R,E>,that:Receiver<Ri,E>):Receiver<[R,Ri],E>{
    return new Receiver(
      (f:Apply<ReceiverInput<[R,Ri],E>,Cycle>) => {
          var lhs        = null;
          var rhs        = null;
          let work_left  = self.apply(
            new Apply((ocI)   => {
              lhs = ocI;
              return Cycle.Unit();
            })
          );
          var work_right = that.apply(
            new Apply((ocII)  => {
              rhs = ocII;
              return Cycle.Unit();
            })
          );
          return work_left.par(work_right).seq(
            new Cycle(
              () => {
                let ipt = lhs.zip(rhs);
                let res = f.apply(ipt);
                return new Promise(
                  resolve => resolve(res)
                );
              }
            )
          );
        }
    );
  }
};


import { Cont } from "./Cont";
import { Cycle } from "./Cycle";
import { Result } from "./Result";
import { Settler } from "./Settler";
import { Apply } from "./Apply";

import * as Either from "fp-ts/Either";

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
                  let a = Either.match(ok,no)(outcome);
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
  public handler(ok:(result:R)=>void,no?:(error:E)=>void):(result:Result<R,E>) => void{
    return Either.match(
      result => ok(result),
      error  => {
        if(no){
          no(error)
        }else{
          throw no;
        }
      } 
    );
  }
  zip<Ri>(that:Receiver<Ri,E>){
    return Receiver.Zip(this,that);
  }
  static Zip<R,Ri,E>(self:Receiver<R,E>,that:Receiver<Ri,E>):Receiver<[R,Ri],E>{
    return new Receiver(
      (f:Apply<ReceiverInput<[R,Ri],E>,Cycle>) => {
          var lhs  : ReceiverInput<R, E>     | null = null;
          var rhs  : ReceiverInput<Ri, E>    | null = null;
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
                let lhs_ : ReceiverInput<R,E>   = lhs!;
                let rhs_ : ReceiverInput<Ri,E>  = rhs!;
                let ipt = 
                  lhs_.then(
                    (okI:Result<R, E>) => rhs_.then(
                      (okII:Result<Ri, E>) => { 
                        return {fst : okI, snd : okII} 
                      }
                    )
                  );

                let nxt = ipt.then(
                  (p:{ fst : Result<R,E>,snd : Result<Ri,E>}):Result<[R,Ri],E> => {
                    return Either.fold(
                      (l:R) => {
                        return Either.fold(
                          (lI:Ri) => {
                            let res : [R,Ri] = [l,lI]; 
                            return Either.left(res);
                          },
                          (r:E)   => Either.right(r)
                        )(p.snd)
                      },
                      (r:E) => Either.right(r)
                    )(p.fst);
                  }
                );
                let res = f.apply(nxt);
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


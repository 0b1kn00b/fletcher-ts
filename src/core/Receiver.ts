import { Cont } from "./Cont";
import { Cycle } from "./Cycle";
import { Result } from "./Result";
import { Settler } from "./Settler";
import { Apply } from "./Apply";

import * as Either from "fp-ts/Either";

/**Type only createable through Terminal that resolves a Arrowlet*/
export type ReceiverInput<R>   = Promise<Result<R>>;
export type ReceiverSink<R>     = Apply<ReceiverInput<R>,Cycle>;
export class Receiver<R> extends Settler<ReceiverInput<R>>{
  flat_fold<Ri>(ok:(r:R)=>Receiver<Ri>,no:(e:Error)=>Receiver<Ri>):Receiver<Ri>{
    return new Receiver(
      (cont:Apply<ReceiverInput<Ri>,Cycle>) => {
        return this.apply(
          new Apply(
            (p:ReceiverInput<R>) => {
              let a = p.then(
                (outcome:Result<R>) : Receiver<Ri> => {
                  let a = Either.match(ok,no)(outcome);
                  return a;
                }
              );
              let b = a.then(
                (x:Receiver<Ri>):Cycle => {
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
  public handler(ok:(result:R)=>void,no?:(error:Error)=>void):(result:Result<R>) => void{
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
  zip<Ri>(that:Receiver<Ri>){
    return Receiver.Zip(this,that);
  }
  static Zip<R,Ri>(self:Receiver<R>,that:Receiver<Ri>):Receiver<[R,Ri]>{
    return new Receiver(
      (f:Apply<ReceiverInput<[R,Ri]>,Cycle>) => {
          var lhs  : ReceiverInput<R>     | null = null;
          var rhs  : ReceiverInput<Ri>    | null = null;
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
                let lhs_ : ReceiverInput<R>   = lhs!;
                let rhs_ : ReceiverInput<Ri>  = rhs!;
                let ipt = 
                  lhs_.then(
                    (okI:Result<R>) => rhs_.then(
                      (okII:Result<Ri>) => { 
                        return {fst : okI, snd : okII} 
                      }
                    )
                  );

                let nxt = ipt.then(
                  (p:{ fst : Result<R>,snd : Result<Ri>}):Result<[R,Ri]> => {
                    return Either.fold(
                      (l:R) => {
                        return Either.fold(
                          (lI:Ri) => {
                            let res : [R,Ri] = [l,lI]; 
                            return Either.left(res);
                          },
                          (r:Error)   => Either.right(r)
                        )(p.snd)
                      },
                      (r:Error) => Either.right(r)
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


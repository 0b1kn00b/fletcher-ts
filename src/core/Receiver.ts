import { Cycle, Result, Settler, Apply } from "@fletcher-ts/core";
import * as E from "fp-ts/Either";

/**Type only createable through Terminal that resolves a Arrowlet*/
export type ReceiverInput<R, E>   = Promise<Result<R, E>>;
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
};


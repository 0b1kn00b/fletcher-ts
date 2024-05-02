import { Receiver } from "./core/Receiver";
import { Deferred } from "ts-deferred";
import { ArrowletApi } from "./core/ArrowletApi";
import { Cycle } from "./core/Cycle";
import { ReceiverSink } from "./core/Receiver";
import { TerminalInput } from "./core/Terminal";
import { Apply } from "./core/Apply";
import { Terminal } from "./core/Terminal";
import { Result } from "./core/Result";
import { Fun } from "./term/Fun";

export function forward<P,R>(self:ArrowletApi<P,R>, p: P) : Receiver<R>{
  return new Receiver(
    (k:ReceiverSink<R>): Cycle => {
      let deferred : TerminalInput<R> = new Deferred();
      let fst      = self.defer(
        p,
        new Terminal(
          (t_sink:Apply<TerminalInput<R>,Cycle>):Cycle => {
            let result = t_sink.apply(deferred);
            return result;
          }
        )
      );
      let snd       = k.apply(deferred.promise);
      return Cycle.Seq(fst,snd);
    }
  );
}
export function resolve<P,R>(self:ArrowletApi<P,R>,input:P):Promise<Result<R>>{
  //console.log('resolve init');
  let deferred : Deferred<Result<R>> = new Deferred();
  let cycle = self.defer(
    input,
    Terminal.Pure(deferred)
  );
  //console.log('resolve: post defer');
  let finish  = cycle.submit();
  //console.log('resolve: post submit')
  return finish.then(
    () => {
      //console.log('resolve resolved')
      return deferred.promise.then(
        x => {
          //console.log('deferred resolved');
          return x;
        }
      );
    }
  );
}
/**
 * normallly as ArrowletApi<void,void> to drive Arrow
 * @returns 
 */
export function unit<Pi,Ri>():ArrowletApi<Pi,Ri>{
  return new Fun((pi:Pi) => {return (null as Ri)});
}
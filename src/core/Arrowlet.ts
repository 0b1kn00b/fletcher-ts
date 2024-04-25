import { Terminal, Apply, TerminalInput, Cycle, Receiver, ReceiverSink } from "@fletcher-ts/core";
import { Then } from "@fletcher-ts/term";
import { Deferred } from "ts-deferred";

interface ArrowletApi<P, Pi, E> {
  defer(p: P, cont: Terminal<Pi, E>): Cycle;
  toArrowlet(): Arrowlet<P, Pi, E>;
}
export class Arrowlet<P, Pi, E> implements ArrowletApi<P, Pi, E>{
  defer(p:P,cont:Terminal<Pi,E>):Cycle{
    return new Cycle(null);
  }
  toArrowlet(): Arrowlet<P, Pi, E> {
    return this;
  }
  forward(p: P) {
    return new Receiver(
      (k:ReceiverSink<Pi,E>): Cycle => {
        let deferred : TerminalInput<Pi,E> = new Deferred();
        let fst      = this.defer(
          p,
          new Terminal(
            (t_sink:Apply<TerminalInput<Pi,E>,Cycle>):Cycle => {
              let result = t_sink.apply(deferred);
              return result;
            }
          )
        );
        let snd       = k.apply(deferred.promise);
        return Cycle.seq(fst,snd);
      }
    );
  }
  then<R>(that:Arrowlet<Pi,R,E>):Arrowlet<P,R,E>{
    return new Then(this,that);
  }
}
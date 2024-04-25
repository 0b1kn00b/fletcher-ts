import { Terminal, Apply, TerminalInput, Cycle, Receiver, ReceiverInput } from "@fletcher-ts/core";
import { Then } from "@fletcher-ts/term";
import { Deferred } from "ts-deferred";

interface ArrowletApi<P, Pi, E> {
  defer(p: P, cont: Terminal<Pi, E>): Cycle;
  toArrowlet(): Arrowlet<P, Pi, E>;
}

function receive<P,E>(self:Terminal<P,E>,receiver:Receiver<P,E>):Cycle{
  return receiver.apply(
    new Apply(
      (a:ReceiverInput<P,E>):Cycle => {
        return self.apply(
          new Apply(
            (b:TerminalInput<P,E>):Cycle => {
              a.then(
                (v) => {
                  b.resolve(v);
                }
              );
              return new Cycle(null);
            }
          )
        );
      }
    )
  )
}
function forward<P, Pi, E>(self: Arrowlet<P, Pi, E>, p: P) {
  return new Receiver(
    (k:Receiver<Pi,E>): Cycle => {
      let deferred : TerminalInput<Pi,E> = new Deferred();
      let fst      = self.defer(
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
export class Arrowlet<P, Pi, E> implements ArrowletApi<P, Pi, E>{
  defer(p:P,cont:Terminal<Pi,E>):Cycle{
    return new Cycle(null);
  }
  toArrowlet(): Arrowlet<P, Pi, E> {
    return this;
  }
  forward(p:P){
    return forward(this,p);
  }
  then<R>(that:Arrowlet<Pi,R,E>):Arrowlet<P,R,E>{
    return new Then(this,that);
  }

}
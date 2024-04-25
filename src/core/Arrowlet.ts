import { Terminal, TerminalInput } from "./Terminal";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";
import { Receiver, ReceiverSink } from "./Receiver";

import { Then } from "../term/Then";
import { Deferred } from "ts-deferred";
import { Fletcher } from "..";

interface ArrowletApi<P, R, E> {
  defer(p: P, cont: Terminal<R, E>): Cycle;
  toArrowlet(): Arrowlet<P, R, E>;
}
export class Arrowlet<P, R, E> implements ArrowletApi<P, R, E>{
  constructor(){

  }
  defer(p:P,cont:Terminal<R,E>):Cycle{
    return new Cycle(null);
  }
  toArrowlet(): Arrowlet<P, R, E> {
    return this;
  }
  forward(p: P) {
    return new Receiver(
      (k:ReceiverSink<R,E>): Cycle => {
        let deferred : TerminalInput<R,E> = new Deferred();
        let fst      = this.defer(
          p,
          new Terminal(
            (t_sink:Apply<TerminalInput<R,E>,Cycle>):Cycle => {
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
  then<Ri>(that:Arrowlet<R,Ri,E>):Arrowlet<P,Ri,E>{
    return new Then(this,that);
  }
  pair<Pi,Ri>(that:Arrowlet<Pi,Ri,E>){
    return Fletcher.Pair(this,that);
  }
  split<Ri>(that:Arrowlet<P,Ri,E>):Arrowlet<P,[R,Ri],E>{
    return Fletcher.Split(this,that);
  }
  flat_map<Ri>(fn:(r:R) => Arrowlet<P,Ri,E>){
    return Fletcher.Anon(
      (p:P,cont:Terminal<Ri,E>) => {
        return cont.receive(this.forward(p).flat_fold(
          ok => fn(ok).forward(p),
          no => Terminal.error(no)
        ));
      }
    );
  }
  first<Pi,Ri,E>(self:Arrowlet<Pi,Ri,E>){
    return Fletcher.Pair(self,Fletcher.Unit());
  }
  pinch<Ri>(self:Arrowlet<P,R,E>,that:Arrowlet<P,Ri,E>):Arrowlet<P,[R,Ri],E>{
    return Fletcher.Anon((p:P,cont:Terminal<[R,Ri],E>) => cont.receive(
      self.forward(p).zip(that.forward(p))
    ));
  }
  joint<Ri>(rhs:Arrowlet<R,Ri,E>):Arrowlet<P,[R,Ri],E>{
    let rhs_u : Arrowlet<R,R,E>       = Fletcher.Unit();
    let rhs_a     = rhs_u.split(rhs);
    return Fletcher.Then(this,rhs_a);
  }
  bound<Ri>(that:Arrowlet<[P,R],Ri,E>):Arrowlet<P,Ri,E>{
    let u : Arrowlet<P,P,E> = Fletcher.Unit();
    return Fletcher.Joint(u,this).then(that);
  }
  broach<Ri>(self:Arrowlet<R,Ri,E>):Arrowlet<R,[R,Ri],E>{
    return Fletcher.Bound(self,Fletcher.Fun1R(x => x));
  }
}
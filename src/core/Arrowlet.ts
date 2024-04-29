import { Terminal, TerminalInput } from "./Terminal";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";
import { Receiver, ReceiverSink } from "./Receiver";

import { Then } from "../term/Then";
import { Deferred } from "ts-deferred";
import { Fletcher } from "..";
import { Payload } from "./Payload";
import { Result } from "./Result";
import * as E from 'fp-ts/Either';
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
  broach():Arrowlet<P,[P,R],E>{
    return Fletcher.Bound(this,Fletcher.Fun1R(x => x));
  }
  resolve(input:P):Promise<Result<R,E>>{
    //console.log('resolve init');
    let deferred : Deferred<Result<R,E>> = new Deferred();
    let all = this.then(
      Fletcher.Fun1R(
      (ok:R) => {
        //console.log('resolve:::', ok);
        deferred.resolve(E.left(ok));
        return ok;
      })
    );
    //console.log('resolve: pre defer');
    let cycle   = all.defer(input,Fletcher.Terminal())
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
}
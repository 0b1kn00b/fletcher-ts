import { Terminal, TerminalInput } from "./Terminal";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";
import { Receiver, ReceiverSink } from "./Receiver";
import { ArrowletApi } from "./ArrowletApi";
import { Then } from "../term/Then";
import { Deferred } from "ts-deferred";
import { Fletcher } from "..";
import { Payload } from "./Payload";
import { Result } from "./Result";
import * as E from 'fp-ts/Either';
import { Delegate } from "src/term/Delegate";

export class Arrowlet<P, R, E> implements ArrowletApi<P, R, E>{
  constructor(){

  }
  forward(p:P):Receiver<R,E>{
    return Fletcher.forward(this,p);
  }
  defer(p:P,cont:Terminal<R,E>):Cycle{
    return new Cycle(null);
  }
  then<Ri>(that:ArrowletApi<R,Ri,E>):Arrowlet<P,Ri,E>{
    return Arrowlet.Delegate(new Then(this,that));
  }
  pair<Pi,Ri>(that:ArrowletApi<Pi,Ri,E>){
    return Arrowlet.Delegate(Fletcher.Pair(this,that));
  }
  split<Ri>(that:ArrowletApi<P,Ri,E>):Arrowlet<P,[R,Ri],E>{
    return Arrowlet.Delegate(Fletcher.Split(this,that));
  }
  flat_map<Ri>(fn:(r:R) => ArrowletApi<P,Ri,E>):Arrowlet<P,Ri,E>{
    return Arrowlet.Delegate(Fletcher.Anon(
      (p:P,cont:Terminal<Ri,E>) => {
        return cont.receive(this.forward(p).flat_fold(
          ok => Fletcher.forward(fn(ok),p),
          no => Terminal.error(no)
        ));
      }
    ));
  }
  first<Pi,Ri,E>(self:Arrowlet<Pi,Ri,E>):Arrowlet<[Pi,R],[Ri,R],E>{
    return Arrowlet.Delegate(Fletcher.Pair(self,Fletcher.Unit()));
  }
  pinch<Ri>(self:Arrowlet<P,R,E>,that:Arrowlet<P,Ri,E>):Arrowlet<P,[R,Ri],E>{
    return Arrowlet.Delegate(Fletcher.Anon((p:P,cont:Terminal<[R,Ri],E>) => cont.receive(
      Fletcher.forward(self,p).zip(that.forward(p))
    )));
  }
  joint<Ri>(rhs:Arrowlet<R,Ri,E>):Arrowlet<P,[R,Ri],E>{
    let rhs_u : Arrowlet<R,R,E>       = Arrowlet.Delegate(Fletcher.Unit());
    let rhs_a     = rhs_u.split(rhs);
    return Arrowlet.Delegate(Fletcher.Then(this,rhs_a));
  }
  bound<Ri>(that:Arrowlet<[P,R],Ri,E>):Arrowlet<P,Ri,E>{
    let u : Arrowlet<P,P,E> = Arrowlet.Delegate(Fletcher.Unit());
    return Arrowlet.Delegate(Fletcher.Joint(u,this)).then(that);
  }
  broach():Arrowlet<P,[P,R],E>{
    return Arrowlet.Delegate(Fletcher.Bound(this,Fletcher.Fun1R(x => x)));
  }
  public resolve(input:P):Promise<Result<R,E>>{
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
  static Delegate<P,R,E>(self:ArrowletApi<P,R,E>):Arrowlet<P,R,E>{
    return new Delegate(self);
  }
}
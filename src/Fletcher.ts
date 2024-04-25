import {Deferred} from "ts-deferred";
import { Terminal, TerminalInput } from "./core/Terminal";
import { Apply } from "./core/Apply";
import { Cycle } from "./core/Cycle";
import { Arrowlet } from "./core/Arrowlet";
import { Fun } from "./term/Fun";
import { Anon } from "./term/Anon";
import { Then } from "./term/Then";
/** Returns Cycle from Continuation */

/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/

export class Fletcher{
  static Terminal<P,E>(){
    return new Terminal(
      (a:Apply<TerminalInput<P,E>,Cycle>):Cycle => {
        return a.apply(new Deferred());
      }
    )
  }
  static Fun1R<P,R,E>(fn:(p:P)=>R):Arrowlet<P,R,E>{
    return new Fun(fn);
  }
  static Unit<P,E>():Arrowlet<P,P,E>{
    return new Fun((x) => x);
  }
  static Pure<P,R,E>(r:R):Arrowlet<P,R,E>{
    return new Fun((_:P) => r);
  }
  static Anon<P,R,E>(fn:(p:P,cont:Terminal<R,E>) => Cycle):Arrowlet<P,R,E>{
    return new Anon(fn);

  }
  static Then<Pi,Pii,R,E>(lhs:Arrowlet<Pi,Pii,E>,rhs:Arrowlet<Pii,R,E>):Arrowlet<Pi,R,E>{
    return new Then(lhs,rhs);
  }
  static FlatMap<Pi,R,Ri,E>(self:Arrowlet<Pi,R,E>,fn:(r:R) => Arrowlet<Pi,Ri,E>){
    return Fletcher.Anon(
      (p:Pi,cont:Terminal<Ri,E>) => {
        return cont.receive(self.forward(p).flat_fold(
          ok => fn(ok).forward(p),
          no => Terminal.error(no)
        ));
      }
    );
  }
  static Pair<Pi,Ri,Pii,Rii,E>(self:Arrowlet<Pi,Ri,E>,that:Arrowlet<Pii,Rii,E>){
    return Fletcher.Anon(
      (p:[Pi,Pii],cont:Terminal<[Ri,Rii],E>) => {
        let [l, r] = p;
        let lhs = self.forward(l);
        let rhs = that.forward(r);
        return cont.receive(lhs.zip(rhs)); 
      }
    );
  } 
  static Split<Pi,Ri,Rii,E>(self:Arrowlet<Pi,Ri,E>,that:Arrowlet<Pi,Rii,E>):Arrowlet<Pi,[Ri,Rii],E>{
    return Fletcher.Anon(
      (p:Pi,cont:Terminal<[Ri,Rii],E>) => {
        return Fletcher.Pair(self,that).defer([p,p],cont);
      } 
    );
  }
  static First<Pi,Ri,E>(self:Arrowlet<Pi,Ri,E>){
    return Fletcher.Pair(self,Fletcher.Unit());
  }
  static Pinch<P,Ri,Rii,E>(self:Arrowlet<P,Ri,E>,that:Arrowlet<P,Rii,E>):Arrowlet<P,[Ri,Rii],E>{
    return Fletcher.Anon((p:P,cont:Terminal<[Ri,Rii],E>) => cont.receive(
      self.forward(p).zip(that.forward(p))
    ));
  }
  static Joint<Pi,Ri,Rii,E>(lhs:Arrowlet<Pi,Ri,E>,rhs:Arrowlet<Ri,Rii,E>):Arrowlet<Pi,[Ri,Rii],E>{
    let rhs_u : Arrowlet<Ri,Ri,E> = Fletcher.Unit();
    let rhs_a : Arrowlet<Ri,[Ri,Rii],E> = rhs_u.split(rhs);
    return Fletcher.Then(lhs,rhs_a);
  }
  static Bound<P,Ri,Rii,E>(self:Arrowlet<P,Ri,E>,that:Arrowlet<[P,Ri],Rii,E>):Arrowlet<P,Rii,E>{
    let u : Arrowlet<P,P,E> = Fletcher.Unit();
    return Fletcher.Joint(u,self).then(that);
  }
  static Broach<Ri,Rii,E>(self:Arrowlet<Ri,Rii,E>):Arrowlet<Ri,[Ri,Rii],E>{
    return Fletcher.Bound(self,Fletcher.Fun1R(x => x));
  }
}






// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
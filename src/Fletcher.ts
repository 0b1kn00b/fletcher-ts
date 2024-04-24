import * as E from "fp-ts/Either";
import {Deferred} from "ts-deferred";

type Outcome<A, E> = E.Either<A, E>;
/** Something that happens and maybe after that another thing*/
class Cycle {
  private _after: (() => (Promise<Cycle> | null)) | null = null;
  constructor(_after: ((() => (Promise<Cycle> | null)) | null)) { this._after = _after; }
  get after() { return this._after == null ? null : this._after(); }

  static seq(lhs:Cycle,rhs:Cycle):Cycle{
    //console.log('seq');
    return new Cycle(
      () => {
        let a = lhs?.after;
        if(a!=null){
          //console.log('after done');
          return new Promise(
            (resolve) => a.then(
              x => {
                //console.log(x);
                return Cycle.seq(x,rhs);
              }
            ).then(resolve)
          );
        }else{
          //console.log('rhs', rhs?.after);
          return rhs?.after;
        }
      }
    );
  }
  submit(){
    //console.log('submit');
    Cycle.Submit(this);
  }
  static Submit(self:Cycle){
    setTimeout(
      () => {
        //console.log('timeout');
        if(self!=null){
          if(self.after != null){
            self.after.then(
              x => {if(x!=null){
                Cycle.Submit(x);
              }}
            );
          }else{
            //console.log('after empty');
          }
        }else{
          //console.log('empty');
        }
      }
    );
  }
}
/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
interface ApplyApi<A, B> { apply(a: A): B; }
class ApplyCls<A, B> { 
  private _apply: (a: A) => B; 
  constructor(_apply: (a: A) => B) { this._apply = _apply; } 
  apply(a: A):B { return this._apply(a); } 
}
/**interface of continuation monad */
interface ContApi<P, R> extends ApplyCls<ApplyCls<P, R>, R> { }
class ContCls<P, R> extends ApplyCls<ApplyCls<P, R>, R> implements ContApi<P, R> { }
/** A function like this resolves a Promise, return acts as a canceller*/
/** Input to Terminal continuation*/
type Payload<T, E> = Promise<Outcome<T, E>>;
type Handler<T>         = ApplyCls<T,void>;
type PromiseTrigger<R>  = ApplyCls<R,void>;
type TerminalInput<T, E>     = Deferred<Outcome<T, E>>;
type TerminalSinkCls<R,E>    = ApplyCls<TerminalInput<R,E>,Cycle>;
/** Returns Cycle from Continuation */
interface SettlerApi<P> extends ContApi<P, Cycle> { }
class SettlerCls<P> extends ContCls<P, Cycle> { };
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
type TerminalApi<R, E> = SettlerApi<TerminalInput<R, E>>;
/**Type only createable through Terminal that resolves a fletcher*/
type ReceiverInput<R, E>  = Promise<Outcome<R, E>>;
type ReceiverSinkCls<R,E> = ApplyCls<ReceiverInput<R,E>,Cycle>;
type ReceiverApi<R, E> = ContApi<ReceiverInput<R, E>, Cycle>;
class ReceiverCls<R, E> extends SettlerCls<ReceiverInput<R, E>> implements ReceiverApi<R, E> {
  flat_fold<Ri>(ok:(r:R)=>ReceiverCls<Ri,E>,no:(e:E)=>ReceiverCls<Ri,E>):ReceiverCls<Ri,E>{
    return new ReceiverCls(
      (cont:ApplyCls<ReceiverInput<Ri,E>,Cycle>) => {
        return this.apply(
          new ApplyCls(
            (p:ReceiverInput<R,E>) => {
              let a = p.then(
                (outcome:Outcome<R,E>) : ReceiverCls<Ri,E> => {
                  let a = E.match(ok,no)(outcome);
                  return a;
                }
              );
              let b = a.then(
                (x:ReceiverCls<Ri,E>):Cycle => {
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
/**main internal continuation api */
class Terminal<R, E> extends SettlerCls<TerminalInput<R, E>> implements TerminalApi<R, E> {
  static later<R, E>(payload: Payload<R, E>): ReceiverCls<R, E> {
    return new ReceiverCls(
      (fn: ApplyCls<ReceiverInput<R, E>, Cycle>): Cycle => {
        return fn.apply(payload);
      }
    );
  }
  static issue<R, E>(self: Outcome<R, E>) {
    return new ReceiverCls(
      function (fn: ApplyCls<ReceiverInput<R, E>, Cycle>): Cycle {
        let promise: ReceiverInput<R, E> = new Promise(
          (resolve) => {
            resolve(self);
          }
        );
        return fn.apply(promise);
      }
    )
  }
  static value<R, E>(self: R) {
    return Terminal.issue(E.left(self));
  }
  static error<R, E>(self: E) {
    return Terminal.issue(E.right(self));
  }
}
interface FletcherApi<P, Pi, E> {
  defer(p: P, cont: Terminal<Pi, E>): Cycle;
  toFletcher(): Fletcher<P, Pi, E>;
}
export class Fletcher<P, Pi, E> implements FletcherApi<P, Pi, E>{
  defer(p:P,cont:Terminal<Pi,E>):Cycle{
    return new Cycle(null);
  }
  toFletcher(): Fletcher<P, Pi, E> {
    return this;
  }
  static Fun1R<P,R,E>(fn:(p:P)=>R):Fletcher<P,R,E>{
    return new FletcherFn(fn);
  }
  then<R>(that:Fletcher<Pi,R,E>):Fletcher<P,R,E>{
    return new Then(this,that);
  }
  static Terminal<P,E>(){
    return new Terminal(
      (a:ApplyCls<TerminalInput<P,E>,Cycle>):Cycle => {
        return a.apply(new Deferred());
      }
    )
  }
}
class FletcherFn<P,R,E> extends Fletcher<P,R,E>{
  private _apply:(p:P) => R;
  constructor(_apply:(p:P) => R){
    super();
    this._apply = _apply;
  }
  defer(p: P, cont: Terminal<R, E>): Cycle {
    return receive(cont,Terminal.value(this._apply(p)));
  }
}
//apply: (a: ApplyApi<TerminalInput<unknown, Error>, Cycle>) => Cycle)
function forward<P, Pi, E>(self: Fletcher<P, Pi, E>, p: P) {
  return new ReceiverCls(
    (k:ReceiverSinkCls<Pi,E>): Cycle => {
      let deferred : TerminalInput<Pi,E> = new Deferred();
      let fst      = self.defer(
        p,
        new Terminal(
          (t_sink:ApplyCls<TerminalInput<Pi,E>,Cycle>):Cycle => {
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
function receive<P,E>(self:Terminal<P,E>,receiver:ReceiverCls<P,E>):Cycle{
  return receiver.apply(
    new ApplyCls(
      (a:ReceiverInput<P,E>):Cycle => {
        return self.apply(
          new ApplyCls(
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
class Then<Pi, Pii, R, E> extends Fletcher<Pi,R,E> implements FletcherApi<Pi, R, E>{
  lhs: Fletcher<Pi, Pii, E>;
  rhs: Fletcher<Pii, R, E>;
  constructor(lhs: Fletcher<Pi, Pii, E>, rhs: Fletcher<Pii, R, E>) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p: Pi, cont: Terminal<R, E>) {
    var a = forward(this.lhs,p);
    return receive(cont,
      a.flat_fold(
        ok => forward(this.rhs,ok),
        no => Terminal.error(no)
      )
    );
  }
}


// function then<A,B,C>(lhs: (a:A) => B, rhs : (b:B) => C) : (a:A) => C {
//   return (a:A) => {

//   }
// }
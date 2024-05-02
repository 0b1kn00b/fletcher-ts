import { Deferred } from "ts-deferred";
import * as E from "fp-ts/Either";
import { Receiver, ReceiverInput } from "./Receiver";
import { Settler } from "./Settler";
import { Result } from "./Result";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";


export type TerminalInput<T>      = Deferred<Result<T>>;
export type TerminalSink<R>       = Apply<TerminalInput<R>,Cycle>;

/**
 * Terminal represents the contiuation passed through the Arrowlets to run them
 *
 * @class Terminal
 * @extends {SettlerCls<TerminalInput<R>>}
 * @implements {TerminalApi<R>}
 * @template R
 * @template E
 */
export class Terminal<R> extends Settler<TerminalInput<R>> {
  receive(receiver:Receiver<R>):Cycle{
    //console.log('receiver called');``
    return receiver.apply(
      new Apply(
        (a:ReceiverInput<R>):Cycle => {
          return this.apply(
            new Apply(
              (b:TerminalInput<R>):Cycle => {
                let result = a.then(
                  (v) => {
                    //console.log('receiver inner',v);
                    b.resolve(v);
                  }
                );
                return new Cycle(() => {
                  //console.log('receiver done');
                  return result.then(
                    _ => {
                      //console.log('receiver unit');
                      return Cycle.Unit();
                    }
                  )
                });
              }
            )
          );
        }
      )
    )
  }
  static later<R>(payload: Promise<Result<R>>): Receiver<R> {
    return new Receiver(
      (fn: Apply<ReceiverInput<R>, Cycle>): Cycle => {
        return fn.apply(payload);
      }
    );
  }
  static issue<R>(self: Result<R>) {
    return new Receiver(
      function (fn: Apply<ReceiverInput<R>, Cycle>): Cycle {
        let promise: ReceiverInput<R> = new Promise(
          (resolve) => {
            resolve(self);
          }
        );
        return fn.apply(promise);
      }
    )
  }
  static value<R>(self: R):Receiver<R> {
    return Terminal.issue(E.left(self));
  }
  static error<R>(self: Error) :Receiver<R>{
    return Terminal.issue(E.right(self));
  }
  static Pure<R>(deferred:Deferred<Result<R>>):Terminal<R>{
    return new Terminal(
      (a:Apply<TerminalInput<R>,Cycle>)=>{
        return a.apply(deferred);
      }
    );
  }
}

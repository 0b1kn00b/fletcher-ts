import { Deferred } from "ts-deferred";
import * as E from "fp-ts/Either";
import { Payload } from "./Payload";
import { Receiver, ReceiverInput } from "./Receiver";
import { Settler } from "./Settler";
import { Result } from "./Result";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";


export type TerminalInput<T, E>     = Deferred<Result<T, E>>;
export type TerminalSink<R,E>       = Apply<TerminalInput<R,E>,Cycle>;

/**
 * Terminal represents the contiuation passed through the Arrowlets to run them
 *
 * @class Terminal
 * @extends {SettlerCls<TerminalInput<R, E>>}
 * @implements {TerminalApi<R, E>}
 * @template R
 * @template E
 */
export class Terminal<R, E> extends Settler<TerminalInput<R, E>> {
  receive(receiver:Receiver<R,E>):Cycle{
    //console.log('receiver called');``
    return receiver.apply(
      new Apply(
        (a:ReceiverInput<R,E>):Cycle => {
          return this.apply(
            new Apply(
              (b:TerminalInput<R,E>):Cycle => {
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
  static later<R, E>(payload: Payload<R, E>): Receiver<R, E> {
    return new Receiver(
      (fn: Apply<ReceiverInput<R, E>, Cycle>): Cycle => {
        return fn.apply(payload);
      }
    );
  }
  static issue<R, E>(self: Result<R, E>) {
    return new Receiver(
      function (fn: Apply<ReceiverInput<R, E>, Cycle>): Cycle {
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
  static Pure<R,E>(deferred:Deferred<Result<R,E>>):Terminal<R,E>{
    return new Terminal(
      (a:Apply<TerminalInput<R,E>,Cycle>)=>{
        return a.apply(deferred);
      }
    );
  }
}

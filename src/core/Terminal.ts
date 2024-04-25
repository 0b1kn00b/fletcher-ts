import { Deferred } from "ts-deferred";
import * as E from "fp-ts/Either";
import { Payload, Cycle, Result, Apply, Settler, Receiver, ReceiverInput  } from "@fletcher-ts/core";

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
    return receiver.apply(
      new Apply(
        (a:ReceiverInput<R,E>):Cycle => {
          return this.apply(
            new Apply(
              (b:TerminalInput<R,E>):Cycle => {
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
}

import { Deferred } from "ts-deferred";
import { Payload } from "src/core/Payload";
import { Receiver } from "src/core/Receiver";
import { Settler } from "src/core/Settler";
import { Result } from "src/core/Result";
import { Apply } from "src/core/Apply";
import { Cycle } from "src/core/Cycle";
export type TerminalInput<T, E> = Deferred<Result<T, E>>;
export type TerminalSink<R, E> = Apply<TerminalInput<R, E>, Cycle>;
/**
 * Terminal represents the contiuation passed through the Arrowlets to run them
 *
 * @class Terminal
 * @extends {SettlerCls<TerminalInput<R, E>>}
 * @implements {TerminalApi<R, E>}
 * @template R
 * @template E
 */
export declare class Terminal<R, E> extends Settler<TerminalInput<R, E>> {
    receive(receiver: Receiver<R, E>): Cycle;
    static later<R, E>(payload: Payload<R, E>): Receiver<R, E>;
    static issue<R, E>(self: Result<R, E>): Receiver<R, E>;
    static value<R, E>(self: R): Receiver<R, never>;
    static error<R, E>(self: E): Receiver<never, E>;
    static Pure<R, E>(deferred: Deferred<Result<R, E>>): Terminal<R, E>;
}

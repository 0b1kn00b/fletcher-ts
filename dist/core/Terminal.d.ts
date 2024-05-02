import { Deferred } from "ts-deferred";
import { Receiver } from "./Receiver";
import { Settler } from "./Settler";
import { Result } from "./Result";
import { Apply } from "./Apply";
import { Cycle } from "./Cycle";
export type TerminalInput<T> = Deferred<Result<T>>;
export type TerminalSink<R> = Apply<TerminalInput<R>, Cycle>;
/**
 * Terminal represents the contiuation passed through the Arrowlets to run them
 *
 * @class Terminal
 * @extends {SettlerCls<TerminalInput<R>>}
 * @implements {TerminalApi<R>}
 * @template R
 * @template E
 */
export declare class Terminal<R> extends Settler<TerminalInput<R>> {
    receive(receiver: Receiver<R>): Cycle;
    static later<R>(payload: Promise<Result<R>>): Receiver<R>;
    static issue<R>(self: Result<R>): Receiver<R>;
    static value<R>(self: R): Receiver<R>;
    static error<R>(self: Error): Receiver<R>;
    static Pure<R>(deferred: Deferred<Result<R>>): Terminal<R>;
}

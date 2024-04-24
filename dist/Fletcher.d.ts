import * as E from "fp-ts/Either";
import { Deferred } from "ts-deferred";
type Outcome<A, E> = E.Either<A, E>;
/** Something that happens and maybe after that another thing*/
declare class Cycle {
    private _after;
    constructor(_after: ((() => (Promise<Cycle> | null)) | null));
    get after(): Promise<Cycle>;
    static seq(lhs: Cycle, rhs: Cycle): Cycle;
    submit(): void;
    static Submit(self: Cycle): void;
}
declare class ApplyCls<A, B> {
    private _apply;
    constructor(_apply: (a: A) => B);
    apply(a: A): B;
}
/**interface of continuation monad */
interface ContApi<P, R> extends ApplyCls<ApplyCls<P, R>, R> {
}
declare class ContCls<P, R> extends ApplyCls<ApplyCls<P, R>, R> implements ContApi<P, R> {
}
/** A function like this resolves a Promise, return acts as a canceller*/
/** Input to Terminal continuation*/
type Payload<T, E> = Promise<Outcome<T, E>>;
type TerminalInput<T, E> = Deferred<Outcome<T, E>>;
/** Returns Cycle from Continuation */
interface SettlerApi<P> extends ContApi<P, Cycle> {
}
declare class SettlerCls<P> extends ContCls<P, Cycle> {
}
/**Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known*/
type TerminalApi<R, E> = SettlerApi<TerminalInput<R, E>>;
/**Type only createable through Terminal that resolves a fletcher*/
type ReceiverInput<R, E> = Promise<Outcome<R, E>>;
type ReceiverApi<R, E> = ContApi<ReceiverInput<R, E>, Cycle>;
declare class ReceiverCls<R, E> extends SettlerCls<ReceiverInput<R, E>> implements ReceiverApi<R, E> {
    flat_fold<Ri>(ok: (r: R) => ReceiverCls<Ri, E>, no: (e: E) => ReceiverCls<Ri, E>): ReceiverCls<Ri, E>;
}
/**main internal continuation api */
declare class Terminal<R, E> extends SettlerCls<TerminalInput<R, E>> implements TerminalApi<R, E> {
    static later<R, E>(payload: Payload<R, E>): ReceiverCls<R, E>;
    static issue<R, E>(self: Outcome<R, E>): ReceiverCls<R, E>;
    static value<R, E>(self: R): ReceiverCls<R, never>;
    static error<R, E>(self: E): ReceiverCls<never, E>;
}
interface FletcherApi<P, Pi, E> {
    defer(p: P, cont: Terminal<Pi, E>): Cycle;
    toFletcher(): Fletcher<P, Pi, E>;
}
export declare class Fletcher<P, Pi, E> implements FletcherApi<P, Pi, E> {
    defer(p: P, cont: Terminal<Pi, E>): Cycle;
    toFletcher(): Fletcher<P, Pi, E>;
    static Fun1R<P, R, E>(fn: (p: P) => R): Fletcher<P, R, E>;
    then<R>(that: Fletcher<Pi, R, E>): Fletcher<P, R, E>;
    static Terminal<P, E>(): Terminal<P, E>;
}
export {};

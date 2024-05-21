import { Deferred } from "ts-deferred";
import { Allocator } from "./Allocator";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
import { Work } from "./Work";
export type JunctionSink<R> = Apply<Deferred<R>, Work.Work>;
/**
 * Junction represents the contiuation passed through the Arrowlets to run them
 *
 * @class Junction
 * @extends {SettlerCls<Deferred<R>>}
 * @typeParam R
 * @typeParam E
 */
export declare class Junction<R> extends Settler<Deferred<R>> {
    receive(receiver: Allocator<R>): Work.Work;
    static later<R>(payload: Promise<R>): Allocator<R>;
    static issue<R>(self: R): Allocator<R>;
    static Pure<R>(deferred: Deferred<R>): Junction<R>;
    /**Takes a resolver to use later that may return Work to be done in a scheduler once all inputs are known*/
    static Unit<R>(): Junction<R>;
}

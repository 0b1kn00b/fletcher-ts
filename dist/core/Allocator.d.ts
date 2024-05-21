import { Settler } from "./Settler";
/**
 * The `Junction` is responsible for both creating `Allocators` and fullfilling
 * Promises to them.
 * The `Allocator` can return `Work.Work` to be done by a scheduler, which is passed through
 * the allocator.
 * @export
 * @class Allocator
 * @extends {Settler<Promise<R>>}
 * @typeParam R
 */
export declare class Allocator<R> extends Settler<Promise<R>> {
    flat_fold<Ri>(fn: (r: R) => Allocator<Ri>): Allocator<Ri>;
    zip<Ri>(that: Allocator<Ri>): Allocator<[R, Ri]>;
    static Zip<R, Ri>(self: Allocator<R>, that: Allocator<Ri>): Allocator<[R, Ri]>;
}

import { Arrowlet, Junction, Work } from "src/Core";
import { Allocator } from "src/core/Allocator";
export declare class Receiver<R> implements Arrowlet<void, R> {
    private deferred;
    constructor(deferred: Allocator<R>);
    defer(_: void, cont: Junction<R>): Work.Work;
}

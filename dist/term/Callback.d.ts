import { Arrowlet, Junction, Work } from "src/Core";
export declare class Callback<P, R> implements Arrowlet<P, R> {
    private deferred;
    constructor(deferred: (p: P, cb: (r: R) => void) => void);
    defer(p: P, cont: Junction<R>): Work.Work;
}

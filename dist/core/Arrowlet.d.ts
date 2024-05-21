import { Junction } from "./Junction";
import { Work } from "./Work";
export interface Arrowlet<P, R> {
    defer(p: P, cont: Junction<R>): Work.Work;
}

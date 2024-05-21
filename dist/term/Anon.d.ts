import { Arrowlet, Work, Junction } from "../Core";
export declare class Anon<Pi, R> implements Arrowlet<Pi, R> {
    private _defer;
    constructor(_defer: ((p: Pi, cont: Junction<R>) => Work));
    defer(p: Pi, cont: Junction<R>): Work;
}

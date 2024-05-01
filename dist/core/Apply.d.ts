/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
export declare class Apply<A, B> {
    private _apply;
    constructor(_apply: (a: A) => B);
    apply(a: A): B;
}

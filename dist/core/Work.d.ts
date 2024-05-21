/**
 * An item of work embeded in the after call, with the option
 * to return a promise of later work.
 */
export declare class Work {
    private _after;
    constructor(_after: ((() => (Promise<Work> | null)) | null));
    get after(): Promise<Work>;
    static Seq(lhs: Work, rhs: Work): Work;
    seq(rhs: Work): Work;
    par(rhs: Work): Work;
    submit(): Promise<unknown>;
    static Submit(self: Work): Promise<unknown>;
    static Par(self: Work, that: Work): Work;
    static ZERO: Work;
    static Pure(self: Promise<Work>): Work;
}

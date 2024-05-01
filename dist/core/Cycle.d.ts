export declare class Cycle {
    private _after;
    constructor(_after: ((() => (Promise<Cycle> | null)) | null));
    get after(): Promise<Cycle>;
    static Seq(lhs: Cycle, rhs: Cycle): Cycle;
    seq(rhs: Cycle): Cycle;
    par(rhs: Cycle): Cycle;
    submit(): Promise<unknown>;
    static Submit(self: Cycle): Promise<unknown>;
    static Par(self: Cycle, that: Cycle): Cycle;
    static Unit(): Cycle;
    static Pure(self: Promise<Cycle>): Cycle;
}

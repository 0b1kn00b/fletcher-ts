import { Effect } from "effect";
export declare namespace Work {
    type Work = Effect.Effect<Work | void, never, never>;
    function Seq(lhs: Work, rhs: Work): Work;
    function Par(self: Work, that: Work): Work;
    const ZERO: Work;
    function fromPromise(promise: Promise<Work>): Work;
    function fromThunk(thunk: () => Work): Work;
    function Submit(self: Work): import("effect/Runtime").Cancel<void | Work, never>;
    function Promise(self: Work): Promise<void | Work>;
}

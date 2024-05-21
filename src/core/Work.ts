import { Effect } from "effect";
import { Deferred } from "ts-deferred";

export namespace Work{
  export type Work = Effect.Effect<Work | void, never, never>; 
  export function Seq(lhs:Work,rhs:Work):Work{
    return Effect.flatMap(lhs,
        (x:Work) => x == null ? rhs : Work.Seq(x,rhs)
    )
  }
  export function Par(self:Work,that:Work):Work{
    return Effect.raceAll([self,that]);
  }
  export const ZERO : Work = Effect.void;
  export function fromPromise(promise:Promise<Work>):Work{
    return Effect.async(
      (callback,signal) => {
        promise.then(
          value => callback(value)
        )
      }
    );
  }
  export function fromThunk(thunk:() => Work):Work{
    return Effect.async(
      (callback,signal) => {
        callback(thunk())
      }
    )
  }
  export function Submit(self:Work){
    return Effect.runCallback(self);
  }
  export function Promise(self:Work){
    return Effect.runPromise(self);
  }
}
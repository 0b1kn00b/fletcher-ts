import { Result } from "src/core/Result";
/** A function like this resolves a Promise, return acts as a canceller*/
/** Input to Terminal continuation*/
export type Payload<T, E> = Promise<Result<T, E>>;

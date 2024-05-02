import * as E from "fp-ts/Either";
export type Result<A> = E.Either<A, Error>;
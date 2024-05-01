import { ArrowletApi } from "src/core/ArrowletApi";
import { Result } from "src/core/Result";
export default function react<P, R, E>(self: ArrowletApi<P, R, E>, p: P): (dispatch: Dispatch<Result<R, E>>) => Promise<void>;

import { Cycle } from "./Cycle";
import { Result } from "./Result";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
/**Type only createable through Terminal that resolves a Arrowlet*/
export type ReceiverInput<R> = Promise<Result<R>>;
export type ReceiverSink<R> = Apply<ReceiverInput<R>, Cycle>;
export declare class Receiver<R> extends Settler<ReceiverInput<R>> {
    flat_fold<Ri>(ok: (r: R) => Receiver<Ri>, no: (e: Error) => Receiver<Ri>): Receiver<Ri>;
    handler(ok: (result: R) => void, no?: (error: Error) => void): (result: Result<R>) => void;
    zip<Ri>(that: Receiver<Ri>): Receiver<[R, Ri]>;
    static Zip<R, Ri>(self: Receiver<R>, that: Receiver<Ri>): Receiver<[R, Ri]>;
}

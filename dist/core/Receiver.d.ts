import { Cycle } from "./Cycle";
import { Result } from "./Result";
import { Settler } from "./Settler";
import { Apply } from "./Apply";
/**Type only createable through Terminal that resolves a Arrowlet*/
export type ReceiverInput<R, E> = Promise<Result<R, E>>;
export type ReceiverSink<R, E> = Apply<ReceiverInput<R, E>, Cycle>;
export declare class Receiver<R, E> extends Settler<ReceiverInput<R, E>> {
    flat_fold<Ri>(ok: (r: R) => Receiver<Ri, E>, no: (e: E) => Receiver<Ri, E>): Receiver<Ri, E>;
    zip<Ri>(that: Receiver<Ri, E>): Receiver<[R, Ri], E>;
    static Zip<R, Ri, E>(self: Receiver<R, E>, that: Receiver<Ri, E>): Receiver<[R, Ri], E>;
}

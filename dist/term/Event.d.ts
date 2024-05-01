import { ArrowletApi } from "../core/ArrowletApi";
import { Terminal } from "../core/Terminal";
export declare class EventArrowlet<T extends Event, E> implements ArrowletApi<string, T, E> {
    private _emiter;
    constructor(_emiter: EventTarget);
    defer(eventname: string, cont: Terminal<T, E>): import("../core/Cycle").Cycle;
}

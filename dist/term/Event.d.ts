import { ArrowletApi } from "../core/ArrowletApi";
import { Terminal } from "../core/Terminal";
export declare class EventArrowlet<T extends Event> implements ArrowletApi<string, T> {
    private _emiter;
    constructor(_emiter: EventTarget);
    defer(eventname: string, cont: Terminal<T>): import("../core/Cycle").Cycle;
}

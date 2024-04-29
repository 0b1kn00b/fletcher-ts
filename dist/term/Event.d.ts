import { Arrowlet } from "src/core/Arrowlet";
import { Terminal } from "src/core/Terminal";
export declare class EventArrowlet<T extends Event, E> extends Arrowlet<string, T, E> {
    private _emiter;
    constructor(_emiter: EventTarget);
    defer(eventname: string, cont: Terminal<T, E>): import("../core/Cycle").Cycle;
}

import { Arrowlet } from "../core/Arrowlet";
import { Terminal } from "../core/Terminal";
export declare class EventArrowlet<T extends Event> implements Arrowlet<string, T> {
    private _emiter;
    constructor(_emiter: EventTarget);
    defer(eventname: string, cont: Terminal<T>): import("../Core").Cycle;
}

import { Arrowlet } from "../Core";
import { Terminal } from "../core/Terminal";
export declare class EventArrowlet<T extends Event> implements Arrowlet<EventTarget, T> {
    private event_name;
    constructor(event_name: string);
    defer(target: EventTarget, cont: Terminal<T>): import("../Core").Cycle;
}

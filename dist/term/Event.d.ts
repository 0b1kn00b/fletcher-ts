import { Arrowlet } from "../Core";
import { Junction } from "../core/Junction";
import { Work } from "../Core";
export declare class EventArrowlet<T extends Event> implements Arrowlet<EventTarget, T> {
    private event_name;
    constructor(event_name: string);
    defer(target: EventTarget, cont: Junction<T>): Work;
}

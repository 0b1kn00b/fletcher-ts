import { Junction } from "../core/Junction";
import { Work } from "../Core";
import { Deferred } from "ts-deferred";
export class EventArrowlet {
    event_name;
    constructor(event_name) {
        this.event_name = event_name;
    }
    defer(target, cont) {
        let event_handler_removed = false;
        let deferred = new Deferred();
        let self = this;
        let handler = {
            handleEvent: function (evt) {
                console.log('loaded');
                deferred.resolve(evt);
                event_handler_removed = true;
                target.removeEventListener(this.event_name, handler);
            }
        };
        target.addEventListener(this.event_name, handler);
        let canceller = new Work(() => {
            if (!event_handler_removed) {
                target.removeEventListener(this.event_name, handler);
            }
            return null;
        });
        return cont.receive(Junction.later(deferred.promise)).seq(canceller);
    }
}

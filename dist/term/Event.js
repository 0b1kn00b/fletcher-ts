"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventArrowlet = void 0;
const Arrowlet_1 = require("../core/Arrowlet");
const Terminal_1 = require("../core/Terminal");
const ts_deferred_1 = require("ts-deferred");
const E = require("fp-ts/Either");
class EventArrowlet extends Arrowlet_1.Arrowlet {
    constructor(_emiter) {
        super();
        this._emiter = _emiter;
    }
    defer(eventname, cont) {
        let deferred = new ts_deferred_1.Deferred();
        let handler = function (evt) {
            deferred.resolve(E.left(evt));
            this._emiter.removeEventListener(handler);
        };
        this._emiter.addEventListener(eventname, handler);
        return cont.receive(Terminal_1.Terminal.later(deferred.promise));
    }
}
exports.EventArrowlet = EventArrowlet;

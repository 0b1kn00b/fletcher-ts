"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const E = require("fp-ts/Either");
const Receiver_1 = require("src/core/Receiver");
const Settler_1 = require("src/core/Settler");
const Apply_1 = require("src/core/Apply");
const Cycle_1 = require("src/core/Cycle");
/**
 * Terminal represents the contiuation passed through the Arrowlets to run them
 *
 * @class Terminal
 * @extends {SettlerCls<TerminalInput<R, E>>}
 * @implements {TerminalApi<R, E>}
 * @template R
 * @template E
 */
class Terminal extends Settler_1.Settler {
    receive(receiver) {
        return receiver.apply(new Apply_1.Apply((a) => {
            return this.apply(new Apply_1.Apply((b) => {
                a.then((v) => {
                    b.resolve(v);
                });
                return new Cycle_1.Cycle(null);
            }));
        }));
    }
    static later(payload) {
        return new Receiver_1.Receiver((fn) => {
            return fn.apply(payload);
        });
    }
    static issue(self) {
        return new Receiver_1.Receiver(function (fn) {
            let promise = new Promise((resolve) => {
                resolve(self);
            });
            return fn.apply(promise);
        });
    }
    static value(self) {
        return Terminal.issue(E.left(self));
    }
    static error(self) {
        return Terminal.issue(E.right(self));
    }
}
exports.Terminal = Terminal;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const E = __importStar(require("fp-ts/Either"));
const Receiver_1 = require("./Receiver");
const Settler_1 = require("./Settler");
const Apply_1 = require("./Apply");
const Cycle_1 = require("./Cycle");
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
        //console.log('receiver called');``
        return receiver.apply(new Apply_1.Apply((a) => {
            return this.apply(new Apply_1.Apply((b) => {
                let result = a.then((v) => {
                    //console.log('receiver inner',v);
                    b.resolve(v);
                });
                return new Cycle_1.Cycle(() => {
                    //console.log('receiver done');
                    return result.then(_ => {
                        //console.log('receiver unit');
                        return Cycle_1.Cycle.Unit();
                    });
                });
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
    static Pure(deferred) {
        return new Terminal((a) => {
            return a.apply(deferred);
        });
    }
}
exports.Terminal = Terminal;

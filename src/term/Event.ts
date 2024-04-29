import { Arrowlet } from "../core/Arrowlet";
import { Terminal } from "../core/Terminal";
import { Deferred } from "ts-deferred";
import * as E from 'fp-ts/Either';
import { Payload } from "../core/Payload";
import { Result } from "../core/Result";
export class EventArrowlet<T extends Event,E> extends Arrowlet<string,T,E>{
  private _emiter : EventTarget;
  constructor(_emiter:EventTarget){
    super();
    this._emiter = _emiter;
  }
  public defer(eventname:string,cont:Terminal<T,E>){
    let deferred : Deferred<Result<T,E>> = new Deferred();
    let handler = function (evt:T){
      deferred.resolve(E.left(evt));
      this._emiter.removeEventListener(handler);
    }
    this._emiter.addEventListener(
      eventname,
      handler
    );
    return cont.receive(Terminal.later(deferred.promise))
  }
}
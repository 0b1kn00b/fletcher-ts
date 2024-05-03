import { Arrowlet } from "../core/Arrowlet";
import { Terminal } from "../core/Terminal";
import { Deferred } from "ts-deferred";
import * as E from 'fp-ts/Either';
import { Result } from "../core/Result";
export class EventArrowlet<T extends Event> implements Arrowlet<string,T>{
  private _emiter : EventTarget;
  constructor(_emiter:EventTarget){
    this._emiter = _emiter;
  }
  public defer(eventname:string,cont:Terminal<T>){
    let deferred : Deferred<Result<T>> = new Deferred();
    let self = this;
    let handler : EventListenerObject = {
      handleEvent : function (evt:T):void{
        deferred.resolve(E.left(evt));
        self._emiter.removeEventListener(eventname,handler);
      }
    }
    this._emiter.addEventListener(
      eventname,
      handler
    );
    return cont.receive(Terminal.later(deferred.promise))
  }
}
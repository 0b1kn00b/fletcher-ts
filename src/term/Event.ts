import { ArrowletApi } from "../core/ArrowletApi";
import { Terminal } from "../core/Terminal";
import { Deferred } from "ts-deferred";
import * as E from 'fp-ts/Either';
import { Payload } from "../core/Payload";
import { Result } from "../core/Result";
export class EventArrowlet<T extends Event,E> implements ArrowletApi<string,T,E>{
  private _emiter : EventTarget;
  constructor(_emiter:EventTarget){
    this._emiter = _emiter;
  }
  public defer(eventname:string,cont:Terminal<T,E>){
    let deferred : Deferred<Result<T,E>> = new Deferred();
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
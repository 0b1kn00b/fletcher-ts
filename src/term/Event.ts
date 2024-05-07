import { Arrowlet } from "../Core";
import { Terminal } from "../core/Terminal";
import { Deferred } from "ts-deferred";
import * as E from 'fp-ts/Either';
import { Result } from "../core/Result";
export class EventArrowlet<T extends Event> implements Arrowlet<EventTarget,T>{
  private event_name : string;
  constructor(event_name:string){
    this.event_name = event_name;
  }
  public defer(target:EventTarget,cont:Terminal<T>){
    let deferred : Deferred<Result<T>>  = new Deferred();
    let self                            = this;
    let handler : EventListenerObject = {
      handleEvent : function (evt:T):void{
        deferred.resolve(E.left(evt));
        target.removeEventListener(this.event_name,handler);
      }
    }
    target.addEventListener(
      this.event_name,
      handler
    );
    return cont.receive(Terminal.later(deferred.promise))
  }
}
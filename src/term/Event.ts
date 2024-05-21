import { Arrowlet } from "../Core";
import { Junction } from "../core/Junction";
import { Work } from "../Core";
import { Deferred } from "ts-deferred";
import * as E from 'fp-ts/Either';
export class EventArrowlet<T extends Event> implements Arrowlet<EventTarget,T>{
  private event_name : string;
  constructor(event_name:string){
    this.event_name = event_name;
  }
  public defer(target:EventTarget,cont:Junction<T>){
    let event_handler_removed           = false;
    let deferred : Deferred<T>  = new Deferred();
    let self                            = this;
    let handler = {
      handleEvent : function (evt:T):void{
        console.log('loaded');
        deferred.resolve(evt);
        event_handler_removed = true;
        target.removeEventListener(this.event_name,handler);
      }
    }
    target.addEventListener(
      this.event_name,
      handler
    );
    let canceller = Work.fromThunk(
      () => {
        if(!event_handler_removed){
          target.removeEventListener(this.event_name,handler);
        }
        return null;
      }
    )
    return Work.Seq(cont.receive(Junction.later(deferred.promise)),canceller)
  }
}
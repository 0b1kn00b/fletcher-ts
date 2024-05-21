import { Arrowlet, Junction, Work } from "src/Core";
import { Allocator } from "src/core/Allocator";

export class Receiver<R> implements Arrowlet<void,R>{
  constructor( private deferred : Allocator<R> ){}
  public defer(_:void,cont:Junction<R>):Work.Work{
    return cont.receive(this.deferred);;
  }
}
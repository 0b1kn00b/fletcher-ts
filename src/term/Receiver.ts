import { type Arrowlet, Allocator, Junction, Work } from "src/Core";

export class Receiver<R> implements Arrowlet<void,R>{
  constructor( private deferred : Allocator<R> ){}
  public defer(_:void,cont:Junction<R>):Work.Work{
    return cont.receive(this.deferred);;
  }
}
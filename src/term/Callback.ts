import { Deferred } from "ts-deferred";
import { type Arrowlet, Junction, Work } from "src/Core";

export class Callback<P,R> implements Arrowlet<P,R>{
  constructor(private deferred : (p:P,cb:(r:R) => void) => void){}
  public defer(p:P,cont:Junction<R>){
    let d = new Deferred();
    this.deferred(p,
      (r) => {
        d.resolve(r);
      }
    );
    return Work.fromPromise(d.promise.then(x => Work.ZERO));
  }
}
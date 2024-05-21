
import { Deferred } from "ts-deferred";
import { type Arrowlet, Allocator, Work, Apply, Junction } from "src/Core";
import { Fun } from "src/Term";

export function forward<P,R>(self:Arrowlet<P,R>, p: P) : Allocator<R>{
  return new Allocator(
    (k:Apply<Promise<R>,Work.Work>): Work.Work => {
      let deferred : Deferred<R> = new Deferred();
      let fst      = self.defer(
        p,
        new Junction(
          (t_sink:Apply<Deferred<R>,Work.Work>):Work.Work => {
            let result = t_sink.apply(deferred);
            return result;
          }
        )
      );
      let snd       = k.apply(deferred.promise);
      return Work.Seq(fst,snd);
    }
  );
}
export function resolve<P,R>(self:Arrowlet<P,R>,input:P):Promise<R>{
  //console.log('resolve init');
  let deferred : Deferred<R> = new Deferred();
  let cycle = self.defer(
    input,
    Junction.Pure(deferred)
  );
  //console.log('resolve: post defer');
  let finish  = Work.Promise(cycle);
  //console.log('resolve: post submit')
  return finish.then(
    (_) => {
      //console.log('resolve resolved')
      return deferred.promise.then(
        x => {
          //console.log('deferred resolved');
          return x;
        }
      );
    }
  );
}
/**
 * normallly as Arrowlet<void,void> to drive Arrow
 * @returns 
 */
export function unit<Pi,Ri>():Arrowlet<Pi,Ri>{
  return new Fun((pi:Pi) => {return (null as Ri)});
}
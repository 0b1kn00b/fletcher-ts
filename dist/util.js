import { Allocator } from "./core/Allocator";
import { Deferred } from "ts-deferred";
import { Work } from "./core/Work";
import { Junction } from "./core/Junction";
import { Fun } from "./term/Fun";
export function forward(self, p) {
    return new Allocator((k) => {
        let deferred = new Deferred();
        let fst = self.defer(p, new Junction((t_sink) => {
            let result = t_sink.apply(deferred);
            return result;
        }));
        let snd = k.apply(deferred.promise);
        return Work.Seq(fst, snd);
    });
}
export function resolve(self, input) {
    //console.log('resolve init');
    let deferred = new Deferred();
    let cycle = self.defer(input, Junction.Pure(deferred));
    //console.log('resolve: post defer');
    let finish = cycle.submit();
    //console.log('resolve: post submit')
    return finish.then(() => {
        //console.log('resolve resolved')
        return deferred.promise.then(x => {
            //console.log('deferred resolved');
            return x;
        });
    });
}
/**
 * normallly as Arrowlet<void,void> to drive Arrow
 * @returns
 */
export function unit() {
    return new Fun((pi) => { return null; });
}

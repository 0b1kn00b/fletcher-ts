import { Deferred } from "ts-deferred";
import { match } from "ts-pattern";
export class Cycle {
  private _after: (() => (Promise<Cycle> | null)) | null = null;
  constructor(_after: ((() => (Promise<Cycle> | null)) | null)) { this._after = _after; }
  get after() { return this._after == null ? null : this._after(); }

  static Seq(lhs:Cycle,rhs:Cycle):Cycle{
    //console.log('seq');
    return new Cycle(
      () => {
        let a = lhs?.after;
        if(a!=null){
          //console.log('after done');
          return new Promise(
            (resolve) => a.then(
              x => {
                //console.log(x);
                return Cycle.Seq(x,rhs);
              }
            ).then(resolve)
          );
        }else{
          //console.log('rhs', rhs?.after);
          return rhs?.after;
        }
      }
    );
  }
  seq(rhs:Cycle){
    return Cycle.Par(this,rhs);
  }
  par(rhs:Cycle){
    return Cycle.Par(this,rhs);
  }
  submit(){
    //console.log('submit');
    return Cycle.Submit(this);
  }
  static Submit(self:Cycle){
    //console.log('submit');
    let deferred = new Deferred();
    //console.log('timeout');
    if(self!=null){
      const after = self.after; 
      if(after != null){
        //console.log('after:')
        after.then(
          x => {
            if(x!=null){
              //console.log('resubmit');
              Cycle.Submit(x).then(
                x => deferred.resolve(x),
                e => deferred.reject(e)
              );
            }else{
              //console.log('end x');
              deferred.resolve(null);
            }
          }
        );
      }else{
        //console.log('end after')
        deferred.resolve(null);
      }
    }else{
      //console.log('end');
      deferred.resolve(null);
    }
    return deferred.promise;
  }
  static Par(self:Cycle,that:Cycle):Cycle{
    let l = self.after ?? Promise.resolve(Cycle.Unit());
    let r = that.after ?? Promise.resolve(Cycle.Unit());
    let a = Promise.all([l,r]);
    return Cycle.Pure(a.then(
      ([l,r]) => {
        if(l != null && r != null) {
          return Cycle.Par(l,r);
        }else if(l != null){
          return l;
        }else{
          return r;
        }
      }
    ));
  }
  static Unit(){
    return new Cycle(null);
  }
  static Pure(self:Promise<Cycle>){
    return new Cycle(() => self);
  }
}
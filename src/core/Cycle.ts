import { Deferred } from "ts-deferred";

export class Cycle {
  private _after: (() => (Promise<Cycle> | null)) | null = null;
  constructor(_after: ((() => (Promise<Cycle> | null)) | null)) { this._after = _after; }
  get after() { return this._after == null ? null : this._after(); }

  static seq(lhs:Cycle,rhs:Cycle):Cycle{
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
                return Cycle.seq(x,rhs);
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
  submit(){
    //console.log('submit');
    return Cycle.Submit(this);
  }
  static Submit(self:Cycle){
    let deferred = new Deferred();
    setTimeout(
      () => {
        //console.log('timeout');
        if(self!=null){
          if(self.after != null){
            self.after.then(
              x => {if(x!=null){
                Cycle.Submit(x);
              }}
            );
          }else{
            deferred.resolve(null);
          }
        }else{
          deferred.resolve(null);
        }
      }
    );
    return deferred.promise;
  }
}
import { Then } from "../term/Then";
import { Arrowlet, Terminal } from "../Core"
import { Anon } from "../term/Anon";
import { forward, resolve, unit } from "../util";
import { Fun } from "../term/Fun";
import { Unit } from "../term/Unit";


export class Arrow<Pi,Ri,Pii,Rii>{
  private _apply : (self:Arrowlet<Pi,Ri>) => Arrowlet<Pii,Rii>;
  constructor(_apply:(self:Arrowlet<Pi,Ri>) => Arrowlet<Pii,Rii>){
    this._apply = _apply;
  }  
  apply(self:Arrowlet<Pi,Ri>):Arrowlet<Pii,Rii>{
    return this._apply(self);
  }
  /**
   * You liked arrows so much, we put arrows in your arrows.
   * @param that You
   * @returns 
   */
  next<Piii,Riii>(that:Arrow<Pii,Rii,Piii,Riii>):Arrow<Pi,Ri,Piii,Riii>{
    return new Arrow((self:Arrowlet<Pi,Ri>) => {
      let next = this.apply(self);
      return that.apply(next);
    });
  }
  static Make<Pi,Ri,Pii,Rii>(apply:(self:Arrowlet<Pi,Ri>) => Arrowlet<Pii,Rii>):Arrow<Pi,Ri,Pii,Rii>{
    return new Arrow(apply);
  }
  static Unit<Pi,Ri>():Arrow<Pi,Ri,Pi,Ri>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => self
    )
  }
  static Pure<Pi,Ri,Pii,Rii>(self:Arrowlet<Pii,Rii>):Arrow<Pi,Ri,Pii,Rii>{
    return new Arrow(
      (_:Arrowlet<Pi,Ri>) => {
        return self;
      }
    );
  }
  static Then<Pi,Ri,Rii>(that:Arrowlet<Ri,Rii>):Arrow<Pi,Ri,Pi,Rii>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => new Then(self,that)
    );
  }
  public then<Riii>(that:Arrowlet<Rii,Riii>){
    return this.next(Arrow.Then(that));
  }
  static Pair<Pi,Pii,Ri,Rii>(that:Arrowlet<Pii,Rii>):Arrow<Pi,Ri,[Pi,Pii],[Ri,Rii]>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => new Anon(
        (p:[Pi,Pii],cont:Terminal<[Ri,Rii]>) => {
          let [l, r] = p;
          let lhs = forward(self,l);
          let rhs = forward(that,r);
          return cont.receive(lhs.zip(rhs)); 
        }
      )
    );
  }
  public pair(that:Arrowlet<Pii,Rii>){
    return this.next(Arrow.Pair(that));
  }
  static Split<Pi,Ri,Rii>(that:Arrowlet<Pi,Rii>):Arrow<Pi,Ri,Pi,[Ri,Rii]>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => {
        return new Anon(
          (p:Pi,cont:Terminal<[Ri,Rii]>) => {
            return Arrow.Pair(that).apply(self).defer([p,p],cont);
          }
        )       
      }
    );
  }
  public split<Riii>(that:Arrowlet<Pii,Riii>){
    return this.next(Arrow.Split(that));
  }
  static FlatMap<Pi,Ri,Rii>(fn:(p:Ri)=>Arrowlet<Pi,Rii>){
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => {
        return new Anon(
          (p:Pi,cont:Terminal<Rii>) => {
            return cont.receive(forward(self,p).flat_fold(
              ok => forward(fn(ok),p),
              no => Terminal.error(no) 
            ))
          }
        )
      }
    );
  }
  public flat_map<Riii>(fn:(p:Rii)=>Arrowlet<Pii,Riii>){
    return this.next(Arrow.FlatMap(fn));
  }
  static First<Pi,Ri,Pii>():Arrow<Pi,Ri,[Pi,Pii],[Ri,Pii]>{
    return new Arrow((self:Arrowlet<Pi,Ri>):Arrowlet<[Pi,Pii],[Ri,Pii]> => {
      let l : Arrow<Pi,Ri,Pii,Pii> = Arrow.Pure(new Fun((x:Pii) => x));
      let r : Arrowlet<[Pi,Pii],[Ri,Pii]>= Arrow.Pair(l.apply(self)).apply(self);
      return r;
    });
  }
  public first(){
    return this.next(Arrow.First());
  }
  static Second<Pi,Ri,Pii>():Arrow<Pi,Ri,[Pii,Pi],[Pii,Ri]>{
    return new Arrow((self:Arrowlet<Pi,Ri>):Arrowlet<[Pii,Pi],[Pii,Ri]> => {
      let l : Arrow<Pi,Ri,Pi,Pi> = Arrow.Pure(new Fun((x:Pi) => x));
      let r : Arrowlet<[Pii,Pi],[Pii,Ri]> = Arrow.Pair(self).apply(l.apply(self));
      return r;
    });
  }
  public second(){
    return this.next(Arrow.Second());
  }

  static Pinch<Pi,Ri,Rii>(that:Arrowlet<Pi,Rii>){
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => {
        return new Anon(
          (p:Pi,cont:Terminal<[Ri,Rii]>) =>{
            return cont.receive(
              forward(self,p).zip(forward(that,p))
            )
          }
        );
      }
    );
  }
  public pinch<Riii>(that:Arrowlet<Pii,Riii>){
    return this.next(Arrow.Pinch(that));
  }
  static Joint<Pi,Ri,Rii>(that:Arrowlet<Ri,Rii>):Arrow<Pi,Ri,Pi,[Ri,Rii]>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>):Arrowlet<Pi,[Ri,Rii]> => {
        return Arrow.Then(
          Arrow.Pure(Arrow.Split(that).apply(new Unit())).apply(new Unit())
        ).apply(self);
      }
    );
  }
  public joint<Riii>(that:Arrowlet<Rii,Riii>):Arrow<Pi,Ri,Pii,[Rii,Riii]>{
    return this.next(Arrow.Joint(that));
  }
  static Bound<Pi,Ri,Rii>(that:Arrowlet<[Pi,Ri],Rii>):Arrow<Pi,Ri,Pi,Rii>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => {
        let u : Arrowlet<Pi,Pi>              = new Unit();
        let l : Arrow<Pi, [Pi, Ri], Pi, Rii>   = Arrow.Then(that); 
        let r                                     = Arrow.Joint(self).apply(u);
        let n = l.apply(r);
        return n;
      }
    );
  }
  public bound<Riii>(that:Arrowlet<[Pii,Rii],Riii>){
    return this.next(Arrow.Bound(that));
  }
  static Broach<Pi,Ri>():Arrow<Pi,Ri,Pi,[Pi,Ri]>{
    return new Arrow(
      (self:Arrowlet<Pi,Ri>) => {
        let unit : Arrowlet<[Pi,Ri],[Pi,Ri]> = new Fun( (p:[Pi,Ri]) => p);
        return Arrow.Bound(unit).apply(self);
      } 
    );
  }
  public broach(){
    return this.next(Arrow.Broach());
  }
  public resolve(p:Pii){
    return resolve(this.apply(unit()),p);
  }
  static Compose<Pi,Pii,Piii,Ri,Rii,Riii>(lhs:Arrow<Ri,Rii,Piii,Riii>,rhs:Arrow<Pi,Pii,Ri,Rii>){
    return rhs.next(lhs);
  }
  public compose<P,R>(before:Arrow<P,R,Pi,Ri>){
    return Arrow.Compose(this,before);
  }
}
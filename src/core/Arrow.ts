import { Then } from "../term/Then";
import { ArrowletApi } from "./ArrowletApi"
import { Anon } from "../term/Anon";
import { Terminal } from "./Terminal";
import { forward, resolve, unit } from "../util";
import { Fun } from "../term/Fun";
import { Unit } from "../term/Unit";

export class Arrow<Pi,Ri,Pii,Rii,E>{
  private _apply : (self:ArrowletApi<Pi,Ri,E>) => ArrowletApi<Pii,Rii,E>;
  constructor(_apply:(self:ArrowletApi<Pi,Ri,E>) => ArrowletApi<Pii,Rii,E>){
    this._apply = _apply;
  }  
  apply(self:ArrowletApi<Pi,Ri,E>):ArrowletApi<Pii,Rii,E>{
    return this._apply(self);
  }
  /**
   * You liked arrows so much, we put arrows in your arrows.
   * @param that You
   * @returns 
   */
  next<Piii,Riii>(that:Arrow<Pii,Rii,Piii,Riii,E>):Arrow<Pi,Ri,Piii,Riii,E>{
    return new Arrow((self:ArrowletApi<Pi,Ri,E>) => {
      let next = this.apply(self);
      return that.apply(next);
    });
  }
  static Make<Pi,Ri,Pii,Rii,E>(apply:(self:ArrowletApi<Pi,Ri,E>) => ArrowletApi<Pii,Rii,E>):Arrow<Pi,Ri,Pii,Rii,E>{
    return new Arrow(apply);
  }
  static Unit<Pi,Ri,E>():Arrow<Pi,Ri,Pi,Ri,E>{
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => self
    )
  }
  static Pure<Pi,Ri,Pii,Rii,E>(self:ArrowletApi<Pii,Rii,E>):Arrow<Pi,Ri,Pii,Rii,E>{
    return new Arrow(
      (_:ArrowletApi<Pi,Ri,E>) => {
        return self;
      }
    );
  }
  static Then<Pi,Ri,Rii,E>(that:ArrowletApi<Ri,Rii,E>):Arrow<Pi,Ri,Pi,Rii,E>{
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => new Then(self,that)
    );
  }
  public then<Riii>(that:ArrowletApi<Rii,Riii,E>){
    return this.next(Arrow.Then(that));
  }
  static Pair<Pi,Pii,Ri,Rii,E>(that:ArrowletApi<Pii,Rii,E>){
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => new Anon(
        (p:[Pi,Pii],cont:Terminal<[Ri,Rii],E>) => {
          let [l, r] = p;
          let lhs = forward(self,l);
          let rhs = forward(that,r);
          return cont.receive(lhs.zip(rhs)); 
        }
      )
    );
  }
  public pair(that:ArrowletApi<Pii,Rii,E>){
    return this.next(Arrow.Pair(that));
  }
  static Split<Pi,Ri,Rii,E>(that:ArrowletApi<Pi,Rii,E>):Arrow<Pi,Ri,Pi,[Ri,Rii],E>{
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => {
        return new Anon(
          (p:Pi,cont:Terminal<[Ri,Rii],E>) => {
            return Arrow.Pair(that).apply(self).defer([p,p],cont);
          }
        )       
      }
    );
  }
  public split<Riii>(that:ArrowletApi<Pii,Riii,E>){
    return this.next(Arrow.Split(that));
  }
  static FlatMap<Pi,Ri,Rii,E>(fn:(p:Ri)=>ArrowletApi<Pi,Rii,E>){
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => {
        return new Anon(
          (p:Pi,cont:Terminal<Rii,E>) => {
            return cont.receive(forward(self,p).flat_fold(
              ok => forward(fn(ok),p),
              no => Terminal.error(no) 
            ))
          }
        )
      }
    );
  }
  public flat_map<Riii>(fn:(p:Rii)=>ArrowletApi<Pii,Riii,E>){
    return this.next(Arrow.FlatMap(fn));
  }
  static First<Pi,Ri,Pii,E>(){
    return new Arrow((self:ArrowletApi<Pi,Ri,E>):ArrowletApi<[Pi,Pii],[Ri,Pii],E> => {
      let l : Arrow<Pi,Ri,Pii,Pii,E> = Arrow.Pure(new Fun((x:Pii) => x));
      let r = Arrow.Pair(l.apply(self)).apply(self);
      return r;
    });
  }
  public first(){
    return this.next(Arrow.First());
  }
  static Second<Pi,Ri,Pii,E>(){
    return new Arrow((self:ArrowletApi<Pi,Ri,E>):ArrowletApi<[Pii,Pi],[Pii,Ri],E> => {
      let l : Arrow<Pi,Ri,Pii,Pii,E> = Arrow.Pure(new Fun((x:Pii) => x));
      let r = Arrow.Pair(self).apply(l.apply(self));
      return r;
    });
  }
  public second(){
    return this.next(Arrow.Second());
  }
  static Pinch<Pi,Ri,Rii,E>(that:ArrowletApi<Pi,Rii,E>){
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => {
        return new Anon(
          (p:Pi,cont:Terminal<[Ri,Rii],E>) =>{
            return cont.receive(
              forward(self,p).zip(forward(that,p))
            )
          }
        );
      }
    );
  }
  public pinch<Riii>(that:ArrowletApi<Pii,Riii,E>){
    return this.next(Arrow.Pinch(that));
  }
  static Joint<Pi,Ri,Rii,E>(that:ArrowletApi<Ri,Rii,E>):Arrow<Pi,Ri,Pi,[Ri,Rii],E>{
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>):ArrowletApi<Pi,[Ri,Rii],E> => {
        return Arrow.Then(
          Arrow.Pure(Arrow.Split(that).apply(new Unit())).apply(new Unit())
        ).apply(self);
      }
    );
  }
  public joint<Riii>(that:ArrowletApi<Rii,Riii,E>):Arrow<Pi,Ri,Pii,[Rii,Riii],E>{
    return this.next(Arrow.Joint(that));
  }
  static Bound<Pi,Ri,Rii,E>(that:ArrowletApi<[Pi,Ri],Rii,E>){
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => {
        let u : ArrowletApi<Pi,Pi,E>              = new Unit();
        let l : Arrow<Pi, [Pi, Ri], Ri, Rii, E>   = Arrow.Then(that); 
        let r                                     = Arrow.Joint(self).apply(u);
        let n = l.apply(r);
        return n;
      }
    );
  }
  public bound<Riii>(that:ArrowletApi<[Pii,Rii],Riii,E>){
    return this.next(Arrow.Bound(that));
  }
  static Broach<Pi,Ri,E>(){
    return new Arrow(
      (self:ArrowletApi<Pi,Ri,E>) => {
        let unit = new Fun( (p:[Pi,Ri]) => p);
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
}
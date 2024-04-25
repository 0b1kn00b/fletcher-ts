/** Sometimes not even that */
/** Class of function `(a:A) => B`*/
export class Apply<A, B> { 
  private _apply: (a: A) => B; 
  constructor(_apply: (a: A) => B) { this._apply = _apply; } 
  apply(a: A):B { return this._apply(a); } 
}
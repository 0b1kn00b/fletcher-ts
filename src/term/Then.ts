import { Arrowlet } from "../Core";
import { Junction } from "../core/Junction";
import { forward } from "../util"; 
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R>}
 * @typeParam Pi left hand side input type
 * @typeParam Pii lefthand side output type and right hand side input type
 * @typeParam R right hand side output type
 * @typeParam E error typeq
 */
export class Then<Pi, Pii, R> implements Arrowlet<Pi,R>{
  lhs: Arrowlet<Pi, Pii>;
  rhs: Arrowlet<Pii, R>;
  constructor(lhs: Arrowlet<Pi, Pii>, rhs: Arrowlet<Pii, R>) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p: Pi, cont: Junction<R>) {
    var a = forward(this.lhs,p);
    return cont.receive(
      a.flat_fold(
        ok => forward(this.rhs,ok)
      )
    );
  }
}

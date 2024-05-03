import { Arrowlet } from "../Core";
import { Terminal } from "../core/Terminal";
import { forward } from "../util"; 
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error typeq
 */
export class Then<Pi, Pii, R> implements Arrowlet<Pi,R>{
  lhs: Arrowlet<Pi, Pii>;
  rhs: Arrowlet<Pii, R>;
  constructor(lhs: Arrowlet<Pi, Pii>, rhs: Arrowlet<Pii, R>) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p: Pi, cont: Terminal<R>) {
    var a = forward(this.lhs,p);
    return cont.receive(
      a.flat_fold(
        ok => forward(this.rhs,ok),
        no => Terminal.error(no)
      )
    );
  }
}

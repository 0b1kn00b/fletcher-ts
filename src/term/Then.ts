import { Arrowlet } from "../core/Arrowlet";
import { Terminal } from "../core/Terminal";
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R, E>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error typeq
 */
export class Then<Pi, Pii, R, E> extends Arrowlet<Pi,R,E>{
  lhs: Arrowlet<Pi, Pii, E>;
  rhs: Arrowlet<Pii, R, E>;
  constructor(lhs: Arrowlet<Pi, Pii, E>, rhs: Arrowlet<Pii, R, E>) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }
  defer(p: Pi, cont: Terminal<R, E>) {
    var a = this.lhs.forward(p);
    return cont.receive(
      a.flat_fold(
        ok => this.rhs.forward(ok),
        no => Terminal.error(no)
      )
    );
  }
}

import { Arrowlet, Terminal } from "@fletcher-ts/core";
/**
 * Creates an arrowlet that outputs the result of the first into the second and returns the result.
 *
 * @class Then
 * @extends {Arrowlet<Pi, R, E>}
 * @implements {ArrowletApi<Pi, R, E>}
 * @template Pi left hand side input type
 * @template Pii lefthand side output type and right hand side input type
 * @template R right hand side output type
 * @template E error type
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
    var a = forward(this.lhs,p);
    return receive(cont,
      a.flat_fold(
        ok => forward(this.rhs,ok),
        no => Terminal.error(no)
      )
    );
  }
}

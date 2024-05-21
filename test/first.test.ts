// sum.test.js
import { expect, test, vi, beforeEach, describe, afterEach, it } from 'vitest'
import { Fletcher as F} from '../src'
import { Arrowlet } from '../src/Core';
import { Arrow } from '../src/core/Arrow';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
test(
  'test run then',
  async () => {
    //console.log('strarting');
    let l = F.Fun1R((x:number) => x * 10);
    let r = F.Fun1R((x:number) => x + 1);
    let n = F.Then(l,r);
    expect(false);
    let a = await vi.waitFor(
      async () => F.Resolve(n,1)
    );
    console.log(a);
    expect(false);
  }
);
test(
  'option',
  () => describe(
    'test Option',
    async () => {
      let a = F.Fun1R((x:number) => { console.log(x); return x * 10 } );
      let b = await vi.waitFor(
        async () => F.Resolve(F.Option(a),O.some(1))
      );
      console.log(b);
      E.match(
        (x:O.Option<number>) => {
          expect(x._tag).equals('Some');
          //console.log(b);
        },
        (_) => {}
      )(E.left(b));
    }
  )
)
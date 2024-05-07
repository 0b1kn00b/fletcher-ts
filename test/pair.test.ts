import { expect, test, vi, beforeEach, describe, afterEach, it } from 'vitest'
import { Fletcher as F} from '../src'
import { Arrowlet } from '../src/Core';
import { Arrow } from '../src/core/Arrow';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';


console.log("here");
test(
  'doing pair test',
  () => {
        console.log('first');
        const l = F.Fun1R((x:number) => x + 1);
        const r = F.Fun1R((x:number) => x * 10);
        console.log('before pair');
        const both = F.Pair(l,r);
        console.log('before');
        const result = vi.waitFor(
          async () => {
            // both.defer([1,1],
            //   F.Terminal()
            // ).submit()
            return await F.Resolve(both,[1,1]);
          }
        );
        result.then(
          x => console.log('RESULT',x)
        );
        //F.Resolve(both,[1,1]).then(
        //  x => console.log(x)
        //);
        // const result = vi.waitFor(
        //   () => F.Resolve(both,[1,1])
        // );
        // console.log(result);
      }
)
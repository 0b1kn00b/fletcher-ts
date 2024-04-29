// sum.test.js
import { expect, test, vi } from 'vitest'
import { Fletcher as F} from '../src'
test(
  'test run then',
  async () => {
    //console.log('strarting');
    let l = F.Fun1R((x:number) => x * 10);
    let r = F.Fun1R((x:number) => x + 1);
    let n = F.Then(r).apply(l);
    expect(false);
    let a = await vi.waitFor(
      async () => F.Resolve(n,1)
    );
    console.log(a);
    expect(false);
  }
);
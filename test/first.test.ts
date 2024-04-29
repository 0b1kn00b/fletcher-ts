// sum.test.js
import { expect, test, vi } from 'vitest'
import { Fletcher as F} from '../src'
test(
  'test run then',
  async () => {
    //console.log('strarting');
    let fn = F.Fun1R((x:number) => x * 10);
    expect(false);
    let a = await vi.waitFor(
      async () => F.Resolve(fn,1)
    );
    console.log(a);
    expect(false);
  }
);
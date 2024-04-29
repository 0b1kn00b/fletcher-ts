// sum.test.js
import { expect, test, vi } from 'vitest'
import { Fletcher } from '../src'

test(
  'test run then',
  async () => {
    //console.log('strarting');
    let fn = Fletcher.Fun1R((x:number) => x * 10);
    expect(false);
    let a = await vi.waitFor(
      async () => fn.resolve(1)
    );
    console.log(a);
    expect(false);
  }
);
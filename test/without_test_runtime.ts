import { Fletcher as F } from "../src";

const l = F.Fun1R((x:number) => x + 1);
const r = F.Fun1R((x:number) => x * 10);
const both = F.Pair(l,r);

both.defer([1,1],
  F.Terminal()
).submit();
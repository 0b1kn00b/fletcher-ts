# Fletcher-TS

`Promise` is often used in a series of `then` statements.

Turns out those functions have a language of their own

normally the function looks like `(r:R) => Ri` or `(r:R) => Promise<Ri>`

In `fletcher` it looks more like the old callback style.

`Pi` represents a parameter
`Ri` represents a return value.

The Arrowlet function looks like this:

```typescript
  class Arrowlet<P,R>{
    defer: (p:Pi,alloc:Junction<R>):Work;
  }
```

with the programmer providing some function between `Pi` and delivering `Ri` as and when.

## What Do!?

The following function will take an `<img>` element, find out if it's loaded, and if it's not, either wait and return the element, or return an error


```ts
  import { ExtendableError } from "ts-error";
  import * as E from 'fp-ts';
  import { Fletcher as F } from 'fletcher-ts'

  class TimeoutError extends ExtendableError {}

  class 
  function run(){
    //Return an arrow using the input
    const arrow = 
      F.Then(
        //use the input to generate an arrow dependent on the img state, and the run it
        F.FlatMap(
          F.Unit(),
          (x:HTMLImageElement) => {
              if (x.complete){
                //image is already loaded
                return F.Unit(E.right(x));
              }else{
                //the Event arrowlet adds an event handler, waits for the event and then cleans up the handler. If it's not called, the scheduler takes care of it as a work item after 
                return F.RaceWithTimeout(
                  F.Map(F.Event('onload'),E.right)
                  F.Map(F.event('onerror'),E.left)
                  2000
                );
              }
            }
            F.Fun1R(
              (x:HTMLImageElement) => x
            )
        )
      );
  }

```
take the `Fun` Arrowlet, which simply runs a function

```ts
  export class Fun<P,R> implements Arrowlet<P,R>{
    private _apply:(p:P) => R;
    constructor(_apply:(p:P) => R){
      this._apply = _apply;
    }
    defer(p: P, junction: Junction<R>): Work {
      return junction.receive(Junction.issue(this._apply(p)));
    }
  }
```
The separation of `issue` and `receive` is to allow the `Allocator` class instance to behave as a contination monad, giving access behind the scenes to the data passing through.

`issue` takes the `R` value.  
`later` takes a `Promise` of `R`.

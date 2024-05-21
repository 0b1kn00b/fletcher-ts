
import { ExtendableError } from "ts-error";
import * as E from 'fp-ts/Either';
import { Arrowlet, Fletcher as F } from '../src'

class TimeoutError extends ExtendableError {}
class LoadError extends ExtendableError{}
type AppError = TimeoutError | LoadError;

/**
 * Get the image when it's loaded
 */
function run(){
  //Return an arrow using the input
  //use the input to generate an arrow dependent on the img state, and the run it
  const arrow = F.FlatMap(
        (img:HTMLImageElement) => {
            if (img.complete){
              //image is already loaded
              let res : Arrowlet<HTMLImageElement,E.Either<AppError,HTMLImageElement>> = F.Pure(E.right(img));
              return res;
            }else{
              //the Event arrowlet adds an event handler, waits for the event and then cleans up the handler. 
              // If it's not called, the scheduler takes care of it as a work item after 
              const l : Arrowlet<HTMLImageElement,E.Either<AppError,HTMLImageElement>> = F.Map(F.Event('onload'),(_) => E.right(img));
              const r : Arrowlet<HTMLImageElement,E.Either<AppError,HTMLImageElement>> = F.Map(F.Event('onerror'),(_) => E.left(new LoadError()));
              return (F.Map(F.RaceWithTimeout(
                l,r,
                2000,
                new TimeoutError()
              ),(r:E.Either<TimeoutError, E.Either<AppError, HTMLImageElement>>): E.Either<AppError,HTMLImageElement> => {
                return E.fold(
                  (l:TimeoutError) => E.left(l),
                  (r:E.Either<AppError,HTMLImageElement>) => r
                )(r)
              }));
            }
          }
      ).apply(F.Unit() as Arrowlet<HTMLImageElement,HTMLImageElement>)
}
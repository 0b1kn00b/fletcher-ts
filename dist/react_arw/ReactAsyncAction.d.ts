export type ReactAsyncAction<A> = (action: A | ((a: A) => void)) => void;

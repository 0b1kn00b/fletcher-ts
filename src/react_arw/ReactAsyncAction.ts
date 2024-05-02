
export type ReactAsyncAction<A> = (action: ((a: A) => void)) => void;
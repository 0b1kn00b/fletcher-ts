import { Apply } from "./Apply";

export class Cont<P, R> extends Apply<Apply<P, R>, R> { }
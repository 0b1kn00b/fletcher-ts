import { Apply } from "@fletcher-ts/core";

export class Cont<P, R> extends Apply<Apply<P, R>, R> { }
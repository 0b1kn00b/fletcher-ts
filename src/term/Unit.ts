import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { Fun } from "./Fun";

export class Unit<Pi,E> extends Fun<Pi,Pi,E>{
  constructor(){
    super((p:Pi) => p);
  }
}



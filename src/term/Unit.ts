import { Cycle } from "../core/Cycle";
import { Terminal } from "../core/Terminal";
import { Fun } from "./Fun";

export class Unit<Pi> extends Fun<Pi,Pi>{
  constructor(){
    super((p:Pi) => p);
  }
}



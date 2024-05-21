import { Work } from "../core/Work";
import { Junction } from "../core/Junction";
import { Fun } from "./Fun";

export class Unit<Pi> extends Fun<Pi,Pi>{
  constructor(){
    super((p:Pi) => p);
  }
}



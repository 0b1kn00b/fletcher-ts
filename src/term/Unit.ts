import { Work, Junction  } from "src/Core";
import { Fun } from "src/Term";

export class Unit<Pi> extends Fun<Pi,Pi>{
  constructor(){
    super((p:Pi) => p);
  }
}



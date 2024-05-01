import { ArrowletApi } from "src/core/ArrowletApi";
import { Fletcher } from "../Fletcher";
import { Dispatch} from 'react'; 
import { Result } from "src/core/Result";

export default function react<P,R,E>(self:ArrowletApi<P,R,E>,p:P){
  return async function(dispatch:Dispatch<Result<R,E>>) {
    const result = await Fletcher.Resolve(self,p);
    dispatch(result);
  }
}
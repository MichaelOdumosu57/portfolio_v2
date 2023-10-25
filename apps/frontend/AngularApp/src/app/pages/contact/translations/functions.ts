import { CONFIG } from "@core/config/configs";
import { SubmitFormAPIRequestModel, SubmitFormUIRequestModel } from "./models";


export function submitFormAPIRequestModel(uiModel:SubmitFormUIRequestModel ){


  let apiModel = new SubmitFormAPIRequestModel(uiModel as unknown as SubmitFormAPIRequestModel);

  return {data:apiModel}
}
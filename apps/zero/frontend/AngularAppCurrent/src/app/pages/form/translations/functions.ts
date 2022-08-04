import { CONFIG } from "@core/config/configs";
import { SubmitFormAPIRequestModel, SubmitFormUIRequestModel } from "./models";


export function submitFormAPIRequestModel(uiModel:SubmitFormUIRequestModel ){



  [CONFIG.form.proficiencyFieldFormControlName, CONFIG.form.aptitudeFieldFormControlName]
  .forEach((formControlName)=>{

    // @ts-ignore
    uiModel[formControlName] = uiModel[formControlName].sourceValue
  })
  let apiModel = new SubmitFormAPIRequestModel(uiModel as unknown as SubmitFormAPIRequestModel);

  return {data:apiModel}
}
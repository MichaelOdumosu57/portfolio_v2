import { WmlDropdownOptionsMeta } from "@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component"

export class SubmitFormUIRequestModel{
  constructor(params:Partial<SubmitFormUIRequestModel>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  email:string = ""
  message:string = ""     
  name:string = ""     
  subject:string = ""     
  
}

export class SubmitFormAPIRequestModel extends SubmitFormUIRequestModel{

}
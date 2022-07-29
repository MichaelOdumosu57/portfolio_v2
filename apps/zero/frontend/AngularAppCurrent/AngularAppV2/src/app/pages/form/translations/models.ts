import { WmlDropdownOptionsMeta } from "@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component"

export class SubmitFormUIRequestModel{
  myName: string = ""
  myProficiency!: WmlDropdownOptionsMeta
  myDesc: string = ""
  myAptitude!:  WmlDropdownOptionsMeta
  myHelpText: string = ""
  myClientStakeHldr: string = ""
  myPresenter: string = ""
  
}

export class SubmitFormAPIRequestModel {
  constructor(params: Partial<SubmitFormAPIRequestModel> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  myName: string = ""
  myProficiency: string = ""
  myDesc: string = ""
  myAptitude: string = ""
  myHelpText: string = ""
  myClientStakeHldr: string = ""
  myPresenter: string = ""
}
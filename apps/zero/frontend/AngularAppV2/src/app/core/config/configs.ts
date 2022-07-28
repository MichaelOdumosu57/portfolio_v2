class Configs {
  homepage={
    nameFieldFormControlName:"myName",
    dropdownFieldFormControlName:"myDropdown",
    textAreaFieldFormControlName:"myTextArea",
  }
  form={
    nameFieldFormControlName:"myName",
    proficiencyFieldFormControlName:"myProficiency",
    descFieldFormControlName:"myDesc",
    aptitudeFieldFormControlName:"myAptitude",
    helpTextFieldFormControlName:"myHelpText",
    clientStakeHldrFieldFormControlName:"myClientStakeHldr",
    presenterFieldFormControlName:"myPresenter",
  }
  i18n= {
    appDropdownSelect:"",
    appDropdownOption:"",   
    formInvalidFormMsg:""

  }
  nav = {
    formNav:"/form"
  }
}

class DefaultConfigs extends Configs  {

  constructor(){
    super()
  }
}

export let CONFIG = window.location.origin === "http://localhost:4200"   ?  new Configs() : new DefaultConfigs()
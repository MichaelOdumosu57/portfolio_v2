class Configs {
  app={
    nameFieldFormControlName:"yourName",
    dropdownFieldFormControlName:"myDropdown",
  }
  i18n= {
    appDropdownSelect:"",
    appDropdownOption:"",    
  }
}

class DefaultConfigs extends Configs  {

  constructor(){
    super()
  }
}

export let CONFIG = window.location.origin === "http://localhost:4200"   ?  new Configs() : new DefaultConfigs()
class Configs {
  app={
    nameFieldFormControlName:"myName",
    dropdownFieldFormControlName:"myDropdown",
    textAreaFieldFormControlName:"myTextArea",
  }
  i18n= {
    appDropdownSelect:"",
    appDropdownOption:"",    
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
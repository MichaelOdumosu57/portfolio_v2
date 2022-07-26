class Configs {
  app={
    nameFieldFormControlName:"myName",
    dropdownFieldFormControlName:"myDropdown",
  }
}

class DefaultConfigs extends Configs  {

  constructor(){
    super()
  }
}

export let CONFIG = window.location.origin === "http://localhost:4200"   ?  new Configs() : new DefaultConfigs()
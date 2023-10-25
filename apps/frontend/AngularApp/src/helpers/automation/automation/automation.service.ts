
// angular
import { Injectable } from '@angular/core';

// rxjs
import { FormGroup } from '@angular/forms';
import { CONFIG } from '@core/config/configs';

// services
import { UtilityService } from '@core/utility/utility.service';

// misc
import { environment  as env } from '@environment/environment';

// wml-components
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  constructor(
    private utilService:UtilityService,
  ) { }


  documentQuerySelector(selector:string){
    return document.querySelector(selector) as HTMLElement
  }

  openCertViewer(){
    if(env.production) return
    let awsCerts = this.documentQuerySelector("certs-main > main > div.CertsMainPod1.row > div:nth-child(1)")
    awsCerts.click()
    let chosenCert =  this.documentQuerySelector("certs-main > main > div.CertsMainPod1.row > div:nth-child(1)")
    chosenCert.click()
  }

  submitContactForm(reactiveForm:FormGroup) {
    if(env.production) return
    Object.entries(reactiveForm.controls)
    .forEach((control)=>{
      let [key,value]=control
      if([CONFIG.contactMain.emailFieldFormControlName].includes(key)){
        value.setValue("michaelodumosu57@gmail.com")
      }
      else{

        value.setValue(this.utilService.generateRandomColor())
      }
    })
    let submitButton = this.documentQuerySelector("#root > app-root > home-main > main > wml-card > div > contact-main > main > div.ContactMainPod1 > div.ContactMainPod1Item0 > button")
    submitButton.click()

  }
}

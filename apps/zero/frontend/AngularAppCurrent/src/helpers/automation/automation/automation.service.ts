
// angular
import { Injectable } from '@angular/core';

// rxjs
import { FormGroup } from '@angular/forms';
import { CONFIG } from '@core/config/configs';

// services
import { UtilityService } from '@core/utility/utility.service';
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  constructor(
    private utilService:UtilityService,
  ) { }

  submitForm(reactiveForm:FormGroup) {
    Object.entries(reactiveForm.controls)
    .forEach((control)=>{
      let [key,value]=control
      if([CONFIG.form.proficiencyFieldFormControlName,CONFIG.form.aptitudeFieldFormControlName].includes(key)){
        value.setValue(new WmlDropdownOptionsMeta({
          sourceValue:this.utilService.generateRandomColor()
        }))
      }
      else{
        value.setValue(this.utilService.generateRandomColor())
      }
    })


  }

  documentQuerySelector(selector:string){
    return document.querySelector(selector) as HTMLElement
  }
}

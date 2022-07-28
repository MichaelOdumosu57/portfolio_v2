// angular
import { Injectable } from '@angular/core';

// services
import { UtilityService } from '@core/utility/utility.service';

// rxjs
import { forkJoin } from 'rxjs';
import {tap} from "rxjs/operators";
import { CONFIG } from './configs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private utilService:UtilityService,
  ) { }

  initI18NValues(){
    return forkJoin([
      this.utilService.getValueByi18nKey("app.dropdown.select"),
      this.utilService.getValueByi18nKey("app.dropdown.option"),
      this.utilService.getValueByi18nKey("form.invalidFormMsg"),
      this.utilService.getValueByi18nKey("form.submitFormSuccess"),
      this.utilService.getValueByi18nKey("form.submitFormError"),
    ])
    .pipe(
      tap((resp)=>{
        [
          CONFIG.i18n.appDropdownSelect,
          CONFIG.i18n.appDropdownOption,
          CONFIG.i18n.formInvalidFormMsg,
          CONFIG.i18n.formSubmitFormSuccess,
          CONFIG.i18n.formSubmitFormError          
        ] = resp
      })
    )
    

  }
}

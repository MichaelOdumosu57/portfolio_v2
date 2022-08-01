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

    CONFIG.i18n.appDropdownSelect =       this.utilService.getValueByi18nKey("app.dropdown.select")
    CONFIG.i18n.appDropdownOption =       this.utilService.getValueByi18nKey("app.dropdown.option")
    CONFIG.i18n.formInvalidFormMsg =       this.utilService.getValueByi18nKey("form.invalidFormMsg")
    CONFIG.i18n.formSubmitFormSuccess =       this.utilService.getValueByi18nKey("form.submitFormSuccess")
    CONFIG.i18n.formSubmitFormError =       this.utilService.getValueByi18nKey("form.submitFormError")       

  }
}

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
      this.utilService.getValueByi18nKey("app.dropdown.option")
    ])
    .pipe(
      tap((resp)=>{
        CONFIG.i18n.appDropdownSelect = resp[0]
        CONFIG.i18n.appDropdownOption = resp[1]
      })
    )
    

  }
}

// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// reactive forms
import { FormGroup } from '@angular/forms';

// services
import { BaseService } from '@core/base/base.service';
import { submitFormAPIRequestModel } from '../translations/functions';
import { CONFIG } from '@core/config/configs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }


  submitForm(reactiveForm:FormGroup) {
    this.baseService.toggleOverlayLoadingSubj.next(true)
    let uiForm = reactiveForm.getRawValue()
    let apiForm = submitFormAPIRequestModel(uiForm)
    console.log(uiForm)
    console.log(apiForm)
    
    return this.http.post(CONFIG.form.submitFormEndpoint, apiForm)
    .pipe(
      this.baseService.closeOverlayLoading
    )

  }
}

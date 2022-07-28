// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { tap} from 'rxjs/operators';

// reactive forms
import { FormGroup } from '@angular/forms';

// services
import { BaseService } from '@core/base/base.service';
import { submitFormAPIRequestModel } from '../translations/functions';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }




  submitForm(reactiveForm:FormGroup) {
    this.baseService.toggleOverlayLoadingSubj.next(true)
    let uiForm = reactiveForm.getRawValue()
    let apiForm = submitFormAPIRequestModel(uiForm)
    
    return this.http.post('http://localhost:3000/api/submitForm', apiForm)
    .pipe(
      this.baseService.closeOverlayLoading
    )

  }
}

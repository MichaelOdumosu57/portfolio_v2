import { Injectable } from '@angular/core';
import { finalize, ReplaySubject, Subject } from 'rxjs';

// services
import { UtilityService } from '@core/utility/utility.service';

// wml components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private utilService:UtilityService,
  ) { }

  toggleOverlayLoadingSubj=new Subject<boolean>()
  restartIntroSubj = new Subject<void>()

  closeOverlayLoading = finalize(()=>{
    
    this.toggleOverlayLoadingSubj.next(false)
  })

  generateButton(i18nKey:string /*i18n key*/,buttonClick?:(evt?:Event)=>void,iconSrc?:string,iconAlt?:string){
    return new WMLButton({
      button:new WMLUIProperty({
        click:buttonClick
      }),
      text:new WMLUIProperty({
        value:this.utilService.getValueByi18nKey(i18nKey)
      }),
      icon:{
        src:iconSrc,
        alt:iconAlt
      }      
    })
  }


  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        // control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ emitEvent: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  

  restartIntro= ()=>{
    this.restartIntroSubj.next()
  }
}

import { Injectable } from '@angular/core';
import { finalize, ReplaySubject, Subject } from 'rxjs';

// services
import { UtilityService } from '@core/utility/utility.service';

// wml components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { FormControl, FormGroup } from '@angular/forms';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { CustomLabelComponent } from '@shared/custom-label/custom-label.component';
import { WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';
import { WmlLabelMeta } from '@shared/wml-components/wml-fields/wml-label/wml-label.component';
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

  generateInputFormField=(labelValue:string,fieldFormControlName,fieldParentForm,errorMsgs:WmlLabelMeta["errorMsgs"],selfType?)=>{

    return this.generateFormField(
      new WMLField({
        type: "custom",
        custom: {

          selfType: selfType ?? "wml-card",
          fieldParentForm,
          fieldFormControlName,
          labelValue,
          errorMsgs
        }
      })
    )
  }

  generateRangeFormField=(labelValue:string,fieldFormControlName,fieldParentForm,errorMsgs?:WmlLabelMeta["errorMsgs"],selfType?)=>{
    let wmlField
    wmlField =      new WMLField({
      type: "custom",
      custom: {

        selfType: selfType ?? "standalone",
        fieldParentForm,
        fieldFormControlName,
        labelValue,
        errorMsgs:errorMsgs??{
          required:"value is Required"
        },
        fieldCustomMeta:new WmlInputMeta({
          wmlField,
          type:"range"
        })
      }
    })
    return this.generateFormField(wmlField)
  }

  generateFormField(wmlField:WMLField){
    wmlField.label.custom.cpnt = CustomLabelComponent
    wmlField.error.custom.cpnt = CustomLabelComponent
    return wmlField
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

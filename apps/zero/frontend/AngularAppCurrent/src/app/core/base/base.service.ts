import { Injectable } from '@angular/core';
import { finalize, ReplaySubject, Subject } from 'rxjs';

// services
import { UtilityService } from '@core/utility/utility.service';

// wml components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
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

  generateButton(i18nKey:string /*i18n key*/,buttonClick?:(evt?:Event)=>void){
    return new WMLButton({
      button:new WMLUIProperty({
        click:buttonClick
      }),
      text:new WMLUIProperty({
        value:this.utilService.getValueByi18nKey(i18nKey)
      })      
    })
  }

  restartIntro= ()=>{
    this.restartIntroSubj.next()
  }
}

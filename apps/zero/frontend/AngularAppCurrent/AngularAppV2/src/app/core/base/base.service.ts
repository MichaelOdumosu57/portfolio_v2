import { Injectable } from '@angular/core';
import { finalize, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  toggleOverlayLoadingSubj=new Subject<boolean>()
  restartIntroSubj = new Subject<void>()

  closeOverlayLoading = finalize(()=>{
    
    this.toggleOverlayLoadingSubj.next(false)
  })

  restartIntro(){
    this.restartIntroSubj.next()
  }
}

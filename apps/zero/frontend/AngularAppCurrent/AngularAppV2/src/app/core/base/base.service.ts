import { Injectable } from '@angular/core';
import { finalize, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  i18nValuesAreReadySubj=new ReplaySubject<void>(Infinity)
  toggleOverlayLoadingSubj=new Subject<boolean>()

  closeOverlayLoading = finalize(()=>{
    
    this.toggleOverlayLoadingSubj.next(false)
  })
}

// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// rxjs
import { takeUntil,tap } from 'rxjs';
import { Subject,BehaviorSubject } from 'rxjs';

// reactive forms
import { FormControl, FormGroup } from '@angular/forms';

// misc
import { CONFIG } from '@core/config/configs';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';


// wml compoenets
import { WmlDropdownComponent, WmlDropdownMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown.component';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from  '@shared/wml-components/wml-form/wml-form.component';
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownService } from '@shared/wml-components/wml-dropdown/wml-dropdown-service/wml-dropdown.service';

// services
import { UtilityService } from '@app/core/utility/utility.service';
import { ConfigService } from '@core/config/config.service';
import { WmlInputComponent, WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';
import { BaseService } from '@core/base/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private utilService:UtilityService,
    private configService:ConfigService,
    private wmlDropdownService:WmlDropdownService,
    private baseService:BaseService,
    private cdref:ChangeDetectorRef,
  ){}
  
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()
  overlayLoadingIsPresent:boolean = false;



  ngOnInit(){
    this.configService.initI18NValues()
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{

        this.baseService.i18nValuesAreReadySubj.next()
      })
    )
    .subscribe()

    this.baseService.toggleOverlayLoadingSubj
    .pipe(
      takeUntil(this.ngUnsub),
      tap((resp )=>{
        this.overlayLoadingIsPresent = resp
      })
    )
    .subscribe()
  }

  ngOnDestroy(){
    this.ngUnsub.next()
    this.ngUnsub.complete()
  }



}

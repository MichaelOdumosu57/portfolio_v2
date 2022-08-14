// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';

@Component({
  selector: 'wml-error',
  templateUrl: './wml-error.component.html',
  styleUrls: ['./wml-error.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class WmlErrorComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('WmlError')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

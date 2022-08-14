// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';
import { WMLWrapper } from '@shared/wml-components/models';

@Component({
  selector: 'wml-label',
  templateUrl: './wml-label.component.html',
  styleUrls: ['./wml-label.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class WmlLabelComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('WmlLabel')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('meta') meta = new WmlLabelMeta()

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

export class WmlLabelMeta extends WMLWrapper{
  constructor(params:Partial<WmlLabelMeta>={}){
    super(params)
    Object.assign(
      this,
      {
        ...params
      }
    )
    this.labels = this.labels.map((labelLine)=>{
      return labelLine.map((label)=>{
        label.type  = label.type || 'default'
        return label 
      })
    })
  }

  type: 'label' | 'error' = 'label'
  labels:{
    type?:"default" | "error",
    value:string
  }[][] = [
    [
      {
        type:"error",
        value:"*"
      },
      {
        type:"default",
        value:"My Label"
      }      
    ]
  ]
}

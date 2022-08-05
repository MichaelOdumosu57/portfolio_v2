// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLUIProperty } from '@shared/wml-components/models';

@Component({
  selector: 'certs-main',
  templateUrl: './certs-main.component.html',
  styleUrls: ['./certs-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CertsMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.classPrefix(CONFIG.classPrefix.certsMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  certCards:CertCard[] = Array(5)
  
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:[
        "assets/media/certs_0.png",
        "assets/media/certs_1.png",
        "assets/media/certs_2.png",
        "assets/media/certs_3.png",
        "assets/media/certs_4.jfif",
      ][index0],
      imgAlt:"certsMain.cardsImgAlts."+index0,
    })
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


class CertCard{
  constructor(params:Partial<CertCard>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  imgSrc:string = ""
  imgAlt:string = ""
  title:string = "Title"
  subtitle:string = "SubTitile"
  description:string = "Title"  
}
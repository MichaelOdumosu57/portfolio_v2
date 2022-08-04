// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';

@Component({
  selector: 'home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class HomeMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService,
    private el:ElementRef<HTMLInputElement>
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()  


  introButton: WMLButton = new WMLButton({
    button:new WMLUIProperty({}),
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey('global.nav.intro')
    })
  })
  homeButton:  WMLButton = new WMLButton({
    button:new WMLUIProperty({}),
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey('global.nav.home')
    })
  })
  resumeButton: WMLButton = new WMLButton({
    button:new WMLUIProperty({}),
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey('global.nav.resume')
    })
  })
  storiesButton: WMLButton = new WMLButton({
    button:new WMLUIProperty({}),
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey('global.nav.stories')
    })
  })
  contactButton: WMLButton = new WMLButton({
    button:new WMLUIProperty({}),
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey('global.nav.contact')
    })
  })  
  navButtons : WMLButton[]= [
    this.introButton,
    this.homeButton,
    this.resumeButton,
    this.storiesButton,
    this.contactButton,    
  ]
  ngOnInit(): void {
    this.el.nativeElement.style
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

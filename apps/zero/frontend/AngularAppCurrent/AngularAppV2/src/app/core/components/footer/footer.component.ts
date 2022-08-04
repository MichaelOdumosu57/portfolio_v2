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
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class FooterComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()  
  englishButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.english")
    })
  })
  spanishButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.spanish")
    })
  })
  chineseButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.chinese")
    })
  })
  hindiButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.hindi")
    })
  })
  ukrainianButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.ukrainian")
    })
  })
  arabicButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.arabic")
    })
  })
  bengaliButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.bengali")
    })
  })
  malayButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.malay")
    })
  })
  frenchButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.french")
    })
  })
  swahiliButton: WMLButton = new WMLButton({
    text:new WMLUIProperty({
      value:this.utilService.getValueByi18nKey("footer.langs.swahili")
    })
  })
  langButtons: WMLButton[] =[
    this.englishButton,
    this.spanishButton,
    this.chineseButton,
    this.hindiButton,
    this.ukrainianButton,
    this.arabicButton,
    this.bengaliButton,
    this.malayButton,
    this.frenchButton,
    this.swahiliButton,    
  ]

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

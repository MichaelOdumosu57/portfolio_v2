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
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.footer)
  @HostBinding('class') myClass: string = this.classPrefix('View');
  ngUnsub= new Subject<void>()  
  changeLanguage =(langCode:string)=> { return (evt:Event | any)=> {
    
    this.utilService.changeLanguage(langCode)
  }}
  englishButton: WMLButton = this.baseService.generateButton("footer.langs.english",this.changeLanguage("en"))
  spanishButton: WMLButton = this.baseService.generateButton("footer.langs.spanish",this.changeLanguage("es"))
  chineseButton: WMLButton = this.baseService.generateButton("footer.langs.chinese",this.changeLanguage("zh"))
  hindiButton: WMLButton = this.baseService.generateButton("footer.langs.hindi",this.changeLanguage("hi"))
  ukrainianButton: WMLButton = this.baseService.generateButton("footer.langs.ukrainian",this.changeLanguage("uk"))
  arabicButton: WMLButton = this.baseService.generateButton("footer.langs.arabic",this.changeLanguage("ar"))
  bengaliButton: WMLButton = this.baseService.generateButton("footer.langs.bengali",this.changeLanguage("bn"))
  malayButton: WMLButton = this.baseService.generateButton("footer.langs.malay",this.changeLanguage("ms"))
  frenchButton: WMLButton = this.baseService.generateButton("footer.langs.french",this.changeLanguage("fr"))
  swahiliButton: WMLButton = this.baseService.generateButton("footer.langs.swahili",this.changeLanguage("sw"))
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

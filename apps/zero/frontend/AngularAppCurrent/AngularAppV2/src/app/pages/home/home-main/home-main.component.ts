// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject, timer,takeUntil,tap } from 'rxjs';


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
    
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()  


  mobileDivStyle:Partial<CSSStyleDeclaration> = {}

  introButton: WMLButton = this.baseService.generateButton('global.nav.intro',this.baseService.restartIntro)
  homeButton:  WMLButton = this.baseService.generateButton('global.nav.home')
  resumeButton: WMLButton = this.baseService.generateButton('global.nav.resume')
  storiesButton: WMLButton = this.baseService.generateButton('global.nav.stories')
  certsButton: WMLButton = this.baseService.generateButton('global.nav.certs')
  contactButton: WMLButton = this.baseService.generateButton('global.nav.contact')
  navButtons : WMLButton[]= [
    this.introButton,
    this.homeButton,
    this.resumeButton,
    this.certsButton,
    this.contactButton,    
  ]
  ngOnInit(): void {
    timer(5000)
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.mobileDivStyle=  {
          left:"0%"
        }
        this.cdref.detectChanges()
      })
    )
    .subscribe()
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

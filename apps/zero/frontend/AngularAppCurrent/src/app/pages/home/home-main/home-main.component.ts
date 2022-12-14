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
import { Router } from '@angular/router';

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
    private router:Router
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.homeMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  


  mobileDivStyle:Partial<CSSStyleDeclaration> = {}
  mobileViewIsPresent:boolean = false

  introButtonClicked = (evt?:Event)=>{
    evt?.stopPropagation()
    this.baseService.restartIntro()
  }
  navigate = (destination:string)=>{
    return (evt?:Event)=>{
      this.router.navigate([destination])
      this.closeMobileNav()
    }
  }
  introButton: WMLButton = this.baseService.generateButton('global.nav.intro',this.introButtonClicked)
  homeButton:  WMLButton = this.baseService.generateButton('global.nav.home',this.navigate(CONFIG.nav.homeAlt))
  projectsButton: WMLButton = this.baseService.generateButton('global.nav.projects',this.navigate(CONFIG.nav.projects))
  storiesButton: WMLButton = this.baseService.generateButton('global.nav.stories',this.navigate(CONFIG.nav.stories))
  certsButton: WMLButton = this.baseService.generateButton('global.nav.certs',this.navigate(CONFIG.nav.certs))
  contactButton: WMLButton = this.baseService.generateButton('global.nav.contact',this.navigate(CONFIG.nav.contact))
  navButtons : WMLButton[]= [
    this.introButton,
    this.homeButton,
    this.projectsButton,
    this.certsButton,
    this.contactButton,    
  ]


  openMobileNav=()=> {
    this.mobileViewIsPresent = true
    this.cdref.detectChanges();
    timer(500)
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.mobileDivStyle = {
          left: "0%"
        };
        this.cdref.detectChanges();
      })
    )
    .subscribe()

  }

  closeMobileNav= (evt?:Event )=> {
    evt?.stopImmediatePropagation()
    this.mobileViewIsPresent = false
    this.mobileDivStyle = {
      left: "-50%"
    };
    this.cdref.detectChanges();
  }


  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

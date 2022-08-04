// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { takeUntil, tap, withLatestFrom } from 'rxjs';
import { Subject } from 'rxjs';

// misc
import { environment as env } from "@environment/environment";
import { CONFIG } from '@core/config/configs';

// services
import { ConfigService } from '@core/config/config.service';
import { BaseService } from '@core/base/base.service';
import { UtilityService } from '@core/utility/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private configService: ConfigService,
    private baseService: BaseService,
    private cdref: ChangeDetectorRef,
    private vcf: ViewContainerRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilityService
  ) { }

  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  overlayLoadingIsPresent: boolean = false;
  introMainIsPresent: boolean = true;
  toggleIntroMainIsPresent(evt:boolean){
    this.introMainIsPresent = evt
    this.cdref.detectChanges()
  }



  ngOnInit() {
    this.listenForOverlayLoadingToggle();
    this.doMiscConfigs()
    this.listenForRestartIntro().subscribe()
  }

  listenForRestartIntro(){
    return this.baseService.restartIntroSubj
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.toggleIntroMainIsPresent(true)
        this.router.navigate([CONFIG.nav.intro])
      })
    )
    
  }

  doMiscConfigs() {
    if (env.production) {
      this.vcf.element.nativeElement.removeAttribute("ng-version");
    }
    

    CONFIG.nav.initialURL = window.location.pathname
    if(CONFIG.nav.initialURL === "/"){
      this.router.navigate([CONFIG.nav.startURL])
    }    
    if(!["/intro","/"].includes(CONFIG.nav.initialURL)){
      this.introMainIsPresent = false
      this.cdref.detectChanges()
    }

    //    
  }


  private listenForOverlayLoadingToggle() {
    this.baseService.toggleOverlayLoadingSubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((resp) => {
          this.overlayLoadingIsPresent = resp;
          this.cdref.detectChanges();
        })
      )
      .subscribe();
  }


  ngOnDestroy() {
    this.ngUnsub.next()
    this.ngUnsub.complete()
  }



}

// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

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
    private utilService: UtilityService
  ) { }

  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  overlayLoadingIsPresent: boolean = false;



  ngOnInit() {
    this.configService.initI18NValues()
    this.listenForOverlayLoadingToggle();
    this.doMiscConfigs()
    this.router.navigateByUrl(CONFIG.nav.intro);
  }

  doMiscConfigs() {
    //remove version
    if (env.production) {
      this.vcf.element.nativeElement.removeAttribute("ng-version");
    }
    //

    // so we dont have to navigate on dev
    if (!env.production) {
      this.router.navigateByUrl(CONFIG.nav.startURL);
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

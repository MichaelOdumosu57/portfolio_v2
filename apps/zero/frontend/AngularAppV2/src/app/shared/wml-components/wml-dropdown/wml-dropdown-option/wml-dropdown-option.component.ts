// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { Subject } from 'rxjs';

// ms
import { CONFIG } from '@app/core/config/configs';

@Component({
  selector: 'wml-dropdown-option',
  templateUrl: './wml-dropdown-option.component.html',
  styleUrls: ['./wml-dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WmlDropdownOptionComponent implements OnInit {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()

  initComponent(){

  }

  initUpdateComponent(){

  }


  ngOnInit(): void {
    this.initComponent()
    this.initUpdateComponent()
    
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}

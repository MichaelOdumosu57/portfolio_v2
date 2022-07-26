// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, 
  HostBinding, HostListener, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { CONFIG } from '@app/core/config/configs';
import { addCustomComponent } from '@shared/wml-components/functions';
import { WmlDropdownParentSubjParams } from '../wml-dropdown.component';

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
  @Input('meta') meta: WmlDropdownOptionsMeta = new WmlDropdownOptionsMeta();
  @ViewChild("customOption", {read:ViewContainerRef,static:true}) customOption!:ViewContainerRef;
  ngUnsub= new Subject<void>()

  initComponent(){
    addCustomComponent(this.customOption,this.meta.display.cpnt,this.meta.display.meta)

  }

  initUpdateComponent(){

  }

  @HostListener('mousemove') onMouseover(){
    if( ["select","autocomplete"].includes(this.meta.type) ){
      this.meta.communicateWithParentSubj.next(
        new WmlDropdownParentSubjParams({
          type:"showDropdown"
        })
      )
    }
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

export class WmlDropdownOptionsMeta {
  
    constructor(params:Partial<WmlDropdownOptionsMeta>={}){
      Object.assign(
        this,
        {
          ...params
        }
      )
      if(!params.class){
        if(["option"].includes(this.type)){
          this.class = "Pod0Item1"
        }
      }
    }
    display!:{
      cpnt:Type<any>,
      meta:any
    } 
    communicateWithParentSubj!:Subject<WmlDropdownParentSubjParams>
    class?:"Pod0Item0" | "Pod0Item1"= "Pod0Item0" 
    sourceValue?:any
    type:"select" | "autocomplete" | "option" | "noSelect" = "option"
  
}

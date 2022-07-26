// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, HostListener, Input, OnInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';

// reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// rxjs
import {takeUntil, tap,pluck, map, defaultIfEmpty, take } from 'rxjs/operators';
import { Subject } from 'rxjs';


// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';
import { addCustomComponent } from '../functions';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';

@Component({
  selector: 'wml-dropdown',
  templateUrl: './wml-dropdown.component.html',
  styleUrls: ['./wml-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WmlDropdownComponent),
      multi: true
    }
  ]  
})
export class WmlDropdownComponent  {

  @Input('meta') meta: WmlDropdownMeta = new WmlDropdownMeta();
  @ViewChildren("customOption", {read:ViewContainerRef}) customOptions!:QueryList<ViewContainerRef>;
  constructor(
    private cdref:ChangeDetectorRef,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()
  communicateWithParentSubj = new Subject<WmlDropdownParentSubjParams>()



  ngAfterViewInit(){
    this.communicateWithParentSubj
    .pipe(
      takeUntil(this.ngUnsub),
      tap((resp)=>{

        if(resp.type ==="showDropdown"){
          this.meta.options.forEach((option)=>{
            option.class = "Pod0Item0"
          })
          this.cdref.detectChanges()
        }
        
      })
    )
    .subscribe()

    this.setCommunicateWithParentSubj();

  }


  private setCommunicateWithParentSubj() {
    this.meta.options.forEach((option) => {
      option.communicateWithParentSubj = this.communicateWithParentSubj;
    });
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}

export class WmlDropdownParentSubjParams{
  constructor(params:Partial<WmlDropdownParentSubjParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  type!:"showDropdown" | "hideDropdown"
}

export class WmlDropdownMeta {
  constructor(params:Partial<WmlDropdownMeta>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  wmlField: WMLField = new WMLField();
  options:Array<WmlDropdownOptionsMeta> = []

  
}
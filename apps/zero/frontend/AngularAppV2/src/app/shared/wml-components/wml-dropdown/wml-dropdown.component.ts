// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, Input, OnInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';

// reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// rxjs
import {takeUntil, tap,pluck, map, defaultIfEmpty } from 'rxjs/operators';
import { Subject } from 'rxjs';


// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';
import { addCustomComponent } from '../functions';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';

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

  ngAfterViewInit(): void {




    this.customOptions.changes
    .pipe(
      takeUntil(this.ngUnsub),
      map((vcfs)=> vcfs._results),
      tap((vcfs:Array<ViewContainerRef>)=>{
        
        vcfs.forEach((vcf,index0)=>{
          addCustomComponent(
            vcf,
            this.meta.options[index0].display.cpnt,
            this.meta.options[index0].display.meta
          )
        })
        this.cdref.detectChanges()
      })
    )
    .subscribe()
    this.customOptions.notifyOnChanges()
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

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
  select:{
    display:{
      cpnt:Type<any>,
      meta:any
    },
    sourceValue?:any,
  } = {
    display:{
      cpnt:DropdownOptionComponent,
      meta:new DropdownOptionMeta(),
    },
    sourceValue:0,
  }
  options:Array<WmlDropdownMeta["select"]> = []

  
}
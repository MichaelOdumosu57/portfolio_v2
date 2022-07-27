// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, HostListener, Input, OnInit, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';

// reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// rxjs
import { takeUntil, tap, pluck, map, defaultIfEmpty, take } from 'rxjs/operators';
import { Subject } from 'rxjs';


// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';
import { addCustomComponent } from '../functions';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownSampleComponent } from './wml-dropdown-sample/wml-dropdown-sample.component';

@Component({
  selector: 'wml-dropdown',
  templateUrl: './wml-dropdown.component.html',
  styleUrls: ['./wml-dropdown.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WmlDropdownComponent),
      multi: true
    }
  ]
})
export class WmlDropdownComponent {

  @Input('meta') meta: WmlDropdownMeta = new WmlDropdownMeta();
  @ViewChildren("customOption", { read: ViewContainerRef }) customOptions!: QueryList<ViewContainerRef>;
  constructor(
    private cdref: ChangeDetectorRef,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  communicateWithParentSubj = new Subject<WmlDropdownParentSubjParams>()

  ngAfterViewInit() {
    this.showInitalOptionAndSetAsRoot();
    this.resizeInitialDropdown();
    this.attachParentsToChild();
    this.communicateWithParentSubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((resp) => {

          this.showDropdown(resp);
          this.hideDropdown(resp)

        })
      )
      .subscribe()

    this.setCommunicateWithParentSubj();

  }


  private attachParentsToChild() {
    this.meta.options.forEach((option, index0) => {
      if (index0 !== 0) {
        option.parentOption = this.meta.options[0];
      }
      option.parentDropdown = this.meta
    });
  }

  private resizeInitialDropdown() {
    if (this.meta._root) {
      this.meta.options[0].children.dropdownStyle = { width: "100%" };

    }
  }

  private showInitalOptionAndSetAsRoot() {

    if (this.meta._root) {
      if(this.meta.options.length === 0){
        this.meta.options = [new WmlDropdownOptionsMeta({
          display: {
            cpnt: WmlDropdownSampleComponent,
            meta: {}
          }
        })]
      }
      this.meta.options[0].class = "Pod0Item0";
      this.meta.options[0]._root = true
    }
    this.cdref.detectChanges();

  }

  private showDropdown(resp: WmlDropdownParentSubjParams) {
    if (resp.type === "showDropdown") {


      resp.option.children.options.forEach((option) => {
        option.class = "Pod0Item0";

        resp.option.view.cdref?.detectChanges()
        option.view.cdref?.detectChanges()

      });

      this.cdref.detectChanges();
    }
  }

  private hideDropdown(resp: WmlDropdownParentSubjParams) {
    if (resp.type === "hideDropdown") {
      this.meta.options.forEach((option) => {
        option.children.options.forEach((option1) => {
          option1.class = "Pod0Item1";
          option1.view.cdref?.detectChanges()
          option.view.cdref?.detectChanges()
        })

      })


    }
  }

  private setCommunicateWithParentSubj() {
    this.meta.options.forEach((option) => {
      option.communicateWithParentSubj = this.communicateWithParentSubj;
    });
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}

export class WmlDropdownParentSubjParams {
  constructor(params: Partial<WmlDropdownParentSubjParams> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  type!: "showDropdown" | "hideDropdown"
  option!: WmlDropdownOptionsMeta
}

export class WmlDropdownMeta {
  constructor(params: Partial<WmlDropdownMeta> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )

  }
  _root = true
  wmlField: WMLField = new WMLField();
  options: Array<WmlDropdownOptionsMeta> = []
  dropdownStyle: any = {}

}
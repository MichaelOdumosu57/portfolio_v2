// angular
import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input } from '@angular/core';

// reactive forms
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// rxjs
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';
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
    this.subscribeToCommunicateWithParentSubj().subscribe();;
    this.setCommunicateWithParentSubj();

  }


  subscribeToCommunicateWithParentSubj() {
    return this.communicateWithParentSubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((resp) => {

          if (resp.type === "showDropdown") {
            this.showDropdown(resp);
          }
          else if (resp.type === "hideDropdown") {
            this.hideDropdown(resp);
          }

        })
      )

  }

  attachParentsToChild() {
    this.meta.options.forEach((option, index0) => {
      if (index0 !== 0) {
        option.parentOption = this.meta.options[0];
      }
      option.parentDropdown = this.meta
    });
  }

  resizeInitialDropdown() {
    if (this.meta._root) {
      this.meta.options[0].children.dropdownStyle = { width: "100%" };

    }
  }

  showInitalOptionAndSetAsRoot() {

    if (this.meta._root) {
      if (this.meta.options.length === 0) {
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

  showDropdown(resp: WmlDropdownParentSubjParams) {

    resp.option.children.options.forEach((option) => {
      option.class = "Pod0Item0";

    });

    this.cdref.detectChanges();

  }

  hideDropdown(resp: WmlDropdownParentSubjParams) {
    this.meta.options.forEach((option) => {
      option.children.options.forEach((option1) => {
        option1.class = "Pod0Item1";
      })
    })
  }

  setCommunicateWithParentSubj() {
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
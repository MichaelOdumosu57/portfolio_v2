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
import { WmlDropdownService } from './wml-dropdown-service/wml-dropdown.service';

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
    private wmlDropdownService: WmlDropdownService,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  communicateWithParentSubj = new Subject<WmlDropdownParentSubjParams>()
  communicateWithRootOptionSubj = new Subject<WmlDropdownParentSubjParams>();


  ngAfterViewInit() {
    this.showInitalOptionAndSetAsRoot();

    this.resizeInitialDropdown();
    this.attachRootInformationToChildren();
    this.attachParentInformationToChildren();
    this.subscribeToCommunicateWithParentSubj().subscribe();
    this.setCommunicateWithParentSubj();
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
  resizeInitialDropdown() {
    if (this.meta._root) {
      this.meta.options[0].dropdownChild.dropdownStyle = { width: "100%" };

    }
  }

  attachRootInformationToChildren() {
    if (this.meta._root) {
      let allOptions = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(this.meta);
      console.log(allOptions)
      allOptions.forEach((option) => {
        option.rootDropdown = this.meta;
        option.rootOption = this.meta.options[0];
        option.communicateWithRootOptionSubj = this.communicateWithRootOptionSubj
      })
    }
  }


  attachParentInformationToChildren() {
    if (this.meta._root) {
      let allOptions =this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(
        this.meta,
        (parentDropdown, parentOption, child) => {

          child.options.forEach((option) => {
            option.parentDropdown = parentDropdown;
            option.parentOption = parentOption;
          })
        }
      );
      allOptions.forEach((option)=>{
        option._rootIsReadySubj.next();
      })
    }
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



  /**@TODO refactor to attachParentInformationToChildren */
  setCommunicateWithParentSubj() {
    this.meta.options.forEach((option) => {
      option.communicateWithParentSubj = this.communicateWithParentSubj;
    });
  }

  showDropdown(resp: WmlDropdownParentSubjParams) {

    resp.option.dropdownChild.options.forEach((option) => {
      option.class = "Pod0Item0";

    });

    this.cdref.detectChanges();

  }

  hideDropdown(resp: WmlDropdownParentSubjParams) {
    this.meta.options.forEach((option) => {
      option.dropdownChild.options.forEach((option1) => {
        option1.class = "Pod0Item1";
      })
    })
  }

  selectOption(resp: WmlDropdownParentSubjParams) {
    console.log(resp.option.rootDropdown === this.meta)
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
  type!: "showDropdown" | "hideDropdown" | "selectOption"
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
// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// rxjs
import { takeUntil, tap } from 'rxjs';
import { Subject, BehaviorSubject } from 'rxjs';

// reactive forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// misc
import { CONFIG } from '@core/config/configs';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';


// wml compoenets
import { WmlDropdownComponent, WmlDropdownMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown.component';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownService } from '@shared/wml-components/wml-dropdown/wml-dropdown-service/wml-dropdown.service';
import { WmlInputComponent, WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';

// services
import { BaseService } from '@core/base/base.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { ConfigService } from '@core/config/config.service';
import { FormService } from '../form-service/form-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor(
    private utilService: UtilityService,
    private configService: ConfigService,
    private wmlDropdownService: WmlDropdownService,
    private baseService: BaseService,
    private cdref:ChangeDetectorRef,
    private formService:FormService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()

  rootFormGroup = new FormGroup({
    [CONFIG.form.nameFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.form.proficiencyFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.form.descFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.form.aptitudeFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.form.helpTextFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.form.clientStakeHldrFieldFormControlName]: new FormControl(null,),
    [CONFIG.form.presenterFieldFormControlName]: new FormControl(null,[Validators.required]),
  });
  nameField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.nameFieldFormControlName
    }
  })

  generateDropdownOptions = () => new WmlDropdownOptionsMeta({
    display: {
      cpnt: DropdownOptionComponent,
      meta: new DropdownOptionMeta({
        selectChevronIsPresent: true
      }),
    },
    dropdownChild: new WmlDropdownMeta({

      options: Array(this.utilService.generateRandomNumber(10,2))
        .fill(null)
        .map((_,index1) => {
          return new WmlDropdownOptionsMeta({
            display: {
              cpnt: DropdownOptionComponent,
              meta: new DropdownOptionMeta({}),
            },
            sourceValue:index1
          })
        }),
    }),
    sourceValue: 1,
    type: "select"
  })
  proficiencyMeta = new WmlDropdownMeta({
    options: [this.generateDropdownOptions()],
  })
  proficiencyField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.proficiencyFieldFormControlName,
      fieldCustomCpnt: WmlDropdownComponent,
      fieldCustomMeta: this.proficiencyMeta

    }
  })

  descMeta = new WmlInputMeta({ type: "textarea" })
  descField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.descFieldFormControlName,
      fieldCustomCpnt: WmlInputComponent,
      fieldCustomMeta: this.descMeta
    }
  })

  aptitudeMeta = new WmlDropdownMeta({
    options: [this.generateDropdownOptions()],
  })
  aptitudeField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.aptitudeFieldFormControlName,
      fieldCustomCpnt: WmlDropdownComponent,
      fieldCustomMeta: this.aptitudeMeta

    }
  })

  helpTextMeta = new WmlInputMeta({ type: "textarea" })
  helpTextField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.helpTextFieldFormControlName,
      fieldCustomCpnt: WmlInputComponent,
      fieldCustomMeta: this.helpTextMeta
    }
  })

  clientStakeHldrField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.clientStakeHldrFieldFormControlName
    }
  })

  presenterField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.form.presenterFieldFormControlName
    }
  })



  fields = [this.nameField, this.proficiencyField, this.descField,this.aptitudeField,this.helpTextField,this.clientStakeHldrField,this.presenterField]
  wmlForm = new WMLForm({
    fields: this.fields
  })

  ngOnInit() {
    this.baseService.i18nValuesAreReadySubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap(() => {

          let proficOptions = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(this.proficiencyMeta)
          this.updateDropdownText(proficOptions);
          let aptitudeOptions = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(this.aptitudeMeta)
          this.updateDropdownText(aptitudeOptions,"Aptitude ");

        })
      )
      .subscribe()
  }


  private updateDropdownText(options: WmlDropdownOptionsMeta[] = [],text:string = CONFIG.i18n.appDropdownOption) {
    options.map((option, index0) => {
      let meta: DropdownOptionMeta = option.display.meta
      meta.title = index0 === 0 ? CONFIG.i18n.appDropdownSelect : text  + " " + index0;
      meta.view.cdref?.detectChanges()
    });
  }


  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

  submit() {

    if(this.rootFormGroup.valid){
      this.formService.submitForm(this.rootFormGroup)
      .pipe(
        takeUntil(this.ngUnsub),
        tap(()=>{
      
        }),

      )
      .subscribe()
    }
    else{
      alert(CONFIG.i18n.formInvalidFormMsg)
    }
  }



}

// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';

// reactive-forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';
import { WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';

@Component({
  selector: 'contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ContactMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.contactMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()

  rootFormGroup = new FormGroup({
    [CONFIG.contactMain.nameFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.contactMain.msgTextFieldFormControlName]: new FormControl(null,[Validators.required]),
  })
  
  nameField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.nameFieldFormControlName,
      labelValue:this.utilService.getValueByi18nKey("contactMain.form.name.label")
    }
  })


  msgTextMeta  = new WmlInputMeta({ type: "textarea" })
  msgTextField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.msgTextFieldFormControlName,
      fieldCustomMeta: this.msgTextMeta,
      labelValue:this.utilService.getValueByi18nKey("contactMain.form.msg.label"),
      errorMsgs:{
        required:this.utilService.getValueByi18nKey("contactMain.form.msgText.errorMsgs.required")
      }
    }
  })

  fields= [this.nameField,this.msgTextField]
  wmlForm = new WMLForm({
    fields: this.fields
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

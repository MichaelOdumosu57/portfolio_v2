// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';
import { ContactService } from '../service/contact.service';
import { AutomationService } from '@helpers/automation/automation/automation.service';

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
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { HttpErrorResponse } from '@angular/common/http';




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
    private baseService:BaseService,
    private contactService:ContactService,
    private automationService:AutomationService
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.contactMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()

  rootFormGroup = new FormGroup({
    [CONFIG.contactMain.nameFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.contactMain.emailFieldFormControlName]: new FormControl(null,[Validators.required,Validators.email]),
    [CONFIG.contactMain.subjectFieldFormControlName]: new FormControl(null),
    [CONFIG.contactMain.msgTextFieldFormControlName]: new FormControl(null,[Validators.required]),
  })
  

  nameField = this.baseService.generateFormField(new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.nameFieldFormControlName,
      labelValue:"contactMain.form.name.label",
      errorMsgs:{
        required:"contactMain.form.name.errorMsgs.required"
      }
    }
  }))

  emailField = this.baseService.generateFormField(new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.emailFieldFormControlName,
      labelValue:"contactMain.form.email.label",
      errorMsgs:{
        required:"contactMain.form.email.errorMsgs.required",
        email:"contactMain.form.email.errorMsgs.email"
      }
    }
  }))

  subjectField = this.baseService.generateFormField(new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.subjectFieldFormControlName,
      labelValue:"contactMain.form.subject.label",
      labelRequired:false
    }
  }))

  


  msgMeta  = new WmlInputMeta({ type: "textarea" })
  msgField = this.baseService.generateFormField(new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.msgTextFieldFormControlName,
      fieldCustomMeta: this.msgMeta,
      labelValue:"contactMain.form.msg.label",
      errorMsgs:{
        required:"contactMain.form.msg.errorMsgs.required"
      }
    }
  }))

  submitForm = ()=>{
    if(this.rootFormGroup.valid){
      this.contactService.submitForm(this.rootFormGroup)
      .pipe(
        takeUntil(this.ngUnsub),
        tap({
          next:()=>{
            alert(this.utilService.translateService.instant('contactMain.submitFormSuccess'))
          },
          error:(resp:HttpErrorResponse)=>{
            console.log(resp.error.data)
            alert(this.utilService.translateService.instant('contactMain.submitFormError'))
          }
        }),
      )
      .subscribe()
    }
    else{
      
      this.baseService.validateAllFormFields(this.rootFormGroup)
      this.cdref.detectChanges()
    }        
  }
  submitButton = this.baseService.generateButton(
    "contactMain.submit.text",
    this.submitForm

  )
  


  fields= [this.nameField,this.emailField,this.subjectField, this.msgField]
  wmlForm = new WMLForm({
    fields: this.fields
  })

  socialMediaContacts =Array(6)
  .fill(null)
  .map((nullVal,index0)=>{
    return new ContactSocialMedia({
      imgSrc:"assets/media/contact_"+index0+".png",
      imgAlt:"contactMain.socialMedia."+index0,
      displayTitle:"contactMain.socialMedia."+index0,
      navigateTo:()=> window.location.href = [
        "mailto:michaelodumosu57@gmail.com",
        "https://www.facebook.com/mchael.odumosu/",
        "https://twitter.com/MOdumosu",
        "https://app.slack.com/client/T02A6UJ4EJD/setup-invites",
        "https://discord.com/channels/michaelodumosu57#0118",        
        "https://www.linkedin.com/in/michael-odumosu-a58367b1",
      ][index0],
      titleStyle :{
        background:[
          "radial-gradient(farthest-corner at 100% 0px, red 0%, white 250%)",
          "radial-gradient(farthest-corner at 100% 0px, royalblue 0%, navy 200%)",
          "radial-gradient(farthest-corner at 100% 0px, cyan 0%, skyblue 200%)",
          "radial-gradient(farthest-corner at 100% 0px, aquamarine 0%, green 200%)",
          "radial-gradient(farthest-corner at 100% 0px, aquamarine 0%, purple 200%)",
          "radial-gradient(farthest-corner at 100% 0px, cyan 0%, blue 200%)",
        ][index0]
      }
    })
  })


  ngOnInit(): void {
  }

  ngAfterViewInit(){
    // this.automationService.submitContactForm(this.rootFormGroup)
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


class ContactSocialMedia{
  constructor(params:Partial<ContactSocialMedia>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  imgSrc:string = ""
  imgAlt:string = ""
  title:string= ""
  navigateTo:()=>void= ()=>{}
  titleStyle:Partial<CSSStyleDeclaration>= {}
  displayTitle:string = "Title"
}

